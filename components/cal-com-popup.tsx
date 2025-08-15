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
      features: ['맞춤형 자산관리 전략', '세무 최적화 방안', '승계 계획 수립'],
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
      <DialogContent className="max-w-5xl w-full h-[85vh] p-0 bg-background text-foreground">
        <DialogHeader className="p-4 pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">{config.title}</DialogTitle>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{config.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>1:1 전문가 상담</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-sm text-muted-foreground">예약 시스템을 불러오는 중...</p>
              </div>
            </div>
          )}

          <div className="h-full p-3">
            {/* Cal.com iframe container with enhanced dark mode */}
            <div className="w-full h-full rounded-lg overflow-hidden bg-black">
              <iframe
                src={fullCalLink}
                width="100%"
                height="100%"
                style={{
                  border: 'none',
                  background: '#000000',
                  colorScheme: 'dark',
                  filter: 'invert(0) contrast(1.2) brightness(0.9)',
                }}
                className="cal-com-iframe-forced-dark"
                title={config.title}
                onLoad={() => setIsLoading(false)}
                allow="camera; microphone"
              />
            </div>
          </div>

          {/* Alternative action button */}
          <div className="absolute bottom-3 right-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExternalLink}
              className="bg-background/90 backdrop-blur-sm text-xs"
            >
              새 창에서 열기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}