-- Email Automation System Schema
-- Created: 2025-01-27
-- Purpose: Support email automation, lead tracking, and consultation management

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. LEADS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS leads (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact Information
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(20),

  -- Calculation Results
  total_assets BIGINT, -- 총 자산 (원)
  total_debts BIGINT, -- 총 부채 (원)
  net_assets BIGINT, -- 순자산 (원)
  estimated_tax BIGINT, -- 예상 상속세 (원)

  -- Family Information
  has_spouse BOOLEAN DEFAULT false,
  num_children INTEGER DEFAULT 0,
  num_minor_children INTEGER DEFAULT 0,

  -- Lead Source
  source VARCHAR(50) DEFAULT 'calculator', -- calculator, blog, naver, homepage
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_content VARCHAR(100),
  referring_url TEXT,

  -- Beehiiv Integration
  beehiiv_subscription_id VARCHAR(100),
  beehiiv_status VARCHAR(20), -- active, unsubscribed, bounced
  automation_started_at TIMESTAMP WITH TIME ZONE,

  -- Email Tracking (Day 1-7)
  email_day1_sent BOOLEAN DEFAULT false,
  email_day1_opened BOOLEAN DEFAULT false,
  email_day1_clicked BOOLEAN DEFAULT false,
  email_day2_sent BOOLEAN DEFAULT false,
  email_day2_opened BOOLEAN DEFAULT false,
  email_day2_clicked BOOLEAN DEFAULT false,
  email_day3_sent BOOLEAN DEFAULT false,
  email_day3_opened BOOLEAN DEFAULT false,
  email_day3_clicked BOOLEAN DEFAULT false,
  email_day4_sent BOOLEAN DEFAULT false,
  email_day4_opened BOOLEAN DEFAULT false,
  email_day4_clicked BOOLEAN DEFAULT false,
  email_day5_sent BOOLEAN DEFAULT false,
  email_day5_opened BOOLEAN DEFAULT false,
  email_day5_clicked BOOLEAN DEFAULT false,
  email_day6_sent BOOLEAN DEFAULT false,
  email_day6_opened BOOLEAN DEFAULT false,
  email_day6_clicked BOOLEAN DEFAULT false,
  email_day7_sent BOOLEAN DEFAULT false,
  email_day7_opened BOOLEAN DEFAULT false,
  email_day7_clicked BOOLEAN DEFAULT false,

  -- Conversion Tracking
  consultation_requested BOOLEAN DEFAULT false,
  consultation_requested_at TIMESTAMP WITH TIME ZONE,
  consultation_completed BOOLEAN DEFAULT false,
  consultation_completed_at TIMESTAMP WITH TIME ZONE,
  converted_to_client BOOLEAN DEFAULT false,
  converted_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes for leads table
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_beehiiv_status ON leads(beehiiv_status);
CREATE INDEX IF NOT EXISTS idx_leads_consultation_requested ON leads(consultation_requested) WHERE consultation_requested = true;
CREATE INDEX IF NOT EXISTS idx_leads_converted ON leads(converted_to_client) WHERE converted_to_client = true;

-- ==========================================
-- 2. EMAIL EVENTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS email_events (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Foreign Key
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  -- Event Details
  event_type VARCHAR(50) NOT NULL, -- sent, opened, clicked, bounced, unsubscribed, complained
  email_day INTEGER CHECK (email_day >= 1 AND email_day <= 7), -- 1-7 for email sequence
  event_data JSONB, -- Additional data (clicked URL, user agent, etc.)

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for email_events table
CREATE INDEX IF NOT EXISTS idx_email_events_lead_id ON email_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_events_type ON email_events(event_type);
CREATE INDEX IF NOT EXISTS idx_email_events_day ON email_events(email_day);
CREATE INDEX IF NOT EXISTS idx_email_events_created_at ON email_events(created_at DESC);

-- ==========================================
-- 3. CONSULTATION REQUESTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS consultation_requests (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Foreign Key (nullable - can be standalone request)
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,

  -- Contact Information
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,

  -- Consultation Preferences
  preferred_method VARCHAR(20), -- video, in_person, phone
  preferred_date DATE,
  preferred_time VARCHAR(20), -- morning, afternoon, evening
  message TEXT,

  -- Asset Information (optional)
  estimated_assets BIGINT,
  has_business BOOLEAN DEFAULT false,
  business_type VARCHAR(100),

  -- Processing Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, scheduled, completed, cancelled
  assigned_to VARCHAR(100), -- 담당 상담사
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Notes
  internal_notes TEXT,

  -- Source Tracking
  source VARCHAR(50), -- email_day7, blog, homepage, naver

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for consultation_requests table
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_created_at ON consultation_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_lead_id ON consultation_requests(lead_id);
CREATE INDEX IF NOT EXISTS idx_consultation_email ON consultation_requests(email);

-- ==========================================
-- 4. TRIGGERS
-- ==========================================

-- Auto-update updated_at column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to leads table
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to consultation_requests table
DROP TRIGGER IF EXISTS update_consultation_updated_at ON consultation_requests;
CREATE TRIGGER update_consultation_updated_at
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Admin access policy (for jhlim725@gmail.com)
CREATE POLICY "Admin full access on leads" ON leads
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');

CREATE POLICY "Admin full access on email_events" ON email_events
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');

CREATE POLICY "Admin full access on consultation_requests" ON consultation_requests
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');

-- Service role access (for API endpoints)
CREATE POLICY "Service role access on leads" ON leads
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role access on email_events" ON email_events
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role access on consultation_requests" ON consultation_requests
  FOR ALL
  USING (auth.role() = 'service_role');

-- ==========================================
-- 6. HELPER VIEWS
-- ==========================================

-- View: Lead Funnel Metrics
CREATE OR REPLACE VIEW lead_funnel_metrics AS
SELECT
  COUNT(*) AS total_leads,
  COUNT(*) FILTER (WHERE email_day1_opened) AS day1_opened,
  COUNT(*) FILTER (WHERE email_day3_clicked) AS day3_clicked,
  COUNT(*) FILTER (WHERE email_day7_clicked) AS day7_clicked,
  COUNT(*) FILTER (WHERE consultation_requested) AS consultation_requested,
  COUNT(*) FILTER (WHERE consultation_completed) AS consultation_completed,
  COUNT(*) FILTER (WHERE converted_to_client) AS converted_to_client,
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day1_opened) / NULLIF(COUNT(*), 0), 2) AS day1_open_rate,
  ROUND(100.0 * COUNT(*) FILTER (WHERE consultation_requested) / NULLIF(COUNT(*), 0), 2) AS consultation_rate,
  ROUND(100.0 * COUNT(*) FILTER (WHERE converted_to_client) / NULLIF(COUNT(*), 0), 2) AS conversion_rate
FROM leads
WHERE created_at >= NOW() - INTERVAL '30 days';

-- View: Email Engagement by Day
CREATE OR REPLACE VIEW email_engagement_by_day AS
SELECT
  1 AS day,
  COUNT(*) AS sent,
  COUNT(*) FILTER (WHERE email_day1_opened) AS opened,
  COUNT(*) FILTER (WHERE email_day1_clicked) AS clicked,
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day1_opened) / NULLIF(COUNT(*), 0), 2) AS open_rate,
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day1_clicked) / NULLIF(COUNT(*), 0), 2) AS click_rate
FROM leads
WHERE email_day1_sent = true AND created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  2, COUNT(*), COUNT(*) FILTER (WHERE email_day2_opened), COUNT(*) FILTER (WHERE email_day2_clicked),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day2_opened) / NULLIF(COUNT(*), 0), 2),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day2_clicked) / NULLIF(COUNT(*), 0), 2)
FROM leads
WHERE email_day2_sent = true AND created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  3, COUNT(*), COUNT(*) FILTER (WHERE email_day3_opened), COUNT(*) FILTER (WHERE email_day3_clicked),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day3_opened) / NULLIF(COUNT(*), 0), 2),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day3_clicked) / NULLIF(COUNT(*), 0), 2)
FROM leads
WHERE email_day3_sent = true AND created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  4, COUNT(*), COUNT(*) FILTER (WHERE email_day4_opened), COUNT(*) FILTER (WHERE email_day4_clicked),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day4_opened) / NULLIF(COUNT(*), 0), 2),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day4_clicked) / NULLIF(COUNT(*), 0), 2)
FROM leads
WHERE email_day4_sent = true AND created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  5, COUNT(*), COUNT(*) FILTER (WHERE email_day5_opened), COUNT(*) FILTER (WHERE email_day5_clicked),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day5_opened) / NULLIF(COUNT(*), 0), 2),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day5_clicked) / NULLIF(COUNT(*), 0), 2)
FROM leads
WHERE email_day5_sent = true AND created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  6, COUNT(*), COUNT(*) FILTER (WHERE email_day6_opened), COUNT(*) FILTER (WHERE email_day6_clicked),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day6_opened) / NULLIF(COUNT(*), 0), 2),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day6_clicked) / NULLIF(COUNT(*), 0), 2)
FROM leads
WHERE email_day6_sent = true AND created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  7, COUNT(*), COUNT(*) FILTER (WHERE email_day7_opened), COUNT(*) FILTER (WHERE email_day7_clicked),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day7_opened) / NULLIF(COUNT(*), 0), 2),
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_day7_clicked) / NULLIF(COUNT(*), 0), 2)
FROM leads
WHERE email_day7_sent = true AND created_at >= NOW() - INTERVAL '30 days'

ORDER BY day;

-- ==========================================
-- 7. SAMPLE DATA FOR TESTING (optional)
-- ==========================================

-- Insert sample lead for testing
-- INSERT INTO leads (
--   email, name, total_assets, total_debts, net_assets, estimated_tax,
--   has_spouse, num_children, source
-- ) VALUES (
--   'test@example.com', '테스트 사용자', 5000000000, 500000000, 4500000000, 1000000000,
--   true, 2, 'calculator'
-- );

-- ==========================================
-- 8. COMMENTS
-- ==========================================

COMMENT ON TABLE leads IS 'Email automation leads collected from calculator, blog, and other sources';
COMMENT ON TABLE email_events IS 'Event log for email interactions (sent, opened, clicked, etc.)';
COMMENT ON TABLE consultation_requests IS 'Consultation requests from leads wanting professional advice';

COMMENT ON COLUMN leads.beehiiv_subscription_id IS 'Beehiiv API subscription ID for webhook tracking';
COMMENT ON COLUMN leads.beehiiv_status IS 'Current subscription status in Beehiiv (active, unsubscribed, bounced)';
COMMENT ON COLUMN email_events.event_data IS 'Additional event data in JSON format (clicked_url, user_agent, etc.)';
COMMENT ON COLUMN consultation_requests.lead_id IS 'Optional reference to original lead (can be NULL for direct requests)';

-- Migration complete
-- Next steps:
-- 1. Run this migration on Supabase
-- 2. Create API endpoints (/api/leads/capture, /api/webhooks/beehiiv/events)
-- 3. Integrate Beehiiv API
-- 4. Update calculator page to capture emails
