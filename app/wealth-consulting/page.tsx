import {
  Award,
  CheckCircle2,
  DollarSign,
  Shield,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { StructuredData } from '@/components/seo/structured-data';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '고액자산가 자산관리 전문 컨설팅 | 100억원 이상 VIP 전용 서비스',
  '고액자산가를 위한 프라이빗 뱅킹급 자산관리! 100억원 이상 자산 전문 관리, 글로벌 포트폴리오, 세무 최적화, 상속 설계. VIP 전용 1:1 맞춤 서비스 ☎0502-5550-8700',
  [
    '고액자산가',
    '고액자산가 자산관리',
    '부유층 자산관리',
    'VIP 자산관리',
    '프라이빗 뱅킹',
    '100억 자산관리',
    '글로벌 자산배분',
    '고액자산가 상속',
    '부유층 세무',
    '고액자산가 컨설팅',
    'UHNW 자산관리',
    '초고액자산가',
    '패밀리오피스',
    '자산가 맞춤관리',
    '고액자산 포트폴리오',
  ],
  undefined,
  '전문가급',
  '성숙기',
  'commercial',
  '/wealth-consulting'
);

export default function WealthConsultingPage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '고액자산가 자산관리의 최소 기준은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '일반적으로 100억원 이상의 자산을 보유하신 분들을 대상으로 합니다. 이는 전문적인 자산관리 서비스의 효과가 명확하게 나타나는 최소 규모이며, 글로벌 자산배분과 세무최적화의 실질적 효과를 기대할 수 있는 기준입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '일반 자산관리와 고액자산가 서비스의 차이점은?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '고액자산가 서비스는 1:1 전담 컨설턴트 배정, 글로벌 자산배분, 복합적 세무구조 설계, 상속 및 승계 통합 서비스, 24시간 VIP 지원 등이 제공됩니다. 또한 alternative investment, 해외부동산, 사모펀드 등 다양한 투자 옵션에 접근 가능합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '고액자산가 자산관리 수수료는 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '자산 규모와 서비스 범위에 따라 연 0.5~2% 수준입니다. 자산 규모가 클수록 수수료율은 낮아지며, 포괄적 서비스(세무, 상속, 투자자문 등) 이용 시 더욱 경제적입니다. 정확한 수수료는 자산 규모와 서비스 범위 확인 후 개별 산정됩니다.',
        },
      },
    ],
  };

  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '고액자산가 맞춤형 자산관리 5단계 프로세스',
    description: '100억원 이상 고액자산가를 위한 체계적 자산관리 가이드',
    totalTime: 'P1Y',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: '상담 후 결정',
    },
    step: [
      {
        '@type': 'HowToStep',
        name: '자산 현황 진단',
        text: '전체 자산 정밀 분석, 리스크 평가, 수익성 검토',
      },
      {
        '@type': 'HowToStep',
        name: '투자 목표 설정',
        text: '수익 목표, 리스크 허용도, 투자 기간 설정',
      },
      {
        '@type': 'HowToStep',
        name: '포트폴리오 구성',
        text: '글로벌 자산배분, 대체투자 포함, 분산투자 실행',
      },
      {
        '@type': 'HowToStep',
        name: '세무 최적화',
        text: '절세 구조 설계, 상속세 대비, 증여 전략 수립',
      },
      {
        '@type': 'HowToStep',
        name: '정기 모니터링',
        text: '월간 리포트, 분기 리밸런싱, 연간 전략 점검',
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
              High Net Worth Wealth Management
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              고액자산가를 위한
              <br />
              프라이빗 뱅킹급 자산관리
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              100억원 이상 자산가를 위한 VIP 전용 맞춤형 서비스
              <br />
              글로벌 자산배분부터 세무최적화까지 원스톱 솔루션
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CalComPopup
                buttonText="VIP 상담 신청"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                eventType="consultation"
              />
              <Link
                href="#services"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                서비스 상세보기
              </Link>
            </div>
            <Alert className="max-w-2xl mx-auto">
              <Shield className="h-4 w-4" />
              <AlertTitle>VIP 전용 서비스</AlertTitle>
              <AlertDescription>
                100억원 이상 자산가를 위한 1:1 전담 컨설턴트 배정 및 24시간 VIP
                지원 서비스를 제공합니다. 모든 상담과 거래는 100%
                비밀보장됩니다.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
                    30%
                  </CardTitle>
                  <CardDescription>세금 절감 효과</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    맞춤형 세무 구조 설계
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">
                    24/7
                  </CardTitle>
                  <CardDescription>VIP 전담 서비스</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    연중무휴 전담 지원
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">
                    100+
                  </CardTitle>
                  <CardDescription>VIP 고객</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    고액자산가 관리 실적
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
              <h2 className="text-3xl font-bold mb-4">VIP 전용 맞춤 서비스</h2>
              <p className="text-lg text-muted-foreground">
                고액자산가의 특별한 요구에 맞춘 프리미엄 서비스
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>글로벌 자산배분 전략</CardTitle>
                      <CardDescription>전 세계 시장 분산투자</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>선진국 및 신흥국 주식 포트폴리오</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>해외 부동산 및 대체투자</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>헤지펀드 및 사모펀드 접근</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>환률 헤지 및 리스크 관리</span>
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
                      <CardTitle>종합 세무 최적화</CardTitle>
                      <CardDescription>절세 구조 설계 및 관리</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>개인 및 법인 통합 세무 설계</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>상속 및 증여세 최적화</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>해외자산 세무 컨설팅</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>조세조약 활용 전략</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>패밀리 오피스 서비스</CardTitle>
                      <CardDescription>가족 자산 통합 관리</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>세대 간 자산 승계 설계</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>차세대 금융교육 프로그램</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>가족 거버넌스 구축</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>신탁 및 재단 설립 지원</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>VIP 전담 서비스</CardTitle>
                      <CardDescription>1:1 프리미엄 지원</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>전담 컨설턴트 배정</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>24시간 긴급 지원</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>월간 개인 리포트</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>VIP 라운지 이용권</span>
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
            <h2 className="text-3xl font-bold text-center mb-12">성공 사례</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">고객 현황</h3>
                    <p className="text-muted-foreground text-sm">
                      • 제조업 CEO D씨
                      <br />
                      • 자산 규모: 500억원
                      <br />
                      • 연령: 55세
                      <br />• 목표: 안정적 수익 + 상속 준비
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">맞춤 솔루션</h3>
                    <p className="text-muted-foreground text-sm">
                      • 글로벌 포트폴리오 40%
                      <br />
                      • 국내 우량주 30%
                      <br />
                      • 부동산 펀드 20%
                      <br />
                      • 현금성 자산 10%
                      <br />• 상속세 절세 구조 설계
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">성과</h3>
                    <p className="text-muted-foreground text-sm">
                      •{' '}
                      <span className="text-primary font-semibold">
                        연 15% 수익률
                      </span>{' '}
                      달성
                      <br />•{' '}
                      <span className="text-primary font-semibold">
                        세금 30% 절감
                      </span>
                      <br />
                      • 상속 구조 완성
                      <br />• 리스크 50% 감소
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
              VIP만을 위한 특별한 자산관리 서비스
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              100억원 이상 자산가를 위한 1:1 맞춤형 프리미엄 서비스
              <br />
              전담 컨설턴트와 함께 더 나은 자산관리의 경험을 시작하세요
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">맞춤형 포트폴리오</h3>
                  <p className="text-sm text-muted-foreground">
                    개별 자산 현황과 목표에 최적화된 투자 전략
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">절세 극대화</h3>
                  <p className="text-sm text-muted-foreground">
                    복합적 세무 구조로 세금 부담 최소화
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">VIP 전용 지원</h3>
                  <p className="text-sm text-muted-foreground">
                    24시간 전담 컨설턴트 및 우선 지원
                  </p>
                </CardContent>
              </Card>
            </div>
            <CalComPopup
              buttonText="VIP 상담 신청"
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg mb-6"
              eventType="consultation"
            />
            <p className="text-sm text-muted-foreground">
              ☎ 0502-5550-8700 | VIP 전용 라인 | 100% 비밀보장
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
