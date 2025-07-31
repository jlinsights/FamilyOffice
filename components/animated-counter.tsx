"use client"

import { useCallback, useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  startAnimation?: boolean
  easingFunction?: (t: number) => number
  formatNumber?: (num: number) => string
  onComplete?: () => void
  locale?: string
  ariaLabel?: string
}

const defaultEasingFunctions = {
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => Math.pow(t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) / 2,
  linear: (t: number) => t
}

export function AnimatedCounter({ 
  end, 
  start = 0,
  duration = 2000, 
  prefix = "", 
  suffix = "", 
  className = "",
  startAnimation = false,
  easingFunction = defaultEasingFunctions.easeOut,
  formatNumber,
  onComplete,
  locale = 'ko-KR',
  ariaLabel
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number | null>(null)

  // 숫자 포맷팅 함수 (한국 로케일 적용)
  const formatDisplayNumber = useCallback((num: number): string => {
    if (formatNumber) {
      return formatNumber(num)
    }
    return new Intl.NumberFormat(locale).format(Math.floor(num))
  }, [formatNumber, locale])

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible && !hasAnimated) {
          setIsVisible(true)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible, hasAnimated])

  // 애니메이션 로직
  useEffect(() => {
    if ((isVisible || startAnimation) && !hasAnimated) {
      setHasAnimated(true)
      const startTime = performance.now()
      const difference = end - start

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const easedProgress = easingFunction(progress)
        const currentCount = start + (difference * easedProgress)
        
        setCount(currentCount)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setCount(end)
          onComplete?.()
        }
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
    return undefined
  }, [isVisible, startAnimation, hasAnimated, start, end, duration, easingFunction, onComplete])

  // 컴포넌트 언마운트 시 애니메이션 정리
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <span 
      ref={counterRef} 
      className={className}
      aria-label={ariaLabel || `${prefix}${formatDisplayNumber(count)}${suffix}`}
      role="img"
      aria-live="polite"
    >
      {prefix}{formatDisplayNumber(count)}{suffix}
    </span>
  )
} 