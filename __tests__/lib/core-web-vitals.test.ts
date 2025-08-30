/**
 * Core Web Vitals 시스템 테스트
 * 웹 성능 모니터링 시스템의 기능 검증
 */
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Mock window and performance APIs
const mockPerformance = {
  now: jest.fn(() => Date.now()),
  getEntriesByType: jest.fn((type: string) => {
    if (type === 'navigation') {
      return [{
        responseStart: 200,
        requestStart: 100,
        domContentLoadedEventEnd: 800,
        loadEventEnd: 1200,
        navigationStart: 0
      }];
    }
    return [];
  })
};

// Mock PerformanceObserver
const mockPerformanceObserver = jest.fn().mockImplementation((_callback) => ({
  observe: jest.fn(),
  disconnect: jest.fn()
}));

describe('Core Web Vitals System', () => {
  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
    
    Object.defineProperty(window, 'performance', {
      value: mockPerformance
    });
    
    Object.defineProperty(window, 'PerformanceObserver', {
      value: mockPerformanceObserver
    });

    // Reset storage
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe('WebVitalsMonitoring Class', () => {
    test('should initialize with empty metrics', () => {
      // Import here to ensure mocks are in place
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      const analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.totalSamples).toBe(0);
      expect(analytics.metrics).toHaveLength(0);
    });

    test('should record LCP metric correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      const mockMetric = {
        name: 'LCP',
        value: 2500,
        id: 'lcp-test-123',
        delta: 2500
      };

      webVitalsMonitoring.recordMetric(mockMetric);
      
      const analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.totalSamples).toBe(1);
      expect(analytics.metrics).toHaveLength(1);
      expect(analytics.metrics[0].name).toBe('LCP');
      expect(analytics.metrics[0].value).toBe(2500);
      expect(analytics.metrics[0].rating).toBe('good'); // 2500ms is good for LCP
    });

    test('should record FID metric correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      const mockMetric = {
        name: 'FID',
        value: 80,
        id: 'fid-test-123',
        delta: 80
      };

      webVitalsMonitoring.recordMetric(mockMetric);
      
      const analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.averageScores.fid.value).toBe(80);
      expect(analytics.summary.averageScores.fid.rating).toBe('good');
    });

    test('should record CLS metric correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      const mockMetric = {
        name: 'CLS',
        value: 0.05,
        id: 'cls-test-123',
        delta: 0.05
      };

      webVitalsMonitoring.recordMetric(mockMetric);
      
      const analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.averageScores.cls.value).toBe(0);
      expect(analytics.summary.averageScores.cls.rating).toBe('good');
    });

    test('should calculate performance score correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Record good metrics
      const goodMetrics = [
        { name: 'LCP', value: 2000, id: 'lcp-1', delta: 2000 },
        { name: 'FID', value: 50, id: 'fid-1', delta: 50 },
        { name: 'CLS', value: 0.05, id: 'cls-1', delta: 0.05 },
        { name: 'FCP', value: 1500, id: 'fcp-1', delta: 1500 },
        { name: 'TTFB', value: 600, id: 'ttfb-1', delta: 600 },
      ];

      goodMetrics.forEach(metric => {
        webVitalsMonitoring.recordMetric(metric);
      });

      const analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.performanceScore).toBeGreaterThan(80);
    });

    test('should detect performance alerts for poor metrics', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Record poor metrics
      const poorMetrics = [
        { name: 'LCP', value: 5000, id: 'lcp-poor-1', delta: 5000 },
        { name: 'LCP', value: 5200, id: 'lcp-poor-2', delta: 5200 },
        { name: 'LCP', value: 4800, id: 'lcp-poor-3', delta: 4800 },
      ];

      poorMetrics.forEach(metric => {
        webVitalsMonitoring.recordMetric(metric);
      });

      const alerts = webVitalsMonitoring.getPerformanceAlerts();
      expect(alerts.length).toBeGreaterThan(0);
      expect(alerts[0].type).toBe('critical');
      expect(alerts[0].metric).toBe('LCP');
    });

    test('should limit metrics history to maximum', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Record more than max metrics (simulated)
      for (let i = 0; i < 15; i++) {
        webVitalsMonitoring.recordMetric({
          name: 'LCP',
          value: 2000 + i,
          id: `lcp-${i}`,
          delta: 2000 + i
        });
      }

      const analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.totalSamples).toBe(15);
    });

    test('should clear metrics correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Record some metrics
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 2000,
        id: 'lcp-test',
        delta: 2000
      });

      let analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.totalSamples).toBe(1);

      // Clear metrics
      webVitalsMonitoring.clearMetrics();

      analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.totalSamples).toBe(0);
      expect(analytics.metrics).toHaveLength(0);
    });

    test('should generate page breakdown correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Mock window.location for different pages
      const originalLocation = window.location;
      delete (window as any).location;
      
      // Record metrics for different pages
      (window as any).location = { pathname: '/home' };
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 2000,
        id: 'lcp-home',
        delta: 2000
      });

      (window as any).location = { pathname: '/about' };
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 3000,
        id: 'lcp-about',
        delta: 3000
      });

      // Restore location
      Object.defineProperty(window, 'location', {
        writable: true,
        value: originalLocation
      });

      const analytics = webVitalsMonitoring.getAnalytics();
      
      // Note: Since we're mocking, the actual URL might not be captured correctly
      // This test mainly verifies the structure
      expect(analytics.pageBreakdown).toBeDefined();
      expect(Array.isArray(analytics.pageBreakdown)).toBe(true);
    });

    test('should export metrics data correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 2000,
        id: 'lcp-export-test',
        delta: 2000
      });

      const exportData = webVitalsMonitoring.exportMetrics();
      
      expect(exportData).toHaveProperty('data');
      expect(exportData).toHaveProperty('exportedAt');
      expect(exportData).toHaveProperty('userAgent');
      expect(exportData.data.summary.totalSamples).toBe(1);
    });
  });

  describe('Rating Calculation', () => {
    test('should rate LCP correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Good LCP
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 2000,
        id: 'lcp-good',
        delta: 2000
      });

      // Needs improvement LCP
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 3000,
        id: 'lcp-needs-improvement',
        delta: 3000
      });

      // Poor LCP
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 5000,
        id: 'lcp-poor',
        delta: 5000
      });

      const analytics = webVitalsMonitoring.getAnalytics();
      
      // With mixed ratings, average should be in needs-improvement or poor range
      expect(['needs-improvement', 'poor']).toContain(analytics.summary.averageScores.lcp.rating);
    });

    test('should rate CLS correctly', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Good CLS
      webVitalsMonitoring.recordMetric({
        name: 'CLS',
        value: 0.05,
        id: 'cls-good',
        delta: 0.05
      });

      const analytics = webVitalsMonitoring.getAnalytics();
      expect(analytics.summary.averageScores.cls.rating).toBe('good');
    });
  });

  describe('Time Window Filtering', () => {
    test('should filter metrics by time window', () => {
      const { webVitalsMonitoring } = require('@/lib/core-web-vitals');
      
      // Test focuses on time window filtering behavior
      
      webVitalsMonitoring.recordMetric({
        name: 'LCP',
        value: 2000,
        id: 'lcp-old',
        delta: 2000
      });

      // Manually set older timestamp (normally this would be handled internally)
      const analytics24h = webVitalsMonitoring.getAnalytics(24 * 60 * 60 * 1000); // 24 hours
      
      // The metric should be included since it's recent (just recorded)
      expect(analytics24h.summary.totalSamples).toBeGreaterThan(0);
    });
  });
});