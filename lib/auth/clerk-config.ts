/**
 * Clerk 를 쓸 수 있는지, 없을 때 '아무도 로그인하지 않은' 상태로 대신 돌려도 되는지 판단한다.
 * 미들웨어(Edge)와 서버 컴포넌트가 함께 쓰므로 Clerk 를 import 하지 않는다.
 */

/** 서버에서 Clerk 를 쓸 수 있는가 — 비밀키와 공개키가 둘 다 있어야 한다 */
export function isClerkConfigured(): boolean {
  return Boolean(
    process.env.CLERK_SECRET_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  );
}

/**
 * Clerk 키가 없을 때 미로그인으로 대신 처리해도 되는 환경인가.
 * Vercel Preview(키가 Production 에만 있다)와 로컬 개발만 허용한다.
 * 그 밖의 배포(Vercel Production, Vercel 밖의 운영 서버)는 키가 빠지면 바로 실패해서
 * 설정 누락이 드러나야 한다.
 */
export function canRunWithoutClerk(): boolean {
  return (
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NODE_ENV === 'development'
  );
}

/** Clerk 를 건너뛰고 미로그인으로 처리할지 */
export function shouldBypassClerk(): boolean {
  return !isClerkConfigured() && canRunWithoutClerk();
}
