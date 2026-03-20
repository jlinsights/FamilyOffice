import { AlertTriangle, Phone, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/animated-counter';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { cn } from '@/lib/utils';

export interface SALHeroSectionProps {
  startAnimation: boolean;
  easingFunction: (t: number) => number;
}

export function SALHeroSection({
  startAnimation,
  easingFunction,
}: SALHeroSectionProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* 상단 경고 태그 */}
        <div className="flex justify-center mb-8">
          <Badge
            variant="outline"
            className="animate-fade-in bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            Critical Business Risk
          </Badge>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
          중대재해처벌법{'\n'}완벽 대응 가이드
        </h1>

        {/* 서브 헤드라인 */}
        <p
          className="text-xl md:text-2xl font-semibold text-foreground mb-4 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          경영진 처벌과 기업 존폐를 막는 최후의 보루
        </p>

        <p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed whitespace-pre-line"
          style={{ animationDelay: '300ms' }}
        >
          중대재해 발생 시 경영책임자는 1년 이상 징역 또는 10억원 이하 벌금
          {'\n'}
          안전관리체계 구축부터 보험까지, 완벽한 예방 솔루션을 제공합니다
        </p>

        {/* 핵심 통계 지표 */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
              <AnimatedCounter
                end={10}
                suffix="억원"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">최대 벌금</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              <AnimatedCounter
                end={1}
                suffix="년"
                startAnimation={startAnimation}
                duration={1200}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">최소 징역</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              <AnimatedCounter
                end={50}
                suffix="인"
                startAnimation={startAnimation}
                duration={1800}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              적용 기업규모
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              <AnimatedCounter
                end={2022}
                startAnimation={startAnimation}
                duration={2000}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">시행연도</div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <CalComPopup
            buttonText="무료 진단 신청"
            variant="default"
            size="lg"
            className="font-bold shadow-lg px-8 py-4 text-lg bg-red-600 hover:bg-red-700"
          />
          <a
            href="tel:0502-5550-8700"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'font-bold shadow-lg px-8 py-4 text-lg'
            )}
          >
            <Phone className="mr-2 h-5 w-5" />☎ 0502-5550-8700
          </a>
          <Button
            variant="outline"
            size="lg"
            className="font-bold shadow-lg px-8 py-4 text-lg"
            onClick={() => {
              const element = document.getElementById('risk-assessment');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Target className="mr-2 h-5 w-5" />
            위험도 자가진단
          </Button>
        </div>
      </div>
    </section>
  );
}
