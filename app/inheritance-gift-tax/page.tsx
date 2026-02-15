'use client';

import {
  Award,
  Building,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  Download,
  Heart,
  Info,
  Phone,
  Receipt,
  Shield,
  Users,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { Footer } from '@/components/footer';
import { SelfCheckSuccession } from '@/components/forms/self-check-succession';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/seo/structured-data';
import { generateStructuredData } from '@/lib/seo/structured-data';
import { cn } from '@/lib/utils';

// 상속세율 구간
const inheritanceTaxRates = [
  { range: '1억원 이하', rate: 10, amount: 1 },
  { range: '1억원 초과 ~ 5억원 이하', rate: 20, amount: 5 },
  { range: '5억원 초과 ~ 10억원 이하', rate: 30, amount: 10 },
  { range: '10억원 초과 ~ 30억원 이하', rate: 40, amount: 30 },
  { range: '30억원 초과', rate: 50, amount: 999 },
];

// 증여세율 구간
const giftTaxRates = [
  { range: '1억원 이하', rate: 10, amount: 1 },
  { range: '1억원 초과 ~ 5억원 이하', rate: 20, amount: 5 },
  { range: '5억원 초과 ~ 10억원 이하', rate: 30, amount: 10 },
  { range: '10억원 초과 ~ 30억원 이하', rate: 40, amount: 30 },
  { range: '30억원 초과', rate: 50, amount: 999 },
];

// 공제 한도
const deductionLimits = {
  inheritance: {
    basic: {
      title: '기초공제',
      amount: 200000000,
      description: '상속인 수에 관계없이 2억원',
    },
    spouse: {
      title: '배우자공제',
      amount: 600000000,
      description: '최소 5억원, 실제 상속분의 한도 내에서 최대 30억원',
    },
    child: {
      title: '자녀공제',
      amount: 50000000,
      description: '미성년자 1인당 5천만원, 미성년자는 연령에 따라 추가',
    },
    other: {
      title: '기타 인적공제',
      amount: 50000000,
      description: '직계존속, 장애인, 고령자 각 5천만원',
    },
    funeral: {
      title: '장례비',
      amount: 5000000,
      description: '실제 소요된 금액, 최대 500만원',
    },
    debt: {
      title: '채무부담',
      amount: 0,
      description: '사실상 상속인이 부담하는 피상속인의 채무',
    },
  },
  gift: {
    spouse: { title: '배우자', amount: 600000000, description: '10년간 6억원' },
    child: {
      title: '직계비속(자녀)',
      amount: 50000000,
      description: '10년간 5천만원(미성년자 2천만원)',
    },
    parent: {
      title: '직계존속(부모)',
      amount: 50000000,
      description: '10년간 5천만원',
    },
    other: {
      title: '기타 친족',
      amount: 10000000,
      description: '10년간 1천만원',
    },
    others: { title: '타인', amount: 5000000, description: '10년간 500만원' },
  },
};

// 신고 및 납부 일정
const taxSchedule = {
  inheritance: {
    assessment: '상속개시일로부터 6개월 이내',
    filing: '상속개시일로부터 6개월 이내',
    payment: '상속개시일로부터 6개월 이내',
    extension: '3개월 연장 신청 가능',
    installment: '2천만원 초과 시 최대 5년 분납 가능',
  },
  gift: {
    assessment: '증여일이 속하는 달의 말일로부터 3개월 이내',
    filing: '증여일이 속하는 달의 말일로부터 3개월 이내',
    payment: '증여일이 속하는 달의 말일로부터 3개월 이내',
    extension: '3개월 연장 신청 가능',
    installment: '2천만원 초과 시 최대 5년 분납 가능',
  },
};

// 주요 절세 전략
const taxStrategies = [
  {
    category: '생전증여 활용',
    icon: Heart,
    description: '생전에 단계적으로 재산을 이전하여 상속세 부담 완화',
    strategies: [
      '연간 증여한도 활용 (배우자 6억원, 자녀 5천만원)',
      '부동산 시가 하락 시점 활용',
      '미성년 자녀에게 조기 증여',
      '사업용 자산 할인 평가 활용',
      '가족법인 설립을 통한 지분 증여',
    ],
    effectiveness: 85,
    difficulty: '중급',
    period: '5-10년',
  },
  {
    category: '가업상속공제',
    icon: Building,
    description: '가업을 승계하는 경우 최대 500억원까지 상속세 공제',
    strategies: [
      '가업요건 충족 (10년 이상 사업 영위)',
      '승계요건 준수 (7년 이상 경영 참여)',
      '고용요건 충족 (고용 유지)',
      '사전 승계계획 수립',
      '전문가 검토를 통한 요건 확인',
    ],
    effectiveness: 95,
    difficulty: '고급',
    period: '10년 이상',
  },
  {
    category: '공익법인 활용',
    icon: Award,
    description: '공익법인 출연을 통한 상속세 절세',
    strategies: [
      '공익법인 설립 및 출연',
      '출연재산 100% 상속세 공제',
      '출연 후 5년간 공익사업 의무',
      '법인 설립 요건 충족',
      '사후 관리 체계 구축',
    ],
    effectiveness: 90,
    difficulty: '고급',
    period: '장기',
  },
  {
    category: '신탁 활용',
    icon: Shield,
    description: '신탁을 통한 재산 관리 및 절세',
    strategies: [
      '가족신탁 설립',
      '수익권 증여를 통한 절세',
      '신탁재산 운용 최적화',
      '차세대 경영 참여 단계적 확대',
      '세대 간 자산 이전 체계 구축',
    ],
    effectiveness: 80,
    difficulty: '고급',
    period: '10-20년',
  },
];

// 자주 묻는 질문 (국세청 Q&A 기반)
const frequentQuestions = [
  {
    category: '상속세 기본',
    question: '상속세가 부과되는 재산의 범위는?',
    answer:
      '피상속인이 상속 개시일 현재 소유하고 있던 모든 재산(금전으로 환가할 수 있는 경제적 가치가 있는 모든 것)이 상속세 과세대상입니다. 여기에는 현금, 예금, 부동산, 유가증권, 골프회원권 등이 포함됩니다.',
    tags: ['기본개념', '과세대상'],
  },
  {
    category: '상속세 신고',
    question: '상속세 신고는 언제까지 해야 하나요?',
    answer:
      '상속개시일이 속하는 달의 말일로부터 6개월 이내에 납세지 관할세무서에 신고·납부해야 합니다. 3개월의 연장 신청이 가능하며, 정당한 사유가 있는 경우 승인됩니다.',
    tags: ['신고기한', '연장신청'],
  },
  {
    category: '증여세 기본',
    question: '증여세 신고대상은 어떻게 되나요?',
    answer:
      '증여받은 재산가액에서 증여재산공제를 차감한 과세표준이 있는 경우 신고해야 합니다. 배우자 6억원, 직계비속 5천만원(미성년자 2천만원), 직계존속 5천만원, 기타 친족 1천만원, 타인 500만원의 공제한도가 있습니다.',
    tags: ['신고대상', '공제한도'],
  },
  {
    category: '증여 추정',
    question: '증여추정이란 무엇인가요?',
    answer:
      '직계존비속, 형제자매, 배우자 등 특수관계자 간에 재산을 무상 또는 현저히 낮은 대가로 양도하거나 경제적 이익을 제공한 경우 증여로 추정하는 제도입니다. 부동산 양도, 금전 대여, 채무 면제 등이 해당됩니다.',
    tags: ['증여추정', '특수관계'],
  },
  {
    category: '재산평가',
    question: '상속재산은 어떻게 평가하나요?',
    answer:
      '상속개시일 현재의 시가로 평가하는 것이 원칙입니다. 시가를 확인하기 어려운 경우에는 ①감정평가액 ②매매사례가액 ③공시지가 등의 기준으로 평가하며, 이도 없으면 ④국세청 고시가액을 적용합니다.',
    tags: ['재산평가', '시가산정'],
  },
  {
    category: '공제제도',
    question: '상속세 기초공제 2억원은 언제부터 적용되나요?',
    answer:
      '2013년 1월 1일 이후 발생한 상속분부터 기초공제가 2억원으로 적용됩니다. 이전에는 5억원이었으나, 세수 확보를 위해 인하되었습니다. 다만 다른 인적공제와 함께 활용하면 실질적인 공제 효과를 극대화할 수 있습니다.',
    tags: ['기초공제', '공제변경'],
  },
  {
    category: '납부방법',
    question: '상속세를 분납할 수 있나요?',
    answer:
      '상속세(증여세 포함) 납부세액이 2천만원을 초과하고, 금전납부가 곤란한 사유가 있는 경우 최대 5년에 걸쳐 분할납부할 수 있습니다. 분납기간 중에는 연 4.6%의 이자상당액(연부이자)을 납부해야 합니다.',
    tags: ['분납제도', '연부이자'],
  },
  {
    category: '절세전략',
    question: '합법적인 상속세 절세방법은?',
    answer:
      '①생전증여를 통한 재산의 사전 이전 ②가업상속공제 활용 ③공익법인 출연 ④가족신탁 설립 ⑤적정한 보험 활용 등이 있습니다. 단, 조세회피 목적의 편법은 증여의제, 부당행위계산 부인 등으로 과세될 수 있어 전문가 상담이 필요합니다.',
    tags: ['절세방법', '합법적절세'],
  },
];

// 계산 시뮬레이터 데이터
const taxCalculator = {
  inheritance: {
    scenario1: {
      name: '일반적인 상속 (배우자, 자녀 2명)',
      totalAssets: 1000000000, // 10억원
      deductions: {
        basic: 200000000, // 기초공제
        spouse: 500000000, // 배우자공제 (최소)
        children: 100000000, // 자녀공제 (5천만원 × 2명)
        funeral: 5000000, // 장례비
      },
      taxableAmount: 195000000,
      tax: 16000000,
      effectiveRate: 1.6,
    },
    scenario2: {
      name: '고액 상속 (배우자, 자녀 2명)',
      totalAssets: 5000000000, // 50억원
      deductions: {
        basic: 200000000,
        spouse: 1500000000, // 실제 상속분의 30% 가정
        children: 100000000,
        funeral: 5000000,
      },
      taxableAmount: 3195000000,
      tax: 1118500000,
      effectiveRate: 22.4,
    },
  },
  gift: {
    scenario1: {
      name: '배우자간 부동산 증여',
      giftAmount: 500000000, // 5억원
      deduction: 600000000, // 배우자 공제
      taxableAmount: 0,
      tax: 0,
      effectiveRate: 0,
    },
    scenario2: {
      name: '자녀에게 현금 증여',
      giftAmount: 200000000, // 2억원
      deduction: 50000000, // 자녀 공제
      taxableAmount: 150000000,
      tax: 24000000,
      effectiveRate: 12.0,
    },
  },
};

const InheritanceGiftTaxPage = () => {
  const [selectedTab, setSelectedTab] = React.useState('inheritance');
  const [selectedStrategy, setSelectedStrategy] = React.useState(0);
  const [selectedQuestion, setSelectedQuestion] = React.useState(0);

  // 검색엔진 최적화 구조화 데이터 추가
  const faqItems = frequentQuestions.map(q => ({
    question: q.question,
    answer: q.answer,
  }));
  const faqData = generateStructuredData('FAQPage', faqItems);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <StructuredData data={faqData} />
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <Badge
              variant="outline"
              size="lg"
              className="mb-6"
              animation="fade"
            >
              <Receipt className="h-3 w-3 mr-1" />
              국세청 공식 자료 기반
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-slide-up">
              상속·증여세 완벽 가이드
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              국세청 세금상식 Q&A를 바탕으로 한
              <span className="block mt-2 text-primary font-semibold">
                상속·증여세의 모든 것
              </span>
            </p>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="bg-card text-card-foreground border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">
                    최고 세율
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                    50%
                  </div>
                  <div className="text-sm text-card-foreground/80">
                    30억원 초과 시
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">
                    기초공제
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    2억원
                  </div>
                  <div className="text-sm text-card-foreground/80">
                    상속세 기본
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">
                    신고기한
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    6개월
                  </div>
                  <div className="text-sm text-card-foreground/80">
                    상속 개시일로부터
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">
                    분납기간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    최대5년
                  </div>
                  <div className="text-sm text-card-foreground/80">
                    2천만원 초과 시
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 승계·증여 자가진단 */}
        <section className="py-12 px-4" id="self-check">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                승계·증여 자가진단
              </h2>
              <p className="text-lg text-muted-foreground">
                점수 기반으로 권장 플랜을 안내해 드립니다
              </p>
            </div>
            <SelfCheckSuccession />
          </div>
        </section>

        {/* 세율표 섹션 */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                상속·증여세율표
              </h2>
              <p className="text-xl text-card-foreground/80">
                2024년 현재 적용되는 세율 구간
              </p>
            </div>

            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full mb-8">
                <TabsTrigger value="inheritance">상속세</TabsTrigger>
                <TabsTrigger value="gift">증여세</TabsTrigger>
              </TabsList>

              <TabsContent value="inheritance">
                <Card className="bg-card text-card-foreground border border-border">
                  <CardHeader>
                    <CardTitle>상속세율표</CardTitle>
                    <CardDescription>
                      상속세 과세표준에 따른 세율 적용
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inheritanceTaxRates.map((rate, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex-1">
                            <div className="font-semibold">{rate.range}</div>
                            <div className="text-sm text-muted-foreground">
                              과세표준
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {rate.rate}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              세율
                            </div>
                          </div>
                          <div className="w-32">
                            <Progress value={rate.rate} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <Info className="h-4 w-4 inline mr-1" />
                        상속세는 초과누진세율이 적용되므로 구간별로 다른 세율이
                        적용됩니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gift">
                <Card className="bg-card text-card-foreground border border-border">
                  <CardHeader>
                    <CardTitle>증여세율표</CardTitle>
                    <CardDescription>
                      증여세 과세표준에 따른 세율 적용
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {giftTaxRates.map((rate, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex-1">
                            <div className="font-semibold">{rate.range}</div>
                            <div className="text-sm text-muted-foreground">
                              과세표준
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {rate.rate}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              세율
                            </div>
                          </div>
                          <div className="w-32">
                            <Progress value={rate.rate} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <Info className="h-4 w-4 inline mr-1" />
                        증여세는 상속세와 동일한 세율표를 적용합니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 공제 제도 섹션 */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                공제 제도
              </h2>
              <p className="text-xl text-card-foreground/80">
                상속·증여세 부담을 완화하는 각종 공제 제도
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 상속세 공제 */}
              <Card className="bg-card text-card-foreground border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Users className="h-5 w-5 text-primary dark:text-blue-400" />
                    상속세 공제
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(deductionLimits.inheritance).map(
                      ([key, item]) => (
                        <div
                          key={key}
                          className="border-l-4 border-primary dark:border-blue-400 pl-4"
                        >
                          <div className="font-semibold text-card-foreground">
                            {item.title}
                          </div>
                          <div className="text-2xl font-bold text-primary dark:text-blue-400 mb-1">
                            {item.amount > 0
                              ? `${(item.amount / 100000000).toFixed(1)}억원`
                              : '실비'}
                          </div>
                          <div className="text-sm text-card-foreground/80">
                            {item.description}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 증여세 공제 */}
              <Card className="bg-card text-card-foreground border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Heart className="h-5 w-5 text-red-500 dark:text-red-400" />
                    증여세 공제
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(deductionLimits.gift).map(([key, item]) => (
                      <div
                        key={key}
                        className="border-l-4 border-red-400 dark:border-red-400 pl-4"
                      >
                        <div className="font-semibold text-card-foreground">
                          {item.title}
                        </div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                          {(item.amount / 100000000).toFixed(1)}억원
                        </div>
                        <div className="text-sm text-card-foreground/80">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 신고 납부 일정 */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                신고·납부 일정
              </h2>
              <p className="text-xl text-card-foreground/80">
                놓치면 안되는 중요한 세무 일정
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200 dark:border-blue-800/30 bg-card text-card-foreground">
                <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Calendar className="h-5 w-5" />
                    상속세 일정
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {Object.entries(taxSchedule.inheritance).map(
                      ([key, value]) => (
                        <div key={key} className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-semibold capitalize text-card-foreground">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </div>
                            <div className="text-sm text-card-foreground/80">
                              {value}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800/30 bg-card text-card-foreground">
                <CardHeader className="bg-green-50 dark:bg-green-950/20">
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Calendar className="h-5 w-5" />
                    증여세 일정
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {Object.entries(taxSchedule.gift).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold capitalize text-card-foreground">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="text-sm text-card-foreground/80">
                            {value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 절세 전략 */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                주요 절세 전략
              </h2>
              <p className="text-xl text-card-foreground/80">
                합법적이고 효과적인 상속·증여세 절세 방법
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {taxStrategies.map((strategy, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 bg-card text-card-foreground border border-border ${
                    selectedStrategy === index
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-md dark:hover:shadow-white/5'
                  }`}
                  onClick={() => setSelectedStrategy(index)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <strategy.icon className="h-8 w-8 text-primary dark:text-blue-400" />
                      <div>
                        <CardTitle className="text-card-foreground">
                          {strategy.category}
                        </CardTitle>
                        <CardDescription className="text-card-foreground/80">
                          {strategy.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>효과성</span>
                          <span>{strategy.effectiveness}%</span>
                        </div>
                        <Progress
                          value={strategy.effectiveness}
                          className="h-2"
                        />
                      </div>
                      <Badge variant="outline">{strategy.difficulty}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* 선택된 전략 상세 정보 */}
            <Card className="border-primary dark:border-blue-400 bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  {taxStrategies[selectedStrategy] &&
                    React.createElement(taxStrategies[selectedStrategy]!.icon, {
                      className: 'h-6 w-6 text-primary dark:text-blue-400',
                    })}
                  {taxStrategies[selectedStrategy]?.category} 상세 전략
                </CardTitle>
                <CardDescription className="text-card-foreground/80">
                  권장 준비 기간: {taxStrategies[selectedStrategy]?.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {taxStrategies[selectedStrategy]?.strategies?.map(
                    (item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-card-foreground/90">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                자주 묻는 질문
              </h2>
              <p className="text-xl text-card-foreground/80">
                국세청 공식 Q&A 기반 핵심 질문과 답변
              </p>
            </div>

            <PremiumFAQ
              items={frequentQuestions.map(faq => ({
                question: faq.question,
                answer: (
                  <div className="space-y-4">
                    <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                      {faq.answer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                      >
                        {faq.category}
                      </Badge>
                      {faq.tags?.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ),
              }))}
            />
          </div>
        </section>

        {/* 계산 시뮬레이터 */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                세액 계산 시뮬레이터
              </h2>
              <p className="text-xl text-muted-foreground">
                실제 사례를 통한 상속·증여세 계산 예시
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 상속세 계산 */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">상속세 계산 사례</h3>
                {Object.entries(taxCalculator.inheritance).map(
                  ([key, scenario]) => (
                    <Card
                      key={key}
                      className="bg-card text-card-foreground border border-border"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {scenario.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>상속재산</span>
                            <span className="font-semibold">
                              {(scenario.totalAssets / 100000000).toFixed(0)}
                              억원
                            </span>
                          </div>
                          <div className="space-y-2 pl-4 border-l-2 border-muted">
                            {Object.entries(scenario.deductions).map(
                              ([deductionKey, amount]) => (
                                <div
                                  key={deductionKey}
                                  className="flex justify-between text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    {deductionKey === 'basic'
                                      ? '기초공제'
                                      : deductionKey === 'spouse'
                                        ? '배우자공제'
                                        : deductionKey === 'children'
                                          ? '자녀공제'
                                          : '장례비'}
                                  </span>
                                  <span>
                                    -{(amount / 100000000).toFixed(1)}억원
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>과세표준</span>
                            <span className="font-semibold">
                              {(scenario.taxableAmount / 100000000).toFixed(1)}
                              억원
                            </span>
                          </div>
                          <div className="flex justify-between font-bold text-lg text-red-600 dark:text-red-400">
                            <span>납부할 세액</span>
                            <span>
                              {(scenario.tax / 100000000).toFixed(2)}억원
                            </span>
                          </div>
                          <div className="text-center">
                            <Badge
                              variant="secondary"
                              className="bg-muted text-foreground border border-border"
                            >
                              실효세율 {scenario.effectiveRate.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>

              {/* 증여세 계산 */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">증여세 계산 사례</h3>
                {Object.entries(taxCalculator.gift).map(([key, scenario]) => (
                  <Card
                    key={key}
                    className="bg-card text-card-foreground border border-border"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>증여재산</span>
                          <span className="font-semibold">
                            {(scenario.giftAmount / 100000000).toFixed(1)}억원
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>증여공제</span>
                          <span>
                            -{(scenario.deduction / 100000000).toFixed(1)}억원
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>과세표준</span>
                          <span className="font-semibold">
                            {(scenario.taxableAmount / 100000000).toFixed(1)}
                            억원
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-red-600 dark:text-red-400">
                          <span>납부할 세액</span>
                          <span>
                            {(scenario.tax / 100000000).toFixed(2)}억원
                          </span>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant="secondary"
                            className="bg-muted text-foreground border border-border"
                          >
                            실효세율 {scenario.effectiveRate.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Premium Family Office Upgrade Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50/50 to-blue-50/50 dark:from-background dark:to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge
                variant="outline"
                className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50/80 to-amber-100/50 text-amber-800 shadow-lg backdrop-blur-sm"
              >
                <Crown className="h-4 w-4 mr-2" />
                Family Office Excellence
              </Badge>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                <span className="text-premium-gold">상속·증여세</span>를 넘어선{' '}
                <span className="text-premium-navy">패밀리오피스</span>
              </h3>

              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                개별 세무 전략에서{' '}
                <span className="font-bold text-premium-navy">
                  통합 자산관리 솔루션
                </span>
                으로 업그레이드하세요. 자산가와 성공한 기업가들이 선택한
                차별화된 패밀리오피스 서비스를 경험해보세요.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card text-card-foreground rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl mb-4 mx-auto">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-premium-navy">
                    가족 자산 통합관리
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    개인자산 30억원 이상 고액자산가를 위한 종합 자산관리 서비스
                  </p>
                </div>

                <div className="bg-card text-card-foreground rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl mb-4 mx-auto">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-premium-navy">
                    가업승계 Excellence
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    체계적인 승계 전략으로 상속세 50% 절감과 경영권 안정화
                  </p>
                </div>

                <div className="bg-card text-card-foreground rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl mb-4 mx-auto">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-premium-navy">
                    전용 전문가 팀
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    세무·법무·투자 전문가가 함께하는 원스톱 VIP 서비스
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/family-office-center"
                  className="inline-flex items-center justify-center px-8 py-4 bg-premium-navy text-white text-lg font-semibold rounded-2xl hover:shadow-premium-navy transition-all duration-300 hover:scale-105"
                >
                  <Crown className="h-6 w-6 mr-2" />
                  패밀리오피스 센터 보기
                  <ChevronRight className="h-6 w-6 ml-2" />
                </Link>

                <Link
                  href="/fp-center"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-premium-navy text-premium-navy text-lg font-semibold rounded-2xl hover:bg-premium-navy hover:text-white transition-all duration-300"
                >
                  <Users className="h-6 w-6 mr-2" />
                  전문 FP 상담
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-background dark:via-background dark:to-background">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-card text-card-foreground">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      상속·증여세 전문 상담을 받아보세요
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      복잡한 상속·증여세 제도, 전문가와 함께 최적의 절세 전략을
                      수립하세요
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CalComPopup
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                      buttonText="무료 세무 상담"
                      eventType="consultation"
                      trigger={
                        <div className="inline-flex items-center">
                          <Receipt className="h-5 w-5 mr-2" />
                          무료 세무 상담
                        </div>
                      }
                    />

                    <Link
                      href="/business-succession-strategy"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'lg' })
                      )}
                    >
                      <Crown className="h-5 w-5 mr-2" />
                      가업승계 전략
                    </Link>

                    <Link
                      href="/tax-strategy"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'lg' })
                      )}
                    >
                      <Calculator className="h-5 w-5 mr-2" />
                      절세 전략 보기
                    </Link>

                    <Button variant="outline" size="lg">
                      <Download className="h-5 w-5 mr-2" />
                      세무 가이드북 다운로드
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>긴급 상담: 0502-5550-8700</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InheritanceGiftTaxPage;
