/**
 * 서버 auth()/currentUser() 대체(lib/auth/server-auth)가 Clerk 키 없는 Vercel Preview 에서
 * 예외 대신 '미로그인'을 돌려주는지, 그 밖에서는 Clerk 를 그대로 부르는지 확인한다.
 * Preview 에서는 미들웨어가 clerkMiddleware 를 건너뛰므로 Clerk 의 auth() 는 예외를 던진다.
 */

// jest.config 의 resetMocks 가 jest.fn 구현을 지우므로, Clerk 호출 여부는 일반 카운터로 센다.
const clerkCalls = { auth: 0, currentUser: 0 };

jest.mock('@clerk/nextjs/server', () => ({
  auth: async () => {
    clerkCalls.auth += 1;
    return { userId: 'user_clerk', sessionClaims: { email: 'a@example.com' } };
  },
  currentUser: async () => {
    clerkCalls.currentUser += 1;
    return { id: 'user_clerk' };
  },
}));

import { auth, currentUser } from '@/lib/auth/server-auth';

describe('서버 auth()/currentUser() — Clerk 키가 없는 배포', () => {
  const env = process.env as Record<string, string | undefined>;
  const saved = {
    NODE_ENV: env.NODE_ENV,
    VERCEL_ENV: env.VERCEL_ENV,
    CLERK_SECRET_KEY: env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  };

  beforeEach(() => {
    // Vercel Preview 와 같은 조건
    env.NODE_ENV = 'production';
    env.VERCEL_ENV = 'preview';
    delete env.CLERK_SECRET_KEY;
    delete env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    clerkCalls.auth = 0;
    clerkCalls.currentUser = 0;
  });

  afterEach(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete env[key];
      else env[key] = value;
    }
  });

  it('Preview 에서는 Clerk 를 부르지 않고 미로그인을 돌려준다', async () => {
    await expect(auth()).resolves.toEqual({
      userId: null,
      sessionClaims: null,
    });
    await expect(currentUser()).resolves.toBeNull();
    expect(clerkCalls).toEqual({ auth: 0, currentUser: 0 });
  });

  it('키가 있으면 Preview 에서도 Clerk 를 그대로 부른다', async () => {
    env.CLERK_SECRET_KEY = 'sk_test_dummy';
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_dummy';

    await expect(auth()).resolves.toMatchObject({ userId: 'user_clerk' });
    await expect(currentUser()).resolves.toMatchObject({ id: 'user_clerk' });
    expect(clerkCalls).toEqual({ auth: 1, currentUser: 1 });
  });

  it('공개키만 있으면 Clerk 를 그대로 부른다 (브라우저와 같은 판단)', async () => {
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_dummy';

    await auth();
    await currentUser();
    expect(clerkCalls).toEqual({ auth: 1, currentUser: 1 });
  });

  it('Production 은 키가 없어도 Clerk 를 그대로 부른다 (설정 누락이 드러나야 한다)', async () => {
    env.VERCEL_ENV = 'production';

    await auth();
    await currentUser();
    expect(clerkCalls).toEqual({ auth: 1, currentUser: 1 });
  });
});
