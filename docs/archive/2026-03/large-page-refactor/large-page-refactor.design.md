# Design: large-page-refactor

> 대형 페이지 컴포넌트 분리 — 상세 설계

## 개요

| 항목 | 내용 |
|------|------|
| Feature | large-page-refactor |
| Plan 참조 | `docs/01-plan/features/large-page-refactor.plan.md` |
| 작성일 | 2026-03-20 |
| 신규 파일 | 16개 (컴포넌트 14 + constants 2) |
| 수정 파일 | 2개 (page.tsx 축소) |

---

## 1. recruit/page.tsx (1,473줄 → ~120줄)

### 1-1. 데이터 추출: `constants/recruit.ts`

추출 대상:
- `recruitFaqCategories` (라인 38-167) — FAQ 카테고리 배열
- `positions` (라인 199-291) — 채용 포지션 배열
- `getIcon` 헬퍼 함수 (라인 168-181)

```typescript
// constants/recruit.ts
export const recruitFaqCategories = [...];
export const positions = [...];
export const getIcon = (iconName: string): React.ElementType => {...};
```

### 1-2. 섹션 컴포넌트 (7개)

모든 컴포넌트는 `'use client'`가 **불필요** — 부모 페이지가 `'use client'`이므로 자동 클라이언트 컴포넌트. 단, import 명확성을 위해 필요 시 추가.

| 컴포넌트 | 원본 라인 | Props | 예상 줄 수 |
|----------|-----------|-------|-----------|
| `RecruitHeroSection` | 303-441 | `startAnimation`, `easingFunction` | ~140 |
| `GFCBenefitsSection` | 442-696 | `startAnimation`, `easingFunction` | ~255 |
| `RequirementsSection` | 697-743 | (없음) | ~50 |
| `ProcessSection` | 744-916 | (없음) | ~175 |
| `PositionsSection` | 917-1119 | `positions` | ~205 |
| `RecruitFAQSection` | 1120-1194 | `faqCategories` | ~80 |
| `RecruitCTASection` | 1195-1263 | (없음) | ~70 |

### 1-3. 결과 page.tsx 구조

```typescript
'use client';

import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { RecruitHeroSection } from '@/components/recruit/RecruitHeroSection';
import { GFCBenefitsSection } from '@/components/recruit/GFCBenefitsSection';
import { RequirementsSection } from '@/components/recruit/RequirementsSection';
import { ProcessSection } from '@/components/recruit/ProcessSection';
import { PositionsSection } from '@/components/recruit/PositionsSection';
import { RecruitFAQSection } from '@/components/recruit/RecruitFAQSection';
import { RecruitCTASection } from '@/components/recruit/RecruitCTASection';
import { positions, recruitFaqCategories } from '@/constants/recruit';

export default function RecruitPage() {
  const [startAnimation, setStartAnimation] = useState(false);
  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RecruitHeroSection startAnimation={startAnimation} easingFunction={easingFunction} />
        <GFCBenefitsSection startAnimation={startAnimation} easingFunction={easingFunction} />
        <RequirementsSection />
        <ProcessSection />
        <PositionsSection positions={positions} />
        <RecruitFAQSection faqCategories={recruitFaqCategories} />
        <RecruitCTASection />
      </main>
      <Footer />
      {/* JSON-LD 구조화 데이터 유지 (인라인) */}
      <Script ... />
    </div>
  );
}
```

---

## 2. serious-accident-law/page.tsx (1,048줄 → ~120줄)

### 2-1. 데이터 추출: `constants/serious-accident-law.ts`

추출 대상:
- `riskFactors` (라인 51-80)
- `responseSteps` (라인 83-130)
- `insuranceProducts` (라인 131-180)
- `faqCategories` (라인 181-218)
- 기타 인라인 데이터 배열

### 2-2. 섹션 컴포넌트 (7개)

| 컴포넌트 | 원본 라인 | Props | 예상 줄 수 |
|----------|-----------|-------|-----------|
| `SALHeroSection` | 219-349 | `startAnimation`, `easingFunction` | ~130 |
| `OverviewSection` | 350-487 | (없음) | ~140 |
| `RiskAnalysisSection` | 488-556 | `riskFactors` | ~70 |
| `ResponseSection` | 557-628 | `responseSteps` | ~75 |
| `InsuranceSection` | 629-743 | `insuranceProducts` | ~115 |
| `SALFAQSection` | 744-827 | `faqCategories` | ~85 |
| `SALCTASection` | 828-892 | (없음) | ~65 |

### 2-3. 결과 page.tsx 구조

```typescript
'use client';

import { useCallback, useEffect, useState } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/seo/structured-data';
import { SALHeroSection } from '@/components/serious-accident-law/SALHeroSection';
import { OverviewSection } from '@/components/serious-accident-law/OverviewSection';
// ... 나머지 import
import { riskFactors, responseSteps, insuranceProducts, faqCategories } from '@/constants/serious-accident-law';

export default function SeriousAccidentLawPage() {
  const [startAnimation, setStartAnimation] = useState(false);
  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SALHeroSection startAnimation={startAnimation} easingFunction={easingFunction} />
        <OverviewSection />
        <RiskAnalysisSection riskFactors={riskFactors} />
        <ResponseSection responseSteps={responseSteps} />
        <InsuranceSection insuranceProducts={insuranceProducts} />
        <SALFAQSection faqCategories={faqCategories} />
        <SALCTASection />
      </main>
      <Footer />
      <StructuredData data={...} />
    </div>
  );
}
```

---

## 3. 파일 구조

```
components/
├── recruit/
│   ├── RecruitHeroSection.tsx
│   ├── GFCBenefitsSection.tsx
│   ├── RequirementsSection.tsx
│   ├── ProcessSection.tsx
│   ├── PositionsSection.tsx
│   ├── RecruitFAQSection.tsx
│   └── RecruitCTASection.tsx
└── serious-accident-law/
    ├── SALHeroSection.tsx
    ├── OverviewSection.tsx
    ├── RiskAnalysisSection.tsx
    ├── ResponseSection.tsx
    ├── InsuranceSection.tsx
    ├── SALFAQSection.tsx
    └── SALCTASection.tsx

constants/
├── recruit.ts
└── serious-accident-law.ts
```

---

## 4. Props 인터페이스 설계

### 공통 패턴

```typescript
// 애니메이션 props (Hero, Benefits 등에서 사용)
interface AnimationProps {
  startAnimation: boolean;
  easingFunction: (t: number) => number;
}
```

### 데이터 props

```typescript
// 각 컴포넌트에서 필요한 데이터만 props로 전달
// 타입은 constants 파일에서 export
```

---

## 5. 구현 순서

```
Step 1: constants/recruit.ts 생성 (데이터 추출)
Step 2: components/recruit/*.tsx 7개 생성 (섹션 추출)
Step 3: app/recruit/page.tsx 축소 (import + 조합)
Step 4: npm run lint && npm run typecheck (중간 검증)
Step 5: constants/serious-accident-law.ts 생성
Step 6: components/serious-accident-law/*.tsx 7개 생성
Step 7: app/serious-accident-law/page.tsx 축소
Step 8: npm run lint && npm run typecheck && npm run build (최종 검증)
```

---

## 6. 검증 기준

| 기준 | 측정 방법 |
|------|-----------|
| recruit/page.tsx < 300줄 | `wc -l` |
| serious-accident-law/page.tsx < 300줄 | `wc -l` |
| `npm run lint` | 에러 0건 |
| `npm run typecheck` | 에러 0건 |
| `npm run build` | 성공 |
| 신규 파일 16개 생성 | `ls` 확인 |

---

## 다음 단계

→ `/pdca do large-page-refactor` 로 구현 시작
