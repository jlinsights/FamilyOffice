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
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden text-white pt-20" style={{ backgroundColor: '#0A192F' }}>
      {/* Dynamic Background — Signature Navy with Heritage Gold radial */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#162C4E] via-[#0A192F] to-[#050D19] z-0"></div>
      <div className="absolute inset-0 bg-grid-white opacity-[0.03] z-0"></div>

      {/* Floating Elements — Heritage Gold ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse z-0 hidden lg:block" style={{ backgroundColor: 'rgba(212,175,55,0.07)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[90px] animate-pulse delay-1000 z-0 hidden lg:block" style={{ backgroundColor: 'rgba(212,175,55,0.05)' }}></div>
      {/* Subtle gold accent line top */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-10" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <FadeIn delay={0.2} direction="down">
          <Link href="/brand" className="inline-flex items-center group mb-8">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm backdrop-blur-md transition-all duration-300"
              style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#E5C158', backgroundColor: 'rgba(212,175,55,0.08)' }}
            >
              <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: '#D4AF37' }}></span>
              Premium Advisory
              <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Badge>
          </Link>
        </FadeIn>

        {/* Headline — Playfair Display, editorial style */}
        <h1 className="font-playfair font-semibold mb-8 tracking-tight" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: '1.05', letterSpacing: '-0.02em' }}>
          <span className="block text-white mb-2">
            <TextReveal delay={0.4} type="char">
              百年
            </TextReveal>
          </span>
          <span className="block mt-2">
            <FadeIn delay={0.6} direction="up" className="inline-block">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #D4AF37, #E5C158, #B8860B)' }}>
                永續
              </span>
            </FadeIn>
          </span>
        </h1>

        {/* Subheadline — Korean-optimized line-height */}
        <FadeIn delay={0.8} className="max-w-2xl mx-auto mb-12">
          <p className="text-xl md:text-2xl font-light" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.75' }}>
            성공한 기업가를 위한 프리미엄 자산관리 파트너.
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
            buttonText="무료 상담 신청하기"
            variant="default"
            size="lg"
            className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 [background-color:#D4AF37] [color:#0A192F] [box-shadow:0_0_40px_-10px_rgba(212,175,55,0.5)] hover:[background-color:#E5C158]"
            trigger={
              <>
                <span className="mr-2" style={{ color: '#0A192F', fontWeight: 700 }}>무료 상담 신청하기</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" style={{ color: '#0A192F' }} />
              </>
            }
          />

          <Link href="/membership" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 px-8 text-lg text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(212,175,55,0.3)', color: '#E5C158' }}
            >
              <Crown className="mr-2 h-5 w-5 fill-current opacity-80" style={{ color: '#D4AF37' }} />
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
        <div className="w-[1px] h-16" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.5), transparent)' }}></div>
      </FadeIn>
    </div>
  );
}
