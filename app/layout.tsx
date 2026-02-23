import { PreloadCriticalResources } from '@/components/preload-critical-resources';
import { AppShell } from '@/components/providers/app-shell';
import { GlobalMetaTags } from '@/components/seo/global-meta-tags';
import { GlobalStructuredData } from '@/components/seo/global-structured-data';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

// Force all routes to be dynamically rendered — workaround for Next.js 16 static
// generation worker bug where React resolves to null intermittently (vercel/next.js#85668)
export const dynamic = 'force-dynamic';

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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
