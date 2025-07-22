'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

interface CalComButtonProps {
  calLink?: string
  buttonText?: string
  className?: string
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function CalComButton({ 
  calLink = 'familyoffice/consultation',
  buttonText = '상담 예약',
  className = '',
  variant = 'default',
  size = 'lg'
}: CalComButtonProps) {
  const fullCalUrl = calLink.startsWith('http') ? calLink : `https://cal.com/${calLink}`

  useEffect(() => {
    // Cal.com 스크립트가 로드되었는지 확인
    const checkCalCom = () => {
      if (typeof window !== 'undefined' && typeof window.Cal === 'function') {
        console.log('✅ Cal.com is ready for button')
        return true
      }
      return false
    }

    // 주기적으로 Cal.com 준비 상태 확인
    const interval = setInterval(() => {
      if (checkCalCom()) {
        clearInterval(interval)
      }
    }, 1000)

    // 10초 후 정리
    setTimeout(() => clearInterval(interval), 10000)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (typeof window !== 'undefined' && typeof window.Cal === 'function') {
      // Cal.com 모달 열기
      window.Cal('openModal', calLink)
    } else {
      // Cal.com이 로드되지 않은 경우 직접 링크로 이동
      window.open(fullCalUrl, '_blank')
    }
  }

  return (
    <Button
      onClick={handleClick}
      data-cal-link={calLink}
      variant={variant}
      size={size}
      className={`font-bold shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <Calendar className="mr-2 h-4 w-4" />
      {buttonText}
    </Button>
  )
} 