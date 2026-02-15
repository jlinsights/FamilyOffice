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
  section: string;
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
  // PART 1. Financial Health
  {
    id: 'q1_revenue',
    section: 'PART 1. 재무 건전성 진단 (Can they do it?)',
    question: '귀사의 작년 매출액 및 순이익 규모는 어느 정도입니까?',
    description:
      '회사가 이 플랜을 끝까지 유지할 체력이 있는지 확인하는 단계입니다.',
    weight: 1,
    options: [
      {
        id: 'A',
        label: '순이익 2억 원 미만',
        value: 'low',
        scores: {
          세무: 3,
          보험: 2,
          승계: 1,
          자산: 3,
          투자: 2,
          법인: 1,
          인사: 1,
          특허: 3,
        },
      },
      {
        id: 'B',
        label: '순이익 2~3억 원 (납입 여력 양호)',
        value: 'medium',
        scores: {
          세무: 7,
          보험: 6,
          승계: 4,
          자산: 5,
          투자: 4,
          법인: 4,
          인사: 3,
          특허: 2,
        },
      },
      {
        id: 'C',
        label: '순이익 3억 원 이상',
        value: 'high',
        scores: {
          세무: 9,
          보험: 8,
          승계: 7,
          자산: 8,
          투자: 7,
          법인: 7,
          인사: 5,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q2_cashflow',
    section: 'PART 1. 재무 건전성 진단 (Can they do it?)',
    question: '월 잉여현금흐름(고정비 제외 후 남는 현금)은 어느 정도입니까?',
    description: '보험료가 월 잉여금의 30%를 넘지 않아야 안정적입니다.',
    weight: 1,
    options: [
      {
        id: 'A',
        label: '여유 자금 부족',
        value: 'insufficient',
        scores: {
          세무: 2,
          보험: 1,
          승계: 1,
          자산: 2,
          투자: 1,
          법인: 1,
          인사: 1,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '월 잉여금의 30% 이내로 보험료 납입 가능',
        value: 'sufficient',
        scores: {
          세무: 8,
          보험: 8,
          승계: 5,
          자산: 6,
          투자: 5,
          법인: 4,
          인사: 2,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q3_debt',
    section: 'PART 1. 재무 건전성 진단 (Can they do it?)',
    question: '장부상 대표님이 회사에서 가져다 쓴 돈(가지급금)이 있습니까?',
    description: '가지급금 상환 플랜과 연계할 수 있는 기회입니다.',
    weight: 1.5,
    options: [
      {
        id: 'A',
        label: '없음',
        value: 'none',
        scores: {
          세무: 5,
          보험: 5,
          승계: 5,
          자산: 5,
          투자: 5,
          법인: 5,
          인사: 5,
          특허: 5,
        },
      },
      {
        id: 'B',
        label: '있음 (가지급금 해결 필요)',
        value: 'exist',
        scores: {
          세무: 10,
          보험: 7,
          승계: 6,
          자산: 4,
          투자: 2,
          법인: 8,
          인사: 1,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q4_existing_insurance',
    section: 'PART 1. 재무 건전성 진단 (Can they do it?)',
    question: '이미 회사 명의로 가입된 상품(화재/단체/저축 등)이 있습니까?',
    description: '중복 가입 방지 및 리모델링 기회를 확인합니다.',
    weight: 1,
    options: [
      {
        id: 'A',
        label: '없음',
        value: 'none',
        scores: {
          세무: 5,
          보험: 7,
          승계: 5,
          자산: 5,
          투자: 5,
          법인: 5,
          인사: 5,
          특허: 5,
        },
      },
      {
        id: 'B',
        label: '있음 (리모델링 고려)',
        value: 'exist',
        scores: {
          세무: 6,
          보험: 9,
          승계: 5,
          자산: 5,
          투자: 5,
          법인: 4,
          인사: 2,
          특허: 1,
        },
      },
    ],
  },

  // PART 2. CEO Personal & Equity
  {
    id: 'q5_salary',
    section: 'PART 2. CEO 개인 및 지분 분석 (Who needs it?)',
    question: '현재 책정된 CEO 연봉(총급여)은 얼마입니까?',
    description: '급여 처리와 퇴직금 플랜 중 무엇이 유리한지 판단합니다.',
    weight: 1.5,
    options: [
      {
        id: 'A',
        label: '1.2억 원 이하 (급여 처리/법인 건강보험 유리)',
        value: 'low',
        scores: {
          세무: 6,
          보험: 8,
          승계: 3,
          자산: 4,
          투자: 3,
          법인: 3,
          인사: 5,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '1.2억 원 초과 (퇴직금 플랜/CEO 플랜 유리)',
        value: 'high',
        scores: {
          세무: 8,
          보험: 10,
          승계: 6,
          자산: 7,
          투자: 6,
          법인: 6,
          인사: 3,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q6_shareholding',
    section: 'PART 2. CEO 개인 및 지분 분석 (Who needs it?)',
    question: '대표님과 가족분의 지분율이 100%입니까?',
    description: '1인/가족 법인이 의사결정 및 수혜에 절대적으로 유리합니다.',
    weight: 1,
    options: [
      {
        id: 'A',
        label: '예 (1인/가족 법인)',
        value: 'family',
        scores: {
          세무: 8,
          보험: 7,
          승계: 8,
          자산: 8,
          투자: 7,
          법인: 9,
          인사: 4,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '아니오 (타인 지분 있음)',
        value: 'others',
        scores: {
          세무: 6,
          보험: 4,
          승계: 4,
          자산: 4,
          투자: 4,
          법인: 7,
          인사: 6,
          특허: 3,
        },
      },
    ],
  },
  {
    id: 'q7_family_exec',
    section: 'PART 2. CEO 개인 및 지분 분석 (Who needs it?)',
    question: '배우자나 자녀분도 임원으로 등재되어 급여를 받고 계십니까?',
    description: '가족 임원 플랜으로 확장 가능성을 타진합니다.',
    weight: 1,
    options: [
      {
        id: 'A',
        label: '예',
        value: 'yes',
        scores: {
          세무: 7,
          보험: 6,
          승계: 7,
          자산: 6,
          투자: 5,
          법인: 6,
          인사: 5,
          특허: 1,
        },
      },
      {
        id: 'B',
        label: '아니오',
        value: 'no',
        scores: {
          세무: 5,
          보험: 5,
          승계: 4,
          자산: 4,
          투자: 4,
          법인: 5,
          인사: 4,
          특허: 2,
        },
      },
    ],
  },
  {
    id: 'q8_personal_assets',
    section: 'PART 2. CEO 개인 및 지분 분석 (Who needs it?)',
    question: '개인 자산 현황은 어떠십니까?',
    description:
      '자산이 회사에 묶여 있고 개인 현금 유동성이 부족한지 확인합니다.',
    weight: 1,
    options: [
      {
        id: 'A',
        label: '개인 현금 충분함',
        value: 'sufficient',
        scores: {
          세무: 4,
          보험: 4,
          승계: 5,
          자산: 8,
          투자: 9,
          법인: 3,
          인사: 2,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '부족함/회사 자산에 묶여 있음 (개인 유동성 확보 필요)',
        value: 'insufficient',
        scores: {
          세무: 7,
          보험: 8,
          승계: 4,
          자산: 6,
          투자: 4,
          법인: 5,
          인사: 2,
          특허: 1,
        },
      },
    ],
  },

  // PART 3. Institutional Readiness
  {
    id: 'q9_articles',
    section: 'PART 3. 제도 및 규정 정비 (Are they ready?)',
    question: '법인 설립 후 정관을 최신 세법에 맞춰 정비하신 적이 있습니까?',
    description: '2015년 이전 정관이라면 100% 정비가 필요합니다.',
    weight: 1.5,
    options: [
      {
        id: 'A',
        label: '최근(3년 내) 정비함',
        value: 'recent',
        scores: {
          세무: 3,
          보험: 3,
          승계: 4,
          자산: 4,
          투자: 4,
          법인: 2,
          인사: 3,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '오래됨/기억 안 남 (정비 필요)',
        value: 'old',
        scores: {
          세무: 8,
          보험: 6,
          승계: 5,
          자산: 3,
          투자: 2,
          법인: 10,
          인사: 4,
          특허: 3,
        },
      },
    ],
  },
  {
    id: 'q10_severance',
    section: 'PART 3. 제도 및 규정 정비 (Are they ready?)',
    question: '정관에 임원 퇴직금 지급 배수(예: 2배수)가 명시되어 있습니까?',
    description: '규정 미비 시 전액 손금 불산입 리스크가 있습니다.',
    weight: 1.5,
    options: [
      {
        id: 'A',
        label: '명시되어 있음',
        value: 'yes',
        scores: {
          세무: 3,
          보험: 4,
          승계: 4,
          자산: 4,
          투자: 3,
          법인: 2,
          인사: 3,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '없음/모름 (규정 정비 시급)',
        value: 'no',
        scores: {
          세무: 9,
          보험: 7,
          승계: 5,
          자산: 3,
          투자: 2,
          법인: 10,
          인사: 4,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q11_dividend',
    section: 'PART 3. 제도 및 규정 정비 (Are they ready?)',
    question: '중간 배당이나 정기 배당을 실시하고 계십니까?',
    description: '이익잉여금 출구 전략 수립 여부를 확인합니다.',
    weight: 1,
    options: [
      {
        id: 'A',
        label: '실시하고 있음',
        value: 'yes',
        scores: {
          세무: 4,
          보험: 3,
          승계: 4,
          자산: 6,
          투자: 5,
          법인: 3,
          인사: 3,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '안 함 (전략 수립 필요)',
        value: 'no',
        scores: {
          세무: 8,
          보험: 5,
          승계: 5,
          자산: 5,
          투자: 4,
          법인: 9,
          인사: 3,
          특허: 1,
        },
      },
    ],
  },

  // PART 4. Exit Strategy
  {
    id: 'q12_succession',
    section: 'PART 4. 출구 전략 및 니즈 (What is the Goal?)',
    question: '자녀분에게 가업을 물려주실 계획이 있으십니까?',
    description: '상속세 재원 마련(종신보험/정기보험) 니즈를 확인합니다.',
    weight: 2,
    options: [
      {
        id: 'A',
        label: '있음 (승계 계획 필요)',
        value: 'yes',
        scores: {
          세무: 9,
          보험: 8,
          승계: 10,
          자산: 7,
          투자: 5,
          법인: 8,
          인사: 4,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '없음/매각 고려',
        value: 'no',
        scores: {
          세무: 6,
          보험: 3,
          승계: 2,
          자산: 9,
          투자: 8,
          법인: 5,
          인사: 3,
          특허: 2,
        },
      },
    ],
  },
  {
    id: 'q13_retirement',
    section: 'PART 4. 출구 전략 및 니즈 (What is the Goal?)',
    question: '앞으로 몇 년 정도 더 현역에서 뛰실 계획입니까?',
    description: '7~10년 이상 남았다면 CEO 플랜의 적기입니다.',
    weight: 1.5,
    options: [
      {
        id: 'A',
        label: '5년 미만',
        value: 'short',
        scores: {
          세무: 5,
          보험: 4,
          승계: 8,
          자산: 8,
          투자: 6,
          법인: 5,
          인사: 3,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '7~10년 이상 (CEO 플랜 적기)',
        value: 'long',
        scores: {
          세무: 8,
          보험: 10,
          승계: 7,
          자산: 7,
          투자: 5,
          법인: 6,
          인사: 3,
          특허: 1,
        },
      },
    ],
  },
  {
    id: 'q14_risk',
    section: 'PART 4. 출구 전략 및 니즈 (What is the Goal?)',
    question: '만약 대표님 부재 시, 회사의 빚과 가족 생계는 준비되어 있습니까?',
    description: '리스크 헤지(보장성)의 중요성을 강조합니다.',
    weight: 2,
    options: [
      {
        id: 'A',
        label: '준비됨',
        value: 'prepared',
        scores: {
          세무: 3,
          보험: 2,
          승계: 4,
          자산: 5,
          투자: 4,
          법인: 3,
          인사: 2,
          특허: 2,
        },
      },
      {
        id: 'B',
        label: '준비 안 됨 (리스크 헤지 필요)',
        value: 'unprepared',
        scores: {
          세무: 5,
          보험: 10,
          승계: 6,
          자산: 4,
          투자: 2,
          법인: 4,
          인사: 2,
          특허: 1,
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
      title: '법인 건강보험 (급여 재원 마련)',
      description: '낮은 연봉의 CEO를 위한 건강보험 활용 급여 처리 플랜',
      expectedBenefit: '소득세 절감 + 개인 자산 형성',
      duration: '1주',
      tags: ['법인건강보험', '급여관리', '절세'],
      link: '/finance-tax-labor/salary-setup', // Assuming this link or similar
    },
    {
      title: '경영인정기보험 (CEO 플랜)',
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
