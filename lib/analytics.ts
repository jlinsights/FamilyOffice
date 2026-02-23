/**
 * @deprecated Use `useConversionTracking` hook or `conversionTrackingService` instead.
 * This module is kept for backward compatibility.
 * New code should import from `@/hooks/use-conversion-tracking` (client)
 * or `@/lib/conversion/service` (server).
 */
export const analytics = {
  track: (eventName: string, properties: Record<string, any>) => {
    // Forward to GA4 if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[analytics] (deprecated) Track:', eventName, properties);
    }
  },
};
