'use client'

import Cal, { getCalApi } from "@calcom/embed-react"
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
  namespace = "consulting",
  calLink = "familyoffice/consulting"
}: CalComInlineProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async function () {
      try {
        console.log(`🔄 Cal.com 초기화 시작... (namespace: ${namespace}, calLink: ${calLink})`)
        
        const cal = await getCalApi({ namespace })
        
        cal("ui", {
          cssVarsPerTheme: {
            light: { 
              "cal-brand": "#1e3a8a",
              "cal-text": "#000000",
              "cal-bg": "#ffffff",
              "cal-border": "#e5e7eb"
            },
            dark: { 
              "cal-brand": "#3b82f6",
              "cal-text": "#ffffff", 
              "cal-bg": "#1f2937",
              "cal-border": "#374151"
            }
          },
          hideEventTypeDetails: false,
          layout: "month_view"
        })
        
        setIsLoading(false)
        console.log(`✅ Cal.com React 컴포넌트가 성공적으로 로드되었습니다. (${namespace})`)
      } catch (error) {
        console.error('❌ Cal.com 초기화 실패:', error)
        setError(error instanceof Error ? error.message : 'Cal.com 로드 실패')
        setIsLoading(false)
      }
    })()
  }, [namespace, calLink])

  if (error) {
    return (
      <div className="w-full">
        <div 
          className="w-full border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20 p-8 text-center"
          style={{ height }}
        >
          <div className="text-red-600 dark:text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="font-semibold mb-2">Cal.com 로드 실패</h3>
            <p className="text-sm">{error}</p>
          </div>
          <a 
            href="https://cal.com/familyoffice/consulting" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            외부 링크로 예약하기
          </a>
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
            패밀리오피스 S의 전문가들과 직접 상담을 예약하세요. 
            귀하의 자산과 가문의 번영을 위한 맞춤형 솔루션을 제안해 드립니다.
          </p>
        </>
      )}
      
      {isLoading && (
        <div 
          className="w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
          style={{ height }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cal.com 로딩 중...</p>
          </div>
        </div>
      )}
      
      <div 
        className={`w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 ${isLoading ? 'hidden' : 'block'}`}
        style={{ height }}
      >
        <Cal 
          namespace={namespace}
          calLink={calLink}
          style={{ 
            width: "100%", 
            height: "100%", 
            overflow: "auto",
            background: "white"
          }}
          config={{ 
            layout: "month_view",
            theme: "auto"
          }}
        />
      </div>
    </div>
  )
}

export default CalComInline 