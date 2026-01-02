

import { DebugStyles } from '@/app/debug-styles';
import { SafeAuthProvider } from '@/components/auth/safe-auth-provider';
import { ErrorBoundary } from '@/components/error-boundary';
import { OfflineIndicator } from '@/components/offline-indicator';
import CoreWebVitals from '@/components/performance/core-web-vitals';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SEOErrorBoundary } from '@/components/seo/seo-error-boundary';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThirdPartyIntegration } from '@/components/third-party-integration';
import { Toaster } from '@/components/ui/toaster';

export function AppShell({ children }: { children: React.ReactNode }) {
  const content = (
    <>
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
    </>
  );

  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <SafeAuthProvider>{content}</SafeAuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
