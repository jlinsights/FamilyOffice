/**
 * 캐시 모니터링 API 엔드포인트
 * GET /api/cache/monitoring - 캐시 성능 및 히트율 통계
 */
import { NextRequest, NextResponse } from 'next/server';
import { 
  getAdvancedCacheStats, 
  getRealTimeCacheHitRate, 
  checkCachePerformanceAlerts 
} from '@/lib/financial/cache';
import { checkAdminPermissions } from '@/lib/admin-permissions';

export async function GET(request: NextRequest) {
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

    // 쿼리 파라미터에서 시간 윈도우 추출
    const url = new URL(request.url);
    const windowParam = url.searchParams.get('window');
    const format = url.searchParams.get('format') || 'full';
    
    // 시간 윈도우 설정 (기본값: 1시간)
    const windowMs = windowParam ? parseInt(windowParam) * 1000 : 60 * 60 * 1000;
    
    if (format === 'realtime') {
      // 실시간 히트율만 반환
      const realTimeHitRate = await getRealTimeCacheHitRate();
      return NextResponse.json({
        success: true,
        data: {
          hitRate: realTimeHitRate,
          timestamp: Date.now(),
        },
      });
    }
    
    if (format === 'alerts') {
      // 성능 알림만 반환
      const alerts = await checkCachePerformanceAlerts();
      return NextResponse.json({
        success: true,
        data: {
          alerts,
          hasAlerts: Object.keys(alerts).length > 0,
          timestamp: Date.now(),
        },
      });
    }

    // 전체 통계 정보
    const [stats, alerts, realTimeHitRate] = await Promise.all([
      getAdvancedCacheStats(windowMs),
      checkCachePerformanceAlerts(),
      getRealTimeCacheHitRate(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          realTimeHitRate,
          hasAlerts: Object.keys(alerts).length > 0,
          timestamp: Date.now(),
        },
        stats,
        alerts,
        metadata: {
          windowMs,
          windowHours: windowMs / (1000 * 60 * 60),
          generatedAt: new Date().toISOString(),
        },
      },
    });

  } catch (error) {
    console.error('캐시 모니터링 API 오류:', error);
    
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: '캐시 모니터링 정보를 가져오는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}

// 캐시 메트릭 리셋 (관리자만 가능)
export async function DELETE() {
  try {
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

    const { cacheMonitoring } = await import('@/lib/financial/cache-monitoring');
    cacheMonitoring.clearMetrics();

    return NextResponse.json({
      success: true,
      message: '캐시 메트릭이 초기화되었습니다.',
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('캐시 메트릭 리셋 오류:', error);
    
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: '캐시 메트릭 초기화 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}