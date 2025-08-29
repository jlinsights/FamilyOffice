import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시스템 점검 중 - FamilyOffice S',
  description: '시스템 점검 중입니다. 잠시 후 다시 시도해주세요.',
  robots: 'noindex, nofollow',
  // 파비콘 및 앱 아이콘 설정 (메인 레이아웃과 동일하게)
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
