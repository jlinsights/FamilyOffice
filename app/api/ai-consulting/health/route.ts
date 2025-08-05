// Triple-AI 시스템 헬스체크 API
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    // 기본 헬스체크는 공개, 상세 정보는 관리자만
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get('detailed') === 'true';
    
    if (detailed) {
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
    }

    // 시스템 상태 확인 (lazy initialization)
    let healthCheck;
    try {
      const { FamilyOfficeTripleAI } = await import('@/lib/ai');
      const tripleAI = new FamilyOfficeTripleAI();
      healthCheck = await tripleAI.checkSystemHealth();
    } catch (error) {
      // API 키가 없는 경우 기본 상태 반환
      healthCheck = {
        overall_status: 'degraded',
        api_status: {
          openai: 'not_configured',
          claude: 'not_configured', 
          gemini: 'not_configured'
        },
        last_check: new Date().toISOString(),
        message: 'AI API keys not configured'
      };
    }
    
    if (detailed) {
      // 상세 정보 포함
      return NextResponse.json({
        success: true,
        health: healthCheck,
        timestamp: new Date().toISOString(),
        system_info: {
          node_version: process.version,
          platform: process.platform,
          uptime: process.uptime(),
          memory_usage: process.memoryUsage()
        }
      });
    } else {
      // 기본 상태만
      return NextResponse.json({
        success: true,
        status: healthCheck.overall_status,
        timestamp: healthCheck.last_check
      });
    }
    
  } catch (error) {
    console.error('[AI Health Check] 오류:', error);
    
    return NextResponse.json({
      success: false,
      status: 'error',
      error: '시스템 상태 확인 중 오류가 발생했습니다',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}