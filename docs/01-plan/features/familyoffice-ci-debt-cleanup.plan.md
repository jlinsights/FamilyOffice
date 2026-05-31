# FamilyOffice CI Debt Cleanup — PDCA Plan

**Status:** Plan (Phase 1)
**Created:** 2026-05-31
**Branch:** `chore/ci-debt-cleanup`
**Origin:** [[project_familyoffice_csrf_hardening]] F3 + [[project_familyoffice_jest_coverage_threshold_cleanup]] G2
**Priority:** HIGH P0 (Quick Validation pre-existing fail 매 PR 차단)

---

## 1. Summary

FamilyOffice main 브랜치의 CI/CD Pipeline 다수 workflow 가 **pre-existing 부채** 로 매 PR 에서 false-fail. 본 사이클은 두 핵심 부채를 해소한다:

1. **npm audit 79건** (critical 5 / high 15 / moderate 58 / low 1) — 모두 `fixAvailable`, 3개만 breaking semver major
2. **CodeQL Action v2 → v3 migration** — `.github/workflows/ci.yml` + `.github/workflows/enhanced-ci.yml` 2 파일의 `codeql-action/upload-sarif@v2` 사용 중 (deprecated)

해소 시 **Quick Validation gate 회복 + 모든 PR 의 실 회귀 vs noise 구분 가능**.

---

## 2. 진단 (2026-05-31 실측, 메모리 stale 갱신)

### 2.1 npm audit 분포

| Severity | Count | Examples |
|---|---:|---|
| Critical | 5 | `@clerk/nextjs`, `@clerk/shared`, `fast-xml-parser`, `handlebars`, `protobufjs` |
| High | 15 | `@babel/plugin-transform-modules-systemjs`, `@clerk/backend`, `@clerk/clerk-react`, `axios`, `lodash`, `minimatch`, `next`, `undici`, `socket.io-parser`, `svgo`, `rollup`, `picomatch`, `flatted`, `js-cookie`, `@isaacs/brace-expansion` |
| Moderate | 58 | `@aws-sdk/*` (다수, via `@aws-sdk/core`), `uuid`, etc. |
| Low | 1 | — |
| **Total** | **79** | — |

`fixAvailable` 분포:
- 79건 전부 fix 가능
- 그 중 **3건이 breaking semver major** (수동 점검 필요)
- 메모리 추정 (2026-05-25 fast-xml-parser + qs 2건) 대비 ~40배 광범위 — 메모리 stale 확정

### 2.2 CodeQL Action v2 사용처

| 파일 | 라인 | uses |
|---|---:|---|
| `.github/workflows/ci.yml` | L71 | `github/codeql-action/upload-sarif@v2` |
| `.github/workflows/enhanced-ci.yml` | L70 | `github/codeql-action/upload-sarif@v2` |

`codeql-action@v2` 는 2024년 deprecated, `v3` migration 필요 (Node 20 런타임 필수).

### 2.3 기타 발견 (Out-of-Scope 확정)

- 5 workflows 중복: `ci.yml`, `enhanced-ci.yml`, `comprehensive-testing.yml`, `blog-auto-publish.yml`, `blog-content-generation.yml`
  - workflow 통합·리팩토링은 별 사이클 (`familyoffice-ci-workflow-consolidation`)
- `aquasecurity/trivy-action@master` (브랜치 핀 미흡) — 별 사이클 (`familyoffice-actions-version-pinning`)
- `e2e-tests (firefox, desktop)` Playwright 환경 debt — 별 사이클 (`familyoffice-e2e-firefox-infra`)

---

## 3. 4 접근 옵션

| ID | 옵션 | npm audit | CodeQL | Risk | 권장 |
|---|---|---|---|---|---|
| **A** | **npm audit fix (non-breaking) + CodeQL v3** | 76건 자동 fix (breaking 3 제외) | ✓ | 낮음 | **✓ 1차** |
| B | npm audit fix --force + CodeQL v3 | 79건 전부 (3 breaking 포함) | ✓ | 중간 (Next/Clerk major bump 가능) | △ (별 사이클 필요할 수 있음) |
| C | 선별 수동 update + CodeQL v3 | package.json overrides 로 critical/high 만 | ✓ | 중간 (수동 의사결정 다수) | △ (시간 소모) |
| D | npm audit step 을 warning 으로 변환 + CodeQL v3 | 0건 fix, 노이즈만 제거 | ✓ | 낮음 (가드 무력화) | ✗ (advisor [[feedback_aspirational_vs_regression_gate_2026_05_30]] anti-pattern) |

### 3.1 Option A 권장 근거
- 76건의 non-breaking fix 는 transitive dependency 가 대부분 (@aws-sdk/core, axios, lodash subset)
- 3건 breaking 중 무엇이 Next/Clerk major bump 인지 D-단계에서 확인 → 별 사이클 cut
- jest-coverage 사이클의 Option B 패턴 (실 가치 양호 + scope 좁힘) 과 동일

---

## 4. 작업 분해 (T1 ~ T8)

| # | 작업 | 의존성 | 라인 |
|---|---|---|---|
| T1 | `npm audit --json` 로 78건 baseline 측정 + breaking semver 3건 식별 | — | 0 (측정만) |
| T2 | `npm audit fix` (non-breaking) 실행 → 76건 fix | T1 | package-lock.json 변경 |
| T3 | `package.json` overrides 추가 검토 (필요 시) | T2 | 0~10 라인 |
| T4 | `.github/workflows/ci.yml` codeql-action v2→v3 | — | 1 라인 |
| T5 | `.github/workflows/enhanced-ci.yml` codeql-action v2→v3 | — | 1 라인 |
| T6 | `npm run agent:check` (lint + typecheck) PASS | T2 | 0 |
| T7 | `npm run test:unit` 523/523 PASS + threshold 통과 | T2 | 0 |
| T8 | `npm audit` 재실행 → critical 0 + high 의도된 잔존만 확인 | T2 | 0 |

**총 변경량 예상**: package-lock.json 광범위 + jest/typescript 외 코드 변경 0 + 2 workflow 파일 1줄씩.

---

## 5. 검증 시나리오

| 시나리오 | 명령 | 예상 |
|---|---|---|
| audit critical/high 해소 | `npm audit --audit-level=high` | critical 0 + high 의도된 잔존만 |
| 단위 테스트 회귀 0 | `npm run test:unit` | 523/523 PASS, jest-coverage 사이클 threshold 통과 |
| 코드 품질 | `npm run agent:check` | lint 0 + typecheck 0 |
| CodeQL workflow run | PR push 후 `Security Analysis` job | success (v3 migration 효과) |
| Quick Validation | PR push 후 `Quick Validation` job | success (pre-existing fail 해소) |

---

## 6. 위험 / Risk

| # | 위험 | 완화 |
|---|---|---|
| R1 | `@clerk/nextjs` critical fix 가 Clerk SDK major bump → CSRF middleware 회귀 가능 | T2 후 jest 회귀 + Clerk auth route 수동 smoke (`/admin`, `/structure-check`) |
| R2 | `next` high fix 가 Next 16.x → 17.x major bump → App Router 회귀 | breaking semver 3건 점검 시 next 확인, 포함 시 별 사이클 (`familyoffice-next-17-upgrade`) cut |
| R3 | `package-lock.json` 광범위 변경으로 lockfile conflict 빈번 | 짧은 사이클 (1일 내) 종료 + main 머지 직후 다른 PR rebase 가이드 |
| R4 | CodeQL v3 가 더 strict 한 검사 → 신규 finding 다수 | 본 사이클은 v3 migration 만, finding 정리는 별 사이클 (`familyoffice-codeql-v3-findings`) |
| R5 | `aquasecurity/trivy-action@master` 가 갑작스러운 breaking 변경 | 별 사이클 (`familyoffice-actions-version-pinning`) 에서 commit SHA pin |
| R6 | 메모리 stale 가 사이클 진입 결정에 영향 (2 → 79 격차) | 본 Plan §2 진단으로 정정, 향후 npm audit 재측정 권장 (월 1회) |

---

## 7. Open Questions (Design Phase 확정)

| Q | 내용 | Plan 예상 답 |
|---|---|---|
| Q1 | 옵션 A/B/C/D 중 무엇? | A (non-breaking + CodeQL v3) |
| Q2 | breaking semver 3건 중 Next/Clerk 포함 여부 + 별 사이클 cut 결정 | Design 시 점검, 포함 시 cut |
| Q3 | `npm audit` step 의 exit code 정책 (fail vs warn vs `--audit-level=high`) | `--audit-level=high` (moderate 58건은 별 사이클까지 mute) |
| Q4 | `package.json` overrides 사용 여부 | Design 시 결정 (76건 fix 후 잔존 의도된 high 만 override 가능) |
| Q5 | CodeQL v3 migration 시 동반 변경 (permissions block 등) | GitHub 공식 v3 migration 가이드 참조 (v2→v3 는 actions runner Node 20 필요, 이미 충족) |

---

## 8. Out of Scope (분리 사이클 후보)

| 후보 | 우선순위 | 근거 |
|---|---|---|
| `familyoffice-ci-workflow-consolidation` | MEDIUM | 5 workflow 중복 — ci.yml/enhanced-ci.yml/comprehensive-testing.yml |
| `familyoffice-actions-version-pinning` | MEDIUM | `trivy-action@master` 등 브랜치 핀 commit SHA pin 으로 전환 |
| `familyoffice-e2e-firefox-infra` | LOW | Playwright firefox 환경 debt |
| `familyoffice-next-17-upgrade` | Q2 결정 시 | breaking semver 3건 에 Next 포함 시 |
| `familyoffice-codeql-v3-findings` | LOW | v3 migration 후 신규 finding 정리 |

---

## 9. Success Criteria

- [ ] `npm audit` critical 0 (5건 모두 fix)
- [ ] `npm audit` high 0 또는 의도된 잔존만 (breaking semver cut 분 ≤3건)
- [ ] `npm audit --audit-level=high` exit 0
- [ ] `npm run test:unit` 523/523 PASS, jest-coverage threshold 통과
- [ ] `npm run agent:check` PASS
- [ ] PR push 후 `Quick Validation` job success (현재 pre-existing fail → green)
- [ ] PR push 후 `Security Analysis` job success (CodeQL v3 migration)

---

## 10. Next

→ `/pdca design familyoffice-ci-debt-cleanup` (Q1~Q5 확정 + breaking semver 3건 식별 + audit fix 적용 diff 계획)
