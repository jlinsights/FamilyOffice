import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructureCheckContentSection } from '@/components/sections/structure-check-content';
import { StructureCheckFormSection } from '@/components/sections/structure-check-form';
import { StructureCheckHeroSection } from '@/components/sections/structure-check-hero';
import { OrganizationStructuredData } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: '구조 점검 요청 | FamilyOffice S - 기업 오너·자산가 판단 정리',
  description:
    '이 문제, 혼자 판단하셔도 되는 단계인가요? 상담이 아닌 판단의 기준을 명확히 하는 구조 점검 서비스. 상속·승계·자산관리 의사결정 구조화.',
  keywords:
    '구조 점검, 판단 정리, 상속 구조, 가업승계 판단, CEO 의사결정, 자산관리 기준, 전문가 자문',
  openGraph: {
    title: '구조 점검 요청 | 이 문제, 혼자 판단하셔도 되는 단계인가요?',
    description:
      '상담이 아닌 판단 구조 정리. 지금 결정해야 할 것과 미뤄도 되는 것의 경계를 명확히 합니다.',
    url: 'https://familyoffices.vip/structure-check',
    siteName: 'FamilyOffice S',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-structure-check.jpg',
        width: 1200,
        height: 630,
        alt: '구조 점검 요청 - FamilyOffice S',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '구조 점검 요청 | 혼자 판단하셔도 되는 단계인가요?',
    description: '상담이 아닌 판단 구조 정리. 결정의 기준을 명확히 합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://familyoffices.vip/structure-check',
  },
};

export default function StructureCheckPage() {
  return (
    <div className="min-h-screen bg-background">
      <OrganizationStructuredData />

      <Header />

      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <StructureCheckHeroSection />

        {/* Main Content */}
        <StructureCheckContentSection />

        {/* Request Form */}
        <StructureCheckFormSection />
      </main>

      <Footer />
    </div>
  );
}
