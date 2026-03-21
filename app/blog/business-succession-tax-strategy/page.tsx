import {
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  FileText,
  Lightbulb,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';
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
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { generateMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';
import {
  caseStudyStrategies,
  checklistSections,
  commonMistakes,
  faqStructuredData,
  roadmapSteps,
} from '@/constants/blog/business-succession-tax-strategy';

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
              <Link
                href="/calculators/inheritance-tax"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'secondary' }),
                  'bg-white text-blue-600 hover:bg-blue-50'
                )}
              >
                <Calculator className="mr-2 h-5 w-5" />
                무료 계산 시작하기
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p className="lead text-lg">
                <strong>가업승계</strong>는 단순히 사업을 물려주는 것이
                아닙니다. 세금 부담 없이 기업의 지속가능성을 확보하고, 창업주가
                평생 일군 가치를 다음 세대에 온전히 전달하는 것입니다.
              </p>
              <p>
                그러나 현실은 녹록지 않습니다. 한국의{' '}
                <strong>최고 상속세율 50%</strong> (최대주주 할증 시 60%)는 OECD
                최고 수준으로, 사전 준비 없이는{' '}
                <strong>기업 가치의 절반 이상</strong>을 세금으로 납부해야 할 수
                있습니다.
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
                      준비 없이 상속 시 기업 가치의{' '}
                      <strong>40-60%를 세금</strong>으로 납부. 자금난으로 경영권
                      상실 위험.
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
                      10년 단위 증여, 요건 충족 기간 등{' '}
                      <strong>최소 5-10년</strong> 소요. 급하게 준비하면 선택지
                      제한.
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
                      <strong>원활한 경영권 이전</strong>과 조직 안정으로 기업
                      가치 유지. 고용 유지로 사회적 책임 이행.
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
                        <div className="text-sm text-muted-foreground">기본 공제</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">200억원</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">업력 30년 이상</div>
                        <div className="text-sm text-muted-foreground">장기 경영 인정</div>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">+100억원</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">고용 유지 요건 충족</div>
                        <div className="text-sm text-muted-foreground">7년간 평균 고용 100% 유지</div>
                      </div>
                      <div className="text-2xl font-bold text-emerald-600">+300억원</div>
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
                    {checklistSections.map((section, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="font-semibold mb-2 text-blue-600">
                          {section.category}
                        </div>
                        <ul className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm flex items-start gap-2">
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
                {roadmapSteps.map((step, index) => (
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
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                          <CardDescription className="mt-1">{step.year}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                      {step.action && (
                        <Link
                          href={step.action.href}
                          className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                        >
                          <Calculator className="mr-2 h-4 w-4" />
                          {step.action.text}
                        </Link>
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
              <h2 className="text-3xl font-bold mb-8 text-center">실제 적용 사례</h2>
              <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                  <CardTitle className="text-2xl">
                    제조업 M사 (업력 35년, 기업 가치 200억)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-sm text-red-700 dark:text-red-300 mb-1">준비 없이 상속 시</div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">상속세 약 70억</div>
                      <div className="text-xs text-red-600 dark:text-red-400">세율 35% 적용</div>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">전략 적용 후</div>
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">상속세 약 5억</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">93% 절감 (65억 절약)</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold mb-2">적용 전략</div>
                      <div className="space-y-2">
                        {caseStudyStrategies.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
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
                          <strong>핵심 포인트</strong>: 65세부터 7년간
                          체계적으로 준비. 후계자 2년 근무 요건, 10년 단위 증여,
                          가업상속공제 요건을 모두 충족하여 최대 절세 효과 달성.
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
                <h3 className="text-2xl font-bold mb-2">우리 회사 상속세 미리 계산하기</h3>
                <p className="text-muted-foreground mb-6">
                  현재 기업 가치로 예상 상속세를 확인하고
                  <br />
                  맞춤형 절세 로드맵을 받아보세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/calculators/inheritance-tax" className={buttonVariants({ size: 'lg' })}>
                    <Calculator className="mr-2 h-5 w-5" />
                    무료 상속세 계산하기
                  </Link>
                  <Link href="/contact" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
                    <Users className="mr-2 h-5 w-5" />
                    가업승계 전문가 상담
                  </Link>
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
                {commonMistakes.map((item, index) => (
                  <Card key={index} className="border-l-4 border-l-red-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600 dark:text-red-400">
                        실수 #{index + 1}: {item.mistake}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold mb-1">결과</div>
                        <p className="text-sm text-muted-foreground">{item.consequence}</p>
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-1 text-emerald-600">해결책</div>
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
                <Link
                  href="/calculators/inheritance-tax"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'secondary' }),
                    'bg-white text-blue-600 hover:bg-blue-50'
                  )}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  상속세 무료 계산
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'border-white text-white hover:bg-white/10'
                  )}
                >
                  <Users className="mr-2 h-5 w-5" />
                  가업승계 전문가 상담
                </Link>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </main>
      <Footer />
      <CalComPopup />
    </>
  );
}
