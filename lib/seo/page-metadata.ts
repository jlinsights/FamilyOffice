/**
 * 페이지별 최적화된 메타데이터 설정
 * 네이버 검색 엔진 최적화 중심
 */

import { Metadata } from 'next';
import { generateNaverOptimizedMeta, PAGE_META_CONFIGS } from './metadata-optimizer';
import { targetKeywords } from '../seo-keywords';

/**
 * 홈페이지 메타데이터
 */
export function generateHomeMetadata(): Metadata {
  const config = PAGE_META_CONFIGS['/'];
  if (!config?.keywords) {
    throw new Error('Home page keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/', config.keywords, config.customContent);
}

/**
 * 서비스 페이지 메타데이터
 */
export function generateServicesMetadata(): Metadata {
  const config = PAGE_META_CONFIGS['/services'];
  if (!config?.keywords) {
    throw new Error('Services page keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/services', config.keywords, config.customContent);
}

/**
 * 프로그램 페이지 메타데이터
 */
export function generateProgramMetadata(): Metadata {
  const config = PAGE_META_CONFIGS['/program'];
  if (!config?.keywords) {
    throw new Error('Program page keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/program', config.keywords, config.customContent);
}

/**
 * 연락처 페이지 메타데이터
 */
export function generateContactMetadata(): Metadata {
  const config = PAGE_META_CONFIGS['/contact'];
  if (!config?.keywords) {
    throw new Error('Contact page keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/contact', config.keywords, config.customContent);
}

/**
 * 블로그 메타데이터
 */
export function generateBlogMetadata(slug?: string): Metadata {
  const keywords = targetKeywords.businessSuccession;
  if (!keywords) {
    throw new Error('Blog keywords configuration not found');
  }
  const isSpecificPost = Boolean(slug);
  
  if (isSpecificPost) {
    return generateNaverOptimizedMeta(`/blog/${slug}`, keywords, {
      title: `${slug} | 가업승계 전문가 가이드 - 패밀리오피스 S`,
      description: `${slug}에 대한 전문가 분석과 실무 가이드. 중소기업 CEO를 위한 실용적 솔루션을 제공합니다.`
    });
  }

  return generateNaverOptimizedMeta('/blog', keywords, {
    title: '가업승계 블로그 | 실무 가이드와 전문가 인사이트 - 패밀리오피스 S',
    description: '가업승계, 절세전략, 자산관리 전문가가 직접 작성한 실무 가이드. 매주 업데이트되는 최신 정보와 성공 사례를 확인하세요.'
  });
}

/**
 * 세미나 페이지 메타데이터
 */
export function generateSeminarMetadata(): Metadata {
  const keywords = targetKeywords.businessSuccession;
  if (!keywords) {
    throw new Error('Seminar keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/seminar', keywords, {
    title: '가업승계 세미나 | CEO·후계자 전문 교육 과정 - 패밀리오피스 S',
    description: 'CEO와 후계자를 위한 가업승계 전문 세미나. 실무 중심 교육과 1:1 멘토링으로 성공적인 승계를 준비하세요. 매월 개최, 사전 예약 필수.'
  });
}

/**
 * About 페이지 메타데이터
 */
export function generateAboutMetadata(): Metadata {
  const keywords = targetKeywords.familyOffice;
  if (!keywords) {
    throw new Error('About keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/about', keywords, {
    title: '패밀리오피스 S 소개 | 15년 경험의 전문가팀 - 패밀리오피스 S',
    description: '15년 경험의 전문가팀이 제공하는 프리미엄 패밀리오피스 서비스. 300개 기업 성공 사례, 검증된 노하우로 고객의 자산을 안전하게 관리합니다.'
  });
}

/**
 * 브랜드 페이지 메타데이터
 */
export function generateBrandMetadata(): Metadata {
  const keywords = targetKeywords.familyOffice;
  if (!keywords) {
    throw new Error('Brand keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/brand', keywords, {
    title: '브랜드 스토리 | 성공한 기업가들의 신뢰받는 파트너 - 패밀리오피스 S',
    description: '성공한 기업가들이 선택한 프리미엄 패밀리오피스. 우리의 브랜드 스토리와 고객 중심 서비스 철학을 소개합니다.'
  });
}

/**
 * FAQ 페이지 메타데이터
 */
export function generateFAQMetadata(): Metadata {
  const keywords = targetKeywords.familyOffice;
  if (!keywords) {
    throw new Error('FAQ keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/faq', keywords, {
    title: '자주묻는질문 | 패밀리오피스 서비스 FAQ - 패밀리오피스 S',
    description: '패밀리오피스 서비스에 대한 자주묻는질문과 답변. 서비스 이용 방법, 수수료, 절차 등 궁금한 모든 것을 확인하세요.'
  });
}

/**
 * 프라이버시 정책 메타데이터
 */
export function generatePrivacyMetadata(): Metadata {
  const keywords = targetKeywords.familyOffice;
  if (!keywords) {
    throw new Error('Privacy keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/privacy', keywords, {
    title: '개인정보처리방침 | 고객 정보보호 정책 - 패밀리오피스 S',
    description: '패밀리오피스 S의 개인정보처리방침. 고객의 소중한 개인정보를 안전하게 보호하는 정책과 절차를 안내합니다.'
  });
}

/**
 * 이용약관 메타데이터
 */
export function generateTermsMetadata(): Metadata {
  const keywords = targetKeywords.familyOffice;
  if (!keywords) {
    throw new Error('Terms keywords configuration not found');
  }
  return generateNaverOptimizedMeta('/terms', keywords, {
    title: '서비스 이용약관 | 패밀리오피스 서비스 약관 - 패밀리오피스 S',
    description: '패밀리오피스 S 서비스 이용약관. 서비스 이용 시 적용되는 약관과 조건을 안내합니다.'
  });
}

/**
 * 동적 페이지 메타데이터 생성
 */
export function generateDynamicMetadata(
  path: string,
  title?: string,
  description?: string,
  keywords?: string[]
): Metadata {
  // 기본 키워드 설정
  const defaultKeywords = targetKeywords.familyOffice;
  
  if (!defaultKeywords) {
    throw new Error('Default keywords configuration not found');
  }
  
  // 키워드 확장
  const extendedKeywords = {
    ...defaultKeywords,
    secondary: keywords ? [...defaultKeywords.secondary, ...keywords] : defaultKeywords.secondary
  };

  return generateNaverOptimizedMeta(path, extendedKeywords, {
    title: title || `${path.split('/').pop()} | 패밀리오피스 S`,
    description: description || '패밀리오피스 전문 서비스를 확인하세요.'
  });
}

/**
 * 페이지 타입별 기본 구조화 데이터
 */
export const PAGE_STRUCTURED_DATA = {
  home: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "패밀리오피스 S",
    "url": "https://familyoffices.vip",
    "logo": "https://familyoffices.vip/logo.png",
    "description": "한국 중소중견기업 CEO를 위한 전문 패밀리오피스 서비스",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "테헤란로 123",
      "addressLocality": "강남구",
      "addressRegion": "서울특별시",
      "postalCode": "06142",
      "addressCountry": "KR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-2-1234-5678",
      "contactType": "customer service"
    }
  },
  
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "패밀리오피스 서비스",
    "description": "중소중견기업 CEO를 위한 종합 자산관리 서비스",
    "provider": {
      "@type": "Organization",
      "name": "패밀리오피스 S"
    },
    "areaServed": {
      "@type": "Country",
      "name": "대한민국"
    }
  },
  
  blog: {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "패밀리오피스 블로그",
    "description": "가업승계와 자산관리 전문가 블로그",
    "url": "https://familyoffices.vip/blog",
    "publisher": {
      "@type": "Organization",
      "name": "패밀리오피스 S"
    }
  }
};