/**
 * Clerk 키가 없는 배포(Vercel Preview)에서 미들웨어가 사이트 전체를 500 으로 만들지 않는지,
 * 그러면서도 /admin·보호 API 는 미로그인과 똑같이 막는지 확인한다.
 * Vercel Preview·로컬 개발 밖(Vercel Production, Vercel 밖의 운영 서버)은 키가 빠져도
 * Clerk 경로를 그대로 타서 설정 누락이 드러나야 한다.
 */
import { NextRequest, NextResponse, type NextFetchEvent } from 'next/server';

// jest.config 의 resetMocks 가 jest.fn 구현을 지우므로, Clerk 경로 호출 여부는 일반 카운터로 센다.
const clerkCalls = { count: 0 };

jest.mock('@clerk/nextjs/server', () => ({
  // 실제 clerkMiddleware 는 키가 없으면 요청마다 예외를 던진다
  clerkMiddleware: () => () => {
    clerkCalls.count += 1;
    throw new Error('Missing publishableKey');
  },
  clerkClient: async () => {
    throw new Error('clerkClient 는 로그인 사용자 없이 호출되면 안 된다');
  },
  createRouteMatcher: (patterns: string[]) => (req: NextRequest) =>
    patterns.some(p => new RegExp(`^${p}$`).test(req.nextUrl.pathname)),
}));

jest.mock('@/lib/rate-limit', () => ({
  globalRateLimit: async () => null,
}));

jest.mock('@/lib/security/security-monitor', () => ({
  autoSecurityResponse: async () => null,
  detectSuspiciousActivity: () => ({ isSuspicious: false }),
  logSecurityEvent: async () => undefined,
}));

import { isClerkConfigured } from '@/lib/auth/clerk-config';
import middleware from '@/middleware';

const BASE = 'https://family-office-git-branch-goodman-ksways.vercel.app';
const event = {} as NextFetchEvent;

function request(path: string, method = 'GET') {
  return new NextRequest(new URL(`${BASE}${path}`), {
    method,
    headers: { origin: BASE },
  });
}

describe('미들웨어 — Clerk 키가 없는 배포', () => {
  const env = process.env as Record<string, string | undefined>;
  const saved = {
    NODE_ENV: env.NODE_ENV,
    VERCEL_ENV: env.VERCEL_ENV,
    CLERK_SECRET_KEY: env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  };
  let redirectSpy: jest.SpyInstance;
  let nextSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;

  beforeEach(() => {
    // Vercel Preview 와 같은 조건
    env.NODE_ENV = 'production';
    env.VERCEL_ENV = 'preview';
    delete env.CLERK_SECRET_KEY;
    delete env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    clerkCalls.count = 0;
    redirectSpy = jest.spyOn(NextResponse, 'redirect');
    nextSpy = jest.spyOn(NextResponse, 'next');
    jsonSpy = jest.spyOn(NextResponse, 'json');
  });

  afterEach(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete env[key];
      else env[key] = value;
    }
  });

  it('공개 페이지를 Clerk 없이 연다 (500 이 아니다)', async () => {
    await middleware(request('/services'), event);

    expect(clerkCalls.count).toBe(0);
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).not.toHaveBeenCalled();
  });

  it('/admin 은 미로그인과 똑같이 로그인 페이지로 보낸다', async () => {
    await middleware(request('/admin'), event);

    expect(clerkCalls.count).toBe(0);
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    const target = new URL(String(redirectSpy.mock.calls[0][0]));
    expect(target.pathname).toBe('/auth/sign-in');
    expect(nextSpy).not.toHaveBeenCalled();
  });

  it('보호 API 는 401 로 막는다', async () => {
    await middleware(request('/api/admin/leads'), event);

    expect(jsonSpy).toHaveBeenCalledTimes(1);
    expect(jsonSpy.mock.calls[0][1]).toEqual({ status: 401 });
    expect(nextSpy).not.toHaveBeenCalled();
  });

  it('키가 하나만 있어도 Clerk 를 쓰지 않는다', () => {
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_dummy';
    expect(isClerkConfigured()).toBe(false);
    env.CLERK_SECRET_KEY = 'sk_test_dummy';
    expect(isClerkConfigured()).toBe(true);
  });

  it('키가 있으면 Clerk 미들웨어를 쓴다', () => {
    env.CLERK_SECRET_KEY = 'sk_test_dummy';
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_dummy';

    expect(() => middleware(request('/services'), event)).toThrow();
    expect(clerkCalls.count).toBe(1);
  });

  it('Production 은 키가 없어도 대체하지 않는다 (설정 누락이 드러나야 한다)', () => {
    env.VERCEL_ENV = 'production';

    expect(() => middleware(request('/services'), event)).toThrow(
      'Missing publishableKey'
    );
    expect(clerkCalls.count).toBe(1);
  });

  it('Vercel 밖의 운영 서버도 키가 없으면 대체하지 않는다', () => {
    delete env.VERCEL_ENV;

    expect(() => middleware(request('/services'), event)).toThrow(
      'Missing publishableKey'
    );
    expect(clerkCalls.count).toBe(1);
  });

  it('로컬 개발은 키가 없어도 Clerk 없이 연다', async () => {
    delete env.VERCEL_ENV;
    env.NODE_ENV = 'development';

    await middleware(request('/services'), event);

    expect(clerkCalls.count).toBe(0);
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
