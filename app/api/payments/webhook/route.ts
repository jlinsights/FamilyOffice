/**
 * Toss Payments Webhook Handler
 *
 * POST /api/payments/webhook
 *
 * 전략: webhook 본문은 "신호"로만 사용하고, 실제 상태는 Toss API 재조회로 검증한다.
 * TOSS_WEBHOOK_SECRET 이 있으면 tosspayments-webhook-signature 헤더로 HMAC 검증한다.
 * 추가로 PAYMENT_STATUS_CHANGED 시 data.secret 을 DB payment_secret 과 대조한다.
 *
 * 흐름:
 *   0) raw body + (선택) HMAC 서명 검증
 *   1) Body parse → { paymentKey, orderId, data.secret, ... }
 *   2) Toss GET (paymentKey 또는 orders/{orderId}) 재조회
 *   3) secret 검증 후 DB 갱신 (idempotent)
 *   4) 200 OK (10초 이내 — Toss retry 방지)
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { paymentSecretsMatch } from '@/lib/payments/payment-secret';
import { getTossPaymentLookupUrl } from '@/lib/payments/toss-payment-lookup';
import { verifyTossWebhookSignature } from '@/lib/payments/toss-webhook-signature';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const webhookSchema = z.object({
  eventType: z.string().optional(),
  data: z
    .object({
      paymentKey: z.string().optional(),
      orderId: z.string().optional(),
      status: z.string().optional(),
      secret: z.string().optional(),
    })
    .optional(),
  paymentKey: z.string().optional(),
  orderId: z.string().optional(),
});

interface TossPaymentLookupResponse {
  paymentKey: string;
  orderId: string;
  status: string;
  totalAmount?: number;
  method?: string;
  approvedAt?: string;
  canceledAt?: string;
  secret?: string;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  const rawBodyText = await request.text();
  const webhookSigningSecret = process.env.TOSS_WEBHOOK_SECRET?.trim();

  if (webhookSigningSecret) {
    const signatureOk = verifyTossWebhookSignature({
      rawBody: rawBodyText,
      transmissionTime: request.headers.get(
        'tosspayments-webhook-transmission-time'
      ),
      signatureHeader: request.headers.get('tosspayments-webhook-signature'),
      webhookSecret: webhookSigningSecret,
    });

    if (!signatureOk) {
      console.error('[webhook] HMAC signature verification failed');
      return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[webhook] TOSS_WEBHOOK_SECRET not set — skipping HMAC verification'
    );
  }

  let rawBody: unknown;
  try {
    rawBody = JSON.parse(rawBodyText) as unknown;
  } catch {
    console.error('[webhook] invalid json body');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const parsed = webhookSchema.safeParse(rawBody);
  if (!parsed.success) {
    console.error('[webhook] schema mismatch:', parsed.error.errors);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const paymentKey =
    parsed.data.data?.paymentKey ?? parsed.data.paymentKey ?? null;
  const orderId = parsed.data.data?.orderId ?? parsed.data.orderId ?? null;
  const webhookSecret = parsed.data.data?.secret ?? null;

  if (!paymentKey && !orderId) {
    console.warn('[webhook] missing paymentKey/orderId — ignored');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    console.error('[webhook] TOSS_SECRET_KEY not configured');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const lookupUrl = getTossPaymentLookupUrl({ paymentKey, orderId });
  if (!lookupUrl) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const authHeader = `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`;

  let tossPayment: TossPaymentLookupResponse | null = null;
  try {
    const res = await fetch(lookupUrl, {
      headers: { Authorization: authHeader },
    });
    if (res.ok) {
      tossPayment = (await res.json()) as TossPaymentLookupResponse;
    } else {
      console.error('[webhook] Toss lookup failed:', res.status, lookupUrl);
      return NextResponse.json({ received: true }, { status: 200 });
    }
  } catch (error) {
    console.error('[webhook] Toss lookup error:', error);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  if (!tossPayment?.orderId) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const supabase = createAdminClient();
  const isShop = tossPayment.orderId.startsWith('SHOP-');
  const tableName = isShop ? 'shop_orders' : 'structure_check_requests';

  // Shop 은 payment_secret 컬럼 없음 — confirm route 의 Clerk 본인검증 + Toss confirm 으로 진위 보장.
  // structure_check_requests 만 payment_secret 매칭 수행.
  let existingSecret: string | null = null;
  if (!isShop) {
    const { data: existingRecord } = await (supabase
      .from('structure_check_requests')
      .select('payment_secret')
      .eq('order_id', tossPayment.orderId)
      .maybeSingle() as unknown as Promise<{
      data: { payment_secret: string | null } | null;
      error: unknown;
    }>);
    existingSecret = existingRecord?.payment_secret ?? null;

    const expectedSecret =
      existingSecret ??
      (typeof tossPayment.secret === 'string' ? tossPayment.secret : null);

    if (webhookSecret && expectedSecret) {
      if (!paymentSecretsMatch(expectedSecret, webhookSecret)) {
        console.error('[webhook] secret mismatch — DB update skipped', {
          orderId: tossPayment.orderId,
        });
        return NextResponse.json({ received: true }, { status: 200 });
      }
    } else if (webhookSecret && !expectedSecret) {
      console.warn(
        '[webhook] webhook secret present but no stored payment_secret yet',
        { orderId: tossPayment.orderId }
      );
    }
  }

  const updateBuilder = supabase.from(tableName) as unknown as {
    update: (data: Record<string, unknown>) => {
      eq: (col: string, val: string) => Promise<{ error: unknown }>;
    };
  };

  const newStatus = mapTossStatus(tossPayment.status);
  if (newStatus === null) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const updateFields: Record<string, unknown> = { payment_status: newStatus };
  if (newStatus === 'paid') {
    updateFields.payment_key = tossPayment.paymentKey;
    updateFields.paid_amount = tossPayment.totalAmount ?? null;
    updateFields.paid_at = tossPayment.approvedAt ?? new Date().toISOString();
    updateFields.payment_method = tossPayment.method ?? null;
    // payment_secret 은 structure_check_requests 만 (shop_orders 컬럼 없음)
    if (!isShop && !existingSecret && typeof tossPayment.secret === 'string') {
      updateFields.payment_secret = tossPayment.secret;
    }
  } else if (newStatus === 'cancelled' || newStatus === 'refunded') {
    updateFields.refunded_at =
      tossPayment.canceledAt ?? new Date().toISOString();
  }

  const { error: updateError } = await updateBuilder
    .update(updateFields)
    .eq('order_id', tossPayment.orderId);

  if (updateError) {
    console.error('[webhook] DB update failed:', updateError);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

function mapTossStatus(
  tossStatus: string
): 'paid' | 'failed' | 'cancelled' | 'refunded' | 'pending' | null {
  switch (tossStatus) {
    case 'DONE':
      return 'paid';
    case 'CANCELED':
    case 'PARTIAL_CANCELED':
      return 'refunded';
    case 'ABORTED':
    case 'EXPIRED':
      return 'failed';
    case 'IN_PROGRESS':
    case 'WAITING_FOR_DEPOSIT':
    case 'READY':
      return 'pending';
    default:
      return null;
  }
}
