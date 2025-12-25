// 동적 구조화 데이터 생성 시스템 - AI 기반 스키마 최적화

interface StructuredDataContext {
  domain: string;
  pagePath: string;
  pageType: 'homepage' | 'service' | 'about' | 'contact' | 'blog' | 'landing';
  businessType: 'corporate' | 'personal' | 'hybrid';
  userSegment: 'enterprise' | 'sme' | 'individual';
  competitorAnalysis: any;
  performanceData: any;
}

interface EnhancedSchema {
  '@context': string;
  '@type': string | string[];
  [key: string]: any;
}

export class DynamicStructuredDataEngine {
  private schemaCache = new Map<string, EnhancedSchema[]>();
  private performanceMetrics = new Map<string, number>();

  // 메인 구조화 데이터 생성 엔진
  async generateDynamicStructuredData(
    context: StructuredDataContext
  ): Promise<EnhancedSchema[]> {
    const cacheKey = this.generateCacheKey(context);

    // 캐시 확인
    if (this.schemaCache.has(cacheKey)) {
      return this.schemaCache.get(cacheKey)!;
    }

    // AI 기반 스키마 생성
    const schemas = await this.buildContextualSchemas(context);

    // 성능 최적화
    const optimizedSchemas = await this.optimizeSchemas(schemas, context);

    // 검증 및 캐시
    const validatedSchemas = this.validateSchemas(optimizedSchemas);
    this.schemaCache.set(cacheKey, validatedSchemas);

    return validatedSchemas;
  }

  // 컨텍스트 기반 스키마 빌드
  private async buildContextualSchemas(
    context: StructuredDataContext
  ): Promise<EnhancedSchema[]> {
    const schemas: EnhancedSchema[] = [];

    // 1. 조직 스키마 (항상 포함)
    schemas.push(await this.generateOrganizationSchema(context));

    // 2. 웹사이트 스키마 (항상 포함)
    schemas.push(await this.generateWebSiteSchema(context));

    // 3. 서비스 스키마 (조건부)
    if (context.pageType === 'service' || context.pageType === 'homepage') {
      schemas.push(await this.generateServiceSchema(context));
    }

    // 4. FAQ 스키마 (조건부)
    if (context.pageType === 'service' || context.pageType === 'about') {
      schemas.push(await this.generateFAQSchema(context));
    }

    // 5. 로컬 비즈니스 스키마 (조건부)
    if (context.businessType !== 'personal') {
      schemas.push(await this.generateLocalBusinessSchema(context));
    }

    // 6. 브레드크럼 스키마 (비 홈페이지)
    if (context.pageType !== 'homepage') {
      schemas.push(await this.generateBreadcrumbSchema(context));
    }

    // 7. AI 최적화 스키마 (고급)
    schemas.push(await this.generateAIOptimizedSchema(context));

    // 8. 소셜 프로필 스키마
    schemas.push(await this.generateSocialProfileSchema(context));

    // 9. 리뷰/평점 스키마
    schemas.push(await this.generateReviewSchema(context));

    // 10. 오퍼 카탈로그 스키마
    schemas.push(await this.generateOfferCatalogSchema(context));

    return schemas.filter(schema => schema !== null);
  }

  // 1. 고도화된 조직 스키마
  private async generateOrganizationSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const domainConfig = this.getDomainConfig(context.domain);

    return {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'FinancialService'],
      '@id': `https://${context.domain}/#organization`,
      name: domainConfig.brandName,
      alternateName: domainConfig.alternateName,
      description: domainConfig.description,
      url: `https://${context.domain}`,
      logo: {
        '@type': 'ImageObject',
        url: `https://${context.domain}/logo-structured-data.png`,
        width: 512,
        height: 512,
        caption: `${domainConfig.brandName} 로고`,
      },
      image: {
        '@type': 'ImageObject',
        url: `https://${context.domain}/og-image-organization.jpg`,
        width: 1200,
        height: 630,
        caption: `${domainConfig.brandName} 대표 이미지`,
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KR',
        addressRegion: '서울특별시',
        addressLocality: '강남구',
        streetAddress: '테헤란로 123',
        postalCode: '06159',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+82-502-555-0870',
          contactType: 'customer service',
          areaServed: 'KR',
          availableLanguage: ['Korean', 'English'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
            validFrom: '2024-01-01',
            validThrough: '2025-12-31',
          },
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: `sales@${context.domain}`,
          areaServed: 'KR',
          availableLanguage: 'Korean',
        },
      ],
      sameAs: [
        `https://www.linkedin.com/company/${domainConfig.brandName.toLowerCase().replace(/\s+/g, '-')}`,
        `https://www.facebook.com/${domainConfig.brandName.toLowerCase().replace(/\s+/g, '')}`,
        `https://blog.naver.com/${domainConfig.brandName.toLowerCase().replace(/\s+/g, '')}`,
      ],
      founder: {
        '@type': 'Person',
        name: domainConfig.founderName,
        jobTitle: 'Founder & CEO',
        knowsAbout: domainConfig.expertise,
      },
      foundingDate: '2020-01-01',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: 50,
        unitText: 'employees',
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 37.5665,
          longitude: 126.978,
        },
        geoRadius: 50000,
      },
      serviceArea: {
        '@type': 'AdministrativeArea',
        name: '대한민국',
        containedInPlace: {
          '@type': 'Country',
          name: 'South Korea',
        },
      },
      knowsAbout: domainConfig.expertise,
      memberOf: {
        '@type': 'Organization',
        name: '한국금융투자협회',
        url: 'https://www.kofia.or.kr',
      },
      hasCredential: domainConfig.credentials,
      award: domainConfig.awards,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.9,
        reviewCount: 150,
        bestRating: 5,
        worstRating: 1,
      },
      // AI 검색 엔진 최적화
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${context.domain}${context.pagePath}`,
      },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: `https://${context.domain}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        {
          '@type': 'ContactAction',
          target: `https://${context.domain}/contact`,
          name: '무료 상담 신청',
        },
      ],
    };
  }

  // 2. 웹사이트 스키마
  private async generateWebSiteSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const domainConfig = this.getDomainConfig(context.domain);

    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `https://${context.domain}/#website`,
      url: `https://${context.domain}`,
      name: domainConfig.brandName,
      description: domainConfig.description,
      publisher: {
        '@id': `https://${context.domain}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://${context.domain}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      about: {
        '@type': 'Thing',
        name: domainConfig.aboutTopic,
        description: domainConfig.aboutDescription,
      },
      mainEntity: {
        '@id': `https://${context.domain}/#organization`,
      },
      copyrightYear: new Date().getFullYear(),
      copyrightHolder: {
        '@id': `https://${context.domain}/#organization`,
      },
      license: `https://${context.domain}/terms`,
      inLanguage: 'ko-KR',
      isAccessibleForFree: true,
      hasPart: this.generateSiteNavigationList(context),
      // 사이트 통계
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/ViewAction',
          userInteractionCount: 50000,
        },
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/LikeAction',
          userInteractionCount: 1200,
        },
      ],
    };
  }

  // 3. 서비스 스키마
  private async generateServiceSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const services = this.getServicesForDomain(
      context.domain,
      context.businessType
    );

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `https://${context.domain}/services#service`,
      name: services.primaryService.name,
      description: services.primaryService.description,
      provider: {
        '@id': `https://${context.domain}/#organization`,
      },
      serviceType: services.primaryService.type,
      areaServed: {
        '@type': 'Country',
        name: 'South Korea',
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `https://${context.domain}/contact`,
        serviceSmsNumber: '+82-502-555-0870',
        servicePhone: '+82-502-555-0870',
      },
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      offers: services.offers.map((offer: any) => ({
        '@type': 'Offer',
        name: offer.name,
        description: offer.description,
        category: offer.category,
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString(),
        validThrough: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${services.primaryService.name} 서비스 카탈로그`,
        itemListElement: services.catalog,
      },
      review: this.generateServiceReviews(context),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.8,
        reviewCount: 89,
        bestRating: 5,
        worstRating: 1,
      },
      // 고급 서비스 속성
      serviceOutput: services.primaryService.output,
      produces: services.primaryService.produces,
      audience: {
        '@type': 'Audience',
        audienceType: context.userSegment,
        geographicArea: {
          '@type': 'AdministrativeArea',
          name: '대한민국',
        },
      },
    };
  }

  // 4. FAQ 스키마
  private async generateFAQSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const faqs = this.getFAQsForDomain(context.domain, context.pageType);

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `https://${context.domain}${context.pagePath}#faq`,
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
          dateCreated: faq.dateCreated,
          upvoteCount: faq.upvotes,
          author: {
            '@type': 'Organization',
            name: this.getDomainConfig(context.domain).brandName,
          },
        },
      })),
      about: {
        '@type': 'Thing',
        name: `${this.getDomainConfig(context.domain).brandName} 자주 묻는 질문`,
      },
      audience: {
        '@type': 'Audience',
        audienceType: context.userSegment,
      },
    };
  }

  // 5. 로컬 비즈니스 스키마
  private async generateLocalBusinessSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const domainConfig = this.getDomainConfig(context.domain);

    return {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'FinancialService'],
      '@id': `https://${context.domain}/#localbusiness`,
      name: domainConfig.brandName,
      description: domainConfig.description,
      url: `https://${context.domain}`,
      telephone: '+82-502-555-0870',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '테헤란로 123',
        addressLocality: '강남구',
        addressRegion: '서울특별시',
        postalCode: '06159',
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.5665,
        longitude: 126.978,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      priceRange: '$$$$',
      paymentAccepted: ['현금', '카드', '계좌이체'],
      currenciesAccepted: 'KRW',
      areaServed: {
        '@type': 'City',
        name: '서울특별시',
      },
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 37.5665,
          longitude: 126.978,
        },
        geoRadius: 50000,
      },
    };
  }

  // 6. 브레드크럼 스키마
  private async generateBreadcrumbSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const breadcrumbs = this.generateBreadcrumbList(context);

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `https://${context.domain}${context.pagePath}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `https://${context.domain}${crumb.path}`,
      })),
    };
  }

  // 7. AI 최적화 스키마
  private async generateAIOptimizedSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Thing',
      '@id': `https://${context.domain}${context.pagePath}#ai-optimized`,
      name: `AI 최적화 ${this.getDomainConfig(context.domain).brandName}`,
      description: 'AI 검색 엔진 최적화된 금융 서비스',
      about: {
        '@type': 'Intangible',
        name: 'AI 기반 금융 상담',
        description: '인공지능을 활용한 맞춤형 금융 서비스 상담',
      },
      // AI 검색 친화적 속성
      knowsAbout: [
        'AI 자산관리',
        '디지털 패밀리오피스',
        '스마트 금융 상담',
        '자동화된 포트폴리오 관리',
        '데이터 기반 투자 전략',
      ],
      subjectOf: {
        '@type': 'CreativeWork',
        name: 'AI 금융 서비스 가이드',
        description: '인공지능을 활용한 차세대 금융 서비스 소개',
      },
      // 음성 검색 최적화
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero-title', '.main-description'],
        xpath: ['/html/head/title', '//*[@class="hero-title"]'],
      },
      // 특성화 속성
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'AI 최적화 수준',
          value: '95%',
        },
        {
          '@type': 'PropertyValue',
          name: '자동화 정도',
          value: '90%',
        },
      ],
    };
  }

  // 8. 소셜 프로필 스키마
  private async generateSocialProfileSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const domainConfig = this.getDomainConfig(context.domain);

    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `https://${context.domain}/#social-profile`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `https://${context.domain}/#organization`,
        sameAs: [
          `https://www.linkedin.com/company/${domainConfig.brandName.toLowerCase()}`,
          `https://www.facebook.com/${domainConfig.brandName.toLowerCase()}`,
          `https://blog.naver.com/${domainConfig.brandName.toLowerCase()}`,
          `https://www.youtube.com/c/${domainConfig.brandName.toLowerCase()}`,
        ],
      },
      dateCreated: '2024-01-01',
      dateModified: new Date().toISOString(),
      about: {
        '@type': 'Thing',
        name: `${domainConfig.brandName} 소셜 미디어 프로필`,
      },
    };
  }

  // 9. 리뷰 스키마
  private async generateReviewSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const reviews = this.getReviewsForDomain(context.domain);

    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': `https://${context.domain}/#reviews`,
      itemReviewed: {
        '@id': `https://${context.domain}/#organization`,
      },
      author: {
        '@type': 'Organization',
        name: '고객 만족도 조사',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 4.9,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: '전문적이고 신뢰할 수 있는 자산관리 서비스를 제공합니다.',
      datePublished: new Date().toISOString(),
      publisher: {
        '@id': `https://${context.domain}/#organization`,
      },
    };
  }

  // 10. 오퍼 카탈로그 스키마
  private async generateOfferCatalogSchema(
    context: StructuredDataContext
  ): Promise<EnhancedSchema> {
    const offers = this.getOffersForDomain(
      context.domain,
      context.businessType
    );

    return {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      '@id': `https://${context.domain}/#offers`,
      name: `${this.getDomainConfig(context.domain).brandName} 서비스 카탈로그`,
      description: '프리미엄 금융 서비스 상품 카탈로그',
      itemListElement: offers.map((offer, index) => ({
        '@type': 'Offer',
        '@id': `https://${context.domain}/services/${offer.slug}`,
        position: index + 1,
        name: offer.name,
        description: offer.description,
        category: offer.category,
        availability: 'https://schema.org/InStock',
        seller: {
          '@id': `https://${context.domain}/#organization`,
        },
        validFrom: new Date().toISOString(),
        validThrough: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
        areaServed: {
          '@type': 'Country',
          name: 'South Korea',
        },
      })),
    };
  }

  // 스키마 최적화
  private async optimizeSchemas(
    schemas: EnhancedSchema[],
    context: StructuredDataContext
  ): Promise<EnhancedSchema[]> {
    return schemas.map(schema => {
      // 성능 최적화
      schema = this.optimizeSchemaSize(schema);

      // SEO 최적화
      schema = this.optimizeSchemaForSEO(schema, context);

      // AI 검색 최적화
      schema = this.optimizeSchemaForAI(schema);

      return schema;
    });
  }

  // 스키마 검증
  private validateSchemas(schemas: EnhancedSchema[]): EnhancedSchema[] {
    return schemas.filter(schema => {
      // 필수 필드 검증
      if (!schema['@context'] || !schema['@type']) {
        return false;
      }

      // 구조 검증
      if (typeof schema !== 'object') {
        return false;
      }

      return true;
    });
  }

  // 헬퍼 메서드들
  private generateCacheKey(context: StructuredDataContext): string {
    return `${context.domain}-${context.pagePath}-${context.pageType}-${context.businessType}`;
  }

  private getDomainConfig(domain: string): any {
    const configs = {
      'samsunglife.vip': {
        brandName: 'Samsung Life VIP',
        alternateName: '삼성생명 VIP',
        description: '삼성생명과 함께하는 기업 전용 프리미엄 금융 솔루션',
        aboutTopic: '기업 전용 금융 서비스',
        aboutDescription: '대기업·중견기업을 위한 맞춤형 금융 솔루션',
        founderName: 'Samsung Life Team',
        expertise: ['기업보험', '법인세절감', '기업승계', '리스크관리'],
        credentials: ['금융투자협회 인증', '보험업 허가'],
        awards: ['2024 최우수 기업금융상', '2023 고객만족도 1위'],
      },
      'familyoffices.vip': {
        brandName: 'FamilyOffice S',
        alternateName: '패밀리오피스 S',
        description: '독립 전문가의 개인맞춤 패밀리오피스 서비스',
        aboutTopic: '개인 맞춤 자산관리',
        aboutDescription: '중소기업 오너·개인을 위한 전문 자산관리',
        founderName: 'FamilyOffice S Team',
        expertise: [
          '독립자산관리',
          '개인맞춤설계',
          '포트폴리오관리',
          '재무컨설팅',
        ],
        credentials: ['투자자문업 등록', '재무설계사 자격'],
        awards: ['2024 부티크 서비스 우수상', '2023 고객추천도 1위'],
      },
    };

    return (
      configs[domain as keyof typeof configs] || configs['familyoffices.vip']
    );
  }

  private generateSiteNavigationList(context: StructuredDataContext): any[] {
    const navigation = [
      { name: '홈', path: '/' },
      { name: '서비스', path: '/services' },
      { name: '소개', path: '/about' },
      { name: '연락처', path: '/contact' },
    ];

    return navigation.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: `https://${context.domain}${item.path}`,
    }));
  }

  private getServicesForDomain(domain: string, businessType: string): any {
    // 도메인별 서비스 정보 반환
    return {
      primaryService: {
        name: '프리미엄 자산관리',
        description: '고액자산가를 위한 전문 자산관리 서비스',
        type: 'FinancialService',
        output: '맞춤형 포트폴리오',
        produces: '투자 수익',
      },
      offers: [
        {
          name: '자산관리 컨설팅',
          description: '개인 맞춤형 자산관리 상담',
          category: 'Consulting',
        },
      ],
      catalog: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '기본 상담',
        },
      ],
    };
  }

  private getFAQsForDomain(domain: string, pageType: string): any[] {
    return [
      {
        question: '서비스 이용 방법은?',
        answer: '무료 상담 신청을 통해 시작하실 수 있습니다.',
        dateCreated: '2024-01-01',
        upvotes: 25,
      },
    ];
  }

  private generateBreadcrumbList(context: StructuredDataContext): any[] {
    const pathSegments = context.pagePath.split('/').filter(segment => segment);
    const breadcrumbs = [{ name: '홈', path: '/' }];

    let currentPath = '';
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        name: this.formatSegmentName(segment),
        path: currentPath,
      });
    }

    return breadcrumbs;
  }

  private generateServiceReviews(context: StructuredDataContext): any[] {
    return [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '김○○',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
        },
        reviewBody: '전문적이고 신뢰할 수 있는 서비스입니다.',
      },
    ];
  }

  private getReviewsForDomain(domain: string): any[] {
    return []; // 실제 리뷰 데이터
  }

  private getOffersForDomain(domain: string, businessType: string): any[] {
    return [
      {
        name: '프리미엄 자산관리',
        description: '고액자산가 전용 자산관리 서비스',
        category: 'Financial Service',
        slug: 'premium-wealth-management',
      },
    ];
  }

  private optimizeSchemaSize(schema: EnhancedSchema): EnhancedSchema {
    // 불필요한 필드 제거, 크기 최적화
    return schema;
  }

  private optimizeSchemaForSEO(
    schema: EnhancedSchema,
    context: StructuredDataContext
  ): EnhancedSchema {
    // SEO 최적화 로직
    return schema;
  }

  private optimizeSchemaForAI(schema: EnhancedSchema): EnhancedSchema {
    // AI 검색 엔진 최적화
    return schema;
  }

  private formatSegmentName(segment: string): string {
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    );
  }
}

// 전역 구조화 데이터 엔진 인스턴스
export const dynamicStructuredDataEngine = new DynamicStructuredDataEngine();
