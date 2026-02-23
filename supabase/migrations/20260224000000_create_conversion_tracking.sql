-- Migration: Create conversion tracking tables
-- Feature: conversion-tracking (PDCA Do phase)

-- 1. Raw event log (append-only)
CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  funnel_stage TEXT NOT NULL DEFAULT 'visit',
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  email TEXT,
  lead_id UUID,
  ip_hash TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  client_timestamp TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversion_events_session ON conversion_events(session_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_type ON conversion_events(event_type);
CREATE INDEX IF NOT EXISTS idx_conversion_events_stage ON conversion_events(funnel_stage);
CREATE INDEX IF NOT EXISTS idx_conversion_events_created ON conversion_events(created_at);
CREATE INDEX IF NOT EXISTS idx_conversion_events_email ON conversion_events(email) WHERE email IS NOT NULL;

-- 2. Funnel journey tracker (one per visitor journey)
CREATE TABLE IF NOT EXISTS conversion_funnel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE NOT NULL,
  email TEXT,
  lead_id UUID,
  current_stage TEXT NOT NULL DEFAULT 'visit',
  visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  engaged_at TIMESTAMPTZ,
  lead_at TIMESTAMPTZ,
  consultation_booked_at TIMESTAMPTZ,
  consultation_done_at TIMESTAMPTZ,
  client_at TIMESTAMPTZ,
  first_utm_source TEXT,
  first_utm_medium TEXT,
  first_utm_campaign TEXT,
  first_landing_page TEXT,
  first_referrer TEXT,
  total_events INTEGER DEFAULT 0,
  total_page_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversion_funnel_stage ON conversion_funnel(current_stage);
CREATE INDEX IF NOT EXISTS idx_conversion_funnel_email ON conversion_funnel(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_conversion_funnel_created ON conversion_funnel(created_at);

-- 3. Daily aggregation table (populated by cron/service)
CREATE TABLE IF NOT EXISTS conversion_daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  stage TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  utm_source TEXT,
  utm_medium TEXT,
  conversion_rate NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, stage, COALESCE(utm_source, ''), COALESCE(utm_medium, ''))
);

CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON conversion_daily_stats(date);

-- 4. RLS policies
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_funnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_daily_stats ENABLE ROW LEVEL SECURITY;

-- Service role has full access (no restrictive policies needed for service role)
-- Public/anon has no access by default when RLS is enabled
