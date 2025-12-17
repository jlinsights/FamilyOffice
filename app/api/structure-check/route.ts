import {
    sendStructureCheckConfirmation,
    sendSystemNotification
} from '@/lib/email/resend-client';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Request validation schema
const structureCheckRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
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

/**
 * POST /api/structure-check
 * 구조 점검 요청 접수 (Email Only)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = structureCheckRequestSchema.parse(body);

    // Calculate qualification score (자동 필터링 점수)
    const qualificationScore = calculateQualificationScore(validatedData);
    
    // Generate a unique request ID (simple timestamp-based for now)
    const requestId = `REQ-${Date.now().toString(36).toUpperCase()}`;

    // 1. Save to Database (using Admin Client for security override)
    const supabase = createAdminClient();
    const { error: dbError } = await supabase
      .from('structure_check_requests')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        q1_decision_made: validatedData.q1_decision_made,
        q1_decision_detail: validatedData.q1_decision_detail,
        q2_documented: validatedData.q2_documented,
        q3_authority_clear: validatedData.q3_authority_clear,
        q4_cash_plan: validatedData.q4_cash_plan,
        q5_deadline: validatedData.q5_deadline,
        q6_concerns: validatedData.q6_concerns,
        q7_advisors: validatedData.q7_advisors,
        additional_notes: validatedData.additional_notes,
        qualification_score: qualificationScore,
        status: 'pending_review'
      });

    if (dbError) {
      console.error('Failed to save structure check request:', dbError);
      // We continue to send emails even if DB fails, or should we throw?
      // For now, log critical error but try to notify admin via email at least.
    }

    // 2. Send Admin Notification
    const adminMessage = formatAdminMessage(validatedData, qualificationScore, requestId);
    await sendSystemNotification(
      `새로운 구조 점검 요청 (${validatedData.name})`,
      adminMessage,
      qualificationScore >= 3 ? 'warning' : 'info'
    );

    // 2. Send User Confirmation
    const emailResult = await sendStructureCheckConfirmation(
      validatedData.email,
      validatedData.name,
      requestId,
      qualificationScore
    );

    if (!emailResult.success) {
      console.error('User confirmation email failed:', emailResult.error);
      // We still return success to the UI because the admin notification was attempted,
      // and we don't want to show an error to the user if the "admin" side succeeded.
      // Ideally, we'd check both results, but blocking on user email failure might be bad UX if we already notified admin.
    }

    return NextResponse.json(
      {
        success: true,
        message: '구조 점검 요청이 접수되었습니다',
        requestId: requestId,
        qualificationScore,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Structure check request error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: '입력값 검증 실패',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: '요청 처리 중 오류가 발생했습니다',
      },
      { status: 500 }
    );
  }
}

/**
 * Calculate qualification score based on responses
 * 5문항 중 "정리되지 않음" 응답 개수를 계산
 */
function calculateQualificationScore(data: z.infer<typeof structureCheckRequestSchema>): number {
  let score = 0;

  // Q1: 결정 사항 없음 = +1
  if (data.q1_decision_made === 'no') score += 1;

  // Q2: 문서화 안됨 = +1
  if (data.q2_documented === 'no') score += 1;

  // Q3: 권한 불명확 = +1
  if (data.q3_authority_clear === 'unclear' || data.q3_authority_clear === 'partial') {
    score += 1;
  }

  // Q4: 현금 계획 없음 = +1
  if (data.q4_cash_plan === 'not_considered') score += 1;

  // Q5: 긴급도 (6개월 이내면 +1)
  if (data.q5_deadline === 'within_6m') score += 1;

  return score;
}

/**
 * Format message for Admin Email
 */
function formatAdminMessage(
  data: z.infer<typeof structureCheckRequestSchema>, 
  score: number,
  requestId: string
): string {
  return `
[요청 정보]
- ID: ${requestId}
- 이름: ${data.name}
- 이메일: ${data.email}
- 연락처: ${data.phone}
- 회사명: ${data.company || '(미입력)'}
- 점수: ${score}점 (5점 만점)

[필수 질문 응답]
1. 결정 사항: ${data.q1_decision_made === 'yes' ? '예' : '아니오'}
   ${data.q1_decision_detail ? `(상세: ${data.q1_decision_detail})` : ''}
2. 문서화 여부: ${data.q2_documented === 'yes' ? '예' : '아니오'}
3. 의사결정 권한: ${data.q3_authority_clear === 'clear' ? '명확함' : data.q3_authority_clear === 'partial' ? '일부 정리됨' : '불명확'}
4. 현금 마련 계획: ${data.q4_cash_plan === 'structure_exists' ? '구조 있음' : data.q4_cash_plan === 'rough_idea' ? '대략적 생각' : '미고려'}
5. 미뤄도 되는 기한: ${data.q5_deadline === 'within_6m' ? '6개월 이내' : data.q5_deadline === '1_2y' ? '1~2년' : '상황 발생 시'}

[선택 질문 응답]
- 불안 요소: ${data.q6_concerns?.join(', ') || '(없음)'}
- 현재 조력자: ${data.q7_advisors?.join(', ') || '(없음)'}
- 추가 메모: ${data.additional_notes || '(없음)'}
  `.trim();
}
