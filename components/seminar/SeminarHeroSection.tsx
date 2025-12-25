'use client';

import { Calendar, GraduationCap, Users } from 'lucide-react';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// AnimatedCounter를 동적으로 import
const AnimatedCounter = dynamic(
  () =>
    import('@/components/animated-counter').then(mod => mod.AnimatedCounter),
  {
    ssr: false,
    loading: () => <span>0</span>,
  }
);

export function SeminarHeroSection() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500); // 500ms 지연 후 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden">
      {/* 배경 그라데이션 효과 - 메인 페이지와 동일 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* 상단 태그 */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" size="lg" animation="fade">
            <GraduationCap className="h-3 w-3 mr-1" />
            Premium Education Program
          </Badge>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
          전문가와 함께하는{'\n'}프리미엄 세미나
        </h1>

        {/* 서브 헤드라인 */}
        <p
          className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          지식이 경쟁력이 되는 시대
        </p>

        {/* 참석 자격 기준 배지 */}
        <div
          className="mb-8 animate-slide-up"
          style={{ animationDelay: '250ms' }}
        >
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm md:text-base bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-800"
          >
            <Users className="w-4 h-4 mr-2" />
            참석 기준: 순자산 50억 이상 or 순이익 3억 이상 오너 일가 한정
          </Badge>
        </div>

        <p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
          style={{ animationDelay: '300ms' }}
        >
          업계 최고 전문가들과 함께하는 맞춤형 교육 프로그램으로 경영 역량을
          강화하고 네트워크를 확장하세요
        </p>

        {/* 핵심 성과 지표 - 메인 페이지와 동일한 스타일 */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              <AnimatedCounter
                end={500}
                suffix="+"
                startAnimation={startAnimation}
                duration={2000}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-sm text-muted-foreground">참여 CEO</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              <AnimatedCounter
                end={48}
                suffix="+"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-sm text-muted-foreground">연간 세미나</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">
              <AnimatedCounter
                end={98}
                suffix="%"
                startAnimation={startAnimation}
                duration={1800}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-sm text-muted-foreground">만족도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              <AnimatedCounter
                end={24}
                suffix="시간"
                startAnimation={startAnimation}
                duration={1500}
                easingFunction={t => 1 - Math.pow(1 - t, 3)}
              />
            </div>
            <div className="text-sm text-muted-foreground">연간 교육시간</div>
          </div>
        </div>

        {/* CTA 버튼 - 메인 페이지와 동일한 스타일 */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <a
            href="https://seminar.familyoffices.vip"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg"
            >
              예정된 세미나 일정 보기
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a
            href="/structure-check#request-form"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outline"
              size="lg"
              className="font-bold shadow-lg px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              구조 점검 요청
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
