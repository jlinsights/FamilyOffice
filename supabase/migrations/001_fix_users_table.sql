-- FamilyOffice S - Users Table Schema Fix
-- Clerk 연동을 위한 users 테이블 스키마 수정

-- 필요한 컬럼들 추가
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS clerk_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT, 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS metadata JSONB;

-- 기존 컬럼과의 호환성을 위한 트리거 함수 생성
CREATE OR REPLACE FUNCTION sync_user_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- name 필드를 first_name, last_name과 동기화
  IF NEW.first_name IS NOT NULL OR NEW.last_name IS NOT NULL THEN
    NEW.name = TRIM(COALESCE(NEW.first_name, '') || ' ' || COALESCE(NEW.last_name, ''));
  END IF;
  
  -- image_url과 avatar_url 동기화
  IF NEW.image_url IS NOT NULL THEN
    NEW.avatar_url = NEW.image_url;
  ELSIF NEW.avatar_url IS NOT NULL THEN
    NEW.image_url = NEW.avatar_url;
  END IF;
  
  -- phone_number와 phone 동기화
  IF NEW.phone_number IS NOT NULL THEN
    NEW.phone = NEW.phone_number;
  ELSIF NEW.phone IS NOT NULL THEN
    NEW.phone_number = NEW.phone;
  END IF;
  
  -- updated_at 자동 갱신
  NEW.updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS trigger_sync_user_fields ON public.users;
CREATE TRIGGER trigger_sync_user_fields
  BEFORE INSERT OR UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION sync_user_fields();

-- clerk_id에 인덱스 추가 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON public.users(clerk_id);

-- 기존 데이터 정리 (필요한 경우)
UPDATE public.users 
SET 
  name = TRIM(COALESCE(first_name, '') || ' ' || COALESCE(last_name, ''))
WHERE first_name IS NOT NULL OR last_name IS NOT NULL;

-- RLS (Row Level Security) 정책 확인 및 업데이트
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 사용자가 자신의 데이터만 볼 수 있도록 하는 정책
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid()::text = clerk_id OR auth.uid()::text = id);

-- 사용자가 자신의 데이터를 업데이트할 수 있도록 하는 정책  
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid()::text = clerk_id OR auth.uid()::text = id);

-- 서비스 역할은 모든 작업 가능 (webhook용)
DROP POLICY IF EXISTS "Service role has full access" ON public.users;
CREATE POLICY "Service role has full access" ON public.users
  FOR ALL USING (current_setting('role') = 'service_role');

-- 익명 사용자는 읽기만 가능 (public profile용)
DROP POLICY IF EXISTS "Anonymous users can view public profiles" ON public.users;
CREATE POLICY "Anonymous users can view public profiles" ON public.users
  FOR SELECT USING (true);

COMMENT ON TABLE public.users IS 'FamilyOffice S users table with Clerk integration';
COMMENT ON COLUMN public.users.clerk_id IS 'Clerk user ID for authentication sync';
COMMENT ON COLUMN public.users.metadata IS 'Additional user metadata from Clerk';