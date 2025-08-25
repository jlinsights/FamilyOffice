import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주간 브리프 | 기업승계와 자산관리 핵심 인사이트 | FamilyOffice S',
  description: '매주 월·금요일 오전 7:30, 기업승계와 자산관리 핵심 인사이트를 전달합니다. 5분 내 독서 완료, 실무 적용 가능한 전문가 인사이트.',
  keywords: '주간 브리프, 기업승계 뉴스레터, CEO 뉴스레터, 상속세 절세, 가업승계, 중견기업, 패밀리오피스, 자산관리 인사이트',
  openGraph: {
    title: '주간 브리프 | 기업승계와 자산관리 핵심 인사이트 | FamilyOffice S',
    description: '매주 월·금요일 오전 7:30, 기업승계와 자산관리 핵심 인사이트를 전달합니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '주간 브리프 | 기업승계와 자산관리 핵심 인사이트 | FamilyOffice S',
    description: '매주 월·금요일 오전 7:30, 기업승계와 자산관리 핵심 인사이트를 전달합니다.',
  },
  alternates: {
    canonical: '/insights/weekly-brief',
  },
  // 파비콘 및 앱 아이콘 설정 (메인 레이아웃과 동일하게)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};