/**
 * Clerk 를 쓸지, 쓰지 않고 '아무도 로그인하지 않은' 상태로 대신 돌릴지 판단한다.
 * 미들웨어(Edge)와 서버 컴포넌트가 함께 쓰므로 Clerk 를 import 하지 않는다.
 */

/**
 * Clerk 를 쓰는 설정인가 — 공개키(NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)로 판단한다.
 *
 * 브라우저(SafeAuthProvider·로그인 페이지, lib/auth/clerk-utils 의 isClerkAvailable)도
 * 공개키만 보고 ClerkProvider·로그인 위젯을 띄운다. 서버도 같은 키로 판단해야
 * 브라우저는 로그인시키는데 서버는 미로그인으로 막는 어긋남이 생기지 않는다.
 * 공개키는 있는데 비밀키가 없으면 대체하지 않고 Clerk 가 그대로 실패하게 둔다 —
 * 반쪽 설정이 드러나야 한다.
 */
export function isClerkConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

/**
 * Clerk 없이 미로그인으로 대신 처리해도 되는 환경인가.
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
