import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/error-boundary';
import { Analytics } from '@/components/analytics';
import ExternalScripts from '@/components/external-scripts';
// import { AIChatFloating } from '@/components/ai-chat-floating';
import { CalComFloating } from '@/components/cal-com-floating';

import { defaultMetadata } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

// SuperClaude 통합 SEO 프레임워크 적용
export const metadata: Metadata = {
  ...defaultMetadata,
  // 글로벌 메타태그 강화
  verification: {
    google: 'your-google-verification-code',
    other: {
      'naver-site-verification': 'your-naver-verification-code',
      'msvalidate.01': 'your-bing-verification-code'
    }
  },
  alternates: {
    canonical: 'https://familyoffices.vip',
    languages: {
      'ko': 'https://familyoffices.vip',
      'ko-KR': 'https://familyoffices.vip'
    }
  },
  // SuperClaude 프레임워크 식별자
  generator: 'SuperClaude SEO Framework v2.0',
  applicationName: 'FamilyOffice S - 40대 이상 CEO 전용',
  referrer: 'origin-when-cross-origin',
  creator: 'SuperClaude + BMAD Method + AgentOS',
  publisher: 'FamilyOffice S Premium Services'
};

// Next.js 15: colorScheme을 별도 viewport export로 분리
export const viewport: Viewport = {
  colorScheme: 'light dark'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://familyoffices.vip" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.placename" content="Seoul" />
        <meta name="geo.position" content="37.5665;126.9780" />
        <meta name="ICBM" content="37.5665, 126.9780" />
        
        {/* 네이버/다음 SEO */}
        <meta name="subject" content="패밀리오피스 가업승계 자산관리" />
        <meta name="classification" content="Business" />
        <meta name="distribution" content="Korea" />
        <meta name="language" content="Korean" />
        <meta name="target" content="CEO, 중소기업, 중견기업, 자산가" />
        
        {/* Google SEO */}
        <meta name="google" content="notranslate" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* 모바일 최적화 */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* SuperClaude 40+ 타겟 메타태그 */}
        <meta name="target-audience" content="40-60세 법인 대표" />
        <meta name="business-sector" content="중소중견기업" />
        <meta name="service-tier" content="Premium VVIP" />
        <meta name="framework-version" content="SuperClaude v2.0 + BMAD + AgentOS" />
        
        {/* 추가 Open Graph */}
        <meta property="og:country-name" content="South Korea" />
        <meta property="og:postal-code" content="04527" />
        <meta property="og:latitude" content="37.5665" />
        <meta property="og:longitude" content="126.9780" />
        <meta property="og:audience" content="40-60대 법인 대표" />
        <meta property="og:target_audience" content="중소중견기업 CEO" />
        <meta property="og:content_tier" content="Premium" />
        
        {/* 검색엔진 우선순위 */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* SuperClaude + BMAD Method 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "40-50대 CEO 전용 패밀리오피스 FamilyOffice S",
              "description": "BMAD Method 기반 40-50대 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 중년 CEO 맞춤 자산관리, 삼성생명 1000억+ 운용실적",
              "url": "https://familyoffices.vip",
              "telephone": "+82-502-5550-8700",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "서울",
                "addressRegion": "서울특별시",
                "addressCountry": "KR"
              },
              "areaServed": "대한민국",
              "availableLanguage": ["Korean"],
              "priceRange": "₩₩₩₩",
              "targetAudience": {
                "@type": "Audience",
                "audienceType": "40-60세 법인 대표",
                "geographicArea": "대한민국",
                "requiredMinAge": 40,
                "requiredMaxAge": 60
              },
              "knowsAbout": [
                "40대 이상 CEO 자산관리",
                "중년 기업가 가업승계",
                "VVIP 전용 패밀리오피스",
                "법인대표 세무전략",
                "기업오너 승계준비"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "BMAD Method 맞춤 서비스",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Behavioral 분석 기반 자산관리",
                      "description": "실제 행동 패턴 분석을 통한 맞춤형 투자전략"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Motivational 동기 기반 승계설계",
                      "description": "성취동기 분석을 통한 가업승계 로드맵"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Aspirational 비전 기반 자산전략",
                      "description": "미래 비전 실현을 위한 장기 자산계획"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Decisional 실행 기반 세무최적화",
                      "description": "즉시 실행 가능한 구체적 세무절세 방안"
                    }
                  }
                ]
              },
              "memberOf": {
                "@type": "Organization",
                "name": "삼성생명보험",
                "description": "VVIP 패밀리오피스 서비스 제공"
              }
            })
          }}
        />
        
        {/* AgentOS 다중관점 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "40-50대 CEO 전용 패밀리오피스",
              "description": "SuperClaude + BMAD Method + AgentOS 통합 SEO 최적화",
              "mainEntity": {
                "@type": "Organization",
                "name": "FamilyOffice S",
                "alternateName": "패밀리오피스 에스"
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "40대 기업가 자산관리",
                  "sameAs": "https://familyoffices.vip/services"
                },
                {
                  "@type": "Thing",
                  "name": "50대 CEO 가업승계",
                  "sameAs": "https://familyoffices.vip/program"
                }
              ],
              "keywords": "40대 CEO, 50대 기업가, 중년 경영진, 가업승계, 자산관리, VVIP, 패밀리오피스",
              "inLanguage": "ko-KR",
              "isPartOf": {
                "@type": "WebSite",
                "url": "https://familyoffices.vip"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* <AIChatFloating /> */}
            <CalComFloating />
            <Toaster />
            <Analytics />
            <ExternalScripts />
            
            {/* SuperClaude 성능 추적 스크립트 */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // SuperClaude SEO 성능 모니터링
                  if (typeof window !== 'undefined') {
                    window.SuperClaudeSEO = {
                      version: '2.0',
                      framework: 'BMAD + AgentOS',
                      target: '40-60세 법인 대표',
                      initialized: new Date().toISOString()
                    };
                    
                    // BMAD 사용자 행동 추적
                    window.addEventListener('load', function() {
                      const target = {
                        behavioral: document.referrer || 'direct',
                        motivational: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
                        aspirational: window.innerWidth > 1920 ? 'premium' : 'standard',
                        decisional: performance.now() < 3000 ? 'fast' : 'slow'
                      };
                      
                      console.log('SuperClaude BMAD Profile:', target);
                    });
                  }
                `
              }}
            />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}