'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Crown, ArrowDown } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* 상단 태그 */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="animate-fade-in bg-background/80 backdrop-blur-sm">
            <Crown className="h-3 w-3 mr-1" />
            Heritage Planning Solution
          </Badge>
        </div>
        
        {/* 메인 헤드라인 */}
        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
          百年永續의 시작
        </h1>
        
        {/* 서브 헤드라인 */}
        <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          기업의 가치를 다음 세대로
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
          성공적인 가업승계는 百年永續의 시작입니다
        </p>
        
        {/* 핵심 성과 지표 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              <AnimatedCounter end={10} suffix="년+" />
            </div>
            <div className="text-sm text-muted-foreground">가업승계 노하우</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              <AnimatedCounter end={1500} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground">M&A 플랫폼<br />잠재 매수기업</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">
              <AnimatedCounter end={60} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground">Big 4 출신<br />전문가 컨소시엄</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              <AnimatedCounter end={88} suffix="%" />
            </div>
            <div className="text-sm text-muted-foreground">법인 CEO<br />고정자산 비중</div>
          </div>
        </div>
        
        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg">
            가업승계 컨설팅 신청
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="font-semibold px-8 py-4 text-lg">
            헤리티지 플래닝 알아보기
          </Button>
        </div>
        
        {/* 스크롤 인디케이터 */}
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
        </div>
      </div>
    </section>
  )
} 