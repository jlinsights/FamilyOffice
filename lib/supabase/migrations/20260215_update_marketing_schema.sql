-- Migration to support email-based lead scoring without HubSpot dependency

-- 1. Update lead_activities table
ALTER TABLE lead_activities 
ADD COLUMN IF NOT EXISTS email TEXT;

CREATE INDEX IF NOT EXISTS idx_lead_activities_email ON lead_activities(email);

-- 2. Update lead_scores table
ALTER TABLE lead_scores 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Make hubspot_contact_id nullable since we might have leads only by email initially
ALTER TABLE lead_scores 
ALTER COLUMN hubspot_contact_id DROP NOT NULL;

-- Add unique constraint on email for lead_scores
CREATE UNIQUE INDEX IF NOT EXISTS idx_lead_scores_email ON lead_scores(email);

-- 3. Update RLS policies to allow authenticated users (or service role) to manage their own data if needed, or keep it admin-only.
-- For now, we keep the admin-only policies but ensure they cover the new columns if necessary.

-- 4. Create a function to update lead score by email (alternative to the existing hubspot_id based one)
CREATE OR REPLACE FUNCTION calculate_lead_score_by_email(target_email TEXT)
RETURNS INTEGER AS $$
DECLARE
    behavior_score INTEGER := 0;
    engagement_score INTEGER := 0;
    total INTEGER := 0;
BEGIN
    -- 행동 기반 점수 계산 (최근 30일 활동)
    SELECT COALESCE(SUM(score_impact), 0) INTO behavior_score
    FROM lead_activities 
    WHERE email = target_email 
    AND created_at >= NOW() - INTERVAL '30 days';
    
    -- 참여도 점수 (폼 제출, 상담 신청 등)
    SELECT COUNT(*) * 10 INTO engagement_score
    FROM lead_activities 
    WHERE email = target_email 
    AND activity_type IN ('form_submit', 'consultation_request', 'download')
    AND created_at >= NOW() - INTERVAL '90 days';
    
    -- 총점 계산 (최대 100점)
    total := LEAST(behavior_score + engagement_score, 100);
    
    -- lead_scores 테이블에 업데이트 또는 삽입
    INSERT INTO lead_scores (email, behavioral_score, engagement_score, total_score, score_grade)
    VALUES (target_email, behavior_score, engagement_score, total, 
            CASE 
                WHEN total >= 80 THEN 'A'
                WHEN total >= 60 THEN 'B' 
                WHEN total >= 40 THEN 'C'
                ELSE 'D'
            END)
    ON CONFLICT (email) 
    DO UPDATE SET 
        behavioral_score = EXCLUDED.behavioral_score,
        engagement_score = EXCLUDED.engagement_score,
        total_score = EXCLUDED.total_score,
        score_grade = EXCLUDED.score_grade,
        last_calculated_at = NOW();
        
    RETURN total;
END;
$$ LANGUAGE plpgsql;
