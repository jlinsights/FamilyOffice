/**
 * Real-time Performance Metrics for FamilyOffice
 * Advanced monitoring and optimization feedback
 */

interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
  tti: number; // Time to Interactive
}

class RealTimePerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.setupObservers();
  }

  private setupObservers() {
    if (typeof window === 'undefined') return;

    // Core Web Vitals Observer
    try {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          switch (entry.entryType) {
            case 'largest-contentful-paint':
              this.metrics.lcp = entry.startTime;
              this.reportMetric('LCP', entry.startTime);
              break;
            case 'first-input':
              this.metrics.fid =
                (entry as any).processingStart - entry.startTime;
              this.reportMetric('FID', this.metrics.fid);
              break;
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                this.metrics.cls =
                  (this.metrics.cls || 0) + (entry as any).value;
                this.reportMetric('CLS', this.metrics.cls || 0);
              }
              break;
          }
        });
      });

      observer.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
      });
      this.observers.push(observer);
    } catch (e) {
      console.warn('Performance Observer not supported:', e);
    }

    // Navigation timing
    this.measureNavigationTiming();

    // Resource timing for financial APIs
    this.monitorAPIPerformance();

    // Korean font loading performance
    this.monitorFontLoading();
  }

  private measureNavigationTiming() {
    if (typeof window !== 'undefined' && window.performance) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;

        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.metrics.fcp =
          performance.getEntriesByName('first-contentful-paint')[0]
            ?.startTime || 0;
        this.metrics.tti = this.calculateTTI();

        this.reportAllMetrics();
      });
    }
  }

  private calculateTTI(): number {
    // Simplified TTI calculation
    const longTasks = performance.getEntriesByType('longtask');
    if (longTasks.length === 0) return this.metrics.fcp || 0;

    const lastLongTask = longTasks[longTasks.length - 1];
    if (!lastLongTask) return this.metrics.fcp || 0;

    return Math.max(
      lastLongTask.startTime + lastLongTask.duration,
      this.metrics.fcp || 0
    );
  }

  private monitorAPIPerformance() {
    if (typeof window === 'undefined') return;

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0] as string;

      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Monitor financial API performance
        if (url.includes('/api/financial') || url.includes('/api/portfolio')) {
          this.reportAPIMetric(url, duration, response.status);
        }

        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        this.reportAPIMetric(url, duration, 0, error);
        throw error;
      }
    };
  }

  private monitorFontLoading() {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        const fontLoadTime = performance.now();
        this.reportMetric('Font Load Time', fontLoadTime);
      });
    }
  }

  private reportMetric(name: string, value: number) {
    // Development logging
    if (process.env.NODE_ENV === 'development') {
      const rating = this.getMetricRating(name, value);
      console.log(`📊 ${name}: ${value.toFixed(2)}ms (${rating})`);
    }

    // Send to analytics (Vercel Analytics, Google Analytics, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        metric_rating: this.getMetricRating(name, value),
      });
    }
  }

  private reportAPIMetric(
    url: string,
    duration: number,
    status: number,
    error?: any
  ) {
    console.log(`🌐 API ${url}: ${duration.toFixed(2)}ms (${status})`);

    if (error) {
      console.error(`❌ API Error ${url}:`, error);
    }

    // Alert for slow financial APIs (critical for user experience)
    if (duration > 2000 && url.includes('/api/financial')) {
      console.warn(
        `⚠️ Slow Financial API: ${url} took ${duration.toFixed(2)}ms`
      );
    }
  }

  private getMetricRating(
    name: string,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: [2500, 4000],
      FID: [100, 300],
      CLS: [0.1, 0.25],
      TTFB: [800, 1800],
      FCP: [1800, 3000],
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'good';

    const goodThreshold = threshold[0];
    const improvementThreshold = threshold[1];

    if (goodThreshold !== undefined && value <= goodThreshold) return 'good';
    if (improvementThreshold !== undefined && value <= improvementThreshold)
      return 'needs-improvement';
    return 'poor';
  }

  private reportAllMetrics() {
    console.group('📈 FamilyOffice Performance Report');
    Object.entries(this.metrics).forEach(([key, value]) => {
      if (value !== undefined) {
        console.log(`${key.toUpperCase()}: ${value.toFixed(2)}ms`);
      }
    });
    console.groupEnd();

    // Performance budget violations
    this.checkPerformanceBudget();
  }

  private checkPerformanceBudget() {
    const budgets = {
      lcp: 2500, // 2.5s for premium financial platform
      fid: 100, // 100ms for responsive interactions
      cls: 0.1, // Minimal layout shift
      ttfb: 600, // 600ms for Korean market
    };

    const violations = Object.entries(budgets)
      .filter(
        ([metric, budget]) =>
          (this.metrics[metric as keyof PerformanceMetrics] || 0) > budget
      )
      .map(([metric, budget]) => ({
        metric,
        budget,
        actual: this.metrics[metric as keyof PerformanceMetrics] || 0,
      }));

    if (violations.length > 0) {
      console.group('⚠️ Performance Budget Violations');
      violations.forEach(v => {
        console.warn(
          `${v.metric}: ${v.actual.toFixed(2)}ms > ${v.budget}ms budget`
        );
      });
      console.groupEnd();
    } else {
      console.log('✅ All performance budgets met!');
    }
  }

  // Public API for manual monitoring
  public measureUserAction(actionName: string, fn: () => void | Promise<void>) {
    const startTime = performance.now();

    const result = fn();

    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - startTime;
        this.reportMetric(`User Action: ${actionName}`, duration);
      });
    } else {
      const duration = performance.now() - startTime;
      this.reportMetric(`User Action: ${actionName}`, duration);
      return result;
    }
  }

  public dispose() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: RealTimePerformanceMonitor | null = null;

export const initializePerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new RealTimePerformanceMonitor();
  }
  return performanceMonitor;
};

export const measureAction = (
  actionName: string,
  fn: () => void | Promise<void>
) => {
  return performanceMonitor?.measureUserAction(actionName, fn) || fn();
};

// React hook for component performance
export const usePerformanceMonitoring = (componentName: string) => {
  if (typeof window !== 'undefined') {
    const startTime = performance.now();

    return {
      markRender: () => {
        const renderTime = performance.now() - startTime;
        console.log(
          `⚛️  ${componentName} render time: ${renderTime.toFixed(2)}ms`
        );
      },
    };
  }

  return { markRender: () => {} };
};

export default RealTimePerformanceMonitor;
