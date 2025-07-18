import { Metadata } from 'next'

export const DEFAULT_SEO = {
  title: 'FamilyOffices.vip | Korea Strategic Partnership & Market Entry Expert',
  description: 'Global companies entering Korea through strategic partnerships. Specialized in financial services, market entry consulting, and institutional investor relations.',
  keywords: [
    'Korea market entry',
    'strategic partnership Korea',
    'Korea business consulting',
    'financial services Korea',
    'Korean institutional investors',
    'market entry consulting',
    'Korea market analysis',
    'strategic partnership services',
    'Korean business development',
    'family office Korea'
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'FamilyOffices.vip',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FamilyOffices.vip - Korea Strategic Partnership Expert'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@familyofficesvip',
    creator: '@jaejonglim'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      me: ['jaehong@familyoffices.vip']
    }
  }
}

export const PAGE_SEO = {
  home: {
    title: 'FamilyOffices.vip | Korea Strategic Partnership & Market Entry Expert',
    description: 'Expert strategic partnerships for global companies entering Korea. Specialized in financial services, premium markets, and institutional investor relations.',
    keywords: [
      'Korea market entry',
      'strategic partnership Korea',
      'Korea business consulting',
      'financial services Korea',
      'Korean institutional investors'
    ]
  },
  services: {
    title: 'Family Office Services | 통합 자산관리 서비스',
    description: 'Korean family office services including wealth management, inheritance planning, and tax advisory for ultra-high net worth individuals.',
    keywords: [
      'family office Korea',
      'wealth management Korea',
      'inheritance planning Korea',
      'tax advisory Korea',
      'asset management Korea'
    ]
  },
  strategicPartnership: {
    title: 'Strategic Partnership | Global Companies Entering Korea',
    description: 'Strategic partnerships for global companies entering Korea. Market entry excellence, financial services partnerships, and business development support.',
    keywords: [
      'strategic partnership Korea',
      'global companies Korea',
      'market entry Korea',
      'business development Korea',
      'financial services Korea'
    ]
  },
  marketEntry: {
    title: 'Korea Market Entry Solutions | Industry-Specific Consulting',
    description: 'Comprehensive Korea market entry solutions for financial services, premium markets, and technology companies. Expert guidance and regulatory compliance.',
    keywords: [
      'Korea market entry',
      'market entry consulting',
      'Korea business entry',
      'financial services entry Korea',
      'Korea regulatory compliance'
    ]
  },
  successStories: {
    title: 'Success Stories | Strategic Partnership Case Studies',
    description: 'Real success stories of global companies entering Korea through strategic partnerships. Proven results and measurable growth.',
    keywords: [
      'Korea market entry success',
      'strategic partnership case studies',
      'Korea business success stories',
      'market entry results',
      'partnership success Korea'
    ]
  },
  about: {
    title: 'About | Jaehong Lim - Korea Market Entry Expert',
    description: 'Meet Jaehong Lim, Korea market entry expert with 10+ years experience in strategic partnerships, M&A, and financial services.',
    keywords: [
      'Jaehong Lim',
      'Korea market entry expert',
      'strategic partnership expert',
      'Korea business consultant',
      'financial services expert Korea'
    ]
  },
  contact: {
    title: 'Contact | Strategic Partnership Consultation',
    description: 'Contact us for strategic partnership consultation and Korea market entry advice. Free market analysis and business development support.',
    keywords: [
      'Korea market entry consultation',
      'strategic partnership contact',
      'Korea business consultation',
      'market entry advice',
      'business development Korea'
    ]
  }
}

export function generateMetadata(page: keyof typeof PAGE_SEO, customData?: Partial<Metadata>): Metadata {
  const seoData = PAGE_SEO[page]
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      locale: 'ko_KR',
      siteName: 'FamilyOffices.vip',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seoData.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: ['/og-image.jpg']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://familyoffices.vip${page === 'home' ? '' : '/' + page}`,
    },
    ...customData
  }
}

export function generateStructuredData(type: 'Organization' | 'Person' | 'Service' | 'Article', data: any) {
  const baseUrl = 'https://familyoffices.vip'
  
  const structuredData = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FamilyOffices.vip',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: 'Korea strategic partnership and market entry expert',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KR',
        addressLocality: 'Seoul',
        addressRegion: 'Jung-gu',
        postalCode: '04637',
        streetAddress: '서울 중구 세종대로 73 태평로빌딩 10층'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-502-555-0870',
        contactType: 'customer service',
        availableLanguage: ['Korean', 'English']
      },
      sameAs: [
        'https://linkedin.com/company/familyoffices-vip',
        'https://linkedin.com/in/jaehong-lim'
      ],
      founder: {
        '@type': 'Person',
        name: 'Jaehong Lim',
        jobTitle: 'Strategic Partnership Expert',
        url: `${baseUrl}/about`
      },
      ...data
    },
    Person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jaehong Lim',
      jobTitle: 'Strategic Partnership Expert',
      url: `${baseUrl}/about`,
      image: `${baseUrl}/jaehong-lim.jpg`,
      description: 'Korea market entry expert with 10+ years experience in strategic partnerships and financial services',
      knowsAbout: [
        'Strategic Partnerships',
        'Korea Market Entry',
        'Financial Services',
        'Business Development',
        'Cross-border Transactions'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'FamilyOffices.vip',
        url: baseUrl
      },
      sameAs: [
        'https://linkedin.com/in/jaehong-lim'
      ],
      ...data
    },
    Service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Korea Market Entry Consulting',
      description: 'Strategic partnership services for global companies entering Korea',
      provider: {
        '@type': 'Organization',
        name: 'FamilyOffices.vip',
        url: baseUrl
      },
      areaServed: {
        '@type': 'Country',
        name: 'South Korea'
      },
      serviceType: 'Business Consulting',
      category: 'Strategic Partnership',
      ...data
    },
    Article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      publisher: {
        '@type': 'Organization',
        name: 'FamilyOffices.vip',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`
      },
      author: {
        '@type': 'Person',
        name: 'Jaehong Lim',
        url: `${baseUrl}/about`
      },
      ...data
    }
  }
  
  return structuredData[type]
}

export const CANONICAL_URLS = {
  home: 'https://familyoffices.vip',
  services: 'https://familyoffices.vip/services',
  strategicPartnership: 'https://familyoffices.vip/strategic-partnership',
  marketEntry: 'https://familyoffices.vip/market-entry',
  successStories: 'https://familyoffices.vip/success-stories',
  about: 'https://familyoffices.vip/about',
  contact: 'https://familyoffices.vip/contact'
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  }
}