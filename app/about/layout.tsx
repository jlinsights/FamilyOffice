import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '중소중견기업 전문 자산관리 파트너 | FamilyOffice S',
  description:
    '중소중견기업 대표님의 성공적인 자산관리 파트너, FamilyOffice S. 500억원+ 자산관리 실적, 20년+ 전문 경험으로 법인-개인 통합 자산관리 및 가업승계 설계 서비스를 제공합니다.',
  keywords: [
    '중소중견기업 자산관리',
    '법인 자산관리',
    '패밀리오피스',
    '가업승계 설계',
    '세무최적화',
    '기업 자산관리 전문',
    '중소기업 재무컨설팅',
    '법인 대표 자산관리',
    '중견기업 투자전략',
  ],
  openGraph: {
    title: '중소중견기업 대표님의 성공적인 자산관리 파트너 | FamilyOffice S',
    description:
      '500억원+ 자산관리 실적, 98% 만족도. 중소중견기업 전문 자산관리 팀이 법인-개인 통합 자산관리부터 가업승계까지 전문 서비스를 제공합니다.',
    type: 'website',
  },
  // 파비콘 및 앱 아이콘 설정 (메인 레이아웃과 동일하게)
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/site.webmanifest',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
