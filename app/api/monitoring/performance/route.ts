/**
 * Performance Monitoring API Endpoint
 * Receives performance metrics from the ErrorMonitor service
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

interface PerformanceReport {
  metric: string
  duration: number
  timestamp: string
  context?: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const performanceReport: PerformanceReport = await request.json()

    // Validate required fields
    if (!performanceReport.metric || typeof performanceReport.duration !== 'number' || !performanceReport.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: metric, duration, timestamp' },
        { status: 400 }
      )
    }

    // Log the performance metric using our structured logging system
    logger.performance(performanceReport.metric, performanceReport.duration, {
      component: 'monitoring-api',
      function: 'performanceEndpoint',
      metadata: {
        clientTimestamp: performanceReport.timestamp,
        ...performanceReport.context
      }
    })

    // Check for performance issues that need attention
    const isSlowPerformance = performanceReport.duration > 3000 // 3 seconds
    const isCriticalPerformance = performanceReport.duration > 10000 // 10 seconds

    if (isCriticalPerformance) {
      logger.critical('Critical performance issue detected', undefined, {
        component: 'monitoring-api',
        metadata: {
          metric: performanceReport.metric,
          duration: performanceReport.duration,
          clientReport: true,
          ...performanceReport.context
        }
      })
    } else if (isSlowPerformance) {
      logger.warn('Slow performance detected', {
        component: 'monitoring-api',
        metadata: {
          metric: performanceReport.metric,
          duration: performanceReport.duration,
          clientReport: true,
          ...performanceReport.context
        }
      })
    }

    // In production, you might want to:
    // 1. Store metrics in time-series database
    // 2. Calculate percentiles and trends
    // 3. Set up alerting for performance degradation
    // 4. Generate performance dashboards

    return NextResponse.json(
      { 
        success: true, 
        message: 'Performance report received',
        timestamp: new Date().toISOString(),
        metrics: {
          received: performanceReport.metric,
          duration: performanceReport.duration,
          status: isCriticalPerformance ? 'critical' : isSlowPerformance ? 'warning' : 'ok'
        }
      },
      { status: 200 }
    )

  } catch (error) {
    logger.error('Failed to process performance report', error as Error, {
      component: 'monitoring-api',
      function: 'performanceEndpoint'
    })

    return NextResponse.json(
      { 
        error: 'Failed to process performance report',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Handle GET requests to provide information about this endpoint
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/monitoring/performance',
    method: 'POST',
    description: 'Submit performance metrics for monitoring',
    required_fields: ['metric', 'duration', 'timestamp'],
    optional_fields: ['context'],
    example: {
      metric: 'api_response_time',
      duration: 1250,
      timestamp: new Date().toISOString(),
      context: {
        endpoint: '/api/users',
        method: 'GET',
        userId: 'user_123'
      }
    }
  })
}