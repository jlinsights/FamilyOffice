# 🔍 FamilyOffice S — 현황 진단 보고서

> **작성일**: 2026-09-07  
> **대상**: `familyoffices.vip` (GitHub: `jlinsights/FamilyOffice`)  
> **목적**: 코드베이스 현황 파악 → 첫 번째 코딩 스프린트 의사결정 지원

---

## 목차

1. [기술 스택 & 호스팅](#1-기술-스택--호스팅)
2. [주요 라우트/페이지 구조](#2-주요-라우트페이지-구조)
3. [리드 캡처 현황](#3-리드-캡처-현황)
4. [삼성생명/파트너 잔재 목록](#4-삼성생명파트너-잔재-목록)
5. [환경변수 & 보안 패턴](#5-환경변수--보안-패턴)
6. [강점 vs 블로커 요약](#6-강점-vs-블로커-요약)

---

## 1. 기술 스택 & 호스팅

### 코어 프레임워크

| 항목 | 버전/내용 |
|---|---|
| **Next.js** | 16.1.6 (App Router + Turbopack) |
| **React** | 19.2.4 |
| **TypeScript** | 5.8.3 (strict 모드) |
| **Node.js** | ≥ 18.0.0 |
| **패키지 매니저** | npm ≥ 8.0.0 |

### 인증 & 데이터

| 항목 | 상태 |
|---|---|
| **Clerk** | 인증 전담 (`@clerk/nextjs ^6.36.5`) — 회원가입/로그인/MFA/온보딩 |
| **Supabase** | PostgreSQL — 사용자, 리드, 상담 요청, 결제, 블로그 데이터 |
| **Upstash Redis** | 분산 캐싱 + Rate Limiting (`@upstash/redis`, `@upstash/ratelimit`) |

### 결제

| 항목 | 상태 |
|---|---|
| **Toss Payments** | 결제위젯 v2 SDK (`@tosspayments/tosspayments-sdk ^2.7`) |
| 결제 경로 | 상담 1회성 (330,000원 `/structure-check`) + Shop 1-of-1 큐레이션 (`/shop`) |
| 보안 | HMAC 웹훅 서명, UUID v5 `customerKey`, `payment_secret` cross-check |
| 키 상태 | **테스트 키** (`test_gck_*`/`test_gsk_*`) — 라이브 전환 필요 |

### 이메일 & 뉴스레터

| 항목 | 상태 |
|---|---|
| **Resend** | 트랜잭션 이메일 (`@react-email/components`) — `email.familyoffices.vip` |
| **Beehiiv** | 뉴스레터 구독 — API 연동, Weekly Brief 발송 |

### 마케팅/분석 통합

| 항목 | 상태 |
|---|---|
| **Google Analytics 4** | `G-DB6TXRZLTK` — 이벤트 트래킹, 전환 추적 |
| **Google Tag Manager** | `GTM-MP3HPPMN` |
| **Cal.com** | 상담 예약 위젯 (9종 컴포넌트: popup, embed, inline, floating 등) |
| **HubSpot** | CRM 통합 — 웹훅 수신, 리드 동기화, 폼 처리 |
| **Channel Talk** | 실시간 고객 지원 채팅 위젯 |
| **카카오** | 비즈니스 API (로그인, 채널, 공유, Pixel 추적) |
| **Sentry** | 오류 모니터링 (`@sentry/nextjs ^10.22.0`) |
| **Vercel Analytics** | 성능 + Speed Insights |

### 호스팅 & 배포

| 항목 | 내용 |
|---|---|
| **플랫폼** | Vercel (자동 배포, Preview Deployments) |
| **도메인** | `familyoffices.vip` (기존 `samsunglife.vip` → 301 리다이렉트 설정됨) |
| **Cron** | `vercel.json` — 매일 02:00 UTC BMAD 데이터 수집 |
| **빌드** | ~37초, 정적 페이지 139개, TypeScript 체크 ~42초 |

### UI/디자인

| 항목 | 내용 |
|---|---|
| **Tailwind CSS** | 3.4.17 — 커스텀 브랜드 토큰 (`brand.navy`, `brand.gold` 등) |
| **shadcn/ui** | Radix UI 기반 컴포넌트 라이브러리 |
| **폰트** | Playfair Display (헤드라인) + Inter (본문) |
| **애니메이션** | Framer Motion + GSAP + Aceternity UI |
| **디자인 시스템** | "Modern Legacy" — `DESIGN.md` 참조 |

---

## 2. 주요 라우트/페이지 구조

### 퍼블릭 마케팅 페이지 (~30개)

| 경로 | 설명 | 상태 |
|---|---|---|
| `/` | 홈 — Hero, 서비스, Dual Pillar, Self-Check CTA, 멀티미디어 | ✅ 동작 |
| `/about` | 회사 소개 | ✅ 동작 |
| `/membership` | 멤버십 안내 | ✅ 동작 |
| `/solutions` | 전체 솔루션 카테고리 | ✅ 동작 |
| `/solution-finder` | 자가진단 퀴즈 → 맞춤 솔루션 추천 | ✅ 동작 |
| `/calculators` | 상속세/증여세/승계비용 계산기 | ✅ 동작 |
| `/insights` | 인사이트 허브 (Market Intelligence, Weekly Brief) | ✅ 동작 |
| `/seminar` | 세미나 목록 & 등록 | ✅ 동작 |
| `/structure-check` | **핵심 전환 페이지** — 구조 점검 요청 + 결제 | ✅ 동작 |
| `/contact` | → `/structure-check#request-form`로 리다이렉트 | ✅ 동작 |
| `/recruit` | 채용 (GFC 관련 — 삼성생명 잔재 다수) | ⚠️ 삼성 잔재 |
| `/shop` | Shop MVP (1-of-1 큐레이션, 로그인 필요) | ✅ 동작 |
| `/blog/*` | → `/insights/market-intelligence`로 301 리다이렉트 | ✅ 동작 |

### 서비스 상세 페이지 (~15개)

| 경로 | 설명 |
|---|---|
| `/business-succession-strategy` | 가업승계 전략 |
| `/inheritance-gift-tax` | 상속·증여세 |
| `/tax-strategy` | 세무 전략 |
| `/asset-diversification` | 자산 다각화 |
| `/life-insurance` | 생명보험 |
| `/group-insurance` | 단체보험 |
| `/key-person-insurance` | 핵심인재 보험 |
| `/hr-labor-management` | HR·노무 관리 |
| `/serious-accident-law` | 중대재해법 |
| `/corporate-tax-checklist` | 법인세 체크리스트 |
| `/ceo-checklist` | CEO 체크리스트 |
| `/family-office-center` | 패밀리오피스 센터 |
| `/fp-center` | FP 센터 |
| `/policy-funds` | 정책 자금 |
| `/wealth-consulting` | 자산관리 컨설팅 |

### 인증/포털 페이지

| 경로 | 설명 |
|---|---|
| `/auth/sign-in`, `/auth/sign-up` | Clerk 인증 |
| `/onboarding` | 신규 사용자 온보딩 |
| `/dashboard` | 사용자 대시보드 |
| `/portal` | 사용자 포털 (설정 포함) |
| `/profile` | 프로필 관리 |

### 관리자 페이지

| 경로 | 설명 |
|---|---|
| `/admin` | 대시보드 |
| `/admin/consultations` | 상담 관리 |
| `/admin/structure-check` | 구조 점검 요청 관리 |
| `/admin/analytics` | 분석 |
| `/admin/seo` | SEO 대시보드 |
| `/admin/aeo` | AEO (AI Engine Optimization) |
| `/admin/email` | 이메일 관리 |

### 네비게이션 구조

헤더 메뉴 (`lib/constants.ts` → `NAVIGATION_ITEMS`):
- **멤버십** → `/membership`
- **서비스** (드롭다운) → 프로그램, 솔루션 파인더, 계산기
- **인사이트** → `/insights`
- **세미나** → `/seminar`
- **SHOP** → `/shop` (로그인 시만 표시)
- **채용** → `/recruit`
- **상담신청** (Primary CTA) → `/structure-check`

---

## 3. 리드 캡처 현황

### 3.1 작동 중인 리드 채널

#### ① 구조 점검 요청 폼 (핵심 전환 경로)
- **경로**: `/structure-check` → `POST /api/structure-check`
- **수집 필드**: 이름, 이메일, 전화, 회사명, 7개 자가진단 질문
- **자동 점수화**: 5점 만점 자격 판정 (qualification score)
- **처리**: Supabase `structure_check_requests` 저장 → Resend 관리자 알림 + 사용자 확인 이메일
- **결제 연동**: Clerk 인증 후 Toss Payments 330,000원 결제 → 구조 점검 실행
- **전환 추적**: `conversionTrackingService` 기록
- **상태**: ✅ **핵심 작동 중** — 가장 완성도 높은 리드 경로

#### ② 리드 캡처 API (계산기 이메일 게이트)
- **경로**: `POST /api/leads/capture`
- **수집 필드**: 이메일, 이름, 계산 결과(자산/부채/세금), UTM, 소스
- **처리**: Supabase `leads` 저장 → Beehiiv 구독자 추가 → 7일 이메일 자동화 시작
- **봇 방어**: 허니팟 필드 + 2초 미만 제출 차단
- **상태**: ✅ 작동 중 (Beehiiv API 키 설정 필요)

#### ③ 뉴스레터 구독
- **경로**: `POST /api/newsletter/subscribe`
- **위치**: 푸터 Weekly Brief 폼, 각종 페이지 내 CTA
- **처리**: Beehiiv API 연동
- **상태**: ✅ 작동 중 (Beehiiv 설정 의존)

#### ④ Cal.com 상담 예약
- **컴포넌트**: 9종 (`cal-com-popup`, `cal-com-embed`, `cal-com-inline`, `cal-com-floating` 등)
- **위치**: 서비스 상세 페이지 전반
- **웹훅**: `POST /api/webhooks/cal-com` — 예약 생성/취소 이벤트 수신
- **상태**: ✅ 컴포넌트 구현 완료 (Cal.com API 키 설정 필요)

#### ⑤ 솔루션 파인더 (자가진단 퀴즈)
- **경로**: `/solution-finder`
- **기능**: 5~7개 질문 → 맞춤 솔루션 추천
- **이메일 게이트**: `PremiumContentGuard` 컴포넌트로 결과 확인 전 이메일 수집
- **상태**: ✅ 작동 중

#### ⑥ 카카오 오픈채팅
- **링크**: `https://open.kakao.com/me/familyoffice`
- **위치**: 푸터, 플로팅 버튼
- **상태**: ✅ 외부 링크 (의존성 없음)

### 3.2 CRM/마케팅 자동화 연동

| 시스템 | 상태 | 비고 |
|---|---|---|
| **Supabase (leads 테이블)** | ✅ 작동 | 리드 1차 저장소 |
| **Beehiiv** | ⚠️ API 키 필요 | 뉴스레터 + 이메일 자동화 |
| **HubSpot** | ⚠️ 코드 존재, 키 미설정 | 웹훅 수신 구현됨, CRM 동기화 가능 |
| **Resend** | ✅ 설정됨 | 트랜잭션 이메일 (확인, 알림) |
| **GA4** | ✅ 설정됨 | 전환 이벤트 트래킹 |

### 3.3 리드 스코어링 시스템

- **파일**: `lib/lead-scoring-system.ts`
- **BMAD 단계**: Behavioral → Motivational → Aspirational → Decisional
- **전환 퍼널**: `lib/conversion/stages.ts` — visit → engaged → lead → consultation_booked → consultation_done → client
- **상태**: ✅ 코드 구현 완료 — 하지만 실제 스코어링 대시보드/자동화는 **관리자 UI에서 수동 확인** 수준

### 3.4 부재 항목

- **EmailJS**: 사용하지 않음 — Resend으로 대체
- **Stripe**: 사용하지 않음 — Toss Payments 전용
- **직접 SMS/알림톡**: 코드 없음 — 카카오 비즈니스 API 스키마만 존재

---

## 4. 삼성생명/파트너 잔재 목록

### 4.1 즉시 제거/교체 필요 (고객 노출)

| 위치 | 내용 | 심각도 |
|---|---|---|
| `public/SVG/samsung-financial-networks.svg` | 삼성 금융 네트워크 로고 SVG | 🔴 높음 |
| `public/SVG/samsung-financial-networks-white.svg` | 삼성 금융 네트워크 로고 (화이트) | 🔴 높음 |
| `public/SVG/fi-brands-samsung.svg` | 삼성 브랜드 아이콘 | 🔴 높음 |
| `components/logo.tsx` | `SamsungFinancialNetworksLogo` 컴포넌트 정의 | 🔴 높음 |
| `components/footer.tsx` | Facebook 링크 `samsunglife4vip` | 🔴 높음 |
| `components/domain-migration-banner.tsx` | `samsunglife.vip` 이전 도메인 마이그레이션 배너 | 🟡 중간 |

### 4.2 채용 섹션 (전면 재작성 필요)

| 위치 | 내용 | 심각도 |
|---|---|---|
| `constants/recruit.ts` | "삼성생명 GFC란?", "삼성생명의 프리미엄 브랜드" 등 FAQ 전문 | 🔴 높음 |
| `components/recruit/RecruitHeroSection.tsx` | 삼성생명 GFC 채용 표현 | 🔴 높음 |
| `components/recruit/GFCBenefitsSection.tsx` | GFC 혜택 (삼성생명 기반) | 🔴 높음 |
| `components/recruit/PositionsSection.tsx` | 삼성생명 포지션 설명 | 🔴 높음 |
| `components/recruit/RecruitCTASection.tsx` | 삼성생명 채용 CTA | 🔴 높음 |
| `components/recruit/RecruitFAQSection.tsx` | 삼성생명 관련 FAQ | 🔴 높음 |
| `app/recruit/layout.tsx` | 삼성생명 GFC 메타데이터 | 🔴 높음 |

### 4.3 SEO/메타데이터 (검색엔진 노출)

| 위치 | 내용 | 심각도 |
|---|---|---|
| `lib/seo/samsunglife-vip-seo.ts` | **전체 파일** — 삼성생명 VIP 전용 SEO 설정, 구조화 데이터 | 🔴 높음 |
| `lib/seo/dual-domain-seo.ts` | `samsunglife.vip` 듀얼 도메인 전략 | 🟡 중간 |
| `lib/seo/intelligent-cross-domain-routing.ts` | 삼성생명 도메인 간 라우팅 | 🟡 중간 |
| `lib/cross-domain-strategy.ts` | `samsunglife.vip` ↔ `familyoffices.vip` 교차 전략 | 🟡 중간 |
| `lib/seo/metadata-generator.ts` | 삼성생명 참조 메타데이터 | 🟡 중간 |
| `lib/seo/keywords.ts` | "삼성생명 파트너" 키워드 | 🟡 중간 |
| `lib/seo/modules/schema-generators.ts` | Samsung Life 구조화 데이터 | 🟡 중간 |
| `lib/seo/modules/ai-content.ts` | 삼성생명 GFC 관련 AI 콘텐츠 | 🟡 중간 |

### 4.4 도메인 리다이렉트 (유지 권장)

| 위치 | 내용 | 조치 |
|---|---|---|
| `next.config.mjs` redirects | `samsunglife.vip` → `familyoffices.vip` 301 리다이렉트 | ✅ 유지 |

> **참고**: `samsunglife.vip` 도메인 소유권이 유지되는 한, 301 리다이렉트는 SEO 가치 보존을 위해 유지하는 것이 좋습니다.

### 4.5 기타 참조

| 위치 | 내용 |
|---|---|
| `scripts/partner-data-integration.js` | 삼성생명 파트너 데이터 스크립트 |
| `scripts/insurance-products-manager.js` | 삼성생명 보험 상품 관리 스크립트 |
| `public/partner-data/` | 파트너 데이터 디렉토리 |
| `public/insurance-products/` | 보험 상품 디렉토리 |
| `constants/seminars.ts` | 세미나 데이터 내 삼성생명 참조 |
| `app/policy-funds/page.tsx` | 삼성생명 정책자금 관련 콘텐츠 |
| `app/key-person-insurance/` | 핵심인재 보험 (삼성생명 연계) |
| `app/life-insurance/` | 생명보험 (삼성생명 연계) |
| `app/group-insurance/` | 단체보험 (삼성생명 연계) |

---

## 5. 환경변수 & 보안 패턴

### 5.1 환경변수 구조 (양호)

- **Zod 스키마 검증**: `lib/env.ts` — 서버/클라이언트/퍼블릭 환경변수 런타임 검증
- **`.env.example`**: 전체 목록 문서화됨 (약 50개)
- **관리자 이메일**: `getAdminEmails()` 함수 중앙화 — 하드코딩 금지 패턴

### 5.2 보안 강점

| 항목 | 상태 |
|---|---|
| CSRF 방어 | ✅ Origin guard + 서버 액션 allowedOrigins |
| Rate Limiting | ✅ Upstash 기반 API 전역 제한 |
| 보안 헤더 | ✅ HSTS, X-Frame-Options DENY, CSP, X-Content-Type-Options |
| HTTPS 강제 | ✅ 프로덕션 리다이렉트 |
| Clerk 웹훅 서명 검증 | ✅ Svix 서명 확인 |
| Toss 웹훅 HMAC 검증 | ✅ 구현 완료 |
| 의심 활동 감지 | ✅ `security-monitor.ts` 자동 차단 |
| 봇 방어 | ✅ 허니팟 + 타이밍 검증 (리드 캡처) |

### 5.3 주의 사항

| 항목 | 상태 | 조치 필요 |
|---|---|---|
| Toss 키 | 테스트 키 사용 중 (`test_gck_*`) | 라이브 전환 필요 |
| `.env.example`에 하드코딩된 GA ID | `G-DB6TXRZLTK` 직접 노출 | 낮은 위험 (퍼블릭 키) |
| `.env.example`에 카카오 Pixel ID | `8992336493423513326` 직접 노출 | 낮은 위험 (퍼블릭 키) |
| 관리자 이메일 `.env.example` | `jhlim725@gmail.com` 노출 | 🟡 삭제 또는 플레이스홀더 교체 권장 |
| `console.log` 제거 | 프로덕션 컴파일러에서 제거 (`removeConsole: true`) | ✅ 양호 |
| CORS | 기본 `familyoffices.vip` + 동적 Origin 확인 | ✅ 양호 |
| CSP | 프로덕션용 상세 CSP 설정 | ✅ 양호 |

### 5.4 필수 외부 서비스 키 상태

| 서비스 | 환경변수 | 필수도 |
|---|---|---|
| Clerk | `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | 🔴 필수 |
| Supabase | `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_*` | 🔴 필수 |
| Toss Payments | `TOSS_SECRET_KEY`, `NEXT_PUBLIC_TOSS_CLIENT_KEY` | 🔴 결제 필수 |
| Resend | `RESEND_API_KEY` | 🔴 이메일 필수 |
| Beehiiv | `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID` | 🟡 뉴스레터 |
| Cal.com | `NEXT_PUBLIC_CALCOM_API_KEY` | 🟡 예약 |
| HubSpot | `HUBSPOT_API_KEY`, `HUBSPOT_PRIVATE_ACCESS_TOKEN` | 🟡 CRM |
| Upstash Redis | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | 🟡 캐싱 |
| Alpha Vantage / Yahoo Finance | `ALPHA_VANTAGE_API_KEY` | 🟡 금융 데이터 |
| Google (GA4, Search Console) | `GOOGLE_*` | 🟡 분석/SEO |
| 카카오 | `KAKAO_*`, `NEXT_PUBLIC_KAKAO_*` | 🟡 마케팅 |
| Sentry | `SENTRY_DSN` | 🟡 모니터링 |

---

## 6. 강점 vs 블로커 요약

### ✅ 이미 강한 것 (살려야 할 자산)

1. **구조 점검 전환 퍼널이 완성됨**  
   `/structure-check` → 자가진단 7문항 → 자격 점수 산출 → Toss 결제 → Supabase 저장 → 이메일 알림.  
   독립 허브의 핵심 매출 경로로 바로 사용 가능.

2. **리드 스코어링/전환 추적 시스템**  
   BMAD 4단계 + 6단계 퍼널 코드가 구현됨. 세션 기반 전환 이벤트 기록.

3. **콘텐츠 자산 풍부**  
   블로그 20+ 포스트, 서비스 상세 15+ 페이지, 세미나, 인사이트, 계산기 3종.  
   SEO 키워드/메타데이터 체계가 상세하게 짜여 있음.

4. **인증 & 보안 기반 견고**  
   Clerk + Supabase 동기화, 미들웨어 보안 체계, CSRF/Rate-limit/CSP 모두 프로덕션급.

5. **결제 인프라 구축 완료**  
   Toss 결제위젯 v2 통합, 웹훅 HMAC 검증, Shop MVP 1-of-1 구조.

6. **SEO 인프라 과잉할 정도로 풍부**  
   구조화 데이터, 네이버 최적화, AEO(AI 검색 최적화), BMAD 키워드 추적기 등.

7. **Cal.com 예약 시스템 완비**  
   9종 컴포넌트로 다양한 임베딩 가능. 웹훅 수신 구현.

8. **테스트 인프라**  
   Playwright E2E 134개 테스트, Jest 단위 테스트, 8 브라우저/디바이스 설정.

### 🚫 세일즈 엔진 전환을 막는 블로커

1. **삼성생명 잔재가 고객 신뢰를 해침**  
   채용 섹션 전체, 로고 SVG 3개, 푸터 Facebook 링크, SEO 파일 다수에 "삼성생명" 브랜딩이 남아있음.  
   독립 허브 정체성과 충돌 → **첫 스프린트에서 반드시 제거**.

2. **채용(`/recruit`) 페이지 전면 재작성 필요**  
   GFC(삼성생명 기업재무컨설턴트) 기준으로 작성됨.  
   독립 자문/브로커리지 허브에 맞는 파트너 채용 또는 제휴 모집으로 전환 필요.

3. **듀얼 도메인 전략 코드 정리**  
   `samsunglife.vip` ↔ `familyoffices.vip` 교차 도메인 라우팅/SEO 코드가 여전히 활성 상태.  
   `samsunglife.vip` 도메인이 더 이상 쓰이지 않으면 해당 코드 제거 필요.

4. **HubSpot CRM이 실제 운영 중인지 불분명**  
   웹훅 수신/리드 동기화 코드는 있으나, API 키가 설정되어 있지 않을 가능성.  
   리드가 Supabase에만 머물고 CRM 파이프라인으로 가지 않으면 후속 관리 어려움.

5. **Toss 결제 라이브 키 미전환**  
   테스트 키(`test_gck_*`)로만 운영 → 실 결제 불가.

6. **보험 상품 페이지들이 삼성생명 의존**  
   `/life-insurance`, `/group-insurance`, `/key-person-insurance`, `/policy-funds` 등이 삼성생명 상품 기준.  
   독립 허브에서는 복수 보험사 비교/추천 또는 일반적 어드바이저리 콘텐츠로 전환 필요.

7. **AI 에이전트 운영 기반은 아직 없음**  
   마케팅 자동화 코드(`lib/marketing/`)가 있으나 대부분 스키마/타입 정의 수준.  
   실제 AI 에이전트 워크플로(자동 리드 응답, 콘텐츠 생성, 파트너 매칭 등)는 새로 구축 필요.

### 📋 권장 첫 스프린트 우선순위

| 순위 | 작업 | 이유 |
|---|---|---|
| 1 | 삼성생명 브랜딩 완전 제거 | 고객 신뢰 & 법적 리스크 |
| 2 | 채용 페이지 비활성화 또는 재작성 | GFC → 독립 파트너 모집 |
| 3 | Toss 라이브 키 전환 + 결제 테스트 | 매출 발생 가능 |
| 4 | HubSpot 또는 대체 CRM 연동 확인 | 리드→영업 파이프라인 |
| 5 | 보험 상세 페이지 독립 콘텐츠 전환 | 삼성 의존 탈피 |
| 6 | AI 에이전트 운영 설계 | 저노동 운영 목표 달성 |

---

> **이 문서는 코드베이스 조사 결과를 정리한 팩트 기반 현황 보고서입니다.**  
> 리팩토링이나 기능 변경은 포함하지 않았습니다.
