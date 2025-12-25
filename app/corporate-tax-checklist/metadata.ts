import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '법인세 결산 후 필수 점검 포인트 | 삼성생명 세무 체크리스트 | FamilyOffice S',
  description:
    '법인 결산 완료 후 놓치기 쉬운 세무 및 재무 핵심 체크포인트. 법인세 신고, 재무제표 검토, 절세 전략, 컴플라이언스 점검까지 5개 영역 30개 항목 완벽 가이드.',
  keywords: [
    '법인세 결산',
    '결산 후 점검',
    '법인세 신고',
    '세무 체크리스트',
    '재무제표 검토',
    '절세 전략',
    '세무 컴플라이언스',
    '법인세 최적화',
    '세무조정',
    '외부감사',
    '세액공제',
    '이전가격',
    '결손금 이월',
    '삼성생명',
    'FamilyOffice S',
  ].join(', '),
  authors: [{ name: 'FamilyOffice S Tax Advisory Team' }],
  openGraph: {
    title: '법인세 결산 후 필수 점검 포인트 | FamilyOffice S',
    description:
      '법인 결산 완료 후 5개 영역 30개 항목 완벽 체크리스트. 법인세 신고 마감일까지 놓치면 안 되는 핵심 포인트를 확인하세요.',
    url: 'https://familyoffices.vip/corporate-tax-checklist',
    siteName: 'FamilyOffice S',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-corporate-tax-checklist.jpg',
        width: 1200,
        height: 630,
        alt: '법인세 결산 후 필수 점검 포인트 - FamilyOffice S',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '법인세 결산 후 필수 점검 포인트 | FamilyOffice S',
    description:
      '결산 완료 후 30개 핵심 체크포인트로 세무리스크 최소화. 전문가 상담으로 완벽한 법인세 신고를 준비하세요.',
    images: ['/og-corporate-tax-checklist.jpg'],
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
    canonical: 'https://familyoffices.vip/corporate-tax-checklist',
    languages: {
      'ko-KR': 'https://familyoffices.vip/corporate-tax-checklist',
    },
  },
  category: 'Business & Finance',
  classification: 'Corporate Tax & Accounting',
  other: {
    'article:section': '법인세무',
    'article:tag': '법인세, 결산, 세무신고, 체크리스트, 컴플라이언스',
    'business:contact_data:country_name': 'South Korea',
    'business:contact_data:region': 'Seoul',
    'geo.region': 'KR-11',
    'geo.placename': 'Seoul',
    'target-audience': '법인기업 CEO, CFO, 세무담당자, 회계법인',
    'content-language': 'ko',
    'checklist-type': 'corporate-tax-settlement',
    'checklist-areas': '세무신고, 재무검토, 절세전략, 컴플라이언스, 차기계획',
    'urgency-level': 'high',
    'deadline-sensitive': 'true',
  },
};
