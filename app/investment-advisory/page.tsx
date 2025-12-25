import {
  BarChart3,
  CheckCircle2,
  Globe,
  PieChart,
  Shield,
  Star,
  Target,
  TrendingUp,
} from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/structured-data';

import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '투자자문 전문 서비스 | 개인 맞춤형 자산관리 및 투자전략',
  '연 15% 수익률 달성! 개인투자자를 위한 전문 투자자문. 포트폴리오 최적화, 리스크 관리, 글로벌 분산투자까지 1:1 맞춤 서비스 ☎0502-5550-8700',
  [
    '투자자문',
    '개인투자자문',
    '자산관리',
    '투자컨설팅',
    '포트폴리오 관리',
    '투자전략',
    '자산배분',
    '위험관리',
    '투자상담',
    '재정설계',
    '펀드추천',
    '주식투자',
    '채권투자',
    '대체투자',
    '글로벌투자',
    '은퇴설계',
  ],
  undefined,
  '전문가급',
  '성장기',
  'commercial',
  '/investment-advisory'
);

export default function InvestmentAdvisoryPage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '투자자문 서비스의 최소 투자금액은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '개인 투자자문 서비스는 1억원부터 시작합니다. 이는 분산투자 효과와 전문적인 포트폴리오 관리의 실질적 혜택을 누릴 수 있는 최소 규모입니다. 투자금액에 따라 더욱 세분화된 맞춤형 서비스를 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '투자자문 수수료는 어떻게 책정되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '자산 규모에 따라 연간 1.0~2.5% 수준입니다. 자산이 클수록 수수료율은 낮아지며, 성과연동 수수료 옵션도 제공합니다. 투자 성과가 벤치마크를 초과달성할 경우에만 추가 수수료가 발생하는 구조로 고객과 이해관계를 일치시킵니다.',
        },
      },
      {
        '@type': 'Question',
        name: '투자 성과는 어느 정도 기대할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '시장 상황과 투자성향에 따라 다르지만, 최근 5년간 평균 연 12-15%의 수익률을 달성했습니다. 안정형 포트폴리오는 연 8-10%, 성장형은 연 12-18% 수준을 목표로 합니다. 다만 투자에는 손실 위험이 따르므로 리스크 관리가 우선입니다.',
        },
      },
    ],
  };

  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '개인 맞춤형 투자자문 5단계 프로세스',
    description: '개인투자자를 위한 체계적인 투자자문 서비스 가이드',
    totalTime: 'P1Y',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: '상담 후 결정',
    },
    step: [
      {
        '@type': 'HowToStep',
        name: '투자 성향 분석',
        text: '위험 허용도, 투자 목표, 투자 기간 등 개인 특성 파악',
      },
      {
        '@type': 'HowToStep',
        name: '자산 현황 진단',
        text: '현재 보유 자산 분석, 포트폴리오 점검, 개선점 도출',
      },
      {
        '@type': 'HowToStep',
        name: '투자 전략 수립',
        text: '맞춤형 자산배분, 투자 상품 선정, 리밸런싱 계획',
      },
      {
        '@type': 'HowToStep',
        name: '포트폴리오 구성',
        text: '최적 자산배분 실행, 투자상품 매매, 리스크 관리',
      },
      {
        '@type': 'HowToStep',
        name: '지속 관리',
        text: '정기 성과 점검, 시장 변화 대응, 전략 조정',
      },
    ],
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
              Professional Investment Advisory
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              개인 맞춤형 투자자문으로
              <br />
              안정적인 자산 증식을 실현하세요
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              연 15% 수익률 달성, 리스크 최소화, 글로벌 분산투자
              <br />
              전문 투자자문가가 설계하는 개인 맞춤형 포트폴리오
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CalComPopup
                buttonText="무료 투자 상담"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                eventType="consultation"
              />
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  투자전략 살펴보기
                </Link>
              </Button>
            </div>
            <Alert className="max-w-2xl mx-auto">
              <Star className="h-4 w-4" />
              <AlertTitle>2025년 투자 전망</AlertTitle>
              <AlertDescription>
                글로벌 경제 회복과 한국 시장의 구조적 변화로 새로운 투자 기회가
                확대되고 있습니다. 지금이 포트폴리오 재구성의 최적 시기입니다.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">투자자문 성과</h2>
              <p className="text-lg text-muted-foreground">
                검증된 투자 전문성과 일관된 성과 창출
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">
                    15%
                  </CardTitle>
                  <CardDescription>연평균 수익률</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    최근 5년 평균 성과
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">
                    85%
                  </CardTitle>
                  <CardDescription>목표 달성률</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    고객 만족도 지표
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">
                    12%
                  </CardTitle>
                  <CardDescription>최대 손실 제한</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    리스크 관리 수준
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">
                    500+
                  </CardTitle>
                  <CardDescription>관리 고객 수</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    누적 서비스 경험
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
              <h2 className="text-3xl font-bold mb-4">전문 투자자문 서비스</h2>
              <p className="text-lg text-muted-foreground">
                개인의 투자 목표와 성향에 맞춘 맞춤형 투자 솔루션
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <PieChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>맞춤형 자산배분</CardTitle>
                      <CardDescription>
                        개인 특성 기반 포트폴리오
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>위험 성향별 자산배분</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>목표 수익률 달성 전략</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>투자 기간별 최적화</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>정기 리밸런싱 서비스</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>글로벌 분산투자</CardTitle>
                      <CardDescription>전 세계 시장 투자 기회</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>선진국 주식 시장</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>신흥국 성장 기회</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>글로벌 채권 투자</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>환율 위험 헤지</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>리스크 관리</CardTitle>
                      <CardDescription>체계적 위험 통제</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>손실 제한 전략</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>변동성 관리</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>포트폴리오 보험</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>스트레스 테스트</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>성과 분석 및 보고</CardTitle>
                      <CardDescription>투명한 성과 관리</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>월간 성과 리포트</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>벤치마크 비교 분석</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>세부 거래 내역</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>정기 전략 미팅</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Types */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                투자 상품별 전문 서비스
              </h2>
              <p className="text-lg text-muted-foreground">
                다양한 자산군에 대한 전문적인 투자 서비스 제공
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">주식 투자</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    국내외 우량주 중심의 성장주·가치주 투자
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• 개별 종목 분석</li>
                    <li>• 섹터별 분산투자</li>
                    <li>• ESG 투자</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">채권 투자</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    안정적 수익과 포트폴리오 안정성 확보
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• 국고채·회사채</li>
                    <li>• 하이일드 채권</li>
                    <li>• 통화 다변화</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">대체 투자</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    리츠, 원자재 등 대체투자 상품 활용
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• 부동산 투자</li>
                    <li>• 원자재 투자</li>
                    <li>• 헤지펀드</li>
                  </ul>
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
              투자자문 성공 사례
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">투자자 현황</h3>
                    <p className="text-muted-foreground text-sm">
                      • 직장인 B씨 (45세)
                      <br />
                      • 투자금액: 5억원
                      <br />
                      • 투자성향: 적극적
                      <br />• 목표수익률: 12%
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">투자 전략</h3>
                    <p className="text-muted-foreground text-sm">
                      • 국내 주식 40%
                      <br />
                      • 해외 주식 30%
                      <br />
                      • 채권 20%
                      <br />
                      • 대체투자 10%
                      <br />• 분기별 리밸런싱
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">투자 성과</h3>
                    <p className="text-muted-foreground text-sm">
                      •{' '}
                      <span className="text-primary font-semibold">
                        연 16.5% 수익률
                      </span>{' '}
                      달성
                      <br />
                      • 시장 대비 4.2% 초과
                      <br />
                      • 최대 손실 8.5% 제한
                      <br />• 목표 수익률 138% 달성
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
              전문가와 함께하는 성공 투자
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              혼자 하는 투자에서 벗어나 전문가의 도움을 받아보세요.
              <br />
              체계적인 투자 전략으로 더 나은 수익률을 실현할 수 있습니다.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">목표 달성</h3>
                  <p className="text-sm text-muted-foreground">
                    개인 목표에 맞는 투자 전략 수립
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">리스크 관리</h3>
                  <p className="text-sm text-muted-foreground">
                    체계적 위험 관리로 안전한 투자
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">지속 성장</h3>
                  <p className="text-sm text-muted-foreground">
                    장기적 관점의 자산 증식 전략
                  </p>
                </CardContent>
              </Card>
            </div>
            <CalComPopup
              buttonText="무료 투자 상담 신청"
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg mb-6"
              eventType="consultation"
            />
            <p className="text-sm text-muted-foreground">
              ☎ 0502-5550-8700 | 평일 09:00-18:00 | 투자자문 전문가 직접 상담
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
