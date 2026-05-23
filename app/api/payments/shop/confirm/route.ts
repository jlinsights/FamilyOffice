import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import {
  sendStructureCheckConfirmation,
  sendSystemNotification,
} from '@/lib/email/resend-client';
import { markOrderPaid } from '@/lib/shop/orders';
import { confirmInputSchema } from '@/lib/shop/schemas';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const runtime = 'nodejs';

const TOSS_CONFIRM_URL = 'https://api.tosspayments.com/v1/payments/confirm';

interface TossOk {
  paymentKey: string;
  orderId: string;
  totalAmount: number;
  status: string;
  method?: string;
  approvedAt?: string;
}

interface TossErr {
  code: string;
  message: string;
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: '로그인이 필요합니다' },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: '잘못된 요청 본문' },
      { status: 400 }
    );
  }
  const parsed = confirmInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'paymentKey/orderId/amount 검증 실패' },
      { status: 400 }
    );
  }
  const { paymentKey, orderId, amount } = parsed.data;

  const supabase = createAdminClient();
  const { data: order, error: fetchErr } = await supabase
    .from('shop_orders')
    .select(
      'id, order_id, user_id, product_id, amount, payment_status, payment_key, paid_amount, buyer_name, buyer_email'
    )
    .eq('order_id', orderId)
    .eq('user_id', user.id)
    .single();

  if (fetchErr || !order) {
    return NextResponse.json(
      { success: false, error: '주문을 찾을 수 없습니다' },
      { status: 404 }
    );
  }
  const o = order as {
    order_id: string;
    user_id: string;
    product_id: string;
    amount: number;
    payment_status: string;
    payment_key: string | null;
    paid_amount: number | null;
    buyer_name: string;
    buyer_email: string;
  };

  if (o.payment_status === 'paid') {
    return NextResponse.json({
      success: true,
      idempotent: true,
      orderId: o.order_id,
      paymentKey: o.payment_key,
      amount: o.paid_amount,
    });
  }

  if (amount !== o.amount) {
    console.error('[shop/confirm] amount mismatch', {
      orderId,
      client: amount,
      expected: o.amount,
    });
    return NextResponse.json(
      { success: false, error: '결제 금액이 올바르지 않습니다' },
      { status: 400 }
    );
  }

  const secret = process.env.TOSS_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { success: false, error: '결제 서버 설정 오류' },
      { status: 500 }
    );
  }
  const auth = `Basic ${Buffer.from(`${secret}:`).toString('base64')}`;

  let tossOk = false;
  let tossJson: TossOk | TossErr;
  try {
    const res = await fetch(TOSS_CONFIRM_URL, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });
    tossOk = res.ok;
    tossJson = (await res.json()) as TossOk | TossErr;
  } catch (err) {
    console.error('[shop/confirm] Toss request failed:', err);
    return NextResponse.json(
      { success: false, error: 'Toss 승인 요청 실패' },
      { status: 502 }
    );
  }

  if (!tossOk) {
    const e = tossJson as TossErr;
    return NextResponse.json(
      { success: false, error: e.message ?? '결제 승인 거부', code: e.code },
      { status: 400 }
    );
  }
  const ok = tossJson as TossOk;
  if (ok.totalAmount !== amount) {
    console.error('[shop/confirm] Toss totalAmount mismatch', {
      client: amount,
      toss: ok.totalAmount,
    });
    return NextResponse.json(
      { success: false, error: 'Toss 응답 금액 불일치' },
      { status: 500 }
    );
  }

  const result = await markOrderPaid(supabase, {
    orderId: o.order_id,
    productId: o.product_id,
    paymentKey: ok.paymentKey,
    totalAmount: ok.totalAmount,
    approvedAt: ok.approvedAt ?? new Date().toISOString(),
    method: ok.method ?? null,
  });
  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error: 'DB 갱신 실패 (결제 승인됨, webhook 보정 예정)',
      },
      { status: 500 }
    );
  }

  void Promise.allSettled([
    sendStructureCheckConfirmation(
      o.buyer_email,
      o.buyer_name,
      o.order_id,
      0
    ),
    sendSystemNotification(
      `[Shop 결제] ${o.buyer_name} ${ok.totalAmount.toLocaleString('ko-KR')}원`,
      [
        `orderId: ${o.order_id}`,
        `paymentKey: ${ok.paymentKey.slice(-4)}`,
        `method: ${ok.method ?? '-'}`,
      ].join('\n'),
      'info'
    ),
  ]).catch(err => console.error('[shop/confirm] email dispatch:', err));

  return NextResponse.json({
    success: true,
    orderId,
    paymentKey,
    amount: ok.totalAmount,
    method: ok.method,
    approvedAt: ok.approvedAt,
  });
}
