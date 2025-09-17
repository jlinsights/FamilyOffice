/**
 * Core Web Vitals 측정 시스템
 * - LCP (Largest Contentful Paint): 로딩 성능
 * - FID (First Input Delay): 상호작용 반응성
 * - CLS (Cumulative Layout Shift): 시각적 안정성
 * - TTFB (Time to First Byte): 서버 응답 시간
 * - FCP (First Contentful Paint): 최초 콘텐츠 렌더링
 */

import { NextWebVitalsMetric } from 'next/app';

export interface WebVitalsMetric {
  id: string;
  name: 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  timestamp: number;
  url: string;
  userAgent: string;
  connection: string | null;
}

export interface WebVitalsData {
  metrics: WebVitalsMetric[];
  summary: {
    totalSamples: number;
    averageScores: {
      lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      fcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      ttfb: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
      inp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    };
    performanceScore: number;
  };
  pageBreakdown: Array<{
    url: string;
    sampleCount: number;
    averageLCP: number;
    averageFID: number;
    averageCLS: number;
    performanceGrade: string;
  }>;
}

class WebVitalsMonitoring {
  private metrics: WebVitalsMetric[] = [];
  private readonly maxMetrics = 10000; // 최대 10,000개 메트릭 저장
  private readonly storageKey = 'familyoffice_web_vitals';

  constructor() {
    this.loadStoredMetrics();
  }

  /**
   * 저장된 메트릭 로드
   */
  private loadStoredMetrics(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.metrics = data.metrics || [];
      }
    } catch (error) {
      console.warn('웹 바이탈 메트릭 로드 실패:', error);
      this.metrics = [];
    }
  }

  /**
   * 메트릭을 로컬 스토리지에 저장
   */
  private saveMetrics(): void {
    if (typeof window === 'undefined') return;

    try {
      const data = {
        metrics: this.metrics.slice(-this.maxMetrics),
        lastUpdated: Date.now(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('웹 바이탈 메트릭 저장 실패:', error);
    }
  }

  /**
   * Web Vitals 메트릭 등급 계산
   */
  private calculateRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * 네트워크 연결 정보 가져오기
   */
  private getConnectionInfo(): string | null {
    if (typeof window === 'undefined' || !('navigator' in window)) return null;

    const nav = navigator as Navigator & {
      connection?: { effectiveType: string; downlink: number; rtt: number };
      mozConnection?: { effectiveType: string; downlink: number; rtt: number };
      webkitConnection?: { effectiveType: string; downlink: number; rtt: number };
    };
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    if (!connection) return null;

    return JSON.stringify({
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
    });
  }

  /**
   * Next.js Web Vitals 메트릭 기록
   */
  recordMetric(metric: NextWebVitalsMetric): void {
    const webVitalsMetric: WebVitalsMetric = {
      id: metric.id,
      name: metric.name as 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB' | 'INP',
      value: metric.value,
      rating: this.calculateRating(metric.name, metric.value),
      delta: (metric as { delta?: number }).delta || 0,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      connection: this.getConnectionInfo(),
    };

    this.metrics.push(webVitalsMetric);

    // 메트릭 수 제한
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    this.saveMetrics();

    // 개발 환경에서 콘솔 로그
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Web Vitals - ${metric.name}:`, {
        value: `${metric.value}ms`,
        rating: webVitalsMetric.rating,
        url: webVitalsMetric.url,
      });
    }

    // 성능이 좋지 않을 때 경고
    if (webVitalsMetric.rating === 'poor') {
      console.warn(`⚠️ 성능 저하 감지 - ${metric.name}: ${metric.value}`, {
        url: webVitalsMetric.url,
        threshold: this.getThresholdInfo(metric.name),
      });
    }
  }

  /**
   * 임계값 정보 반환
   */
  private getThresholdInfo(name: string): { good: number; poor: number } | null {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    };

    return thresholds[name as keyof typeof thresholds] || null;
  }

  /**
   * 전체 웹 바이탈 데이터 분석
   */
  getAnalytics(timeWindowMs: number = 24 * 60 * 60 * 1000): WebVitalsData {
    const cutoff = Date.now() - timeWindowMs;
    const recentMetrics = this.metrics.filter(m => m.timestamp >= cutoff);

    if (recentMetrics.length === 0) {
      return {
        metrics: [],
        summary: {
          totalSamples: 0,
          averageScores: {
            lcp: { value: 0, rating: 'good' },
            fid: { value: 0, rating: 'good' },
            cls: { value: 0, rating: 'good' },
            fcp: { value: 0, rating: 'good' },
            ttfb: { value: 0, rating: 'good' },
            inp: { value: 0, rating: 'good' },
          },
          performanceScore: 100,
        },
        pageBreakdown: [],
      };
    }

    // 메트릭 타입별 평균 계산
    const averageScores = {
      lcp: this.calculateAverageForMetric(recentMetrics, 'LCP'),
      fid: this.calculateAverageForMetric(recentMetrics, 'FID'),
      cls: this.calculateAverageForMetric(recentMetrics, 'CLS'),
      fcp: this.calculateAverageForMetric(recentMetrics, 'FCP'),
      ttfb: this.calculateAverageForMetric(recentMetrics, 'TTFB'),
      inp: this.calculateAverageForMetric(recentMetrics, 'INP'),
    };

    // 전체 성능 점수 계산 (0-100 스케일)
    const performanceScore = this.calculatePerformanceScore(averageScores);

    // 페이지별 성능 분석
    const pageBreakdown = this.calculatePageBreakdown(recentMetrics);

    return {
      metrics: recentMetrics,
      summary: {
        totalSamples: recentMetrics.length,
        averageScores,
        performanceScore,
      },
      pageBreakdown,
    };
  }

  /**
   * 특정 메트릭의 평균값과 등급 계산
   */
  private calculateAverageForMetric(
    metrics: WebVitalsMetric[],
    metricName: WebVitalsMetric['name']
  ): { value: number; rating: 'good' | 'needs-improvement' | 'poor' } {
    const filteredMetrics = metrics.filter(m => m.name === metricName);
    
    if (filteredMetrics.length === 0) {
      return { value: 0, rating: 'good' };
    }

    const average = filteredMetrics.reduce((sum, m) => sum + m.value, 0) / filteredMetrics.length;
    const rating = this.calculateRating(metricName, average);

    return { value: Math.round(average), rating };
  }

  /**
   * 전체 성능 점수 계산 (Google Lighthouse 스타일)
   */
  private calculatePerformanceScore(averageScores: Record<string, { value: number; rating: string }>): number {
    const weights = {
      lcp: 0.25,  // 25%
      fid: 0.10,  // 10%
      cls: 0.25,  // 25%
      fcp: 0.15,  // 15%
      ttfb: 0.10, // 10%
      inp: 0.15,  // 15%
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(weights).forEach(([metric, weight]) => {
      const score = averageScores[metric];
      if (score && score.value > 0) {
        const normalizedScore = this.normalizeMetricScore(metric, score.value);
        totalScore += normalizedScore * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 100;
  }

  /**
   * 메트릭 값을 0-1 스케일로 정규화
   */
  private normalizeMetricScore(metric: string, value: number): number {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 },
      inp: { good: 200, poor: 500 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 1;

    if (value <= threshold.good) return 1;
    if (value >= threshold.poor) return 0;
    
    // Linear interpolation between good and poor
    return 1 - (value - threshold.good) / (threshold.poor - threshold.good);
  }

  /**
   * 페이지별 성능 분석
   */
  private calculatePageBreakdown(metrics: WebVitalsMetric[]): Array<{
    url: string;
    sampleCount: number;
    averageLCP: number;
    averageFID: number;
    averageCLS: number;
    performanceGrade: string;
  }> {
    const pageGroups = metrics.reduce((groups, metric) => {
      if (!groups[metric.url]) {
        groups[metric.url] = [];
      }
      groups[metric.url]!.push(metric);
      return groups;
    }, {} as Record<string, WebVitalsMetric[]>);

    return Object.entries(pageGroups).map(([url, pageMetrics]) => {
      const lcpMetrics = pageMetrics.filter(m => m.name === 'LCP');
      const fidMetrics = pageMetrics.filter(m => m.name === 'FID');
      const clsMetrics = pageMetrics.filter(m => m.name === 'CLS');

      const averageLCP = lcpMetrics.length > 0 
        ? lcpMetrics.reduce((sum, m) => sum + m.value, 0) / lcpMetrics.length 
        : 0;
      const averageFID = fidMetrics.length > 0 
        ? fidMetrics.reduce((sum, m) => sum + m.value, 0) / fidMetrics.length 
        : 0;
      const averageCLS = clsMetrics.length > 0 
        ? clsMetrics.reduce((sum, m) => sum + m.value, 0) / clsMetrics.length 
        : 0;

      // 페이지 등급 계산
      const lcpGrade = this.calculateRating('LCP', averageLCP);
      const fidGrade = this.calculateRating('FID', averageFID);
      const clsGrade = this.calculateRating('CLS', averageCLS);
      
      const grades = [lcpGrade, fidGrade, clsGrade];
      const poorCount = grades.filter(g => g === 'poor').length;
      const needsImprovementCount = grades.filter(g => g === 'needs-improvement').length;
      
      let performanceGrade = 'A';
      if (poorCount > 0) performanceGrade = 'F';
      else if (needsImprovementCount >= 2) performanceGrade = 'C';
      else if (needsImprovementCount === 1) performanceGrade = 'B';

      return {
        url,
        sampleCount: pageMetrics.length,
        averageLCP: Math.round(averageLCP),
        averageFID: Math.round(averageFID),
        averageCLS: Math.round(averageCLS * 1000) / 1000,
        performanceGrade,
      };
    }).sort((a, b) => b.sampleCount - a.sampleCount);
  }

  /**
   * 실시간 성능 알림 확인
   */
  getPerformanceAlerts(): Array<{
    type: 'critical' | 'warning' | 'info';
    metric: string;
    message: string;
    value: number;
    threshold: number;
  }> {
    const recentMetrics = this.metrics.slice(-100); // 최근 100개 메트릭
    const alerts: Array<{
      type: 'critical' | 'warning' | 'info';
      metric: string;
      message: string;
      value: number;
      threshold: number;
    }> = [];

    // 각 메트릭별 최근 평균 계산
    const metricTypes = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB', 'INP'] as const;
    
    metricTypes.forEach(metricType => {
      const recentForType = recentMetrics.filter(m => m.name === metricType);
      if (recentForType.length < 3) return; // 최소 3개 샘플 필요

      const average = recentForType.reduce((sum, m) => sum + m.value, 0) / recentForType.length;
      const rating = this.calculateRating(metricType, average);
      const thresholds = this.getThresholdInfo(metricType);

      if (!thresholds) return;

      if (rating === 'poor') {
        alerts.push({
          type: 'critical',
          metric: metricType,
          message: `${metricType}가 권장 기준을 크게 초과했습니다`,
          value: Math.round(average),
          threshold: thresholds.poor,
        });
      } else if (rating === 'needs-improvement') {
        alerts.push({
          type: 'warning',
          metric: metricType,
          message: `${metricType} 성능 개선이 필요합니다`,
          value: Math.round(average),
          threshold: thresholds.good,
        });
      }
    });

    return alerts;
  }

  /**
   * 메트릭 데이터 클리어
   */
  clearMetrics(): void {
    this.metrics = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  /**
   * 메트릭 데이터 내보내기
   */
  exportMetrics(): {
    data: WebVitalsData;
    exportedAt: string;
    userAgent: string;
  } {
    return {
      data: this.getAnalytics(),
      exportedAt: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    };
  }
}

// 싱글톤 인스턴스
export const webVitalsMonitoring = new WebVitalsMonitoring();

// Next.js reportWebVitals 함수
export function reportWebVitals(metric: NextWebVitalsMetric): void {
  webVitalsMonitoring.recordMetric(metric);

  // Google Analytics에 메트릭 전송 (선택적)
  if (typeof window !== 'undefined' && (window as any).gtag && process.env.NODE_ENV === 'production') {
    (window as any).gtag('event', metric.name, {
      custom_map: { metric_id: 'custom_metric' },
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: (metric as any).delta || 0,
    });
  }
}

// 편의 함수들
export const getWebVitalsAnalytics = (timeWindowMs?: number) => {
  return webVitalsMonitoring.getAnalytics(timeWindowMs);
};

export const getPerformanceAlerts = () => {
  return webVitalsMonitoring.getPerformanceAlerts();
};

export const clearWebVitalsData = () => {
  webVitalsMonitoring.clearMetrics();
};

export const exportWebVitalsData = () => {
  return webVitalsMonitoring.exportMetrics();
};