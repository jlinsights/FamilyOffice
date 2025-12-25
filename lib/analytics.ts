// Analytics library for tracking system events
export const analytics = {
  track: (eventName: string, properties: Record<string, any>) => {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Track:', eventName, properties);
    }

    // In production, send to analytics service (Google Analytics, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }

    // Store in localStorage for debugging
    try {
      const stored = JSON.parse(localStorage.getItem('site_analytics') || '[]');
      stored.push({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      });
      // Keep only last 100 events
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      localStorage.setItem('site_analytics', JSON.stringify(stored));
    } catch (error) {
      // Ignore localStorage errors
    }
  },
};
