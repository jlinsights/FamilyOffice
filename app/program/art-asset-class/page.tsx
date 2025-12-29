'use client';

import {
    ArrowRight,
    BookOpen,
    Calendar,
    Camera,
    CheckCircle2,
    Clock,
    Crown,
    Eye,
    Heart,
    Lightbulb,
    MapPin,
    Palette,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PremiumContentGuard } from '@/components/premium-content-guard';

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
            <Palette className="h-3 w-3 mr-1" />
            VIP Exclusive Art Program
          </Badge>
        </div>

        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary animate-slide-up">
          예술자산클래스<span className="text-foreground">ART</span>
        </h1>

        <p
          className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          VIP 고객을 위한 프리미엄 예술 교육
        </p>

        <p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed"
          style={{ animationDelay: '300ms' }}
        >
          <span className="font-semibold text-primary">
            예술의 안목을 더욱 깊이 있게, 자산의 가치를 더욱 폭 넓게
          </span>
          <br />
          고객님만을 위한 특별한 예술 여정이 시작됩니다
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

        {/* 프로그램 메인 이미지 */}
        <div
          className="relative w-full max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/ART Asset Class/Art in Life.jpeg"
              alt="예술자산클래ART 프로그램 - Art in Life"
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
            <Crown className="h-3 w-3 mr-1" />
            Program Overview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            프로그램 개요
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            미술에 관심있는 VIP 고객 50명을 대상으로 하는 프리미엄 예술 투자 및
            문화 교육 프로그램입니다
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
                미술에 관심있는 VIP 고객 50명
              </p>
            </div>
          </div>

          <div className="card text-center p-6">
            <div className="mb-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">운영 주기</h3>
            </div>
            <div>
              <p className="text-muted-foreground">
                매년 상/하반기 각 1회 개최
              </p>
            </div>
          </div>

          <div className="card text-center p-6">
            <div className="mb-6">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">장소</h3>
            </div>
            <div>
              <p className="text-muted-foreground">
                삼성금융캠퍼스 및 외부 관람 장소
              </p>
            </div>
          </div>

          <div className="card text-center p-6">
            <div className="mb-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">참가비</h3>
            </div>
            <div>
              <p className="text-muted-foreground">인당 70만원 (VAT 포함)</p>
            </div>
          </div>
        </div>

        {/* 프로그램 스케줄 이미지 */}
        <div className="relative w-full max-w-5xl mx-auto animate-slide-up">
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/ART Asset Class/Art in Life schedule.jpeg"
              alt="예술자산클래ART 프로그램 일정"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramFeaturesSection() {
  const features = [
    {
      module: '1회차',
      title: '한국의 저력, 미술로 보다',
      date: '8.28.(목) 10:00~12:00',
      topics: [
        '컬렉터 정신의 세계',
        '한국미술의 대표 작가들의 작품을 중심으로',
        '한국미의 정체성 탐구',
      ],
      instructor: '고연희 성곡미대 교수',
    },
    {
      module: '2회차',
      title: '키아프, 프리즈 아트페어 탐방하기',
      date: '9.4.(목) 10:00~17:00',
      topics: [
        '세계의 컬렉터와 인의 집합 컬렉션을 소개하는 책',
        '디어 컬렉터, 를 통해 컬렉션의 의미와 양상 소개',
        '키아프, 프리즈 아트페어 관람',
      ],
      instructor: '김지은 전 MBC 아나운서 컬러니스트',
    },
    {
      module: '3회차',
      title: '인간, 공간, 그리고 예술',
      date: '9.11.(목) 10:00~12:00',
      topics: [
        '공예, 자연, 생태, 미술 등 인간적인 공간을 지향하는',
        '건축 트렌드 탐구 및 전문가의 솔루션 고찰',
      ],
      instructor: '임태희 임태희디자인 스튜디오 소장',
    },
    {
      module: '4회차',
      title: '2025년 예술자산 즐길상',
      date: '9.18.(목) 10:00~16:00',
      topics: [
        '아트페어 및 주요 전시회를 미리부며',
        '예술 자산의 트렌드와 투자 가치 판단',
        '리듬미술관: 이 봄 개인전',
      ],
      instructor: '김용재 이안아트컨설팅 총괄',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Camera className="h-3 w-3 mr-1" />
            Program Curriculum
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            세부 프로그램
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            전문가들과 함께하는 체계적인 예술 교육과 실제 아트페어 및 전시 관람
            체험
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div key={index} className="card relative overflow-hidden">
              <div className="bg-primary/5 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-primary font-medium">
                      {item.module}
                    </p>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.date}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {item.instructor}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {item.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {topic}
                      </span>
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
      icon: Eye,
      title: '전문가 시선',
      description: '미술 전문가들의 깊이 있는 작품 해석과 투자 관점 제공',
    },
    {
      icon: Heart,
      title: '감성적 체험',
      description: '단순한 지식 전달을 넘어서는 예술적 감동과 영감',
    },
    {
      icon: TrendingUp,
      title: '투자 인사이트',
      description: '예술 시장 트렌드와 작품 가치 평가 방법론 습득',
    },
    {
      icon: Star,
      title: 'VIP 네트워킹',
      description: '예술에 관심 있는 동급 고객들과의 품격 있는 교류',
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Lightbulb className="h-3 w-3 mr-1" />
            Special Benefits
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            프로그램 특별혜택
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            예술의 안목을 기르고 자산으로서의 가치를 이해하는 특별한 경험을
            제공합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
          예술의 깊이를 더하고,
          <br />
          자산의 폭을 넓히세요
        </h2>
        <p className="text-xl mb-8 text-white/90">
          매년 상/하반기 각 1회, VIP 고객 50명만을 위한 특별한 프로그램입니다.
          <br />
          예술을 통해 새로운 투자 관점과 문화적 감성을 경험하세요.
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
          * 참가 신청 및 프로그램 관련 문의사항은 언제든 연락주시기 바랍니다.
        </p>
      </div>
    </section>
  );
}

export default function ArtAssetClassPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PremiumContentGuard>
        <main className="pt-20">
          <HeroSection />
          <ProgramOverviewSection />
          <ProgramFeaturesSection />
          <BenefitsSection />
          <CTASection />
        </main>
      </PremiumContentGuard>
      <Footer />
    </div>
  );
}
