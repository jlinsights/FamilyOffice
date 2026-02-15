/**
 * 이메일 시스템 상태 확인 API
 * GET /api/email/status
 */
import { NextResponse } from 'next/server';
import { logger } from '@/lib/debug-logger';
import { resend } from '@/lib/email/resend-client';
import { env } from '@/lib/env';

export async function GET() {
  try {
    const apiKey = (env as any).RESEND_API_KEY || process.env.RESEND_API_KEY;
    const fromEmail =
      (env as any).NEXT_PUBLIC_RESEND_FROM_EMAIL ||
      process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL;

    const status: any = {
      configured: !!apiKey,
      domain: fromEmail || 'noreply@email.familyoffices.vip',
      timestamp: new Date().toISOString(),
    };

    // API 키가 설정되어 있으면 도메인 상태 확인
    if (apiKey) {
      try {
        // 도메인 목록 조회로 연결 테스트
        const domains = await resend.domains.list();
        status.apiConnected = !!domains.data;
        status.domainsCount = Array.isArray(domains.data)
          ? domains.data.length
          : 0;
      } catch (error) {
        logger.warn('Resend API 연결 테스트 실패:', error);
        status.apiConnected = false;
        status.error =
          error instanceof Error ? error.message : 'API connection failed';
      }
    } else {
      status.apiConnected = false;
      status.error = 'RESEND_API_KEY not configured';
    }

    return NextResponse.json(status);
  } catch (error) {
    logger.error('이메일 상태 확인 중 오류:', error);
    return NextResponse.json(
      {
        configured: false,
        error: '상태 확인 중 오류가 발생했습니다',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
