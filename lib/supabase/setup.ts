import { createClient } from "./client"

export async function createConsultationsTable() {
  const supabase = createClient()
  
  // 먼저 테이블이 존재하는지 확인
  const { error: tablesError } = await supabase.rpc('get_tables')
  
  if (tablesError) {
    console.error("Error checking tables:", tablesError)
    return { success: false, error: tablesError }
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
    
    -- 정책 생성
    DROP POLICY IF EXISTS "Anyone can insert consultations" ON consultations;
    DROP POLICY IF EXISTS "Admin can view all consultations" ON consultations;
    
    CREATE POLICY "Anyone can insert consultations" ON consultations
      FOR INSERT WITH CHECK (true);
      
    CREATE POLICY "Admin can view all consultations" ON consultations
      FOR SELECT USING (true);
  `
  
  try {
    const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL })
    
    if (error) {
      console.error("Error creating table:", error)
      return { success: false, error }
    }
    
    return { success: true }
  } catch (error) {
    console.error("Exception creating table:", error)
    return { success: false, error }
  }
}

export async function testSupabaseConnection() {
  const supabase = createClient()
  
  try {
    // 간단한 연결 테스트
    const { data, error } = await supabase.from('consultations').select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error("Connection test error:", error)
      return { 
        connected: false, 
        error: error.message || 'Unknown error',
        details: error
      }
    }
    
    return { 
      connected: true, 
      count: data?.[0]?.count || 0 
    }
  } catch (error) {
    console.error("Connection test exception:", error)
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }
  }
}