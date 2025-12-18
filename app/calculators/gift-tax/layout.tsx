import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '증여세 계산기 | FamilyOffice S - 관계별 공제 한도와 분할증여 최적화',
  description: '2025년 증여세법 기준으로 관계별 공제 한도를 적용하고 분할증여를 통한 절세 효과를 시뮬레이션하세요. 10년 누계 공제와 최적 증여 계획을 제공합니다.',
  keywords: [
    '증여세 계산기',
    '증여세 계산',
    '증여세 공제',
    '분할증여',
    '증여세 절세',
    '배우자 증여',
    '자녀 증여',
    '증여세법',
    '2025년 증여세',
    '증여 최적화'
  ],
  openGraph: {
    title: '증여세 계산기 - 분할증여로 절세 효과 극대화',
    description: '관계별 공제 한도와 분할증여 시뮬레이션으로 최적의 증여 전략을 수립하세요',
    url: 'https://familyoffices.vip/calculators/gift-tax',
    images: [
      {
        url: '/images/gift-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: '증여세 계산기 - FamilyOffice S'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여세 계산기 | FamilyOffice S',
    description: '관계별 공제와 분할증여를 통한 최적 절세 전략',
    images: ['/images/gift-tax-calculator-og.jpg']
  },
  alternates: {
    canonical: 'https://familyoffices.vip/calculators/gift-tax'
  }
};

export default async function GiftTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인증 확인 - 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  const { userId } = await auth();

  if (!userId) {
    redirect('/auth/sign-in?redirect_url=/calculators/gift-tax');
  }

  return children;
}