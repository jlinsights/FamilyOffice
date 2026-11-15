/**
 * 서버(페이지·레이아웃·API·lib)에서 쓰는 Clerk auth()/currentUser() 대체.
 *
 * Clerk 키가 없는 Vercel Preview 에서는 미들웨어가 clerkMiddleware 를 건너뛰므로(middleware.ts),
 * 그대로 Clerk 의 auth() 를 부르면 "clerkMiddleware() 를 찾을 수 없다"는 예외로 500 이 난다.
 * 그 환경에서만 '아무도 로그인하지 않은' 값을 돌려줘서, 호출부의 기존 미로그인 처리
 * (로그인 페이지로 보내기·401)가 그대로 동작하게 한다. 그 밖에는 Clerk 를 그대로 부른다.
 */
import {
  auth as clerkAuth,
  currentUser as clerkCurrentUser,
} from '@clerk/nextjs/server';

import { shouldBypassClerk } from './clerk-config';

type ClerkAuth = Awaited<ReturnType<typeof clerkAuth>>;
type ClerkUser = Awaited<ReturnType<typeof clerkCurrentUser>>;

/** 호출부가 쓰는 범위 — 미로그인 값으로도 정직하게 채울 수 있는 필드만 노출한다 */
export type ServerAuth = {
  userId: ClerkAuth['userId'];
  sessionClaims: ClerkAuth['sessionClaims'];
};

const SIGNED_OUT: ServerAuth = { userId: null, sessionClaims: null };

export async function auth(): Promise<ServerAuth> {
  if (shouldBypassClerk()) return SIGNED_OUT;
  return clerkAuth();
}

export async function currentUser(): Promise<ClerkUser> {
  if (shouldBypassClerk()) return null;
  return clerkCurrentUser();
}
