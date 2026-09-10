-- ==========================================================================
-- APPLY_LEADS_MIGRATION.sql
-- Idempotent script — safe to run multiple times.
--
-- Creates the `leads` and `email_events` tables required by
-- POST /api/leads/capture, with indexes, RLS policies, and triggers.
--
-- HOW TO RUN:
--   1. Open Supabase Dashboard → SQL Editor
--   2. Paste this entire script
--   3. Click "Run"
--   4. Verify: SELECT count(*) FROM leads; -- should return 0
-- ==========================================================================

-- 0. UUID extension (already enabled on most Supabase projects)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================================
-- 1. LEADS TABLE
-- ==========================================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(20),

  -- Calculation results
  total_assets BIGINT,
  total_debts BIGINT,
  net_assets BIGINT,
  estimated_tax BIGINT,

  -- Family
  has_spouse BOOLEAN DEFAULT false,
  num_children INTEGER DEFAULT 0,
  num_minor_children INTEGER DEFAULT 0,

  -- Lead source / UTM
  source VARCHAR(50) DEFAULT 'calculator',
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_content VARCHAR(100),
  referring_url TEXT,

  -- Beehiiv integration
  beehiiv_subscription_id VARCHAR(100),
  beehiiv_status VARCHAR(20),
  automation_started_at TIMESTAMPTZ,

  -- Email tracking (day 1-7)
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

  -- Conversion tracking
  consultation_requested BOOLEAN DEFAULT false,
  consultation_requested_at TIMESTAMPTZ,
  consultation_completed BOOLEAN DEFAULT false,
  consultation_completed_at TIMESTAMPTZ,
  converted_to_client BOOLEAN DEFAULT false,
  converted_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT email_valid CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_beehiiv_status ON leads(beehiiv_status);
CREATE INDEX IF NOT EXISTS idx_leads_consultation_requested
  ON leads(consultation_requested) WHERE consultation_requested = true;
CREATE INDEX IF NOT EXISTS idx_leads_converted
  ON leads(converted_to_client) WHERE converted_to_client = true;

-- ==========================================================================
-- 2. EMAIL_EVENTS TABLE
-- ==========================================================================
CREATE TABLE IF NOT EXISTS email_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  email_day INTEGER CHECK (email_day >= 1 AND email_day <= 7),
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_events_lead_id ON email_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_events_type ON email_events(event_type);
CREATE INDEX IF NOT EXISTS idx_email_events_day ON email_events(email_day);
CREATE INDEX IF NOT EXISTS idx_email_events_created_at ON email_events(created_at DESC);

-- ==========================================================================
-- 3. AUTO-UPDATE TRIGGER (updated_at)
-- ==========================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================================================
-- 4. ROW LEVEL SECURITY
-- ==========================================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

-- Service role (used by /api/leads/capture via createAdminClient)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'leads' AND policyname = 'Service role access on leads'
  ) THEN
    CREATE POLICY "Service role access on leads" ON leads
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'email_events' AND policyname = 'Service role access on email_events'
  ) THEN
    CREATE POLICY "Service role access on email_events" ON email_events
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- Admin JWT access (Supabase Dashboard / direct queries)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'leads' AND policyname = 'Admin full access on leads'
  ) THEN
    CREATE POLICY "Admin full access on leads" ON leads
      FOR ALL USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'email_events' AND policyname = 'Admin full access on email_events'
  ) THEN
    CREATE POLICY "Admin full access on email_events" ON email_events
      FOR ALL USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');
  END IF;
END $$;

-- ==========================================================================
-- 5. TABLE COMMENTS
-- ==========================================================================
COMMENT ON TABLE leads IS 'Email automation leads collected from calculator, blog, and other sources';
COMMENT ON TABLE email_events IS 'Event log for email interactions (sent, opened, clicked, etc.)';

-- ==========================================================================
-- 6. VERIFICATION
-- ==========================================================================
-- After running, these should return 0 (no rows yet, but no error):
--   SELECT count(*) FROM leads;
--   SELECT count(*) FROM email_events;
--
-- Then test the API:
--   curl -X POST https://www.familyoffices.vip/api/leads/capture \
--     -H 'Content-Type: application/json' \
--     -d '{"email":"migration-test@example.com","source":"migration_verify"}'
