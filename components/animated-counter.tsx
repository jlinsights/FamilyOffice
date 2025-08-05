'use client';

import { useCallback, useEffect, useState } from 'react';

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

// 기본 easing 함수 정의
const defaultEasingFunction = (t: number): number => 1 - Math.pow(1 - t, 3);

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  startAnimation = false,
  easingFunction = defaultEasingFunction,
  formatNumber,
  onComplete,
  locale = 'ko-KR',
  ariaLabel,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setIsMounted(true);
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

  // 애니메이션 로직 - easingFunction prop 사용
  useEffect(() => {
    if (!isMounted || !startAnimation) return;

    let animationFrame: number;
    const startTime = Date.now();
    const difference = end - start;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 전달받은 easingFunction 사용
      const easedProgress = easingFunction(progress);
      const currentCount = start + difference * easedProgress;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        onComplete?.();
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isMounted, startAnimation, start, end, duration, easingFunction, onComplete]);

  // SSR 방지: 마운트되기 전에는 시작 값 표시
  if (!isMounted) {
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
