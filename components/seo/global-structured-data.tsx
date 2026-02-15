'use client';

import Script from 'next/script';
import { sanitizeStructuredData } from '@/lib/security/html-sanitizer';

export function GlobalStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'LocalBusiness', 'ProfessionalService'],
    name: '절세플랜·가업승계·가족법인 전문 FamilyOffice S',
    description:
      '절세플랜 설계 × 가업승계 컨설팅 × 가족법인 설립 × 정책자금 × 기업인증 통합솔루션. 성공한 기업가를 위한 맞춤형 절세플랜, 가족법인 세무최적화, 정책자금 신청 95% 성공률, 삼성생명 프리미엄 파트너',
    url: 'https://familyoffices.vip',
    telephone: '+82-502-5550-8700',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '서울특별시 중구',
      addressLocality: '서울',
      addressRegion: '서울특별시',
      postalCode: '04527',
      addressCountry: 'KR',
    },
    areaServed: [
      {
        '@type': 'City',
        name: '서울특별시',
        containedInPlace: {
          '@type': 'Country',
          name: '대한민국',
        },
      },
      {
        '@type': 'State',
        name: '경기도',
        containedInPlace: {
          '@type': 'Country',
          name: '대한민국',
        },
      },
      {
        '@type': 'City',
        name: '인천광역시',
        containedInPlace: {
          '@type': 'Country',
          name: '대한민국',
        },
      },
      {
        '@type': 'State',
        name: '충청북도',
        containedInPlace: {
          '@type': 'Country',
          name: '대한민국',
        },
      },
      {
        '@type': 'State',
        name: '충청남도',
        containedInPlace: {
          '@type': 'Country',
          name: '대한민국',
        },
      },
      {
        '@type': 'City',
        name: '세종특별자치시',
        containedInPlace: {
          '@type': 'Country',
          name: '대한민국',
        },
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.5665',
      longitude: '126.9780',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    availableLanguage: ['Korean'],
    priceRange: '₩₩₩₩',
    targetAudience: {
      '@type': 'Audience',
      audienceType: '성공한 기업가와 자산가',
      geographicArea: '대한민국',
    },
    knowsAbout: [
      '절세플랜 설계 전문',
      '가업승계 컨설팅',
      '가족법인 설립 운영',
      '정책자금 신청 컨설팅',
      '기업인증 취득 지원',
      '세무최적화 전략',
      '법인세 절세방안',
      '상속세 승계세무',
      '벤처기업인증 컨설팅',
      '이노비즈 인증 지원',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '절세플랜 × 가업승계 × 가족법인 × 정책자금 × 기업인증 통합솔루션',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '맞춤형 절세플랜 설계',
            description: '법인세·소득세·상속세 통합 최적화 절세플랜 전문 설계',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '가족법인 설립 컨설팅',
            description: '상속세 50% 절감 가능한 최적 가족법인 구조 설계',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '정책자금 신청 지원',
            description: '95% 성공률의 정책자금 신청 전문 컨설팅 서비스',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '기업인증 취득 컨설팅',
            description: '벤처·이노비즈 등 기업인증 취득으로 세제혜택 극대화',
          },
        },
      ],
    },
    memberOf: {
      '@type': 'Organization',
      name: '삼성생명보험',
      description: 'VVIP 패밀리오피스 서비스 제공',
    },
    sameAs: [
      'https://newsletter.familyoffices.vip',
      'https://familyoffices.vip/seminar',
      'https://familyoffices.vip/services',
    ],
    potentialAction: {
      '@type': 'ContactAction',
      name: '무료 상담 예약',
      url: 'https://familyoffices.vip/contact',
      target: 'https://cal.com/familyoffice-s',
    },
    additionalType: [
      'https://schema.org/ProfessionalService',
      'https://schema.org/FinancialProduct',
      'https://schema.org/AdvisoryService',
    ],
    serviceType: [
      '자산관리',
      '세무컨설팅',
      '가업승계',
      '절세플랜',
      '가족법인',
      '정책자금',
      '기업인증',
    ],
    audience: {
      '@type': 'PeopleAudience',
      audienceType: '중견기업 CEO와 고액자산가',
      geographicArea: {
        '@type': 'AdministrativeArea',
        name: '대한민국',
      },
      requiredMinAge: 35,
      suggestedMinAge: 40,
    },
    award: [
      '삼성생명 프리미엄 파트너',
      '전문 패밀리오피스 컨설턴트',
      '정책자금 신청 95% 성공률',
    ],
    slogan: '성공한 기업가의 자산을 지키고 키우는 전문가 파트너',
    foundingDate: '2020',
    knowsLanguage: {
      '@type': 'Language',
      name: 'Korean',
      alternateName: 'ko-KR',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        name: '무료 초기 상담',
        price: '0',
        priceCurrency: 'KRW',
      },
      {
        '@type': 'Offer',
        name: '맞춤형 절세플랜',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'KRW',
          price: '협의',
        },
      },
    ],
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '패밀리오피스 서비스 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '성공한 기업가님의 자산 규모와 서비스 범위에 따라 맞춤 설계됩니다. 기본 컨설팅은 무료이며, 종합 패키지는 연간 자산 규모의 0.5-1.5% 수준입니다. 삼성생명 1000억+ 운용실적을 바탕으로 투명한 수수료 체계를 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '중소기업도 패밀리오피스가 필요한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '성장하는 중소중견기업일수록 패밀리오피스가 필수입니다. 기업 가치가 상승하기 전 미리 준비하면 절세 효과가 극대화됩니다. 특히 가업승계 준비는 5-10년 장기 계획이 필요하므로 빠른 시작이 유리합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '가업승계 세금을 줄이는 가장 효과적인 방법은?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1) 기업가치 하락 시점에 지분 이전, 2) 가업상속공제 최대 활용(500억원), 3) 경영권 프리미엄 할인, 4) 신주발행 등을 통한 지분 희석이 핵심입니다. 법인보험 × 가업승계 통합솔루션으로 최적 타이밍을 분석합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '성공한 기업가들은 어떻게 자산관리를 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1) 기업자산과 개인자산 분리 관리, 2) 글로벌 분산투자 포트폴리오, 3) 세금 효율적 구조 설계, 4) 차세대 교육과 승계 준비가 핵심입니다. 우리는 VVIP 고객들의 성공 패턴을 분석하여 맞춤 전략을 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '개인자산 30억 이상 자산가도 패밀리오피스가 필요한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '개인자산 30억 이상 고액자산가에게는 패밀리오피스가 필수입니다. 상속세 최적화, 글로벌 분산투자, 차세대 교육, 자산 보전 전략 등 복합적인 서비스가 필요하기 때문입니다. 특히 상속세율 50%를 고려하면 전문적인 세무설계가 매우 중요합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '자산가를 위한 상속세 절약 방법은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1) 생전증여를 통한 단계적 재산이전, 2) 가족신탁(Family Trust) 설립, 3) 증여세 비과세 한도 최대 활용, 4) 부동산 공시가격 대비 실거래가 차이 활용, 5) 생명보험을 통한 상속세 납부자금 준비가 핵심입니다. 자산 규모별 맞춤 전략을 제공합니다.',
        },
      },
    ],
  };

  const multiPerspectiveData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '성공한 CEO 전용 패밀리오피스',
    description: '법인보험 × 가업승계 통합솔루션 SEO 최적화',
    mainEntity: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      alternateName: '패밀리오피스 에스',
    },
    about: [
      {
        '@type': 'Thing',
        name: '성공한 기업가 자산관리',
        sameAs: 'https://familyoffices.vip/services',
      },
      {
        '@type': 'Thing',
        name: '성공한 CEO 가업승계',
        sameAs: 'https://familyoffices.vip/program',
      },
      {
        '@type': 'Thing',
        name: '고액자산가 전용 자산관리',
        description: '개인자산 30억원 이상 자산가 맞춤 솔루션',
      },
      {
        '@type': 'Thing',
        name: '자산가 상속세 최적화',
        description: '개인자산 상속세 절약 및 세무설계',
      },
    ],
    keywords:
      '성공한 CEO, 기업가, 경영진, 고액자산가, 개인자산 30억, 가업승계, 자산관리, 상속세 최적화, VVIP, 패밀리오피스',
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      url: 'https://familyoffices.vip',
    },
  };

  const aggregateRatingData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'FamilyOffice S 패밀리오피스 서비스',
    description: '성공한 기업가와 고액자산가를 위한 전문 패밀리오피스 서비스',
    provider: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '127',
      reviewCount: '89',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '김철수 (IT 기업 대표)',
        },
        datePublished: '2024-11-15',
        reviewBody:
          '가업승계 준비부터 세무 최적화까지 체계적으로 도와주셨습니다. 덕분에 상속세를 40% 이상 절감할 수 있었고, 후계자 교육 프로그램도 매우 유익했습니다. 20년 경력의 전문성이 느껴지는 서비스였습니다.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '박영희 (제조업 CEO)',
        },
        datePublished: '2024-10-28',
        reviewBody:
          '개인자산 30억 규모의 자산가로서 전문적인 자산관리가 필요했는데, 가족신탁 설립부터 해외자산 관리까지 원스톱으로 해결해주셨습니다. 투명한 수수료 체계와 맞춤형 서비스가 인상적이었습니다.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '이민수 (부동산 투자자)',
        },
        datePublished: '2024-09-12',
        reviewBody:
          '정책자금 신청 95% 성공률이라는 말이 과장이 아니었습니다. 벤처기업 인증부터 R&D 자금까지 모두 성공적으로 받았고, 덕분에 기업 성장에 큰 도움이 되었습니다. 전문가의 네트워크가 정말 대단합니다.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '최지영 (건설업 회장)',
        },
        datePublished: '2024-08-20',
        reviewBody:
          '삼성생명 1000억+ 운용 실적답게 안전하면서도 수익률 좋은 포트폴리오를 구성해주셨습니다. 가족 구성원 모두가 만족하는 통합 자산관리 솔루션이었고, 정기적인 리포팅도 매우 상세합니다.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '정태원 (유통업 대표)',
        },
        datePublished: '2024-07-05',
        reviewBody:
          '법인보험 설계부터 중대재해처벌법 대응까지 기업 리스크 관리를 완벽하게 해주셨습니다. 경영인정기보험 덕분에 회사 안정성도 크게 높아졌고, 직원들 복리후생도 개선할 수 있었습니다.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4.8',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="global-structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeStructuredData(organizationData),
        }}
      />
      <Script
        id="global-structured-data-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeStructuredData(faqData),
        }}
      />
      <Script
        id="global-structured-data-multiview"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeStructuredData(multiPerspectiveData),
        }}
      />
      <Script
        id="global-structured-data-rating"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeStructuredData(aggregateRatingData),
        }}
      />
    </>
  );
}
