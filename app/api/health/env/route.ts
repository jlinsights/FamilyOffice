/**
 * Environment validation API endpoint
 * Provides runtime environment variable validation and status
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateEnv, validateCriticalEnvVars, EnvironmentManager } from '@/lib/env'
import { logger } from '@/lib/logger'

const envManager = EnvironmentManager.getInstance()

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const detailed = url.searchParams.get('detailed') === 'true'
    
    logger.debug('Environment validation API called', {
      component: 'env-api',
      function: 'GET',
      metadata: { category, detailed }
    })
    
    // Category-specific validation
    if (category) {
      const validCategories = ['core', 'auth', 'database', 'redis', 'apis', 'analytics', 'monitoring', 'security']
      
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { 
            error: 'Invalid category',
            validCategories 
          },
          { status: 400 }
        )
      }
      
      const validation = envManager.validateCategory(category as any)
      
      return NextResponse.json({
        category,
        success: validation.success,
        errors: validation.errors || [],
        timestamp: new Date().toISOString()
      })
    }
    
    // Full environment validation
    const validation = validateEnv()
    const status = envManager.getEnvironmentStatus()
    const criticalValid = validateCriticalEnvVars()
    
    const response = {
      success: validation.success && criticalValid,
      environment: status.environment,
      status: {
        isValid: status.isValid,
        core: status.core,
        optional: status.optional,
        errors: status.errors,
        warnings: status.warnings
      },
      critical: {
        valid: criticalValid
      },
      timestamp: new Date().toISOString()
    }
    
    // Add detailed information if requested
    if (detailed && validation.success) {
      const categories = ['core', 'auth', 'database', 'redis', 'apis', 'analytics', 'monitoring', 'security']
      const categoryResults: Record<string, any> = {}
      
      for (const cat of categories) {
        const catValidation = envManager.validateCategory(cat as any)
        categoryResults[cat] = {
          success: catValidation.success,
          errorCount: catValidation.errors?.length || 0
        }
      }
      
      (response as any).categories = categoryResults
    }
    
    // Include errors and warnings if validation failed
    if (!validation.success) {
      (response as any).errors = validation.errors || []
    }
    
    if (validation.warnings && validation.warnings.length > 0) {
      (response as any).warnings = validation.warnings
    }
    
    const httpStatus = validation.success && criticalValid ? 200 : 500
    
    logger.info('Environment validation API response', {
      component: 'env-api',
      function: 'GET',
      metadata: {
        success: response.success,
        errorCount: status.errors,
        warningCount: status.warnings
      }
    })
    
    return NextResponse.json(response, { status: httpStatus })
    
  } catch (error) {
    logger.error('Environment validation API error', error as Error, {
      component: 'env-api',
      function: 'GET'
    })
    
    return NextResponse.json(
      { 
        error: 'Internal server error during environment validation',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Health check endpoint for critical environment variables only
export async function HEAD(_request: NextRequest) {
  try {
    const criticalValid = validateCriticalEnvVars()
    
    logger.debug('Environment health check', {
      component: 'env-api',
      function: 'HEAD',
      metadata: { critical: criticalValid }
    })
    
    return new NextResponse(null, { 
      status: criticalValid ? 200 : 503,
      headers: {
        'X-Environment-Status': criticalValid ? 'healthy' : 'unhealthy',
        'X-Timestamp': new Date().toISOString()
      }
    })
  } catch (error) {
    logger.error('Environment health check error', error as Error, {
      component: 'env-api',
      function: 'HEAD'
    })
    
    return new NextResponse(null, { status: 503 })
  }
}