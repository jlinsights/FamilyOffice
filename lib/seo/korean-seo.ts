// Korean SEO optimization utilities
import { Metadata } from 'next'

interface KoreanSEOConfig {
  title: string
  description: string
  keywords?: string[]
  businessType?: string
  targetAudience?: string
  location?: {
    region: string
    city: string
    district?: string
  }
}

export class KoreanSEO {
  // 한국 검색엔진 최적화를 위한 메타데이터 생성
  static generateMetadata(config: KoreanSEOConfig): Metadata {
    const {
      title,
      description,
      keywords = [],
      businessType,
      targetAudience,
      location
    } = config

    // 한국어 키워드 강화
    const enhancedKeywords = [
      ...keywords,
      ...(businessType ? this.getBusinessTypeKeywords(businessType) : []),
      ...(targetAudience ? this.getTargetAudienceKeywords(targetAudience) : []),
      ...(location ? this.getLocationKeywords(location) : [])
    ]

    return {
      title: {
        default: title,
        template: `%s | FamilyOffice S`
      },
      description,
      keywords: enhancedKeywords.join(', '),
      
      // 한국 검색엔진 특화 메타데이터
      other: {
        // 네이버 검색엔진 최적화
        'NaverBot': 'All',
        'NaverBot:index': 'index',
        'NaverBot:follow': 'follow',
        'naver-site-verification': process.env.NAVER_SITE_VERIFICATION || '',
        
        // 다음 검색엔진 최적화
        'Daumoa': 'index,follow',
        'Daumoa:robots': 'index,follow',
        
        // 구글 한국 검색 최적화
        'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
        'googlebot': 'index,follow',
        
        // 언어 및 지역 설정
        'language': 'ko',
        'geo.region': 'KR-11', // 서울
        'geo.country': 'KR',
        'geo.placename': location?.city || '서울',
        
        // 비즈니스 정보
        ...(businessType && {
          'business:category': businessType,
          'business:type': 'financial_services'
        }),
        
        // 타겟 고객층
        ...(targetAudience && {
          'business:target_audience': targetAudience
        }),
        
        // 소셜 미디어 최적화
        'og:locale': 'ko_KR',
        'og:site_name': 'FamilyOffice S',
        'twitter:site': '@familyoffices',
        'twitter:creator': '@familyoffices',
        
        // 모바일 최적화
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        
        // 검색 결과 향상
        'author': 'FamilyOffice S',
        'publisher': 'FamilyOffice S',
        'copyright': 'FamilyOffice S',
        'distribution': 'global',
        'rating': 'general'
      },
      
      // JSON-LD 구조화 데이터
      ...(businessType && {
        category: businessType
      })
    }
  }

  // 업종별 키워드 생성
  private static getBusinessTypeKeywords(businessType: string): string[] {
    const keywordMap: Record<string, string[]> = {
      'asset_management': [
        '자산관리', '재무설계', '투자자문', '포트폴리오 관리', '자산운용',
        '부의 관리', '재산 관리', '투자 컨설팅', '자산 배분', '리스크 관리'
      ],
      'manufacturing': [
        '제조업', '중소제조업', '제조기업', '생산업체', '공장운영',
        '제조업체', '산업체', '생산기업', '제조회사', '공업'
      ],
      'construction': [
        '건설업', '건축업', '토목업', '시공업체', '건설회사',
        '건축회사', '인테리어업', '리모델링업', '부동산개발', '건설업계'
      ],
      'it_technology': [
        'IT기업', '기술기업', '소프트웨어', '정보기술', '디지털',
        '테크기업', '스타트업', '벤처기업', '기술개발', '혁신기업'
      ],
      'family_business': [
        '가족기업', '가업승계', '세대경영', '가문경영', '동족기업',
        '가족경영', '세습기업', '가족사업', '세대교체', '경영승계'
      ]
    }

    return keywordMap[businessType] || []
  }

  // 타겟 고객층별 키워드 생성
  private static getTargetAudienceKeywords(targetAudience: string): string[] {
    const keywordMap: Record<string, string[]> = {
      'ceo': [
        'CEO', '대표이사', '경영진', '기업인', '사업가',
        '경영자', '대표', '회장', '사장', '최고경영자'
      ],
      'business_owner': [
        '사업주', '기업주', '오너', '자영업자', '사업자',
        '업주', '기업소유주', '사업운영자', '창업자', '기업가'
      ],
      'executives': [
        '임원', '경영진', '이사', '부사장', '전무',
        '상무', '최고임원', '경영간부', '회사임원', '기업임원'
      ],
      'high_net_worth': [
        '고액자산가', '부유층', '고소득층', '자산가', '부호',
        '부자', '고액투자자', '프리미엄고객', 'VIP고객', '상위계층'
      ]
    }

    return keywordMap[targetAudience] || []
  }

  // 지역별 키워드 생성
  private static getLocationKeywords(location: {
    region: string
    city: string
    district?: string
  }): string[] {
    const baseKeywords = [location.region, location.city]
    
    if (location.district) {
      baseKeywords.push(location.district)
    }

    // 서울 특화 키워드
    if (location.city === '서울') {
      baseKeywords.push(
        '서울시', '수도권', '강남', '강북', '서초', '용산',
        '중구', '종로', '마포', '영등포', '송파', '강동'
      )
    }

    return baseKeywords
  }

  // JSON-LD 구조화 데이터 생성
  static generateStructuredData(config: {
    type: 'Organization' | 'LocalBusiness' | 'FinancialService'
    name: string
    description: string
    url: string
    location?: {
      address: string
      city: string
      region: string
      postalCode: string
    }
    contact?: {
      phone: string
      email: string
    }
    services?: string[]
    foundingDate?: string
  }) {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': config.type,
      name: config.name,
      description: config.description,
      url: config.url,
      inLanguage: 'ko-KR',
      areaServed: {
        '@type': 'Country',
        name: '대한민국',
        alternateName: 'South Korea'
      }
    }

    // 위치 정보 추가
    if (config.location) {
      Object.assign(baseData, {
        address: {
          '@type': 'PostalAddress',
          streetAddress: config.location.address,
          addressLocality: config.location.city,
          addressRegion: config.location.region,
          postalCode: config.location.postalCode,
          addressCountry: 'KR'
        }
      })
    }

    // 연락처 정보 추가
    if (config.contact) {
      Object.assign(baseData, {
        telephone: config.contact.phone,
        email: config.contact.email
      })
    }

    // 서비스 정보 추가
    if (config.services) {
      Object.assign(baseData, {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '서비스',
          itemListElement: config.services.map(service => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service
            }
          }))
        }
      })
    }

    // 설립일 추가
    if (config.foundingDate) {
      Object.assign(baseData, {
        foundingDate: config.foundingDate
      })
    }

    return baseData
  }

  // 한국형 사이트맵 생성
  static generateSitemap(pages: Array<{
    url: string
    lastModified?: Date
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority?: number
    alternates?: {
      hreflang: string
      href: string
    }[]
  }>) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    ${page.lastModified ? `<lastmod>${page.lastModified.toISOString()}</lastmod>` : ''}
    ${page.changeFrequency ? `<changefreq>${page.changeFrequency}</changefreq>` : ''}
    ${page.priority ? `<priority>${page.priority}</priority>` : ''}
    ${page.alternates ? page.alternates.map(alt => 
      `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
    ).join('\n    ') : ''}
  </url>`).join('\n')}
</urlset>`

    return sitemap
  }

  // 한국 검색엔진용 robots.txt 생성
  static generateRobotsTxt(config: {
    sitemapUrl: string
    disallowPaths?: string[]
    crawlDelay?: number
  }) {
    const { sitemapUrl, disallowPaths = [], crawlDelay } = config

    const robotsTxt = `# 한국 검색엔진 최적화 Robots.txt
User-agent: *
Allow: /

# 네이버 봇
User-agent: NaverBot
Allow: /

# 다음 봇  
User-agent: Daumoa
Allow: /

# 구글 봇
User-agent: Googlebot
Allow: /

# 차단할 경로
${disallowPaths.map(path => `Disallow: ${path}`).join('\n')}

${crawlDelay ? `Crawl-delay: ${crawlDelay}` : ''}

# 사이트맵
Sitemap: ${sitemapUrl}
`

    return robotsTxt.trim()
  }

  // 한글 URL 최적화
  static optimizeKoreanUrl(title: string): string {
    // 한글을 로마자로 변환하는 간단한 매핑
    const romanization: Record<string, string> = {
      '자산관리': 'asset-management',
      '재무설계': 'financial-planning',
      '투자자문': 'investment-advisory',
      '상속설계': 'inheritance-planning',
      '세무최적화': 'tax-optimization',
      '리스크관리': 'risk-management',
      '포트폴리오': 'portfolio',
      '컨설팅': 'consulting',
      '서비스': 'services',
      '프로그램': 'program',
      '교육': 'education',
      '세미나': 'seminar',
      '상담': 'consultation',
      '문의': 'contact',
      '소개': 'about',
      '회사': 'company',
      '팀': 'team'
    }

    // 한글 키워드를 영문으로 변환
    let optimizedUrl = title.toLowerCase()
    
    Object.entries(romanization).forEach(([korean, english]) => {
      optimizedUrl = optimizedUrl.replace(new RegExp(korean, 'g'), english)
    })

    // 특수문자 제거 및 하이픈으로 연결
    optimizedUrl = optimizedUrl
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    return optimizedUrl
  }

  // 메타 키워드 밀도 체크
  static checkKeywordDensity(content: string, keywords: string[]): Record<string, number> {
    const wordCount = content.split(/\s+/).length
    const density: Record<string, number> = {}

    keywords.forEach(keyword => {
      const keywordCount = (content.match(new RegExp(keyword, 'gi')) || []).length
      density[keyword] = (keywordCount / wordCount) * 100
    })

    return density
  }
}

// 한국 검색엔진용 프리셋 설정
export const koreanSEOPresets = {
  assetManagement: {
    keywords: [
      '자산관리', '재무설계', '투자자문', '포트폴리오 관리', '부의 관리',
      '패밀리오피스', '프리미엄 자산관리', '고액자산가', 'VIP 자산관리',
      '중소중견기업 자산관리', '기업 재무설계', '법인 자산관리'
    ],
    businessType: 'asset_management',
    targetAudience: 'high_net_worth'
  },
  
  familyOffice: {
    keywords: [
      '패밀리오피스', '가족자산관리', '세대승계', '상속설계', '가업승계',
      '가족기업 관리', '세대간 자산이전', '가문경영', '가족 투자전략'
    ],
    businessType: 'family_business',
    targetAudience: 'business_owner'
  },
  
  consulting: {
    keywords: [
      '재무컨설팅', '투자컨설팅', '세무컨설팅', '경영컨설팅', '자산관리 상담',
      '재무 자문', '투자 자문', '금융 컨설팅', '재무 전략'
    ],
    businessType: 'asset_management',
    targetAudience: 'ceo'
  }
}