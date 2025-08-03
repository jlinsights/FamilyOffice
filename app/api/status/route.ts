/**
 * Simple System Status API Route
 */
import { NextResponse } from 'next/server';

export async function GET() {
  const response = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    health: {
      overall: 100,
      core: 100,
      services: 100,
    },
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
