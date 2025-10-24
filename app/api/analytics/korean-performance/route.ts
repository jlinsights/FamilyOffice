/**
 * Korean Performance Analytics API
 * 한국 시장 성능 분석 데이터 수집 엔드포인트
 */
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface KoreanPerformanceData {
  metrics: any[];
  userBehavior: any;
  timestamp: string;
  timezone: string;
  market: string;
  businessHours: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const data: KoreanPerformanceData = await request.json();
    
    // 요청 헤더에서 추가 정보 수집
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';
    const clientIP = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     'unknown';

    // 한국 시장 특화 성능 데이터 구성
    const performanceData = {
      ...data,
      clientInfo: {
        userAgent,
        referer,
        ip: clientIP,
        isMobile: /Mobile|Android|iPhone|iPad/.test(userAgent),
        isKoreanIP: clientIP.startsWith('1.') || // KT
                    clientIP.startsWith('14.') || // LG U+
                    clientIP.startsWith('27.') || // SK
                    clientIP.startsWith('58.') || // Korea Telecom
                    clientIP.startsWith('59.') || // Korea Telecom
                    clientIP.startsWith('61.'), // Various Korean ISPs
      },
      processed: new Date().toISOString(),
    };

    // 개발 환경에서 콘솔 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('🇰🇷 한국 성능 데이터 수신:', {
        로딩시간: data.metrics?.[0]?.loadTime ? `${data.metrics[0].loadTime.toFixed(0)}ms` : 'N/A',
        폰트로딩: data.metrics?.[0]?.koreanFontLoadTime ? `${data.metrics[0].koreanFontLoadTime.toFixed(0)}ms` : 'N/A',
        비즈니스시간: data.businessHours ? '업무시간' : '업무외시간',
        기기유형: performanceData.clientInfo.isMobile ? '모바일' : '데스크톱',
        세션시간: data.userBehavior?.sessionDuration ? `${(data.userBehavior.sessionDuration / 1000).toFixed(1)}초` : 'N/A',
      });
    }

    // 프로덕션 환경에서는 외부 분석 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      try {
        // Vercel Analytics로 커스텀 이벤트 전송
        await fetch('https://vitals.vercel-insights.com/v1/vitals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'FamilyOffice-Korean-Analytics/1.0',
          },
          body: JSON.stringify({
            dsn: process.env.VERCEL_ANALYTICS_ID,
            id: `korean-perf-${Date.now()}`,
            page: referer,
            href: referer,
            event_name: 'korean_performance',
            url: referer,
            speed: data.metrics?.[0]?.loadTime || 0,
            ttfb: data.metrics?.[0]?.contentDelivery?.apiResponse || 0,
            fcp: data.metrics?.[0]?.renderTime || 0,
            lcp: data.metrics?.[0]?.loadTime || 0,
            fid: data.metrics?.[0]?.interactionDelay || 0,
            cls: 0, // CLS는 별도 수집
            value: data.metrics?.[0]?.loadTime || 0,
          }),
        });

        // Sentry로 성능 메트릭 전송 (선택사항)
        if (process.env.SENTRY_DSN) {
          // Sentry는 자동으로 성능 메트릭을 수집하므로 별도 전송 불필요
        }

      } catch (error) {
        console.warn('외부 분석 서비스 전송 실패:', error);
      }
    }

    // 성능 임계값 체크 및 알림
    const loadTime = data.metrics?.[0]?.loadTime || 0;
    const fontLoadTime = data.metrics?.[0]?.koreanFontLoadTime || 0;
    
    const alerts = [];
    if (loadTime > 5000) {
      alerts.push(`페이지 로딩 시간이 ${(loadTime/1000).toFixed(1)}초로 임계값을 초과했습니다.`);
    }
    if (fontLoadTime > 2000) {
      alerts.push(`한국 폰트 로딩이 ${(fontLoadTime/1000).toFixed(1)}초로 지연되었습니다.`);
    }

    // 응답 반환
    return NextResponse.json({
      success: true,
      processed: true,
      alerts: alerts.length > 0 ? alerts : undefined,
      summary: {
        dataPoints: data.metrics?.length || 0,
        timestamp: data.timestamp,
        market: data.market,
        businessHours: data.businessHours,
      }
    });

  } catch (error) {
    console.error('한국 성능 데이터 처리 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process Korean performance data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET 요청으로 성능 상태 확인
export async function GET() {
  return NextResponse.json({
    service: 'Korean Performance Analytics',
    status: 'active',
    timezone: 'Asia/Seoul',
    businessHours: {
      start: '09:00 KST',
      end: '18:00 KST',
      weekdays: 'Monday-Friday'
    },
    metrics: [
      'Page Load Time',
      'Korean Font Load Time',
      'Mobile Network Performance',
      'Region Latency',
      'Business Hours Performance',
      'API Response Time'
    ],
    supportedMarket: 'Korean',
    version: '1.0.0'
  });
}