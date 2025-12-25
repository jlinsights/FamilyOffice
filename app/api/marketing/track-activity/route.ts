/**
 * 리드 활동 추적 API
 * 웹사이트 방문, 폼 제출, 이메일 참여 등 사용자 행동을 실시간으로 추적
 */
import { NextRequest, NextResponse } from 'next/server';

import { getLeadScoringEngine } from '@/lib/marketing/lead-scoring-engine';
import { globalRateLimit } from '@/lib/rate-limit';
import { logSecurityEvent } from '@/lib/security/security-monitor';

interface TrackingRequest {
  contact_id: string;
  user_id?: string;
  activity_type:
    | 'page_view'
    | 'form_submit'
    | 'email_engagement'
    | 'document_download'
    | 'consultation_request';
  activity_data: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 요청 데이터 파싱
    const body: TrackingRequest = await request.json();
    const { contact_id, user_id, activity_type, activity_data } = body;

    // 3. 필수 필드 검증
    if (!contact_id || !activity_type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'contact_id and activity_type are required',
        },
        { status: 400 }
      );
    }

    // 4. 활동 타입 검증
    const validActivityTypes = [
      'page_view',
      'form_submit',
      'email_engagement',
      'document_download',
      'consultation_request',
    ];

    if (!validActivityTypes.includes(activity_type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid activity type',
          message: `Activity type must be one of: ${validActivityTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // 5. IP 주소 추가 (익명화된 형태로)
    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const enrichedActivityData = {
      ...activity_data,
      ip_address: anonymizeIP(clientIP),
      user_agent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || '',
      timestamp: new Date().toISOString(),
    };

    // 6. 리드 스코어링 엔진으로 활동 추적
    const scoringEngine = getLeadScoringEngine();

    await scoringEngine.trackActivity({
      hubspot_contact_id: contact_id,
      ...(user_id && { user_id }),
      activity_type,
      activity_data: enrichedActivityData,
    });

    // 7. 현재 리드 스코어 조회
    const currentScore = await scoringEngine.getLeadScore(contact_id);

    // 8. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Activity tracked successfully',
      data: {
        contact_id,
        activity_type,
        current_score: currentScore?.total_score || 0,
        score_grade: currentScore?.score_grade || 'D',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('활동 추적 API 오류:', error);

    // 보안 이벤트 로깅
    await logSecurityEvent(
      {
        type: 'data_breach_attempt',
        severity: 'medium',
        description: `Lead activity tracking failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        additional_data: { endpoint: '/api/marketing/track-activity' },
      },
      request
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Activity tracking failed',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : '활동 추적 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * 웹사이트 페이지 뷰 추적 전용 엔드포인트
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const contactId = url.searchParams.get('contact_id');
    const pageUrl = url.searchParams.get('page_url');
    const pageTitle = url.searchParams.get('page_title');
    const sessionId = url.searchParams.get('session_id');

    if (!contactId || !pageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing contact_id or page_url' },
        { status: 400 }
      );
    }

    // Rate limiting
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 페이지 뷰 추적
    const scoringEngine = getLeadScoringEngine();

    await scoringEngine.trackWebActivity({
      contactId,
      pageUrl,
      ...(pageTitle && { pageTitle }),
      ...(sessionId && { sessionId }),
      ...(request.headers.get('referer') && {
        referrer: request.headers.get('referer')!,
      }),
    });

    // 1x1 투명 픽셀 이미지 응답 (트래킹 픽셀용)
    const transparentPixel = Buffer.from([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
      0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00,
      0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
      0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b,
    ]);

    return new Response(transparentPixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Content-Length': transparentPixel.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('페이지 뷰 추적 오류:', error);

    // 오류 발생 시에도 투명 픽셀 반환 (추적 실패로 페이지 로드 방해 방지)
    const transparentPixel = Buffer.from([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
      0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00,
      0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
      0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b,
    ]);

    return new Response(transparentPixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Content-Length': transparentPixel.length.toString(),
      },
    });
  }
}

/**
 * IP 주소 익명화 (GDPR 준수)
 */
function anonymizeIP(ip: string): string {
  if (ip === 'unknown') return ip;

  // IPv4 처리
  if (ip.includes('.') && !ip.includes(':')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }

  // IPv6 처리 (간단한 버전)
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) {
      return `${parts[0]}:${parts[1]}:${parts[2]}:${parts[3]}::`;
    }
  }

  return 'anonymized';
}
