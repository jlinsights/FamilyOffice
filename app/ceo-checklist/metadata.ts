import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CEO 체크리스트 | 경영진단 자가평가 | FamilyOffice S',
  description:
    '삼성생명과 함께하는 CEO 경영진단 체크리스트. 재무세무, 리스크관리, 가업승계, 성장전략, 개인자산 5대 핵심영역 자가진단으로 맞춤형 솔루션을 제공합니다.',
  keywords: [
    'CEO 체크리스트',
    '경영진단',
    'CEO 자가진단',
    '기업 리스크 관리',
    '가업승계 체크리스트',
    '중대재해처벌법 대응',
    '법인세 절세',
    '경영자 보험',
    '삼성생명',
    'ESG 경영',
    'M&A 전략',
    '디지털 전환',
    '기업 컴플라이언스',
    'FamilyOffice S',
  ].join(', '),
  authors: [{ name: 'FamilyOffice S CEO Advisory Team' }],
  openGraph: {
    title: 'CEO 체크리스트 | 경영진단 자가평가 | FamilyOffice S',
    description:
      '5대 핵심영역 30개 항목으로 진단하는 CEO 경영 체크리스트. 재무세무, 리스크관리, 가업승계 준비도를 점검하고 맞춤형 솔루션을 받아보세요.',
    url: 'https://familyoffices.vip/ceo-checklist',
    siteName: 'FamilyOffice S',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-ceo-checklist.jpg',
        width: 1200,
        height: 630,
        alt: 'CEO 경영진단 체크리스트 - FamilyOffice S',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEO 체크리스트 | FamilyOffice S',
    description:
      '5대 핵심영역 30개 항목 CEO 경영진단. 무료 상담으로 맞춤형 솔루션을 받아보세요.',
    images: ['/og-ceo-checklist.jpg'],
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
    canonical: 'https://familyoffices.vip/ceo-checklist',
    languages: {
      'ko-KR': 'https://familyoffices.vip/ceo-checklist',
    },
  },
  category: 'Business & Finance',
  classification: 'Business Management & Assessment',
  other: {
    'article:section': '경영진단',
    'article:tag': 'CEO, 경영진단, 체크리스트, 리스크관리, 가업승계',
    'business:contact_data:country_name': 'South Korea',
    'business:contact_data:region': 'Seoul',
    'geo.region': 'KR-11',
    'geo.placename': 'Seoul',
    'target-audience': '중소중견기업 CEO, 경영진, 사업승계 준비자',
    'content-language': 'ko',
    'assessment-type': 'self-assessment',
    'assessment-areas': '재무세무, 리스크관리, 가업승계, 성장전략, 개인자산',
  },
};
