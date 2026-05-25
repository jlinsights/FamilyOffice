# FamilyOffice CSRF Hardening — PDCA Design

**Status:** Design (Phase 2)
**Plan 참조:** [`docs/01-plan/features/familyoffice-csrf-hardening.plan.md`](../../01-plan/features/familyoffice-csrf-hardening.plan.md)
**Created:** 2026-05-25
**Branch:** `feat/csrf-hardening`

---

## 개요

| 항목 | 내용 |
|------|------|
| Feature | familyoffice-csrf-hardening |
| 수정 파일 | 3 (`middleware.ts`, `lib/security/security-monitor.ts`, `next.config.mjs`) |
| 삭제 파일 | 1 (`app/api/members/route.ts`) |
| 신규 파일 | 1 (`tests/unit/middleware-csrf.test.ts`) |
| 예상 라인 변화 | 본질 코드 ~36 라인 + 테스트 ~70 라인 |
| 신규 의존성 | 없음 (Edge-runtime 호환 자체 구현) |

---

## 1. 결정 사항 (Plan Open Q 확정)

| # | Plan Q | 확정 | 근거 |
|---|---|---|---|
| D1 | CSRF 토큰 도입 여부 (Q1) | **(a) middleware Origin 가드만** | OWASP "Verifying Origin With Standard Headers"가 canonical CSRF defense. Clerk `__session` SameSite=Lax + JSON CORS preflight가 이미 작동 중인 다층 방어. 토큰은 belt-and-suspenders로 비용 대비 효과 낮음 |
| D2 | CSRF 라이브러리 (Q1 후속) | **(a) 자체 구현** | Origin 가드는 ~20 라인. `@edge-csrf/nextjs` 등 의존성 추가 불필요 |
| D3 | webhook/cron 화이트리스트 매처 | **`createRouteMatcher` 인라인** | middleware 이미 사용 중인 동일 패턴. 별도 `lib/security/csrf-config.ts` 파일 생성 불필요 (Plan T1 → T2에 인라인) |
| D4 | `/api/members` 처리 (Q2) | **(a) 삭제** | 호출처 grep 0건 확인, 진정한 orphan. mock 라우트가 향후 함정 |
| D5 | `serverActions.allowedOrigins` 값 | **호스트만 추출 + dev localhost 포함** | Next.js spec: 호스트(스킴 제외) 배열. `ALLOWED_ORIGINS`에서 호스트 파생 |
| D6 | `Origin === null` 처리 (Q4) | **(a) 차단, Referer fallback 없음** | `package.json`에 Capacitor/RN/Expo 없음 (web only). 브라우저는 항상 Origin 송신. `null` Origin은 file:// / sandboxed iframe 등 의도되지 않은 컨텍스트 |
| D7 | Q3 abuse 보호 | **out-of-scope** | 익명 폼 spam/abuse는 별도 사이클 (`familyoffice-abuse-protection` 후보) |

---

## 2. 아키텍처 — Defense-in-Depth

```
Browser POST /api/payments/shop/create-order
       │
       ▼
[L1] CORS Preflight (Content-Type: application/json)
       │ - middleware.ts:186-200 ALLOWED_ORIGINS 매칭
       │ - 비허용 → 브라우저가 본 요청 차단
       ▼
[L2] middleware Origin 가드 (NEW, 본 사이클)
       │ - method ∈ {POST,PUT,PATCH,DELETE}
       │ - !isCsrfExempt(path) (webhook/cron 제외)
       │ - Origin ∉ ALLOWED_ORIGINS → 403
       │ - null Origin → 403 (D6)
       ▼
[L3] Clerk `__session` (SameSite=Lax, HttpOnly)
       │ - cross-site fetch 시 쿠키 미전송
       │ - currentUser()/auth() 강제
       ▼
[L4] Route handler 검증 (Zod / payment_secret 등)
       ▼
Response
```

본 사이클은 **L2 신설** + L1·L3·L4 회귀 방지 + `next.config.mjs` Server Actions allowedOrigins 명시.

---

## 3. middleware.ts 변경 상세

### 3.1 삽입 위치
**라인 137 ~ 138 사이** (rate-limit 응답 처리 직후, Force HTTPS 이전).

이유:
- 인증/온보딩과 분리해 보안 게이트 책임 단일화
- Force HTTPS 이전 배치: HTTPS 리다이렉트는 method 무관 GET → 가드 분기 영향 없음

### 3.2 신규 매처

```typescript
// middleware.ts 상단 (isOnboardingExcludedRoute 정의 다음, 라인 ~34)
const isCsrfExemptRoute = createRouteMatcher([
  '/api/webhooks(.*)',           // Clerk webhook
  '/api/payments/webhook(.*)',   // Toss webhook
  '/api/cron(.*)',               // 향후 cron 라우트
]);
```

### 3.3 가드 블록 (rate-limit 다음, Force HTTPS 이전)

```typescript
// 2.5 CSRF Origin 가드 (state-changing 요청)
const STATE_CHANGING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
if (
  STATE_CHANGING_METHODS.has(request.method) &&
  request.nextUrl.pathname.startsWith('/api/') &&
  !isCsrfExemptRoute(request)
) {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    await logSecurityEvent(
      {
        type: 'csrf_origin_blocked',
        severity: 'high',
        description: `CSRF guard: invalid Origin '${origin ?? 'null'}' for ${request.method} ${request.nextUrl.pathname}`,
        additional_data: {
          path: request.nextUrl.pathname,
          method: request.method,
          origin,
        },
      },
      request
    );
    return NextResponse.json(
      { error: 'Forbidden: invalid origin', timestamp: new Date().toISOString() },
      { status: 403 }
    );
  }
}
```

### 3.4 변경 요약
- 신규 라인: ~20
- 기존 `isAllowedOrigin()` 헬퍼 재사용 (라인 36-39)
- 기존 `logSecurityEvent()` 텔레메트리 재사용
- `isAllowedOrigin` **export** 추가 (테스트에서 import — 라인 +1)

### 3.5 SecurityEvent 타입 보강
`lib/security/security-monitor.ts` 의 `type` union에 `'csrf_origin_blocked'` 추가.
- 단순 union 확장, 다른 변경 없음
- 라인 변화: +1

---

## 4. next.config.mjs 변경

### 4.1 현재
- `serverActions.allowedOrigins` 미설정 → Next.js 기본 동작 (Origin===Host 매칭) 의존

### 4.2 변경
```js
// next.config.mjs (Server Actions allowedOrigins 명시)
const ALLOWED_HOSTS = [
  'familyoffices.vip',
  'www.familyoffices.vip',
  'familyoffice-jet.vercel.app',
  'familyoffice-jlinsights-projects.vercel.app',
  ...(process.env.NODE_ENV !== 'production' ? ['localhost:3000'] : []),
];

const nextConfig = {
  // ... 기존 설정
  experimental: {
    // ... 기존 experimental
    serverActions: {
      allowedOrigins: ALLOWED_HOSTS,
    },
  },
};
```

### 4.3 SoT 유지
- `lib/config.ts` `ALLOWED_ORIGINS` (스킴 포함 URL) 와 `next.config.mjs` `ALLOWED_HOSTS` (호스트만) 두 곳 존재.
- 통합 어려운 이유: `next.config.mjs` 는 ESM build-time, `lib/config.ts` 는 런타임/Edge 양쪽. 양쪽 동기화는 PR description 에 명시 + 향후 단일화는 후속 사이클 후보.
- 라인 변화: +10

### 4.4 검증
빌드 후 `app/structure-check/page.tsx` 등 server action 호출 페이지가 동일 Origin에서 정상 동작.

---

## 5. /api/members/route.ts 삭제

### 5.1 사전 검증
```bash
grep -rn "/api/members" app components hooks lib --include="*.ts" --include="*.tsx"
# Plan 단계에서 0건 확인됨. 삭제 직전 재실행 의무.
```

### 5.2 삭제 대상
- `app/api/members/route.ts` (mock POST 핸들러)
- `app/api/members/` 폴더가 비면 폴더도 제거

### 5.3 회귀 검증
type-check + lint + 빌드. import / fetch 0건 사전 확인.

---

## 6. 단위 테스트 — `tests/unit/middleware-csrf.test.ts`

### 6.1 테스트 대상
미들웨어 전체가 아닌, **가드 분기에 사용되는 두 도구** 검증:
- `isAllowedOrigin()` (export 됨)
- `isCsrfExemptRoute` (createRouteMatcher 결과)

가드 자체 통합 테스트는 NextRequest mock 복잡 → 두 building block + manual QA로 충분.

### 6.2 시나리오

| # | 대상 | 입력 | 기대 |
|---|---|---|---|
| 1 | isAllowedOrigin | `https://familyoffices.vip` | true |
| 2 | isAllowedOrigin | `https://www.familyoffices.vip` | true |
| 3 | isAllowedOrigin | `https://evil.com` | false |
| 4 | isAllowedOrigin | `null` | false |
| 5 | isAllowedOrigin | `''` (빈 문자열) | false |
| 6 | isCsrfExemptRoute | mock POST /api/webhooks/clerk | true |
| 7 | isCsrfExemptRoute | mock POST /api/payments/webhook | true |
| 8 | isCsrfExemptRoute | mock POST /api/cron/newsletter | true |
| 9 | isCsrfExemptRoute | mock POST /api/payments/shop/create-order | false |

### 6.3 구현 패턴

```typescript
import { describe, it, expect } from '@jest/globals';
import { NextRequest } from 'next/server';
import { isAllowedOrigin, isCsrfExemptRoute } from '@/middleware';

function mockRequest(method: string, path: string): NextRequest {
  return new NextRequest(new URL(`http://localhost:3000${path}`), { method });
}

describe('CSRF Origin guard — isAllowedOrigin', () => {
  it('allows whitelisted origin', () => {
    expect(isAllowedOrigin('https://familyoffices.vip')).toBe(true);
  });
  it('blocks unknown origin', () => {
    expect(isAllowedOrigin('https://evil.com')).toBe(false);
  });
  it('blocks null Origin (D6)', () => {
    expect(isAllowedOrigin(null)).toBe(false);
  });
  // ... (5 cases)
});

describe('CSRF exempt matcher — isCsrfExemptRoute', () => {
  it('exempts /api/webhooks/*', () => {
    expect(isCsrfExemptRoute(mockRequest('POST', '/api/webhooks/clerk'))).toBe(true);
  });
  it('does NOT exempt /api/payments/shop/*', () => {
    expect(isCsrfExemptRoute(mockRequest('POST', '/api/payments/shop/create-order'))).toBe(false);
  });
  // ... (4 cases)
});
```

### 6.4 export 요구
`middleware.ts` 에서 `isAllowedOrigin` + `isCsrfExemptRoute` 두 심볼 **export**.
default export(clerkMiddleware) 와 별도로 named export 추가만 → backward compatible.

### 6.5 라인 변화
테스트 파일 ~70 라인 + middleware export 키워드 +2 라인.

---

## 7. 변경 파일 매트릭스

| 파일 | 동작 | 라인 변화 | 의존 |
|---|---|---|---|
| `middleware.ts` | 수정 (가드 + 매처 + export 2건) | +25 | — |
| `lib/security/security-monitor.ts` | 수정 (event type union 확장) | +1 | — |
| `next.config.mjs` | 수정 (serverActions.allowedOrigins) | +10 | — |
| `app/api/members/route.ts` | 삭제 | -(기존 mock 분량) | grep 0건 사전 검증 |
| `tests/unit/middleware-csrf.test.ts` | 신규 | +70 | middleware export |

**본질 코드 ~36 라인, 테스트 ~70 라인** — Plan 추정 30~50라인은 본질 코드 기준 정확.

---

## 8. Tasks (압축 — Plan T2/T3/T4/T5/T9 만)

| # | Task | 산출물 | 의존 |
|---|---|---|---|
| T1 | `middleware.ts` Origin 가드 + `isCsrfExemptRoute` 매처 + named export 2건 + `csrf_origin_blocked` event type | `middleware.ts`, `lib/security/security-monitor.ts` patch | — |
| T2 | `next.config.mjs` `serverActions.allowedOrigins` 명시 | `next.config.mjs` | — |
| T3 | `app/api/members/route.ts` 삭제 + grep 재검증 | route 파일 / 폴더 제거 | — |
| T4 | `tests/unit/middleware-csrf.test.ts` 작성 — 9 시나리오 | 테스트 파일 | T1 |
| T5 | 로컬 검증: `npm run typecheck && npm run lint && npm run test:unit -- middleware-csrf` + dev 서버에서 leads/capture·newsletter/subscribe·structure-check 폼 회귀 + cross-origin curl 403 확인 | 회귀 보고 | T1-T4 |

**Plan 대비 제외:**
- T1(csrf-config 별도 파일) → T1에 인라인
- T6(쿠키 startup assertion) → 별도 사이클 (`familyoffice-cookie-assertion` 후보)
- T7(integration test) → unit + manual QA로 충분
- T8(strategy doc) → PR description 으로 대체
- T10(gap-detector 정식 PDCA Check) → 30라인 패치엔 과한 paperwork. 다만 advisor 권고로 `analyze` 단계 짧게 실시

---

## 9. 회귀 검증 체크리스트

### 9.1 자동
- [ ] `npm run typecheck` 0 error
- [ ] `npm run lint` 0 error (신규 파일)
- [ ] `npm run test:unit -- middleware-csrf` 9 시나리오 통과

### 9.2 수동 (dev 서버)
- [ ] `/structure-check` 결제 신청 폼 → 정상 통과
- [ ] `/shop/[slug]` 1-of-1 결제 → 정상 통과
- [ ] `/` 홈 newsletter 구독 (익명) → 정상 통과
- [ ] `/` 홈 leads/capture (익명) → 정상 통과
- [ ] cross-origin curl: `curl -X POST -H "Origin: https://evil.com" -H "Content-Type: application/json" http://localhost:3000/api/payments/shop/create-order -d '{}'` → 403
- [ ] no-Origin curl: 위와 동일하되 `-H "Origin"` 제거 → 403

### 9.3 webhook 무회귀
- [ ] Toss webhook 시뮬레이션 (Origin 없음) → 통과 (exempt)
- [ ] Clerk webhook 시뮬레이션 → 통과 (exempt)

---

## 10. 위험 & 완화

| 위험 | 완화 |
|---|---|
| `isAllowedOrigin` export 변경이 다른 코드 영향 | grep `isAllowedOrigin` 확인 — middleware 내부만 사용. named export 추가는 backward compatible |
| `next.config.mjs` allowedOrigins 호스트 잘못 → Server Actions 503 | dev/preview 에서 form action 회귀, 배포 전 staging 검증 |
| security-monitor type 보강 후 다른 호출처 영향 | 단순 union 확장은 backward compatible |
| Edge runtime 제약 (middleware.ts) | crypto 사용 없음, 순수 string 비교 + `createRouteMatcher` (Clerk 호환). `next.config.mjs` 는 build-time → Edge 무관 |
| `createRouteMatcher` 가 webhook prefix 매칭 실패 | T4 시나리오 #6-#8 로 회귀 |
| 결제·관리 플로우 same-origin 요청 false-positive | T4 시나리오 #1-#2 + 9.2 수동 QA |

---

## 11. References

- Plan: [`docs/01-plan/features/familyoffice-csrf-hardening.plan.md`](../../01-plan/features/familyoffice-csrf-hardening.plan.md)
- middleware: `middleware.ts:1-223`
- ALLOWED_ORIGINS SoT: `lib/config.ts:48-55`
- OWASP CSRF Prevention: https://owasp.org/www-community/attacks/csrf
- Clerk SameSite=Lax 검증: `node_modules/@clerk/backend/dist/internal.js`
- 글로벌 룰: `~/.claude/rules/web/security.md`, `~/.claude/rules/common/security.md`
- Memory: [[project_familyoffice_csrf_hardening]]
