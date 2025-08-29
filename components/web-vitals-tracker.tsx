'use client';

/**
 * Core Web Vitals 자동 수집 컴포넌트
 * Next.js App Router에서 실시간 성능 메트릭 수집
 */
import { useWebVitals } from '@/hooks/use-web-vitals';

export function WebVitalsTracker() {
  // 커스텀 훅으로 Web Vitals 수집
  useWebVitals();

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}