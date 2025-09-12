-- Supabase 보안 체크를 위한 RPC 함수들
-- 보안 감사 및 모니터링에 필요한 시스템 정보를 제공

-- ===========================
-- 1. 테이블의 RLS 상태 확인
-- ===========================

CREATE OR REPLACE FUNCTION get_table_rls_status()
RETURNS TABLE (
  table_schema text,
  table_name text,
  rls_enabled boolean
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.table_schema::text,
    t.table_name::text,
    COALESCE(c.relrowsecurity, false) as rls_enabled
  FROM information_schema.tables t
  LEFT JOIN pg_class c ON c.relname = t.table_name
  LEFT JOIN pg_namespace n ON n.oid = c.relnamespace AND n.nspname = t.table_schema
  WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
    AND t.table_name IN ('users', 'consultations', 'audit_logs')
  ORDER BY t.table_name;
END;
$$;

-- ===========================
-- 2. 테이블의 정책 목록 조회
-- ===========================

CREATE OR REPLACE FUNCTION get_table_policies()
RETURNS TABLE (
  table_schema text,
  table_name text,
  policy_name text,
  policy_cmd text,
  policy_permissive text,
  policy_roles text[]
)
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pol.schemaname::text as table_schema,
    pol.tablename::text as table_name,
    pol.policyname::text as policy_name,
    pol.cmd::text as policy_cmd,
    pol.permissive::text as policy_permissive,
    pol.roles as policy_roles
  FROM pg_policies pol
  WHERE pol.schemaname = 'public'
    AND pol.tablename IN ('users', 'consultations', 'audit_logs')
  ORDER BY pol.tablename, pol.policyname;
END;
$$;

-- ===========================
-- 3. 암호화된 컬럼 확인
-- ===========================

CREATE OR REPLACE FUNCTION get_encrypted_columns()
RETURNS TABLE (
  table_name text,
  column_name text,
  data_type text,
  is_encrypted boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.table_name::text,
    c.column_name::text,
    c.data_type::text,
    CASE 
      WHEN c.column_name LIKE '%token%' OR 
           c.column_name LIKE '%password%' OR
           c.column_name LIKE '%secret%' OR
           c.column_name = 'phone' OR
           c.column_name = 'personal_id'
      THEN true
      ELSE false
    END as is_encrypted
  FROM information_schema.columns c
  WHERE c.table_schema = 'public'
    AND c.table_name IN ('users', 'consultations')
    AND c.column_name IN ('kakao_access_token', 'phone', 'personal_id', 'password', 'secret_key')
  ORDER BY c.table_name, c.column_name;
END;
$$;

-- ===========================
-- 4. 사용자 세션 모니터링
-- ===========================

CREATE OR REPLACE FUNCTION get_active_sessions()
RETURNS TABLE (
  user_id uuid,
  email text,
  last_sign_in_at timestamp with time zone,
  session_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id as user_id,
    u.email::text,
    u.last_sign_in_at,
    COUNT(*)::bigint as session_count
  FROM auth.users u
  WHERE u.last_sign_in_at > NOW() - INTERVAL '24 hours'
  GROUP BY u.id, u.email, u.last_sign_in_at
  ORDER BY u.last_sign_in_at DESC;
END;
$$;

-- ===========================
-- 5. 의심스러운 활동 감지
-- ===========================

CREATE OR REPLACE FUNCTION detect_suspicious_activity()
RETURNS TABLE (
  user_id uuid,
  email text,
  activity_type text,
  activity_count bigint,
  last_activity timestamp with time zone,
  risk_level text
)
LANGUAGE plpgsql
SECURITY DEFINER  
AS $$
BEGIN
  RETURN QUERY
  -- 최근 1시간 내 과도한 로그인 시도
  SELECT 
    u.id as user_id,
    u.email::text,
    'excessive_login_attempts'::text as activity_type,
    COUNT(*)::bigint as activity_count,
    MAX(u.last_sign_in_at) as last_activity,
    CASE 
      WHEN COUNT(*) > 20 THEN 'HIGH'
      WHEN COUNT(*) > 10 THEN 'MEDIUM'
      ELSE 'LOW'
    END::text as risk_level
  FROM auth.users u
  WHERE u.created_at > NOW() - INTERVAL '1 hour'
  GROUP BY u.id, u.email
  HAVING COUNT(*) > 5
  
  UNION ALL
  
  -- 관리자 계정의 비정상적 접근
  SELECT 
    u.id as user_id,
    u.email::text,
    'admin_unusual_access'::text as activity_type,
    1::bigint as activity_count,
    u.last_sign_in_at as last_activity,
    'HIGH'::text as risk_level
  FROM auth.users u
  JOIN users pu ON pu.id = u.id
  WHERE u.email = 'jhlim725@gmail.com'
    AND u.last_sign_in_at > NOW() - INTERVAL '1 hour'
    AND EXTRACT(hour FROM u.last_sign_in_at) NOT BETWEEN 9 AND 18 -- 업무 시간 외 접근
    
  ORDER BY last_activity DESC;
END;
$$;

-- ===========================
-- 6. 데이터베이스 통계 정보
-- ===========================

CREATE OR REPLACE FUNCTION get_security_statistics()
RETURNS TABLE (
  metric_name text,
  metric_value text,
  metric_category text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'total_users'::text as metric_name,
    COUNT(*)::text as metric_value,
    'users'::text as metric_category
  FROM auth.users
  WHERE deleted_at IS NULL
  
  UNION ALL
  
  SELECT 
    'admin_users'::text as metric_name,
    COUNT(*)::text as metric_value,
    'users'::text as metric_category
  FROM users
  WHERE email = 'jhlim725@gmail.com'
  
  UNION ALL
  
  SELECT 
    'active_sessions_24h'::text as metric_name,
    COUNT(*)::text as metric_value,
    'sessions'::text as metric_category
  FROM auth.users
  WHERE last_sign_in_at > NOW() - INTERVAL '24 hours'
  
  UNION ALL
  
  SELECT 
    'consultations_total'::text as metric_name,
    COUNT(*)::text as metric_value,
    'data'::text as metric_category
  FROM consultations
  
  UNION ALL
  
  SELECT 
    'rls_enabled_tables'::text as metric_name,
    COUNT(*)::text as metric_value,
    'security'::text as metric_category
  FROM (
    SELECT t.table_name
    FROM information_schema.tables t
    JOIN pg_class c ON c.relname = t.table_name
    WHERE t.table_schema = 'public'
      AND t.table_type = 'BASE TABLE'
      AND c.relrowsecurity = true
  ) rls_tables;
END;
$$;

-- ===========================
-- 7. 보안 감사 로그 기능
-- ===========================

CREATE OR REPLACE FUNCTION log_security_event(
  event_type text,
  event_description text,
  user_id_param uuid DEFAULT NULL,
  severity_level text DEFAULT 'INFO',
  additional_data jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  audit_id uuid;
BEGIN
  -- audit_logs 테이블이 없으면 생성
  CREATE TABLE IF NOT EXISTS security_audit_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type text NOT NULL,
    event_description text NOT NULL,
    user_id uuid REFERENCES auth.users(id),
    severity_level text NOT NULL DEFAULT 'INFO',
    additional_data jsonb DEFAULT '{}'::jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamp with time zone DEFAULT NOW()
  );

  INSERT INTO security_audit_logs (
    event_type,
    event_description,
    user_id,
    severity_level,
    additional_data
  ) VALUES (
    event_type,
    event_description,
    user_id_param,
    severity_level,
    additional_data
  ) RETURNING id INTO audit_id;

  RETURN audit_id;
END;
$$;

-- ===========================
-- 8. 보안 권한 설정
-- ===========================

-- RPC 함수들에 대한 실행 권한 부여
GRANT EXECUTE ON FUNCTION get_table_rls_status() TO service_role;
GRANT EXECUTE ON FUNCTION get_table_policies() TO service_role;
GRANT EXECUTE ON FUNCTION get_encrypted_columns() TO service_role;
GRANT EXECUTE ON FUNCTION get_active_sessions() TO service_role;
GRANT EXECUTE ON FUNCTION detect_suspicious_activity() TO service_role;
GRANT EXECUTE ON FUNCTION get_security_statistics() TO service_role;
GRANT EXECUTE ON FUNCTION log_security_event(text, text, uuid, text, jsonb) TO service_role;

-- security_audit_logs 테이블 RLS 설정
ALTER TABLE IF EXISTS security_audit_logs ENABLE ROW LEVEL SECURITY;

-- 관리자만 보안 감사 로그 조회 가능
DROP POLICY IF EXISTS "Admin can view security audit logs" ON security_audit_logs;
CREATE POLICY "Admin can view security audit logs" ON security_audit_logs
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND email = 'jhlim725@gmail.com'
    )
  );

-- Service role은 모든 작업 가능
DROP POLICY IF EXISTS "Service role full access" ON security_audit_logs;
CREATE POLICY "Service role full access" ON security_audit_logs
  FOR ALL 
  USING (auth.role() = 'service_role');

-- ===========================
-- 설치 및 실행 가이드
-- ===========================

/*
이 SQL 파일을 실행하는 방법:

1. Supabase 대시보드 → SQL Editor
2. 이 파일 내용을 붙여넣기 후 실행
3. TypeScript에서 사용:

```typescript
// RLS 상태 확인
const { data } = await supabase.rpc('get_table_rls_status');

// 보안 통계
const { data } = await supabase.rpc('get_security_statistics');

// 의심스러운 활동 감지
const { data } = await supabase.rpc('detect_suspicious_activity');
```

주의사항:
- 이 함수들은 SECURITY DEFINER로 설정되어 높은 권한이 필요
- 프로덕션 환경에서는 적절한 모니터링과 함께 사용
- 보안 감사 로그는 정기적으로 백업 및 아카이브 필요
*/