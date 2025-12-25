# Phase 2: 환경 설정 및 배포 가이드

Phase 1에서 구현한 BMAD 키워드 추적 시스템을 실제 프로덕션 환경에 배포하기 위한 완전한 설정 가이드입니다.

## 목차

1. [Google Cloud Console 설정](#1-google-cloud-console-설정)
2. [Serper.dev API 키 발급](#2-serperdev-api-키-발급)
3. [Supabase 마이그레이션 실행](#3-supabase-마이그레이션-실행)
4. [Vercel 환경 변수 설정](#4-vercel-환경-변수-설정)
5. [Vercel Cron Job 활성화](#5-vercel-cron-job-활성화)
6. [통합 테스트](#6-통합-테스트)
7. [문제 해결](#7-문제-해결)

---

## 1. Google Cloud Console 설정

Google Analytics 4 Data API를 사용하기 위한 서비스 계정 생성 및 권한 설정입니다.

### 1.1 Google Cloud Project 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 상단의 프로젝트 선택기 클릭 → "새 프로젝트" 클릭
3. 프로젝트 이름 입력 (예: `familyoffices-analytics`)
4. "만들기" 클릭

### 1.2 Google Analytics Data API 활성화

1. Google Cloud Console 메뉴 → "API 및 서비스" → "라이브러리"
2. 검색창에 "Google Analytics Data API" 검색
3. "Google Analytics Data API" 선택
4. "사용" 버튼 클릭

### 1.3 서비스 계정 생성

1. 메뉴 → "API 및 서비스" → "사용자 인증 정보"
2. "사용자 인증 정보 만들기" → "서비스 계정" 선택
3. 서비스 계정 세부정보 입력:
   - **이름**: `familyoffices-ga4-reader`
   - **설명**: `GA4 데이터 읽기 전용 계정`
4. "만들기 및 계속하기" 클릭
5. 역할 선택: **없음** (GA4에서 직접 권한 부여)
6. "완료" 클릭

### 1.4 서비스 계정 키 생성

1. 생성된 서비스 계정 클릭
2. "키" 탭 선택
3. "키 추가" → "새 키 만들기"
4. **JSON** 형식 선택
5. "만들기" 클릭
6. **다운로드된 JSON 파일 안전하게 보관** ⚠️

JSON 파일 구조:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "familyoffices-ga4-reader@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

**필요한 값**:

- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`
- `project_id` → `GOOGLE_PROJECT_ID`

### 1.5 Google Analytics 4 속성에 서비스 계정 권한 부여

1. [Google Analytics](https://analytics.google.com/) 접속
2. 관리자 메뉴 (톱니바퀴 아이콘) 클릭
3. "속성 액세스 관리" 선택
4. 우측 상단 "+" 버튼 → "사용자 추가" 클릭
5. **이메일 주소**: 서비스 계정의 `client_email` 입력
   ```
   familyoffices-ga4-reader@your-project.iam.gserviceaccount.com
   ```
6. **역할**: "뷰어" 선택
7. "추가" 클릭

### 1.6 GA4 속성 ID 확인

1. Google Analytics → 관리자
2. "속성 설정" 선택
3. **속성 ID** 복사 (예: `123456789`)
4. 이 값을 `GOOGLE_ANALYTICS_PROPERTY_ID`로 사용

---

## 2. Serper.dev API 키 발급

Google 검색 순위 데이터 수집을 위한 Serper.dev API 키 발급입니다.

### 2.1 Serper.dev 계정 생성

1. [Serper.dev](https://serper.dev/) 접속
2. "Sign Up" 클릭
3. Google 계정 또는 이메일로 가입

### 2.2 API 키 생성

1. 대시보드 로그인
2. "API Keys" 메뉴 선택
3. "Create API Key" 클릭
4. 키 이름 입력 (예: `familyoffices-production`)
5. **API Key 복사 및 안전하게 보관** ⚠️

### 2.3 요금제 확인

**무료 플랜**:

- 2,500 검색/월 무료
- 일일 40개 키워드 수집 = 월 1,200 검색
- **무료 플랜으로 충분함** ✅

**유료 플랜** (필요 시):

- $50/월 = 5,000 검색
- $150/월 = 20,000 검색

### 2.4 테스트 요청

```bash
curl -X POST https://google.serper.dev/search \
  -H 'X-API-KEY: YOUR_SERPER_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "q": "패밀리오피스란",
    "gl": "kr",
    "hl": "ko",
    "num": 10
  }'
```

성공 응답:

```json
{
  "searchParameters": {
    "q": "패밀리오피스란",
    "gl": "kr",
    "hl": "ko",
    "num": 10
  },
  "organic": [
    {
      "title": "...",
      "link": "...",
      "position": 1
    }
  ]
}
```

---

## 3. Supabase 마이그레이션 실행

`keyword_rankings` 테이블 및 관련 뷰/함수를 Supabase에 생성합니다.

### 3.1 Supabase 프로젝트 확인

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 기존 프로젝트 선택 (또는 새 프로젝트 생성)
3. 프로젝트 URL 및 API 키 확인

### 3.2 마이그레이션 실행 (방법 1: SQL Editor)

1. Supabase Dashboard → "SQL Editor" 메뉴
2. "New query" 클릭
3. `/supabase/migrations/20250101_create_keyword_rankings.sql` 파일 내용 전체 복사
4. SQL Editor에 붙여넣기
5. "Run" 버튼 클릭 (Cmd/Ctrl + Enter)

**예상 결과**:

```
✅ BMAD Keyword Rankings 테이블 생성 완료
📊 테이블: keyword_rankings
📈 뷰: latest_keyword_rankings, category_average_rankings
🔧 함수: get_keyword_trend(), get_top_performing_keywords()
🔒 RLS: 활성화 (읽기: 공개, 쓰기: 인증 필요)
```

### 3.3 마이그레이션 실행 (방법 2: Supabase CLI)

**사전 요구사항**: Supabase CLI 설치

```bash
npm install -g supabase
```

**실행 단계**:

```bash
# 1. Supabase 로그인
supabase login

# 2. 프로젝트 연결
supabase link --project-ref your-project-ref

# 3. 마이그레이션 실행
supabase db push

# 4. 확인
supabase db diff
```

### 3.4 테이블 생성 확인

1. Supabase Dashboard → "Table Editor"
2. `keyword_rankings` 테이블 확인
3. 컬럼 확인:
   - `id` (UUID, Primary Key)
   - `keyword` (TEXT)
   - `position` (INTEGER)
   - `found` (BOOLEAN)
   - `url` (TEXT)
   - `bmad_category` (TEXT)
   - `created_at` (TIMESTAMP)

### 3.5 RLS 정책 확인

```sql
-- SQL Editor에서 실행
SELECT * FROM pg_policies WHERE tablename = 'keyword_rankings';
```

**예상 결과**: 4개의 정책 (읽기: 공개, 쓰기/수정/삭제: 인증 필요)

---

## 4. Vercel 환경 변수 설정

Vercel 프로젝트에 필요한 모든 환경 변수를 설정합니다.

### 4.1 Vercel 프로젝트 접속

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. `familyoffice` 프로젝트 선택
3. "Settings" 탭 → "Environment Variables" 메뉴

### 4.2 필수 환경 변수 설정

#### Google Analytics 4 API

**GOOGLE_SERVICE_ACCOUNT_EMAIL**

```
familyoffices-ga4-reader@your-project.iam.gserviceaccount.com
```

- 환경: Production, Preview, Development

**GOOGLE_PRIVATE_KEY**

```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
(여러 줄의 private key)
...
-----END PRIVATE KEY-----
```

⚠️ **주의사항**:

- JSON 파일의 `\n`을 실제 줄바꿈으로 변경
- 시작과 끝의 `-----BEGIN/END PRIVATE KEY-----` 포함
- Vercel은 자동으로 줄바꿈을 이스케이프 처리함

**GOOGLE_PROJECT_ID**

```
your-project-id
```

**GOOGLE_ANALYTICS_PROPERTY_ID**

```
123456789
```

- GA4 속성 설정에서 확인한 숫자 ID

#### Serper.dev API

**SERPER_API_KEY**

```
your_serper_api_key_here
```

- Serper.dev 대시보드에서 생성한 API 키

#### Vercel Cron Job

**CRON_SECRET**

```
your_random_secure_string_here
```

생성 방법:

```bash
# macOS/Linux
openssl rand -base64 32

# 또는 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

예시 결과:

```
wX3zP9kL2mN8qR5tY7vB1cD4eF6gH9jK0lM2nO4pQ=
```

### 4.3 기존 환경 변수 확인

다음 환경 변수가 이미 설정되어 있는지 확인:

**Supabase**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**없다면 설정 필요**:

1. Supabase Dashboard → Project Settings → API
2. URL, anon key, service_role key 복사
3. Vercel에 추가

### 4.4 환경 변수 적용

1. 모든 환경 변수 저장 후 자동 재배포 대기
2. 또는 수동 재배포:
   ```bash
   vercel --prod
   ```

---

## 5. Vercel Cron Job 활성화

매일 새벽 2시에 자동으로 키워드 순위를 수집하는 Cron Job을 활성화합니다.

### 5.1 Vercel Cron 기능 확인

1. Vercel Dashboard → 프로젝트 선택
2. "Cron Jobs" 탭 확인
3. `vercel.json`의 cron 설정이 자동으로 인식됨

**설정 확인**:

- Path: `/api/cron/daily-bmad-collection`
- Schedule: `0 2 * * *` (매일 UTC 2시 = KST 11시)

### 5.2 스케줄 조정 (선택사항)

현재 UTC 2시 = KST 11시인데, KST 새벽 2시로 변경하려면:

**파일**: `vercel.json`

```json
{
  "version": 2,
  "crons": [
    {
      "path": "/api/cron/daily-bmad-collection",
      "schedule": "0 17 * * *"
    }
  ]
}
```

- `0 17 * * *` = UTC 17시 = KST 새벽 2시

**변경 후 재배포**:

```bash
git add vercel.json
git commit -m "⏰ Adjust Cron schedule to KST 2 AM"
git push
```

### 5.3 Cron Job 수동 테스트

**로컬 테스트 (POST 요청)**:

```bash
curl -X POST http://localhost:3000/api/cron/daily-bmad-collection \
  -H "Content-Type: application/json"
```

**프로덕션 테스트 (GET 요청 with CRON_SECRET)**:

```bash
curl -X GET https://familyoffices.vip/api/cron/daily-bmad-collection \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

**예상 응답**:

```json
{
  "success": true,
  "message": "Daily BMAD keyword rankings collected successfully",
  "result": {
    "collected": 40,
    "failed": 0,
    "duration": 45.23,
    "timestamp": "2025-01-18T17:00:00.000Z"
  }
}
```

### 5.4 Cron Job 실행 로그 확인

1. Vercel Dashboard → 프로젝트 → "Logs" 탭
2. 필터: `api/cron/daily-bmad-collection`
3. 실행 로그 확인:
   ```
   🚀 Starting daily BMAD keyword ranking collection...
   ✅ Daily BMAD collection completed: { collected: 40, failed: 0, ... }
   ```

---

## 6. 통합 테스트

전체 시스템이 정상 작동하는지 단계별로 테스트합니다.

### 6.1 Google Analytics 4 연결 테스트

**테스트 스크립트** 생성: `/scripts/test-ga4-connection.ts`

```typescript
import {
  checkGA4Connection,
  getKeywordPerformance,
} from '@/lib/google-analytics/ga4-client';

async function testGA4() {
  console.log('🔍 GA4 연결 테스트 시작...');

  // 1. 연결 확인
  const isConnected = await checkGA4Connection();
  console.log(`GA4 연결: ${isConnected ? '✅' : '❌'}`);

  if (!isConnected) {
    console.error('GA4 연결 실패. 환경 변수를 확인하세요.');
    return;
  }

  // 2. 샘플 데이터 조회
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const keywords = ['패밀리오피스란', '자산관리 전문가'];
  const performance = await getKeywordPerformance(startDate, endDate, keywords);

  console.log('📊 GA4 데이터 샘플:', performance.slice(0, 3));
}

testGA4().catch(console.error);
```

**실행**:

```bash
npx tsx scripts/test-ga4-connection.ts
```

### 6.2 Serper API 연결 테스트

**테스트 스크립트**: `/scripts/test-serper-connection.ts`

```typescript
import { checkSerperConnection, checkDomainRanking } from '@/lib/serper/client';

async function testSerper() {
  console.log('🔍 Serper API 연결 테스트 시작...');

  // 1. 연결 확인
  const isConnected = await checkSerperConnection();
  console.log(`Serper 연결: ${isConnected ? '✅' : '❌'}`);

  if (!isConnected) {
    console.error('Serper 연결 실패. API 키를 확인하세요.');
    return;
  }

  // 2. 샘플 검색
  const ranking = await checkDomainRanking(
    '패밀리오피스란',
    'familyoffices.vip',
    { country: 'kr', language: 'ko' }
  );

  console.log('🎯 검색 결과:', ranking);
}

testSerper().catch(console.error);
```

**실행**:

```bash
npx tsx scripts/test-serper-connection.ts
```

### 6.3 Supabase 연결 테스트

**테스트 스크립트**: `/scripts/test-supabase-connection.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

async function testSupabase() {
  console.log('🔍 Supabase 연결 테스트 시작...');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. 테이블 존재 확인
  const { data: tables, error: tablesError } = await supabase
    .from('keyword_rankings')
    .select('*')
    .limit(0);

  if (tablesError) {
    console.error('❌ 테이블 접근 실패:', tablesError);
    return;
  }

  console.log('✅ keyword_rankings 테이블 존재 확인');

  // 2. 테스트 데이터 삽입
  const testRecord = {
    keyword: 'TEST_KEYWORD',
    position: 1,
    found: true,
    url: 'https://familyoffices.vip/test',
    bmad_category: 'behavioral',
  };

  const { data: inserted, error: insertError } = await supabase
    .from('keyword_rankings')
    .insert(testRecord)
    .select();

  if (insertError) {
    console.error('❌ 삽입 실패:', insertError);
    return;
  }

  console.log('✅ 테스트 데이터 삽입 성공:', inserted);

  // 3. 테스트 데이터 삭제
  const { error: deleteError } = await supabase
    .from('keyword_rankings')
    .delete()
    .eq('keyword', 'TEST_KEYWORD');

  if (deleteError) {
    console.error('❌ 삭제 실패:', deleteError);
    return;
  }

  console.log('✅ 테스트 데이터 정리 완료');
}

testSupabase().catch(console.error);
```

**실행**:

```bash
npx tsx scripts/test-supabase-connection.ts
```

### 6.4 전체 수집 프로세스 테스트

**수동 실행**:

```bash
npx tsx scripts/collect-serper-rankings.ts
```

**예상 출력**:

```
🚀 Serper API 일일 검색 순위 수집 시작
📊 수집할 키워드 수: 40
  - Behavioral: 10
  - Motivational: 10
  - Aspirational: 10
  - Decisional: 10

🔍 배치 검색 중... (1초 간격)
[1/40] 패밀리오피스란 → Position: 3 ✅
[2/40] 자산관리 전문가 → Position: 5 ✅
...
[40/40] CEO 재무 상담 → Position: null ❌

💾 Supabase에 저장 중... (100개씩 배치)
✅ 40개 레코드 저장 완료

📈 수집 결과 요약:
  - 성공: 32개 (80.0%)
  - 실패: 8개 (20.0%)
  - 소요 시간: 45.23초
  - 타임스탬프: 2025-01-18T17:00:00.000Z

🎯 카테고리별 발견율:
  - Behavioral: 9/10 (90.0%)
  - Motivational: 8/10 (80.0%)
  - Aspirational: 8/10 (80.0%)
  - Decisional: 7/10 (70.0%)

✅ 일일 순위 수집 완료!
```

### 6.5 Cron Job 엔드포인트 테스트

**로컬 개발 서버 시작**:

```bash
npm run dev
```

**POST 요청 (수동 트리거)**:

```bash
curl -X POST http://localhost:3000/api/cron/daily-bmad-collection \
  -H "Content-Type: application/json"
```

**프로덕션 GET 요청**:

```bash
curl -X GET https://familyoffices.vip/api/cron/daily-bmad-collection \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 7. 문제 해결

### 7.1 Google Analytics 4 관련

#### 문제: "GA4 credentials not configured"

**원인**: 환경 변수가 설정되지 않음

**해결**:

1. Vercel 환경 변수 확인:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_PROJECT_ID`
   - `GOOGLE_ANALYTICS_PROPERTY_ID`

2. `GOOGLE_PRIVATE_KEY` 형식 확인:

   ```
   -----BEGIN PRIVATE KEY-----
   (여러 줄의 키)
   -----END PRIVATE KEY-----
   ```

3. 로컬 테스트:
   ```bash
   # .env.local 파일 생성
   GOOGLE_SERVICE_ACCOUNT_EMAIL="..."
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
   GOOGLE_PROJECT_ID="..."
   GOOGLE_ANALYTICS_PROPERTY_ID="..."
   ```

#### 문제: "Permission denied"

**원인**: GA4 속성에 서비스 계정 권한 미부여

**해결**:

1. Google Analytics → 관리자 → 속성 액세스 관리
2. 서비스 계정 이메일 추가 (뷰어 역할)
3. 5-10분 대기 후 재시도

#### 문제: "No data returned"

**원인**: GA4에 실제 데이터가 없음

**해결**:

1. GA4 실시간 보고서에서 트래픽 확인
2. 날짜 범위를 최근 7일로 조정
3. 개발 환경에서는 모의 데이터 사용:
   ```typescript
   if (process.env.NODE_ENV === 'development') {
     return mockKeywordPerformanceData;
   }
   ```

### 7.2 Serper API 관련

#### 문제: "Serper API connection failed"

**원인**: API 키가 유효하지 않음

**해결**:

1. Serper.dev 대시보드에서 API 키 확인
2. Vercel 환경 변수 `SERPER_API_KEY` 확인
3. API 키에 공백이나 특수문자 없는지 확인

#### 문제: "Rate limit exceeded"

**원인**: API 호출 제한 초과

**해결**:

1. 무료 플랜: 2,500 검색/월 확인
2. 배치 검색 간격 늘리기:
   ```typescript
   await batchSearch(keywords, domain, { delayMs: 2000 }); // 2초 간격
   ```
3. 유료 플랜으로 업그레이드 고려

#### 문제: "No results found"

**원인**: 검색 결과에 도메인이 없음

**해결**:

1. 정상 동작입니다 (모든 키워드가 순위권에 있지 않을 수 있음)
2. `found: false`, `position: null`로 기록됨
3. 카테고리별 발견율로 성과 추적

### 7.3 Supabase 관련

#### 문제: "Table doesn't exist"

**원인**: 마이그레이션 미실행

**해결**:

1. Supabase Dashboard → SQL Editor
2. `/supabase/migrations/20250101_create_keyword_rankings.sql` 실행
3. 테이블 생성 확인

#### 문제: "Permission denied for table keyword_rankings"

**원인**: RLS 정책 문제

**해결**:

1. Service Role Key 사용 확인:

   ```typescript
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.SUPABASE_SERVICE_ROLE_KEY! // ANON KEY 아님!
   );
   ```

2. RLS 정책 확인:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'keyword_rankings';
   ```

#### 문제: "Insert failed"

**원인**: 데이터 타입 불일치 또는 제약 조건 위반

**해결**:

1. `bmad_category` 값 확인:
   - 허용: `behavioral`, `motivational`, `aspirational`, `decisional`, `unknown`
2. 로그 확인:
   ```typescript
   console.log('Inserting record:', recordToInsert);
   ```

### 7.4 Vercel Cron Job 관련

#### 문제: "Cron job not running"

**원인**: Vercel Cron이 활성화되지 않음

**해결**:

1. Vercel 프로젝트가 Pro 플랜인지 확인 (Hobby는 제한적)
2. `vercel.json` 파일이 루트에 있는지 확인
3. 재배포 후 Vercel Dashboard에서 Cron Jobs 탭 확인

#### 문제: "Unauthorized cron job access"

**원인**: `CRON_SECRET` 불일치

**해결**:

1. Vercel 환경 변수 `CRON_SECRET` 확인
2. 로컬 테스트 시 POST 요청 사용 (인증 불필요)
3. 프로덕션 테스트 시 정확한 `Authorization` 헤더 사용:
   ```bash
   curl -X GET https://familyoffices.vip/api/cron/daily-bmad-collection \
     -H "Authorization: Bearer YOUR_EXACT_CRON_SECRET"
   ```

#### 문제: "Cron job timeout"

**원인**: 40개 키워드 수집에 시간 초과

**해결**:

1. Vercel 함수 타임아웃 확인 (Pro: 60초, Enterprise: 900초)
2. 배치 크기 줄이기:
   ```typescript
   const keywords = getAllBMADKeywords().slice(0, 20); // 20개만
   ```
3. 병렬 처리 고려 (단, Rate Limit 주의)

---

## 배포 체크리스트

Phase 2 완료를 위한 최종 체크리스트입니다.

### ✅ Google Cloud Console

- [ ] Google Cloud Project 생성 완료
- [ ] Google Analytics Data API 활성화
- [ ] 서비스 계정 생성 및 JSON 키 다운로드
- [ ] GA4 속성에 서비스 계정 권한 부여 (뷰어)
- [ ] GA4 속성 ID 확인

### ✅ Serper.dev

- [ ] Serper.dev 계정 생성
- [ ] API 키 발급 완료
- [ ] 요금제 확인 (무료 2,500 검색/월)
- [ ] 테스트 요청 성공 확인

### ✅ Supabase

- [ ] Supabase 프로젝트 확인
- [ ] 마이그레이션 SQL 실행 완료
- [ ] `keyword_rankings` 테이블 생성 확인
- [ ] 6개 인덱스 생성 확인
- [ ] 2개 뷰 생성 확인 (latest_keyword_rankings, category_average_rankings)
- [ ] 2개 함수 생성 확인 (get_keyword_trend, get_top_performing_keywords)
- [ ] RLS 정책 활성화 확인

### ✅ Vercel 환경 변수

- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` 설정
- [ ] `GOOGLE_PRIVATE_KEY` 설정 (줄바꿈 포함)
- [ ] `GOOGLE_PROJECT_ID` 설정
- [ ] `GOOGLE_ANALYTICS_PROPERTY_ID` 설정
- [ ] `SERPER_API_KEY` 설정
- [ ] `CRON_SECRET` 생성 및 설정
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 확인
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 확인
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 확인

### ✅ Vercel Cron Job

- [ ] `vercel.json` cron 설정 확인
- [ ] Vercel Dashboard에서 Cron Jobs 탭 확인
- [ ] 스케줄 시간 확인 (`0 2 * * *` = UTC 2시)
- [ ] 수동 테스트 성공 (POST 요청)
- [ ] 실제 Cron 실행 로그 확인 (다음날)

### ✅ 통합 테스트

- [ ] GA4 연결 테스트 성공
- [ ] Serper API 연결 테스트 성공
- [ ] Supabase 연결 테스트 성공
- [ ] 전체 수집 프로세스 테스트 성공 (40개 키워드)
- [ ] Cron Job 엔드포인트 테스트 성공

---

## 다음 단계 (Phase 3-4)

### Phase 3: 블로그 콘텐츠 AI 최적화

- AI 최적화 점수 70점 이상 목표
- FAQ 섹션 추가
- 구조화된 데이터 강화
- 내부 링크 최적화

### Phase 4: 실시간 알림 및 A/B 테스팅

- Slack/Discord 웹훅 알림 설정
- 순위 급변동 알림 (±10 이상)
- A/B 테스트 프레임워크 구축
- 월간 성과 리포트 자동 생성

---

## 문의 및 지원

**이슈 발생 시**:

1. 로그 확인: Vercel Dashboard → Logs
2. 환경 변수 재확인
3. 각 서비스별 문제 해결 섹션 참조

**추가 도움이 필요하면**:

- GitHub Issues 생성
- 팀 Slack 채널 문의
- 기술 문서 참조: `/docs`

---

**작성일**: 2025-01-18
**버전**: 1.0.0
**작성자**: Claude Sonnet 4.5
