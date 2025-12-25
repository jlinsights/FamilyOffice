import { NextRequest, NextResponse } from 'next/server';

import {
  validateApiRequest,
  createValidationErrorResponse,
  createApiResponse,
  createErrorResponse,
  newsletterSubscribeSchema,
} from '@/lib/api-validation';
import { beehiiv } from '@/lib/beehiiv/client';

export async function POST(request: NextRequest) {
  try {
    // 입력값 검증
    const validation = await validateApiRequest(
      request,
      newsletterSubscribeSchema,
      'body'
    );

    if (!validation.success) {
      return createValidationErrorResponse(validation);
    }

    const { email, source, tags, utmSource, utmCampaign, utmMedium } =
      validation.data!;

    // Beehiiv 클라이언트를 통한 구독자 추가
    try {
      const subscriberData: any = {
        email,
        tags: [...(tags || []), 'familyoffice-blog'],
        utmSource: utmSource || source,
        utmCampaign:
          utmCampaign ||
          (source === 'blog' ? 'blog-subscription' : 'footer_signup'),
        utmMedium: utmMedium || 'website',
        referrer: request.headers.get('referer') || '',
      };

      const result = await beehiiv.addSubscriber(subscriberData);

      // 성공적으로 구독 처리됨
      return createApiResponse(
        {
          email,
          subscription_id: result.data?.id,
        },
        '뉴스레터 구독이 완료되었습니다.'
      );
    } catch (beehiivError: any) {
      // 이미 구독된 이메일인 경우 성공으로 처리
      if (
        beehiivError.message?.includes('already subscribed') ||
        beehiivError.status === 409 ||
        beehiivError.status === 400
      ) {
        return createApiResponse(
          {
            email,
          },
          '이미 구독 중인 이메일입니다.'
        );
      }

      throw beehiivError;
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return createErrorResponse(
      '구독 처리 중 오류가 발생했습니다.',
      'SUBSCRIPTION_ERROR',
      500,
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}
