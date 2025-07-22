import type { Metadata } from 'next'

// 기본 메타데이터 설정
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://familyoffices.vip'),
  
  title: {
    default: "FamilyOffice S | 중소중견기업 법인 대표 전용 자산관리",
    template: "%s | FamilyOffice S"
  },
  description: "비상장기업, 기술기업, 제조업 등 다양한 업종 법인 대표를 위한 프리미엄 자산관리. 정책자금부터 단체보험, 경영인정기보험, 중대재해처벌법 대응까지 500억원+ 관리 실적의 FamilyOffice S",
  
  keywords: [
    "비상장기업 자산관리", "비상장기업 대표 재무설계", "매출 50억~300억 비상장기업", "비상장 중견기업 대표 자산관리", 
    "비상장 기업 오너 자산관리", "비상장기업 오너 재무관리", "비상장 중견기업 자금운용", "비상장기업 대표 상속설계",
    "비상장기업 CEO 자산관리", "비상장기업 재무상담", "비상장 중견기업 오너 자산설계", "비상장기업 승계 설계",
    "기술기업 자산관리", "스타트업 자산관리", "기술력 있는 중소기업", "벤처기업 자산관리", "이노비즈 기업 자산관리",
    "제조업 자산관리", "건설업 자산관리", "화학업 자산관리", "위험업종 자산관리", "산업재해 리스크 관리",
    "법인 단체보험", "기업 리스크 헷지", "제조업 단체보험", "건설업 단체보험", "위험업종 보험설계",
    "경영인정기보험", "CEO 정기보험", "임원진 보험설계", "경영진 생명보험", "법인 임원보험",
    "중대재해처벌법", "중대재해처벌법 대응", "중대재해 예방", "중대재해 보험", "중대재해 리스크 관리",
    "패밀리오피스", "비상장기업 자산관리", "상속설계", "재무설계", "투자자문", "세무최적화"
  ],
  
  openGraph: {
    type: "website",
    siteName: "FamilyOffice S",
    title: "FamilyOffice S | 중소중견기업 법인 대표 전용 자산관리",
    description: "비상장기업, 기술기업, 제조업 등 다양한 업종 법인 대표를 위한 프리미엄 자산관리. 중대재해처벌법 대응까지",
    url: "https://familyoffices.vip",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FamilyOffice S - 중소중견기업 법인 대표 전용 자산관리 서비스"
      }
    ],
    locale: "ko_KR"
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@familyoffices",
    title: "FamilyOffice S | 중소중견기업 법인 대표 전용 자산관리",
    description: "비상장기업, 기술기업, 제조업 등 다양한 업종 법인 대표를 위한 프리미엄 자산관리. 중대재해처벌법 대응까지",
    images: ["/og-image.jpg"]
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  other: {
    "locale": "ko_KR",
    "naver-site-verification": "your-naver-verification-code",
    "NaverBot": "All",
    "Daumoa": "index,follow",
  },
}

// 페이지별 메타데이터 생성 함수
export function generateMetadata(
  title: string,
  description: string,
  keywords: string[] = [],
  image?: string
): Metadata {
  return {
    title,
    description,
    keywords: [...defaultMetadata.keywords!, ...keywords],
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: image ? [image] : defaultMetadata.twitter?.images,
    },
  }
}

// 구조화된 데이터 생성
export function generateStructuredData(type: 'Organization' | 'WebSite' | 'Service' | 'FAQPage') {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "FamilyOffice S",
    "url": "https://familyoffices.vip",
    "logo": "https://familyoffices.vip/logo.png",
    "description": "중소중견기업 법인 대표 전용 자산관리 서비스",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressLocality": "Seoul"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+82-2-1234-5678",
      "email": "contact@familyoffices.vip"
    }
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        "foundingDate": "2020",
        "numberOfEmployees": "10-50",
        "serviceArea": "South Korea",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "자산관리 서비스",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "비상장기업 자산관리"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "상속설계"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "재무설계"
              }
            }
          ]
        }
      }
    
    case 'WebSite':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "FamilyOffice S",
        "url": "https://familyoffices.vip",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://familyoffices.vip/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    
    case 'Service':
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "중소중견기업 자산관리",
        "description": "비상장기업, 기술기업, 제조업 등 다양한 업종 법인 대표를 위한 프리미엄 자산관리 서비스",
        "provider": {
          "@type": "Organization",
          "name": "FamilyOffice S"
        },
        "serviceType": "자산관리",
        "areaServed": "KR"
      }
    
    case 'FAQPage':
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "비상장기업 자산관리는 어떻게 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "비상장기업의 특성을 고려한 맞춤형 자산관리 전략을 수립합니다. 개인자산과 법인자산 분리, 세무최적화, 상속설계 등을 종합적으로 제공합니다."
            }
          },
          {
            "@type": "Question", 
            "name": "중대재해처벌법 대응은 어떻게 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "중대재해처벌법에 따른 경영책임자 처벌 대비를 위한 보험설계와 안전관리체계 구축을 지원합니다."
            }
          }
        ]
      }
    
    default:
      return baseData
  }
}

// 사이트맵 URL 생성
export function generateSitemapUrls() {
  const baseUrl = 'https://familyoffices.vip'
  
  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/program`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/seminar`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/success-stories`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]
}