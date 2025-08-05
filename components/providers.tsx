'use client';

import React, { memo, useEffect, useState } from 'react';

import { ThemeProvider } from '@/components/theme-provider';

export const Providers = memo(function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 방지: 마운트되기 전에는 기본 구조만 반환
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
});
