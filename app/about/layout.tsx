import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '가업승계·절세·자산관리 전문가 | FamilyOffice S | 패밀리오피스',
  description:
    '가업승계, 절세 전략, 자산관리 전문가 팀. 법인 대표와 고액자산가를 위한 맞춤형 패밀리오피스 서비스. 20년+ 경력의 세무·금융 전문가가 제공하는 검증된 솔루션. 500억원+ 자산관리 실적.',
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

    // 🏆 전문성/자격 키워드 (Expertise/Credentials)
    '가업승계 전문가',
    '세무 전문가',
    '자산관리 전문가',
    '패밀리오피스 전문가',
    '금융 전문가 팀',
    'CFP 자격',
    '20년 경력 전문가',
    '검증된 전문가',

    // 🏢 서비스 키워드 (Service Offerings)
    '가업승계 컨설팅',
    '절세 컨설팅',
    '자산관리 서비스',
    '맞춤형 솔루션',
    '종합 자산관리',
    '절세 전략 수립',

    // 💼 타겟 고객 키워드 (Target Clients)
    '법인 대표 전문',
    '고액자산가 전문',
    '기업 오너 자문',
    'CEO 전담 서비스',
    'UHNW 서비스',

    // ✅ 신뢰/권위 키워드 (Trust/Authority)
    '실전 경험',
    '성공 사례',
    '신뢰할 수 있는',
  ],
  openGraph: {
    title: '중소중견기업 대표님의 성공적인 자산관리 파트너 | FamilyOffice S',
    description:
      '500억원+ 자산관리 실적, 98% 만족도. 중소중견기업 전문 자산관리 팀이 법인-개인 통합 자산관리부터 가업승계까지 전문 서비스를 제공합니다.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '가업승계·절세·자산관리 전문가 | FamilyOffice S',
    description: '법인 대표와 고액자산가를 위한 맞춤형 패밀리오피스 서비스',
    images: ['https://familyoffices.vip/images/og-image-familyoffice-v2.png'],
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
