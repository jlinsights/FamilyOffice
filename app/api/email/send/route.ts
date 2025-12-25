/**
 * 이메일 전송 API 엔드포인트
 * POST /api/email/send
 */
import { z } from 'zod';

import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';

import { logger } from '@/lib/debug-logger';
import {
  sendEmail,
  sendConsultationConfirmation,
  sendNewsletterWelcome,
} from '@/lib/email/resend-client';

// 이메일 전송 요청 스키마
const emailRequestSchema = z.object({
  type: z.enum(['consultation', 'newsletter', 'custom']),
  to: z.string().email(),
  data: z
    .object({
      name: z.string().optional(),
      consultationType: z.string().optional(),
      consultationDate: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 인증 확인 (관리자 권한 필요)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    // 요청 데이터 검증
    const body = await request.json();
    const validatedData = emailRequestSchema.parse(body);

    const { type, to, data } = validatedData;

    let result;

    switch (type) {
      case 'consultation':
        if (!data?.name || !data?.consultationType || !data?.consultationDate) {
          return NextResponse.json(
            { error: '상담 정보가 부족합니다' },
            { status: 400 }
          );
        }

        result = await sendConsultationConfirmation(
          to,
          data.name,
          data.consultationDate,
          data.consultationType
        );
        break;

      case 'newsletter':
        result = await sendNewsletterWelcome(to, data?.name);
        break;

      case 'custom':
        if (!data?.subject || !data?.message) {
          return NextResponse.json(
            { error: '제목과 메시지가 필요합니다' },
            { status: 400 }
          );
        }

        result = await sendEmail({
          to,
          subject: data.subject,
          html: `
            <html>
              <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>패밀리오피스 S</h2>
                <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 14px;">
                  © 2024 패밀리오피스 S. All rights reserved.
                </p>
              </body>
            </html>
          `,
        });
        break;

      default:
        return NextResponse.json(
          { error: '지원하지 않는 이메일 타입입니다' },
          { status: 400 }
        );
    }

    if (result.success) {
      logger.info('이메일 전송 성공:', { type, to, id: result.id });
      return NextResponse.json({
        success: true,
        id: result.id,
        message: '이메일이 성공적으로 전송되었습니다',
      });
    } else {
      logger.error('이메일 전송 실패:', { type, to, error: result.error });
      return NextResponse.json(
        { error: result.error || '이메일 전송에 실패했습니다' },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error('이메일 API 오류:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '요청 데이터가 유효하지 않습니다', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Resend 이메일 API',
    endpoints: [
      'POST /api/email/send - 이메일 전송',
      'GET /api/email/status - 시스템 상태',
    ],
    domain: 'email.familyoffices.vip',
  });
}
