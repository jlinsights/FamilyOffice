-- ==========================================
-- Supabase Setup Script (Consolidated)
-- Includes:
-- 1. Table Creation (structure_check_requests)
-- 2. RLS Policies (All Tables)
-- ==========================================

-- 0. Create Users Table & Sync Trigger
-- (Essential for RLS and Auth integration)

CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  phone TEXT,
  provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  kakao_id TEXT,
  kakao_access_token TEXT,
  marketing_consent BOOLEAN DEFAULT FALSE,
  last_sign_in_at TIMESTAMPTZ
);

-- Sync Trigger: Automatically create public.users record when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, provider)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_app_meta_data->>'provider'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 1. Create structure_check_requests Table
CREATE TABLE IF NOT EXISTS structure_check_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  q1_decision_made TEXT NOT NULL CHECK (q1_decision_made IN ('yes', 'no')),
  q1_decision_detail TEXT,
  q2_documented TEXT NOT NULL CHECK (q2_documented IN ('yes', 'no')),
  q3_authority_clear TEXT NOT NULL CHECK (q3_authority_clear IN ('clear', 'partial', 'unclear')),
  q4_cash_plan TEXT NOT NULL CHECK (q4_cash_plan IN ('structure_exists', 'rough_idea', 'not_considered')),
  q5_deadline TEXT NOT NULL CHECK (q5_deadline IN ('within_6m', '1_2y', 'when_needed')),
  q6_concerns TEXT[],
  q7_advisors TEXT[],
  additional_notes TEXT,
  qualification_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'on_hold', 'low_priority', 'completed')),
  meeting_scheduled_at TIMESTAMPTZ,
  meeting_completed_at TIMESTAMPTZ,
  admin_notes TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  confirmation_email_sent BOOLEAN DEFAULT FALSE,
  confirmation_email_sent_at TIMESTAMPTZ,
  meeting_email_sent BOOLEAN DEFAULT FALSE,
  meeting_email_sent_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_structure_check_status ON structure_check_requests(status);
CREATE INDEX IF NOT EXISTS idx_structure_check_email ON structure_check_requests(email);
CREATE INDEX IF NOT EXISTS idx_structure_check_score ON structure_check_requests(qualification_score DESC);
CREATE INDEX IF NOT EXISTS idx_structure_check_submitted ON structure_check_requests(submitted_at DESC);

-- 2. Enable RLS on All Tables

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE structure_check_requests ENABLE ROW LEVEL SECURITY;

-- 3. Apply RLS Policies

-- Users
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Admin can view all users" ON users;
DROP POLICY IF EXISTS "Admin can manage all users" ON users;

CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin can view all users" ON users FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));
CREATE POLICY "Admin can manage all users" ON users FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));

-- Consultations
DROP POLICY IF EXISTS "Users can view own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can create consultations" ON consultations;
DROP POLICY IF EXISTS "Admin can view all consultations" ON consultations;
DROP POLICY IF EXISTS "Admin can manage all consultations" ON consultations;
DROP POLICY IF EXISTS "Anyone can insert consultations" ON consultations;

CREATE POLICY "Users can view own consultations" ON consultations FOR SELECT USING (email = (SELECT email FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can create consultations" ON consultations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admin can view all consultations" ON consultations FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));
CREATE POLICY "Admin can manage all consultations" ON consultations FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));

-- Performance Metrics
DROP POLICY IF EXISTS "Anyone can insert metrics" ON performance_metrics;
DROP POLICY IF EXISTS "Admin can view all metrics" ON performance_metrics;

CREATE POLICY "Anyone can insert metrics" ON performance_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all metrics" ON performance_metrics FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));

-- Content Recommendations
DROP POLICY IF EXISTS "Users can view own recommendations" ON content_recommendations;
DROP POLICY IF EXISTS "Admin can view all recommendations" ON content_recommendations;

CREATE POLICY "Users can view own recommendations" ON content_recommendations FOR SELECT USING (user_id::uuid = auth.uid());
CREATE POLICY "Admin can view all recommendations" ON content_recommendations FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));

-- Workflow & Activities
DROP POLICY IF EXISTS "Admin can view workflows" ON workflow_executions;
DROP POLICY IF EXISTS "Admin can view activities" ON lead_activities;

CREATE POLICY "Admin can view workflows" ON workflow_executions FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));
CREATE POLICY "Admin can view activities" ON lead_activities FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));

-- Structure Check Requests
DROP POLICY IF EXISTS "Anyone can submit structure check requests" ON structure_check_requests;
DROP POLICY IF EXISTS "Admins can view all structure check requests" ON structure_check_requests;
DROP POLICY IF EXISTS "Admins can update structure check requests" ON structure_check_requests;

CREATE POLICY "Anyone can submit structure check requests" ON structure_check_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all structure check requests" ON structure_check_requests FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));
CREATE POLICY "Admins can update structure check requests" ON structure_check_requests FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND email = 'jhlim725@gmail.com'));
