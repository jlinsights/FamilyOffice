/**
 * Core Web Vitals API 엔드포인트
 * GET /api/web-vitals - 웹 바이탈 성능 데이터 조회
 * DELETE /api/web-vitals - 웹 바이탈 데이터 초기화
 */
import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPermissions } from '@/lib/admin-permissions';
import { 
  getWebVitalsAnalytics, 
  getPerformanceAlerts, 
  clearWebVitalsData,
  exportWebVitalsData 
} from '@/lib/core-web-vitals';

export async function GET(request: NextRequest) {
  try {
    // 관리자 권한 확인 (웹 바이탈 데이터는 관리자만 조회 가능)
    const hasPermission = await checkAdminPermissions();
    if (!hasPermission) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: '관리자 권한이 필요합니다.'
        },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'full';
    const timeWindow = url.searchParams.get('timeWindow');
    
    // 시간 윈도우 설정 (기본값: 24시간)
    const timeWindowMs = timeWindow ? 
      parseInt(timeWindow) * 60 * 60 * 1000 : 
      24 * 60 * 60 * 1000;

    if (format === 'alerts') {
      // 성능 알림만 반환
      const alerts = getPerformanceAlerts();
      return NextResponse.json({
        success: true,
        data: {
          alerts,
          hasAlerts: alerts.length > 0,
          alertCount: alerts.length,
          timestamp: Date.now(),
        },
      });
    }

    if (format === 'export') {
      // 전체 데이터 내보내기
      const exportData = exportWebVitalsData();
      return NextResponse.json({
        success: true,
        data: exportData,
      });
    }

    if (format === 'summary') {
      // 요약 정보만 반환
      const analytics = getWebVitalsAnalytics(timeWindowMs);
      return NextResponse.json({
        success: true,
        data: {
          summary: analytics.summary,
          timestamp: Date.now(),
          timeWindowHours: timeWindowMs / (1000 * 60 * 60),
        },
      });
    }

    // 전체 분석 정보
    const [analytics, alerts] = await Promise.all([
      Promise.resolve(getWebVitalsAnalytics(timeWindowMs)),
      Promise.resolve(getPerformanceAlerts()),
    ]);

    // 성능 등급 계산
    const performanceGrade = getPerformanceGrade(analytics.summary.performanceScore);
    
    // 개선 권장사항 생성
    const recommendations = generateRecommendations(analytics, alerts);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          performanceScore: analytics.summary.performanceScore,
          performanceGrade,
          totalSamples: analytics.summary.totalSamples,
          hasAlerts: alerts.length > 0,
          alertCount: alerts.length,
          timestamp: Date.now(),
        },
        analytics,
        alerts,
        recommendations,
        metadata: {
          timeWindowMs,
          timeWindowHours: timeWindowMs / (1000 * 60 * 60),
          generatedAt: new Date().toISOString(),
          version: '1.0.0',
        },
      },
    });

  } catch (error) {
    console.error('웹 바이탈 API 오류:', error);
    
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: '웹 바이탈 데이터를 가져오는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // 관리자 권한 확인
    const hasPermission = await checkAdminPermissions();
    if (!hasPermission) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: '관리자 권한이 필요합니다.'
        },
        { status: 403 }
      );
    }

    // 웹 바이탈 데이터 초기화
    clearWebVitalsData();

    return NextResponse.json({
      success: true,
      message: '웹 바이탈 데이터가 초기화되었습니다.',
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('웹 바이탈 데이터 초기화 오류:', error);
    
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: '웹 바이탈 데이터 초기화 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}

/**
 * 성능 점수를 등급으로 변환
 */
function getPerformanceGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

interface WebVitalsAnalytics {
  summary: {
    performanceScore: number;
    totalSamples: number;
    averageScores: {
      lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      fcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      ttfb: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      inp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    };
  };
  pageBreakdown: unknown[];
}

interface PerformanceAlert {
  type: 'critical' | 'warning' | 'info';
  metric: string;
  message: string;
  value: number;
  threshold: number;
}

/**
 * 성능 개선 권장사항 생성
 */
function generateRecommendations(analytics: WebVitalsAnalytics, alerts: PerformanceAlert[]): string[] {
  const recommendations: string[] = [];
  const { averageScores } = analytics.summary;

  // LCP 개선 권장사항
  if (averageScores.lcp.rating !== 'good') {
    recommendations.push(
      '이미지 최적화와 서버 응답 시간 개선으로 LCP(최대 콘텐츠 페인트)를 향상시키세요.'
    );
  }

  // FID 개선 권장사항
  if (averageScores.fid.rating !== 'good') {
    recommendations.push(
      'JavaScript 번들 크기를 줄이고 코드 분할을 통해 FID(첫 입력 지연)를 개선하세요.'
    );
  }

  // CLS 개선 권장사항
  if (averageScores.cls.rating !== 'good') {
    recommendations.push(
      '이미지와 광고에 명시적 크기를 설정하여 CLS(누적 레이아웃 이동)를 줄이세요.'
    );
  }

  // FCP 개선 권장사항
  if (averageScores.fcp.rating !== 'good') {
    recommendations.push(
      '중요하지 않은 CSS와 JavaScript를 지연 로드하여 FCP(첫 콘텐츠 페인트)를 개선하세요.'
    );
  }

  // TTFB 개선 권장사항
  if (averageScores.ttfb.rating !== 'good') {
    recommendations.push(
      'CDN 사용과 서버 최적화를 통해 TTFB(첫 바이트까지의 시간)를 개선하세요.'
    );
  }

  // INP 개선 권장사항
  if (averageScores.inp.rating !== 'good') {
    recommendations.push(
      '긴 작업을 분할하고 입력 핸들러를 최적화하여 INP(다음 페인트와의 상호작용)를 개선하세요.'
    );
  }

  // 일반적인 권장사항
  if (analytics.summary.performanceScore < 80) {
    recommendations.push(
      '웹 성능 모니터링을 통해 지속적으로 성능을 추적하고 개선하세요.',
      'Lighthouse 감사를 정기적으로 실행하여 성능 병목 지점을 찾으세요.'
    );
  }

  // 알림이 많을 경우
  if (alerts.length >= 3) {
    recommendations.push(
      '여러 성능 문제가 동시에 발생하고 있습니다. 우선순위를 정하여 단계적으로 해결하세요.'
    );
  }

  return recommendations.length > 0 ? recommendations : [
    '현재 웹 성능이 양호합니다. 지속적인 모니터링을 통해 성능을 유지하세요.'
  ];
}