'use client'

/**
 * Environment Validation Provider
 * Provides runtime environment validation and monitoring
 */

import React, { createContext, useContext, useEffect, useState } from 'react'
import { validateCriticalEnvVars, validateEnv, EnvironmentManager } from '@/lib/env'
import { logger } from '@/lib/logger'

interface EnvironmentStatus {
  isValid: boolean
  isLoading: boolean
  errors: string[]
  warnings: string[]
  lastChecked: Date | null
  criticalValid: boolean
}

interface EnvironmentContextType {
  status: EnvironmentStatus
  revalidate: () => Promise<void>
  validateCritical: () => boolean
}

const EnvironmentContext = createContext<EnvironmentContextType | null>(null)

export function useEnvironment() {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}

interface EnvironmentProviderProps {
  children: React.ReactNode
  checkInterval?: number // in milliseconds
  enableContinuousMonitoring?: boolean
}

export function EnvironmentProvider({ 
  children, 
  checkInterval = 5 * 60 * 1000, // 5 minutes default
  enableContinuousMonitoring = true 
}: EnvironmentProviderProps) {
  const [status, setStatus] = useState<EnvironmentStatus>({
    isValid: false,
    isLoading: true,
    errors: [],
    warnings: [],
    lastChecked: null,
    criticalValid: false
  })

  const validateEnvironment = async (): Promise<EnvironmentStatus> => {
    try {
      logger.debug('Runtime environment validation started', {
        component: 'EnvironmentProvider',
        function: 'validateEnvironment'
      })

      const envManager = EnvironmentManager.getInstance()
      const validation = validateEnv()
      const criticalValid = validateCriticalEnvVars()

      const errors: string[] = []
      const warnings: string[] = []

      if (!validation.success && validation.errors) {
        errors.push(...validation.errors.map(e => `${e.field}: ${e.message}`))
      }

      if (validation.warnings) {
        warnings.push(...validation.warnings.map(w => `${w.field}: ${w.message}`))
      }

      if (!criticalValid) {
        errors.push('Critical environment variables validation failed')
      }

      const newStatus: EnvironmentStatus = {
        isValid: validation.success && criticalValid,
        isLoading: false,
        errors,
        warnings,
        lastChecked: new Date(),
        criticalValid
      }

      logger.info('Runtime environment validation completed', {
        component: 'EnvironmentProvider',
        function: 'validateEnvironment',
        isValid: newStatus.isValid,
        errorCount: errors.length,
        warningCount: warnings.length
      })

      return newStatus
    } catch (error) {
      logger.error('Runtime environment validation failed', error as Error, {
        component: 'EnvironmentProvider',
        function: 'validateEnvironment'
      })

      return {
        isValid: false,
        isLoading: false,
        errors: ['Environment validation threw an exception'],
        warnings: [],
        lastChecked: new Date(),
        criticalValid: false
      }
    }
  }

  const revalidate = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }))
    const newStatus = await validateEnvironment()
    setStatus(newStatus)
  }

  const validateCritical = (): boolean => {
    try {
      const result = validateCriticalEnvVars()
      
      setStatus(prev => ({
        ...prev,
        criticalValid: result,
        lastChecked: new Date()
      }))

      if (!result) {
        logger.warn('Critical environment variables validation failed', {
          component: 'EnvironmentProvider',
          function: 'validateCritical'
        })
      }

      return result
    } catch (error) {
      logger.error('Critical environment validation threw exception', error as Error, {
        component: 'EnvironmentProvider',
        function: 'validateCritical'
      })
      return false
    }
  }

  // Initial validation on mount
  useEffect(() => {
    validateEnvironment().then(setStatus)
  }, [])

  // Continuous monitoring
  useEffect(() => {
    if (!enableContinuousMonitoring) return

    const interval = setInterval(async () => {
      // Only check critical variables during continuous monitoring to reduce overhead
      const criticalValid = validateCritical()
      
      // If critical validation fails, do full validation
      if (!criticalValid) {
        logger.warn('Critical validation failed during monitoring, performing full validation', {
          component: 'EnvironmentProvider',
          function: 'continuousMonitoring'
        })
        await revalidate()
      }
    }, checkInterval)

    return () => clearInterval(interval)
  }, [checkInterval, enableContinuousMonitoring])

  // Page visibility API - validate when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Quick critical check when page becomes visible
        validateCritical()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const contextValue: EnvironmentContextType = {
    status,
    revalidate,
    validateCritical
  }

  return (
    <EnvironmentContext.Provider value={contextValue}>
      {children}
    </EnvironmentContext.Provider>
  )
}