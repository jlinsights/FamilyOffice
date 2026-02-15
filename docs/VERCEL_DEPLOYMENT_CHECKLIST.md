# Vercel 배포 체크리스트

BMAD 키워드 추적 시스템을 Vercel 프로덕션 환경에 안전하게 배포하기 위한 완전한 체크리스트입니다.

---

## 🔧 배포 전 준비 (Pre-Deployment)

### 1. 로컬 환경 검증

- [ ] **TypeScript 타입 체크 통과**

  ```bash
  npm run typecheck
  # 0 errors expected
  ```

- [ ] **ESLint 검사 통과**

  ```bash
  npm run lint
  # No warnings or errors expected
  ```

- [ ] **환경 변수 검증 통과**

  ```bash
  npx tsx scripts/validate-env.ts
  # All tests should pass
  ```

- [ ] **통합 테스트 성공**

  ```bash
  # 로컬 dev 서버 시작
  npm run dev

  # 다른 터미널에서
  curl http://localhost:3000/api/test/bmad-integration?detailed=true
  # 모든 테스트 pass 확인
  ```

- [ ] **프로덕션 빌드 성공**
  ```bash
  npm run build
  # Build succeeded, 0 errors
  ```

---

## 🌐 외부 서비스 설정

### 2. Google Cloud Console

- [ ] **Google Cloud Project 생성 완료**
  - Project ID: `________________`
  - Project Number: `________________`

- [ ] **Google Analytics Data API 활성화**
  - API 상태: 활성화됨

- [ ] **서비스 계정 생성 및 키 다운로드**
  - 서비스 계정 이메일: `________________@________________.iam.gserviceaccount.com`
  - JSON 키 파일: 안전하게 보관됨

- [ ] **GA4 속성에 서비스 계정 권한 부여**
  - GA4 속성 ID: `________________`
  - 권한: 뷰어 (Viewer)
  - 확인: Google Analytics → 관리자 → 속성 액세스 관리

### 3. Serper.dev

- [ ] **Serper.dev 계정 생성**
  - 이메일: `________________`

- [ ] **API 키 발급**
  - API Key: `________________` (안전하게 보관)
  - 요금제: Free (2,500 검색/월) ✅

- [ ] **API 연결 테스트**
  ```bash
  curl -X POST https://google.serper.dev/search \
    -H 'X-API-KEY: YOUR_API_KEY' \
    -H 'Content-Type: application/json' \
    -d '{"q": "test", "gl": "kr", "hl": "ko"}'
  # 200 OK response expected
  ```

### 4. Supabase

- [ ] **Supabase 프로젝트 확인**
  - Project URL: `https://________________.supabase.co`
  - Project Ref ID: `________________`

- [ ] **마이그레이션 실행 완료**
  - `keyword_rankings` 테이블 생성 확인
  - 6개 인덱스 생성 확인
  - 2개 뷰 생성 확인
  - 2개 함수 생성 확인
  - RLS 정책 활성화 확인

- [ ] **API 키 확인**
  - Anon Key: `eyJ________________`
  - Service Role Key: `eyJ________________` (안전하게 보관)

---

## ⚙️ Vercel 프로젝트 설정

### 5. Vercel 프로젝트 생성

- [ ] **Vercel 프로젝트 연결**
  - GitHub 저장소: `________________`
  - 프로젝트 이름: `familyoffice` (또는 원하는 이름)
  - Framework: Next.js

- [ ] **빌드 설정 확인**
  - Build Command: `npm run vercel-build`
  - Output Directory: `.next`
  - Install Command: `npm install`

### 6. 환경 변수 설정 (Production)

**Google Analytics 4**:

- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - 값: `________________@________________.iam.gserviceaccount.com`
  - 환경: Production, Preview, Development

- [ ] `GOOGLE_PRIVATE_KEY`
  - 값: (JSON 파일의 private_key, 줄바꿈 포함)
  - 환경: Production, Preview, Development
  - ⚠️ 주의: `\n`을 실제 줄바꿈으로 변환

- [ ] `GOOGLE_PROJECT_ID`
  - 값: `________________`
  - 환경: Production, Preview, Development

- [ ] `GOOGLE_ANALYTICS_PROPERTY_ID`
  - 값: `________________` (숫자만)
  - 환경: Production, Preview, Development

**Serper.dev**:

- [ ] `SERPER_API_KEY`
  - 값: `________________`
  - 환경: Production, Preview, Development

**Supabase**:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - 값: `https://________________.supabase.co`
  - 환경: Production, Preview, Development

- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - 값: `eyJ________________`
  - 환경: Production, Preview, Development

- [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - 값: `eyJ________________`
  - 환경: Production, Preview, Development

**Vercel Cron**:

- [ ] `CRON_SECRET`
  - 값: `________________` (openssl rand -base64 32로 생성)
  - 환경: Production, Preview, Development

### 7. 기존 환경 변수 확인

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (기존)
- [ ] `CLERK_SECRET_KEY` (기존)
- [ ] `CLERK_WEBHOOK_SECRET` (기존)
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` (기존)

---

## 🚀 배포 실행

### 8. 첫 배포

- [ ] **환경 변수 저장 후 자동 배포 대기** (약 2-3분)
  - Vercel Dashboard → Deployments 탭 확인

- [ ] **또는 수동 배포**

  ```bash
  # Vercel CLI 설치 (미설치 시)
  npm install -g vercel

  # 프로덕션 배포
  vercel --prod
  ```

- [ ] **배포 상태 확인**
  - Status: Ready ✅
  - Build Logs: 0 errors
  - Function Logs: 정상 작동

### 9. Cron Job 설정

- [ ] **Cron Jobs 탭 확인**
  - Vercel Dashboard → 프로젝트 → Cron Jobs
  - Path: `/api/cron/daily-bmad-collection`
  - Schedule: `0 2 * * *` (UTC 2시 = KST 11시)

- [ ] **스케줄 조정 (선택사항)**
  - KST 새벽 2시로 변경하려면: `0 17 * * *`
  - `vercel.json` 수정 후 재배포

---

## ✅ 배포 후 검증 (Post-Deployment)

### 10. 프로덕션 환경 테스트

- [ ] **홈페이지 접속**

  ```
  https://your-domain.vercel.app
  # 또는 https://familyoffices.vip
  ```

- [ ] **환경 변수 검증 API**

  ```bash
  curl https://your-domain.vercel.app/api/test/bmad-integration
  # 모든 테스트 pass 확인
  ```

- [ ] **상세 테스트 결과**
  ```bash
  curl https://your-domain.vercel.app/api/test/bmad-integration?detailed=true
  # GA4, Serper, Supabase 연결 확인
  # End-to-End 테스트 성공 확인
  ```

### 11. Cron Job 테스트

- [ ] **수동 트리거 (POST)**

  ```bash
  curl -X POST https://your-domain.vercel.app/api/cron/daily-bmad-collection
  # 200 OK, collected: 40
  ```

- [ ] **Cron 엔드포인트 (GET with auth)**

  ```bash
  curl -X GET https://your-domain.vercel.app/api/cron/daily-bmad-collection \
    -H "Authorization: Bearer YOUR_CRON_SECRET"
  # 200 OK, collected: 40
  ```

- [ ] **Vercel Logs 확인**
  - Vercel Dashboard → Logs
  - 필터: `api/cron/daily-bmad-collection`
  - 성공 로그:
    ```
    🚀 Starting daily BMAD keyword ranking collection...
    ✅ Daily BMAD collection completed: { collected: 40, ... }
    ```

### 12. Supabase 데이터 확인

- [ ] **Supabase Table Editor**
  - `keyword_rankings` 테이블 열기
  - 최신 데이터 확인 (created_at DESC)
  - 40개 레코드 확인

- [ ] **뷰 테스트**

  ```sql
  SELECT * FROM latest_keyword_rankings LIMIT 10;
  SELECT * FROM category_average_rankings;
  ```

- [ ] **카테고리별 발견율 확인**
  - Behavioral: **_/10 (_**%)
  - Motivational: **_/10 (_**%)
  - Aspirational: **_/10 (_**%)
  - Decisional: **_/10 (_**%)

---

## 📊 모니터링 설정

### 13. Vercel Monitoring

- [ ] **Analytics 활성화**
  - Vercel Dashboard → Analytics
  - Web Vitals 추적 활성화

- [ ] **Log Drains 설정 (선택사항)**
  - 로그 통합 도구 연결 (Datadog, LogDNA 등)

### 14. 알림 설정 (선택사항)

- [ ] **Deployment 알림**
  - Vercel Dashboard → Settings → Notifications
  - Slack/Discord 웹훅 연결

- [ ] **Cron Job 실패 알림**
  - 스크립트에 오류 알림 로직 추가
  - Email/Slack 통합

---

## 🔒 보안 체크

### 15. 보안 검증

- [ ] **환경 변수 보안**
  - ✅ Private key는 Vercel 환경 변수에만 저장
  - ✅ .env.local 파일은 .gitignore에 포함
  - ✅ GitHub에 비밀 정보 노출 없음

- [ ] **API 엔드포인트 보호**
  - ✅ Cron Job은 CRON_SECRET으로 보호
  - ✅ Admin 페이지는 Clerk 인증으로 보호

- [ ] **Supabase RLS**
  - ✅ Row Level Security 활성화
  - ✅ 읽기: 공개, 쓰기: 인증 필요

### 16. Rate Limiting

- [ ] **Serper API Rate Limit 모니터링**
  - 무료 플랜: 2,500 검색/월
  - 일일 사용량: ~40 검색/일 = ~1,200/월
  - 여유: ~1,300 검색/월

- [ ] **Google Analytics API Quota**
  - 기본 할당량: 25,000 requests/day
  - 예상 사용량: ~1 request/day (수동 조회)

---

## 📈 성능 최적화

### 17. 캐싱 전략

- [ ] **Vercel Edge Caching**
  - Static 페이지 자동 캐싱
  - API 응답 캐시 헤더 설정 (선택사항)

- [ ] **Supabase Query Performance**
  - 인덱스 활용 확인
  - 느린 쿼리 모니터링

### 18. 비용 모니터링

- [ ] **Vercel 요금제 확인**
  - Hobby: 무료 (개인 프로젝트)
  - Pro: $20/월 (상용 프로젝트)

- [ ] **Supabase 요금제 확인**
  - Free: 500MB 데이터베이스
  - Pro: $25/월 (8GB 데이터베이스)

- [ ] **API 비용 추정**
  - Serper: Free (2,500 검색/월)
  - GA4 API: Free (25K requests/day)

---

## 🎯 배포 완료 확인

### 최종 체크리스트

- [ ] ✅ 모든 환경 변수 설정 완료
- [ ] ✅ Supabase 마이그레이션 실행 완료
- [ ] ✅ 프로덕션 빌드 성공
- [ ] ✅ 통합 테스트 통과 (5/5 tests pass)
- [ ] ✅ Cron Job 수동 테스트 성공
- [ ] ✅ Supabase에 실제 데이터 수집 확인
- [ ] ✅ 모니터링 및 알림 설정 완료
- [ ] ✅ 보안 검증 완료
- [ ] ✅ 문서화 완료

---

## 🔄 다음 단계 (Phase 3-4)

### Phase 3: 블로그 콘텐츠 AI 최적화

- [ ] AI 최적화 점수 70점 이상 목표
- [ ] FAQ 섹션 추가
- [ ] 구조화된 데이터 강화
- [ ] 내부 링크 최적화

### Phase 4: 실시간 알림 및 A/B 테스팅

- [ ] Slack/Discord 웹훅 알림 설정
- [ ] 순위 급변동 알림 (±10 이상)
- [ ] A/B 테스트 프레임워크 구축
- [ ] 월간 성과 리포트 자동 생성

---

## 📞 지원 및 문의

**배포 중 문제 발생 시**:

1. **Vercel Logs 확인**
   - Vercel Dashboard → Logs
   - 에러 메시지 및 스택 트레이스 확인

2. **환경 변수 재확인**

   ```bash
   npx tsx scripts/validate-env.ts
   ```

3. **통합 테스트 재실행**

   ```bash
   curl https://your-domain.vercel.app/api/test/bmad-integration?detailed=true
   ```

4. **문서 참조**
   - [PHASE2_SETUP_GUIDE.md](./PHASE2_SETUP_GUIDE.md)
   - [SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md)

---

## 📋 배포 완료 보고서 템플릿

```markdown
## BMAD 추적 시스템 배포 완료

**배포 일시**: 2025-01-\*\*
**배포자**: **\*\***\_\_**\*\*\*\***
**Vercel URL**: https://________________.vercel.app

### 환경 설정

- [x] Google Cloud Console 설정
- [x] Serper.dev API 키 발급
- [x] Supabase 마이그레이션 실행
- [x] Vercel 환경 변수 설정 (12개)

### 검증 결과

- [x] 통합 테스트: 5/5 pass
- [x] Cron Job 수동 테스트: 성공
- [x] 첫 데이터 수집: 40개 키워드
- [x] 카테고리별 발견율:
  - Behavioral: **/10 (**%)
  - Motivational: **/10 (**%)
  - Aspirational: **/10 (**%)
  - Decisional: **/10 (**%)

### 모니터링

- [x] Vercel Analytics 활성화
- [x] Cron Job 스케줄: 매일 UTC **시 (KST **시)
- [x] Supabase 데이터 저장 정상

### 다음 단계

- Phase 3: 블로그 AI 최적화
- Phase 4: 실시간 알림 설정

**비고**: **\*\***\_\_\_\_**\*\***
```

---

**작성일**: 2025-01-18
**버전**: 1.0.0
**작성자**: Claude Sonnet 4.5
