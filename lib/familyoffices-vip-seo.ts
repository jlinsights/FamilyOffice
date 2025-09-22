// FamilyOffices VIP 독립 브랜드 전용 SEO 최적화
import type { Metadata } from 'next';

export const FAMILYOFFICES_VIP_SEO = {
  // 독립 전문가 차별화 키워드
  primaryKeywords: [
    // 독립성 강조
    '독립 자산관리',
    '독립 재무설계사',
    '전문 패밀리오피스',
    '개인맞춤 자산관리',
    '독립 투자자문',
    
    // 개인화 서비스
    '맞춤형 포트폴리오',
    '개인 전용 컨설팅',
    '1:1 자산관리',
    '개인화 투자전략',
    '맞춤 금융설계',
    
    // 중소기업 오너 특화
    '중소기업 오너 자산관리',
    '개인사업자 재무설계',
    '소상공인 자산증식',
    '1인기업 금융관리',
    
    // 전문성 강조
    '전문가 직접 관리',
    '소규모 전문 서비스',
    '부티크 자산관리',
    '프리미엄 개인서비스'
  ],

  // 대기업 대비 차별화 키워드
  antiEstablishmentKeywords: [
    '대기업이 아닌',
    '개인 중심의',
    '유연한 서비스',
    '신속한 의사결정',
    '개인적 관계',
    '접근 가능한',
    '투명한 수수료',
    '복잡하지 않은'
  ],

  // 메타데이터 템플릿
  metadataTemplate: {
    title: 'FamilyOffice S - 독립 전문가의 개인맞춤 패밀리오피스',
    description: '대기업이 제공할 수 없는 진정한 개인맞춤 서비스. 독립 전문가가 직접 관리하는 중소기업 오너·개인사업자 전용 프리미엄 자산관리.',
    keywords: [
      '독립 자산관리',
      '개인맞춤 설계',
      '전문 컨설팅',
      '중소기업 오너',
      '개인사업자',
      '맞춤형 포트폴리오',
      '독립 재무설계',
      '개인 패밀리오피스',
      '전문가 직접 관리'
    ]
  },

  // 페이지별 SEO 설정
  pageConfigs: {
    home: {
      title: 'FamilyOffice S | 독립 전문가의 개인맞춤 자산관리',
      description: '대기업 서비스에 만족하지 못하는 분들을 위한 독립 전문가의 개인맞춤 패밀리오피스. 중소기업 오너·개인사업자 전용.',
      focusKeywords: ['독립 자산관리', '개인맞춤', '전문 컨설팅', '중소기업 오너']
    },
    
    'independent-advisory': {
      title: '독립 투자자문 서비스 | FamilyOffice S',
      description: '이해상충 없는 순수한 독립 투자자문. 고객 이익만을 추구하는 투명하고 객관적인 자산관리 서비스.',
      focusKeywords: ['독립 투자자문', '이해상충 없는', '투명한', '객관적']
    },
    
    'personalized-portfolio': {
      title: '개인맞춤 포트폴리오 설계 | FamilyOffice S',
      description: '획일화된 상품이 아닌 개인의 상황과 목표에 완벽히 맞춤화된 포트폴리오. 전문가가 직접 설계하고 관리.',
      focusKeywords: ['개인맞춤 포트폴리오', '맞춤화', '개인 상황', '직접 관리']
    },
    
    'sme-owner-services': {
      title: '중소기업 오너 전용 서비스 | FamilyOffice S',
      description: '중소기업 오너와 개인사업자를 위한 특화 서비스. 사업과 개인 자산을 통합 관리하는 맞춤형 솔루션.',
      focusKeywords: ['중소기업 오너', '개인사업자', '사업 자산', '통합 관리']
    },
    
    'boutique-service': {
      title: '부티크 자산관리 서비스 | FamilyOffice S',
      description: '소수 고객만을 위한 프리미엄 부티크 서비스. 대기업에서 경험할 수 없는 개인적이고 세심한 관리.',
      focusKeywords: ['부티크 서비스', '소수 고객', '개인적', '세심한 관리']
    }
  },

  // 차별화 메시지
  differentiationMessages: {
    vsLargeCompanies: '대기업은 제공할 수 없는 진정한 개인맞춤 서비스',
    flexibility: '복잡한 절차 없이 신속하고 유연한 의사결정',
    transparency: '숨겨진 수수료 없는 투명한 비용 구조',
    relationship: '단순한 고객이 아닌 평생 파트너 관계',
    expertise: '소수 정예 전문가의 직접적인 관리와 소통'
  },

  // 구조화 데이터 스키마
  structuredData: {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "FamilyOffice S - Independent Wealth Management",
    "description": "독립 전문가의 개인맞춤 패밀리오피스 서비스",
    "url": "https://familyoffices.vip",
    "serviceType": "Independent Personal Wealth Management",
    "provider": {
      "@type": "Organization",
      "name": "FamilyOffice S",
      "description": "독립 전문가 그룹"
    },
    "areaServed": "KR",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "중소기업 오너, 개인사업자, 전문직, 신규 부유층"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "FamilyOffice S Independent Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "독립 투자자문 서비스",
          "description": "이해상충 없는 객관적 투자자문"
        },
        {
          "@type": "Offer",
          "name": "개인맞춤 포트폴리오",
          "description": "개인 상황에 완벽 맞춤화된 자산 배분"
        },
        {
          "@type": "Offer",
          "name": "중소기업 오너 특화",
          "description": "사업과 개인 자산 통합 관리"
        }
      ]
    },
    "knowsAbout": [
      "독립 자산관리",
      "개인맞춤 투자",
      "중소기업 재무설계",
      "부티크 금융서비스"
    ],
    "slogan": "대기업이 제공할 수 없는 진정한 개인맞춤 서비스"
  }
};

// FamilyOffices VIP 전용 메타데이터 생성 함수
export function generateFamilyOfficesVIPMetadata(pageName?: string): Metadata {
  const config = pageName ? (FAMILYOFFICES_VIP_SEO.pageConfigs as any)[pageName] : null;
  const base = FAMILYOFFICES_VIP_SEO.metadataTemplate;
  
  return {
    metadataBase: new URL('https://familyoffices.vip'),
    title: config?.title || base.title,
    description: config?.description || base.description,
    keywords: config?.focusKeywords || base.keywords,
    
    openGraph: {
      title: config?.title || base.title,
      description: config?.description || base.description,
      url: 'https://familyoffices.vip',
      siteName: 'FamilyOffice S',
      type: 'website',
      images: [{
        url: '/og-image-familyoffices-vip.jpg',
        width: 1200,
        height: 630,
        alt: 'FamilyOffice S Independent Wealth Management'
      }]
    },
    
    twitter: {
      card: 'summary_large_image',
      title: config?.title || base.title,
      description: config?.description || base.description,
      images: ['/og-image-familyoffices-vip.jpg']
    },
    
    alternates: {
      canonical: `https://familyoffices.vip${pageName ? `/${pageName}` : ''}`,
    },
    
    other: {
      'brand-positioning': '독립성 + 개인화 + 전문성',
      'target-audience': '중소기업 오너, 개인사업자, 전문직, 신규 부유층',
      'service-differentiator': '대기업 대비 유연성 + 개인적 관계 + 투명성',
      'competitive-advantage': '진정한 개인맞춤 서비스'
    }
  };
}

// 대기업 대비 차별화 콘텐츠 생성 함수
export function generateDifferentiationContent() {
  return {
    heroMessage: "대기업이 아니기에 가능한 진정한 맞춤 서비스",
    subMessage: "복잡한 절차 없이, 숨겨진 수수료 없이, 개인적 관계로",
    
    comparisonPoints: [
      {
        aspect: "의사결정 속도",
        largeCompany: "복잡한 내부 절차",
        us: "즉시 의사결정 가능"
      },
      {
        aspect: "서비스 개인화",
        largeCompany: "표준화된 상품",
        us: "완전 맞춤형 설계"
      },
      {
        aspect: "관계의 깊이",
        largeCompany: "고객 번호",
        us: "평생 파트너"
      },
      {
        aspect: "투명성",
        largeCompany: "복잡한 수수료 구조",
        us: "명확하고 투명한 비용"
      },
      {
        aspect: "전문성 접근",
        largeCompany: "계층적 구조",
        us: "전문가 직접 소통"
      }
    ]
  };
}