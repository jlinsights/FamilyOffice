// Data for /blog/inheritance-tax-reduction-case-study

export interface Strategy {
  title: string;
  description: string;
  impact: string;
}

export interface ActionStep {
  step: number;
  title: string;
  action: string;
  link: string | null;
}

export const case1Strategies: Strategy[] = [
  {
    title: '1. 가족법인 설립 (2016년)',
    description:
      '자녀 2명을 대표이사로 한 가족법인 설립. 단계적 지분 이전 시작.',
    impact: '지분 가치 상승분에 대한 상속세 부담 제거',
  },
  {
    title: '2. 10년 단위 생전증여 실행',
    description:
      '배우자에게 30억, 자녀 각 10억씩 증여 (2016년, 2026년 2회 실행 예정)',
    impact: '증여세 10억 납부 → 상속세 30억 절감 효과',
  },
  {
    title: '3. 가업상속공제 요건 충족',
    description:
      '업력 10년 이상, 매출 3천억 미만, 정규직 고용 등 요건 충족 준비',
    impact: '최대 500억원 공제 가능 (실제 적용 시)',
  },
  {
    title: '4. 배우자 공제 최대화',
    description: '배우자 법정상속분 확대 → 30억 공제 한도 최대 활용',
    impact: '배우자 공제 30억 확보',
  },
];

export const case2Strategies: Strategy[] = [
  {
    title: '1. 10년 단위 생전증여 (2018년 시작)',
    description:
      '배우자 15억, 자녀 각 5억씩 증여. 2028년 2차 증여 예정.',
    impact: '증여세 5억 납부 → 상속세 12억 절감',
  },
  {
    title: '2. 가족신탁 설립',
    description: '부동산 30억을 가족신탁에 출연하여 단계적 승계',
    impact: '부동산 가치 상승분에 대한 세금 부담 제거',
  },
  {
    title: '3. 부동산 법인 전환',
    description: '개인 소유 부동산 20억을 부동산 법인으로 전환',
    impact: '법인세 활용 + 지분 증여로 절세 효과 극대화',
  },
  {
    title: '4. 배우자 공동명의',
    description: '주요 자산을 배우자와 공동명의로 전환',
    impact: '배우자 공제 30억 확보 가능',
  },
];

export const actionSteps: ActionStep[] = [
  {
    step: 1,
    title: '현재 상속세 계산',
    action: '무료 계산기로 예상 세액 확인',
    link: '/calculators/inheritance-tax',
  },
  {
    step: 2,
    title: '전문가 무료 상담',
    action: '자산 구성과 가족 상황 분석',
    link: '/contact',
  },
  {
    step: 3,
    title: '맞춤 절세 전략 수립',
    action: '5-10년 로드맵 작성',
    link: null,
  },
  {
    step: 4,
    title: '단계별 실행',
    action: '증여, 법인, 신탁 등 순차 진행',
    link: null,
  },
  {
    step: 5,
    title: '정기 모니터링',
    action: '연 2회 점검 및 전략 조정',
    link: null,
  },
];

export const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '상속세 40% 절감 사례 분석 | 실제 성공 사례로 보는 절세 전략',
  description:
    '제조업 CEO와 IT 창업가의 실제 상속세 절감 사례를 통해 배우는 합법적 절세 전략',
  author: {
    '@type': 'Organization',
    name: 'FamilyOffice S',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FamilyOffice S',
    logo: {
      '@type': 'ImageObject',
      url: 'https://familyoffices.vip/logo.png',
    },
  },
  datePublished: '2025-01-15',
  dateModified: '2025-01-15',
};

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '상속세를 40% 이상 절감하는 것이 정말 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 가능합니다. 생전증여, 가족법인 설립, 배우자 공제 극대화, 가업상속공제 활용 등 합법적인 방법을 체계적으로 조합하면 40-80%까지 절감이 가능합니다. 단, 5-10년의 장기 계획과 전문가 상담이 필수적입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가장 효과적인 상속세 절감 방법은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단일 방법보다는 여러 전략의 조합이 중요합니다. 1) 10년 단위 생전증여로 재산 분산, 2) 가족법인 설립을 통한 지분 이전, 3) 배우자 공제 30억 한도 최대 활용, 4) 가업상속공제 요건 충족이 핵심입니다. 자산 규모와 가족 구성에 따라 최적 조합이 달라집니다.',
      },
    },
    {
      '@type': 'Question',
      name: '생전증여는 언제부터 시작해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가능한 한 빨리 시작하는 것이 유리합니다. 10년 단위로 증여세 공제가 리셋되므로, 70대에 시작하면 1-2회, 60대에 시작하면 2-3회, 50대에 시작하면 3-4회 증여 기회를 활용할 수 있습니다. 특히 자산 가치가 상승할 것으로 예상되는 경우 조기 증여가 더욱 효과적입니다.',
      },
    },
  ],
};
