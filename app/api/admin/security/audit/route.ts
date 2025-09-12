/**
 * Supabase 보안 감사 API 엔드포인트
 * 관리자만 접근 가능한 보안 상태 모니터링
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminPermissions } from '@/lib/admin-permissions';
import { runSecurityAudit, getCriticalIssues } from '@/lib/security/supabase-security-checker';
import { globalRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request, 'admin');
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 관리자 권한 확인
    await requireAdminPermissions();

    // 3. 보안 감사 실행
    const report = await runSecurityAudit();
    const criticalIssues = getCriticalIssues(report.checks);

    // 4. 응답 데이터 구성
    const response = {
      success: true,
      data: {
        report,
        criticalIssues,
        recommendations: criticalIssues.map(issue => ({
          id: issue.id,
          priority: issue.severity === 'critical' ? '긴급' : '중요',
          action: issue.recommendation,
          category: issue.category
        }))
      },
      timestamp: new Date().toISOString()
    };

    // 5. 성공 응답
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'X-Security-Audit': 'completed'
      }
    });

  } catch (error) {
    console.error('Security audit API error:', error);

    // 권한 오류인 경우
    if (error instanceof Error && error.message.includes('권한')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized access', 
          message: '관리자 권한이 필요합니다.' 
        },
        { status: 403 }
      );
    }

    // 기타 오류
    return NextResponse.json(
      {
        success: false,
        error: 'Security audit failed',
        message: process.env.NODE_ENV === 'development' 
          ? error instanceof Error ? error.message : 'Unknown error'
          : '보안 감사 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // POST는 보안 이슈 해결 액션 트리거용
    const rateLimitResult = await globalRateLimit(request, 'admin');
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    await requireAdminPermissions();

    const body = await request.json();
    const { action, issueId } = body;

    if (!action || !issueId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 여기서 특정 보안 이슈 해결 액션을 수행할 수 있음
    // 예: RLS 활성화, 정책 생성 등
    
    return NextResponse.json({
      success: true,
      message: `Security action '${action}' initiated for issue '${issueId}'`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Security action API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Security action failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}