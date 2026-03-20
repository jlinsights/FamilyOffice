import { Briefcase, Phone, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/animated-counter';
import { cn } from '@/lib/utils';

export interface RecruitHeroSectionProps {
  startAnimation: boolean;
  easingFunction: (t: number) => number;
}

export function RecruitHeroSection({
  startAnimation,
  easingFunction,
}: RecruitHeroSectionProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
      {/* 배경 그라데이션 효과 - 메인 페이지와 동일 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* 상단 태그 */}
        <div className="flex justify-center mb-8">
          <Badge
            variant="outline"
            className="animate-fade-in bg-background/80 backdrop-blur-sm"
          >
            <Briefcase className="h-3 w-3 mr-1" />
            Career Opportunities
          </Badge>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
          삼성생명 GFC{'\n'}위촉
        </h1>

        {/* 서브 헤드라인 */}
        <p
          className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          풍부한 경험이 곧 자산입니다
        </p>

        <p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed whitespace-pre-line"
          style={{ animationDelay: '300ms' }}
        >
          세컨드 커리어로 시작하는 새로운 성공{'\n'}
          경력을 활용한 고소득 비즈니스 파이프라인 구축
        </p>

        {/* 핵심 성과 지표 - 메인 페이지와 동일한 스타일 */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              <AnimatedCounter
                end={95}
                suffix="%"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">직원 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              <AnimatedCounter
                end={24}
                suffix="개월"
                startAnimation={startAnimation}
                duration={1800}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              평균 교육기간
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">
              <AnimatedCounter
                end={85}
                suffix="%"
                startAnimation={startAnimation}
                duration={1600}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">내부 승진률</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              <AnimatedCounter
                end={4}
                suffix="개"
                startAnimation={startAnimation}
                duration={1200}
                easingFunction={easingFunction}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              현재 채용직군
            </div>
          </div>
        </div>

        {/* CTA 버튼 - 메인 페이지와 동일한 스타일 */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <a
            href="https://cal.com/familyoffice/recruit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              GFC 위촉 상담 신청
            </Button>
          </a>
          <a
            href="tel:0502-5550-8700"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'font-bold shadow-lg px-8 py-4 text-lg'
            )}
          >
            <Phone className="mr-2 h-5 w-5" /> 0502-5550-8700
          </a>
          <Button
            variant="outline"
            size="lg"
            className="font-bold shadow-lg px-8 py-4 text-lg"
            onClick={() =>
              window.open('https://recruit.familyoffices.vip', '_blank')
            }
          >
            <Users className="mr-2 h-5 w-5" />
            잡페어 참석하기
          </Button>
        </div>
      </div>
    </section>
  );
}
