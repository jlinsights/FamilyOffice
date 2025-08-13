import { NextResponse } from 'next/server';

// import { swaggerConfig } from '@/lib/api/swagger-config';

// Generate Swagger JSON spec
export async function GET() {
  try {
    return NextResponse.json({
      openapi: '3.0.0',
      info: { title: 'API Docs', version: '1.0.0' }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating API documentation:', error);
    return NextResponse.json(
      { error: 'Failed to generate API documentation' },
      { status: 500 }
    );
  }
}
