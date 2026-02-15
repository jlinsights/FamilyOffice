import { DEFAULT_FAQ_ITEMS } from './faq-data';

// Base data interface or type could be defined here or imported
const BASE_DATA = {
  '@context': 'https://schema.org',
  name: 'FamilyOffice S',
  url: 'https://familyoffices.vip',
  logo: 'https://familyoffices.vip/logo.png',
  description: '중소중견기업 법인 대표 전용 자산관리 서비스',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressLocality: 'Seoul',
    addressRegion: '서울특별시',
    streetAddress: '세종대로 73 태평로빌딩',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+82-502-5550-8700',
    email: 'cs@familyoffices.vip',
    availableLanguage: ['Korean', 'English'],
  },
};

export function getBaseData(type: string) {
  return {
    ...BASE_DATA,
    '@type': type,
  };
}

export function generateOrganizationSchema() {
  return {
    ...getBaseData('Organization'),
    '@id': 'https://familyoffices.vip/#organization',
    foundingDate: '2020',
    numberOfEmployees: '10-50',
    serviceArea: 'South Korea',
    legalName: 'FamilyOffice S',
    alternateName: ['패밀리오피스 에스', '삼성생명 패밀리오피스'],
    brand: {
      '@type': 'Brand',
      name: 'FamilyOffice S',
      logo: 'https://familyoffices.vip/SVG/FamilyOfficeS_blue.svg',
    },
    slogan: '성공한 CEO 전용 백년영속 패밀리오피스',
    knowsAbout: [
      '중소중견기업 자산관리',
      '가업승계 설계',
      '세무최적화 전략',
      '기업위험관리',
      '패밀리오피스 구축',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '자산관리 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '비상장기업 자산관리',
            description: '중소중견기업 CEO를 위한 통합 자산관리 서비스',
            provider: {
              '@type': 'Organization',
              name: 'FamilyOffice S',
            },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'KRW',
            price: '상담 후 결정',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '가업승계 컨설팅',
            description: '체계적인 가업승계 및 세무최적화 설계',
            provider: {
              '@type': 'Organization',
              name: 'FamilyOffice S',
            },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'KRW',
            price: '상담 후 결정',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '경영위험관리',
            description: '중대재해처벌법 대응 및 기업위험관리 솔루션',
            provider: {
              '@type': 'Organization',
              name: 'FamilyOffice S',
            },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'KRW',
            price: '상담 후 결정',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 150,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '제조업 CEO K씨',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
        },
        reviewBody:
          '가업승계 준비부터 세무최적화까지 원스톱으로 해결해주셔서 매우 만족합니다.',
      },
    ],
    sameAs: [
      'https://newsletter.familyoffices.vip',
      'https://www.samsunglife.com',
      'https://familyoffices.vip/about',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://familyoffices.vip/#website',
    name: 'FamilyOffice S - 성공한 CEO 전용 패밀리오피스',
    alternateName: '패밀리오피스 에스',
    url: 'https://familyoffices.vip',
    description: '중소중견기업 CEO 전용 자산관리 및 가업승계 전문 플랫폼',
    inLanguage: 'ko-KR',
    copyrightYear: 2025,
    copyrightHolder: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      logo: {
        '@type': 'ImageObject',
        url: 'https://familyoffices.vip/SVG/FamilyOfficeS_blue.svg',
      },
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: 'https://familyoffices.vip/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      {
        '@type': 'ContactAction',
        name: '무료 상담 신청',
        target: 'https://familyoffices.vip/contact',
      },
    ],
    mainEntity: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
    },
    audience: {
      '@type': 'Audience',
      audienceType: '중소중견기업 CEO',
      geographicArea: {
        '@type': 'Country',
        name: '대한민국',
      },
    },
    isAccessibleForFree: false,
    hasPart: [
      {
        '@type': 'WebPage',
        '@id': 'https://familyoffices.vip/about',
        name: '회사 소개',
        description: 'FamilyOffice S 소개 및 전문가 정보',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://familyoffices.vip/solutions',
        name: '솔루션',
        description: '업종별 맞춤형 자산관리 솔루션',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://familyoffices.vip/program',
        name: '교육 프로그램',
        description: 'CEO 전용 교육 프로그램 및 세미나',
      },
    ],
  };
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://familyoffices.vip/solutions#service',
    name: '성공한 기업가 전용 패밀리오피스 서비스',
    description:
      '중소중견기업 CEO를 위한 전문적인 자산관리, 가업승계, 세무최적화 서비스. 전문가 그룹의 ONE-TEAM 서비스로 20년 이상의 경험을 바탕으로 최적의 솔루션을 제공합니다.',
    provider: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      '@id': 'https://familyoffices.vip/#organization',
    },
    serviceType: '패밀리오피스 자산관리',
    category: '금융 서비스',
    areaServed: {
      '@type': 'Country',
      name: '대한민국',
    },
    audience: {
      '@type': 'Audience',
      audienceType: '성공한 법인 대표',
      geographicArea: {
        '@type': 'Country',
        name: '대한민국',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '패밀리오피스 서비스 카탈로그',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CEO플랜',
            description: '기업 대표를 위한 종합 자산관리 플랜',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '가업승계 설계',
            description: '체계적인 가업승계 및 세무전략 수립',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '중대재해처벌법 대응',
            description: '기업 안전관리 및 경영철 리스크 관리',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 150,
      bestRating: 5,
    },
    priceRange: '₩₩₩₩',
    availableLanguage: ['Korean', 'English'],
  };
}

export function generateFAQPageSchema(
  faqItems?: { question: string; answer: string }[]
) {
  const items =
    faqItems && faqItems.length > 0
      ? faqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        }))
      : DEFAULT_FAQ_ITEMS;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items,
  };
}

export function generateAIOptimizedSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'FamilyOffice S - 성공한 기업가 전용 자산관리',
    description:
      'SuperClaude BMAD Method 적용 성공한 법인대표 전용 패밀리오피스. AI 최적화 상담, 가업승계 완전해결, 삼성생명 1000억+ 검증된 운용실적',
    url: 'https://familyoffices.vip',
    telephone: '+82-502-5550-8700',
    email: 'cs@familyoffices.vip',
    areaServed: '대한민국',
    serviceType: 'Family Office Services',
    category: 'Financial Planning & Wealth Management',
    priceRange: '₩₩₩₩',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI 최적화 BMAD Method 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'SuperClaude 기반 자산분석',
          description: 'AI와 전문가가 협업하는 차세대 자산분석 시스템',
          category: 'Behavioral Analysis',
        },
        {
          '@type': 'Offer',
          name: '성공동기 기반 승계설계',
          description: '기업가 개인의 성취동기를 분석한 맞춤 가업승계 로드맵',
          category: 'Motivational Planning',
        },
        {
          '@type': 'Offer',
          name: '미래비전 실현 자산전략',
          description: '10년-30년 장기 비전 실현을 위한 체계적 자산계획',
          category: 'Aspirational Strategy',
        },
        {
          '@type': 'Offer',
          name: '즉시실행 세무최적화',
          description: '지금 당장 실행 가능한 구체적 절세 방안 제시',
          category: 'Decisional Implementation',
        },
      ],
    },
    knowsAbout: [
      'SuperClaude AI 자산분석',
      'BMAD Method 적용 패밀리오피스',
      '성공한 기업가 전용 서비스',
      '차세대 디지털 자산관리',
      'AI 기반 가업승계 설계',
    ],
    targetAudience: {
      '@type': 'PeopleAudience',
      audienceType: '성공한 법인 대표',
      suggestedMinAge: 40,
      suggestedMaxAge: 70,
      geographicArea: {
        '@type': 'Country',
        name: '대한민국',
      },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://familyoffices.vip',
    name: 'FamilyOffice S - 삼성생명 기업컨설팅센터',
    image: 'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
    logo: 'https://familyoffices.vip/logo.png',
    url: 'https://familyoffices.vip',
    telephone: '+82-502-5550-8700',
    email: 'cs@familyoffices.vip',
    priceRange: '₩₩₩₩',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '세종대로 73 태평로빌딩',
      addressLocality: '서울',
      addressRegion: '서울특별시',
      postalCode: '04527',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5665,
      longitude: 126.978,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.samsunglife.com',
      'https://newsletter.familyoffices.vip',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '패밀리오피스 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CEO플랜',
            description: '중소중견기업 CEO를 위한 종합 자산관리 플랜',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '가업승계 컨설팅',
            description: '체계적인 가업승계 및 자산이전 설계',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '절세 전략',
            description: '상속세, 증여세 최적화 및 세무 플래닝',
          },
        },
      ],
    },
  };
}

export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: '상담 문의 - FamilyOffice S',
    description: '중소중견기업 법인 대표님을 위한 전문 자산관리 상담 신청',
    url: 'https://familyoffices.vip/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      telephone: '+82-502-5550-8700',
      email: 'cs@familyoffices.vip',
    },
  };
}
