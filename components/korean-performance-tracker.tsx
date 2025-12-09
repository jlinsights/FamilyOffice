'use client';

/**
 * Korean Market Performance Tracking Component
 * 한국 시장 맞춤형 성능 추적 컴포넌트
 */
import { useEffect } from 'react';
import { koreanPerformanceMonitor } from '@/lib/korean-performance-monitor';

// Extract environment variables at module level for client components
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export function KoreanPerformanceTracker() {
  useEffect(() => {
    // 페이지 로드 후 성능 모니터링 시작
    const startMonitoring = () => {
      try {
        // 모니터링 시작
        koreanPerformanceMonitor.startMonitoring();

        // 5초 후 초기 성능 리포트 생성 (개발 환경)
        if (IS_DEVELOPMENT) {
          setTimeout(() => {
            const report = koreanPerformanceMonitor.generatePerformanceReport();
            console.log('📊 한국 시장 성능 리포트:', report);
          }, 5000);
        }
      } catch (error) {
        console.warn('한국 성능 모니터링 시작 실패:', error);
      }
    };

    // DOM 로드 완료 후 모니터링 시작
    if (document.readyState === 'complete') {
      startMonitoring();
    } else {
      window.addEventListener('load', startMonitoring);
    }

    // 클린업
    return () => {
      window.removeEventListener('load', startMonitoring);
    };
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}