# CLAUDE.md

이 파일은 Claude Code (`claude.ai/code`) 및 AI 에이전트가 이 저장소에서 작업할 때 참고하는 종합 가이드입니다.
AI 에이전트 최적화 버전은 **[AGENTS.md](./AGENTS.md)** 를 참조하세요.

---

## ⚡ Quick Start

```bash
# 개발 서버 (HMR)
npm run dev

# 품질 체크 (커밋 전 필수)
npm run agent:check   # lint + typecheck

# 테스트
npm run test:e2e      # Playwright E2E
npm run test:unit     # Jest 단위 테스트
```

### 핵심 정보

| 항목 | 값 |
|---|---|
| Framework | Next.js 16.1.6 + React 18.3.1 + TypeScript 5.8.3 |
| Target | 한국 중소중견기업 CEO (45~65세) |
| Auth | Clerk + Supabase PostgreSQL sync |
| Testing | Playwright 134 tests (8 browser/device configs) |
| Domain | familyoffices.vip |
| Email | Resend (`email.familyoffices.vip`) |
| Admin | 환경변수 기반 (`ADMIN_EMAILS` / `NEXT_PUBLIC_ADMIN_EMAILS`) |

---

## ⚠️ 에이전트 필수 주의사항

```bash
# ❌ 개발 세션 중 절대 금지 — HMR 깨짐
npm run build

# ✅ 항상 이것 사용
npm run dev
npm run agent:check   # 코드 변경 후
```

---

## 🎨 디자인 시스템 (Modern Legacy)

> **소스 오브 트루스**: [`DESIGN.md`](./DESIGN.md)

### 브랜드 컬러 토큰

```typescript
// tailwind.config.ts — brand.* 클래스로 사용 가능
brand: {
  navy:   '#0A192F',  // Signature Navy (Primary)
  gold:   '#D4AF37',  // Heritage Gold (Accent CTA)
  bronze: '#B8860B',  // Bronze (강조 텍스트)
  shimmer:'#E5C158',  // Gold Shimmer (그라디언트 중간)
  slate:  '#1E293B',  // Deep Charcoal (다크 배경)
}
```

### 타이포그래피

| 역할 | 폰트 | Tailwind 클래스 |
|---|---|---|
| 에디토리얼 헤드라인 | Playfair Display | `font-playfair` |
| 본문 / UI | Inter | `font-inter` / `font-body` |
| 한국어 최적화 | — | `font-korean` |

### 글로벌 유틸리티 클래스 (`globals.css`)

```css
/* Typography */
.font-korean          /* line-height: 1.75, word-break: keep-all */
.heading-editorial    /* Playfair Display + Signature Navy */
.text-gold            /* Heritage Gold #D4AF37 */
.text-bronze          /* Bronze #B8860B */
.financial-value      /* tabular-nums Inter */

/* Backgrounds */
.bg-brand-navy        /* #0A192F */
.bg-navy-gradient     /* Navy → Deep Slate */
.bg-gold-gradient     /* Heritage Gold shimmer */

/* Buttons */
.btn-brand-navy       /* Signature Navy 배경 */
.btn-brand-gold       /* Heritage Gold 배경 */
.btn-outline-gold     /* 골드 아웃라인 */

/* Cards */
.card-gold-border     /* 골드 상단 2px 보더 카드 */
.card-glass-premium   /* backdrop-blur 글라스모피즘 */

/* Layout */
.section-editorial    /* py-24 / py-32 표준 섹션 여백 */
.divider-gold         /* 골드 그라디언트 hr */
```

---

## 🏗️ 개발 명령어

```bash
# 개발
npm run dev              # HMR 개발 서버 (localhost:3000)
npm run dev:mobile       # 모바일 테스트 (0.0.0.0:3000)
npm run dev:inspect      # Node.js 인스펙터 포함

# 품질 (커밋 전 필수)
npm run agent:check      # lint + typecheck (에이전트 최적화)
npm run lint             # ESLint
npm run typecheck        # TypeScript

# 테스트
npm run test:e2e         # Playwright 전체 (134 tests)
npm run test:e2e:ui      # UI 모드
npm run test:e2e:debug   # 디버그
npm run test:unit        # Jest 단위 테스트
npm run test:coverage    # 커버리지 리포트

# 단일 파일 테스트
npx playwright test tests/e2e/financial.spec.ts
npx playwright test --project=chromium tests/e2e/mobile.spec.ts
npx jest tests/unit/financial-calculations.test.ts
```

---

## 🔧 기술 스택

### Core
- **Next.js 16.1.6** — App Router + Turbopack
- **React 18.3.1** — Server Components 기본
- **TypeScript 5.8.3** — 엄격한 타입 체크 + Zod 검증
- **Tailwind CSS** — 브랜드 토큰 커스텀 설정
- **shadcn/ui** — 컴포넌트 라이브러리

### Auth & Data
- **Clerk** — 인증 (MFA 지원) + webhook 동기화
- **Supabase** — PostgreSQL 데이터 영속성
- **Upstash Redis** — 분산 캐싱 (메모리 → Redis → API 폴백)

### 한국 시장 통합
- **Cal.com** — 상담 예약 (`components/calendar/`)
- **Beehiiv** — 뉴스레터 (월/금 7:30 발송)
- **Resend** — 이메일 (`email.familyoffices.vip`)
- **HubSpot** — CRM + 마케팅 자동화
- **Channel Talk** — 고객 지원

---

## 📁 프로젝트 구조

```
app/
├── api/
│   ├── financial/     # 금융 데이터 API (주식, 환율, 세무)
│   ├── newsletter/    # 뉴스레터 구독 API
│   ├── webhooks/clerk/# Clerk→Supabase 동기화
│   └── admin/         # 어드민 API 라우트
├── admin/             # Admin Dashboard (인증 보호)
├── blog/              # 블로그 시스템
├── portal/            # 사용자 포털
├── layout.tsx         # Root Layout + Providers
└── globals.css        # Tailwind 기본 + 브랜드 유틸리티

components/
├── sections/          # 홈페이지 섹션 (hero, services, dual-pillar 등)
├── calendar/          # Cal.com 예약 위젯 (5종)
├── seminar/           # 세미나 섹션
├── bento/             # 벤토 그리드 서비스 카드
├── header.tsx         # 글로벌 헤더 (Signature Navy)
├── footer.tsx         # 글로벌 푸터 (Signature Navy + Gold)
└── ui/                # shadcn/ui 컴포넌트

constants/
├── brand.ts           # 브랜드 컬러 + 타이포그래피 상수
├── bento-services.ts  # 서비스 카드 데이터
└── services.ts        # 업종별 서비스 정의

lib/
├── admin-permissions.ts  # getAdminEmails() 중앙화
├── supabase/             # DB 클라이언트 설정
├── financial/            # 금융 API + 캐싱
├── email/resend-client.ts# 이메일 서비스
└── env.ts                # Zod 환경변수 검증

tailwind.config.ts         # brand.* 토큰 + Playfair/Inter 폰트
DESIGN.md                  # 디자인 시스템 소스 오브 트루스
AGENTS.md                  # AI 에이전트 개발 규칙
.claude-plugin/            # family-office Claude Code 플러그인 — .claude-plugin/README.md 참조
.mcp.json                  # MCP 커넥터 (세션 시작 시 자동 로드) — 현재 빈 객체, 토큰 발급 후 활성화
```

---

## 🔐 인증 & 관리자 시스템

### 관리자 접근

```typescript
// Server Components / API Routes
import { getAdminEmails } from '@/lib/admin-permissions';
const isAdmin = getAdminEmails().includes(userEmail.toLowerCase());

// Client Components
const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
```

- **절대 관리자 이메일 하드코딩 금지** — 항상 `getAdminEmails()` 사용
- 보호된 라우트: `/admin/*` + `AdminAccessDeniedAlert`

---

## 🌍 환경 변수

```bash
# 필수
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 관리자
ADMIN_EMAILS=admin1@example.com,admin2@example.com
NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com

# 이메일
RESEND_API_KEY=
NEXT_PUBLIC_RESEND_FROM_EMAIL=noreply@email.familyoffices.vip

# Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# 선택
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
NEXT_PUBLIC_CALCOM_API_KEY=
```

전체 목록: `.env.example`

---

## 🎯 코딩 패턴

### TypeScript / 컴포넌트

```typescript
// Server Component (기본 — SEO + 데이터 페칭)
export default async function ServicePage() {
  const services = await getServices();
  return <ServiceList services={services} />;
}

// Client Component (최소화 — 인터랙션 필요 시만)
'use client';
export function ServiceList({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);
}
```

### API Route 패턴

```typescript
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const RequestSchema = z.object({ email: z.string().email() });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = RequestSchema.parse(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

### 네이밍 컨벤션

| 대상 | 컨벤션 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `HeroSection`, `CalComPopup` |
| 파일 | kebab-case | `hero-section.tsx` |
| 변수/함수 | camelCase | `fetchUserData` |
| 상수 | UPPER_SNAKE_CASE | `API_BASE_URL` |
| 타입/인터페이스 | PascalCase + 서픽스 | `UserProps`, `ApiResponse` |

### Import 순서 (Prettier 자동 정렬)

```typescript
// React → Next → Clerk → Radix → shadcn/ui → components → lib → 상대경로
import { useState } from 'react';
import { Metadata } from 'next';
import { currentUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/sections/hero-section';
import { supabase } from '@/lib/supabase';
```

---

## 🧪 테스트 전략

| 레이어 | 도구 | 커버리지 목표 |
|---|---|---|
| E2E | Playwright (134 tests) | 핵심 사용자 플로우 |
| 단위 | Jest | 금융 모듈 90%+ |
| 통합 | Jest + Supabase | API 엔드포인트 |
| 보안 | `npm run test:security` | 인증/권한 |

---

## 📊 미들웨어 (`middleware.ts`)

실행 순서:
1. 유지보수 모드 확인
2. API Rate Limiting (단일 호출, 헤더 캐시)
3. Clerk 인증
4. Admin 라우트 보호
5. Rate limit 헤더 응답

**중요**: `globalRateLimit()` 요청당 1회만 호출 (이중 카운팅 방지)

---

## 🚢 배포

- **플랫폼**: Vercel 자동 배포
- **빌드**: `npm run vercel-build`
- **도메인**: `familyoffices.vip`
- **모니터링**: Sentry

### 빌드 성능 (2026년 5월)

| 항목 | 수치 |
|---|---|
| 컴파일 시간 | ~37초 |
| 정적 페이지 | 139개 |
| TypeScript 체크 | ~42초 |
| Exit code | 0 ✅ |

---

## 📝 버전 관리 규칙

코드 변경 시 `.commit_message.txt`에 한 줄 설명(이모지 포함 한국어) 기록:

```bash
# 파일 먼저 읽고 → 덮어쓰기
# 예시:
🎨 design: DESIGN.md 기반 Modern Legacy 브랜드 팔레트 전면 적용
✨ feat: 구조점검 예약 폼 Heritage Gold CTA 추가
🐛 fix: CalComPopup style prop TypeScript 오류 해결
```

- revert 작업 시: 파일 내용 비움

---

## 📅 문서 이력

| 날짜 | 주요 변경 |
|---|---|
| 2026-05-03 | DESIGN.md Modern Legacy 디자인 시스템 적용 완료 |
| 2026-05-03 | Next.js 16.1.6 업그레이드, 빌드 139 정적 페이지 |
| 2025-02 | 초기 문서 작성 |

---

**Last Updated**: 2026-05-03
