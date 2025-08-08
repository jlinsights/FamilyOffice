import type { Metadata } from 'next';

import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { AIConsultingChat } from '@/components/ai-consulting-chat';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { StructuredData } from '@/components/structured-data';

// 페이지별 메타데이터 - 가업승계 전문 서비스로 업데이트
export const metadata: Metadata = generateMetadata(
  '백년영속의 시작 | 가업승계 전문 FamilyOffice S',
  '기업의 가치를 다음 세대로. 10년+ 가업승계 노하우, 1,500+ M&A 플랫폼, 60+ Big 4 출신 전문가 컨소시엄. 성공적인 가업승계는 백년영속의 시작입니다.',
  [
    '가업승계',
    '패밀리오피스',
    '헤리티지 플래닝',
    '기업승계',
    '가족법인',
    '자산이전',
    '상속계획',
    '승계전략',
    '백년영속',
    '비상장기업 승계',
    '중소기업 승계',
    '가업승계 컨설팅',
    '기업승계 전략',
    '상속세 최적화',
  ],
  '/og-image-succession.jpg'
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
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-sm px-3 py-1">
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
