import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Analytics } from '@/components/analytics';
import { DomainMigrationBanner } from '@/components/domain-migration-banner';
import { ErrorBoundary } from '@/components/error-boundary';
import ExternalScripts from '@/components/external-scripts';
import { KakaoPixel } from '@/components/kakao/kakao-pixel';
import { KakaoSDK } from '@/components/kakao/kakao-sdk';
import { KoreanPerformanceTracker } from '@/components/korean-performance-tracker';
import { SEOErrorBoundary } from '@/components/seo-error-boundary';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { WebVitalsTracker } from '@/components/web-vitals-tracker';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
// import { AIChatFloating } from '@/components/ai-chat-floating';
import { ChannelTalk } from '@/components/channel-talk';
import { PreloadCriticalResources } from '@/components/preload-critical-resources';
import { SEOModulePreloader } from '@/components/seo-module-preloader';
import { SEOTrackerInit } from '@/components/seo/seo-tracker-init';
import { OrganizationStructuredData } from '@/components/seo/structured-data';
import { safeMetadata } from '@/lib/safe-seo-engine';
import { DebugStyles } from './debug-styles';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

// Safe SEO metadata with fallback support
export const metadata: Metadata = {
  ...safeMetadata.default,
  title: {
    default: 'FamilyOffice S - 절세플랜·가업승계·가족법인·정책자금·기업인증 전문 통합솔루션',
    template: '%s | FamilyOffice S',
  },
  description: '【절세플랜·가업승계·가족법인 전문】 성공한 기업가를 위한 통합솔루션 | 정책자금·기업인증 컨설팅 | 세금 40% 절감 + 승계세 50% 절감 + 정책자금 신청 95% 성공률 | 삼성생명 프리미엄 파트너 | 맞춤형 절세플랜 설계',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2025', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.png?v=2025', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2025',
    apple: { url: '/favicon.png?v=2025', sizes: '180x180' },
    other: [
      { rel: 'icon', url: '/favicon.ico?v=2025', sizes: 'any' },
      { rel: 'apple-touch-icon', url: '/favicon.png?v=2025', sizes: '180x180' },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || 'your-naver-verification-code',
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || 'your-bing-verification-code'
    }
  },
  alternates: {
    canonical: 'https://familyoffices.vip',
    languages: {
      'ko': 'https://familyoffices.vip',
      'ko-KR': 'https://familyoffices.vip'
    }
  },
  generator: 'Next.js',
  applicationName: 'FamilyOffice S - 성공한 기업가·자산가를 위한 법인보험 가업승계 통합솔루션',
  referrer: 'origin-when-cross-origin',
  creator: 'FamilyOffice S',
  publisher: 'FamilyOffice S - 프리미엄 법인금융 서비스'
};

// Next.js 15: colorScheme을 별도 viewport export로 분리
export const viewport: Viewport = {
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover' // iPhone X 이상 Safe Area 지원
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <PreloadCriticalResources />
        {/* 🚀 Core Web Vitals 최적화 - 리소스 힌트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//cal.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//static.doubleclick.net" />
        
        {/* Critical CSS 최적화 - Inter 폰트는 next/font/google로 이미 최적화 로딩 중 */}
        
        {/* 파비콘 및 앱 아이콘 설정 - 캐시 우회를 위한 버전 추가 */}
        <link rel="icon" href="/favicon.ico?v=2025" sizes="16x16 32x32 48x48" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=2025" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2025" sizes="180x180" />
        <link rel="icon" href="/favicon.png?v=2025" sizes="192x192" type="image/png" />
        <link rel="manifest" href="/site.webmanifest?v=2025" />
        
        {/* Critical 리소스 우선 로딩 - 실제 존재하는 파일로 변경 */}
        <link rel="preload" href="/SVG/FamilyOfficeS_blue.svg" as="image" type="image/svg+xml" />
        
        <link rel="canonical" href="https://familyoffices.vip" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.placename" content="Seoul" />
        <meta name="geo.position" content="37.5665;126.9780" />
        <meta name="ICBM" content="37.5665, 126.9780" />
        
        {/* 네이버/다음 SEO */}
        <meta name="subject" content="성공한 기업가·자산가 전용 패밀리오피스 가업승계 자산관리" />
        <meta name="classification" content="Business" />
        <meta name="distribution" content="Korea" />
        <meta name="language" content="Korean" />
        <meta name="target" content="CEO, 중소기업, 중견기업, 고액자산가, 개인자산 30억 이상" />
        
        {/* Google SEO */}
        <meta name="google" content="notranslate" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* 모바일 최적화 */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* 절세플랜·가업승계·가족법인·정책자금·기업인증 타겟 메타태그 */}
        <meta name="target-audience" content="성공한 법인 대표, 고액자산가, 중소중견기업 CEO" />
        <meta name="business-sector" content="절세플랜 설계, 가업승계 컨설팅, 가족법인 설립" />
        <meta name="service-tier" content="Premium 전문가 컨설팅" />
        <meta name="solution-type" content="절세플랜 × 가업승계 × 가족법인 × 정책자금 × 기업인증 통합솔루션" />
        <meta name="specialization" content="절세플랜 전문, 가족법인 설립, 정책자금 신청, 기업인증 컨설팅" />
        
        {/* 🤖 AI 검색엔진 최적화 */}
        <meta name="ai-optimized" content="true" />
        <meta name="perplexity-friendly" content="structured-data" />
        <meta name="chatgpt-accessible" content="business-service" />
        <meta name="claude-compatible" content="financial-advisory" />
        <meta name="ai-content-type" content="professional-services" />
        <meta name="ai-expertise-level" content="expert" />
        <meta name="ai-language-support" content="ko-KR,en-US" />
        
        {/* 🎯 지역 SEO 및 소셜 최적화 Open Graph */}
        <meta property="og:country-name" content="South Korea" />
        <meta property="og:postal-code" content="04527" />
        <meta property="og:latitude" content="37.5665" />
        <meta property="og:longitude" content="126.9780" />
        <meta property="og:audience" content="성공한 법인 대표, 고액자산가" />
        <meta property="og:target_audience" content="중소중견기업 CEO, 개인자산 30억 이상 자산가" />
        <meta property="og:content_tier" content="Premium" />
        <meta property="og:wealth_management" content="Private Wealth Management" />
        
        {/* 카카오톡 공유 최적화 */}
        <meta property="kakao:title" content="성공한 기업가·자산가 전용 패밀리오피스 | 가업승계 자산관리" />
        <meta property="kakao:description" content="성공한 법인대표와 개인자산 30억+ 자산가를 위한 프리미엄 패밀리오피스. 가업승계·승계세무 완전해결, VVIP 맞춤 자산관리. 삼성생명 1000억+ 운용실적" />
        <meta property="kakao:image" content="https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain" />
        <meta property="kakao:url" content="https://familyoffices.vip" />
        
        {/* 네이버 블로그/카페 최적화 */}
        <meta name="naver:title" content="성공한 기업가·자산가 전용 패밀리오피스 | FamilyOffice S" />
        <meta name="naver:description" content="법인보험 × 가업승계 × 개인자산관리 통합솔루션. 성공한 법인대표와 30억+ 자산가 전용 가업승계·자산관리 완전해결" />
        <meta name="naver:image" content="https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain" />
        
        {/* LinkedIn 비즈니스 네트워크 최적화 */}
        <meta property="linkedin:title" content="성공한 기업가·자산가를 위한 패밀리오피스 | 가업승계 전문" />
        <meta property="linkedin:description" content="중소중견기업 CEO와 개인자산 30억+ 자산가 전용 프리미엄 자산관리. 가업승계부터 세무최적화까지 원스톱 솔루션" />
        <meta property="linkedin:image" content="https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain" />
        
        {/* 지역 비즈니스 신뢰성 향상 */}
        <meta name="business:contact_data:street_address" content="서울특별시 중구" />
        <meta name="business:contact_data:locality" content="서울" />
        <meta name="business:contact_data:region" content="서울특별시" />
        <meta name="business:contact_data:postal_code" content="04527" />
        <meta name="business:contact_data:country_name" content="대한민국" />
        <meta name="business:contact_data:phone_number" content="+82-502-5550-8700" />
        <meta name="business:contact_data:email" content="cs@familyoffices.vip" />
        
        {/* 검색엔진 우선순위 */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* 🤖 AI 검색엔진 최적화 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "절세플랜·가업승계·가족법인 전문 FamilyOffice S",
              "description": "절세플랜 설계 × 가업승계 컨설팅 × 가족법인 설립 × 정책자금 × 기업인증 통합솔루션. 성공한 기업가를 위한 맞춤형 절세플랜, 가족법인 세무최적화, 정책자금 신청 95% 성공률, 삼성생명 프리미엄 파트너",
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
                "audienceType": "성공한 법인 대표",
                "geographicArea": "대한민국"
              },
              "knowsAbout": [
                "절세플랜 설계 전문",
                "가업승계 컨설팅",
                "가족법인 설립 운영",
                "정책자금 신청 컨설팅",
                "기업인증 취득 지원",
                "세무최적화 전략",
                "법인세 절세방안",
                "상속세 승계세무",
                "벤처기업인증 컨설팅",
                "이노비즈 인증 지원"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "절세플랜 × 가업승계 × 가족법인 × 정책자금 × 기업인증 통합솔루션",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "맞춤형 절세플랜 설계",
                      "description": "법인세·소득세·상속세 통합 최적화 절세플랜 전문 설계"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "가족법인 설립 컨설팅",
                      "description": "상속세 50% 절감 가능한 최적 가족법인 구조 설계"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "정책자금 신청 지원",
                      "description": "95% 성공률의 정책자금 신청 전문 컨설팅 서비스"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "기업인증 취득 컨설팅",
                      "description": "벤처·이노비즈 등 기업인증 취득으로 세제혜택 극대화"
                    }
                  }
                ]
              },
              "memberOf": {
                "@type": "Organization",
                "name": "삼성생명보험",
                "description": "VVIP 패밀리오피스 서비스 제공"
              },
              // AI 검색엔진 최적화 추가 속성
              "sameAs": [
                "https://newsletter.familyoffices.vip",
                "https://familyoffices.vip/seminar",
                "https://familyoffices.vip/services"
              ],
              "potentialAction": {
                "@type": "ContactAction",
                "name": "무료 상담 예약",
                "url": "https://familyoffices.vip/contact",
                "target": "https://cal.com/familyoffice-s"
              }
            })
          }}
        />
        
        {/* 🤖 AI 검색엔진 전용 FAQ 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "패밀리오피스 서비스 비용은 얼마인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "성공한 기업가님의 자산 규모와 서비스 범위에 따라 맞춤 설계됩니다. 기본 컨설팅은 무료이며, 종합 패키지는 연간 자산 규모의 0.5-1.5% 수준입니다. 삼성생명 1000억+ 운용 실적을 바탕으로 투명한 수수료 체계를 제공합니다."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "중소기업도 패밀리오피스가 필요한가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "성장하는 중소중견기업일수록 패밀리오피스가 필수입니다. 기업 가치가 상승하기 전 미리 준비하면 절세 효과가 극대화됩니다. 특히 가업승계 준비는 5-10년 장기 계획이 필요하므로 빠른 시작이 유리합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "가업승계 세금을 줄이는 가장 효과적인 방법은?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "1) 기업가치 하락 시점에 지분 이전, 2) 가업상속공제 최대 활용(500억원), 3) 경영권 프리미엄 할인, 4) 신주발행 등을 통한 지분 희석이 핵심입니다. 법인보험 × 가업승계 통합솔루션으로 최적 타이밍을 분석합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "성공한 기업가들은 어떻게 자산관리를 하나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "1) 기업자산과 개인자산 분리 관리, 2) 글로벌 분산투자 포트폴리오, 3) 세금 효율적 구조 설계, 4) 차세대 교육과 승계 준비가 핵심입니다. 우리는 VVIP 고객들의 성공 패턴을 분석하여 맞춤 전략을 제공합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "개인자산 30억 이상 자산가도 패밀리오피스가 필요한가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "개인자산 30억 이상 고액자산가에게는 패밀리오피스가 필수입니다. 상속세 최적화, 글로벌 분산투자, 차세대 교육, 자산 보전 전략 등 복합적인 서비스가 필요하기 때문입니다. 특히 상속세율 50%를 고려하면 전문적인 세무설계가 매우 중요합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "자산가를 위한 상속세 절약 방법은 무엇인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "1) 생전증여를 통한 단계적 재산이전, 2) 가족신탁(Family Trust) 설립, 3) 증여세 비과세 한도 최대 활용, 4) 부동산 공시가격 대비 실거래가 차이 활용, 5) 생명보험을 통한 상속세 납부자금 준비가 핵심입니다. 자산 규모별 맞춤 전략을 제공합니다."
                  }
                }
              ]
            })
          }}
        />
        
        {/* 다중관점 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "성공한 CEO 전용 패밀리오피스",
              "description": "법인보험 × 가업승계 통합솔루션 SEO 최적화",
              "mainEntity": {
                "@type": "Organization",
                "name": "FamilyOffice S",
                "alternateName": "패밀리오피스 에스"
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "성공한 기업가 자산관리",
                  "sameAs": "https://familyoffices.vip/services"
                },
                {
                  "@type": "Thing",
                  "name": "성공한 CEO 가업승계",
                  "sameAs": "https://familyoffices.vip/program"
                },
                {
                  "@type": "Thing",
                  "name": "고액자산가 전용 자산관리",
                  "description": "개인자산 30억원 이상 자산가 맞춤 솔루션"
                },
                {
                  "@type": "Thing",
                  "name": "자산가 상속세 최적화",
                  "description": "개인자산 상속세 절약 및 세무설계"
                }
              ],
              "keywords": "성공한 CEO, 기업가, 경영진, 고액자산가, 개인자산 30억, 가업승계, 자산관리, 상속세 최적화, VVIP, 패밀리오피스",
              "inLanguage": "ko-KR",
              "isPartOf": {
                "@type": "WebSite",
                "url": "https://familyoffices.vip"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable}`} style={{ fontOpticalSizing: 'auto' }}>
        <ErrorBoundary>
          <DomainMigrationBanner />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SEOErrorBoundary>
              {children}
            </SEOErrorBoundary>
            {/* <AIChatFloating /> */}
            <ChannelTalk />
            <Toaster />
            <Analytics />
            <WebVitalsTracker />
            <KoreanPerformanceTracker />
            <KakaoPixel 
              pixelId={process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID || ''} 
              debug={process.env.NODE_ENV === 'development'} 
            />
            <KakaoSDK
              javascriptKey={process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || ''}
              debug={true}
            />
            <ExternalScripts />
            <DebugStyles />
            {/* SEO 구조화 데이터 */}
            <OrganizationStructuredData />
            
            {/* SEO 성과 추적 시스템 */}
            <SEOTrackerInit 
              config={{
                ...(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && { gaTrackingId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID }),
                customDomain: 'familyoffices.vip',
                trackingEnabled: process.env.NODE_ENV === 'production',
                reportingInterval: 'daily'
              }}
            />
            
            {/* SEO 모듈 백그라운드 프리로딩 */}
            <SEOModulePreloader />
            
            {/* 사용자 행동 추적 스크립트 */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // 사용자 행동 분석 모니터링
                  if (typeof window !== 'undefined') {
                    window.FamilyOfficeSEO = {
                      version: '1.0',
                      solution: '법인보험 × 가업승계 통합솔루션',
                      target: '성공한 법인 대표',
                      initialized: new Date().toISOString()
                    };
                    
                    // 사용자 행동 추적
                    window.addEventListener('load', function() {
                      const userProfile = {
                        referral: document.referrer || 'direct',
                        device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
                        screen: window.innerWidth > 1920 ? 'premium' : 'standard',
                        performance: performance.now() < 3000 ? 'fast' : 'slow'
                      };
                      
                      console.log('FamilyOffice User Profile:', userProfile);
                    });
                  }
                `
              }}
            />
          </ThemeProvider>
        </ErrorBoundary>
        
        {/* Vercel Analytics & Speed Insights */}
        <VercelAnalytics />
        <SpeedInsights />
        
        {/* Vercel Toolbar 비활성화 JavaScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Vercel Toolbar 완전 제거 및 차단
              if (typeof window !== 'undefined') {
                // 환경 변수로 비활성화
                window.VERCEL_TOOLBAR_ENABLED = false;
                window.__NEXT_DATA__ = window.__NEXT_DATA__ || {};
                window.__NEXT_DATA__.env = window.__NEXT_DATA__.env || {};
                window.__NEXT_DATA__.env.VERCEL_TOOLBAR = false;
                
                // Flag 설정으로 비활성화
                window.NEXT_PUBLIC_FLAGS = window.NEXT_PUBLIC_FLAGS || {};
                window.NEXT_PUBLIC_FLAGS.vercel_toolbar = false;
                window.__vercel_toolbar_disabled = true;
                
                // Vercel 스크립트 로딩 차단
                const originalCreateElement = document.createElement;
                document.createElement = function(tagName) {
                  const element = originalCreateElement.call(this, tagName);
                  if (tagName.toLowerCase() === 'script' && element.src && element.src.includes('vercel')) {
                    element.src = '';
                    return element;
                  }
                  return element;
                };
                
                // 기존 toolbar 요소 제거
                const removeToolbar = () => {
                  const toolbars = document.querySelectorAll('[data-vercel-toolbar], #vercel-toolbar, .vercel-toolbar, iframe[src*="vercel"], script[src*="vercel"], [class*="vercel-toolbar"]');
                  toolbars.forEach(el => {
                    el.remove();
                    el.style.display = 'none !important';
                  });
                  
                  // Remove any Vercel-related classes from body
                  if (document.body) {
                    document.body.classList.remove('vercel-toolbar-enabled');
                  }
                };
                
                // 즉시 실행
                removeToolbar();
                
                // 페이지 로드 시 실행
                document.addEventListener('DOMContentLoaded', removeToolbar);
                window.addEventListener('load', removeToolbar);
                
                // MutationObserver로 동적 생성 감지 및 제거
                if (window.MutationObserver) {
                  const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                      mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && (
                          node.hasAttribute && node.hasAttribute('data-vercel-toolbar') ||
                          node.id === 'vercel-toolbar' ||
                          node.className && node.className.includes('vercel-toolbar') ||
                          (node.tagName === 'SCRIPT' && node.src && node.src.includes('vercel')) ||
                          (node.tagName === 'IFRAME' && node.src && node.src.includes('vercel'))
                        )) {
                          node.remove();
                        }
                      });
                    });
                  });
                  observer.observe(document.documentElement, { 
                    childList: true, 
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['data-vercel-toolbar', 'class', 'id']
                  });
                }
                
                // 주기적 검사
                setInterval(removeToolbar, 1000);
              }
            `
          }}
        />
      </body>
    </html>
  );
}