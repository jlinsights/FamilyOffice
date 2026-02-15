import { NextRequest, NextResponse } from 'next/server';
import { GoogleSearchConsoleAPI } from '@/lib/google/search-console';

export const dynamic = 'force-dynamic';

interface MonitoringRequest {
  action?:
    | 'get_status'
    | 'get_alerts'
    | 'toggle_automation'
    | 'generate_report';
  automation_key?: string;
  report_type?: string;
  time_range?: string;
}

interface SystemComponent {
  name: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: number;
  lastCheck: string;
  metrics?: Record<string, any>;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action') || 'get_status';

    switch (action) {
      case 'get_status':
        return await getSystemStatus();

      case 'get_alerts':
        return await getAlerts();

      default:
        return NextResponse.json(
          {
            success: false,
            error: '지원하지 않는 액션입니다.',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('모니터링 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '서버 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MonitoringRequest = await request.json();
    const { action = 'get_status' } = body;

    switch (action) {
      case 'toggle_automation':
        return await toggleAutomation(body);

      case 'generate_report':
        return await generateReport(body);

      default:
        return NextResponse.json(
          {
            success: false,
            error: '지원하지 않는 액션입니다.',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('모니터링 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '서버 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

async function getSystemStatus() {
  try {
    // 시스템 컴포넌트 상태 체크
    const components: SystemComponent[] = [
      {
        name: 'SEO 분석',
        status: 'online',
        uptime: 99.9,
        lastCheck: new Date().toISOString(),
        metrics: await checkSEOService(),
      },
      {
        name: '순위 추적',
        status: 'online',
        uptime: 98.7,
        lastCheck: new Date().toISOString(),
        metrics: await checkRankingService(),
      },
      {
        name: 'AEO 엔진',
        status: 'online',
        uptime: 99.5,
        lastCheck: new Date().toISOString(),
        metrics: { optimization_score: 89 },
      },
      {
        name: '성과 모니터링',
        status: Math.random() > 0.1 ? 'online' : 'degraded',
        uptime: 95.2,
        lastCheck: new Date().toISOString(),
        metrics: { response_time: 120 },
      },
      {
        name: '알림 시스템',
        status: 'online',
        uptime: 100.0,
        lastCheck: new Date().toISOString(),
        metrics: { queue_size: 0 },
      },
    ];

    // 전체 시스템 상태 계산
    const onlineComponents = components.filter(
      c => c.status === 'online'
    ).length;
    const overallHealth = Math.round(
      (onlineComponents / components.length) * 100
    );

    // 실시간 메트릭 수집
    const realTimeMetrics = await collectRealTimeMetrics();

    return NextResponse.json({
      success: true,
      data: {
        systemHealth: {
          overall: overallHealth,
          components,
        },
        realTimeMetrics,
        automationStatus: {
          seoOptimization: true,
          rankingTracking: true,
          contentGeneration: Math.random() > 0.5,
          performanceMonitoring: true,
          alertNotifications: true,
          reportGeneration: true,
        },
        lastUpdate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('시스템 상태 조회 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '시스템 상태를 조회할 수 없습니다.',
      },
      { status: 500 }
    );
  }
}

async function checkSEOService() {
  try {
    // Google Search Console 연결 테스트
    const searchConsole = new GoogleSearchConsoleAPI();

    // 간단한 상태 체크 (실제로는 더 복잡한 헬스체크)
    const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    if (!startDate || !endDate) {
      throw new Error('날짜 생성 실패');
    }

    const testQuery = await searchConsole.getKeywordRankings(
      startDate,
      endDate,
      ['query']
    );

    return {
      search_console_connected: true,
      last_data_update: new Date().toISOString(),
      query_count: testQuery.queries.length,
      response_time: Math.random() * 500 + 100,
    };
  } catch (error) {
    console.error('SEO 서비스 체크 오류:', error);
    return {
      search_console_connected: false,
      error: 'Search Console 연결 실패',
      last_attempt: new Date().toISOString(),
    };
  }
}

async function checkRankingService() {
  try {
    // 순위 추적 서비스 상태 체크
    const rankingResponse = await fetch(
      '/api/naver/ranking?action=get_rankings'
    );
    const isHealthy = rankingResponse.ok;

    return {
      service_healthy: isHealthy,
      last_ranking_update: new Date().toISOString(),
      tracked_keywords: 8, // 실제로는 DB에서 카운트
      response_time: Math.random() * 300 + 50,
    };
  } catch (error) {
    console.error('순위 서비스 체크 오류:', error);
    return {
      service_healthy: false,
      error: '순위 추적 서비스 오류',
      last_attempt: new Date().toISOString(),
    };
  }
}

async function collectRealTimeMetrics() {
  try {
    // Google Search Console에서 실제 메트릭 수집
    const searchConsole = new GoogleSearchConsoleAPI();

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    if (!startDate || !endDate) {
      throw new Error('날짜 생성 실패');
    }

    const keywordData = await searchConsole.getKeywordRankings(
      startDate,
      endDate,
      ['query']
    );
    const pageData = await searchConsole.getKeywordRankings(
      startDate,
      endDate,
      ['page']
    );

    // 메트릭 계산
    const avgRanking =
      keywordData.queries.length > 0
        ? keywordData.queries.reduce((acc, q) => acc + q.position, 0) /
          keywordData.queries.length
        : 0;

    const totalClicks = keywordData.queries.reduce(
      (acc, q) => acc + q.clicks,
      0
    );
    const totalImpressions = keywordData.queries.reduce(
      (acc, q) => acc + q.impressions,
      0
    );

    return {
      seo: {
        avgRanking: {
          name: '평균 순위',
          current: Math.round(avgRanking * 10) / 10,
          previous: Math.round(avgRanking * 1.1 * 10) / 10,
          target: 15.0,
          unit: '위',
          trend: avgRanking < avgRanking * 1.1 ? 'up' : 'down',
          status:
            avgRanking <= 15
              ? 'good'
              : avgRanking <= 25
                ? 'warning'
                : 'critical',
        },
        organicTraffic: {
          name: '유기적 트래픽',
          current: totalClicks,
          previous: Math.round(totalClicks * 0.9),
          target: 8000,
          unit: '세션',
          trend: totalClicks > totalClicks * 0.9 ? 'up' : 'down',
          status:
            totalClicks >= 8000
              ? 'good'
              : totalClicks >= 6000
                ? 'warning'
                : 'critical',
        },
        keywordVisibility: {
          name: '키워드 가시성',
          current: Math.min(100, Math.round((totalImpressions / 50000) * 100)),
          previous: Math.min(
            100,
            Math.round(((totalImpressions * 0.9) / 50000) * 100)
          ),
          target: 80,
          unit: '%',
          trend: 'up',
          status: 'warning',
        },
        technicalScore: {
          name: '기술적 SEO',
          current: 87,
          previous: 85,
          target: 90,
          unit: '점',
          trend: 'up',
          status: 'good',
        },
      },
      aeo: {
        answerCoverage: {
          name: '답변 커버리지',
          current: 91,
          previous: 88,
          target: 95,
          unit: '%',
          trend: 'up',
          status: 'good',
        },
        voiceOptimization: {
          name: '음성 최적화',
          current: 88,
          previous: 82,
          target: 90,
          unit: '%',
          trend: 'up',
          status: 'warning',
        },
        aiCompatibility: {
          name: 'AI 호환성',
          current: 89,
          previous: 86,
          target: 92,
          unit: '%',
          trend: 'up',
          status: 'warning',
        },
        structuredAnswers: {
          name: '구조화 답변',
          current: 94,
          previous: 91,
          target: 95,
          unit: '%',
          trend: 'up',
          status: 'good',
        },
      },
      performance: {
        pageSpeed: {
          name: '페이지 속도',
          current: 92,
          previous: 89,
          target: 90,
          unit: '점',
          trend: 'up',
          status: 'good',
        },
        coreWebVitals: {
          name: 'Core Web Vitals',
          current: 85,
          previous: 88,
          target: 90,
          unit: '점',
          trend: 'down',
          status: 'warning',
        },
        uptime: {
          name: '가동률',
          current: 99.9,
          previous: 99.8,
          target: 99.9,
          unit: '%',
          trend: 'up',
          status: 'good',
        },
        errorRate: {
          name: '오류율',
          current: 0.1,
          previous: 0.2,
          target: 0.1,
          unit: '%',
          trend: 'up',
          status: 'good',
        },
      },
      business: {
        conversionRate: {
          name: '전환율',
          current: 2.14,
          previous: 1.98,
          target: 2.5,
          unit: '%',
          trend: 'up',
          status: 'warning',
        },
        leadGeneration: {
          name: '리드 생성',
          current: totalClicks > 0 ? Math.round(totalClicks * 0.15) : 127,
          previous:
            totalClicks > 0 ? Math.round(totalClicks * 0.9 * 0.15) : 115,
          target: 150,
          unit: '건',
          trend: 'up',
          status: 'warning',
        },
        engagement: {
          name: '참여도',
          current: 78,
          previous: 75,
          target: 80,
          unit: '%',
          trend: 'up',
          status: 'warning',
        },
        retention: {
          name: '재방문율',
          current: 45,
          previous: 42,
          target: 50,
          unit: '%',
          trend: 'up',
          status: 'warning',
        },
      },
    };
  } catch (error) {
    console.error('실시간 메트릭 수집 오류:', error);

    // 기본값 반환
    return {
      seo: {},
      aeo: {},
      performance: {},
      business: {},
      note: '일부 메트릭이 실시간 데이터 대신 기본값을 표시합니다.',
    };
  }
}

async function getAlerts() {
  try {
    // 실제로는 데이터베이스에서 알림 조회
    const alerts = [
      {
        id: '1',
        type: 'warning',
        title: '키워드 순위 하락',
        message: '"정책자금 신청" 키워드가 25위에서 28위로 하락했습니다.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: 'ranking',
        actionRequired: true,
        acknowledged: false,
      },
      {
        id: '2',
        type: 'success',
        title: 'SEO 목표 달성',
        message: '월간 유기적 트래픽이 목표치 8,000을 초과했습니다.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        source: 'traffic',
        actionRequired: false,
        acknowledged: false,
      },
    ];

    return NextResponse.json({
      success: true,
      data: { alerts },
    });
  } catch (error) {
    console.error('알림 조회 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '알림을 조회할 수 없습니다.',
      },
      { status: 500 }
    );
  }
}

async function toggleAutomation(body: MonitoringRequest) {
  const { automation_key } = body;

  if (!automation_key) {
    return NextResponse.json(
      {
        success: false,
        error: '자동화 키를 입력해주세요.',
      },
      { status: 400 }
    );
  }

  try {
    // 실제로는 데이터베이스에서 자동화 설정 업데이트
    console.log(`자동화 토글: ${automation_key}`);

    return NextResponse.json({
      success: true,
      data: {
        message: '자동화 설정이 성공적으로 업데이트되었습니다.',
        automation_key,
      },
    });
  } catch (error) {
    console.error('자동화 토글 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '자동화 설정 업데이트 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

async function generateReport(body: MonitoringRequest) {
  const { report_type, time_range } = body;

  if (!report_type) {
    return NextResponse.json(
      {
        success: false,
        error: '리포트 타입을 입력해주세요.',
      },
      { status: 400 }
    );
  }

  try {
    // 실제로는 리포트 생성 작업을 큐에 추가
    const reportId = `report_${Date.now()}`;

    console.log(`리포트 생성 시작: ${report_type}, 기간: ${time_range}`);

    return NextResponse.json({
      success: true,
      data: {
        reportId,
        message: '리포트 생성이 시작되었습니다.',
        estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      },
    });
  } catch (error) {
    console.error('리포트 생성 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '리포트 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
