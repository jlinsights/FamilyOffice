import type { Metadata } from 'next';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, ArrowRight, Calculator, FileText, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = generateMetadata(
  '가업승계 완벽 가이드 | 중소기업 CEO를 위한 단계별 전략',
  '가업승계 성공률 95% 달성! 세금 40% 절감, 경영권 안정화, 차세대 교육까지. 300개 기업 성공사례 기반 맞춤형 가업승계 로드맵. 무료 진단 서비스 제공 ☎0502-5550-8700',
  [
    '가업승계',
    '가업승계 방법',
    '가업승계 절차',
    '가업승계 상담',
    '가업승계 세금',
    '가업승계 절세',
    '중소기업 가업승계',
    '가업승계 성공사례',
    '가업승계 실패',
    '가업승계 준비',
    '2세 경영',
    '경영권 승계',
    '주식 증여',
    '상속세 절세',
    '증여세 절감',
  ],
  undefined,
  '전문가급',
  '승계준비',
  'commercial'
);

export default function BusinessSuccessionPage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '가업승계는 언제 시작해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '가업승계는 최소 5-10년 전부터 준비하는 것이 이상적입니다. 경영자가 50대 중반에 접어들면 본격적인 승계 계획을 수립하고, 단계적으로 실행해야 세금 부담을 최소화하고 안정적인 경영권 이전이 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '가업승계 시 발생하는 세금은 얼마나 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '상속세는 최대 50%, 증여세는 최대 50%까지 부과될 수 있습니다. 하지만 가업상속공제, 증여세 과세특례 등을 활용하면 실효세율을 10-20%대로 낮출 수 있으며, 체계적인 계획 수립 시 40% 이상의 절세가 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '가업승계 실패율이 높은 이유는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '준비 부족(35%), 세금 부담(25%), 가족 간 갈등(20%), 후계자 역량 부족(20%)이 주요 원인입니다. 체계적인 사전 준비와 전문가 컨설팅을 통해 이러한 위험을 크게 줄일 수 있습니다.'
        }
      }
    ]
  };

  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '성공적인 가업승계 7단계 프로세스',
    description: '중소기업 CEO를 위한 체계적인 가업승계 실행 가이드',
    totalTime: 'P5Y',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: '상담 후 결정'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: '현황 진단',
        text: '기업가치 평가, 지분구조 분석, 세무 리스크 점검'
      },
      {
        '@type': 'HowToStep',
        name: '후계자 선정',
        text: '역량 평가, 교육 계획 수립, 단계별 권한 이양'
      },
      {
        '@type': 'HowToStep',
        name: '세무 전략 수립',
        text: '절세 방안 설계, 증여 시기 결정, 공제 제도 활용'
      },
      {
        '@type': 'HowToStep',
        name: '지분 이전',
        text: '단계별 증여, 유상증자, 현물출자 등 최적 방법 실행'
      },
      {
        '@type': 'HowToStep',
        name: '경영권 안정화',
        text: '정관 개정, 의결권 제한, 황금주 발행 검토'
      },
      {
        '@type': 'HowToStep',
        name: '조직 안정화',
        text: '핵심인재 유지, 기업문화 계승, 이해관계자 소통'
      },
      {
        '@type': 'HowToStep',
        name: '사후 관리',
        text: '경영 성과 모니터링, 추가 지원, 위기 대응'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={faqData} />
      <StructuredData data={howToData} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Business Succession Planning
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              가업승계, 이제는 선택이 아닌 필수입니다
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              평생 일궈온 기업을 안전하게 다음 세대로<br />
              세금 걱정 없이, 갈등 없이, 성공적으로
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Calculator className="mr-2 h-4 w-4" />
                  무료 승계 진단
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#process">
                  <FileText className="mr-2 h-4 w-4" />
                  승계 가이드 다운로드
                </Link>
              </Button>
            </div>
            <Alert className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>2025년 세법 개정</AlertTitle>
              <AlertDescription>
                가업상속공제 한도 확대, 증여세 과세특례 연장 등 유리한 조건이 마련되었습니다.
                지금이 가업승계를 시작할 최적의 시기입니다.
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
                  <CardTitle className="text-4xl font-bold text-primary">70%</CardTitle>
                  <CardDescription>가업승계 실패율</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    준비 없는 승계의 위험성
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">40%</CardTitle>
                  <CardDescription>평균 절세율</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    전문 컨설팅 시 달성 가능
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">5-10년</CardTitle>
                  <CardDescription>최적 준비 기간</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    단계적 실행으로 리스크 최소화
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-4xl font-bold text-primary">300+</CardTitle>
                  <CardDescription>성공 사례</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    검증된 승계 전략
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">가업승계 7단계 프로세스</h2>
              <p className="text-lg text-muted-foreground">
                체계적인 단계별 접근으로 성공률을 극대화합니다
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">1</span>
                    </div>
                    <div>
                      <CardTitle>현황 진단 및 목표 설정</CardTitle>
                      <CardDescription>3-6개월</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>기업가치 정밀 평가</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>현재 지분구조 분석</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>세무 리스크 점검</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">2</span>
                    </div>
                    <div>
                      <CardTitle>후계자 선정 및 육성</CardTitle>
                      <CardDescription>1-2년</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>후계자 역량 평가</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>맞춤형 교육 프로그램</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>단계별 권한 위임</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">3</span>
                    </div>
                    <div>
                      <CardTitle>세무 전략 수립</CardTitle>
                      <CardDescription>6개월</CardDescription>
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
                      <span>최적 증여 시기 결정</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">4</span>
                    </div>
                    <div>
                      <CardTitle>지분 이전 실행</CardTitle>
                      <CardDescription>2-3년</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>단계별 증여 실행</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>유상증자/현물출자</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>신고 및 납부 대행</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  전체 프로세스 상담받기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Factors */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              가업승계 성공의 핵심 요소
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    가족 구성원 간 합의
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    승계 계획에 대한 가족 구성원 전체의 이해와 동의가 필수입니다. 
                    투명한 소통과 공정한 분배로 갈등을 예방하세요.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    기업가치 극대화
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    승계 전 기업가치를 높이면 상속세 부담은 줄이고 후계자의 
                    경영 기반은 강화됩니다. 사업 구조조정과 수익성 개선이 중요합니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    법적 안전장치 마련
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    정관 개정, 주주간 협약, 의결권 제한 등 경영권 방어 장치를 
                    사전에 마련하여 안정적인 경영 승계를 보장하세요.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              지금 시작하지 않으면 늦습니다
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              매년 미루면 세금 부담은 늘어나고 준비 시간은 줄어듭니다.<br />
              300개 기업의 성공 경험을 바탕으로 최적의 승계 전략을 제시합니다.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">무료 승계 진단</h3>
                  <p className="text-sm text-muted-foreground">
                    현재 상황 분석 및 개선 방안 제시
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">맞춤형 로드맵</h3>
                  <p className="text-sm text-muted-foreground">
                    기업별 특성에 맞는 단계별 실행 계획
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">세금 절감 보장</h3>
                  <p className="text-sm text-muted-foreground">
                    평균 40% 이상의 절세 효과
                  </p>
                </CardContent>
              </Card>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">
                무료 상담 신청하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              ☎ 0502-5550-8700 | 평일 09:00-18:00 | 100% 비밀 보장
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}