'use client';

import {
    ArrowRight,
    Award,
    BookOpen,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    Crown,
    GraduationCap,
    Handshake,
    MapPin,
    Target,
    TrendingUp,
    Users,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PremiumContentGuard } from '@/components/premium-content-guard';

import { cn } from '@/lib/utils';

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
        <div className="flex justify-center mb-8">
          <Badge
            variant="outline"
            className="animate-fade-in bg-background/80 backdrop-blur-sm"
          >
            <Crown className="h-3 w-3 mr-1" />
            Annual Executive Program
          </Badge>
        </div>

        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
          100년 기업{'\n'}차세대 CEO 과정
        </h1>

        <p
          className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          지속가능한 경영의 시작
        </p>

        <p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed"
          style={{ animationDelay: '300ms' }}
        >
          변화하는 시대에{' '}
          <span className="font-semibold text-primary">
            100년을 지속하는 기업
          </span>
          을 만들어가는
          <br />
          차세대 경영자들을 위한 특별한 여정이 시작됩니다
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <Link
            href="/structure-check"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg'
            )}
            aria-label="구조 점검 요청"
          >
            구조 점검 요청
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="#program-details"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'font-bold shadow-lg px-8 py-4 text-lg'
            )}
            aria-label="프로그램 상세 정보"
          >
            <BookOpen className="mr-2 h-5 w-5" aria-hidden />
            프로그램 상세 정보
          </Link>
        </div>

        {/* 프로그램 이미지 */}
        <div
          className="relative w-full max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/100년 기업 CEO/100년.png"
              alt="100년 기업 차세대 CEO 과정 프로그램 소개"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramOverviewSection() {
  return (
    <section id="program-details" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Target className="h-3 w-3 mr-1" />
            Program Overview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            프로그램 개요
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            100년을 지속하는 기업을 만들어가는 차세대 경영자들을 위한 체계적이고
            실무중심적인 특별 프로그램입니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="card text-center p-6">
            <div className="mb-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">참가 대상</h3>
            </div>
            <div>
              <p className="text-muted-foreground">
                차세대 CEO, 후계자, C-레벨 임원진
              </p>
            </div>
          </div>

          <div className="card text-center p-6">
            <div className="mb-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">교육 기간</h3>
            </div>
            <div>
              <p className="text-muted-foreground">연간 과정 (6개월, 월 2회)</p>
            </div>
          </div>

          <div className="card text-center p-6">
            <div className="mb-6">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">교육 장소</h3>
            </div>
            <div>
              <p className="text-muted-foreground">
                서울 프리미엄 교육장 + 해외 벤치마킹
              </p>
            </div>
          </div>

          <div className="card text-center p-6">
            <div className="mb-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">교육 시간</h3>
            </div>
            <div>
              <p className="text-muted-foreground">매회 4시간 (14:00-18:00)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const curriculum = [
    {
      module: 'Module 1',
      title: '지속가능경영과 ESG',
      topics: [
        'ESG 경영 트렌드와 실무 적용',
        '지속가능경영 전략 수립',
        'ESG 성과측정과 보고체계',
      ],
    },
    {
      module: 'Module 2',
      title: '가업승계와 지배구조',
      topics: [
        '가업승계 전략과 실무',
        '기업지배구조 최적화',
        '가족헌법 수립과 운영',
      ],
    },
    {
      module: 'Module 3',
      title: '디지털 혁신과 경영',
      topics: [
        '디지털 트랜스포메이션 전략',
        'AI와 빅데이터 활용',
        '스마트팩토리 구축 사례',
      ],
    },
    {
      module: 'Module 4',
      title: '글로벌 경영전략',
      topics: [
        '해외진출 전략과 실무',
        '글로벌 공급망 관리',
        '국제통상 리스크 대응',
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <GraduationCap className="h-3 w-3 mr-1" />
            Curriculum
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            교육 커리큘럼
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            실무진과 석학들이 함께 만든 체계적인 커리큘럼으로 차세대 경영자의
            역량을 완성합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {curriculum.map((item, index) => (
            <div key={index} className="card relative overflow-hidden">
              <div className="bg-primary/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-primary font-medium">
                      {item.module}
                    </p>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {item.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: Award,
      title: '최고급 강사진',
      description: '국내외 석학과 현직 CEO들이 직접 전하는 실무 노하우',
    },
    {
      icon: Handshake,
      title: '프리미엄 네트워킹',
      description: '동급 경영자들과의 지속적인 네트워크 구축 기회',
    },
    {
      icon: TrendingUp,
      title: '맞춤형 컨설팅',
      description: '개별 기업 상황에 맞는 1:1 전략 컨설팅 제공',
    },
    {
      icon: Building2,
      title: '해외 벤치마킹',
      description: '글로벌 100년 기업 직접 방문 및 벤치마킹',
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Crown className="h-3 w-3 mr-1" />
            Special Benefits
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            프로그램 특별혜택
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            단순한 교육을 넘어서는 특별한 경험과 평생 지속되는 가치를 제공합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card text-center group hover:shadow-lg transition-shadow p-6"
            >
              <div className="mb-6">
                <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
              </div>
              <div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          100년을 지속하는 기업의 여정,
          <br />
          지금 시작하세요
        </h2>
        <p className="text-xl mb-8 text-white/90">
          매년 한정된 인원으로 진행되는 프리미엄 교육 프로그램입니다.
          <br />
          차세대 경영자로서의 역량을 체계적으로 구축하세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/structure-check"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'secondary' }),
              'font-bold shadow-lg px-8 py-4 text-lg'
            )}
          >
            구조 점검 요청
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="tel:0502-5550-8700"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'font-bold shadow-lg px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary'
            )}
          >
            전화 문의: 0502-5550-8700
          </Link>
        </div>

        <p className="text-sm text-white/70">
          * 프로그램 관련 문의사항은 언제든 연락주시기 바랍니다.
        </p>
      </div>
    </section>
  );
}

export default function HundredYearsCEOPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PremiumContentGuard>
        <main className="pt-20">
          <HeroSection />
          <ProgramOverviewSection />
          <CurriculumSection />
          <BenefitsSection />
          <CTASection />
        </main>
      </PremiumContentGuard>
      <Footer />
    </div>
  );
}
