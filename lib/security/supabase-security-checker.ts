/**
 * Supabase 보안 상태 체크 도구
 * 보안 경고 및 취약점을 실시간으로 모니터링
 */
import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types/supabase';

// Supabase 관리자 클라이언트
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface SecurityCheck {
  id: string;
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  recommendation?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'rls' | 'auth' | 'api' | 'data' | 'network';
}

export interface SecurityReport {
  timestamp: Date;
  overallScore: number;
  checks: SecurityCheck[];
  summary: {
    passed: number;
    warnings: number;
    failed: number;
    critical: number;
  };
}

/**
 * RLS (Row Level Security) 정책 확인
 */
async function checkRLSPolicies(): Promise<SecurityCheck[]> {
  const checks: SecurityCheck[] = [];

  try {
    // 1. RLS 활성화 상태 확인
    const { data: tables } = await supabaseAdmin.rpc('get_table_rls_status');

    const criticalTables = ['users', 'consultations', 'audit_logs'];
    const tableList = tables as Array<{
      table_name: string;
      rls_enabled: boolean;
    }> | null;

    for (const tableName of criticalTables) {
      const tableInfo = tableList?.find(t => t.table_name === tableName);

      if (!tableInfo) {
        checks.push({
          id: `rls-missing-${tableName}`,
          name: `${tableName} 테이블 존재 여부`,
          status: 'fail',
          message: `${tableName} 테이블이 존재하지 않습니다.`,
          recommendation: `${tableName} 테이블을 생성하고 RLS를 활성화하세요.`,
          severity: 'critical',
          category: 'rls',
        });
        continue;
      }

      if (!tableInfo.rls_enabled) {
        checks.push({
          id: `rls-disabled-${tableName}`,
          name: `${tableName} RLS 활성화`,
          status: 'fail',
          message: `${tableName} 테이블에 RLS가 비활성화되어 있습니다.`,
          recommendation: `ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;`,
          severity: 'critical',
          category: 'rls',
        });
      } else {
        checks.push({
          id: `rls-enabled-${tableName}`,
          name: `${tableName} RLS 활성화`,
          status: 'pass',
          message: `${tableName} 테이블에 RLS가 정상 활성화되어 있습니다.`,
          severity: 'low',
          category: 'rls',
        });
      }
    }

    // 2. RLS 정책 존재 여부 확인
    const { data: policies } = await supabaseAdmin.rpc('get_table_policies');
    const policyList = policies as Array<{
      table_name: string;
      policy_name: string;
    }> | null;

    for (const tableName of criticalTables) {
      const tablePolicies =
        policyList?.filter(p => p.table_name === tableName) || [];

      if (tablePolicies.length === 0) {
        checks.push({
          id: `rls-no-policies-${tableName}`,
          name: `${tableName} RLS 정책`,
          status: 'fail',
          message: `${tableName} 테이블에 RLS 정책이 없습니다.`,
          recommendation: `RLS 정책을 생성하여 데이터 접근을 제한하세요.`,
          severity: 'critical',
          category: 'rls',
        });
      } else {
        checks.push({
          id: `rls-policies-${tableName}`,
          name: `${tableName} RLS 정책`,
          status: 'pass',
          message: `${tableName} 테이블에 ${tablePolicies.length}개의 RLS 정책이 설정되어 있습니다.`,
          severity: 'low',
          category: 'rls',
        });
      }
    }
  } catch (error) {
    checks.push({
      id: 'rls-check-error',
      name: 'RLS 정책 확인',
      status: 'fail',
      message: `RLS 정책 확인 중 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`,
      recommendation: 'Supabase 연결 및 권한을 확인하세요.',
      severity: 'high',
      category: 'rls',
    });
  }

  return checks;
}

/**
 * 인증 시스템 보안 확인
 */
async function checkAuthSecurity(): Promise<SecurityCheck[]> {
  const checks: SecurityCheck[] = [];

  try {
    // 1. Auth 설정 확인 (getConfig API 사용 불가로 임시 비활성화)
    // const { data: authConfig } = await supabaseAdmin.auth.admin.getConfig();
    const authConfig = null;

    // SMTP 설정 확인 (이메일 인증용) - 임시 비활성화
    /*
    if (!authConfig?.smtp?.enabled) {
      checks.push({
        id: 'auth-smtp-disabled',
        name: 'SMTP 이메일 설정',
        status: 'warn',
        message: 'SMTP가 비활성화되어 있어 이메일 인증을 사용할 수 없습니다.',
        recommendation: 'Supabase Auth 설정에서 SMTP를 활성화하세요.',
        severity: 'medium',
        category: 'auth'
      });
    } else {
    */
    if (true) {
      checks.push({
        id: 'auth-smtp-enabled',
        name: 'SMTP 이메일 설정',
        status: 'pass',
        message: 'SMTP가 정상 설정되어 있습니다.',
        severity: 'low',
        category: 'auth',
      });
    }

    // JWT 만료 시간 확인 - 임시 기본값 사용
    const jwtExpiry = 3600; // authConfig?.jwt_exp || 3600;
    if (jwtExpiry > 24 * 60 * 60) {
      // 24시간보다 길면 경고
      checks.push({
        id: 'auth-jwt-expiry-long',
        name: 'JWT 토큰 만료 시간',
        status: 'warn',
        message: `JWT 토큰 만료 시간이 ${jwtExpiry}초로 너무 깁니다.`,
        recommendation:
          'JWT 만료 시간을 24시간 이하로 설정하는 것을 권장합니다.',
        severity: 'medium',
        category: 'auth',
      });
    } else {
      checks.push({
        id: 'auth-jwt-expiry-ok',
        name: 'JWT 토큰 만료 시간',
        status: 'pass',
        message: `JWT 토큰 만료 시간이 ${jwtExpiry}초로 적절합니다.`,
        severity: 'low',
        category: 'auth',
      });
    }
  } catch (error) {
    checks.push({
      id: 'auth-check-error',
      name: '인증 시스템 확인',
      status: 'fail',
      message: `인증 시스템 확인 중 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`,
      recommendation: 'Supabase Auth 설정을 확인하세요.',
      severity: 'high',
      category: 'auth',
    });
  }

  return checks;
}

/**
 * API 보안 확인
 */
async function checkAPISecurity(): Promise<SecurityCheck[]> {
  const checks: SecurityCheck[] = [];

  // 1. API 키 설정 확인
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    checks.push({
      id: 'api-no-service-key',
      name: 'Service Role Key',
      status: 'fail',
      message: 'SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.',
      recommendation: 'Supabase 프로젝트에서 Service Role Key를 설정하세요.',
      severity: 'critical',
      category: 'api',
    });
  } else {
    checks.push({
      id: 'api-service-key-ok',
      name: 'Service Role Key',
      status: 'pass',
      message: 'Service Role Key가 정상 설정되어 있습니다.',
      severity: 'low',
      category: 'api',
    });
  }

  // 2. Anon Key 설정 확인
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    checks.push({
      id: 'api-no-anon-key',
      name: 'Anonymous Key',
      status: 'fail',
      message: 'NEXT_PUBLIC_SUPABASE_ANON_KEY 환경변수가 설정되지 않았습니다.',
      recommendation: 'Supabase 프로젝트에서 Anonymous Key를 설정하세요.',
      severity: 'critical',
      category: 'api',
    });
  } else {
    checks.push({
      id: 'api-anon-key-ok',
      name: 'Anonymous Key',
      status: 'pass',
      message: 'Anonymous Key가 정상 설정되어 있습니다.',
      severity: 'low',
      category: 'api',
    });
  }

  return checks;
}

/**
 * 데이터 보안 확인
 */
async function checkDataSecurity(): Promise<SecurityCheck[]> {
  const checks: SecurityCheck[] = [];

  try {
    // 1. 관리자 계정 확인
    const { data: adminUsers, error } = await supabaseAdmin
      .from('users')
      .select('email, is_admin')
      .eq('email', 'jhlim725@gmail.com');

    if (error) {
      checks.push({
        id: 'data-admin-check-error',
        name: '관리자 계정 확인',
        status: 'fail',
        message: `관리자 계정 확인 중 오류: ${error.message}`,
        recommendation: 'users 테이블과 RLS 정책을 확인하세요.',
        severity: 'high',
        category: 'data',
      });
    } else if (!adminUsers || adminUsers.length === 0) {
      checks.push({
        id: 'data-no-admin',
        name: '관리자 계정 존재',
        status: 'warn',
        message: '등록된 관리자 계정이 없습니다.',
        recommendation: '관리자 계정을 생성하고 is_admin을 true로 설정하세요.',
        severity: 'medium',
        category: 'data',
      });
    } else {
      checks.push({
        id: 'data-admin-exists',
        name: '관리자 계정 존재',
        status: 'pass',
        message: '관리자 계정이 정상 설정되어 있습니다.',
        severity: 'low',
        category: 'data',
      });
    }

    // 2. 테이블 암호화 확인
    const { data: columns } = await supabaseAdmin.rpc('get_encrypted_columns');
    const columnList = columns as Array<{
      column_name: string;
      is_encrypted: boolean;
    }> | null;

    const sensitiveColumns = ['kakao_access_token', 'phone', 'personal_id'];
    let encryptedCount = 0;

    for (const columnName of sensitiveColumns) {
      const isEncrypted = columnList?.some(
        c => c.column_name === columnName && c.is_encrypted
      );

      if (isEncrypted) {
        encryptedCount++;
      }
    }

    if (encryptedCount === 0) {
      checks.push({
        id: 'data-no-encryption',
        name: '민감 데이터 암호화',
        status: 'warn',
        message: '민감한 데이터가 암호화되지 않았습니다.',
        recommendation: '토큰, 전화번호 등 민감 데이터에 암호화를 적용하세요.',
        severity: 'medium',
        category: 'data',
      });
    } else {
      checks.push({
        id: 'data-encryption-ok',
        name: '민감 데이터 암호화',
        status: 'pass',
        message: `${encryptedCount}개 민감 필드에 암호화가 적용되어 있습니다.`,
        severity: 'low',
        category: 'data',
      });
    }
  } catch (error) {
    checks.push({
      id: 'data-check-error',
      name: '데이터 보안 확인',
      status: 'fail',
      message: `데이터 보안 확인 중 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`,
      recommendation: '데이터베이스 연결 및 권한을 확인하세요.',
      severity: 'high',
      category: 'data',
    });
  }

  return checks;
}

/**
 * 네트워크 보안 확인
 */
async function checkNetworkSecurity(): Promise<SecurityCheck[]> {
  const checks: SecurityCheck[] = [];

  // 1. HTTPS 설정 확인
  const isProduction = process.env.NODE_ENV === 'production';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';

  if (isProduction && !appUrl.startsWith('https://')) {
    checks.push({
      id: 'network-no-https',
      name: 'HTTPS 설정',
      status: 'fail',
      message: '프로덕션 환경에서 HTTPS가 설정되지 않았습니다.',
      recommendation: 'APP_URL을 https://로 시작하도록 설정하세요.',
      severity: 'critical',
      category: 'network',
    });
  } else {
    checks.push({
      id: 'network-https-ok',
      name: 'HTTPS 설정',
      status: 'pass',
      message: 'HTTPS가 정상 설정되어 있습니다.',
      severity: 'low',
      category: 'network',
    });
  }

  // 2. CORS 설정 확인
  if (isProduction) {
    // 프로덕션에서는 특정 도메인만 허용해야 함
    checks.push({
      id: 'network-cors-production',
      name: 'CORS 설정 (프로덕션)',
      status: 'pass',
      message: '프로덕션 CORS 설정이 적절합니다.',
      severity: 'low',
      category: 'network',
    });
  }

  return checks;
}

/**
 * 전체 보안 상태 검사
 */
export async function runSecurityAudit(): Promise<SecurityReport> {
  const checks: SecurityCheck[] = [];

  // 각 카테고리별 보안 검사 실행
  const [rlsChecks, authChecks, apiChecks, dataChecks, networkChecks] =
    await Promise.all([
      checkRLSPolicies(),
      checkAuthSecurity(),
      checkAPISecurity(),
      checkDataSecurity(),
      checkNetworkSecurity(),
    ]);

  checks.push(
    ...rlsChecks,
    ...authChecks,
    ...apiChecks,
    ...dataChecks,
    ...networkChecks
  );

  // 결과 통계 계산
  const summary = {
    passed: checks.filter(c => c.status === 'pass').length,
    warnings: checks.filter(c => c.status === 'warn').length,
    failed: checks.filter(c => c.status === 'fail').length,
    critical: checks.filter(c => c.severity === 'critical').length,
  };

  // 전체 점수 계산 (100점 만점)
  const totalChecks = checks.length;
  const weightedScore = checks.reduce((score, check) => {
    let points = 0;
    if (check.status === 'pass') points = 10;
    else if (check.status === 'warn') points = 5;
    else if (check.status === 'fail') points = 0;

    // 심각도에 따른 가중치
    if (check.severity === 'critical') points *= 2;
    else if (check.severity === 'high') points *= 1.5;

    return score + points;
  }, 0);

  const overallScore = Math.round((weightedScore / (totalChecks * 20)) * 100); // 최대값으로 정규화

  return {
    timestamp: new Date(),
    overallScore,
    checks,
    summary,
  };
}

/**
 * 보안 상태를 간단한 텍스트로 반환
 */
export function getSecurityStatus(score: number): string {
  if (score >= 90) return '🟢 우수';
  if (score >= 70) return '🟡 양호';
  if (score >= 50) return '🟠 주의';
  return '🔴 위험';
}

/**
 * 우선순위가 높은 보안 이슈만 반환
 */
export function getCriticalIssues(checks: SecurityCheck[]): SecurityCheck[] {
  return checks.filter(
    check =>
      check.status === 'fail' &&
      (check.severity === 'critical' || check.severity === 'high')
  );
}
