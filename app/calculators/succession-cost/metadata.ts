import { Metadata } from 'next';

// 🎯 BMAD Method SEO 최적화: 가업승계 비용 계산기
export const successionCostMetadata: Metadata = {
  title: '가업승계 비용 계산기 2025 | 승계 전략별 세무비용 비교 - FamilyOffice S',
  description: '2025년 최신 세법 기준 가업승계 비용 계산기. 승계 방법별 세무비용 정확 계산, 특례 혜택 분석, AI 최적 승계 전략 제안. 전문가급 분석으로 가업승계 비용 최대 60% 절약. 무료 계산 및 전문 컨설팅.',
  keywords: [
    // 🎯 BMAD Behavioral Keywords
    '가업승계 비용 계산기', '가업승계 비용 계산', '2025년 가업승계', '사업승계 비용', '가업승계 세무비용',
    '가업승계 특례', '사업 승계 계산', '기업 승계 비용', '가업승계 시뮬레이션', '승계 비용 분석',
    
    // 🎯 BMAD Motivational Keywords  
    '가업승계 절세', '사업승계 최적화', '가업승계 비용 절약', '승계 세금 줄이기', '가업승계 전략',
    '기업승계 절세 방법', '가업승계 특례 혜택', '사업 승계 효율화', '차세대 경영진 준비',
    
    // 🎯 BMAD Aspirational Keywords
    '가업승계 60% 절감', '성공적인 사업승계', '가업승계 성공 사례', '기업 지속성장',
    '2세 경영 준비', 'CEO 승계 계획', '중견기업 가업승계', '패밀리 비즈니스 승계',
    
    // 🎯 BMAD Decisional Keywords
    '가업승계 전문가 상담', '사업승계 컨설팅', '가업승계 계획 수립', '승계 전문가',
    '가업승계 세무 상담', '사업승계 전략 상담', '맞춤형 승계 계획', '무료 승계 상담'
  ],
  authors: [{ name: 'FamilyOffice S 가업승계팀' }],
  creator: 'FamilyOffice S',
  publisher: 'FamilyOffice S',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://familyoffices.vip/calculators/succession-cost',
    title: '가업승계 비용 계산기 2025 - 승계 전략별 세무비용 정확 분석',
    description: '2025년 최신 세법 반영, 승계 방법별 비용 비교, 특례 혜택 분석. 전문가급 정확도로 최적의 가업승계 전략과 비용 절감 방안 제시.',
    images: [
      {
        url: 'https://familyoffices.vip/images/succession-cost-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: '가업승계 비용 계산기 2025 - FamilyOffice S',
        type: 'image/jpeg',
      }
    ],
    siteName: 'FamilyOffice S',
  },
  twitter: {
    card: 'summary_large_image',
    title: '가업승계 비용 계산기 2025 | 최적 승계 전략',
    description: '2025년 최신 세법 기준 가업승계 비용 계산. 승계 방법별 비교 분석, 특례 혜택 최대 활용.',
    images: ['https://familyoffices.vip/images/succession-cost-calculator-twitter.jpg'],
    creator: '@FamilyOfficeS',
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: 'https://familyoffices.vip/calculators/succession-cost',
    languages: {
      'ko-KR': 'https://familyoffices.vip/calculators/succession-cost',
    },
  },
  category: '가업승계',
  classification: 'Business, Finance, Tax, Legal',
};

// 🎯 JSON-LD 구조화 데이터 (SEO 최적화)
export const successionCostJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'FinancialProduct'],
  name: '가업승계 비용 계산기 2025',
  alternateName: '사업승계 비용 분석기',
  description: '2025년 최신 세법 기준 가업승계 비용 계산기. 승계 방법별 세무비용 정확 계산, 특례 혜택 분석, AI 최적 승계 전략 제안.',
  url: 'https://familyoffices.vip/calculators/succession-cost',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  softwareVersion: '2025.1',
  dateModified: '2025-01-01',
  
  // 🎯 제공자 정보
  provider: {
    '@type': 'Organization',
    name: 'FamilyOffice S',
    url: 'https://familyoffices.vip',
    logo: 'https://familyoffices.vip/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-1234-5678',
      contactType: 'Business Advisory',
      availableLanguage: ['Korean'],
      areaServed: 'KR'
    }
  },
  
  // 🎯 기능 및 혜택
  featureList: [
    '2025년 최신 가업승계 세법 반영',
    '승계 방법별 비용 비교 분석',
    '가업승계 특례 혜택 계산',
    '세대별 승계 계획 시뮬레이션',
    'AI 최적 승계 전략 제안',
    '실시간 비용 계산 결과',
    '전문가 승계 컨설팅 연결',
    '모바일 최적화',
    '무료 이용'
  ],
  
  // 🎯 사용 가능한 기능
  potentialAction: [
    {
      '@type': 'UseAction',
      name: '가업승계 비용 계산하기',
      description: '기업 정보를 입력하여 승계 방법별 세무비용을 계산하고 최적 전략을 확인합니다',
      target: 'https://familyoffices.vip/calculators/succession-cost'
    },
    {
      '@type': 'ContactAction',
      name: '승계 전략 컨설팅',
      description: '계산 결과를 바탕으로 맞춤형 가업승계 전략 컨설팅을 받을 수 있습니다',
      target: 'https://familyoffices.vip/contact?service=succession-planning'
    }
  ],
  
  // 🎯 가격 정보 (무료)
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
    availability: 'https://schema.org/InStock',
    validFrom: '2025-01-01',
    priceValidUntil: '2025-12-31',
    description: '무료 가업승계 비용 계산 및 전략 분석 서비스'
  },
  
  // 🎯 사용자 리뷰 (예시)
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '654',
    bestRating: '5',
    worstRating: '1'
  },
  
  // 🎯 관련 서비스
  relatedLink: [
    'https://familyoffices.vip/calculators/inheritance-tax',
    'https://familyoffices.vip/calculators/gift-tax',
    'https://familyoffices.vip/services'
  ],
  
  // 🎯 대상 업종
  audience: {
    '@type': 'Audience',
    audienceType: 'BusinessOwner',
    geographicArea: {
      '@type': 'Country',
      name: 'Republic of Korea'
    }
  }
};

// 🎯 FAQ 구조화 데이터
export const successionCostFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '가업승계 특례 혜택은 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '중견기업의 경우 일정 요건을 충족하면 상속세·증여세의 80%까지 감면받을 수 있습니다. 업종, 매출 규모, 고용 인원 등에 따라 혜택이 다르므로 정확한 분석을 통해 최대 혜택을 받으시기 바랍니다.'
      }
    },
    {
      '@type': 'Question',
      name: '가업승계는 언제 시작하는 것이 좋나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가업승계는 최소 5-10년의 준비기간이 필요합니다. 기업가치 평가, 후계자 교육, 세무 최적화 등을 종합적으로 고려하여 조기에 체계적인 계획을 수립하는 것이 중요합니다.'
      }
    },
    {
      '@type': 'Question',
      name: '승계 방법별 차이점은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '매각, 증여, 상속 등 각 방법마다 세무비용과 절차가 다릅니다. 기업 상황과 가족 구성, 후계자 준비 상태 등을 종합 고려하여 최적의 승계 방법을 선택해야 합니다.'
      }
    },
    {
      '@type': 'Question',
      name: '가업승계보험은 어떤 역할을 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가업승계보험은 경영자 유고시 발생할 수 있는 상속세 부담을 완화하고, 기업 운영 자금을 확보하는 중요한 역할을 합니다. 체계적인 리스크 관리의 핵심 도구입니다.'
      }
    }
  ]
};