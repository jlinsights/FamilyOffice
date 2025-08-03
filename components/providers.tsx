'use client';

import React, { memo } from 'react';

import { ThemeProvider } from '@/components/theme-provider';

export const Providers = memo(function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
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
