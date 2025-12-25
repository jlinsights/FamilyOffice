import { Metadata } from 'next';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: '세무 계산기 | FamilyOffice S',
  description:
    '상속세, 증여세, 가업승계 비용을 정확하게 계산해보세요. 전문가가 설계한 계산기로 세무 최적화 전략을 확인하실 수 있습니다.',
  keywords: [
    '상속세 계산기',
    '증여세 계산기',
    '가업승계 비용',
    '세무 계산',
    '절세 전략',
  ],
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-20">{children}</main>

      <Footer />
    </div>
  );
}
