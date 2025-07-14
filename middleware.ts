import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimiters, applySecurityHeaders, CSRFProtection } from '@/lib/security/rate-limiter'

// Clerk middleware를 조건부로 import
let clerkMiddleware: any = null;
let createRouteMatcher: any = null;

try {
  const clerk = require("@clerk/nextjs/server");
  clerkMiddleware = clerk.clerkMiddleware;
  createRouteMatcher = clerk.createRouteMatcher;
} catch (error) {
  // Clerk가 설정되지 않은 경우 기본 미들웨어 사용
  clerkMiddleware = (handler: any) => handler;
  createRouteMatcher = (_routes: string[]) => () => false;
}

// 보호된 라우트 정의
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
  '/api/admin(.*)'
]);

// 관리자 전용 라우트 정의
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)'
]);

// Rate limiting route matchers
const isApiRoute = createRouteMatcher(['/api(.*)'])
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isContactRoute = createRouteMatcher(['/api/contact', '/contact'])
const isFinancialRoute = createRouteMatcher(['/api/financial(.*)'])
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/services',
  '/contact',
  '/faq',
  '/brand', 
  '/program',
  '/privacy',
  '/terms',
  '/api/docs(.*)',
  '/api/webhooks(.*)',
  '/api/financial(.*)',
  '/api/v0',
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

export default clerkMiddleware(async (auth: any, req: NextRequest) => {
  const { pathname } = req.nextUrl;
  
  // Rate limiting based on route type
  try {
    let rateLimitResponse: Response | null = null;
    
    if (isAuthRoute(req)) {
      rateLimitResponse = await rateLimiters.auth.createMiddleware()(req)
    } else if (isContactRoute(req)) {
      rateLimitResponse = await rateLimiters.contact.createMiddleware()(req)
    } else if (isFinancialRoute(req)) {
      rateLimitResponse = await rateLimiters.financial.createMiddleware()(req)
    } else if (isApiRoute(req)) {
      rateLimitResponse = await rateLimiters.api.createMiddleware()(req)
    } else {
      rateLimitResponse = await rateLimiters.pages.createMiddleware()(req)
    }
    
    if (rateLimitResponse) {
      return applySecurityHeaders(rateLimitResponse)
    }

    // CSRF Protection for API routes (except webhooks and docs)
    if (isApiRoute(req) && !pathname.includes('/webhooks') && !pathname.includes('/docs')) {
      const csrfResponse = CSRFProtection.createMiddleware()(req)
      if (csrfResponse) {
        return applySecurityHeaders(csrfResponse)
      }
    }
  } catch (error) {
    console.error('Security middleware error:', error);
  }

  // Clerk가 설정되지 않은 경우 기본 응답
  if (!auth) {
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  }

  // 사용자가 인증된 경우 Supabase 동기화 트리거
  const { userId } = auth();
  if (userId && !req.nextUrl.pathname.startsWith('/api/')) {
    // API 라우트가 아닌 페이지 요청에서만 동기화 시도
    try {
      // 백그라운드에서 사용자 동기화 (비동기로 처리하여 페이지 로딩 지연 방지)
      fetch(new URL('/api/sync-user', req.url), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      }).catch(error => {
        console.error('Background user sync failed:', error);
      });
    } catch (error) {
      console.error('User sync trigger failed:', error);
    }
  }

  // 보호된 라우트에 대한 인증 확인
  if (isProtectedRoute(req)) {
    try {
      auth().protect();
    } catch (error) {
      // 인증 실패 시 홈으로 리다이렉트
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 관리자 라우트에 대한 추가 검증
  if (isAdminRoute(req)) {
    try {
      const { userId } = auth();
      
      if (!userId) {
        return NextResponse.redirect(new URL('/?error=unauthorized', req.url));
      }

      // 슈퍼 관리자 이메일 체크
      const response = await fetch(new URL('/api/admin/check-permission', req.url), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        console.log('Admin permission check failed:', response.status);
        return NextResponse.redirect(new URL('/?error=admin_access_denied', req.url));
      }

      const result = await response.json();
      if (!result.isAdmin) {
        console.log('User is not admin:', userId);
        return NextResponse.redirect(new URL('/?error=admin_access_denied', req.url));
      }

      // 기본 인증도 적용
      auth().protect();
    } catch (error) {
      console.error('Admin route access error:', error);
      return NextResponse.redirect(new URL('/?error=admin_check_failed', req.url));
    }
  }

  // 보안 헤더가 적용된 응답 반환
  const response = NextResponse.next();
  return applySecurityHeaders(response);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 