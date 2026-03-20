'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { KakaoFloatingButton } from '@/components/ui/kakao-floating-btn';
import { AdminAccessDeniedAlert } from '@/components/admin-access-denied-alert';
import { HubSpotIntegration } from '@/components/analytics/hubspot-integration';
import { PerformanceMonitor } from '@/components/analytics/performance-monitor';
import { ErrorBoundary } from '@/components/error-boundary';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { StructuredData } from '@/components/seo/structured-data';
import { SkipLinks } from '@/components/skip-links';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Providers } from '@/components/theme/providers';
import {
  createAnalyticsScript,
  createGTMScript,
} from '@/lib/security/html-sanitizer';
import { generateStructuredData } from '@/lib/seo/structured-data';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <div className="pt-20">
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold">로딩 중...</h1>
            <p className="text-muted-foreground mt-2">
              페이지를 준비하고 있습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Google Tag Manager */}
      {GTM_ID && (
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: createGTMScript(GTM_ID),
          }}
        />
      )}

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DB6TXRZLTK"
        strategy="lazyOnload"
      />
      <Script
        id="ga"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: createAnalyticsScript('G-DB6TXRZLTK'),
        }}
      />

      {/* Google Tag Manager (noscript) */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}

      <ErrorBoundary fallback={undefined}>
        <Providers>
          <div className="min-h-screen">
            <AdminAccessDeniedAlert />
            <Header isScrolled={isScrolled} />
            <SmoothScroll />
            <SkipLinks />
            <PerformanceMonitor />
            <HubSpotIntegration />

            {/* 구조화된 데이터 */}
            <StructuredData data={generateStructuredData('Organization')} />
            <StructuredData data={generateStructuredData('WebSite')} />

            <main id="main-content" className="pt-20">
              <HeroSection />
              <ServicesSection />
            </main>

            <Footer />
            <KakaoFloatingButton />
          </div>
        </Providers>
      </ErrorBoundary>
    </>
  );
}
