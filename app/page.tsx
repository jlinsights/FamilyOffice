import type { Metadata } from 'next';

import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { StructuredData } from '@/components/structured-data';

// 페이지별 메타데이터 - SEO 최적화
export const metadata: Metadata = generateMetadata(
  '패밀리오피스 가업승계 자산관리 전문',
  '패밀리오피스 전문 상담. 가업승계, 상속증여 절세, CEO 자산관리, 경영인정기보험. 중소중견기업 대표 맞춤 컨설팅. 삼성생명 500억+ 운용. 무료상담 ☎0502-5550-8700',
  [
    '패밀리오피스 추천',
    '가업승계 컨설팅',
    '상속세 절세 방법',
    '증여세 절세 방법',
    'CEO 자산관리',
    '경영인정기보험',
    '중소기업 절세',
    '서울 패밀리오피스',
    '강남 패밀리오피스',
    '삼성생명 자산관리',
  ],
  '/og-image.jpg'
);

export default function HomePage() {
  const organizationData = generateStructuredData('Organization');
  const localBusinessData = generateStructuredData('LocalBusiness');
  const websiteData = generateStructuredData('WebSite');

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={organizationData} />
      <StructuredData data={localBusinessData} />
      <StructuredData data={websiteData} />
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* AI Consulting Chat Section - 임시 주석 처리 */}
      {/* <section id="ai-consulting" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Badge variant="outline" size="lg" animation="fade">
                Premium AI Consulting
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              지금 바로 물어보세요
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              복잡한 가업승계, 세무전략, M&A 구조화까지. 
              귀사만의 고유한 상황을 이해하고 최적화된 해법을 제시합니다.
              전문가의 통찰력을 AI가 24시간 제공합니다.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <AIConsultingChat maxHeight="800px" />
          </div>
        </div>
      </section> */}
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Test Button Section - 숨김 처리 */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              클라이언트 기능 테스트
            </h2>
            <TestButton />
          </div>
        </div>
      </section> */}
      
      <Footer />
    </div>
  );
}
