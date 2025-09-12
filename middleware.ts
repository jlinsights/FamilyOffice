import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { globalRateLimit } from '@/lib/rate-limit';
import { currentUser } from '@clerk/nextjs/server';
import { detectSuspiciousActivity, autoSecurityResponse, logSecurityEvent } from '@/lib/security/security-monitor';

// 허용된 도메인 목록 - 보안 강화
const ALLOWED_ORIGINS = [
  'https://familyoffices.vip',
  'https://www.familyoffices.vip',
  'https://familyoffice-jet.vercel.app',
  'https://familyoffice-jlinsights-projects.vercel.app',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
];

// 슈퍼 관리자 이메일 목록
const SUPER_ADMIN_EMAILS = ['jhlim725@gmail.com'];

// 보호된 API 경로 패턴
const PROTECTED_API_PATTERNS = [
  /^\/api\/admin\//,
  /^\/api\/financial\/admin\//,
  /^\/api\/internal\//
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

function isProtectedApiRoute(pathname: string): boolean {
  return PROTECTED_API_PATTERNS.some(pattern => pattern.test(pathname));
}

async function checkAdminPermission(request: NextRequest): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;

    const primaryEmail = user.emailAddresses.find(
      email => email.id === user.primaryEmailAddressId
    );

    if (!primaryEmail) return false;

    return SUPER_ADMIN_EMAILS.includes(
      primaryEmail.emailAddress.toLowerCase()
    );
  } catch (error) {
    console.error('Admin permission check error:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  // 0. 의심스러운 활동 감지 및 자동 대응
  const suspiciousActivity = detectSuspiciousActivity(request);
  if (suspiciousActivity.isSuspicious) {
    const securityResponse = await autoSecurityResponse(request, suspiciousActivity);
    if (securityResponse) {
      return securityResponse; // 자동 차단
    }
  }

  // 1. 보호된 API 경로에 대한 인증 검사
  if (isProtectedApiRoute(request.nextUrl.pathname)) {
    const isAuthorized = await checkAdminPermission(request);
    if (!isAuthorized) {
      // 무단 접근 시도 로깅
      await logSecurityEvent({
        type: 'invalid_auth',
        severity: 'high',
        description: `Unauthorized access attempt to ${request.nextUrl.pathname}`,
        additional_data: { path: request.nextUrl.pathname }
      }, request);

      return NextResponse.json(
        { 
          error: 'Unauthorized access to protected route',
          timestamp: new Date().toISOString(),
          path: request.nextUrl.pathname
        },
        { status: 403 }
      );
    } else {
      // 관리자 접근 로깅
      await logSecurityEvent({
        type: 'admin_access',
        severity: 'medium',
        description: `Admin access to ${request.nextUrl.pathname}`,
        additional_data: { path: request.nextUrl.pathname }
      }, request);
    }
  }

  // 2. Rate limiting 검사 (API 요청에 대해서만)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitResponse = await globalRateLimit(request);
    if (rateLimitResponse && rateLimitResponse instanceof Response) {
      // Rate limit 위반 로깅
      await logSecurityEvent({
        type: 'rate_limit_exceeded',
        severity: 'medium',
        description: `Rate limit exceeded for ${request.nextUrl.pathname}`,
        additional_data: { 
          path: request.nextUrl.pathname,
          method: request.method
        }
      }, request);

      return rateLimitResponse;
    }
  }

  // 3. Force HTTPS in production
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

  // 4. Create response and add security headers
  const response = NextResponse.next();
  const origin = request.headers.get('origin');
  
  // 5. Rate limit headers 추가 (성공한 요청에 대해)
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
    if (origin && isAllowedOrigin(origin)) {
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
    if (origin && isAllowedOrigin(origin)) {
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