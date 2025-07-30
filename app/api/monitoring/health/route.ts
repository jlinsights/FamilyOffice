/**
 * Monitoring Health Check API Endpoint
 * Provides status of monitoring services and recent error/performance data
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const detailed = searchParams.get('detailed') === 'true'

    // Check monitoring service configuration
    const monitoringServices = {
      sentry: {
        configured: !!process.env.SENTRY_DSN,
        enabled: !!process.env.SENTRY_DSN && process.env.NODE_ENV === 'production'
      },
      datadog: {
        configured: !!process.env.DATADOG_API_KEY,
        enabled: !!process.env.DATADOG_API_KEY && process.env.NODE_ENV === 'production'
      },
      internal_api: {
        configured: true,
        enabled: true
      }
    }

    // Calculate overall monitoring health
    const configuredServices = Object.values(monitoringServices).filter(service => service.configured).length
    const enabledServices = Object.values(monitoringServices).filter(service => service.enabled).length
    const totalServices = Object.keys(monitoringServices).length

    const healthScore = Math.round((configuredServices / totalServices) * 100)
    const activeScore = Math.round((enabledServices / totalServices) * 100)

    const response: any = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      monitoring: {
        health_score: healthScore,
        active_score: activeScore,
        services: monitoringServices
      }
    }

    // Add detailed information if requested
    if (detailed) {
      response.monitoring.configuration = {
        sentry_dsn_configured: !!process.env.SENTRY_DSN,
        datadog_api_key_configured: !!process.env.DATADOG_API_KEY,
        production_mode: process.env.NODE_ENV === 'production'
      }

      response.monitoring.endpoints = {
        errors: `${request.nextUrl.origin}/api/monitoring/errors`,
        performance: `${request.nextUrl.origin}/api/monitoring/performance`,
        health: `${request.nextUrl.origin}/api/monitoring/health`
      }

      // In a real application, you might include:
      // - Recent error counts
      // - Performance metrics summary
      // - Alert status
      // - Service availability statistics
    }

    logger.info('Monitoring health check completed', {
      component: 'monitoring-health-api',
      healthScore,
      activeScore,
      detailed
    })

    const httpStatus = healthScore >= 50 ? 200 : 503

    return NextResponse.json(response, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Health-Score': healthScore.toString(),
        'X-Active-Score': activeScore.toString()
      }
    })

  } catch (error) {
    logger.error('Monitoring health check failed', error as Error, {
      component: 'monitoring-health-api'
    })

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Monitoring health check failed',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}