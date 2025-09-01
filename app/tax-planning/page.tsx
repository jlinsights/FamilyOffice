import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, ArrowRight, Calculator, FileText, TrendingDown, Shield } from 'lucide-react';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CalComPopup } from '@/components/cal-com-popup';

export const metadata: Metadata = generateMetadata(
  '세무 최적화 전략 컨설팅 | 법인세 절세 및 절세 전문',
  '세무 전문가가 직접 설계하는 맞춤형 절세 전략! 법인세 40% 절감, 상증세 최적화, 개인사업자 법인전환까지. 세무조사 대응 포함 ☎0502-5550-8700',
  [
    '세무최적화',
    '법인세 절세',
    '세무 컨설팅',
    '절세 전략',
    '상속증여세',
    '개인사업자 법인전환',
    '세무조사 대응',
    '경정청구',
    '보험세무',
    '법인 세무회계',
    '세무 신고',
    '세금 줄이기',
    '세무 전문가',
    'CEO 세무',
    '중소기업 세무'
  ],
  undefined,
  '전문가급',
  '성숙기',
  'commercial'
);

export default function TaxPlanningPage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '개인사업자가 법인전환을 하면 세금을 얼마나 절약할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '연매출 5억원 이상의 개인사업자는 법인전환 시 평균 30-50%의 절세 효과를 볼 수 있습니다. 소득세율 38-45%에서 법인세율 22-25%로 낮아지며, 각종 공제혜택과 경비처리 확대로 추가 절세가 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '상속증여세를 미리 준비하면 얼마나 절세할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '사전 계획 수립 시 40-60% 절세가 가능합니다. 가업상속공제(최대 500억), 증여세 과세특례, 단계적 증여를 통한 누진세율 완화 등을 활용하면 대폭적인 세금 절감 효과를 얻을 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '세무조사를 받을 때 어떻게 대응해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '전문가와 함께 체계적으로 준비해야 합니다. 자료 정리, 합리적 근거 제시, 법적 대응 전략 수립이 핵심입니다. 사전 준비가 잘 되어 있으면 추징세액을 50% 이상 줄일 수 있으며, 가산세 감면도 가능합니다.'
        }
      }
    ]
  };

  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '기업 세무 최적화 6단계 프로세스',
    description: '중소중견기업을 위한 체계적인 세무최적화 실행 가이드',
    totalTime: 'P1Y',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: '상담 후 결정'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: '현황 진단',
        text: '세무 리스크 점검, 절세 포인트 발굴, 개선 방안 도출'
      },
      {
        '@type': 'HowToStep',
        name: '절세 전략 수립',
        text: '맞춤형 세무 구조 설계, 최적 타이밍 결정'
      },
      {
        '@type': 'HowToStep',
        name: '세무 구조 개편',
        text: '법인 설립, 사업 구조 조정, 계약 관계 정비'
      },
      {
        '@type': 'HowToStep',
        name: '절세 실행',
        text: '각종 공제 신청, 경비 최적화, 투자 세액공제 활용'
      },
      {
        '@type': 'HowToStep',
        name: '신고 및 관리',
        text: '정확한 세무 신고, 서류 관리, 조사 대비'
      },
      {
        '@type': 'HowToStep',
        name: '지속 모니터링',
        text: '세법 변화 대응, 추가 절세 기회 발굴, 정기 점검'
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
              Tax Optimization Strategy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              똑똑한 세무 최적화로<br />세금 부담을 줄이세요
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              법인세 40% 절감, 상증세 최적화, 개인사업자 법인전환<br />
              세무 전문가가 직접 설계하는 맞춤형 절세 전략
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CalComPopup
                buttonText="무료 세무 진단"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                eventType="consultation"
              />
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">
                  <Calculator className="mr-2 h-4 w-4" />
                  절세 시뮬레이션
                </Link>
              </Button>
            </div>
            <Alert className="max-w-2xl mx-auto">
              <TrendingDown className="h-4 w-4" />
              <AlertTitle>2025년 세법 개정 혜택</AlertTitle>
              <AlertDescription>
                중소기업 법인세율 인하, 투자세액공제 확대, 가업승계 특례 연장 등
                유리한 조건들이 많아졌습니다. 지금이 세무 최적화의 최적 시기입니다.
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
              <h2 className="text-3xl font-bold mb-4">세무 최적화 효과</h2>
              <p className="text-lg text-muted-foreground">
                전문적인 세무 설계로 이만큼 절약할 수 있습니다
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">40%</CardTitle>
                  <CardDescription>평균 절세율</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    체계적 세무 설계 시
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">2천만원</CardTitle>
                  <CardDescription>연간 절약 예시</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    연매출 5억 기준
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">3개월</CardTitle>
                  <CardDescription>최적화 완료</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    신속한 세무 구조 개편
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">500+</CardTitle>
                  <CardDescription>절세 성공 사례</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    검증된 전문성
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
              <h2 className="text-3xl font-bold mb-4">전문 세무 최적화 서비스</h2>
              <p className="text-lg text-muted-foreground">
                세무 전문가가 직접 설계하는 맞춤형 절세 솔루션
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>법인세 최적화</CardTitle>
                      <CardDescription>법인세 부담 대폭 절감</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>중소기업 특례 세율 적용</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>투자세액공제 극대화</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>경비 최적화 전략</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>법인 구조 최적화</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>개인사업자 법인전환</CardTitle>
                      <CardDescription>최적 시기 및 방법 설계</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>전환 시뮬레이션 분석</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>최적 전환 시기 결정</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>법인 설립 실무 지원</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>전환 후 세무 관리</span>
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
                      <CardTitle>상속증여세 최적화</CardTitle>
                      <CardDescription>사전 계획으로 세금 최소화</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>가업상속공제 활용</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>증여세 과세특례 적용</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>단계적 증여 전략</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>보험 활용 절세</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>세무조사 대응</CardTitle>
                      <CardDescription>전문가 동행 및 대응 전략</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>사전 준비 및 자료 정비</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>조사관 응대 및 동행</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>이의신청 및 심판 청구</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>경정청구 및 환급</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Case */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              절세 성공 사례
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">개선 전</h3>
                    <p className="text-muted-foreground text-sm">
                      • 개인사업자 B씨<br />
                      • 연매출: 8억원<br />
                      • 소득세율: 42%<br />
                      • 연간 세금: 1억 2천만원
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">최적화 방안</h3>
                    <p className="text-muted-foreground text-sm">
                      • 법인 설립 및 전환<br />
                      • 사업 구조 분리<br />
                      • 경비 최적화<br />
                      • 투자세액공제 활용<br />
                      • 임원 보수 조정
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">개선 후</h3>
                    <p className="text-muted-foreground text-sm">
                      • 법인세율: 22%<br />
                      • 연간 세금: 7천만원<br />
                      • <span className="text-primary font-semibold">절세액: 5천만원</span><br />
                      • <span className="text-primary font-semibold">절세율: 42%</span>
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
              세금, 더 이상 많이 낼 이유가 없습니다
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              매년 미루면 손해는 누적됩니다.<br />
              지금 시작하여 앞으로 10년간 절약할 세금을 계산해보세요.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">무료 세무 진단</h3>
                  <p className="text-sm text-muted-foreground">
                    현재 세무 구조 분석 및 절세 포인트 발굴
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <TrendingDown className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">절세 시뮬레이션</h3>
                  <p className="text-sm text-muted-foreground">
                    최적화 후 예상 절세액 계산
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">안전한 절세</h3>
                  <p className="text-sm text-muted-foreground">
                    세무조사 리스크 최소화
                  </p>
                </CardContent>
              </Card>
            </div>
            <CalComPopup
              buttonText="무료 세무 진단 신청"
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg mb-6"
              eventType="consultation"
            />
            <p className="text-sm text-muted-foreground">
              ☎ 0502-5550-8700 | 평일 09:00-18:00 | 세무 전문가 직접 상담
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}