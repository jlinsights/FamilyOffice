// Bundle optimization for SEO features with dynamic imports
import React from 'react';

import { isFeatureEnabled } from '@/lib/feature-flags';

// Dynamic import wrapper with loading fallbacks
export const dynamicSEOImports = {
  // Dynamic Structured Data
  async loadStructuredDataEngine() {
    if (!isFeatureEnabled('enableDynamicStructuredData')) {
      return null;
    }

    try {
      const structuredModule = await import('@/lib/seo/dynamic-structured-data');
      return structuredModule.dynamicStructuredDataEngine;
    } catch (error) {
      console.error('Failed to load structured data engine:', error);
      return null;
    }
  },

  // Content Optimization
  async loadContentOptimizer() {
    if (!isFeatureEnabled('enableContentOptimization')) {
      return null;
    }

    try {
      const contentModule = await import('@/lib/marketing/automated-content-optimization');
      return contentModule.automatedContentOptimization;
    } catch (error) {
      console.error('Failed to load content optimizer:', error);
      return null;
    }
  },

  // Cross-Domain Routing (server-side only)
  async loadCrossDomainRouter() {
    if (!isFeatureEnabled('enableCrossDomainRouting')) {
      return null;
    }

    // Only load on server-side to avoid next/headers import issues
    if (typeof window !== 'undefined') {
      console.warn('Cross-domain router is server-side only');
      return null;
    }

    try {
      const routingModule = await import('@/lib/seo/intelligent-cross-domain-routing');
      return routingModule.intelligentCrossDomainRouter;
    } catch (error) {
      console.error('Failed to load cross-domain router:', error);
      return null;
    }
  },
};

// Remove duplicate loadCrossDomainRouter function

// Bundle size monitoring
export class BundleSizeMonitor {
  private static loadTimes: Map<string, number> = new Map();

  static async trackImportTime<T>(
    importName: string,
    importFunction: () => Promise<T>
  ): Promise<T | null> {
    const startTime = performance.now();

    try {
      const result = await importFunction();
      const loadTime = performance.now() - startTime;

      this.loadTimes.set(importName, loadTime);

      // Log slow imports in development
      if (process.env.NODE_ENV === 'development' && loadTime > 100) {
        console.warn(
          `Slow dynamic import: ${importName} took ${loadTime.toFixed(2)}ms`
        );
      }

      return result;
    } catch (error) {
      const loadTime = performance.now() - startTime;
      this.loadTimes.set(`${importName}_error`, loadTime);
      throw error;
    }
  }

  static getLoadTimes(): Record<string, number> {
    return Object.fromEntries(this.loadTimes);
  }

  static clearMetrics(): void {
    this.loadTimes.clear();
  }
}

// Preload critical SEO modules in the background
export async function preloadCriticalSEOModules(): Promise<void> {
  const promises: Promise<any>[] = [];

  // Only preload enabled features

  if (isFeatureEnabled('enableDynamicStructuredData')) {
    promises.push(
      BundleSizeMonitor.trackImportTime(
        'dynamic-structured-data',
        () => import('./dynamic-structured-data')
      )
    );
  }

  // Cross-domain routing is server-side only, skip preloading
  if (
    isFeatureEnabled('enableCrossDomainRouting') &&
    typeof window === 'undefined'
  ) {
    promises.push(
      BundleSizeMonitor.trackImportTime(
        'intelligent-cross-domain-routing',
        () => import('./intelligent-cross-domain-routing')
      )
    );
  }

  // Wait for critical modules without blocking
  await Promise.allSettled(promises);
}

// Component-level code splitting helper
export function withSEOLazyLoading<T extends React.ComponentType<any>>(
  component: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  // Return lazy component with error boundary
  return React.lazy(async () => {
    try {
      return await component();
    } catch (error) {
      console.error('Failed to load SEO component:', error);

      // Return fallback component if available
      if (fallback) {
        return { default: fallback as T };
      }

      // Return empty component as ultimate fallback
      const EmptyComponent = (() => null) as unknown as T;
      return {
        default: EmptyComponent,
      };
    }
  });
}

// Export bundle optimization utilities
export const bundleOptimizer = {
  imports: dynamicSEOImports,
  monitor: BundleSizeMonitor,
  preload: preloadCriticalSEOModules,
  lazy: withSEOLazyLoading,
};
