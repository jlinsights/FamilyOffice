'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { AnimatedCounter } from '@/components/animated-counter';
import { HERO_CONTENT } from '@/constants/main-page';

export const HeroStats = memo(function HeroStats() {
  const [startAnimation, setStartAnimation] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !startAnimation) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [startAnimation]);

  return (
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
        <div className="text-xs sm:text-sm lg:text-base text-stat-description font-medium">
          {HERO_CONTENT.stats.assetManagement}
        </div>
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
          {HERO_CONTENT.stats.corporateClients}
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
          {HERO_CONTENT.stats.experience}
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
          {HERO_CONTENT.stats.satisfaction}
        </div>
      </div>
    </div>
  );
});
