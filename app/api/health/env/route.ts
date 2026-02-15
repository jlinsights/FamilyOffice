/**
 * Environment validation API endpoint
 * Provides runtime environment variable validation and status
 */
import { NextResponse } from 'next/server';
import { validateEnv, validateCriticalEnvVars } from '@/lib/env';

export async function GET() {
  try {
    const validation = validateEnv();
    const criticalValid = validateCriticalEnvVars();

    const response = {
      success: validation.success && criticalValid,
      environment: process.env.NODE_ENV,
      critical: {
        valid: criticalValid,
      },
      timestamp: new Date().toISOString(),
    };

    const httpStatus = validation.success && criticalValid ? 200 : 500;

    return NextResponse.json(response, { status: httpStatus });
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error during environment validation',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Health check endpoint for critical environment variables only
export async function HEAD() {
  try {
    const criticalValid = validateCriticalEnvVars();

    return new NextResponse(null, {
      status: criticalValid ? 200 : 503,
      headers: {
        'X-Environment-Valid': criticalValid.toString(),
      },
    });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
