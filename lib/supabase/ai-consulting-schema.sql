-- Triple-AI 컨설팅 시스템을 위한 데이터베이스 스키마

-- AI 컨설팅 기록 테이블
CREATE TABLE IF NOT EXISTS ai_consultations (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  ai_used TEXT[] NOT NULL, -- ['claude-opus', 'gpt4-turbo', 'gemini-pro']
  strategy_used TEXT NOT NULL, -- 'single_ai', 'parallel_hybrid', 'sequential_cascade', 'consensus_voting'
  response_time INTEGER NOT NULL, -- milliseconds
  cost DECIMAL(10,6) NOT NULL DEFAULT 0.0, -- USD
  confidence DECIMAL(3,2) NOT NULL DEFAULT 0.0, -- 0.0 - 1.0
  korean_cultural_context JSONB, -- 한국 문화 컨텍스트 데이터
  attachments JSONB, -- 첨부파일 정보
  follow_up_suggestions TEXT[],
  expert_escalation_recommended BOOLEAN DEFAULT FALSE,
  satisfaction_rating INTEGER, -- 1-5 사용자 만족도 (나중에 추가)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_ai_consultations_user_id ON ai_consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_consultations_created_at ON ai_consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_consultations_ai_used ON ai_consultations USING GIN(ai_used);
CREATE INDEX IF NOT EXISTS idx_ai_consultations_strategy ON ai_consultations(strategy_used);
CREATE INDEX IF NOT EXISTS idx_ai_consultations_cost ON ai_consultations(cost);
CREATE INDEX IF NOT EXISTS idx_ai_consultations_confidence ON ai_consultations(confidence);

-- AI 시스템 성능 메트릭 테이블
CREATE TABLE IF NOT EXISTS ai_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  total_consultations INTEGER NOT NULL DEFAULT 0,
  avg_response_time INTEGER NOT NULL DEFAULT 0, -- milliseconds
  total_cost DECIMAL(10,6) NOT NULL DEFAULT 0.0,
  avg_confidence DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  claude_usage_count INTEGER NOT NULL DEFAULT 0,
  gpt4_usage_count INTEGER NOT NULL DEFAULT 0,
  gemini_usage_count INTEGER NOT NULL DEFAULT 0,
  single_ai_count INTEGER NOT NULL DEFAULT 0,
  parallel_hybrid_count INTEGER NOT NULL DEFAULT 0,
  sequential_cascade_count INTEGER NOT NULL DEFAULT 0,
  consensus_voting_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  cache_hit_rate DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 성능 메트릭 인덱스
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_performance_metrics_date ON ai_performance_metrics(date);
CREATE INDEX IF NOT EXISTS idx_ai_performance_metrics_created_at ON ai_performance_metrics(created_at DESC);

-- AI 시스템 헬스 로그 테이블
CREATE TABLE IF NOT EXISTS ai_system_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claude_status TEXT NOT NULL, -- 'healthy', 'degraded', 'unavailable'
  openai_status TEXT NOT NULL,
  gemini_status TEXT NOT NULL,
  cache_status TEXT NOT NULL,
  overall_status TEXT NOT NULL,
  response_times JSONB, -- {'claude': 1200, 'openai': 800, 'gemini': 1500}
  error_details JSONB, -- 오류 상세 정보
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 헬스 로그 인덱스
CREATE INDEX IF NOT EXISTS idx_ai_system_health_checked_at ON ai_system_health(checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_system_health_overall_status ON ai_system_health(overall_status);

-- 사용자 테이블에 AI 관련 필드 추가 (이미 있는 테이블에 컬럼 추가)
DO $$ 
BEGIN
  -- industry 컬럼이 없으면 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='industry') THEN
    ALTER TABLE users ADD COLUMN industry TEXT DEFAULT 'family_corp';
  END IF;
  
  -- tier 컬럼이 없으면 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='tier') THEN
    ALTER TABLE users ADD COLUMN tier TEXT DEFAULT 'standard';
  END IF;
  
  -- company 컬럼이 없으면 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='company') THEN
    ALTER TABLE users ADD COLUMN company TEXT;
  END IF;
  
  -- ai_consultation_count 컬럼이 없으면 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='ai_consultation_count') THEN
    ALTER TABLE users ADD COLUMN ai_consultation_count INTEGER DEFAULT 0;
  END IF;
  
  -- last_ai_consultation 컬럼이 없으면 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='last_ai_consultation') THEN
    ALTER TABLE users ADD COLUMN last_ai_consultation TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- AI 컨설팅 후 사용자 통계 업데이트 트리거
CREATE OR REPLACE FUNCTION update_user_ai_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users 
  SET 
    ai_consultation_count = ai_consultation_count + 1,
    last_ai_consultation = NEW.created_at,
    updated_at = NOW()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS trigger_update_user_ai_stats ON ai_consultations;
CREATE TRIGGER trigger_update_user_ai_stats
  AFTER INSERT ON ai_consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_user_ai_stats();

-- 일일 성능 메트릭 집계 함수
CREATE OR REPLACE FUNCTION aggregate_daily_ai_metrics(target_date DATE DEFAULT CURRENT_DATE)
RETURNS VOID AS $$
DECLARE
  consultation_data RECORD;
BEGIN
  -- 해당 날짜의 데이터 집계
  SELECT 
    COUNT(*) as total_consultations,
    AVG(response_time)::INTEGER as avg_response_time,
    SUM(cost) as total_cost,
    AVG(confidence) as avg_confidence,
    COUNT(*) FILTER (WHERE 'claude-opus' = ANY(ai_used)) as claude_usage,
    COUNT(*) FILTER (WHERE 'gpt4-turbo' = ANY(ai_used)) as gpt4_usage,
    COUNT(*) FILTER (WHERE 'gemini-pro' = ANY(ai_used)) as gemini_usage,
    COUNT(*) FILTER (WHERE strategy_used = 'single_ai') as single_ai_count,
    COUNT(*) FILTER (WHERE strategy_used = 'parallel_hybrid') as parallel_hybrid_count,
    COUNT(*) FILTER (WHERE strategy_used = 'sequential_cascade') as sequential_cascade_count,
    COUNT(*) FILTER (WHERE strategy_used = 'consensus_voting') as consensus_voting_count
  INTO consultation_data
  FROM ai_consultations
  WHERE DATE(created_at) = target_date;
  
  -- 메트릭 테이블에 삽입 또는 업데이트
  INSERT INTO ai_performance_metrics (
    date, total_consultations, avg_response_time, total_cost, avg_confidence,
    claude_usage_count, gpt4_usage_count, gemini_usage_count,
    single_ai_count, parallel_hybrid_count, sequential_cascade_count, consensus_voting_count
  ) VALUES (
    target_date, 
    consultation_data.total_consultations,
    consultation_data.avg_response_time,
    consultation_data.total_cost,
    consultation_data.avg_confidence,
    consultation_data.claude_usage,
    consultation_data.gpt4_usage,
    consultation_data.gemini_usage,
    consultation_data.single_ai_count,
    consultation_data.parallel_hybrid_count,
    consultation_data.sequential_cascade_count,
    consultation_data.consensus_voting_count
  )
  ON CONFLICT (date) DO UPDATE SET
    total_consultations = EXCLUDED.total_consultations,
    avg_response_time = EXCLUDED.avg_response_time,
    total_cost = EXCLUDED.total_cost,
    avg_confidence = EXCLUDED.avg_confidence,
    claude_usage_count = EXCLUDED.claude_usage_count,
    gpt4_usage_count = EXCLUDED.gpt4_usage_count,
    gemini_usage_count = EXCLUDED.gemini_usage_count,
    single_ai_count = EXCLUDED.single_ai_count,
    parallel_hybrid_count = EXCLUDED.parallel_hybrid_count,
    sequential_cascade_count = EXCLUDED.sequential_cascade_count,
    consensus_voting_count = EXCLUDED.consensus_voting_count,
    created_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) 설정
ALTER TABLE ai_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_system_health ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 컨설팅 기록만 조회 가능
CREATE POLICY "Users can view own consultations" ON ai_consultations
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- 사용자는 자신의 컨설팅 기록 생성 가능 (API를 통해서만)
CREATE POLICY "Users can insert own consultations" ON ai_consultations
  FOR INSERT WITH CHECK (
    user_id IN (
      SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- 관리자만 성능 메트릭과 시스템 헬스 조회 가능
CREATE POLICY "Admin only performance metrics" ON ai_performance_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE clerk_id = auth.jwt() ->> 'sub' 
      AND email = 'jhlim725@gmail.com'
    )
  );

CREATE POLICY "Admin only system health" ON ai_system_health
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE clerk_id = auth.jwt() ->> 'sub' 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- 관리자만 시스템 헬스 기록 생성 가능
CREATE POLICY "Admin only insert system health" ON ai_system_health
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE clerk_id = auth.jwt() ->> 'sub' 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- 초기 데이터 및 예제
INSERT INTO ai_system_health (claude_status, openai_status, gemini_status, cache_status, overall_status, response_times)
VALUES ('healthy', 'healthy', 'healthy', 'healthy', 'healthy', '{"claude": 0, "openai": 0, "gemini": 0}')
ON CONFLICT DO NOTHING;

-- 커멘트 추가
COMMENT ON TABLE ai_consultations IS 'Triple-AI 컨설팅 기록 테이블';
COMMENT ON TABLE ai_performance_metrics IS 'AI 시스템 일일 성능 메트릭';
COMMENT ON TABLE ai_system_health IS 'AI 시스템 헬스체크 로그';

COMMENT ON COLUMN ai_consultations.korean_cultural_context IS '한국 문화 맥락 최적화 데이터 (JSON)';
COMMENT ON COLUMN ai_consultations.ai_used IS '사용된 AI 모델 목록 (배열)';
COMMENT ON COLUMN ai_consultations.strategy_used IS '실행 전략: single_ai, parallel_hybrid, sequential_cascade, consensus_voting';
COMMENT ON COLUMN ai_consultations.confidence IS '응답 신뢰도 (0.0 - 1.0)';
COMMENT ON COLUMN ai_consultations.cost IS '컨설팅 비용 (USD)';

-- 관리자에게 모든 권한 부여
GRANT ALL PRIVILEGES ON ai_consultations TO postgres;
GRANT ALL PRIVILEGES ON ai_performance_metrics TO postgres;
GRANT ALL PRIVILEGES ON ai_system_health TO postgres;