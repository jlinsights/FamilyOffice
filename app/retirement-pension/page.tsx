import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Building,
  Calculator,
  CheckCircle,
  Coins,
  Phone,
  PiggyBank,
  Shield,
  Target,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/seo/structured-data';
import { generateMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = generateMetadata(
  '퇴직연금 컨설팅 | 확정기여형·확정급여형 | 패밀리오피스',
  '개인형퇴직연금(IRP)부터 기업형 퇴직연금(DC/DB)까지. 퇴직연금 설계, 운용, 이전 등 종합 컨설팅 서비스를 제공합니다.',
  [
    '퇴직연금',
    'IRP',
    '개인형퇴직연금',
    '확정기여형',
    '확정급여형',
    'DC형',
    'DB형',
    '퇴직연금 운용',
    '퇴직연금 이전',
    '세액공제',
    '은퇴설계',
    '노후준비',
  ],
  undefined,
  '전문가급',
  '성숙기',
  'commercial'
);

export default function RetirementPensionPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '퇴직연금 컨설팅',
    description: '개인형퇴직연금부터 기업형 퇴직연금까지 종합 컨설팅 서비스',
    provider: {
      '@type': 'Organization',
      name: '패밀리오피스',
      url: 'https://familyoffices.vip',
    },
    serviceType: '퇴직연금',
    areaServed: '대한민국',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '퇴직연금 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '개인형퇴직연금(IRP)',
            description: '세제혜택을 활용한 개인 퇴직연금 설계',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '확정기여형(DC형)',
            description: '기업 임직원 대상 확정기여형 퇴직연금',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '확정급여형(DB형)',
            description: '안정적인 퇴직급여 보장 시스템',
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
                  <PiggyBank className="h-3 w-3 mr-1" />
                  Retirement Pension Solutions
                </Badge>
              </div>

              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 text-primary whitespace-pre-line animate-slide-up">
                퇴직연금{'\\n'}종합 컨설팅
              </h1>

              <p
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6 animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                안정적인 노후를 위한 스마트한 선택
              </p>

              <p
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
                style={{ animationDelay: '300ms' }}
              >
                개인형퇴직연금(IRP)부터 기업형 퇴직연금까지{' '}
                <span className="font-semibold text-primary">
                  세제혜택을 극대화하는 맞춤형 퇴직연금 설계
                </span>{' '}
                로 풍요로운 은퇴 생활을 준비하세요
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 animate-slide-up"
                style={{ animationDelay: '400ms' }}
              >
                <CalComPopup
                  buttonText="퇴직연금 상담 신청"
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
                  <span className="text-primary">퇴직연금</span> 전문성
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  수치로 확인하는 퇴직연금 컨설팅 전문 서비스
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    value: '2,000+',
                    label: '퇴직연금 설계 건수',
                    color: 'text-blue-600 dark:text-blue-400',
                    icon: Users,
                  },
                  {
                    value: '800억원+',
                    label: '누적 퇴직연금 관리',
                    color: 'text-purple-600 dark:text-purple-400',
                    icon: TrendingUp,
                  },
                  {
                    value: '12년+',
                    label: '퇴직연금 전문 경력',
                    color: 'text-green-600 dark:text-green-400',
                    icon: Award,
                  },
                  {
                    value: '150+',
                    label: '기업 퇴직연금 도입',
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
                    <Briefcase className="h-3 w-3 mr-1" />
                    퇴직연금 서비스
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  <span className="text-primary">맞춤형</span> 퇴직연금 솔루션
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  개인과 기업의 다양한 퇴직연금 요구에 맞춘 전문 서비스를
                  제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: User,
                    title: '개인형퇴직연금(IRP)',
                    description: '세제혜택을 극대화하는 개인 퇴직연금 설계',
                    features: [
                      '연 700만원 세액공제',
                      '퇴직금 이전 관리',
                      '추가 납입 가능',
                      '운용수익 과세이연',
                    ],
                    color: 'blue',
                  },
                  {
                    icon: Building,
                    title: '확정기여형(DC형)',
                    description: '기업과 임직원이 함께하는 퇴직연금 제도',
                    features: [
                      '기업 부담금 납입',
                      '개인 추가 납입',
                      '투자상품 다양화',
                      '연금 수령 가능',
                    ],
                    color: 'purple',
                  },
                  {
                    icon: Shield,
                    title: '확정급여형(DB형)',
                    description: '안정적인 퇴직급여 보장 시스템',
                    features: [
                      '확정된 급여 보장',
                      '기업 운용책임',
                      '안정적 수익 보장',
                      '예측 가능한 노후자금',
                    ],
                    color: 'green',
                  },
                  {
                    icon: Target,
                    title: '퇴직연금 운용컨설팅',
                    description: '수익률 극대화를 위한 전문 운용 관리',
                    features: [
                      '포트폴리오 분석',
                      '리밸런싱 전략',
                      '리스크 관리',
                      '수익률 모니터링',
                    ],
                    color: 'orange',
                  },
                  {
                    icon: Calculator,
                    title: '퇴직연금 이전 서비스',
                    description: '퇴직연금 통합 관리 및 이전 컨설팅',
                    features: [
                      '계좌 통합 관리',
                      '수수료 절감',
                      '상품 재선택',
                      '세제혜택 최적화',
                    ],
                    color: 'teal',
                  },
                  {
                    icon: BarChart3,
                    title: '퇴직연금 교육 서비스',
                    description: '임직원 대상 퇴직연금 교육 프로그램',
                    features: [
                      '퇴직연금 기초교육',
                      '투자상품 이해',
                      '세제혜택 활용',
                      '은퇴설계 가이드',
                    ],
                    color: 'indigo',
                  },
                ].map((service, index) => (
                  <Card
                    key={index}
                    className="group relative border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" size="xs">
                          {service.color === 'blue' ||
                          service.color === 'purple' ||
                          service.color === 'green'
                            ? '핵심'
                            : '부가'}
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
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
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
                          <div
                            className={cn(
                              buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                              }),
                              'w-full border-primary text-primary hover:bg-primary hover:text-white cursor-pointer'
                            )}
                          >
                            상담 신청
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        }
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 퇴직연금 종류 비교 섹션 */}
          <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  퇴직연금 <span className="text-primary">종류별 비교</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  IRP, DC형, DB형 퇴직연금의 특징을 한눈에 비교해보세요
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="p-4 text-left font-semibold text-foreground">
                          구분
                        </th>
                        <th className="p-4 text-center font-semibold text-primary">
                          개인형(IRP)
                        </th>
                        <th className="p-4 text-center font-semibold text-primary">
                          확정기여형(DC)
                        </th>
                        <th className="p-4 text-center font-semibold text-primary">
                          확정급여형(DB)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          category: '가입대상',
                          irp: '퇴직급여 수급권자\n개인사업자, 공무원 등',
                          dc: '근로자 (기업 선택)',
                          db: '근로자 (기업 선택)',
                        },
                        {
                          category: '기여주체',
                          irp: '개인',
                          dc: '기업 + 개인(추가)',
                          db: '기업',
                        },
                        {
                          category: '운용책임',
                          irp: '개인',
                          dc: '개인',
                          db: '기업(사용자)',
                        },
                        {
                          category: '세제혜택',
                          irp: '연 700만원\n세액공제 15%',
                          dc: '연 1,800만원\n세액공제 15%',
                          db: '소득공제\n(퇴직소득세)',
                        },
                        {
                          category: '투자위험',
                          irp: '개인 부담',
                          dc: '개인 부담',
                          db: '기업 부담',
                        },
                        {
                          category: '급여수준',
                          irp: '운용성과에 따라',
                          dc: '운용성과에 따라',
                          db: '사전 약정된 수준',
                        },
                      ].map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="p-4 font-medium text-foreground">
                            {item.category}
                          </td>
                          <td className="p-4 text-center text-sm text-muted-foreground whitespace-pre-line">
                            {item.irp}
                          </td>
                          <td className="p-4 text-center text-sm text-muted-foreground whitespace-pre-line">
                            {item.dc}
                          </td>
                          <td className="p-4 text-center text-sm text-muted-foreground whitespace-pre-line">
                            {item.db}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 세제혜택 섹션 */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  <span className="text-primary">세제혜택</span> 극대화
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  퇴직연금으로 받을 수 있는 다양한 세제혜택을 알아보세요
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Coins,
                    title: '세액공제 혜택',
                    amount: '연 최대 105만원',
                    description: 'IRP 700만원 × 15%\nDC형 1,800만원 × 15%',
                    color: 'blue',
                  },
                  {
                    icon: TrendingUp,
                    title: '운용수익 과세이연',
                    amount: '퇴직시까지',
                    description:
                      '운용기간 중 발생하는\n모든 수익에 대해 과세 이연',
                    color: 'green',
                  },
                  {
                    icon: Calculator,
                    title: '퇴직소득세 우대',
                    amount: '최대 50% 절감',
                    description: '퇴직소득공제 및\n퇴직소득세율 우대 적용',
                    color: 'purple',
                  },
                ].map((benefit, index) => (
                  <Card
                    key={index}
                    className="border-2 hover:border-primary/50 transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <benefit.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {benefit.title}
                      </h3>
                      <div className="text-2xl font-bold mb-4 text-primary">
                        {benefit.amount}
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 세제혜택 계산 예시 */}
              <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
                  연봉 5천만원 직장인 세제혜택 예시
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4 text-blue-600">
                      IRP 가입시
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>연간 납입액</span>
                        <span className="font-semibold">700만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>세액공제(15%)</span>
                        <span className="font-semibold text-blue-600">
                          105만원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>실부담액</span>
                        <span className="font-semibold">595만원</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between text-base font-bold">
                        <span>절세효과</span>
                        <span className="text-blue-600">17.6%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4 text-purple-600">
                      DC형 추가납입시
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>연간 추가납입</span>
                        <span className="font-semibold">1,100만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>세액공제(15%)</span>
                        <span className="font-semibold text-purple-600">
                          165만원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>실부담액</span>
                        <span className="font-semibold">935만원</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between text-base font-bold">
                        <span>절세효과</span>
                        <span className="text-purple-600">17.6%</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                  실제 고객들의 퇴직연금 성공 스토리를 확인하세요
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    category: '개인 고객',
                    situation: '40대 직장인, 퇴직금 3억원 이전 필요',
                    solution: 'IRP 계좌 개설 + 안정형 포트폴리오 구성',
                    result: '연 105만원 세액공제 + 5% 안정수익 달성',
                    savings: '10년간 1,500만원 절세',
                  },
                  {
                    category: '중소기업',
                    situation: '직원 30명, DC형 퇴직연금 도입',
                    solution: '단계적 DC형 도입 + 임직원 교육 실시',
                    result: '퇴직금 중간정산 감소, 직원 만족도 상승',
                    savings: '기업 부담 20% 절감',
                  },
                  {
                    category: '대기업',
                    situation: '임직원 200명, DB형에서 DC형 전환',
                    solution: '점진적 제도 전환 + 운용교육 강화',
                    result: '평균 수익률 7% 달성, 퇴직급여 30% 증가',
                    savings: '10년간 100억원 증대',
                  },
                ].map((case_study, index) => (
                  <Card
                    key={index}
                    className="border-2 hover:border-primary/50 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge
                          variant="outline"
                          className="text-primary border-primary/20"
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

          {/* CTA 섹션 */}
          <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  퇴직연금 전문 상담
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  12년 경험의 퇴직연금 전문가가 개인과 기업의 맞춤형 퇴직연금
                  설계를 도와드립니다
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CalComPopup
                    buttonText="무료 퇴직연금 상담 신청"
                    variant="default"
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                    eventType="consultation"
                    trigger={
                      <div
                        className={cn(
                          buttonVariants({ size: 'lg' }),
                          'bg-primary hover:bg-primary/90 text-white cursor-pointer'
                        )}
                      >
                        무료 퇴직연금 상담 신청
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
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
