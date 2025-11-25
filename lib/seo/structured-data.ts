// 🤖 AI 검색엔진 최적화 - SuperClaude Framework
// Perplexity, ChatGPT, Claude 등 AI 검색엔진에 최적화된 구조화 데이터

// AI 검색엔진용 리치 스니펫 생성 함수
export function generateAIOptimizedContent() {
  return {
    // 즉문즉답형 질문-답변 세트
    instantAnswers: [
      {
        question: "패밀리오피스가 뭔가요?",
        answer: "성공한 기업가와 CEO를 위한 종합 자산관리 서비스입니다. 가업승계부터 세무최적화까지 원스톱으로 제공합니다.",
        context: "SuperClaude BMAD Method 적용"
      },
      {
        question: "가업승계 비용은 얼마인가요?",
        answer: "기업 규모와 자산 규모에 따라 차이가 있으며, 무료 상담을 통해 맞춤 견적을 제공합니다. 일반적으로 절세 효과로 비용 이상의 가치를 창출합니다.",
        context: "성공한 기업가 맞춤 컨설팅"
      },
      {
        question: "중소기업도 패밀리오피스가 필요한가요?",
        answer: "연매출 100억 이상 또는 자산 50억 이상의 중소중견기업이라면 패밀리오피스를 통해 상당한 절세와 리스크 관리 효과를 얻을 수 있습니다.",
        context: "BMAD Method 기업 규모별 분석"
      }
    ],
    
    // AI 검색엔진용 키워드 클러스터
    aiSearchClusters: {
      behavioral: ["실제 경험", "성공 사례", "검증된 방법", "실무 적용"],
      motivational: ["성취감", "성공", "발전", "성장", "목표 달성"],
      aspirational: ["최고급", "프리미엄", "VVIP", "엘리트", "차별화"],
      decisional: ["즉시 상담", "무료 분석", "맞춤 제안", "구체적 방법"]
    }
  };
}

// 동적 Breadcrumb 생성 함수
export function generateBreadcrumbStructuredData(path: string = '/') {
  const baseUrl = 'https://familyoffices.vip';
  const pathSegments = path.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '홈',
      item: baseUrl,
    }
  ];
  
  // 경로별 한국어 이름 매핑
  const pathNameMap: Record<string, string> = {
    'about': '회사 소개',
    'solutions': '솔루션',
    'program': '교육 프로그램',
    'seminar': '세미나',
    'recruit': '채용',
    'contact': '연락처',
    'blog': '블로그',
    'insights': '인사이트',
    'market-intelligence': '시장 정보',
    'weekly-brief': '주간 브리핑',
    'resources': '리소스',
    'dashboard': '대시보드',
    'privacy': '개인정보처리방침',
    'terms': '이용약관'
  };
  
  let currentPath = baseUrl;
  pathSegments.forEach((segment, index) => {
    currentPath += '/' + segment;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: index + 2,
      name: pathNameMap[segment] || segment,
      item: currentPath,
    });
  });
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };
}

// 구조화된 데이터 생성
export function generateStructuredData(
  type: 'Organization' | 'WebSite' | 'Service' | 'FAQPage' | 'LocalBusiness' | 'BreadcrumbList' | 'AIOptimized' | 'ContactPage'
) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: 'FamilyOffice S',
    url: 'https://familyoffices.vip',
    logo: 'https://familyoffices.vip/logo.png',
    description: '중소중견기업 법인 대표 전용 자산관리 서비스',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: 'Seoul',
      addressRegion: '서울특별시',
      streetAddress: '서울특별시 중구',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+82-502-5550-8700',
      email: 'cs@familyoffices.vip',
      availableLanguage: ['Korean', 'English'],
    },
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        '@id': 'https://familyoffices.vip/#organization',
        foundingDate: '2020',
        numberOfEmployees: '10-50',
        serviceArea: 'South Korea',
        legalName: 'FamilyOffice S',
        alternateName: ['패밀리오피스 에스', '삼성생명 패밀리오피스'],
        brand: {
          '@type': 'Brand',
          name: 'FamilyOffice S',
          logo: 'https://familyoffices.vip/SVG/FamilyOfficeS_blue.svg'
        },
        slogan: '성공한 CEO 전용 백년영속 패밀리오피스',
        knowsAbout: [
          '중소중견기업 자산관리',
          '가업승계 설계',
          '세무최적화 전략',
          '기업위험관리',
          '패밀리오피스 구축'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '자산관리 서비스',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '비상장기업 자산관리',
                description: '중소중견기업 CEO를 위한 통합 자산관리 서비스',
                provider: {
                  '@type': 'Organization',
                  name: 'FamilyOffice S'
                }
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'KRW',
                price: '상담 후 결정'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '가업승계 컨설팅',
                description: '체계적인 가업승계 및 세무최적화 설계',
                provider: {
                  '@type': 'Organization',
                  name: 'FamilyOffice S'
                }
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'KRW',
                price: '상담 후 결정'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '경영위험관리',
                description: '중대재해처벌법 대응 및 기업위험관리 솔루션',
                provider: {
                  '@type': 'Organization',
                  name: 'FamilyOffice S'
                }
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'KRW',
                price: '상담 후 결정'
              }
            },
          ],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.9,
          reviewCount: 150,
          bestRating: 5,
          worstRating: 1
        },
        review: [
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: '제조업 CEO K씨'
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: 5,
              bestRating: 5
            },
            reviewBody: '가업승계 준비부터 세무최적화까지 원스톱으로 해결해주셔서 매우 만족합니다.'
          }
        ],
        sameAs: [
          'https://newsletter.familyoffices.vip',
          'https://www.samsunglife.com',
          'https://familyoffices.vip/about'
        ]
      };

    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://familyoffices.vip/#website',
        name: 'FamilyOffice S - 성공한 CEO 전용 패밀리오피스',
        alternateName: '패밀리오피스 에스',
        url: 'https://familyoffices.vip',
        description: '중소중견기업 CEO 전용 자산관리 및 가업승계 전문 플랫폼',
        inLanguage: 'ko-KR',
        copyrightYear: 2025,
        copyrightHolder: {
          '@type': 'Organization',
          name: 'FamilyOffice S'
        },
        publisher: {
          '@type': 'Organization',
          name: 'FamilyOffice S',
          logo: {
            '@type': 'ImageObject',
            url: 'https://familyoffices.vip/SVG/FamilyOfficeS_blue.svg'
          }
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: 'https://familyoffices.vip/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          {
            '@type': 'ContactAction',
            name: '무료 상담 신청',
            target: 'https://familyoffices.vip/contact'
          }
        ],
        mainEntity: {
          '@type': 'Organization',
          name: 'FamilyOffice S'
        },
        audience: {
          '@type': 'Audience',
          audienceType: '중소중견기업 CEO',
          geographicArea: {
            '@type': 'Country',
            name: '대한민국'
          }
        },
        isAccessibleForFree: false,
        hasPart: [
          {
            '@type': 'WebPage',
            '@id': 'https://familyoffices.vip/about',
            name: '회사 소개',
            description: 'FamilyOffice S 소개 및 전문가 정보'
          },
          {
            '@type': 'WebPage',
            '@id': 'https://familyoffices.vip/solutions',
            name: '솔루션',
            description: '업종별 맞춤형 자산관리 솔루션'
          },
          {
            '@type': 'WebPage',
            '@id': 'https://familyoffices.vip/program',
            name: '교육 프로그램',
            description: 'CEO 전용 교육 프로그램 및 세미나'
          }
        ]
      };

    case 'Service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://familyoffices.vip/solutions#service',
        name: '성공한 기업가 전용 패밀리오피스 서비스',
        description: '중소중견기업 CEO를 위한 전문적인 자산관리, 가업승계, 세무최적화 서비스. 전문가 그룹의 ONE-TEAM 서비스로 20년 이상의 경험을 바탕으로 최적의 솔루션을 제공합니다.',
        provider: {
          '@type': 'Organization',
          name: 'FamilyOffice S',
          '@id': 'https://familyoffices.vip/#organization'
        },
        serviceType: '패밀리오피스 자산관리',
        category: '금융 서비스',
        areaServed: {
          '@type': 'Country',
          name: '대한민국'
        },
        audience: {
          '@type': 'Audience',
          audienceType: '성공한 법인 대표',
          geographicArea: {
            '@type': 'Country',
            name: '대한민국'
          }
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '패밀리오피스 서비스 카탈로그',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'CEO플랜',
                description: '기업 대표를 위한 종합 자산관리 플랜'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '가업승계 설계',
                description: '체계적인 가업승계 및 세무전략 수립'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '중대재해처벌법 대응',
                description: '기업 안전관리 및 경영철 리스크 관리'
              }
            }
          ]
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.9,
          reviewCount: 150,
          bestRating: 5
        },
        priceRange: '₩₩₩₩',
        availableLanguage: ['Korean', 'English']
      };

    case 'FAQPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '패밀리오피스 서비스란 무엇인가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '패밀리오피스는 중소중견기업 CEO와 고액자산가를 위한 종합 자산관리 서비스입니다. 가업승계, 자산이전, 절세 전략을 포함한 맞춤형 솔루션을 제공합니다.',
            },
          },
          {
            '@type': 'Question',
            name: 'CEO플랜이란 무엇인가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CEO플랜은 기업 대표를 위한 종합 재무설계 프로그램입니다. 경영인정기보험, 보장자산 구축, 상속 및 증여 계획을 포함합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '가업승계는 어떻게 준비하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '가업승계는 기업가치 평가, 지분 이전 계획, 상속세 및 증여세 최적화, 경영권 안정화 방안을 종합적으로 검토하여 준비합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '중대재해처벌법 대응은 어떻게 하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '중대재해처벌법에 따른 경영책임자 처벌 대비를 위한 보험설계와 안전관리체계 구축을 지원합니다.',
            },
          },
          // 🤖 AI 검색엔진 최적화 FAQ 추가
          {
            '@type': 'Question',
            name: '패밀리오피스 비용은 얼마인가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '기업 규모와 자산 규모에 따라 맞춤 견적을 제공합니다. 무료 상담을 통해 정확한 비용을 안내받으실 수 있으며, 일반적으로 절세 효과로 비용 이상의 가치를 창출합니다. ☎0502-5550-8700',
            },
          },
          {
            '@type': 'Question',
            name: '중소기업도 패밀리오피스가 필요한가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '연매출 100억 이상 또는 자산 50억 이상의 중소중견기업이라면 패밀리오피스를 통해 상당한 절세와 리스크 관리 효과를 얻을 수 있습니다. BMAD Method 기반 기업별 맞춤 분석을 제공합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '가업승계 세금을 줄이는 방법은?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '증여세 면제한도 활용, 경영권 프리미엄 할인, 납부유예 제도 등을 종합적으로 활용하여 세부담을 최소화합니다. 삼성생명 1000억+ 운용실적 기반의 검증된 절세 전략을 제공합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '성공한 기업가들은 어떻게 자산관리를 하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '성공한 기업가들은 ①리스크 분산 ②세무 최적화 ③가업승계 준비를 동시에 진행합니다. 우리는 300+ 성공사례 기반의 검증된 방법론으로 기업가만의 맞춤 전략을 설계합니다.',
            },
          },
        ],
      };

    // 🤖 AI 검색엔진 최적화 전용 스키마
    case 'AIOptimized':
      return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'FamilyOffice S - 성공한 기업가 전용 자산관리',
        description: 'SuperClaude BMAD Method 적용 성공한 법인대표 전용 패밀리오피스. AI 최적화 상담, 가업승계 완전해결, 삼성생명 1000억+ 검증된 운용실적',
        url: 'https://familyoffices.vip',
        telephone: '+82-502-5550-8700',
        email: 'cs@familyoffices.vip',
        areaServed: '대한민국',
        serviceType: 'Family Office Services',
        category: 'Financial Planning & Wealth Management',
        priceRange: '₩₩₩₩',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI 최적화 BMAD Method 서비스',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'SuperClaude 기반 자산분석',
              description: 'AI와 전문가가 협업하는 차세대 자산분석 시스템',
              category: 'Behavioral Analysis'
            },
            {
              '@type': 'Offer', 
              name: '성공동기 기반 승계설계',
              description: '기업가 개인의 성취동기를 분석한 맞춤 가업승계 로드맵',
              category: 'Motivational Planning'
            },
            {
              '@type': 'Offer',
              name: '미래비전 실현 자산전략', 
              description: '10년-30년 장기 비전 실현을 위한 체계적 자산계획',
              category: 'Aspirational Strategy'
            },
            {
              '@type': 'Offer',
              name: '즉시실행 세무최적화',
              description: '지금 당장 실행 가능한 구체적 절세 방안 제시',
              category: 'Decisional Implementation'
            }
          ]
        },
        knowsAbout: [
          'SuperClaude AI 자산분석',
          'BMAD Method 적용 패밀리오피스',
          '성공한 기업가 전용 서비스',
          '차세대 디지털 자산관리',
          'AI 기반 가업승계 설계'
        ],
        targetAudience: {
          '@type': 'PeopleAudience',
          audienceType: '성공한 법인 대표',
          suggestedMinAge: 40,
          suggestedMaxAge: 70,
          geographicArea: {
            '@type': 'Country',
            name: '대한민국'
          }
        }
      };

    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://familyoffices.vip',
        name: 'FamilyOffice S - 삼성생명 기업컨설팅센터',
        image: 'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
        logo: 'https://familyoffices.vip/logo.png',
        url: 'https://familyoffices.vip',
        telephone: '+82-502-5550-8700',
        email: 'cs@familyoffices.vip',
        priceRange: '₩₩₩₩',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '서울특별시 중구',
          addressLocality: '서울',
          addressRegion: '서울특별시',
          postalCode: '04527',
          addressCountry: 'KR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.5665,
          longitude: 126.9780,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        sameAs: [
          'https://www.samsunglife.com',
          'https://newsletter.familyoffices.vip',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '패밀리오피스 서비스',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'CEO플랜',
                description: '중소중견기업 CEO를 위한 종합 자산관리 플랜',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '가업승계 컨설팅',
                description: '체계적인 가업승계 및 자산이전 설계',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '절세 전략',
                description: '상속세, 증여세 최적화 및 세무 플래닝',
              },
            },
          ],
        },
      };

    case 'BreadcrumbList':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '홈',
            item: 'https://familyoffices.vip',
          },
        ],
      };

    case 'ContactPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '상담 문의 - FamilyOffice S',
        description: '중소중견기업 법인 대표님을 위한 전문 자산관리 상담 신청',
        url: 'https://familyoffices.vip/contact',
        mainEntity: {
          '@type': 'Organization',
          name: 'FamilyOffice S',
          telephone: '+82-502-5550-8700',
          email: 'cs@familyoffices.vip',
        }
      };

    default:
      return baseData;
  }
}

// 사이트맵 URL 생성
export function generateSitemapUrls() {
  const baseUrl = 'https://familyoffices.vip';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/program`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seminar`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
