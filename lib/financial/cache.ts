/**
 * 캐시 모니터링 관련 함수 export
 */
import {
  cacheMonitoring,
  getRealTimeHitRate,
  checkCacheAlerts,
} from './cache-monitoring';

/**
 * 고급 캐시 통계 조회
 */
export async function getAdvancedCacheStats(windowMs: number = 60 * 60 * 1000) {
  return cacheMonitoring.getComprehensiveStats(windowMs);
}

/**
 * 실시간 캐시 히트율 조회
 */
export async function getRealTimeCacheHitRate(): Promise<number> {
  return getRealTimeHitRate();
}

/**
 * 캐시 성능 알림 체크
 */
export async function checkCachePerformanceAlerts() {
  return checkCacheAlerts();
}
