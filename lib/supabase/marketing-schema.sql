-- 인바운드 마케팅 시스템을 위한 Supabase 스키마
-- HubSpot 연동, 리드 스코어링, 마케팅 자동화를 위한 테이블들

-- ===========================
-- 1. 리드 활동 추적 테이블
-- ===========================

CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hubspot_contact_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  activity_type TEXT NOT NULL, -- 'page_view', 'form_submit', 'email_open', 'property_change' 등
  activity_data JSONB NOT NULL DEFAULT '{}',
  score_impact INTEGER DEFAULT 0, -- 이 활동이 리드 스코어에 미치는 영향
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  INDEX idx_lead_activities_hubspot_id (hubspot_contact_id),
  INDEX idx_lead_activities_user_id (user_id),
  INDEX idx_lead_activities_type (activity_type),
  INDEX idx_lead_activities_created (created_at DESC)
);

-- RLS 설정
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

-- 관리자만 모든 리드 활동 조회 가능
CREATE POLICY "Admin can view all lead activities" ON lead_activities
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- 2. 리드 스코어링 테이블
-- ===========================

CREATE TABLE IF NOT EXISTS lead_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hubspot_contact_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  
  -- 스코어 구성 요소
  demographic_score INTEGER DEFAULT 0, -- 회사 규모, 직급 등
  behavioral_score INTEGER DEFAULT 0,  -- 웹사이트 활동, 콘텐츠 소비 등
  engagement_score INTEGER DEFAULT 0,  -- 이메일 반응, 상담 신청 등
  
  -- 총 스코어 및 등급
  total_score INTEGER DEFAULT 0,
  score_grade TEXT DEFAULT 'D', -- A, B, C, D 등급
  
  -- 마지막 계산 시점
  last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  INDEX idx_lead_scores_hubspot_id (hubspot_contact_id),
  INDEX idx_lead_scores_total_score (total_score DESC),
  INDEX idx_lead_scores_grade (score_grade)
);

-- RLS 설정
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage lead scores" ON lead_scores
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- 스코어 업데이트 시 updated_at 자동 갱신
CREATE OR REPLACE FUNCTION update_lead_score_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lead_scores_updated_at
    BEFORE UPDATE ON lead_scores
    FOR EACH ROW
    EXECUTE FUNCTION update_lead_score_timestamp();

-- ===========================
-- 3. 딜 활동 추적 테이블
-- ===========================

CREATE TABLE IF NOT EXISTS deal_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hubspot_deal_id TEXT NOT NULL,
  hubspot_contact_id TEXT,
  activity_type TEXT NOT NULL, -- 'stage_change', 'deal_created', 'amount_change' 등
  activity_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  INDEX idx_deal_activities_deal_id (hubspot_deal_id),
  INDEX idx_deal_activities_contact_id (hubspot_contact_id),
  INDEX idx_deal_activities_type (activity_type),
  INDEX idx_deal_activities_created (created_at DESC)
);

-- RLS 설정
ALTER TABLE deal_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all deal activities" ON deal_activities
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- 4. 마케팅 캠페인 테이블
-- ===========================

CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  campaign_type TEXT NOT NULL, -- 'email', 'content', 'webinar', 'nurture' 등
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed'
  
  -- 캠페인 설정
  target_audience JSONB DEFAULT '{}', -- 타겟팅 조건
  content_data JSONB DEFAULT '{}',    -- 콘텐츠 및 설정
  automation_rules JSONB DEFAULT '{}', -- 자동화 규칙
  
  -- 성과 메트릭
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  
  -- 스케줄링
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  INDEX idx_campaigns_status (status),
  INDEX idx_campaigns_type (campaign_type),
  INDEX idx_campaigns_dates (start_date, end_date)
);

-- RLS 설정
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage campaigns" ON marketing_campaigns
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- 5. 콘텐츠 추천 테이블
-- ===========================

CREATE TABLE IF NOT EXISTS content_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hubspot_contact_id TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'blog_post', 'whitepaper', 'case_study', 'webinar' 등
  content_id TEXT NOT NULL,   -- 콘텐츠 식별자
  content_title TEXT NOT NULL,
  content_url TEXT,
  
  -- 추천 알고리즘 정보
  recommendation_reason TEXT, -- 추천 이유
  relevance_score NUMERIC(5,2) DEFAULT 0.0, -- 관련도 점수 (0-100)
  ai_confidence NUMERIC(5,2) DEFAULT 0.0,   -- AI 추천 신뢰도 (0-100)
  
  -- 추천 상태 및 성과
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'viewed', 'clicked'
  sent_at TIMESTAMP WITH TIME ZONE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  INDEX idx_content_recs_contact_id (hubspot_contact_id),
  INDEX idx_content_recs_type (content_type),
  INDEX idx_content_recs_score (relevance_score DESC),
  INDEX idx_content_recs_status (status)
);

-- RLS 설정
ALTER TABLE content_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage content recommendations" ON content_recommendations
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- 6. 마케팅 워크플로우 테이블
-- ===========================

CREATE TABLE IF NOT EXISTS marketing_workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  workflow_type TEXT NOT NULL, -- 'nurture', 'onboarding', 'reengagement' 등
  
  -- 워크플로우 정의
  trigger_conditions JSONB NOT NULL DEFAULT '{}', -- 트리거 조건
  workflow_steps JSONB NOT NULL DEFAULT '[]',     -- 워크플로우 단계들
  
  -- 상태 및 설정
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'paused'
  is_active BOOLEAN DEFAULT false,
  
  -- 성과 메트릭
  enrolled_count INTEGER DEFAULT 0,
  completed_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  INDEX idx_workflows_type (workflow_type),
  INDEX idx_workflows_status (status),
  INDEX idx_workflows_active (is_active)
);

-- RLS 설정
ALTER TABLE marketing_workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage workflows" ON marketing_workflows
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- 7. 워크플로우 실행 로그 테이블
-- ===========================

CREATE TABLE IF NOT EXISTS workflow_executions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID REFERENCES marketing_workflows(id) ON DELETE CASCADE,
  hubspot_contact_id TEXT NOT NULL,
  
  -- 실행 상태
  status TEXT DEFAULT 'running', -- 'running', 'completed', 'failed', 'paused'
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER DEFAULT 0,
  
  -- 실행 데이터
  execution_data JSONB DEFAULT '{}',
  error_message TEXT,
  
  -- 시간 정보
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  next_action_at TIMESTAMP WITH TIME ZONE,
  
  -- 인덱스
  INDEX idx_workflow_exec_workflow_id (workflow_id),
  INDEX idx_workflow_exec_contact_id (hubspot_contact_id),
  INDEX idx_workflow_exec_status (status),
  INDEX idx_workflow_exec_next_action (next_action_at)
);

-- RLS 설정
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view workflow executions" ON workflow_executions
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- 8. 유틸리티 함수들
-- ===========================

-- 리드 스코어 계산 함수
CREATE OR REPLACE FUNCTION calculate_lead_score(contact_id TEXT)
RETURNS INTEGER AS $$
DECLARE
    demo_score INTEGER := 0;
    behavior_score INTEGER := 0;
    engagement_score INTEGER := 0;
    total INTEGER := 0;
BEGIN
    -- 행동 기반 점수 계산 (최근 30일 활동)
    SELECT COALESCE(SUM(score_impact), 0) INTO behavior_score
    FROM lead_activities 
    WHERE hubspot_contact_id = contact_id 
    AND created_at >= NOW() - INTERVAL '30 days';
    
    -- 참여도 점수 (폼 제출, 상담 신청 등)
    SELECT COUNT(*) * 10 INTO engagement_score
    FROM lead_activities 
    WHERE hubspot_contact_id = contact_id 
    AND activity_type IN ('form_submit', 'consultation_request', 'download')
    AND created_at >= NOW() - INTERVAL '90 days';
    
    -- 총점 계산 (최대 100점)
    total := LEAST(demo_score + behavior_score + engagement_score, 100);
    
    -- lead_scores 테이블에 업데이트 또는 삽입
    INSERT INTO lead_scores (hubspot_contact_id, demographic_score, behavioral_score, engagement_score, total_score, score_grade)
    VALUES (contact_id, demo_score, behavior_score, engagement_score, total, 
            CASE 
                WHEN total >= 80 THEN 'A'
                WHEN total >= 60 THEN 'B' 
                WHEN total >= 40 THEN 'C'
                ELSE 'D'
            END)
    ON CONFLICT (hubspot_contact_id) 
    DO UPDATE SET 
        demographic_score = EXCLUDED.demographic_score,
        behavioral_score = EXCLUDED.behavioral_score,
        engagement_score = EXCLUDED.engagement_score,
        total_score = EXCLUDED.total_score,
        score_grade = EXCLUDED.score_grade,
        last_calculated_at = NOW();
        
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- 마케팅 메트릭 조회 함수
CREATE OR REPLACE FUNCTION get_marketing_metrics(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    total_leads BIGINT,
    qualified_leads BIGINT,
    conversion_rate NUMERIC,
    avg_lead_score NUMERIC,
    top_activities TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    WITH lead_stats AS (
        SELECT 
            COUNT(DISTINCT hubspot_contact_id) as total,
            COUNT(DISTINCT CASE WHEN ls.total_score >= 60 THEN ls.hubspot_contact_id END) as qualified,
            AVG(ls.total_score) as avg_score
        FROM lead_activities la
        LEFT JOIN lead_scores ls ON la.hubspot_contact_id = ls.hubspot_contact_id
        WHERE la.created_at >= NOW() - (days_back || ' days')::INTERVAL
    ),
    activity_stats AS (
        SELECT array_agg(activity_type ORDER BY activity_count DESC) as top_acts
        FROM (
            SELECT activity_type, COUNT(*) as activity_count
            FROM lead_activities 
            WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
            GROUP BY activity_type
            ORDER BY activity_count DESC
            LIMIT 5
        ) t
    )
    SELECT 
        ls.total,
        ls.qualified,
        CASE WHEN ls.total > 0 THEN (ls.qualified::NUMERIC / ls.total * 100) ELSE 0 END,
        COALESCE(ls.avg_score, 0),
        COALESCE(as_.top_acts, ARRAY[]::TEXT[])
    FROM lead_stats ls, activity_stats as_;
END;
$$ LANGUAGE plpgsql;

-- ===========================
-- 실행 가이드 및 초기 데이터
-- ===========================

-- 기본 마케팅 워크플로우 생성
INSERT INTO marketing_workflows (name, description, workflow_type, trigger_conditions, workflow_steps, status, is_active) 
VALUES 
(
    '신규 리드 환영 시퀀스',
    '새로 등록된 리드에게 환영 이메일과 서비스 소개를 전송',
    'onboarding',
    '{"trigger_type": "contact_created", "conditions": []}',
    '[
        {"step": 1, "type": "email", "template": "welcome", "delay_hours": 0},
        {"step": 2, "type": "email", "template": "service_intro", "delay_hours": 24},
        {"step": 3, "type": "email", "template": "consultation_cta", "delay_hours": 72}
    ]',
    'active',
    true
),
(
    '고득점 리드 육성',
    '리드 스코어 60점 이상인 리드에게 개인화된 콘텐츠 제공',
    'nurture',
    '{"trigger_type": "score_change", "conditions": [{"property": "total_score", "operator": ">=", "value": 60}]}',
    '[
        {"step": 1, "type": "content_recommendation", "content_type": "case_study", "delay_hours": 0},
        {"step": 2, "type": "email", "template": "premium_services", "delay_hours": 48},
        {"step": 3, "type": "sales_notification", "priority": "high", "delay_hours": 0}
    ]',
    'active',
    true
);

/*
설치 및 실행 가이드:

1. Supabase 대시보드에서 SQL Editor로 이동
2. 이 파일의 내용을 붙여넣고 실행
3. 환경변수 설정:
   - HUBSPOT_ACCESS_TOKEN: HubSpot Private App 토큰
   - HUBSPOT_CLIENT_SECRET: 웹훅 검증용 시크릿
4. HubSpot에서 웹훅 설정:
   - 엔드포인트: https://yourapp.com/api/webhooks/hubspot
   - 이벤트: contact.creation, contact.propertyChange, deal.creation, deal.propertyChange

테스트 방법:
1. HubSpot에서 새 콘택트 생성
2. Supabase lead_activities 테이블에 활동 로그 확인
3. 리드 스코어 계산: SELECT calculate_lead_score('contact_id');
4. 마케팅 메트릭 조회: SELECT * FROM get_marketing_metrics(30);
*/