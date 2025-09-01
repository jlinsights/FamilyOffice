import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, ArrowRight, FileText, Users, Shield, Heart, Building, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CalComPopup } from '@/components/cal-com-popup';

export const metadata: Metadata = generateMetadata(
  '상속설계 전문 컨설팅 | 상속세 절세 및 가족자산 승계 전략',
  '상속세 50% 절감! 전문가가 설계하는 맞춤형 상속전략. 가족자산 안전한 승계, 상속분쟁 예방, 세대간 자산이전까지 원스톱 솔루션 ☎0502-5550-8700',
  [
    '상속설계',
    '상속세 절세',
    '상속 컨설팅',
    '상속 계획',
    '가족자산 승계',
    '상속분쟁 예방',
    '세대간 자산이전',
    '상속전략',
    '유언장 작성',
    '신탁설립',
    '상속포기',
    '유류분 대책',
    '증여 연계',
    '가업승계 상속',
    '부동산 상속',
    '해외자산 상속'
  ],
  undefined,
  '전문가급',
  '승계준비',
  'commercial'
);

export default function EstatePlanningPage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '상속설계는 언제부터 준비해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '상속설계는 가능한 한 빨리 시작하는 것이 좋습니다. 특히 50세 이후부터는 본격적인 계획을 수립해야 합니다. 생전에 미리 준비할수록 절세 효과가 크고, 가족 간 분쟁도 예방할 수 있으며, 다양한 절세 방법을 활용할 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '상속세는 얼마나 절약할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '체계적인 상속설계를 통해 30-50%의 상속세 절감이 가능합니다. 가업상속공제, 배우자공제, 자녀공제 등의 각종 공제제도와 증여 연계, 신탁 활용 등을 종합적으로 활용하면 실효세율을 대폭 낮출 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '상속분쟁을 예방하려면 어떻게 해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '명확한 유언장 작성, 생전증여를 통한 단계적 자산이전, 가족회의를 통한 사전 합의, 유류분 대책 마련이 핵심입니다. 또한 상속재산의 투명한 공개와 공정한 분배 원칙을 미리 정하고, 전문가의 조언을 받아 법적 분쟁 소지를 없애는 것이 중요합니다.'
        }
      }
    ]
  };

  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '체계적인 상속설계 6단계 프로세스',
    description: '가족자산을 안전하게 다음 세대로 승계하는 상속설계 가이드',
    totalTime: 'P1Y',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: '상담 후 결정'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: '자산 현황 파악',
        text: '전체 자산 정밀 조사, 부채 현황 확인, 상속세 추정'
      },
      {
        '@type': 'HowToStep',
        name: '상속 목표 설정',
        text: '가족 구성원별 분배 계획, 절세 목표, 승계 시기 결정'
      },
      {
        '@type': 'HowToStep',
        name: '절세 전략 수립',
        text: '각종 공제제도 활용, 증여 연계 전략, 신탁 검토'
      },
      {
        '@type': 'HowToStep',
        name: '법적 장치 마련',
        text: '유언장 작성, 가족 합의서, 유류분 대책 수립'
      },
      {
        '@type': 'HowToStep',
        name: '단계적 실행',
        text: '생전 증여 실행, 자산 정리, 세무 신고'
      },
      {
        '@type': 'HowToStep',
        name: '지속 관리',
        text: '정기 점검, 세법 변화 대응, 계획 수정'
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
              Estate Planning & Inheritance Strategy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              소중한 가족자산<br />안전하게 물려주세요
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              상속세 50% 절감, 상속분쟁 예방, 세대간 자산승계<br />
              전문가가 설계하는 맞춤형 상속전략으로 가족의 미래를 지키세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CalComPopup
                buttonText="무료 상속설계 상담"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                eventType="consultation"
              />
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">
                  <FileText className="mr-2 h-4 w-4" />
                  상속설계 가이드
                </Link>
              </Button>
            </div>
            <Alert className="max-w-2xl mx-auto">
              <Heart className="h-4 w-4" />
              <AlertTitle>가족을 위한 선택</AlertTitle>
              <AlertDescription>
                상속은 단순히 재산 이전이 아닙니다. 가족의 화합과 미래를 위한 
                중요한 준비입니다. 전문가와 함께 체계적으로 계획하세요.
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
                  <CardTitle className="text-4xl font-bold text-primary">50%</CardTitle>
                  <CardDescription>상속세 절감 효과</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    체계적 설계 시 평균
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">80%</CardTitle>
                  <CardDescription>분쟁 예방 성공률</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    사전 계획 수립 시
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">6개월</CardTitle>
                  <CardDescription>평균 설계 완료</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    맞춤형 상속전략 수립
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">1000+</CardTitle>
                  <CardDescription>상속설계 성공사례</CardDescription>
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
              <h2 className="text-3xl font-bold mb-4">전문 상속설계 서비스</h2>
              <p className="text-lg text-muted-foreground">
                가족의 특성과 자산 현황에 맞춘 맞춤형 상속전략
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>상속세 최적화</CardTitle>
                      <CardDescription>합법적 절세 전략 수립</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>가업상속공제 극대화</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>배우자 및 자녀 공제 활용</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>증여 연계 절세 전략</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>신탁 활용 절세 구조</span>
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
                      <CardTitle>상속분쟁 예방</CardTitle>
                      <CardDescription>가족 화합을 위한 사전 준비</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>명확한 유언장 작성</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>가족회의 및 사전 합의</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>유류분 대책 수립</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>투명한 재산 공개</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>자산별 맞춤 전략</CardTitle>
                      <CardDescription>자산 유형에 따른 최적화</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>부동산 상속 최적화</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>주식 및 금융자산 승계</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>해외자산 상속 대응</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>가업 및 사업자산 승계</span>
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
                      <CardTitle>법적 지원 서비스</CardTitle>
                      <CardDescription>전문가 동반 실무 지원</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>유언장 작성 및 공증</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>상속신고 대행</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>신탁 설립 지원</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>상속분쟁 조정 지원</span>
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
              상속설계 성공 사례
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">상속인 현황</h3>
                    <p className="text-muted-foreground text-sm">
                      • 제조업 대표 A씨<br />
                      • 총 상속재산: 200억원<br />
                      • 배우자, 자녀 3명<br />
                      • 기존 상속세: 80억원
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">적용 전략</h3>
                    <p className="text-muted-foreground text-sm">
                      • 가업상속공제 200억원<br />
                      • 배우자공제 30억원<br />
                      • 생전증여 10억원<br />
                      • 신탁 활용 20억원<br />
                      • 유언장 작성 완료
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">절세 결과</h3>
                    <p className="text-muted-foreground text-sm">
                      • 최종 상속세: 35억원<br />
                      • <span className="text-primary font-semibold">절세액: 45억원</span><br />
                      • <span className="text-primary font-semibold">절세율: 56%</span><br />
                      • 가족분쟁 방지 완료
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
              미루면 미룰수록 손해는 커집니다
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              상속은 예고 없이 찾아올 수 있습니다.<br />
              지금 준비하여 가족을 위한 최선의 선택을 하세요.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">안전한 절세</h3>
                  <p className="text-sm text-muted-foreground">
                    합법적이고 안전한 절세 전략
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">가족 화합</h3>
                  <p className="text-sm text-muted-foreground">
                    분쟁 예방으로 가족 관계 보호
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">자산 극대화</h3>
                  <p className="text-sm text-muted-foreground">
                    다음 세대가 받을 자산 극대화
                  </p>
                </CardContent>
              </Card>
            </div>
            <CalComPopup
              buttonText="무료 상속설계 상담 신청"
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg mb-6"
              eventType="consultation"
            />
            <p className="text-sm text-muted-foreground">
              ☎ 0502-5550-8700 | 평일 09:00-18:00 | 상속설계 전문가 직접 상담
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}