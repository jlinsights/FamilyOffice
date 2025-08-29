import type { Metadata } from 'next';

// SuperClaude 통합 SEO 프레임워크 - 성공한 법인 대표 타겟 최적화
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://familyoffices.vip'),

  title: {
    default: 'FamilyOffice S - 가업승계·자산관리 전문 플랫폼',
    template: '%s | FamilyOffice S',
  },
  description:
    '성공한 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 중소중견기업 CEO 맞춤 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적 ☎0502-5550-8700',
  
  // BMAD Method 기반 메타 타겟팅
  authors: [{ name: 'FamilyOffice S 전문 컨설턴트' }],
  category: '성공한 기업오너 전용 자산관리',
  classification: 'CEO 전용 프리미엄 서비스',

  keywords: [
    // BMAD Method 1: Behavioral (행동 기반) - 성공한 기업가 실제 검색어
    '기업가 자산관리',
    '법인대표 가업승계',
    '법인대표 은퇴설계',
    '성공한 기업가 재산관리',
    '기업 경영인 투자전략',
    '기업오너 노후준비',
    '법인대표 자녀교육비',
    '성공한 CEO 부동산 투자',
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
    '기업가 세후수익 극대화',
    '중견기업 자산관리 비용',
    '법인대표 투자수익률 개선',
    '기업오너 절세효과 계산기',
    '가업승계 비용 시뮬레이션',
    '패밀리오피스 ROI 분석',
    
    // 관점 2: 리스크관점 - 위험관리와 보장
    '성공한 기업가 리스크 관리',
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
    
    // SuperClaude 타겟 고객 세분화 - 성공한 법인 대표
    // 경력별 세분화
    '경험 많은 기업대표 자산관리',
    '성공한 법인오너 가업승계',
    '원로 기업가 은퇴설계',
    '숙련된 CEO 재무전략',
    '선배 기업가 자산이전',
    
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
    '성공한 기업인 미래불안',
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
    
    // 업종별 맞춤 키워드 - 성공한 대표 집중 업계
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
    
    // 세미나/교육 키워드 - 성공한 기업가 특화
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
    
    // 성공한 기업가 특화 교육 키워드
    '성공한 기업가 리더십',
    '기업가 성공전략',
    '경험 많은 경영진 멘토링',
    '원로 기업가 네트워킹',
    '베테랑 CEO 클럽',
    '성숙한 기업인 모임',
  ],

  openGraph: {
    type: 'website',
    siteName: '성공한 CEO 전용 패밀리오피스 FamilyOffice S',
    title: '성공한 법인대표 전용 패밀리오피스 | 가업승계 자산관리 완전해결 - FamilyOffice S',
    description:
      '성공한 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 기업가 맞춤 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적, 성공사례 300+ ☎0502-5550-8700',
    
    // 소셜 미디어 최적화 - 중년 타겟
    locale: 'ko_KR',
    url: 'https://familyoffices.vip',
    images: [
      {
        url: 'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
        width: 1200,
        height: 630,
        alt: '성공한 CEO 전용 패밀리오피스 가업승계 자산관리 전문 FamilyOffice S',
        type: 'image/jpeg',
      },
      {
        url: '/logo.png',
        width: 400,
        height: 400,
        alt: 'FamilyOffice S 로고 - 성공한 기업가 전용',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@familyoffices',
    title: '성공한 CEO 전용 패밀리오피스 | 가업승계 완전해결',
    description:
      '성공한 법인대표 전용. 가업승계·승계세무 완전해결, 기업가 맞춤 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적 ☎0502-5550-8700',
    creator: '@FamilyOfficeS_CEO',
    images: ['https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain'],
  },

  // 🎯 BMAD Method 지역 SEO 및 소셜 신호 강화
  other: {
    // 지역 비즈니스 최적화
    'geo.region': 'KR-11', // 서울특별시 ISO 코드
    'geo.placename': '서울특별시 중구',
    'geo.position': '37.5665;126.9780',
    'ICBM': '37.5665, 126.9780',
    'location': '서울 중구 패밀리오피스',
    
    // 소셜 미디어 최적화 - 중년 성공한 기업가 타겟
    'kakao:title': '성공한 CEO 전용 패밀리오피스 | 가업승계 자산관리',
    'kakao:description': '성공한 법인대표를 위한 프리미엄 패밀리오피스. 가업승계·승계세무 완전해결, VVIP 맞춤 자산관리. 삼성생명 1000억+ 운용실적',
    'kakao:image': 'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
    'kakao:url': 'https://familyoffices.vip',
    
    // 네이버 블로그/카페 최적화
    'naver:title': '성공한 기업가 전용 패밀리오피스 | FamilyOffice S',
    'naver:description': 'SuperClaude BMAD Method 적용 패밀리오피스. 성공한 법인대표 전용 가업승계·자산관리 완전해결',
    'naver:image': 'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
    
    // LinkedIn 비즈니스 네트워크 최적화
    'linkedin:title': '성공한 CEO를 위한 패밀리오피스 | 가업승계 전문',
    'linkedin:description': '중소중견기업 CEO 전용 프리미엄 자산관리. 가업승계부터 세무최적화까지 원스톱 솔루션',
    'linkedin:image': 'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
    
    // YouTube 동영상 최적화 (향후 콘텐츠용)
    'youtube:title': '성공한 기업가의 자산관리 노하우 | 패밀리오피스',
    'youtube:description': '경험 많은 기업가들이 선택하는 자산관리 방법. 가업승계 성공사례와 실제 노하우 공개',
    
    // 지역 비즈니스 신뢰성 향상
    'business:contact_data:street_address': '서울특별시 중구',
    'business:contact_data:locality': '서울',
    'business:contact_data:region': '서울특별시',
    'business:contact_data:postal_code': '04527',
    'business:contact_data:country_name': '대한민국',
    'business:contact_data:phone_number': '+82-502-5550-8700',
    'business:contact_data:email': 'cs@familyoffices.vip',
    
    // 타겟 고객 세분화 - BMAD Method
    'audience:behavioral': '성공한 기업가, 경험 많은 CEO, 자산관리 필요성 인식',
    'audience:motivational': '성취지향, 성장욕구, 레거시 구축 의지',
    'audience:aspirational': '프리미엄 서비스, 최고급 품질, 차별화된 경험',
    'audience:decisional': '즉시 상담, 맞춤 솔루션, 구체적 실행방안',
    
    // 검색엔진별 최적화
    'google-site-verification': 'your-google-verification-code',
    'naver-site-verification': 'your-naver-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    
    // Format detection
    'format-detection': 'telephone=no',
    
    // Author and publisher info
    author: 'FamilyOffice S - 성공한 CEO 전문',
    publisher: 'FamilyOffice S',
    copyright: 'FamilyOffice S',
    
    // Additional contact info
    'og:phone_number': '+82-502-5550-8700',
    'og:email': 'cs@familyoffices.vip',
    'article:author': 'FamilyOffice S 전문 컨설턴트',
    
    // SuperClaude 프레임워크 특화 메타태그
    'target-audience': '성공한 법인 대표',
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

  verification: {
    google: 'your-google-verification-code',
  },
};

// SuperClaude 통합 메타데이터 생성 함수 - BMAD Method 적용
export function generateMetadata(
  title: string,
  description: string,
  keywords: string[] = [],
  image?: string,
  targetExperience?: '성장기' | '성숙기' | '전문가급' | '리더급',
  businessStage?: '성장기' | '성숙기' | '승계준비',
  searchIntent?: 'informational' | 'commercial' | 'transactional'
): Metadata {
  // SuperClaude 적응형 메타데이터 생성
  const experienceSpecificKeywords = targetExperience ? [
    `${targetExperience} 기업대표`,
    `${targetExperience} CEO 전용`,
    `${targetExperience} 맞춤 자산관리`
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
    keywords: [...defaultMetadata.keywords!, ...keywords, ...experienceSpecificKeywords, ...stageSpecificKeywords],
    category: targetExperience ? `${targetExperience} 전용 서비스` : defaultMetadata.category,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: intentOptimizedTitle,
      description,
      // article:tag는 OpenGraph 표준에서 지원되지 않음
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: `${title} - ${targetExperience || '성공한'} CEO 전용`,
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

// 🤖 AI 검색엔진 최적화 - SuperClaude Framework
// Perplexity, ChatGPT, Claude 등 AI 검색엔진에 최적화된 구조화 데이터

// AI 검색엔진용 리치 스니펫 생성 함수
export function generateAIOptimizedContent() {
  return {
    // 즉문즉답형 질문-답변 세트
    instantAnswers: [
      {
        question: "패밀리오피스가 뭔가요?",
        answer: "성공한 기업가와 CEO를 위한 종합 자산관리 서비스입니다. 가업승계부터 세무최적화까지 원스톱으로 제공합니다.",
        context: "SuperClaude BMAD Method 적용"
      },
      {
        question: "가업승계 비용은 얼마인가요?",
        answer: "기업 규모와 자산 규모에 따라 차이가 있으며, 무료 상담을 통해 맞춤 견적을 제공합니다. 일반적으로 절세 효과로 비용 이상의 가치를 창출합니다.",
        context: "성공한 기업가 맞춤 컨설팅"
      },
      {
        question: "중소기업도 패밀리오피스가 필요한가요?",
        answer: "연매출 100억 이상 또는 자산 50억 이상의 중소중견기업이라면 패밀리오피스를 통해 상당한 절세와 리스크 관리 효과를 얻을 수 있습니다.",
        context: "BMAD Method 기업 규모별 분석"
      }
    ],
    
    // AI 검색엔진용 키워드 클러스터
    aiSearchClusters: {
      behavioral: ["실제 경험", "성공 사례", "검증된 방법", "실무 적용"],
      motivational: ["성취감", "성공", "발전", "성장", "목표 달성"],
      aspirational: ["최고급", "프리미엄", "VVIP", "엘리트", "차별화"],
      decisional: ["즉시 상담", "무료 분석", "맞춤 제안", "구체적 방법"]
    }
  };
}

// 동적 Breadcrumb 생성 함수
export function generateBreadcrumbStructuredData(path: string = '/') {
  const baseUrl = 'https://familyoffices.vip';
  const pathSegments = path.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '홈',
      item: baseUrl,
    }
  ];
  
  // 경로별 한국어 이름 매핑
  const pathNameMap: Record<string, string> = {
    'about': '회사 소개',
    'solutions': '솔루션',
    'program': '교육 프로그램',
    'seminar': '세미나',
    'recruit': '채용',
    'contact': '연락처',
    'blog': '블로그',
    'insights': '인사이트',
    'market-intelligence': '시장 정보',
    'weekly-brief': '주간 브리핑',
    'resources': '리소스',
    'dashboard': '대시보드',
    'privacy': '개인정보처리방침',
    'terms': '이용약관'
  };
  
  let currentPath = baseUrl;
  pathSegments.forEach((segment, index) => {
    currentPath += '/' + segment;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: index + 2,
      name: pathNameMap[segment] || segment,
      item: currentPath,
    });
  });
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };
}

// 구조화된 데이터 생성
export function generateStructuredData(
  type: 'Organization' | 'WebSite' | 'Service' | 'FAQPage' | 'LocalBusiness' | 'BreadcrumbList' | 'AIOptimized'
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
        '@id': 'https://familyoffices.vip/#organization',
        foundingDate: '2020',
        numberOfEmployees: '10-50',
        serviceArea: 'South Korea',
        legalName: 'FamilyOffice S',
        alternateName: ['패밀리오피스 에스', '삼성생명 패밀리오피스'],
        brand: {
          '@type': 'Brand',
          name: 'FamilyOffice S',
          logo: 'https://familyoffices.vip/SVG/FamilyOfficeS_blue.svg'
        },
        slogan: '성공한 CEO 전용 백년영속 패밀리오피스',
        knowsAbout: [
          '중소중견기업 자산관리',
          '가업승계 설계',
          '세무최적화 전략',
          '기업위험관리',
          '패밀리오피스 구축'
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
                  name: 'FamilyOffice S'
                }
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'KRW',
                price: '상담 후 결정'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '가업승계 컨설팅',
                description: '체계적인 가업승계 및 세무최적화 설계',
                provider: {
                  '@type': 'Organization',
                  name: 'FamilyOffice S'
                }
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'KRW',
                price: '상담 후 결정'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '경영위험관리',
                description: '중대재해처벌법 대응 및 기업위험관리 솔루션',
                provider: {
                  '@type': 'Organization',
                  name: 'FamilyOffice S'
                }
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'KRW',
                price: '상담 후 결정'
              }
            },
          ],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.9,
          reviewCount: 150,
          bestRating: 5,
          worstRating: 1
        },
        review: [
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: '제조업 CEO K씨'
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: 5,
              bestRating: 5
            },
            reviewBody: '가업승계 준비부터 세무최적화까지 원스톱으로 해결해주셔서 매우 만족합니다.'
          }
        ],
        sameAs: [
          'https://newsletter.familyoffices.vip',
          'https://www.samsunglife.com',
          'https://familyoffices.vip/about'
        ]
      };

    case 'WebSite':
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
          name: 'FamilyOffice S'
        },
        publisher: {
          '@type': 'Organization',
          name: 'FamilyOffice S',
          logo: {
            '@type': 'ImageObject',
            url: 'https://familyoffices.vip/SVG/FamilyOfficeS_blue.svg'
          }
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
            target: 'https://familyoffices.vip/contact'
          }
        ],
        mainEntity: {
          '@type': 'Organization',
          name: 'FamilyOffice S'
        },
        audience: {
          '@type': 'Audience',
          audienceType: '중소중견기업 CEO',
          geographicArea: {
            '@type': 'Country',
            name: '대한민국'
          }
        },
        isAccessibleForFree: false,
        hasPart: [
          {
            '@type': 'WebPage',
            '@id': 'https://familyoffices.vip/about',
            name: '회사 소개',
            description: 'FamilyOffice S 소개 및 전문가 정보'
          },
          {
            '@type': 'WebPage',
            '@id': 'https://familyoffices.vip/solutions',
            name: '솔루션',
            description: '업종별 맞춤형 자산관리 솔루션'
          },
          {
            '@type': 'WebPage',
            '@id': 'https://familyoffices.vip/program',
            name: '교육 프로그램',
            description: 'CEO 전용 교육 프로그램 및 세미나'
          }
        ]
      };

    case 'Service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://familyoffices.vip/solutions#service',
        name: '성공한 기업가 전용 패밀리오피스 서비스',
        description: '중소중견기업 CEO를 위한 전문적인 자산관리, 가업승계, 세무최적화 서비스. 전문가 그룹의 ONE-TEAM 서비스로 20년 이상의 경험을 바탕으로 최적의 솔루션을 제공합니다.',
        provider: {
          '@type': 'Organization',
          name: 'FamilyOffice S',
          '@id': 'https://familyoffices.vip/#organization'
        },
        serviceType: '패밀리오피스 자산관리',
        category: '금융 서비스',
        areaServed: {
          '@type': 'Country',
          name: '대한민국'
        },
        audience: {
          '@type': 'Audience',
          audienceType: '성공한 법인 대표',
          geographicArea: {
            '@type': 'Country',
            name: '대한민국'
          }
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
                description: '기업 대표를 위한 종합 자산관리 플랜'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '가업승계 설계',
                description: '체계적인 가업승계 및 세무전략 수립'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '중대재해처벌법 대응',
                description: '기업 안전관리 및 경영철 리스크 관리'
              }
            }
          ]
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.9,
          reviewCount: 150,
          bestRating: 5
        },
        priceRange: '₩₩₩₩',
        availableLanguage: ['Korean', 'English']
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
          // 🤖 AI 검색엔진 최적화 FAQ 추가
          {
            '@type': 'Question',
            name: '패밀리오피스 비용은 얼마인가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '기업 규모와 자산 규모에 따라 맞춤 견적을 제공합니다. 무료 상담을 통해 정확한 비용을 안내받으실 수 있으며, 일반적으로 절세 효과로 비용 이상의 가치를 창출합니다. ☎0502-5550-8700',
            },
          },
          {
            '@type': 'Question',
            name: '중소기업도 패밀리오피스가 필요한가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '연매출 100억 이상 또는 자산 50억 이상의 중소중견기업이라면 패밀리오피스를 통해 상당한 절세와 리스크 관리 효과를 얻을 수 있습니다. BMAD Method 기반 기업별 맞춤 분석을 제공합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '가업승계 세금을 줄이는 방법은?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '증여세 면제한도 활용, 경영권 프리미엄 할인, 납부유예 제도 등을 종합적으로 활용하여 세부담을 최소화합니다. 삼성생명 1000억+ 운용실적 기반의 검증된 절세 전략을 제공합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '성공한 기업가들은 어떻게 자산관리를 하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '성공한 기업가들은 ①리스크 분산 ②세무 최적화 ③가업승계 준비를 동시에 진행합니다. 우리는 300+ 성공사례 기반의 검증된 방법론으로 기업가만의 맞춤 전략을 설계합니다.',
            },
          },
        ],
      };

    // 🤖 AI 검색엔진 최적화 전용 스키마
    case 'AIOptimized':
      return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'FamilyOffice S - 성공한 기업가 전용 자산관리',
        description: 'SuperClaude BMAD Method 적용 성공한 법인대표 전용 패밀리오피스. AI 최적화 상담, 가업승계 완전해결, 삼성생명 1000억+ 검증된 운용실적',
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
              category: 'Behavioral Analysis'
            },
            {
              '@type': 'Offer', 
              name: '성공동기 기반 승계설계',
              description: '기업가 개인의 성취동기를 분석한 맞춤 가업승계 로드맵',
              category: 'Motivational Planning'
            },
            {
              '@type': 'Offer',
              name: '미래비전 실현 자산전략', 
              description: '10년-30년 장기 비전 실현을 위한 체계적 자산계획',
              category: 'Aspirational Strategy'
            },
            {
              '@type': 'Offer',
              name: '즉시실행 세무최적화',
              description: '지금 당장 실행 가능한 구체적 절세 방안 제시',
              category: 'Decisional Implementation'
            }
          ]
        },
        knowsAbout: [
          'SuperClaude AI 자산분석',
          'BMAD Method 적용 패밀리오피스',
          '성공한 기업가 전용 서비스',
          '차세대 디지털 자산관리',
          'AI 기반 가업승계 설계'
        ],
        targetAudience: {
          '@type': 'PeopleAudience',
          audienceType: '성공한 법인 대표',
          suggestedMinAge: 40,
          suggestedMaxAge: 70,
          geographicArea: {
            '@type': 'Country',
            name: '대한민국'
          }
        }
      };

    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://familyoffices.vip',
        name: 'FamilyOffice S - 삼성생명 기업컨설팅센터',
        image: 'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
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
      url: `${baseUrl}/contact`,
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
  ];
}
