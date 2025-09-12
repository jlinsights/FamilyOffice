# FamilyOffice Agent Guidelines

AI 에이전트를 위한 전용 가이드라인입니다. 이 파일은 코딩 에이전트가 FamilyOffice 프로젝트에서 효율적으로 작업할 수 있도록 최적화된 지침을 제공합니다.

## 🚀 핵심 개발 환경 설정

### 필수 명령어 우선순위
```bash
# 개발 시작 (절대 npm run build 사용 금지)
npm run dev          # HMR 개발 서버 (localhost:3000)
npm run dev:mobile   # 모바일 테스트 (0.0.0.0:3000)

# 코드 품질 검사
npm run agent:check  # 린트 + 타입 검사 (에이전트 최적화)
npm run lint         # ESLint 검사
npm run typecheck    # TypeScript 타입 검사

# 테스트 실행
npm run test:e2e     # Playwright E2E 테스트 (56개 테스트)
npm run test:unit    # Jest 단위 테스트
```

### ⚠️ 개발 중 금지사항
- **절대 금지**: `npm run build` (개발 세션 중 HMR 비활성화)
- **절대 금지**: `.next` 폴더 수정 또는 삭제
- **주의**: 의존성 변경 시 개발 서버 재시작 필수

## 💡 에이전트 작업 최적화

### 1. 한국 콘텐츠 개발 우선순위
- **타겟 사용자**: 한국 중견기업 CEO (45-65세)
- **주요 업종**: 제조업, 건설업, IT벤처, 패밀리 기업
- **언어**: 한국어 우선, 전문 용어는 한영 병기
- **시간대**: Asia/Seoul (KST) 기준

### 2. 컴포넌트 개발 패턴
```typescript
// 서버 컴포넌트 우선 (SEO + 성능)
export default async function Page() {
  // 데이터 fetching
}

// 클라이언트 컴포넌트 최소화
"use client"
import { useState } from "react"
```

### 3. 파일 구조 최적화
```
app/                 # Next.js 15 App Router
├── (marketing)/     # 마케팅 페이지 그룹
├── admin/          # 관리자 전용 (이메일 기반 권한)
├── api/            # API Routes
└── blog/           # SEO 최적화 블로그

components/
├── cal-com-*.tsx   # 상담 예약 위젯 (5가지 변형)
├── forms/          # HubSpot 연동 폼
└── ui/             # shadcn/ui 기반
```

## 📊 실시간 데이터 처리

### Financial API 사용법
```typescript
// 한국 주식 데이터
GET /api/financial/stocks?korean=true
// 삼성전자(005930.KS), SK하이닉스, NAVER 등

// 환율 정보  
GET /api/financial/forex?from=USD&to=KRW
// USD/KRW, EUR/KRW, JPY/KRW 등
```

### 캐싱 전략
- **Memory**: 5분 (빠른 응답)
- **Redis**: 5분 (장애 대응)
- **Fallback**: Yahoo Finance → Alpha Vantage

## 🔧 개발 워크플로우 최적화

### 코드 수정 시퀀스
1. **타입 검사**: `npm run typecheck`
2. **린트 검사**: `npm run lint`
3. **E2E 테스트**: `npm run test:e2e`
4. **수동 테스트**: 한국어 콘텐츠, 모바일 반응형

### 배포 전 체크리스트
```bash
# 필수 검사 (순서대로 실행)
npm run agent:test  # 모든 품질 검사 + E2E 테스트 (에이전트 최적화)
# 또는 개별 실행:
npm run agent:check # 린트 + 타입 검사
npm run test:e2e    # E2E 기능 검증
npm run build       # 프로덕션 빌드 테스트 (개발 세션 외부에서만)
```

## 🛡️ 보안 및 인증

### 관리자 권한
- **Super Admin**: `jhlim725@gmail.com` (하드코딩)
- **Protected Routes**: `/admin/*`
- **인증 플로우**: Clerk → Supabase 동기화

### 환경 변수 필수값
```bash
# Clerk 인증
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Supabase 데이터베이스  
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 🎨 UI/UX 가이드라인

### 디자인 시스템
- **컬러**: Navy (#1e3a8a) + Bronze (#cd7f32)
- **한국어 폰트**: 가독성 우선 설정
- **반응형**: 모바일 우선 개발
- **접근성**: WCAG 2.1 AA 준수

### 컴포넌트 우선순위
1. **Cal.com 예약**: 5가지 위젯 활용
2. **Newsletter**: Beehiiv 연동 (화/금 발송)
3. **Financial Data**: 실시간 주식/환율
4. **Blog System**: SEO 최적화 콘텐츠

## 🧪 테스트 전략

### Playwright 설정 (Cypress 완전 대체)
- **8개 브라우저/디바이스 조합**
- **56개 E2E 테스트** (한국 콘텐츠 포함)
- **모바일 테스트**: Chrome Mobile, Safari Mobile
- **성능 테스트**: Core Web Vitals 모니터링

### 테스트 명령어
```bash
npm run test:e2e:ui      # UI 모드로 테스트 개발
npm run test:e2e:debug   # 디버그 모드
npm run test:e2e:report  # 테스트 보고서 확인
```

## 📈 성능 최적화

### 빌드 성능 목표
- **빌드 시간**: 14초 (37개 정적 페이지)
- **번들 크기**: 메인 페이지 4.28 kB
- **First Load JS**: 239 kB
- **이미지**: Next.js 최적화 적용

### 코드 분할 전략
```typescript
// 동적 import로 번들 크기 최적화
const DynamicComponent = dynamic(() => import('./Component'))

// 이미지 최적화
import Image from 'next/image'
<Image src="/path" width={300} height={200} alt="설명" />
```

## 🔍 디버깅 및 트러블슈팅

### 자주 발생하는 문제
1. **HMR 작동 안함**: 개발 서버 재시작 필요
2. **타입 에러**: `npm run typecheck`로 확인
3. **빌드 실패**: 환경 변수 및 의존성 점검
4. **테스트 실패**: Playwright 브라우저 설정 확인

### 로그 확인
```bash
# 개발 서버 로그
npm run dev:inspect  # Node.js 디버거 연결

# 프로덕션 로그  
vercel logs          # Vercel 배포 로그
```

## 📝 커밋 메시지 규칙

```bash
# 한국어 이모지 포함 메시지
feat: ✨ 새로운 Cal.com 위젯 추가
fix: 🐛 모바일 반응형 이슈 해결  
docs: 📚 AGENTS.md 가이드라인 업데이트
test: 🧪 Playwright E2E 테스트 추가
```

## 📋 Agent Command Reference

### 핵심 명령어 (우선순위 높음)
| 명령어 | 목적 | 언제 사용 |
|--------|------|---------|
| `npm run dev` | HMR 개발 서버 | 🟢 개발 중 항상 |
| `npm run agent:check` | 린트 + 타입 검사 | 🟢 코드 수정 후 |
| `npm run agent:test` | 전체 품질 검사 | 🟢 커밋 전 |
| `npm run dev:mobile` | 모바일 테스트 | 🟡 반응형 작업 시 |

### 금지 명령어 (개발 세션 중)
| 명령어 | 문제 | 대안 |
|--------|------|-----|
| ❌ `npm run build` | HMR 비활성화 | 개발 세션 외부에서만 |
| ❌ `.next` 폴더 삭제 | 캐시 손실 | `npm run cache:clear` |
| ❌ `rm -rf node_modules` | 재설치 필요 | 개발 서버 재시작 |

### 한국 콘텐츠 작업
| 작업 | 확인사항 | 명령어 |
|------|----------|--------|
| 텍스트 추가 | 한글 폰트 렌더링 | `npm run dev:mobile` |
| 날짜/시간 | Asia/Seoul 시간대 | `npm run test:e2e` |
| 업종별 콘텐츠 | 제조/건설/IT 검증 | 수동 테스트 |

### 성능 최적화
```bash
# 번들 크기 분석
npm run bundle:size

# 이미지 최적화  
npm run optimize:images

# 성능 측정
npm run performance:check
```

---

**💡 Agent Tips**:
- 개발 중에는 항상 `npm run dev` 사용
- 한국 콘텐츠와 모바일 최적화 우선
- 타입 안전성과 성능을 모두 고려
- Playwright 테스트로 품질 검증