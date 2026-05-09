/**
 * Structure Check Payment Request API
 *
 * POST /api/payments/structure-check/request
 *
 * 자격검증 데이터를 받아 structure_check_requests에 pending 레코드 INSERT,
 * Toss 결제용 orderId/amount 반환.
 *
 * 흐름: 폼 제출 → 본 API → Toss 결제 위젯 → success → confirm API
 */
import { auth } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CONSULTATION_FEE } from '@/lib/constants';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const runtime = 'nodejs';

// 자격검증 + 신청자 정보 — structure_check_requests 컬럼 매핑
const requestSchema = z.object({
  name: z.string().min(2, '성함을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().min(10, '연락처를 입력해주세요'),
  company: z.string().optional(),
  q1_decision_made: z.enum(['yes', 'no']),
  q1_decision_detail: z.string().optional(),
  q2_documented: z.enum(['yes', 'no']),
  q3_authority_clear: z.enum(['clear', 'partial', 'unclear']),
  q4_cash_plan: z.enum(['structure_exists', 'rough_idea', 'not_considered']),
  q5_deadline: z.enum(['within_6m', '1_2y', 'when_needed']),
  q6_concerns: z.array(z.string()).optional(),
  q7_advisors: z.array(z.string()).optional(),
  additional_notes: z.string().optional(),
});

type RequestData = z.infer<typeof requestSchema>;

/**
 * 5문항 자격검증 점수 — "정리되지 않음" 응답 개수 (0-5).
 * 기존 app/api/structure-check/route.ts:calculateQualificationScore와 동일 로직.
 */
function calculateQualificationScore(data: RequestData): number {
  let score = 0;
  if (data.q1_decision_made === 'no') score += 1;
  if (data.q2_documented === 'no') score += 1;
  if (
    data.q3_authority_clear === 'unclear' ||
    data.q3_authority_clear === 'partial'
  ) {
    score += 1;
  }
  if (data.q4_cash_plan === 'not_considered') score += 1;
  if (data.q5_deadline === 'within_6m') score += 1;
  return score;
}

export async function POST(request: NextRequest) {
  // 1) Clerk 인증
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { success: false, error: '로그인이 필요합니다' },
      { status: 401 }
    );
  }

  // 2) Body 검증
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: '잘못된 요청 본문입니다' },
      { status: 400 }
    );
  }

  const parsed = requestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: '입력값 검증 실패',
        details: parsed.error.errors,
      },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // 3) orderId 발급 + 자격 점수 계산
  const orderId = `sc_${nanoid(16)}`;
  const qualificationScore = calculateQualificationScore(data);

  // 4) pending 레코드 INSERT (service_role)
  // Note: Database 타입에 payment 컬럼 미생성 (supabase gen types 후 제거).
  const supabase = createAdminClient();
  const insertPayload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company ?? null,
    q1_decision_made: data.q1_decision_made,
    q1_decision_detail: data.q1_decision_detail ?? null,
    q2_documented: data.q2_documented,
    q3_authority_clear: data.q3_authority_clear,
    q4_cash_plan: data.q4_cash_plan,
    q5_deadline: data.q5_deadline,
    q6_concerns: data.q6_concerns ?? null,
    q7_advisors: data.q7_advisors ?? null,
    additional_notes: data.additional_notes ?? null,
    qualification_score: qualificationScore,
    status: 'pending_review',
    // payment 컬럼 (T3 마이그레이션)
    order_id: orderId,
    payment_status: 'pending',
    clerk_user_id: userId,
  };

  const { error: insertError } = await (
    supabase.from('structure_check_requests') as unknown as {
      insert: (data: typeof insertPayload) => Promise<{ error: unknown }>;
    }
  ).insert(insertPayload);

  if (insertError) {
    console.error('[payments/request] insert failed:', insertError);
    return NextResponse.json(
      { success: false, error: '신청 저장에 실패했습니다' },
      { status: 500 }
    );
  }

  // 5) Toss 위젯에 전달할 결제 파라미터 반환
  return NextResponse.json(
    {
      success: true,
      orderId,
      amount: CONSULTATION_FEE,
      customerKey: userId,
      orderName: '구조 점검 상담 신청',
    },
    { status: 201 }
  );
}
