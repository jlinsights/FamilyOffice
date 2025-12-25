import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인사노무 관리 가이드 | 삼성생명 핵심포인트 | FamilyOffice S',
  description:
    '중소기업을 위한 인사노무 관리 완벽 가이드. 채용부터 퇴사까지 6개 영역 36개 항목 체크리스트로 법적 리스크를 최소화하고 컴플라이언스를 강화하세요.',
  keywords: [
    '인사노무 관리',
    '노동법 준수',
    '인사 체크리스트',
    '근로기준법',
    '산업안전보건법',
    '채용 관리',
    '근로시간 관리',
    '임금 체계',
    '휴가 관리',
    '안전보건 교육',
    '취업규칙',
    '4대보험',
    '직장 내 괴롭힘',
    '삼성생명',
    'FamilyOffice S',
  ].join(', '),
  authors: [{ name: 'FamilyOffice S HR Advisory Team' }],
  openGraph: {
    title: '인사노무 관리 가이드 | 삼성생명 핵심포인트 | FamilyOffice S',
    description:
      '6개 영역 36개 항목 인사노무 체크리스트. 법적 리스크 최소화와 컴플라이언스 강화를 위한 완벽 가이드를 제공합니다.',
    url: 'https://familyoffices.vip/hr-labor-management',
    siteName: 'FamilyOffice S',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-hr-labor-management.jpg',
        width: 1200,
        height: 630,
        alt: '인사노무 관리 가이드 - FamilyOffice S',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '인사노무 관리 가이드 | FamilyOffice S',
    description:
      '중소기업 인사노무 36개 핵심 체크포인트. 법적 리스크 관리와 컴플라이언스 강화로 안전한 경영을 실현하세요.',
    images: ['/og-hr-labor-management.jpg'],
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
    canonical: 'https://familyoffices.vip/hr-labor-management',
    languages: {
      'ko-KR': 'https://familyoffices.vip/hr-labor-management',
    },
  },
  category: 'Business & HR',
  classification: 'Human Resources Management',
  other: {
    'article:section': '인사노무',
    'article:tag': '인사관리, 노동법, 근로기준법, 안전보건, 컴플라이언스',
    'business:contact_data:country_name': 'South Korea',
    'business:contact_data:region': 'Seoul',
    'geo.region': 'KR-11',
    'geo.placename': 'Seoul',
    'target-audience': '중소기업 CEO, 인사담당자, HR 매니저',
    'content-language': 'ko',
    'checklist-type': 'hr-labor-compliance',
    'checklist-areas':
      '채용관리, 근로시간, 임금휴가, 안전보건, 노사관계, 법정의무',
    'compliance-focus': 'korean-labor-law',
    'risk-assessment': 'enabled',
  },
};
