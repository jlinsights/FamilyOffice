'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSafeAuth } from '@/hooks/use-safe-auth';
import { PremiumOverlay } from './premium-overlay';

interface PremiumContentGuardProps {
  children: React.ReactNode;
}

export function PremiumContentGuard({ children }: PremiumContentGuardProps) {
  const { isSignedIn, isLoaded } = useSafeAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Loading state (ensure it matches server-side initial render which is always 'loading' effectively)
  if (!hasMounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  // Authenticated - show full content
  if (isSignedIn) {
    return <>{children}</>;
  }

  // Unauthenticated - show blurred content with overlay
  return (
    <div className="relative">
      {/* Blurred content - prevent interaction */}
      <div
        className="blur-md select-none pointer-events-none"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Premium overlay */}
      <PremiumOverlay />
    </div>
  );
}
