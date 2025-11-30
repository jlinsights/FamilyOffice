/**
 * 시스템 상태 조회 API
 * 표준 에러 핸들링 시스템 적용
 */
import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler, ErrorResponses } from '@/lib/api-error-handler';
import { createApiResponse } from '@/lib/api-validation';

async function handleStatusCheck(request: NextRequest): Promise<NextResponse> {
  // 시스템 상태 체크 로직
  const systemChecks = {
    database: await checkDatabase(),
    cache: await checkCache(), 
    externalServices: await checkExternalServices(),
  };

  const overallHealth = calculateOverallHealth(systemChecks);
  
  if (overallHealth < 50) {
    throw ErrorResponses.serviceUnavailable('시스템', '시스템이 불안정합니다');
  }

  return createApiResponse({
    status: overallHealth >= 90 ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    health: {
      overall: overallHealth,
      database: systemChecks.database.health,
      cache: systemChecks.cache.health,
      externalServices: systemChecks.externalServices.health,
    },
    checks: systemChecks,
  }, '시스템 상태 조회 완료');
}

// 데이터베이스 연결 확인
async function checkDatabase(): Promise<{ health: number; status: string; responseTime: number }> {
  const startTime = Date.now();
  
  try {
    // 실제로는 Supabase 연결 테스트
    await new Promise(resolve => setTimeout(resolve, Math.random() * 50)); // 모의 지연
    
    return {
      health: 100,
      status: 'connected',
      responseTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      health: 0,
      status: 'disconnected',
      responseTime: Date.now() - startTime,
    };
  }
}

// 캐시 시스템 확인
async function checkCache(): Promise<{ health: number; status: string; responseTime: number }> {
  const startTime = Date.now();
  
  try {
    // Redis 연결 테스트 (실제로는 Redis 클라이언트 ping)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 30));
    
    return {
      health: 100,
      status: 'connected',
      responseTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      health: 50, // 캐시는 없어도 시스템은 동작 가능
      status: 'unavailable',
      responseTime: Date.now() - startTime,
    };
  }
}

// 외부 서비스 확인
async function checkExternalServices(): Promise<{ health: number; status: string; services: Record<string, any> }> {
  const services = {
    googleSearchConsole: { health: 85, status: 'partial' },
    beehiiv: { health: 95, status: 'ok' },
    calcom: { health: 90, status: 'ok' },
  };

  const avgHealth = Object.values(services).reduce((acc, service) => acc + service.health, 0) / Object.keys(services).length;

  return {
    health: Math.round(avgHealth),
    status: avgHealth >= 90 ? 'ok' : avgHealth >= 70 ? 'partial' : 'degraded',
    services,
  };
}

// 전체 상태 계산
function calculateOverallHealth(checks: any): number {
  const weights = {
    database: 0.4,
    cache: 0.2, 
    externalServices: 0.4,
  };

  return Math.round(
    checks.database.health * weights.database +
    checks.cache.health * weights.cache +
    checks.externalServices.health * weights.externalServices
  );
}

// 에러 핸들링이 적용된 GET 핸들러
export const GET = withErrorHandler(handleStatusCheck, '/api/status');
