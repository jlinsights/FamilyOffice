/**
 * Consultation Form API
 *
 * POST /api/consultations
 *
 * Receives consultation requests from the public form and saves to Supabase.
 * Includes honeypot and timestamp-based bot defense.
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const consultationSchema = z.object({
  name: z.string().min(1, '성함을 입력해주세요.').max(100),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
  phone: z
    .string()
    .min(1, '연락처를 입력해주세요.')
    .regex(/^[0-9\-+\s()]+$/, '올바른 전화번호 형식을 입력해주세요.'),
  service_type: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  _hp: z.string().optional(), // 허니팟 (봇 감지)
  _ts: z.number().optional(), // 폼 로드 타임스탬프 (속도 검증)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Zod 유효성 검사
    const parsed = consultationSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? '유효하지 않은 요청입니다.';
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, phone, service_type, message, _hp, _ts } =
      parsed.data;

    // 봇 방어: 허니팟 필드가 채워져 있으면 봇으로 간주
    if (_hp) {
      return NextResponse.json({
        success: true,
        message: '상담 신청이 완료되었습니다.',
      });
    }

    // 봇 방어: 2초 미만 제출은 봇으로 간주
    if (_ts && Date.now() - _ts < 2000) {
      return NextResponse.json({
        success: true,
        message: '상담 신청이 완료되었습니다.',
      });
    }

    // Supabase에 저장
    const supabase = await createClient();
    // Note: Database 타입 미생성으로 타입 단언 필요 (supabase gen types 실행 후 제거 가능)
    const consultations = supabase.from('consultations') as any;

    const { error: insertError } = await consultations.insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service_type: service_type || null,
      message: message?.trim() || null,
      status: 'pending',
    });

    if (insertError) {
      console.error('Failed to insert consultation:', insertError);
      return NextResponse.json(
        {
          success: false,
          error: '상담 신청 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '상담 신청이 완료되었습니다.',
    });
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}
