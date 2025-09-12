/**
 * 보안 상태 조회 API
 * 관리자만 접근 가능한 실시간 보안 모니터링 데이터
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminPermissions } from '@/lib/admin-permissions';
import { getSecurityStatus } from '@/lib/security/security-monitor';
import { globalRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 관리자 권한 확인
    await requireAdminPermissions();

    // 3. 보안 상태 조회
    const securityStatus = getSecurityStatus();

    // 4. 추가 시스템 정보
    const systemInfo = {
      server_time: new Date().toISOString(),
      node_env: process.env.NODE_ENV,
      uptime_seconds: process.uptime(),
      memory_usage: process.memoryUsage(),
      cpu_usage: process.cpuUsage(),
    };

    // 5. 응답 데이터 구성
    const response = {
      success: true,
      data: {
        security_status: securityStatus,
        system_info: systemInfo,
        alerts: {
          critical: securityStatus.overall_threat_level === 'critical',
          high_threat: securityStatus.suspicious_ips_count > 5,
          recent_activity: securityStatus.recent_events_count > 10
        }
      },
      timestamp: new Date().toISOString()
    };

    // 6. 성공 응답
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'X-Security-Status': securityStatus.overall_threat_level
      }
    });

  } catch (error) {
    console.error('Security status API error:', error);

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
        error: 'Security status check failed',
        message: process.env.NODE_ENV === 'development' 
          ? error instanceof Error ? error.message : 'Unknown error'
          : '보안 상태 확인 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}