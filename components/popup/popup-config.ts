// Popup Configuration System for Korean CEO-focused Family Office
// Implements AgentOS optimization with cultural targeting

export interface PopupTiming {
  initialDelay: number; // milliseconds
  betweenPopups: number; // milliseconds
  maxPerSession: number;
  minSessionInterval: number; // milliseconds
}

export interface KoreanCEOTargeting {
  industries: string[];
  companySize: string[];
  ageRange: [number, number];
  timePreference: {
    businessHours: boolean;
    weekends: boolean;
    evenings: boolean;
  };
  culturalFactors: {
    formalTone: boolean;
    hierarchyRespect: boolean;
    longTermFocus: boolean;
    familyValues: boolean;
  };
}

export interface PopupVariant {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  visualStyle: 'conservative' | 'modern' | 'premium';
  weight: number; // for A/B testing distribution
}

export const KOREAN_CEO_POPUP_CONFIG = {
  timing: {
    sequential: {
      initialDelay: 4000, // 4 seconds - respectful entry timing
      betweenPopups: 45000, // 45 seconds - professional spacing
      maxPerSession: 2,
      minSessionInterval: 1800000, // 30 minutes
    },
    parallel: {
      initialDelay: 3000,
      betweenPopups: 0, // simultaneous display
      maxPerSession: 2,
      minSessionInterval: 3600000, // 1 hour
    },
    adaptive: {
      initialDelay: 2000,
      betweenPopups: 30000, // adapts based on behavior
      maxPerSession: 3,
      minSessionInterval: 1200000, // 20 minutes
    }
  } as Record<string, PopupTiming>,

  targeting: {
    primaryAudience: {
      industries: [
        'manufacturing', 'construction', 'it_venture', 
        'retail', 'service', 'finance', 'real_estate'
      ],
      companySize: ['mid_market', 'large_enterprise'],
      ageRange: [35, 65] as [number, number],
      timePreference: {
        businessHours: true,
        weekends: false,
        evenings: true,
      },
      culturalFactors: {
        formalTone: true,
        hierarchyRespect: true,
        longTermFocus: true,
        familyValues: true,
      },
    },
    secondaryAudience: {
      industries: ['healthcare', 'education', 'non_profit'],
      companySize: ['small_business', 'startup'],
      ageRange: [25, 50] as [number, number],
      timePreference: {
        businessHours: true,
        weekends: true,
        evenings: false,
      },
      culturalFactors: {
        formalTone: false,
        hierarchyRespect: true,
        longTermFocus: false,
        familyValues: true,
      },
    },
  } as Record<string, KoreanCEOTargeting>,

  variants: {
    ceo_protection: {
      conservative: {
        id: 'conservative',
        title: 'CEO 자산 보호 전략',
        description: '안정적이고 체계적인 경영진 보장자산 관리 방안을 제시합니다',
        ctaText: '상세 정보 확인',
        urgencyLevel: 'low' as const,
        visualStyle: 'conservative' as const,
        weight: 0.4,
      },
      urgent: {
        id: 'urgent',
        title: '⚠️ CEO 리스크 관리 필수',
        description: '예기치 못한 경영 리스크로부터 회사와 가정을 보호하세요',
        ctaText: '즉시 확인',
        urgencyLevel: 'high' as const,
        visualStyle: 'modern' as const,
        weight: 0.3,
      },
      premium: {
        id: 'premium',
        title: '프리미엄 CEO 솔루션',
        description: '최고 경영진을 위한 맞춤형 자산 보호 및 성장 전략',
        ctaText: '전문가 상담',
        urgencyLevel: 'medium' as const,
        visualStyle: 'premium' as const,
        weight: 0.3,
      },
    },
    newsletter: {
      information_focused: {
        id: 'information_focused',
        title: '주간 투자 인사이트',
        description: '전문가 분석과 시장 동향을 매주 화요일 무료로 받아보세요',
        ctaText: '무료 구독',
        urgencyLevel: 'low' as const,
        visualStyle: 'conservative' as const,
        weight: 0.33,
      },
      community_focused: {
        id: 'community_focused',
        title: '500+ CEO 네트워킹',
        description: '동료 경영진들과 함께하는 프리미엄 정보 공유 커뮤니티',
        ctaText: '커뮤니티 참여',
        urgencyLevel: 'medium' as const,
        visualStyle: 'modern' as const,
        weight: 0.33,
      },
      exclusivity_focused: {
        id: 'exclusivity_focused',
        title: '초대 전용 인사이트',
        description: '엄선된 고액자산가를 위한 독점 투자 정보와 전략',
        ctaText: '초대 수락',
        urgencyLevel: 'medium' as const,
        visualStyle: 'premium' as const,
        weight: 0.34,
      },
    },
  } as Record<string, Record<string, PopupVariant>>,
};

// Device and behavior optimization
export const DEVICE_OPTIMIZATION = {
  mobile: {
    maxWidth: '95%',
    padding: '16px',
    fontSize: 'sm',
    buttonSize: 'lg',
    animationDuration: 300,
  },
  tablet: {
    maxWidth: '80%',
    padding: '20px',
    fontSize: 'base',
    buttonSize: 'md',
    animationDuration: 250,
  },
  desktop: {
    maxWidth: '400px',
    padding: '24px',
    fontSize: 'base',
    buttonSize: 'md',
    animationDuration: 200,
  },
};

// Korean business culture optimization
export const CULTURAL_OPTIMIZATION = {
  businessHours: {
    weekday: { start: 9, end: 18 }, // 9 AM to 6 PM
    saturday: { start: 10, end: 14 }, // 10 AM to 2 PM
    sunday: null, // No business activities
  },
  seasonalConsiderations: {
    lunarNewYear: { avoid: true, dates: ['2024-02-09', '2024-02-12'] },
    chuseok: { avoid: true, dates: ['2024-09-16', '2024-09-18'] },
    nationalHolidays: { reduce: true },
  },
  communicationStyle: {
    formal: {
      titles: ['CEO님', '대표님', '회장님'],
      language: 'formal_korean',
      respectLevel: 'high',
    },
    professional: {
      titles: ['대표님', '임원님'],
      language: 'business_korean',
      respectLevel: 'medium',
    },
  },
};

// Performance thresholds for Korean market
export const PERFORMANCE_THRESHOLDS = {
  ctr: {
    excellent: 8.5, // % - Korean business users typically have higher engagement
    good: 5.0,
    poor: 2.0,
  },
  cvr: {
    excellent: 12.0, // % - B2B conversion rates in Korea
    good: 8.0,
    poor: 3.0,
  },
  timeToAction: {
    excellent: 8000, // ms - Korean users take time to consider
    good: 15000,
    poor: 30000,
  },
  bounceRateImpact: {
    acceptable: 5, // % increase in bounce rate
    concerning: 15,
    critical: 25,
  },
};

// A/B Testing configuration
export const AB_TEST_CONFIG = {
  minimumSampleSize: 100,
  confidenceLevel: 0.95,
  testDuration: 30, // days
  trafficAllocation: 0.8, // 80% of users in A/B test
  earlyStoppingRules: {
    significanceThreshold: 0.01,
    minimumEffectSize: 0.1,
    minimumRunTime: 7, // days
  },
};

// Analytics configuration for Korean market
export const ANALYTICS_CONFIG = {
  dimensions: {
    userSegment: ['first_time', 'returning', 'engaged', 'vip'],
    industry: ['manufacturing', 'construction', 'it', 'retail', 'service', 'other'],
    companySize: ['startup', 'small', 'medium', 'large', 'enterprise'],
    timeOfDay: ['morning', 'afternoon', 'evening', 'night'],
    dayOfWeek: ['weekday', 'weekend'],
    device: ['mobile', 'tablet', 'desktop'],
    region: ['seoul', 'gyeonggi', 'busan', 'other'],
  },
  metrics: {
    engagement: ['view_duration', 'scroll_depth', 'interaction_count'],
    conversion: ['click_rate', 'signup_rate', 'consultation_request'],
    user_experience: ['load_time', 'render_time', 'time_to_interactive'],
    business: ['lead_quality', 'revenue_attribution', 'lifetime_value'],
  },
  goals: {
    primary: 'consultation_requests',
    secondary: ['newsletter_signups', 'content_downloads'],
    micro: ['email_opens', 'page_views', 'time_on_site'],
  },
};

export default KOREAN_CEO_POPUP_CONFIG;