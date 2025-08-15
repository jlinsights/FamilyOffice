'use client';

import { Crown, ArrowDown } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClientOnlyIcon } from '@/components/ui/client-only-icon';
import { CalComPopup } from '@/components/cal-com-popup';

import { AnimatedCounter } from '@/components/animated-counter';

// SuperClaude Designer 40+ UX 최적화 임포트
import {
  typography40Plus,
  touchTargets40Plus,
  spacing40Plus,
  colorSystem40Plus,
  animations40Plus,
  getResponsiveText,
  getTouchFriendlyButton
} from '@/lib/design-system-40plus';

export function HeroSection() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500); // 500ms 지연 후 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className={`relative w-full min-h-screen lg:min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden ${spacing40Plus.sectionGap}`}
    >
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

      <div className={`relative z-10 text-center max-w-7xl mx-auto ${spacing40Plus.containerPadding} ${spacing40Plus.sectionGap}`}>
        {/* 상단 태그 - 40+ 가독성 향상 */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <Badge
            variant="outline"
            size="lg"
            animation="fade"
            className={`${getResponsiveText('sm')} ${touchTargets40Plus.optimal.padding} ${animations40Plus.focus.ring}`}
          >
            <ClientOnlyIcon icon={Crown} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2" />
            Heritage Planning Solution
          </Badge>
        </div>

        {/* 메인 헤드라인 - 40+ 최적화 */}
        <h1 className={`${typography40Plus.fontWeights.extrabold} ${typography40Plus.fontSizes['5xl']} ${typography40Plus.lineHeights.tight} mb-8 sm:mb-10 md:mb-12 text-primary whitespace-pre-line animate-slide-up ${typography40Plus.letterSpacing.normal}`}>
          百年永續
        </h1>

        {/* 서브 헤드라인 - 40+ 최적화 */}
        <p
          className={`${typography40Plus.fontSizes['2xl']} ${typography40Plus.fontWeights.semibold} ${typography40Plus.lineHeights.normal} text-foreground mb-6 sm:mb-8 md:mb-10 animate-slide-up ${typography40Plus.letterSpacing.normal}`}
          style={{ animationDelay: '200ms' }}
        >
          기업의 가치를 다음 세대로
        </p>

        <p
          className={`${typography40Plus.fontSizes.lg} ${typography40Plus.fontWeights.medium} ${typography40Plus.lineHeights.relaxed} text-muted-foreground mb-10 sm:mb-12 md:mb-16 max-w-4xl mx-auto animate-slide-up ${typography40Plus.letterSpacing.normal}`}
          style={{ animationDelay: '300ms' }}
        >
          성공적인 가업승계는 百年永續의 시작입니다
        </p>

        {/* 핵심 성과 지표 - 40+ 최적화 */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 ${spacing40Plus.buttonGap} mb-12 sm:mb-16 md:mb-20 animate-slide-up`}
          style={{ animationDelay: '400ms' }}
        >
          <div className="text-center">
            <div className={`${typography40Plus.fontSizes['3xl']} ${typography40Plus.fontWeights.bold} text-primary mb-3 sm:mb-4`}>
              <AnimatedCounter
                end={10}
                suffix="년+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className={`${typography40Plus.fontSizes.sm} ${typography40Plus.fontWeights.medium} text-muted-foreground`}>가업승계 노하우</div>
          </div>
          <div className="text-center">
            <div className={`${typography40Plus.fontSizes['3xl']} ${typography40Plus.fontWeights.bold} text-green-600 dark:text-green-400 mb-3 sm:mb-4`}>
              <AnimatedCounter
                end={1500}
                suffix="+"
                startAnimation={startAnimation}
                duration={2000}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className={`${typography40Plus.fontSizes.sm} ${typography40Plus.fontWeights.medium} text-muted-foreground ${typography40Plus.lineHeights.normal}`}>
              M&A 플랫폼
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>잠재 매수기업
            </div>
          </div>
          <div className="text-center">
            <div className={`${typography40Plus.fontSizes['3xl']} ${typography40Plus.fontWeights.bold} text-violet-600 dark:text-violet-400 mb-3 sm:mb-4`}>
              <AnimatedCounter
                end={60}
                suffix="+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className={`${typography40Plus.fontSizes.sm} ${typography40Plus.fontWeights.medium} text-muted-foreground ${typography40Plus.lineHeights.normal}`}>
              Big 4 출신
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>전문가 컨소시엄
            </div>
          </div>
          <div className="text-center">
            <div className={`${typography40Plus.fontSizes['3xl']} ${typography40Plus.fontWeights.bold} text-orange-600 dark:text-orange-400 mb-3 sm:mb-4`}>
              <AnimatedCounter
                end={88}
                suffix="%"
                startAnimation={startAnimation}
                duration={1800}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className={`${typography40Plus.fontSizes.sm} ${typography40Plus.fontWeights.medium} text-muted-foreground ${typography40Plus.lineHeights.normal}`}>
              법인 CEO
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>고정자산 비중
            </div>
          </div>
        </div>

        {/* CTA 버튼 - 40+ 터치 최적화 */}
        <div
          className={`flex flex-col sm:flex-row ${spacing40Plus.buttonGap} justify-center mb-12 sm:mb-16 md:mb-20 animate-slide-up`}
          style={{ animationDelay: '500ms' }}
        >
          <CalComPopup
            buttonText="지금 바로 상담 예약"
            variant="default"
            size="lg"
            className={`${touchTargets40Plus.primary.width} ${touchTargets40Plus.primary.height} ${touchTargets40Plus.primary.padding} ${typography40Plus.fontSizes.lg} ${typography40Plus.fontWeights.bold} bg-primary hover:bg-primary/90 text-white shadow-lg ${animations40Plus.hover.scale} ${animations40Plus.focus.ring} ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration}`}
            eventType="consultation"
          />
          <Button
            size="lg"
            variant="outline"
            className={`${touchTargets40Plus.primary.width} ${touchTargets40Plus.primary.height} ${touchTargets40Plus.primary.padding} ${typography40Plus.fontSizes.lg} ${typography40Plus.fontWeights.bold} shadow-lg ${animations40Plus.hover.scale} ${animations40Plus.focus.ring} ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration}`}
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            헤리티지 플래닝 알아보기
          </Button>
        </div>

        {/* 스크롤 인디케이터 - 40+ 최적화 */}
        <div className={`${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration} animate-bounce mt-10 sm:mt-12 md:mt-16`}>
          <ClientOnlyIcon
            icon={ArrowDown}
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
