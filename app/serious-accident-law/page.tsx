'use client';

import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SALHeroSection } from '@/components/serious-accident-law/SALHeroSection';
import { OverviewSection } from '@/components/serious-accident-law/OverviewSection';
import { RiskAnalysisSection } from '@/components/serious-accident-law/RiskAnalysisSection';
import { ResponseSection } from '@/components/serious-accident-law/ResponseSection';
import { InsuranceSection } from '@/components/serious-accident-law/InsuranceSection';
import { SALFAQSection } from '@/components/serious-accident-law/SALFAQSection';
import { SALCTASection } from '@/components/serious-accident-law/SALCTASection';
import { StructuredData } from '@/components/seo/structured-data';
import { generateStructuredData } from '@/lib/seo/structured-data';
import {
  faqItems,
  structuredDataGraph,
} from '@/constants/serious-accident-law';

export default function SeriousAccidentLawPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  // easing 함수를 메모이제이션
  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 검색엔진 최적화 구조화 데이터 추가
  const faqData = generateStructuredData('FAQPage', faqItems);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <StructuredData data={faqData} />
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <SALHeroSection
          startAnimation={startAnimation}
          easingFunction={easingFunction}
        />

        {/* 중대재해처벌법 개요 섹션 */}
        <OverviewSection />

        {/* 업종별 위험도 분석 섹션 */}
        <RiskAnalysisSection />

        {/* 4단계 대응 전략 섹션 */}
        <ResponseSection />

        {/* 보험 상품 비교 섹션 */}
        <InsuranceSection />

        {/* FAQ 섹션 */}
        <SALFAQSection />

        {/* 최종 CTA 섹션 */}
        <SALCTASection />
      </main>

      <Footer />

      {/* 중대재해처벌법 구조화 데이터 */}
      <Script
        id="serious-accident-law-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataGraph),
        }}
      />
    </div>
  );
}
