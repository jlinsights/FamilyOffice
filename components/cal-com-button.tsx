'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { getCalApi } from '@calcom/embed-react'

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
    (async function () {
      const cal = await getCalApi({ "namespace": "consulting" })
      cal("ui", {
        "cssVarsPerTheme": {
          "light": { "cal-brand": "#000000" },
          "dark": { "cal-brand": "#ffffff" }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      })
    })()
  }, [])

  const handleClick = () => {
    // Cal.com 팝업 열기
    if (typeof window !== 'undefined' && (window as any).Cal) {
      (window as any).Cal('ns.consulting', 'open', { calLink })
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