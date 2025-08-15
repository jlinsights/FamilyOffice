import type { Metadata } from 'next';

// 기본 메타데이터 설정
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://familyoffices.vip'),

  title: {
    default: '패밀리오피스 | 가업승계 자산관리 전문 FamilyOffice S',
    template: '%s | 패밀리오피스 FamilyOffice S',
  },
  description:
    '패밀리오피스 가업승계 전문. 중소중견기업 CEO 자산관리, 상속증여 절세전략, 경영인정기보험. 삼성생명 500억+ 운용실적. 무료상담 ☎0502-5550-8700',

  keywords: [
    // 네이버/다음 최적화 핵심 키워드
    '패밀리오피스',
    '패밀리오피스란',
    '패밀리오피스 서비스',
    '패밀리오피스 컨설팅',
    '가업승계',
    '가업승계 방법',
    '가업승계 절차',
    '가업승계 상담',
    '자산관리',
    '자산관리 전문가',
    '자산관리 상담',
    '상속증여',
    '상속세 절세',
    '증여세 절세',
    '절세전략',
    
    // Google/Perplexity 롱테일 키워드
    '중소기업 가업승계 방법',
    '패밀리오피스 비용',
    '가업승계 세금 줄이는 방법',
    '중견기업 자산관리 전략',
    'CEO 자산관리 방법',
    '법인 대표 재산관리',
    '경영인정기보험 가입조건',
    '상속세 계산기',
    '증여세 면제한도',
    
    // 타겟 고객 키워드
    '중소중견기업 CEO',
    '중소기업 대표',
    '중견기업 오너',
    '성실신고대상자',
    '고액자산가',
    '개인사업자',
    '법인대표',
    
    // 서비스 키워드
    'CEO플랜',
    '경영인정기보험',
    '보장자산',
    '비상장기업 자산관리',
    '기업 리스크 관리',
    '중대재해처벌법 대응',
    '세무최적화',
    '재무설계',
    '투자자문',
    
    // 산업별 키워드
    '제조업 자산관리',
    '건설업 자산관리',
    'IT기업 자산관리',
    '벤처기업 자산관리',
    '스타트업 자산관리',
    
    // 지역 키워드
    '서울 패밀리오피스',
    '강남 자산관리',
    '중구 패밀리오피스',
    
    // 브랜드 키워드
    'FamilyOffice S',
    '패밀리오피스S',
    '삼성생명 패밀리오피스',
    '삼성생명 자산관리',
    
    // 채용/위촉 키워드
    '삼성생명 GFC',
    '삼성생명 GFC 채용',
    '삼성생명 GFC 위촉',
    '삼성생명 잡페어',
    '삼성생명 GWP',
    '삼성생명 FP',
    '삼성생명 컨설턴트',
    '삼성생명 자산관리사',
    '삼성생명 재무설계사',
    '삼성생명 영업직',
    '보험설계사 채용',
    '자산관리사 채용',
    'GFC란',
    'GFC 자격조건',
    'GFC 수입',
    'GFC 연봉',
  ],

  openGraph: {
    type: 'website',
    siteName: '패밀리오피스 FamilyOffice S',
    title: '패밀리오피스 | 가업승계 자산관리 전문 - FamilyOffice S',
    description:
      '패밀리오피스 가업승계 전문. 중소중견기업 CEO 자산관리, 상속증여 절세전략, 경영인정기보험. 삼성생명 500억+ 운용실적. 무료상담 ☎0502-5550-8700',
    url: 'https://familyoffices.vip',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '패밀리오피스 가업승계 자산관리 전문 FamilyOffice S',
      },
    ],
    locale: 'ko_KR',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@familyoffices',
    title: '패밀리오피스 | 가업승계 자산관리 전문',
    description:
      '패밀리오피스 가업승계 전문. 중소중견기업 CEO 자산관리, 상속증여 절세전략. 삼성생명 500억+ 운용실적. ☎0502-5550-8700',
    images: ['/og-image.jpg'],
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
    locale: 'ko_KR',
    'naver-site-verification': 'your-naver-verification-code',
    NaverBot: 'All',
    Yeti: 'index,follow',
    Daumoa: 'index,follow',
    'format-detection': 'telephone=no',
    author: 'FamilyOffice S',
    publisher: 'FamilyOffice S',
    copyright: 'FamilyOffice S',
    'og:phone_number': '+82-502-5550-8700',
    'og:email': 'cs@familyoffices.vip',
    'article:author': 'FamilyOffice S',
  },
};

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
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: image ? [image] : defaultMetadata.twitter?.images,
    },
  };
}

// 구조화된 데이터 생성
export function generateStructuredData(
  type: 'Organization' | 'WebSite' | 'Service' | 'FAQPage' | 'LocalBusiness' | 'BreadcrumbList'
) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: 'FamilyOffice S',
    url: 'https://familyoffices.vip',
    logo: 'https://familyoffices.vip/logo.png',
    description: '중소중견기업 법인 대표 전용 자산관리 서비스',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: 'Seoul',
      addressRegion: '서울특별시',
      streetAddress: '서울특별시 중구',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+82-502-5550-8700',
      email: 'cs@familyoffices.vip',
      availableLanguage: ['Korean', 'English'],
    },
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        foundingDate: '2020',
        numberOfEmployees: '10-50',
        serviceArea: 'South Korea',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '자산관리 서비스',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '비상장기업 자산관리',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '상속설계',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '재무설계',
              },
            },
          ],
        },
      };

    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'FamilyOffice S',
        url: 'https://familyoffices.vip',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://familyoffices.vip/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      };

    case 'Service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '중소중견기업 자산관리',
        description:
          '비상장기업, 기술기업, 제조업 등 다양한 업종 법인 대표를 위한 프리미엄 자산관리 서비스',
        provider: {
          '@type': 'Organization',
          name: 'FamilyOffice S',
        },
        serviceType: '자산관리',
        areaServed: 'KR',
      };

    case 'FAQPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '패밀리오피스 서비스란 무엇인가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '패밀리오피스는 중소중견기업 CEO와 고액자산가를 위한 종합 자산관리 서비스입니다. 가업승계, 자산이전, 절세 전략을 포함한 맞춤형 솔루션을 제공합니다.',
            },
          },
          {
            '@type': 'Question',
            name: 'CEO플랜이란 무엇인가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CEO플랜은 기업 대표를 위한 종합 재무설계 프로그램입니다. 경영인정기보험, 보장자산 구축, 상속 및 증여 계획을 포함합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '가업승계는 어떻게 준비하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '가업승계는 기업가치 평가, 지분 이전 계획, 상속세 및 증여세 최적화, 경영권 안정화 방안을 종합적으로 검토하여 준비합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '중대재해처벌법 대응은 어떻게 하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '중대재해처벌법에 따른 경영책임자 처벌 대비를 위한 보험설계와 안전관리체계 구축을 지원합니다.',
            },
          },
        ],
      };

    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://familyoffices.vip',
        name: 'FamilyOffice S - 삼성생명 기업컨설팅센터',
        image: 'https://familyoffices.vip/og-image.jpg',
        logo: 'https://familyoffices.vip/logo.png',
        url: 'https://familyoffices.vip',
        telephone: '+82-502-5550-8700',
        email: 'cs@familyoffices.vip',
        priceRange: '₩₩₩₩',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '서울특별시 중구',
          addressLocality: '서울',
          addressRegion: '서울특별시',
          postalCode: '04527',
          addressCountry: 'KR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.5665,
          longitude: 126.9780,
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

    case 'BreadcrumbList':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '홈',
            item: 'https://familyoffices.vip',
          },
        ],
      };

    default:
      return baseData;
  }
}

// 사이트맵 URL 생성
export function generateSitemapUrls() {
  const baseUrl = 'https://familyoffices.vip';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/program`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seminar`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/success-stories`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];
}
