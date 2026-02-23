'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import type { ConversionEventType } from '@/lib/conversion/types';

const SESSION_KEY = 'fo_session_id';
const UTM_KEY = 'fo_utm';

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function captureUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const utm: Record<string, string> = {};

  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  // Persist UTMs for the session
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  }

  // Return stored UTMs (first-touch for this session)
  const stored = sessionStorage.getItem(UTM_KEY);
  return stored ? JSON.parse(stored) : utm;
}

async function sendEvent(
  eventType: ConversionEventType,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    const utm = captureUtmParams();

    await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        session_id: sessionId,
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer || undefined,
        ...utm,
        metadata,
        client_timestamp: new Date().toISOString(),
      }),
      // Non-blocking: use keepalive so the request completes even on navigation
      keepalive: true,
    });
  } catch {
    // Silent fail - tracking must never break UX
  }
}

/**
 * Hook for client-side conversion tracking.
 *
 * Auto-tracks page views. Provides `trackEvent` for manual events.
 *
 * @example
 * ```tsx
 * const { trackEvent } = useConversionTracking();
 * // Auto page_view on mount
 * // Manual tracking:
 * trackEvent('cta_click', { cta: 'hero-consult-btn' });
 * ```
 */
export function useConversionTracking() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string>('');

  // Auto-track page views on route change
  useEffect(() => {
    if (pathname && pathname !== lastTrackedPath.current) {
      lastTrackedPath.current = pathname;
      sendEvent('page_view');
    }
  }, [pathname]);

  const trackEvent = useCallback(
    (eventType: ConversionEventType, metadata?: Record<string, unknown>) => {
      sendEvent(eventType, metadata);
    },
    []
  );

  return { trackEvent, sessionId: getOrCreateSessionId() };
}
