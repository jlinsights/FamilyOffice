/**
 * Korean Market Performance Monitoring
 * 한국 시장 맞춤형 성능 모니터링 시스템
 */

interface KoreanPerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionDelay: number;
  koreanFontLoadTime: number;
  mobileNetworkPerformance: {
    lte: number;
    wifi: number;
    slow3g: number;
  };
  regionLatency: {
    seoul: number;
    busan: number;
    international: number;
  };
  businessHoursPerformance: {
    peak: number; // 9AM-6PM KST
    offPeak: number;
  };
  contentDelivery: {
    staticAssets: number;
    dynamicContent: number;
    apiResponse: number;
  };
}

interface KoreanUserBehavior {
  sessionDuration: number;
  bounceRate: number;
  pageViews: number;
  conversionEvents: number;
  devicePreference: 'mobile' | 'desktop';
  preferredPages: string[];
  timeOnSite: number;
}

export class KoreanPerformanceMonitor {
  private static instance: KoreanPerformanceMonitor;
  private metrics: KoreanPerformanceMetrics[] = [];
  private userBehavior: KoreanUserBehavior[] = [];
  private businessHours = { start: 9, end: 18 }; // 9AM-6PM KST

  static getInstance(): KoreanPerformanceMonitor {
    if (!KoreanPerformanceMonitor.instance) {
      KoreanPerformanceMonitor.instance = new KoreanPerformanceMonitor();
    }
    return KoreanPerformanceMonitor.instance;
  }

  /**
   * 한국 시간대 기준 현재 시간 확인
   */
  private getCurrentKST(): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kst = new Date(utc + 9 * 3600000); // KST = UTC+9
    return kst;
  }

  /**
   * 비즈니스 시간 여부 확인
   */
  private isBusinessHours(): boolean {
    const kst = this.getCurrentKST();
    const hour = kst.getHours();
    const day = kst.getDay(); // 0=일요일, 6=토요일

    // 주중 9AM-6PM KST
    return (
      day >= 1 &&
      day <= 5 &&
      hour >= this.businessHours.start &&
      hour < this.businessHours.end
    );
  }

  /**
   * 한국 모바일 네트워크 조건 감지
   */
  private detectNetworkCondition(): 'wifi' | 'lte' | 'slow3g' | 'unknown' {
    if (typeof window === 'undefined' || !('connection' in navigator))
      return 'unknown';

    const connection = (navigator as any).connection;
    if (!connection) return 'unknown';

    const effectiveType = connection.effectiveType;

    switch (effectiveType) {
      case '4g':
        return 'lte';
      case '3g':
        return 'slow3g';
      case 'slow-2g':
      case '2g':
        return 'slow3g';
      default:
        return 'wifi';
    }
  }

  /**
   * 한국 폰트 로딩 성능 측정
   */
  private async measureKoreanFontLoad(): Promise<number> {
    const startTime = performance.now();

    try {
      // 한국 폰트 체크 (Noto Sans Korean, Malgun Gothic 등)
      await document.fonts.ready;

      // 한글 텍스트 렌더링 테스트
      const testElement = document.createElement('div');
      testElement.style.fontFamily =
        '"Noto Sans KR", "Malgun Gothic", sans-serif';
      testElement.style.visibility = 'hidden';
      testElement.style.position = 'absolute';
      testElement.textContent = '삼성 패밀리오피스 자산관리 서비스';

      document.body.appendChild(testElement);

      // 폰트 렌더링 완료까지 대기
      await new Promise(resolve => {
        const observer = new MutationObserver(() => {
          if (testElement.offsetHeight > 0) {
            observer.disconnect();
            resolve(true);
          }
        });
        observer.observe(testElement, { attributes: true, childList: true });
        setTimeout(resolve, 3000); // 3초 타임아웃
      });

      document.body.removeChild(testElement);
    } catch (error) {
      console.warn('한국 폰트 로딩 측정 실패:', error);
    }

    return performance.now() - startTime;
  }

  /**
   * 지역별 지연시간 측정
   */
  private async measureRegionLatency(): Promise<
    KoreanPerformanceMetrics['regionLatency']
  > {
    const regions = {
      seoul: '/api/ping',
      busan: '/api/ping',
      international: 'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js', // Global CDN for international check
    };

    const results: any = {};

    for (const [region, endpoint] of Object.entries(regions)) {
      const startTime = performance.now();
      try {
        await fetch(endpoint, {
          method: 'HEAD',
          cache: 'no-cache',
          signal: AbortSignal.timeout(5000), // 5초 타임아웃
        });
        results[region] = performance.now() - startTime;
      } catch (error) {
        results[region] = 5000; // 타임아웃 시 5초로 설정
      }
    }

    return results;
  }

  /**
   * API 응답 시간 측정
   */
  private async measureApiResponse(): Promise<number> {
    const startTime = performance.now();

    try {
      const response = await fetch('/api/financial/stocks?symbol=005930.KS', {
        cache: 'no-cache',
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        await response.json();
      }
    } catch (error) {
      console.warn('API 응답 측정 실패:', error);
    }

    return performance.now() - startTime;
  }

  /**
   * 성능 메트릭 수집
   */
  async collectPerformanceMetrics(): Promise<KoreanPerformanceMetrics> {
    const [fontLoadTime, regionLatency, apiResponse] = await Promise.all([
      this.measureKoreanFontLoad(),
      this.measureRegionLatency(),
      this.measureApiResponse(),
    ]);

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const networkCondition = this.detectNetworkCondition();

    const loadTime = navigation
      ? navigation.loadEventEnd - navigation.fetchStart
      : 0;
    const renderTime = navigation
      ? navigation.domContentLoadedEventEnd - navigation.fetchStart
      : 0;

    const metrics: KoreanPerformanceMetrics = {
      loadTime,
      renderTime,
      interactionDelay: this.measureInteractionDelay(),
      koreanFontLoadTime: fontLoadTime,
      mobileNetworkPerformance: {
        lte: networkCondition === 'lte' ? loadTime : 0,
        wifi: networkCondition === 'wifi' ? loadTime : 0,
        slow3g: networkCondition === 'slow3g' ? loadTime : 0,
      },
      regionLatency,
      businessHoursPerformance: {
        peak: this.isBusinessHours() ? loadTime : 0,
        offPeak: !this.isBusinessHours() ? loadTime : 0,
      },
      contentDelivery: {
        staticAssets: this.measureStaticAssetLoad(),
        dynamicContent: renderTime,
        apiResponse,
      },
    };

    this.metrics.push(metrics);
    return metrics;
  }

  /**
   * 상호작용 지연 측정
   */
  private measureInteractionDelay(): number {
    let interactionDelay = 0;

    try {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            interactionDelay = Math.max(
              interactionDelay,
              entry.processingStart - entry.startTime
            );
          }
        });
      });

      observer.observe({ type: 'first-input', buffered: true });
    } catch (error) {
      console.warn('상호작용 지연 측정 실패:', error);
    }

    return interactionDelay;
  }

  /**
   * 정적 자산 로딩 시간 측정
   */
  private measureStaticAssetLoad(): number {
    const resources = performance.getEntriesByType(
      'resource'
    ) as PerformanceResourceTiming[];
    const staticAssets = resources.filter(
      resource =>
        resource.name.includes('.css') ||
        resource.name.includes('.js') ||
        resource.name.includes('.png') ||
        resource.name.includes('.jpg') ||
        resource.name.includes('.svg')
    );

    if (staticAssets.length === 0) return 0;

    const totalLoadTime = staticAssets.reduce(
      (sum, asset) => sum + (asset.responseEnd - asset.requestStart),
      0
    );

    return totalLoadTime / staticAssets.length;
  }

  /**
   * 사용자 행동 추적
   */
  trackUserBehavior(): void {
    const sessionStart = Date.now();
    const pageViews = new Set<string>();
    let interactionCount = 0;

    // 페이지 뷰 추적
    pageViews.add(window.location.pathname);

    // 상호작용 추적
    ['click', 'scroll', 'keydown'].forEach(eventType => {
      document.addEventListener(
        eventType,
        () => {
          interactionCount++;
        },
        { passive: true }
      );
    });

    // 페이지 종료 시 데이터 수집
    window.addEventListener('beforeunload', () => {
      const behavior: KoreanUserBehavior = {
        sessionDuration: Date.now() - sessionStart,
        bounceRate: pageViews.size === 1 ? 1 : 0,
        pageViews: pageViews.size,
        conversionEvents: interactionCount,
        devicePreference: window.innerWidth <= 768 ? 'mobile' : 'desktop',
        preferredPages: Array.from(pageViews),
        timeOnSite: Date.now() - sessionStart,
      };

      this.userBehavior.push(behavior);

      // 성능 데이터 전송
      this.sendPerformanceData(behavior);
    });
  }

  /**
   * 성능 데이터 전송
   */
  private sendPerformanceData(behavior: KoreanUserBehavior): void {
    const data = {
      metrics: this.metrics,
      userBehavior: behavior,
      timestamp: new Date().toISOString(),
      timezone: 'Asia/Seoul',
      market: 'korean',
      businessHours: this.isBusinessHours(),
    };

    // Vercel Analytics로 데이터 전송
    try {
      fetch('/api/analytics/korean-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true, // 페이지 언로드 시에도 전송 보장
      }).catch(error => {
        console.warn('성능 데이터 전송 실패:', error);
      });
    } catch (error) {
      console.warn('성능 데이터 전송 실패:', error);
    }
  }

  /**
   * 실시간 성능 모니터링 시작
   */
  startMonitoring(): void {
    // 초기 메트릭 수집
    this.collectPerformanceMetrics();

    // 사용자 행동 추적 시작
    this.trackUserBehavior();

    // 5분마다 성능 메트릭 수집
    setInterval(
      () => {
        this.collectPerformanceMetrics();
      },
      5 * 60 * 1000
    );

    // 개발 환경에서 성능 정보 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('🇰🇷 한국 시장 성능 모니터링이 시작되었습니다.');
      console.log(
        '📊 비즈니스 시간:',
        this.isBusinessHours() ? '업무시간' : '업무외시간'
      );
      console.log('📱 네트워크 상태:', this.detectNetworkCondition());
    }
  }

  /**
   * 성능 리포트 생성
   */
  generatePerformanceReport(): {
    summary: any;
    recommendations: string[];
  } {
    if (this.metrics.length === 0) {
      return {
        summary: {},
        recommendations: ['아직 충분한 데이터가 수집되지 않았습니다.'],
      };
    }

    const avgLoadTime =
      this.metrics.reduce((sum, m) => sum + m.loadTime, 0) /
      this.metrics.length;
    const avgFontLoadTime =
      this.metrics.reduce((sum, m) => sum + m.koreanFontLoadTime, 0) /
      this.metrics.length;

    const recommendations: string[] = [];

    if (avgLoadTime > 3000) {
      recommendations.push(
        '페이지 로딩 시간이 3초를 초과합니다. 이미지 최적화와 코드 분할을 고려하세요.'
      );
    }

    if (avgFontLoadTime > 1000) {
      recommendations.push(
        '한국 폰트 로딩이 1초를 초과합니다. 폰트 최적화를 권장합니다.'
      );
    }

    return {
      summary: {
        평균로딩시간: `${avgLoadTime.toFixed(0)}ms`,
        한국폰트로딩: `${avgFontLoadTime.toFixed(0)}ms`,
        측정횟수: this.metrics.length,
        마지막측정: new Date().toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
      },
      recommendations:
        recommendations.length > 0
          ? recommendations
          : ['현재 성능이 양호합니다.'],
    };
  }
}

// 싱글톤 인스턴스 내보내기
export const koreanPerformanceMonitor = KoreanPerformanceMonitor.getInstance();
