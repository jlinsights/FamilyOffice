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
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const animationIdRef = useRef<string>('');

  // ref를 사용하여 최신 함수들을 참조
  const easingFunctionRef = useRef(easingFunction);
  const onCompleteRef = useRef(onComplete);

  // ref 업데이트
  useEffect(() => {
    easingFunctionRef.current = easingFunction;
    onCompleteRef.current = onComplete;
  }, [easingFunction, onComplete]);

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setIsMounted(true);
    setIsClient(true);
  }, []);

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

  // 애니메이션 로직 - 한 번만 실행
  useEffect(() => {
    if (!isMounted || !isClient || !startAnimation) return;
    
    // 고유 ID 생성하여 중복 애니메이션 방지
    const currentAnimationId = `${end}-${start}-${duration}`;
    
    // 이미 동일한 애니메이션이 실행되었으면 중단
    if (hasAnimatedRef.current && animationIdRef.current === currentAnimationId) return;
    
    // 애니메이션 시작 표시
    hasAnimatedRef.current = true;
    animationIdRef.current = currentAnimationId;
    
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
  }, [isMounted, isClient, startAnimation, start, end, duration]);

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
