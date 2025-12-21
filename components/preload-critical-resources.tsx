export function PreloadCriticalResources() {
  return (
    <>
      {/* Fonts optimized by next/font/google - no manual preload needed */}
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//googletagmanager.com" />
      <link rel="dns-prefetch" href="//google-analytics.com" />
      <link rel="dns-prefetch" href="//cal.com" />
      <link rel="dns-prefetch" href="//static.doubleclick.net" />
    </>
  );
}