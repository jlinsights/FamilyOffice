'use client';

import { useCallback, useEffect, useState, useRef } from 'react';

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

export function AnimatedCounter({
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

  // 애니메이션 로직
  useEffect(() => {
    if (!isMounted || !isClient || !startAnimation) return;

    let animationFrame: number;
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
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        onCompleteRef.current?.();
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isMounted, isClient, startAnimation, start, end, duration]);

  // SSR 방지: 마운트되기 전에는 시작 값 표시
  if (!isMounted || !isClient) {
    return (
      <span className={className}>
        {prefix}
        {formatDisplayNumber(start)}
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
