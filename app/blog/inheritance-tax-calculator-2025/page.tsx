import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  DollarSign,
  FileText,
  Shield,
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
  calculationSteps,
  faqStructuredData,
  relatedServices,
} from '@/constants/blog/inheritance-tax-calculator-2025';

export const metadata: Metadata = generateMetadata(
  '2025년 상속세 계산기 사용법 완벽 가이드 | 절세 전략',
  '2025년 최신 상속세율과 공제한도로 계산하는 방법! 상속세 계산기 사용법부터 절세 전략까지 세무사가 직접 알려드립니다. 무료 계산기 제공 ☎0502-5550-8700',
  [
    '상속세 계산기',
    '상속세 계산기 2025',
    '상속세 계산 방법',
    '상속세율',
    '상속세 공제',
    '상속세 절세',
    '2025 상속세',
    '상속세 시뮬레이션',
    '상속재산 계산',
    '상속공제 한도',
  ],
  '/blog/inheritance-tax-calculator-cover.jpg',
  '전문가급',
  '성숙기',
  'informational',
  '/blog/inheritance-tax-calculator-2025'
);

const serviceIconMap = { Shield, Users, DollarSign } as const;

export default function InheritanceTaxCalculator2025Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-emerald-950/20 dark:via-background dark:to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">
                <Calculator className="mr-1 h-3 w-3" />
                2025년 최신 개정안 반영
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                2025년 상속세 계산기 사용법 완벽 가이드
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                20년 경력 세무사가 알려주는 상속세 계산 방법과 절세 전략
                <br />
                복잡한 상속세, 이제 쉽게 계산하세요
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  읽는 시간: 10분
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  2025년 세법 반영
                </div>
                <div className="flex items-center">
                  <Calculator className="mr-2 h-4 w-4" />
                  무료 계산기 제공
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick CTA - Calculator */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-0">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    무료 상속세 계산기로 바로 계산해보세요
                  </h3>
                  <p className="text-emerald-50">
                    2025년 최신 세율 자동 적용, 3분이면 결과 확인
                  </p>
                </div>
                <Link
                  href="/calculators/inheritance-tax"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'secondary' }),
                    'whitespace-nowrap'
                  )}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  무료 계산 시작
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p className="lead text-lg">
                <strong>상속세</strong>는 피상속인(사망자)으로부터 재산을
                물려받을 때 발생하는 세금으로, 대한민국 세법상 최고 50%(최대주주
                할증 시 60%)에 달하는 높은 세율 때문에 사전 준비가 필수적입니다.
              </p>
              <p>
                2025년 현재, 많은 분들이 <strong>상속세 계산기</strong>를 찾고
                계시지만 단순히 계산만 하는 것보다 <strong>절세 전략</strong>을
                함께 수립하는 것이 훨씬 중요합니다.
              </p>
              <p>
                본 가이드에서는 상속세 계산 원리부터 실제 계산 방법, 그리고
                합법적인 절세 전략까지 모두 알려드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Section 1: 2025년 상속세율 */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <TrendingDown className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">
                        2025년 상속세율 및 세액공제
                      </CardTitle>
                      <CardDescription className="mt-2">
                        최신 세법 기준 완벽 정리
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <h4>상속세율 (2025년 기준)</h4>
                  <div className="not-prose">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-3 text-left">과세표준</th>
                            <th className="border p-3 text-left">세율</th>
                            <th className="border p-3 text-left">누진공제</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">1억원 이하</td>
                            <td className="border p-3 font-semibold">10%</td>
                            <td className="border p-3">-</td>
                          </tr>
                          <tr>
                            <td className="border p-3">5억원 이하</td>
                            <td className="border p-3 font-semibold">20%</td>
                            <td className="border p-3">1천만원</td>
                          </tr>
                          <tr>
                            <td className="border p-3">10억원 이하</td>
                            <td className="border p-3 font-semibold">30%</td>
                            <td className="border p-3">6천만원</td>
                          </tr>
                          <tr>
                            <td className="border p-3">30억원 이하</td>
                            <td className="border p-3 font-semibold">40%</td>
                            <td className="border p-3">1억 6천만원</td>
                          </tr>
                          <tr className="bg-red-50 dark:bg-red-950/30">
                            <td className="border p-3">30억원 초과</td>
                            <td className="border p-3 font-semibold text-red-600 dark:text-red-400">
                              50%
                            </td>
                            <td className="border p-3">4억 6천만원</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mt-4">
                    <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                      ⚠️ 최대주주 할증과세
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      상장법인 지분 비율이 일정 기준을 초과하면 상속세에 20%가
                      추가 과세됩니다. (최대 60% 세율 적용 가능)
                    </p>
                  </div>

                  <h4 className="mt-8">주요 공제 항목</h4>
                  <ul className="space-y-2">
                    <li>
                      <strong>기초공제</strong>: 2억원 (모든 상속에 기본 적용)
                    </li>
                    <li>
                      <strong>배우자공제</strong>: 최소 5억원 ~ 최대 30억원
                      <p className="text-sm text-muted-foreground mt-1">
                        배우자가 실제 상속받는 금액과 법정상속분 중 큰 금액 적용
                      </p>
                    </li>
                    <li>
                      <strong>자녀공제</strong>: 1인당 5,000만원
                      <p className="text-sm text-muted-foreground mt-1">
                        미성년자는 1년당 1,000만원 추가 (19세까지)
                      </p>
                    </li>
                    <li>
                      <strong>일괄공제</strong>: 5억원 (기타 인적공제 대신 선택 가능)
                    </li>
                    <li>
                      <strong>가업상속공제</strong>: 최대 600억원 (요건 충족 시)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 2: 계산 방법 */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">상속세 계산 5단계</CardTitle>
                      <CardDescription className="mt-2">
                        실제 계산 프로세스 따라하기
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <div className="space-y-6 not-prose">
                    {calculationSteps.map(item => (
                      <div key={item.step} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                          <p className="text-muted-foreground mb-2">{item.description}</p>
                          <div className="bg-muted p-3 rounded font-mono text-sm">
                            {item.formula}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-6">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      💡 계산 예시
                    </p>
                    <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <p>총 상속재산: 20억원</p>
                      <p>채무: 2억원</p>
                      <p>배우자공제: 10억원, 기초공제: 2억원</p>
                      <p className="font-semibold pt-2">→ 과세표준: 6억원</p>
                      <p className="font-semibold">
                        → 상속세: 약 1억 2천만원 (20% 세율 적용)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA for Calculator */}
              <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border-2 border-emerald-200 dark:border-emerald-800">
                <CardContent className="p-8 text-center">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-emerald-600" />
                  <h3 className="text-2xl font-bold mb-2">직접 계산해보세요</h3>
                  <p className="text-muted-foreground mb-6">
                    3분이면 내 상속세를 무료로 계산할 수 있습니다
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/calculators/inheritance-tax"
                      className={cn(
                        buttonVariants({ size: 'lg', variant: 'secondary' }),
                        'bg-white text-blue-600 hover:bg-blue-50'
                      )}
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      2025년 기준 무료 계산하기
                    </Link>
                    <Link
                      href="/contact"
                      className={cn(
                        buttonVariants({ size: 'lg', variant: 'outline' }),
                        'border-white text-white hover:bg-white/10 whitespace-nowrap'
                      )}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      전문가 상담
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                자주 묻는 질문
              </h2>
              <div className="space-y-4">
                {faqStructuredData.mainEntity.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{faq.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {faq.acceptedAnswer.text}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 border-t bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">관련 서비스</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((service, index) => {
                const ServiceIcon = serviceIconMap[service.iconName];
                return (
                  <Card key={index}>
                    <CardHeader>
                      <ServiceIcon className={`h-10 w-10 ${service.iconColor} mb-2`} />
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <Link
                        href={service.href}
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                          'w-full'
                        )}
                      >
                        자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
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
