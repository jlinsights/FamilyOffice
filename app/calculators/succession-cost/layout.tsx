import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '가업승계 비용 계산기 | FamilyOffice S - 승계 방법별 정확한 비용 계산',
  description: '사업체 가치와 승계 방법에 따른 정확한 비용을 계산하고, 가업승계 특례 적용을 통한 최적화 방안을 확인하세요. 지주회사 활용 및 분할증여 시뮬레이션 제공.',
  keywords: [
    '가업승계 비용 계산기',
    '가업승계 세금',
    '가업승계 특례',
    '지주회사 설립',
    '기업 승계 비용',
    '사업 승계 계획',
    '승계세 절약',
    '가족기업 승계',
    '중견기업 승계',
    '경영권 승계 비용'
  ],
  openGraph: {
    title: '가업승계 비용 계산기 - 전문가 수준의 정확한 계산',
    description: '가업승계 특례 적용부터 지주회사 활용까지, 승계 방법별 정확한 비용을 계산하고 최적화 방안을 확인하세요',
    url: 'https://familyoffices.vip/calculators/succession-cost',
    images: [
      {
        url: '/images/succession-cost-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: '가업승계 비용 계산기 - FamilyOffice S'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '가업승계 비용 계산기 | FamilyOffice S',
    description: '가업승계 특례와 지주회사 활용을 통한 최적 승계 전략을 계산해보세요',
    images: ['/images/succession-cost-calculator-og.jpg']
  },
  alternates: {
    canonical: 'https://familyoffices.vip/calculators/succession-cost'
  }
};

export default async function SuccessionCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인증 확인 - 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  const { userId } = await auth();

  if (!userId) {
    redirect('/auth/sign-in?redirect_url=/calculators/succession-cost');
  }

  return children;
}