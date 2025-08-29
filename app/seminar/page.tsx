import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PastSeminarsSection } from '@/components/seminar/PastSeminarsSection';
import { SeminarCategoriesSection } from '@/components/seminar/SeminarCategoriesSection';
import { SeminarHeroSection } from '@/components/seminar/SeminarHeroSection';
import SeminarRegistrationSection from '@/components/seminar/SeminarRegistrationSection';
import { UpcomingSeminarsSection } from '@/components/seminar/UpcomingSeminarsSection';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';

// SEO 최적화 메타데이터
export const metadata: Metadata = generateMetadata(
  'VVIP 세미나 | Business Live ON · The 멋진 하루 | 서울FP센터 강남FP센터',
  'VVIP 자산관리 세미나 Business Live ON, The 멋진 하루. 서울FP센터·강남FP센터 개최. CEO 전용 프리미엄 교육 프로그램. 패밀리오피스 전문가와 함께하는 특별한 만남 ☎0502-5550-8700',
  [
    // 네이버/다음 핵심 키워드
    'VVIP 세미나',
    'Business Live ON',
    'The 멋진 하루',
    '서울FP센터',
    '강남FP센터',
    '삼성생명FP센터',
    
    // Google/Perplexity 롱테일 키워드
    'VVIP 자산관리 세미나',
    'CEO 전용 세미나',
    '프리미엄 금융 세미나',
    '중소기업 CEO 교육',
    '자산관리 전문가 세미나',
    '패밀리오피스 교육 프로그램',
    
    // 지역별 세미나 키워드
    '서울 VVIP 세미나',
    '강남 자산관리 세미나',
    '중구 패밀리오피스 세미나',
    '서울 CEO 교육',
    '강남 금융 세미나',
    
    // 주제별 세미나 키워드
    '가업승계 세미나',
    '절세전략 세미나',
    '상속증여 교육',
    '재무설계 세미나',
    '투자전략 교육',
    '리스크관리 세미나',
    
    // 브랜드 관련 키워드
    '삼성생명 세미나',
    '패밀리오피스 S 세미나',
    'FP센터 교육',
    'VVIP 고객 세미나',
    
    // 기업 대상 키워드
    '중소중견기업 CEO 세미나',
    '기업가 교육 프로그램',
    '경영진 전용 세미나',
    '법인대표 자산관리 교육',
  ]
);

export default function SeminarPage() {
  // 세미나 전용 구조화된 데이터
  const seminarStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'VVIP 자산관리 세미나 - Business Live ON · The 멋진 하루',
    description: 'CEO 전용 프리미엄 자산관리 세미나. 패밀리오피스 전문가와 함께하는 특별한 교육 프로그램',
    url: 'https://familyoffices.vip/seminar',
    image: 'https://familyoffices.vip/og-image.jpg',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      url: 'https://familyoffices.vip',
      logo: 'https://familyoffices.vip/logo.png',
      telephone: '+82-502-5550-8700',
      email: 'seminar@familyoffices.vip'
    },
    location: [
      {
        '@type': 'Place',
        name: '서울FP센터',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '서울',
          addressRegion: '서울특별시',
          addressCountry: 'KR'
        }
      },
      {
        '@type': 'Place',
        name: '강남FP센터',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '강남',
          addressRegion: '서울특별시',
          addressCountry: 'KR'
        }
      }
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'VVIP 고객',
      name: 'CEO 및 기업 오너'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
      description: '초대제 무료 세미나'
    },
    performer: {
      '@type': 'Organization',
      name: '패밀리오피스 전문가',
      description: '자산관리 및 가업승계 전문 컨설턴트'
    },
    keywords: 'VVIP 세미나, Business Live ON, The 멋진 하루, 서울FP센터, 강남FP센터, 자산관리, CEO 교육',
    about: [
      {
        '@type': 'Thing',
        name: '자산관리',
        description: 'VVIP 고객 대상 전문 자산관리 서비스'
      },
      {
        '@type': 'Thing',
        name: '가업승계',
        description: '체계적인 가업승계 및 상속 계획'
      },
      {
        '@type': 'Thing',
        name: '절세전략',
        description: '세무 최적화 및 절세 방안'
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <StructuredData data={seminarStructuredData} />
      <Header />

      <main className="pt-20">
        <SeminarHeroSection />
        <UpcomingSeminarsSection />
        <SeminarCategoriesSection />
        <PastSeminarsSection />
        <CompactMultimediaSection />
        <SeminarRegistrationSection />
      </main>

      <Footer />
    </div>
  );
}
