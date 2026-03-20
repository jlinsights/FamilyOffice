# Design: force-dynamic-optimization

> FamilyOffice force-dynamic 최적화 — 상세 설계

## 개요

| 항목 | 내용 |
|------|------|
| Feature | force-dynamic-optimization |
| Plan 참조 | `docs/01-plan/features/force-dynamic-optimization.plan.md` |
| 작성일 | 2026-03-20 |
| Next.js 버전 | 16.1.6 |
| 전략 | Strategy A (루트 제거 + 빌드 테스트) |

---

## 1. 루트 레이아웃 force-dynamic 제거

### 대상 파일
- `app/layout.tsx` (라인 8-10)

### 현재 코드
```typescript
// Force all routes to be dynamically rendered — workaround for Next.js 16 static
// generation worker bug where React resolves to null intermittently (vercel/next.js#85668)
export const dynamic = 'force-dynamic';
```

### 수정 설계
```typescript
// 삭제: export const dynamic = 'force-dynamic';
// 주석도 함께 제거
```

### 빌드 테스트
```bash
npm run build
```
- **성공 시**: Strategy A 계속 진행
- **실패 시**: 원복 후 Strategy B (중복 정리만)

---

## 2. 페이지별 force-dynamic 분류 및 처리

### 유지 (동적 렌더링 필요) — 6건 페이지

| 파일 | 이유 | 조치 |
|------|------|------|
| `app/admin/page.tsx` | 인증 + DB 조회 | 유지 |
| `app/admin/analytics/page.tsx` | 실시간 분석 | 유지 |
| `app/admin/consultations/page.tsx` | DB 조회 | 유지 |
| `app/portal/page.tsx` | `'use client'` + 인증 | **제거** (클라이언트 컴포넌트에서 route config 무효) |
| `app/auth/callback/page.tsx` | OAuth 콜백 | 유지 |
| `app/insights/external/[source]/[slug]/page.tsx` | isomorphic-dompurify JSDOM | 유지 |

### 유지 (API routes) — 8건

| 파일 | 조치 |
|------|------|
| `app/api/admin/analytics/recent/route.ts` | 유지 |
| `app/api/admin/analytics/funnel/route.ts` | 유지 |
| `app/api/admin/analytics/export/route.ts` | 유지 |
| `app/api/admin/analytics/attribution/route.ts` | 유지 |
| `app/api/analytics/events/route.ts` | 유지 |
| `app/api/webhooks/cal-com/route.ts` | 유지 |
| `app/api/naver/ranking/route.ts` | 유지 |
| `app/api/monitoring/route.ts` | 유지 |
| `app/api/tags/route.ts` | 유지 |

### 제거 (정적 가능) — 7건

| 파일 | 이유 | 조치 |
|------|------|------|
| `app/layout.tsx` | 루트 cascade 해제 | **제거** (핵심) |
| `app/not-found.tsx` | 순수 정적 콘텐츠 | **제거** + `runtime` 제거 |
| `app/global-error.tsx` | 순수 정적 콘텐츠 | **제거** |
| `app/program/page.tsx` | `'use client'` 클라이언트 컴포넌트 | **제거** + `runtime` 제거 |
| `app/program/art-asset-class/page.tsx` | `'use client'` 클라이언트 컴포넌트 | **제거** |
| `app/program/100-years-ceo/page.tsx` | `'use client'` 클라이언트 컴포넌트 | **제거** |
| `app/portal/page.tsx` | `'use client'` 클라이언트 컴포넌트 | **제거** |

> Note: `'use client'` 파일에서 `export const dynamic`은 Next.js에서 무시됨. 이 선언은 원래 무효였으나 루트 레이아웃의 cascade가 실제로 동적 렌더링을 강제했음.

---

## 3. 구현 순서

```
Step 1: app/layout.tsx — force-dynamic + 주석 제거
Step 2: npm run build — 빌드 테스트 (분기점)
  ├─ 성공 → Step 3 진행
  └─ 실패 → 원복, Strategy B로 전환
Step 3: 정적 페이지 force-dynamic 제거 (7건)
  - app/not-found.tsx (dynamic + runtime 제거)
  - app/global-error.tsx (dynamic 제거)
  - app/program/page.tsx (dynamic + runtime 제거)
  - app/program/art-asset-class/page.tsx (dynamic 제거)
  - app/program/100-years-ceo/page.tsx (dynamic 제거)
  - app/portal/page.tsx (dynamic 제거)
Step 4: npm run build — 최종 빌드 검증
Step 5: npm run lint && npm run typecheck
```

---

## 4. 빌드 출력 기대값

### Before (현재)
```
Route (app)               Size    First Load JS
┌ λ /                     ...     ...
├ λ /about                ...     ...
├ λ /blog/...             ...     ...
└ λ /program              ...     ...

λ = Dynamic (server-rendered on each request)
```

### After (최적화 후)
```
Route (app)               Size    First Load JS
┌ ○ /                     ...     ...        ← 정적!
├ ○ /about                ...     ...        ← 정적!
├ ○ /blog/...             ...     ...        ← 정적!
├ ○ /program              ...     ...        ← 정적!
├ λ /admin                ...     ...        ← 동적 유지
├ λ /portal               ...     ...
└ λ /auth/callback        ...     ...

○ = Static (prerendered at build time)
λ = Dynamic (server-rendered on each request)
```

---

## 5. 롤백 계획

빌드 실패 시 즉시 원복:
```bash
git checkout -- app/layout.tsx
```

Strategy B 전환 시:
- 루트 `force-dynamic` 유지
- `'use client'` 파일의 무효한 `force-dynamic` 선언만 제거 (코드 정리)
- 성능 개선 효과 없음, 코드 명확성만 개선

---

## 6. 검증 기준

| 기준 | 측정 방법 |
|------|-----------|
| `npm run build` 성공 | 빌드 에러 0건 |
| 빌드 출력에 `○` 정적 마크 | 정적 페이지 최소 5개 이상 |
| `npm run lint` | 에러 0건 |
| `npm run typecheck` | 에러 0건 |
| force-dynamic 선언 수 감소 | 22건 → 15건 이하 |

---

## 다음 단계

→ `/pdca do force-dynamic-optimization` 로 구현 시작
