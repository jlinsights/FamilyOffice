import { Building, HardHat, Users, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface RiskFactor {
  icon: LucideIcon;
  title: string;
  description: string;
  penalty: string;
  color: string;
}

export interface ResponseStep {
  step: number;
  title: string;
  description: string;
  items: string[];
  duration: string;
  color: string;
}

export interface InsuranceProduct {
  name: string;
  coverage: string;
  limit: string;
  premium: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const riskFactors: RiskFactor[] = [
  {
    icon: Building,
    title: '제조업',
    description: '기계사고, 화학물질 노출 등',
    penalty: '최대 50억원',
    color: 'red',
  },
  {
    icon: HardHat,
    title: '건설업',
    description: '추락, 붕괴, 끼임 사고 등',
    penalty: '최대 10억원',
    color: 'orange',
  },
  {
    icon: Users,
    title: '서비스업',
    description: '화재, 질식, 감전 사고 등',
    penalty: '최대 10억원',
    color: 'yellow',
  },
  {
    icon: Zap,
    title: '전체업종',
    description: '중대시민재해 포함 확대',
    penalty: '처벌 강화',
    color: 'purple',
  },
];

export const responseSteps: ResponseStep[] = [
  {
    step: 1,
    title: '현황 진단',
    description: '현재 안전관리 수준 점검 및 리스크 평가',
    items: [
      '안전관리체계 현황 분석',
      '법적 요구사항 gap 분석',
      '잠재 위험요소 식별',
      '우선순위 도출',
    ],
    duration: '1-2주',
    color: 'from-blue-500 to-blue-600',
  },
  {
    step: 2,
    title: '체계 구축',
    description: '법적 요구사항에 맞는 안전관리체계 구축',
    items: [
      '안전보건관리체계 수립',
      '안전보건규정 제정',
      '교육훈련 체계 구축',
      '점검·개선 절차 마련',
    ],
    duration: '2-4주',
    color: 'from-green-500 to-green-600',
  },
  {
    step: 3,
    title: '보험 대비',
    description: '경영진 보호를 위한 보험 가입 및 운영',
    items: [
      '임원배상책임보험 가입',
      'D&O 보험 검토',
      '중대재해 특약 추가',
      '보험금 청구 프로세스',
    ],
    duration: '1주',
    color: 'from-purple-500 to-purple-600',
  },
  {
    step: 4,
    title: '모니터링',
    description: '지속적인 관리 및 개선 시스템 운영',
    items: [
      '정기 점검 실시',
      '교육훈련 이행',
      '법령 변경사항 반영',
      '사고 예방 활동',
    ],
    duration: '상시',
    color: 'from-orange-500 to-orange-600',
  },
];

export const insuranceProducts: InsuranceProduct[] = [
  {
    name: '임원배상책임보험',
    coverage: '경영진 개인 손해 보상',
    limit: '10억원~100억원',
    premium: '연 100만원~',
    features: [
      '형사처벌 변호비용',
      '민사소송 대응',
      '과태료 부담',
      '재판비용 지원',
    ],
  },
  {
    name: 'D&O 보험 특약',
    coverage: '중대재해 관련 특화',
    limit: '50억원~200억원',
    premium: '연 300만원~',
    features: [
      '중대재해 전문 대응',
      '24시간 긴급대응',
      '전문 변호사단',
      '위기관리 컨설팅',
    ],
  },
  {
    name: '기업종합보험',
    coverage: '기업 전체 리스크',
    limit: '100억원~500억원',
    premium: '연 500만원~',
    features: [
      '중대재해 + 일반사고',
      '영업손실 보상',
      '복구비용 지원',
      '사업중단보험',
    ],
  },
];

export const faqItems: FAQItem[] = [
  {
    question: '우리 회사도 중대재해처벌법 적용 대상인가요?',
    answer:
      '상시근로자 5인 이상 사업장이면 모두 적용됩니다. 2022년부터 50인 이상, 2024년부터 5인 이상으로 확대되었습니다. 중대시민재해의 경우 사업장 규모와 관계없이 모든 사업장에 적용됩니다. 건설업, 제조업뿐만 아니라 서비스업, 유통업 등 모든 업종이 대상입니다.',
  },
  {
    question: '안전관리체계는 어떻게 구축해야 하나요?',
    answer:
      '①안전보건관리책임자 지정 ②안전보건관리체계 구축 ③안전보건목표·계획 수립 ④안전보건관리규정 제정·시행 ⑤안전보건교육 실시 ⑥작업환경측정 등 안전보건조치 이행 ⑦중대재해 발생 시 재발방지 조치 등 7가지 핵심 요소를 모두 갖춰야 합니다. 전문가의 도움 없이는 완벽한 구축이 어렵습니다.',
  },
  {
    question: '보험으로 모든 처벌을 피할 수 있나요?',
    answer:
      '보험은 형사처벌 자체를 피할 수 없지만, 변호비용과 벌금, 손해배상 등 재정적 부담을 크게 줄여줍니다. 더 중요한 것은 사전에 안전관리체계를 완벽히 구축하여 중대재해를 예방하는 것입니다. 보험은 만약의 사태에 대비한 최후의 안전장치입니다.',
  },
  {
    question: '대응 비용은 얼마나 드나요?',
    answer:
      '기업 규모와 업종에 따라 다르지만, 컨설팅 비용은 500만원~2000만원, 보험료는 연간 100만원~1000만원 수준입니다. 하지만 중대재해 발생 시 경영진 개인이 부담해야 할 비용(변호비용, 벌금, 손해배상 등)은 수십억원에 달할 수 있어 사전 대비 비용과 비교할 수 없습니다.',
  },
  {
    question: '협력업체나 하청업체 사고도 우리 책임인가요?',
    answer:
      '원청업체는 하청업체 근로자의 안전에 대해서도 책임을 집니다. 특히 건설업의 경우 하청업체 관리가 매우 중요하며, 하청업체 안전교육, 안전장비 지급, 작업환경 점검 등을 철저히 해야 합니다. 하청업체와의 계약서에 안전관리 조항을 명시하고 정기 점검을 실시해야 합니다.',
  },
  {
    question: '지금부터 준비해도 늦지 않나요?',
    answer:
      '중대재해처벌법은 이미 시행 중이며, 언제든 사고가 발생할 수 있습니다. 하루라도 빨리 안전관리체계를 구축하고 보험에 가입하는 것이 중요합니다. 완벽한 준비까지는 4-8주가 걸리므로, 지금 즉시 시작하시기 바랍니다. 전문가의 무료 진단부터 시작하여 단계적으로 준비하실 수 있습니다.',
  },
];

export const structuredDataGraph: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://familyoffices.vip/serious-accident-law#article',
      headline: '중대재해처벌법 완벽 대응 가이드',
      description:
        '중대재해처벌법 완벽 대응을 위한 안전관리체계 구축, 경영진 보험, 법적 리스크 차단 전략을 제공합니다.',
      author: {
        '@type': 'Organization',
        name: 'FamilyOffice S',
        url: 'https://familyoffices.vip',
      },
      publisher: {
        '@type': 'Organization',
        name: 'FamilyOffice S',
        logo: {
          '@type': 'ImageObject',
          url: 'https://familyoffices.vip/favicon.ico',
        },
      },
      datePublished: '2025-01-31',
      dateModified: '2025-01-31',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://familyoffices.vip/serious-accident-law',
      },
      articleSection: 'Business Law',
      keywords: [
        '중대재해처벌법',
        '안전관리체계',
        '경영책임자',
        '임원배상책임보험',
        '중대재해 대응',
      ],
    },
    {
      '@type': 'HowTo',
      name: '중대재해처벌법 4단계 대응 방법',
      description:
        '중대재해처벌법에 완벽하게 대응하기 위한 체계적인 4단계 방법론',
      totalTime: 'P4W',
      supply: [
        {
          '@type': 'HowToSupply',
          name: '전문 컨설턴트',
        },
        {
          '@type': 'HowToSupply',
          name: '임원배상책임보험',
        },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: '현황 진단',
          text: '현재 안전관리 수준 점검 및 리스크 평가를 실시합니다. 안전관리체계 현황 분석, 법적 요구사항 gap 분석, 잠재 위험요소 식별을 통해 우선순위를 도출합니다.',
          url: 'https://familyoffices.vip/serious-accident-law#step1',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: '체계 구축',
          text: '법적 요구사항에 맞는 안전관리체계를 구축합니다. 안전보건관리체계 수립, 안전보건규정 제정, 교육훈련 체계 구축, 점검·개선 절차를 마련합니다.',
          url: 'https://familyoffices.vip/serious-accident-law#step2',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: '보험 대비',
          text: '경영진 보호를 위한 보험에 가입하고 운영합니다. 임원배상책임보험 가입, D&O 보험 검토, 중대재해 특약 추가, 보험금 청구 프로세스를 구축합니다.',
          url: 'https://familyoffices.vip/serious-accident-law#step3',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: '모니터링',
          text: '지속적인 관리 및 개선 시스템을 운영합니다. 정기 점검 실시, 교육훈련 이행, 법령 변경사항 반영, 사고 예방 활동을 상시 진행합니다.',
          url: 'https://familyoffices.vip/serious-accident-law#step4',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '우리 회사도 중대재해처벌법 적용 대상인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '상시근로자 5인 이상 사업장이면 모두 적용됩니다. 2022년부터 50인 이상, 2024년부터 5인 이상으로 확대되었습니다. 중대시민재해의 경우 사업장 규모와 관계없이 모든 사업장에 적용됩니다.',
          },
        },
        {
          '@type': 'Question',
          name: '안전관리체계는 어떻게 구축해야 하나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '①안전보건관리책임자 지정 ②안전보건관리체계 구축 ③안전보건목표·계획 수립 ④안전보건관리규정 제정·시행 ⑤안전보건교육 실시 ⑥작업환경측정 등 안전보건조치 이행 ⑦중대재해 발생 시 재발방지 조치 등 7가지 핵심 요소를 모두 갖춰야 합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '보험으로 모든 처벌을 피할 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '보험은 형사처벌 자체를 피할 수 없지만, 변호비용과 벌금, 손해배상 등 재정적 부담을 크게 줄여줍니다. 더 중요한 것은 사전에 안전관리체계를 완벽히 구축하여 중대재해를 예방하는 것입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '대응 비용은 얼마나 드나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '기업 규모와 업종에 따라 다르지만, 컨설팅 비용은 500만원~2000만원, 보험료는 연간 100만원~1000만원 수준입니다. 하지만 중대재해 발생 시 경영진 개인이 부담해야 할 비용은 수십억원에 달할 수 있습니다.',
          },
        },
      ],
    },
    {
      '@type': 'Service',
      name: '중대재해처벌법 대응 컨설팅',
      description:
        '중대재해처벌법 완벽 대응을 위한 안전관리체계 구축 및 보험 솔루션 제공',
      provider: {
        '@type': 'Organization',
        name: 'FamilyOffice S',
        url: 'https://familyoffices.vip',
      },
      areaServed: 'KR',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://familyoffices.vip/serious-accident-law',
        servicePhone: '0502-5550-8700',
      },
      offers: {
        '@type': 'Offer',
        description: '무료 위험도 진단 및 맞춤형 대응 솔루션',
        priceRange: '500만원-2000만원',
      },
    },
  ],
};
