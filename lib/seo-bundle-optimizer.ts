// Bundle optimization for SEO features with dynamic imports
import React from 'react';
import { isFeatureEnabled } from './feature-flags';

// Dynamic import wrapper with loading fallbacks
export const dynamicSEOImports = {
  // Advanced SEO Engine
  async loadAdvancedSEOEngine() {
    if (!isFeatureEnabled('enableAdvancedSEO')) {
      return null;
    }
    
    try {
      const module = await import('./advanced-seo-engine');
      return module.advancedSEOEngine;
    } catch (error) {
      console.error('Failed to load advanced SEO engine:', error);
      return null;
    }
  },

  // AI Keyword Optimization
  async loadAIKeywordEngine() {
    if (!isFeatureEnabled('enableAIKeywordOptimization')) {
      return null;
    }
    
    try {
      const module = await import('./ai-keyword-optimization-engine');
      return module.aiKeywordOptimizationEngine;
    } catch (error) {
      console.error('Failed to load AI keyword engine:', error);
      return null;
    }
  },

  // Dynamic Structured Data
  async loadStructuredDataEngine() {
    if (!isFeatureEnabled('enableDynamicStructuredData')) {
      return null;
    }
    
    try {
      const module = await import('./dynamic-structured-data');
      return module.dynamicStructuredDataEngine;
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
      const module = await import('./automated-content-optimization');
      return module.automatedContentOptimization;
    } catch (error) {
      console.error('Failed to load content optimizer:', error);
      return null;
    }
  },

  // Cross-Domain Routing
  async loadCrossDomainRouter() {
    if (!isFeatureEnabled('enableCrossDomainRouting')) {
      return null;
    }
    
    try {
      const module = await import('./intelligent-cross-domain-routing');
      return module.intelligentCrossDomainRouter;
    } catch (error) {
      console.error('Failed to load cross-domain router:', error);
      return null;
    }
  },

  // Realtime SEO Dashboard
  async loadRealtimeDashboard() {
    if (!isFeatureEnabled('enableRealtimeSEODashboard')) {
      return null;
    }
    
    try {
      const module = await import('./realtime-seo-dashboard');
      return module.realtimeSEODashboard;
    } catch (error) {
      console.error('Failed to load realtime dashboard:', error);
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
        console.warn(`Slow dynamic import: ${importName} took ${loadTime.toFixed(2)}ms`);
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
  if (isFeatureEnabled('enableAdvancedSEO')) {
    promises.push(
      BundleSizeMonitor.trackImportTime(
        'advanced-seo-engine',
        () => import('./advanced-seo-engine')
      )
    );
  }
  
  if (isFeatureEnabled('enableDynamicStructuredData')) {
    promises.push(
      BundleSizeMonitor.trackImportTime(
        'dynamic-structured-data',
        () => import('./dynamic-structured-data')
      )
    );
  }
  
  // Week 4 Features - Preload if enabled
  if (isFeatureEnabled('enableRealtimeSEODashboard')) {
    promises.push(
      BundleSizeMonitor.trackImportTime(
        'realtime-seo-dashboard',
        () => import('./realtime-seo-dashboard')
      )
    );
  }
  
  if (isFeatureEnabled('enableCrossDomainRouting')) {
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
        default: EmptyComponent
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