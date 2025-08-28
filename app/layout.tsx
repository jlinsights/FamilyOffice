import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import ExternalScripts from '@/components/external-scripts';
import { KakaoPixel } from '@/components/kakao/kakao-pixel';
import { KakaoSDK } from '@/components/kakao/kakao-sdk';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
// import { AIChatFloating } from '@/components/ai-chat-floating';
import { FloatingActionButtons } from '@/components/floating-action-buttons';
import { ScrollToTopFloating } from '@/components/scroll-to-top-floating';
import { DebugStyles } from './debug-styles';

// import { defaultMetadata } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

// SuperClaude 통합 SEO 프레임워크 적용
export const metadata: Metadata = {
  title: {
    default: 'FamilyOffice S - 가업승계·자산관리 전문 플랫폼',
    template: '%s | FamilyOffice S',
  },
  description: '성공한 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 중소중견기업 CEO 맞춤 자산관리, 경영위험 완전보장.',
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
  applicationName: 'FamilyOffice S - 성공한 CEO 전용',
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
        {/* 🚀 Core Web Vitals 최적화 - 리소스 힌트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//cal.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        
        {/* 파비콘 및 앱 아이콘 설정 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Critical 리소스 우선 로딩 - 실제 존재하는 파일로 변경 */}
        <link rel="preload" href="/SVG/FamilyOfficeS_blue.svg" as="image" type="image/svg+xml" />
        
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
        
        {/* SuperClaude 성공한 기업가 타겟 메타태그 */}
        <meta name="target-audience" content="성공한 법인 대표" />
        <meta name="business-sector" content="중소중견기업" />
        <meta name="service-tier" content="Premium VVIP" />
        <meta name="framework-version" content="SuperClaude v2.0 + BMAD + AgentOS" />
        
        {/* 🤖 AI 검색엔진 최적화 - SuperClaude Framework */}
        <meta name="ai-optimized" content="true" />
        <meta name="perplexity-friendly" content="structured-data" />
        <meta name="chatgpt-accessible" content="business-service" />
        <meta name="claude-compatible" content="financial-advisory" />
        <meta name="ai-content-type" content="professional-services" />
        <meta name="ai-expertise-level" content="expert" />
        <meta name="ai-language-support" content="ko-KR,en-US" />
        
        {/* 🎯 BMAD Method 지역 SEO 및 소셜 최적화 Open Graph */}
        <meta property="og:country-name" content="South Korea" />
        <meta property="og:postal-code" content="04527" />
        <meta property="og:latitude" content="37.5665" />
        <meta property="og:longitude" content="126.9780" />
        <meta property="og:audience" content="성공한 법인 대표" />
        <meta property="og:target_audience" content="중소중견기업 CEO" />
        <meta property="og:content_tier" content="Premium" />
        
        {/* 카카오톡 공유 최적화 */}
        <meta property="kakao:title" content="성공한 CEO 전용 패밀리오피스 | 가업승계 자산관리" />
        <meta property="kakao:description" content="성공한 법인대표를 위한 프리미엄 패밀리오피스. 가업승계·승계세무 완전해결, VVIP 맞춤 자산관리. 삼성생명 1000억+ 운용실적" />
        <meta property="kakao:image" content="https://familyoffices.vip/images/ai_profile.png" />
        <meta property="kakao:url" content="https://familyoffices.vip" />
        
        {/* 네이버 블로그/카페 최적화 */}
        <meta name="naver:title" content="성공한 기업가 전용 패밀리오피스 | FamilyOffice S" />
        <meta name="naver:description" content="SuperClaude BMAD Method 적용 패밀리오피스. 성공한 법인대표 전용 가업승계·자산관리 완전해결" />
        <meta name="naver:image" content="https://familyoffices.vip/images/ai_profile.png" />
        
        {/* LinkedIn 비즈니스 네트워크 최적화 */}
        <meta property="linkedin:title" content="성공한 CEO를 위한 패밀리오피스 | 가업승계 전문" />
        <meta property="linkedin:description" content="중소중견기업 CEO 전용 프리미엄 자산관리. 가업승계부터 세무최적화까지 원스톱 솔루션" />
        <meta property="linkedin:image" content="https://familyoffices.vip/images/ai_profile.png" />
        
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
        
        {/* 🤖 AI 검색엔진 최적화 구조화 데이터 - SuperClaude + BMAD Method */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "성공한 CEO 전용 패밀리오피스 FamilyOffice S",
              "description": "SuperClaude AI + BMAD Method 기반 성공한 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 기업가 맞춤 자산관리, 삼성생명 1000억+ 운용실적",
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
                "SuperClaude AI 자산분석",
                "성공한 CEO 자산관리",
                "경험많은 기업가 가업승계",
                "VVIP 전용 패밀리오피스",
                "법인대표 세무전략",
                "기업오너 승계준비",
                "AI 기반 재무설계",
                "차세대 디지털 자산관리"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "SuperClaude AI + BMAD Method 맞춤 서비스",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SuperClaude AI 자산분석",
                      "description": "AI와 전문가가 협업하는 차세대 자산분석 시스템"
                    }
                  },
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
                    "text": "1) 기업가치 하락 시점에 지분 이전, 2) 가업상속공제 최대 활용(500억원), 3) 경영권 프리미엄 할인, 4) 신주발행 등을 통한 지분 희석이 핵심입니다. SuperClaude BMAD Method로 최적 타이밍을 분석합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "성공한 기업가들은 어떻게 자산관리를 하나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "1) 기업자산과 개인자산 분리 관리, 2) 글로벌 분산투자 포트폴리오, 3) 세금 효율적 구조 설계, 4) 차세대 교육과 승계 준비가 핵심입니다. 우리는 VVIP 고객들의 성공 패턴을 분석하여 맞춤 전략을 제공합니다."
                  }
                }
              ]
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
              "name": "성공한 CEO 전용 패밀리오피스",
              "description": "SuperClaude + BMAD Method + AgentOS 통합 SEO 최적화",
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
                }
              ],
              "keywords": "성공한 CEO, 기업가, 경영진, 가업승계, 자산관리, VVIP, 패밀리오피스",
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
            <ScrollToTopFloating />
            <FloatingActionButtons />
            <Toaster />
            <Analytics />
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
            
            {/* SuperClaude 성능 추적 스크립트 */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // SuperClaude SEO 성능 모니터링
                  if (typeof window !== 'undefined') {
                    window.SuperClaudeSEO = {
                      version: '2.0',
                      framework: 'BMAD + AgentOS',
                      target: '성공한 법인 대표',
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