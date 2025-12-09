-- FamilyOffice S - Marketing & Analytics Tables Migration
-- 마케팅 자동화 및 분석 기능을 위한 테이블 스키마 생성

-- ============================================================
-- Performance Metrics Table
-- 성능 지표 추적을 위한 테이블
-- ============================================================
CREATE TABLE IF NOT EXISTS public.performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_type TEXT NOT NULL DEFAULT 'custom',
  url TEXT,
  user_agent TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 성능 지표 인덱스
CREATE INDEX IF NOT EXISTS idx_performance_metrics_metric_name ON public.performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_timestamp ON public.performance_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_metric_type ON public.performance_metrics(metric_type);

COMMENT ON TABLE public.performance_metrics IS 'Web application performance metrics tracking';
COMMENT ON COLUMN public.performance_metrics.metric_name IS 'Name of the performance metric (e.g., LCP, FID, CLS)';
COMMENT ON COLUMN public.performance_metrics.metric_value IS 'Numeric value of the metric';
COMMENT ON COLUMN public.performance_metrics.metric_type IS 'Type of metric (web-vital, custom, etc.)';

-- ============================================================
-- Lead Activities Table
-- 리드 활동 추적 및 스코어링
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hubspot_contact_id TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB NOT NULL DEFAULT '{}',
  score_impact NUMERIC NOT NULL DEFAULT 0,
  total_score NUMERIC NOT NULL DEFAULT 0,
  score_grade TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 리드 활동 인덱스
CREATE INDEX IF NOT EXISTS idx_lead_activities_hubspot_contact_id ON public.lead_activities(hubspot_contact_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_user_id ON public.lead_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_activity_type ON public.lead_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON public.lead_activities(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_activities_total_score ON public.lead_activities(total_score);

COMMENT ON TABLE public.lead_activities IS 'Lead scoring and activity tracking for marketing automation';
COMMENT ON COLUMN public.lead_activities.hubspot_contact_id IS 'HubSpot contact identifier';
COMMENT ON COLUMN public.lead_activities.score_impact IS 'Impact of this activity on lead score';
COMMENT ON COLUMN public.lead_activities.total_score IS 'Cumulative lead score after this activity';
COMMENT ON COLUMN public.lead_activities.score_grade IS 'Lead grade (A, B, C, D based on score)';

-- ============================================================
-- Content Recommendations Table
-- AI 기반 콘텐츠 추천
-- ============================================================
CREATE TABLE IF NOT EXISTS public.content_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  hubspot_contact_id TEXT,
  content_id TEXT NOT NULL,
  content_title TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content_url TEXT NOT NULL,
  relevance_score NUMERIC NOT NULL CHECK (relevance_score >= 0 AND relevance_score <= 1),
  ai_confidence NUMERIC NOT NULL CHECK (ai_confidence >= 0 AND ai_confidence <= 1),
  recommendation_reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  viewed_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ
);

-- 콘텐츠 추천 인덱스
CREATE INDEX IF NOT EXISTS idx_content_recommendations_user_id ON public.content_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_content_recommendations_hubspot_contact_id ON public.content_recommendations(hubspot_contact_id);
CREATE INDEX IF NOT EXISTS idx_content_recommendations_status ON public.content_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_content_recommendations_created_at ON public.content_recommendations(created_at);
CREATE INDEX IF NOT EXISTS idx_content_recommendations_relevance_score ON public.content_recommendations(relevance_score);

COMMENT ON TABLE public.content_recommendations IS 'AI-powered content recommendations for users';
COMMENT ON COLUMN public.content_recommendations.relevance_score IS 'How relevant the content is (0-1)';
COMMENT ON COLUMN public.content_recommendations.ai_confidence IS 'AI confidence in recommendation (0-1)';
COMMENT ON COLUMN public.content_recommendations.status IS 'Recommendation status (pending, viewed, clicked)';

-- ============================================================
-- Workflow Executions Table
-- 마케팅 워크플로우 실행 추적
-- ============================================================
CREATE TABLE IF NOT EXISTS public.workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id TEXT NOT NULL,
  workflow JSONB,
  workflow_steps JSONB,
  hubspot_contact_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  current_step INTEGER NOT NULL DEFAULT 0,
  total_steps INTEGER NOT NULL,
  execution_data JSONB DEFAULT '{}',
  error_message TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  next_action_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  enrolled_count INTEGER NOT NULL DEFAULT 0
);

-- 워크플로우 실행 인덱스
CREATE INDEX IF NOT EXISTS idx_workflow_executions_workflow_id ON public.workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_hubspot_contact_id ON public.workflow_executions(hubspot_contact_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_status ON public.workflow_executions(status);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_next_action_at ON public.workflow_executions(next_action_at);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_created_at ON public.workflow_executions(created_at);

COMMENT ON TABLE public.workflow_executions IS 'Marketing workflow execution tracking and automation';
COMMENT ON COLUMN public.workflow_executions.workflow_id IS 'Unique identifier for the workflow template';
COMMENT ON COLUMN public.workflow_executions.status IS 'Execution status (pending, running, completed, failed)';
COMMENT ON COLUMN public.workflow_executions.current_step IS 'Current step in workflow execution';
COMMENT ON COLUMN public.workflow_executions.next_action_at IS 'Scheduled time for next workflow action';
COMMENT ON COLUMN public.workflow_executions.enrolled_count IS 'Number of contacts enrolled in this workflow';

-- ============================================================
-- Triggers for updated_at
-- ============================================================

-- Workflow executions updated_at trigger
CREATE OR REPLACE FUNCTION update_workflow_executions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_workflow_executions_updated_at ON public.workflow_executions;
CREATE TRIGGER trigger_update_workflow_executions_updated_at
  BEFORE UPDATE ON public.workflow_executions
  FOR EACH ROW
  EXECUTE FUNCTION update_workflow_executions_updated_at();

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Performance metrics: Admin only
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can view all performance metrics" ON public.performance_metrics;
CREATE POLICY "Admin can view all performance metrics" ON public.performance_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()::text
      AND users.email = 'jhlim725@gmail.com'
    )
  );

DROP POLICY IF EXISTS "Service role has full access to performance metrics" ON public.performance_metrics;
CREATE POLICY "Service role has full access to performance metrics" ON public.performance_metrics
  FOR ALL USING (current_setting('role', true) = 'service_role');

-- Lead activities: Admin and service role
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can view all lead activities" ON public.lead_activities;
CREATE POLICY "Admin can view all lead activities" ON public.lead_activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()::text
      AND users.email = 'jhlim725@gmail.com'
    )
  );

DROP POLICY IF EXISTS "Service role has full access to lead activities" ON public.lead_activities;
CREATE POLICY "Service role has full access to lead activities" ON public.lead_activities
  FOR ALL USING (current_setting('role', true) = 'service_role');

-- Content recommendations: Users can view their own
ALTER TABLE public.content_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own recommendations" ON public.content_recommendations;
CREATE POLICY "Users can view own recommendations" ON public.content_recommendations
  FOR SELECT USING (user_id = auth.uid()::text);

DROP POLICY IF EXISTS "Admin can view all recommendations" ON public.content_recommendations;
CREATE POLICY "Admin can view all recommendations" ON public.content_recommendations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()::text
      AND users.email = 'jhlim725@gmail.com'
    )
  );

DROP POLICY IF EXISTS "Service role has full access to recommendations" ON public.content_recommendations;
CREATE POLICY "Service role has full access to recommendations" ON public.content_recommendations
  FOR ALL USING (current_setting('role', true) = 'service_role');

-- Workflow executions: Admin and service role only
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can view all workflow executions" ON public.workflow_executions;
CREATE POLICY "Admin can view all workflow executions" ON public.workflow_executions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()::text
      AND users.email = 'jhlim725@gmail.com'
    )
  );

DROP POLICY IF EXISTS "Service role has full access to workflow executions" ON public.workflow_executions;
CREATE POLICY "Service role has full access to workflow executions" ON public.workflow_executions
  FOR ALL USING (current_setting('role', true) = 'service_role');

-- ============================================================
-- Grant Permissions
-- ============================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.performance_metrics TO service_role;
GRANT SELECT ON public.performance_metrics TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_activities TO service_role;
GRANT SELECT ON public.lead_activities TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_recommendations TO service_role;
GRANT SELECT, UPDATE ON public.content_recommendations TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflow_executions TO service_role;
GRANT SELECT ON public.workflow_executions TO authenticated;
