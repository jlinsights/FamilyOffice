import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '절세의 미학 | Smart Tax Strategy | FamilyOffice S',
  description: '삼성생명과 함께하는 체계적인 절세 전략으로 법인세 30%, 소득세 40%, 상속세 50% 절감을 경험하세요. 법인종신보험, 가업승계, 자기주식 활용 등 검증된 절세 솔루션을 제공합니다.',
  keywords: [
    '절세의 미학',
    '절세 전략',
    '법인세 절세',
    '소득세 절세', 
    '상속세 절세',
    '삼성생명',
    '법인종신보험',
    '가업승계',
    '자기주식',
    '경정청구',
    '가지급금',
    '세무컨설팅',
    '절세 방법',
    '세무최적화',
    'FamilyOffice S'
  ].join(', '),
  authors: [{ name: 'FamilyOffice S Tax Strategy Team' }],
  openGraph: {
    title: '절세의 미학 | Smart Tax Strategy | FamilyOffice S',
    description: '삼성생명과 함께하는 체계적인 절세 전략으로 평균 40% 절세 효과를 경험하세요. 법인세, 소득세, 상속세 절감을 위한 맞춤형 솔루션을 제공합니다.',
    url: 'https://familyoffices.vip/tax-strategy',
    siteName: 'FamilyOffice S',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-tax-strategy.jpg',
        width: 1200,
        height: 630,
        alt: '절세의 미학 - FamilyOffice S 세무 최적화 전략',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '절세의 미학 | FamilyOffice S',
    description: '삼성생명과 함께하는 체계적인 절세 전략으로 평균 40% 절세 효과를 경험하세요.',
    images: ['/og-tax-strategy.jpg'],
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
    google: 'your-google-verification-code',
    other: {
      naver: 'your-naver-verification-code',
    },
  },
  alternates: {
    canonical: 'https://familyoffices.vip/tax-strategy',
    languages: {
      'ko-KR': 'https://familyoffices.vip/tax-strategy',
    },
  },
  category: 'Business & Finance',
  classification: 'Tax Strategy & Optimization',
  other: {
    'article:section': '세무전략',
    'article:tag': '절세, 세무컨설팅, 법인세, 상속세, 삼성생명',
    'business:contact_data:country_name': 'South Korea',
    'business:contact_data:region': 'Seoul',
    'geo.region': 'KR-11',
    'geo.placename': 'Seoul',
    'target-audience': '중소중견기업 CEO, 고액자산가, 가업승계 준비자',
    'content-language': 'ko',
  },
};