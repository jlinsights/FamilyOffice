import { Badge } from '@/components/ui/badge';
import { HERO_CONTENT } from '@/constants/main-page';
import { ArrowDown, Crown } from 'lucide-react';
import { HeroActions } from './hero-actions';
import { HeroStats } from './hero-stats';

export function HeroSection() {
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
            <Crown className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
            {HERO_CONTENT.badge}
          </Badge>
        </div>

        {/* 메인 헤드라인 - LCP Element */}
        {/* 애니메이션 제거하여 LCP 최적화 */}
        <h1 className="mobile-text-optimize font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-r from-primary via-blue-700 to-amber-600 bg-clip-text text-transparent whitespace-pre-line font-serif">
          {HERO_CONTENT.title.main}
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider font-sans text-foreground">
            {HERO_CONTENT.title.sub}
          </span>
        </h1>

        {/* 서브 헤드라인 (SEO: Family Office 키워드 포함) */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-4 sm:mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-backwards">
          {HERO_CONTENT.subtitle.prefix}
          <span className="block mt-1 font-light text-muted-foreground">
            {HERO_CONTENT.subtitle.highlight}
          </span>
        </p>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-backwards">
          {HERO_CONTENT.description.prefix}
          <span className="block mt-1">
            {HERO_CONTENT.description.highlight}
          </span>
        </p>

        {/* 핵심 성과 지표 (Client Component) */}
        <HeroStats />

        {/* CTA 버튼 (Client Component) */}
        <HeroActions />

        {/* 스크롤 인디케이터 */}
        <div className="animate-bounce mt-8 lg:mt-12">
          <ArrowDown className="h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground mx-auto" />
        </div>
      </div>
    </section>
  );
}
