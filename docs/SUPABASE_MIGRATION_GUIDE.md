# Supabase 마이그레이션 실행 가이드

`keyword_rankings` 테이블 및 관련 데이터베이스 객체를 Supabase에 생성하는 빠른 참조 가이드입니다.

## 📋 마이그레이션 개요

**파일**: `/supabase/migrations/20250101_create_keyword_rankings.sql`

**생성 객체**:

- 1개 테이블: `keyword_rankings`
- 6개 인덱스: 성능 최적화
- 2개 뷰: `latest_keyword_rankings`, `category_average_rankings`
- 2개 함수: `get_keyword_trend()`, `get_top_performing_keywords()`
- 4개 RLS 정책: 보안 설정

---

## 방법 1: Supabase Dashboard (추천)

### 단계별 실행

1. **Supabase Dashboard 접속**
   - [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - 프로젝트 선택

2. **SQL Editor 열기**
   - 좌측 메뉴 → "SQL Editor"
   - "New query" 클릭

3. **마이그레이션 SQL 복사**

   ```bash
   # 로컬 파일 경로
   /supabase/migrations/20250101_create_keyword_rankings.sql
   ```

4. **SQL 붙여넣기 및 실행**
   - 전체 SQL (200+ lines) 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭 (또는 Cmd/Ctrl + Enter)

5. **실행 결과 확인**
   ```
   ✅ BMAD Keyword Rankings 테이블 생성 완료
   📊 테이블: keyword_rankings
   📈 뷰: latest_keyword_rankings, category_average_rankings
   🔧 함수: get_keyword_trend(), get_top_performing_keywords()
   🔒 RLS: 활성화 (읽기: 공개, 쓰기: 인증 필요)
   ```

---

## 방법 2: Supabase CLI

### 사전 요구사항

```bash
# Supabase CLI 설치
npm install -g supabase

# 또는 Homebrew (macOS)
brew install supabase/tap/supabase
```

### 실행 단계

```bash
# 1. Supabase 로그인
supabase login

# 2. 프로젝트 연결
supabase link --project-ref <your-project-ref>

# 프로젝트 참조 ID 찾기:
# Supabase Dashboard → Project Settings → General → Reference ID

# 3. 마이그레이션 실행
supabase db push

# 4. 마이그레이션 상태 확인
supabase db diff

# 5. 원격 변경사항 확인
supabase db remote commit
```

---

## 검증 체크리스트

### ✅ 테이블 확인

1. **Supabase Dashboard → Table Editor**
2. `keyword_rankings` 테이블 확인
3. 컬럼 구조 검증:
   - `id` (uuid, Primary Key)
   - `keyword` (text)
   - `position` (int4)
   - `found` (bool)
   - `url` (text)
   - `bmad_category` (text)
   - `created_at` (timestamptz)

### ✅ 인덱스 확인

**SQL Editor에서 실행**:

```sql
SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'keyword_rankings'
ORDER BY indexname;
```

**예상 결과**: 6개 인덱스

- `idx_keyword_rankings_bmad_category`
- `idx_keyword_rankings_category_position`
- `idx_keyword_rankings_created_at`
- `idx_keyword_rankings_keyword`
- `idx_keyword_rankings_keyword_date`
- `idx_keyword_rankings_position`

### ✅ 뷰 확인

**SQL Editor에서 실행**:

```sql
-- 뷰 존재 확인
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name IN ('latest_keyword_rankings', 'category_average_rankings');

-- latest_keyword_rankings 테스트
SELECT * FROM latest_keyword_rankings LIMIT 5;

-- category_average_rankings 테스트
SELECT * FROM category_average_rankings;
```

### ✅ 함수 확인

**SQL Editor에서 실행**:

```sql
-- 함수 존재 확인
SELECT
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('get_keyword_trend', 'get_top_performing_keywords');

-- 함수 테스트 (데이터 있을 경우)
SELECT * FROM get_top_performing_keywords(10);
SELECT * FROM get_keyword_trend('패밀리오피스란', 30);
```

### ✅ RLS 정책 확인

**SQL Editor에서 실행**:

```sql
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'keyword_rankings'
ORDER BY policyname;
```

**예상 결과**: 4개 정책

1. `Allow authenticated delete access` (DELETE)
2. `Allow authenticated insert access` (INSERT)
3. `Allow authenticated update access` (UPDATE)
4. `Allow public read access` (SELECT)

---

## 테스트 데이터 삽입

**샘플 데이터로 테스트**:

```sql
-- 테스트 레코드 삽입
INSERT INTO keyword_rankings (keyword, position, found, url, bmad_category)
VALUES
  ('패밀리오피스란', 3, true, 'https://familyoffices.vip/about', 'behavioral'),
  ('자산관리 전문가', 5, true, 'https://familyoffices.vip/services', 'decisional'),
  ('기업승계 계획', 7, true, 'https://familyoffices.vip/services/succession', 'motivational');

-- 삽입 확인
SELECT * FROM keyword_rankings ORDER BY created_at DESC LIMIT 5;

-- 뷰 테스트
SELECT * FROM latest_keyword_rankings;
SELECT * FROM category_average_rankings;

-- 함수 테스트
SELECT * FROM get_keyword_trend('패밀리오피스란', 7);
SELECT * FROM get_top_performing_keywords(10);

-- 테스트 데이터 정리 (선택사항)
DELETE FROM keyword_rankings WHERE keyword IN ('패밀리오피스란', '자산관리 전문가', '기업승계 계획');
```

---

## 문제 해결

### ❌ 오류: "relation does not exist"

**원인**: 마이그레이션이 실행되지 않았거나 실패함

**해결**:

1. SQL Editor에서 전체 마이그레이션 SQL을 다시 실행
2. 오류 메시지 확인
3. Supabase 프로젝트 권한 확인

### ❌ 오류: "permission denied"

**원인**: 데이터베이스 권한 부족

**해결**:

1. Supabase Dashboard 로그인 확인
2. 프로젝트 소유자 또는 관리자 권한 확인
3. Service Role Key 사용 (API 접근 시)

### ❌ 오류: "duplicate key value violates unique constraint"

**원인**: 마이그레이션이 이미 실행됨

**해결**:

```sql
-- 기존 테이블 확인
SELECT * FROM keyword_rankings LIMIT 1;

-- 필요 시 테이블 삭제 후 재생성 (주의!)
DROP TABLE IF EXISTS keyword_rankings CASCADE;

-- 마이그레이션 재실행
-- (전체 SQL 다시 실행)
```

### ⚠️ 경고: "function already exists"

**원인**: 함수가 이미 존재함

**해결**:

- `CREATE OR REPLACE FUNCTION` 구문이 자동으로 처리
- 경고 무시 가능
- 기존 함수 덮어쓰기됨

---

## 롤백 (마이그레이션 취소)

**주의**: 데이터 손실 가능성 있음!

```sql
-- 1. RLS 정책 삭제
DROP POLICY IF EXISTS "Allow public read access" ON keyword_rankings;
DROP POLICY IF EXISTS "Allow authenticated insert access" ON keyword_rankings;
DROP POLICY IF EXISTS "Allow authenticated update access" ON keyword_rankings;
DROP POLICY IF EXISTS "Allow authenticated delete access" ON keyword_rankings;

-- 2. 함수 삭제
DROP FUNCTION IF EXISTS get_keyword_trend(TEXT, INTEGER);
DROP FUNCTION IF EXISTS get_top_performing_keywords(INTEGER, TEXT);

-- 3. 뷰 삭제
DROP VIEW IF EXISTS category_average_rankings;
DROP VIEW IF EXISTS latest_keyword_rankings;

-- 4. 테이블 삭제 (CASCADE로 관련 객체 모두 삭제)
DROP TABLE IF EXISTS keyword_rankings CASCADE;

-- 5. 확인
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

---

## 다음 단계

마이그레이션 완료 후:

1. **통합 테스트 실행**

   ```bash
   npx tsx scripts/validate-env.ts
   ```

2. **API 테스트**

   ```bash
   curl http://localhost:3000/api/test/bmad-integration?detailed=true
   ```

3. **첫 데이터 수집**

   ```bash
   npx tsx scripts/collect-serper-rankings.ts
   ```

4. **Vercel 배포**
   - 환경 변수 설정 완료 확인
   - `vercel --prod` 실행

---

## 참고 문서

- **전체 설정 가이드**: [PHASE2_SETUP_GUIDE.md](./PHASE2_SETUP_GUIDE.md)
- **환경 변수 검증**: `npx tsx scripts/validate-env.ts`
- **통합 테스트**: `GET /api/test/bmad-integration`
- **Supabase 공식 문서**: [https://supabase.com/docs](https://supabase.com/docs)

---

**작성일**: 2025-01-18
**버전**: 1.0.0
**작성자**: Claude Sonnet 4.5
