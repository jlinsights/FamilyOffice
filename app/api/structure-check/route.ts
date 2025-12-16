import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
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
 * 구조 점검 요청 접수
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = structureCheckRequestSchema.parse(body);

    // Create Supabase client
    const supabase = await createClient();

    // Calculate qualification score (자동 필터링 점수)
    const qualificationScore = calculateQualificationScore(validatedData);

    // Insert into structure_check_requests table
    const { data, error } = await supabase
      .from('structure_check_requests')
      .insert({
        // Contact info
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,

        // Required questions
        q1_decision_made: validatedData.q1_decision_made,
        q1_decision_detail: validatedData.q1_decision_detail,
        q2_documented: validatedData.q2_documented,
        q3_authority_clear: validatedData.q3_authority_clear,
        q4_cash_plan: validatedData.q4_cash_plan,
        q5_deadline: validatedData.q5_deadline,

        // Optional questions
        q6_concerns: validatedData.q6_concerns,
        q7_advisors: validatedData.q7_advisors,
        additional_notes: validatedData.additional_notes,

        // Auto-calculated fields
        qualification_score: qualificationScore,
        status: qualificationScore >= 3 ? 'pending_review' : 'low_priority',

        // Metadata
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    // TODO: Send automatic response email
    // await sendConfirmationEmail(validatedData.email, data.id);

    return NextResponse.json(
      {
        success: true,
        message: '구조 점검 요청이 접수되었습니다',
        requestId: data.id,
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
 * GET /api/structure-check
 * Admin: 구조 점검 요청 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const supabase = await createClient();

    let query = supabase
      .from('structure_check_requests')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase select error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      requests: data,
      count: data.length,
    });
  } catch (error) {
    console.error('Structure check list error:', error);

    return NextResponse.json(
      {
        success: false,
        message: '요청 목록 조회 중 오류가 발생했습니다',
      },
      { status: 500 }
    );
  }
}
