import type { Metadata } from 'next';

// SuperClaude 통합 SEO 프레임워크 - 40+ 법인 대표 타겟 최적화
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://familyoffices.vip'),

  title: {
    default: '40-50대 CEO 전용 패밀리오피스 | 가업승계 자산관리 전문 FamilyOffice S',
    template: '%s | 40-50대 법인대표 전용 패밀리오피스 S',
  },
  description:
    '40-50대 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 중소중견기업 CEO 맞춤 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적 ☎0502-5550-8700',
  
  // BMAD Method 기반 메타 타겟팅
  authors: [{ name: 'FamilyOffice S 전문 컨설턴트' }],
  category: '40대 이상 기업오너 전용 자산관리',
  classification: 'CEO 전용 프리미엄 서비스',

  keywords: [
    // BMAD Method 1: Behavioral (행동 기반) - 40-50대 CEO 실제 검색어
    '40대 CEO 자산관리',
    '50대 기업오너 가업승계',
    '법인대표 은퇴설계',
    '중년 기업가 재산관리',
    '40-50대 경영인 투자전략',
    '기업오너 노후준비',
    '법인대표 자녀교육비',
    '중년 CEO 부동산 투자',
    '기업가 해외이민 자금',
    '법인대표 의료비 대비',
    
    // BMAD Method 2: Motivational (동기 기반) - 성취와 성장 욕구
    '기업가치 극대화',
    '대를 이을 가업승계',
    '성공한 CEO 자산관리법',
    '부의 대물림 전략',
    '기업오너 레거시 구축',
    '법인대표 사회적 성공',
    '기업가 명예 보전',
    'CEO 리더십 유산',
    '가문의 영속성',
    '기업가정신 계승',
    
    // BMAD Method 3: Aspirational (열망 기반) - 미래 비전과 꿈
    '세계적인 기업가문',
    '글로벌 패밀리오피스',
    '차세대 기업가 양성',
    '국제적 자산분산',
    '명문가 자산관리',
    '기업오너 품격',
    '최고급 자산관리 서비스',
    'VVIP 전용 컨설팅',
    '프리미엄 라이프스타일',
    '엘리트 기업가 네트워크',
    
    // BMAD Method 4: Decisional (결정 기반) - 구체적 실행 요소
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
    '삼성생명 패밀리오피스',
    'GFC 기업재무컨설턴트',
    
    // AgentOS 다중관점 분석 - Google/Perplexity 최적화
    // 관점 1: 재무관점 - 수익성과 비용효율성
    '40대 CEO 세후수익 극대화',
    '중견기업 자산관리 비용',
    '법인대표 투자수익률 개선',
    '기업오너 절세효과 계산기',
    '가업승계 비용 시뮬레이션',
    '패밀리오피스 ROI 분석',
    
    // 관점 2: 리스크관점 - 위험관리와 보장
    '40-50대 기업가 리스크 관리',
    '법인대표 중대재해 보장',
    '경영진 개인보증 해결',
    '기업오너 건강악화 대비',
    '가업승계 실패 사례',
    '중견기업 도산 위험 관리',
    
    // 관점 3: 시장관점 - 경쟁우위와 기회
    '중소기업 가업승계 방법',
    '패밀리오피스 비용',
    '가업승계 세금 줄이는 방법',
    '중견기업 자산관리 전략',
    'CEO 자산관리 방법',
    '법인 대표 재산관리',
    '경영인정기보험 가입조건',
    '상속세 계산기',
    '증여세 면제한도',
    '동종업계 M&A 동향',
    '업계 1위 기업 승계사례',
    
    // 관점 4: 성장관점 - 혁신과 발전
    '기업가치 배수 향상법',
    'ESG 경영과 가업승계',
    '디지털 전환 자금 조달',
    '차세대 기업가 역량개발',
    '글로벌 진출 자금계획',
    
    // SuperClaude 타겟 고객 세분화 - 40-60대 법인 대표
    // 연령별 세분화
    '40대 기업대표 자산관리',
    '50대 법인오너 가업승계',
    '60대 기업가 은퇴설계',
    '중년 CEO 재무전략',
    '베이비부머 기업가 자산이전',
    
    // 기존 키워드 유지
    '중소중견기업 CEO',
    '중소기업 대표', 
    '중견기업 오너',
    '성실신고대상자',
    '고액자산가',
    '개인사업자',
    '법인대표',
    
    // 심리적 상태 키워드
    '성공한 기업가의 고민',
    '중년 기업인 미래불안',
    '경영진 책임부담',
    '자녀 교육비 걱정',
    '노후준비 부족 스트레스',
    
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
    
    // 업종별 맞춤 키워드 - 40+ 대표 집중 업계
    '제조업 자산관리',
    '건설업 자산관리', 
    'IT기업 자산관리',
    '벤처기업 자산관리',
    '스타트업 자산관리',
    '유통업 CEO 자산관리',
    '서비스업 오너 가업승계',
    '도소매업 대표 절세전략',
    '음식업 사장 재무설계',
    '부동산업 대표 투자전략',
    '물류업 CEO 위험관리',
    '의료업 원장 자산관리',
    '교육업 대표 상속설계',
    
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
    
    // 세미나/교육 키워드 - 40+ 타겟 특화
    '세미나',
    'VVIP 세미나', 
    'CEO 세미나',
    '자산관리 세미나',
    '패밀리오피스 세미나',
    'Business Live ON',
    'The 멋진 하루',
    'VVIP 자산관리',
    'VVIP 고객',
    'VVIP 서비스', 
    '서울FP센터',
    '강남FP센터',
    '삼성생명FP센터',
    'FP센터',
    '금융 세미나',
    '경영 세미나',
    '투자 세미나',
    '절세 세미나',
    '가업승계 세미나',
    'CEO 교육',
    '경영진 교육',
    '리더십 세미나',
    '재무 교육',
    '자산관리 교육',
    '프리미엄 세미나',
    'VIP 세미나',
    '기업가 세미나',
    '중소기업 CEO 세미나',
    '중견기업 세미나',
    '패밀리오피스 교육',
    
    // 40+ 특화 교육 키워드
    '40대 기업가 리더십',
    '50대 CEO 성공전략',
    '중년 경영진 멘토링',
    '시니어 기업가 네트워킹',
    '베테랑 CEO 클럽',
    '성숙한 기업인 모임',
  ],

  openGraph: {
    type: 'website',
    siteName: '40-50대 CEO 전용 패밀리오피스 FamilyOffice S',
    title: '40-50대 법인대표 전용 패밀리오피스 | 가업승계 자산관리 완전해결 - FamilyOffice S',
    description:
      '40-50대 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 중년 CEO 맞춤 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적, 성공사례 300+ ☎0502-5550-8700',
    
    // 소셜 미디어 최적화 - 중년 타겟
    locale: 'ko_KR',
    'article:section': '40대 이상 기업오너 전용',
    'article:tag': ['40대CEO', '50대기업가', '중년경영진', '가업승계', '자산관리'],
    'business:contact_data:locality': '서울',
    'business:contact_data:region': '강남',
    'business:contact_data:country_name': '대한민국',
    'og:audience': '40-60대 법인 대표',
    'og:target_audience': '중소중견기업 CEO',
    'og:content_tier': 'Premium',
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
    title: '40-50대 CEO 전용 패밀리오피스 | 가업승계 완전해결',
    description:
      '40-50대 법인대표 전용. 가업승계·승계세무 완전해결, 중년 CEO 맞춤 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적 ☎0502-5550-8700',
    creator: '@FamilyOfficeS_CEO',
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
    author: 'FamilyOffice S - 40대 이상 CEO 전문',
    publisher: 'FamilyOffice S',
    copyright: 'FamilyOffice S',
    'og:phone_number': '+82-502-5550-8700',
    'og:email': 'cs@familyoffices.vip',
    'article:author': 'FamilyOffice S 전문 컨설턴트',
    
    // SuperClaude 프레임워크 특화 메타태그
    'target-audience': '40-60세 법인 대표',
    'business-sector': '중소중견기업',
    'service-tier': 'Premium VVIP',
    'expertise-level': '전문가급',
    'decision-stage': '고려-결정 단계',
    'search-intent': '상업적 문의',
    'customer-lifecycle': '신규-기존 고객',
    'geographic-focus': '서울 강남 중심',
    'language-preference': '한국어',
    'device-optimization': '모바일-데스크톱',
    
    // BMAD Method 메타데이터
    'bmad-behavioral': '검색 기반 문제 해결',
    'bmad-motivational': '성취와 성장 동기',
    'bmad-aspirational': '미래 비전과 목표',
    'bmad-decisional': '실행 가능한 솔루션',
    
    // AgentOS 다중관점 메타데이터
    'agentios-financial': '재무 효율성',
    'agentios-risk': '위험 관리',
    'agentios-market': '시장 기회',
    'agentios-growth': '성장 전략',
  },
};

// SuperClaude 통합 메타데이터 생성 함수 - BMAD Method 적용
export function generateMetadata(
  title: string,
  description: string,
  keywords: string[] = [],
  image?: string,
  targetAge?: '40대' | '50대' | '40-50대' | '40-60대',
  businessStage?: '성장기' | '성숙기' | '승계준비',
  searchIntent?: 'informational' | 'commercial' | 'transactional'
): Metadata {
  // SuperClaude 적응형 메타데이터 생성
  const ageSpecificKeywords = targetAge ? [
    `${targetAge} 기업대표`,
    `${targetAge} CEO 전용`,
    `${targetAge} 맞춤 자산관리`
  ] : [];
  
  const stageSpecificKeywords = businessStage ? [
    businessStage === '성장기' ? '성장기업 자산관리' : 
    businessStage === '성숙기' ? '성숙기업 승계준비' : '가업승계 실행'
  ] : [];
  
  const intentOptimizedTitle = searchIntent === 'transactional' 
    ? `${title} | 즉시 상담 가능` 
    : searchIntent === 'commercial'
    ? `${title} | 전문 컨설팅`
    : title;

  return {
    title: intentOptimizedTitle,
    description,
    keywords: [...defaultMetadata.keywords!, ...keywords, ...ageSpecificKeywords, ...stageSpecificKeywords],
    category: targetAge ? `${targetAge} 전용 서비스` : defaultMetadata.category,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: intentOptimizedTitle,
      description,
      'article:tag': [...(defaultMetadata.openGraph as any)['article:tag'] || [], ...ageSpecificKeywords],
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: `${title} - ${targetAge || '40-50대'} CEO 전용`,
            },
          ]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: intentOptimizedTitle,
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
      priority: 0.9,
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
