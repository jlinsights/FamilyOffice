'use client';

import {
    Award,
    BookOpen,
    Briefcase,
    CheckCircle2,
    Clock,
    Crown,
    Diamond,
    Eye,
    Gem,
    Globe,
    Infinity,
    Landmark,
    Lock,
    Mountain,
    Phone,
    Shield,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';

import React from 'react';

import { cn } from '@/lib/utils';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import { CUSTOMER_SEGMENTS } from '@/lib/marketing/customer-segmentation';

// 패밀리오피스 핵심 서비스 영역
const familyOfficeServices = {
  wealth: {
    title: '자산관리 Excellence',
    icon: Diamond,
    subtitle: 'Wealth Management',
    description: '세대를 초월하는 자산 보전과 성장 전략',
    features: [
      '글로벌 자산 배분 및 포트폴리오 관리',
      '대안투자 기회 발굴 및 접근',
      '리스크 헤지 및 자산 보전 전략',
      '세무 최적화 통합 솔루션',
      '유동성 관리 및 현금흐름 최적화',
    ],
    benefits: [
      '세대간 자산 보전 및 성장',
      '시장 변동성 대응력 강화',
      '세무 효율성 극대화',
      '글로벌 투자 기회 접근',
    ],
    targetAssets: '30억원 이상',
    philosophy: '資産保全 · 世代傳承',
  },
  succession: {
    title: '가업승계 Mastery',
    icon: Crown,
    subtitle: 'Business Succession',
    description: '기업과 가문의 지속가능한 발전을 위한 승계 설계',
    features: [
      '가업승계 마스터플랜 수립',
      '차세대 경영자 육성 프로그램',
      '지분 구조 최적화 및 경영권 보호',
      '가족 거버넌스 체계 구축',
      '상속·증여세 최적화 전략',
    ],
    benefits: [
      '안정적 경영권 승계',
      '세무 부담 최소화',
      '가족 갈등 예방',
      '기업 지속성 확보',
    ],
    targetAssets: '기업가치 50억원 이상',
    philosophy: '家業永續 · 經營承繼',
  },
  governance: {
    title: '가족 Governance',
    icon: Landmark,
    subtitle: 'Family Governance',
    description: '체계적인 가족 경영과 의사결정 시스템',
    features: [
      '가족헌장 및 가족협의회 구성',
      '차세대 교육 및 리더십 개발',
      '가족 자산 통합 관리',
      '갈등 조정 및 의사결정 시스템',
      '패밀리오피스 운영 체계',
    ],
    benefits: [
      '체계적 가족 경영',
      '세대간 소통 강화',
      '합리적 의사결정',
      '가족 유대 강화',
    ],
    targetAssets: '가족 자산 100억원 이상',
    philosophy: '家族經營 · 和諧統一',
  },
  legacy: {
    title: 'Legacy Building',
    icon: Mountain,
    subtitle: 'Wealth Legacy',
    description: '세대를 관통하는 가문의 유산 구축',
    features: [
      '가문의 미션과 비전 수립',
      '사회적 영향력 확대 전략',
      '자선 활동 및 사회공헌 설계',
      '문화적 유산 보전 및 계승',
      '글로벌 네트워크 구축',
    ],
    benefits: [
      '지속가능한 가문 발전',
      '사회적 명성 구축',
      '가치 기반 경영 실현',
      '차세대 자긍심 제고',
    ],
    targetAssets: '총 자산 500억원 이상',
    philosophy: '百年永續 · 社會貢獻',
  },
};

// 패밀리오피스의 차별화된 가치 제안
const uniqueValuePropositions = [
  {
    icon: Eye,
    title: '독점적 정보 접근',
    subtitle: 'Exclusive Intelligence',
    description:
      '일반인이 접근할 수 없는 프리미엄 투자 기회와 시장 정보를 독점 제공',
    details: [
      '글로벌 프라이빗 마켓 정보',
      'UHNW 네트워크 인사이트',
      '정책 변화 선행 정보',
    ],
  },
  {
    icon: Lock,
    title: '최고 수준의 보안',
    subtitle: 'Ultimate Privacy',
    description: '완벽한 프라이버시 보호와 최고 수준의 정보 보안 시스템',
    details: ['익명성 보장 시스템', '암호화된 통신', '기밀 유지 협약'],
  },
  {
    icon: Users,
    title: '전담 전문가팀',
    subtitle: 'Dedicated Experts',
    description: '고객 한 분을 위한 전담 멀티패밀리오피스 전문가팀 구성',
    details: ['CIO, CFO급 전문가', '24/7 전담 서비스', '글로벌 네트워크'],
  },
  {
    icon: Globe,
    title: '글로벌 플랫폼',
    subtitle: 'Global Platform',
    description: '세계 주요 금융 허브와 연결된 통합 자산관리 플랫폼',
    details: ['해외 자산 통합 관리', 'Cross-border 최적화', '다중 통화 관리'],
  },
  {
    icon: Zap,
    title: '혁신적 솔루션',
    subtitle: 'Innovation Edge',
    description: '최신 핀테크와 AI를 활용한 차세대 자산관리 솔루션',
    details: [
      'AI 기반 포트폴리오 관리',
      'Real-time 리스크 모니터링',
      'Advanced Analytics',
    ],
  },
  {
    icon: Infinity,
    title: '세대간 연속성',
    subtitle: 'Generational Continuity',
    description: '100년을 바라보는 장기적 관점의 세대간 자산 승계',
    details: ['세대별 맞춤 전략', '교육 및 멘토링', '가문 유산 보전'],
  },
];

// 성공 사례 - 고급 자산가/기업가 중심
const premiumSuccessCases = [
  {
    icon: Crown,
    title: '글로벌 제조업 그룹',
    category: '대기업 오너가',
    assets: '자산규모 1,000억원',
    challenge: '복잡한 국제 지분 구조와 다세대 승계 계획 필요',
    solution: '글로벌 패밀리오피스 설립 + 단계적 승계 전략 + 차세대 교육',
    result: '상속세 70% 절감, 안정적 경영권 승계, 글로벌 확장 기반 구축',
    period: '7년간 지속',
    satisfaction: '★★★★★',
  },
  {
    icon: Gem,
    title: 'IT 유니콘 창업자',
    category: '성공한 기업가',
    assets: '자산규모 500억원',
    challenge: '급성장한 기업 가치와 개인 자산의 통합 관리 필요',
    solution: '자산 다각화 + 세무 최적화 + 사회공헌 재단 설립',
    result: '연 수익률 15% 달성, 세무 부담 50% 절감, 사회적 명성 구축',
    period: '5년간 지속',
    satisfaction: '★★★★★',
  },
  {
    icon: Mountain,
    title: '전통 가문 4세',
    category: '다세대 가문',
    assets: '자산규모 2,000억원',
    challenge: '흩어진 가족 자산 통합과 4세대 갈등 조정 필요',
    solution: '가족 거버넌스 + 통합 자산관리 + 차세대 리더십 개발',
    result: '가족 화합 달성, 통합 수익률 12% 달성, 차세대 성공적 육성',
    period: '10년간 지속',
    satisfaction: '★★★★★',
  },
];

// 패밀리오피스 서비스 레벨
const serviceTiers = [
  {
    name: 'Heritage Elite',
    icon: Crown,
    minAssets: '1,000억원+',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor:
      'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900/80 dark:to-yellow-950/40',
    borderColor: 'border-yellow-200 dark:border-yellow-600/30',
    features: [
      '가문 전담 패밀리오피스 설립',
      'CIO/CFO급 전담 전문가 배정',
      '글로벌 대체투자 독점 기회',
      '차세대 글로벌 리더십 프로그램',
      '24/7 프라이빗 컨시어지',
    ],
  },
  {
    name: 'Legacy Premium',
    icon: Diamond,
    minAssets: '500억원+',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor:
      'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900/80 dark:to-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-600/30',
    features: [
      '멀티패밀리오피스(MFO) 서비스',
      '자산배분 및 포트폴리오 최적화',
      '가업승계 마스터플랜 수립',
      '법인 자금 운용 및 절세 전략',
      '전용 라운지 및 우선 상담',
    ],
  },
  {
    name: 'Wealth Select',
    icon: Gem,
    minAssets: '100억원+',
    color: 'text-green-600 dark:text-green-400',
    bgColor:
      'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900/80 dark:to-green-950/40',
    borderColor: 'border-green-200 dark:border-green-600/30',
    features: [
      '통합 자산관리 솔루션',
      '시니어 전문가 전담 배정',
      '투자/세무/법률 원스톱 자문',
      '정기 자산 리밸런싱',
      '프리미엄 세미나 초청',
    ],
  },
];

const FamilyOfficeCenterPage = () => {
  const [selectedService, setSelectedService] = React.useState('wealth');
  const [selectedCase, setSelectedCase] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/20 to-blue-50/20 dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Premium Hero Section */}
        <section className="relative py-20 px-4 md:py-32 overflow-hidden">
          {/* 배경 효과 */}
          <div className="absolute inset-0 bg-premium-navy opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-gold opacity-10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '1s' }}
          ></div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <Badge
              variant="outline"
              size="lg"
              className="mb-8 glass-premium hover-premium"
              animation="fade"
            >
              <Crown className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
              Family Office Excellence
            </Badge>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-glow animate-slide-up">
              <span className="text-premium-navy dark:text-blue-300">
                Family Office
              </span>
              <span className="block mt-4 text-3xl md:text-5xl lg:text-6xl font-light tracking-wider text-premium-gold dark:text-amber-400">
                百年永續의 기반
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl lg:text-3xl font-light text-card-foreground/90 mb-6 max-w-4xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              최고 자산가와 성공한 기업가를 위한
              <span className="block mt-2 font-medium text-premium-navy dark:text-blue-300">
                차별화된 전용 솔루션
              </span>
            </p>

            <p
              className="text-lg md:text-xl text-card-foreground/80 mb-12 max-w-3xl mx-auto font-light animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              자산 보전부터 가업승계, 차세대 육성까지
              <span className="block mt-1">
                세대를 관통하는 가문의 유산을 함께 구축합니다
              </span>
            </p>

            {/* Premium Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="glass-premium rounded-2xl p-6 hover-premium border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl font-bold text-premium-gold dark:text-amber-400 mb-2">
                  500억원+
                </div>
                <div className="text-sm text-card-foreground/80 font-light">
                  자산관리 실적
                </div>
              </div>
              <div className="glass-premium rounded-2xl p-6 hover-premium border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl font-bold text-premium-navy dark:text-blue-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-card-foreground/80 font-light">
                  법인 고객사
                </div>
              </div>
              <div className="glass-premium rounded-2xl p-6 hover-premium border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  20년+
                </div>
                <div className="text-sm text-card-foreground/80 font-light">
                  전문 경험
                </div>
              </div>
              <div className="glass-premium rounded-2xl p-6 hover-premium border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  98%
                </div>
                <div className="text-sm text-card-foreground/80 font-light">
                  만족도
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CalComPopup
                className="inline-flex items-center justify-center px-8 py-4 bg-premium-navy text-white text-lg font-semibold rounded-2xl hover:shadow-premium-navy transition-all duration-300 hover:scale-105"
                buttonText="VIP 전용 상담 신청"
                eventType="consultation"
                trigger={
                  <div className="inline-flex items-center">
                    <Crown className="h-6 w-6 mr-2" />
                    VIP 전용 상담 신청
                  </div>
                }
              />

              <Link
                href="#services"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'text-lg px-8 py-4 border-2 border-amber-200 hover:bg-amber-50 rounded-2xl'
                )}
              >
                <BookOpen className="h-6 w-6 mr-2" />
                서비스 포트폴리오 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 🏆 Ultra Premium 자격 기준 */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-card-foreground">
                패밀리오피스 자격 기준
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                UHNW(Ultra High Net Worth) 고객을 위한 전용 서비스
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-amber-200 dark:border-amber-800 bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    순자산 기준
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                    {CUSTOMER_SEGMENTS['family-office'].criteria.netWorth}억원
                    이상
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    부동산, 금융자산, 사업자산 등 총 순자산
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 dark:border-amber-800 bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    순이익 기준
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                    {CUSTOMER_SEGMENTS['family-office'].criteria.netIncome}억원
                    이상
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    연간 순이익(세후소득) 기준
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Premium Services Portfolio */}
        <section id="services" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6" animation="fade">
                <Sparkles className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                Premium Services Portfolio
              </Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-card-foreground animate-slide-up">
                패밀리오피스 핵심 서비스
              </h2>
              <p
                className="text-xl text-card-foreground/80 max-w-3xl mx-auto font-light animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                세대를 초월하는 자산관리와 가업승계의 완벽한 솔루션
              </p>
            </div>

            <Tabs
              value={selectedService}
              onValueChange={setSelectedService}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-12 h-auto p-2 bg-card/80 dark:bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl">
                {Object.entries(familyOfficeServices).map(([key, service]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col items-center p-4 text-sm font-medium rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-white/5 data-[state=active]:border data-[state=active]:border-border/50 text-card-foreground/80 data-[state=active]:text-card-foreground"
                  >
                    <service.icon className="h-8 w-8 mb-2 text-amber-600 dark:text-amber-400" />
                    <span>{service.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(familyOfficeServices).map(([key, service]) => {
                const Icon = service.icon;
                return (
                  <TabsContent key={key} value={key}>
                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-white/5 rounded-3xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-amber-50/30 to-blue-50/30 dark:from-amber-950/20 dark:to-blue-950/20 border-b-0 pb-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-2xl shadow-lg">
                            <Icon className="h-10 w-10 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-3xl font-playfair text-card-foreground">
                              {service.title}
                            </CardTitle>
                            <CardDescription className="text-lg text-amber-600 dark:text-amber-400 font-medium">
                              {service.subtitle}
                            </CardDescription>
                          </div>
                          <div className="ml-auto text-right">
                            <Badge
                              variant="outline"
                              className="bg-card/80 dark:bg-card/60 backdrop-blur-sm border-border/50"
                            >
                              {service.targetAssets}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-lg text-card-foreground/80 leading-relaxed font-light">
                          {service.description}
                        </p>
                        <div className="text-center mt-4 p-3 bg-card/60 dark:bg-card/40 rounded-xl backdrop-blur-sm border border-border/30">
                          <p className="text-lg font-medium text-card-foreground font-playfair">
                            {service.philosophy}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-12">
                          <div>
                            <h4 className="font-semibold text-lg mb-4 text-card-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                              핵심 서비스
                            </h4>
                            <ul className="space-y-3">
                              {service.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <Star className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-card-foreground/80 leading-relaxed">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                              기대 가치
                            </h4>
                            <ul className="space-y-3">
                              {service.benefits.map((benefit, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <Gem className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-card-foreground/80 leading-relaxed">
                                    {benefit}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* Unique Value Propositions */}
        <section className="py-20 px-4 bg-gradient-to-br from-card/20 to-background dark:from-gray-900/50 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6" animation="fade">
                <Diamond className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                Exclusive Value
              </Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-card-foreground animate-slide-up">
                차별화된 가치 제안
              </h2>
              <p
                className="text-xl text-card-foreground/80 max-w-3xl mx-auto font-light animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                일반적인 금융 서비스를 뛰어넘는 패밀리오피스만의 독창적 가치
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uniqueValuePropositions.map((proposition, index) => {
                const Icon = proposition.icon;
                return (
                  <Card
                    key={index}
                    className="h-full border-border/50 bg-card/80 backdrop-blur-sm shadow-white/5 rounded-2xl"
                  >
                    <CardHeader className="pb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl">
                          <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-card-foreground">
                            {proposition.title}
                          </CardTitle>
                          <CardDescription className="text-amber-600 dark:text-amber-400 font-medium">
                            {proposition.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                      <p className="text-card-foreground/80 leading-relaxed font-light">
                        {proposition.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {proposition.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-card-foreground/80"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Tiers */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6" animation="fade">
                <Award className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                Service Excellence
              </Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-card-foreground animate-slide-up">
                서비스 등급별 포트폴리오
              </h2>
              <p
                className="text-xl text-card-foreground/80 max-w-3xl mx-auto font-light animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                자산 규모와 니즈에 따른 차별화된 패밀리오피스 서비스
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {serviceTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <Card
                    key={index}
                    className={`h-full ${tier.bgColor} ${tier.borderColor} border-2 shadow-white/5 backdrop-blur-sm rounded-3xl overflow-hidden`}
                  >
                    <CardHeader className="text-center pb-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg backdrop-blur-sm border border-border/30">
                          <Icon className={`h-12 w-12 ${tier.color}`} />
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-playfair text-card-foreground mb-2">
                        {tier.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold text-card-foreground/80">
                        자산규모 {tier.minAssets}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-card-foreground/80 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <CalComPopup
                          className={`w-full py-3 px-6 ${tier.color.includes('yellow') ? 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white' : tier.color.includes('blue') ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white' : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'} rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                          buttonText="전용 상담 신청"
                          eventType="consultation"
                          trigger={
                            <div className="w-full text-center">
                              전용 상담 신청
                            </div>
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Premium Success Cases */}
        <section className="py-20 px-4 bg-gradient-to-br from-amber-50/30 to-blue-50/30 dark:from-amber-950/20 dark:to-blue-950/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6" animation="fade">
                <Crown className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                Success Stories
              </Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-card-foreground animate-slide-up">
                패밀리오피스 성공 사례
              </h2>
              <p
                className="text-xl text-card-foreground/80 max-w-3xl mx-auto font-light animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                최고 자산가들의 실제 성공 스토리
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {premiumSuccessCases.map((caseItem, index) => {
                const Icon = caseItem.icon;
                return (
                  <Card
                    key={index}
                    className="h-full border-border/50 bg-card/80 backdrop-blur-sm shadow-white/5 rounded-3xl"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                        <div>
                          <CardTitle className="text-xl text-card-foreground">
                            {caseItem.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="mt-1 bg-card/80 dark:bg-card/60 backdrop-blur-sm border-border/50"
                          >
                            {caseItem.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="font-medium text-amber-600 dark:text-amber-400">
                        {caseItem.assets}
                      </p>
                      <p className="text-sm text-card-foreground/80">
                        {caseItem.period} · {caseItem.satisfaction}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-1">
                            도전과제
                          </h4>
                          <p className="text-sm text-card-foreground/80 leading-relaxed">
                            {caseItem.challenge}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-1">
                            솔루션
                          </h4>
                          <p className="text-sm text-card-foreground/80 leading-relaxed">
                            {caseItem.solution}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-1">
                            성과
                          </h4>
                          <p className="text-sm text-green-700 dark:text-green-400 font-medium leading-relaxed">
                            {caseItem.result}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-20 px-4 bg-premium-navy relative overflow-hidden">
          {/* 배경 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-purple-900/50"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-premium-gold opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-8 border-white/20 bg-white/10 text-white backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Join the Elite
            </Badge>

            <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
              百年永續의 여정을
              <span className="block mt-2 text-amber-300">함께 시작하세요</span>
            </h3>

            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              최고 자산가와 성공한 기업가만을 위한 독점적 패밀리오피스 서비스
              <span className="block mt-2">
                세대를 관통하는 가문의 유산을 함께 구축합니다
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <CalComPopup
                className="inline-flex items-center justify-center px-10 py-4 bg-premium-gold text-white text-lg font-semibold rounded-2xl hover:shadow-premium-gold transition-all duration-300 hover:scale-105"
                buttonText="VIP 전용 상담 예약"
                eventType="consultation"
                trigger={
                  <div className="inline-flex items-center">
                    <Crown className="h-6 w-6 mr-2" />
                    VIP 전용 상담 예약
                  </div>
                }
              />

              <Link
                href="/fp-center"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'text-lg px-10 py-4 border-2 border-white/20 text-white hover:bg-white/10 rounded-2xl backdrop-blur-sm'
                )}
              >
                <Briefcase className="h-6 w-6 mr-2" />
                FP센터 보기
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-blue-100">
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-5 w-5 text-amber-300" />
                <span className="font-medium">VIP 전용: 0502-5550-8700</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-5 w-5 text-amber-300" />
                <span>24시간 전담 서비스</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-5 w-5 text-amber-300" />
                <span>완벽한 기밀 보장</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FamilyOfficeCenterPage;
