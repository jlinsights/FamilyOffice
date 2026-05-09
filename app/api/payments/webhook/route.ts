/**
 * Toss Payments Webhook Handler
 *
 * POST /api/payments/webhook
 *
 * 전략: Toss webhook 시그니처 spec이 공개 docs에 없으므로 — webhook 본문은
 * "신호"로만 사용하고, 실제 상태는 Toss API 재조회로 검증한다. 위조된 webhook
 * 이라도 Toss API와 cross-check 통과하지 못하면 DB가 갱신되지 않는다.
 *
 * 흐름:
 *   1) Body parse → { paymentKey, eventType, ... }
 *   2) Toss GET /v1/payments/{paymentKey} 재조회 (Basic auth + secret key)
 *   3) Toss 응답의 status로 DB 갱신 (paymentKey lookup, idempotent)
 *   4) 200 OK 응답 (10초 이내 — Toss retry 방지)
 *
 * Toss retry 정책: 실패 시 7회 재시도 (1, 4, 16, 64, 256, 1024, 4096분 백오프).
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOSS_PAYMENT_LOOKUP_URL = 'https://api.tosspayments.com/v1/payments';

const webhookSchema = z.object({
  eventType: z.string().optional(),
  data: z
    .object({
      paymentKey: z.string().optional(),
      orderId: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
  // Toss 가 다양한 포맷을 보낼 수 있으므로 leniency
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
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  // Toss 는 200 응답을 10초 안에 받아야 retry 안 함. 모든 경로에서 200 반환.
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    console.error('[webhook] invalid json body');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const parsed = webhookSchema.safeParse(rawBody);
  if (!parsed.success) {
    console.error('[webhook] schema mismatch:', parsed.error.errors);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // paymentKey 추출 (data.paymentKey 또는 top-level)
  const paymentKey =
    parsed.data.data?.paymentKey ?? parsed.data.paymentKey ?? null;
  const orderId = parsed.data.data?.orderId ?? parsed.data.orderId ?? null;

  if (!paymentKey && !orderId) {
    console.warn('[webhook] missing paymentKey/orderId — ignored');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // Toss API 재조회로 진위 검증
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    console.error('[webhook] TOSS_SECRET_KEY not configured');
    return NextResponse.json({ received: true }, { status: 200 });
  }
  const authHeader = `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`;

  let tossPayment: TossPaymentLookupResponse | null = null;
  try {
    // paymentKey 로 우선 조회 (UNIQUE)
    const lookupKey = paymentKey ?? orderId;
    const res = await fetch(`${TOSS_PAYMENT_LOOKUP_URL}/${lookupKey}`, {
      headers: { Authorization: authHeader },
    });
    if (res.ok) {
      tossPayment = (await res.json()) as TossPaymentLookupResponse;
    } else {
      console.error('[webhook] Toss lookup failed:', res.status);
      return NextResponse.json({ received: true }, { status: 200 });
    }
  } catch (error) {
    console.error('[webhook] Toss lookup error:', error);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  if (!tossPayment || !tossPayment.orderId) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // DB 동기화 (idempotent — order_id 로 조회 후 상태별 update)
  const supabase = createAdminClient();
  const updateBuilder = supabase.from(
    'structure_check_requests'
  ) as unknown as {
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

/**
 * Toss status → DB payment_status 매핑.
 * 알 수 없는 상태는 null (skip).
 */
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
