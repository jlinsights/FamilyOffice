/**
 * 메타태그 및 구조화 데이터 최적화 시스템
 * 네이버 검색엔진 최적화 중심
 */
import { Metadata } from 'next';
import { KeywordData, targetKeywords } from '@/lib/seo/seo-keywords';

export interface OptimizedMetadata extends Metadata {
  structuredData?: any;
  naverMeta?: Record<string, string>;
  localBusiness?: LocalBusinessSchema;
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  sameAs: string[];
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
  };
}

// 기본 사이트 정보
const SITE_CONFIG = {
  siteName: '패밀리오피스 S',
  domain: 'https://familyoffices.vip',
  description:
    '한국 중소중견기업 CEO를 위한 전문 패밀리오피스 서비스. 가업승계, 절세전략, 자산관리, 리스크관리를 원스톱으로 제공합니다.',
  keywords: '패밀리오피스, 가업승계, 절세전략, 자산관리, 세무컨설팅',
  locale: 'ko_KR',
  business: {
    name: '패밀리오피스 S',
    phone: '+82-2-1234-5678',
    email: 'contact@familyoffices.vip',
    address: {
      street: '테헤란로 123',
      city: '서울특별시 강남구',
      region: '서울특별시',
      postalCode: '06142',
      country: 'KR',
    },
    coordinates: {
      lat: 37.5012767,
      lng: 127.0396597,
    },
    hours: ['Mo-Fr 09:00-18:00', 'Sa 10:00-15:00', 'Su closed'],
    socialMedia: [
      'https://blog.naver.com/lim_jaehong',
      'https://contents.premium.naver.com/familyoffice/fo',
      'https://newsletter.familyoffices.vip',
    ],
  },
};

/**
 * 네이버 검색 최적화 메타태그 생성
 */
export function generateNaverOptimizedMeta(
  page: string,
  keywords: KeywordData,
  customContent?: {
    title?: string;
    description?: string;
    image?: string;
  }
): OptimizedMetadata {
  const pageUrl = `${SITE_CONFIG.domain}${page}`;
  const optimizedTitle =
    customContent?.title || generateOptimizedTitle(keywords, page);
  const optimizedDescription =
    customContent?.description || generateOptimizedDescription(keywords);
  const imageUrl =
    customContent?.image ||
    `${SITE_CONFIG.domain}/og-images${page === '/' ? '/home' : page}.jpg`;

  const metadata: OptimizedMetadata = {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: [
      keywords.primary,
      ...keywords.secondary,
      ...(keywords.longTail || []),
      ...(keywords.naverBlogKeywords || []),
    ].join(', '),

    // Open Graph 최적화
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: pageUrl,
      title: optimizedTitle,
      description: optimizedDescription,
      siteName: SITE_CONFIG.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: optimizedTitle,
        },
      ],
    },

    // Twitter Card 최적화
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
      images: [imageUrl],
      site: '@familyoffices',
      creator: '@familyoffices',
    },

    // 네이버 전용 메타태그
    naverMeta: {
      'naver-site-verification': 'naver_verification_code', // 실제 코드로 교체 필요
      property: 'article:author',
      content: 'https://blog.naver.com/lim_jaehong',
    },

    // 추가 메타태그
    other: {
      'google-site-verification': 'google_verification_code', // 실제 코드로 교체 필요
      'msvalidate.01': 'bing_verification_code', // 실제 코드로 교체 필요
      'application-name': SITE_CONFIG.siteName,
      'apple-mobile-web-app-title': SITE_CONFIG.siteName,
      'format-detection': 'telephone=no',
      'theme-color': '#1e3a8a',
      'color-scheme': 'light',
      creator: SITE_CONFIG.siteName,
      publisher: SITE_CONFIG.siteName,
      robots:
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      googlebot: 'index, follow',
      bingbot: 'index, follow',
      author: SITE_CONFIG.siteName,
      'geo.region': 'KR-11', // 서울특별시 지역 코드
      'geo.placename': '서울특별시 강남구',
      'geo.position': `${SITE_CONFIG.business.coordinates.lat};${SITE_CONFIG.business.coordinates.lng}`,
      ICBM: `${SITE_CONFIG.business.coordinates.lat}, ${SITE_CONFIG.business.coordinates.lng}`,
    },

    // 구조화 데이터
    structuredData: generateStructuredData(
      keywords,
      page,
      optimizedTitle,
      optimizedDescription
    ),

    // 로컬 비즈니스 스키마
    localBusiness: generateLocalBusinessSchema(),
  };

  return metadata;
}

/**
 * SEO 최적화 제목 생성
 */
function generateOptimizedTitle(keywords: KeywordData, page: string): string {
  const { primary, secondary, intent } = keywords;
  const siteName = SITE_CONFIG.siteName;

  // 페이지별 맞춤 제목 생성
  if (page === '/') {
    return `${primary} 전문 서비스 | ${secondary[0]} 원스톱 솔루션 - ${siteName}`;
  }

  // 상업적 의도가 높은 키워드
  if (intent === 'commercial') {
    return `${primary} 전문 컨설팅 | ${secondary[0]} 맞춤 솔루션 - ${siteName}`;
  }

  // 정보성 키워드
  if (intent === 'informational') {
    return `${primary} 완벽 가이드 | ${secondary[0]} 전문가 가이드 - ${siteName}`;
  }

  // 거래형 키워드
  if (intent === 'transactional') {
    return `${primary} 신청하기 | ${secondary[0]} 온라인 신청 - ${siteName}`;
  }

  return `${primary} | ${secondary[0]} - ${siteName}`;
}

/**
 * SEO 최적화 설명 생성
 */
function generateOptimizedDescription(keywords: KeywordData): string {
  const { primary, secondary, longTail, intent } = keywords;

  let baseDescription = `${primary} 전문 서비스를 제공하는 패밀리오피스 S입니다.`;

  // 의도별 맞춤 설명
  if (intent === 'commercial') {
    baseDescription += ` ${secondary.slice(0, 2).join(', ')} 전문 컨설팅으로 고객 맞춤형 솔루션을 제공합니다.`;
  } else if (intent === 'informational') {
    baseDescription += ` ${(longTail && longTail[0]) || secondary[0]}에 대한 완벽한 가이드를 제공합니다.`;
  }

  baseDescription += ` 15년 경험의 전문가와 무료 상담으로 최적의 해결책을 찾아보세요.`;

  // 150자 내외로 조정
  if (baseDescription.length > 155) {
    baseDescription = baseDescription.substring(0, 152) + '...';
  }

  return baseDescription;
}

/**
 * 구조화 데이터 생성 (JSON-LD)
 */
function generateStructuredData(
  keywords: KeywordData,
  page: string,
  title: string,
  description: string
): any {
  const pageUrl = `${SITE_CONFIG.domain}${page}`;

  const structuredData: any = {
    '@context': 'https://schema.org',
    '@graph': [
      // 웹사이트 정보
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.domain}/#website`,
        url: SITE_CONFIG.domain,
        name: SITE_CONFIG.siteName,
        description: SITE_CONFIG.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.domain}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        publisher: {
          '@id': `${SITE_CONFIG.domain}/#organization`,
        },
      },

      // 조직 정보
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.domain}/#organization`,
        name: SITE_CONFIG.business.name,
        url: SITE_CONFIG.domain,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.domain}/logo.png`,
          width: 300,
          height: 100,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE_CONFIG.business.phone,
          contactType: 'customer service',
          email: SITE_CONFIG.business.email,
          availableLanguage: ['ko', 'Korean'],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.business.address.street,
          addressLocality: SITE_CONFIG.business.address.city,
          addressRegion: SITE_CONFIG.business.address.region,
          postalCode: SITE_CONFIG.business.address.postalCode,
          addressCountry: SITE_CONFIG.business.address.country,
        },
        sameAs: SITE_CONFIG.business.socialMedia,
      },

      // 웹페이지 정보
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: description,
        isPartOf: {
          '@id': `${SITE_CONFIG.domain}/#website`,
        },
        about: {
          '@id': `${SITE_CONFIG.domain}/#organization`,
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
      },
    ],
  };

  // 페이지별 추가 구조화 데이터
  if (page === '/services') {
    structuredData['@graph'].push({
      '@type': 'Service',
      name: keywords.primary,
      description: description,
      provider: {
        '@id': `${SITE_CONFIG.domain}/#organization`,
      },
      serviceType: keywords.secondary.join(', '),
      areaServed: {
        '@type': 'Country',
        name: '대한민국',
      },
    });
  }

  if (page === '/about') {
    structuredData['@graph'].push({
      '@type': 'ProfessionalService',
      name: SITE_CONFIG.business.name,
      description: description,
      priceRange: '$$$$',
      telephone: SITE_CONFIG.business.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.business.address.street,
        addressLocality: SITE_CONFIG.business.address.city,
        addressRegion: SITE_CONFIG.business.address.region,
        postalCode: SITE_CONFIG.business.address.postalCode,
        addressCountry: SITE_CONFIG.business.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.business.coordinates.lat,
        longitude: SITE_CONFIG.business.coordinates.lng,
      },
      openingHours: SITE_CONFIG.business.hours,
    });
  }

  return structuredData;
}

/**
 * 로컬 비즈니스 스키마 생성
 */
function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.business.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.domain,
    telephone: SITE_CONFIG.business.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.business.address.street,
      addressLocality: SITE_CONFIG.business.address.city,
      addressRegion: SITE_CONFIG.business.address.region,
      postalCode: SITE_CONFIG.business.address.postalCode,
      addressCountry: SITE_CONFIG.business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.business.coordinates.lat,
      longitude: SITE_CONFIG.business.coordinates.lng,
    },
    openingHours: SITE_CONFIG.business.hours,
    sameAs: SITE_CONFIG.business.socialMedia,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 127,
    },
  };
}

/**
 * 페이지별 최적화된 메타태그 설정
 */
export const PAGE_META_CONFIGS = {
  '/': {
    keywords: targetKeywords.familyOffice,
    customContent: {
      title:
        '성공한 CEO를 위한 프라이빗 패밀리오피스 | 상속세 & 자산관리 솔루션',
      description:
        '성공한 기업가와 30억 이상 자산가를 위한 프라이빗 패밀리오피스. 상속세 50% 절감, 법인 자금 유동화, 글로벌 자산배분. 삼성생명 1000억+ 운용 실적.',
    },
  },
  '/services': {
    keywords: targetKeywords.businessSuccession,
    customContent: {
      title:
        '가업승계 전문 서비스 | 중소기업 경영권 승계 컨설팅 - 패밀리오피스 S',
      description:
        '가업승계 성공률 95%! 중소기업 경영권 승계, 절세 전략, 차세대 교육까지. 300개 기업 성공사례 기반 맞춤형 승계 플랜. 전문가 무료 진단 신청하세요.',
    },
  },
  '/program': {
    keywords: targetKeywords.businessSuccession,
    customContent: {
      title:
        '가업승계 교육 프로그램 | CEO·후계자 전문 교육 과정 - 패밀리오피스 S',
      description:
        'CEO와 후계자를 위한 가업승계 전문 교육 프로그램. 실무 중심 커리큘럼, 1:1 멘토링, 네트워킹까지. 성공한 기업가들의 검증된 교육 과정을 확인하세요.',
    },
  },
  '/contact': {
    keywords: targetKeywords.familyOffice,
    customContent: {
      title: '무료 상담 신청 | 패밀리오피스 전문가 1:1 컨설팅 - 패밀리오피스 S',
      description:
        '패밀리오피스 전문가와 1:1 무료 상담. 가업승계, 자산관리, 절세전략 맞춤 컨설팅. 온라인/오프라인 상담 가능. 지금 신청하세요.',
    },
  },
};

/**
 * 네이버 웹마스터 최적화
 */
export function generateNaverWebmasterMeta(): Record<string, string> {
  return {
    'naver-site-verification': 'naver_verification_code',
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    'format-detection': 'telephone=no, address=no, email=no',
    'mobile-web-app-capable': 'yes',
    'mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  };
}

/**
 * 소셜 미디어 최적화 메타태그
 */
export function generateSocialMediaMeta(
  title: string,
  description: string,
  image: string,
  url: string
): Record<string, string> {
  return {
    // Facebook Open Graph
    'property:og:type': 'website',
    'property:og:title': title,
    'property:og:description': description,
    'property:og:image': image,
    'property:og:url': url,
    'property:og:site_name': SITE_CONFIG.siteName,
    'property:og:locale': 'ko_KR',

    // Twitter Card
    'name:twitter:card': 'summary_large_image',
    'name:twitter:title': title,
    'name:twitter:description': description,
    'name:twitter:image': image,
    'name:twitter:site': '@familyoffices',

    // 네이버 블로그 연동
    'property:article:author': 'https://blog.naver.com/familyoffices',
    'property:article:publisher': SITE_CONFIG.domain,

    // 카카오톡 링크 미리보기
    'property:kakao:title': title,
    'property:kakao:description': description,
    'property:kakao:image': image,
  };
}
