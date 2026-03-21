// Data for /blog/business-succession-tax-strategy

export interface ChecklistSection {
  category: string;
  items: string[];
}

export interface RoadmapStep {
  phase: string;
  year: string;
  title: string;
  tasks: string[];
  action: { text: string; href: string } | null;
}

export interface CommonMistake {
  mistake: string;
  consequence: string;
  solution: string;
}

export const checklistSections: ChecklistSection[] = [
  {
    category: '기업 요건',
    items: [
      '업력 10년 이상 (창업일 기준)',
      '중소·중견기업 (매출액 3천억원 미만)',
      '피상속인 지분율 50% 이상 (상장기업 30%)',
      '피상속인 10년 이상 대표이사 재직',
    ],
  },
  {
    category: '상속인 요건',
    items: [
      '상속 개시 전 2년 이상 해당 기업 근무',
      '상속일부터 2년 이내 대표이사 취임',
      '18세 이상 (직계비속)',
    ],
  },
  {
    category: '사후 관리 요건',
    items: [
      '상속 후 10년간 업종 유지',
      '상속 후 7년간 평균 고용 80% 이상 유지',
      '상속 후 10년간 지분 50% 이상 보유',
      '10년간 정규직 근로자로 근무',
    ],
  },
];

export const roadmapSteps: RoadmapStep[] = [
  {
    phase: 'Phase 1',
    year: '5-10년 전',
    title: '현황 분석 및 전략 수립',
    tasks: [
      '기업 가치 평가 및 예상 상속세 계산',
      '가업상속공제 요건 충족 여부 점검',
      '5-10년 장기 로드맵 작성',
      '전문가 팀 구성 (세무사, 변호사, 회계사)',
    ],
    action: {
      text: '지금 상속세 계산하기',
      href: '/calculators/inheritance-tax',
    },
  },
  {
    phase: 'Phase 2',
    year: '3-7년 전',
    title: '지주회사 구조 설계',
    tasks: [
      '지주회사 설립 및 사업회사 지분 이전',
      '가족 구성원에게 지주회사 지분 증여',
      '10년 단위 생전증여 1차 실행',
      '후계자 대표이사 취임 (2년 요건 충족)',
    ],
    action: null,
  },
  {
    phase: 'Phase 3',
    year: '2-3년 전',
    title: '가업상속공제 요건 완성',
    tasks: [
      '업력 10년 이상 충족 확인',
      '피상속인 대표이사 10년 재직 확인',
      '후계자 2년 근무 요건 완료',
      '중소·중견기업 기준 충족 확인',
    ],
    action: null,
  },
  {
    phase: 'Phase 4',
    year: '상속 시점',
    title: '최적 공제 조합 적용',
    tasks: [
      '가업상속공제 600억 적용',
      '배우자공제 30억 최대 활용',
      '기초공제 및 자녀공제 적용',
      '상속세 신고 및 납부 (6개월)',
    ],
    action: null,
  },
  {
    phase: 'Phase 5',
    year: '상속 이후',
    title: '사후 관리 10년',
    tasks: [
      '업종 유지 의무 (10년)',
      '고용 유지 80% 이상 (7년)',
      '지분 50% 이상 보유 (10년)',
      '정규직 근로자 근무 (10년)',
    ],
    action: null,
  },
];

export const caseStudyStrategies = [
  '가업상속공제 300억 적용 (업력 30년 이상)',
  '배우자공제 30억 최대 활용',
  '생전증여 50억 실행 (2회 × 25억)',
  '지주회사 구조로 미래 가치 상승분 분리',
];

export const commonMistakes: CommonMistake[] = [
  {
    mistake: '너무 늦게 시작',
    consequence: '10년 단위 증여 기회 상실, 요건 충족 기간 부족',
    solution: '최소 5-10년 전부터 준비 시작',
  },
  {
    mistake: '요건 미충족',
    consequence: '가업상속공제 600억 혜택 포기, 세금 폭탄',
    solution: '전문가와 체크리스트 철저히 점검',
  },
  {
    mistake: '사후 관리 소홀',
    consequence: '공제 취소 + 가산세, 수십억 추가 납부',
    solution: '10년간 업종·고용·지분 유지 관리',
  },
  {
    mistake: '단일 전략 의존',
    consequence: '절세 효과 제한, 리스크 증가',
    solution: '증여+공제+법인 복합 전략 활용',
  },
];

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '가업상속공제는 얼마까지 받을 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가업상속공제는 최대 600억원까지 가능합니다. 업력 10년 이상 30년 미만은 200억원, 30년 이상은 300억원, 추가로 고용유지 요건 충족 시 300억원이 추가되어 최대 600억원까지 공제받을 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가업상속공제 요건은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1) 업력 10년 이상, 2) 피상속인 지분율 50%(상장기업 30%) 이상, 3) 중소·중견기업 요건(매출 3천억 미만), 4) 상속인 2년 이상 근무, 5) 상속 후 10년간 업종 유지 및 고용 유지 등의 요건을 충족해야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가업승계는 언제부터 준비해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '최소 5-10년 전부터 준비하는 것이 이상적입니다. 10년 단위 생전증여, 가업상속공제 요건 충족, 지주회사 설립 등 각 단계마다 시간이 필요하므로 현 경영자가 60대 초반부터 시작하는 것을 권장합니다.',
      },
    },
  ],
};
