'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@/components/analytics/analytics';
import { ChannelTalk } from '@/components/analytics/channel-talk';
import ExternalScripts from '@/components/analytics/external-scripts';
import { KoreanPerformanceTracker } from '@/components/analytics/korean-performance-tracker';
import { WebVitalsTracker } from '@/components/analytics/web-vitals-tracker';
import { KakaoPixel } from '@/components/kakao/kakao-pixel';
import { KakaoSDK } from '@/components/kakao/kakao-sdk';
import { SEOModulePreloader } from '@/components/seo/seo-module-preloader';
import { SEOTrackerInit } from '@/components/seo/seo-tracker-init';
import { createUserTrackingScript } from '@/lib/security/html-sanitizer';

// Extract environment variables at module level for client components
// In client components, NEXT_PUBLIC_ env vars are replaced at build time
const KAKAO_PIXEL_ID = process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID || '';
const KAKAO_JAVASCRIPT_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ||
  'a1c218e1d0a96ce64bf734eafda420b1';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export function ThirdPartyIntegration() {
  return (
    <>
      <Toaster />
      <Analytics />
      <WebVitalsTracker />
      <KoreanPerformanceTracker />
      <KakaoPixel pixelId={KAKAO_PIXEL_ID} debug={IS_DEVELOPMENT} />
      <KakaoSDK javascriptKey={KAKAO_JAVASCRIPT_KEY} debug={IS_DEVELOPMENT} />
      <ExternalScripts />
      <ChannelTalk />

      {/* SEO 성과 추적 시스템 */}
      <SEOTrackerInit
        config={{
          ...(GA_MEASUREMENT_ID && { gaTrackingId: GA_MEASUREMENT_ID }),
          customDomain: 'familyoffices.vip',
          trackingEnabled: IS_PRODUCTION,
          reportingInterval: 'daily',
        }}
      />

      {/* SEO 모듈 백그라운드 프리로딩 */}
      <SEOModulePreloader />

      {/* 사용자 행동 추적 스크립트 */}
      <script
        dangerouslySetInnerHTML={{
          __html: createUserTrackingScript(),
        }}
      />

      {/* Vercel Analytics & Speed Insights */}
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
