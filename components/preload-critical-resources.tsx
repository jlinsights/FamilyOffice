export function PreloadCriticalResources() {
  return (
    <>
      {/* Critical fonts - Only weights actually used in design */}
      <link
        rel="preload"
        href="/_next/static/media/inter-latin-400-normal.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/_next/static/media/inter-latin-600-normal.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//googletagmanager.com" />
      <link rel="dns-prefetch" href="//google-analytics.com" />
      <link rel="dns-prefetch" href="//cal.com" />
      <link rel="dns-prefetch" href="//static.doubleclick.net" />
    </>
  );
}