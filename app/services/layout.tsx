import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '중소중견기업 전문 자산관리 서비스 | FamilyOffice S',
  description:
    '제조업, 건설업, IT벤처기업 등 업종별 특화 자산관리. 중대재해처벌법 대응부터 가족법인 설립, 승계 설계까지 통합 솔루션.',
  keywords: [
    '중소중견기업 자산관리',
    '제조업 자산관리',
    '건설업 보험',
    '벤처기업 정책자금',
    '중대재해처벌법',
    '가족법인 설립',
  ],
  openGraph: {
    title: '중소중견기업 전문 자산관리 서비스 | FamilyOffice S',
    description:
      '제조업, 건설업, IT벤처기업 등 업종별 특화 자산관리. 중대재해처벌법 대응부터 가족법인 설립, 승계 설계까지 통합 솔루션.',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
