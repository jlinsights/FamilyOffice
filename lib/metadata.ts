import { safeMetadata } from '@/lib/safe-seo-engine';
import type { Metadata, Viewport } from 'next';

// Safe SEO metadata with fallback support
export const metadata: Metadata = {
  ...safeMetadata.default,
  title: {
    default: 'FamilyOffice S - 절세플랜·가업승계·가족법인·정책자금·기업인증 전문 통합솔루션',
    template: '%s | FamilyOffice S',
  },
  description: '【절세플랜·가업승계·가족법인 전문】 성공한 기업가를 위한 통합솔루션 | 정책자금·기업인증 컨설팅 | 세금 40% 절감 + 승계세 50% 절감 + 정책자금 신청 95% 성공률 | 삼성생명 프리미엄 파트너 | 맞춤형 절세플랜 설계',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2025', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.png?v=2025', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2025',
    apple: { url: '/favicon.png?v=2025', sizes: '180x180' },
    other: [
      { rel: 'icon', url: '/favicon.ico?v=2025', sizes: 'any' },
      { rel: 'apple-touch-icon', url: '/favicon.png?v=2025', sizes: '180x180' },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || 'your-naver-verification-code',
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || 'your-bing-verification-code'
    }
  },
  alternates: {
    canonical: 'https://familyoffices.vip',
    languages: {
      'ko': 'https://familyoffices.vip',
      'ko-KR': 'https://familyoffices.vip'
    }
  },
  generator: 'Next.js',
  applicationName: 'FamilyOffice S - 성공한 기업가·자산가를 위한 법인보험 가업승계 통합솔루션',
  referrer: 'origin-when-cross-origin',
  creator: 'FamilyOffice S',
  publisher: 'FamilyOffice S - 프리미엄 법인금융 서비스'
};

// Next.js 15: colorScheme을 별도 viewport export로 분리
export const viewport: Viewport = {
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover' // iPhone X 이상 Safe Area 지원
};
