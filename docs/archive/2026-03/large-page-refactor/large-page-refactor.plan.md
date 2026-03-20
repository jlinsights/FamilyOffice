# Plan: large-page-refactor

> FamilyOffice 대형 페이지 컴포넌트 분리 리팩토링

## 개요

| 항목 | 내용 |
|------|------|
| Feature | large-page-refactor |
| 작성일 | 2026-03-20 |
| 우선순위 | MEDIUM |
| 예상 범위 | 2개 페이지 → 약 14개 컴포넌트 추출 |
| 트리거 | 코드 분석 (코드 품질 70/100) |

## 배경 및 동기

코드 분석에서 권장 300줄을 크게 초과하는 2개 대형 페이지 파일 발견.
단일 파일에 데이터 정의 + 로직 + JSX가 혼합되어 유지보수성 저하.

| 파일 | 줄 수 | 권장치 대비 |
|------|------:|:-----------:|
| `app/recruit/page.tsx` | 1,473 | **4.9배** |
| `app/serious-accident-law/page.tsx` | 1,048 | **3.5배** |

## 목표

- [ ] 각 페이지를 300줄 이하로 축소
- [ ] 섹션별 컴포넌트 분리 (재사용 가능)
- [ ] 데이터를 `constants/` 파일로 추출
- [ ] 기존 렌더링 결과 동일 (시각적 변경 없음)

## 범위 (Scope)

### recruit/page.tsx (1,473줄) → 섹션 분리

| 섹션 | 라인 범위 | 추출 대상 |
|------|-----------|-----------|
| 데이터 (positions, FAQ 등) | 38-181 | `constants/recruit.ts` |
| Hero Section | 303-441 | `components/recruit/RecruitHeroSection.tsx` |
| GFC 소개 & 혜택 | 442-696 | `components/recruit/GFCBenefitsSection.tsx` |
| 채용 조건 | 697-743 | `components/recruit/RequirementsSection.tsx` |
| 채용 프로세스 | 744-916 | `components/recruit/ProcessSection.tsx` |
| 채용 포지션 & 캘린더 | 917-1119 | `components/recruit/PositionsSection.tsx` |
| FAQ | 1120-1194 | `components/recruit/RecruitFAQSection.tsx` |
| CTA & Contact | 1195-1263 | `components/recruit/RecruitCTASection.tsx` |
| 구조화 데이터 | 1264-1473 | 페이지 내 유지 (JSON-LD) |

### serious-accident-law/page.tsx (1,048줄) → 섹션 분리

| 섹션 | 라인 범위 | 추출 대상 |
|------|-----------|-----------|
| 데이터 (riskFactors 등) | 50-218 | `constants/serious-accident-law.ts` |
| Hero Section | 219-349 | `components/serious-accident-law/HeroSection.tsx` |
| 법률 개요 | 350-487 | `components/serious-accident-law/OverviewSection.tsx` |
| 위험도 분석 | 488-556 | `components/serious-accident-law/RiskAnalysisSection.tsx` |
| 대응 전략 | 557-628 | `components/serious-accident-law/ResponseSection.tsx` |
| 보험 비교 | 629-743 | `components/serious-accident-law/InsuranceSection.tsx` |
| FAQ | 744-827 | `components/serious-accident-law/FAQSection.tsx` |
| CTA | 828-892 | `components/serious-accident-law/CTASection.tsx` |

### Out of Scope

- 다른 페이지 리팩토링
- 스타일 변경
- 기능 추가/제거
- 데이터 변경

## 성공 기준

| 기준 | 측정 방법 |
|------|-----------|
| page.tsx 300줄 이하 | `wc -l` 확인 |
| lint + typecheck 통과 | `npm run agent:check` 에러 0건 |
| 빌드 성공 | `npm run build` 에러 0건 |
| 시각적 변경 없음 | 수동 확인 |

## 리스크

| 리스크 | 영향 | 대응 |
|--------|------|------|
| props 전달 복잡도 증가 | 코드 이해 저하 | 데이터를 constants로 추출, props 최소화 |
| 클라이언트 컴포넌트 번들 증가 | 번들 사이즈 | 모든 추출 컴포넌트 동일 'use client' 유지 |
| 애니메이션 상태 공유 | startAnimation 등 | 페이지에서 prop으로 전달 |

## 구현 순서

1. **constants 파일 추출** (데이터 분리)
2. **recruit 섹션 컴포넌트 분리** (큰 파일 먼저)
3. **serious-accident-law 섹션 컴포넌트 분리**
4. **lint + typecheck + build 검증**

## 다음 단계

→ `/pdca design large-page-refactor` 로 상세 설계
