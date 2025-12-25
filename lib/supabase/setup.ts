import { createClient } from './client';
import { safeFrom } from './helpers';

export async function createConsultationsTable() {
  const supabase = createClient();

  // 먼저 테이블이 존재하는지 확인
  const { error: tablesError } = await (supabase as any).rpc('get_tables');

  if (tablesError) {
    console.error('Error checking tables:', tablesError);
    return { success: false, error: tablesError };
  }

  // 테이블 생성 SQL
  const createTableSQL = `
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

    -- RLS 활성화
    ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

    -- 주의: 실제 보안 정책은 rls-policies.sql 파일에서 관리됩니다.
    -- 이 함수는 테이블 구조만 생성합니다.
  `;

  try {
    const { error } = await (supabase as any).rpc('exec_sql', {
      sql: createTableSQL,
    });

    if (error) {
      console.error('Error creating table:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Exception creating table:', error);
    return { success: false, error };
  }
}

export async function testSupabaseConnection() {
  const supabase = createClient();

  try {
    // 간단한 연결 테스트
    const { data, error } = await safeFrom(supabase, 'consultations').select(
      'count',
      { count: 'exact', head: true }
    );

    if (error) {
      console.error('Connection test error:', error);
      return {
        connected: false,
        error: error.message || 'Unknown error',
        details: error,
      };
    }

    return {
      connected: true,
      count: data?.[0]?.count || 0,
    };
  } catch (error) {
    console.error('Connection test exception:', error);
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
    };
  }
}
