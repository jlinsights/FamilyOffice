-- 구조 점검 요청 테이블
CREATE TABLE IF NOT EXISTS structure_check_requests (
  -- Primary key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,

  -- Required questions (필수 질문)
  q1_decision_made TEXT NOT NULL CHECK (q1_decision_made IN ('yes', 'no')),
  q1_decision_detail TEXT,

  q2_documented TEXT NOT NULL CHECK (q2_documented IN ('yes', 'no')),

  q3_authority_clear TEXT NOT NULL CHECK (q3_authority_clear IN ('clear', 'partial', 'unclear')),

  q4_cash_plan TEXT NOT NULL CHECK (q4_cash_plan IN ('structure_exists', 'rough_idea', 'not_considered')),

  q5_deadline TEXT NOT NULL CHECK (q5_deadline IN ('within_6m', '1_2y', 'when_needed')),

  -- Optional questions (선택 질문)
  q6_concerns TEXT[], -- Array of concern types
  q7_advisors TEXT[], -- Array of current advisors

  -- Additional information
  additional_notes TEXT,

  -- Auto-calculated fields
  qualification_score INTEGER DEFAULT 0, -- 0-5 점수

  -- Status tracking
  status TEXT DEFAULT 'pending_review' CHECK (
    status IN ('pending_review', 'approved', 'on_hold', 'low_priority', 'completed')
  ),

  -- Meeting tracking
  meeting_scheduled_at TIMESTAMPTZ,
  meeting_completed_at TIMESTAMPTZ,

  -- Admin notes
  admin_notes TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,

  -- Email tracking
  confirmation_email_sent BOOLEAN DEFAULT FALSE,
  confirmation_email_sent_at TIMESTAMPTZ,
  meeting_email_sent BOOLEAN DEFAULT FALSE,
  meeting_email_sent_at TIMESTAMPTZ,

  -- Timestamps
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_structure_check_status ON structure_check_requests(status);
CREATE INDEX IF NOT EXISTS idx_structure_check_email ON structure_check_requests(email);
CREATE INDEX IF NOT EXISTS idx_structure_check_score ON structure_check_requests(qualification_score DESC);
CREATE INDEX IF NOT EXISTS idx_structure_check_submitted ON structure_check_requests(submitted_at DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_structure_check_requests_updated_at
  BEFORE UPDATE ON structure_check_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE structure_check_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public insert (폼 제출)
CREATE POLICY "Anyone can submit structure check requests"
  ON structure_check_requests
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated admins can view (Admin만 조회)
CREATE POLICY "Admins can view all structure check requests"
  ON structure_check_requests
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE email = 'jhlim725@gmail.com'
    )
  );

-- Policy: Only authenticated admins can update (Admin만 수정)
CREATE POLICY "Admins can update structure check requests"
  ON structure_check_requests
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE email = 'jhlim725@gmail.com'
    )
  );

-- Comments for documentation
COMMENT ON TABLE structure_check_requests IS '구조 점검 요청 테이블 - 인바운드 오더 전환 시스템';
COMMENT ON COLUMN structure_check_requests.qualification_score IS '자동 필터링 점수: 5문항 중 "정리 안됨" 응답 개수 (0-5)';
COMMENT ON COLUMN structure_check_requests.status IS '진행 상태: pending_review(검토대기), approved(승인), on_hold(보류), low_priority(낮은우선순위), completed(완료)';
