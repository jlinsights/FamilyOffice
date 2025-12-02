import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/structured-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMetadata } from '@/lib/seo/metadata';
import { BarChart3, CheckCircle2, Globe, PieChart, Shield, Target, TrendingUp, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata(
  '자산분산 전문 컨설팅 | 포트폴리오 최적화 및 리스크 관리',
  '자산분산으로 리스크는 줄이고 수익은 늘리세요! 글로벌 분산투자, 자산군별 최적배분, 변동성 최소화 전략. 전문가 설계 맞춤 포트폴리오 ☎0502-5550-8700',
  [
    '자산분산',
    '포트폴리오 분산',
    '분산투자',
    '자산배분',
    '리스크 분산',
    '투자 다각화',
    '글로벌 분산투자',
    '자산군 분산',
    '포트폴리오 최적화',
    '변동성 관리',
    '상관관계 분석',
    '리밸런싱',
    '헤지 전략',
    '대체투자',
    '안전자산 배분',
    '수익률 안정화'
  ],
  undefined,
  '전문가급',
  '성숙기',
  'commercial'
);

export default function AssetDiversificationPage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '자산분산이 왜 중요한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '자산분산은 "계란을 한 바구니에 담지 말라"는 투자 원칙의 핵심입니다. 서로 다른 수익률과 위험도를 가진 자산에 분산투자하면 전체 포트폴리오의 리스크를 줄이면서도 안정적인 수익을 얻을 수 있습니다. 특히 경제 위기 시에도 손실을 최소화할 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '효과적인 자산분산을 위해서는 어떻게 해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '지역별(국내, 선진국, 신흥국), 자산군별(주식, 채권, 부동산, 원자재), 섹터별(IT, 바이오, 금융 등), 통화별로 분산하는 것이 중요합니다. 또한 각 자산 간 상관관계를 분석하여 서로 다른 움직임을 보이는 자산을 조합해야 분산 효과를 극대화할 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '자산분산으로 얼마나 리스크를 줄일 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '적절한 자산분산을 통해 포트폴리오의 변동성을 30-50% 줄일 수 있습니다. 예를 들어 주식 단일 투자 시 20% 변동성이 있다면, 주식-채권-부동산-원자재로 분산 시 10-14% 수준으로 변동성을 낮추면서도 비슷하거나 더 나은 수익률을 달성할 수 있습니다.'
        }
      }
    ]
  };

  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '체계적 자산분산 5단계 프로세스',
    description: '리스크를 최소화하고 수익을 최적화하는 자산분산 전략 수립 가이드',
    totalTime: 'P6M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: '상담 후 결정'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: '현재 포트폴리오 분석',
        text: '기존 자산 구성, 집중도 위험, 상관관계 분석'
      },
      {
        '@type': 'HowToStep',
        name: '투자 목표 설정',
        text: '수익률 목표, 리스크 허용도, 투자 기간 결정'
      },
      {
        '@type': 'HowToStep',
        name: '최적 자산배분',
        text: '지역별, 자산군별, 섹터별 최적 비중 결정'
      },
      {
        '@type': 'HowToStep',
        name: '분산 포트폴리오 구성',
        text: '선정된 자산배분에 따른 실제 투자 실행'
      },
      {
        '@type': 'HowToStep',
        name: '모니터링 및 리밸런싱',
        text: '정기 점검, 비중 조정, 신규 기회 반영'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StructuredData data={faqData} />
      <StructuredData data={howToData} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Strategic Asset Diversification
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              똑똑한 자산분산으로<br />리스크는 줄이고 수익은 늘리세요
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              변동성 50% 감소, 수익률 안정화, 글로벌 분산투자<br />
              전문가가 설계하는 최적 자산배분 전략
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CalComPopup
                buttonText="무료 포트폴리오 진단"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                eventType="consultation"
              />
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">
                  <PieChart className="mr-2 h-4 w-4" />
                  분산전략 살펴보기
                </Link>
              </Button>
            </div>
            <Alert className="max-w-2xl mx-auto">
              <Zap className="h-4 w-4" />
              <AlertTitle>분산투자의 힘</AlertTitle>
              <AlertDescription>
                2008년 금융위기, 2020년 코로나19 등 경제 충격 시에도 
                분산투자 포트폴리오는 단일 자산 대비 30-50% 적은 손실을 기록했습니다.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">자산분산 효과</h2>
              <p className="text-lg text-muted-foreground">
                체계적인 자산분산으로 달성 가능한 구체적 효과
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">50%</CardTitle>
                  <CardDescription>변동성 감소</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    적절한 분산투자 시
                  </p>
                </CardContent>
              </Card>
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">12%</CardTitle>
                  <CardDescription>연평균 안정 수익률</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    분산 포트폴리오 기준
                  </p>
                </CardContent>
              </Card>
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">-15%</CardTitle>
                  <CardDescription>최대 손실 제한</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    위기 상황 대비
                  </p>
                </CardContent>
              </Card>
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">80%</CardTitle>
                  <CardDescription>목표 달성률</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    계획 대비 성과
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">자산분산 전문 서비스</h2>
              <p className="text-lg text-muted-foreground">
                과학적 분석에 기반한 최적 자산배분 솔루션
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="dark:bg-slate-800 dark:border-slate-700 transition-colors hover:bg-muted/50 dark:hover:bg-slate-700/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>글로벌 지역별 분산</CardTitle>
                      <CardDescription>전 세계 시장 분산투자</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>한국 시장 30-40%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>선진국 시장 40-50%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>신흥국 시장 10-20%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>환율 위험 헤지</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="dark:bg-slate-800 dark:border-slate-700 transition-colors hover:bg-muted/50 dark:hover:bg-slate-700/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <PieChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>자산군별 분산</CardTitle>
                      <CardDescription>다양한 자산 클래스 활용</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>주식 50-70%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>채권 20-30%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>부동산 5-15%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>대체투자 5-10%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="dark:bg-slate-800 dark:border-slate-700 transition-colors hover:bg-muted/50 dark:hover:bg-slate-700/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>섹터별 분산</CardTitle>
                      <CardDescription>산업군 리스크 분산</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>기술주 25-30%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>금융주 15-20%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>소비재주 15-20%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>기타 섹터 25-35%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="dark:bg-slate-800 dark:border-slate-700 transition-colors hover:bg-muted/50 dark:hover:bg-slate-700/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>리스크 관리 전략</CardTitle>
                      <CardDescription>체계적 위험 통제</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>상관관계 분석</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>변동성 모니터링</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>정기 리밸런싱</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>헤지 전략 활용</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Diversification Strategies */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">분산투자 전략별 특징</h2>
              <p className="text-lg text-muted-foreground">
                투자자 성향에 따른 맞춤형 분산 전략
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    안정형 분산전략
                  </CardTitle>
                  <CardDescription>위험 최소화 중심</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">채권</span>
                      <span className="text-sm font-semibold">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">주식</span>
                      <span className="text-sm font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">부동산</span>
                      <span className="text-sm font-semibold">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">현금성자산</span>
                      <span className="text-sm font-semibold">5%</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        목표수익률: 연 6-8%<br />
                        예상변동성: 8-12%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    균형형 분산전략
                  </CardTitle>
                  <CardDescription>수익과 안정성 균형</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">주식</span>
                      <span className="text-sm font-semibold">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">채권</span>
                      <span className="text-sm font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">부동산</span>
                      <span className="text-sm font-semibold">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">대체투자</span>
                      <span className="text-sm font-semibold">5%</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        목표수익률: 연 8-12%<br />
                        예상변동성: 12-16%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    성장형 분산전략
                  </CardTitle>
                  <CardDescription>수익 극대화 중심</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">주식</span>
                      <span className="text-sm font-semibold">70%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">채권</span>
                      <span className="text-sm font-semibold">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">부동산</span>
                      <span className="text-sm font-semibold">10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">대체투자</span>
                      <span className="text-sm font-semibold">5%</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        목표수익률: 연 12-18%<br />
                        예상변동성: 16-22%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Case */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              자산분산 성공 사례
            </h2>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">분산 전 포트폴리오</h3>
                    <p className="text-muted-foreground text-sm">
                      • 투자자 C씨 (50세)<br />
                      • 자산규모: 10억원<br />
                      • 기존: 국내 주식 80%<br />
                      • 변동성: 22%<br />
                      • 최대손실: -35%
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">분산 후 포트폴리오</h3>
                    <p className="text-muted-foreground text-sm">
                      • 국내 주식 40%<br />
                      • 해외 주식 30%<br />
                      • 채권 20%<br />
                      • 부동산 10%<br />
                      • 정기 리밸런싱
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">개선 효과</h3>
                    <p className="text-muted-foreground text-sm">
                      • <span className="text-primary font-semibold">변동성 45% 감소</span><br />
                      • <span className="text-primary font-semibold">수익률 15% 개선</span><br />
                      • 최대손실 -18% 제한<br />
                      • 안정적 수익 달성
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              더 안전하고 확실한 투자를 시작하세요
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              집중투자의 위험에서 벗어나 체계적인 분산투자로<br />
              안정적이면서도 성장하는 포트폴리오를 만들어보세요.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">리스크 최소화</h3>
                  <p className="text-sm text-muted-foreground">
                    변동성 50% 감소로 안전한 투자
                  </p>
                </CardContent>
              </Card>
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">수익률 안정화</h3>
                  <p className="text-sm text-muted-foreground">
                    지속적이고 예측 가능한 수익
                  </p>
                </CardContent>
              </Card>
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="pt-6">
                  <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">글로벌 기회</h3>
                  <p className="text-sm text-muted-foreground">
                    전 세계 시장의 성장 동력 활용
                  </p>
                </CardContent>
              </Card>
            </div>
            <CalComPopup
              buttonText="무료 포트폴리오 진단 신청"
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg mb-6"
              eventType="consultation"
            />
            <p className="text-sm text-muted-foreground">
              ☎ 0502-5550-8700 | 평일 09:00-18:00 | 자산분산 전문가 직접 상담
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}