'use client';

import { useState, useEffect } from 'react';
import { Calendar, X, Clock, Users, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CalComPopupProps {
  trigger?: React.ReactNode;
  buttonText?: string;
  calLink?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  eventType?: 'consultation' | 'seminar' | 'demo' | 'follow-up';
}

export function CalComPopup({
  trigger,
  buttonText = '무료 상담 예약',
  calLink = 'familyoffice',
  variant = 'default',
  size = 'lg',
  className = '',
  eventType = 'consultation',
}: CalComPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, resolvedTheme } = useTheme();

  // Event type specific configurations
  const eventConfigs = {
    consultation: {
      title: '무료 상담 예약',
      description: '패밀리오피스 전문가와의 1:1 맞춤 상담',
      duration: '60분',
      features: ['맞춤형 자산관리 전략', '세무 최적화 방안', '승계 계획 수립', '직업 커리어 상담'],
      calPath: 'familyoffice',
    },
    seminar: {
      title: '세미나 참가 신청',
      description: '전문가 세미나 및 워크샵 참가',
      duration: '120분',
      features: ['전문가 강의', '실무 사례 공유', 'Q&A 세션'],
      calPath: 'familyoffice/seminar',
    },
    demo: {
      title: '서비스 데모 예약',
      description: '플랫폼 시연 및 기능 소개',
      duration: '30분',
      features: ['실시간 플랫폼 시연', '기능별 상세 설명', '질의응답'],
      calPath: 'familyoffice/demo',
    },
    'follow-up': {
      title: '후속 상담 예약',
      description: '기존 고객 대상 후속 상담',
      duration: '45분',
      features: ['진행 상황 점검', '추가 전략 제안', '실행 계획 조정'],
      calPath: 'familyoffice/follow-up',
    },
  };

  const config = eventConfigs[eventType];
  
  // Cal.com theme configuration - force dark mode for better visibility
  const isDark = resolvedTheme === 'dark';
  const calTheme = isDark ? 'dark' : 'light';
  const fullCalLink = `https://cal.com/${config.calPath}?embed=1&theme=dark&bg=000000&text=ffffff&layout=month_view`;

  useEffect(() => {
    if (isOpen) {
      // Cal.com embed script loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reload iframe when theme changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resolvedTheme, isOpen]);

  const handleExternalLink = () => {
    window.open(fullCalLink, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const DefaultTrigger = (
    <Button
      variant={variant}
      size={size}
      className={`font-bold shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <Calendar className="mr-2 h-4 w-4" />
      {buttonText}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || DefaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full h-[99vh] p-0 bg-background text-foreground">
        <DialogHeader className="px-3 pt-2 pb-2 border-b bg-background flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                <Calendar className="h-2.5 w-2.5 text-primary" />
              </div>
              <div className="flex items-center space-x-4">
                <DialogTitle className="text-sm font-bold">{config.title}</DialogTitle>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-2.5 w-2.5" />
                    <span>{config.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Users className="h-2.5 w-2.5" />
                    <span>1:1 전문가 상담</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-xs text-muted-foreground">예약 시스템 로딩 중...</p>
              </div>
            </div>
          )}

          {/* 상담 분야 오버레이 - Cal.com 위에 표시 */}
          <div className="absolute top-2 left-2 right-2 z-20 pointer-events-none">
            <div className="bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                {config.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-1 text-xs bg-muted/30 rounded px-1.5 py-0.5">
                    <CheckCircle className="h-2.5 w-2.5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground text-xs leading-none">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cal.com iframe 전체 영역 활용 */}
          <div className="w-full h-full bg-black">
            <iframe
              src={fullCalLink}
              width="100%"
              height="100%"
              style={{
                border: 'none',
                background: '#000000',
                colorScheme: 'dark',
                filter: 'invert(0) contrast(1.2) brightness(0.9)',
                display: 'block',
              }}
              className="cal-com-iframe-forced-dark w-full h-full"
              title={config.title}
              onLoad={() => setIsLoading(false)}
              allow="camera; microphone"
            />
          </div>

          {/* Alternative action button */}
          <div className="absolute bottom-1 right-1 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExternalLink}
              className="bg-background/95 backdrop-blur-sm text-xs border-border hover:bg-muted/80 h-7 px-2"
            >
              새 창에서 열기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}