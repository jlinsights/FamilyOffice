-- =====================================================
-- BMAD Keyword Rankings Table
-- =====================================================
-- Serper API로 수집한 Google 검색 순위 데이터 저장
--
-- 실행 방법:
-- 1. Supabase Dashboard > SQL Editor
-- 2. 이 스크립트 복사/붙여넣기 후 실행
-- 3. 또는 Supabase CLI: supabase db push
--
-- 작성일: 2025-01-01
-- =====================================================

-- 키워드 순위 테이블 생성
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,
  "position" INTEGER,
  found BOOLEAN DEFAULT false,
  url TEXT,
  bmad_category TEXT NOT NULL CHECK (bmad_category IN ('behavioral', 'motivational', 'aspirational', 'decisional', 'unknown')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_keyword
  ON keyword_rankings(keyword);

CREATE INDEX IF NOT EXISTS idx_keyword_rankings_created_at
  ON keyword_rankings(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_keyword_rankings_bmad_category
  ON keyword_rankings(bmad_category);

CREATE INDEX IF NOT EXISTS idx_keyword_rankings_position
  ON keyword_rankings(position)
  WHERE position IS NOT NULL;

-- 복합 인덱스 (키워드 + 날짜 조회 최적화)
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_keyword_date
  ON keyword_rankings(keyword, created_at DESC);

-- 복합 인덱스 (카테고리 + 순위 조회 최적화)
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_category_position
  ON keyword_rankings(bmad_category, position)
  WHERE position IS NOT NULL;

-- 코멘트 추가
COMMENT ON TABLE keyword_rankings IS 'BMAD 키워드의 Google 검색 순위 데이터';
COMMENT ON COLUMN keyword_rankings.keyword IS '검색 키워드';
COMMENT ON COLUMN keyword_rankings.position IS 'Google 검색 순위 (1-100, NULL = 순위 없음)';
COMMENT ON COLUMN keyword_rankings.found IS '도메인 발견 여부 (familyoffices.vip)';
COMMENT ON COLUMN keyword_rankings.url IS '발견된 URL (found=true일 때)';
COMMENT ON COLUMN keyword_rankings.bmad_category IS 'BMAD 카테고리 (behavioral, motivational, aspirational, decisional)';
COMMENT ON COLUMN keyword_rankings.created_at IS '데이터 수집 시각';

-- =====================================================
-- 유틸리티 뷰: 최신 키워드 순위
-- =====================================================
CREATE OR REPLACE VIEW latest_keyword_rankings AS
SELECT DISTINCT ON (keyword)
  keyword,
  position,
  found,
  url,
  bmad_category,
  created_at
FROM keyword_rankings
ORDER BY keyword, created_at DESC;

COMMENT ON VIEW latest_keyword_rankings IS '각 키워드의 최신 순위 데이터';

-- =====================================================
-- 유틸리티 뷰: 카테고리별 평균 순위
-- =====================================================
CREATE OR REPLACE VIEW category_average_rankings AS
SELECT
  bmad_category,
  COUNT(*) AS total_keywords,
  COUNT(CASE WHEN found THEN 1 END) AS found_count,
  ROUND(AVG(CASE WHEN found THEN position END), 2) AS avg_position,
  MIN(CASE WHEN found THEN position END) AS best_position,
  MAX(CASE WHEN found THEN position END) AS worst_position,
  ROUND(COUNT(CASE WHEN found THEN 1 END)::NUMERIC / COUNT(*)::NUMERIC * 100, 2) AS found_percentage
FROM latest_keyword_rankings
GROUP BY bmad_category
ORDER BY avg_position ASC NULLS LAST;

COMMENT ON VIEW category_average_rankings IS 'BMAD 카테고리별 평균 검색 순위 통계';

-- =====================================================
-- 유틸리티 함수: 키워드 순위 추이 조회
-- =====================================================
CREATE OR REPLACE FUNCTION get_keyword_trend(
  p_keyword TEXT,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  date DATE,
  "position" INTEGER,
  found BOOLEAN,
  url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    DATE(created_at) AS date,
    keyword_rankings.position,
    keyword_rankings.found,
    keyword_rankings.url
  FROM keyword_rankings
  WHERE keyword = p_keyword
    AND created_at >= NOW() - (p_days || ' days')::INTERVAL
  ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_keyword_trend(TEXT, INTEGER) IS '특정 키워드의 검색 순위 추이 조회 (최근 N일)';

-- =====================================================
-- 유틸리티 함수: 상위 성과 키워드 조회
-- =====================================================
CREATE OR REPLACE FUNCTION get_top_performing_keywords(
  p_limit INTEGER DEFAULT 10,
  p_category TEXT DEFAULT NULL
)
RETURNS TABLE (
  keyword TEXT,
  "position" INTEGER,
  bmad_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    kr.keyword,
    kr.position,
    kr.bmad_category,
    kr.created_at
  FROM latest_keyword_rankings kr
  WHERE kr.found = true
    AND kr.position IS NOT NULL
    AND (p_category IS NULL OR kr.bmad_category = p_category)
  ORDER BY kr.position ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_top_performing_keywords(INTEGER, TEXT) IS '상위 성과 키워드 조회 (순위 기준)';

-- =====================================================
-- Row Level Security (RLS) 설정
-- =====================================================
-- RLS 활성화
ALTER TABLE keyword_rankings ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 허용 (공개 데이터)
CREATE POLICY "Allow public read access"
  ON keyword_rankings
  FOR SELECT
  USING (true);

-- 인증된 사용자만 삽입/업데이트/삭제 가능
CREATE POLICY "Allow authenticated insert access"
  ON keyword_rankings
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update access"
  ON keyword_rankings
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete access"
  ON keyword_rankings
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 샘플 데이터 (개발/테스트용)
-- =====================================================
-- 프로덕션 환경에서는 아래 INSERT 문 제거
/*
INSERT INTO keyword_rankings (keyword, position, found, url, bmad_category) VALUES
  ('패밀리오피스란', 3, true, 'https://familyoffices.vip/about', 'behavioral'),
  ('자산관리 전문가', 5, true, 'https://familyoffices.vip/services', 'decisional'),
  ('기업승계 계획', 7, true, 'https://familyoffices.vip/services/succession', 'motivational'),
  ('세무 최적화', 12, true, 'https://familyoffices.vip/services/tax', 'decisional'),
  ('CEO 자산관리', 4, true, 'https://familyoffices.vip/program', 'aspirational');
*/

-- =====================================================
-- 완료 메시지
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '✅ BMAD Keyword Rankings 테이블 생성 완료';
  RAISE NOTICE '📊 테이블: keyword_rankings';
  RAISE NOTICE '📈 뷰: latest_keyword_rankings, category_average_rankings';
  RAISE NOTICE '🔧 함수: get_keyword_trend(), get_top_performing_keywords()';
  RAISE NOTICE '🔒 RLS: 활성화 (읽기: 공개, 쓰기: 인증 필요)';
END $$;
