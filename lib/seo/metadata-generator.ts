/**
 * SEO 메타데이터 자동 생성 시스템
 * 키워드 최적화된 메타데이터 및 구조화 데이터 생성
 */

import { Metadata } from 'next';
import { KEYWORD_CLUSTERS, CONTENT_KEYWORD_MAPPING } from './keyword-strategy';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  structuredData?: Record<string, any>;
}

/**
 * 동적 메타데이터 생성
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = 'https://familyoffices.vip';
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    
    // Open Graph
    openGraph: {
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      url: config.canonicalUrl || baseUrl,
      siteName: 'FamilyOffice S - 삼성생명 패밀리오피스',
      images: [
        {
          url: config.openGraph?.image || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: config.title,
        }
      ],
      type: config.openGraph?.type || 'website',
      locale: 'ko_KR',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [config.openGraph?.image || `${baseUrl}/og-image.jpg`],
      creator: '@familyoffice_s',
    },

    // 추가 메타 태그
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

    // Canonical URL
    alternates: {
      canonical: config.canonicalUrl || baseUrl,
    },

    // 추가 SEO 태그
    other: {
      'msapplication-TileColor': '#1e3a8a',
      'theme-color': '#1e3a8a',
    },
  };
}

/**
 * 페이지별 SEO 설정
 */
export const PAGE_SEO_CONFIGS: Record<string, SEOConfig> = {
  home: {
    title: '패밀리오피스 S | 삼성생명 프리미엄 자산관리 서비스',
    description: '중견기업 CEO를 위한 전문 패밀리오피스 서비스. 기업승계, 자산관리, 세무최적화, 리스크관리를 한번에. 삼성생명 30년 경험의 전문가들이 맞춤형 솔루션을 제공합니다.',
    keywords: ['패밀리오피스', '자산관리서비스', '삼성생명', 'CEO 자산관리', '기업승계', '세무최적화'],
    openGraph: {
      type: 'website',
      image: '/images/hero/main-og.jpg'
    }
  },

  services: {
    title: '패밀리오피스 종합 자산관리 서비스 | 프리미엄 금융 솔루션',
    description: '고액자산가를 위한 종합 자산관리 서비스. 포트폴리오 관리, 투자자문, 세무 컨설팅, 보험설계까지 원스톱 서비스로 제공합니다.',
    keywords: ['자산관리서비스', '프라이빗뱅킹', '포트폴리오관리', '투자자문', '종합자산관리'],
    openGraph: {
      type: 'service',
      image: '/images/services/services-og.jpg'
    }
  },

  businessSuccession: {
    title: '기업승계 전략 컨설팅 | 가업승계 세무 최적화 전문',
    description: '성공적인 기업승계를 위한 전략 컨설팅. 승계 계획 수립부터 세무 최적화, 경영권 이전까지 체계적으로 지원합니다.',
    keywords: ['기업승계', '가업승계', '승계계획', '경영권승계', '승계 세무최적화'],
    openGraph: {
      type: 'service',
      image: '/images/succession/succession-og.jpg'
    }
  },

  taxStrategy: {
    title: '세무최적화 전략 | 상속세 증여세 절세 전문 컨설팅',
    description: '상속세, 증여세 절세를 위한 전문 세무 컨설팅. 합법적인 절세 전략으로 세무 리스크를 최소화하고 자산 보전을 실현합니다.',
    keywords: ['세무최적화', '절세전략', '상속세', '증여세', '세무컨설팅'],
    openGraph: {
      type: 'service',
      image: '/images/tax/tax-og.jpg'
    }
  },

  blog: {
    title: '자산관리 인사이트 | 패밀리오피스 전문 블로그',
    description: '자산관리 전문가들의 인사이트와 시장 분석을 제공합니다. 투자 전략, 세무 팁, 시장 동향까지 전문 정보를 확인하세요.',
    keywords: ['자산관리 블로그', '투자 인사이트', '시장분석', '자산관리 팁'],
    openGraph: {
      type: 'blog',
      image: '/images/blog/blog-og.jpg'
    }
  },

  education: {
    title: 'CEO 자산관리 교육 프로그램 | 차세대 경영진 교육',
    description: 'CEO와 차세대 경영진을 위한 전문 자산관리 교육. 실무 중심의 커리큘럼으로 체계적인 자산관리 역량을 키워보세요.',
    keywords: ['CEO 자산관리 교육', '차세대 경영진 교육', '자산관리교육', '패밀리오피스 세미나'],
    openGraph: {
      type: 'service',
      image: '/images/education/education-og.jpg'
    }
  }
};

/**
 * 구조화 데이터 생성
 */
export function generateStructuredData(type: string, data: any) {
  const baseUrl = 'https://familyoffices.vip';
  
  const commonStructure = {
    "@context": "https://schema.org",
    "@type": type,
    "url": baseUrl,
    "name": "FamilyOffice S",
    "description": "중견기업 CEO를 위한 전문 패밀리오피스 서비스",
    "provider": {
      "@type": "Organization",
      "name": "삼성생명보험주식회사",
      "url": "https://www.samsunglife.com",
      "logo": `${baseUrl}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+82-2-751-3344",
        "contactType": "customer service",
        "availableLanguage": "Korean"
      }
    }
  };

  switch (type) {
    case 'Organization':
      return {
        ...commonStructure,
        "@type": "FinancialService",
        "serviceType": "패밀리오피스",
        "areaServed": "대한민국",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "패밀리오피스 서비스",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "자산관리 서비스",
                "description": "고액자산가를 위한 종합 자산관리"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "기업승계 컨설팅",
                "description": "성공적인 기업승계를 위한 전략 수립"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "세무최적화",
                "description": "상속세, 증여세 절세 전문 컨설팅"
              }
            }
          ]
        }
      };

    case 'Service':
      return {
        ...commonStructure,
        "@type": "Service",
        "name": data.name,
        "description": data.description,
        "serviceType": data.serviceType,
        "offers": {
          "@type": "Offer",
          "description": data.description,
          "provider": commonStructure.provider
        }
      };

    case 'Article':
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.description,
        "image": data.image,
        "author": {
          "@type": "Organization",
          "name": "FamilyOffice S 편집부"
        },
        "publisher": commonStructure.provider,
        "datePublished": data.publishDate,
        "dateModified": data.modifiedDate,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data.url
        }
      };

    case 'FAQ':
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.questions.map((q: any) => ({
          "@type": "Question",
          "name": q.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.answer
          }
        }))
      };

    case 'BreadcrumbList':
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };

    default:
      return commonStructure;
  }
}

/**
 * 동적 키워드 밀도 계산
 */
export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
  return (keywordCount / words.length) * 100;
}

/**
 * 메타 설명 최적화
 */
export function optimizeMetaDescription(
  baseDescription: string, 
  targetKeywords: string[], 
  maxLength: number = 160
): string {
  let optimized = baseDescription;
  
  // 주요 키워드가 포함되어 있는지 확인
  const missingKeywords = targetKeywords.filter(keyword => 
    !optimized.toLowerCase().includes(keyword.toLowerCase())
  );

  // 누락된 키워드를 자연스럽게 추가
  if (missingKeywords.length > 0 && optimized.length < maxLength - 20) {
    const keywordPhrase = missingKeywords.slice(0, 2).join(', ');
    optimized = `${optimized} ${keywordPhrase} 전문 서비스.`;
  }

  // 길이 조정
  if (optimized.length > maxLength) {
    optimized = optimized.substring(0, maxLength - 3) + '...';
  }

  return optimized;
}

/**
 * 페이지별 맞춤형 메타데이터 생성
 */
export function generatePageMetadata(
  pathname: string, 
  customData?: Partial<SEOConfig>
): Metadata {
  const pageKey = pathname.split('/')[1] || 'home';
  const config = PAGE_SEO_CONFIGS[pageKey] || PAGE_SEO_CONFIGS.home;
  
  // 커스텀 데이터와 병합
  const finalConfig: SEOConfig = {
    ...config,
    ...customData,
    keywords: [...config.keywords, ...(customData?.keywords || [])],
  };

  return generateMetadata(finalConfig);
}

export default {
  generateMetadata,
  PAGE_SEO_CONFIGS,
  generateStructuredData,
  calculateKeywordDensity,
  optimizeMetaDescription,
  generatePageMetadata
};