import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    // 환경변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
          url: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'missing'
        }
      })
    }

    const supabase = createClient()
    
    // 연결 테스트
    const { data, error } = await supabase
      .from('consultations')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Database query failed',
        details: {
          message: error.message,
          hint: error.hint,
          code: error.code,
          details: error.details
        }
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      tableExists: true,
      recordCount: data?.[0]?.count || 0
    })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}