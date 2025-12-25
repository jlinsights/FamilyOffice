import { Metadata } from 'next';

import AboutPageContent from '@/components/about/about-page-content';

export const metadata: Metadata = {
  title: '회사 소개 | FamilyOffice S - 삼성생명 기업컨설팅센터',
  description:
    '삼성생명 기업컨설팅센터 FamilyOffice S는 성공한 기업가와 자산가를 위한 통합 자산관리 서비스를 제공합니다. 20년 이상의 전문 경험을 바탕으로 한 맞춤형 솔루션을 만나보세요.',
  keywords:
    '패밀리오피스, 삼성생명 기업컨설팅, 법인 자산관리, 가업승계, CEO 플랜, 고액자산가 자산관리',
  openGraph: {
    title: '회사 소개 | FamilyOffice S',
    description: '성공한 기업가와 자산가를 위한 통합 자산관리 파트너',
    url: 'https://familyoffices.vip/about',
    siteName: 'FamilyOffice S',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
