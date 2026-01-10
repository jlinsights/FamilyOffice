'use client';

import {
    AlertCircle,
    ArrowRight,
    Briefcase,
    Building,
    CheckCircle,
    Cpu,
    Factory,
    Hammer,
    Medal,
    Phone,
    Shield,
    Target,
    TrendingUp,
    Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AnimatedCounter } from '@/components/animated-counter';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { StructuredData } from '@/components/seo/structured-data';

import { generateStructuredData } from '@/lib/seo/structured-data';

import { CONSULTANT_IDENTITY } from '@/constants/brand';
import { FAQ_CATEGORIES } from '@/constants/faq';

// 아이콘 매핑 헬퍼 함수
const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType<any> } = {
    Building: Building,
    Factory: Factory,
    Hammer: Hammer,
    Cpu: Cpu,
    Medal: Medal,
  };
  return icons[iconName] || Building;
};

export default function AboutPageContent() {
  const structuredData = generateStructuredData('Organization');
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://familyoffices.vip',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '회사 소개',
        item: 'https://familyoffices.vip/about',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      <Header />

      <main className="pt-20">
        {/* 히어로 섹션 */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full shadow-sm animate-fade-in">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">
                  About Us
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
                  <Building className="h-3 w-3 mr-1" />
                  Family Office S
                </span>
              </div>
            </div>

            <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-8 text-slate-900 dark:text-white whitespace-pre-line animate-slide-up tracking-tight">
              성공한 기업가·자산가의{'\n'}
              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                통합자산관리
              </span>
              {'\n'}파트너
            </h1>

            <p
              className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-200 mb-6 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              기업가·자산가 전문 통합자산관리
            </p>

            <p
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up font-light"
              style={{ animationDelay: '300ms' }}
            >
              <span className="font-semibold text-slate-900 dark:text-white">
                성공한 기업가와 개인자산 30억+ 고액자산가
              </span>
              를 위한{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                통합자산관리 및 가업승계 설계 서비스
              </span>
              를 제공합니다
            </p>

            <div
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <span className="font-bold text-blue-700 dark:text-blue-400">
                FamilyOffice S
              </span>
              는{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                삼성생명 기업컨설팅센터
              </span>
              의{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                VIP 고객 전담 프로젝트팀
              </span>
              입니다
            </div>

            <div
              className="text-sm text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed space-y-3 animate-slide-up"
              style={{ animationDelay: '450ms' }}
            >
              <p className="bg-slate-50 dark:bg-slate-900/50 rounded-lg px-4 py-3 border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  삼성생명 소속
                </span>
                으로{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  대한민국 최고 보험사의 전문성
                </span>
                을 바탕으로 작성되었습니다.{' '}
                <span className="text-xs text-slate-400">
                  (삼성화재 교차 판매 가능)
                </span>
              </p>
              <p className="bg-slate-50 dark:bg-slate-900/50 rounded-lg px-4 py-3 border border-slate-100 dark:border-slate-800">
                상품 추천 시에는 항상{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  복수의 대안을 함께 검토
                </span>
                하여 제안드립니다.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
              style={{ animationDelay: '500ms' }}
            >
              <CalComPopup
                buttonText="상담 신청"
                variant="default"
                size="lg"
                className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-full"
                eventType="consultation"
                trigger={
                  <>
                    <Phone className="mr-2 h-5 w-5" />
                    상담 신청
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                }
              />
              <Link
                href="/solutions"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'font-bold px-8 py-6 text-lg shadow-md hover:shadow-lg rounded-full border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                솔루션
              </Link>
            </div>
          </div>
        </section>

        {/* 통계 섹션 */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: '통합자산 관리실적',
                  value: 1000,
                  suffix: '억원+',
                  icon: TrendingUp,
                  color: 'text-blue-600 dark:text-blue-400',
                  bg: 'bg-blue-50 dark:bg-blue-900/20',
                },
                {
                  label: '고객 만족도',
                  value: 98,
                  suffix: '%',
                  icon: Target,
                  color: 'text-purple-600 dark:text-purple-400',
                  bg: 'bg-purple-50 dark:bg-purple-900/20',
                },
                {
                  label: '기업가·자산가 고객',
                  value: 800,
                  suffix: '+',
                  icon: Users,
                  color: 'text-emerald-600 dark:text-emerald-400',
                  bg: 'bg-emerald-50 dark:bg-emerald-900/20',
                },
                {
                  label: '자산관리 전문경험',
                  value: 20,
                  suffix: '년+',
                  icon: Medal,
                  color: 'text-amber-600 dark:text-amber-400',
                  bg: 'bg-amber-50 dark:bg-amber-900/20',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} mx-auto mb-6 shadow-sm`}
                  >
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      startAnimation={true}
                      duration={1500 + index * 200}
                    />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 핵심 가치 섹션 */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
                <Target className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">
                  Core Values
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                <span className="text-blue-600 dark:text-blue-400">
                  핵심 가치
                </span>
              </h2>
            </div>

            {/* 첫 번째 행: 기본 3개 핵심 가치 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Shield,
                  title: '신뢰와 투명성',
                  description:
                    '고객의 자산을 내 자산처럼 소중히 여기며, 모든 거래와 운용 과정을 투명하게 공개합니다.',
                  features: [
                    '실시간 자산 현황 공개',
                    '투명한 수수료 구조',
                    '정기적인 운용 보고서 제공',
                  ],
                  color: 'blue',
                },
                {
                  icon: Users,
                  title: '전문성과 경험',
                  description:
                    '20년 이상의 기업가와 고액자산가 전문 경험을 바탕으로 최적의 통합자산관리 솔루션을 제공합니다.',
                  features: [
                    '기업가·자산가 특화 노하우',
                    '자산규모별 맞춤 전략',
                    '지속적인 전문가 교육',
                  ],
                  color: 'purple',
                },
                {
                  icon: Target,
                  title: '맞춤형 서비스',
                  description:
                    '획일화된 서비스가 아닌, 각 고객의 자산 특성과 목표에 맞는 개별화된 서비스를 제공합니다.',
                  features: [
                    '개별 자산 구조 분석',
                    '맞춤형 포트폴리오 구성',
                    '전담 전문가 배정',
                  ],
                  color: 'emerald',
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${value.color}-50 to-transparent dark:from-${value.color}-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <CardHeader className="relative text-center">
                    <div
                      className={`w-20 h-20 bg-${value.color}-50 dark:bg-${value.color}-900/20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-${value.color}-600 dark:text-${value.color}-400 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative flex-1 flex flex-col">
                    <p className="text-slate-600 dark:text-slate-400 mb-8 text-center leading-relaxed">
                      {value.description}
                    </p>
                    <ul className="space-y-3 mt-auto">
                      {value.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle
                            className={`h-5 w-5 text-${value.color}-500 mr-3 flex-shrink-0`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 두 번째 행: 차별화된 접근 방식 */}
            <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
                  <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">
                    Differentiated Approach
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  차별화된{' '}
                  <span className="text-blue-600 dark:text-blue-400">
                    접근 방식
                  </span>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                  고객의 이익을 최우선으로 하는 독립적이고 객관적인 자산관리
                  서비스
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: CheckCircle,
                    title: '다양한 솔루션 제시',
                    description: (
                      <>
                        보험만이 답은 아닙니다.
                        <br />
                        상황에 따라 다른 방법이 더 적합할 수 있어요.
                      </>
                    ),
                    features: [
                      '보험 외 대안 솔루션 제시',
                      '상황별 최적 방법 분석',
                      '종합적 접근 방식',
                    ],
                    color: 'emerald',
                  },
                  {
                    icon: TrendingUp,
                    title: '객관적 비교 분석',
                    description: (
                      <>
                        각 금융사별(삼성생명, 삼성화재) 장단점을
                        <br />
                        객관적으로 비교 분석하여 드립니다.
                      </>
                    ),
                    features: [
                      '다수 금융사 상품 비교',
                      '객관적 장단점 분석',
                      '투명한 평가 기준',
                    ],
                    color: 'blue',
                  },
                ].map((approach, index) => (
                  <Card
                    key={index}
                    className="text-center h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:scale-105 group relative overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-${approach.color}-50 to-transparent dark:from-${approach.color}-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                    <CardHeader className="relative">
                      <div
                        className={`w-20 h-20 bg-${approach.color}-50 dark:bg-${approach.color}-900/20 rounded-full mx-auto mb-6 flex items-center justify-center text-${approach.color}-600 dark:text-${approach.color}-400 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        <approach.icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                        {approach.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative flex-1 flex flex-col">
                      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        {approach.description}
                      </p>
                      <ul className="space-y-3 mt-auto inline-block text-left mx-auto">
                        {approach.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300"
                          >
                            <CheckCircle
                              className={`h-5 w-5 text-${approach.color}-500 mr-3 flex-shrink-0`}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 컨설턴트 소개 섹션 */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">
                  Lead Consultant
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                {CONSULTANT_IDENTITY.name}{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  대표 컨설턴트
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-4 font-medium">
                {CONSULTANT_IDENTITY.title}
              </p>
              <p className="text-lg text-slate-500 dark:text-slate-400 italic">
                "{CONSULTANT_IDENTITY.philosophy}"
              </p>
            </div>

            {/* 핵심 강점 */}
            <div className="mb-20">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
                핵심{' '}
                <span className="text-blue-600 dark:text-blue-400">강점</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {CONSULTANT_IDENTITY.coreStrengths.map((strength, index) => (
                  <Card
                    key={index}
                    className="h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative text-center">
                      <div className="text-5xl mb-4">{strength.icon}</div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {strength.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {strength.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 본질 */}
            <div className="mb-20 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-900 to-slate-900 text-white border-0 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                <CardContent className="relative z-10 p-12 text-center">
                  <div className="text-6xl mb-6">🌱</div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight">
                    {CONSULTANT_IDENTITY.essence.title}
                  </h3>
                  <p className="text-xl text-blue-100/90 leading-relaxed">
                    {CONSULTANT_IDENTITY.essence.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 개인 브랜딩 방향 */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
                개인 브랜딩{' '}
                <span className="text-blue-600 dark:text-blue-400">방향</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {CONSULTANT_IDENTITY.personalBranding.map((brand, index) => (
                  <Card
                    key={index}
                    className="h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:scale-105 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative text-center">
                      <div className="text-5xl mb-4">{brand.icon}</div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {brand.direction}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {brand.approach}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 태그라인 */}
            <div className="text-center">
              <div className="inline-block bg-white dark:bg-slate-800 rounded-3xl px-12 py-8 shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="text-4xl mb-4">🤝</div>
                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                  "{CONSULTANT_IDENTITY.tagline}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm">
                <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">
                  FAQ
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                자주 묻는 질문
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
                FamilyOffice S 서비스에 대해 궁금한 점들을 확인해보세요
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {FAQ_CATEGORIES.map((category, categoryIndex) => {
                const IconComponent = getIcon(category.icon);
                return (
                  <div key={categoryIndex} className="space-y-6">
                    <div className="text-center lg:text-left flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          관련 질문 {category.faqs.length}개
                        </p>
                      </div>
                    </div>

                    <PremiumFAQ items={category.faqs} />
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-24">
              <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-12 relative overflow-hidden shadow-2xl max-w-4xl mx-auto text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                    <Phone className="h-4 w-4 mr-2 text-blue-300" />
                    <span className="text-sm font-bold text-blue-100 pr-2">
                      Contact Us
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
                    성공한 기업가·자산가 전문 상담
                  </h3>
                  <p className="text-lg text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                    귀하의 기업과 개인자산에 최적화된 통합자산관리 전략을 함께
                    설계해보세요.
                    <br />
                    전문 상담사가 맞춤형 답변을 제공해드립니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CalComPopup
                      buttonText="무료 상담 신청"
                      variant="default"
                      size="lg"
                      eventType="consultation"
                      className="px-8 py-6 text-lg font-bold bg-white text-blue-900 hover:bg-blue-50 shadow-lg border-none rounded-full"
                      trigger={
                        <>
                          <Phone className="mr-2 h-5 w-5" />
                          무료 상담 신청
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      }
                    />
                    <Link
                      href="/solutions"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'lg' }),
                        'px-8 py-6 text-lg font-bold border-2 border-white/30 text-white hover:bg-white/10 bg-transparent rounded-full'
                      )}
                    >
                      서비스 자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multimedia Content Section */}
        <CompactMultimediaSection />
      </main>

      <Footer />
    </div>
  );
}
