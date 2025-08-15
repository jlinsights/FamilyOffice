import type { Metadata } from 'next';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CalComPopup } from '@/components/cal-com-popup';
import { CheckCircle, Shield, TrendingUp, Users } from 'lucide-react';
import { StructuredData } from '@/components/structured-data';

// SEO 최적화 메타데이터
export const metadata: Metadata = generateMetadata(
  '패밀리오피스란? 가업승계 자산관리 전문 서비스',
  '패밀리오피스는 중소중견기업 CEO와 고액자산가를 위한 종합 자산관리 서비스입니다. 가업승계, 상속증여 절세, 경영인정기보험 등 맞춤형 솔루션 제공. 무료상담 ☎0502-5550-8700',
  [
    '패밀리오피스란',
    '패밀리오피스 뜻',
    '패밀리오피스 서비스',
    '패밀리오피스 장점',
    '패밀리오피스 비용',
    '한국 패밀리오피스',
    '프라이빗 뱅킹',
    'PB 자산관리',
  ]
);

export default function FamilyOfficePage() {
  const faqData = generateStructuredData('FAQPage');
  
  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={faqData} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              패밀리오피스란 무엇인가요?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              중소중견기업 CEO와 고액자산가를 위한<br />
              종합 자산관리 서비스입니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="무료 상담 신청"
                variant="default"
                size="lg"
              />
              <Button variant="outline" size="lg" asChild>
                <a href="tel:0502-5550-8700">
                  ☎ 0502-5550-8700
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">가업승계</h3>
              <p className="text-muted-foreground">
                체계적인 승계 계획으로<br />
                기업 가치 보전
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">절세 전략</h3>
              <p className="text-muted-foreground">
                상속세·증여세 최적화<br />
                합법적 절세 방안
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">맞춤형 컨설팅</h3>
              <p className="text-muted-foreground">
                1:1 전문가 상담<br />
                개인별 맞춤 솔루션
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">검증된 실적</h3>
              <p className="text-muted-foreground">
                삼성생명 500억+<br />
                운용 실적 보유
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Q. 패밀리오피스 서비스 대상은 누구인가요?
              </h3>
              <p className="text-muted-foreground">
                중소중견기업 CEO, 성실신고대상자, 고액자산가 등 종합적인 자산관리가 필요한 분들이 대상입니다. 
                특히 가업승계를 준비하시거나 절세 전략이 필요하신 분들께 적합합니다.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Q. 패밀리오피스 비용은 어떻게 되나요?
              </h3>
              <p className="text-muted-foreground">
                초기 상담은 무료로 진행되며, 고객님의 자산 규모와 필요 서비스에 따라 맞춤형 견적을 제공해드립니다. 
                투명하고 합리적인 수수료 체계를 운영하고 있습니다.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Q. 일반 자산관리와 어떤 차이가 있나요?
              </h3>
              <p className="text-muted-foreground">
                패밀리오피스는 단순 금융상품 판매가 아닌, 가업승계, 세무, 법무, 부동산 등 
                모든 자산을 아우르는 종합적인 관리 서비스입니다. 전문가 팀이 장기적 관점에서 
                고객 가문의 자산을 보전하고 성장시킵니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            전문가와의 무료 상담으로 맞춤형 솔루션을 찾아보세요
          </p>
          <CalComPopup
            buttonText="무료 상담 예약하기"
            variant="default"
            size="lg"
            className="mx-auto"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}