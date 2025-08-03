# FamilyOffice S - 중소중견기업 법인 대표 전용 자산관리 플랫폼

## 📋 프로젝트 개요

FamilyOffice S는 비상장기업, 기술기업, 제조업 등 다양한 업종의 법인 대표를 위한 프리미엄 자산관리 플랫폼입니다. 정책자금부터 단체보험, 경영인정기보험, 중대재해처벌법 대응까지 500억원+ 관리 실적을 보유하고 있습니다.

## 🚀 주요 기능

### 💼 자산관리 서비스

- **비상장기업 자산관리**: 매출 50억~300억 비상장기업 전용
- **상속설계**: 세무최적화를 통한 효율적인 자산승계
- **재무설계**: 법인 대표 맞춤형 재무상담
- **투자자문**: 전문적인 투자 전략 수립

### 🛡️ 리스크 관리

- **법인 단체보험**: 기업 리스크 헷지
- **경영인정기보험**: CEO 정기보험 및 임원진 보험설계
- **중대재해처벌법 대응**: 중대재해 예방 및 리스크 관리

### 📊 기술 스택

#### Frontend

- **Next.js 15.4.3** - React 기반 풀스택 프레임워크
- **React 18+** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성 보장
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Framer Motion** - 애니메이션 라이브러리

#### Backend & Database

- **Supabase** - PostgreSQL 기반 백엔드 서비스
- **Clerk** - 인증 및 사용자 관리
- **Redis** - 캐싱 및 세션 관리
- **Upstash** - 서버리스 Redis 서비스

#### 한국 시장 통합

- **Cal.com** - 스케줄링 및 예약 시스템
- **HubSpot** - CRM 및 마케팅 자동화
- **Channel Talk** - 고객 지원 채팅
- **Kakao** - 카카오톡 비즈니스 API
- **Toss Payments** - 한국 결제 시스템

#### DevOps & Monitoring

- **Vercel** - 배포 플랫폼
- **Sentry** - 에러 추적 및 모니터링
- **Cypress** - E2E 테스팅
- **Jest** - 단위 테스팅

## 🛠️ 개발 환경 설정

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상
- Git

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/familyoffice-s.git
cd familyoffice-s

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 필요한 환경 변수 설정

# 개발 서버 실행
npm run dev
```

### 환경 변수 설정

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# 외부 서비스
NEXT_PUBLIC_CAL_COM_API_KEY=your_cal_com_api_key
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_hubspot_portal_id
NEXT_PUBLIC_CHANNEL_IO_KEY=your_channel_io_key
```

## 🔧 최근 해결된 기술적 이슈

### SSR (Server-Side Rendering) 호환성 문제 해결

다음 패키지들의 SSR 호환성 문제를 해결했습니다:

#### ✅ 해결된 패키지들

1. **Cal.com embed-react** - 스크립트 기반 통합으로 변경
2. **HubSpot** - 에러 처리 및 타임아웃 개선
3. **Recharts** - 동적 import로 SSR 안전성 확보
4. **Yahoo Finance** - SSR 안전한 데이터 페칭
5. **NodeCache/ioredis** - 서버사이드 전용 초기화
6. **Redis Cache** - 동적 import로 SSR 안전성 확보
7. **WebSocket** - 클라이언트 전용 초기화
8. **Rate Limit** - SSR 안전한 캐시 시스템
9. **Cache** - 조건부 초기화로 SSR 호환성 확보
10. **Load Testing** - 서버사이드 전용 WebSocket
11. **API Optimization** - Upstash 패키지 SSR 안전성 확보
12. **MFA Security** - otplib/qrcode SSR 안전성 확보

#### 🔧 해결 방법

```typescript
// SSR 안전성을 위한 dynamic imports
let PackageName: any = null;

const initializePackage = () => {
  if (typeof window === 'undefined' && !PackageName) {
    try {
      const packageModule = require('package-name');
      PackageName = packageModule.default || packageModule;
    } catch (error) {
      console.error('패키지 초기화 실패:', error);
      PackageName = null;
    }
  }
};
```

## 📁 프로젝트 구조

```
FamilyOffice/
├── app/                    # Next.js App Router
├── components/            # React 컴포넌트
├── lib/                   # 유틸리티 및 설정
├── types/                 # TypeScript 타입 정의
├── constants/             # 상수 정의
├── hooks/                 # 커스텀 React 훅
├── tests/                 # 테스트 파일
├── docs/                  # 문서
├── backend/               # 백엔드 서비스
├── cypress/               # E2E 테스팅
└── README.md              # 프로젝트 문서
```

## 🧪 테스팅

```bash
# 단위 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e

# 테스트 커버리지 확인
npm run test:coverage
```

## 🚀 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 환경별 배포 설정

- **개발**: `npm run dev`
- **스테이징**: Vercel Preview Deployments
- **프로덕션**: Vercel Production Deployment

## 📊 성능 최적화

### 구현된 최적화 기법

- **SSR/SSG**: 서버사이드 렌더링 및 정적 생성
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **코드 스플리팅**: 동적 import를 통한 번들 최적화
- **캐싱 전략**: Redis 기반 분산 캐싱
- **CDN**: Vercel Edge Network 활용

### 성능 목표

- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초
- **Cumulative Layout Shift**: < 0.1
- **API 응답 시간**: < 500ms (95th percentile)

## 🔒 보안

### 구현된 보안 기능

- **인증**: Clerk 기반 멀티팩터 인증
- **권한 관리**: Role-based Access Control (RBAC)
- **데이터 암호화**: AES-256 암호화
- **Rate Limiting**: API 요청 제한
- **CORS**: Cross-Origin Resource Sharing 설정
- **CSP**: Content Security Policy

## 🤝 기여 가이드

### 개발 워크플로우

1. 이슈 생성 또는 기존 이슈 확인
2. 새로운 브랜치 생성 (`feature/issue-number`)
3. 코드 작성 및 테스트
4. 커밋 메시지 작성 (Conventional Commits)
5. Pull Request 생성

### 코딩 스타일

- **TypeScript**: 엄격한 타입 체크
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **Husky**: Git 훅을 통한 자동 검사

## 📞 지원

### 기술 지원

- **이슈 트래커**: GitHub Issues
- **문서**: `/docs` 디렉토리
- **API 문서**: `/docs/technical/api`

### 비즈니스 문의

- **이메일**: contact@familyoffices.vip
- **전화**: 02-1234-5678
- **카카오톡**: @familyoffice-s

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- **Next.js** 팀 - 훌륭한 React 프레임워크 제공
- **Vercel** 팀 - 원활한 배포 환경 제공
- **Supabase** 팀 - 강력한 백엔드 서비스 제공
- **Clerk** 팀 - 안전한 인증 시스템 제공

---

**FamilyOffice S** - 중소중견기업 법인 대표를 위한 프리미엄 자산관리 플랫폼

© 2024 FamilyOffice S. All rights reserved.
