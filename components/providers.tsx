'use client'

import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { EnvironmentProvider } from "@/components/environment-provider"
import { EnvironmentGuard } from "@/components/environment-guard"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EnvironmentProvider 
      checkInterval={5 * 60 * 1000} // 5 minutes
      enableContinuousMonitoring={false}
    >
      <EnvironmentGuard
        blockOnCriticalFailure={false}
        showWarnings={process.env.NODE_ENV === 'development'}
        enableDevMode={process.env.NODE_ENV === 'development'}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </EnvironmentGuard>
    </EnvironmentProvider>
  )
}