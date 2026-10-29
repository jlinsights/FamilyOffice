import { PreloadCriticalResources } from '@/components/preload-critical-resources';
import { AppShell } from '@/components/providers/app-shell';
import { GlobalMetaTags } from '@/components/seo/global-meta-tags';
import { GlobalStructuredData } from '@/components/seo/global-structured-data';
import { Inter, Noto_Serif_KR, Playfair_Display } from 'next/font/google';
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

// Hangul serif for homepage editorial headlines (Playfair has no Hangul)
const serifKr = Noto_Serif_KR({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-serif-kr',
  fallback: ['AppleMyungjo', 'Batang', 'serif'],
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
        className={`${inter.variable} ${playfair.variable} ${serifKr.variable} font-body antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
