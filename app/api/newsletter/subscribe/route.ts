import { NextRequest, NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'website', tags = [] } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: '이메일 주소가 필요합니다.' },
        { status: 400 }
      );
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Beehiiv 클라이언트를 통한 구독자 추가
    try {
      const result = await beehiiv.addSubscriber({
        email,
        tags: [...tags, 'familyoffice-blog'],
        utmSource: source,
        utmCampaign: source === 'blog' ? 'blog-subscription' : 'footer_signup',
        utmMedium: 'website',
        referrer: request.headers.get('referer') || undefined,
      });

      // 성공적으로 구독 처리됨
      return NextResponse.json({
        success: true,
        message: '뉴스레터 구독이 완료되었습니다.',
        email: email,
        subscription_id: result.data?.id,
      });
    } catch (beehiivError: any) {
      // 이미 구독된 이메일인 경우 성공으로 처리
      if (beehiivError.message?.includes('already subscribed') || 
          beehiivError.status === 409 || 
          beehiivError.status === 400) {
        return NextResponse.json({
          success: true,
          message: '이미 구독 중인 이메일입니다.',
          email: email,
        });
      }
      
      throw beehiivError;
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: '구독 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
