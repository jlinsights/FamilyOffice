# FamilyOffice Jest Coverage Threshold Cleanup — PDCA Plan

**Status:** Plan (Phase 1)
**Created:** 2026-05-25
**Branch:** `feat/jest-coverage-cleanup`
**Origin:** familyoffice-csrf-hardening Analysis F2 (HIGH P0)

---

## 1. 배경 / Problem

`/check` (또는 `npm run test:unit`) 실행 시 9 test suites · 523 tests 모두 PASS 하지만 **jest coverage threshold 가 전역 미달** 하여 exit code 비-0 으로 끝나는 현상:

```
Statements   : 1.88% ( 432/22875 )  ← threshold 85%
Branches     : 1.44% ( 148/10241 )  ← threshold 80%
Functions    : 1.29% ( 62/4775 )    ← threshold 85%
Lines        : 1.86% ( 401/21473 )  ← threshold 85%

Jest: "lib/financial/" coverage threshold for statements (95%) not met: 0%
Jest: "lib/financial/" coverage threshold for branches (90%) not met: 0%
Jest: Coverage data for lib/portfolio/ was not found.
Jest: Coverage data for lib/tax/ was not found.
Jest: "app/api/" coverage threshold for statements (90%) not met: 0%
```

`jest.config.js` 의 `coverageThreshold` 와 `collectCoverageFrom` 가 **현실(테스트 베이스 빈약 + collectCoverageFrom 광범위)** 과 크게 어긋남:

| 항목 | 현재 |
|---|---|
| 글로벌 임계값 | branches 80 / functions 85 / lines 85 / statements 85 |
| `lib/financial/` 임계값 | 90/95/95/95 — 실제 coverage 0% (테스트 부재) |
| `lib/portfolio/`, `lib/tax/` | 데이터 자체 없음 (테스트 부재) |
| `app/api/` 임계값 | 85/90/90/90 — 실제 coverage 0% |
| `collectCoverageFrom` scope | app/**, components/**, lib/**, constants/** 거의 전체 ~22k 라인 |
| 실 unit test suites | 9개 (~523 tests, ~400 라인 커버) |

### 영향
- 모든 `/check` 흐름·CI 의 `coverage` job 이 항상 실패
- "임계값 충족 PR" 가능성 0 → 임계값이 사실상 무의미 (가드 기능 상실)
- "coverage threshold 가 fail" 이 noise 가 되어 진짜 회귀(coverage 100% → 70% 추락) 발견 불가

---

## 2. 목표 (Success Criteria)

S1. `npm run test:unit` (또는 `--coverage` 포함 명령) exit code 0
S2. 임계값이 **실효성** 있게 동작 — 회귀(테스트 삭제, 코드 추가) 시 임계값 미달로 fail
S3. CI `coverage` workflow GREEN
S4. 신규 모듈/테스트 추가 시 임계값 자연스럽게 상향 (점진적 강화 가능 구조)
S5. 본 사이클 변경량은 **설정 파일 위주, 본질 코드 0**

---

## 3. 접근 옵션 (Open Q1)

### Option A. 전역 임계값 현실화 (1.88% 기반 baseline)
- `coverageThreshold.global` 을 현재값(약 statements 1, branches 1, functions 1, lines 1) 으로 낮춤
- 모듈별 임계값(`lib/financial/`, `app/api/` 등) 도 0 으로 낮춤 또는 제거
- **장점**: 5분 변경, 즉시 GREEN, 0 본질 변경
- **단점**: 가드가 약함 — 향후 회귀 감지 효과 제한적, 임계값이 의미 없는 토큰화

### Option B. 모듈별 differential 임계값 + global 제거 (Recommended)
- `coverageThreshold.global` 완전 제거
- 실제 테스트가 있는 모듈 디렉토리에 대해서만 임계값 명시:
  - `lib/security/` (csrf 등) — 측정 후 baseline+5%
  - `lib/financial/` 중 실 테스트 있는 모듈 — 측정 후 baseline+5%
  - 기타 측정
- `collectCoverageFrom` 도 함께 축소 — 실제 테스트가 있는 디렉토리만 수집
- **장점**: 임계값이 실효, 회귀 감지 효과 유지, scope 명확
- **단점**: 모듈별 baseline 측정 + 설정 작업 ~30~60분, 신규 테스트 추가 시 임계값 함께 갱신 필요

### Option C. CI 에서만 임계값 적용 (local 은 면제)
- `package.json` 에 `test:unit` (no threshold) / `test:coverage:ci` (with threshold) 분리
- jest config `--coverageThreshold` CLI flag 로 CI 에서만 주입
- **장점**: 로컬 dev 마찰 0
- **단점**: 임계값 자체는 여전히 비현실적 → CI 만 fail

### Option D. 점진적 baseline lock — `jest-coverage-baseline` 도입
- 외부 도구 (`jest-coverage-thresholds-bumper`) 로 매 PR 마다 baseline 자동 갱신
- 신규 PR 은 baseline 이상 유지 강제, 자동 ratchet
- **장점**: 장기적으로 가장 깔끔, 자동 강화
- **단점**: 외부 도구 의존성 도입, 학습 곡선

**1차 권고: Option B + Option C 일부 결합**
→ Design Phase 에서 D1 으로 확정

---

## 4. Open Questions

| ID | 질문 | Design Phase 확정 예정 |
|---|---|---|
| Q1 | 옵션 A/B/C/D 중 무엇? (또는 조합) | D1 |
| Q2 | `collectCoverageFrom` 축소 범위 — 어디까지? (예: `lib/financial/` 0% 인데 collectCoverageFrom 에 포함 유지할지) | D2 |
| Q3 | `lib/financial/`, `lib/portfolio/`, `lib/tax/` 의 미존재 테스트 — 본 사이클에서 면제(임계값 제거)? 또는 별 사이클 (`familyoffice-financial-test-coverage`)? | D3 |
| Q4 | `app/api/` 임계값 90% → 본 사이클 면제(0% 측정)? 또는 별 사이클 (`familyoffice-api-test-coverage`)? | D4 |
| Q5 | CI `coverage` workflow 가 그대로 작동하는지 (별도 `npx jest --coverage` 명령 사용?) | D5 |

---

## 5. Tasks (예상)

| # | 작업 | 의존성 | 예상 라인 |
|---|---|---|---|
| T1 | 현재 모듈별 실 coverage 측정 (`npx jest --coverage --json` baseline) | — | 0 (측정만) |
| T2 | `jest.config.js` `coverageThreshold` 재작성 (Option B 적용) | T1 | ~30 lines (config) |
| T3 | `jest.config.js` `collectCoverageFrom` 축소 | T1 | ~10 lines (config) |
| T4 | `package.json` scripts 정리 (필요 시 `test:coverage:ci` 분리) | T2 | ~5 lines |
| T5 | `npm run test:unit` exit 0 검증 | T2~T4 | 0 (검증) |
| T6 | CI workflow 점검 (`.github/workflows/*.yml` coverage job) | T5 | ~5 lines (필요 시) |

**예상 본질 코드 변화: 0 lines (설정/CI 만)**
**예상 설정 파일 변화: ~50 lines**

---

## 6. Out of Scope (분리 사이클 후보)

| 후보 | 근거 | 우선순위 |
|---|---|---|
| `familyoffice-financial-test-coverage` | `lib/financial/`, `lib/portfolio/`, `lib/tax/` 실 테스트 작성 (95% 달성) | MEDIUM (CLAUDE.md 명시 "금융 모듈 90%+") |
| `familyoffice-api-test-coverage` | `app/api/` 실 테스트 작성 (90% 달성) | MEDIUM |
| `familyoffice-ci-debt-cleanup` | npm audit fast-xml-parser+qs DoS + CodeQL v3 deprecation | HIGH (CSRF 사이클 F3) |
| `familyoffice-abuse-protection` | CSRF 사이클 D7 cut — 익명 폼 spam/abuse 가드 | MEDIUM |

---

## 7. 위험 / Risk

| # | 위험 | 완화 |
|---|---|---|
| R1 | 임계값 너무 낮게 잡아 회귀 감지 실패 | 모듈별 baseline+5% 마진으로 ratchet, 정기적 상향 |
| R2 | `collectCoverageFrom` 축소가 향후 모듈 신설 시 누락 위험 | Design 에서 패턴 (`lib/**/*.ts`) vs 명시(`lib/security/csrf.ts`) 정책 결정 |
| R3 | CI `coverage` workflow 가 별 명령으로 임계값 적용 중 | T6 점검에서 확인 |
| R4 | 사용자가 Option A 선호 시 의도 충돌 | Q1 명시적 확인 |

---

## 8. 일정

| Phase | 예상 소요 |
|---|---|
| Plan | 완료 (이 문서) |
| Design | 30~60분 (Open Q1~Q5 확정 + jest config 최종안) |
| Do | 30~60분 (T1~T6) |
| Check | 10분 (`npm run test:unit` exit 0 + CI green 확인) |
| Report | 15분 |
| **Total** | **2~3시간 (사용자 예상치 일치)** |

---

## 9. Next

→ `/pdca design familyoffice-jest-coverage-threshold-cleanup`
   (Open Q1~Q5 확정 + jest.config.js 최종 diff 설계)
