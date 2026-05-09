# FamilyOffice S — 중소중견기업 법인 대표 전용 자산관리 플랫폼

> **"百年永續"** — 단순한 자산 증식을 넘어, 백년영속 가문의 유산을 설계합니다.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/jlinsights/FamilyOffice)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 프로젝트 개요

FamilyOffice S는 비상장기업, 기술기업, 제조업 등 다양한 업종의 법인 대표를 위한 **프리미엄 자산관리 플랫폼**입니다.

- 정책자금 · 단체보험 · 경영인정기보험 · 중대재해처벌법 대응
- 가업승계 · 증여세 설계 · 세후 유동성 최적화
- **500억원+ 자산관리 실적** | **500+ 법인 고객사** | **20년+ 전문 경험**

---

## 🎨 디자인 시스템 (Modern Legacy)

> 자세한 내용: [`DESIGN.md`](./DESIGN.md)

### 브랜드 팔레트

| 역할 | 색상명 | Hex |
|---|---|---|
| Primary | Signature Navy | `#0A192F` |
| Accent | Heritage Gold | `#D4AF37` |
| Warm | Gold Shimmer | `#E5C158` |
| Deep | Bronze | `#B8860B` |
| Dark | Deep Charcoal | `#1E293B` |

### 타이포그래피

| 역할 | 폰트 |
|---|---|
| 헤드라인 (에디토리얼) | Playfair Display |
| 본문 / UI | Inter |
| 한국어 최적화 | `line-height: 1.75`, `word-break: keep-all` |

### 글로벌 유틸리티 클래스 (`globals.css`)

```css
.font-korean       /* 한국어 최적화 행간 */
.heading-editorial /* Playfair Display + Signature Navy */
.text-gold         /* Heritage Gold #D4AF37 */
.bg-navy-gradient  /* Signature Navy → Deep Slate */
.bg-gold-gradient  /* Heritage Gold shimmer */
.btn-brand-navy    /* 네이비 버튼 */
.btn-brand-gold    /* 골드 버튼 */
.card-gold-border  /* 골드 상단 보더 카드 */
.card-glass-premium/* 프리미엄 글라스모피즘 */
.divider-gold      /* 골드 그라디언트 구분선 */
.section-editorial /* py-24 / py-32 표준 섹션 여백 */
.financial-value   /* tabular-nums 금융 데이터 */
```

---

## 🚀 주요 기능

### 💼 자산관리 서비스
- **비상장기업 자산관리**: 매출 50억~300억 비상장기업 전용
- **가업승계 설계**: 세무최적화를 통한 효율적인 자산승계
- **재무설계**: 법인 대표 맞춤형 재무상담
- **투자자문**: 전문적인 투자 전략 수립

### 🛡️ 리스크 관리
- **법인 단체보험**: 기업 리스크 헷지
- **경영인정기보험**: CEO 정기보험 및 임원진 보험설계
- **중대재해처벌법 대응**: 중대재해 예방 및 리스크 관리 (D&O/임원배상, 변호사비)

### 📊 기술 스택

#### Frontend
- **Next.js 16.1.6** — React 기반 풀스택 프레임워크 (App Router + Turbopack)
- **React 18.3.1** — 사용자 인터페이스 라이브러리
- **TypeScript 5.8.3** — 타입 안전성 보장
- **Tailwind CSS** — 유틸리티 퍼스트 CSS + 커스텀 브랜드 토큰
- **shadcn/ui** — 컴포넌트 라이브러리
- **Framer Motion** — 애니메이션 라이브러리

#### Backend & Database
- **Supabase** — PostgreSQL 기반 백엔드 서비스
- **Clerk** — 인증 및 사용자 관리 (MFA 지원)
- **Upstash Redis** — 서버리스 분산 캐싱

#### 한국 시장 통합
- **Cal.com** — 스케줄링 및 상담 예약
- **HubSpot** — CRM 및 마케팅 자동화
- **Beehiiv** — 뉴스레터 플랫폼 (매주 월/금 7:30 발송)
- **Channel Talk** — 고객 지원 채팅
- **Resend** — 이메일 발송 (`email.familyoffices.vip`)

#### DevOps & Monitoring
- **Vercel** — 배포 플랫폼 (Edge Network)
- **Sentry** — 에러 추적 및 모니터링
- **Playwright** — E2E 테스팅 (134 tests, 8 browser/device configs)
- **Jest** — 단위 테스팅 (90%+ 금융 모듈 커버리지)

---

## 🛠️ 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/jlinsights/FamilyOffice.git
cd FamilyOffice

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 편집

# 개발 서버 실행 (HMR)
npm run dev
```

### ⚠️ 주의사항

```bash
# 개발 중 NEVER 실행 — HMR 깨짐
npm run build  # ❌

# 항상 이것 사용
npm run dev    # ✅
```

### 환경 변수 (핵심)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Admin
ADMIN_EMAILS=admin@example.com
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com

# Email
RESEND_API_KEY=
NEXT_PUBLIC_RESEND_FROM_EMAIL=noreply@email.familyoffices.vip

# Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Toss Payments (상담 결제)
NEXT_PUBLIC_TOSS_CLIENT_KEY=
TOSS_SECRET_KEY=
TOSS_WEBHOOK_SECRET=
```

전체 목록은 `.env.example` 참조.

> Toss Payments 운영 키는 사이트 라이브 후 [Toss 가맹점 가입](https://www.tosspayments.com/) 심사 통과 시 발급됩니다. 개발은 `.env.example`의 공개 테스트 키 그대로 사용 가능합니다.

---

## 📁 프로젝트 구조

```
FamilyOffice/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (금융, 인증, 뉴스레터 등)
│   ├── admin/             # Admin Dashboard (보호된 라우트)
│   ├── blog/              # 블로그 시스템
│   ├── portal/            # 사용자 포털 (인증 필요)
│   ├── layout.tsx         # Root Layout + Providers
│   └── globals.css        # 글로벌 스타일 + 브랜드 유틸리티
├── components/
│   ├── sections/          # 홈페이지 섹션 (Hero, Services, 등)
│   ├── calendar/          # Cal.com 예약 위젯 (5종)
│   ├── seminar/           # 세미나 섹션
│   ├── forms/             # 폼 컴포넌트
│   └── ui/                # shadcn/ui 컴포넌트
├── constants/
│   ├── brand.ts           # 브랜드 컬러 + 타이포그래피 시스템
│   └── bento-services.ts  # 서비스 카드 데이터
├── lib/                   # 유틸리티 (Supabase, Redis, Email 등)
├── tailwind.config.ts     # 브랜드 토큰 (brand.navy, brand.gold 등)
├── DESIGN.md              # 디자인 시스템 소스 오브 트루스
├── AGENTS.md              # AI 에이전트 개발 가이드
├── CLAUDE.md              # Claude Code 가이드
└── README.md              # 이 파일
```

---

## 🧪 테스팅

```bash
# 에이전트 품질 체크 (lint + typecheck)
npm run agent:check

# E2E 테스트 (Playwright)
npm run test:e2e
npm run test:e2e:ui       # UI 모드
npm run test:e2e:debug    # 디버그 모드

# 단위 테스트 (Jest)
npm run test:unit
npm run test:coverage

# 특정 파일만
npx playwright test tests/e2e/financial.spec.ts
npx jest tests/unit/financial-calculations.test.ts
```

### Playwright 프로젝트 (8 configs)
- `chromium` / `firefox` / `webkit` — 데스크톱 크로스브라우저
- `mobile-chrome` / `mobile-safari` — 모바일
- `financial-desktop` / `financial-mobile` — 금융 플랫폼 특화
- Korean content 테스트 포함

---

## 📊 성능 (2026년 5월 기준)

| 항목 | 수치 |
|---|---|
| 빌드 시간 | ~37초 |
| 정적 페이지 | 139개 생성 |
| TypeScript 체크 | ~42초 |
| E2E 테스트 | 134개 |
| LCP 목표 | < 2.5초 |
| API 응답 | < 500ms (p95) |

---

## 🔒 보안

- **인증**: Clerk 멀티팩터 인증 (MFA)
- **권한**: RBAC + 환경변수 기반 관리자 설정
- **Rate Limiting**: API 요청 제한 (middleware)
- **암호화**: AES-256
- **보안 헤더**: CSP, CORS (`next.config.mjs`)
- **Webhook 검증**: Clerk 서명 검증

---

## 🚀 배포

- **플랫폼**: Vercel (자동 배포)
- **빌드**: `npm run vercel-build`
- **도메인**: `familyoffices.vip`
- **환경**: Vercel 대시보드에서 환경변수 관리
- **모니터링**: Sentry 에러 추적

```bash
# PR 브랜치 → Vercel Preview 자동 배포
# main 병합 → Vercel Production 자동 배포
```

---

## 📞 지원

| 채널 | 연락처 |
|---|---|
| 이메일 | contact@familyoffices.vip |
| 뉴스레터 | newsletter.familyoffices.vip |
| 이슈 | GitHub Issues |
| 문서 | `/docs` 디렉토리 |

---

## 📄 라이선스

MIT License — 자세한 내용은 [LICENSE](LICENSE) 파일 참조.

---

**FamilyOffice S** — 성공한 기업가를 위한 프리미엄 자산관리 파트너

*"단순한 자산 증식을 넘어, 백년영속 가문의 유산을 설계합니다."*

© 2025 FamilyOffice. All rights reserved.
