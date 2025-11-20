import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import { StructuredData } from '@/components/structured-data';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateStructuredData } from '@/lib/seo/structured-data';

// Dynamic imports for better performance - load non-critical sections lazily
const ServicesSection = dynamic(() => import('@/components/sections/services-section').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="py-20 bg-background animate-pulse"><div className="container mx-auto px-6 h-20 bg-muted/50 rounded"></div></div>
});

const DualPillarSection = dynamic(() => import('@/components/sections/dual-pillar-section').then(mod => ({ default: mod.DualPillarSection })), {
  loading: () => <div className="py-20 bg-muted/30 animate-pulse"><div className="container mx-auto px-6 h-32 bg-background/50 rounded"></div></div>
});

const SelfCheckCTASection = dynamic(() => import('@/components/sections/self-check-cta').then(mod => ({ default: mod.SelfCheckCTASection })), {
  loading: () => <div className="py-16 bg-background animate-pulse"><div className="container mx-auto px-6 h-24 bg-muted/50 rounded"></div></div>
});

const Footer = dynamic(() => import('@/components/footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="py-12 bg-muted animate-pulse"><div className="container mx-auto px-6 h-16 bg-background/50 rounded"></div></div>
});

const MultimediaContentSection = dynamic(() => import('@/components/sections/multimedia-content-section'), {
  loading: () => <div className="py-20 bg-background animate-pulse"><div className="container mx-auto px-6 h-64 bg-muted/50 rounded"></div></div>
});

export const metadata: Metadata = generateMetadata(
  '절세플랜·가업승계·가족법인·정책자금·기업인증 전문 | FamilyOffice S',
  '【절세플랜·가업승계·가족법인 전문】 성공한 기업가를 위한 통합솔루션 | 세금 40% 절감 절세플랜 설계 | 가족법인 설립으로 상속세 50% 절감 | 정책자금 신청 95% 성공률 | 벤처·이노비즈 기업인증 컨설팅 | 삼성생명 프리미엄 파트너 | 전문가 무료상담 ☎0502-5550-8700',
  [
    // 🎯 핵심 타겟 키워드 (절세플랜, 가업승계, 가족법인, 정책자금, 기업인증)
    '절세플랜',
    '절세플랜 설계',
    '절세플랜 컨설팅',
    '맞춤형 절세플랜',
    'CEO 절세플랜',
    '기업가 절세플랜',
    
    '가업승계',
    '가업승계 방법',
    '가업승계 절차',
    '가업승계 상담',
    '중소기업 가업승계',
    '가업승계 세무',
    
    '가족법인',
    '가족법인 설립',
    '가족법인 운영',
    '가족법인 세무',
    '가족법인 장점',
    '가족법인 절세',
    
    '정책자금',
    '정책자금 신청',
    '정책자금 컨설팅',
    '중소기업 정책자금',
    '창업 정책자금',
    '정책자금 종류',
    
    '기업인증',
    '기업인증 종류',
    '기업인증 혜택',
    '벤처기업인증',
    '이노비즈 인증',
    '기업인증 신청',
    
    // Family Office 핵심 키워드
    'Family Office',
    '패밀리오피스',
    '패밀리오피스 센터',
    'Family Office Excellence',
    '멀티패밀리오피스',
    
    // 성공한 기업가 전용 키워드
    '성공한 기업가',
    '중소중견기업 CEO',
    '법인 대표',
    '기업 오너',
    '성공한 법인 대표',
    
    // 세무 최적화 키워드
    '세무최적화',
    '절세전략',
    '상속세 절세',
    '법인세 절세',
    '세금 절약',
    '세무 설계',
    
    // 지역 및 브랜드 키워드
    '서울 절세플랜',
    '강남 가족법인',
    '서울 정책자금',
    '한국 기업인증',
    '삼성생명 패밀리오피스',
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
