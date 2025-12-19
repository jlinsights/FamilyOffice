-- =====================================================
-- 마이그레이션 검증 SQL
-- =====================================================
-- Supabase SQL Editor에서 실행하여 마이그레이션 성공 여부 확인

-- 1. 테이블 존재 확인
SELECT 'keyword_rankings 테이블' AS check_name,
       CASE WHEN EXISTS (
         SELECT FROM information_schema.tables
         WHERE table_schema = 'public'
         AND table_name = 'keyword_rankings'
       ) THEN '✅ 존재' ELSE '❌ 없음' END AS status;

-- 2. 컬럼 확인
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'keyword_rankings'
ORDER BY ordinal_position;

-- 3. 인덱스 확인 (6개 예상)
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'keyword_rankings'
ORDER BY indexname;

-- 4. 뷰 확인 (2개 예상)
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name IN ('latest_keyword_rankings', 'category_average_rankings')
ORDER BY table_name;

-- 5. 함수 확인 (2개 예상)
SELECT
  routine_name,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('get_keyword_trend', 'get_top_performing_keywords')
ORDER BY routine_name;

-- 6. RLS 정책 확인 (4개 예상)
SELECT
  policyname,
  cmd AS operation,
  permissive
FROM pg_policies
WHERE tablename = 'keyword_rankings'
ORDER BY policyname;

-- 7. 샘플 데이터 테스트 (선택사항)
-- 테스트 레코드 삽입
INSERT INTO keyword_rankings (keyword, position, found, url, bmad_category)
VALUES ('TEST_마이그레이션_검증', 1, true, 'https://test.com', 'behavioral')
RETURNING *;

-- 삽입된 데이터 확인
SELECT * FROM keyword_rankings WHERE keyword LIKE 'TEST_%';

-- 뷰 테스트
SELECT * FROM latest_keyword_rankings WHERE keyword LIKE 'TEST_%';

-- 테스트 데이터 정리
DELETE FROM keyword_rankings WHERE keyword LIKE 'TEST_%';

-- 최종 확인 메시지
SELECT '✅ 마이그레이션 검증 완료!' AS result;
