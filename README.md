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

### 💳 결제 & 큐레이션 SHOP
- **구조 점검 상담 결제** (`/structure-check`): Toss 결제위젯 v2 + Clerk 인증, 1회 330,000원 (VAT 포함)
- **SHOP** (`/shop`): 1-of-1 큐레이션 — 서예 · 사진 · 그림 · 럭셔리 (상품당 단일 결제 enforcement)
- **결제 보안 baseline**: HMAC 웹훅 서명 검증 · UUID v5 customerKey · `payment_secret` cross-check · Clerk 본인 confirm

### 🤖 family-office Claude Code 플러그인 (`.claude-plugin/`)
- 콘텐츠 · 리드 · 상담 · SEO 4종 스킬 + 슬래시 커맨드 + 에이전트 정의
- MCP 커넥터 자동 로드 (`.mcp.json`)

### 📊 기술 스택

#### Frontend
- **Next.js 16.1.6** — React 기반 풀스택 프레임워크 (App Router + Turbopack)
- **React 18.3.1** — 사용자 인터페이스 라이브러리
- **TypeScript 5.8.3** — 타입 안전성 보장
- **Tailwind CSS** — 유틸리티 퍼스트 CSS + 커스텀 브랜드 토큰
- **shadcn/ui** — 컴포넌트 라이브러리
- **Framer Motion** — 애니메이션 라이브러리
- **react-daum-postcode** — 한국 우편번호 검색 (배송 주소 입력)

#### Backend & Database
- **Supabase** — PostgreSQL 기반 백엔드 서비스 + Storage (`shop-product-images` bucket)
- **Clerk** — 인증 및 사용자 관리 (MFA 지원)
- **Upstash Redis** — 서버리스 분산 캐싱

#### 한국 시장 통합
- **Cal.com** — 스케줄링 및 상담 예약
- **HubSpot** — CRM 및 마케팅 자동화
- **Beehiiv** — 뉴스레터 플랫폼 (매주 월/금 7:30 발송)
- **Channel Talk** — 고객 지원 채팅
- **Resend** — 이메일 발송 (`email.familyoffices.vip`)
- **Toss Payments** — 결제위젯 v2 (`@tosspayments/tosspayments-sdk ^2.7`) — 상담 + Shop 결제 양쪽 적용

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

# Toss Payments — 결제위젯 v2 (상담 + Shop)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_gck_...   # 브라우저 위젯 (test_gck_/live_gck_ 또는 v1 test_ck_/live_ck_)
TOSS_SECRET_KEY=test_gsk_...               # 서버 승인·조회 (test_gsk_/live_gsk_ 또는 v1 test_sk_/live_sk_)
TOSS_WEBHOOK_SECRET=                       # HMAC 서명 검증 (운영 필수)
```

전체 목록은 `.env.example` 참조. 운영·웹훅·마이그레이션 체크는 [`docs/payments/toss-payments-checklist.md`](docs/payments/toss-payments-checklist.md) 참고.

> Toss Payments 운영 키는 사이트 라이브 후 [Toss 가맹점 가입](https://www.tosspayments.com/) 심사 통과 시 발급됩니다. 개발은 `.env.example`의 공개 테스트 키 그대로 사용 가능합니다. **결제위젯 v2 SDK 기준 `test_gck_*` / `test_gsk_*` 접두사**가 표준이며, `lib/env.ts` Zod 검증은 v1 (`test_ck_*` / `test_sk_*`) 형식도 호환 허용합니다.

---

## 📁 프로젝트 구조

```
FamilyOffice/
├── app/                                  # Next.js App Router
│   ├── api/
│   │   ├── financial/                    # 금융 데이터 API
│   │   ├── payments/
│   │   │   ├── structure-check/          # 상담 결제 (request/confirm)
│   │   │   ├── shop/                     # Shop 결제 (create-order/confirm)
│   │   │   └── webhook/                  # Toss 웹훅 (orderId 접두사 분기)
│   │   ├── webhooks/clerk/               # Clerk→Supabase 동기화
│   │   └── admin/
│   ├── admin/                            # Admin Dashboard
│   ├── blog/                             # 블로그
│   ├── portal/                           # 사용자 포털
│   ├── shop/                             # Shop MVP (1-of-1 큐레이션)
│   ├── structure-check/                  # 상담 신청 + 결제 success/fail
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   ├── calendar/
│   ├── payment/                          # Toss 결제위젯 컴포넌트
│   ├── shop/                             # Shop UI 컴포넌트
│   ├── forms/                            # 폼 컴포넌트 (structure-check 등)
│   ├── seminar/
│   ├── logo.tsx                          # FamilyOfficeS 로고
│   └── ui/                               # shadcn/ui
├── constants/
│   ├── brand.ts
│   └── bento-services.ts
├── lib/
│   ├── payments/                         # Toss 헬퍼 (UUID v5, HMAC, lookup URL, secret 대조)
│   ├── shop/                             # Shop 라이브러리 (constants/order-id/schemas/products/orders)
│   ├── supabase/
│   ├── email/
│   └── env.ts                            # Zod 환경변수 검증 (Toss v2 gck/gsk + v1 ck/sk 둘 다 허용)
├── supabase/migrations/                  # PostgreSQL 마이그레이션 (shop_products / shop_orders / payment_secret 등)
├── tests/
│   ├── e2e/                              # Playwright (134 tests)
│   ├── unit/                             # Jest (toss-* 단위 테스트 포함)
│   └── mocks/                            # ESM 모킹 (uncrypto, nanoid v5)
├── docs/
│   ├── payments/toss-payments-checklist.md
│   └── superpowers/{specs,plans}/        # PDCA / superpowers 문서
├── .claude-plugin/                       # family-office Claude Code 플러그인
├── .mcp.json                             # MCP 커넥터 (자동 로드)
├── tailwind.config.ts
├── DESIGN.md                             # 디자인 시스템 소스 오브 트루스
├── AGENTS.md                             # AI 에이전트 개발 가이드
├── CLAUDE.md                             # Claude Code 가이드
└── README.md                             # 이 파일
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
- **권한**: RBAC + 환경변수 기반 관리자 설정 (`getAdminEmails()`, 하드코딩 금지)
- **Rate Limiting**: API 요청 제한 (middleware)
- **암호화**: AES-256
- **보안 헤더**: CSP, CORS (`next.config.mjs`)
- **Webhook 검증**:
  - Clerk Svix 서명 검증
  - Toss `tosspayments-webhook-signature` HMAC 검증 (`TOSS_WEBHOOK_SECRET`)
  - Toss `data.secret` ↔ DB `payment_secret` cross-check
- **결제 보안**:
  - `customerKey` Clerk ID → UUID v5 변환 (Toss 규격 준수)
  - confirm 호출 시 Clerk 본인 검증 + DB amount 재검증 + Toss `totalAmount` 검증
  - Shop 1-of-1 invariant — `shop_orders.product_id` partial UNIQUE on `payment_status in ('pending','paid')`

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
