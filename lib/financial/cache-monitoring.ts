/**
 * 캐시 히트율 모니터링 시스템
 * Redis + Memory 캐시 성능 추적 및 분석
 */

interface CacheHitMetrics {
  key: string;
  type: 'memory' | 'redis' | 'miss';
  timestamp: number;
  responseTime: number;
  dataSize?: number;
}

interface CacheStatsDetail {
  total: number;
  hits: number;
  misses: number;
  hitRate: number;
  avgResponseTime: number;
  totalDataSize: number;
}

interface CacheMonitoringData {
  memory: CacheStatsDetail;
  redis: CacheStatsDetail;
  overall: CacheStatsDetail;
  timeWindow: {
    start: number;
    end: number;
    durationMs: number;
  };
  topMissedKeys: Array<{
    key: string;
    missCount: number;
    lastMissed: number;
  }>;
  performance: {
    memoryAvgMs: number;
    redisAvgMs: number;
    missAvgMs: number;
  };
}

class CacheMonitoringService {
  private metrics: CacheHitMetrics[] = [];
  private readonly maxMetricsHistory = 10000; // 최대 10,000개 메트릭 저장
  private readonly analysisWindowMs = 60 * 60 * 1000; // 1시간 분석 윈도우

  /**
   * 캐시 히트/미스 기록
   */
  recordCacheAccess(
    key: string,
    type: 'memory' | 'redis' | 'miss',
    responseTime: number,
    dataSize?: number
  ): void {
    const metric: CacheHitMetrics = {
      key,
      type,
      timestamp: Date.now(),
      responseTime,
      dataSize: dataSize || 0,
    };

    this.metrics.push(metric);

    // 메트릭 히스토리 제한
    if (this.metrics.length > this.maxMetricsHistory) {
      this.metrics = this.metrics.slice(-this.maxMetricsHistory);
    }
  }

  /**
   * 시간 범위 내 메트릭 필터링
   */
  private getMetricsInWindow(
    windowMs: number = this.analysisWindowMs
  ): CacheHitMetrics[] {
    const now = Date.now();
    const cutoff = now - windowMs;
    return this.metrics.filter(m => m.timestamp >= cutoff);
  }

  /**
   * 특정 타입별 통계 계산
   */
  private calculateStatsForType(
    metrics: CacheHitMetrics[],
    type: 'memory' | 'redis' | 'miss'
  ): CacheStatsDetail {
    const typeMetrics = metrics.filter(m => m.type === type);
    const total = typeMetrics.length;

    if (total === 0) {
      return {
        total: 0,
        hits: 0,
        misses: 0,
        hitRate: 0,
        avgResponseTime: 0,
        totalDataSize: 0,
      };
    }

    const hits = type === 'miss' ? 0 : total;
    const misses = type === 'miss' ? total : 0;
    const hitRate = hits / total;
    const avgResponseTime =
      typeMetrics.reduce((sum, m) => sum + m.responseTime, 0) / total;
    const totalDataSize = typeMetrics.reduce(
      (sum, m) => sum + (m.dataSize || 0),
      0
    );

    return {
      total,
      hits,
      misses,
      hitRate,
      avgResponseTime,
      totalDataSize,
    };
  }

  /**
   * 가장 많이 미스된 키 분석
   */
  private analyzeTopMissedKeys(metrics: CacheHitMetrics[]): Array<{
    key: string;
    missCount: number;
    lastMissed: number;
  }> {
    const missedKeys = new Map<string, { count: number; lastMissed: number }>();

    metrics
      .filter(m => m.type === 'miss')
      .forEach(m => {
        const existing = missedKeys.get(m.key) || { count: 0, lastMissed: 0 };
        missedKeys.set(m.key, {
          count: existing.count + 1,
          lastMissed: Math.max(existing.lastMissed, m.timestamp),
        });
      });

    return Array.from(missedKeys.entries())
      .map(([key, data]) => ({
        key,
        missCount: data.count,
        lastMissed: data.lastMissed,
      }))
      .sort((a, b) => b.missCount - a.missCount)
      .slice(0, 10); // 상위 10개
  }

  /**
   * 종합 캐시 통계 분석
   */
  getComprehensiveStats(
    windowMs: number = this.analysisWindowMs
  ): CacheMonitoringData {
    const windowMetrics = this.getMetricsInWindow(windowMs);
    const now = Date.now();
    const windowStart = now - windowMs;

    // 타입별 통계
    const memoryStats = this.calculateStatsForType(windowMetrics, 'memory');
    const redisStats = this.calculateStatsForType(windowMetrics, 'redis');
    const missStats = this.calculateStatsForType(windowMetrics, 'miss');

    // 전체 통계
    const totalRequests = windowMetrics.length;
    const totalHits = memoryStats.hits + redisStats.hits;
    const totalMisses = missStats.total;
    const overallHitRate = totalRequests > 0 ? totalHits / totalRequests : 0;
    const avgResponseTime =
      totalRequests > 0
        ? windowMetrics.reduce((sum, m) => sum + m.responseTime, 0) /
          totalRequests
        : 0;
    const totalDataSize = memoryStats.totalDataSize + redisStats.totalDataSize;

    const overallStats: CacheStatsDetail = {
      total: totalRequests,
      hits: totalHits,
      misses: totalMisses,
      hitRate: overallHitRate,
      avgResponseTime,
      totalDataSize,
    };

    return {
      memory: memoryStats,
      redis: redisStats,
      overall: overallStats,
      timeWindow: {
        start: windowStart,
        end: now,
        durationMs: windowMs,
      },
      topMissedKeys: this.analyzeTopMissedKeys(windowMetrics),
      performance: {
        memoryAvgMs: memoryStats.avgResponseTime,
        redisAvgMs: redisStats.avgResponseTime,
        missAvgMs: missStats.avgResponseTime,
      },
    };
  }

  /**
   * 실시간 히트율 (최근 5분)
   */
  getRealTimeHitRate(): number {
    const recentMetrics = this.getMetricsInWindow(5 * 60 * 1000); // 5분
    if (recentMetrics.length === 0) return 0;

    const hits = recentMetrics.filter(m => m.type !== 'miss').length;
    return hits / recentMetrics.length;
  }

  /**
   * 캐시 성능 알림 조건 체크
   */
  checkPerformanceAlerts(): {
    lowHitRate?: { current: number; threshold: number };
    slowResponse?: { current: number; threshold: number };
    highMissRate?: { key: string; missCount: number };
  } {
    const stats = this.getComprehensiveStats();
    const alerts: any = {};

    // 히트율이 70% 미만인 경우
    if (stats.overall.hitRate < 0.7) {
      alerts.lowHitRate = {
        current: stats.overall.hitRate,
        threshold: 0.7,
      };
    }

    // 평균 응답 시간이 500ms 초과인 경우
    if (stats.overall.avgResponseTime > 500) {
      alerts.slowResponse = {
        current: stats.overall.avgResponseTime,
        threshold: 500,
      };
    }

    // 특정 키의 미스율이 높은 경우 (시간당 10회 이상)
    const topMissedKey = stats.topMissedKeys[0];
    if (topMissedKey && topMissedKey.missCount > 10) {
      alerts.highMissRate = {
        key: topMissedKey.key,
        missCount: topMissedKey.missCount,
      };
    }

    return alerts;
  }

  /**
   * 메트릭 히스토리 클리어
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * 메트릭 데이터를 JSON으로 내보내기
   */
  exportMetrics(windowMs?: number): {
    stats: CacheMonitoringData;
    rawMetrics: CacheHitMetrics[];
  } {
    const windowMetrics = windowMs
      ? this.getMetricsInWindow(windowMs)
      : this.metrics;
    return {
      stats: this.getComprehensiveStats(windowMs),
      rawMetrics: windowMetrics,
    };
  }
}

// 싱글톤 인스턴스
export const cacheMonitoring = new CacheMonitoringService();

// 편의 함수들
export const recordCacheHit = (
  key: string,
  source: 'memory' | 'redis',
  responseTime: number,
  dataSize?: number
) => {
  cacheMonitoring.recordCacheAccess(key, source, responseTime, dataSize);
};

export const recordCacheMiss = (key: string, responseTime: number) => {
  cacheMonitoring.recordCacheAccess(key, 'miss', responseTime);
};

export const getCacheStats = (windowMs?: number) => {
  return cacheMonitoring.getComprehensiveStats(windowMs);
};

export const getRealTimeHitRate = () => {
  return cacheMonitoring.getRealTimeHitRate();
};

export const checkCacheAlerts = () => {
  return cacheMonitoring.checkPerformanceAlerts();
};

// Note: 서버리스 환경에서 setInterval 자동 실행 제거.
// 캐시 알림은 checkCacheAlerts()를 직접 호출하여 확인.
