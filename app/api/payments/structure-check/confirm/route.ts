/**
 * Structure Check Payment Confirm API
 *
 * POST /api/payments/structure-check/confirm
 *
 * Toss success URL 콜백 → 서버에서 결제 승인:
 *   1) DB pending 레코드 조회 + amount 재검증 (변조 차단)
 *   2) Toss /v1/payments/confirm 호출 (server-only secret key)
 *   3) 성공 시 DB payment_status='paid' UPDATE
 *   4) Idempotent: 이미 paid면 동일 응답
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CONSULTATION_FEE } from '@/lib/constants';
import {
  sendStructureCheckConfirmation,
  sendSystemNotification,
} from '@/lib/email/resend-client';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const runtime = 'nodejs';

const TOSS_CONFIRM_URL = 'https://api.tosspayments.com/v1/payments/confirm';

const confirmSchema = z.object({
  paymentKey: z.string().min(1),
  orderId: z.string().min(1),
  amount: z.number().int().positive(),
});

interface TossConfirmResponse {
  paymentKey: string;
  orderId: string;
  totalAmount: number;
  status: string;
  method?: string;
  approvedAt?: string;
  [key: string]: unknown;
}

interface TossErrorResponse {
  code: string;
  message: string;
}

export async function POST(request: NextRequest) {
  // 1) Body 검증
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: '잘못된 요청 본문입니다' },
      { status: 400 }
    );
  }

  const parsed = confirmSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'paymentKey/orderId/amount 검증 실패' },
      { status: 400 }
    );
  }
  const { paymentKey, orderId, amount } = parsed.data;

  // 2) DB pending 레코드 조회 — 서버 사이드 amount 재검증 (변조 차단)
  const supabase = createAdminClient();
  const { data: pendingRecord, error: fetchError } = await (supabase
    .from('structure_check_requests')
    .select(
      'id, order_id, payment_status, payment_key, paid_amount, paid_at, payment_method, name, email, qualification_score'
    )
    .eq('order_id', orderId)
    .single() as unknown as Promise<{
    data: {
      id: string;
      order_id: string;
      payment_status: string;
      payment_key: string | null;
      paid_amount: number | null;
      paid_at: string | null;
      payment_method: string | null;
      name: string;
      email: string;
      qualification_score: number;
    } | null;
    error: unknown;
  }>);

  if (fetchError || !pendingRecord) {
    console.error('[payments/confirm] order not found:', orderId, fetchError);
    return NextResponse.json(
      { success: false, error: '주문을 찾을 수 없습니다' },
      { status: 404 }
    );
  }

  // 3) Idempotent: 이미 paid이면 동일 응답
  if (pendingRecord.payment_status === 'paid') {
    return NextResponse.json(
      {
        success: true,
        idempotent: true,
        orderId: pendingRecord.order_id,
        paymentKey: pendingRecord.payment_key,
        amount: pendingRecord.paid_amount,
      },
      { status: 200 }
    );
  }

  // 4) Amount 재검증 — 클라이언트 변조 방지 (DB는 항상 CONSULTATION_FEE)
  if (amount !== CONSULTATION_FEE) {
    console.error('[payments/confirm] amount mismatch — possible tampering:', {
      orderId,
      clientAmount: amount,
      expected: CONSULTATION_FEE,
    });
    return NextResponse.json(
      { success: false, error: '결제 금액이 올바르지 않습니다' },
      { status: 400 }
    );
  }

  // 5) Toss /v1/payments/confirm 호출
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    console.error('[payments/confirm] TOSS_SECRET_KEY not configured');
    return NextResponse.json(
      { success: false, error: '결제 서버 설정 오류' },
      { status: 500 }
    );
  }

  // Toss Basic Auth: base64(secretKey + ':')
  const authHeader = `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`;

  let tossResponse: TossConfirmResponse | TossErrorResponse;
  let tossOk = false;
  try {
    const res = await fetch(TOSS_CONFIRM_URL, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });
    tossOk = res.ok;
    tossResponse = (await res.json()) as
      | TossConfirmResponse
      | TossErrorResponse;
  } catch (error) {
    console.error('[payments/confirm] Toss request failed:', error);
    await updateFailed(supabase, orderId);
    return NextResponse.json(
      { success: false, error: 'Toss 결제 승인 요청 실패' },
      { status: 502 }
    );
  }

  if (!tossOk) {
    const errResp = tossResponse as TossErrorResponse;
    console.error('[payments/confirm] Toss rejected:', errResp);
    await updateFailed(supabase, orderId);
    return NextResponse.json(
      {
        success: false,
        error: errResp.message ?? 'Toss 결제 승인 거부',
        code: errResp.code,
      },
      { status: 400 }
    );
  }

  // 6) DB UPDATE: paid
  const successResp = tossResponse as TossConfirmResponse;
  const updateBuilder = supabase.from(
    'structure_check_requests'
  ) as unknown as {
    update: (data: Record<string, unknown>) => {
      eq: (
        col: string,
        val: string
      ) => {
        eq: (col: string, val: string) => Promise<{ error: unknown }>;
      };
    };
  };
  const { error: updateError } = await updateBuilder
    .update({
      payment_status: 'paid',
      payment_key: paymentKey,
      paid_amount: successResp.totalAmount,
      paid_at: successResp.approvedAt ?? new Date().toISOString(),
      payment_method: successResp.method ?? null,
    })
    .eq('order_id', orderId)
    .eq('payment_status', 'pending');

  if (updateError) {
    console.error('[payments/confirm] DB update failed:', updateError);
    // Toss는 승인됐으나 DB 갱신 실패 — webhook 에서 보상되어야 함
    return NextResponse.json(
      {
        success: false,
        error: 'DB 갱신 실패 (결제는 승인됨, 잠시 후 재시도)',
      },
      { status: 500 }
    );
  }

  // 7) 이메일 알림 (best-effort, 응답 차단 X)
  void sendPaymentEmails({
    userEmail: pendingRecord.email,
    userName: pendingRecord.name,
    orderId,
    qualificationScore: pendingRecord.qualification_score,
    amount: successResp.totalAmount,
  }).catch(err =>
    console.error('[payments/confirm] email dispatch failed:', err)
  );

  return NextResponse.json(
    {
      success: true,
      orderId,
      paymentKey,
      amount: successResp.totalAmount,
      method: successResp.method,
      approvedAt: successResp.approvedAt,
    },
    { status: 200 }
  );
}

/**
 * 결제 완료 영수증(사용자) + 관리자 알림 발송.
 * 응답을 차단하지 않도록 fire-and-forget 으로 호출.
 */
async function sendPaymentEmails(args: {
  userEmail: string;
  userName: string;
  orderId: string;
  qualificationScore: number;
  amount: number;
}): Promise<void> {
  const { userEmail, userName, orderId, qualificationScore, amount } = args;

  await Promise.allSettled([
    sendStructureCheckConfirmation(
      userEmail,
      userName,
      orderId,
      qualificationScore
    ),
    sendSystemNotification(
      `[결제 완료] 구조 점검 상담 신청 (${userName})`,
      [
        `주문번호: ${orderId}`,
        `신청자: ${userName} <${userEmail}>`,
        `자격 점수: ${qualificationScore}/5`,
        `결제 금액: ${amount.toLocaleString('ko-KR')}원 (VAT 포함)`,
      ].join('\n'),
      qualificationScore >= 3 ? 'warning' : 'info'
    ),
  ]);
}

/**
 * 결제 실패 시 DB payment_status='failed' UPDATE.
 * 실패해도 흐름 막지 않음 (best-effort).
 */
async function updateFailed(
  supabase: ReturnType<typeof createAdminClient>,
  orderId: string
): Promise<void> {
  const updateBuilder = supabase.from(
    'structure_check_requests'
  ) as unknown as {
    update: (data: Record<string, unknown>) => {
      eq: (
        col: string,
        val: string
      ) => {
        eq: (col: string, val: string) => Promise<{ error: unknown }>;
      };
    };
  };
  await updateBuilder
    .update({ payment_status: 'failed' })
    .eq('order_id', orderId)
    .eq('payment_status', 'pending');
}
