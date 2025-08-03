'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Loading components for better UX
const ComponentSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-1/4" />
      </div>
    </CardContent>
  </Card>
);

const ChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-64 w-full" />
    <div className="flex space-x-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
);

// Error boundary for chunk loading failures
const ChunkErrorFallback = ({ componentName }: { componentName: string }) => (
  <Card className="w-full border-destructive">
    <CardHeader>
      <h3 className="text-lg font-semibold text-destructive">
        컴포넌트 로드 실패
      </h3>
      <p className="text-sm text-muted-foreground">
        {componentName}을 불러올 수 없습니다. 페이지를 새로고침해주세요.
      </p>
    </CardHeader>
    <CardContent>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        새로고침
      </button>
    </CardContent>
  </Card>
);

// Enhanced dynamic import with error handling
const createLazyComponent = (
  importFn: () => Promise<any>,
  componentName: string,
  fallback: React.ComponentType = ComponentSkeleton
) => {
  return dynamic(
    () =>
      importFn().catch(error => {
        console.error(`Failed to load ${componentName}:`, error);
        // Return a fallback component that shows error
        const ErrorComponent = () => (
          <ChunkErrorFallback componentName={componentName} />
        );
        ErrorComponent.displayName = `${componentName}Error`;
        return ErrorComponent;
      }),
    {
      loading: () => React.createElement(fallback),
      ssr: false,
    }
  );
};

// Heavy components with lazy loading and error handling
export const LazyFinancialDashboard = createLazyComponent(
  () => import('@/components/asset-management-dashboard'),
  'FinancialDashboard'
);

export const LazyAssetManagementDashboard = createLazyComponent(
  () => import('@/components/asset-management-dashboard'),
  'AssetManagementDashboard'
);

export const LazyKoreanMarketInsight = createLazyComponent(
  () => import('@/components/korean-market-insight'),
  'KoreanMarketInsight',
  ChartSkeleton
);

export const LazyStockCard = createLazyComponent(
  () => import('@/components/financial/stock-card'),
  'StockCard'
);

export const LazyForexCard = createLazyComponent(
  () => import('@/components/financial/forex-card'),
  'ForexCard'
);

// Cal.com components with lazy loading
export const LazyCalComInline = createLazyComponent(
  () =>
    import('@/components/cal-com-inline').then(mod => ({
      default: mod.CalComInline,
    })),
  'CalComInline',
  () => (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  )
);

export const LazyCalComAdvanced = createLazyComponent(
  () =>
    import('@/components/cal-com-advanced').then(mod => ({
      default: mod.CalComAdvanced,
    })),
  'CalComAdvanced'
);

// Admin components (heavy and rarely used)
export const LazyAdminDashboard = createLazyComponent(
  () => import('@/app/admin/page').then(mod => ({ default: mod.default })),
  'AdminDashboard'
);

// Charts and analytics components with enhanced error handling
export const LazyChartComponent = createLazyComponent(
  () =>
    import('recharts')
      .then(mod => mod.ResponsiveContainer)
      .catch(() => {
        console.warn('Recharts 로드 실패, 대체 컴포넌트 사용');
        const FallbackComponent = () => (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            차트를 불러올 수 없습니다
          </div>
        );
        FallbackComponent.displayName = 'ResponsiveContainerFallback';
        return FallbackComponent;
      }),
  'ChartComponent',
  ChartSkeleton
);

// Form components that might be heavy
export const LazyConsultationForm = createLazyComponent(
  () => import('@/components/forms/consultation-form'),
  'ConsultationForm',
  () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-1/3" />
      </CardContent>
    </Card>
  )
);

// Utility hook for intersection observer
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

// HOC for lazy loading on scroll
export const withLazyLoading = <T extends object>(
  Component: React.ComponentType<T>,
  fallback: React.ComponentType = ComponentSkeleton
) => {
  const LazyLoadedComponent = React.forwardRef<HTMLDivElement, T>(
    (props, ref) => {
      const elementRef = React.useRef<HTMLDivElement>(null);
      const isVisible = useIntersectionObserver(elementRef, {
        threshold: 0.1,
        rootMargin: '50px',
      });

      React.useImperativeHandle(ref, () => elementRef.current!);

      return (
        <div ref={elementRef}>
          {isVisible ? (
            <Component {...(props as T)} />
          ) : (
            React.createElement(fallback)
          )}
        </div>
      );
    }
  );

  LazyLoadedComponent.displayName = `withLazyLoading(${Component.displayName || Component.name || 'Component'})`;
  return LazyLoadedComponent;
};

// Enhanced bundle splitting utilities with retry logic
export const loadFeature = async (
  featureName: string,
  retryCount = 0
): Promise<any> => {
  const maxRetries = 3;

  try {
    switch (featureName) {
      case 'financial':
        return await import('@/components/asset-management-dashboard');
      case 'consulting':
        return await import('@/components/forms/consultation-form');
      case 'analytics':
        return await import('@/components/korean-market-insight');
      case 'admin':
        return await import('@/app/admin/page');
      default:
        throw new Error(`Unknown feature: ${featureName}`);
    }
  } catch (error) {
    console.error(
      `Failed to load feature ${featureName} (attempt ${retryCount + 1}):`,
      error
    );

    if (retryCount < maxRetries) {
      // Wait before retrying (exponential backoff)
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, retryCount) * 1000)
      );
      return loadFeature(featureName, retryCount + 1);
    }

    throw new Error(
      `Failed to load feature ${featureName} after ${maxRetries} attempts`
    );
  }
};

// Global error handler for chunk loading failures
if (typeof window !== 'undefined') {
  window.addEventListener('error', event => {
    if (event.error && event.error.name === 'ChunkLoadError') {
      console.error('ChunkLoadError detected:', event.error);
      // Optionally show a user-friendly error message
      const errorMessage = document.createElement('div');
      errorMessage.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; background: #ef4444; color: white; padding: 1rem; text-align: center; z-index: 9999;">
          <p>페이지 로딩 중 오류가 발생했습니다. <button onclick="window.location.reload()" style="background: white; color: #ef4444; border: none; padding: 0.5rem 1rem; margin-left: 1rem; border-radius: 4px; cursor: pointer;">새로고침</button></p>
        </div>
      `;
      document.body.appendChild(errorMessage);
    }
  });
}
