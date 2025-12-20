/**
 * Core Web Vitals Performance Configuration
 * 
 * This file contains optimizations for:
 * - LCP (Largest Contentful Paint) - Target: < 2.5s
 * - FID (First Input Delay) - Target: < 100ms  
 * - CLS (Cumulative Layout Shift) - Target: < 0.1
 */

export const PERFORMANCE_CONFIG = {
  // Font optimization
  fonts: {
    preload: true,
    display: 'swap',
    fallback: 'system-ui, -apple-system, sans-serif'
  },
  
  // Image optimization
  images: {
    formats: ['avif', 'webp'],
    quality: 85,
    priority: ['hero', 'logo', 'featured'],
    lazy: ['thumbnail', 'gallery']
  },
  
  // Critical CSS inlining
  css: {
    critical: true,
    inline: ['above-the-fold', 'layout', 'fonts'],
    defer: ['animations', 'non-critical']
  },
  
  // JavaScript optimization
  js: {
    splitChunks: true,
    modulePreload: true,
    defer: ['analytics', 'third-party']
  },
  
  // Resource hints
  resourceHints: {
    dnsPrefetch: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://analytics.google.com'
    ],
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]
  }
};

// Performance budgets
export const PERFORMANCE_BUDGETS = {
  lcp:{ target: 2500, warning: 3000, error: 4000 },
  fid: { target: 100, warning: 200, error: 300 },
  cls: { target: 0.1, warning: 0.15, error: 0.25 },
  fcp: { target: 1800, warning: 2500, error: 3500 },
  ttfb: { target: 600, warning: 1000, error: 1500 }
};
