# Plan: force-dynamic-optimization

> FamilyOffice force-dynamic 최적화 — SSG/ISR 전환으로 성능 개선

## 개요

| 항목 | 내용 |
|------|------|
| Feature | force-dynamic-optimization |
| 작성일 | 2026-03-20 |
| 우선순위 | MEDIUM |
| 예상 범위 | 22개 force-dynamic 선언 검토 |
| 트리거 | 코드 분석 (성능 점수 65/100) |

## 배경 및 동기

### 핵심 문제

`app/layout.tsx:10`에 루트 레이아웃 레벨 `force-dynamic`이 설정되어 있음.
이로 인해 **전체 사이트의 모든 페이지**가 동적 렌더링으로 강제됨.

```typescript
// app/layout.tsx:8-10
// Force all routes to be dynamically rendered — workaround for Next.js 16 static
// generation worker bug where React resolves to null intermittently (vercel/next.js#85668)
export const dynamic = 'force-dynamic';
```

### 원인

Next.js 16 정적 생성 워커에서 React가 간헐적으로 null로 resolve되는 버그 (vercel/next.js#85668).
이 워크어라운드로 인해 정적 콘텐츠 페이지(about, blog, services 등)도 SSG/ISR 불가.

### 영향

- 모든 페이지가 매 요청마다 서버에서 렌더링 → TTFB 증가
- CDN 캐시 활용 불가 → 트래픽 증가 시 서버 부하 증가
- Core Web Vitals (LCP, FCP) 저하
- SEO 크롤러 대응 속도 저하

## 현재 force-dynamic 선언 (22건)

### 루트 레이아웃 (전체 영향)
| 파일 | 이유 |
|------|------|
| `app/layout.tsx` | Next.js 16 버그 워크어라운드 (#85668) |

### 정당한 동적 렌더링 (유지 필요) — 11건
| 파일 | 이유 |
|------|------|
| `app/admin/page.tsx` | 인증 + DB 조회 |
| `app/admin/analytics/page.tsx` | 실시간 분석 데이터 |
| `app/admin/consultations/page.tsx` | DB 조회 |
| `app/portal/page.tsx` | 인증 사용자 전용 |
| `app/auth/callback/page.tsx` | OAuth 콜백 |
| `app/insights/external/[source]/[slug]/page.tsx` | isomorphic-dompurify JSDOM 의존 |
| `app/api/admin/analytics/*/route.ts` (4건) | API 엔드포인트 |
| `app/api/webhooks/cal-com/route.ts` | 웹훅 |
| `app/api/naver/ranking/route.ts` | 실시간 데이터 |
| `app/api/monitoring/route.ts` | 모니터링 |
| `app/api/tags/route.ts` | 동적 데이터 |
| `app/api/analytics/events/route.ts` | 이벤트 수집 |

### 제거 가능 (정적/ISR 전환) — 5건
| 파일 | 이유 | 권장 |
|------|------|------|
| `app/not-found.tsx` | 정적 콘텐츠 | 제거 (정적) |
| `app/global-error.tsx` | 정적 콘텐츠 | 제거 (정적) |
| `app/program/page.tsx` | 정적 콘텐츠 | 제거 또는 ISR |
| `app/program/art-asset-class/page.tsx` | 정적 콘텐츠 | 제거 또는 ISR |
| `app/program/100-years-ceo/page.tsx` | 정적 콘텐츠 | 제거 또는 ISR |

### 루트 레이아웃 종속 (루트 제거 시 자동 해결) — 5건
위 5건은 루트 레이아웃의 `force-dynamic`이 cascade되므로 개별 선언이 무의미.
루트를 제거하면 이 페이지들이 기본 동작(정적)으로 돌아감.

## 목표

- [ ] Next.js 16 버그 (#85668) 현재 상태 확인
- [ ] 루트 레이아웃 `force-dynamic` 제거 가능 여부 판단
- [ ] 제거 가능 시: 루트 제거 + 필요 페이지만 개별 `force-dynamic` 유지
- [ ] 제거 불가 시: 루트 유지 + 개별 중복 선언만 정리 (효과 제한적)
- [ ] 빌드 성공 및 프로덕션 동작 검증

## 접근 전략

### Strategy A: 루트 force-dynamic 제거 (권장, 고영향)

1. `app/layout.tsx`에서 `export const dynamic = 'force-dynamic'` 제거
2. 동적 필요 페이지에만 개별 `force-dynamic` 유지/추가
3. 정적 콘텐츠 페이지에서 불필요 `force-dynamic` 제거
4. `npm run build` 성공 여부로 버그 해결 확인

**리스크**: Next.js 16 버그 미해결 시 빌드 실패 또는 간헐적 null 렌더링
**대응**: 빌드 실패 시 즉시 원복, Vercel preview deploy로 사전 테스트

### Strategy B: 개별 중복 정리만 (보수적, 저영향)

1. 루트 레이아웃 `force-dynamic` 유지
2. 개별 페이지의 중복 `force-dynamic` 선언만 제거 (이미 루트에서 cascade)
3. 코드 정리 효과만 (성능 개선 없음)

**리스크**: 낮음
**효과**: 코드 정리만, 성능 개선 없음

## 성공 기준

| 기준 | 측정 방법 |
|------|-----------|
| `npm run build` 성공 | 빌드 에러 0건 |
| 정적 페이지 SSG 확인 | 빌드 출력에서 `○` (정적) 마크 확인 |
| Vercel preview 정상 | 주요 페이지 렌더링 확인 |
| lint + typecheck 통과 | `npm run agent:check` 에러 0건 |

## 리스크

| 리스크 | 영향 | 대응 |
|--------|------|------|
| Next.js 16 버그 미해결 | 빌드 실패 또는 간헐적 null 렌더링 | 빌드 테스트 후 판단, 실패 시 Strategy B |
| isomorphic-dompurify JSDOM | 정적 생성 시 CSS 의존 에러 | 해당 페이지만 `force-dynamic` 유지 |
| Clerk 미들웨어 충돌 | 인증 페이지 렌더링 에러 | 인증 페이지 `force-dynamic` 유지 |

## 구현 순서 (권장)

1. **Next.js 16 버그 상태 확인** — `vercel/next.js#85668` 이슈 상태 조회
2. **루트 force-dynamic 제거 시도** — `app/layout.tsx` 수정
3. **빌드 테스트** — `npm run build` 실행
4. **빌드 성공 시**: 정적 가능 페이지에서 `force-dynamic` 제거, 필요 페이지만 유지
5. **빌드 실패 시**: 원복 후 Strategy B (중복 정리만)
6. **lint + typecheck 검증**

## 다음 단계

→ `/pdca design force-dynamic-optimization` 로 상세 설계
