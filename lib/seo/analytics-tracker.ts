/**
 * SEO 성과 측정 및 분석 추적 시스템
 * Google Analytics, Search Console 연동 및 자체 메트릭 수집
 */

export interface SEOMetrics {
  // 기본 트래픽 메트릭
  organicTraffic: {
    total: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
  };

  // 키워드 성과
  keywordPerformance: {
    totalKeywords: number;
    topRankings: Record<
      string,
      {
        position: number;
        previousPosition: number;
        clicks: number;
        impressions: number;
        ctr: number;
      }
    >;
    improvementOpportunities: string[];
  };

  // 기술적 SEO
  technicalSEO: {
    pageSpeed: {
      mobile: number;
      desktop: number;
    };
    coreWebVitals: {
      lcp: number; // Largest Contentful Paint
      fid: number; // First Input Delay
      cls: number; // Cumulative Layout Shift
    };
    crawlErrors: number;
    indexedPages: number;
  };

  // 컨텐츠 성과
  contentPerformance: {
    totalPages: number;
    averageDwellTime: number;
    bounceRate: number;
    pagesPerSession: number;
    topPerformingPages: Array<{
      url: string;
      traffic: number;
      conversionRate: number;
      seoScore: number;
    }>;
  };

  // 전환 및 비즈니스 메트릭
  conversionMetrics: {
    organicConversions: number;
    conversionRate: number;
    revenue: number;
    costPerAcquisition: number;
    roi: number;
  };
}

export interface AnalyticsConfig {
  gaTrackingId?: string;
  gscPropertyUrl?: string;
  customDomain: string;
  trackingEnabled: boolean;
  reportingInterval: 'daily' | 'weekly' | 'monthly';
}

/**
 * SEO 분석 추적 클래스
 */
export class SEOAnalyticsTracker {
  private config: AnalyticsConfig;
  private metricsHistory: SEOMetrics[] = [];

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.initializeTracking();
  }

  /**
   * 추적 시스템 초기화
   */
  private initializeTracking(): void {
    if (typeof window !== 'undefined' && this.config.trackingEnabled) {
      // Google Analytics 4 초기화
      if (this.config.gaTrackingId) {
        this.initializeGA4();
      }

      // 커스텀 이벤트 리스너 설정
      this.setupCustomEventTracking();

      // Core Web Vitals 측정
      this.measureCoreWebVitals();
    }
  }

  /**
   * Google Analytics 4 초기화
   */
  private initializeGA4(): void {
    if (!this.config.gaTrackingId) return;

    // gtag 스크립트 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaTrackingId}`;
    document.head.appendChild(script);

    // gtag 초기화
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      if (window.dataLayer) {
        window.dataLayer.push(args);
      }
    }
    gtag('js', new Date());
    gtag('config', this.config.gaTrackingId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        custom_parameter_1: 'seo_source',
        custom_parameter_2: 'content_category',
      },
    });

    // SEO 관련 커스텀 이벤트 설정
    this.setupSEOEvents();
  }

  /**
   * SEO 관련 이벤트 추적 설정
   */
  private setupSEOEvents(): void {
    // 검색 엔진 랜딩 추적
    if (
      document.referrer.includes('google.com') ||
      document.referrer.includes('naver.com') ||
      document.referrer.includes('daum.net')
    ) {
      this.trackEvent('seo_landing', {
        search_engine: this.getSearchEngine(document.referrer),
        landing_page: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }

    // 내부 링크 클릭 추적
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      if (link && this.isInternalLink(link.href)) {
        this.trackEvent('internal_link_click', {
          from_page: window.location.pathname,
          to_page: new URL(link.href).pathname,
          link_text: link.textContent?.trim() || '',
          link_position: this.getLinkPosition(link),
        });
      }
    });

    // 스크롤 깊이 추적
    this.trackScrollDepth();

    // 컨텐츠 읽기 시간 추적
    this.trackReadingTime();
  }

  /**
   * 커스텀 이벤트 추적
   */
  trackEvent(eventName: string, parameters: Record<string, any>): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
      });
    }

    // 자체 로깅 시스템
    this.logCustomEvent(eventName, parameters);
  }

  /**
   * Core Web Vitals 측정
   */
  private measureCoreWebVitals(): void {
    // LCP (Largest Contentful Paint) 측정
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];

      if (lastEntry) {
        this.trackEvent('core_web_vital_lcp', {
          value: lastEntry.startTime,
          rating: this.getRating(lastEntry.startTime, [2500, 4000]),
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay) 측정
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        const fidEntry = entry as any; // Type assertion for PerformanceEventTiming
        if (fidEntry.processingStart && fidEntry.startTime) {
          this.trackEvent('core_web_vital_fid', {
            value: fidEntry.processingStart - fidEntry.startTime,
            rating: this.getRating(
              fidEntry.processingStart - fidEntry.startTime,
              [100, 300]
            ),
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift) 측정
    let clsValue = 0;
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        const clsEntry = entry as any; // Type assertion for PerformanceLayoutShift
        if (!clsEntry.hadRecentInput && clsEntry.value) {
          clsValue += clsEntry.value;
        }
      });

      this.trackEvent('core_web_vital_cls', {
        value: clsValue,
        rating: this.getRating(clsValue, [0.1, 0.25]),
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * 스크롤 깊이 추적
   */
  private trackScrollDepth(): void {
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          this.trackEvent('scroll_depth', {
            percent: threshold,
            page_url: window.location.pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }

  /**
   * 읽기 시간 추적
   */
  private trackReadingTime(): void {
    const startTime = Date.now();
    let lastActiveTime = startTime;
    let totalActiveTime = 0;

    const updateActiveTime = () => {
      const now = Date.now();
      if (now - lastActiveTime < 5000) {
        // 5초 이내 활동이 있었다면
        totalActiveTime += now - lastActiveTime;
      }
      lastActiveTime = now;
    };

    // 활동 감지 이벤트들
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(
      event => {
        document.addEventListener(event, updateActiveTime, { passive: true });
      }
    );

    // 페이지 떠날 때 읽기 시간 전송
    window.addEventListener('beforeunload', () => {
      updateActiveTime();
      const readingTime = Math.round(totalActiveTime / 1000);

      if (readingTime > 10) {
        // 10초 이상 읽었을 때만 추적
        this.trackEvent('reading_time', {
          duration_seconds: readingTime,
          page_url: window.location.pathname,
          page_title: document.title,
        });
      }
    });
  }

  /**
   * SEO 메트릭 수집
   */
  async collectSEOMetrics(): Promise<SEOMetrics> {
    const metrics: SEOMetrics = {
      organicTraffic: await this.getOrganicTrafficData(),
      keywordPerformance: await this.getKeywordPerformanceData(),
      technicalSEO: await this.getTechnicalSEOData(),
      contentPerformance: await this.getContentPerformanceData(),
      conversionMetrics: await this.getConversionMetricsData(),
    };

    // 메트릭 히스토리에 추가
    this.metricsHistory.push({
      ...metrics,
      timestamp: new Date().toISOString(),
    } as SEOMetrics & { timestamp: string });

    return metrics;
  }

  /**
   * 유기적 트래픽 데이터 수집
   */
  private async getOrganicTrafficData(): Promise<SEOMetrics['organicTraffic']> {
    // 실제 구현에서는 Google Analytics API 호출
    // 여기서는 모의 데이터 반환
    const currentTraffic = 15680;
    const previousTraffic = 14200;
    const change = ((currentTraffic - previousTraffic) / previousTraffic) * 100;

    return {
      total: currentTraffic,
      change: Math.round(change * 100) / 100,
      trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable',
    };
  }

  /**
   * 키워드 성과 데이터 수집
   */
  private async getKeywordPerformanceData(): Promise<
    SEOMetrics['keywordPerformance']
  > {
    // 실제 구현에서는 Google Search Console API 호출
    return {
      totalKeywords: 145,
      topRankings: {
        패밀리오피스: {
          position: 2,
          previousPosition: 3,
          clicks: 450,
          impressions: 3200,
          ctr: 14.1,
        },
        자산관리서비스: {
          position: 5,
          previousPosition: 7,
          clicks: 280,
          impressions: 2100,
          ctr: 13.3,
        },
        기업승계: {
          position: 3,
          previousPosition: 4,
          clicks: 320,
          impressions: 1800,
          ctr: 17.8,
        },
      },
      improvementOpportunities: [
        '포트폴리오관리 (15위 → 10위 목표)',
        '프라이빗뱅킹 (12위 → 5위 목표)',
        '세무최적화 (8위 → 3위 목표)',
      ],
    };
  }

  /**
   * 기술적 SEO 데이터 수집
   */
  private async getTechnicalSEOData(): Promise<SEOMetrics['technicalSEO']> {
    // 실제 구현에서는 PageSpeed Insights API 등 호출
    return {
      pageSpeed: {
        mobile: 85,
        desktop: 92,
      },
      coreWebVitals: {
        lcp: 2.1,
        fid: 85,
        cls: 0.08,
      },
      crawlErrors: 2,
      indexedPages: 127,
    };
  }

  /**
   * 컨텐츠 성과 데이터 수집
   */
  private async getContentPerformanceData(): Promise<
    SEOMetrics['contentPerformance']
  > {
    return {
      totalPages: 127,
      averageDwellTime: 285,
      bounceRate: 38,
      pagesPerSession: 4.1,
      topPerformingPages: [
        {
          url: '/solutions',
          traffic: 3200,
          conversionRate: 4.2,
          seoScore: 92,
        },
        {
          url: '/business-succession-strategy',
          traffic: 2100,
          conversionRate: 3.8,
          seoScore: 88,
        },
        {
          url: '/blog/family-office-guide',
          traffic: 1800,
          conversionRate: 2.1,
          seoScore: 85,
        },
      ],
    };
  }

  /**
   * 전환 메트릭 데이터 수집
   */
  private async getConversionMetricsData(): Promise<
    SEOMetrics['conversionMetrics']
  > {
    return {
      organicConversions: 28,
      conversionRate: 3.4,
      revenue: 140000000, // 1.4억원
      costPerAcquisition: 85000, // 8만 5천원
      roi: 420,
    };
  }

  /**
   * 유틸리티 메서드들
   */
  private getSearchEngine(referrer: string): string {
    if (referrer.includes('google.com')) return 'google';
    if (referrer.includes('naver.com')) return 'naver';
    if (referrer.includes('daum.net')) return 'daum';
    return 'unknown';
  }

  private isInternalLink(href: string): boolean {
    try {
      const url = new URL(href);
      return url.hostname === window.location.hostname;
    } catch {
      return false;
    }
  }

  private getLinkPosition(link: HTMLElement): string {
    const rect = link.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top < viewportHeight * 0.3) return 'top';
    if (rect.top < viewportHeight * 0.7) return 'middle';
    return 'bottom';
  }

  private getRating(
    value: number,
    thresholds: [number, number]
  ): 'good' | 'needs-improvement' | 'poor' {
    if (value <= thresholds[0]) return 'good';
    if (value <= thresholds[1]) return 'needs-improvement';
    return 'poor';
  }

  private logCustomEvent(
    eventName: string,
    parameters: Record<string, any>
  ): void {
    // 자체 로깅 시스템 구현
    const logEntry = {
      event: eventName,
      parameters,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // 로컬 스토리지에 임시 저장 (실제 구현에서는 서버로 전송)
    const logs = JSON.parse(localStorage.getItem('seo_events') || '[]');
    logs.push(logEntry);

    // 최대 100개 이벤트만 저장
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }

    localStorage.setItem('seo_events', JSON.stringify(logs));
  }

  /**
   * 커스텀 이벤트 추적 설정
   */
  private setupCustomEventTracking(): void {
    // 폼 제출 추적
    document.addEventListener('submit', event => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || form.className || 'unknown';

      this.trackEvent('form_submission', {
        form_id: formId,
        page_url: window.location.pathname,
      });
    });

    // CTA 버튼 클릭 추적
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const button = target.closest('button, .cta-button, [data-cta]');

      if (button) {
        this.trackEvent('cta_click', {
          button_text: button.textContent?.trim() || '',
          button_id: button.id || '',
          page_url: window.location.pathname,
        });
      }
    });

    // 검색 기능 사용 추적
    const searchInputs = document.querySelectorAll(
      'input[type="search"], input[name*="search"], input[placeholder*="검색"]'
    );
    searchInputs.forEach(input => {
      input.addEventListener('keypress', event => {
        if ((event as KeyboardEvent).key === 'Enter') {
          this.trackEvent('site_search', {
            search_term: (input as HTMLInputElement).value,
            page_url: window.location.pathname,
          });
        }
      });
    });
  }

  /**
   * 메트릭 히스토리 조회
   */
  getMetricsHistory(): SEOMetrics[] {
    return this.metricsHistory;
  }

  /**
   * 실시간 성과 업데이트
   */
  startRealTimeTracking(interval: number = 60000): void {
    setInterval(async () => {
      try {
        const metrics = await this.collectSEOMetrics();

        // 실시간 대시보드 업데이트 이벤트 발생
        const event = new CustomEvent('seo-metrics-update', {
          detail: metrics,
        });
        window.dispatchEvent(event);
      } catch (error) {
        console.error('실시간 SEO 메트릭 수집 오류:', error);
      }
    }, interval);
  }
}

/**
 * 글로벌 SEO 추적기 인스턴스
 */
export function initializeSEOTracker(
  config: AnalyticsConfig
): SEOAnalyticsTracker {
  const tracker = new SEOAnalyticsTracker(config);

  // 글로벌 객체에 등록
  if (typeof window !== 'undefined') {
    window.seoTracker = tracker;
  }

  return tracker;
}

// 타입 확장 - global.d.ts에서 이미 정의됨
// declare global {
//   interface Window {
//     seoTracker?: SEOAnalyticsTracker;
//   }
// }

export default SEOAnalyticsTracker;
