/**
 * Core Web Vitals 수집을 위한 커스텀 훅
 * Next.js App Router에서 Web Vitals 자동 수집
 */
import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/core-web-vitals';

// Performance API 타입 정의
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
}

export function useWebVitals(): void {
  useEffect(() => {
    // Web Performance Observer를 사용하여 메트릭 수집
    const observeWebVitals = () => {
      if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
        return;
      }

      // LCP (Largest Contentful Paint) 관찰
      const observeLCP = () => {
        try {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            if (lastEntry) {
              reportWebVitals({
                name: 'LCP',
                value: lastEntry.startTime,
                id: `lcp-${Date.now()}`,
              } as any);
            }
          });
          
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (error) {
          console.warn('LCP 관찰 실패:', error);
        }
      };

      // FCP (First Contentful Paint) 관찰
      const observeFCP = () => {
        try {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                reportWebVitals({
                  name: 'FCP',
                  value: entry.startTime,
                  id: `fcp-${Date.now()}`,
                } as any);
              }
            });
          });
          
          observer.observe({ type: 'paint', buffered: true });
        } catch (error) {
          console.warn('FCP 관찰 실패:', error);
        }
      };

      // CLS (Cumulative Layout Shift) 관찰
      const observeCLS = () => {
        try {
          let clsValue = 0;
          let sessionValue = 0;
          let sessionEntries: PerformanceEntry[] = [];
          const maxSessionGap = 1000; // 1초
          const maxWindowGap = 5000; // 5초

          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries() as PerformanceEntry[];
            
            entries.forEach((entry) => {
              const layoutEntry = entry as LayoutShift;
              // 레이아웃 시프트가 사용자 입력 직후에 발생했다면 제외
              if (!layoutEntry.hadRecentInput) {
                const firstSessionEntry = sessionEntries[0];
                const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

                // 새로운 세션이거나 기존 세션 내에서 발생한 경우
                if (sessionValue && 
                    lastSessionEntry &&
                    layoutEntry.startTime - lastSessionEntry.startTime < maxSessionGap &&
                    firstSessionEntry &&
                    layoutEntry.startTime - firstSessionEntry.startTime < maxWindowGap) {
                  sessionValue += layoutEntry.value;
                  sessionEntries.push(layoutEntry);
                } else {
                  sessionValue = layoutEntry.value;
                  sessionEntries = [layoutEntry];
                }

                // 최대값 업데이트
                if (sessionValue > clsValue) {
                  clsValue = sessionValue;
                }
              }
            });

            reportWebVitals({
              name: 'CLS',
              value: clsValue,
              id: `cls-${Date.now()}`,
            } as any);
          });
          
          observer.observe({ type: 'layout-shift', buffered: true });
        } catch (error) {
          console.warn('CLS 관찰 실패:', error);
        }
      };

      // FID (First Input Delay) 관찰
      const observeFID = () => {
        try {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const firstEntry = entries[0];
            
            if (firstEntry) {
              const fidEntry = firstEntry as PerformanceEventTiming;
              reportWebVitals({
                name: 'FID',
                value: fidEntry.processingStart - fidEntry.startTime,
                id: `fid-${Date.now()}`,
              } as any);
            }
          });
          
          observer.observe({ type: 'first-input', buffered: true });
        } catch (error) {
          console.warn('FID 관찰 실패:', error);
        }
      };

      // TTFB (Time to First Byte) 측정
      const measureTTFB = () => {
        try {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            const ttfb = navigation.responseStart - navigation.requestStart;
            
            reportWebVitals({
              name: 'TTFB',
              value: ttfb,
              id: `ttfb-${Date.now()}`,
            } as any);
          }
        } catch (error) {
          console.warn('TTFB 측정 실패:', error);
        }
      };

      // INP (Interaction to Next Paint) 관찰 - 실험적 기능
      const observeINP = () => {
        try {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            
            entries.forEach((entry) => {
              const eventEntry = entry as PerformanceEventTiming;
              if (eventEntry.processingStart && eventEntry.processingEnd) {
                const inp = eventEntry.processingEnd - eventEntry.startTime;
                
                reportWebVitals({
                  name: 'INP',
                  value: inp,
                  id: `inp-${Date.now()}`,
                } as any);
              }
            });
          });
          
          // INP는 아직 표준화되지 않아 지원하지 않을 수 있음
          if ('PerformanceEventTiming' in window) {
            observer.observe({ type: 'event', buffered: true });
          }
        } catch (error) {
          console.warn('INP 관찰 실패:', error);
        }
      };

      // 모든 메트릭 관찰 시작
      observeLCP();
      observeFCP();
      observeCLS();
      observeFID();
      measureTTFB();
      observeINP();

      // 페이지 언로드 시 최종 CLS 값 보고
      const reportFinalCLS = () => {
        const observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          let finalCLS = 0;
          
          entries.forEach((entry) => {
            const layoutEntry = entry as LayoutShift;
            if (!layoutEntry.hadRecentInput) {
              finalCLS += layoutEntry.value;
            }
          });

          if (finalCLS > 0) {
            reportWebVitals({
              name: 'CLS',
              value: finalCLS,
              id: `cls-final-${Date.now()}`,
            } as any);
          }
        });

        observer.observe({ type: 'layout-shift', buffered: true });
        
        // 페이지 언로드 시 관찰 중단
        window.addEventListener('beforeunload', () => {
          observer.disconnect();
        });
      };

      // 페이지 로드 완료 후 최종 메트릭 수집
      if (document.readyState === 'complete') {
        reportFinalCLS();
      } else {
        window.addEventListener('load', reportFinalCLS);
      }
    };

    // Web Vitals 관찰 시작
    observeWebVitals();

    // 개발 환경에서 디버그 정보
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Core Web Vitals 자동 수집이 시작되었습니다.');
      
      // 페이지 성능 정보 로그
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          console.log('📊 페이지 성능 요약:', {
            'DOM 로드': `${Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)}ms`,
            '페이지 로드': `${Math.round(navigation.loadEventEnd - navigation.loadEventStart)}ms`,
            'TTFB': `${Math.round(navigation.responseStart - navigation.requestStart)}ms`,
          });
        }, 1000);
      });
    }
  }, []);
}