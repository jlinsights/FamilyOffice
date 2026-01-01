import { Inter, Playfair_Display } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/toaster';

import { ErrorBoundary } from '@/components/error-boundary';
import { OfflineIndicator } from '@/components/offline-indicator';
import CoreWebVitals from '@/components/performance/core-web-vitals';
import { PreloadCriticalResources } from '@/components/preload-critical-resources';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { ScrollToTop } from '@/components/scroll-to-top';
import { GlobalMetaTags } from '@/components/seo/global-meta-tags';
import { GlobalStructuredData } from '@/components/seo/global-structured-data';
import { SEOErrorBoundary } from '@/components/seo/seo-error-boundary';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThirdPartyIntegration } from '@/components/third-party-integration';

import { DebugStyles } from './debug-styles';
import './globals.css';

export { defaultMetadata as metadata, viewport } from '@/lib/seo/metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  preload: true, // Preload primary font for LCP optimization
  variable: '--font-playfair',
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <PreloadCriticalResources />
        <GlobalMetaTags />
        <GlobalStructuredData />
      </head>
      <body
        className={`${inter.className} ${inter.variable} ${playfair.variable}`}
        style={{ fontOpticalSizing: 'auto' }}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ClerkProvider>
              <SEOErrorBoundary>{children}</SEOErrorBoundary>

              <ThirdPartyIntegration />
              <DebugStyles />
              <Toaster />

              {/* 🚀 Core Web Vitals 성능 모니터링 */}
              <CoreWebVitals />

              {/* 맨 위로 가기 버튼 (채널톡 위에 표시) */}
              <ScrollToTop />

              {/* 🚀 PWA Components */}
              <PWAInstallPrompt />
              <OfflineIndicator />
            </ClerkProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
