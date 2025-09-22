// 듀얼 도메인 SEO 최적화 설정
import type { Metadata } from 'next';

export interface DomainConfig {
  domain: string;
  brandName: string;
  positioning: string;
  targetKeywords: string[];
  targetAudience: string;
  differentiator: string;
}

// 도메인별 설정
export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  'samsunglife.vip': {
    domain: 'samsunglife.vip',
    brandName: 'Samsung Life VIP Services',
    positioning: '삼성생명과 함께하는 기업 전용 프리미엄 금융 솔루션',
    targetKeywords: [
      '기업보험 전문',
      '법인세 절감',
      '경영진 보장',
      '기업 승계 계획',
      '대기업 자산관리',
      '상장기업 CFO',
      '중견기업 리스크관리',
      '삼성생명 파트너',
      '기업 전용 서비스',
      '법인 금융 솔루션'
    ],
    targetAudience: '대기업 계열사, 상장기업, 중견기업 CEO 및 CFO',
    differentiator: '삼성생명 백그라운드 + 기업 특화 서비스'
  },
  'familyoffices.vip': {
    domain: 'familyoffices.vip',
    brandName: 'FamilyOffice S - Independent Wealth Management',
    positioning: '독립 전문가의 개인맞춤 패밀리오피스 서비스',
    targetKeywords: [
      '독립 자산관리',
      '개인맞춤 설계',
      '전문 컨설팅',
      '중소기업 오너',
      '개인사업자 자산',
      '맞춤형 포트폴리오',
      '독립 재무설계',
      '개인 패밀리오피스',
      '전문가 직접 관리',
      '소규모 전문 서비스'
    ],
    targetAudience: '개인사업자, 중소기업 오너, 신규 부유층, 전문직',
    differentiator: '독립성 + 개인화 + 전문성'
  }
};

// 도메인별 메타데이터 생성 함수
export function generateDomainMetadata(domain: string, page?: string): Metadata {
  const config = DOMAIN_CONFIGS[domain];
  if (!config) {
    throw new Error(`Unknown domain: ${domain}`);
  }

  const baseTitle = page ? `${page} | ${config.brandName}` : config.brandName;
  
  return {
    metadataBase: new URL(`https://${domain}`),
    title: {
      default: baseTitle,
      template: `%s | ${config.brandName}`,
    },
    description: config.positioning,
    keywords: config.targetKeywords,
    openGraph: {
      title: baseTitle,
      description: config.positioning,
      url: `https://${domain}`,
      siteName: config.brandName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description: config.positioning,
    },
    alternates: {
      canonical: `https://${domain}`,
    },
    other: {
      'target-audience': config.targetAudience,
      'brand-differentiator': config.differentiator,
    }
  };
}

// 크로스 도메인 참조 설정
export const CROSS_DOMAIN_REFERENCES = {
  'samsunglife.vip': {
    referTo: 'familyoffices.vip',
    context: '개인 맞춤 서비스가 필요하신 경우',
    linkText: '개인 전문 서비스 보기'
  },
  'familyoffices.vip': {
    referTo: 'samsunglife.vip',
    context: '기업 전용 서비스가 필요하신 경우',
    linkText: '기업 전문 서비스 보기'
  }
};

// 구조화 데이터 스키마
export function generateDomainStructuredData(domain: string) {
  const config = DOMAIN_CONFIGS[domain] || DOMAIN_CONFIGS['familyoffices.vip'];
  
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": config.brandName,
    "description": config.positioning,
    "url": `https://${domain}`,
    "serviceType": domain === 'samsunglife.vip' ? 'Corporate Financial Services' : 'Personal Wealth Management',
    "areaServed": "KR",
    "audience": {
      "@type": "Audience",
      "audienceType": config.targetAudience
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${config.brandName} Services`,
      "itemListElement": config.targetKeywords.map((keyword, index) => ({
        "@type": "Offer",
        "name": keyword,
        "position": index + 1
      }))
    }
  };
}