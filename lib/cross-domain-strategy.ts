// 듀얼 도메인 크로스 마케팅 및 연동 전략
import type { Metadata } from 'next';

export interface CrossDomainConfig {
  sourceKeywords: string[];
  targetDomain: string;
  targetKeywords: string[];
  redirectionLogic: string;
  seoStrategy: string;
}

export const CROSS_DOMAIN_STRATEGY = {
  // 도메인 간 상호 보완 전략
  crossReferencing: {
    'samsunglife.vip': {
      // 대기업 서비스에서 개인 서비스로 유도하는 경우
      referralTriggers: [
        '개인 자산이 50억 미만',
        '더 개인화된 서비스 선호',
        '독립적인 자문 필요',
        '유연한 서비스 구조 선호',
        '투명한 수수료 구조 원함'
      ],
      referralMessage: '더 개인화된 서비스가 필요하시다면',
      targetDomain: 'familyoffices.vip',
      linkText: '개인 전문 서비스 보기',
      seoBoost: '도메인 권위도 전달, 관련성 신호 강화'
    },
    
    'familyoffices.vip': {
      // 개인 서비스에서 기업 서비스로 유도하는 경우
      referralTriggers: [
        '기업 자산이 100억 이상',
        '복잡한 기업 구조',
        '대규모 조직 관리 필요',
        '글로벌 서비스 필요',
        '안정성 우선 고려'
      ],
      referralMessage: '기업 전용 서비스가 필요하시다면',
      targetDomain: 'samsunglife.vip',
      linkText: '기업 전문 서비스 보기',
      seoBoost: '틈새 키워드에서 메인 키워드로 권위도 전달'
    }
  },

  // SEO 상호 부스팅 전략
  seoCrossBoosting: {
    // 공통 키워드에서 차별화
    sharedKeywords: [
      {
        keyword: '패밀리오피스',
        samsunglifeVip: '기업 패밀리오피스',
        familyofficesVip: '개인 패밀리오피스'
      },
      {
        keyword: '자산관리',
        samsunglifeVip: '기업 자산관리',
        familyofficesVip: '개인 자산관리'
      },
      {
        keyword: 'VIP 서비스',
        samsunglifeVip: '기업 VIP 서비스',
        familyofficesVip: '개인 VIP 서비스'
      }
    ],

    // 상호 링크 전략
    internalLinking: {
      // Samsung Life VIP에서 Family Offices VIP로
      'samsunglife-to-familyoffices': [
        {
          anchor: '개인맞춤 서비스',
          context: '기업 서비스 외에 개인맞춤 자산관리도 필요하신가요?',
          targetPage: 'https://familyoffices.vip/personalized-portfolio',
          seoValue: 'Long-tail 키워드 강화'
        },
        {
          anchor: '독립 자문 서비스',
          context: '더 독립적이고 객관적인 자문을 원하신다면',
          targetPage: 'https://familyoffices.vip/independent-advisory',
          seoValue: '차별화 키워드 부스팅'
        }
      ],

      // Family Offices VIP에서 Samsung Life VIP로
      'familyoffices-to-samsunglife': [
        {
          anchor: '기업 전용 서비스',
          context: '기업 규모가 크고 복잡한 구조를 가지고 계신가요?',
          targetPage: 'https://samsunglife.vip/enterprise-services',
          seoValue: '권위도 있는 도메인으로 링크 주스 전달'
        },
        {
          anchor: '대기업 수준 안정성',
          context: '안정성과 글로벌 네트워크가 우선이라면',
          targetPage: 'https://samsunglife.vip/corporate-insurance',
          seoValue: '메인 키워드 강화'
        }
      ]
    }
  },

  // 콘텐츠 크로스 프로모션
  contentCrossPromotion: {
    // 블로그 포스트 상호 참조
    blogCrossReference: {
      'samsunglife.vip': [
        {
          title: '대기업 vs 부티크 자산관리, 어떤 선택이 맞을까?',
          content: '기업 규모와 개인 선호에 따른 최적의 자산관리 서비스 선택 가이드',
          crossLink: 'familyoffices.vip에서 제공하는 부티크 서비스의 장점'
        },
        {
          title: '기업과 개인 자산의 분리 관리 전략',
          content: '기업 자산은 안정성 중심, 개인 자산은 개별화 전략으로',
          crossLink: '개인 자산의 개별화 전략은 familyoffices.vip에서'
        }
      ],
      
      'familyoffices.vip': [
        {
          title: '독립 자산관리사를 선택해야 하는 이유',
          content: '대기업 서비스의 한계와 독립 전문가의 장점 비교 분석',
          crossLink: '대기업 서비스가 필요한 경우는 samsunglife.vip에서'
        },
        {
          title: '중소기업 오너의 이중 자산관리 전략',
          content: '사업 자산과 개인 자산의 효율적 분리 관리 방법',
          crossLink: '복잡한 기업 구조는 samsunglife.vip의 전문 영역'
        }
      ]
    }
  },

  // 검색 엔진 최적화 시너지
  seoSynergy: {
    // 키워드 분산 전략
    keywordDistribution: {
      tier1Keywords: {
        'samsunglife.vip': ['기업보험', '법인세절감', '기업승계'],
        'familyoffices.vip': ['독립자산관리', '개인맞춤', '부티크서비스']
      },
      tier2Keywords: {
        'samsunglife.vip': ['대기업자산관리', '상장기업CFO', '중견기업'],
        'familyoffices.vip': ['중소기업오너', '개인사업자', '전문컨설팅']
      },
      sharedKeywords: {
        both: ['패밀리오피스', 'VIP서비스', '자산관리', '재무설계']
      }
    },

    // 구조화 데이터 연동
    structuredDataLinking: {
      organization: {
        '@type': 'Organization',
        'name': 'FamilyOffice S Group',
        'description': '기업과 개인을 위한 차별화된 프리미엄 금융 서비스',
        'sameAs': [
          'https://samsunglife.vip',
          'https://familyoffices.vip'
        ],
        'department': [
          {
            '@type': 'Organization',
            'name': 'Samsung Life VIP Corporate Division',
            'url': 'https://samsunglife.vip',
            'serviceType': 'Corporate Financial Services'
          },
          {
            '@type': 'Organization', 
            'name': 'FamilyOffice S Independent Division',
            'url': 'https://familyoffices.vip',
            'serviceType': 'Independent Personal Wealth Management'
          }
        ]
      }
    }
  }
};

// 크로스 도메인 리다이렉션 로직
export function getCrossDomainRecommendation(
  currentDomain: string,
  userProfile: {
    assetSize?: number;
    businessType?: 'corporate' | 'individual' | 'sme';
    preference?: 'stability' | 'personalization' | 'flexibility';
  }
): { shouldRedirect: boolean; targetDomain?: string; reason?: string } {
  
  if (currentDomain === 'samsunglife.vip') {
    // 대기업 서비스에서 개인 서비스로 유도해야 하는 경우
    if (
      (userProfile.assetSize && userProfile.assetSize < 5000000000) || // 50억 미만
      userProfile.businessType === 'individual' ||
      userProfile.preference === 'personalization' ||
      userProfile.preference === 'flexibility'
    ) {
      return {
        shouldRedirect: true,
        targetDomain: 'familyoffices.vip',
        reason: '더 개인화되고 유연한 서비스를 위해'
      };
    }
  }
  
  if (currentDomain === 'familyoffices.vip') {
    // 개인 서비스에서 기업 서비스로 유도해야 하는 경우
    if (
      (userProfile.assetSize && userProfile.assetSize > 10000000000) || // 100억 이상
      userProfile.businessType === 'corporate' ||
      userProfile.preference === 'stability'
    ) {
      return {
        shouldRedirect: true,
        targetDomain: 'samsunglife.vip',
        reason: '기업 전용 안정적인 서비스를 위해'
      };
    }
  }

  return { shouldRedirect: false };
}

// 통합 SEO 스코어 계산
export function calculateCombinedSEOScore(domain1Metrics: any, domain2Metrics: any) {
  return {
    combinedAuthority: (domain1Metrics.authority + domain2Metrics.authority) * 0.7,
    crossLinkValue: domain1Metrics.internalLinks * domain2Metrics.internalLinks * 0.1,
    keywordCoverage: (domain1Metrics.keywordCount + domain2Metrics.keywordCount) * 0.8,
    brandSynergy: domain1Metrics.brandMentions + domain2Metrics.brandMentions,
    totalScore: 0 // 계산된 값들의 가중평균
  };
}