import {
  ArrowRight,
  Award,
  Building,
  Calculator,
  CheckCircle,
  Clock,
  Heart,
  Phone,
  Shield,
  Stethoscope,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/seo/structured-data';
import { generateMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = generateMetadata(
  '개인/법인 건강보험 | 맞춤형 건강보장 솔루션 | 패밀리오피스',
  '개인과 법인을 위한 종합 건강보험 솔루션. 질병보험, 실손의료비, 건강관리서비스까지 원스톱 건강보장 설계를 제공합니다.',
  [
    '건강보험',
    '실손의료비',
    '질병보험',
    '법인건강보험',
    '단체건강보험',
    '건강관리',
    '의료비보장',
    '건강검진',
    '개인건강보험',
    '중대질병보험',
    '의료비절감',
    '건강보험료최적화',
  ],
  undefined,
  '전문가급',
  '성장기',
  'commercial'
);

export default function HealthInsurancePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '개인/법인 건강보험',
    description: '개인과 법인을 위한 종합 건강보험 솔루션',
    provider: {
      '@type': 'Organization',
      name: '패밀리오피스',
      url: 'https://familyoffices.vip',
    },
    serviceType: '건강보험',
    areaServed: '대한민국',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '건강보험 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '개인건강보험',
            description: '개인 맞춤형 건강보장 설계',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '법인건강보험',
            description: '임직원 건강관리 종합 솔루션',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '실손의료비보험',
            description: '의료비 부담 최소화 솔루션',
          },
        },
      ],
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
        <Header />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

            <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
              <div className="flex justify-center mb-8">
                <Badge variant="outline" size="lg" animation="fade">
                  <Heart className="h-3 w-3 mr-1" />
                  Health Insurance Solutions
                </Badge>
              </div>

              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 text-primary whitespace-pre-line animate-slide-up">
                개인/법인 건강보험{'\\n'}종합 솔루션
              </h1>

              <p
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6 animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                평생 건강을 지키는 든든한 파트너
              </p>

              <p
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
                style={{ animationDelay: '300ms' }}
              >
                개인과 기업의 건강 리스크를 체계적으로 관리하는{' '}
                <span className="font-semibold text-primary">
                  맞춤형 건강보험 솔루션
                </span>{' '}
                으로 의료비 부담을 최소화하고 최적의 건강관리를 제공합니다
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 animate-slide-up"
                style={{ animationDelay: '400ms' }}
              >
                <CalComPopup
                  buttonText="건강보험 상담 신청"
                  variant="default"
                  size="lg"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                  eventType="consultation"
                />
                <a
                  href="#services"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg'
                  )}
                >
                  서비스 알아보기
                </a>
              </div>
            </div>
          </section>

          {/* 통계 섹션 */}
          <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  <span className="text-primary">건강보험</span> 전문성
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  수치로 확인하는 건강보험 전문 서비스
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    value: '1,500+',
                    label: '건강보험 가입 건수',
                    color: 'text-blue-600 dark:text-blue-400',
                    icon: Users,
                  },
                  {
                    value: '98.5%',
                    label: '고객 만족도',
                    color: 'text-green-600 dark:text-green-400',
                    icon: Award,
                  },
                  {
                    value: '15년+',
                    label: '건강보험 전문 경력',
                    color: 'text-purple-600 dark:text-purple-400',
                    icon: Clock,
                  },
                  {
                    value: '300+',
                    label: '법인 고객',
                    color: 'text-orange-600 dark:text-orange-400',
                    icon: Building,
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div
                      className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 서비스 섹션 */}
          <section id="services" className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <Badge variant="outline" size="lg" animation="fade">
                    <Stethoscope className="h-3 w-3 mr-1" />
                    건강보험 서비스
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  <span className="text-primary">맞춤형</span> 건강보험 솔루션
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  개인과 기업의 다양한 건강 보장 요구에 맞춘 전문 서비스를
                  제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: User,
                    title: '개인 건강보험',
                    description: '개인 맞춤형 종합 건강보장 설계',
                    features: [
                      '질병보험 맞춤 설계',
                      '실손의료비 최적화',
                      '건강검진 서비스',
                      '만성질환 관리',
                    ],
                    color: 'green',
                  },
                  {
                    icon: Building,
                    title: '법인 건강보험',
                    description: '임직원 건강관리 종합 솔루션',
                    features: [
                      '단체 건강보험 설계',
                      '임직원 복리후생',
                      '건강관리 프로그램',
                      '의료비 절감 효과',
                    ],
                    color: 'blue',
                  },
                  {
                    icon: Shield,
                    title: '실손의료비보험',
                    description: '의료비 부담 최소화 전문 솔루션',
                    features: [
                      '의료비 90% 보장',
                      '입원/통원 보장',
                      '선택진료비 보장',
                      '빠른 보험금 지급',
                    ],
                    color: 'purple',
                  },
                  {
                    icon: Heart,
                    title: '중대질병보험',
                    description: '암, 뇌졸중, 심근경색 등 중대질병 보장',
                    features: [
                      '3대 질병 진단비',
                      '치료비 일시금',
                      '생활비 보장',
                      '재발 보장',
                    ],
                    color: 'red',
                  },
                  {
                    icon: Calculator,
                    title: '건강보험료 최적화',
                    description: '보험료 절감을 위한 전문 컨설팅',
                    features: [
                      '보험료 비교 분석',
                      '중복 보장 정리',
                      '보장 공백 해소',
                      '연간 관리 서비스',
                    ],
                    color: 'orange',
                  },
                  {
                    icon: TrendingUp,
                    title: '건강관리 서비스',
                    description: '예방 중심의 건강관리 통합 솔루션',
                    features: [
                      '정기 건강검진',
                      '건강 상담 서비스',
                      '운동 처방 프로그램',
                      '영양 관리 지도',
                    ],
                    color: 'teal',
                  },
                ].map((service, index) => (
                  <Card
                    key={index}
                    className="group relative border-2 hover:border-primary/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" size="xs">
                          {service.color === 'green'
                            ? '개인'
                            : service.color === 'blue'
                              ? '법인'
                              : '전문'}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <CalComPopup
                        buttonText="상담 신청"
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        eventType="consultation"
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                          >
                            상담 신청
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        }
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 성공 사례 섹션 */}
          <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  <span className="text-primary">성공</span> 사례
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  실제 고객들의 건강보험 성공 스토리를 확인하세요
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    category: '개인 고객',
                    situation: '40대 직장인, 가족력으로 인한 건강 우려',
                    solution: '개인 맞춤형 종합건강보험 + 중대질병보험 설계',
                    result:
                      '연간 의료비 70% 절감, 안심하고 치료 받는 환경 조성',
                    savings: '연 300만원 절약',
                  },
                  {
                    category: '중소기업',
                    situation: '직원 50명 규모, 복리후생 개선 필요',
                    solution: '법인 단체건강보험 + 건강관리 프로그램 도입',
                    result: '직원 만족도 95% 상승, 이직률 30% 감소',
                    savings: '인건비 20% 절감',
                  },
                  {
                    category: '대기업',
                    situation: '임직원 500명, 의료비 지출 증가 문제',
                    solution: '종합 건강관리 솔루션 + 예방 중심 프로그램',
                    result: '의료비 지출 40% 감소, 생산성 25% 향상',
                    savings: '연 15억원 절약',
                  },
                ].map((case_study, index) => (
                  <Card
                    key={index}
                    className="border-2 hover:border-primary/50 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge
                          variant="outline"
                          className="text-primary border-primary/20 dark:border-primary/30"
                        >
                          {case_study.category}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                            상황
                          </h4>
                          <p className="text-sm text-foreground">
                            {case_study.situation}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                            솔루션
                          </h4>
                          <p className="text-sm text-foreground">
                            {case_study.solution}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                            결과
                          </h4>
                          <p className="text-sm text-foreground mb-2">
                            {case_study.result}
                          </p>
                          <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded text-center">
                            <span className="text-primary font-bold text-sm">
                              {case_study.savings}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 건강보험 가이드 섹션 */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  건강보험 <span className="text-primary">가입 가이드</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  올바른 건강보험 선택을 위한 단계별 가이드
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      개인 건강보험
                    </h3>
                    {[
                      {
                        step: 1,
                        title: '건강 상태 체크',
                        description: '현재 건강상태와 가족력 확인',
                      },
                      {
                        step: 2,
                        title: '보장 범위 설정',
                        description: '필요한 보장 항목 우선순위 결정',
                      },
                      {
                        step: 3,
                        title: '보험료 예산 계획',
                        description: '월 보험료 적정 수준 산정',
                      },
                      {
                        step: 4,
                        title: '상품 비교 분석',
                        description: '보험사별 상품 비교 검토',
                      },
                      {
                        step: 5,
                        title: '전문가 상담',
                        description: '맞춤형 설계 및 최종 결정',
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">
                            {item.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      법인 건강보험
                    </h3>
                    {[
                      {
                        step: 1,
                        title: '임직원 현황 분석',
                        description: '직원 수, 연령대, 직종별 분석',
                      },
                      {
                        step: 2,
                        title: '예산 및 목표 설정',
                        description: '복리후생 예산과 목표 수준 결정',
                      },
                      {
                        step: 3,
                        title: '보장 항목 선정',
                        description: '단체보험 vs 개인보험 비교 검토',
                      },
                      {
                        step: 4,
                        title: '보험사 선택',
                        description: '서비스와 보장 내용 종합 평가',
                      },
                      {
                        step: 5,
                        title: '도입 및 관리',
                        description: '가입 절차 및 지속적인 관리 체계',
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">
                            {item.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA 섹션 */}
          <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
            <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  건강보험 전문 상담
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  15년 경험의 건강보험 전문가가 개인과 기업의 맞춤형 건강보장
                  설계를 도와드립니다
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CalComPopup
                    buttonText="무료 건강보험 상담 신청"
                    variant="default"
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                    eventType="consultation"
                    trigger={
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        무료 건강보험 상담 신청
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    }
                  />
                  <a
                    href="tel:0502-5550-8700"
                    className={cn(
                      buttonVariants({ size: 'lg', variant: 'outline' }),
                      'inline-flex items-center'
                    )}
                  >
                    ☎︎ 0502-5550-8700
                  </a>
                </div>

                <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>상담 시간:</strong> 평일 09:00 - 18:00 |
                    <strong className="ml-2">응답 시간:</strong> 24시간 내 연락
                    |<strong className="ml-2">상담 방식:</strong> 대면/화상/전화
                    상담 가능
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
