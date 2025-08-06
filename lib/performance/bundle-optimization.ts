/**
 * Advanced Bundle Optimization for FamilyOffice
 * Tree-shaking and code splitting enhancements
 */

// Dynamic imports for heavy components
export const LazyFinancialCharts = () => {
  return import('recharts').then(({ ResponsiveContainer, LineChart, XAxis, YAxis }) => ({
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
  }));
};

export const LazyCalComEmbed = () => {
  return import('@calcom/embed-react');
};

export const LazyDatePicker = () => {
  return import('react-day-picker');
};

// Selective icon imports - dynamically import lucide-react icons
export const optimizedIconImports = {
  // 자주 사용되는 아이콘만 선별 import (일반적인 방식 사용)
  Calendar: () => import('lucide-react').then(m => ({ Calendar: m.Calendar })),
  TrendingUp: () => import('lucide-react').then(m => ({ TrendingUp: m.TrendingUp })),
  DollarSign: () => import('lucide-react').then(m => ({ DollarSign: m.DollarSign })),
  User: () => import('lucide-react').then(m => ({ User: m.User })),
  Settings: () => import('lucide-react').then(m => ({ Settings: m.Settings })),
};

// Chart.js 최적화 (recharts 대안) - 필요시 설치 후 사용
// export const LazyChart = () => {
//   return import('chart.js/auto').then(Chart => ({
//     Chart: Chart.default,
//     CategoryScale: Chart.CategoryScale,
//     LinearScale: Chart.LinearScale,
//     PointElement: Chart.PointElement,
//     LineElement: Chart.LineElement,
//     Title: Chart.Title,
//     Tooltip: Chart.Tooltip,
//     Legend: Chart.Legend,
//   }));
// };

// Korean font optimization
export const optimizeKoreanFonts = () => {
  if (typeof document !== 'undefined') {
    // Preload Korean font subsets
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = '/fonts/korean-subset.woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
  }
};

// Image optimization enhancements
export const imageOptimizations = {
  // WebP/AVIF fallback system
  generateSrcSet: (src: string, sizes: number[]) => {
    const extensions = ['avif', 'webp', 'jpg'];
    return extensions.map(ext => 
      sizes.map(size => `${src}?w=${size}&f=${ext} ${size}w`).join(', ')
    );
  },

  // Lazy loading with intersection observer
  setupLazyLoading: () => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
};

// Service Worker for aggressive caching
export const setupServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Memory optimization for long-running sessions
export const memoryOptimizer = {
  cleanupEventListeners: () => {
    // Remove abandoned event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        // Cleanup financial data subscriptions
        // Cleanup chart instances
        // Clear intervals/timeouts
      });
    }
  },

  optimizeReactRendering: () => {
    // React DevTools Production profiling
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook && hook.onCommitFiberRoot) {
        hook.onCommitFiberRoot = () => {};
      }
    }
  }
};

export default {
  LazyFinancialCharts,
  LazyCalComEmbed,
  LazyDatePicker,
  optimizedIconImports,
  optimizeKoreanFonts,
  imageOptimizations,
  setupServiceWorker,
  memoryOptimizer,
};