"use client"

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  startAnimation?: boolean
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  prefix = "", 
  suffix = "", 
  className = "",
  startAnimation = false 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (isVisible || startAnimation) {
      const startTime = Date.now()
      const endTime = startTime + duration

      const timer = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(endTime - now, 0)
        const progress = Math.min((duration - remaining) / duration, 1)

        // 이징 함수 적용 (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * end))

        if (progress === 1) {
          clearInterval(timer)
        }
      }, 16) // 60fps

      return () => clearInterval(timer)
    }
    // cleanup 함수가 필요 없는 경우 명시적으로 undefined 반환
    return undefined
  }, [isVisible, startAnimation, end, duration])

  return (
    <span ref={counterRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
} 