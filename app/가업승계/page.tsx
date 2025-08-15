import type { Metadata } from 'next';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CalComPopup } from '@/components/cal-com-popup';
import { ArrowRight, Building2, FileCheck, TrendingUp, Users } from 'lucide-react';
import { StructuredData } from '@/components/structured-data';

// SEO 최적화 메타데이터
export const metadata: Metadata = generateMetadata(
  '가업승계 방법 | 중소기업 가업승계 절차 상담',
  '가업승계 전문 컨설팅. 중소중견기업 가업승계 방법, 절차, 세금 절감 전략까지. 10년+ 경험, 500억+ 운용실적. 체계적인 승계 계획 수립. 무료상담 ☎0502-5550-8700',
  [
    '가업승계 방법',
    '가업승계 절차',
    '가업승계 세금',
    '가업승계 컨설팅',
    '중소기업 가업승계',
    '기업 상속',
    '경영권 승계',
    '주식 증여',
    '가업상속공제',
    '가업승계 전문가',
  ]
);

export default function SuccessionPage() {
  const serviceData = generateStructuredData('Service');
  
  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={serviceData} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              가업승계, 체계적으로 준비하세요
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              기업의 가치를 다음 세대로 안전하게 이전하는<br />
              전문적인 가업승계 컨설팅
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="가업승계 상담 신청"
                variant="default"
                size="lg"
              />
              <Button variant="outline" size="lg" asChild>
                <a href="tel:0502-5550-8700">
                  ☎ 전문가 직통 상담
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            가업승계 절차
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">현황 분석</h3>
                  <p className="text-muted-foreground">
                    기업 가치 평가, 지분 구조 분석, 재무 상태 진단을 통해 현재 상황을 정확히 파악합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">승계 전략 수립</h3>
                  <p className="text-muted-foreground">
                    가업상속공제, 증여 시기, 지분 이전 방법 등 최적의 승계 전략을 설계합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">세금 최적화</h3>
                  <p className="text-muted-foreground">
                    상속세, 증여세를 합법적으로 최소화하는 절세 방안을 마련합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">실행 및 관리</h3>
                  <p className="text-muted-foreground">
                    단계별 실행 계획에 따라 안전하게 승계를 진행하고 사후 관리까지 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            가업승계 컨설팅의 장점
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-lg p-6 text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">기업가치 보전</h3>
              <p className="text-muted-foreground text-sm">
                체계적인 승계로 기업 가치를 온전히 보전
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <FileCheck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">법적 안정성</h3>
              <p className="text-muted-foreground text-sm">
                법무·세무 전문가의 검증된 승계 방안
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">세금 최적화</h3>
              <p className="text-muted-foreground text-sm">
                합법적인 절세로 승계 비용 최소화
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">경영권 안정</h3>
              <p className="text-muted-foreground text-sm">
                안정적인 경영권 이전과 지속 가능성 확보
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              가업승계, 지금 시작하세요
            </h2>
            <p className="text-xl mb-8 opacity-90">
              10년 이상의 경험과 노하우로<br />
              안전하고 효율적인 가업승계를 도와드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="무료 상담 예약"
                variant="secondary"
                size="lg"
              />
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20">
                <span className="mr-2">가업승계 가이드북</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}