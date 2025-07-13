-- FamilyOffice S Supabase Database Setup
-- 상담 신청 테이블 생성

-- 기존 정책 삭제 (에러 방지)
DROP POLICY IF EXISTS "Anyone can insert consultations" ON consultations;
DROP POLICY IF EXISTS "Admin can view all consultations" ON consultations;
DROP POLICY IF EXISTS "Admin can update consultations" ON consultations;

-- consultations 테이블 생성
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed'))
);

-- Row Level Security (RLS) 비활성화 (테스트용)
ALTER TABLE consultations DISABLE ROW LEVEL SECURITY;

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS consultations_created_at_idx ON consultations(created_at);
CREATE INDEX IF NOT EXISTS consultations_status_idx ON consultations(status);
CREATE INDEX IF NOT EXISTS consultations_email_idx ON consultations(email);

-- 테스트 데이터 삽입
INSERT INTO consultations (name, email, phone, service_type, message, status) 
VALUES ('테스트', 'test@example.com', '010-1234-5678', 'wealth-management', '테스트 문의입니다.', 'pending')
ON CONFLICT (id) DO NOTHING;