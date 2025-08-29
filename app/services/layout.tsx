import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...generateMetadata(
    '자산관리 서비스 | 패밀리오피스, 가업승계, CEO플랜',
    '중소중견기업 CEO를 위한 종합 자산관리 서비스. 패밀리오피스, 가업승계, 자산이전, 경영인정보험, 절세 전략까지 맞춤형 CEO플랜을 제공합니다.',
    [
      '자산관리 서비스',
      '패밀리오피스 서비스',
      '가업승계 컨설팅',
      'CEO플랜',
      '자산이전 전략',
      '경영인정보험',
      '보장자산 구축',
      '상속 설계',
      '증여 전략',
      '절세 컨설팅',
      '중소기업 자산관리',
      '성실신고대상자 컨설팅',
      '법인 자산관리',
      '개인사업자 재무설계',
      '프리미엄 자산관리',
    ]
  ),
  // 파비콘 및 앱 아이콘 설정 (메인 레이아웃과 동일하게)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
