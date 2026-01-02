'use client';

import { ErrorBoundary } from '@/components/error-boundary';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export function CalculatorLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary
        fallback={({}) => (
          <div className="h-16 border-b flex items-center justify-center text-sm text-red-500">
            Header Load Error
          </div>
        )}
      >
        <Header />
      </ErrorBoundary>

      <ErrorBoundary>
        {/* 메인 콘텐츠 */}
        <main className="container mx-auto px-4 py-20">{children}</main>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={({}) => (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Footer temporarily unavailable
          </div>
        )}
      >
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
