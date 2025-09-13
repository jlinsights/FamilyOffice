import { Crown, ArrowRight, Sparkles } from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { EducationScheduleSection } from '@/components/program/EducationScheduleSection';
import { ExclusiveProgramsSection } from '@/components/program/ExclusiveProgramsSection';
import { MemberBenefitsSection } from '@/components/program/MemberBenefitsSection';
import { MembershipCTASection } from '@/components/program/MembershipCTASection';
import { MembershipStatsSection } from '@/components/program/MembershipStatsSection';
import { SpecialProgramsSection } from '@/components/program/SpecialProgramsSection';

import {
  MEMBERSHIP_STATS,
  MEMBER_BENEFITS,
  EXCLUSIVE_PROGRAMS,
  EDUCATION_PROGRAMS,
  CEO_PROGRAMS,
  ASSET_PROGRAMS,
} from '@/constants/programs';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';

export const metadata: Metadata = {
  title: '프로그램 | 성공한 기업가·자산가 전용 프리미엄 프로그램 안내',
  description:
    '성공한 기업가와 개인자산 30억+ 고액자산가를 위한 프리미엄 프로그램. 네트워킹, 투자, 승계, 자산관리, 가족신탁 등 다양한 맞춤형 혜택 제공.',
  keywords:
    '프로그램, 기업가 네트워킹, 고액자산가 모임, 자산가 교육, 개인자산 30억 이상, 패밀리오피스 프로그램, 상속계획, 가족신탁, 자산관리 교육, VIP 자산가 모임',
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* 상단 태그 */}
        <div className="flex justify-center mb-6 lg:mb-10">
          <Badge
            variant="outline"
            className="animate-fade-in bg-background/80 backdrop-blur-sm"
          >
            <Crown className="h-3 w-3 mr-1" />
            Exclusive 프로그램
          </Badge>
        </div>
        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
          성공한 기업가·{'\n'}자산가들만의{'\n'}
          <span className="text-foreground">특별한 공간</span>
        </h1>
        <p
          className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          프리미엄 네트워킹 & 통합자산관리 클럽
        </p>

        <p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
          style={{ animationDelay: '300ms' }}
        >
          검증된{' '}
          <span className="font-semibold text-primary">500+ 기업가와 개인자산 30억+ 자산가</span>
          가 함께하는 특별한 공간에서
          <br />
          최고의 네트워킹과 전문 통합자산관리 서비스를 경험하세요
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg"
          >
            <Link
              href="/contact"
              className="flex items-center"
              aria-label="멤버십 신청하기"
            >
              멤버십 신청하기
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="font-bold shadow-lg px-8 py-4 text-lg"
          >
            <Link
              href="#benefits"
              className="flex items-center"
              aria-label="혜택 알아보기"
            >
              <Sparkles className="mr-2 h-5 w-5" aria-hidden />
              혜택 알아보기
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function ProgramPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <HeroSection />
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
      <Footer />
    </div>
  );
}
