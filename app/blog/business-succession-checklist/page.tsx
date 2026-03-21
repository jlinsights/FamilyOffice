import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  FileCheck,
  Shield,
  Timer,
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
  checklistPhases,
  faqStructuredData,
  relatedServices,
} from '@/constants/blog/business-succession-checklist';

export const metadata: Metadata = generateMetadata(
  '가업승계 체크리스트 PDF 다운로드 | 5-10년 준비 가이드',
  '가업승계 준비 완벽 체크리스트! 5-10년 단계별 준비 사항, 세금 절감 전략, 법적 절차까지. 세무사가 만든 무료 PDF 다운로드 ☎0502-5550-8700',
  [
    '가업승계 체크리스트',
    '가업승계 준비',
    '가업승계 절세',
    '가업승계 방법',
    '가업승계 계획',
    '기업 승계 체크리스트',
    '가업상속공제',
    '2세 경영 승계',
    '가족기업 승계',
    '중소기업 승계',
  ],
  '/blog/business-succession-checklist-cover.jpg',
  '전문가급',
  '성숙기',
  'informational',
  '/blog/business-succession-checklist'
);

const phaseIconMap = {
  0: Timer,
  1: Users,
  2: Shield,
  3: Building2,
  4: TrendingUp,
} as const;

const serviceIconMap = {
  Building2,
  Shield,
  Users,
} as const;

export default function BusinessSuccessionChecklistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">
                <FileCheck className="mr-1 h-3 w-3" />
                세무사 검증 완료
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                가업승계 체크리스트 완벽 가이드
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                5-10년 장기 계획이 필요한 가업승계, 단계별 준비사항을
                체크리스트로 정리했습니다
                <br />
                무료 PDF 다운로드 제공
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/contact"
                  className={buttonVariants({ size: 'lg' })}
                >
                  <Download className="mr-2 h-5 w-5" />
                  무료 체크리스트 받기
                </Link>
                <Link
                  href="/business-succession-strategy"
                  className={buttonVariants({ size: 'lg', variant: 'outline' })}
                >
                  전문가 상담 신청
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p className="lead text-lg">
                <strong>가업승계</strong>는 평생 일궈온 기업을 다음 세대에게
                안정적으로 물려주는 중요한 과정입니다. 하지만 준비 없이 진행하면
                높은 세금 부담과 경영 불안정으로 기업의 존립이 위협받을 수
                있습니다.
              </p>
              <p>
                실제로 한국의 가업승계 성공률은 30%에 불과하며, 10년 내 폐업하는
                경우가 70%에 달합니다. 성공적인 가업승계를 위해서는{' '}
                <strong>최소 5-10년의 체계적인 준비</strong>가 필요합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Main Checklist */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                가업승계 5단계 체크리스트
              </h2>
              <div className="space-y-6">
                {checklistPhases.map((phase, phaseIndex) => {
                  const IconComponent = phaseIconMap[phaseIndex as keyof typeof phaseIconMap];
                  return (
                    <Card key={phaseIndex}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${phase.iconBgLight} ${phase.iconBgDark}`}>
                            <IconComponent className={`h-6 w-6 ${phase.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-2xl">{phase.title}</CardTitle>
                            <CardDescription className="mt-2">{phase.subtitle}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {phase.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start gap-3">
                              <CheckCircle2 className={`h-5 w-5 ${phase.iconColor.split(' ')[0]} mt-1 flex-shrink-0`} />
                              <div>
                                <h4 className="font-semibold mb-1">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Download */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-8 md:p-12 text-center">
                <Download className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">
                  가업승계 체크리스트 PDF 무료 다운로드
                </h2>
                <p className="text-lg mb-8 text-blue-50">
                  세무사가 만든 단계별 체크리스트와 필수 서류 목록 포함
                  <br />
                  가이업승계 성공률을 70%까지 높이세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ size: 'lg', variant: 'secondary' }),
                      'bg-white text-violet-600 hover:bg-violet-50'
                    )}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    체크리스트 무료 다운로드
                  </Link>
                  <Link
                    href="/business-succession-strategy"
                    className={cn(
                      buttonVariants({ size: 'lg', variant: 'outline' }),
                      'bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20'
                    )}
                  >
                    전문가 1:1 상담
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
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
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
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
        <section className="py-16 border-t">
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
                          index === 0 ? 'w-full' : ''
                        )}
                      >
                        {service.linkText} <ArrowRight className="ml-2 h-4 w-4" />
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
