/**
 * Supabase Admin Client (Service Role Key 사용)
 * 관리자 권한이 필요한 작업에서 사용
 * 타입 안전성을 보장하기 위해 Database 타입을 명시적으로 전달
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

/**
 * 서비스 역할 키를 사용하는 Supabase 클라이언트 생성
 * 이 클라이언트는 RLS를 우회하고 모든 권한을 가집니다.
 * 주의: 서버 사이드에서만 사용하고, 클라이언트 코드에 노출하지 마세요.
 */
export function createAdminClient(): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
