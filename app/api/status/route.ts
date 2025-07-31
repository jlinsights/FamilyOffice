/**
 * System Status API Route
 * Demonstrates runtime environment validation in API routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { withEnvironmentValidation, quickValidation } from '@/lib/runtime-validation'
import { validateServerEnvironment } from '@/lib/runtime-validation'
import { logger } from '@/lib/logger'

async function statusHandler(_request: NextRequest): Promise<NextResponse> {
  const startTime = performance.now()
  
  try {
    // Get detailed environment status
    const envStatus = await validateServerEnvironment()
    
    // Check optional service configurations
    const services = {
      redis: quickValidation.hasRedis(),
      monitoring: quickValidation.hasMonitoring(),
      analytics: quickValidation.hasAnalytics(),
      externalApis: quickValidation.hasExternalApis()
    }
    
    // Calculate overall health score
    const coreHealthScore = envStatus.isValid ? 100 : 0
    const servicesConfigured = Object.values(services).filter(Boolean).length
    const totalServices = Object.keys(services).length
    const servicesScore = (servicesConfigured / totalServices) * 100
    
    const overallHealth = Math.round((coreHealthScore * 0.7) + (servicesScore * 0.3))
    
    const duration = performance.now() - startTime
    
    const response = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      health: {
        overall: overallHealth,
        core: coreHealthScore,
        services: servicesScore
      },
      environment_validation: {
        valid: envStatus.isValid,
        can_render: envStatus.canRender,
        error_count: envStatus.errors.length,
        errors: process.env.NODE_ENV === 'development' ? envStatus.errors : undefined
      },
      services,
      performance: {
        validation_duration_ms: Math.round(duration)
      }
    }
    
    const httpStatus = envStatus.canRender ? 200 : 503
    
    logger.info('System status check completed', {
      component: 'status-api',
      metadata: {
        overallHealth,
        environmentValid: envStatus.isValid
      },
      duration
    })
    
    return NextResponse.json(response, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Health-Score': overallHealth.toString(),
        'X-Environment-Valid': envStatus.isValid.toString()
      }
    })
    
  } catch (error) {
    const duration = performance.now() - startTime
    
    logger.error('System status check failed', error as Error, {
      component: 'status-api',
      duration
    })
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'System status check failed',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// Wrap the handler with environment validation
export const GET = withEnvironmentValidation(statusHandler, {
  validateCriticalOnly: false, // Full validation for status endpoint
  requireValid: false // Allow status check even if environment has issues
})