# FamilyOffice Jest Coverage Threshold Cleanup — PDCA Design

**Status:** Design (Phase 2)
**Plan 참조:** [`docs/01-plan/features/familyoffice-jest-coverage-threshold-cleanup.plan.md`](../../01-plan/features/familyoffice-jest-coverage-threshold-cleanup.plan.md)
**Created:** 2026-05-25
**Branch:** `feat/jest-coverage-cleanup`

---

## 0. Advisor 지적 (Design 진입 전 반영)

| # | 지적 | 반영 |
|---|---|---|
| A1 | "baseline+N%" 는 aspirational target, regression gate 는 "baseline−Npp buffer" | Plan R1 정정, D1 임계값 공식 명시 |
| A2 | lib/financial 0% 는 CLAUDE.md "금융 90%+" 와 충돌, silently drop 금지 | D3 → 임계값 제거 + collectCoverageFrom 유지(가시성) + 별 사이클 `familyoffice-financial-test-coverage` 명시 |
| A3 | "Coverage data not found" ≠ "0%" — 두 다른 실패 모드 | D2 → portfolio/tax (not found) collectCoverageFrom 제외, shop/supabase/api (0%) 케이스별 결정 |
| A4 | 디렉토리 threshold 만으론 critical 단일 파일 회귀 못 막음 (csrf.ts 91% → 0% 가능) | D1 → `lib/security/csrf.ts` 파일 단위 임계값 명시 |
| A5 | "Config 변경이 실제 fail 트리거 하는지" 검증 누락 | T-new (T6) → Do 단계 fail-injection 검증 추가 |
| A6 | PR title `[PLAN+DESIGN]` 명시 (구현 기대 차단) | Step 4 commit/PR draft 단계에서 반영 |

---

## 1. Baseline Coverage (2026-05-25 측정)

`npx jest --testPathPattern=tests/unit --coverageReporters=json-summary` (main worktree 기준, 동일 코드)

### 1.1 모듈별 합산

| 모듈 | files | Statements | Branches | Functions | Lines | 분류 |
|---|---:|---:|---:|---:|---:|---|
| `lib/calculations/` | 2 | 98.08 | 90.23 | 100 | 99.32 | ✅ Keep + threshold |
| `lib/payments/` | 4 | 94.23 | 88.24 | 100 | 96.08 | ✅ Keep + threshold |
| `lib/security/csrf.ts` (단일) | 1 | 91.66 | 100 | 100 | 100 | ✅ Keep + file-glob threshold |
| `lib/security/` 나머지 11 | 11 | 0 | 0 | 0 | 0 | ✗ Exclude (별 사이클) |
| `lib/financial/` | 3 | 0 | 0 | 0 | 0 | △ Keep & no threshold (CLAUDE.md TODO) |
| `lib/shop/` | 5 | 0 | 0 | 0 | 0 | ✗ Exclude (별 사이클) |
| `lib/supabase/` | 5 | 0 | 0 | 0 | 0 | ✗ Exclude (인프라) |
| `lib/portfolio/` | — | not found | — | — | — | ✗ 디렉토리 없음, Exclude |
| `lib/tax/` | — | not found | — | — | — | ✗ 디렉토리 없음, Exclude |
| `lib/reporting/` | — | not found | — | — | — | ✗ 디렉토리 없음, Exclude |
| `lib/compliance/` | — | not found | — | — | — | ✗ 디렉토리 없음, Exclude |
| `app/api/` | 73 | 0 | 0 | 0 | 0 | ✗ Exclude (별 사이클 `familyoffice-api-test-coverage`) |
| `app/` | 122 | 0 | 0 | 0 | 0 | ✗ Exclude (페이지 — Playwright e2e 영역) |
| `components/` | 259 | 0 | 0 | 0 | 0 | ✗ Exclude (UI — Playwright e2e 영역) |
| `constants/` | 29 | 22.57 | 44.44 | 40 | 26.16 | ✗ Exclude (fixture 성격) |
| `lib/` 기타 | 147 | 0.08 | 0.05 | 0 | 0.06 | ✗ Exclude (별 사이클) |

### 1.2 파일 단위 핵심 (Keep 대상)

```
lib/calculations/portfolio-calculations.ts   S 97.48  B 90.41  F 100  L 98.67
lib/calculations/tax-calculations.ts         S 98.70  B 90.00  F 100  L 100
lib/payments/payment-secret.ts               S 88.88  B 75.00  F 100  L 88.88
lib/payments/toss-customer-key.ts            S 100    B 100    F 100  L 100
lib/payments/toss-payment-lookup.ts          S 87.50  B 100    F 100  L 87.50
lib/payments/toss-webhook-signature.ts       S 94.73  B 85.71  F 100  L 100
lib/security/csrf.ts                         S 91.66  B 100    F 100  L 100
```

---

## 2. 결정 사항 (Q1~Q5 확정)

### D1. Open Q1 — 옵션 결정

**확정: Option B 단독** (모듈별 differential 임계값 + global 제거)

- Option A 기각: 가드 무력화
- Option C 보류: Local + CI 임계값 동일 — 마찰 없음, 분리 불필요
- Option D 보류: ratchet 자동 상향은 별 사이클 (`familyoffice-coverage-ratchet`) 후보

**임계값 공식 (advisor A1 반영):**

```
threshold(metric) = floor(baseline(metric)) − 1pp buffer
```

- 모듈 단위 임계값: 디렉토리 합산 평균 baseline 기준
- 파일 단위 임계값(critical assets): 파일 baseline 기준
- buffer 1pp: 측정 노이즈(prettier reformat 등) 흡수, 큰 회귀(>1pp 하락)만 차단

### D2. Open Q2 — collectCoverageFrom 정책

**Keep / Exclude 명시적 결정:**

| 정책 | 모듈 | 이유 |
|---|---|---|
| **Keep + threshold** | `lib/calculations/`, `lib/payments/`, `lib/security/csrf.ts` | 실 coverage 양호, 회귀 가드 가치 큼 |
| **Keep + no threshold (TODO)** | `lib/financial/` | CLAUDE.md 90%+ 요구 명시 — silently drop 금지, 별 사이클까지 가시성 유지 (A2) |
| **Exclude (별 사이클 후보)** | `lib/security/` 나머지 11 파일, `app/api/`, `lib/shop/`, `lib/supabase/`, `lib/` 기타 147 파일 | 0% — 노이즈, 별 사이클 후보 명시 |
| **Exclude (영구)** | `app/`, `components/`, `constants/` | UI/페이지/픽스처 — Playwright e2e 가 담당, jest 측정 부적합 |
| **Exclude (디렉토리 부재)** | `lib/portfolio/`, `lib/tax/`, `lib/reporting/`, `lib/compliance/` | "Coverage data not found" — 디렉토리 자체가 없음 (A3) |

### D3. Open Q3 — lib/financial 처리

**확정: 임계값 제거 + collectCoverageFrom 유지 + TODO 명시 + 별 사이클 `familyoffice-financial-test-coverage` (MEDIUM priority)**

근거 (A2 반영):
- CLAUDE.md "테스트 전략 표: 단위 Jest 금융 모듈 90%+" 라고 명시된 contract
- 단순 임계값 제거 (silently drop) → contract 위반 위험
- 임계값 유지 (95%) → 항상 fail (loud signal 이지만 본 사이클 scope 위반)
- **타협안**: 임계값은 제거하되 collectCoverageFrom 에 유지하여 매 측정마다 "lib/financial/ 0%" 가 surface, 별 사이클 진입 신호로 역할

### D4. Open Q4 — app/api 처리

**확정: collectCoverageFrom 에서 완전 제외 + 별 사이클 `familyoffice-api-test-coverage` (MEDIUM)**

근거:
- 73 파일 0% — collectCoverageFrom 에 유지하면 매 측정마다 노이즈
- 임계값 제거만으로는 효과 미흡 (json-summary 가 항상 0% 보고)
- 별 사이클로 분리: 본 사이클 scope 보호 (A6)

### D5. Open Q5 — CI workflow

**확정: 변경 없음 — `npm run test:unit` 그대로**

근거:
- `test:unit` 가 이미 coverage 수집 (jest.config.js `collectCoverage: true`)
- 임계값 미달이 exit code 비-0 → CI fail 신호로 충분
- Option C (CI/local 분리) 는 마찰 없으므로 불필요

---

## 3. jest.config.js 최종 Diff

### 3.1 AS-IS (요약)

```js
collectCoverageFrom: [
  'lib/financial/**/*.{js,ts,jsx,tsx}',
  'lib/calculations/**/*.{js,ts,jsx,tsx}',
  'lib/portfolio/**/*.{js,ts,jsx,tsx}',
  'lib/tax/**/*.{js,ts,jsx,tsx}',
  'lib/reporting/**/*.{js,ts,jsx,tsx}',
  'lib/compliance/**/*.{js,ts,jsx,tsx}',
  'app/api/**/*.{js,ts}',
  'app/**/*.{js,jsx,ts,tsx}',
  'components/**/*.{js,jsx,ts,tsx}',
  'lib/**/*.{js,jsx,ts,tsx}',
  'constants/**/*.{js,jsx,ts,tsx}',
  '!**/*.d.ts',
  '!**/*.config.{js,ts}',
  '!**/*.stories.{js,ts,jsx,tsx}',
  '!**/node_modules/**',
  '!**/.next/**',
  '!**/coverage/**',
  '!**/dist/**',
  '!**/layout.tsx',
  '!**/globals.css',
],

coverageThreshold: {
  global:             { branches: 80, functions: 85, lines: 85, statements: 85 },
  'lib/financial/':   { branches: 90, functions: 95, lines: 95, statements: 95 },
  'lib/calculations/':{ branches: 90, functions: 95, lines: 95, statements: 95 },
  'lib/portfolio/':   { branches: 90, functions: 95, lines: 95, statements: 95 },
  'lib/tax/':         { branches: 90, functions: 95, lines: 95, statements: 95 },
  'app/api/':         { branches: 85, functions: 90, lines: 90, statements: 90 },
},
```

### 3.2 TO-BE

```js
collectCoverageFrom: [
  // Keep + threshold (실 coverage 양호)
  'lib/calculations/**/*.{ts,tsx}',
  'lib/payments/**/*.{ts,tsx}',
  'lib/security/csrf.ts',

  // Keep + no threshold (CLAUDE.md 금융 90%+ TODO, 별 사이클 familyoffice-financial-test-coverage 예정)
  'lib/financial/**/*.{ts,tsx}',

  // Exclude 영구 (UI 영역 — Playwright e2e 가 담당, jest 측정 부적합)
  '!**/*.d.ts',
  '!**/*.config.{js,ts}',
  '!**/*.stories.{js,ts,jsx,tsx}',
  '!**/node_modules/**',
  '!**/.next/**',
  '!**/coverage/**',
  '!**/dist/**',
  '!**/layout.tsx',
  '!**/globals.css',
],

coverageThreshold: {
  // global threshold 제거 — 모듈별 differential 만 유지 (D1)

  // 파일 단위 (critical asset 회귀 방지, A4)
  'lib/security/csrf.ts': {
    statements: 90, branches: 95, functions: 100, lines: 95,
  },

  // 디렉토리 단위 (baseline − 1pp buffer, D1 공식)
  'lib/calculations/': {
    statements: 97, branches: 89, functions: 100, lines: 98,
  },
  'lib/payments/': {
    statements: 93, branches: 87, functions: 100, lines: 95,
  },

  // NOTE: lib/financial/ 는 의도적으로 임계값 미설정.
  // collectCoverageFrom 에는 포함되어 매 측정마다 0% 가 보고됨 (가시성).
  // 별 사이클 familyoffice-financial-test-coverage (MEDIUM) 에서 임계값 90%+ 부여 예정.
  // CLAUDE.md "테스트 전략 — 금융 모듈 90%+" 와 연동.
},
```

### 3.3 변화 정량

| 항목 | AS-IS | TO-BE | Δ |
|---|---:|---:|---|
| `collectCoverageFrom` 라인 | 21 | 14 | −7 |
| `coverageThreshold` 항목 | 6 | 3 + 1 NOTE | −2 (global+app/api+portfolio+tax+financial 제거, csrf.ts/payments 추가) |
| 측정 대상 파일 수 | ~22875 statements (전체) | ~528 statements (4 모듈) | −98% |
| `test:unit` exit code (현재 main) | 1 (threshold fail) | 0 (예상) | ✓ |

---

## 4. Tasks (Do Phase 작업표)

| # | 작업 | 의존성 | 라인 |
|---|---|---|---|
| T1 | (완료) Baseline 측정 — Design 1.1/1.2 표에 기록 | — | 0 |
| T2 | `jest.config.js` `collectCoverageFrom` 재작성 (3.2 안 적용) | T1 | ~7 |
| T3 | `jest.config.js` `coverageThreshold` 재작성 (3.2 안 적용 + NOTE 주석) | T1, T2 | ~25 |
| T4 | `npm run test:unit` 실행 → exit code 0 검증 | T2, T3 | 0 |
| T5 | `npx jest tests/unit/middleware-csrf --coverage` 실행 → `lib/security/csrf.ts` 단일 파일 임계값 통과 검증 | T2, T3 | 0 |
| **T6** | **Fail-injection 검증 (A5)**: `tests/unit/middleware-csrf.test.ts` 중 1개 `it.skip` 처리 → `npm run test:unit` exit code 1 (threshold fail) 확인 → revert | T5 | 0 |
| T7 | `package.json` 변경 불필요 확인 (D5) | T4 | 0 |
| T8 | `.github/workflows/*.yml` 의 `coverage` job 영향 없음 확인 (`npm run test:unit` 그대로 사용) | T4 | 0 |

**총 변경량: ~32 라인 (jest.config.js 만), 0 application code.**

---

## 5. 검증 시나리오

| 시나리오 | 명령 | 예상 결과 |
|---|---|---|
| 정상 빌드 | `npm run test:unit` | exit 0, 523 tests PASS, threshold 통과 (csrf.ts 91.66% > 90, calculations 98.08% > 97, payments 94.23% > 93) |
| 회귀 차단 (T6 fail-injection) | csrf.ts test 1개 skip → `npm run test:unit` | exit 1, threshold fail (csrf.ts S% 91→낮음) |
| CSRF 신규 회귀 가드 | 향후 `lib/security/csrf.ts` 라인 추가 + 테스트 미추가 PR | threshold fail (조기 발견) |
| lint/typecheck 영향 | `npm run agent:check` | 영향 없음 (jest config 만 변경) |

---

## 6. Out of Scope (분리 사이클 후보)

| 후보 | 우선순위 | 본 사이클과의 관계 |
|---|---|---|
| `familyoffice-financial-test-coverage` | MEDIUM | CLAUDE.md 90%+ 요구, D3 에서 명시적 cut |
| `familyoffice-api-test-coverage` | MEDIUM | app/api/ 73 파일 0%, D4 에서 명시적 cut |
| `familyoffice-security-test-coverage` | MEDIUM | lib/security/ 나머지 11 파일 (audit/csp/mfa/encryption 등), D2 cut |
| `familyoffice-coverage-ratchet` | LOW | Option D (jest-coverage-thresholds-bumper) 자동 상향, D1 보류 |
| `familyoffice-ci-debt-cleanup` | HIGH | CSRF 사이클 F3 (npm audit + CodeQL v3), 본 사이클 독립 |
| `familyoffice-abuse-protection` | MEDIUM | CSRF 사이클 D7 cut |

---

## 7. 위험 / Risk

| # | 위험 | 완화 |
|---|---|---|
| R1 | lib/calculations 신규 파일 추가 시 baseline 변동 → 임계값 미세 조정 필요 | Do/Check 단계에서 변동 확인, 필요시 1pp 단위 조정 |
| R2 | 별 사이클 미진행 시 lib/financial 0% 가 영구 노이즈 | TO-DO 주석 명시 + 메모리 후보 등록 (이미 완료) |
| R3 | Plan R1 wording 정정 못한 채 PR 리뷰 시작 | 본 commit 에서 plan.md R1 정정 함께 포함 |
| R4 | jest config 변경이 CI workflow 와 unintended interaction | T8 에서 `.github/workflows/*.yml` 확인 |

---

## 8. PR Strategy (advisor A6 반영)

**PR title:** `[PLAN+DESIGN] chore(jest): coverage threshold cleanup — 모듈별 differential + global 제거`

**PR body 구성:**
- Plan + Design 두 commit 묶음 (config-only cycle 의 일반적 묶음 패턴)
- Reviewer 가 implementation 기대하지 않도록 `[PLAN+DESIGN]` 접두사 명시
- Draft 상태 — Do/Check/Report 후 ready-for-review 전환

---

## 9. Next

→ `/pdca do familyoffice-jest-coverage-threshold-cleanup` (T2~T8 실행, jest.config.js 적용 + fail-injection 검증)
