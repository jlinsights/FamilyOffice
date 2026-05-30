# FamilyOffice Jest Coverage Threshold Cleanup — PDCA Completion Report

**Status:** Completed → Archive
**Created:** 2026-05-30
**Cycle duration:** 2026-05-25 (Plan/Design) → 2026-05-30 (Do/Check/Report) — 5일 분산 사이클
**Branch:** `feat/jest-coverage-cleanup`
**PR:** [#17](https://github.com/jlinsights/FamilyOffice/pull/17)
**Match Rate:** 96%

---

## 1. Executive Summary

FamilyOffice 의 jest coverage threshold 가 **1.88% (실측) vs 85% (global 임계값)** 격차로 매 `npm run test:unit` exit 1 (CI 차단) 상태였음. CSRF Hardening 사이클 F2 (HIGH P0) 로 분리.

원인: `collectCoverageFrom` 이 광범위(app/, components/, lib/ 전체)하지만 실 테스트는 4 모듈(calculations / payments / security/csrf.ts / financial 일부)에만 존재 → global 85% 임계값 항상 fail.

처방: **모듈별 differential threshold** (Option B 단독) — 실 coverage 양호한 모듈만 `collectCoverageFrom` 유지 + `baseline floor − 1pp buffer` 회귀 가드. global 제거, financial 은 가시성을 위해 keep + threshold 미설정.

본질 코드 0, jest.config.js 단일 파일 ~32 라인 net 변경. fail-injection (T6) 으로 gate 동작 직접 증명.

---

## 2. 결과 지표

| 지표 | 값 |
|---|---|
| Match Rate | 96% (T1-T8 100% / Advisor 100% / 시나리오 75% pre-existing CI noise 보정) |
| 본질 코드 라인 변경 | 0 |
| jest.config.js 변경 | +33 / −52 (net −19) |
| `collectCoverageFrom` | 21 → 14 라인 |
| `coverageThreshold` 항목 | 6 → 3 + NOTE |
| `npm run test:unit` exit | **1 → 0** (1.88% global fail → 모듈별 통과) |
| Unit tests | 523/523 PASS (변동 0) |
| 측정 대상 statements | ~22875 → ~561 (−98%) |
| Fail-injection (T6) | exit=1 fail msg `(99%) not met: 98.08%` → revert → exit 0 ✅ |
| 신규 의존성 | 0 |
| 내부 gap | 0건 (G1 sufficient extrapolation, G2 별 사이클 cut) |
| Iteration 필요 횟수 | 0 (Match ≥90% 1차 도달) |

---

## 3. 변경 사항

### 3.1 수정 파일
- `jest.config.js` — `collectCoverageFrom` 재작성 (21→14 라인) + `coverageThreshold` 재작성 (6→3 + NOTE)
- `docs/01-plan/features/familyoffice-jest-coverage-threshold-cleanup.plan.md` — R1 wording 정정 (Design commit `b8915b6` 에 포함)

### 3.2 신규 문서
- `docs/01-plan/features/familyoffice-jest-coverage-threshold-cleanup.plan.md` (Plan, ac3a7ba)
- `docs/02-design/features/familyoffice-jest-coverage-threshold-cleanup.design.md` (Design, b8915b6)
- `docs/03-analysis/familyoffice-jest-coverage-threshold-cleanup.analysis.md` (Analysis, b61ad32)
- `docs/04-report/features/familyoffice-jest-coverage-threshold-cleanup.report.md` (본 문서)

### 3.3 commits

```
b61ad32 docs(pdca): Analysis Match 96%
4ec23a0 chore(jest): Do — 모듈별 differential 적용
b8915b6 docs(pdca): Design — Q1~Q5 확정 + Plan R1 정정
ac3a7ba docs(pdca): Plan — 4 옵션 + Open Q1~Q5
```

---

## 4. 핵심 결정 (Q1~Q5)

| Q | 결정 | 근거 |
|---|---|---|
| Q1 옵션 | **B 단독** (모듈별 differential + global 제거) | A 가드 무력화 / C 마찰 없음 / D 별 사이클 |
| Q2 collectCoverageFrom 정책 | 4 keep + 9 exclude 명시 | 0% 노이즈 제거 + 별 사이클 후보 명시 |
| Q3 lib/financial | 임계값 제거 + keep + NOTE | CLAUDE.md 90%+ contract silently drop 금지 (advisor A2) |
| Q4 app/api | 완전 exclude + 별 사이클 | 73 파일 0% 노이즈 |
| Q5 CI workflow | 변경 없음 (`test:unit` 그대로) | exit code 가 이미 fail 신호 충분 |

---

## 5. 임계값 공식 (advisor A1 반영)

```
threshold(metric) = floor(baseline(metric)) − 1pp buffer
```

| 모듈/파일 | Stmts | Branches | Funcs | Lines | 기준 |
|---|---:|---:|---:|---:|---|
| `lib/security/csrf.ts` (파일) | 90 | 95 | 100 | 95 | baseline 91.66/100/100/100 − 1pp (A4 critical) |
| `lib/calculations/` | 97 | 89 | 100 | 98 | baseline 98.08/90.22/100/99.31 − 1pp |
| `lib/payments/` | 93 | 87 | 100 | 95 | baseline 94.23/88.23/100/96.07 − 1pp |
| `lib/financial/` | — (NOTE) | — | — | — | CLAUDE.md TODO 가시성, 별 사이클 부여 예정 |

1pp buffer 의미: 측정 노이즈 (prettier reformat 등) 흡수, **>1pp 하락 회귀만 차단**.

---

## 6. 학습 (Lessons Learned)

### 6.1 Aspirational target vs Regression gate (advisor A1)

`baseline + N%` (aspirational target) 와 `baseline − N pp` (regression gate) 는 완전히 다른 의미. coverage threshold 는 후자의 역할이어야 함:
- aspirational target: 목표 달성을 위한 동기 부여 (외부 보고용)
- regression gate: 회귀 감지·차단 (CI 기능 보호용)

Plan R1 의 초기 wording (`baseline+5%`) 는 advisor 지적 후 `floor(current) − 1pp` 로 정정. 작은 wording 차이지만 의미 차이가 크고, 임계값 fail 의 의미를 결정함.

### 6.2 Fail-injection 으로 gate 동작 증명 (advisor A5)

config 변경 후 "정상 빌드 exit 0" 만으로는 gate 가 실제 동작하는지 알 수 없음. T6 의 fail-injection (threshold 임시 인상 → exit 1 + 정확한 fail msg → revert) 으로 gate 메커니즘 자체를 검증.

이 패턴은 다른 config-only PDCA (eslint rule, tsconfig strict 등) 에도 적용 가능 — 별 메모리 저장 후보.

### 6.3 Silently drop 금지 (advisor A2)

financial 모듈을 단순히 `collectCoverageFrom` 에서 빼면 CLAUDE.md "금융 90%+" contract 가 silently 사라짐. **Keep + threshold 미설정 + NOTE 주석** 패턴으로 매 측정마다 0% 가 surface 되어 별 사이클 진입 신호 역할.

### 6.4 짧은 사이클이지만 advisor 호출 가치

설정 변경 ~32 라인 + 본질 코드 0 인 매우 짧은 사이클이지만, advisor 6 지적이 의사결정 품질을 크게 향상시킴 (R1 wording / A4 file-level / A5 검증 등). 짧다고 advisor skip 하지 말 것.

### 6.5 Worktree node_modules 부재 함정

worktree 첫 진입 시 `node_modules` 가 없어 `sh: jest: command not found`. `npm install` 후 정상 동작. 짧은 사이클이지만 worktree-주의 가치 +1.

---

## 7. 별 사이클 후보 (Carry-forward)

| # | 후보 | 우선순위 | 근거 |
|---|---|---|---|
| F1 | `familyoffice-financial-test-coverage` | MEDIUM | CLAUDE.md 90%+, 본 사이클 NOTE 가 매 측정마다 가시성 |
| F2 | `familyoffice-api-test-coverage` | MEDIUM | app/api/ 73 파일 0%, D4 cut |
| F3 | `familyoffice-security-test-coverage` | MEDIUM | lib/security/ 나머지 11 파일, D2 cut |
| F4 | `familyoffice-coverage-ratchet` | LOW | Option D 자동 상향, D1 보류 |
| **F5** | **`familyoffice-ci-debt-cleanup`** | **HIGH** | CSRF F3 + 본 G2 — Quick Validation 매 PR 차단 |
| F6 | `familyoffice-abuse-protection` | MEDIUM | CSRF D7 cut |

---

## 8. 후속 액션

- [ ] PR #17 머지 (admin override — Quick Validation pre-existing CI debt 직교)
- [ ] 4 PDCA 문서 → `docs/archive/2026-05/familyoffice-jest-coverage-threshold-cleanup/` (git mv)
- [ ] `_INDEX.md` 갱신 + `.bkit-memory.json` phase=archived
- [ ] **F5 `familyoffice-ci-debt-cleanup` 즉시 시작 권장** — PR 차단 해소 효과 큼

---

## 9. 메타

- **사이클 단축 결정 없음** — Plan/Design/Do/Check/Report 풀 PDCA 진행 (config 변경이지만 advisor 6 지적이 가치 검증)
- **PR 5일 분산 이유** — Plan/Design 2026-05-25 작성 후 사용자 결정 (5일 대기) → 2026-05-30 Do 진입 (이전 세션 종료, 본 세션 재개)
- **Parent cycle**: `familyoffice-csrf-hardening` (PR #16 머지 d609429) 의 F2 분리
