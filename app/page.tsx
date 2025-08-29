import type { Metadata } from 'next';

import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = generateMetadata(
  '성공한 기업가 전용 패밀리오피스 | 법인보험 가업승계 통합솔루션',
  '【법인보험 × 가업승계 통합솔루션】 기업재해보장·경영인정기·법인종신보험·퇴직연금 + M&A 1500+ | 법인세 30% + 승계세 40% 동시절감 | 삼성생명 프리미엄 파트너 | 무료 통합진단 ☎0502-5550-8700',
  [
    // 성공한 기업가 실제 검색어
    '기업가 자산관리',
    '법인대표 가업승계',
    '법인대표 은퇴설계',
    '성공한 기업가 재산관리',
    '기업 경영인 투자전략',
    
    // 성취와 성장 키워드
    '기업가치 극대화',
    '대를 이을 가업승계',
    '성공한 CEO 자산관리법',
    '부의 대물림 전략',
    '기업오너 레거시 구축',
    
    // 미래 비전 키워드
    '세계적인 기업가문',
    '글로벌 패밀리오피스',
    '차세대 기업가 양성',
    '최고급 자산관리 서비스',
    'VVIP 전용 컨설팅',
    
    // 구체적 실행 키워드
    '패밀리오피스',
    '가업승계 방법',
    '상속세 절세',
    '증여세 절세',
    '경영인정기보험',
    
    // 법인보험 가업승계 통합솔루션 키워드
    '법인보험 가업승계',
    '기업재해보장보험',
    '법인종신보험',
    '퇴직연금 운용',
    'M&A 컨설팅',
    '법인세 절감',
    '승계세 절감',
    
    // 지역 및 브랜드 키워드
    '서울 패밀리오피스',
    '강남 패밀리오피스',
    '삼성생명 자산관리',
  ],
  '/og-image.jpg',
  '전문가급',
  '성장기',
  'commercial'
);

export default function HomePage() {
  const organizationData = generateStructuredData('Organization');
  const localBusinessData = generateStructuredData('LocalBusiness');
  const websiteData = generateStructuredData('WebSite');
  // 검색엔진 최적화 구조화 데이터 추가
  const faqData = generateStructuredData('FAQPage');
  const aiOptimizedData = generateStructuredData('AIOptimized');

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={organizationData} />
      <StructuredData data={localBusinessData} />
      <StructuredData data={websiteData} />
      <StructuredData data={faqData} />
      <StructuredData data={aiOptimizedData} />
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
