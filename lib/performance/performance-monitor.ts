// Performance monitoring utilities
import { ErrorMonitor } from '@/lib/monitoring'

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  type: 'navigation' | 'paint' | 'resource' | 'custom'
  url?: string
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetric[] = []
  private static observer: PerformanceObserver | null = null

  static init() {
    if (typeof window === 'undefined') return

    // Core Web Vitals 모니터링
    this.observeWebVitals()
    
    // 페이지 로드 메트릭
    this.observePageLoad()
    
    // 리소스 로딩 메트릭
    this.observeResources()
  }

  private static observeWebVitals() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          this.recordMetric({
            name: 'LCP',
            value: entry.startTime,
            timestamp: Date.now(),
            type: 'paint',
            url: window.location.pathname,
          })
        })
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          this.recordMetric({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            timestamp: Date.now(),
            type: 'custom',
            url: window.location.pathname,
          })
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        
        this.recordMetric({
          name: 'CLS',
          value: clsValue,
          timestamp: Date.now(),
          type: 'custom',
          url: window.location.pathname,
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

    } catch (error) {
      ErrorMonitor.logError(error as Error, { context: 'PerformanceMonitor.observeWebVitals' })
    }
  }

  private static observePageLoad() {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        // 페이지 로드 시간
        this.recordMetric({
          name: 'pageLoad',
          value: navigation.loadEventEnd - navigation.fetchStart,
          timestamp: Date.now(),
          type: 'navigation',
          url: window.location.pathname,
        })

        // DNS 조회 시간
        this.recordMetric({
          name: 'dnsLookup',
          value: navigation.domainLookupEnd - navigation.domainLookupStart,
          timestamp: Date.now(),
          type: 'navigation',
          url: window.location.pathname,
        })

        // TCP 연결 시간
        this.recordMetric({
          name: 'tcpConnect',
          value: navigation.connectEnd - navigation.connectStart,
          timestamp: Date.now(),
          type: 'navigation',
          url: window.location.pathname,
        })

        // Time to First Byte (TTFB)
        this.recordMetric({
          name: 'TTFB',
          value: navigation.responseStart - navigation.fetchStart,
          timestamp: Date.now(),
          type: 'navigation',
          url: window.location.pathname,
        })

        // DOM 파싱 시간
        this.recordMetric({
          name: 'domParsing',
          value: navigation.domContentLoadedEventEnd - navigation.domLoading,
          timestamp: Date.now(),
          type: 'navigation',
          url: window.location.pathname,
        })
      }
    })
  }

  private static observeResources() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const resourceEntry = entry as PerformanceResourceTiming
          
          // 리소스 로딩 시간이 1초 이상인 경우만 기록
          if (resourceEntry.duration > 1000) {
            this.recordMetric({
              name: 'slowResource',
              value: resourceEntry.duration,
              timestamp: Date.now(),
              type: 'resource',
              url: resourceEntry.name,
            })
          }
        })
      })
      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch (error) {
      ErrorMonitor.logError(error as Error, { context: 'PerformanceMonitor.observeResources' })
    }
  }

  static recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric)
    
    // 메트릭이 100개를 초과하면 오래된 것들 제거
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-50)
    }

    // 개발 환경에서 콘솔에 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric)
    }

    // 프로덕션에서는 분석 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendMetricToAnalytics(metric)
    }
  }

  private static async sendMetricToAnalytics(metric: PerformanceMetric) {
    try {
      // Google Analytics 4에 커스텀 이벤트로 전송
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'performance_metric', {
          metric_name: metric.name,
          metric_value: Math.round(metric.value),
          metric_type: metric.type,
          page_path: metric.url,
        })
      }

      // 자체 분석 API로도 전송
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      })
    } catch (error) {
      // 분석 전송 실패는 조용히 처리
      console.warn('Failed to send performance metric:', error)
    }
  }

  // 사용자 정의 메트릭 기록
  static recordCustomMetric(name: string, value: number, context?: Record<string, any>) {
    this.recordMetric({
      name,
      value,
      timestamp: Date.now(),
      type: 'custom',
      url: typeof window !== 'undefined' ? window.location.pathname : undefined,
    })

    // 컨텍스트 정보가 있으면 에러 모니터에도 기록
    if (context) {
      ErrorMonitor.logPerformance(name, value, context)
    }
  }

  // 메트릭 조회
  static getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  // 특정 메트릭 조회
  static getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name)
  }

  // 평균 성능 계산
  static getAverageMetric(name: string): number {
    const metrics = this.getMetricsByName(name)
    if (metrics.length === 0) return 0
    
    const sum = metrics.reduce((total, metric) => total + metric.value, 0)
    return sum / metrics.length
  }

  // 성능 리포트 생성
  static generateReport(): {
    coreWebVitals: Record<string, number>
    pageMetrics: Record<string, number>
    slowResources: PerformanceMetric[]
  } {
    return {
      coreWebVitals: {
        LCP: this.getAverageMetric('LCP'),
        FID: this.getAverageMetric('FID'),
        CLS: this.getAverageMetric('CLS'),
      },
      pageMetrics: {
        pageLoad: this.getAverageMetric('pageLoad'),
        TTFB: this.getAverageMetric('TTFB'),
        domParsing: this.getAverageMetric('domParsing'),
      },
      slowResources: this.metrics.filter(m => m.type === 'resource'),
    }
  }

  // 정리
  static cleanup() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    this.metrics = []
  }
}

// 페이지 성능 측정 유틸리티
export const measurePagePerformance = () => {
  return new Promise<PerformanceNavigationTiming>((resolve) => {
    if (typeof window === 'undefined') {
      resolve({} as PerformanceNavigationTiming)
      return
    }

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      resolve(navigation)
    })
  })
}

// 컴포넌트 렌더링 시간 측정 HOC
export const withPerformanceMeasurement = <T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
) => {
  const PerformanceWrapper = React.forwardRef<any, T>((props, ref) => {
    React.useEffect(() => {
      if (typeof window === 'undefined') return
      
      const startTime = performance.now()
      
      return () => {
        const endTime = performance.now()
        const renderTime = endTime - startTime
        
        PerformanceMonitor.recordCustomMetric(
          `component_render_${componentName}`,
          renderTime,
          { componentName }
        )
      }
    }, [])

    return React.createElement(Component, { ...props, ref })
  })

  PerformanceWrapper.displayName = `withPerformanceMeasurement(${componentName})`
  
  return PerformanceWrapper
}

// 브라우저에서 자동 초기화
if (typeof window !== 'undefined') {
  // DOM이 준비되면 모니터링 시작
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      PerformanceMonitor.init()
    })
  } else {
    PerformanceMonitor.init()
  }
}