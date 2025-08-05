'use client';

import Script from 'next/script';

interface StructuredDataProps {
  data: any;
}

export function StructuredData({ data }: StructuredDataProps) {
  // data가 유효하지 않으면 렌더링하지 않음
  if (!data || typeof data !== 'object') {
    return null;
  }

  try {
    // JSON.stringify가 실패할 수 있으므로 try-catch로 감싸기
    const jsonData = JSON.stringify(data);
    
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
    console.error('StructuredData serialization error:', error);
    return null;
  }
}
