// Performance monitoring for SEO features
import { isFeatureEnabled } from './feature-flags';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 1000;

  // Track function execution time
  async trackAsyncOperation<T>(
    operationName: string,
    operation: () => Promise<T>,
    tags?: Record<string, string>
  ): Promise<T> {
    if (!isFeatureEnabled('enablePerformanceMonitoring')) {
      return await operation();
    }

    const startTime = performance.now();

    try {
      const result = await operation();
      const duration = performance.now() - startTime;

      this.recordMetric({
        name: `${operationName}_duration`,
        value: duration,
        timestamp: Date.now(),
        tags: { ...tags, status: 'success' },
      });

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      this.recordMetric({
        name: `${operationName}_duration`,
        value: duration,
        timestamp: Date.now(),
        tags: { ...tags, status: 'error' },
      });

      throw error;
    }
  }

  // Track synchronous operations
  trackSyncOperation<T>(
    operationName: string,
    operation: () => T,
    tags?: Record<string, string>
  ): T {
    if (!isFeatureEnabled('enablePerformanceMonitoring')) {
      return operation();
    }

    const startTime = performance.now();

    try {
      const result = operation();
      const duration = performance.now() - startTime;

      this.recordMetric({
        name: `${operationName}_duration`,
        value: duration,
        timestamp: Date.now(),
        tags: { ...tags, status: 'success' },
      });

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      this.recordMetric({
        name: `${operationName}_duration`,
        value: duration,
        timestamp: Date.now(),
        tags: { ...tags, status: 'error' },
      });

      throw error;
    }
  }

  // Record custom metric
  recordMetric(metric: PerformanceMetric): void {
    if (!isFeatureEnabled('enablePerformanceMonitoring')) {
      return;
    }

    this.metrics.push(metric);

    // Keep metrics array from growing too large
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }

    // Log slow operations in development
    if (process.env.NODE_ENV === 'development' && metric.value > 100) {
      console.warn(
        `Slow operation detected: ${metric.name} took ${metric.value.toFixed(2)}ms`
      );
    }
  }

  // Get performance summary
  getPerformanceSummary(): {
    totalOperations: number;
    averageResponseTime: number;
    slowOperations: number;
    errorRate: number;
  } {
    if (this.metrics.length === 0) {
      return {
        totalOperations: 0,
        averageResponseTime: 0,
        slowOperations: 0,
        errorRate: 0,
      };
    }

    const totalOperations = this.metrics.length;
    const averageResponseTime =
      this.metrics.reduce((sum, m) => sum + m.value, 0) / totalOperations;
    const slowOperations = this.metrics.filter(m => m.value > 1000).length; // > 1 second
    const errorOperations = this.metrics.filter(
      m => m.tags?.status === 'error'
    ).length;
    const errorRate = errorOperations / totalOperations;

    return {
      totalOperations,
      averageResponseTime,
      slowOperations,
      errorRate,
    };
  }

  // Get metrics for a specific operation
  getOperationMetrics(operationName: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.name.startsWith(operationName));
  }

  // Clear all metrics
  clearMetrics(): void {
    this.metrics = [];
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Decorator for monitoring async functions
export function monitorPerformance<T extends (...args: any[]) => Promise<any>>(
  operationName: string,
  tags?: Record<string, string>
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return await performanceMonitor.trackAsyncOperation(
        `${operationName || propertyKey}`,
        () => originalMethod.apply(this, args),
        tags
      );
    };

    return descriptor;
  };
}

// Helper for tracking SEO operations specifically
export const seoPerformanceTracker = {
  async trackSEOGeneration<T>(
    operation: () => Promise<T>,
    operationType: 'metadata' | 'keywords' | 'structured-data' | 'optimization'
  ): Promise<T> {
    return await performanceMonitor.trackAsyncOperation(
      `seo_${operationType}`,
      operation,
      { category: 'seo' }
    );
  },

  getSEOPerformance(): {
    metadataGeneration: PerformanceMetric[];
    keywordOptimization: PerformanceMetric[];
    structuredData: PerformanceMetric[];
  } {
    return {
      metadataGeneration:
        performanceMonitor.getOperationMetrics('seo_metadata'),
      keywordOptimization:
        performanceMonitor.getOperationMetrics('seo_keywords'),
      structuredData: performanceMonitor.getOperationMetrics(
        'seo_structured-data'
      ),
    };
  },
};

// Web Vitals tracking (client-side)
export const webVitalsTracker = {
  trackCLS(value: number): void {
    performanceMonitor.recordMetric({
      name: 'web_vitals_cls',
      value,
      timestamp: Date.now(),
      tags: { metric: 'cls' },
    });
  },

  trackFID(value: number): void {
    performanceMonitor.recordMetric({
      name: 'web_vitals_fid',
      value,
      timestamp: Date.now(),
      tags: { metric: 'fid' },
    });
  },

  trackLCP(value: number): void {
    performanceMonitor.recordMetric({
      name: 'web_vitals_lcp',
      value,
      timestamp: Date.now(),
      tags: { metric: 'lcp' },
    });
  },
};
