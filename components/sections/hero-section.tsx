'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';

import { ArrowDown, Crown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClientOnlyIcon } from '@/components/ui/client-only-icon';

import { AnimatedCounter } from '@/components/animated-counter';

export const HeroSection = memo(function HeroSection() {
  const router = useRouter();
  const [startAnimation, setStartAnimation] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer로 통계 섹션이 보일 때 애니메이션 시작
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !startAnimation) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.3 } // 30% 보일 때 트리거
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [startAnimation]);

  return (
    <section
      id="hero"
      className="mobile-scroll-smooth hero-section-optimized priority-content relative w-full min-h-screen lg:min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-16 lg:pt-20 safe-area-top"
    >
      {/* 배경 그라데이션 효과 - LCP에 영향을 주지 않도록 절대 위치 유지 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* 상단 태그 */}
        <div className="flex justify-center mb-6 lg:mb-10 min-h-[32px] lg:min-h-[40px]">
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

        {/* 메인 헤드라인 - LCP Element */}
        {/* 애니메이션으로 인해 보이지 않는 문제를 해결하기 위해 opacity-0 제거 또는 초기값 조정 */}
        <h1 className="mobile-text-optimize font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-r from-primary via-blue-700 to-amber-600 bg-clip-text text-transparent whitespace-pre-line font-serif animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-backwards">
          百年永續
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider font-sans text-foreground">
            가문의 영원한 번영을 위한 약속
          </span>
        </h1>

        {/* 서브 헤드라인 (SEO: Family Office 키워드 포함) */}
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-4 sm:mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-backwards"
        >
          성공한 기업가와 자산가를 위한
          <span className="block mt-1 font-light text-muted-foreground">
            프라이빗 패밀리 오피스
          </span>
        </p>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-backwards"
        >
          자산의 보전을 넘어,
          <span className="block mt-1">
            위대한 유산이 세대를 이어갈 수 있도록 돕습니다
          </span>
        </p>

        {/* 핵심 성과 지표 */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-14 lg:mb-20 min-h-[160px]"
        >
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium transition-all duration-500 delay-100 border-glow">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-premium-gold-enhanced mb-2 lg:mb-3 tabular-nums">
              <AnimatedCounter
                end={500}
                suffix="억원+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">자산관리 실적</div>
          </div>
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium transition-all duration-500 delay-200 border-glow">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-premium-navy-enhanced mb-2 lg:mb-3 tabular-nums">
              <AnimatedCounter
                end={500}
                suffix="+"
                startAnimation={startAnimation}
                duration={2000}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">
              법인 고객사
            </div>
          </div>
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium transition-all duration-500 delay-300 border-glow">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-enhanced mb-2 lg:mb-3 tabular-nums">
              <AnimatedCounter
                end={20}
                suffix="년+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">
              전문 경험
            </div>
          </div>
          <div className="text-center glass-premium-enhanced rounded-2xl p-6 hover-premium transition-all duration-500 delay-400 border-glow">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-enhanced mb-2 lg:mb-3 tabular-nums">
              <AnimatedCounter
                end={98}
                suffix="%"
                startAnimation={startAnimation}
                duration={1800}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">
              만족도
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div
          className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 sm:mb-16 lg:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-backwards"
        >
          <Button
            size="lg"
            variant="default"
            className="interaction-ready px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg transition-colors duration-200"
            onClick={() => router.push('/structure-check#request-form')}
          >
            전문가 상담 예약
          </Button>
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
            서비스 솔루션 보기
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
