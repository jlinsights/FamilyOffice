import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: '상속세 계산기 | FamilyOffice S - 2025년 최신 세법 기준 정확한 계산',
  description:
    '2025년 최신 세법 기준으로 상속세를 정확하게 계산하고 절세 방안을 확인하세요. 누진세율 적용과 공제 한도 자동 계산으로 정확한 예상 세액을 제공합니다.',
  keywords: [
    '상속세 계산기',
    '상속세 계산',
    '상속세 공제',
    '누진세율',
    '상속세 절세',
    '기초공제',
    '배우자공제',
    '인적공제',
    '상속세법',
    '2025년 상속세',
  ],
  openGraph: {
    title: '상속세 계산기 - 2025년 최신 세법 반영',
    description:
      '상속세 누진세율과 공제 한도를 정확히 계산하고 절세 방안까지 확인하세요',
    url: 'https://familyoffices.vip/calculators/inheritance-tax',
    images: [
      {
        url: '/images/inheritance-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: '상속세 계산기 - FamilyOffice S',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속세 계산기 | FamilyOffice S',
    description: '2025년 최신 세법 기준 상속세 계산 및 절세 전략',
    images: ['/images/inheritance-tax-calculator-og.jpg'],
  },
  alternates: {
    canonical: 'https://familyoffices.vip/calculators/inheritance-tax',
  },
};

export default async function InheritanceTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인증 확인 - 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  const { userId } = await auth();

  if (!userId) {
    redirect('/auth/sign-in?redirect_url=/calculators/inheritance-tax');
  }

  return children;
}
