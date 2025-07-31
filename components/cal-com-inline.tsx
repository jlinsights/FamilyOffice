'use client'

import { useEffect, useState } from "react"

interface CalComInlineProps {
  showHeader?: boolean;
  height?: string;
  namespace?: string;
  calLink?: string;
}

export function CalComInline({ 
  showHeader = false, 
  height = "500px",
  calLink = "familyoffice/consulting"
}: CalComInlineProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 로딩 상태를 잠시 후 해제
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">예약 시스템을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {showHeader && (
        <>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">무료 상담 예약</h2>
          <p className="text-muted-foreground dark:text-muted-foreground mb-8">
            <span className="playfair-display-bold">FamilyOffice S</span>의 전문가들과 직접 상담을 예약하세요. 
            귀하의 자산과 가문의 번영을 위한 맞춤형 솔루션을 제안해 드립니다.
          </p>
        </>
      )}
      
      <div 
        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
        style={{ height }}
      >
        <iframe
          src={`https://cal.com/${calLink}`}
          width="100%"
          height="100%"
          style={{
            border: "none",
            background: "white"
          }}
          title="상담 예약"
        />
      </div>
    </div>
  )
} 