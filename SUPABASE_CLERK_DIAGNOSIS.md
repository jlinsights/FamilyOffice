# FamilyOffice S - Supabase & Clerk 환경변수 진단 보고서

## 🚨 발견된 중요 문제점들

### 1. **데이터베이스 스키마 불일치 (Critical)**

**문제**: Webhook 코드와 TypeScript 스키마 간 필드 불일치
- Webhook에서 사용: `clerk_id`, `first_name`, `last_name`, `image_url`, `phone_number`, `metadata`
- Supabase 스키마: `name`, `avatar_url`, `phone` (필드명 불일치)

**영향**: 
- ❌ Clerk 웹훅이 실패하여 사용자 동기화 안됨
- ❌ 새 사용자 등록 시 오류 발생
- ❌ 사용자 정보 업데이트 실패

**해결**: ✅ 완료
- TypeScript 스키마 수정 (`types/supabase.ts`)
- 데이터베이스 마이그레이션 스크립트 생성 (`supabase/migrations/001_fix_users_table.sql`)

### 2. **환경변수 보안 문제 (High)**

**문제**: 민감한 정보가 일반 텍스트로 저장
- Clerk 시크릿 키들이 `.env.local`에 노출
- Supabase 서비스 롤 키 노출
- 각종 API 키들이 버전 관리에 포함될 위험

**권장사항**:
- 🔐 `.env.local`을 `.gitignore`에 추가 확인
- 🔐 Production 환경에서는 Vercel Environment Variables 사용
- 🔐 Development 전용 키와 Production 키 분리

### 3. **환경변수 검증 누락 (Medium)**

**문제**: 필수 환경변수 누락 시 애플리케이션이 제대로 오류를 처리하지 못함

**해결**: ✅ 완료
- Zod 스키마를 통한 런타임 검증 강화
- 개발/프로덕션 환경별 다른 검증 정책 적용

## 🔧 적용된 해결책

### 1. Supabase 스키마 수정

```typescript
// types/supabase.ts 업데이트
users: {
  Row: {
    id: string;
    clerk_id: string | null;        // 🆕 추가
    email: string | null;
    first_name: string | null;      // 🆕 추가  
    last_name: string | null;       // 🆕 추가
    name: string | null;            // 기존 유지 (호환성)
    image_url: string | null;       // 🆕 추가
    avatar_url: string | null;      // 기존 유지 (호환성)
    phone_number: string | null;    // 🆕 추가
    phone: string | null;           // 기존 유지 (호환성)
    metadata: Json | null;          // 🆕 추가
    // ... 기타 필드들
  };
  // Insert, Update 스키마도 동일하게 업데이트
}
```

### 2. 데이터베이스 마이그레이션

```sql
-- supabase/migrations/001_fix_users_table.sql
-- 필요한 컬럼들 추가
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS clerk_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT, 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS metadata JSONB;

-- 동기화 트리거 함수 생성 (기존 필드와 호환성 유지)
CREATE OR REPLACE FUNCTION sync_user_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- name = first_name + last_name 동기화
  IF NEW.first_name IS NOT NULL OR NEW.last_name IS NOT NULL THEN
    NEW.name = TRIM(COALESCE(NEW.first_name, '') || ' ' || COALESCE(NEW.last_name, ''));
  END IF;
  
  -- image_url ↔ avatar_url 동기화
  -- phone_number ↔ phone 동기화
  -- updated_at 자동 갱신
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 3. 환경변수 보안 강화

```typescript
// lib/env.ts 업데이트
export const serverEnvSchema = z.object({
  // 필수 환경변수 (production에서는 필수)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase Service Role Key is required'),
  CLERK_SECRET_KEY: z.string().min(1, 'Clerk Secret Key is required'),
  CLERK_WEBHOOK_SECRET: z.string().min(1, 'Clerk Webhook Secret is required'),
  // ... 기타 환경변수들
});

export const clientEnvSchema = z.object({
  // 필수 클라이언트 환경변수
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, 'Clerk Publishable Key is required'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase Anon Key is required'),
  // ... 기타 환경변수들
});
```

## ⚠️ 즉시 실행해야 할 작업들

### 1. Supabase 데이터베이스 업데이트 (Critical)

```bash
# Supabase CLI 사용
cd /Users/jaehong/Developer/Projects/FamilyOffice
npx supabase db push

# 또는 Supabase Dashboard에서 직접 실행
# supabase/migrations/001_fix_users_table.sql 내용을 복사하여 SQL Editor에서 실행
```

### 2. 환경변수 검증 테스트

```bash
# 개발 서버 재시작하여 환경변수 검증 확인
npm run dev

# 콘솔에서 환경변수 검증 로그 확인
# Warning 메시지가 있다면 해당 환경변수 추가 필요
```

### 3. Clerk 웹훅 테스트

Clerk Dashboard에서 테스트 웹훅 발송하여 사용자 동기화 작동 확인:

1. **Clerk Dashboard** → **Webhooks** → **Test** 버튼 클릭
2. `user.created` 이벤트로 테스트 진행
3. Supabase `users` 테이블에서 새 레코드 생성 확인

## 🔐 보안 권장사항

### 1. 환경변수 관리

**Development**:
```bash
# .env.local (로컬 개발용 - 절대 커밋하지 말 것)
CLERK_SECRET_KEY=sk_test_...  # 개발용 키
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # 개발용 키
```

**Production**:
```bash
# Vercel Environment Variables (프로덕션용)
CLERK_SECRET_KEY=sk_live_...  # 프로덕션 키
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # 프로덕션 키
```

### 2. 키 로테이션 계획

- 🔄 **Clerk 키**: 3개월마다 로테이션
- 🔄 **Supabase 키**: 6개월마다 로테이션  
- 🔄 **기타 API 키**: 사용량과 보안 정책에 따라

### 3. 접근 권한 관리

- 👥 **개발팀**: Development 키만 접근
- 👤 **Lead**: Production 키 접근 권한
- 🏢 **Vercel 팀**: Production 환경변수 관리

## 📊 작업 완료 체크리스트

- [x] TypeScript 스키마 수정 (`types/supabase.ts`)
- [x] 데이터베이스 마이그레이션 스크립트 생성
- [x] 환경변수 검증 시스템 강화
- [x] 보안 가이드라인 문서화
- [ ] **Supabase 데이터베이스 마이그레이션 실행** (Critical)
- [ ] **Clerk 웹훅 테스트 및 검증** (High)
- [ ] **프로덕션 환경변수 설정** (High)
- [ ] **개발팀 보안 교육** (Medium)

## 📞 다음 단계

1. **즉시**: Supabase 마이그레이션 실행
2. **1일 내**: Clerk 웹훅 테스트 완료
3. **1주 내**: 프로덕션 환경변수 재설정
4. **정기적**: 환경변수 로테이션 계획 수립

---

**작성일**: 2025년 1월 25일  
**작성자**: Claude Code SuperClaude Framework  
**검토 필요**: Supabase 마이그레이션 실행 후 재검토