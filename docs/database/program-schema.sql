-- 프로그램 관리 시스템 데이터베이스 스키마
-- Supabase PostgreSQL 기반

-- ============================================================================
-- 1. ENUMS 정의
-- ============================================================================

-- 프로그램 카테고리
CREATE TYPE program_category AS ENUM (
  'ceo_education',      -- CEO 교육
  'asset_management',   -- 자산 관리
  'networking',         -- 네트워킹
  'cultural',          -- 문화 프로그램
  'investment'         -- 투자 관련
);

-- 프로그램 상태
CREATE TYPE program_status AS ENUM (
  'draft',             -- 초안
  'published',         -- 게시됨
  'registration_open', -- 등록 오픈
  'full',             -- 정원 마감
  'in_progress',      -- 진행 중
  'completed',        -- 완료
  'cancelled'         -- 취소
);

-- 등록 상태
CREATE TYPE registration_status AS ENUM (
  'pending',          -- 대기 중
  'approved',         -- 승인됨
  'rejected',         -- 거부됨
  'waitlisted',       -- 대기 목록
  'cancelled'         -- 취소됨
);

-- 참석 상태
CREATE TYPE attendance_status AS ENUM (
  'registered',       -- 등록됨
  'attended',         -- 참석함
  'no_show',         -- 불참
  'excused'          -- 사유 있는 불참
);

-- 결제 상태
CREATE TYPE payment_status AS ENUM (
  'pending',          -- 결제 대기
  'completed',        -- 결제 완료
  'failed',          -- 결제 실패
  'refunded'         -- 환불됨
);

-- 사용자 등급
CREATE TYPE user_tier AS ENUM (
  'guest',           -- 게스트
  'member',          -- 일반 회원
  'vip',            -- VIP 회원
  'premium',        -- 프리미엄 회원
  'admin'           -- 관리자
);

-- ============================================================================
-- 2. 기본 테이블들
-- ============================================================================

-- 사용자 프로필 확장 (기존 Clerk users 테이블과 연동)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL, -- Clerk User ID
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  position TEXT,
  tier user_tier DEFAULT 'member',
  preferences JSONB DEFAULT '{}', -- 관심사, 선호도 등
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 강사/전문가 정보
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  profile_image TEXT,
  expertise TEXT[],
  contact_info JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 장소 정보
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  capacity INTEGER,
  facilities TEXT[],
  contact_info JSONB,
  coordinates JSONB, -- {lat, lng}
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. 프로그램 관련 테이블들
-- ============================================================================

-- 프로그램 마스터
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier
  category program_category NOT NULL,
  description TEXT NOT NULL,
  summary TEXT, -- 짧은 요약
  target_audience TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 50,
  frequency TEXT, -- '월 1회', '분기 1회' 등
  duration INTEGER, -- 분 단위
  price DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'KRW',
  status program_status DEFAULT 'draft',
  
  -- 자격 요건
  requirements TEXT[],
  benefits TEXT[],
  
  -- 미디어
  featured_image TEXT,
  gallery_images TEXT[],
  
  -- 메타데이터
  tags TEXT[],
  seo_title TEXT,
  seo_description TEXT,
  
  -- 설정
  auto_approve BOOLEAN DEFAULT false,
  require_approval BOOLEAN DEFAULT true,
  allow_waitlist BOOLEAN DEFAULT true,
  
  -- 타임스탬프
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  
  -- 인덱스
  CONSTRAINT unique_program_slug UNIQUE(slug)
);

-- 프로그램 일정
CREATE TABLE program_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  session_number INTEGER NOT NULL,
  title TEXT,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location_id UUID REFERENCES locations(id),
  instructor_id UUID REFERENCES instructors(id),
  max_capacity INTEGER, -- 세션별 정원 (프로그램 전체 정원과 다를 수 있음)
  is_mandatory BOOLEAN DEFAULT true,
  materials TEXT[], -- 준비물, 자료 등
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 프로그램-강사 관계 (다대다)
CREATE TABLE program_instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'instructor', -- 'instructor', 'coordinator', 'guest' 등
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(program_id, instructor_id, role)
);

-- ============================================================================
-- 4. 등록 및 참가 관련 테이블들
-- ============================================================================

-- 프로그램 등록
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  
  -- 등록 정보
  status registration_status DEFAULT 'pending',
  application_date TIMESTAMPTZ DEFAULT NOW(),
  approved_date TIMESTAMPTZ,
  approved_by UUID REFERENCES user_profiles(id),
  
  -- 결제 정보
  payment_status payment_status DEFAULT 'pending',
  payment_amount DECIMAL(10,2),
  payment_reference TEXT,
  payment_date TIMESTAMPTZ,
  
  -- 추가 정보
  application_notes TEXT, -- 지원자 메모
  admin_notes TEXT, -- 관리자 메모
  special_requirements TEXT, -- 특별 요구사항
  
  -- 참석 관련
  attendance_status attendance_status DEFAULT 'registered',
  attended_sessions INTEGER DEFAULT 0,
  total_sessions INTEGER,
  
  -- 피드백
  feedback_submitted BOOLEAN DEFAULT false,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  feedback_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 한 사용자는 같은 프로그램에 한 번만 등록 가능
  UNIQUE(user_id, program_id)
);

-- 세션별 참석 기록
CREATE TABLE session_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  schedule_id UUID NOT NULL REFERENCES program_schedules(id) ON DELETE CASCADE,
  status attendance_status DEFAULT 'registered',
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(registration_id, schedule_id)
);

-- ============================================================================
-- 5. 콘텐츠 및 자료 관리
-- ============================================================================

-- 프로그램 자료
CREATE TABLE program_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES program_schedules(id) ON DELETE CASCADE, -- 특정 세션용 자료
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'pdf', 'video', 'image', 'document' 등
  file_size BIGINT, -- 바이트 단위
  is_public BOOLEAN DEFAULT false, -- 등록자만 볼 수 있는지 여부
  download_allowed BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 공지사항
CREATE TABLE program_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  is_pinned BOOLEAN DEFAULT false,
  send_notification BOOLEAN DEFAULT true,
  target_audience TEXT DEFAULT 'all', -- 'all', 'registered', 'approved'
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. 알림 및 커뮤니케이션
-- ============================================================================

-- 알림 로그
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'email', 'sms', 'push', 'in_app'
  subject TEXT,
  content TEXT NOT NULL,
  related_program_id UUID REFERENCES programs(id),
  related_registration_id UUID REFERENCES registrations(id),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  delivery_status TEXT DEFAULT 'sent', -- 'sent', 'delivered', 'failed'
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 이메일 템플릿
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  variables TEXT[], -- 사용 가능한 변수들
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. 통계 및 분석
-- ============================================================================

-- 프로그램 통계 (일별)
CREATE TABLE program_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  page_views INTEGER DEFAULT 0,
  registrations_count INTEGER DEFAULT 0,
  approvals_count INTEGER DEFAULT 0,
  cancellations_count INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(program_id, date)
);

-- 사용자 활동 로그
CREATE TABLE user_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'view', 'register', 'cancel', 'login' 등
  resource_type TEXT, -- 'program', 'registration', 'profile' 등
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. 인덱스 생성
-- ============================================================================

-- 프로그램 검색 최적화
CREATE INDEX idx_programs_category ON programs(category);
CREATE INDEX idx_programs_status ON programs(status);
CREATE INDEX idx_programs_published_at ON programs(published_at) WHERE published_at IS NOT NULL;
CREATE INDEX idx_programs_title_search ON programs USING gin(to_tsvector('korean', title));
CREATE INDEX idx_programs_description_search ON programs USING gin(to_tsvector('korean', description));

-- 등록 관련 최적화
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_registrations_program_id ON registrations(program_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX idx_registrations_application_date ON registrations(application_date);

-- 일정 관련 최적화
CREATE INDEX idx_program_schedules_program_id ON program_schedules(program_id);
CREATE INDEX idx_program_schedules_start_time ON program_schedules(start_time);
CREATE INDEX idx_program_schedules_location_id ON program_schedules(location_id);

-- 사용자 관련 최적화
CREATE INDEX idx_user_profiles_clerk_user_id ON user_profiles(clerk_user_id);
CREATE INDEX idx_user_profiles_tier ON user_profiles(tier);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);

-- ============================================================================
-- 9. RLS (Row Level Security) 정책
-- ============================================================================

-- RLS 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 사용자 프로필 정책
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');

-- 프로그램 정책 (게시된 프로그램은 모든 사용자가 조회 가능)
CREATE POLICY "Published programs are viewable by everyone" ON programs
  FOR SELECT USING (status IN ('published', 'registration_open', 'full', 'in_progress'));

CREATE POLICY "Admins can manage all programs" ON programs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE clerk_user_id = auth.jwt() ->> 'sub' 
      AND tier = 'admin'
    )
  );

-- 등록 정책
CREATE POLICY "Users can view their own registrations" ON registrations
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM user_profiles 
      WHERE clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

CREATE POLICY "Users can create their own registrations" ON registrations
  FOR INSERT WITH CHECK (
    user_id IN (
      SELECT id FROM user_profiles 
      WHERE clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- ============================================================================
-- 10. 트리거 및 함수
-- ============================================================================

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 생성
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_program_schedules_updated_at BEFORE UPDATE ON program_schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 등록 승인시 알림 생성 함수
CREATE OR REPLACE FUNCTION notify_registration_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    INSERT INTO notifications (user_id, type, subject, content, related_registration_id)
    VALUES (
      NEW.user_id,
      'email',
      '프로그램 등록이 승인되었습니다',
      '축하합니다! 신청하신 프로그램 등록이 승인되었습니다.',
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER registration_approval_notification 
  AFTER UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION notify_registration_approval();

-- ============================================================================
-- 11. 뷰 생성
-- ============================================================================

-- 프로그램 상세 정보 뷰 (조인 최적화)
CREATE VIEW program_details AS
SELECT 
  p.*,
  COALESCE(reg_stats.total_registrations, 0) as total_registrations,
  COALESCE(reg_stats.approved_registrations, 0) as approved_registrations,
  COALESCE(reg_stats.pending_registrations, 0) as pending_registrations,
  COALESCE(schedule_info.next_session, NULL) as next_session_date,
  COALESCE(schedule_info.total_sessions, 0) as total_sessions
FROM programs p
LEFT JOIN (
  SELECT 
    program_id,
    COUNT(*) as total_registrations,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_registrations,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_registrations
  FROM registrations
  GROUP BY program_id
) reg_stats ON p.id = reg_stats.program_id
LEFT JOIN (
  SELECT 
    program_id,
    MIN(CASE WHEN start_time > NOW() THEN start_time END) as next_session,
    COUNT(*) as total_sessions
  FROM program_schedules
  GROUP BY program_id
) schedule_info ON p.id = schedule_info.program_id;

-- 사용자 등록 현황 뷰
CREATE VIEW user_registration_summary AS
SELECT 
  up.id as user_id,
  up.name,
  up.email,
  up.tier,
  COUNT(r.id) as total_registrations,
  COUNT(CASE WHEN r.status = 'approved' THEN 1 END) as approved_registrations,
  COUNT(CASE WHEN r.attendance_status = 'attended' THEN 1 END) as attended_programs,
  MAX(r.application_date) as last_registration_date
FROM user_profiles up
LEFT JOIN registrations r ON up.id = r.user_id
GROUP BY up.id, up.name, up.email, up.tier;

-- ============================================================================
-- 12. 초기 데이터 삽입
-- ============================================================================

-- 기본 위치 정보
INSERT INTO locations (name, address, capacity, facilities) VALUES
('삼성금융캠퍼스', '서울 중구 세종대로 73 태평로빌딩 10층', 100, ARRAY['프로젝터', '음향시설', '주차장']),
('프리미엄 세미나룸', '서울 강남구 테헤란로 123', 50, ARRAY['화상회의', '케이터링', '발렛파킹']);

-- 기본 이메일 템플릿
INSERT INTO email_templates (name, subject, html_content, variables) VALUES
('registration_approved', '프로그램 등록 승인 안내', 
 '<h2>{{program_title}} 등록이 승인되었습니다</h2><p>안녕하세요 {{user_name}}님,</p><p>신청해주신 프로그램 등록이 승인되었습니다.</p>', 
 ARRAY['user_name', 'program_title', 'start_date']),
('registration_reminder', '프로그램 시작 안내', 
 '<h2>{{program_title}} 시작 안내</h2><p>내일 시작되는 프로그램에 대한 안내입니다.</p>', 
 ARRAY['user_name', 'program_title', 'start_date', 'location']);

-- 기본 강사 정보 (예시)
INSERT INTO instructors (name, title, bio, expertise) VALUES
('김철수 교수', '서울대학교 경영학과 교수', '30년간 경영 전략 분야의 권위자', ARRAY['경영전략', 'ESG', '조직관리']),
('이영희 대표', '아트컨설팅 전문가', '20년간 예술품 투자 및 컨설팅 경험', ARRAY['예술투자', '미술감정', '문화예술']);

-- 완료 메시지
SELECT 'Program Management System Database Schema Created Successfully!' as status;