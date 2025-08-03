/**
 * Error Monitoring API Endpoint
 * Receives error reports from the ErrorMonitor service
 */
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';

interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: string;
  context?: Record<string, any>;
  userAgent?: string;
  url?: string;
}

export async function POST(request: NextRequest) {
  try {
    const errorReport: ErrorReport = await request.json();

    // Validate required fields
    if (!errorReport.message || !errorReport.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: message, timestamp' },
        { status: 400 }
      );
    }

    // Log the error using our structured logging system
    logger.error('Client-reported error', new Error(errorReport.message), {
      component: 'monitoring-api',
      function: 'errorEndpoint',
      metadata: {
        clientTimestamp: errorReport.timestamp,
        userAgent: errorReport.userAgent,
        url: errorReport.url,
        stack: errorReport.stack,
        ...errorReport.context,
      },
    });

    // In production, you might want to:
    // 1. Store in database for analysis
    // 2. Trigger alerts for critical errors
    // 3. Rate limit to prevent spam

    // Check if this is a critical error that needs immediate attention
    const isCritical =
      errorReport.message.toLowerCase().includes('critical') ||
      errorReport.message.toLowerCase().includes('fatal') ||
      errorReport.context?.severity === 'critical';

    if (isCritical) {
      logger.critical(
        'Critical error reported from client',
        new Error(errorReport.message),
        {
          component: 'monitoring-api',
          metadata: {
            clientReport: true,
            ...errorReport.context,
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Error report received',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Failed to process error report', error as Error, {
      component: 'monitoring-api',
      function: 'errorEndpoint',
    });

    return NextResponse.json(
      {
        error: 'Failed to process error report',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Prevent GET requests to this endpoint
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit error reports.' },
    { status: 405 }
  );
}
