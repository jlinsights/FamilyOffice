# 1Password Secret 관리 마이그레이션 가이드

## 📋 개요

환경 변수를 `.env.local` 파일에서 1Password로 마이그레이션하여 보안성을 강화하고 팀 협업을 개선합니다.

### 마이그레이션 이점

✅ **보안 강화**:

- 평문 환경 변수 파일 제거
- Git 저장소에서 민감한 정보 완전 분리
- 암호화된 Vault에 안전하게 보관

✅ **팀 협업 개선**:

- 팀원 간 환경 변수 공유 간소화
- 권한 기반 액세스 제어
- 변경 사항 자동 동기화

✅ **생산성 향상**:

- 환경 변수 자동 동기화 (`npm run dev:1p`)
- 수동 `.env.local` 관리 불필요
- 일관된 개발 환경 유지

---

## 🔧 사전 준비

### 1. 1Password 계정 및 앱

**1Password 계정 생성** (아직 없는 경우):

- https://1password.com/sign-up
- Personal 또는 Teams 플랜 선택
- 이메일 인증 완료

**1Password 앱 설치**:

```bash
# macOS
brew install --cask 1password

# Windows/Linux
https://1password.com/downloads
```

### 2. 1Password CLI 설치

```bash
# macOS
brew install --cask 1password-cli

# Linux (Debian/Ubuntu)
curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
  sudo gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] \
  https://downloads.1password.com/linux/debian/$(dpkg --print-architecture) stable main" | \
  sudo tee /etc/apt/sources.list.d/1password.list
sudo apt update && sudo apt install 1password-cli

# Windows
# https://1password.com/downloads/command-line/
```

**설치 확인**:

```bash
op --version
# 예상 출력: 2.x.x
```

### 3. 필수 종속성

```bash
# TypeScript 실행기 (이미 설치되어 있음)
npm install -D tsx

# 프로젝트 종속성 확인
npm install
```

---

## 🚀 자동 마이그레이션 (권장)

### Step 1: 1Password 초기 설정

```bash
# 1Password CLI 로그인
npm run 1password:login
# 또는
op signin

# 1Password 계정 정보 입력
# - Account URL (예: your-team.1password.com)
# - Email
# - Secret Key
# - Master Password
```

### Step 2: Vault 및 카테고리 생성

```bash
npm run 1password:setup
```

**생성되는 항목**:

- Vault: `FamilyOffice`
- 12개 카테고리 아이템:
  - Clerk-Auth
  - Supabase-Database
  - Google-APIs
  - Naver-APIs
  - OpenAI-API
  - Redis-Cache
  - Email-Resend
  - Newsletter-Beehiiv
  - Analytics-Tracking
  - Financial-APIs
  - Monitoring-Sentry
  - Security-Webhooks

### Step 3: 자동 마이그레이션 실행

```bash
npm run secrets:migrate
```

**진행 과정**:

1. `.env.local` 파일 읽기
2. 환경 변수를 카테고리별로 분류
3. 1Password Vault에 자동 저장
4. 마이그레이션 결과 요약 표시

**예상 출력**:

```
🔐 1Password에서 환경 변수 동기화 중...

📦 Clerk-Auth:
  ✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ✅ CLERK_SECRET_KEY
  ✅ CLERK_WEBHOOK_SECRET
  ...

🎉 마이그레이션 완료!
   마이그레이션된 환경 변수: 42
   건너뛴 환경 변수: 3
```

### Step 4: 검증

```bash
npm run secrets:validate
```

**검증 항목**:

- 필수 환경 변수 존재 확인
- 선택 환경 변수 존재 확인
- 카테고리별 완성도 점검

**예상 출력**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Secret Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Core Authentication & Database:
  ✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ✅ CLERK_SECRET_KEY
  ...

필수 환경 변수: 8/8
선택 환경 변수: 34/37

✅ 검증 성공: 모든 환경 변수가 설정되었습니다!
```

### Step 5: 1Password 연동 개발

```bash
# 1Password에서 환경 변수 동기화 후 개발 서버 시작
npm run dev:1p

# 또는 수동 동기화 후 개발
npm run secrets:sync
npm run dev
```

---

## 📝 수동 마이그레이션

자동 마이그레이션이 실패하거나 세밀한 제어가 필요한 경우 수동으로 진행합니다.

### Step 1: 1Password 앱에서 작업

**1. Vault 접속**:

- 1Password 앱 실행
- 좌측 사이드바에서 `FamilyOffice` Vault 선택

**2. 카테고리별 Secret 입력**:

#### Clerk-Auth 예시

1. `Clerk-Auth` 아이템 클릭
2. "Edit" 버튼 클릭
3. "Add Field" 클릭
4. 각 필드 추가:

```
Field Type: Password
Label: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: [.env.local에서 복사]

Field Type: Password
Label: CLERK_SECRET_KEY
Value: [.env.local에서 복사]

Field Type: Password
Label: CLERK_WEBHOOK_SECRET
Value: [.env.local에서 복사]
```

5. "Save" 클릭

**3. 모든 카테고리 반복**:

- Supabase-Database
- Google-APIs
- Naver-APIs
- ... (나머지 카테고리)

### Step 2: 검증 및 동기화

```bash
# 1Password에서 .env.local로 동기화
npm run secrets:sync

# 검증
npm run secrets:validate

# 개발 서버 시작
npm run dev
```

---

## 🗂️ Secret 카테고리 구조

### Clerk-Auth (인증)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY    # Clerk Publishable Key
CLERK_SECRET_KEY                      # Clerk Secret Key
CLERK_WEBHOOK_SECRET                  # Webhook 서명 검증
NEXT_PUBLIC_CLERK_SIGN_IN_URL         # 로그인 페이지 URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL         # 회원가입 페이지 URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL   # 로그인 후 리다이렉트
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL   # 회원가입 후 리다이렉트
```

### Supabase-Database (데이터베이스)

```
NEXT_PUBLIC_SUPABASE_URL              # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY         # 익명 키 (클라이언트용)
SUPABASE_SERVICE_ROLE_KEY             # 서비스 역할 키 (서버용)
DATABASE_URL                          # PostgreSQL 연결 문자열
```

### Google-APIs (Google 서비스)

```
GOOGLE_SERVICE_ACCOUNT_EMAIL          # 서비스 계정 이메일
GOOGLE_PRIVATE_KEY                    # 서비스 계정 Private Key
GOOGLE_PROJECT_ID                     # Google Cloud 프로젝트 ID
GOOGLE_SEARCH_CONSOLE_PROPERTY        # Search Console 속성
GOOGLE_ANALYTICS_PROPERTY_ID          # GA4 속성 ID
```

### Naver-APIs (네이버 서비스)

```
NAVER_CLIENT_ID                       # 네이버 클라이언트 ID
NAVER_CLIENT_SECRET                   # 네이버 클라이언트 Secret
NAVER_WEBMASTER_SITE_URL              # 웹마스터 도구 사이트 URL
NAVER_BLOG_ID                         # 네이버 블로그 ID
```

### OpenAI-API (AI 서비스)

```
OPENAI_API_KEY                        # OpenAI API 키
SERPER_API_KEY                        # Serper.dev API 키
```

### Redis-Cache (캐싱)

```
REDIS_URL                             # Redis 연결 URL
REDIS_HOST                            # Redis 호스트
REDIS_PORT                            # Redis 포트
REDIS_PASSWORD                        # Redis 비밀번호
```

### Email-Resend (이메일)

```
RESEND_API_KEY                        # Resend API 키
NEXT_PUBLIC_RESEND_FROM_EMAIL         # 발신 이메일 주소
```

### Newsletter-Beehiiv (뉴스레터)

```
BEEHIIV_API_KEY                       # Beehiiv API 키
BEEHIIV_PUBLICATION_ID                # Publication ID
```

### Analytics-Tracking (분석)

```
NEXT_PUBLIC_GA_MEASUREMENT_ID         # Google Analytics 측정 ID
NEXT_PUBLIC_GTM_ID                    # Google Tag Manager ID
NEXT_PUBLIC_GA_ID                     # GA4 ID
NEXT_PUBLIC_KAKAO_PIXEL_ID            # 카카오 픽셀 ID
```

### Financial-APIs (금융 API)

```
ALPHA_VANTAGE_API_KEY                 # Alpha Vantage API 키
YAHOO_FINANCE_API_KEY                 # Yahoo Finance API 키
```

### Monitoring-Sentry (모니터링)

```
NEXT_PUBLIC_SENTRY_DSN                # Sentry 클라이언트 DSN
SENTRY_DSN                            # Sentry 서버 DSN
SENTRY_ORG                            # Sentry 조직
SENTRY_PROJECT                        # Sentry 프로젝트
```

### Security-Webhooks (보안)

```
SEO_WEBHOOK_SECRET                    # SEO Webhook Secret
AUTOMATION_SECRET_KEY                 # 자동화 Secret 키
CRON_SECRET                           # Cron Job Secret
SLACK_SECURITY_WEBHOOK_URL            # Slack Webhook URL
```

---

## 🔄 일상 워크플로우

### 개발 시작

```bash
# 1Password에서 환경 변수 동기화 후 개발 시작
npm run dev:1p

# 또는 분리해서 실행
npm run secrets:sync
npm run dev
```

### Secret 업데이트

**1Password 앱에서 업데이트**:

1. 1Password 앱 열기
2. FamilyOffice Vault → 해당 카테고리 선택
3. 필드 값 수정
4. Save

**터미널에서 동기화**:

```bash
npm run secrets:sync
```

### 새 Secret 추가

**1Password에 추가**:

1. 해당 카테고리 아이템 열기
2. "Add Field" 클릭
3. Field Type: Password
4. Label: 환경 변수 이름
5. Value: 값 입력
6. Save

**스크립트 업데이트** (필요시):

```typescript
// scripts/setup-secret-manager.ts
const SECRET_CATEGORIES = {
  'Category-Name': [
    'EXISTING_VAR',
    'NEW_VAR', // 추가
  ],
};
```

**동기화 및 검증**:

```bash
npm run secrets:sync
npm run secrets:validate
```

---

## 🎯 팀 협업 가이드

### 새 팀원 온보딩

**1. 1Password 접근 권한 부여**:

- 1Password Teams에서 팀원 초대
- FamilyOffice Vault 공유

**2. 팀원 환경 설정**:

```bash
# 1Password CLI 설치
brew install --cask 1password-cli

# 로그인
npm run 1password:login

# 환경 변수 동기화
npm run secrets:sync

# 검증
npm run secrets:validate

# 개발 시작
npm run dev
```

**소요 시간**: ~5분

### Secret 변경 공유

Secret을 변경하면 팀원들이 자동으로 최신 버전을 사용할 수 있습니다:

**변경자**:

1. 1Password에서 Secret 업데이트
2. 팀에 알림 (Slack, Discord 등)

**팀원**:

```bash
npm run secrets:sync  # 최신 Secret 가져오기
npm run dev          # 개발 서버 재시작
```

---

## 🔒 보안 Best Practices

### Git 저장소 보안

**1. .env.local 제외 확인**:

```bash
# .gitignore 확인
cat .gitignore | grep .env.local
# 출력: .env.local
```

**2. 기존 .env.local 히스토리 제거** (선택사항):

```bash
# Git 히스토리에서 완전히 제거
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env.local' \
  --prune-empty --tag-name-filter cat -- --all

# 강제 푸시 (주의!)
git push origin --force --all
```

### 1Password Vault 보안

**권한 관리**:

- **Read Only**: 대부분의 팀원
- **Edit**: 시니어 개발자, DevOps
- **Admin**: PM, CTO

**감사 로그**:

- 1Password Teams에서 모든 변경사항 추적
- 정기적으로 감사 로그 검토

### 정기 Security Audit

```bash
# 분기별 실행 권장
npm run secrets:validate

# 사용하지 않는 Secret 확인
# 1Password 앱에서 Last Used 필드 확인
```

---

## 🚨 문제 해결

### 1Password CLI 로그인 실패

**증상**:

```
❌ 1Password에 로그인되어 있지 않습니다.
```

**해결**:

```bash
# 로그아웃 후 재로그인
op signout
npm run 1password:login

# 계정 확인
op account list
```

### 환경 변수 누락

**증상**:

```
⚠️  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (누락됨)
```

**해결**:

1. 1Password 앱에서 해당 카테고리 확인
2. 필드 추가 또는 값 입력
3. 재동기화:

```bash
npm run secrets:sync
npm run secrets:validate
```

### 동기화 실패

**증상**:

```
❌ 에러 발생: Failed to fetch secret
```

**해결**:

```bash
# 1Password 재로그인
npm run 1password:login

# 수동으로 아이템 확인
op item get "Clerk-Auth" --vault="FamilyOffice"

# 재시도
npm run secrets:sync
```

### 스크립트 실행 권한 오류

**증상**:

```
Permission denied: ./scripts/setup-1password.sh
```

**해결**:

```bash
chmod +x scripts/*.sh
npm run 1password:setup
```

---

## 📚 참고 자료

### 1Password 문서

- [CLI Documentation](https://developer.1password.com/docs/cli)
- [CLI Reference](https://developer.1password.com/docs/cli/reference)
- [Best Practices](https://support.1password.com/security/)

### 프로젝트 파일

- `scripts/setup-1password.sh` - 초기 설정 스크립트
- `scripts/migrate-secrets.sh` - 마이그레이션 스크립트
- `scripts/setup-secret-manager.ts` - 동기화 스크립트
- `scripts/validate-secrets.ts` - 검증 스크립트
- `.env.example` - 환경 변수 템플릿

### package.json Scripts

```json
{
  "scripts": {
    "1password:login": "op signin",
    "1password:setup": "./scripts/setup-1password.sh",
    "secrets:migrate": "./scripts/migrate-secrets.sh",
    "secrets:sync": "tsx scripts/setup-secret-manager.ts",
    "secrets:validate": "tsx scripts/validate-secrets.ts",
    "dev:1p": "npm run secrets:sync && npm run dev"
  }
}
```

---

## ✅ 마이그레이션 체크리스트

### 준비 단계

- [ ] 1Password 계정 생성/로그인
- [ ] 1Password CLI 설치
- [ ] 프로젝트 종속성 설치 (`npm install`)

### 마이그레이션 단계

- [ ] 1Password 로그인 (`npm run 1password:login`)
- [ ] Vault 및 카테고리 생성 (`npm run 1password:setup`)
- [ ] 자동 마이그레이션 실행 (`npm run secrets:migrate`)
- [ ] 검증 (`npm run secrets:validate`)

### 정리 단계

- [ ] 1Password 연동 개발 테스트 (`npm run dev:1p`)
- [ ] .env.local 백업 (`cp .env.local .env.local.backup`)
- [ ] .env.local 삭제 (선택사항)
- [ ] Git 히스토리 정리 (선택사항)

### 팀 온보딩

- [ ] 팀원들에게 1Password 접근 권한 부여
- [ ] 온보딩 가이드 공유
- [ ] 정기 Security Audit 일정 설정

---

**문서 버전**: 1.0.0  
**최종 업데이트**: 2026-01-04  
**작성자**: Claude Code (SuperClaude)
