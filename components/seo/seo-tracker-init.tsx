/**
 * SEO 추적기 초기화 컴포넌트
 * 전체 사이트에서 SEO 성과 측정을 위한 글로벌 초기화
 */

'use client';

import { useEffect } from 'react';

import {
  initializeSEOTracker,
  type AnalyticsConfig,
} from '@/lib/seo/analytics-tracker';

/**
 * SEO 추적기 초기화 컴포넌트
 * 전체 사이트에서 SEO 성과 측정을 위한 글로벌 초기화
 */

// Extract environment variables at module level for client components
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface SEOTrackerInitProps {
  config?: Partial<AnalyticsConfig>;
}

/**
 * SEO 추적 시스템 초기화 컴포넌트
 * 루트 레이아웃에서 사용하여 전체 사이트 추적
 */
export function SEOTrackerInit({ config = {} }: SEOTrackerInitProps) {
  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window === 'undefined') return;

    // 기본 설정
    const defaultConfig: AnalyticsConfig = {
      ...(GA_MEASUREMENT_ID && { gaTrackingId: GA_MEASUREMENT_ID }),
      gscPropertyUrl: 'https://familyoffices.vip',
      customDomain: 'familyoffices.vip',
      trackingEnabled: IS_PRODUCTION,
      reportingInterval: 'daily',
      ...config,
    };

    try {
      // SEO 추적기 초기화
      const tracker = initializeSEOTracker(defaultConfig);

      // 실시간 추적 시작 (1분 간격)
      tracker.startRealTimeTracking(60000);

      // 페이지 로드 이벤트 추적
      tracker.trackEvent('page_view', {
        page_title: document.title,
        page_url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      // 페이지 가시성 변화 추적
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          tracker.trackEvent('page_exit', {
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
          });
        }
      });

      // 언로드 전 최종 데이터 전송
      window.addEventListener('beforeunload', () => {
        tracker.trackEvent('session_end', {
          page_url: window.location.href,
          session_duration: Date.now() - performance.timeOrigin,
          timestamp: new Date().toISOString(),
        });
      });

      console.log('✅ SEO 추적기가 성공적으로 초기화되었습니다.');
    } catch (error) {
      console.error('❌ SEO 추적기 초기화 중 오류 발생:', error);
    }
  }, [config]);

  // 실시간 메트릭 업데이트 리스너
  useEffect(() => {
    const handleMetricsUpdate = (event: CustomEvent) => {
      // 관리자 대시보드가 있다면 업데이트
      if (window.location.pathname.includes('/admin/seo')) {
        const detail = event.detail;
        console.log('📊 SEO 메트릭 업데이트:', detail);

        // 커스텀 이벤트로 대시보드에 알림
        window.dispatchEvent(
          new CustomEvent('dashboard-metrics-update', {
            detail: detail,
          })
        );
      }
    };

    window.addEventListener(
      'seo-metrics-update',
      handleMetricsUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        'seo-metrics-update',
        handleMetricsUpdate as EventListener
      );
    };
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}

/**
 * 페이지별 SEO 메타데이터 추적
 */
export function trackPageSEO(pagePath: string, keywords: string[] = []) {
  if (typeof window === 'undefined') return;

  const tracker = (window as any).seoTracker;
  if (!tracker) return;

  // 페이지별 SEO 메트릭 수집
  tracker.trackEvent('seo_page_analysis', {
    page_path: pagePath,
    target_keywords: keywords,
    meta_title: document.title,
    meta_description:
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') || '',
    canonical_url:
      document.querySelector('link[rel="canonical"]')?.getAttribute('href') ||
      window.location.href,
    h1_count: document.querySelectorAll('h1').length,
    h2_count: document.querySelectorAll('h2').length,
    internal_links: document.querySelectorAll('a[href^="/"]').length,
    external_links: document.querySelectorAll(
      'a[href^="http"]:not([href*="familyoffices.vip"])'
    ).length,
    image_count: document.querySelectorAll('img').length,
    word_count: document.body.innerText.split(/\s+/).length,
    timestamp: new Date().toISOString(),
  });
}

/**
 * 검색 엔진 랜딩 추적
 */
export function trackSearchEngineLanding() {
  if (typeof window === 'undefined') return;

  const tracker = (window as any).seoTracker;
  if (!tracker) return;

  const referrer = document.referrer;
  const searchEngines = {
    'google.com': 'google',
    'naver.com': 'naver',
    'daum.net': 'daum',
    'bing.com': 'bing',
    'yahoo.com': 'yahoo',
  };

  const searchEngine = Object.entries(searchEngines).find(([domain]) =>
    referrer.includes(domain)
  )?.[1];

  if (searchEngine) {
    // URL에서 검색 쿼리 추출 시도
    let searchQuery = '';
    try {
      const referrerUrl = new URL(referrer);
      searchQuery =
        referrerUrl.searchParams.get('q') ||
        referrerUrl.searchParams.get('query') ||
        referrerUrl.searchParams.get('search') ||
        '';
    } catch (e) {
      // URL 파싱 실패시 무시
    }

    tracker.trackEvent('organic_search_landing', {
      search_engine: searchEngine,
      search_query: searchQuery,
      landing_page: window.location.pathname,
      referrer_url: referrer,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * 컨텐츠 참여도 추적
 */
export function trackContentEngagement() {
  if (typeof window === 'undefined') return;

  const tracker = (window as any).seoTracker;
  if (!tracker) return;

  let startTime = Date.now();
  let isEngaged = true;

  // 스크롤 참여도 추적
  let maxScroll = 0;
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );
    maxScroll = Math.max(maxScroll, scrollPercent);
  };

  // 클릭 참여도 추적
  let clickCount = 0;
  const trackClicks = () => {
    clickCount++;
  };

  window.addEventListener('scroll', trackScroll, { passive: true });
  document.addEventListener('click', trackClicks);

  // 페이지 떠날 때 참여도 데이터 전송
  const sendEngagementData = () => {
    if (!isEngaged) return;
    isEngaged = false;

    const engagementTime = Date.now() - startTime;

    tracker.trackEvent('content_engagement', {
      page_url: window.location.pathname,
      engagement_time: engagementTime,
      max_scroll_percent: maxScroll,
      click_count: clickCount,
      page_title: document.title,
      content_type: getContentType(),
      timestamp: new Date().toISOString(),
    });

    // 이벤트 리스너 정리
    window.removeEventListener('scroll', trackScroll);
    document.removeEventListener('click', trackClicks);
  };

  window.addEventListener('beforeunload', sendEngagementData);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendEngagementData();
    }
  });
}

/**
 * 페이지 컨텐츠 타입 감지
 */
function getContentType(): string {
  const path = window.location.pathname;

  if (path.startsWith('/blog/')) return 'blog';
  if (path.startsWith('/solutions')) return 'solutions';
  if (path.startsWith('/services')) return 'services';
  if (path.startsWith('/program')) return 'program';
  if (path.startsWith('/seminar')) return 'seminar';
  if (path.startsWith('/recruit')) return 'recruit';
  if (path.startsWith('/about')) return 'about';
  if (path === '/') return 'homepage';

  return 'other';
}

export default SEOTrackerInit;
