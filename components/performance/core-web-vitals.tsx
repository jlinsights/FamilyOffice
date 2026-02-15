'use client';

/**
 * 🚀 Core Web Vitals 최적화 컴포넌트
 * LCP, FID, CLS 개선을 위한 성능 모니터링
 */
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { useEffect } from 'react';

// Extract environment variables at module level for client components
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

// Web Vitals 임계값 설정 (2024 최신 기준)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay (레거시)
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint (새 기준)
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

function getRating(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: WebVitalsMetric) {
  // 성능 데이터를 Google Analytics로 전송
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      non_interaction: true,
    });
  }

  // 개발 환경에서 콘솔 로깅
  if (IS_DEVELOPMENT) {
    console.group(`🎯 Web Vitals: ${metric.name}`);
    console.log(`Value: ${metric.value}`);
    console.log(`Rating: ${metric.rating}`);
    console.log(`Delta: ${metric.delta}`);
    console.groupEnd();
  }

  // Vercel Analytics로 전송 (프로덕션)
  if (IS_PRODUCTION && window.va) {
    window.va('Web Vitals', {
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }
}

export default function CoreWebVitals() {
  useEffect(() => {
    // 🚀 자동 성능 최적화 실행
    setTimeout(() => {
      optimizeImages();
      reduceCLS();
      improveLCP();
    }, 1000); // 페이지 로드 후 1초 뒤 실행

    // 🎯 LCP (Largest Contentful Paint) 모니터링
    onLCP((metric: Metric) => {
      const webVitalsMetric: WebVitalsMetric = {
        id: metric.id,
        name: 'LCP',
        value: metric.value,
        rating: getRating('LCP', metric.value),
        delta: metric.delta,
      };
      sendToAnalytics(webVitalsMetric);
    });

    // 🎯 INP (Interaction to Next Paint) 모니터링 - FID 대체
    onINP((metric: Metric) => {
      const webVitalsMetric: WebVitalsMetric = {
        id: metric.id,
        name: 'INP',
        value: metric.value,
        rating: getRating('INP', metric.value),
        delta: metric.delta,
      };
      sendToAnalytics(webVitalsMetric);
    });

    // 🎯 CLS (Cumulative Layout Shift) 모니터링
    onCLS((metric: Metric) => {
      const webVitalsMetric: WebVitalsMetric = {
        id: metric.id,
        name: 'CLS',
        value: metric.value,
        rating: getRating('CLS', metric.value),
        delta: metric.delta,
      };
      sendToAnalytics(webVitalsMetric);
    });

    // 🎯 FCP (First Contentful Paint) 모니터링
    onFCP((metric: Metric) => {
      const webVitalsMetric: WebVitalsMetric = {
        id: metric.id,
        name: 'FCP',
        value: metric.value,
        rating: getRating('FCP', metric.value),
        delta: metric.delta,
      };
      sendToAnalytics(webVitalsMetric);
    });

    // 🎯 TTFB (Time to First Byte) 모니터링
    onTTFB((metric: Metric) => {
      const webVitalsMetric: WebVitalsMetric = {
        id: metric.id,
        name: 'TTFB',
        value: metric.value,
        rating: getRating('TTFB', metric.value),
        delta: metric.delta,
      };
      sendToAnalytics(webVitalsMetric);
    });

    // 🚀 이미지 로딩 최적화
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      // 지연 로딩 이미지 관찰
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // 🚀 리소스 힌트 최적화
    const addPreloadLink = (href: string, as: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    };

    // Fonts are handled by next/font/google - no manual preload needed

    // 중요 CSS 프리로드
    if (document.querySelector('link[href*="/globals.css"]')) {
      const globalCSS = document.querySelector(
        'link[href*="/globals.css"]'
      ) as HTMLLinkElement;
      if (globalCSS) {
        globalCSS.rel = 'preload';
        globalCSS.as = 'style';
      }
    }
  }, []);

  return null; // 렌더링하지 않는 성능 모니터링 컴포넌트
}

// 🎯 성능 최적화 유틸리티 함수들
export function optimizeImages() {
  // 이미지 최적화 실행
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // 로딩 속성 설정
    if (!img.loading) {
      img.loading = 'lazy';
    }

    // decoding 속성 설정
    if (!img.decoding) {
      img.decoding = 'async';
    }

    // fetchpriority 설정 (Above the fold 이미지)
    if (img.getBoundingClientRect().top < window.innerHeight) {
      img.setAttribute('fetchpriority', 'high');
    }

    // WebP 포맷 지원 확인 및 적용
    if (supportsWebP()) {
      const src = img.src;
      if (src && !src.includes('.webp')) {
        // 이미지 URL을 WebP로 변환 (Cloudflare Image Delivery 등)
        const webpSrc = convertToWebP(src);
        if (webpSrc !== src) {
          img.src = webpSrc;
        }
      }
    }
  });
}

function supportsWebP(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

function convertToWebP(src: string): string {
  // Cloudflare Image Delivery WebP 변환
  if (src.includes('imagedelivery.net')) {
    return src.replace(/\/(public|Contain|Cover)$/, '/format=webp');
  }
  // 다른 CDN 또는 로컬 이미지 처리
  return src;
}

export function reduceCLS() {
  // CLS 감소를 위한 최적화
  const style = document.createElement('style');
  style.textContent = `
    /* 이미지 컨테이너 aspect-ratio 설정 */
    .image-container {
      aspect-ratio: attr(width) / attr(height);
    }
    
    /* 폰트 로딩 중 레이아웃 시프트 방지 */
    body {
      font-display: swap;
    }
    
    /* 동적 콘텐츠 영역 최소 높이 설정 */
    .dynamic-content {
      min-height: 200px;
    }
    
    /* 광고/위젯 영역 공간 예약 */
    .widget-container {
      min-height: 250px;
    }
  `;
  document.head.appendChild(style);
}

export function improveLCP() {
  // LCP 개선을 위한 최적화

  // 중요 리소스 프리로드
  const preloadCriticalResources = () => {
    const criticalImages = document.querySelectorAll(
      'img[data-priority="high"]'
    );
    criticalImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = (img as HTMLImageElement).src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  };

  // Hero 이미지 최적화
  const optimizeHeroImage = () => {
    const heroImage = document.querySelector('.hero-image') as HTMLImageElement;
    if (heroImage) {
      heroImage.loading = 'eager';
      (heroImage as any).fetchPriority = 'high';
      heroImage.decoding = 'sync';
    }
  };

  preloadCriticalResources();
  optimizeHeroImage();
}

// 글로벌 타입 선언
declare global {
  interface Window {
    va?: (event: string, data?: any) => void;
  }
}
