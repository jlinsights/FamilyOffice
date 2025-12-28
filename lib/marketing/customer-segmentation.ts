/**
 * 🎯 고객 세분화 타겟팅 시스템
 * 패밀리오피스 vs FP센터 차별화 고객관리
 */

// 고객 세그먼트 정의
export type CustomerSegment = 'family-office' | 'fp-center' | 'prospect';

export interface CustomerCriteria {
  netWorth: number; // 순자산 (억원)
  netIncome: number; // 순이익 (억원)
  segment: CustomerSegment;
  serviceType: string;
  priority: 'ultra-high' | 'high' | 'medium' | 'low';
}

// 고객 세분화 기준
export const CUSTOMER_SEGMENTS = {
  'family-office': {
    name: '패밀리오피스',
    criteria: {
      netWorth: 300, // 순자산 300억 이상
      netIncome: 5, // 순이익 5억 이상
    },
    serviceLevel: 'Ultra Premium',
    priority: 'ultra-high' as const,
    description:
      'UHNW (Ultra High Net Worth) 고객 전용 프리미엄 패밀리오피스 서비스',
    targetAudience: '대기업 오너, 상장사 대표, 글로벌 기업인',
    services: [
      '전담 패밀리오피스 구축',
      '세대간 자산승계 설계',
      '글로벌 자산배분 전략',
      '프라이빗 뱅킹 연동',
      '24/7 전담 매니저',
      '해외 투자 자문',
      '세무/법무 통합 서비스',
      '차세대 교육 프로그램',
    ],
    minimumFee: '연 1억원',
    exclusiveBenefits: [
      'CEO 전용 라운지',
      '해외 투자 기회',
      '프라이빗 이벤트',
      '글로벌 네트워킹',
    ],
  },
  'fp-center': {
    name: 'FP센터',
    criteria: {
      netWorth: 50, // 순자산 50억 이상
      netIncome: 3, // 순이익 3억 이상
    },
    serviceLevel: 'Premium',
    priority: 'high' as const,
    description: 'HNW (High Net Worth) 고객 대상 전문 자산관리 서비스',
    targetAudience: '중견기업 대표, 성공한 중소기업인, 전문직 고소득자',
    services: [
      '종합 재무설계',
      '가업승계 컨설팅',
      '절세 전략 수립',
      '포트폴리오 관리',
      '정기 자산관리',
      '세무 컨설팅',
      '보험 설계',
      '은퇴 설계',
    ],
    minimumFee: '연 3,000만원',
    exclusiveBenefits: [
      '분기별 리포트',
      '전문가 정기 상담',
      '세미나 우선 참가',
      'VIP 이벤트',
    ],
  },
  prospect: {
    name: '일반 상담',
    criteria: {
      netWorth: 0, // 기준 미달
      netIncome: 0, // 기준 미달
    },
    serviceLevel: 'Standard',
    priority: 'medium' as const,
    description: '잠재 고객 대상 기본 상담 서비스',
    targetAudience: '성장 중인 기업인, 잠재 고객',
    services: [
      '무료 재무상담',
      '기본 세무조언',
      '가업승계 가이드',
      '기초 자산관리',
      '교육 세미나',
    ],
    minimumFee: '상담 후 결정',
    exclusiveBenefits: [
      '무료 초기 상담',
      '기본 분석 리포트',
      '교육 프로그램',
      '성장 지원',
    ],
  },
} as const;

// 고객 세그먼트 분류 함수
export function classifyCustomer(
  netWorth: number,
  netIncome: number
): {
  segment: CustomerSegment;
  serviceInfo: (typeof CUSTOMER_SEGMENTS)[CustomerSegment];
  qualification: boolean;
} {
  // 패밀리오피스 자격 (순자산 300억+ AND 순이익 5억+)
  if (
    netWorth >= CUSTOMER_SEGMENTS['family-office'].criteria.netWorth &&
    netIncome >= CUSTOMER_SEGMENTS['family-office'].criteria.netIncome
  ) {
    return {
      segment: 'family-office',
      serviceInfo: CUSTOMER_SEGMENTS['family-office'],
      qualification: true,
    };
  }

  // FP센터 자격 (순자산 50억+ AND 순이익 3억+)
  if (
    netWorth >= CUSTOMER_SEGMENTS['fp-center'].criteria.netWorth &&
    netIncome >= CUSTOMER_SEGMENTS['fp-center'].criteria.netIncome
  ) {
    return {
      segment: 'fp-center',
      serviceInfo: CUSTOMER_SEGMENTS['fp-center'],
      qualification: true,
    };
  }

  // 일반 상담
  return {
    segment: 'prospect',
    serviceInfo: CUSTOMER_SEGMENTS['prospect'],
    qualification: false,
  };
}

// 타겟팅 메시지 생성
export function generateTargetingMessage(segment: CustomerSegment): {
  headline: string;
  subheadline: string;
  cta: string;
  urgency: string;
} {
  switch (segment) {
    case 'family-office':
      return {
        headline: '순자산 300억+ 기업가를 위한 전용 패밀리오피스',
        subheadline: 'Ultra Premium 자산관리로 세대를 이어가는 영속 기업 구축',
        cta: '패밀리오피스 전담 매니저 배정',
        urgency: '한정된 UHNW 고객만을 위한 독점 서비스',
      };

    case 'fp-center':
      return {
        headline: '순자산 50억+ 성공 기업인을 위한 FP센터',
        subheadline: 'Premium 자산관리로 기업과 개인 자산을 통합 관리',
        cta: 'FP 전문가 무료 상담',
        urgency: '성공한 기업인만을 위한 프리미엄 서비스',
      };

    default:
      return {
        headline: '성장하는 기업을 위한 전문 재무상담',
        subheadline: '미래 준비를 시작하는 기업인을 위한 맞춤 솔루션',
        cta: '무료 재무상담 신청',
        urgency: '지금 시작하는 자산관리가 미래를 결정합니다',
      };
  }
}

// SEO 키워드 세분화
export const SEGMENT_KEYWORDS = {
  'family-office': [
    '순자산 300억 이상 패밀리오피스',
    'UHNW 전용 자산관리',
    '대기업 오너 패밀리오피스',
    '글로벌 자산배분',
    '프라이빗 뱅킹',
    '울트라 리치 자산관리',
    '세대간 자산승계',
    '해외 투자 자문',
    '24/7 전담 매니저',
    '프리미엄 패밀리오피스',
  ],
  'fp-center': [
    '순자산 50억 이상 FP센터',
    'HNW 자산관리',
    '중견기업 재무설계',
    '프리미엄 자산관리',
    '성공한 기업인',
    '고액자산가 상담',
    '전문 재무설계',
    'VIP 자산관리',
    '중소중견기업 FP',
    '고소득자 세무전략',
  ],
  prospect: [
    '기업 재무상담',
    '중소기업 자산관리',
    '기업인 재무설계',
    '무료 세무상담',
    '가업승계 가이드',
    '성장기업 컨설팅',
    '기초 자산관리',
    '신규 기업인',
    '예비 패밀리오피스',
    '자산관리 입문',
  ],
};

// 랜딩 페이지 경로
export const SEGMENT_LANDING_PAGES = {
  'family-office': '/family-office',
  'fp-center': '/fp-center',
  prospect: '/consultation',
};

// 고객 자격 검증 폼
export interface CustomerQualificationForm {
  companyName: string;
  ceoName: string;
  industry: string;
  employees: number;
  annualRevenue: number; // 연매출 (억원)
  netWorth: number; // 순자산 (억원)
  netIncome: number; // 순이익 (억원)
  assets: {
    realEstate: number; // 부동산
    financial: number; // 금융자산
    business: number; // 사업자산
    other: number; // 기타자산
  };
  needsAssessment: {
    familyOffice: boolean;
    businessSuccession: boolean;
    taxOptimization: boolean;
    portfolioManagement: boolean;
    estatePlanning: boolean;
  };
  preferredContactMethod: 'phone' | 'email' | 'in-person';
  urgency: 'immediate' | 'within-month' | 'within-quarter' | 'planning';
}

// 자격 검증 및 세그먼트 배정
export function assessCustomerQualification(form: CustomerQualificationForm): {
  segment: CustomerSegment;
  serviceRecommendation: (typeof CUSTOMER_SEGMENTS)[CustomerSegment];
  nextSteps: string[];
  estimatedFee: string;
  assignedManager: string;
} {
  const classification = classifyCustomer(form.netWorth, form.netIncome);

  let nextSteps: string[] = [];
  let assignedManager: string = '';

  switch (classification.segment) {
    case 'family-office':
      nextSteps = [
        '24시간 내 패밀리오피스 전담 매니저 배정',
        '3일 내 포괄적 자산 실사 및 분석',
        '1주 내 맞춤형 패밀리오피스 구조 제안',
        '2주 내 전담 팀 구성 및 서비스 개시',
      ];
      assignedManager = '임재홍 대표이사 직접 관리';
      break;

    case 'fp-center':
      nextSteps = [
        '48시간 내 FP 전문가 배정 및 연락',
        '1주 내 종합 재무진단 실시',
        '2주 내 맞춤형 자산관리 전략 수립',
        '1개월 내 서비스 계약 및 관리 시작',
      ];
      assignedManager = 'FP센터 수석 전문가';
      break;

    default:
      nextSteps = [
        '72시간 내 전문 상담사 연락',
        '무료 기초 재무진단',
        '성장 단계별 로드맵 제시',
        '향후 자격 달성 시 우선 서비스 안내',
      ];
      assignedManager = '신규고객 전담 상담사';
      break;
  }

  return {
    segment: classification.segment,
    serviceRecommendation: classification.serviceInfo,
    nextSteps,
    estimatedFee: classification.serviceInfo.minimumFee,
    assignedManager,
  };
}

// 동적 콘텐츠 생성
export function generateDynamicContent(segment: CustomerSegment) {
  const serviceInfo = CUSTOMER_SEGMENTS[segment];

  return {
    hero: {
      title: generateTargetingMessage(segment).headline,
      subtitle: generateTargetingMessage(segment).subheadline,
      backgroundImage:
        segment === 'family-office'
          ? '/images/ultra-premium-bg.jpg'
          : segment === 'fp-center'
            ? '/images/premium-bg.jpg'
            : '/images/standard-bg.jpg',
    },
    services: serviceInfo.services,
    benefits: serviceInfo.exclusiveBenefits,
    testimonials: getSegmentTestimonials(segment),
    caseStudies: getSegmentCaseStudies(segment),
    ctaButton: {
      text: generateTargetingMessage(segment).cta,
      urgency: generateTargetingMessage(segment).urgency,
      color:
        segment === 'family-office'
          ? 'gold'
          : segment === 'fp-center'
            ? 'blue'
            : 'green',
    },
  };
}

function getSegmentTestimonials(segment: CustomerSegment) {
  switch (segment) {
    case 'family-office':
      return [
        {
          client: '글로벌 제조업 회장',
          company: 'A그룹',
          netWorth: '1,000억+',
          testimonial:
            '패밀리오피스를 통해 3세대에 걸친 자산승계 계획을 완성했습니다.',
        },
      ];
    case 'fp-center':
      return [
        {
          client: 'IT 기업 대표',
          company: 'B테크',
          netWorth: '100억+',
          testimonial:
            'FP센터의 전문적인 자산관리로 5년 만에 자산을 두 배로 늘렸습니다.',
        },
      ];
    default:
      return [
        {
          client: '제조업 대표',
          company: 'C산업',
          netWorth: '30억',
          testimonial:
            '체계적인 재무상담으로 회사 성장과 함께 개인 자산도 크게 늘었습니다.',
        },
      ];
  }
}

function getSegmentCaseStudies(segment: CustomerSegment) {
  switch (segment) {
    case 'family-office':
      return [
        {
          title: '대기업 오너 가문 자산 1,500억→2,500억 성장 사례',
          period: '5년',
          result: '연평균 11% 수익률, 상속세 70% 절감',
        },
      ];
    case 'fp-center':
      return [
        {
          title: '중견기업 CEO 자산 80억→200억 성장 사례',
          period: '7년',
          result: '연평균 14% 수익률, 가업승계 완료',
        },
      ];
    default:
      return [
        {
          title: '성장기업 자산 20억→50억 달성 사례',
          period: '5년',
          result: '체계적 자산관리로 목표 달성',
        },
      ];
  }
}

const customerSegmentation = {
  CUSTOMER_SEGMENTS,
  classifyCustomer,
  generateTargetingMessage,
  SEGMENT_KEYWORDS,
  SEGMENT_LANDING_PAGES,
  assessCustomerQualification,
  generateDynamicContent,
};

export default customerSegmentation;
