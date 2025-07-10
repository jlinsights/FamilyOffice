import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Building2,
  ArrowRight,
  Sparkles,
  Network
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type {
  MembershipStat,
  MemberBenefit,
  ExclusiveProgramCategory,
  EducationPrograms,
  SpecialProgram
} from "@/types/program";
import { MembershipStatsSection } from "@/components/program/MembershipStatsSection";
import { MemberBenefitsSection } from "@/components/program/MemberBenefitsSection";
import { ExclusiveProgramsSection } from "@/components/program/ExclusiveProgramsSection";
import { SpecialProgramsSection } from "@/components/program/SpecialProgramsSection";
import { EducationScheduleSection } from "@/components/program/EducationScheduleSection";
import { MembershipCTASection } from "@/components/program/MembershipCTASection";
import {
  MEMBERSHIP_STATS,
  MEMBER_BENEFITS,
  EXCLUSIVE_PROGRAMS,
  EDUCATION_PROGRAMS,
  CEO_PROGRAMS,
  ASSET_PROGRAMS
} from "@/constants/programs";

export const metadata: Metadata = {
  title: "프로그램 | 중소중견기업 대표 프리미엄 프로그램 안내",
  description: "중소중견기업 대표를 위한 프리미엄 프로그램. 네트워킹, 투자, 승계, 교육 등 다양한 맞춤형 혜택 제공.",
  keywords: "프로그램, 중소중견기업 네트워킹, 경영진 모임, 투자 정보, 승계 전략, 패밀리오피스 교육"
};

function HeroSection() {
  return (
    <section className="relative section min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-muted/30" />
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 animate-fade-in border-primary/20 bg-primary/10">
            <Crown className="h-3 w-3 mr-1" aria-hidden />
            Exclusive 프로그램
          </Badge>
          <h1 className="mb-6 text-balance animate-slide-up font-bold leading-tight">
            <span className="text-muted-foreground">대한민국 중소중견기업</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">CEO들만의 특별한 공간</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
            검증된 <span className="font-semibold text-primary">500+ 법인 대표님들</span>과 함께하는 <br className="hidden sm:block" />
            프리미엄 네트워킹 & 자산관리 클럽
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Button size="lg" asChild className="btn-primary group">
              <Link href="/contact" className="flex items-center" aria-label="멤버십 신청하기">
                멤버십 신청하기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#benefits" className="flex items-center" aria-label="혜택 알아보기">
                혜택 알아보기
                <Sparkles className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProgramPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MembershipStatsSection stats={MEMBERSHIP_STATS} />
      <MemberBenefitsSection benefits={MEMBER_BENEFITS} />
      <ExclusiveProgramsSection categories={EXCLUSIVE_PROGRAMS} />
      <SpecialProgramsSection ceoPrograms={CEO_PROGRAMS} assetPrograms={ASSET_PROGRAMS} />
      <EducationScheduleSection educationPrograms={EDUCATION_PROGRAMS} />
      <MembershipCTASection />
      <Footer />
    </div>
  );
} 