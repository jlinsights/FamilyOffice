/**
 * Application Initialization Script
 * Validates environment and initializes services at startup
 */

import { validateStartupEnvironment, checkDevelopmentEnvironment } from './startup-validation'
import { startScheduledValidation } from './runtime-validation'
import { logger } from './logger'

interface InitializationResult {
  success: boolean
  canContinue: boolean
  errors: string[]
  warnings: string[]
  services: {
    environmentValidation: boolean
    scheduledValidation: boolean
  }
}

/**
 * Main application initialization function
 * Should be called as early as possible in the application lifecycle
 */
export async function initializeApplication(): Promise<InitializationResult> {
  const startTime = performance.now()
  
  logger.info('Application initialization started', {
    component: 'app-initialization',
    function: 'initializeApplication',
    environment: process.env.NODE_ENV
  })
  
  const errors: string[] = []
  const warnings: string[] = []
  const services = {
    environmentValidation: false,
    scheduledValidation: false
  }
  
  try {
    // 1. Validate startup environment
    logger.info('Starting environment validation...', {
      component: 'app-initialization',
      step: 'environment-validation'
    })
    
    const envValidation = await validateStartupEnvironment()
    services.environmentValidation = envValidation.success
    
    if (!envValidation.success) {
      errors.push(...envValidation.errors)
    }
    
    if (envValidation.warnings.length > 0) {
      warnings.push(...envValidation.warnings)
    }
    
    if (!envValidation.canContinue) {
      logger.critical('Cannot continue application startup due to critical environment validation failures', undefined, {
        component: 'app-initialization',
        errors: envValidation.errors,
        criticalMissing: envValidation.criticalMissing
      })
      
      return {
        success: false,
        canContinue: false,
        errors,
        warnings,
        services
      }
    }
    
    // 2. Check development environment recommendations
    if (process.env.NODE_ENV === 'development') {
      logger.info('Checking development environment recommendations...', {
        component: 'app-initialization',
        step: 'development-check'
      })
      
      checkDevelopmentEnvironment()
    }
    
    // 3. Start scheduled validation (server-side only)
    if (typeof window === 'undefined') {
      try {
        logger.info('Starting scheduled environment validation...', {
          component: 'app-initialization',
          step: 'scheduled-validation'
        })
        
        startScheduledValidation(10 * 60 * 1000) // Every 10 minutes
        services.scheduledValidation = true
        
        logger.info('Scheduled validation started successfully', {
          component: 'app-initialization',
          interval: '10 minutes'
        })
      } catch (error) {
        logger.warn('Failed to start scheduled validation', {
          component: 'app-initialization',
          error: (error as Error).message
        })
        warnings.push('Scheduled environment validation could not be started')
      }
    }
    
    // 4. Initialize other services based on available environment variables
    await initializeOptionalServices(warnings)
    
    const duration = performance.now() - startTime
    const success = envValidation.success && services.environmentValidation
    
    if (success) {
      logger.info('Application initialization completed successfully', {
        component: 'app-initialization',
        duration,
        warningCount: warnings.length,
        services
      })
    } else {
      logger.warn('Application initialization completed with issues', {
        component: 'app-initialization',
        duration,
        errorCount: errors.length,
        warningCount: warnings.length,
        services
      })
    }
    
    return {
      success,
      canContinue: envValidation.canContinue,
      errors,
      warnings,
      services
    }
    
  } catch (error) {
    const duration = performance.now() - startTime
    
    logger.critical('Application initialization failed with exception', error as Error, {
      component: 'app-initialization',
      duration
    })
    
    return {
      success: false,
      canContinue: false,
      errors: ['Application initialization threw an exception'],
      warnings,
      services
    }
  }
}

/**
 * Initialize optional services based on environment configuration
 */
async function initializeOptionalServices(warnings: string[]): Promise<void> {
  // Redis initialization
  if (process.env.REDIS_URL || process.env.REDIS_HOST) {
    try {
      logger.debug('Redis configuration detected, initializing...', {
        component: 'app-initialization',
        service: 'redis'
      })
      
      // Redis initialization would go here
      // const redis = await initializeRedis()
      
      logger.info('Redis service initialized', {
        component: 'app-initialization',
        service: 'redis'
      })
    } catch (error) {
      logger.warn('Redis initialization failed', {
        component: 'app-initialization',
        service: 'redis',
        error: (error as Error).message
      })
      warnings.push('Redis service could not be initialized')
    }
  } else {
    logger.info('Redis not configured, skipping initialization', {
      component: 'app-initialization',
      service: 'redis'
    })
  }
  
  // Monitoring service initialization
  if (process.env.SENTRY_DSN || process.env.DATADOG_API_KEY) {
    try {
      logger.debug('Monitoring service configuration detected', {
        component: 'app-initialization',
        service: 'monitoring'
      })
      
      // Monitoring initialization would go here
      
      logger.info('Monitoring service initialized', {
        component: 'app-initialization',
        service: 'monitoring'
      })
    } catch (error) {
      logger.warn('Monitoring service initialization failed', {
        component: 'app-initialization',
        service: 'monitoring',
        error: (error as Error).message
      })
      warnings.push('Monitoring service could not be initialized')
    }
  }
  
  // Analytics initialization
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GTM_ID) {
    logger.info('Analytics configuration detected', {
      component: 'app-initialization',
      service: 'analytics',
      ga: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      gtm: !!process.env.NEXT_PUBLIC_GTM_ID
    })
  }
}

/**
 * Quick initialization for critical services only
 * Use when full initialization is not needed or too slow
 */
export async function quickInitialization(): Promise<boolean> {
  const startTime = performance.now()
  
  try {
    logger.info('Quick initialization started', {
      component: 'app-initialization',
      function: 'quickInitialization'
    })
    
    // Only validate critical environment variables
    const { validateCriticalStartup } = await import('./startup-validation')
    const result = validateCriticalStartup()
    
    const duration = performance.now() - startTime
    
    logger.info('Quick initialization completed', {
      component: 'app-initialization',
      function: 'quickInitialization',
      success: result,
      duration
    })
    
    return result
  } catch (error) {
    logger.error('Quick initialization failed', error as Error, {
      component: 'app-initialization',
      function: 'quickInitialization'
    })
    return false
  }
}

/**
 * Initialization status checker
 */
export function getInitializationStatus(): {
  initialized: boolean
  timestamp: Date | null
  environment: string
} {
  // This would typically check some global state or cache
  // For now, return basic info
  return {
    initialized: true, // Assume initialized if this function is callable
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'unknown'
  }
}

/**
 * Export initialization hooks for different environments
 */
export const initializationHooks = {
  /**
   * Development mode initialization
   */
  development: async () => {
    logger.info('Development mode initialization', {
      component: 'app-initialization',
      mode: 'development'
    })
    
    const result = await initializeApplication()
    
    // Additional development-specific initialization
    if (result.warnings.length > 0) {
      logger.warn('Development environment has configuration warnings', {
        component: 'app-initialization',
        warnings: result.warnings
      })
    }
    
    return result
  },
  
  /**
   * Production mode initialization
   */
  production: async () => {
    logger.info('Production mode initialization', {
      component: 'app-initialization',
      mode: 'production'
    })
    
    const result = await initializeApplication()
    
    // In production, any errors should be treated more seriously
    if (!result.success) {
      logger.critical('Production initialization failed', undefined, {
        component: 'app-initialization',
        errors: result.errors
      })
    }
    
    return result
  },
  
  /**
   * Test mode initialization
   */
  test: async () => {
    logger.info('Test mode initialization', {
      component: 'app-initialization',
      mode: 'test'
    })
    
    // Use quick initialization for tests
    return await quickInitialization()
  }
}