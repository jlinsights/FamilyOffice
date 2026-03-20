'use client';

import { ArrowRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { TextReveal } from '@/components/ui/animation/TextReveal';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PremiumContentGuard } from '@/components/premium-content-guard';
import { EducationScheduleSection } from '@/components/program/EducationScheduleSection';
import { ExclusiveProgramsSection } from '@/components/program/ExclusiveProgramsSection';
import { MemberBenefitsSection } from '@/components/program/MemberBenefitsSection';
import { MembershipCTASection } from '@/components/program/MembershipCTASection';
import { MembershipStatsSection } from '@/components/program/MembershipStatsSection';
import { SpecialProgramsSection } from '@/components/program/SpecialProgramsSection';
import { VVIPBenefitsSection } from '@/components/program/VVIPBenefitsSection';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { cn } from '@/lib/utils';
import {
  ASSET_PROGRAMS,
  CEO_PROGRAMS,
  EDUCATION_PROGRAMS,
  EXCLUSIVE_PROGRAMS,
  MEMBERSHIP_STATS,
  MEMBER_BENEFITS,
} from '@/constants/programs';


function HeroSection() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.05] z-0"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Badge */}
        <FadeIn delay={0.2} direction="down">
          <div className="flex justify-center mb-10">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm border-white/20 text-blue-200 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Exclusive Programs
            </Badge>
          </div>
        </FadeIn>

        {/* Headline */}
        <h1 className="font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 tracking-tight text-white">
          <span className="block mb-2">
            <TextReveal delay={0.4} type="word">
              성공한 기업가와
            </TextReveal>
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            <TextReveal delay={0.6} type="word">
              자산가들의 공간
            </TextReveal>
          </span>
        </h1>

        {/* Subheadline */}
        <FadeIn delay={0.8} className="max-w-3xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            검증된 500+ 기업가와 함께하는
            <br className="md:hidden" /> 프리미엄 네트워킹 & 통합자산관리 클럽
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn
          delay={1.0}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/structure-check#request-form"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 px-8 text-lg rounded-full shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]'
            )}
            aria-label="구조 점검 요청"
          >
            구조 점검 요청
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/membership"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-14 px-8 text-lg rounded-full backdrop-blur-sm'
            )}
            aria-label="멤버십 안내"
          >
            <Crown className="mr-2 h-5 w-5" aria-hidden />
            멤버십 안내
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export default function ProgramPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PremiumContentGuard>
        <main className="pt-20">
          <HeroSection />
          <VVIPBenefitsSection />
          <MembershipStatsSection stats={MEMBERSHIP_STATS} />
          <MemberBenefitsSection benefits={MEMBER_BENEFITS} />
          <ExclusiveProgramsSection categories={EXCLUSIVE_PROGRAMS} />
          <SpecialProgramsSection
            ceoPrograms={CEO_PROGRAMS}
            assetPrograms={ASSET_PROGRAMS}
          />
          <EducationScheduleSection educationPrograms={EDUCATION_PROGRAMS} />
          <CompactMultimediaSection />
          <MembershipCTASection />
        </main>
      </PremiumContentGuard>
      <Footer />
    </div>
  );
}
