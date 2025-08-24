import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { globalRateLimit } from '@/lib/rate-limit';

// 허용된 도메인 목록 - 보안 강화
const ALLOWED_ORIGINS = [
  'https://familyoffices.vip',
  'https://www.familyoffices.vip',
  'https://familyoffice-jet.vercel.app',
  'https://familyoffice-jlinsights-projects.vercel.app',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export async function middleware(request: NextRequest) {
  // 1. Rate limiting 검사 (API 요청에 대해서만)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitResponse = await globalRateLimit(request);
    if (rateLimitResponse && rateLimitResponse instanceof Response) {
      // Rate limit exceeded
      return rateLimitResponse;
    }
  }

  // 2. Force HTTPS in production
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

  // 3. Create response and add security headers
  const response = NextResponse.next();
  const origin = request.headers.get('origin');
  
  // 4. Rate limit headers 추가 (성공한 요청에 대해)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitHeaders = await globalRateLimit(request);
    if (rateLimitHeaders && typeof rateLimitHeaders === 'object') {
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }
  }
  
  // Ensure proper content type for CSS files
  if (request.nextUrl.pathname.startsWith('/_next/static/css/')) {
    response.headers.set('Content-Type', 'text/css; charset=utf-8');
  }
  
  // 보안 강화된 CORS 헤더 설정
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    // Static assets는 허용된 도메인에서만 접근 가능
    if (isAllowedOrigin(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    } else {
      // 기본적으로 자체 도메인 허용
      response.headers.set('Access-Control-Allow-Origin', 'https://familyoffices.vip');
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // API 요청에 대한 CORS 헤더 추가
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (isAllowedOrigin(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // 추가 보안 헤더
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
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