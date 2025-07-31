'use client'

import { useEffect, useState, useCallback } from 'react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  inp: number | null
}

export function PerformanceMonitor() {
  const measureWebVitals = useCallback(() => {
      const metrics: PerformanceMetrics = {
        fcp: null,
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null,
        inp: null
      }

      // First Contentful Paint (FCP)
      if ('PerformanceObserver' in window) {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
          if (fcpEntry) {
            metrics.fcp = fcpEntry.startTime
            console.log('FCP:', metrics.fcp)
          }
        })
        fcpObserver.observe({ type: 'paint', buffered: true })
      }

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            metrics.lcp = lastEntry.startTime
            console.log('LCP:', metrics.lcp)
          }
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      }

      // First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              metrics.fid = entry.processingStart - entry.startTime
              console.log('FID:', metrics.fid)
            }
          })
        })
        fidObserver.observe({ type: 'first-input', buffered: true })
      }

      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          metrics.cls = clsValue
          console.log('CLS:', metrics.cls)
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })
      }

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
        console.log('TTFB:', metrics.ttfb)
      }

      // 성능 메트릭을 서버로 전송 (선택사항)
      if (process.env.NODE_ENV === 'production') {
        // 실제 구현에서는 분석 서비스로 전송
        console.log('Performance Metrics:', metrics)
      }
    }, [])

  useEffect(() => {
    // 페이지 로드 완료 후 측정
    if (document.readyState === 'complete') {
      measureWebVitals()
    } else {
      window.addEventListener('load', measureWebVitals)
    }

    return () => {
      window.removeEventListener('load', measureWebVitals)
    }
  }, [measureWebVitals])

  return null // 이 컴포넌트는 UI를 렌더링하지 않음
}

// 성능 최적화를 위한 지연 로딩 컴포넌트
export function LazyLoadComponent({ 
  children, 
  threshold = 0.1,
  rootMargin = '50px'
}: {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 컴포넌트가 뷰포트에 들어오면 로드
            entry.target.classList.add('loaded')
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    const elements = document.querySelectorAll('[data-lazy]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return <>{children}</>
}

// 이미지 지연 로딩 훅
export function useLazyImage(src: string, fallback?: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = new Image()
    
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setError(true)
    
    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return {
    isLoaded,
    error,
    src: error && fallback ? fallback : src
  }
} 