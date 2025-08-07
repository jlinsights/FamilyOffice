# Vercel 프로덕션 배포 가이드

## 📋 배포 전 체크리스트

### 1. 환경 변수 설정
다음 환경 변수들을 Vercel 프로젝트 설정에서 추가해야 합니다:

#### 필수 환경 변수
```bash
# Clerk 인증
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase 데이터베이스
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI 서비스 API 키들
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
GOOGLE_AI_API_KEY=AIza...

# 기타 서비스
BEEHIIV_API_KEY=your-beehiiv-api-key
BEEHIIV_PUBLICATION_ID=your-publication-id
BEEHIIV_WEBHOOK_SECRET=your-webhook-secret

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# 모니터링
SENTRY_DSN=https://your-sentry-dsn
DATADOG_API_KEY=your-datadog-key

# 앱 URL
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### 선택적 환경 변수
```bash
# 성능 최적화
CDN_BASE_URL=https://your-cdn-domain.com
CLOUDFLARE_API_TOKEN=your-cloudflare-token
CLOUDFLARE_ZONE_ID=your-zone-id

# 개발 도구
ANALYZE=false
NODE_ENV=production
```

### 2. Vercel CLI 설치 및 로그인

```bash
# Vercel CLI 설치
npm i -g vercel

# Vercel 계정 로그인
vercel login
```

### 3. 프로젝트 빌드 테스트

```bash
# 의존성 설치
npm install

# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 테스트 실행
npm run test

# 프로덕션 빌드 테스트
npm run build
```

## 🚀 배포 방법

### 방법 1: Vercel CLI를 통한 배포

```bash
# 프로젝트 루트에서 실행
vercel --prod
```

### 방법 2: GitHub 연동을 통한 자동 배포

1. **GitHub 저장소 연결**
   - Vercel 대시보드에서 "New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정 확인

2. **환경 변수 설정**
   - Vercel 프로젝트 설정 → Environment Variables
   - 위의 필수 환경 변수들을 모두 추가

3. **빌드 설정 확인**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 방법 3: 수동 배포

```bash
# 프로젝트 빌드
npm run build

# Vercel에 배포
vercel --prod --yes
```

## 🔧 배포 후 확인사항

### 1. 기본 기능 테스트
- [ ] 홈페이지 로딩 확인
- [ ] 인증 시스템 작동 확인
- [ ] API 엔드포인트 응답 확인
- [ ] 데이터베이스 연결 확인

### 2. 성능 모니터링
- [ ] Core Web Vitals 확인
- [ ] 페이지 로딩 속도 측정
- [ ] API 응답 시간 모니터링

### 3. 보안 검증
- [ ] HTTPS 리다이렉트 확인
- [ ] 보안 헤더 설정 확인
- [ ] 환경 변수 노출 여부 확인

## 🛠️ 문제 해결

### 일반적인 배포 오류

#### 1. 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 타입 오류 확인
npm run type-check

# 린트 오류 확인
npm run lint
```

#### 2. 환경 변수 오류
```bash
# 환경 변수 확인
vercel env ls

# 환경 변수 추가
vercel env add NEXT_PUBLIC_SUPABASE_URL
```

#### 3. 의존성 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 성능 최적화

#### 1. 번들 크기 최적화
```bash
# 번들 분석
npm run analyze
```

#### 2. 이미지 최적화
- Next.js Image 컴포넌트 사용 확인
- WebP/AVIF 포맷 지원 확인

#### 3. 캐싱 전략
- 정적 자산 캐싱 설정 확인
- API 응답 캐싱 구현

## 📊 모니터링 설정

### 1. Vercel Analytics
- Vercel 대시보드에서 Analytics 활성화
- 성능 메트릭 모니터링

### 2. Sentry 에러 추적
```typescript
// lib/monitoring.ts에서 Sentry 설정 확인
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
  });
}
```

### 3. 로그 모니터링
- Vercel Function Logs 확인
- API 응답 시간 모니터링

## 🔄 CI/CD 파이프라인

### GitHub Actions 워크플로우
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 긴급 상황 대응

### 1. 롤백 방법
```bash
# 이전 배포로 롤백
vercel rollback

# 특정 배포로 롤백
vercel rollback <deployment-url>
```

### 2. 환경 변수 업데이트
```bash
# 환경 변수 업데이트
vercel env add VARIABLE_NAME

# 프로덕션 재배포
vercel --prod
```

### 3. 도메인 설정
- Vercel 대시보드에서 커스텀 도메인 추가
- DNS 설정 확인
- SSL 인증서 자동 발급 확인

## 📈 성능 최적화 팁

### 1. 한국 사용자를 위한 최적화
- Vercel의 `icn1` 리전 사용 (vercel.json에 설정됨)
- 이미지 CDN 활용
- 번들 크기 최소화

### 2. 모바일 최적화
- 반응형 디자인 확인
- 터치 인터페이스 최적화
- 모바일 성능 테스트

### 3. SEO 최적화
- 메타 태그 설정 확인
- 구조화된 데이터 추가
- 사이트맵 생성

## 🔐 보안 체크리스트

- [ ] 환경 변수 노출 방지
- [ ] API 키 보안 확인
- [ ] CORS 설정 검증
- [ ] Rate Limiting 구현
- [ ] 입력 데이터 검증
- [ ] SQL Injection 방지
- [ ] XSS 방어 설정

## 📞 지원 및 문의

배포 과정에서 문제가 발생하면:

1. **Vercel 문서**: https://vercel.com/docs
2. **Next.js 문서**: https://nextjs.org/docs
3. **프로젝트 이슈**: GitHub Issues 활용

---

**마지막 업데이트**: 2024년 12월
**버전**: 1.0.0 