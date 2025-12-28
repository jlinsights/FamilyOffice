import { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  ...generateMetadata(
    '전문 서비스 | 가업승계·절세·자산관리 컨설팅 | FamilyOffice S',
    '법인 대표와 고액자산가를 위한 전문 자산관리 서비스. 가업승계, 절세 전략, 자산이전, 패밀리오피스까지 맞춤형 CEO플랜. 검증된 전문가팀이 제공하는 종합 컨설팅 서비스.',
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

      // 🏢 전문 컨설팅 서비스 (Professional Consulting)
      '전문 컨설팅',
      '전문가 서비스',
      '맞춤형 컨설팅',
      '종합 컨설팅',
      '통합 서비스',

      // 💼 타겟 고객 서비스 (Target Client Services)
      '법인 대표 서비스',
      '고액자산가 서비스',
      'CEO 전담 서비스',
      '기업 오너 서비스',

      // ✨ 차별화 서비스 (Differentiated Services)
      '검증된 서비스',
      '프리미엄 서비스',
      '체계적 서비스',
      '원스톱 서비스',
      '포괄적 서비스',

      // 📊 서비스 영역 (Service Areas)
      '가업승계 서비스',
      '절세 서비스',
      '자산관리 서비스',
      '재무설계 서비스',
      '세무 서비스',
    ],
    'https://familyoffices.vip/Images/og-image-familyoffice-v2.png'
  ),
  // 파비콘 및 앱 아이콘 설정 (메인 레이아웃과 동일하게)
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/site.webmanifest',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
