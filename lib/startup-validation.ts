/**
 * Startup Environment Validation
 * Validates critical environment variables at application startup
 */

import { initializeEnvironment, validateCriticalEnvVars } from './env'
import { logger } from './logger'

interface StartupValidationResult {
  success: boolean
  criticalMissing: string[]
  errors: string[]
  warnings: string[]
  canContinue: boolean
}

/**
 * Performs comprehensive startup validation
 * Should be called as early as possible in the application lifecycle
 */
export async function validateStartupEnvironment(): Promise<StartupValidationResult> {
  const startTime = performance.now()
  
  logger.info('Starting application environment validation', {
    component: 'startup-validation',
    function: 'validateStartupEnvironment'
  })
  
  try {
    // Initialize environment validation
    const envValid = initializeEnvironment()
    
    // Validate critical environment variables
    const criticalValid = validateCriticalEnvVars()
    
    // Check for critical missing variables
    const criticalVars = [
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY',
      'NEXT_PUBLIC_APP_URL'
    ]
    
    const criticalMissing = criticalVars.filter(varName => !process.env[varName])
    
    // Collect all validation errors and warnings
    const errors: string[] = []
    const warnings: string[] = []
    
    if (!envValid) {
      errors.push('Environment validation failed')
    }
    
    if (!criticalValid) {
      errors.push('Critical environment variables validation failed')
    }
    
    if (criticalMissing.length > 0) {
      errors.push(`Critical environment variables missing: ${criticalMissing.join(', ')}`)
    }
    
    // Check optional but recommended variables
    const recommendedVars = [
      'REDIS_URL',
      'SENTRY_DSN',
      'NEXT_PUBLIC_GA_MEASUREMENT_ID'
    ]
    
    const missingRecommended = recommendedVars.filter(varName => !process.env[varName])
    if (missingRecommended.length > 0) {
      warnings.push(`Recommended environment variables missing: ${missingRecommended.join(', ')}`)
    }
    
    const success = envValid && criticalValid && criticalMissing.length === 0
    const canContinue = criticalMissing.length === 0  // Can continue even with non-critical errors
    
    const duration = performance.now() - startTime
    
    const result: StartupValidationResult = {
      success,
      criticalMissing,
      errors,
      warnings,
      canContinue
    }
    
    if (success) {
      logger.info('Startup environment validation completed successfully', {
        component: 'startup-validation',
        function: 'validateStartupEnvironment',
        metadata: {
          duration,
          warningCount: warnings.length
        }
      })
    } else if (canContinue) {
      logger.warn('Startup environment validation completed with errors', {
        component: 'startup-validation',
        function: 'validateStartupEnvironment',
        metadata: {
          duration,
          errorCount: errors.length,
          warningCount: warnings.length
        }
      })
    } else {
      logger.warn('Startup environment validation failed - cannot continue', {
        component: 'startup-validation',
        function: 'validateStartupEnvironment',
        metadata: {
          duration,
          criticalMissing,
          errorCount: errors.length
        }
      })
    }
    
    return result
    
  } catch (error) {
    const duration = performance.now() - startTime
    
    logger.critical('Startup environment validation threw exception', error as Error, {
      component: 'startup-validation',
      function: 'validateStartupEnvironment',
      duration
    })
    
    return {
      success: false,
      criticalMissing: [],
      errors: ['Environment validation threw an exception'],
      warnings: [],
      canContinue: false
    }
  }
}

/**
 * Quick startup validation for critical variables only
 * Use when full validation is not needed
 */
export function validateCriticalStartup(): boolean {
  const criticalVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_APP_URL'
  ]
  
  const missing = criticalVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    logger.warn('Critical startup environment variables missing', {
      component: 'startup-validation',
      function: 'validateCriticalStartup',
      metadata: { missingVars: missing }
    })
    return false
  }
  
  logger.info('Critical startup environment variables validated', {
    component: 'startup-validation',
    function: 'validateCriticalStartup'
  })
  
  return true
}

/**
 * Environment validation middleware for Next.js
 * Can be used in middleware.ts or API routes
 */
export function createEnvironmentMiddleware() {
  let validationCache: { valid: boolean; timestamp: number } | null = null
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
  
  return {
    async validate(): Promise<boolean> {
      const now = Date.now()
      
      // Use cached result if recent
      if (validationCache && (now - validationCache.timestamp) < CACHE_DURATION) {
        return validationCache.valid
      }
      
      // Perform validation
      const result = await validateStartupEnvironment()
      
      validationCache = {
        valid: result.canContinue,
        timestamp: now
      }
      
      return result.canContinue
    },
    
    clearCache() {
      validationCache = null
    }
  }
}

/**
 * Development mode environment checker
 * Provides detailed feedback for developers
 */
export function checkDevelopmentEnvironment(): void {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  
  logger.info('Development environment check starting', {
    component: 'startup-validation',
    function: 'checkDevelopmentEnvironment'
  })
  
  const devRecommendations: Array<{ var: string; reason: string; priority: 'high' | 'medium' | 'low' }> = []
  
  // Check for development recommendations
  if (!process.env.REDIS_URL && !process.env.REDIS_HOST) {
    devRecommendations.push({
      var: 'REDIS_URL',
      reason: 'Improves caching performance and enables rate limiting',
      priority: 'high'
    })
  }
  
  if (!process.env.SENTRY_DSN) {
    devRecommendations.push({
      var: 'SENTRY_DSN',
      reason: 'Enables error tracking and monitoring',
      priority: 'medium'
    })
  }
  
  if (!process.env.V0_API_KEY) {
    devRecommendations.push({
      var: 'V0_API_KEY',
      reason: 'Enables AI-powered content generation',
      priority: 'low'
    })
  }
  
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    devRecommendations.push({
      var: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
      reason: 'Enables analytics tracking',
      priority: 'low'
    })
  }
  
  if (devRecommendations.length > 0) {
    devRecommendations.forEach(rec => {
      logger.info(`Development recommendation: ${rec.var}`, {
        component: 'startup-validation',
        function: 'checkDevelopmentEnvironment',
        metadata: {
          variable: rec.var,
          reason: rec.reason,
          priority: rec.priority
        }
      })
    })
  } else {
    logger.info('Development environment is well configured', {
      component: 'startup-validation',
      function: 'checkDevelopmentEnvironment'
    })
  }
}

// Export the middleware instance for use across the application
export const environmentMiddleware = createEnvironmentMiddleware()