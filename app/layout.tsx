import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/error-boundary';
import { Analytics } from '@/components/analytics';
import ExternalScripts from '@/components/external-scripts';
// import { AIChatFloating } from '@/components/ai-chat-floating';
import { CalComFloating } from '@/components/cal-com-floating';

import { defaultMetadata } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...defaultMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://familyoffices.vip" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.placename" content="Seoul" />
        <meta name="geo.position" content="37.5665;126.9780" />
        <meta name="ICBM" content="37.5665, 126.9780" />
        
        {/* 네이버/다음 SEO */}
        <meta name="subject" content="패밀리오피스 가업승계 자산관리" />
        <meta name="classification" content="Business" />
        <meta name="distribution" content="Korea" />
        <meta name="language" content="Korean" />
        <meta name="target" content="CEO, 중소기업, 중견기업, 자산가" />
        
        {/* Google SEO */}
        <meta name="google" content="notranslate" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* 모바일 최적화 */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* 추가 Open Graph */}
        <meta property="og:country-name" content="South Korea" />
        <meta property="og:postal-code" content="04527" />
        <meta property="og:latitude" content="37.5665" />
        <meta property="og:longitude" content="126.9780" />
        
        {/* 검색엔진 우선순위 */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* 스키마 마크업 추가 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "패밀리오피스 FamilyOffice S",
              "description": "패밀리오피스 가업승계 전문. 중소중견기업 CEO 자산관리",
              "url": "https://familyoffices.vip",
              "telephone": "+82-502-5550-8700",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "서울",
                "addressRegion": "서울특별시",
                "addressCountry": "KR"
              },
              "areaServed": "대한민국",
              "availableLanguage": ["Korean"],
              "priceRange": "₩₩₩₩"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* <AIChatFloating /> */}
            <CalComFloating />
            <Toaster />
            <Analytics />
            <ExternalScripts />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}