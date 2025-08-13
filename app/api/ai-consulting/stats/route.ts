// Triple-AI 통계 및 분석 API
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // 관리자 권한 확인
    const user = await currentUser();
    const primaryEmail = user?.emailAddresses.find(
      email => email.id === user.primaryEmailAddressId
    );
    const isAdmin = primaryEmail?.emailAddress === 'jhlim725@gmail.com';
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' }, 
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d'; // 7d, 30d, 90d
    const timezone = searchParams.get('timezone') || 'Asia/Seoul';

    const supabase = await createClient();
    
    // 기간별 날짜 계산
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default: // 7d
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // 전체 컨설팅 통계
    const { data: totalStats } = await supabase
      .from('ai_consultations')
      .select('*')
      .gte('created_at', startDate.toISOString());

    if (!totalStats) {
      return NextResponse.json(
        { error: 'Failed to fetch statistics' }, 
        { status: 500 }
      );
    }

    // 통계 계산
    const stats = {
      overview: {
        total_consultations: totalStats.length,
        unique_users: new Set(totalStats.map(c => c.user_id)).size,
        avg_response_time: totalStats.reduce((sum, c) => sum + (c.response_time || 0), 0) / totalStats.length || 0,
        total_cost: totalStats.reduce((sum, c) => sum + (c.cost || 0), 0),
        avg_confidence: totalStats.reduce((sum, c) => sum + (c.confidence || 0), 0) / totalStats.length || 0
      },
      
      ai_usage: {
        claude_usage: totalStats.filter(c => 
          Array.isArray(c.ai_used) ? c.ai_used.includes('claude-opus') : c.ai_used === 'claude-opus'
        ).length,
        gpt4_usage: totalStats.filter(c => 
          Array.isArray(c.ai_used) ? c.ai_used.includes('gpt4-turbo') : c.ai_used === 'gpt4-turbo'
        ).length,
        gemini_usage: totalStats.filter(c => 
          Array.isArray(c.ai_used) ? c.ai_used.includes('gemini-pro') : c.ai_used === 'gemini-pro'
        ).length
      },
      
      strategy_usage: {
        single_ai: totalStats.filter(c => c.strategy_used === 'single_ai').length,
        parallel_hybrid: totalStats.filter(c => c.strategy_used === 'parallel_hybrid').length,
        sequential_cascade: totalStats.filter(c => c.strategy_used === 'sequential_cascade').length,
        consensus_voting: totalStats.filter(c => c.strategy_used === 'consensus_voting').length
      },
      
      performance_metrics: {
        fast_responses: totalStats.filter(c => c.response_time < 10000).length, // < 10초
        medium_responses: totalStats.filter(c => c.response_time >= 10000 && c.response_time < 30000).length, // 10-30초
        slow_responses: totalStats.filter(c => c.response_time >= 30000).length, // > 30초
        high_confidence: totalStats.filter(c => c.confidence >= 0.8).length,
        medium_confidence: totalStats.filter(c => c.confidence >= 0.6 && c.confidence < 0.8).length,
        low_confidence: totalStats.filter(c => c.confidence < 0.6).length
      }
    };

    // 일별 트렌드 데이터
    const dailyTrends = [];
    for (let i = 0; i < parseInt(period.replace('d', '')); i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const dayConsultations = totalStats.filter(c => {
        const consultationDate = new Date(c.created_at);
        return consultationDate >= dayStart && consultationDate <= dayEnd;
      });
      
      dailyTrends.push({
        date: dayStart.toISOString().split('T')[0],
        consultations: dayConsultations.length,
        avg_response_time: dayConsultations.reduce((sum, c) => sum + (c.response_time || 0), 0) / dayConsultations.length || 0,
        total_cost: dayConsultations.reduce((sum, c) => sum + (c.cost || 0), 0),
        avg_confidence: dayConsultations.reduce((sum, c) => sum + (c.confidence || 0), 0) / dayConsultations.length || 0
      });
    }

    // 최근 컨설팅 목록 (관리자용)
    const { data: recentConsultations } = await supabase
      .from('ai_consultations')
      .select(`
        id,
        query,
        ai_used,
        strategy_used,
        response_time,
        cost,
        confidence,
        created_at,
        users!inner(email, name, company)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    return NextResponse.json({
      success: true,
      period,
      timezone,
      stats,
      daily_trends: dailyTrends,
      recent_consultations: recentConsultations || [],
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('[AI Stats] 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '통계 조회 중 오류가 발생했습니다',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}