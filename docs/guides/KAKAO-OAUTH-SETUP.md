# 🔐 FamilyOffice S - 카카오 OAuth 설정 완벽 가이드

카카오 로그인을 FamilyOffice S에 완벽하게 통합하기 위한 단계별 설정 가이드입니다.

## 📋 사전 준비사항

### ✅ 필요한 정보

- [ ] 카카오계정 (개발자 등록용)
- [ ] 사업자등록증 (비즈니스 API 사용 시)
- [ ] 서비스 도메인 정보
- [ ] 개발/운영 환경 URL

### ✅ 기술 요구사항

- [ ] HTTPS 지원 도메인 (프로덕션)
- [ ] Supabase 프로젝트 준비 완료
- [ ] Next.js 애플리케이션 빌드 가능

## 🚀 1단계: 카카오 개발자 계정 생성

### 1.1 개발자 등록

```bash
# 1. 카카오 개발자 콘솔 접속
https://developers.kakao.com/

# 2. 로그인 후 개발자 등록
- 개인정보 수집 및 이용 동의
- 개발자 이용약관 동의
- 휴대폰 인증

# 3. 개발자 정보 입력
개발자 유형: 개인개발자 / 사업자
이름: 실명
이메일: 연락 가능한 이메일
휴대폰: 인증받은 번호
```

### 1.2 애플리케이션 생성

```bash
# 애플리케이션 추가하기
앱 이름: FamilyOffice S
회사명: (사업자의 경우 정확한 회사명)
카테고리: 비즈니스
서비스 설명: 프리미엄 패밀리오피스 서비스
```

## 🔧 2단계: 앱 기본 정보 설정

### 2.1 앱 키 확인

```bash
# 생성된 앱 > 앱 키 탭에서 확인
JavaScript 키: 클라이언트에서 사용
REST API 키: 서버 API 호출용 (주로 사용)
Native 앱 키: 모바일 앱용 (사용 안 함)
Admin 키: 관리자 API용 (선택적)

# 환경 변수로 저장할 키들:
KAKAO_JAVASCRIPT_KEY=JavaScript_키_값
KAKAO_REST_API_KEY=REST_API_키_값
KAKAO_ADMIN_KEY=Admin_키_값  # 선택사항
```

### 2.2 플랫폼 등록

```bash
# 플랫폼 탭 > Web 플랫폼 등록

# 개발 환경
사이트 도메인: http://localhost:3000

# 프로덕션 환경
사이트 도메인: https://familyoffices.vip
(또는 https://your-custom-domain.com)

# 주의사항:
- HTTP는 localhost에서만 허용
- HTTPS 필수 (프로덕션)
- 서브도메인별 별도 등록 필요
```

## 🔑 3단계: 카카오 로그인 설정

### 3.1 카카오 로그인 활성화

```bash
# 제품 설정 > 카카오 로그인
✅ 카카오 로그인 활성화

# 상태: 검토 중 → 서비스 중으로 변경 대기
# 보통 1-2일 내 자동 승인 (개인 서비스)
```

### 3.2 Redirect URI 설정

```bash
# Redirect URI 등록 (정확히 입력!)

# 개발 환경
http://localhost:3000/auth/callback

# 프로덕션 환경
https://familyoffices.vip/auth/callback

# Supabase OAuth 콜백 (중요!)
https://your-project-ref.supabase.co/auth/v1/callback

# 주의사항:
- 경로까지 정확히 일치해야 함
- 쿼리 파라미터는 제외
- 대소문자 구분
- 마지막 슬래시(/) 주의
```

### 3.3 동의항목 설정

```bash
# 개인정보 탭에서 설정

# 필수 동의항목
✅ 닉네임: 필수 (서비스에 필수)
✅ 프로필 사진: 필수 (사용자 경험 향상)

# 선택 동의항목
✅ 카카오계정(이메일): 선택 (연락처로 활용)
✅ 이름: 선택 (상담 서비스용)
✅ 연령대: 선택 (맞춤 서비스)
✅ 성별: 선택 (맞춤 서비스)

# 설정 시 주의사항:
- 필수 항목은 신중히 선택
- 사용자가 거부 시 로그인 불가
- 선택 항목은 서비스에서 예외 처리 필요
```

## 💬 4단계: 메시지 API 설정 (선택사항)

### 4.1 카카오톡 메시지 활성화

```bash
# 제품 설정 > 카카오톡 메시지
✅ 메시지 API 사용

# 메시지 유형:
- 나에게 보내기: 개발/테스트용
- 친구에게 보내기: 실제 서비스용 (비즈니스 인증 필요)
```

### 4.2 템플릿 등록

```bash
# 내 애플리케이션 > 카카오톡 메시지 > 템플릿

# 기본 템플릿 등록:
1. 회원가입 환영 메시지
2. 상담 예약 확인 메시지
3. 뉴스레터 구독 안내
4. 세미나 신청 완료 메시지

# 템플릿 승인 과정:
검토 요청 → 카카오 검토 (1-3일) → 승인/반려
```

### 4.3 비즈니스 채널 연결 (고급)

```bash
# 메시지 전송을 위해 비즈니스 채널 필요

# 카카오톡 채널 관리자센터
https://center-pf.kakao.com/

# 채널 생성:
채널명: FamilyOffice S
카테고리: 금융/투자
채널 소개: 프리미엄 패밀리오피스 서비스
채널 아이디: @familyoffices (예시)

# 채널 - 앱 연결:
채널 관리 > 관리 > 상세설정 > 카카오 로그인 연결
```

## 🔧 5단계: Supabase OAuth 설정

### 5.1 Supabase OAuth 프로바이더 설정

```bash
# Supabase Dashboard 접속
https://supabase.com/dashboard/project/your-project/auth

# Authentication > Providers > Kakao
✅ Enable Kakao provider

# OAuth 설정:
Client ID: REST_API_키_입력
Client Secret: 비워둠 (카카오는 Client Secret 사용 안 함)
Redirect URL: https://your-project-ref.supabase.co/auth/v1/callback
```

### 5.2 추가 OAuth 설정

```bash
# Site URL 설정 (중요!)
Site URL: https://familyoffices.vip
(또는 http://localhost:3000 개발 시)

# Additional Redirect URLs
http://localhost:3000/**  # 개발환경
https://familyoffices.vip/**  # 프로덕션
https://*.vercel.app/**  # Vercel 미리보기

# JWT Settings
JWT expiry: 3600 (1시간, 기본값)
Refresh token rotation: ✅ Enabled
```

### 5.3 카카오 OAuth 스코프 설정

```bash
# Provider Scopes (선택사항)
profile_nickname: 닉네임 조회
profile_image: 프로필 사진 조회
account_email: 이메일 조회

# 코드에서 설정하는 경우:
queryParams: {
  scope: 'profile_nickname profile_image account_email'
}
```

## 🧪 6단계: 테스트 및 디버깅

### 6.1 로컬 환경 테스트

```bash
# .env.local 파일 생성
KAKAO_REST_API_KEY=your_rest_api_key
KAKAO_JAVASCRIPT_KEY=your_javascript_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 테스트 실행
npm run dev

# 브라우저에서 테스트:
1. http://localhost:3000 접속
2. 카카오 로그인 버튼 클릭
3. 카카오 로그인 페이지 이동 확인
4. 로그인 완료 후 콜백 처리 확인
```

### 6.2 디버깅 도구 활용

```bash
# Chrome DevTools 네트워크 탭에서 확인
1. OAuth 요청 URL 정확성
2. 응답 코드 (302 → 200)
3. 에러 메시지 상세 내용

# Supabase Auth 로그 확인
Dashboard > Authentication > Users
새로 등록된 사용자 확인

# 자주 발생하는 오류와 해결:
Error: invalid_client
→ REST API 키 확인, Client ID 재설정

Error: redirect_uri_mismatch
→ Redirect URI 정확성 재확인

Error: unauthorized_client
→ 카카오 로그인 활성화 상태 확인
```

### 6.3 프로덕션 배포 전 체크

```bash
# 카카오 개발자 콘솔 체크리스트:
✅ 앱 상태: 서비스 중
✅ 플랫폼: HTTPS 도메인 등록
✅ Redirect URI: 프로덕션 URL 포함
✅ 동의항목: 최종 검토 완료

# Supabase 설정 체크리스트:
✅ OAuth Provider: 카카오 활성화
✅ Site URL: 프로덕션 도메인 설정
✅ RLS 정책: 프로덕션 배포 완료
✅ 환경 변수: Vercel에 설정 완료
```

## 📱 7단계: 고급 설정

### 7.1 모바일 최적화

```bash
# 모바일 환경 고려사항:
- 카카오톡 인앱브라우저 호환성
- 반응형 로그인 UI
- 터치 최적화된 버튼 크기

# meta 태그 설정:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="mobile-web-app-capable" content="yes">
```

### 7.2 로그인 UX 개선

```bash
# 로그인 버튼 최적화:
- 카카오 브랜드 가이드라인 준수
- 로딩 상태 표시
- 에러 메시지 한국어 제공
- 로그인 유지 옵션

# 추가 기능:
- 소셜 로그인 통합 (네이버, 구글 등)
- 이메일 로그인 대안 제공
- 게스트 모드 지원
```

### 7.3 보안 강화

```bash
# 보안 설정:
- CSRF 토큰 검증
- State 매개변수 활용
- 토큰 저장 보안 (httpOnly)
- API 키 환경변수 관리

# 모니터링:
- 로그인 시도 로깅
- 이상 활동 감지
- 세션 타임아웃 설정
```

## 🚨 트러블슈팅

### 자주 발생하는 문제들

#### 1. Redirect URI Mismatch

```bash
# 문제: OAuth 콜백에서 URI 불일치 오류
# 원인: 등록된 URI와 실제 요청 URI 불일치

# 해결 방법:
1. 카카오 개발자 콘솔에서 Redirect URI 재확인
   등록: https://familyoffices.vip/auth/callback
   실제: https://familyoffices.vip/auth/callback

2. 대소문자, 쿼리 파라미터, 슬래시 등 정확히 일치 확인

3. 개발/프로덕션 환경별 URI 모두 등록
   - http://localhost:3000/auth/callback
   - https://your-domain.com/auth/callback
   - https://your-project.supabase.co/auth/v1/callback
```

#### 2. API 키 인식 오류

```bash
# 문제: API 키를 인식하지 못함
# 원인: 환경변수 설정 오류 또는 키 값 문제

# 해결 방법:
1. .env.local 파일 확인
   KAKAO_REST_API_KEY=실제_키_값
   (따옴표 없이, 공백 없이)

2. Vercel 환경변수 확인
   Dashboard > Settings > Environment Variables

3. 키 값 앞뒤 공백 제거 확인

4. 개발자 콘솔에서 키 재생성 시도
```

#### 3. 카카오 로그인 비활성화

```bash
# 문제: "카카오 로그인이 비활성화되었습니다"
# 원인: 앱 심사 미완료 또는 정책 위반

# 해결 방법:
1. 카카오 개발자 콘솔에서 앱 상태 확인
   내 애플리케이션 > 앱 설정 > 상태

2. 심사 요청 또는 재심사 신청
   - 서비스 URL 제공
   - 개인정보처리방침 URL
   - 이용약관 URL

3. 정책 준수 확인
   - 성인 콘텐츠 금지
   - 스팸/광고 금지
   - 카카오 브랜드 가이드라인 준수
```

#### 4. 토큰 만료 문제

```bash
# 문제: 로그인 후 바로 토큰 만료
# 원인: 토큰 갱신 로직 오류

# 해결 방법:
1. Supabase 토큰 갱신 설정 확인
   JWT expiry 시간 조정

2. 자동 토큰 갱신 구현 확인
   onAuthStateChange 이벤트 처리

3. 토큰 저장소 확인
   localStorage vs httpOnly cookie
```

## ✅ 최종 체크리스트

### 🔐 카카오 개발자 콘솔

- [ ] 애플리케이션 생성 완료
- [ ] 플랫폼 등록 (Web) 완료
- [ ] 카카오 로그인 활성화 완료
- [ ] Redirect URI 정확 설정
- [ ] 동의항목 최적화 설정
- [ ] API 키 발급 완료

### 🗄️ Supabase 설정

- [ ] OAuth 프로바이더 활성화
- [ ] Client ID (REST API 키) 설정
- [ ] Redirect URL 설정 완료
- [ ] Site URL 올바른 설정
- [ ] RLS 정책 배포 완료

### 🌐 애플리케이션 설정

- [ ] 환경변수 모든 키 설정
- [ ] OAuth 콜백 라우트 구현
- [ ] 에러 처리 로직 구현
- [ ] 사용자 인터페이스 최적화
- [ ] 모바일 반응형 대응

### 🧪 테스트 완료

- [ ] 로컬 환경 로그인 테스트
- [ ] 프로덕션 환경 로그인 테스트
- [ ] 모바일 기기 테스트
- [ ] 에러 시나리오 테스트
- [ ] 성능 테스트 완료

## 🎉 성공!

FamilyOffice S의 카카오 OAuth 설정이 완료되었습니다.

**다음 단계:**

1. 사용자 테스트 및 피드백 수집
2. 모니터링 시스템으로 로그인 패턴 분석
3. 추가 소셜 로그인 옵션 검토
4. 보안 정기 점검 계획 수립

**지원 리소스:**

- [카카오 개발자 문서](https://developers.kakao.com/docs)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Next.js Auth 패턴](https://nextjs.org/docs/authentication)

---

**설정 완료 일시**: **\*\***\_\_\_**\*\***  
**담당자**: **\*\***\_\_\_**\*\***  
**버전**: v1.0.0
