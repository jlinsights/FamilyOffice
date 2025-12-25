import {
  Briefcase,
  Building2,
  Calculator,
  Lightbulb,
  Shield,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';

export type QuizCategory =
  | '세무'
  | '보험'
  | '승계'
  | '자산'
  | '투자'
  | '법인'
  | '인사'
  | '특허';

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  scores?: Record<QuizCategory, number>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: QuizOption[];
  weight: number;
}

export const QUIZ_CATEGORIES: Record<
  QuizCategory,
  { name: string; icon: any; description: string }
> = {
  세무: {
    name: '세무회계',
    icon: Calculator,
    description: '법인세 절세, 개인세 최적화, 경정청구, 가지급금 정리',
  },
  보험: {
    name: '기업보험',
    icon: Shield,
    description: '종신보험, 건강보험, 경영인정기보험, 단체보험',
  },
  승계: {
    name: '가업승계',
    icon: Users,
    description: '승계 전략, 상속·증여 컨설팅, 가족헌법 설계',
  },
  자산: {
    name: '자산관리',
    icon: Briefcase,
    description: '포트폴리오 관리, 자산배분, 유동성 관리',
  },
  투자: {
    name: '투자금융',
    icon: TrendingUp,
    description: '부동산 투자, 금융상품, 포트폴리오',
  },
  법인: {
    name: '법인구조',
    icon: Building2,
    description: '법인설립, 정관 개정, 배당정책, 스톡옵션',
  },
  인사: {
    name: '인사노무',
    icon: UserCheck,
    description: '고용지원금, 복리후생, 노무관리',
  },
  특허: {
    name: '특허창업',
    icon: Lightbulb,
    description: '벤처인증, 특허 출원, 창업 컨설팅',
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '현재 귀사의 연 매출액은 얼마입니까? (또는 개인자산 규모)',
    weight: 0.2,
    options: [
      {
        id: 'A',
        label: '매출 50억 미만 / 개인자산 30억 미만',
        value: 'small',
        scores: {
          세무: 5,
          보험: 3,
          승계: 2,
          자산: 2,
          투자: 2,
          법인: 2,
          인사: 2,
          특허: 4,
        },
      },
      {
        id: 'B',
        label: '매출 50-200억 / 개인자산 30-100억',
        value: 'medium',
        scores: {
          세무: 8,
          보험: 6,
          승계: 6,
          자산: 5,
          투자: 5,
          법인: 5,
          인사: 4,
          특허: 3,
        },
      },
      {
        id: 'C',
        label: '매출 200-500억 / 개인자산 100-300억',
        value: 'large',
        scores: {
          세무: 9,
          보험: 8,
          승계: 8,
          자산: 8,
          투자: 7,
          법인: 8,
          인사: 6,
          특허: 2,
        },
      },
      {
        id: 'D',
        label: '매출 500억 이상 / 개인자산 300억 이상',
        value: 'extra_large',
        scores: {
          세무: 10,
          보험: 9,
          승계: 9,
          자산: 10,
          투자: 9,
          법인: 9,
          인사: 7,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q2',
    question: '현재 귀사/귀하가 가장 시급하게 해결해야 할 문제는 무엇입니까?',
    weight: 0.35,
    options: [
      {
        id: 'A',
        label: '세금 부담 감소 (법인세, 소득세, 상속세 등)',
        value: 'tax',
        scores: {
          세무: 10,
          보험: 2,
          승계: 4,
          자산: 3,
          투자: 2,
          법인: 3,
          인사: 1,
          특허: 1,
        },
      },
      {
        id: 'B',
        label: '기업 리스크 관리 (중대재해, 경영진 유고, 법인 구조 문제)',
        value: 'risk',
        scores: {
          세무: 3,
          보험: 10,
          승계: 2,
          자산: 3,
          투자: 1,
          법인: 5,
          인사: 4,
          특허: 1,
        },
      },
      {
        id: 'C',
        label: '가업승계 및 자산 승계 준비',
        value: 'succession',
        scores: {
          세무: 8,
          보험: 5,
          승계: 10,
          자산: 4,
          투자: 2,
          법인: 6,
          인사: 2,
          특허: 1,
        },
      },
      {
        id: 'D',
        label: '자산 증식 및 포트폴리오 최적화',
        value: 'growth',
        scores: {
          세무: 2,
          보험: 2,
          승계: 2,
          자산: 10,
          투자: 10,
          법인: 2,
          인사: 1,
          특허: 2,
        },
      },
      {
        id: 'E',
        label: '기업 지배구조 및 임직원 관리',
        value: 'governance',
        scores: {
          세무: 3,
          보험: 3,
          승계: 3,
          자산: 2,
          투자: 2,
          법인: 10,
          인사: 8,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q3',
    question: '귀사의 기업 형태는 다음 중 어디에 해당합니까?',
    weight: 0.15,
    options: [
      {
        id: 'A',
        label: '개인사업자 또는 1인 기업',
        value: 'individual',
        scores: {
          세무: 6,
          보험: 4,
          승계: 3,
          자산: 5,
          투자: 4,
          법인: 1,
          인사: 1,
          특허: 5,
        },
      },
      {
        id: 'B',
        label: '단순 법인 (자회사 없음, 임직원 50인 이하)',
        value: 'simple_corp',
        scores: {
          세무: 7,
          보험: 6,
          승계: 5,
          자산: 5,
          투자: 4,
          법인: 5,
          인사: 4,
          특허: 3,
        },
      },
      {
        id: 'C',
        label: '다중 법인 구조 (자회사, 계열사 보유)',
        value: 'multi_corp',
        scores: {
          세무: 9,
          보험: 8,
          승계: 8,
          자산: 7,
          투자: 6,
          법인: 9,
          인사: 6,
          특허: 2,
        },
      },
      {
        id: 'D',
        label: '복합 기업군 (다수 계열사, 해외 자산 보유)',
        value: 'complex_group',
        scores: {
          세무: 10,
          보험: 9,
          승계: 9,
          자산: 9,
          투자: 8,
          법인: 10,
          인사: 7,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q4',
    question: '가업승계 또는 자산 승계를 언제까지 완료하고 싶으십니까?',
    weight: 0.2,
    options: [
      {
        id: 'A',
        label: '아직 생각해본 적 없음 / 10년 이상 여유 있음',
        value: 'long_term',
        scores: {
          세무: 4,
          보험: 3,
          승계: 2,
          자산: 5,
          투자: 5,
          법인: 2,
          인사: 2,
          특허: 3,
        },
      },
      {
        id: 'B',
        label: '3-5년 내에 준비하고 싶음',
        value: 'mid_term',
        scores: {
          세무: 7,
          보험: 6,
          승계: 8,
          자산: 6,
          투자: 5,
          법인: 6,
          인사: 3,
          특허: 2,
        },
      },
      {
        id: 'C',
        label: '1-2년 내에 실행 예정',
        value: 'short_term',
        scores: {
          세무: 9,
          보험: 8,
          승계: 10,
          자산: 5,
          투자: 4,
          법인: 7,
          인사: 3,
          특허: 1,
        },
      },
      {
        id: 'D',
        label: '이미 진행 중이거나 긴급 상황',
        value: 'urgent',
        scores: {
          세무: 10,
          보험: 10,
          승계: 10,
          자산: 4,
          투자: 2,
          법인: 8,
          인사: 2,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q5',
    question: '현재 가업승계 또는 자산관리를 위해 어느 정도 준비하셨습니까?',
    weight: 0.1,
    options: [
      {
        id: 'A',
        label: '아무것도 준비하지 않았음 / 정보 수집 단계',
        value: 'none',
        scores: {
          세무: 5,
          보험: 4,
          승계: 3,
          자산: 3,
          투자: 3,
          법인: 2,
          인사: 2,
          특허: 3,
        },
      },
      {
        id: 'B',
        label: '기초 자료 준비 완료 (재무제표, 자산 목록 등)',
        value: 'basic',
        scores: {
          세무: 7,
          보험: 6,
          승계: 6,
          자산: 6,
          투자: 5,
          법인: 5,
          인사: 4,
          특허: 3,
        },
      },
      {
        id: 'C',
        label: '초안 또는 계획서 작성 완료',
        value: 'draft',
        scores: {
          세무: 8,
          보험: 7,
          승계: 8,
          자산: 7,
          투자: 6,
          법인: 7,
          인사: 5,
          특허: 2,
        },
      },
      {
        id: 'D',
        label: '이미 세무사/변호사와 진행 중',
        value: 'in_progress',
        scores: {
          세무: 9,
          보험: 8,
          승계: 9,
          자산: 8,
          투자: 7,
          법인: 8,
          인사: 6,
          특허: 2,
        },
      },
    ],
  },
];

export interface RecommendedSolution {
  title: string;
  description: string;
  expectedBenefit: string;
  duration: string;
  tags: string[];
  link: string;
}

export const CATEGORY_SOLUTIONS: Record<QuizCategory, RecommendedSolution[]> = {
  세무: [
    {
      title: '법인세 절세 전략',
      description: '법인세 구조 분석 및 최적의 절세 플랜 수립',
      expectedBenefit: '법인세 30-50% 절감',
      duration: '2-3개월',
      tags: ['세금', '법인세', '절세'],
      link: '/tax-strategy#corporate',
    },
    {
      title: '경정청구 컨설팅',
      description: '과거 5년간 과납한 세금 환급 지원',
      expectedBenefit: '평균 1,000만원 이상 환급',
      duration: '1개월',
      tags: ['세금환급', '경정청구'],
      link: '/finance-tax-labor/tax-refund',
    },
  ],
  보험: [
    {
      title: '경영인정기보험',
      description: 'CEO 유고 리스크 대비 및 퇴직금 재원 마련',
      expectedBenefit: '리스크 헤지 + 법인세 절감',
      duration: '1-2주',
      tags: ['CEO보험', '법인세절감'],
      link: '/key-person-insurance',
    },
    {
      title: '법인종신보험',
      description: '상속세 재원 마련을 위한 전략적 보험 설계',
      expectedBenefit: '상속세 재원 확보',
      duration: '1-2주',
      tags: ['상속세', '종신보험'],
      link: '/life-insurance#corporate',
    },
  ],
  승계: [
    {
      title: '가업승계 전략 수립',
      description: '가업상속공제 등 제도를 활용한 승계 플랜 구축',
      expectedBenefit: '증여세/상속세 최소화',
      duration: '3-6개월',
      tags: ['가업승계', '상속세', '증여세'],
      link: '/business-succession-strategy',
    },
    {
      title: '가족헌장 및 지배구조 설계',
      description: '가족 경영의 원칙 수립 및 분쟁 예방',
      expectedBenefit: '경영권 분쟁 방지',
      duration: '2-3개월',
      tags: ['가족헌장', '지배구조'],
      link: '/business-succession-strategy#charter',
    },
  ],
  자산: [
    {
      title: '패밀리오피스 자산배분',
      description: '고액자산가를 위한 맞춤형 포트폴리오 관리',
      expectedBenefit: '안정적 자산 증식',
      duration: '상시',
      tags: ['자산관리', '포트폴리오'],
      link: '/wealth-consulting',
    },
    {
      title: '재무설계 및 은퇴설계',
      description: '생애주기별 자금 흐름 분석 및 은퇴 준비',
      expectedBenefit: '노후 자금 확보',
      duration: '1개월',
      tags: ['재무설계', '은퇴'],
      link: '/fp-center',
    },
  ],
  투자: [
    {
      title: '부동산 투자 자문',
      description: '상업용 부동산 매입/매각 및 가치 제고',
      expectedBenefit: '중장기 자산 가치 상승',
      duration: '3-6개월',
      tags: ['부동산', '투자'],
      link: '/investment-advisory',
    },
    {
      title: '금융투자 포트폴리오',
      description: '글로벌 시장 분석을 통한 금융 상품 투자',
      expectedBenefit: '투자 수익률 제고',
      duration: '상시',
      tags: ['금융', '투자'],
      link: '/investment-advisory',
    },
  ],
  법인: [
    {
      title: '법인 정관 및 규정 정비',
      description: '최신 상법 및 세법을 반영한 정관 변경',
      expectedBenefit: '법적 리스크 예방',
      duration: '2-4주',
      tags: ['정관', '규정'],
      link: '/corporate-structure-governance',
    },
    {
      title: '배당 정책 수립',
      description: '중간배당, 차등배당 등 효율적 자금 회수 전략',
      expectedBenefit: '소득세 절감',
      duration: '1개월',
      tags: ['배당', '자금회수'],
      link: '/corporate-structure-governance',
    },
  ],
  인사: [
    {
      title: '고용지원금 컨설팅',
      description: '기업이 받을 수 있는 각종 지원금 발굴',
      expectedBenefit: '인건비 부담 완화',
      duration: '1개월',
      tags: ['지원금', '노무'],
      link: '/finance-tax-labor/employment-subsidy',
    },
    {
      title: '노무 규정 정비',
      description: '근로계약서, 취업규칙 등 노무 리스크 관리',
      expectedBenefit: '노무 분쟁 예방',
      duration: '2-4주',
      tags: ['노무', '취업규칙'],
      link: '/hr-labor-management',
    },
  ],
  특허: [
    {
      title: '벤처기업 인증',
      description: '혁신 기술 기업 확인 및 세제 혜택 확보',
      expectedBenefit: '법인세 감면, 정책자금',
      duration: '2-3개월',
      tags: ['벤처', '인증'],
      link: '/patent-startup',
    },
    {
      title: '기업부설연구소 설립',
      description: '연구개발 역량 인정 및 R&D 지원',
      expectedBenefit: '인력 지원, 세액공제',
      duration: '1-2개월',
      tags: ['연구소', 'R&D'],
      link: '/patent-startup',
    },
  ],
};
