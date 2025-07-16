import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Crown,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
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

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function HeroSection() {
  return (
    <section className="relative section min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-muted/30" />
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 animate-fade-in bg-background/80 backdrop-blur-sm">
            <Crown className="h-3 w-3 mr-1" aria-hidden />
            Exclusive 프로그램
          </Badge>
          <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
            대한민국 중소중견기업{'\n'}CEO들만의{'\n'}<span className="text-foreground">특별한 공간</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            프리미엄 네트워킹 & 자산관리 클럽
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
            검증된 <span className="font-semibold text-primary">500+ 법인 대표님들</span>과 함께하는 특별한 공간에서 최고의 네트워킹과 전문 자산관리 서비스를 경험하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg">
              <Link href="/contact" className="flex items-center" aria-label="멤버십 신청하기">
                멤버십 신청하기
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="font-bold shadow-lg px-8 py-4 text-lg">
              <Link href="#benefits" className="flex items-center" aria-label="혜택 알아보기">
                <Sparkles className="mr-2 h-5 w-5" aria-hidden />
                혜택 알아보기
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