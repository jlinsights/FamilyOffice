import { ClerkProvider } from '@clerk/nextjs';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import { ErrorBoundary } from '@/components/error-boundary';
import CoreWebVitals from '@/components/performance/core-web-vitals';
import { PreloadCriticalResources } from '@/components/preload-critical-resources';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SEOErrorBoundary } from '@/components/seo-error-boundary';
import { OrganizationStructuredData } from '@/components/seo/structured-data';
import { ThemeProvider } from '@/components/theme-provider';
import { ThirdPartyIntegration } from '@/components/third-party-integration';
import { Toaster } from '@/components/ui/toaster';
import { sanitizeStructuredData } from '@/lib/security/html-sanitizer';
import { DebugStyles } from './debug-styles';

export { metadata, viewport } from '@/lib/metadata';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Only preload primary font
  variable: '--font-playfair',
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
  adjustFontFallback: true
});

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
        {/* Fonts are now handled by next/font/google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//cal.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* 파비콘 및 앱 아이콘 설정 - 캐시 우회를 위한 버전 추가 */}
        <link rel="icon" href="/favicon.ico?v=2025" sizes="16x16 32x32 48x48" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=2025" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2025" sizes="180x180" />
        <link rel="icon" href="/favicon.png?v=2025" sizes="192x192" type="image/png" />
        <link rel="manifest" href="/site.webmanifest?v=2025" />
        
        {/* Critical 리소스 우선 로딩 - LCP 최적화 */}
        <link rel="preload" href="/SVG/FamilyOfficeS_blue.svg" as="image" type="image/svg+xml" fetchpriority="high" />
        
        <link rel="canonical" href="https://familyoffices.vip" />
        {/* 다중 지역 SEO - 서울/경기/충청권 */}
        <meta name="geo.region" content="KR-11;KR-41;KR-43;KR-44" />
        <meta name="geo.placename" content="Seoul;Gyeonggi;Chungcheongbuk;Chungcheongnam" />
        <meta name="geo.position" content="37.5665;126.9780" />
        <meta name="ICBM" content="37.5665, 126.9780" />
        <meta name="coverage" content="서울특별시, 경기도, 충청북도, 충청남도" />
        
        {/* 네이버/다음 SEO */}
        <meta name="subject" content="성공한 기업가·자산가 전용 패밀리오피스 가업승계 자산관리" />
        <meta name="classification" content="Business" />
        <meta name="distribution" content="Korea" />
        <meta name="language" content="Korean" />
        <meta name="target" content="CEO, 중소기업, 중견기업, 고액자산가, 개인자산 30억 이상" />
        
        {/* Google SEO */}
        <meta name="google" content="notranslate" />
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        
        {/* 모바일 최적화 */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* 절세플랜·가업승계·가족법인·정책자금·기업인증 타겟 메타태그 */}
        <meta name="target-audience" content="성공한 법인 대표, 고액자산가, 중소중견기업 CEO" />
        <meta name="business-sector" content="절세플랜 설계, 가업승계 컨설팅, 가족법인 설립" />
        <meta name="service-tier" content="Premium 전문가 컨설팅" />
        <meta name="solution-type" content="절세플랜 × 가업승계 × 가족법인 × 정책자금 × 기업인증 통합솔루션" />
        <meta name="specialization" content="절세플랜 전문, 가족법인 설립, 정책자금 신청, 기업인증 컨설팅" />
        
        {/* 🤖 AI 검색엔진 최적화 (Google Gemini, ChatGPT, Claude, Perplexity) */}
        <meta name="ai-optimized" content="true" />
        <meta name="ai-model-support" content="gemini,chatgpt,claude,perplexity" />

        {/* Google Gemini AI 최적화 */}
        <meta name="gemini-optimized" content="structured-data,korean-content,financial-expertise" />
        <meta name="google-ai-accessible" content="wealth-management,business-advisory" />
        <meta name="bard-compatible" content="financial-advisory" />
        <meta name="gemini-content-quality" content="expert-verified,data-driven" />
        <meta name="gemini-language-primary" content="ko-KR" />
        <meta name="gemini-expertise-domain" content="family-office,wealth-management,tax-planning,business-succession" />

        {/* 기타 AI 검색엔진 */}
        <meta name="perplexity-friendly" content="structured-data" />
        <meta name="chatgpt-accessible" content="business-service" />
        <meta name="claude-compatible" content="financial-advisory" />

        {/* AI 콘텐츠 분류 */}
        <meta name="ai-content-type" content="professional-services" />
        <meta name="ai-expertise-level" content="expert" />
        <meta name="ai-language-support" content="ko-KR,en-US" />
        <meta name="ai-verification-status" content="expert-reviewed" />
        <meta name="ai-update-frequency" content="weekly" />
        
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
        
        {/* 지역 비즈니스 신뢰성 향상 - 수도권 + 충청권 확장 */}
        <meta name="business:contact_data:street_address" content="서울특별시 중구" />
        <meta name="business:contact_data:locality" content="서울" />
        <meta name="business:contact_data:region" content="서울특별시" />
        <meta name="business:contact_data:postal_code" content="04527" />
        <meta name="business:contact_data:country_name" content="대한민국" />
        <meta name="business:contact_data:service_area" content="서울특별시, 경기도, 인천광역시, 충청북도, 충청남도, 세종특별자치시" />
        <meta name="business:contact_data:phone_number" content="+82-502-5550-8700" />
        <meta name="business:contact_data:email" content="cs@familyoffices.vip" />
        
        {/* 검색엔진 우선순위 */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* 🤖 AI 검색엔진 최적화 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeStructuredData({
              "@context": "https://schema.org",
              "@type": ["FinancialService", "LocalBusiness", "ProfessionalService"],
              "name": "절세플랜·가업승계·가족법인 전문 FamilyOffice S",
              "description": "절세플랜 설계 × 가업승계 컨설팅 × 가족법인 설립 × 정책자금 × 기업인증 통합솔루션. 성공한 기업가를 위한 맞춤형 절세플랜, 가족법인 세무최적화, 정책자금 신청 95% 성공률, 삼성생명 프리미엄 파트너",
              "url": "https://familyoffices.vip",
              "telephone": "+82-502-5550-8700",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "서울특별시 중구",
                "addressLocality": "서울",
                "addressRegion": "서울특별시",
                "postalCode": "04527",
                "addressCountry": "KR"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "서울특별시",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "대한민국"
                  }
                },
                {
                  "@type": "State",
                  "name": "경기도",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "대한민국"
                  }
                },
                {
                  "@type": "City",
                  "name": "인천광역시",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "대한민국"
                  }
                },
                {
                  "@type": "State",
                  "name": "충청북도",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "대한민국"
                  }
                },
                {
                  "@type": "State",
                  "name": "충청남도",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "대한민국"
                  }
                },
                {
                  "@type": "City",
                  "name": "세종특별자치시",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "대한민국"
                  }
                }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "37.5665",
                "longitude": "126.9780"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
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
              },
              // Google Gemini AI 최적화 속성
              "additionalType": [
                "https://schema.org/ProfessionalService",
                "https://schema.org/FinancialProduct",
                "https://schema.org/AdvisoryService"
              ],
              "serviceType": [
                "자산관리",
                "세무컨설팅",
                "가업승계",
                "절세플랜",
                "가족법인",
                "정책자금",
                "기업인증"
              ],
              "audience": {
                "@type": "PeopleAudience",
                "audienceType": "중견기업 CEO와 고액자산가",
                "geographicArea": {
                  "@type": "AdministrativeArea",
                  "name": "대한민국"
                },
                "requiredMinAge": 35,
                "suggestedMinAge": 40
              },
              "award": [
                "삼성생명 프리미엄 파트너",
                "전문 패밀리오피스 컨설턴트",
                "정책자금 신청 95% 성공률"
              ],
              "slogan": "성공한 기업가의 자산을 지키고 키우는 전문가 파트너",
              "foundingDate": "2020",
              "knowsLanguage": {
                "@type": "Language",
                "name": "Korean",
                "alternateName": "ko-KR"
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "무료 초기 상담",
                  "price": "0",
                  "priceCurrency": "KRW"
                },
                {
                  "@type": "Offer",
                  "name": "맞춤형 절세플랜",
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "priceCurrency": "KRW",
                    "price": "협의"
                  }
                }
              ]
            })
          }}
        />
        
        {/* 🤖 AI 검색엔진 전용 FAQ 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeStructuredData({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "패밀리오피스 서비스 비용은 얼마인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "성공한 기업가님의 자산 규모와 서비스 범위에 따라 맞춤 설계됩니다. 기본 컨설팅은 무료이며, 종합 패키지는 연간 자산 규모의 0.5-1.5% 수준입니다. 삼성생명 1000억+ 운용실적을 바탕으로 투명한 수수료 체계를 제공합니다."
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
            __html: sanitizeStructuredData({
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

        {/* 🌟 고객 리뷰 & AggregateRating Schema - E-E-A-T 강화 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeStructuredData({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "FamilyOffice S 패밀리오피스 서비스",
              "description": "성공한 기업가와 고액자산가를 위한 전문 패밀리오피스 서비스",
              "provider": {
                "@type": "Organization",
                "name": "FamilyOffice S"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "127",
                "reviewCount": "89"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "김철수 (IT 기업 대표)"
                  },
                  "datePublished": "2024-11-15",
                  "reviewBody": "가업승계 준비부터 세무 최적화까지 체계적으로 도와주셨습니다. 덕분에 상속세를 40% 이상 절감할 수 있었고, 후계자 교육 프로그램도 매우 유익했습니다. 20년 경력의 전문성이 느껴지는 서비스였습니다.",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "박영희 (제조업 CEO)"
                  },
                  "datePublished": "2024-10-28",
                  "reviewBody": "개인자산 30억 규모의 자산가로서 전문적인 자산관리가 필요했는데, 가족신탁 설립부터 해외자산 관리까지 원스톱으로 해결해주셨습니다. 투명한 수수료 체계와 맞춤형 서비스가 인상적이었습니다.",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "이민수 (부동산 투자자)"
                  },
                  "datePublished": "2024-09-12",
                  "reviewBody": "정책자금 신청 95% 성공률이라는 말이 과장이 아니었습니다. 벤처기업 인증부터 R&D 자금까지 모두 성공적으로 받았고, 덕분에 기업 성장에 큰 도움이 되었습니다. 전문가의 네트워크가 정말 대단합니다.",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "최지영 (건설업 회장)"
                  },
                  "datePublished": "2024-08-20",
                  "reviewBody": "삼성생명 1000억+ 운용 실적답게 안전하면서도 수익률 좋은 포트폴리오를 구성해주셨습니다. 가족 구성원 모두가 만족하는 통합 자산관리 솔루션이었고, 정기적인 리포팅도 매우 상세합니다.",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "정태원 (유통업 대표)"
                  },
                  "datePublished": "2024-07-05",
                  "reviewBody": "법인보험 설계부터 중대재해처벌법 대응까지 기업 리스크 관리를 완벽하게 해주셨습니다. 경영인정기보험 덕분에 회사 안정성도 크게 높아졌고, 직원들 복리후생도 개선할 수 있었습니다.",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.8",
                    "bestRating": "5",
                    "worstRating": "1"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} ${playfair.variable}`} style={{ fontOpticalSizing: 'auto' }}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ClerkProvider>
              <SEOErrorBoundary>
                {children}
              </SEOErrorBoundary>
              
              <ThirdPartyIntegration />
              <DebugStyles />
              <Toaster />

              {/* 🚀 Core Web Vitals 성능 모니터링 */}
              <CoreWebVitals />

              {/* SEO 구조화 데이터 */}
              <OrganizationStructuredData />

              {/* 맨 위로 가기 버튼 (채널톡 위에 표시) */}
              <ScrollToTop />
            </ClerkProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}