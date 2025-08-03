import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시스템 점검 중 - FamilyOffice S',
  description: '시스템 점검 중입니다. 잠시 후 다시 시도해주세요.',
  robots: 'noindex, nofollow',
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
