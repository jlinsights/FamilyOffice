'use client'

import { Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react"

interface CalComIframeProps {
  calLink?: string;
  height?: string;
}

export function CalComIframe({ 
  calLink = "familyoffice/consulting",
  height = "600px"
}: CalComIframeProps) {

  const availableSlots = [
    { date: "7월 15일", time: "오전 10:00", available: true },
    { date: "7월 15일", time: "오후 2:00", available: true },
    { date: "7월 15일", time: "오후 4:00", available: false },
    { date: "7월 16일", time: "오전 9:00", available: true },
    { date: "7월 16일", time: "오전 11:00", available: true },
    { date: "7월 16일", time: "오후 3:00", available: true },
    { date: "7월 17일", time: "오전 10:00", available: true },
    { date: "7월 17일", time: "오후 1:00", available: false },
    { date: "7월 17일", time: "오후 5:00", available: true },
  ]

  return (
    <div className="w-full">
      <div 
        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 p-6"
        style={{ height }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
            세미나 상담 예약
          </h3>
          <p className="text-sm text-muted-foreground dark:text-gray-300">
            전문가와 1:1 상담을 통해 맞춤형 세미나 정보를 받아보세요
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-semibold text-blue-900 dark:text-blue-300">30분</div>
            <div className="text-xs text-blue-700 dark:text-blue-300">상담 시간</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
            <div className="text-lg font-semibold text-green-900 dark:text-green-300">무료</div>
            <div className="text-xs text-green-700 dark:text-green-300">상담 비용</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
            <div className="text-lg font-semibold text-purple-900 dark:text-purple-300">온라인</div>
            <div className="text-xs text-purple-700 dark:text-purple-300">상담 방식</div>
          </div>
        </div>

        {/* Available Slots Preview */}
        <div className="mb-8">
          <h4 className="font-medium mb-4 text-foreground dark:text-white">예약 가능한 시간</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {availableSlots.map((slot, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border text-sm ${
                  slot.available 
                    ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{slot.date}</div>
                    <div className="text-xs">{slot.time}</div>
                  </div>
                  <div>
                    {slot.available ? (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="text-xs">예약됨</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a 
            href={`https://cal.com/${calLink}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg group"
          >
            지금 상담 예약하기
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-muted-foreground dark:text-gray-400 mt-3">
            클릭하시면 Cal.com 예약 페이지로 이동합니다
          </p>
        </div>
      </div>
    </div>
  )
}