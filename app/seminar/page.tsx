import { Metadata } from 'next';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { PastSeminarsSection } from '@/components/seminar/PastSeminarsSection';
import { SeminarCategoriesSection } from '@/components/seminar/SeminarCategoriesSection';
import { SeminarHeroSection } from '@/components/seminar/SeminarHeroSection';
import SeminarRegistrationSection from '@/components/seminar/SeminarRegistrationSection';
import { UpcomingSeminarsSection } from '@/components/seminar/UpcomingSeminarsSection';
import { StructuredData } from '@/components/structured-data';

import { generateMetadata } from '@/lib/seo/metadata';

// SEO 최적화 메타데이터 - 검색 의도별 키워드 전략
export const metadata: Metadata = generateMetadata(
  '2025년 CEO 세미나 일정 | 가업승계·절세전략 무료 세미나 | 패밀리오피스',
  '2025년 1-12월 CEO 세미나 일정 안내. 이상선 박사 가업승계 특강, 황병훈 세무사 절세전략, 중대재해처벌법 대응 무료 세미나. 그랜드하얏트·신라호텔 개최. 선착순 30명 ☎0502-5550-8700',
  [
    // 🎯 거래성 의도 (Transactional) - 즉시 등록/신청
    '세미나 신청',
    '무료 세미나 등록',
    'CEO 세미나 예약',
    '가업승계 세미나 신청',
    '절세 세미나 등록',
    '2025년 세미나 일정',
    '이번주 CEO 세미나',
    '다음달 경영자 세미나',

    // 📍 지역 + 날짜 조합 (Local SEO + Time-sensitive)
    '강남 CEO 세미나 7월',
    '서울 가업승계 세미나 8월',
    '그랜드하얏트 세미나 10월',
    '신라호텔 세미나 예약',
    '강남구 무료 금융 세미나',
    '중구 패밀리오피스 교육',

    // 👨‍🏫 강사명 + 전문분야 (E-A-T 강화)
    '이상선 박사 가업승계 세미나',
    '황병훈 세무사 절세 강의',
    '정기홍 FO 자산관리 세미나',
    '삼성생명 패밀리오피스 전문가',

    // 💰 가격/혜택 키워드 (Commercial Intent)
    '무료 CEO 세미나',
    '참가비 무료 경영자 교육',
    '호텔 오찬 제공 세미나',
    '1대1 무료 상담 세미나',
    'VVIP 초청 세미나',

    // 🔥 긴급성/희소성 키워드 (FOMO)
    '선착순 30명 세미나',
    '마감임박 CEO 세미나',
    '조기마감 예상 세미나',
    '분기별 단 1회 세미나',
    '연 4회 한정 VVIP 세미나',

    // 📊 구체적 주제 + 년도 (Specific Topics)
    '2025년 세법개정 세미나',
    '중대재해처벌법 2025 대응전략',
    '상속증여세 개정안 설명회',
    '법인 정관개정 실무 세미나',
    '25년 가업승계 세제혜택',

    // 🎓 자격/인증 키워드 (Credibility)
    '삼성생명 공식 세미나',
    'FP센터 인증 교육',
    '세무사회 추천 세미나',
    '패밀리오피스 정식 프로그램',

    // 🔍 비교/선택 키워드 (Comparison)
    '최고의 CEO 세미나',
    '강남 베스트 경영자 교육',
    '2025년 필수 세미나',
    'CEO가 꼭 들어야 할 세미나',

    // 🗣️ 음성검색 최적화 (Voice Search)
    '오늘 있는 CEO 세미나',
    '내 주변 무료 세미나',
    '이번주 가업승계 교육 어디서',
    '다음주 세미나 일정 알려줘',
  ]
);

export default function SeminarPage() {
  // 세미나 전용 구조화된 데이터 - 향상된 SEO 효과
  const seminarStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'EventSeries', // Event보다 EventSeries가 더 적합
    name: '2025년 CEO 가업승계·절세전략 무료 세미나 시리즈',
    description:
      '이상선 박사, 황병훈 세무사 등 최고 전문가와 함께하는 CEO 전용 프리미엄 세미나. 그랜드하얏트, 신라호텔 등 최고급 호텔에서 개최. 선착순 30명 한정',
    url: 'https://familyoffices.vip/seminar',
    image: 'https://familyoffices.vip/og-image.jpg',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: '2025-07-23',
    endDate: '2025-10-17',
    organizer: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      url: 'https://familyoffices.vip',
      logo: 'https://familyoffices.vip/logo.png',
      telephone: '+82-502-5550-8700',
      email: 'seminar@familyoffices.vip',
    },
    location: [
      {
        '@type': 'Place',
        name: '서울FP센터',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '서울',
          addressRegion: '서울특별시',
          addressCountry: 'KR',
        },
      },
      {
        '@type': 'Place',
        name: '강남FP센터',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '강남',
          addressRegion: '서울특별시',
          addressCountry: 'KR',
        },
      },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'VVIP 고객',
      name: 'CEO 및 기업 오너',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      availability: 'https://schema.org/LimitedAvailability',
      availableAtOrFrom: {
        '@type': 'Place',
        name: '그랜드하얏트 서울, 신라호텔',
        address: '서울특별시',
      },
      validFrom: '2025-01-01',
      validThrough: '2025-12-31',
      description: '참가비 무료 (노쇼 방지 보증금 5만원, 참석시 전액 환불)',
      url: 'https://familyoffices.vip/seminar#registration',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        maxValue: 30,
        unitText: '명',
      },
    },
    performer: [
      {
        '@type': 'Person',
        name: '이상선',
        jobTitle: '박사',
        affiliation: {
          '@type': 'Organization',
          name: '삼성생명 패밀리오피스',
        },
        description: '가업승계 전문가, 20년 경력',
      },
      {
        '@type': 'Person',
        name: '황병훈',
        jobTitle: '세무전문가',
        affiliation: {
          '@type': 'Organization',
          name: '삼성패밀리오피스',
        },
        description: '세무 전문가, 15년 경력',
      },
    ],
    keywords:
      '2025년 CEO 세미나, 가업승계 세미나 신청, 절세전략 무료 세미나, 이상선 박사, 황병훈 세무사, 그랜드하얏트 세미나, 중대재해처벌법 대응, 선착순 30명',
    about: [
      {
        '@type': 'Thing',
        name: '자산관리',
        description: 'VVIP 고객 대상 전문 자산관리 서비스',
      },
      {
        '@type': 'Thing',
        name: '가업승계',
        description: '체계적인 가업승계 및 상속 계획',
      },
      {
        '@type': 'Thing',
        name: '절세전략',
        description: '세무 최적화 및 절세 방안',
      },
    ],
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
