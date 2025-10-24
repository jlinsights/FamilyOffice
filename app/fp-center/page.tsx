'use client';

import {
  Calculator,
  Shield,
  TrendingUp,
  Users,
  Building2,
  Heart,
  Target,
  Award,
  CheckCircle2,
  Star,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  PiggyBank,
  Banknote,
  LineChart,
  FileText,
  Lightbulb,
  Crown,
  Handshake,
  Globe,
  Zap,
  BookOpen,
  UserCheck,
  Gem,
  Sparkles,
  Headphones,
  Calendar,
  MessageSquare,
} from 'lucide-react';

import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';


// FP센터 핵심 서비스
const fpServices = {
  comprehensive: {
    title: '종합 재무설계',
    icon: Calculator,
    description: '개인별 맞춤형 종합 재무 포트폴리오 설계',
    features: [
      '현재 재무상태 정밀 분석',
      '생애주기별 재무목표 설정',
      '위험성향 분석 및 자산배분',
      '세무 최적화 전략',
      '정기적 포트폴리오 리뷰'
    ],
    benefits: [
      '체계적인 자산관리',
      '세무 효율성 극대화',
      '생애목표 달성 지원',
      '리스크 관리 최적화'
    ],
    targetClient: '체계적 재무관리가 필요한 모든 고객'
  },
  insurance: {
    title: '맞춤형 보험설계',
    icon: Shield,
    description: '라이프스타일과 위험성향에 맞는 최적 보험 솔루션',
    features: [
      '보험 니즈 분석',
      '보장 갭 분석 및 최적화',
      '생명보험·손해보험 통합 설계',
      '세무혜택 극대화',
      '정기적 보험 리뷰'
    ],
    benefits: [
      '필요한 보장만 정확히',
      '보험료 절약 극대화',
      '세무 효율성',
      '통합적 리스크 관리'
    ],
    targetClient: '보험 최적화가 필요한 개인·가족·기업'
  },
  investment: {
    title: '자산관리 컨설팅',
    icon: TrendingUp,
    description: '목표 수익률 달성을 위한 전문적 투자 자문',
    features: [
      '투자성향 분석',
      '포트폴리오 구성 및 관리',
      '글로벌 자산배분',
      '대안투자 솔루션',
      '리밸런싱 서비스'
    ],
    benefits: [
      '안정적 수익 추구',
      '리스크 분산',
      '전문가 관리',
      '투자 효율성 극대화'
    ],
    targetClient: '전문적 자산관리를 원하는 투자자'
  },
  retirement: {
    title: '은퇴설계',
    icon: PiggyBank,
    description: '행복한 은퇴생활을 위한 체계적 준비',
    features: [
      '은퇴자금 필요액 산정',
      '국민연금·퇴직연금 최적화',
      '개인연금 설계',
      '은퇴 후 자산배분 전략',
      '상속·증여 계획'
    ],
    benefits: [
      '안정적 은퇴자금 확보',
      '세액공제 혜택 극대화',
      '인플레이션 대응',
      '가족 자산 보전'
    ],
    targetClient: '은퇴를 준비하는 40-50대'
  },
  estate: {
    title: '상속·증여 설계',
    icon: Crown,
    description: '가족의 미래를 위한 체계적 자산 승계',
    features: [
      '상속세·증여세 절세 전략',
      '가족 자산 구조화',
      '신탁 활용 전략',
      '가업승계 설계',
      '차세대 금융교육'
    ],
    benefits: [
      '상속세 부담 최소화',
      '가족 갈등 예방',
      '체계적 자산 이전',
      '세대간 부의 승계'
    ],
    targetClient: '자산 승계가 필요한 가족·기업'
  },
  corporate: {
    title: '기업 금융컨설팅',
    icon: Building2,
    description: '기업의 성장과 안정을 위한 종합 금융 솔루션',
    features: [
      '기업 재무구조 분석',
      '자금조달 컨설팅',
      '리스크 관리 솔루션',
      '임직원 복리후생 설계',
      '가업승계 지원'
    ],
    benefits: [
      '재무 안정성 확보',
      '성장자금 확보',
      '리스크 최소화',
      '임직원 만족도 향상'
    ],
    targetClient: '종합적 금융 솔루션이 필요한 기업'
  }
};

// FP센터의 차별화 포인트
const differentiators = [
  {
    icon: UserCheck,
    title: '전문 FP의 1:1 맞춤 서비스',
    description: '국제공인 자격을 보유한 전문 Financial Planner가 고객별 맞춤 솔루션을 제공합니다.'
  },
  {
    icon: Globe,
    title: '글로벌 네트워크',
    description: '삼성생명의 글로벌 네트워크를 통한 해외투자 기회와 국제적 자산관리 서비스를 제공합니다.'
  },
  {
    icon: Zap,
    title: '디지털 혁신 서비스',
    description: '최신 핀테크 기술과 AI를 활용한 스마트 자산관리 솔루션을 경험할 수 있습니다.'
  },
  {
    icon: Handshake,
    title: '통합 원스톱 서비스',
    description: '보험, 투자, 대출, 신탁까지 모든 금융 서비스를 하나의 창구에서 통합 관리합니다.'
  },
  {
    icon: BookOpen,
    title: '지속적인 교육 지원',
    description: '정기 세미나, 투자 교육, 재무상담을 통해 고객의 금융 이해도를 높여드립니다.'
  },
  {
    icon: Gem,
    title: '프리미엄 서비스',
    description: 'VIP 고객을 위한 전용 라운지, 우선 상담, 특별 혜택 등 차별화된 서비스를 제공합니다.'
  }
];

// FP센터 성공 사례
const successCases = [
  {
    icon: Award,
    title: '40대 의사 K님',
    challenge: '높은 소득에도 체계적 자산관리 부재',
    solution: '종합 재무설계 + 절세 전략 + 은퇴설계',
    result: '연 소득세 30% 절감, 은퇴자금 150% 증가',
    period: '3년간'
  },
  {
    icon: Star,
    title: '50대 기업인 L님',
    challenge: '가업승계와 상속세 부담 우려',
    solution: '가업승계 설계 + 보험 활용 + 세무최적화',
    result: '상속세 60% 절감, 안정적 경영권 승계',
    period: '5년간'
  },
  {
    icon: Gem,
    title: '60대 은퇴자 M님',
    challenge: '은퇴 후 안정적 현금흐름 필요',
    solution: '은퇴설계 + 연금최적화 + 자산배분',
    result: '월 생활비 100% 확보, 인플레이션 대응',
    period: '진행중'
  }
];

// FP센터 프로세스
const consultingProcess = [
  {
    step: 1,
    title: '재무상태 진단',
    description: '현재 자산·부채·소득·지출 현황을 정밀 분석',
    duration: '1주',
    deliverable: '재무상태 진단서'
  },
  {
    step: 2,
    title: '목표 설정 및 전략 수립',
    description: '생애목표별 우선순위 설정 및 달성 전략 수립',
    duration: '1주',
    deliverable: '재무목표 설정서'
  },
  {
    step: 3,
    title: '맞춤 솔루션 설계',
    description: '투자·보험·세무·승계 통합 솔루션 설계',
    duration: '2주',
    deliverable: '통합 재무설계서'
  },
  {
    step: 4,
    title: '실행 및 모니터링',
    description: '설계안 실행 및 정기적 점검·조정',
    duration: '지속적',
    deliverable: '정기 리포트'
  }
];

const FPCenterPage = () => {
  const [selectedService, setSelectedService] = React.useState('comprehensive');
  const [selectedCase, setSelectedCase] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="outline" size="lg" className="mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              삼성생명 FP센터
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              전문 Financial Planner와 함께하는
              <span className="block mt-2 text-primary">
                종합 재무설계 서비스
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              국제공인 자격을 보유한 전문가가 제공하는
              <span className="block mt-2 font-semibold">
                맞춤형 금융 솔루션과 원스톱 서비스
              </span>
            </p>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">전문 FP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">명의 전문가</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">관리자산</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">5조+</div>
                  <div className="text-sm text-muted-foreground">원 관리</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">고객 만족도</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">고객 추천</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">평균 수익률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">12%</div>
                  <div className="text-sm text-muted-foreground">연평균(5년)</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                buttonText="무료 재무진단 받기"
                eventType="consultation"
                trigger={
                  <div className="inline-flex items-center">
                    <UserCheck className="h-6 w-6 mr-2" />
                    무료 재무진단 받기
                  </div>
                }
              />

              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="#services">
                  <BookOpen className="h-6 w-6 mr-2" />
                  서비스 자세히 보기
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section id="services" className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                FP센터 핵심 서비스
              </h2>
              <p className="text-xl text-muted-foreground">
                전문 Financial Planner가 제공하는 6대 핵심 금융 서비스
              </p>
            </div>

            <Tabs value={selectedService} onValueChange={setSelectedService} className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-3 w-full mb-8">
                {Object.entries(fpServices).map(([key, service]) => (
                  <TabsTrigger key={key} value={key} className="text-sm">
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(fpServices).map(([key, service]) => {
                const Icon = service.icon;
                return (
                  <TabsContent key={key} value={key}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-2xl">{service.title}</CardTitle>
                            <CardDescription className="text-lg">
                              {service.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold text-lg mb-3 text-primary flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" />
                              주요 서비스
                            </h4>
                            <ul className="space-y-2">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
                              <Star className="h-5 w-5" />
                              기대 효과
                            </h4>
                            <ul className="space-y-2">
                              {service.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Star className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            추천 고객
                          </h4>
                          <p className="text-sm">{service.targetClient}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                FP센터만의 차별화 포인트
              </h2>
              <p className="text-xl text-muted-foreground">
                왜 많은 고객들이 FP센터를 선택하는지 알아보세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Icon className="h-12 w-12 text-primary mb-4" />
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Cases */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                FP센터 성공 사례
              </h2>
              <p className="text-xl text-muted-foreground">
                전문 재무설계로 목표를 달성한 고객들의 실제 사례
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {successCases.map((caseItem, index) => {
                const Icon = caseItem.icon;
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-yellow-600 mb-2" />
                      <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {caseItem.period}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm text-red-600">도전과제</h4>
                          <p className="text-sm text-muted-foreground">
                            {caseItem.challenge}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-blue-600">솔루션</h4>
                          <p className="text-sm text-muted-foreground">
                            {caseItem.solution}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-green-600">결과</h4>
                          <p className="text-sm text-green-600 font-medium">
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

        {/* Consulting Process */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                FP센터 컨설팅 프로세스
              </h2>
              <p className="text-xl text-muted-foreground">
                체계적인 4단계 프로세스로 최적의 재무설계를 제공합니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultingProcess.map((process, index) => (
                <Card key={index} className="h-full relative">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-3">
                      {process.step}
                    </div>
                    <CardTitle className="text-lg">{process.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {process.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {process.description}
                    </p>
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-xs text-primary">산출물</h5>
                      <p className="text-xs text-muted-foreground">
                        {process.deliverable}
                      </p>
                    </div>
                  </CardContent>
                  {index < consultingProcess.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & CTA */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-3">
                      지금 바로 FP센터와 함께 시작하세요
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      전문 Financial Planner가 무료 재무진단부터 종합 재무설계까지
                      <span className="block mt-1 font-semibold">
                        고객님만의 맞춤형 솔루션을 제공합니다
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CalComPopup
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                      buttonText="무료 종합 재무진단"
                      eventType="consultation"
                      trigger={
                        <div className="inline-flex items-center">
                          <Briefcase className="h-5 w-5 mr-2" />
                          무료 종합 재무진단
                        </div>
                      }
                    />

                    <Button variant="outline" size="lg" asChild>
                      <Link href="/tax-strategy">
                        <Calculator className="h-5 w-5 mr-2" />
                        절세 전략 보기
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild>
                      <Link href="/business-succession-strategy">
                        <Crown className="h-5 w-5 mr-2" />
                        가업승계 전략
                      </Link>
                    </Button>

                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>전화: 0502-5550-8700</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>상담시간: 평일 09:00-18:00</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Headphones className="h-4 w-4" />
                      <span>24시간 온라인 상담</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Services Links */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">
                관련 서비스 더 알아보기
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-4">
                  <Link href="/ceo-checklist" className="block">
                    <div className="text-center">
                      <Briefcase className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">CEO 경영진단</h4>
                      <p className="text-xs text-muted-foreground">5대 핵심영역 진단</p>
                      <ChevronRight className="h-4 w-4 mx-auto mt-2 text-muted-foreground" />
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-4">
                  <Link href="/inheritance-gift-tax" className="block">
                    <div className="text-center">
                      <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">상속·증여세</h4>
                      <p className="text-xs text-muted-foreground">세금 완벽 가이드</p>
                      <ChevronRight className="h-4 w-4 mx-auto mt-2 text-muted-foreground" />
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-4">
                  <Link href="/hr-labor-management" className="block">
                    <div className="text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">인사노무관리</h4>
                      <p className="text-xs text-muted-foreground">완벽 체크리스트</p>
                      <ChevronRight className="h-4 w-4 mx-auto mt-2 text-muted-foreground" />
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-4">
                  <Link href="/corporate-tax-checklist" className="block">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">법인세 결산</h4>
                      <p className="text-xs text-muted-foreground">필수 체크리스트</p>
                      <ChevronRight className="h-4 w-4 mx-auto mt-2 text-muted-foreground" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FPCenterPage;