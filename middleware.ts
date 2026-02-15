import { NextResponse } from 'next/server';
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import { ALLOWED_ORIGINS } from '@/lib/config';
import { globalRateLimit } from '@/lib/rate-limit';
import {
  autoSecurityResponse,
  detectSuspiciousActivity,
  logSecurityEvent,
} from '@/lib/security/security-monitor';

// 보호된 API 경로 패턴
const isProtectedApiRoute = createRouteMatcher([
  '/api/admin(.*)',
  '/api/financial/admin(.*)',
  '/api/internal(.*)',
]);

// 온보딩이 필요한 경로 (인증된 사용자가 접근하는 주요 페이지)
const isOnboardingRequiredRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
]);

// 온보딩 예외 경로 (이 경로들은 온보딩 체크하지 않음)
const isOnboardingExcludedRoute = createRouteMatcher([
  '/onboarding(.*)',
  '/auth(.*)',
  '/api(.*)',
  '/_next(.*)',
]);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export default clerkMiddleware(async (auth, request) => {
  // 0. 의심스러운 활동 감지 및 자동 대응
  const suspiciousActivity = detectSuspiciousActivity(request);
  if (suspiciousActivity.isSuspicious) {
    const securityResponse = await autoSecurityResponse(
      request,
      suspiciousActivity
    );
    if (securityResponse) {
      return securityResponse; // 자동 차단
    }
  }

  // 1. 보호된 API 경로에 대한 인증 검사
  if (isProtectedApiRoute(request)) {
    const { userId } = await auth();
    if (!userId) {
      // 무단 접근 시도 로깅
      await logSecurityEvent(
        {
          type: 'invalid_auth',
          severity: 'high',
          description: `Unauthorized access attempt to ${request.nextUrl.pathname}`,
          additional_data: { path: request.nextUrl.pathname },
        },
        request
      );

      return NextResponse.json(
        {
          error: 'Unauthorized access to protected route',
          timestamp: new Date().toISOString(),
          path: request.nextUrl.pathname,
        },
        { status: 401 }
      );
    } else {
      // 관리자 접근 로깅 (인증된 사용자)
      // 실제 관리자 권한 확인은 API Route 내부에서 수행해야 함
      await logSecurityEvent(
        {
          type: 'admin_access',
          severity: 'medium',
          description: `Authenticated access to ${request.nextUrl.pathname}`,
          additional_data: { path: request.nextUrl.pathname, userId },
        },
        request
      );
    }
  }

  // 1.5 온보딩 체크 - 인증된 사용자가 주요 페이지 접근 시
  if (
    isOnboardingRequiredRoute(request) &&
    !isOnboardingExcludedRoute(request)
  ) {
    const { userId } = await auth();
    if (userId) {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const onboardingCompleted = user.unsafeMetadata?.onboardingCompleted;

        if (!onboardingCompleted) {
          // 온보딩이 완료되지 않은 경우 리다이렉트
          const onboardingUrl = new URL('/onboarding', request.url);
          return NextResponse.redirect(onboardingUrl);
        }
      } catch (error) {
        // 사용자 정보 조회 실패 시 계속 진행 (온보딩 스킵)
        console.error('Onboarding check failed:', error);
      }
    }
  }

  // 2. Rate limiting 검사 (API 요청에 대해서만)
  let rateLimitResult: Response | Record<string, string> | null = null;
  if (request.nextUrl.pathname.startsWith('/api/')) {
    rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult && rateLimitResult instanceof Response) {
      // Rate limit 위반 로깅
      await logSecurityEvent(
        {
          type: 'rate_limit_exceeded',
          severity: 'medium',
          description: `Rate limit exceeded for ${request.nextUrl.pathname}`,
          additional_data: {
            path: request.nextUrl.pathname,
            method: request.method,
          },
        },
        request
      );

      return rateLimitResult;
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

  // 5. Rate limit headers 추가 (성공한 요청에 대해, 위에서 캐시된 결과 재사용)
  if (rateLimitResult && !(rateLimitResult instanceof Response)) {
    Object.entries(rateLimitResult).forEach(([key, value]) => {
      response.headers.set(key, value as string);
    });
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
      response.headers.set(
        'Access-Control-Allow-Origin',
        'https://familyoffices.vip'
      );
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // API 요청에 대한 CORS 헤더 추가
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (origin && isAllowedOrigin(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // 추가 보안 헤더
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Explicitly match API routes to ensure they are covered
    '/api/:path*',
  ],
};
