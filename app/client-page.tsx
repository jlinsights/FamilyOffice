'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

import { ErrorBoundary } from '@/components/error-boundary';
import { AdminAccessDeniedAlert } from '@/components/admin-access-denied-alert';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SmoothScroll } from '@/components/smooth-scroll';
import { StructuredData } from '@/components/structured-data';
import { SkipLinks } from '@/components/skip-links';
import { PerformanceMonitor } from '@/components/performance-monitor';
import { HubSpotIntegration } from '@/components/hubspot-integration';
import { Providers } from '@/components/providers';


export default function ClientPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <div className="pt-20">
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold">로딩 중...</h1>
            <p className="text-muted-foreground mt-2">페이지를 준비하고 있습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Google Tag Manager */}
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

      {/* Google Analytics */}
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

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MP3HPPMN"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <ErrorBoundary>
        <Providers>
          <div className="min-h-screen">
            <AdminAccessDeniedAlert />
            <Header />
            <SmoothScroll />
            <SkipLinks />
            <PerformanceMonitor />
            <HubSpotIntegration />

            {/* 구조화된 데이터 */}
            <StructuredData />

            <main id="main-content" className="pt-20">
              <HeroSection />
              <ServicesSection />
            </main>

            <Footer />
          </div>
        </Providers>
      </ErrorBoundary>
    </>
  );
} 