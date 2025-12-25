'use client';

import { useEffect, useState, useCallback, memo } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  inp: number | null;
}

export const PerformanceMonitor = memo(function PerformanceMonitor() {
  const measureWebVitals = useCallback(() => {
    // 브라우저가 PerformanceObserver를 지원하는지 확인
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver is not supported in this environment');
      return;
    }

    const metrics: PerformanceMetrics = {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
      inp: null,
    };

    try {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(
          entry => entry.name === 'first-contentful-paint'
        );
        if (fcpEntry) {
          metrics.fcp = fcpEntry.startTime;
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (error) {
      console.warn('FCP observer setup failed:', error);
    }

    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          metrics.lcp = lastEntry.startTime;
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (error) {
      console.warn('LCP observer setup failed:', error);
    }

    try {
      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            metrics.fid = entry.processingStart - entry.startTime;
          }
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (error) {
      console.warn('FID observer setup failed:', error);
    }

    try {
      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        metrics.cls = clsValue;
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.warn('CLS observer setup failed:', error);
    }

    try {
      // Time to First Byte (TTFB)
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigationEntry =
          navigationEntries[0] as PerformanceNavigationTiming;
        if (
          navigationEntry &&
          navigationEntry.responseStart &&
          navigationEntry.requestStart
        ) {
          metrics.ttfb =
            navigationEntry.responseStart - navigationEntry.requestStart;
        }
      }
    } catch (error) {
      console.warn('TTFB measurement failed:', error);
    }

    // 성능 메트릭을 서버로 전송 (선택사항)
    if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost'
    ) {
      // 실제 구현에서는 분석 서비스로 전송
      // Performance metrics are now sent via the PerformanceMonitor class
    }
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 성능 측정 시작
    const timer = setTimeout(() => {
      measureWebVitals();
    }, 1000); // 1초 지연 후 측정 시작

    return () => clearTimeout(timer);
  }, [measureWebVitals]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
});

// 성능 최적화를 위한 지연 로딩 컴포넌트
export const LazyLoadComponent = memo(function LazyLoadComponent({
  children,
  threshold = 0.1,
  rootMargin = '50px',
}: {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 컴포넌트가 뷰포트에 들어오면 로드
            entry.target.classList.add('loaded');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const elements = document.querySelectorAll('[data-lazy]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return <>{children}</>;
});

// 이미지 지연 로딩 훅
export function useLazyImage(src: string, fallback?: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return {
    isLoaded,
    error,
    src: error && fallback ? fallback : src,
  };
}
