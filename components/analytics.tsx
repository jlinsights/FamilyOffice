'use client';

import Script from 'next/script';
import { createAnalyticsScript, createGTMScript, isAllowedScriptSource } from '@/lib/security/html-sanitizer';
import { createLogger, securityLogger } from '@/lib/security/secure-logger';

// Extract environment variables at module level for client components
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MP3HPPMN';
const logger = createLogger('Analytics');

export function Analytics() {
  // GA ID가 설정되지 않은 경우 아무것도 렌더링하지 않음
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  try {
    // Validate script sources and create secure script content
    const gtmSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    
    if (!isAllowedScriptSource(gtmSrc)) {
      securityLogger.security('Blocked script from unauthorized source', { source: gtmSrc });
      return null;
    }

    const analyticsScript = createAnalyticsScript(GA_MEASUREMENT_ID);
    const gtmScript = createGTMScript(GTM_ID);

    return (
      <>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={gtmSrc}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: analyticsScript,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: gtmScript,
          }}
        />
      </>
    );
  } catch (error) {
    logger.error('Analytics initialization failed', error);
    return null;
  }
}
