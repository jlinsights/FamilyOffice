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
  useEffect(() => {
    // Cal.com 스크립트 로드
    const loadCalScript = () => {
      if (typeof window === 'undefined' || (window as any).Cal) return

      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.async = true
      script.onload = () => {
        if ((window as any).Cal) {
          (window as any).Cal('init', {
            origin: 'https://cal.com'
          })
        }
      }
      document.head.appendChild(script)
    }

    loadCalScript()
  }, [])

  const handleClick = () => {
    if (typeof window === 'undefined') return

    // Cal.com 팝업 열기
    if ((window as any).Cal) {
      try {
        (window as any).Cal('open', { calLink })
      } catch (error) {
        console.error('Cal.com 팝업 열기 실패:', error)
        // 폴백: 외부 링크로 이동
        window.open(`https://cal.com/${calLink}`, '_blank')
      }
    } else {
      // Cal API가 없으면 외부 링크로 이동
      window.open(`https://cal.com/${calLink}`, '_blank')
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`font-bold shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <Calendar className="mr-2 h-4 w-4" />
      {buttonText}
    </Button>
  )
} 