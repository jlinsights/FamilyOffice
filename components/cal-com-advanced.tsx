'use client'

// Cal.com API를 활용한 고급 기능 예시
export function CalComAdvanced() {
  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">고급 예약 기능</h3>
      <p className="text-muted-foreground mb-4">
        Cal.com API를 활용한 고급 예약 시스템 - 개발 예정
      </p>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div>• 실시간 예약 가능 시간 조회</div>
        <div>• 자동화된 예약 확인 및 알림</div>
        <div>• 고객 히스토리 및 선호도 분석</div>
        <div>• 다중 캘린더 통합 관리</div>
      </div>
    </div>
  )
}

// 타입 정의
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
} 