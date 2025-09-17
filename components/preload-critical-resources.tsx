export function PreloadCriticalResources() {
  return (
    <>
      {/* Critical fonts */}
      <link
        rel="preload"
        href="/_next/static/media/inter-latin-100-normal.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
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
      
      {/* Critical CSS - handled by Next.js */}
      
      {/* Critical images */}
      <link
        rel="preload"
        href="/SVG/FamilyOfficeS_blue.svg"
        as="image"
        type="image/svg+xml"
      />
      
      {/* Critical scripts */}
      <link
        rel="preload"
        href="/_next/static/chunks/main.js"
        as="script"
      />
      <link
        rel="preload"
        href="/_next/static/chunks/webpack.js"
        as="script"
      />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//googletagmanager.com" />
      <link rel="dns-prefetch" href="//google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//cal.com" />
      <link rel="dns-prefetch" href="//static.doubleclick.net" />
    </>
  );
}