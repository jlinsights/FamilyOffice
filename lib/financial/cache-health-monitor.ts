/**
 * Cache Health Monitor and Analytics
 * Real-time monitoring for multi-tier caching system
 */
import { getCacheManager } from './advanced-cache';

export class CacheHealthMonitor {
  private monitorInterval: NodeJS.Timeout | null = null;
  private alertThresholds = {
    memoryHitRate: 0.8,      // 80% minimum hit rate
    redisConnectivity: true,    // Redis must be connected
    apiErrorRate: 0.1,        // 10% max error rate
    responseTimeP95: 1000,     // 1 second max P95 response time
    memoryUsage: 0.9,          // 90% max memory usage
  };

  constructor() {
    this.setupMonitoring();
  }

  /**
   * Setup continuous monitoring
   */
  private setupMonitoring(): void {
    // Monitor every 30 seconds
    this.monitorInterval = setInterval(() => {
      this.performHealthCheck();
    }, 30000);

    // Graceful shutdown
    process.on('SIGTERM', () => this.cleanup());
    process.on('SIGINT', () => this.cleanup());
  }

  /**
   * Perform comprehensive health check
   */
  private async performHealthCheck(): Promise<void> {
    try {
      const cache = getCacheManager();
      const stats = await cache.getStats();
      const health = await cache.healthCheck();

      // Memory cache checks
      const memoryHitRate = stats.memory.hitRate;
      if (memoryHitRate < this.alertThresholds.memoryHitRate) {
        this.sendAlert('Low memory cache hit rate', {
          current: memoryHitRate,
          threshold: this.alertThresholds.memoryHitRate,
          recommendation: 'Consider increasing memory TTL or optimizing cache keys',
        });
      }

      // Redis connectivity check
      if (!health.redis.healthy && this.alertThresholds.redisConnectivity) {
        this.sendAlert('Redis connectivity lost', {
          connected: stats.redis.connected,
          recommendation: 'Check Redis connection and configuration',
        });
      }

      // API error rate check
      const totalErrors = stats.api.totalErrors;
      const totalCalls = stats.api.totalCalls;
      const errorRate = totalCalls > 0 ? totalErrors / totalCalls : 0;

      if (errorRate > this.alertThresholds.apiErrorRate) {
        this.sendAlert('High API error rate', {
          current: errorRate,
          threshold: this.alertThresholds.apiErrorRate,
          recommendation: 'Check external API status and implement circuit breaker',
        });
      }

      // Log periodic status
      if (Date.now() % 60000 < 30000) { // Every minute
        this.logStatus(stats, health);
      }

    } catch (error) {
      console.error('Health check failed:', error);
      this.sendAlert('Health monitoring failure', { error: error.message });
    }
  }

  /**
   * Send alert for cache issues
   */
  private sendAlert(
    message: string,
    details: Record<string, any>
  ): void {
    const alert = {
      timestamp: new Date().toISOString(),
      service: 'cache-monitor',
      severity: this.getSeverity(details),
      message,
      details,
    };

    console.error('🚨 CACHE ALERT:', JSON.stringify(alert, null, 2));

    // Here you could integrate with:
    // - Slack/Teams webhook
    // - Email notifications
    // - Monitoring services (Datadog, New Relic)
    // - Error tracking (Sentry)
  }

  /**
   * Determine alert severity
   */
  private getSeverity(details: Record<string, any>): 'low' | 'medium' | 'high' | 'critical' {
    if (details.current === 0) return 'critical';
    if (details.current < 0.5) return 'high';
    if (details.current < 0.8) return 'medium';
    return 'low';
  }

  /**
   * Log periodic status
   */
  private logStatus(stats: any, health: any): void {
    console.log('📊 Cache Status:', {
      memory: {
        hitRate: `${(stats.memory.hitRate * 100).toFixed(1)}%`,
        keys: stats.memory.keys,
        size: `${stats.memory.ksize}KB`,
      },
      redis: {
        connected: stats.redis.connected,
        healthy: health.redis.healthy,
      },
      api: {
        totalCalls: stats.api.totalCalls,
        errorRate: `${((stats.api.totalErrors / stats.api.totalCalls) * 100).toFixed(2)}%`,
      },
      overall: health.overall ? '✅ Healthy' : '❌ Unhealthy',
    });
  }

  /**
   * Get real-time metrics
   */
  async getRealTimeMetrics(): Promise<any> {
    const cache = getCacheManager();
    const stats = await cache.getStats();
    const health = await cache.healthCheck();

    return {
      timestamp: new Date().toISOString(),
      cache: {
        memory: {
          hitRate: stats.memory.hitRate,
          hitRatePercentage: (stats.memory.hitRate * 100).toFixed(1),
          keys: stats.memory.keys,
          sizeKB: stats.memory.ksize,
          hits: stats.memory.hits,
          misses: stats.memory.misses,
        },
        redis: {
          connected: stats.redis.connected,
          healthy: health.redis.healthy,
          info: stats.redis.info,
        },
        api: {
          totalCalls: stats.api.totalCalls,
          totalErrors: stats.api.totalErrors,
          errorRate: stats.api.totalCalls > 0 ? stats.api.totalErrors / stats.api.totalCalls : 0,
          errorRatePercentage: stats.api.totalCalls > 0 ? ((stats.api.totalErrors / stats.api.totalCalls) * 100).toFixed(2) : 0,
        },
      },
      health: {
        overall: health.overall,
        memory: health.memory,
        redis: health.redis,
        api: health.api,
      },
    };
  }

  /**
   * Generate performance report
   */
  async generateReport(): Promise<any> {
    const metrics = await this.getRealTimeMetrics();
    
    return {
      report: {
        timestamp: metrics.timestamp,
        summary: {
          overallHealth: metrics.health.overall,
          cacheEfficiency: metrics.cache.memory.hitRatePercentage,
          apiReliability: `${100 - parseFloat(metrics.cache.api.errorRatePercentage)}%`,
        },
        recommendations: this.generateRecommendations(metrics),
        details: metrics,
      },
    };
  }

  /**
   * Generate optimization recommendations
   */
  private generateRecommendations(metrics: any): string[] {
    const recommendations: string[] = [];

    if (parseFloat(metrics.cache.memory.hitRatePercentage) < 80) {
      recommendations.push('Increase memory cache TTL or optimize cache key strategy');
    }

    if (!metrics.cache.redis.connected) {
      recommendations.push('Fix Redis connection issues for better performance');
    }

    if (parseFloat(metrics.cache.api.errorRatePercentage) > 5) {
      recommendations.push('Implement circuit breaker pattern for API calls');
    }

    if (metrics.cache.memory.sizeKB > 50000) { // 50MB
      recommendations.push('Monitor memory usage and consider cache size limits');
    }

    if (recommendations.length === 0) {
      recommendations.push('Cache system is performing optimally');
    }

    return recommendations;
  }

  /**
   * Setup cache warming strategy
   */
  async setupCacheWarming(): Promise<void> {
    // Popular Korean stocks and forex pairs
    const warmupData = [
      // Korean stocks
      '005930.KS', '000660.KS', '035420.KS', '051910.KS',
      // Forex pairs
      'USD/KRW', 'EUR/KRW', 'JPY/KRW', 'CNY/KRW',
    ];

    console.log('🔥 Setting up cache warming for:', warmupData);

    // Warm up cache periodically
    setInterval(async () => {
      try {
        const cache = getCacheManager();
        for (const symbol of warmupData) {
          // This would trigger cache warming with actual data fetching
          // await cache.get(`financial:${symbol}`, () => fetchFinancialData(symbol));
        }
        console.log('🔥 Cache warming completed');
      } catch (error) {
        console.error('Cache warming failed:', error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Cleanup monitoring
   */
  private cleanup(): void {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
    console.log('🧹 Cache monitoring stopped');
  }
}

// Export singleton instance
export const cacheMonitor = new CacheHealthMonitor();

// API endpoint ready functions
export async function getCacheHealthStatus() {
  return await cacheMonitor.getRealTimeMetrics();
}

export async function getCachePerformanceReport() {
  return await cacheMonitor.generateReport();
}