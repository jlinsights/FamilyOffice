import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  DollarSign,
  FileText,
  Lightbulb,
  ShieldCheck,
  TrendingDown,
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
  actionSteps,
  articleStructuredData,
  case1Strategies,
  case2Strategies,
  faqStructuredData,
} from '@/constants/blog/inheritance-tax-reduction-case-study';

export const metadata: Metadata = generateMetadata(
  '상속세 40% 절감 사례 분석 | 실제 성공 사례로 보는 절세 전략',
  '제조업 CEO, IT 창업가의 실제 상속세 절감 사례! 60억→12억(80% 절감), 25억→8억(68% 절감) 달성 비법. 20년 경력 세무사가 분석하는 합법적 절세 전략. ☎0502-5550-8700',
  [
    '상속세 절감',
    '상속세 절세',
    '상속세 사례',
    '상속세 40% 절감',
    '상속세 절감 방법',
    '상속세 줄이는 방법',
    '가업승계 절세',
    '배우자 공제',
    '생전증여 전략',
    '가족법인 설립',
  ],
  '/blog/inheritance-tax-reduction-cover.jpg',
  '전문가급',
  '성숙기',
  'commercial',
  '/blog/inheritance-tax-reduction-case-study'
);

function StrategyList({ strategies }: { strategies: typeof case1Strategies }) {
  return (
    <div className="space-y-3">
      {strategies.map((strategy, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="font-semibold mb-2">{strategy.title}</div>
          <p className="text-sm text-muted-foreground mb-2">
            {strategy.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            {strategy.impact}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InheritanceTaxReductionCaseStudy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">
                <TrendingDown className="mr-1 h-3 w-3" />
                실제 절세 성공 사례
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                상속세 40% 절감 성공 사례
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                제조업 CEO와 IT 창업가의 실제 절세 전략
                <br />
                60억 → 12억(80% 절감), 25억 → 8억(68% 절감) 달성 비법
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  읽는 시간: 12분
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  실제 사례 기반
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  합법적 절세 전략
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Calculator CTA */}
        <section className="py-8 border-b bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Calculator className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                내 상속세는 얼마나 절감할 수 있을까?
              </h3>
              <p className="text-emerald-50 mb-6">
                3분 무료 계산으로 맞춤 절세 전략을 확인하세요
              </p>
              <Link
                href="/calculators/inheritance-tax"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'secondary' }),
                  'bg-white text-emerald-600 hover:bg-emerald-50'
                )}
              >
                <Calculator className="mr-2 h-5 w-5" />
                무료 상속세 계산하기
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p className="lead text-lg">
                &ldquo;상속세를 40% 이상 줄일 수 있다고?&rdquo; 많은 분들이
                의구심을 가지십니다. 하지만 <strong>실제로 가능</strong>합니다.
              </p>
              <p>
                본 글에서는 FamilyOffice S가 직접 컨설팅한 두 가지 실제 사례를
                통해 <strong>어떻게 상속세를 40-80%까지 절감</strong>할 수
                있었는지, 그 구체적인 전략과 실행 과정을 공개합니다.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-lg border border-amber-200 dark:border-amber-800 my-6">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  ⚠️ 중요 안내
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200 m-0">
                  아래 사례는 개인정보 보호를 위해 일부 내용을 각색했으나, 절세
                  전략과 결과는 실제 사례를 기반으로 합니다. 개별 상황에 따라
                  결과가 다를 수 있으므로 반드시 전문가 상담을 받으시기
                  바랍니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study 1: Manufacturing CEO */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-600">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2" variant="secondary">Case Study #1</Badge>
                      <CardTitle className="text-2xl">
                        제조업 CEO K씨 (60대, 자산 150억)
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        상속세 60억 → 12억으로 <strong>80% 절감</strong> 성공
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />초기 상황
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">총 자산</div>
                        <div className="text-2xl font-bold">150억원</div>
                        <div className="text-xs text-muted-foreground mt-1">제조회사 지분 120억, 부동산 30억</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">가족 구성</div>
                        <div className="text-2xl font-bold">배우자 + 자녀 2명</div>
                        <div className="text-xs text-muted-foreground mt-1">배우자 59세, 자녀 30대</div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-600 dark:text-red-400 font-semibold">예상 상속세 (사전 준비 없을 시)</span>
                      </div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400">약 60억원</div>
                      <div className="text-sm text-red-700 dark:text-red-300 mt-1">실효세율: 40% (자산의 40%를 세금으로 납부)</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />적용한 절세 전략
                    </h3>
                    <StrategyList strategies={case1Strategies} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-emerald-600" />절세 결과
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                        <div className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">예상 상속세</div>
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">12억원</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                        <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">절감액</div>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">48억원</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                        <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">절감률</div>
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">80%</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100 mb-2">핵심 성공 요인</div>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• <strong>조기 시작</strong>: 60대 초반부터 10년 계획 수립</li>
                          <li>• <strong>복합 전략</strong>: 증여+법인+공제 동시 활용</li>
                          <li>• <strong>전문가 협업</strong>: 세무사, 변호사, 회계사 팀 구성</li>
                          <li>• <strong>지속 관리</strong>: 매년 2회 정기 점검 및 조정</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mid-Article Calculator CTA */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border-2 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-8 text-center">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-2xl font-bold mb-2">당신의 상속세도 계산해보세요</h3>
                <p className="text-muted-foreground mb-6">
                  K씨처럼 체계적인 절세 전략을 수립하려면
                  <br />
                  먼저 현재 예상 상속세를 확인하세요
                </p>
                <Link href="/calculators/inheritance-tax" className={buttonVariants({ size: 'lg' })}>
                  <Calculator className="mr-2 h-5 w-5" />
                  3분 만에 무료 계산하기
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Case Study 2: IT Entrepreneur */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-600">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2" variant="secondary">Case Study #2</Badge>
                      <CardTitle className="text-2xl">
                        IT 창업가 P씨 (50대, 자산 80억)
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        상속세 25억 → 8억으로 <strong>68% 절감</strong> 성공
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />초기 상황
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">총 자산</div>
                        <div className="text-2xl font-bold">80억원</div>
                        <div className="text-xs text-muted-foreground mt-1">부동산 50억, 주식/현금 30억</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">가족 구성</div>
                        <div className="text-2xl font-bold">배우자 + 자녀 3명</div>
                        <div className="text-xs text-muted-foreground mt-1">배우자 52세, 자녀 10대-20대</div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-600 dark:text-red-400 font-semibold">예상 상속세 (사전 준비 없을 시)</span>
                      </div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400">약 25억원</div>
                      <div className="text-sm text-red-700 dark:text-red-300 mt-1">실효세율: 31.25% (자산의 1/3을 세금으로 납부)</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />적용한 절세 전략
                    </h3>
                    <StrategyList strategies={case2Strategies} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-emerald-600" />절세 결과
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                        <div className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">예상 상속세</div>
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">8억원</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                        <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">절감액</div>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">17억원</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                        <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">절감률</div>
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">68%</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-purple-900 dark:text-purple-100 mb-2">핵심 성공 요인</div>
                        <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                          <li>• <strong>50대 조기 시작</strong>: 20년 이상 장기 플랜 가능</li>
                          <li>• <strong>다양한 방법 조합</strong>: 증여+신탁+법인 병행</li>
                          <li>• <strong>부동산 특화</strong>: 부동산 비중 높은 점 활용</li>
                          <li>• <strong>2차 증여 준비</strong>: 2028년 추가 증여로 최종 90% 절감 목표</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison & Analysis */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">두 사례의 공통점과 차이점</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />공통 성공 요인
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {['5-10년 이상 장기 계획', '단일 전략이 아닌 복합 전략', '전문가 팀 구성', '정기적 모니터링', '배우자 공제 극대화'].map((text, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-1">✓</span>
                          <span><strong>{text.split('으로')[0]}</strong>{text.includes('으로') ? '으로' + text.split('으로')[1] : ''}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />주요 차이점
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {[
                        { label: '자산 규모', value: '150억 vs 80억' },
                        { label: '시작 시기', value: '60대 vs 50대 (10년 차이)' },
                        { label: '핵심 전략', value: '가업승계 vs 부동산 법인화' },
                        { label: '자산 구성', value: '회사 지분 중심 vs 부동산 중심' },
                        { label: '절감률', value: '80% vs 68%' },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">→</span>
                          <span><strong>{item.label}</strong>: {item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Action Steps */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="text-2xl">당신도 적용할 수 있는 5단계 절세 프로세스</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {actionSteps.map(item => (
                      <div
                        key={item.step}
                        className="flex items-start gap-4 p-4 bg-white dark:bg-background rounded-lg border"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold mb-1">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.action}</div>
                        </div>
                        {item.link && (
                          <Link
                            href={item.link}
                            className={buttonVariants({ size: 'sm', variant: 'outline' })}
                          >
                            시작하기 <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                당신의 상속세 절감 여정을 시작하세요
              </h2>
              <p className="text-xl text-emerald-50 mb-8">
                K씨와 P씨처럼 40-80% 상속세 절감이 가능합니다
                <br />
                지금 바로 무료 계산으로 시작하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculators/inheritance-tax"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'secondary' }),
                    'bg-white text-emerald-600 hover:bg-emerald-50'
                  )}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  무료 상속세 계산하기
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'border-white text-white hover:bg-white/10'
                  )}
                >
                  <Users className="mr-2 h-5 w-5" />
                  전문가 상담 신청
                </Link>
              </div>
              <p className="text-sm text-emerald-100 mt-6">
                ☎️ 0502-5550-8700 | 20년 경력 세무 전문가가 직접 상담합니다
              </p>
            </div>
          </div>
        </section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
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
