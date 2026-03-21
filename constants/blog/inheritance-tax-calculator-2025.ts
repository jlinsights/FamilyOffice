// Data for /blog/inheritance-tax-calculator-2025

export interface CalculationStep {
  step: number;
  title: string;
  description: string;
  formula: string;
}

export interface RelatedService {
  title: string;
  description: string;
  href: string;
  iconName: 'Shield' | 'Users' | 'DollarSign';
  iconColor: string;
}

export const calculationSteps: CalculationStep[] = [
  {
    step: 1,
    title: '상속재산 평가',
    description:
      '피상속인의 모든 재산(부동산, 예금, 주식 등)을 시가로 평가합니다.',
    formula: '총 상속재산',
  },
  {
    step: 2,
    title: '공제 전 상속액 계산',
    description:
      '상속재산에서 채무(부채, 장례비 등)를 차감합니다.',
    formula: '상속재산 - 채무 = 공제 전 상속액',
  },
  {
    step: 3,
    title: '각종 공제 적용',
    description:
      '기초공제, 배우자공제, 자녀공제 등을 차감합니다.',
    formula: '공제 전 상속액 - 각종 공제 = 과세표준',
  },
  {
    step: 4,
    title: '세율 적용',
    description:
      '과세표준에 따라 10%~50% 세율을 적용합니다.',
    formula: '과세표준 × 세율 - 누진공제 = 산출세액',
  },
  {
    step: 5,
    title: '최종 납부세액',
    description:
      '세액공제(증여세액공제 등)를 적용하여 최종 납부액을 계산합니다.',
    formula: '산출세액 - 세액공제/감면 = 납부할 세액',
  },
];

export const relatedServices: RelatedService[] = [
  {
    title: '상속 세무 컨설팅',
    description: '상속세 신고부터 절세 전략까지 전문가 1:1 컨설팅',
    href: '/wealth-consulting',
    iconName: 'Shield',
    iconColor: 'text-emerald-600',
  },
  {
    title: '가업승계 플랜',
    description: '5-10년 장기 계획으로 세금 부담 최소화하는 승계 전략',
    href: '/business-succession-strategy',
    iconName: 'Users',
    iconColor: 'text-blue-600',
  },
  {
    title: '절세 전략 설계',
    description: '법인세, 소득세, 상속세 통합 절세 솔루션',
    href: '/tax-strategy',
    iconName: 'DollarSign',
    iconColor: 'text-purple-600',
  },
];

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '2025년 상속세율은 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2025년 상속세율은 과세표준에 따라 10%~50%까지 5단계로 구분됩니다. 1억원 이하 10%, 5억원 이하 20%, 10억원 이하 30%, 30억원 이하 40%, 30억원 초과 50%입니다. 최대주주 할증과세는 20%가 추가됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '상속공제는 얼마까지 받을 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '배우자공제는 최소 5억원~최대 30억원, 기초공제 2억원, 자녀공제는 1인당 5,000만원(미성년자는 추가 1,000만원/년)입니다. 일괄공제 5억원과 개별공제 중 큰 금액을 선택할 수 있으며, 가업상속공제는 최대 600억원까지 가능합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '상속세는 언제까지 신고·납부해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '상속개시일(사망일)이 속하는 달의 말일부터 6개월 이내에 신고·납부해야 합니다. 피상속인이 해외에 거주했다면 9개월입니다. 기한 내 미신고 시 무신고가산세 20%(부정무신고 40%), 미납부 시 납부불성실가산세가 부과됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '부동산 상속 시 가액은 어떻게 평가하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '부동산은 원칙적으로 시가로 평가하되, 시가를 산정하기 어려운 경우 개별공시지가나 공동주택가격 등의 보충적 평가방법을 적용합니다. 상속개시일 전후 6개월 이내 매매가액이 있으면 이를 시가로 인정하며, 감정평가액을 활용할 수도 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '상속세 절세 방법은 무엇이 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '사전증여를 통한 분산(10년 단위 증여세 과세), 배우자 공동명의로 배우자공제 극대화, 가업상속공제 요건 충족, 공익법인 출연을 통한 공제, 보험금 비과세 한도 활용 등이 있습니다. 전문가 상담을 통해 가족 상황에 맞는 최적 전략을 수립하는 것이 중요합니다.',
      },
    },
  ],
};
