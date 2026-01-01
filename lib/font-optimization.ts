// React hook for font loading optimization
import { useEffect } from 'react';

// Font loading optimization utilities
export const fontOptimization = {
  // Critical font preloading
  preloadCriticalFonts: () => {
    if (typeof window === 'undefined') return;

    const criticalFonts = [
      'https://fonts.gstatic.com/s/notoserif/v22/ga6Iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhEqFEoB4IBhCYKO3.woff2',
      'https://fonts.gstatic.com/s/notosans/v28/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9a6Vc.woff2',
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      document.head.appendChild(link);
    });
  },

  // Font display swap for better perceived performance
  enableFontDisplaySwap: () => {
    if (typeof window === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/notosans/v28/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9a6Vc.woff2) format('woff2');
        unicode-range: U+AC00-D7AF, U+1100-11FF, U+3130-318F, U+A960-A97F, U+D7B0-D7FF;
      }
      @font-face {
        font-family: 'Noto Serif KR';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/notoserif/v22/ga6Iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhEqFEoB4IBhCYKO3.woff2) format('woff2');
        unicode-range: U+AC00-D7AF, U+1100-11FF, U+3130-318F, U+A960-A97F, U+D7B0-D7FF;
      }
    `;
    document.head.appendChild(style);
  },

  // Subset fonts for Korean optimization
  getOptimizedFontUrl: (fontFamily: string, weights: number[] = [400, 700]) => {
    const baseUrl = 'https://fonts.googleapis.com/css2';
    const params = new URLSearchParams();

    // Korean subset optimization
    params.append('family', `${fontFamily}:wght@${weights.join(';')}`);
    params.append('subset', 'korean');
    params.append('display', 'swap');

    return `${baseUrl}?${params.toString()}`;
  },

  // Measure font loading performance
  measureFontLoadingPerformance: () => {
    if (typeof window === 'undefined' || !('fonts' in document)) return;

    const startTime = performance.now();

    document.fonts.ready.then(() => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      console.log(`Fonts loaded in: ${loadTime}ms`);

      // Report to analytics if needed
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'font_load_time', {
          event_category: 'Performance',
          event_label: 'Font Loading',
          value: Math.round(loadTime),
        });
      }
    });
  },
};

export function useFontOptimization() {
  useEffect(() => {
    // Preload critical fonts
    fontOptimization.preloadCriticalFonts();

    // Enable font display swap
    fontOptimization.enableFontDisplaySwap();

    // Measure performance
    fontOptimization.measureFontLoadingPerformance();
  }, []);
}

// Font loading strategy for different content types
export const fontLoadingStrategies = {
  // For hero sections and above-the-fold content
  critical: {
    strategy: 'preload',
    display: 'block',
    priority: 'high',
  },

  // For main content
  important: {
    strategy: 'preload',
    display: 'swap',
    priority: 'high',
  },

  // For secondary content
  standard: {
    strategy: 'load',
    display: 'swap',
    priority: 'low',
  },

  // For decorative elements
  optional: {
    strategy: 'lazy',
    display: 'optional',
    priority: 'low',
  },
};
