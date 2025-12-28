import type { Metadata, Viewport } from 'next';

import { KEYWORDS } from './keywords';

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

  keywords: KEYWORDS,

  openGraph: {
    type: 'website',
    siteName: '성공한 CEO 전용 패밀리오피스 FamilyOffice S',
    title:
      '성공한 법인대표 전용 패밀리오피스 | 가업승계 자산관리 완전해결 - FamilyOffice S',
    description:
      '성공한 법인대표 전용 패밀리오피스. 가업승계·승계세무 완전해결, 기업가 맞춤 자산관리, 경영위험 완전보장. 삼성생명 1000억+ 운용실적, 성공사례 300+ ☎0502-5550-8700',

    // 소셜 미디어 최적화 - 중년 타겟
    locale: 'ko_KR',
    url: 'https://familyoffices.vip',
    images: [
      {
        url: 'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
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
    images: [
      'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
    ],
  },

  // 🎯 BMAD Method 지역 SEO 및 소셜 신호 강화
  other: {
    // 지역 비즈니스 최적화
    'geo.region': 'KR-11', // 서울특별시 ISO 코드
    'geo.placename': '서울특별시 중구',
    'geo.position': '37.5665;126.9780',
    ICBM: '37.5665, 126.9780',
    location: '서울 중구 패밀리오피스',

    // 소셜 미디어 최적화 - 중년 성공한 기업가 타겟
    'kakao:title': '성공한 CEO 전용 패밀리오피스 | 가업승계 자산관리',
    'kakao:description':
      '성공한 법인대표를 위한 프리미엄 패밀리오피스. 가업승계·승계세무 완전해결, VVIP 맞춤 자산관리. 삼성생명 1000억+ 운용실적',
    'kakao:image':
      'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
    'kakao:url': 'https://familyoffices.vip',

    // 네이버 블로그/카페 최적화
    'naver:title': '성공한 기업가 전용 패밀리오피스 | FamilyOffice S',
    'naver:description':
      'SuperClaude BMAD Method 적용 패밀리오피스. 성공한 법인대표 전용 가업승계·자산관리 완전해결',
    'naver:image':
      'https://familyoffices.vip/images/og-image-familyoffice-v2.png',

    // LinkedIn 비즈니스 네트워크 최적화
    'linkedin:title': '성공한 CEO를 위한 패밀리오피스 | 가업승계 전문',
    'linkedin:description':
      '중소중견기업 CEO 전용 프리미엄 자산관리. 가업승계부터 세무최적화까지 원스톱 솔루션',
    'linkedin:image':
      'https://familyoffices.vip/images/og-image-familyoffice-v2.png',

    // YouTube 동영상 최적화 (향후 콘텐츠용)
    'youtube:title': '성공한 기업가의 자산관리 노하우 | 패밀리오피스',
    'youtube:description':
      '경험 많은 기업가들이 선택하는 자산관리 방법. 가업승계 성공사례와 실제 노하우 공개',

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
  searchIntent?: 'informational' | 'commercial' | 'transactional',
  canonicalPath?: string
): Metadata {
  // SuperClaude 적응형 메타데이터 생성
  const experienceSpecificKeywords = targetExperience
    ? [
        `${targetExperience} 기업대표`,
        `${targetExperience} CEO 전용`,
        `${targetExperience} 맞춤 자산관리`,
      ]
    : [];

  const stageSpecificKeywords = businessStage
    ? [
        businessStage === '성장기'
          ? '성장기업 자산관리'
          : businessStage === '성숙기'
            ? '성숙기업 승계준비'
            : '가업승계 실행',
      ]
    : [];

  const intentOptimizedTitle =
    searchIntent === 'transactional'
      ? `${title} | 즉시 상담 가능`
      : searchIntent === 'commercial'
        ? `${title} | 전문 컨설팅`
        : title;

  const baseUrl = 'https://familyoffices.vip';
  const canonicalUrl = canonicalPath ? `${baseUrl}${canonicalPath}` : baseUrl;

  return {
    title: intentOptimizedTitle,
    description,
    keywords: [
      ...(defaultMetadata.keywords || []),
      ...keywords,
      ...experienceSpecificKeywords,
      ...stageSpecificKeywords,
    ],
    category: targetExperience
      ? `${targetExperience} 전용 서비스`
      : defaultMetadata.category,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: intentOptimizedTitle,
      description,
      url: canonicalUrl,
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

// Next.js 15: colorScheme을 별도 viewport export로 분리
export const viewport: Viewport = {
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // iPhone X 이상 Safe Area 지원
};
