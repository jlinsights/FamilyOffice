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
            className="border-amber-200 bg-gradient-to-r from-amber-50/80 to-amber-100/50 text-amber-800 dark:border-amber-800 dark:from-amber-950/80 dark:to-amber-900/50 dark:text-amber-200 shadow-lg backdrop-blur-sm"
          >
            <ClientOnlyIcon icon={Crown} className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
            Family Office Excellence
          </Badge>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="mobile-text-optimize font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-r from-primary via-blue-700 to-amber-600 bg-clip-text text-transparent whitespace-pre-line animate-slide-up">
          Family Office
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider">
            세대를 잇는 자산관리
          </span>
        </h1>

        {/* 서브 헤드라인 */}
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-4 sm:mb-6 lg:mb-8 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          최고 자산가와 성공한 기업가를 위한
          <span className="block mt-1 font-light text-muted-foreground">
            차별화된 전용 솔루션
          </span>
        </p>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto animate-slide-up leading-relaxed font-light"
          style={{ animationDelay: '300ms' }}
        >
          자산 보전부터 가업승계, 차세대 육성까지
          <span className="block mt-1">
            百年永續의 기반을 함께 구축합니다
          </span>
        </p>

        {/* 핵심 성과 지표 */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-14 lg:mb-20 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-premium-gold-enhanced mb-2 lg:mb-3">
              <AnimatedCounter
                end={20}
                suffix="년+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">Family Office 전문 경험</div>
          </div>
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-premium-navy-enhanced mb-2 lg:mb-3">
              <AnimatedCounter
                end={100}
                suffix="+"
                startAnimation={startAnimation}
                duration={2000}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">
              VIP 고객
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>패밀리 서비스
            </div>
          </div>
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-enhanced mb-2 lg:mb-3">
              <AnimatedCounter
                end={10}
                suffix="조+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">
              관리 자산
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>규모
            </div>
          </div>
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-enhanced mb-2 lg:mb-3">
              <AnimatedCounter
                end={98}
                suffix="%"
                startAnimation={startAnimation}
                duration={1800}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">
              고객 만족도
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>평가
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
            통합 자산관리 솔루션 알아보기
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
