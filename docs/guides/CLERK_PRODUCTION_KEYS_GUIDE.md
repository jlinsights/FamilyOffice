# Production Clerk Keys 생성 가이드

## 📋 개요

현재 문제점과 해결 방안을 정리한 가이드입니다.

### 현재 상황
- ✅ **로컬 개발 환경**: Development Keys 사용 (정상 작동)
- ✅ **Vercel 배포 환경**: Development Keys 사용 (정상 작동)
- ⚠️ **문제점**: Production 환경에서 Development Keys 사용 중 (임시 해결책)

### 목표
- 🎯 커스텀 도메인 없는 새로운 Production Keys 생성
- 🎯 Vercel Production 환경에 적용
- 🎯 로컬 개발은 Development Keys 유지

---

## 🔍 문제 원인 분석

### Production Key의 Base64 인코딩 문제

현재 Production Publishable Key:
```
pk_live_Y2xlcmsuZmFtaWx5b2ZmaWNlcy52aXAk
```

Base64 디코딩 결과:
```
clerk.familyoffices.vip$
```

**문제점**:
- 커스텀 도메인(`clerk.familyoffices.vip`)이 키에 하드코딩됨
- 환경 변수로 도메인 오버라이드 불가능
- localhost에서 커스텀 도메인 접근 불가 → 타임아웃 에러

### Development Key의 정상 작동 이유

Development Publishable Key:
```
pk_test_aG9seS10YXBpci05OC5jbGVyay5hY2NvdW50cy5kZXYk
```

Base64 디코딩 결과:
```
holy-tapir-98.clerk.accounts.dev$
```

**정상 작동 이유**:
- Clerk 기본 도메인 사용
- 별도 DNS 설정 불필요
- localhost와 production 모두 접근 가능

---

## 🛠️ 해결 방안

### 옵션 1: 새 Clerk Application 생성 (권장)

커스텀 도메인 없는 새로운 Clerk Application을 생성합니다.

#### 단계별 가이드

**1. 새 Application 생성**
```
Clerk Dashboard → Applications → Create Application
- Application name: FamilyOffice Production
- Environment: Production
- ⚠️ 중요: "Skip domain configuration" 선택
```

**2. Production Keys 복사**
```
새 Application → API Keys
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxx
- CLERK_SECRET_KEY=sk_live_xxxxxxxx
- CLERK_WEBHOOK_SECRET=whsec_xxxxxxxx (webhook 재설정 필요)
```

**3. Component Paths 설정**
```
새 Application → Paths
- Sign-in page: /auth/sign-in
- Sign-up page: /auth/sign-up
- After sign-in: /
- After sign-up: /
```

**4. Webhook 재설정**
```
새 Application → Webhooks → Add Endpoint
- URL: https://familyoffices.vip/api/webhooks/clerk
- Events: user.created, user.updated, user.deleted
- Secret: 자동 생성됨 (위 CLERK_WEBHOOK_SECRET에 복사)
```

**5. Vercel 환경 변수 업데이트**
```
Vercel Dashboard → Settings → Environment Variables
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 새 pk_live_xxx
- CLERK_SECRET_KEY: 새 sk_live_xxx
- CLERK_WEBHOOK_SECRET: 새 whsec_xxx
- Environment: Production
```

**6. 재배포**
```bash
# Git push로 자동 배포 트리거
git commit --allow-empty -m "chore: Update Clerk production keys"
git push origin main
```

---

### 옵션 2: 기존 Application에서 커스텀 도메인 제거

기존 Application의 커스텀 도메인을 제거합니다.

#### 단계별 가이드

**⚠️ 주의사항**:
- 기존 사용자 세션이 모두 로그아웃됨
- Production Keys가 새로 생성됨
- Webhook Secret도 재발급됨

**1. 커스텀 도메인 제거**
```
Clerk Dashboard → Domains
- clerk.familyoffices.vip 옆 "Remove" 클릭
- 확인 후 삭제
```

**2. 새 Production Keys 확인**
```
API Keys 탭에서 자동으로 재생성된 키 확인
- Publishable key가 기본 도메인 기반으로 변경됨
```

**3-6단계**: 옵션 1의 3-6단계와 동일

---

## ✅ 검증 절차

### 로컬 환경 검증 (변경 없음)
```bash
# .env.local 파일 확인
cat .env.local | grep CLERK

# 예상 결과 (Development Keys 유지)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aG9seS10YXBpci05OC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_wlsmFCog4T61v1dC0KJ2UJh6NQz2UzhixPwwshh4zE

# 개발 서버 시작
npm run dev

# http://localhost:3000 접속 후 확인:
# ✅ Console 에러 없음
# ✅ 로그인 기능 정상 작동
```

### Production 환경 검증

**1. Vercel 배포 확인**
```
Vercel Dashboard → Deployments
- 최신 배포 상태: Ready
- 로그에서 에러 없음 확인
```

**2. 프로덕션 사이트 테스트**
```
https://familyoffices.vip 접속

✅ 확인 사항:
- Console에 Clerk 에러 없음
- Network 탭에서 Clerk API 200 OK
- 로그인/회원가입 정상 작동
- Premium Overlay 팝업 로그인 기능 작동
```

**3. 네트워크 탭 검증**
```javascript
// 정상적으로 로드되어야 하는 리소스
GET https://holy-tapir-98.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js
Status: 200 OK

GET https://api.clerk.com/v1/client?_clerk_js_version=5.x.x
Status: 200 OK
```

---

## 📝 환경별 Keys 정리

### 로컬 개발 환경 (.env.local)
```bash
# Development Keys (변경 없음)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aG9seS10YXBpci05OC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_wlsmFCog4T61v1dC0KJ2UJh6NQz2UzhixPwwshh4zE
CLERK_WEBHOOK_SECRET=whsec_mP8IP+tWKwnTrWe/2X8mYgZXz9srvm5T

# Clerk URL Configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Vercel Production 환경
```bash
# 새 Production Keys (업데이트 필요)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_[새로_생성된_키]
CLERK_SECRET_KEY=sk_live_[새로_생성된_키]
CLERK_WEBHOOK_SECRET=whsec_[새로_생성된_키]

# Clerk URL Configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

---

## 🎯 추천 방안

### 옵션 1을 권장하는 이유

✅ **장점**:
- 기존 사용자 세션 유지
- 단계적 마이그레이션 가능
- 롤백이 쉬움 (기존 Application 보존)
- 테스트 후 전환 가능

❌ **단점**:
- 두 개의 Application 관리 필요 (일시적)
- 약간의 추가 설정 필요

### 옵션 2 주의사항

⚠️ **위험**:
- 모든 사용자 강제 로그아웃
- 즉시 적용 (롤백 불가)
- Production 다운타임 가능성

✅ **적합한 경우**:
- 사용자가 아직 없거나 매우 적음
- 즉시 적용이 필요한 경우

---

## 🚨 문제 해결

### 배포 후 여전히 로딩 중인 경우

**1. Vercel 환경 변수 확인**
```bash
# Vercel CLI로 확인
npx vercel env ls

# 또는 Dashboard에서 확인
Vercel → Settings → Environment Variables
```

**2. 캐시 클리어**
```bash
# Vercel에서 Redeploy with cache cleared
Vercel Dashboard → Deployments → 최신 배포 → ... → Redeploy
→ ✅ Clear build cache
```

**3. Console 에러 확인**
```javascript
// Chrome DevTools → Console
// 예상 에러 패턴:
❌ "Failed to load Clerk" → Keys 미적용
❌ "403 Forbidden" → Keys 권한 문제
✅ No errors → 정상 작동
```

---

## 📚 참고 자료

### Clerk Documentation
- [Publishable Keys](https://clerk.com/docs/deployments/clerk-environment-variables#publishable-key)
- [Frontend API Configuration](https://clerk.com/docs/deployments/custom-domains)
- [Webhook Setup](https://clerk.com/docs/integration/webhooks)

### 관련 코드 파일
- `/Users/jaehong/Developer/Projects/FamilyOffice/.env.local` - 로컬 환경 변수
- `/Users/jaehong/Developer/Projects/FamilyOffice/next.config.mjs` - CSP 설정
- `/Users/jaehong/Developer/Projects/FamilyOffice/middleware.ts` - 인증 미들웨어
- `/Users/jaehong/Developer/Projects/FamilyOffice/app/api/webhooks/clerk/route.ts` - Webhook 핸들러

---

## ✅ 완료 체크리스트

### 준비 단계
- [ ] Clerk Dashboard 접속 권한 확인
- [ ] Vercel Dashboard 접속 권한 확인
- [ ] 현재 사용자 수 파악 (옵션 선택 기준)

### 옵션 1: 새 Application 생성
- [ ] 새 Clerk Application 생성
- [ ] Production Keys 복사
- [ ] Component Paths 설정
- [ ] Webhook 재설정
- [ ] Vercel 환경 변수 업데이트
- [ ] 재배포 및 검증

### 옵션 2: 커스텀 도메인 제거
- [ ] 기존 Application에서 커스텀 도메인 제거
- [ ] 새 Production Keys 확인
- [ ] Vercel 환경 변수 업데이트
- [ ] 재배포 및 검증

### 검증 단계
- [ ] 로컬 환경 정상 작동 확인
- [ ] Production 환경 정상 작동 확인
- [ ] Console 에러 없음 확인
- [ ] 로그인/회원가입 기능 테스트
- [ ] Premium Overlay 팝업 테스트

---

**문서 작성일**: 2026-01-04
**마지막 업데이트**: 2026-01-04
**작성자**: Claude Code (SuperClaude)
