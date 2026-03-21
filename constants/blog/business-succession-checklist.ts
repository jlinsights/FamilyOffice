// Data for /blog/business-succession-checklist

export interface ChecklistItem {
  title: string;
  description: string;
}

export interface ChecklistPhase {
  iconColor: string;
  iconBgLight: string;
  iconBgDark: string;
  title: string;
  subtitle: string;
  items: ChecklistItem[];
}

export interface RelatedService {
  title: string;
  description: string;
  href: string;
  linkText: string;
  iconName: 'Building2' | 'Shield' | 'Users';
  iconColor: string;
}

export const checklistPhases: ChecklistPhase[] = [
  {
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBgLight: 'bg-blue-100',
    iconBgDark: 'dark:bg-blue-900/30',
    title: '1단계: 장기 준비 (10년 전~)',
    subtitle: '가업승계의 토대 마련하기',
    items: [
      {
        title: '후계자 선정 및 합의',
        description:
          '가족 회의를 통해 후계자를 선정하고, 다른 가족 구성원의 동의 확보',
      },
      {
        title: '기업 가치 평가',
        description:
          '회계법인을 통한 정확한 기업 가치 산정 (절세 전략의 기초)',
      },
      {
        title: '가업승계 전문가 팀 구성',
        description: '세무사, 변호사, 회계사 등 전문가 자문단 확보',
      },
      {
        title: '가족헌장 작성',
        description:
          '가족 간 역할, 의사결정 구조, 분쟁 해결 방법 등을 문서화',
      },
    ],
  },
  {
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBgLight: 'bg-purple-100',
    iconBgDark: 'dark:bg-purple-900/30',
    title: '2단계: 후계자 교육 (5-7년 전)',
    subtitle: '체계적인 역량 개발',
    items: [
      {
        title: '현장 경험 축적',
        description:
          '생산, 영업, 관리 등 주요 부서 순환 근무 (최소 2-3년)',
      },
      {
        title: 'MBA 또는 전문 교육',
        description: '경영학 석사, 산업별 전문 교육 프로그램 이수',
      },
      {
        title: '해외 선진 기업 벤치마킹',
        description: '글로벌 트렌드 학습 및 네트워크 구축',
      },
      {
        title: '임원 승진 및 경영 참여',
        description: '이사회 참석, 주요 의사결정 과정 참여',
      },
    ],
  },
  {
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBgLight: 'bg-emerald-100',
    iconBgDark: 'dark:bg-emerald-900/30',
    title: '3단계: 절세 전략 실행 (3-5년 전)',
    subtitle: '세금 부담 최소화',
    items: [
      {
        title: '사전 증여 시작',
        description:
          '10년 단위로 증여세 과세표준 분산 (5억원까지 10% 세율)',
      },
      {
        title: '가족법인 설립 검토',
        description:
          '지주회사 구조로 전환하여 지배력 유지하며 세금 절감',
      },
      {
        title: '가업상속공제 요건 준비',
        description:
          '후계자 2년 이상 근무, 10년 이상 기업 경영 등 요건 충족',
      },
      {
        title: '주식 평가 하락 전략',
        description:
          '적법한 범위 내에서 주식 가치를 일시적으로 낮추는 방법 활용',
      },
    ],
  },
  {
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBgLight: 'bg-orange-100',
    iconBgDark: 'dark:bg-orange-900/30',
    title: '4단계: 경영권 이양 준비 (1-2년 전)',
    subtitle: '실질적 경영 승계',
    items: [
      {
        title: '공동 대표이사 체제',
        description:
          '1-2년간 선대와 후계자가 함께 경영하며 노하우 전수',
      },
      {
        title: '핵심 임직원 소통',
        description:
          '주요 인력의 이탈 방지, 후계자에 대한 신뢰 구축',
      },
      {
        title: '거래처 관계 인수인계',
        description: '주요 고객사, 협력사와 후계자 관계 형성',
      },
      {
        title: '지분 이전 완료',
        description:
          '경영권 확보에 필요한 지분(통상 51% 이상) 이전',
      },
    ],
  },
  {
    iconColor: 'text-red-600 dark:text-red-400',
    iconBgLight: 'bg-red-100',
    iconBgDark: 'dark:bg-red-900/30',
    title: '5단계: 승계 완료 및 사후 관리',
    subtitle: '안정적 정착과 지속 성장',
    items: [
      {
        title: '공식 승계 발표',
        description: '내부 및 외부 이해관계자에게 공식 발표',
      },
      {
        title: '세무 신고 및 납부',
        description:
          '상속세/증여세 신고 (6개월 이내), 가업상속공제 신청',
      },
      {
        title: '선대 경영자 역할 재정의',
        description:
          '고문, 이사회 의장 등으로 전환하여 간섭 최소화',
      },
      {
        title: '사후 요건 관리 (7년간)',
        description:
          '가업상속공제 사후 요건(업종 유지, 고용 유지 등) 철저히 준수',
      },
    ],
  },
];

export const phaseIcons = ['Timer', 'Users', 'Shield', 'Building2', 'TrendingUp'] as const;

export const relatedServices: RelatedService[] = [
  {
    title: '가업승계 컨설팅',
    description: '5-10년 장기 플랜 수립부터 실행까지 전문가가 함께합니다',
    href: '/business-succession-strategy',
    linkText: '자세히 보기',
    iconName: 'Building2',
    iconColor: 'text-blue-600',
  },
  {
    title: '상속세 절세 전략',
    description: '가업상속공제 최대 600억원 활용 전략',
    href: '/calculators/inheritance-tax',
    linkText: '계산하기',
    iconName: 'Shield',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'CEO 자산관리',
    description: '기업 자산과 개인 자산을 통합 관리하는 전략',
    href: '/tax-strategy',
    linkText: '확인하기',
    iconName: 'Users',
    iconColor: 'text-purple-600',
  },
];

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '가업승계는 언제부터 준비해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가업승계는 최소 5년, 이상적으로는 10년 전부터 준비해야 합니다. 기업 가치 상승 전에 미리 계획하고, 후계자 교육 기간을 충분히 확보하며, 단계적으로 지분을 이전해야 세금 부담을 최소화할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가업상속공제는 얼마까지 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가업상속공제는 최대 600억원까지 공제받을 수 있습니다. 다만 10년 이상 계속 경영한 기업, 매출액 5,000억원 미만, 상속인이 2년 이상 근무 등의 요건을 충족해야 합니다. 사후 요건도 7년간 유지해야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가업승계 시 가장 큰 세금 부담은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '상속세와 증여세가 가장 큰 부담입니다. 기업 가치가 높을수록 최대 50%(최대주주 할증 시 60%)의 세율이 적용될 수 있습니다. 따라서 가업상속공제, 사전증여, 가족법인 활용 등 다양한 절세 전략이 필수입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '후계자는 어떻게 선정하고 교육해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '능력, 열정, 가족 합의 등을 종합적으로 고려해야 합니다. 최소 5년 이상의 교육 기간을 두고, 현장 경험부터 경영 참여까지 단계적으로 진행하며, 외부 교육(MBA 등)과 멘토링을 병행하는 것이 효과적입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가업승계 실패를 방지하려면 어떻게 해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '투명한 지배구조 구축, 체계적인 후계자 교육, 전문경영인 영입, 가족 간 명확한 역할 분담, 법적 문서화(가족헌장 등), 외부 전문가 자문 활용이 중요합니다. 무엇보다 충분한 준비 기간 확보가 핵심입니다.',
      },
    },
  ],
};
