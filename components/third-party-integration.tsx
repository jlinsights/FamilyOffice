'use client';

import { Analytics } from '@/components/analytics';
import { ChannelTalk } from '@/components/channel-talk';
import ExternalScripts from '@/components/external-scripts';
import { KakaoPixel } from '@/components/kakao/kakao-pixel';
import { KakaoSDK } from '@/components/kakao/kakao-sdk';
import { KoreanPerformanceTracker } from '@/components/korean-performance-tracker';
import { SEOModulePreloader } from '@/components/seo-module-preloader';
import { SEOTrackerInit } from '@/components/seo/seo-tracker-init';
import { Toaster } from '@/components/ui/sonner';
import { WebVitalsTracker } from '@/components/web-vitals-tracker';
import { createUserTrackingScript } from '@/lib/security/html-sanitizer';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function ThirdPartyIntegration() {
  return (
    <>
      <Toaster />
      <Analytics />
      <WebVitalsTracker />
      <KoreanPerformanceTracker />
      <KakaoPixel 
        pixelId={process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID || ''} 
        debug={process.env.NODE_ENV === 'development'} 
      />
      <KakaoSDK
        javascriptKey={process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || ''}
        debug={true}
      />
      <ExternalScripts />
      <ChannelTalk />
      
      {/* SEO 성과 추적 시스템 */}
      <SEOTrackerInit 
        config={{
          ...(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && { gaTrackingId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID }),
          customDomain: 'familyoffices.vip',
          trackingEnabled: process.env.NODE_ENV === 'production',
          reportingInterval: 'daily'
        }}
      />
      
      {/* SEO 모듈 백그라운드 프리로딩 */}
      <SEOModulePreloader />
      
      {/* 사용자 행동 추적 스크립트 */}
      <script
        dangerouslySetInnerHTML={{
          __html: createUserTrackingScript()
        }}
      />

      {/* Vercel Analytics & Speed Insights */}
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
