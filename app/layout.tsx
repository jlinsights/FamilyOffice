import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import { ErrorBoundary } from "@/components/error-boundary"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { SkipLinks } from "@/components/skip-links"
import { defaultMetadata } from "@/lib/seo"
import Script from "next/script"
import { HubSpotIntegration } from "@/components/hubspot-integration"

export const metadata: Metadata = {
  ...defaultMetadata,
  
  // 한국 검색엔진 최적화
  other: {
    ...defaultMetadata.other,
    // 네이버 사이트 검증 (실제 코드로 교체 필요)
    "naver-site-verification": "your-naver-verification-code",
    // 네이버 블로그 RSS
    "NaverBot": "All",
    // 다음 검색엔진
    "Daumoa": "index,follow",
    // 구글 사이트 검증
    "google-site-verification": "18ba3lEeatksZPWrS7AdbCYodbZgCg_frKSFPSJdQ0c",
    // 지역 설정
    "geo.region": "KR",
    "geo.placename": "Seoul",
    "geo.position": "37.5665;126.9780",
    "ICBM": "37.5665, 126.9780",
    // 언어 설정
    "language": "ko",
    "content-language": "ko",
    // 비즈니스 정보
    "business:contact_data:street_address": "서울특별시 강남구 테헤란로 123",
    "business:contact_data:locality": "강남구",
    "business:contact_data:region": "서울특별시",
    "business:contact_data:postal_code": "06234",
    "business:contact_data:country_name": "대한민국",
    "business:contact_data:phone_number": "+82-2-1234-5678",
    "business:contact_data:email": "contact@familyoffices.vip",
    // 소셜 미디어
    "twitter:creator": "@familyoffices",
    "twitter:site": "@familyoffices",
    // 추가 메타데이터
    "author": "FamilyOffice S",
    "copyright": "© 2024 FamilyOffice S. All rights reserved.",
    "distribution": "global",
    "rating": "general",
    "revisit-after": "7 days",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
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
    }
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Playfair Display with optimized loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" 
          rel="stylesheet" 
          media="all"
        />
        
        {/* Google Tag Manager - Optimized Loading */}
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MP3HPPMN');
            `,
          }}
        />
        
        {/* Google Analytics - Deferred Loading */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DB6TXRZLTK"
          strategy="lazyOnload"
        />
        <Script id="ga" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DB6TXRZLTK', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: false
            });
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>
        
        {/* Flaticon CSS - Non-blocking load */}
        <Script
          id="flaticon-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css';
              document.head.appendChild(link);
            `,
          }}
        />
        
        {/* Mailchimp */}
        <Script
          id="mcjs"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/af249fedaa60d836835ac49da/129619c56cf11f88a1c245cd6.js");
            `,
          }}
        />
        
        {/* HubSpot Form Integration */}
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js.hs-scripts.com/24900000.js"
        />
        
        {/* Channel Talk */}
        <Script
          id="channel-talk"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

              ChannelIO('boot', {
                "pluginKey": "4c0cca0c-7cf1-4441-8f11-3e04995a4a78"
              });
            `,
          }}
        />
        
        {/* Performance Optimization - DNS Prefetch & Preconnect */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cdn.channel.io" />
        <link rel="dns-prefetch" href="//js.hs-scripts.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* 추가 SEO 메타 태그 */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* 폰트 최적화 - Google Fonts 비활성화 */}
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* 네이버 블로그 RSS */}
        <link rel="alternate" type="application/rss+xml" title="FamilyOffice S 뉴스" href="/rss.xml" />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MP3HPPMN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <ErrorBoundary fallback={undefined}>
          <Providers>
            <SkipLinks />
            <PerformanceMonitor />
            <HubSpotIntegration />
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
