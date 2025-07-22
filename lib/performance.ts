/**
 * 성능 모니터링 유틸리티
 */

// gtag 타입 선언
declare global {
  function gtag(...args: any[]): void
  interface Window {
    gtag: (
      command: string,
      action: string,
      parameters?: Record<string, any>
    ) => void
  }
}

// Performance metrics interface
export interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  loadTime: number
  domContentLoaded: number
}

// Web Vitals 측정
export function measureWebVitals() {
  if (typeof window === 'undefined') return

  const metrics: Partial<PerformanceMetrics> = {}

  // CLS (Cumulative Layout Shift) 측정
  const clsObserver = new PerformanceObserver((list) => {
    let cls = 0
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
        cls += (entry as any).value
      }
    }
    metrics.cls = cls
    reportMetric('cls', cls)
  })

  // LCP (Largest Contentful Paint) 측정
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    metrics.lcp = lastEntry.startTime
    reportMetric('lcp', lastEntry.startTime)
  })

  // FID (First Input Delay) 측정
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fidEntry = entry as any
      metrics.fid = fidEntry.processingStart - fidEntry.startTime
      reportMetric('fid', fidEntry.processingStart - fidEntry.startTime)
    }
  })

  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
    fidObserver.observe({ type: 'first-input', buffered: true })
  } catch {
    console.warn('Some performance observers not supported')
  }

  // FCP (First Contentful Paint) 측정
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
  if (fcpEntry) {
    metrics.fcp = fcpEntry.startTime
    reportMetric('fcp', fcpEntry.startTime)
  }

  return metrics
}

// 페이지 로드 시간 측정
export function measurePageLoadTime() {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
      const ttfb = navigation.responseStart - navigation.fetchStart
      
      console.log(`Page Load Time: ${loadTime}ms`)
      console.log(`DOM Content Loaded: ${domContentLoaded}ms`)
      console.log(`TTFB: ${ttfb}ms`)
      
      // 분석 도구로 전송 (예: Google Analytics)
      reportMetric('page_load_time', loadTime)
      reportMetric('dom_content_loaded', domContentLoaded)
      reportMetric('ttfb', ttfb)
    }
  })
}

// 리소스 로딩 시간 측정
export function measureResourceLoadTime() {
  if (typeof window === 'undefined') return

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming
        console.log(`Resource ${resource.name}: ${resource.duration}ms`)
      }
    }
  })

  try {
    observer.observe({ type: 'resource', buffered: true })
  } catch {
    // 브라우저가 지원하지 않는 경우 무시
  }
}

// 메모리 사용량 모니터링
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !(performance as any).memory) return

  const memory = (performance as any).memory
  
  console.log({
    usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
    totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
    jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
  })
}

// 사용자 상호작용 지연 측정
export function measureInteractionDelay() {
  if (typeof window === 'undefined') return

  let startTime: number

  document.addEventListener('pointerdown', () => {
    startTime = performance.now()
  })

  document.addEventListener('pointerup', () => {
    if (startTime) {
      const delay = performance.now() - startTime
      if (delay > 100) { // 100ms 이상의 지연만 기록
        console.log(`Interaction Delay: ${delay}ms`)
      }
    }
  })
}

// Metric reporting utility
function reportMetric(name: string, value: number) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Performance',
      event_label: name,
      value: Math.round(value),
      non_interaction: true,
    })
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}: ${value}ms`)
  }
}

// API request performance tracking
export function trackApiRequest(url: string, method: string = 'GET') {
  const startTime = performance.now()
  
  return {
    complete: (status: number, size?: number) => {
      const duration = performance.now() - startTime
      
      reportMetric('api_request_duration', duration)
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'api_request', {
          event_category: 'API',
          event_label: `${method} ${url}`,
          value: Math.round(duration),
          custom_map: {
            api_status: status,
            api_size: size || 0,
          }
        })
      }
    }
  }
}

// Component render performance
export function trackComponentRender(componentName: string) {
  const startTime = performance.now()
  
  return {
    complete: () => {
      const duration = performance.now() - startTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Component ${componentName} render: ${duration}ms`)
      }
    }
  }
}

// Performance score calculation
export function calculatePerformanceScore(metrics: Partial<PerformanceMetrics>): number {
  let score = 100
  
  // FCP scoring
  if (metrics.fcp) {
    if (metrics.fcp > 3000) score -= 20
    else if (metrics.fcp > 1800) score -= 10
  }
  
  // LCP scoring
  if (metrics.lcp) {
    if (metrics.lcp > 4000) score -= 25
    else if (metrics.lcp > 2500) score -= 15
  }
  
  // FID scoring
  if (metrics.fid) {
    if (metrics.fid > 300) score -= 20
    else if (metrics.fid > 100) score -= 10
  }
  
  // CLS scoring
  if (metrics.cls) {
    if (metrics.cls > 0.25) score -= 25
    else if (metrics.cls > 0.1) score -= 15
  }
  
  return Math.max(0, score)
}

// 전체 성능 모니터링 초기화
export function initPerformanceMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    measureWebVitals()
    measurePageLoadTime()
    measureResourceLoadTime()
    measureInteractionDelay()
    
    // 주기적으로 메모리 사용량 체크
    setInterval(monitorMemoryUsage, 30000) // 30초마다
  }
} 