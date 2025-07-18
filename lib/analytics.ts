// 성능 모니터링 및 분석 유틸리티

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private performanceMetrics: PerformanceMetric[] = []

  // 이벤트 추적
  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: properties || {},
      timestamp: Date.now()
    }
    
    this.events.push(event)
    
    // 개발 환경에서 콘솔 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event)
    }
    
    // Google Analytics 추적 (설정된 경우)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties)
    }
  }

  // 페이지뷰 추적
  trackPageView(url: string, title?: string) {
    this.track('page_view', {
      url,
      title: title || document.title
    })
  }

  // 사용자 행동 추적
  trackClick(element: string, properties?: Record<string, any>) {
    this.track('click', {
      element,
      ...properties
    })
  }

  // 폼 제출 추적
  trackFormSubmit(formName: string, properties?: Record<string, any>) {
    this.track('form_submit', {
      form_name: formName,
      ...properties
    })
  }

  // 성능 메트릭 기록
  recordPerformanceMetric(name: string, value: number, unit: string = 'ms') {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now()
    }
    
    this.performanceMetrics.push(metric)
    
    // 개발 환경에서 콘솔 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric)
    }
  }

  // 페이지 로드 성능 측정
  measurePageLoad() {
    if (typeof window === 'undefined') return
    
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        this.recordPerformanceMetric('page_load_time', navigation.loadEventEnd - navigation.loadEventStart)
        this.recordPerformanceMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)
        this.recordPerformanceMetric('first_contentful_paint', navigation.responseStart - navigation.requestStart)
      }
    })
  }

  // 사용자 경험 메트릭 측정
  measureUserExperience() {
    if (typeof window === 'undefined') return
    
    // First Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        this.recordPerformanceMetric('fcp', entry.startTime, 'ms')
      })
    }).observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        this.recordPerformanceMetric('lcp', entry.startTime, 'ms')
      })
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if ('processingStart' in entry) {
          this.recordPerformanceMetric('fid', (entry as any).processingStart - entry.startTime, 'ms')
        }
      })
    }).observe({ entryTypes: ['first-input'] })
  }

  // 에러 추적
  trackError(error: Error, context?: Record<string, any>) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      ...context
    })
  }

  // 사용자 식별
  identify(userId: string, traits?: Record<string, any>) {
    this.track('identify', {
      userId,
      traits
    })
  }

  // 이벤트 내보내기
  exportEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  // 성능 메트릭 내보내기
  exportPerformanceMetrics(): PerformanceMetric[] {
    return [...this.performanceMetrics]
  }

  // 데이터 초기화
  clear() {
    this.events = []
    this.performanceMetrics = []
  }
}

// 전역 인스턴스 생성
export const analytics = new Analytics()

// 자동 초기화
if (typeof window !== 'undefined') {
  analytics.measurePageLoad()
  analytics.measureUserExperience()
}

// 전역 에러 핸들러
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    analytics.trackError(event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    analytics.trackError(new Error(event.reason), {
      type: 'unhandledrejection'
    })
  })
}

// React 컴포넌트용 훅
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackClick: analytics.trackClick.bind(analytics),
    trackFormSubmit: analytics.trackFormSubmit.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    identify: analytics.identify.bind(analytics)
  }
} 