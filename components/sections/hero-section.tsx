'use client';

import { ArrowRight, ChevronRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { TextReveal } from '@/components/ui/animation/TextReveal';
import { Button } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import {
  RiskScreeningCard,
  SuccessionScenarioCard,
} from '@/components/sections/home/home-mockups';

const TRUST_STATS = [
  { value: '500억원+', label: '자산관리 실적' },
  { value: '500+', label: '법인 고객사' },
  { value: '20년+', label: '전문 경험' },
  { value: '98%', label: '만족도' },
] as const;

export function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      className="relative bg-hp-ink px-3 pb-10 pt-3 sm:px-5 lg:pt-5"
    >
      {/* Inset photo-style panel */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] bg-hp-navy">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgba(212,175,55,0.16),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgba(17,36,66,0.9),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="relative grid min-h-[620px] items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-20">
          {/* Copy */}
          <div className="max-w-xl">
            <FadeIn delay={0.1} direction="down">
              <Link
                href="/brand"
                className="group mb-8 inline-flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
              >
                <span className="rounded border border-white/40 px-2 py-1 text-xs">
                  Brand Guidelines v3.0
                </span>
                <span className="font-korean">백년영속 가문의 유산 설계</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>

            <h1 className="mb-6 font-editorial font-normal leading-[0.95] tracking-[-0.02em] text-[#FCF7EE] text-[clamp(3.5rem,9vw,7rem)]">
              <span className="block">
                <TextReveal delay={0.3} type="char">
                  百年
                </TextReveal>
              </span>
              <span className="block text-hp-gold">
                <FadeIn delay={0.5} direction="up" className="inline-block">
                  永續
                </FadeIn>
              </span>
            </h1>

            <FadeIn delay={0.7}>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/85 font-korean sm:text-xl">
                성공한 기업가를 위한 자산관리 파트너.{' '}
                <br className="hidden sm:block" />
                단순한 자산 증식을 넘어, 백년영속 가문의 유산을 설계합니다.
              </p>
            </FadeIn>

            <FadeIn
              delay={0.9}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <CalComPopup
                buttonText="상담 신청하기"
                variant="legacyCtaLight"
                size="lg"
                className="w-full rounded-md sm:w-auto"
                trigger={
                  <>
                    <span className="mr-2">상담 신청하기</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                }
              />
              <Link href="/membership" className="w-full sm:w-auto">
                <Button
                  variant="legacyOutlineDark"
                  size="lg"
                  className="w-full rounded-md sm:w-auto"
                >
                  <Crown className="mr-2 h-5 w-5 opacity-80" />
                  멤버십 안내
                </Button>
              </Link>
            </FadeIn>
          </div>

          {/* Product-style mockups */}
          <FadeIn
            delay={0.6}
            direction="left"
            className="relative hidden min-h-[440px] lg:block"
          >
            {/* FadeIn animates direct children, so rotation lives one level down */}
            <div className="absolute right-6 top-0">
              <SuccessionScenarioCard className="rotate-[-1.5deg]" />
            </div>
            <div className="absolute bottom-0 left-0">
              <RiskScreeningCard className="rotate-[1deg]" />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Trust strip: stats stand in for client logos */}
      <div className="mx-auto mt-8 grid max-w-[1400px] grid-cols-2 gap-y-6 px-3 sm:px-10 md:grid-cols-[1.2fr_repeat(4,1fr)] md:items-center lg:px-14">
        <p className="col-span-2 text-sm leading-snug text-white/70 font-korean md:col-span-1">
          고액자산가와 법인 대표가 <br />
          신뢰하는 패밀리오피스
        </p>
        {TRUST_STATS.map(stat => (
          <div key={stat.label}>
            <div className="font-editorial text-3xl tabular-nums text-[#FCF7EE] lg:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-white/60 font-korean">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
