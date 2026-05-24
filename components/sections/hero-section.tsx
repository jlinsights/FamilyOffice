'use client';

import { ArrowRight, ChevronRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { TextReveal } from '@/components/ui/animation/TextReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';

export function HeroSection() {
  return (
    <div className="relative band-navy band-legacy min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-navy-gradient z-0 opacity-90"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] z-0"></div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] animate-pulse z-0 hidden lg:block"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px] animate-pulse delay-1000 z-0 hidden lg:block"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <FadeIn delay={0.2} direction="down">
          <Link href="/brand" className="inline-flex items-center group mb-8">
            <Badge
              variant="outline"
              className="badge-brand-gold px-4 py-1.5 text-sm border-0 hover:opacity-90 transition-opacity duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
              Brand Guidelines v3.0
              <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Badge>
          </Link>
        </FadeIn>

        {/* Headline */}
        <h1 className="display-hero mb-8 font-playfair">
          <span className="block text-white mb-2">
            <TextReveal delay={0.4} type="char">
              百年
            </TextReveal>
          </span>
          <span className="block mt-2">
            <FadeIn delay={0.6} direction="up" className="inline-block">
              <span className="text-gold-gradient font-inter">永續</span>
            </FadeIn>
          </span>
        </h1>

        {/* Subheadline */}
        <FadeIn delay={0.8} className="max-w-2xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-on-dark-mute font-light leading-relaxed font-korean">
            성공한 기업가를 위한 자산관리 파트너.
            <br className="hidden md:block" />
            단순한 자산 증식을 넘어, 백년영속 가문의 유산을 설계합니다.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn
          delay={1.0}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <CalComPopup
            buttonText="상담 신청하기"
            variant="legacyCtaLight"
            size="lg"
            className="w-full sm:w-auto touch-target-legacy"
            trigger={
              <>
                <span className="mr-2">상담 신청하기</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            }
          />

          <Link href="/membership" className="w-full sm:w-auto">
            <Button
              variant="legacyOutlineDark"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Crown className="mr-2 h-5 w-5 fill-current opacity-80" />
              멤버십 안내
            </Button>
          </Link>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <FadeIn
        delay={1.4}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="w-[1px] h-16 divider-gold opacity-60"></div>
      </FadeIn>
    </div>
  );
}
