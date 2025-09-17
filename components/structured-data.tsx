'use client';

import Script from 'next/script';
import { sanitizeStructuredData } from '@/lib/security/html-sanitizer';
import { createLogger } from '@/lib/security/secure-logger';

const logger = createLogger('StructuredData');

interface StructuredDataProps {
  data: unknown;
}

export function StructuredData({ data }: StructuredDataProps) {
  // data가 유효하지 않으면 렌더링하지 않음
  if (!data || typeof data !== 'object') {
    return null;
  }

  try {
    // Securely serialize and validate structured data
    const jsonData = sanitizeStructuredData(data);
    
    return (
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: jsonData,
        }}
      />
    );
  } catch (error) {
    logger.error('StructuredData validation failed', error);
    return null;
  }
}
