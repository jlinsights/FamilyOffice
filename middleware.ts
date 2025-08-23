import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  
  if (
    process.env.NODE_ENV === 'production' &&
    protocol !== 'https' &&
    host?.includes('familyoffices.vip')
  ) {
    return NextResponse.redirect(
      `https://${host}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    );
  }

  // Add security headers
  const response = NextResponse.next();
  
  // Ensure proper content type for CSS files
  if (request.nextUrl.pathname.startsWith('/_next/static/css/')) {
    response.headers.set('Content-Type', 'text/css; charset=utf-8');
  }
  
  // Add CORS headers for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Also match static files to add proper headers
    '/_next/static/(.*)',
  ],
};