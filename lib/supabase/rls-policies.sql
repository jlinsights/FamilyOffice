-- Supabase Row Level Security (RLS) 정책
-- 데이터베이스 보안을 위한 필수 설정

-- ===========================
-- Users 테이블 보안 정책
-- ===========================

-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 모든 기존 정책 삭제 (재설정용)
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Admin can view all users" ON users;
DROP POLICY IF EXISTS "Admin can manage all users" ON users;

-- 1. 사용자는 자신의 프로필만 조회 가능
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT 
  USING (auth.uid() = id);

-- 2. 사용자는 자신의 프로필만 업데이트 가능
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 3. 새 사용자 프로필 생성 허용 (OAuth 콜백 시)
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 4. 관리자는 모든 사용자 조회 가능
CREATE POLICY "Admin can view all users" ON users
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- 5. 관리자는 모든 사용자 관리 가능
CREATE POLICY "Admin can manage all users" ON users
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- Consultations 테이블 보안 정책
-- ===========================

-- RLS 활성화
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can create consultations" ON consultations;
DROP POLICY IF EXISTS "Admin can view all consultations" ON consultations;
DROP POLICY IF EXISTS "Admin can manage all consultations" ON consultations;
DROP POLICY IF EXISTS "Anyone can insert consultations" ON consultations;

-- 1. 사용자는 자신의 상담 내역만 조회 가능 (이메일 기준)
CREATE POLICY "Users can view own consultations" ON consultations
  FOR SELECT 
  USING (
    email = (
      SELECT email FROM users WHERE id = auth.uid()
    )
  );

-- 2. 인증된 사용자는 상담 신청 가능
CREATE POLICY "Users can create consultations" ON consultations
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- 3. 관리자는 모든 상담 내역 조회 가능
CREATE POLICY "Admin can view all consultations" ON consultations
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- 4. 관리자는 모든 상담 내역 관리 가능
CREATE POLICY "Admin can manage all consultations" ON consultations
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- Performance Metrics 테이블 보안 정책
-- ===========================

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert metrics" ON performance_metrics;
DROP POLICY IF EXISTS "Admin can view all metrics" ON performance_metrics;

-- 1. 누구나 메트릭 데이터 삽입 가능 (익명 사용자 포함)
CREATE POLICY "Anyone can insert metrics" ON performance_metrics
  FOR INSERT 
  WITH CHECK (true);

-- 2. 관리자만 메트릭 조회 가능
CREATE POLICY "Admin can view all metrics" ON performance_metrics
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- Content Recommendations 테이블 보안 정책
-- ===========================

ALTER TABLE content_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own recommendations" ON content_recommendations;
DROP POLICY IF EXISTS "Admin can view all recommendations" ON content_recommendations;
DROP POLICY IF EXISTS "Service role can manage recommendations" ON content_recommendations;

-- 1. 사용자는 자신의 추천 내역만 조회 가능
CREATE POLICY "Users can view own recommendations" ON content_recommendations
  FOR SELECT 
  USING (
    user_id::uuid = auth.uid()
  );

-- 2. 관리자는 모든 추천 내역 조회 가능
CREATE POLICY "Admin can view all recommendations" ON content_recommendations
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );


-- ===========================
-- Workflow Executions & Lead Activities (내부 데이터)
-- ===========================

ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Admin can view workflows" ON workflow_executions;
DROP POLICY IF EXISTS "Admin can view activities" ON lead_activities;

-- 1. 관리자만 워크플로우 실행 내역 조회
CREATE POLICY "Admin can view workflows" ON workflow_executions
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- 2. 관리자만 리드 활동 내역 조회
CREATE POLICY "Admin can view activities" ON lead_activities
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- Structure Check Requests (구조 점검)
-- ===========================

ALTER TABLE structure_check_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit structure check requests" ON structure_check_requests;
DROP POLICY IF EXISTS "Admins can view all structure check requests" ON structure_check_requests;
DROP POLICY IF EXISTS "Admins can update structure check requests" ON structure_check_requests;

-- 1. 누구나 요청 제출 가능 (INSERT)
-- 주의: API Route에서 Admin Key로 처리하더라도, 만약 클라이언트 직접 전송을 허용하려면 필요함.
-- 현재는 API Route(Admin Key) 사용 예정이므로, 아래 정책은 '비상용' 또는 '클라이언트 직접 전송 전환 시' 유용.
-- 보안 강화를 위해, API Route 방식이 확정되면 이 INSERT 정책은 제거하거나 authenticated로 제한할 수 있음.
-- 여기서는 유연성을 위해 Anon Key 허용을 유지하되, 추후 API Route 전용으로 전환 시 삭제 권장.
CREATE POLICY "Anyone can submit structure check requests" ON structure_check_requests
  FOR INSERT 
  WITH CHECK (true);

-- 2. 관리자만 조회 가능
CREATE POLICY "Admins can view all structure check requests" ON structure_check_requests
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- 3. 관리자만 업데이트 가능
CREATE POLICY "Admins can update structure check requests" ON structure_check_requests
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );



-- ===========================
-- 보안 함수 및 트리거
-- ===========================

-- 사용자 업데이트 시 updated_at 자동 갱신
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 기존 트리거 삭제 후 재생성
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===========================
-- 카카오 토큰 암호화 함수
-- ===========================

-- 토큰 암호화 함수 (pgcrypto 확장 필요)
CREATE OR REPLACE FUNCTION encrypt_kakao_token(token TEXT)
RETURNS TEXT AS $$
BEGIN
    -- 실제 구현 시에는 환경변수에서 암호화 키를 가져와야 함
    RETURN CASE 
        WHEN token IS NULL OR token = '' THEN NULL
        ELSE encode(digest(token, 'sha256'), 'hex')
    END;
END;
$$ LANGUAGE plpgsql;

-- 토큰 업데이트 시 자동 암호화 트리거
CREATE OR REPLACE FUNCTION encrypt_kakao_token_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.kakao_access_token IS DISTINCT FROM OLD.kakao_access_token THEN
        NEW.kakao_access_token = encrypt_kakao_token(NEW.kakao_access_token);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 적용
DROP TRIGGER IF EXISTS encrypt_kakao_token_on_update ON users;
CREATE TRIGGER encrypt_kakao_token_on_update
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION encrypt_kakao_token_trigger();

-- ===========================
-- 감사 로그 테이블 (선택사항)
-- ===========================

-- 감사 로그 테이블 생성
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 감사 로그 RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 관리자만 감사 로그 조회 가능
CREATE POLICY "Admin can view audit logs" ON audit_logs
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- ===========================
-- 인덱스 최적화
-- ===========================

-- 사용자 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_kakao_id ON users(kakao_id);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- 상담 테이블 인덱스  
CREATE INDEX IF NOT EXISTS idx_consultations_email ON consultations(email);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at);
CREATE INDEX IF NOT EXISTS idx_consultations_service_type ON consultations(service_type);

-- Performance Metrics 인덱스
CREATE INDEX IF NOT EXISTS idx_performance_metrics_created_at ON performance_metrics(created_at);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_metric_name ON performance_metrics(metric_name);

-- Content Recommendations 인덱스
CREATE INDEX IF NOT EXISTS idx_content_recommendations_user_id ON content_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_content_recommendations_content_id ON content_recommendations(content_id);

-- 실행 가이드 주석
/*
이 SQL 파일을 실행하는 방법:
1. Supabase 대시보드 접속
2. SQL Editor로 이동
3. 이 파일의 내용을 붙여넣기
4. 실행 버튼 클릭
*/