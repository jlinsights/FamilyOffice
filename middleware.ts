import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createEnvironmentMiddleware } from '@/lib/runtime-validation'
import { logger } from '@/lib/logger'

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/dashboard(.*)',
  '/api/admin(.*)'
])

// Create environment validation middleware
const environmentMiddleware = createEnvironmentMiddleware({
  validateCriticalOnly: true, // Only validate critical vars in middleware for performance
  skipPaths: [
    '/api/health', // Skip health check endpoints
    '/_next', // Skip Next.js internal routes
    '/favicon', // Skip static assets
    '/robots.txt',
    '/sitemap.xml'
  ],
  onValidationFailed: (errors) => {
    logger.warn('Environment validation failed in middleware', {
      component: 'middleware',
      metadata: { errors }
    })
    
    // Return a generic service unavailable response
    return NextResponse.json(
      {
        error: 'Service temporarily unavailable',
        message: 'System configuration error',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
})

export default clerkMiddleware(async (auth, req) => {
  try {
    // First, validate environment variables
    const envResponse = await environmentMiddleware(req)
    if (envResponse) {
      return envResponse // Return early if environment validation failed
    }
    
    // Then, handle authentication for protected routes
    if (isProtectedRoute(req)) {
      auth.protect()
    }
    
    return NextResponse.next()
  } catch (error) {
    logger.error('Middleware error', error as Error, {
      component: 'middleware',
      metadata: { pathname: req.nextUrl.pathname }
    })
    
    // For API routes, return JSON error
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An unexpected error occurred',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }
    
    // For regular routes, continue with the request but log the error
    return NextResponse.next()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}