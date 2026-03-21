// Data for /blog/successful-ceo-asset-management

export interface RelatedArticle {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

export const relatedArticles: RelatedArticle[] = [
  {
    title: '고액자산가 자산관리',
    description: '100억원 이상 자산가를 위한 전문 자산관리 전략',
    href: '/wealth-consulting',
    linkText: '자세히 보기',
  },
  {
    title: '가업승계 플랜',
    description: '5-10년 장기 계획이 필요한 가업승계 완벽 가이드',
    href: '/calculators/inheritance-tax',
    linkText: '계산하기',
  },
  {
    title: '세무 최적화 전략',
    description: '법인세, 소득세, 상속세 통합 절세 전략',
    href: '/tax-strategy',
    linkText: '자세히 보기',
  },
];

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'CEO는 개인 자산과 기업 자산을 어떻게 분리해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '법인 계좌와 개인 계좌를 명확히 분리하고, 법인 자금으로 개인 경비를 지출하지 않아야 합니다. 가지급금 발생을 최소화하고, 급여·배당금 등 정당한 방법으로 자금을 인출해야 세무 리스크를 줄일 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'CEO에게 가장 효과적인 세무 절세 전략은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '법인세와 소득세를 함께 고려한 통합 세무 설계가 중요합니다. 급여와 배당의 최적 비율 설정, 퇴직금 준비, 법인보험 활용, 기업부설연구소 설립 등 다양한 방법을 조합하여 합법적으로 절세할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'CEO의 가업승계는 언제부터 준비해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가업승계는 최소 5-10년의 준비 기간이 필요합니다. 기업 가치가 급등하기 전에 미리 계획하고, 단계적으로 지분을 이전하며, 후계자 교육을 병행해야 합니다. 빠를수록 세금 부담이 줄어들고 안정적인 승계가 가능합니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'CEO가 해외 투자를 할 때 주의할 점은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '해외금융계좌 신고의무를 준수하고, 환율 리스크를 헤지하며, 현지 세법과 한국 세법을 모두 고려해야 합니다. 전문가와 함께 이중과세 방지 전략을 수립하고, 컴플라이언스를 철저히 지키는 것이 중요합니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'CEO에게 적합한 자산배분 비율은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '일반적으로 안전자산 30-40%, 성장자산 40-50%, 대체투자 10-20%를 권장합니다. 다만 나이, 기업 현황, 리스크 성향에 따라 조정이 필요하며, 기업 자산과 개인 자산을 통합적으로 고려한 포트폴리오 설계가 중요합니다.',
      },
    },
  ],
};
