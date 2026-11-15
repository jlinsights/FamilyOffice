/**
 * /admin 페이지(와 그 페이지로 가는 Server Action POST)를 로그인하지 않은 방문자에게 막는지 확인한다.
 * 미들웨어는 /api/admin 만 보호했기 때문에 /admin 페이지와 그 Server Action 은 그대로 열려 있었다.
 */
import { NextRequest, NextResponse } from 'next/server';

const authState: { userId: string | null } = { userId: null };

jest.mock('@clerk/nextjs/server', () => ({
  clerkMiddleware:
    (
      handler: (
        auth: () => Promise<{ userId: string | null }>,
        req: NextRequest
      ) => Promise<Response>
    ) =>
    (req: NextRequest) =>
      handler(async () => ({ userId: authState.userId }), req),
  clerkClient: async () => ({
    users: {
      getUser: async () => ({ unsafeMetadata: { onboardingCompleted: true } }),
    },
  }),
  createRouteMatcher: (patterns: string[]) => (req: NextRequest) =>
    patterns.some(p => new RegExp(`^${p}$`).test(req.nextUrl.pathname)),
}));

jest.mock('@/lib/rate-limit', () => ({
  globalRateLimit: jest.fn(async () => null),
}));

jest.mock('@/lib/security/security-monitor', () => ({
  autoSecurityResponse: jest.fn(async () => null),
  detectSuspiciousActivity: () => ({ isSuspicious: false }),
  logSecurityEvent: jest.fn(async () => undefined),
}));

import middleware from '@/middleware';

type Handler = (req: NextRequest) => Promise<Response>;
const run = (req: NextRequest) => (middleware as unknown as Handler)(req);

function request(path: string, init?: { method?: string }) {
  return new NextRequest(new URL(`https://www.familyoffices.vip${path}`), {
    method: init?.method ?? 'GET',
    headers: { origin: 'https://www.familyoffices.vip' },
  });
}

// jest.setup.js 의 Response 목은 Headers 객체로 넘긴 헤더(location 등)를 잃어버리므로,
// 응답 헤더 대신 미들웨어가 어떤 NextResponse 를 만들었는지 본다.
// jest.config 의 restoreMocks 가 테스트마다 spy 를 되돌리므로 beforeEach 에서 다시 건다.
let redirectSpy: jest.SpyInstance;
let nextSpy: jest.SpyInstance;

function redirectTarget(): URL {
  expect(redirectSpy).toHaveBeenCalledTimes(1);
  return new URL(String(redirectSpy.mock.calls[0][0]));
}

describe('미들웨어 — /admin 페이지 보호', () => {
  const env = process.env as Record<string, string | undefined>;
  const originalNodeEnv = env.NODE_ENV;

  beforeEach(() => {
    // Vercel Preview·Production 과 같은 조건
    env.NODE_ENV = 'production';
    authState.userId = null;
    redirectSpy = jest.spyOn(NextResponse, 'redirect');
    nextSpy = jest.spyOn(NextResponse, 'next');
  });

  it.each(['/admin', '/admin/consultations', '/admin/seo'])(
    '로그인하지 않으면 %s 에서 로그인 페이지로 보낸다',
    async path => {
      await run(request(path));

      const target = redirectTarget();
      expect(target.pathname).toBe('/auth/sign-in');
      expect(target.searchParams.get('redirect_url')).toBe(path);
      expect(nextSpy).not.toHaveBeenCalled();
    }
  );

  it('로그인하지 않은 Server Action POST /admin 도 통과시키지 않는다', async () => {
    await run(request('/admin', { method: 'POST' }));

    expect(redirectTarget().pathname).toBe('/auth/sign-in');
    expect(nextSpy).not.toHaveBeenCalled();
  });

  it('로그인한 사용자는 /admin 으로 통과시킨다 (관리자 여부는 Server Action 이 확인)', async () => {
    authState.userId = 'user_1';

    await run(request('/admin'));

    expect(redirectSpy).not.toHaveBeenCalled();
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    env.NODE_ENV = originalNodeEnv;
  });

  it('로컬 개발(NODE_ENV=development)에서는 관리자 확인 개발 우회와 맞춰 통과시킨다', async () => {
    env.NODE_ENV = 'development';

    await run(request('/admin'));

    expect(redirectSpy).not.toHaveBeenCalled();
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it('공개 페이지는 로그인 없이 통과시킨다', async () => {
    await run(request('/services'));

    expect(redirectSpy).not.toHaveBeenCalled();
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
