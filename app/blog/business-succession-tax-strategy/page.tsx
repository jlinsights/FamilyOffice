import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  FileText,
  Lightbulb,
  Scale,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '가업승계와 상속세 최적화 전략 2025 | 세금 70% 절감 로드맵',
  '가업승계 시 상속세를 70%까지 절감하는 방법! 가업상속공제 600억 활용, 지주회사 구조, 생전증여 타이밍까지. 20년 경력 전문가의 단계별 실행 가이드. ☎0502-5550-8700',
  [
    '가업승계',
    '가업상속공제',
    '가업승계 세금',
    '가업승계 절세',
    '지주회사 설립',
    '사업 승계 전략',
    '2세 경영',
    '가족기업 승계',
    '중소기업 승계',
    '가업승계 요건',
  ],
  '/blog/business-succession-cover.jpg',
  '전문가급',
  '성숙기',
  'informational',
  '/blog/business-succession-tax-strategy'
);

export default function BusinessSuccessionTaxStrategyPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '가업상속공제는 얼마까지 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '가업상속공제는 최대 600억원까지 가능합니다. 업력 10년 이상 30년 미만은 200억원, 30년 이상은 300억원, 추가로 고용유지 요건 충족 시 300억원이 추가되어 최대 600억원까지 공제받을 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '가업상속공제 요건은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1) 업력 10년 이상, 2) 피상속인 지분율 50%(상장기업 30%) 이상, 3) 중소·중견기업 요건(매출 3천억 미만), 4) 상속인 2년 이상 근무, 5) 상속 후 10년간 업종 유지 및 고용 유지 등의 요건을 충족해야 합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '가업승계는 언제부터 준비해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '최소 5-10년 전부터 준비하는 것이 이상적입니다. 10년 단위 생전증여, 가업상속공제 요건 충족, 지주회사 설립 등 각 단계마다 시간이 필요하므로 현 경영자가 60대 초반부터 시작하는 것을 권장합니다.',
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-background dark:to-indigo-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">
                <Building2 className="mr-1 h-3 w-3" />
                가업승계 완벽 가이드
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                가업승계와 상속세 최적화 전략
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                세금 부담 70% 줄이는 체계적 승계 로드맵
                <br />
                가업상속공제 600억 + 생전증여 + 지주회사 구조
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  읽는 시간: 15분
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  2025년 세법 기준
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  5-10년 장기 플랜
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Calculator CTA */}
        <section className="py-8 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Calculator className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                가업승계 시 예상 상속세 계산하기
              </h3>
              <p className="text-blue-50 mb-6">
                우리 회사 지분 가치로 상속세를 미리 계산해보세요
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Link href="/calculators/inheritance-tax">
                  <Calculator className="mr-2 h-5 w-5" />
                  무료 계산 시작하기
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p className="lead text-lg">
                <strong>가업승계</strong>는 단순히 사업을 물려주는 것이 아닙니다.
                세금 부담 없이 기업의 지속가능성을 확보하고, 창업주가 평생 일군
                가치를 다음 세대에 온전히 전달하는 것입니다.
              </p>
              <p>
                그러나 현실은 녹록지 않습니다. 한국의{' '}
                <strong>최고 상속세율 50%</strong> (최대주주 할증 시 60%)는 OECD
                최고 수준으로, 사전 준비 없이는 <strong>기업 가치의 절반 이상</strong>
                을 세금으로 납부해야 할 수 있습니다.
              </p>
              <p>
                본 가이드에서는 <strong>가업상속공제 600억원 활용법</strong>부터{' '}
                <strong>지주회사 구조 설계</strong>,{' '}
                <strong>생전증여 타이밍</strong>까지, 세금 부담을 최소화하는
                체계적인 가업승계 전략을 알려드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* Why Business Succession is Critical */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                왜 가업승계 준비가 중요한가?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-red-600 mb-2" />
                    <CardTitle>높은 세금 부담</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      준비 없이 상속 시 기업 가치의 <strong>40-60%를 세금</strong>으로
                      납부. 자금난으로 경영권 상실 위험.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Clock className="h-10 w-10 text-amber-600 mb-2" />
                    <CardTitle>장기 준비 필요</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      10년 단위 증여, 요건 충족 기간 등 <strong>최소 5-10년</strong>{' '}
                      소요. 급하게 준비하면 선택지 제한.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <TrendingUp className="h-10 w-10 text-emerald-600 mb-2" />
                    <CardTitle>기업 지속성</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>원활한 경영권 이전</strong>과 조직 안정으로 기업 가치
                      유지. 고용 유지로 사회적 책임 이행.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 가업상속공제 Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                가업상속공제: 최대 600억원 공제
              </h2>

              <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <CardTitle className="text-2xl">공제 한도</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">업력 10년 이상</div>
                        <div className="text-sm text-muted-foreground">
                          기본 공제
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        200억원
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">업력 30년 이상</div>
                        <div className="text-sm text-muted-foreground">
                          장기 경영 인정
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">
                        +100억원
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">고용 유지 요건 충족</div>
                        <div className="text-sm text-muted-foreground">
                          7년간 평균 고용 100% 유지
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-emerald-600">
                        +300억원
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">최대 공제 한도</div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                          600억원
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    가업상속공제 요건 체크리스트
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        category: '기업 요건',
                        items: [
                          '업력 10년 이상 (창업일 기준)',
                          '중소·중견기업 (매출액 3천억원 미만)',
                          '피상속인 지분율 50% 이상 (상장기업 30%)',
                          '피상속인 10년 이상 대표이사 재직',
                        ],
                      },
                      {
                        category: '상속인 요건',
                        items: [
                          '상속 개시 전 2년 이상 해당 기업 근무',
                          '상속일부터 2년 이내 대표이사 취임',
                          '18세 이상 (직계비속)',
                        ],
                      },
                      {
                        category: '사후 관리 요건',
                        items: [
                          '상속 후 10년간 업종 유지',
                          '상속 후 7년간 평균 고용 80% 이상 유지',
                          '상속 후 10년간 지분 50% 이상 보유',
                          '10년간 정규직 근로자로 근무',
                        ],
                      },
                    ].map((section, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="font-semibold mb-2 text-blue-600">
                          {section.category}
                        </div>
                        <ul className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-sm flex items-start gap-2"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 5-Step Strategy */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                가업승계 5단계 로드맵
              </h2>

              <div className="space-y-6">
                {[
                  {
                    phase: 'Phase 1',
                    year: '5-10년 전',
                    title: '현황 분석 및 전략 수립',
                    tasks: [
                      '기업 가치 평가 및 예상 상속세 계산',
                      '가업상속공제 요건 충족 여부 점검',
                      '5-10년 장기 로드맵 작성',
                      '전문가 팀 구성 (세무사, 변호사, 회계사)',
                    ],
                    action: {
                      text: '지금 상속세 계산하기',
                      href: '/calculators/inheritance-tax',
                    },
                  },
                  {
                    phase: 'Phase 2',
                    year: '3-7년 전',
                    title: '지주회사 구조 설계',
                    tasks: [
                      '지주회사 설립 및 사업회사 지분 이전',
                      '가족 구성원에게 지주회사 지분 증여',
                      '10년 단위 생전증여 1차 실행',
                      '후계자 대표이사 취임 (2년 요건 충족)',
                    ],
                    action: null,
                  },
                  {
                    phase: 'Phase 3',
                    year: '2-3년 전',
                    title: '가업상속공제 요건 완성',
                    tasks: [
                      '업력 10년 이상 충족 확인',
                      '피상속인 대표이사 10년 재직 확인',
                      '후계자 2년 근무 요건 완료',
                      '중소·중견기업 기준 충족 확인',
                    ],
                    action: null,
                  },
                  {
                    phase: 'Phase 4',
                    year: '상속 시점',
                    title: '최적 공제 조합 적용',
                    tasks: [
                      '가업상속공제 600억 적용',
                      '배우자공제 30억 최대 활용',
                      '기초공제 및 자녀공제 적용',
                      '상속세 신고 및 납부 (6개월)',
                    ],
                    action: null,
                  },
                  {
                    phase: 'Phase 5',
                    year: '상속 이후',
                    title: '사후 관리 10년',
                    tasks: [
                      '업종 유지 의무 (10년)',
                      '고용 유지 80% 이상 (7년)',
                      '지분 50% 이상 보유 (10년)',
                      '정규직 근로자 근무 (10년)',
                    ],
                    action: null,
                  },
                ].map((step, index) => (
                  <Card
                    key={index}
                    className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className="mb-2" variant="secondary">
                            {step.phase}
                          </Badge>
                          <CardTitle className="text-xl">
                            {step.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {step.year}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {step.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                      {step.action && (
                        <Button asChild variant="outline" className="w-full">
                          <Link href={step.action.href}>
                            <Calculator className="mr-2 h-4 w-4" />
                            {step.action.text}
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Example */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                실제 적용 사례
              </h2>

              <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                  <CardTitle className="text-2xl">
                    제조업 M사 (업력 35년, 기업 가치 200억)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-sm text-red-700 dark:text-red-300 mb-1">
                        준비 없이 상속 시
                      </div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                        상속세 약 70억
                      </div>
                      <div className="text-xs text-red-600 dark:text-red-400">
                        세율 35% 적용
                      </div>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">
                        전략 적용 후
                      </div>
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                        상속세 약 5억
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">
                        93% 절감 (65억 절약)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold mb-2">적용 전략</div>
                      <div className="space-y-2">
                        {[
                          '가업상속공제 300억 적용 (업력 30년 이상)',
                          '배우자공제 30억 최대 활용',
                          '생전증여 50억 실행 (2회 × 25억)',
                          '지주회사 구조로 미래 가치 상승분 분리',
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-amber-800 dark:text-amber-200">
                          <strong>핵심 포인트</strong>: 65세부터 7년간 체계적으로
                          준비. 후계자 2년 근무 요건, 10년 단위 증여, 가업상속공제
                          요건을 모두 충족하여 최대 절세 효과 달성.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Calculator CTA */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8 text-center">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold mb-2">
                  우리 회사 상속세 미리 계산하기
                </h3>
                <p className="text-muted-foreground mb-6">
                  현재 기업 가치로 예상 상속세를 확인하고
                  <br />
                  맞춤형 절세 로드맵을 받아보세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/calculators/inheritance-tax">
                      <Calculator className="mr-2 h-5 w-5" />
                      무료 상속세 계산하기
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">
                      <Users className="mr-2 h-5 w-5" />
                      가업승계 전문가 상담
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                가업승계 시 흔한 실수 5가지
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    mistake: '너무 늦게 시작',
                    consequence:
                      '10년 단위 증여 기회 상실, 요건 충족 기간 부족',
                    solution: '최소 5-10년 전부터 준비 시작',
                  },
                  {
                    mistake: '요건 미충족',
                    consequence:
                      '가업상속공제 600억 혜택 포기, 세금 폭탄',
                    solution: '전문가와 체크리스트 철저히 점검',
                  },
                  {
                    mistake: '사후 관리 소홀',
                    consequence:
                      '공제 취소 + 가산세, 수십억 추가 납부',
                    solution: '10년간 업종·고용·지분 유지 관리',
                  },
                  {
                    mistake: '단일 전략 의존',
                    consequence: '절세 효과 제한, 리스크 증가',
                    solution: '증여+공제+법인 복합 전략 활용',
                  },
                ].map((item, index) => (
                  <Card key={index} className="border-l-4 border-l-red-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600 dark:text-red-400">
                        실수 #{index + 1}: {item.mistake}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold mb-1">
                          결과
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.consequence}
                        </p>
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-1 text-emerald-600">
                          해결책
                        </div>
                        <p className="text-sm">{item.solution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                가업승계, 지금 시작하세요
              </h2>
              <p className="text-xl text-blue-50 mb-8">
                5-10년 체계적 준비로 세금 부담 70% 절감
                <br />
                기업의 지속가능성과 가족의 미래를 지키세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Link href="/calculators/inheritance-tax">
                    <Calculator className="mr-2 h-5 w-5" />
                    상속세 무료 계산
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link href="/contact">
                    <Users className="mr-2 h-5 w-5" />
                    가업승계 전문가 상담
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-blue-100">
                ☎️ 0502-5550-8700 | 20년 경력 가업승계 전문가 직접 상담
              </p>
            </div>
          </div>
        </section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
      <Footer />
      <CalComPopup />
    </>
  );
}
