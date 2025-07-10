/**
 * 성능 모니터링 유틸리티
 */

// gtag 타입 선언
declare global {
  function gtag(...args: any[]): void
}

// Web Vitals 측정
export function measureWebVitals() {
  if (typeof window === 'undefined') return

  // CLS (Cumulative Layout Shift) 측정
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
        console.log('Layout Shift:', entry)
      }
    }
  })

  try {
    observer.observe({ type: 'layout-shift', buffered: true })
  } catch (e) {
    // 브라우저가 지원하지 않는 경우 무시
  }
}

// 페이지 로드 시간 측정
export function measurePageLoadTime() {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart
      console.log(`Page Load Time: ${loadTime}ms`)
      
      // 분석 도구로 전송 (예: Google Analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          value: Math.round(loadTime),
          custom_parameter: 'performance'
        })
      }
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
  } catch (e) {
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