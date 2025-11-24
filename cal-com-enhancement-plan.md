# 🗓️ Cal.com 통합 개선 계획

## 현재 문제점
- 외부 링크 방식으로만 구현 (`window.open`)
- 사용자가 사이트를 떠나야 함 (이탈률 증가)
- 서비스별 맞춤 예약 시스템 없음
- CRM 연동 부재

## 개선 계획

### 1. 인라인 임베딩 구현
```typescript
// components/cal-com-embedded.tsx
'use client';

import { useEffect } from 'react';
import { Cal, getCalApi } from "@calcom/embed-react";

interface CalComEmbeddedProps {
  calLink: string;
  height?: string;
  config?: {
    name?: string;
    email?: string;
    notes?: string;
    theme?: 'light' | 'dark';
  };
}

export function CalComEmbedded({ 
  calLink, 
  height = "500px",
  config = {}
}: CalComEmbeddedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: config.theme || 'light',
        styles: { branding: { brandColor: "#1e3a8a" } },
        hideEventTypeDetails: false,
      });
    })();
  }, [config.theme]);

  return (
    <div style={{ height, overflow: 'hidden' }}>
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          theme: config.theme || 'light',
          name: config.name,
          email: config.email,
          notes: config.notes,
        }}
      />
    </div>
  );
}
```

### 2. 서비스별 맞춤 예약 시스템
```typescript
// lib/cal-com-config.ts
export const calComLinks = {
  // 일반 상담
  general: 'familyoffice/30min',
  
  // 서비스별 전문 상담
  familyOffice: 'familyoffice/family-office-consultation',
  succession: 'familyoffice/succession-planning',
  taxOptimization: 'familyoffice/tax-strategy',
  riskManagement: 'familyoffice/risk-management',
  
  // 교육 프로그램
  ceoProgram: 'familyoffice/ceo-program-info',
  seminar: 'familyoffice/seminar-registration',
  
  // 긴급/VIP
  urgent: 'familyoffice/urgent-consultation',
  vip: 'familyoffice/vip-session'
};

export const calComConfig = {
  familyOffice: {
    title: '패밀리오피스 전문 상담',
    description: '글로벌 패밀리오피스 설립 및 운영 전략 상담',
    duration: 60,
    questions: [
      '현재 관리 자산 규모',
      '관심 있는 서비스 영역',
      '상담 희망 일정'
    ]
  },
  succession: {
    title: '가업승계 전략 상담',
    description: '성공적인 가업승계를 위한 종합 전략 수립',
    duration: 90,
    questions: [
      '기업 업종 및 규모',
      '승계 예정 시기',
      '현재 가족 구성원 현황'
    ]
  },
  // ... 기타 서비스별 설정
};
```

### 3. 스마트 예약 위젯
```typescript
// components/smart-booking-widget.tsx
'use client';

interface SmartBookingWidgetProps {
  pageContext?: 'homepage' | 'service' | 'blog' | 'about';
  serviceType?: keyof typeof calComLinks;
  userInfo?: {
    name?: string;
    email?: string;
    company?: string;
  };
}

export function SmartBookingWidget({ 
  pageContext = 'homepage',
  serviceType,
  userInfo 
}: SmartBookingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(serviceType);

  // 페이지 컨텍스트에 따른 추천 서비스 로직
  const getRecommendedService = (context: string) => {
    switch (context) {
      case 'service': return serviceType || 'general';
      case 'blog': return 'general';
      case 'about': return 'familyOffice';
      default: return 'general';
    }
  };

  const calLink = selectedService ? calComLinks[selectedService] : calComLinks.general;
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 플로팅 버튼 */}
      <Button 
        onClick={() => setIsOpen(true)}
        className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all"
        size="lg"
      >
        <Calendar className="w-6 h-6" />
      </Button>

      {/* 모달 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>무료 전문가 상담 예약</DialogTitle>
            <DialogDescription>
              FamilyOffice S 전문가와 1:1 맞춤 상담을 받아보세요
            </DialogDescription>
          </DialogHeader>
          
          {/* 서비스 선택 */}
          <div className="mb-4">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="상담 분야를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(calComConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.title} ({config.duration}분)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cal.com 임베드 */}
          <CalComEmbedded
            calLink={calLink}
            height="500px"
            config={{
              name: userInfo?.name,
              email: userInfo?.email,
              notes: userInfo?.company ? `회사: ${userInfo.company}` : '',
              theme: 'light'
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
```