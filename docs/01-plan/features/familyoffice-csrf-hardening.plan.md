# FamilyOffice CSRF Hardening — PDCA Plan

**Status:** Plan (Phase 1)
**Owner:** jhlim725
**Branch:** `feat/csrf-hardening`
**Created:** 2026-05-25
**Parent:** CSRF 규정 준수 검증 (2026-05-25 conversation)

---

## 1. Background

2026-05-25 CSRF 규정 준수 검증 결과 — 글로벌 룰(`rules/web/security.md` "CSRF protection on state-changing forms", `rules/common/security.md` "CSRF protection enabled") 대비 **문자 그대로 FAIL / 실효 보안 자세 PARTIAL**.

### 현재 상태 (As-Is)
- **명시적 CSRF 토큰 메커니즘 0건** — `package.json` 의존성에 `next-csrf`/`edge-csrf`/`csurf` 등 없음
- **`middleware.ts:1-223`** — Clerk 인증 + globalRateLimit + CORS 화이트리스트 + 보안 헤더. **state-changing 요청 Origin/Referer 강제 검증 없음**
- 50개 state-changing API 라우트 분류:
  - Webhook 5건: HMAC·svix signature (CSRF 무관) ✓
  - Cron 2건: `Bearer ${CRON_SECRET}` (CSRF 무관) ✓
  - Clerk 인증 + `request.json()` 전용 ~10건: 다층 방어로 실효 PASS, 토큰 미존재
  - 익명 공개 폼/추적 ~25건: 세션 없음 → CSRF 정의상 N/A
  - 모의 미구현 `/api/members` POST 1건: 인증 없음 (코드 위생)
- **`next.config.mjs`** — `serverActions.allowedOrigins` 미설정 → Next.js 14+/16 기본 Origin===Host 매칭에 의존
- Supabase/Clerk 쿠키 SameSite/HttpOnly/Secure — SDK 기본값(SameSite=Lax) 의존, 명시 검증 부재

### 결정적 사실
- 결제 라우트 4건 (`payments/shop/create-order`, `payments/shop/confirm`, `payments/structure-check/request`, `payments/structure-check/confirm`) 모두 `request.json()` 단독 + Clerk `currentUser()`/`auth().userId` 강제 → JSON Content-Type → 브라우저 CORS preflight → `ALLOWED_ORIGINS` 화이트리스트 통과 필수. **실효적 다층 방어 작동**
- 다만 회귀 시(예: 향후 `request.formData()` 도입) preflight 우회 가능 → 룰 문자 준수 + 회귀 방지 필요

---

## 2. Goal

> 글로벌 보안 룰이 요구하는 명시적 CSRF 보호를 구현하고, middleware 레벨에서 state-changing 요청의 Origin 검증을 강제하여 다층 방어 + 회귀 방지를 동시에 달성한다.

### 성공 기준 (SLO)
1. 모든 비-webhook/비-cron POST/PUT/PATCH/DELETE 라우트가 명시적 CSRF 보호(토큰 또는 Origin 강제 검증) 적용을 받는다.
2. cross-origin POST 시 `Origin` 헤더가 `ALLOWED_ORIGINS` 화이트리스트 밖이면 middleware에서 **403** 응답 (webhook/cron 경로 제외).
3. `/api/members` POST mock 라우트는 삭제되거나 Clerk 인증 추가된다.
4. `next.config.mjs`에 `serverActions.allowedOrigins`가 명시적으로 선언된다.
5. 쿠키 SameSite/Secure 속성을 startup assertion으로 검증한다.
6. Origin 우회 시도(스푸핑된 Origin 헤더 + `null` Origin) 회귀 테스트가 추가되어 통과한다.
7. `npm run type-check` + `npm run lint` + 신규/기존 Jest 테스트 통과.
8. CSRF Hardening 도입 후 기존 정상 플로우(consultation 결제, shop 결제, leads/capture, newsletter/subscribe)가 회귀 없이 동작한다.

---

## 3. Scope

### In-Scope (수정 / 신규)
| 영역 | 파일 | 비고 |
|---|---|---|
| **middleware Origin 가드** | `middleware.ts` (수정) | POST/PUT/PATCH/DELETE 요청에 `Origin ∈ ALLOWED_ORIGINS` 강제, webhook/cron 경로 화이트리스트 제외 |
| **CSRF 토큰 유틸 (선택 옵션)** | `lib/security/csrf.ts` (신규, advisor 결정 후) | double-submit cookie 방식 토큰 발급/검증 |
| **CSRF 미적용 경로 화이트리스트** | `lib/security/csrf-config.ts` (신규) | webhook(`/api/webhooks/*`, `/api/payments/webhook`), cron(`/api/cron/*`), public-form 분리 |
| **Server Actions allowedOrigins** | `next.config.mjs` (수정) | `serverActions.allowedOrigins` 명시 |
| **Mock 라우트 정리** | `app/api/members/route.ts` (삭제 또는 인증 추가) | 현재 DB 변경 없는 mock, 향후 함정 |
| **쿠키 속성 startup assertion** | `lib/security/supabase-security-checker.ts` (수정) | Supabase auth 쿠키 SameSite/HttpOnly/Secure 런타임 검증 추가 |
| **회귀 테스트 (Unit)** | `tests/unit/middleware-csrf.test.ts` (신규) | Origin 누락·스푸핑·null Origin 시 403 회귀 |
| **회귀 테스트 (Integration)** | `tests/integration/csrf-bypass.test.ts` (신규) | webhook 경로는 Origin 없어도 통과, payments는 차단 |
| **문서** | `docs/security/csrf-strategy.md` (신규) | 채택한 다층 방어 모델, 룰 매핑, 운영 가이드 |

### Out-of-Scope
- 익명 공개 폼(`leads/capture`, `newsletter/subscribe`, `consultations`, `analytics/events`, `web-vitals`, `marketing/track-activity`) — 세션 없는 라우트는 CSRF 정의상 N/A. honeypot/rate-limit 기존 방어 유지. 별도 abuse-protection 사이클 후보.
- Webhook signature 검증 자체 강화 (이미 HMAC/svix 구현됨)
- Cron `Bearer ${CRON_SECRET}` 강화 (이미 구현됨)
- pre-existing tech debt(`as any`, RLS 정책 등) — 본 사이클 무관
- 비-API 페이지 라우트의 CSP/HTTPS 강화 — middleware에 이미 존재

---

## 4. Decisions (확정 필요)

| # | 결정 사항 | 옵션 | 잠정 | 근거 |
|---|---|---|---|---|
| D1 | CSRF 보호 방식 | (a) **middleware Origin 강제 검증만** (b) Origin 검증 + 토큰 발급/검증 | (a) | 결제·관리 라우트가 모두 `request.json()` + Clerk SameSite=Lax 라 이미 다층 방어 작동. 토큰 도입은 모든 form/fetch에 코드 침투 → 비용 대비 효과 낮음. 다만 룰 문자 100% 충족하려면 (b) 검토 |
| D2 | CSRF 라이브러리 | (a) **자체 구현 (Edge runtime 호환)** (b) `@edge-csrf/nextjs` (c) `next-csrf` | (a) | middleware Origin 가드 + 화이트리스트만 필요 시 50줄 미만 자체 코드로 충분. lib 추가는 의존성 부담 |
| D3 | webhook/cron 화이트리스트 매칭 | (a) `createRouteMatcher` Clerk 패턴 (b) 정규식 | (a) | 기존 middleware 동일 패턴 사용해 일관성 확보 |
| D4 | `/api/members` 처리 | (a) 삭제 (b) Clerk 인증 추가 + 실제 구현 | (a) | 현재 mock, 호출처도 dead. 살리려면 별도 사이클 |
| D5 | `serverActions.allowedOrigins` 값 | `ALLOWED_ORIGINS` 상수 재활용 | 재활용 | 단일 화이트리스트 SoT 유지 |
| D6 | Origin === null 처리 | (a) 차단 (b) Referer로 fallback | (a) | `null` Origin은 file://, sandboxed iframe 등 의도되지 않은 컨텍스트. 기본 차단 후 회귀 발생 시 화이트리스트 |

---

## 5. Architecture

### CSRF 방어 레이어 (Defense in Depth)

```
Browser POST /api/payments/shop/create-order
       │
       ▼
[Layer 1] CORS Preflight (Content-Type: application/json)
       │ - 브라우저 강제 OPTIONS
       │ - middleware.ts:174-201 응답 (ALLOWED_ORIGINS 화이트리스트)
       │ - 비허용 Origin → 브라우저가 본 요청 차단
       ▼
[Layer 2] middleware.ts Origin 강제 검증 (NEW)
       │ - method ∈ {POST,PUT,PATCH,DELETE} && !webhook/cron
       │ - Origin ∉ ALLOWED_ORIGINS → 403
       │ - 회귀 방지(formData 도입 시 preflight 우회 차단)
       ▼
[Layer 3] Clerk 인증 (`__session` SameSite=Lax)
       │ - cross-site fetch 시 쿠키 미전송
       │ - Clerk currentUser()/auth() 강제
       ▼
[Layer 4] Route handler 비즈니스 검증
       │ - Zod schema, payment_secret 매칭 등
       ▼
Response
```

### middleware Origin 가드 (의사 코드)

```ts
// middleware.ts 추가 위치: rate-limit 다음, Force HTTPS 이전
const STATE_CHANGING = ['POST', 'PUT', 'PATCH', 'DELETE'];
const CSRF_EXEMPT_PREFIXES = ['/api/webhooks/', '/api/payments/webhook', '/api/cron/'];

if (
  STATE_CHANGING.includes(request.method) &&
  !CSRF_EXEMPT_PREFIXES.some(p => request.nextUrl.pathname.startsWith(p))
) {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    await logSecurityEvent({ type: 'csrf_origin_blocked', ... }, request);
    return NextResponse.json({ error: 'Forbidden: invalid origin' }, { status: 403 });
  }
}
```

### `next.config.mjs` 변경

```js
experimental: {
  serverActions: {
    allowedOrigins: [
      'familyoffices.vip',
      'www.familyoffices.vip',
      'familyoffice-jet.vercel.app',
      ...(process.env.NODE_ENV === 'development' ? ['localhost:3000'] : []),
    ],
  },
},
```

---

## 6. Tasks (Subagent-Driven Execution)

| # | Task | 산출물 | 의존 |
|---|---|---|---|
| T1 | `lib/security/csrf-config.ts` 작성 — CSRF_EXEMPT_PREFIXES 상수 + 매처 헬퍼 + 단위 테스트 | `lib/security/csrf-config.ts`, `tests/unit/csrf-config.test.ts` | — |
| T2 | `middleware.ts` Origin 가드 삽입 (rate-limit 다음, Force HTTPS 이전) | `middleware.ts` patch | T1 |
| T3 | middleware 회귀 테스트 — POST + non-allowed Origin → 403, webhook → 통과, null Origin → 차단, GET → 통과 | `tests/unit/middleware-csrf.test.ts` | T2 |
| T4 | `next.config.mjs` `serverActions.allowedOrigins` 명시 + ALLOWED_ORIGINS와 SoT 단일화 검증 | `next.config.mjs`, `lib/config.ts` (필요시 export 추가) | — |
| T5 | `/api/members/route.ts` 삭제 + 호출처 grep 검증 (dead code 확인) | route 파일 삭제, 호출처 보고 | — |
| T6 | `lib/security/supabase-security-checker.ts` 쿠키 SameSite/Secure startup assertion 추가 | checker patch + 테스트 | — |
| T7 | Integration 테스트 — payments/shop POST 흐름이 ALLOWED_ORIGINS 내 Origin으로 정상 통과 회귀 | `tests/integration/csrf-bypass.test.ts` | T2 |
| T8 | `docs/security/csrf-strategy.md` 작성 — 다층 방어 모델·룰 매핑·운영 가이드 | docs | T2 |
| T9 | 로컬 검증 — `npm run type-check && npm run lint && npm test` + dev 서버에서 leads/capture·newsletter/subscribe·consultations 폼 제출 회귀 | 회귀 보고 | T2,T4,T5,T6 |
| T10 | Final review — gap-detector로 design 대비 구현 매칭률 측정 (≥90% 목표) | analysis 문서 | T1-T9 |

---

## 7. Risks & Mitigations

| 위험 | 영향 | 완화 |
|---|---|---|
| middleware Origin 가드가 정상 same-origin 요청에 false-positive | 결제·관리 플로우 503 | T3 회귀 테스트로 same-origin/cross-origin/null 모두 커버, dev 환경 localhost 화이트리스트 |
| webhook prefix 화이트리스트 누락 → Toss/Clerk webhook 차단 | 결제·인증 동기화 실패 | CSRF_EXEMPT_PREFIXES 상수로 단일 SoT, T1 단위 테스트로 모든 webhook 경로 enumerate |
| `serverActions.allowedOrigins` 잘못 설정 시 Server Actions 자동 차단 | apply/admin/request 폼 503 | `ALLOWED_ORIGINS` 재활용 + 배포 전 staging 검증 |
| 익명 공개 폼은 Origin 검증 우회 가능 (Origin 헤더 위조 — non-browser client) | 스팸·abuse 노출 | 본 사이클 out-of-scope (별도 abuse-protection 사이클). honeypot/rate-limit 유지 |
| Edge runtime 호환성 (middleware.ts) | Node-only API 사용 시 빌드 실패 | crypto 사용 안 함, 순수 string 비교만 — 자체 구현 정당화 |
| 회귀 테스트가 Next.js 16 middleware 실행을 mock 불완전 | false-pass | NextRequest mock 패턴은 기존 `tests/security/` 구조 재사용 |

---

## 8. Test Strategy

### Unit (Jest)
- `tests/unit/csrf-config.test.ts` — CSRF_EXEMPT_PREFIXES 매칭 (webhook, cron, payments/webhook 모두 통과 / payments/shop 등은 비통과)
- `tests/unit/middleware-csrf.test.ts` — 가드 분기 (POST+허용Origin→통과, POST+비허용→403, POST+null→403, GET→통과, webhook→통과, OPTIONS preflight→통과)

### Integration (Jest)
- `tests/integration/csrf-bypass.test.ts` — payments/shop/create-order 호출 시 Origin 헤더 화이트리스트 내/외 시나리오

### E2E (선택)
- 본 사이클은 middleware 단위로 회귀 충분, E2E 불필요. 후속 사이클에서 Playwright Origin 변조 테스트 추가 가능

### Manual QA
- dev 서버에서 leads/capture 폼 제출 (Origin: http://localhost:3000) → 통과 확인
- 다른 Origin으로 curl POST → 403 확인

---

## 9. Done Criteria (Final Review — T10)

- [ ] T1-T9 모두 completed
- [ ] `npm run type-check` 0 error
- [ ] `npm run lint` 0 error (CSRF 관련 신규 파일)
- [ ] Jest 신규 테스트 100% 통과
- [ ] Manual QA: 결제·상담·newsletter·leads 폼 모두 회귀 없음
- [ ] gap-detector matchRate ≥ 90%
- [ ] `docs/security/csrf-strategy.md` 룰 매핑 표 포함

---

## 10. Open Questions

| Q | 결정 시점 |
|---|---|
| Q1: CSRF 토큰 메커니즘까지 도입할지(D1=b) 아니면 Origin 가드만(D1=a)? | Design Phase advisor 단계 |
| Q2: `/api/members`를 단순 삭제할지(D4=a) 향후 활성화를 위해 인증 추가(D4=b)? | Plan 검토 시 |
| Q3: 익명 공개 폼의 abuse 보호(rate-limit 강화·CAPTCHA·Cloudflare Turnstile)는 별도 사이클로 분리? | 본 사이클 후속 후보로 기록 |
| Q4: middleware Origin 가드를 `request.headers.get('origin')` 만 볼지 Referer 까지 fallback 할지? | Design Phase |

---

## 11. References

- `rules/web/security.md` — "CSRF protection on state-changing forms"
- `rules/common/security.md` — "CSRF protection enabled"
- `middleware.ts:1-223` (현재 구현)
- `lib/config.ts:48-58` (`ALLOWED_ORIGINS`)
- 2026-05-25 CSRF 규정 준수 검증 결과 (parent conversation)
- `docs/01-plan/features/consultation-payment.plan.md` (PDCA plan 구조 참조)
