import type React from 'react';

import type { Metadata } from 'next';

import { defaultMetadata } from '@/lib/seo';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  ...defaultMetadata,

  // 한국 검색엔진 최적화
  other: {
    ...defaultMetadata.other,
    // 네이버 사이트 검증 (실제 코드로 교체 필요)
    'naver-site-verification': 'your-naver-verification-code',
    // 네이버 블로그 RSS
    NaverBot: 'All',
    // 다음 검색엔진
    Daumoa: 'index,follow',
    // 구글 사이트 검증
    'google-site-verification': '18ba3lEeatksZPWrS7AdbCYodbZgCg_frKSFPSJdQ0c',
    // 지역 설정
    'geo.region': 'KR',
    'geo.placename': 'Seoul',
    'geo.position': '37.5665;126.9780',
    ICBM: '37.5665, 126.9780',
    // 언어 설정
    language: 'ko',
    'content-language': 'ko',
    // 비즈니스 정보
    'business:contact_data:street_address': '서울특별시 강남구 테헤란로 123',
    'business:contact_data:locality': '강남구',
    'business:contact_data:region': '서울특별시',
    'business:contact_data:postal_code': '06234',
    'business:contact_data:country_name': '대한민국',
    'business:contact_data:phone_number': '+82-2-1234-5678',
    'business:contact_data:email': 'contact@familyoffices.vip',
    // 소셜 미디어
    'twitter:creator': '@familyoffices',
    'twitter:site': '@familyoffices',
    // 추가 메타데이터
    author: 'FamilyOffice S',
    copyright: '© 2024 FamilyOffice S. All rights reserved.',
    distribution: 'global',
    rating: 'general',
    'revisit-after': '7 days',
    robots:
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  } as unknown as Record<string, string>,

  // 한국 특화 검색엔진 설정
  alternates: {
    canonical: 'https://familyoffices.vip',
    languages: {
      'ko-KR': 'https://familyoffices.vip',
    },
  },

  // 검색엔진 최적화
  verification: {
    google: '18ba3lEeatksZPWrS7AdbCYodbZgCg_frKSFPSJdQ0c',
    other: {
      'naver-site-verification': 'your-naver-verification-code',
      'yandex-verification': 'your-yandex-verification-code',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
          media="all"
        />

        {/* Performance Optimization */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* SEO 메타 태그 */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* 네이버 블로그 RSS */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="FamilyOffice S 뉴스"
          href="/rss.xml"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
