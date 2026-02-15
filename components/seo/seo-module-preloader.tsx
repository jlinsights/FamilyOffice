'use client';

import { useEffect } from 'react';
import { preloadCriticalSEOModules } from '@/lib/seo/seo-bundle-optimizer';

export function SEOModulePreloader() {
  useEffect(() => {
    // Preload critical SEO modules in the background after hydration
    const preloadTimer = setTimeout(() => {
      preloadCriticalSEOModules().catch(error => {
        console.warn('Failed to preload SEO modules:', error);
      });
    }, 1000); // Delay to avoid blocking initial render

    return () => clearTimeout(preloadTimer);
  }, []);

  // This component doesn't render anything
  return null;
}
