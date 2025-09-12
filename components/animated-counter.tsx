'use client';

import { useCallback, useEffect, useState, useRef, memo } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  startAnimation?: boolean;
  easingFunction?: (t: number) => number;
  formatNumber?: (num: number) => string;
  onComplete?: () => void;
  locale?: string;
  ariaLabel?: string;
  uniqueId?: string; // 고유 식별자 추가
  resetOnPageChange?: boolean; // 페이지 변경시 리셋 여부
}

// 전역 애니메이션 상태 관리
class AnimationStateManager {
  private static instance: AnimationStateManager;
  private animatedCounters = new Set<string>();
  private currentPath: string = '';

  static getInstance(): AnimationStateManager {
    if (!AnimationStateManager.instance) {
      AnimationStateManager.instance = new AnimationStateManager();
    }
    return AnimationStateManager.instance;
  }

  setCurrentPath(path: string) {
    if (this.currentPath !== path) {
      this.currentPath = path;
      // 페이지가 변경되면 모든 애니메이션 상태 초기화
      this.animatedCounters.clear();
    }
  }

  hasAnimated(id: string): boolean {
    return this.animatedCounters.has(id);
  }

  markAsAnimated(id: string) {
    this.animatedCounters.add(id);
  }

  resetAnimation(id: string) {
    this.animatedCounters.delete(id);
  }

  resetAll() {
    this.animatedCounters.clear();
  }
}

function AnimatedCounterComponent({
  end,
  start = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  startAnimation = false,
  easingFunction,
  formatNumber,
  onComplete,
  locale = 'ko-KR',
  ariaLabel,
  uniqueId,
  resetOnPageChange = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  
  // 전역 상태 관리자 인스턴스
  const stateManager = AnimationStateManager.getInstance();
  
  // 고유 ID 생성 (prop으로 전달되지 않으면 자동 생성)
  const componentId = uniqueId || `counter-${end}-${start}-${duration}-${prefix}${suffix}`;

  // ref를 사용하여 최신 함수들을 참조
  const easingFunctionRef = useRef(easingFunction);
  const onCompleteRef = useRef(onComplete);

  // ref 업데이트
  useEffect(() => {
    easingFunctionRef.current = easingFunction;
    onCompleteRef.current = onComplete;
  }, [easingFunction, onComplete]);

  // 클라이언트 사이드 마운트 확인 및 페이지 경로 설정
  useEffect(() => {
    setIsMounted(true);
    setIsClient(true);
    
    // 현재 페이지 경로 설정 (페이지 변경시 애니메이션 상태 초기화)
    if (typeof window !== 'undefined' && resetOnPageChange) {
      stateManager.setCurrentPath(window.location.pathname);
    }
  }, [resetOnPageChange, stateManager]);

  // 숫자 포맷팅 함수
  const formatDisplayNumber = useCallback(
    (num: number): string => {
      if (formatNumber) {
        return formatNumber(num);
      }
      return Math.floor(num).toLocaleString(locale);
    },
    [formatNumber, locale]
  );

  // 애니메이션 로직 - 페이지당 한 번만 실행
  useEffect(() => {
    if (!isMounted || !isClient || !startAnimation) return;
    
    // 이미 애니메이션이 실행된 경우 최종값으로 즉시 설정
    if (stateManager.hasAnimated(componentId)) {
      setCount(end);
      return;
    }
    
    // 애니메이션 시작 마킹
    stateManager.markAsAnimated(componentId);
    
    const startTime = Date.now();
    const difference = end - start;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ref를 통해 최신 easing 함수 사용
      const currentEasingFunction = easingFunctionRef.current;
      const easedProgress = currentEasingFunction 
        ? currentEasingFunction(progress) 
        : 1 - Math.pow(1 - progress, 3);
      
      const currentCount = start + difference * easedProgress;

      setCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        onCompleteRef.current?.();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isMounted, isClient, startAnimation, start, end, duration, componentId, stateManager]);

  // SSR 방지: 마운트되기 전에는 최종 값 표시하여 hydration mismatch 방지
  if (!isMounted || !isClient) {
    return (
      <span className={className}>
        {prefix}
        {formatDisplayNumber(end)}
        {suffix}
      </span>
    );
  }

  return (
    <span
      className={className}
      aria-label={
        ariaLabel || `${prefix}${formatDisplayNumber(count)}${suffix}`
      }
    >
      {prefix}
      {formatDisplayNumber(count)}
      {suffix}
    </span>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const AnimatedCounter = memo(AnimatedCounterComponent);

// Export utility functions for manual control if needed
export const useAnimationReset = () => {
  const stateManager = AnimationStateManager.getInstance();
  
  return {
    resetAll: () => stateManager.resetAll(),
    resetAnimation: (id: string) => stateManager.resetAnimation(id),
  };
};
