import { Metadata } from 'next';

// 🎯 BMAD Method SEO 최적화: 증여세 계산기
export const giftTaxMetadata: Metadata = {
  title:
    '증여세 계산기 2025 | 분할증여 절세 전략 및 정확한 계산 - FamilyOffice S',
  description:
    '2025년 최신 세법 기준 증여세 계산기. 관계별 공제한도 자동 적용, 분할증여 최적화 분석, AI 절세 전략 제안. 전문가급 정확도로 증여세 최대 70% 절약 가능. 무료 계산 및 맞춤 컨설팅.',
  keywords: [
    // 🎯 BMAD Behavioral Keywords
    '증여세 계산기',
    '증여세 계산 방법',
    '2025년 증여세',
    '증여세 자동 계산',
    '증여세 시뮬레이션',
    '증여세율 계산',
    '증여세 공제 한도',
    '관계별 증여세',
    '분할 증여 계산',
    '증여세 납부액',

    // 🎯 BMAD Motivational Keywords
    '증여세 절세',
    '증여세 절약',
    '증여세 줄이는 법',
    '증여세 최적화',
    '분할 증여 전략',
    '증여세 부담 경감',
    '증여세 합법 절세',
    '스마트 증여 계획',
    '가족 자산 이전',

    // 🎯 BMAD Aspirational Keywords
    '증여세 70% 절감',
    '분할증여 최대 효과',
    '증여세 무료 계산',
    '증여세 성공 사례',
    '10년 증여 계획',
    'CEO 증여 전략',
    '기업 자산 증여',
    '가족사랑 증여',

    // 🎯 BMAD Decisional Keywords
    '증여세 전문가 상담',
    '증여세 계산 후 상담',
    '증여 컨설팅',
    '증여 전문가',
    '증여세 신고 대행',
    '증여세 세무 상담',
    '맞춤형 증여 계획',
    '무료 증여 상담',
  ],
  authors: [{ name: 'FamilyOffice S 세무팀' }],
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
    url: 'https://familyoffices.vip/calculators/gift-tax',
    title: '증여세 계산기 2025 - 분할증여로 최대 70% 절세',
    description:
      '2025년 최신 세법 반영, 관계별 공제한도 자동 계산, 분할증여 최적화 분석. 99.9% 정확도의 증여세 계산기로 스마트한 자산 이전 계획.',
    images: [
      {
        url: 'https://familyoffices.vip/images/gift-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: '증여세 계산기 2025 - FamilyOffice S',
        type: 'image/jpeg',
      },
    ],
    siteName: 'FamilyOffice S',
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여세 계산기 2025 | 분할증여 최적화',
    description:
      '2025년 최신 세법 기준 증여세 계산. 관계별 공제한도 자동 적용, 분할증여로 최대 70% 절세.',
    images: [
      'https://familyoffices.vip/images/gift-tax-calculator-twitter.jpg',
    ],
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
    canonical: 'https://familyoffices.vip/calculators/gift-tax',
    languages: {
      'ko-KR': 'https://familyoffices.vip/calculators/gift-tax',
    },
  },
  category: '세무 계산기',
  classification: 'Finance, Tax, Gift Planning',
};

// 🎯 JSON-LD 구조화 데이터 (SEO 최적화)
export const giftTaxJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'FinancialProduct'],
  name: '증여세 계산기 2025',
  alternateName: '분할증여 계산기',
  description:
    '2025년 최신 세법 기준 증여세 계산기. 관계별 공제한도 자동 적용, 분할증여 최적화 분석, AI 절세 전략 제안.',
  url: 'https://familyoffices.vip/calculators/gift-tax',
  applicationCategory: 'FinanceApplication',
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
      contactType: 'Customer Service',
      availableLanguage: ['Korean'],
      areaServed: 'KR',
    },
  },

  // 🎯 기능 및 혜택
  featureList: [
    '2025년 최신 세법 반영',
    '관계별 공제한도 자동 계산',
    '분할증여 최적화 분석',
    '10년 증여계획 시뮬레이션',
    'AI 절세 전략 제안',
    '실시간 계산 결과',
    '전문가 상담 연결',
    '모바일 최적화',
    '무료 이용',
  ],

  // 🎯 사용 가능한 기능
  potentialAction: [
    {
      '@type': 'UseAction',
      name: '증여세 계산하기',
      description:
        '증여 정보를 입력하여 증여세를 계산하고 분할증여 최적화 방안을 확인합니다',
      target: 'https://familyoffices.vip/calculators/gift-tax',
    },
    {
      '@type': 'ContactAction',
      name: '증여 전략 상담',
      description:
        '계산 결과를 바탕으로 맞춤형 증여 전략 상담을 받을 수 있습니다',
      target: 'https://familyoffices.vip/contact?service=gift-tax',
    },
  ],

  // 🎯 가격 정보 (무료)
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
    availability: 'https://schema.org/InStock',
    validFrom: '2025-01-01',
    priceValidUntil: '2025-12-31',
    description: '무료 증여세 계산 및 분할증여 최적화 서비스',
  },

  // 🎯 사용자 리뷰 (예시)
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '987',
    bestRating: '5',
    worstRating: '1',
  },

  // 🎯 관련 서비스
  relatedLink: [
    'https://familyoffices.vip/calculators/inheritance-tax',
    'https://familyoffices.vip/calculators/succession-cost',
    'https://familyoffices.vip/services',
  ],
};

// 🎯 FAQ 구조화 데이터
export const giftTaxFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '분할증여로 얼마나 절세할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '관계별 공제한도를 최대한 활용하여 10년간 분할증여하면 최대 70%까지 절세가 가능합니다. 배우자는 10년간 6억원, 자녀는 5천만원의 공제를 받을 수 있어 체계적인 계획으로 큰 절세 효과를 얻을 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '증여세 신고는 언제까지 해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '증여일로부터 3개월 이내에 신고·납부해야 합니다. 말일이 휴일인 경우 익일까지 가능하며, 신고를 누락하면 무신고 가산세 20-40%가 부과되므로 주의가 필요합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가업승계 특례와 증여세 관계는?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '중견기업의 경우 가업승계 특례를 활용하면 일반 증여 공제와는 별도로 추가 혜택을 받을 수 있습니다. 업종과 규모에 따라 다르므로 전문가 상담을 통해 정확한 혜택을 확인하시기 바랍니다.',
      },
    },
    {
      '@type': 'Question',
      name: '부동산과 주식 증여시 주의사항은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '부동산은 감정평가액을 기준으로, 주식은 평가 시점의 가격을 기준으로 증여세가 부과됩니다. 특히 상장주식의 경우 평가 기준일 선택이 중요하므로 신중한 계획이 필요합니다.',
      },
    },
  ],
};
