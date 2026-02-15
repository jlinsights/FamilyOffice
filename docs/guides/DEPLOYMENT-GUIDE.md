# 🚀 FamilyOffice S - 카카오 로그인 시스템 배포 가이드

완벽한 카카오 로그인과 Supabase 통합 시스템의 프로덕션 배포를 위한 종합 가이드입니다.

## 📋 배포 전 체크리스트

### ✅ 1. 개발 환경 준비사항

- [ ] Node.js 18+ 설치 확인
- [ ] npm 패키지 설치 완료 (`npm install`)
- [ ] 로컬 개발 서버 정상 작동 (`npm run dev`)
- [ ] TypeScript 컴파일 에러 없음 (`npm run build`)
- [ ] ESLint 검사 통과 (`npm run lint`)

### ✅ 2. 필수 계정 및 서비스 설정

#### Kakao Developers

- [ ] [Kakao Developers Console](https://developers.kakao.com/) 계정 생성
- [ ] 새 애플리케이션 등록
- [ ] REST API 키 발급
- [ ] Admin 키 발급 (선택사항)
- [ ] JavaScript 키 발급

#### Supabase

- [ ] [Supabase Console](https://supabase.com/) 프로젝트 생성
- [ ] 데이터베이스 URL 및 API 키 확인
- [ ] Service Role Key 확인

#### Vercel (배포 플랫폼)

- [ ] [Vercel](https://vercel.com/) 계정 생성
- [ ] GitHub 저장소 연결
- [ ] 도메인 설정 (선택사항)

## 🔧 1단계: 카카오 OAuth 설정

### 1.1 카카오 개발자 콘솔 설정

```bash
# 1. Kakao Developers Console 접속
https://developers.kakao.com/console/app

# 2. 새 애플리케이션 생성
- 앱 이름: FamilyOffice S
- 회사명: 귀하의 회사명
- 카테고리: 비즈니스
```

### 1.2 플랫폼 등록

```bash
# Web 플랫폼 추가
- 사이트 도메인: https://your-domain.com
- 개발 환경: http://localhost:3000 (개발용)
```

### 1.3 카카오 로그인 활성화

```bash
# 카카오 로그인 > 활성화 설정
✅ 카카오 로그인 활성화

# 동의항목 설정
✅ 프로필 정보 (필수): 닉네임, 프로필 사진
✅ 카카오계정 (선택): 이메일
```

### 1.4 Redirect URI 설정

```bash
# 개발환경
http://localhost:3000/auth/callback

# 프로덕션환경
https://your-domain.com/auth/callback
```

### 1.5 비즈니스 설정 (메시지 API 사용 시)

```bash
# 카카오톡 메시지 > 활성화
✅ 메시지 API 사용

# 비즈니스 인증 (선택)
- 사업자등록증 업로드
- 통신판매업신고 번호 입력
```

## 🗄️ 2단계: Supabase 데이터베이스 설정

### 2.1 프로젝트 생성

```bash
# 1. Supabase Console 접속
https://supabase.com/dashboard

# 2. 새 프로젝트 생성
- 프로젝트명: familyoffice-s
- 데이터베이스 비밀번호: 강력한 비밀번호 설정
- 리전: Northeast Asia (Seoul) - 권장
```

### 2.2 OAuth 프로바이더 설정

```bash
# Authentication > Providers > Kakao
✅ Enable Kakao provider

# 설정값:
Client ID (REST API Key): YOUR_KAKAO_REST_API_KEY
Client Secret (Client Secret Key): YOUR_KAKAO_CLIENT_SECRET
Redirect URL: https://your-project-ref.supabase.co/auth/v1/callback
```

### 2.3 RLS 정책 적용

```sql
-- Supabase SQL Editor에서 실행
-- /lib/supabase/rls-policies.sql 파일 내용 전체 복사하여 실행

-- 주요 정책:
-- 1. 사용자는 자신의 프로필만 조회/수정
-- 2. 관리자는 모든 데이터 접근 가능
-- 3. 토큰 암호화 자동 적용
-- 4. 감사 로그 시스템 구축
```

### 2.4 데이터베이스 테이블 확인

```sql
-- 필수 테이블이 존재하는지 확인
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'consultations');

-- users 테이블 구조 확인
\d users

-- RLS 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'users';
```

## 🌍 3단계: 환경 변수 설정

### 3.1 개발 환경 (.env.local)

```bash
# 카카오 API 설정
KAKAO_REST_API_KEY=your_kakao_rest_api_key
KAKAO_ADMIN_KEY=your_kakao_admin_key  # 선택사항
KAKAO_JAVASCRIPT_KEY=your_kakao_js_key
KAKAO_PIXEL_ID=8992336493423513326

# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 애플리케이션 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# 보안 설정
NEXTAUTH_SECRET=your_nextauth_secret_32_chars_min
WEBHOOK_SECRET=your_webhook_secret
```

### 3.2 프로덕션 환경 (Vercel)

```bash
# Vercel Dashboard > Project > Settings > Environment Variables

# Production 환경 설정
KAKAO_REST_API_KEY=production_kakao_rest_api_key
KAKAO_ADMIN_KEY=production_kakao_admin_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=production_service_role_key
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
NODE_ENV=production
```

## 🧪 4단계: 테스트 및 검증

### 4.1 로컬 환경 테스트

```bash
# 1. 개발 서버 시작
npm run dev

# 2. 기본 기능 테스트
- http://localhost:3000 접속
- 카카오 로그인 버튼 클릭
- OAuth 플로우 정상 작동 확인
- 프로필 페이지 접속 확인

# 3. 통합 테스트 실행
npm run test:integration

# 4. E2E 테스트 실행
npm run test:e2e
```

### 4.2 API 엔드포인트 테스트

```bash
# 카카오 OAuth 상태 확인
curl -X GET "http://localhost:3000/api/auth/kakao/status"

# 사용자 프로필 API 테스트 (인증 후)
curl -X GET "http://localhost:3000/api/user/profile" \
  -H "Authorization: Bearer your_access_token"

# 카카오 메시지 템플릿 테스트
curl -X POST "http://localhost:3000/api/kakao/message/template" \
  -H "Content-Type: application/json" \
  -d '{"type": "welcome", "name": "테스트"}'
```

### 4.3 모니터링 시스템 테스트

```bash
# 모니터링 대시보드 접속
http://localhost:3000/admin/monitoring

# 메트릭 API 확인
curl -X GET "http://localhost:3000/api/monitoring/metrics" \
  -H "Authorization: Bearer admin_token"

# 시스템 헬스 체크
curl -X GET "http://localhost:3000/api/health"
```

## 🚀 5단계: Vercel 배포

### 5.1 저장소 연결

```bash
# 1. GitHub에 코드 푸시
git add .
git commit -m "🚀 카카오 로그인 시스템 프로덕션 배포 준비"
git push origin main

# 2. Vercel Dashboard에서 GitHub 저장소 연결
- Import Git Repository
- 저장소 선택: your-username/FamilyOffice
- Framework Preset: Next.js 자동 감지
```

### 5.2 배포 설정

```bash
# Vercel 프로젝트 설정
Build Command: npm run build
Output Directory: .next (자동 설정)
Install Command: npm install
Node.js Version: 18.x (권장)
```

### 5.3 도메인 설정 (선택사항)

```bash
# 커스텀 도메인 설정
- Vercel Dashboard > Project > Settings > Domains
- 도메인 추가: your-domain.com
- DNS 설정: Vercel 네임서버 또는 A/CNAME 레코드
- SSL 인증서: 자동 생성
```

## 🔍 6단계: 프로덕션 검증

### 6.1 배포 후 필수 확인 사항

```bash
# 1. 사이트 접속 확인
https://your-domain.com

# 2. 카카오 로그인 테스트
- 로그인 버튼 클릭
- OAuth 플로우 완료
- 프로필 정보 표시 확인

# 3. 데이터베이스 연결 확인
- Supabase 대시보드에서 새 사용자 등록 확인
- RLS 정책 작동 확인

# 4. 모니터링 시스템 확인
- 인증 이벤트 로그 기록 확인
- 성능 메트릭 수집 확인
```

### 6.2 성능 최적화 확인

```bash
# Core Web Vitals 측정
https://pagespeed.web.dev/

# 목표 지표:
- Largest Contentful Paint (LCP): < 2.5초
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

# Vercel Analytics 확인
- 페이지 로드 시간
- 사용자 인터랙션 메트릭
- 에러율 모니터링
```

### 6.3 보안 점검

```bash
# SSL 인증서 확인
https://www.ssllabs.com/ssltest/

# OWASP 보안 점검
- XSS 방지 확인
- SQL 인젝션 방지 확인
- CSRF 토큰 검증
- 민감 정보 노출 점검

# 카카오 API 보안
- REST API 키 노출 여부 확인
- Admin 키 서버사이드만 사용 확인
- 토큰 저장 방식 검증
```

## 🔧 7단계: 모니터링 및 유지보수

### 7.1 로그 모니터링 설정

```bash
# Vercel Functions 로그 확인
vercel logs --follow

# Supabase 로그 모니터링
- Dashboard > Logs > Functions
- 실시간 쿼리 모니터링
- 에러 알림 설정
```

### 7.2 알림 설정

```bash
# Slack 통합 (선택사항)
- Webhook URL 설정
- 에러 알림 임계값 설정
- 성능 저하 알림 설정

# PagerDuty 통합 (선택사항)
- 서비스 키 설정
- 에스컬레이션 정책 구성
- 온콜 로테이션 설정
```

### 7.3 백업 및 복구 계획

```bash
# Supabase 백업 설정
- 일일 자동 백업 활성화
- 백업 보존 기간 설정
- 복구 절차 문서화

# 환경 변수 백업
- 안전한 곳에 모든 키 백업
- 액세스 로테이션 계획
- 비상 연락처 정보 업데이트
```

## 🚨 문제 해결

### 자주 발생하는 문제와 해결책

#### 1. 카카오 로그인 실패

```bash
# 증상: OAuth 플로우에서 에러 발생
# 원인: Redirect URI 불일치

# 해결책:
1. 카카오 개발자 콘솔에서 Redirect URI 확인
2. 도메인 설정 정확성 검증
3. HTTPS 사용 여부 확인

# 디버깅:
console.log('Redirect URL:', process.env.NEXT_PUBLIC_APP_URL + '/auth/callback')
```

#### 2. Supabase RLS 정책 오류

```bash
# 증상: 데이터베이스 액세스 거부
# 원인: RLS 정책 설정 오류

# 해결책:
1. Supabase SQL Editor에서 정책 재확인
2. 사용자 권한 검증
3. 테이블 권한 설정 확인

# 디버깅:
SELECT * FROM pg_policies WHERE tablename = 'users';
```

#### 3. 성능 문제

```bash
# 증상: 느린 로딩 시간
# 원인: 비효율적인 쿼리 또는 캐시 미스

# 해결책:
1. Supabase 슬로우 쿼리 분석
2. 캐시 전략 재검토
3. 이미지 최적화 확인

# 모니터링:
- Vercel Analytics 성능 탭 확인
- Supabase Performance 모니터링
```

#### 4. 환경 변수 문제

```bash
# 증상: API 키 관련 오류
# 원인: 환경 변수 설정 오류

# 해결책:
1. Vercel Dashboard에서 환경 변수 재확인
2. 로컬 .env.local 파일 검증
3. 키 값 앞뒤 공백 제거

# 확인:
console.log('Environment check:', {
  hasKakaoKey: !!process.env.KAKAO_REST_API_KEY,
  hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL
});
```

## 🎯 성공 지표

### 배포 완료 확인 체크리스트

- [ ] ✅ 사이트 정상 접속 (200 응답)
- [ ] ✅ 카카오 로그인 완전 작동
- [ ] ✅ 사용자 데이터 Supabase 저장 확인
- [ ] ✅ 프로필 페이지 정상 표시
- [ ] ✅ 모니터링 시스템 데이터 수집 중
- [ ] ✅ 에러 알림 시스템 작동
- [ ] ✅ 성능 지표 목표치 달성
- [ ] ✅ 보안 점검 완료
- [ ] ✅ 백업 시스템 구축 완료

### 성능 목표

- **페이지 로드 시간**: < 3초 (3G 네트워크)
- **로그인 완료 시간**: < 5초
- **API 응답 시간**: < 200ms
- **업타임**: 99.9%
- **에러율**: < 0.1%

## 📞 지원 및 문의

### 기술 지원

- **카카오 개발자**: https://devtalk.kakao.com/
- **Supabase 지원**: https://supabase.com/support
- **Vercel 지원**: https://vercel.com/help

### 추가 문서

- [카카오 API 문서](https://developers.kakao.com/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

---

## 🎉 축하합니다!

FamilyOffice S 카카오 로그인 시스템이 성공적으로 배포되었습니다. 이제 사용자들이 안전하고 편리하게 카카오 계정으로 로그인하여 프리미엄 패밀리오피스 서비스를 이용할 수 있습니다.

**배포 일시**: **\*\***\_\_\_**\*\***
**배포 버전**: v1.0.0
**담당자**: **\*\***\_\_\_**\*\***
