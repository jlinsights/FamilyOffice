import type { Metadata } from 'next';

import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { StructuredData } from '@/components/structured-data';

// SuperClaude BMAD Method 최적화 메타데이터 - 40+ CEO 타겟
export const metadata: Metadata = generateMetadata(
  '40-50대 CEO 전용 패밀리오피스 | 가업승계 자산관리 완전해결',
  '40-50대 법인대표 전용 패밀리오피스. SuperClaude BMAD Method 적용 맞춤 컨설팅. 가업승계·승계세무 완전해결, 중년 CEO 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적 ☎0502-5550-8700',
  [
    // BMAD Method 1: Behavioral (행동 기반) - 40+ CEO 실제 검색어
    '40대 CEO 자산관리',
    '50대 기업오너 가업승계',
    '법인대표 은퇴설계',
    '중년 기업가 재산관리',
    '40-50대 경영인 투자전략',
    
    // BMAD Method 2: Motivational (동기 기반) - 성취와 성장
    '기업가치 극대화',
    '대를 이을 가업승계',
    '성공한 CEO 자산관리법',
    '부의 대물림 전략',
    '기업오너 레거시 구축',
    
    // BMAD Method 3: Aspirational (열망 기반) - 미래 비전
    '세계적인 기업가문',
    '글로벌 패밀리오피스',
    '차세대 기업가 양성',
    '최고급 자산관리 서비스',
    'VVIP 전용 컨설팅',
    
    // BMAD Method 4: Decisional (결정 기반) - 구체적 실행
    '패밀리오피스',
    '가업승계 방법',
    '상속세 절세',
    '증여세 절세',
    '경영인정기보험',
    
    // SuperClaude 프레임워크 식별자
    'SuperClaude Designer',
    'BMAD Method 적용',
    'AgentOS 다중관점',
    '40+ 사용자 최적화',
    
    // 기존 핵심 키워드 유지
    '서울 패밀리오피스',
    '강남 패밀리오피스',
    '삼성생명 자산관리',
  ],
  '/og-image.jpg',
  '40-50대',
  '성숙기',
  'commercial'
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
