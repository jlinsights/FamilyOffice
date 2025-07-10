import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export default clerkMiddleware(async (auth: any, req: NextRequest) => {
  // Clerk가 설정되지 않은 경우 기본 응답
  if (!auth) {
    const response = NextResponse.next();
    
    // 보안 헤더 추가
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' *.google-analytics.com;"
    );

    return response;
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

  // 보안 헤더 추가
  const response = NextResponse.next();
  
  // CSP 헤더 추가
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.clerk.accounts.dev *.googletagmanager.com *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob: *.clerk.accounts.dev; connect-src 'self' *.clerk.accounts.dev *.google-analytics.com;"
  );

  return response;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 