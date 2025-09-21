// Samsung Life VIP 도메인 전용 SEO 최적화
import type { Metadata } from 'next';

export const SAMSUNGLIFE_VIP_SEO = {
  // 기업 전용 키워드 전략
  primaryKeywords: [
    // 기업보험 관련
    '기업보험 전문가',
    '법인보험 설계',
    '기업재해보장보험',
    '경영진 보장보험',
    '기업 단체보험',
    
    // 법인세무 관련
    '법인세 절감 전략',
    '기업 세무 최적화',
    '법인 절세 방법',
    '기업 세무 컨설팅',
    
    // 기업 승계 관련
    '기업 승계 계획',
    '법인 가업승계',
    '기업 오너 승계',
    '경영권 승계 설계',
    
    // 대기업 관련
    '대기업 자산관리',
    '상장기업 CFO 서비스',
    '중견기업 리스크관리',
    '그룹사 통합 관리'
  ],

  // 경쟁 차별화 키워드
  differentiationKeywords: [
    '삼성생명 파트너',
    '기업 전용 서비스',
    '대기업 백그라운드',
    '안정성 보장',
    '글로벌 네트워크',
    '통합 솔루션'
  ],

  // 메타데이터 템플릿
  metadataTemplate: {
    title: '삼성생명 VIP - 기업 전용 프리미엄 금융 솔루션',
    description: '대기업부터 중견기업까지, 삼성생명과 함께하는 기업 전용 프리미엄 금융 서비스. 기업보험·법인세절감·경영진보장·승계계획 통합 솔루션 제공.',
    keywords: [
      '삼성생명 기업서비스',
      '법인보험 전문',
      '기업 자산관리',
      '법인세 절감',
      '경영진 보장',
      '기업 승계',
      '대기업 서비스',
      '상장기업 CFO',
      '중견기업 리스크관리'
    ]
  },

  // 페이지별 SEO 설정
  pageConfigs: {
    home: {
      title: '삼성생명 VIP | 기업 전용 프리미엄 금융 솔루션',
      description: '대기업·중견기업 CEO를 위한 삼성생명 VIP 서비스. 기업보험·법인세절감·경영진보장·승계계획 통합 솔루션.',
      focusKeywords: ['삼성생명 VIP', '기업 전용', '법인보험', '경영진보장']
    },
    
    'corporate-insurance': {
      title: '기업보험 전문 서비스 | 삼성생명 VIP',
      description: '기업재해보장보험부터 경영진보장보험까지. 삼성생명의 노하우로 기업 리스크를 완벽 관리하는 맞춤형 보험 솔루션.',
      focusKeywords: ['기업보험', '법인보험', '기업재해보장', '경영진보장']
    },
    
    'tax-optimization': {
      title: '법인세 절감 전략 | 삼성생명 VIP',
      description: '합법적 법인세 절감부터 기업 세무 최적화까지. 삼성생명 세무 전문가가 제공하는 기업 맞춤형 절세 전략.',
      focusKeywords: ['법인세 절감', '기업 절세', '세무 최적화', '법인 세무']
    },
    
    'succession-planning': {
      title: '기업 승계 계획 | 삼성생명 VIP',
      description: '안정적인 경영권 승계부터 가업승계까지. 삼성생명이 설계하는 체계적인 기업 승계 솔루션.',
      focusKeywords: ['기업 승계', '가업승계', '경영권 승계', '승계 계획']
    },
    
    'enterprise-services': {
      title: '대기업·상장기업 전용 서비스 | 삼성생명 VIP',
      description: '대기업 계열사부터 상장기업까지. 규모와 복잡성을 이해하는 삼성생명의 기업 전용 프리미엄 서비스.',
      focusKeywords: ['대기업 서비스', '상장기업 CFO', '중견기업', '기업 전용']
    }
  },

  // 구조화 데이터 스키마
  structuredData: {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Samsung Life VIP Corporate Services",
    "description": "대기업·중견기업을 위한 삼성생명 VIP 프리미엄 금융 서비스",
    "url": "https://samsunglife.vip",
    "serviceType": "Corporate Financial Services",
    "provider": {
      "@type": "Organization",
      "name": "Samsung Life Insurance",
      "url": "https://www.samsunglife.com"
    },
    "areaServed": "KR",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "대기업, 상장기업, 중견기업 CEO 및 CFO"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Samsung Life VIP Corporate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "기업보험 전문 서비스",
          "description": "기업재해보장보험, 경영진보장보험, 법인보험 설계"
        },
        {
          "@type": "Offer", 
          "name": "법인세 절감 전략",
          "description": "합법적 절세 방법, 기업 세무 최적화 컨설팅"
        },
        {
          "@type": "Offer",
          "name": "기업 승계 계획",
          "description": "경영권 승계, 가업승계 설계 및 실행"
        }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-502-555-0870",
      "contactType": "customer service",
      "availableLanguage": "Korean"
    }
  }
};

// Samsung Life VIP 전용 메타데이터 생성 함수
export function generateSamsungLifeVIPMetadata(pageName?: string): Metadata {
  const config = pageName ? SAMSUNGLIFE_VIP_SEO.pageConfigs[pageName] : null;
  const base = SAMSUNGLIFE_VIP_SEO.metadataTemplate;
  
  return {
    metadataBase: new URL('https://samsunglife.vip'),
    title: config?.title || base.title,
    description: config?.description || base.description,
    keywords: config?.focusKeywords || base.keywords,
    
    openGraph: {
      title: config?.title || base.title,
      description: config?.description || base.description,
      url: 'https://samsunglife.vip',
      siteName: 'Samsung Life VIP',
      type: 'website',
      images: [{
        url: '/og-image-samsunglife-vip.jpg',
        width: 1200,
        height: 630,
        alt: 'Samsung Life VIP Corporate Services'
      }]
    },
    
    twitter: {
      card: 'summary_large_image',
      title: config?.title || base.title,
      description: config?.description || base.description,
      images: ['/og-image-samsunglife-vip.jpg']
    },
    
    alternates: {
      canonical: `https://samsunglife.vip${pageName ? `/${pageName}` : ''}`,
    },
    
    other: {
      'brand-positioning': '삼성생명 백그라운드 + 기업 특화 서비스',
      'target-audience': '대기업, 상장기업, 중견기업 CEO 및 CFO',
      'service-differentiator': '안정성 + 글로벌 네트워크 + 통합 솔루션'
    }
  };
}