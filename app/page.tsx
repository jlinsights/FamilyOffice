import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { DualPillarSection } from '@/components/sections/dual-pillar-section';
import { SelfCheckCTASection } from '@/components/sections/self-check-cta';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/structured-data';

// Dynamic import for multimedia section (optional content)
const MultimediaContentSection = dynamic(() => import('@/components/sections/multimedia-content-section'), {
  loading: () => <div className="py-20 bg-background"><div className="container mx-auto px-6 text-center">멀티미디어 콘텐츠 로딩 중...</div></div>
});

export const metadata: Metadata = generateMetadata(
  'Family Office | 패밀리오피스 | 최고 자산가·성공한 기업가 전용 솔루션',
  '【Family Office Excellence】 최고 자산가와 성공한 기업가를 위한 차별화된 패밀리오피스 서비스 | 자산 보전부터 가업승계, 차세대 육성까지 百年永續의 기반 구축 | 개인자산 100억+ 전용 솔루션 | 전담 멀티패밀리오피스 전문가팀 | 24/7 프리미엄 컨시어지 서비스 | VIP 전용 상담 ☎0502-5550-8700',
  [
    // Family Office 핵심 키워드
    'Family Office',
    '패밀리오피스',
    '패밀리오피스 센터',
    'Family Office Excellence',
    '멀티패밀리오피스',
    
    // 최고 자산가 전용 키워드
    '최고 자산가',
    '성공한 기업가',
    '개인자산 100억 이상',
    'UHNW 자산관리',
    '초고액자산가',
    'VIP 전용 서비스',
    
    // 프리미엄 서비스 키워드
    '차별화된 전용 솔루션',
    '전담 전문가팀',
    '24/7 프리미엄 컨시어지',
    '독점적 정보 접근',
    '최고 수준의 보안',
    '완벽한 프라이버시',
    
    // 세대 승계 키워드
    '百年永續',
    '세대를 잇는 자산관리',
    '가문의 유산',
    'Legacy Building',
    '세대간 연속성',
    '가업승계 Mastery',
    
    // 고급 서비스 등급
    'Heritage Elite',
    'Legacy Premium', 
    'Wealth Select',
    '자산관리 Excellence',
    '가족 Governance',
    
    // 전문 영역 키워드
    '글로벌 자산 배분',
    '대안투자 기회',
    '가족헌장',
    '차세대 교육',
    '사회적 영향력',
    
    // 구체적 실행 키워드
    '가업승계 마스터플랜',
    '상속세 최적화',
    '경영권 보호',
    '세무 효율성 극대화',
    '리스크 헤지 전략',
    
    // 지역 및 브랜드 키워드
    '서울 패밀리오피스',
    '강남 패밀리오피스',
    '한국 Family Office',
  ],
  'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
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
    <div className="mobile-scroll-smooth cls-safe min-h-screen bg-background">
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
            <h2 className="mobile-text-optimize text-3xl md:text-4xl font-bold text-foreground mb-4">
              지금 바로 물어보세요
            </h2>
            <p className="mobile-text-optimize text-lg text-muted-foreground max-w-2xl mx-auto">
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
      <DualPillarSection />
      <SelfCheckCTASection />
      <ServicesSection />
      
      {/* Multimedia Content Section */}
      <MultimediaContentSection />
      
      {/* Test Button Section - 숨김 처리 */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="mobile-text-optimize text-3xl font-bold text-foreground mb-8">
              클라이언트 기능 테스트
            </h2>
            <TestButton />
          </div>
        </div>
      </section> */}
      
      <div className="safe-area-bottom">
        <Footer />
      </div>
    </div>
  );
}
