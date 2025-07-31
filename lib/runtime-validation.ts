/**
 * Runtime Environment Validation for Server-Side Operations
 * Provides validation hooks for API routes, middleware, and server components
 */

import { validateCriticalEnvVars, validateEnv, EnvironmentManager } from './env'
import { logger } from './logger'
import { NextRequest, NextResponse } from 'next/server'

interface ValidationCache {
  isValid: boolean
  timestamp: number
  errors: string[]
}

class RuntimeValidator {
  private static instance: RuntimeValidator
  private cache: ValidationCache | null = null
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
  
  private constructor() {}
  
  static getInstance(): RuntimeValidator {
    if (!RuntimeValidator.instance) {
      RuntimeValidator.instance = new RuntimeValidator()
    }
    return RuntimeValidator.instance
  }
  
  /**
   * Validate environment with caching for performance
   */
  async validateWithCache(): Promise<ValidationCache> {
    const now = Date.now()
    
    // Return cached result if valid
    if (this.cache && (now - this.cache.timestamp) < this.CACHE_DURATION) {
      return this.cache
    }
    
    // Perform validation
    const startTime = performance.now()
    const validation = validateEnv()
    const criticalValid = validateCriticalEnvVars()
    const duration = performance.now() - startTime
    
    const errors: string[] = []
    
    if (!validation.success && validation.errors) {
      errors.push(...validation.errors.map(e => `${e.field}: ${e.message}`))
    }
    
    if (!criticalValid) {
      errors.push('Critical environment variables validation failed')
    }
    
    const result: ValidationCache = {
      isValid: validation.success && criticalValid,
      timestamp: now,
      errors
    }
    
    this.cache = result
    
    logger.debug('Runtime validation completed', {
      component: 'RuntimeValidator',
      function: 'validateWithCache',
      metadata: {
        isValid: result.isValid,
        errorCount: errors.length,
        duration,
        cached: false
      }
    })
    
    return result
  }
  
  /**
   * Quick critical validation without caching
   */
  validateCritical(): boolean {
    try {
      const result = validateCriticalEnvVars()
      
      if (!result) {
        logger.warn('Critical runtime validation failed', {
          component: 'RuntimeValidator',
          function: 'validateCritical'
        })
      }
      
      return result
    } catch (error) {
      logger.error('Critical runtime validation threw exception', error as Error, {
        component: 'RuntimeValidator',
        function: 'validateCritical'
      })
      return false
    }
  }
  
  /**
   * Clear validation cache
   */
  clearCache(): void {
    this.cache = null
    logger.debug('Runtime validation cache cleared', {
      component: 'RuntimeValidator',
      function: 'clearCache'
    })
  }
  
  /**
   * Get current validation status without re-validating
   */
  getCachedStatus(): ValidationCache | null {
    return this.cache
  }
}

// Singleton instance
const runtimeValidator = RuntimeValidator.getInstance()

/**
 * Middleware factory for environment validation
 */
export function createEnvironmentMiddleware(options: {
  validateCriticalOnly?: boolean
  skipPaths?: string[]
  onValidationFailed?: (errors: string[]) => NextResponse
} = {}) {
  const { 
    validateCriticalOnly = false, 
    skipPaths = [],
    onValidationFailed 
  } = options
  
  return async function environmentMiddleware(
    request: NextRequest
  ): Promise<NextResponse | undefined> {
    const pathname = request.nextUrl.pathname
    
    // Skip validation for specified paths
    if (skipPaths.some(path => pathname.startsWith(path))) {
      return undefined
    }
    
    try {
      let isValid: boolean
      let errors: string[] = []
      
      if (validateCriticalOnly) {
        isValid = runtimeValidator.validateCritical()
        if (!isValid) {
          errors = ['Critical environment variables validation failed']
        }
      } else {
        const validation = await runtimeValidator.validateWithCache()
        isValid = validation.isValid
        errors = validation.errors
      }
      
      if (!isValid) {
        logger.warn('Environment validation failed in middleware', {
          component: 'environmentMiddleware',
          metadata: {
            pathname,
            errors
          }
        })
        
        if (onValidationFailed) {
          return onValidationFailed(errors)
        }
        
        // Default response for validation failure
        return NextResponse.json(
          {
            error: 'Environment configuration error',
            message: 'Required environment variables are not properly configured',
            timestamp: new Date().toISOString()
          },
          { status: 503 }
        )
      }
      
      // Add validation headers to response
      return NextResponse.next({
        headers: {
          'X-Environment-Validated': 'true',
          'X-Validation-Timestamp': new Date().toISOString()
        }
      })
      
    } catch (error) {
      logger.error('Environment middleware error', error as Error, {
        component: 'environmentMiddleware',
        metadata: { pathname }
      })
      
      return NextResponse.json(
        {
          error: 'Environment validation error',
          message: 'An error occurred during environment validation',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }
  }
}

/**
 * API route wrapper for environment validation
 */
export function withEnvironmentValidation<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
  options: {
    validateCriticalOnly?: boolean
    requireValid?: boolean
  } = {}
) {
  const { validateCriticalOnly = false, requireValid = true } = options
  
  return async function validatedHandler(...args: T): Promise<NextResponse> {
    const startTime = performance.now()
    
    try {
      let isValid: boolean
      let errors: string[] = []
      
      if (validateCriticalOnly) {
        isValid = runtimeValidator.validateCritical()
        if (!isValid) {
          errors = ['Critical environment variables validation failed']
        }
      } else {
        const validation = await runtimeValidator.validateWithCache()
        isValid = validation.isValid
        errors = validation.errors
      }
      
      if (!isValid && requireValid) {
        logger.warn('API request blocked due to environment validation failure', {
          component: 'withEnvironmentValidation',
          metadata: { errors }
        })
        
        return NextResponse.json(
          {
            error: 'Environment configuration error',
            message: 'Required environment variables are not properly configured',
            errors: process.env.NODE_ENV === 'development' ? errors : undefined,
            timestamp: new Date().toISOString()
          },
          { status: 503 }
        )
      }
      
      // Execute the handler
      const response = await handler(...args)
      
      // Add validation headers
      response.headers.set('X-Environment-Validated', isValid.toString())
      response.headers.set('X-Validation-Timestamp', new Date().toISOString())
      
      const duration = performance.now() - startTime
      
      logger.debug('API request completed with environment validation', {
        component: 'withEnvironmentValidation',
        metadata: {
          isValid,
          duration,
          status: response.status
        }
      })
      
      return response
      
    } catch (error) {
      const duration = performance.now() - startTime
      
      logger.error('Environment validation wrapper error', error as Error, {
        component: 'withEnvironmentValidation',
        duration
      })
      
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An error occurred during request processing',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }
  }
}

/**
 * Server component validation hook
 */
export async function validateServerEnvironment(): Promise<{
  isValid: boolean
  errors: string[]
  canRender: boolean
}> {
  try {
    const validation = await runtimeValidator.validateWithCache()
    const criticalValid = runtimeValidator.validateCritical()
    
    return {
      isValid: validation.isValid,
      errors: validation.errors,
      canRender: criticalValid // Can render with warnings, but not without critical vars
    }
  } catch (error) {
    logger.error('Server environment validation error', error as Error, {
      component: 'validateServerEnvironment'
    })
    
    return {
      isValid: false,
      errors: ['Server environment validation failed'],
      canRender: false
    }
  }
}

/**
 * Scheduled validation for background processes
 */
export function startScheduledValidation(intervalMs: number = 10 * 60 * 1000): NodeJS.Timeout {
  logger.info('Starting scheduled environment validation', {
    component: 'scheduledValidation',
    metadata: { intervalMs }
  })
  
  const interval = setInterval(async () => {
    try {
      const validation = await runtimeValidator.validateWithCache()
      
      if (!validation.isValid) {
        logger.warn('Scheduled environment validation failed', {
          component: 'scheduledValidation',
          metadata: { errors: validation.errors }
        })
      } else {
        logger.debug('Scheduled environment validation passed', {
          component: 'scheduledValidation'
        })
      }
    } catch (error) {
      logger.error('Scheduled environment validation error', error as Error, {
        component: 'scheduledValidation'
      })
    }
  }, intervalMs)
  
  return interval
}

/**
 * Export validation utilities
 */
export {
  runtimeValidator,
  RuntimeValidator
}

/**
 * Quick validation functions for specific use cases
 */
export const quickValidation = {
  /**
   * Check if Redis is configured
   */
  hasRedis(): boolean {
    return !!(process.env.REDIS_URL || process.env.REDIS_HOST)
  },
  
  /**
   * Check if monitoring is configured
   */
  hasMonitoring(): boolean {
    return !!(process.env.SENTRY_DSN || process.env.DATADOG_API_KEY)
  },
  
  /**
   * Check if analytics is configured
   */
  hasAnalytics(): boolean {
    return !!(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GTM_ID)
  },
  
  /**
   * Check if external APIs are configured
   */
  hasExternalApis(): boolean {
    return !!(process.env.V0_API_KEY || process.env.ALPHA_VANTAGE_API_KEY || process.env.YAHOO_FINANCE_API_KEY)
  }
}