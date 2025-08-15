'use client';

import { Phone } from 'lucide-react';
import { CalComPopup } from './cal-com-popup';
import { Button } from '@/components/ui/button';

// SuperClaude 40+ CEO 타겟 플로팅 버튼 최적화
export function CalComFloating() {
  // BMAD Method Decisional: 즉시 연락 가능한 전화상담 우선
  const handlePhoneCall = () => {
    window.open('tel:0502-5550-8700', '_self');
  };
  
  // 40+ 사용자 행동 패턴: 전화 > 온라인 예약
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* 메인 전화상담 버튼 */}
      <Button
        onClick={handlePhoneCall}
        size="lg"
        className="shadow-xl hover:shadow-2xl transition-all duration-300 
                   bg-primary hover:bg-primary/90 text-primary-foreground 
                   font-bold rounded-full min-w-[160px] min-h-[64px] px-6 py-4
                   text-lg hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-4 focus:ring-primary/30
                   border-2 border-white"
      >
        <Phone className="mr-2 h-5 w-5" />
        전화상담
      </Button>
      
      {/* 서브 온라인 예약 버튼 */}
      <CalComPopup 
        trigger={
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg hover:shadow-xl transition-all duration-300
                       bg-white hover:bg-gray-50 border-2 border-primary
                       text-primary hover:text-primary/80 font-semibold
                       rounded-full min-w-[140px] min-h-[48px] px-4 py-2
                       text-sm hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            온라인 예약
          </Button>
        }
        buttonText="무료 상담 예약"
        eventType="consultation"
        variant="default"
        size="lg"
      />
    </div>
  );
}
