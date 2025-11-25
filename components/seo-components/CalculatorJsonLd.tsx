// 🎯 Agent OS급 SEO 최적화: 구조화 데이터 컴포넌트
interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
}

// 🎯 BMAD Method 적용: 계산기별 구조화 데이터
interface CalculatorJsonLdProps {
  type: 'inheritance' | 'gift' | 'succession';
  results?: {
    totalAmount?: number;
    taxAmount?: number;
    savings?: number;
    effectiveRate?: number;
  };
}

export function CalculatorJsonLd({ type, results }: CalculatorJsonLdProps) {
  const baseUrl = 'https://familyoffices.vip';
  
  const calculatorData = {
    inheritance: {
      name: '상속세 계산기 2025',
      description: '2025년 최신 세법 기준 상속세 계산기. 누진세율 정확 적용, 공제 한도 자동 계산, AI 절세 전략 제안.',
      url: `${baseUrl}/calculators/inheritance-tax`,
      keywords: ['상속세 계산기', '상속세 절세', '2025년 상속세', '누진세율 계산'],
    },
    gift: {
      name: '증여세 계산기 2025',
      description: '2025년 최신 세법 기준 증여세 계산기. 관계별 공제한도 자동 적용, 분할증여 최적화 분석.',
      url: `${baseUrl}/calculators/gift-tax`,
      keywords: ['증여세 계산기', '분할증여', '증여세 절세', '관계별 공제'],
    },
    succession: {
      name: '가업승계 비용 계산기 2025',
      description: '2025년 최신 세법 기준 가업승계 비용 계산기. 승계 방법별 세무비용 정확 계산, 특례 혜택 분석.',
      url: `${baseUrl}/calculators/succession-cost`,
      keywords: ['가업승계 비용', '사업승계', '가업승계 특례', '승계 세무비용'],
    },
  };

  const calculator = calculatorData[type];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'FinancialProduct'],
    name: calculator.name,
    description: calculator.description,
    url: calculator.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    
    // 🎯 BMAD Behavioral: 기능적 특징
    featureList: [
      '2025년 최신 세법 반영',
      '실시간 정확한 계산',
      'AI 최적화 전략 제안',
      '전문가 수준 분석',
      '모바일 최적화',
      '무료 이용'
    ],
    
    // 🎯 BMAD Motivational: 가치 제안
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
      description: '무료 세무 계산 및 최적화 서비스'
    },
    
    // 🎯 BMAD Aspirational: 성과 지표 (실제 계산 결과가 있는 경우)
    ...(results && {
      potentialAction: {
        '@type': 'UseAction',
        name: '계산 결과 확인',
        result: {
          '@type': 'QuantitativeValue',
          value: results.taxAmount || 0,
          unitText: '만원'
        }
      }
    }),
    
    // 🎯 BMAD Decisional: 행동 유도
    provider: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      url: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-2-1234-5678',
        contactType: 'Customer Service'
      }
    }
  };

  return <JsonLd data={jsonLd} />;
}

// 🎯 Agent OS급 사용자 여정 추적
interface UserJourneyTrackingProps {
  step: 'landing' | 'input' | 'calculation' | 'result' | 'consultation';
  calculatorType: string;
  metadata?: Record<string, any>;
}

export function UserJourneyTracking({ step, calculatorType, metadata }: UserJourneyTrackingProps) {
  const trackingData = {
    '@context': 'https://schema.org',
    '@type': 'Action',
    name: `Calculator Usage - ${step}`,
    object: {
      '@type': 'WebPage',
      name: `${calculatorType} Calculator - ${step}`,
      url: window?.location?.href || ''
    },
    startTime: new Date().toISOString(),
    instrument: {
      '@type': 'SoftwareApplication',
      name: 'FamilyOffice S Calculator'
    },
    ...(metadata && { additionalProperty: metadata })
  };

  return <JsonLd data={trackingData} />;
}

// 🎯 FAQ 구조화 데이터 컴포넌트
interface FAQJsonLdProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return <JsonLd data={faqData} />;
}