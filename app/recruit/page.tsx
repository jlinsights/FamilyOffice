'use client';

import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { RecruitHeroSection } from '@/components/recruit/RecruitHeroSection';
import { GFCBenefitsSection } from '@/components/recruit/GFCBenefitsSection';
import { RequirementsSection } from '@/components/recruit/RequirementsSection';
import { ProcessSection } from '@/components/recruit/ProcessSection';
import { PositionsSection } from '@/components/recruit/PositionsSection';
import { RecruitFAQSection } from '@/components/recruit/RecruitFAQSection';
import { RecruitCTASection } from '@/components/recruit/RecruitCTASection';
import { positions, recruitFaqCategories } from '@/constants/recruit';

export default function RecruitPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  // easing 함수를 메모이제이션
  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500); // 500ms 지연 후 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section - 메인 페이지와 통일성 있는 디자인 */}
        <RecruitHeroSection
          startAnimation={startAnimation}
          easingFunction={easingFunction}
        />

        {/* GFC 소개 & 혜택 통합 섹션 + 성공 스토리 */}
        <GFCBenefitsSection
          startAnimation={startAnimation}
          easingFunction={easingFunction}
        />

        {/* 채용 조건 섹션 */}
        <RequirementsSection />

        {/* 채용 프로세스 */}
        <ProcessSection />

        {/* Positions Section */}
        <PositionsSection positions={positions} />

        {/* GFC 채용 FAQ 섹션 */}
        <RecruitFAQSection faqCategories={recruitFaqCategories} />

        {/* 통합 CTA & Contact Section */}
        <RecruitCTASection />
      </main>

      <Footer />

      {/* JobPosting 구조화 데이터 */}
      <Script
        id="job-posting-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'JobPosting',
                '@id': 'https://familyoffices.vip/recruit#gfc-succession',
                title:
                  '삼성생명 GFC 기업재무컨설턴트 위촉 - 50대 이상 경력직 환영',
                description:
                  '삼성생명 GFC(Group Financial Consultant) 위촉. 50대 이상 경력직 환영. 풍부한 경험을 자산으로 고소득 비즈니스 파이프라인을 구축하세요. 세컨드 커리어 최적화, 경력 활용 고수익 보장, 체계적 교육 시스템. 나이 제한 없이 능력으로 평가받는 전문가 위촉.',
                datePosted: '2025-01-31',
                validThrough: '2025-12-31',
                employmentType: ['CONTRACTOR'],
                hiringOrganization: {
                  '@type': 'Organization',
                  name: '삼성생명 GFC',
                  sameAs: 'https://familyoffices.vip',
                  logo: 'https://familyoffices.vip/favicon.ico',
                },
                jobLocation: {
                  '@type': 'Place',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '서울시 중구',
                    addressLocality: '서울',
                    addressRegion: '서울특별시',
                    addressCountry: 'KR',
                  },
                },
                baseSalary: {
                  '@type': 'MonetaryAmount',
                  currency: 'KRW',
                  value: {
                    '@type': 'QuantitativeValue',
                    minValue: 50000000,
                    maxValue: 200000000,
                    unitText: 'YEAR',
                  },
                },
                qualifications: [
                  '금융/경영 관련 학과 졸업 또는 동등한 경력',
                  '기업재무 또는 가업승계 컨설팅 경력 5년 이상',
                  'CFP, 세무사, 변호사 등 전문 자격증 우대',
                  '가족기업 및 상속/증여 관련 업무 경험 필수',
                ],
                skills: [
                  '가업승계',
                  '상속증여',
                  '세무최적화',
                  '기업재무',
                  '자산관리',
                ],
                benefits: [
                  '연봉 상위 1% 수준 고수입',
                  '24개월 체계적 교육 과정',
                  '삼성생명 프리미엄 브랜드',
                  '전문가 네트워크 지원',
                  '유연근무제',
                ],
                industry: 'Financial Services',
                occupationalCategory: 'Financial Consultant',
              },
              {
                '@type': 'JobPosting',
                '@id': 'https://familyoffices.vip/recruit#gfc-asset',
                title:
                  '삼성생명 GFC 기업재무컨설턴트 위촉 - 경력직 우대 · 자산관리 전문',
                description:
                  '삼성생명 GFC 자산관리 전문가 위촉. 경력직 우대. 고액자산가 및 기업의 종합자산관리 서비스를 제공하는 전문 컨설턴트 모집. 경험을 활용한 고소득 비즈니스 파이프라인 구축 기회.',
                datePosted: '2025-01-31',
                validThrough: '2025-12-31',
                employmentType: ['CONTRACTOR'],
                hiringOrganization: {
                  '@type': 'Organization',
                  name: '삼성생명 GFC',
                  sameAs: 'https://familyoffices.vip',
                  logo: 'https://familyoffices.vip/favicon.ico',
                },
                jobLocation: {
                  '@type': 'Place',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '서울시 중구',
                    addressLocality: '서울',
                    addressRegion: '서울특별시',
                    addressCountry: 'KR',
                  },
                },
                baseSalary: {
                  '@type': 'MonetaryAmount',
                  currency: 'KRW',
                  value: {
                    '@type': 'QuantitativeValue',
                    minValue: 40000000,
                    maxValue: 150000000,
                    unitText: 'YEAR',
                  },
                },
                qualifications: [
                  '금융 관련 학과 졸업 또는 동등한 경력',
                  '자산관리 또는 기업재무 경력 3년 이상',
                  '금융투자분석사, CFP, CFA 등 관련 자격증 우대',
                ],
                skills: ['자산관리', '포트폴리오 운용', '투자자문', '기업재무'],
                industry: 'Financial Services',
                occupationalCategory: 'Financial Consultant',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: '삼성생명 GFC란 무엇인가요?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: '삼성생명 GFC(Group Financial Consultant)는 기업재무컨설턴트로서, 중소중견기업 CEO와 고액자산가를 대상으로 가업승계, 자산관리, 세무최적화, 리스크관리 등 종합적인 재무컨설팅을 제공하는 전문가입니다.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: '삼성생명 GFC 채용 자격조건은 어떻게 되나요?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: '기본적으로 4년제 대졸 이상, 금융/경영/회계 관련 전공자를 우대합니다. 가업승계 전문가는 관련 경력 5년 이상, 자산관리 전문가는 3년 이상의 경력이 필요합니다. CFP, CFA, 세무사, 변호사 등 관련 자격증 보유자는 우대합니다.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: '삼성생명 GFC 연봉은 얼마나 되나요?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: '삼성생명 GFC는 위촉직으로 고정급과 성과급을 결합한 보수체계를 운영합니다. 경력과 실력에 따라 연봉 상위 1% 수준의 높은 수입이 가능하며, 프리미엄 고객 대상으로 고단가 서비스를 제공하여 일반 설계사 대비 3-5배 높은 수익을 기대할 수 있습니다.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'GFC 채용 과정은 어떻게 진행되나요?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: '채용 과정은 ①지원서 접수 → ②서류심사(3-5일) → ③면접진행(1차 실무진, 2차 임원) → ④최종선발 순으로 진행됩니다. 전체 과정은 약 2-3주 소요되며, 합격 시 위촉계약을 체결하고 24개월간의 체계적인 교육과정을 제공받게 됩니다.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Cal.com Script for Individual Consultation */}
      <Script
        id="cal-embed-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (C, A, L) {
              let p = function (a, ar) { a.q.push(ar); };
              let d = C.document;
              C.Cal = C.Cal || function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                  cal.ns = {};
                  cal.q = cal.q || [];
                  d.head.appendChild(d.createElement("script")).src = A;
                  cal.loaded = true;
                }
                if (ar[0] === L) {
                  const api = function () { p(api, arguments); };
                  const namespace = ar[1];
                  api.q = api.q || [];
                  if(typeof namespace === "string"){
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else p(cal, ar);
                  return;
                }
                p(cal, ar);
              };
            })(window, "https://app.cal.com/embed/embed.js", "init");

            Cal("init", "recruit", {origin:"https://app.cal.com"});

            Cal.ns.recruit("inline", {
              elementOrSelector:"#my-cal-inline-recruit",
              config: {"layout":"month_view"},
              calLink: "familyoffice/recruit",
            });

            Cal.ns.recruit("ui", {
              "cssVarsPerTheme": {
                "light": {"cal-brand":"#000000"},
                "dark": {"cal-brand":"#ffffff"}
              },
              "hideEventTypeDetails": false,
              "layout": "month_view"
            });
          `,
        }}
      />
    </div>
  );
}
