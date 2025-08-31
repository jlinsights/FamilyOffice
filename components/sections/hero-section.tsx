'use client';

import React, { useEffect, useState, memo } from 'react';

import { Crown, ArrowDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClientOnlyIcon } from '@/components/ui/client-only-icon';
import { CalComPopup } from '@/components/cal-com-popup';

import { AnimatedCounter } from '@/components/animated-counter';

export const HeroSection = memo(function HeroSection() {
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
      className="mobile-scroll-smooth hero-section-optimized priority-content relative w-full min-h-screen lg:min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-16 lg:pt-20 safe-area-top"
    >
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

      <div className="relative z-10 text-center max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* 상단 태그 */}
        <div className="flex justify-center mb-6 lg:mb-10">
          <Badge
            variant="outline"
            size="lg"
            animation="fade"
          >
            <ClientOnlyIcon icon={Crown} className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
            Heritage Planning Solution
          </Badge>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="mobile-text-optimize font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl leading-tight mb-6 sm:mb-8 lg:mb-10 text-primary whitespace-pre-line animate-slide-up">
          百年永續
        </h1>

        {/* 서브 헤드라인 */}
        <p
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4 sm:mb-6 lg:mb-8 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          기업의 가치를 다음 세대로
        </p>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto animate-slide-up leading-relaxed"
          style={{ animationDelay: '300ms' }}
        >
          성공적인 가업승계는 百年永續의 시작입니다
        </p>

        {/* 핵심 성과 지표 */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-14 lg:mb-20 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 lg:mb-3">
              <AnimatedCounter
                end={10}
                suffix="년+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">가업승계 노하우</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 dark:text-green-400 mb-2 lg:mb-3">
              <AnimatedCounter
                end={1500}
                suffix="+"
                startAnimation={startAnimation}
                duration={2000}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">
              M&A 플랫폼
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>잠재 매수기업
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-600 dark:text-violet-400 mb-2 lg:mb-3">
              <AnimatedCounter
                end={60}
                suffix="+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">
              Big 4 출신
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>전문가 컨소시엄
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2 lg:mb-3">
              <AnimatedCounter
                end={88}
                suffix="%"
                startAnimation={startAnimation}
                duration={1800}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">
              법인 CEO
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>고정자산 비중
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div
          className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 sm:mb-16 lg:mb-20 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <CalComPopup
            buttonText="지금 바로 상담 예약"
            variant="default"
            size="lg"
            className="interaction-ready px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg transition-colors duration-200"
            eventType="consultation"
          />
          <Button
            size="lg"
            variant="outline"
            className="interaction-ready font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl shadow-lg transition-colors duration-200"
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

        {/* 스크롤 인디케이터 */}
        <div className="animate-bounce mt-8 lg:mt-12">
          <ClientOnlyIcon
            icon={ArrowDown}
            className="h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground mx-auto"
          />
        </div>
      </div>
    </section>
  );
});
