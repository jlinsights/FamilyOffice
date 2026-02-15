/**
 * 환경 변수 검증 스크립트
 *
 * Phase 1 BMAD 키워드 추적 시스템에 필요한 모든 환경 변수를 검증합니다.
 *
 * 실행 방법:
 * ```bash
 * npx tsx scripts/validate-env.ts
 * ```
 *
 * 검증 항목:
 * - 필수 환경 변수 존재 여부
 * - 환경 변수 형식 유효성
 * - 외부 서비스 연결 테스트 (GA4, Serper, Supabase)
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { checkGA4Connection } from '@/lib/google-analytics/ga4-client';
import { checkSerperConnection } from '@/lib/serper/client';

// .env 파일 로드
config({ path: '.env.local' });

interface ValidationResult {
  category: string;
  variable: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  suggestion?: string;
}

const results: ValidationResult[] = [];

/**
 * 환경 변수 존재 여부 확인
 */
function checkExists(variable: string, category: string): boolean {
  const value = process.env[variable];

  if (!value || value.trim() === '') {
    results.push({
      category,
      variable,
      status: 'fail',
      message: '환경 변수가 설정되지 않았습니다',
      suggestion: `.env.local 파일에 ${variable}를 추가하세요`,
    });
    return false;
  }

  results.push({
    category,
    variable,
    status: 'pass',
    message: '환경 변수 존재 확인',
  });
  return true;
}

/**
 * Google Analytics 4 환경 변수 검증
 */
function validateGA4Env(): void {
  console.log('\n🔍 Google Analytics 4 환경 변수 검증...');

  const category = 'Google Analytics 4';

  // GOOGLE_SERVICE_ACCOUNT_EMAIL
  if (checkExists('GOOGLE_SERVICE_ACCOUNT_EMAIL', category)) {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
    if (email.includes('@') && email.includes('.iam.gserviceaccount.com')) {
      results.push({
        category,
        variable: 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
        status: 'pass',
        message: '서비스 계정 이메일 형식 유효',
      });
    } else {
      results.push({
        category,
        variable: 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
        status: 'warning',
        message: '서비스 계정 이메일 형식이 올바르지 않을 수 있습니다',
        suggestion: 'Google Cloud Console에서 서비스 계정 이메일을 확인하세요',
      });
    }
  }

  // GOOGLE_PRIVATE_KEY
  if (checkExists('GOOGLE_PRIVATE_KEY', category)) {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY!;
    if (
      privateKey.includes('BEGIN PRIVATE KEY') &&
      privateKey.includes('END PRIVATE KEY')
    ) {
      results.push({
        category,
        variable: 'GOOGLE_PRIVATE_KEY',
        status: 'pass',
        message: 'Private key 형식 유효',
      });
    } else {
      results.push({
        category,
        variable: 'GOOGLE_PRIVATE_KEY',
        status: 'fail',
        message: 'Private key 형식이 올바르지 않습니다',
        suggestion:
          'JSON 파일의 private_key 값을 그대로 복사하세요 (-----BEGIN/END 포함)',
      });
    }
  }

  // GOOGLE_PROJECT_ID
  checkExists('GOOGLE_PROJECT_ID', category);

  // GOOGLE_ANALYTICS_PROPERTY_ID
  if (checkExists('GOOGLE_ANALYTICS_PROPERTY_ID', category)) {
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID!;
    if (/^\d+$/.test(propertyId)) {
      results.push({
        category,
        variable: 'GOOGLE_ANALYTICS_PROPERTY_ID',
        status: 'pass',
        message: 'GA4 속성 ID 형식 유효 (숫자)',
      });
    } else {
      results.push({
        category,
        variable: 'GOOGLE_ANALYTICS_PROPERTY_ID',
        status: 'warning',
        message: 'GA4 속성 ID는 숫자여야 합니다',
        suggestion:
          'Google Analytics 관리자 → 속성 설정에서 속성 ID를 확인하세요',
      });
    }
  }
}

/**
 * Serper.dev 환경 변수 검증
 */
function validateSerperEnv(): void {
  console.log('\n🔍 Serper.dev 환경 변수 검증...');

  const category = 'Serper.dev';

  // SERPER_API_KEY
  if (checkExists('SERPER_API_KEY', category)) {
    const apiKey = process.env.SERPER_API_KEY!;
    if (apiKey.length >= 32) {
      results.push({
        category,
        variable: 'SERPER_API_KEY',
        status: 'pass',
        message: 'API Key 형식 유효',
      });
    } else {
      results.push({
        category,
        variable: 'SERPER_API_KEY',
        status: 'warning',
        message: 'API Key 길이가 짧습니다',
        suggestion: 'Serper.dev 대시보드에서 API 키를 다시 확인하세요',
      });
    }
  }
}

/**
 * Supabase 환경 변수 검증
 */
function validateSupabaseEnv(): void {
  console.log('\n🔍 Supabase 환경 변수 검증...');

  const category = 'Supabase';

  // NEXT_PUBLIC_SUPABASE_URL
  if (checkExists('NEXT_PUBLIC_SUPABASE_URL', category)) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    if (url.startsWith('https://') && url.includes('.supabase.co')) {
      results.push({
        category,
        variable: 'NEXT_PUBLIC_SUPABASE_URL',
        status: 'pass',
        message: 'Supabase URL 형식 유효',
      });
    } else {
      results.push({
        category,
        variable: 'NEXT_PUBLIC_SUPABASE_URL',
        status: 'warning',
        message: 'Supabase URL 형식이 올바르지 않을 수 있습니다',
        suggestion:
          'Supabase Dashboard → Project Settings → API에서 URL을 확인하세요',
      });
    }
  }

  // NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (checkExists('NEXT_PUBLIC_SUPABASE_ANON_KEY', category)) {
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (anonKey.startsWith('eyJ')) {
      results.push({
        category,
        variable: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        status: 'pass',
        message: 'Anon key 형식 유효 (JWT)',
      });
    } else {
      results.push({
        category,
        variable: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        status: 'warning',
        message: 'Anon key가 JWT 형식이 아닙니다',
      });
    }
  }

  // SUPABASE_SERVICE_ROLE_KEY
  if (checkExists('SUPABASE_SERVICE_ROLE_KEY', category)) {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    if (serviceKey.startsWith('eyJ')) {
      results.push({
        category,
        variable: 'SUPABASE_SERVICE_ROLE_KEY',
        status: 'pass',
        message: 'Service role key 형식 유효 (JWT)',
      });
    } else {
      results.push({
        category,
        variable: 'SUPABASE_SERVICE_ROLE_KEY',
        status: 'warning',
        message: 'Service role key가 JWT 형식이 아닙니다',
      });
    }
  }
}

/**
 * Vercel Cron 환경 변수 검증
 */
function validateCronEnv(): void {
  console.log('\n🔍 Vercel Cron 환경 변수 검증...');

  const category = 'Vercel Cron';

  // CRON_SECRET
  if (checkExists('CRON_SECRET', category)) {
    const secret = process.env.CRON_SECRET!;
    if (secret.length >= 32) {
      results.push({
        category,
        variable: 'CRON_SECRET',
        status: 'pass',
        message: 'Cron secret 길이 충분 (≥32자)',
      });
    } else {
      results.push({
        category,
        variable: 'CRON_SECRET',
        status: 'warning',
        message: 'Cron secret이 너무 짧습니다 (권장: ≥32자)',
        suggestion:
          'openssl rand -base64 32 명령으로 강력한 시크릿을 생성하세요',
      });
    }
  }
}

/**
 * Google Analytics 4 연결 테스트
 */
async function testGA4Connection(): Promise<void> {
  console.log('\n🔗 Google Analytics 4 연결 테스트...');

  const category = 'GA4 Connection';

  try {
    const isConnected = await checkGA4Connection();

    if (isConnected) {
      results.push({
        category,
        variable: 'GA4_API',
        status: 'pass',
        message: 'GA4 API 연결 성공',
      });
    } else {
      results.push({
        category,
        variable: 'GA4_API',
        status: 'fail',
        message: 'GA4 API 연결 실패',
        suggestion:
          '서비스 계정 권한을 확인하고, GA4 속성에 뷰어 권한이 부여되었는지 확인하세요',
      });
    }
  } catch (error) {
    results.push({
      category,
      variable: 'GA4_API',
      status: 'fail',
      message: `GA4 연결 오류: ${error instanceof Error ? error.message : 'Unknown error'}`,
      suggestion: '환경 변수와 서비스 계정 설정을 다시 확인하세요',
    });
  }
}

/**
 * Serper.dev 연결 테스트
 */
async function testSerperConnection(): Promise<void> {
  console.log('\n🔗 Serper.dev 연결 테스트...');

  const category = 'Serper Connection';

  try {
    const isConnected = await checkSerperConnection();

    if (isConnected) {
      results.push({
        category,
        variable: 'SERPER_API',
        status: 'pass',
        message: 'Serper API 연결 성공',
      });
    } else {
      results.push({
        category,
        variable: 'SERPER_API',
        status: 'fail',
        message: 'Serper API 연결 실패',
        suggestion:
          'API 키를 확인하고, Serper.dev 대시보드에서 요금제 상태를 확인하세요',
      });
    }
  } catch (error) {
    results.push({
      category,
      variable: 'SERPER_API',
      status: 'fail',
      message: `Serper 연결 오류: ${error instanceof Error ? error.message : 'Unknown error'}`,
      suggestion: 'SERPER_API_KEY 환경 변수를 다시 확인하세요',
    });
  }
}

/**
 * Supabase 연결 테스트
 */
async function testSupabaseConnection(): Promise<void> {
  console.log('\n🔗 Supabase 연결 테스트...');

  const category = 'Supabase Connection';

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      results.push({
        category,
        variable: 'SUPABASE',
        status: 'fail',
        message: 'Supabase 환경 변수가 설정되지 않았습니다',
      });
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // keyword_rankings 테이블 존재 확인
    const { data, error } = await supabase
      .from('keyword_rankings')
      .select('*')
      .limit(0);

    if (error) {
      if (
        error.message.includes('relation') &&
        error.message.includes('does not exist')
      ) {
        results.push({
          category,
          variable: 'SUPABASE_TABLE',
          status: 'fail',
          message: 'keyword_rankings 테이블이 존재하지 않습니다',
          suggestion:
            'Phase 2 가이드를 참고하여 Supabase 마이그레이션을 실행하세요',
        });
      } else {
        results.push({
          category,
          variable: 'SUPABASE',
          status: 'fail',
          message: `Supabase 연결 오류: ${error.message}`,
          suggestion: 'Supabase URL과 Service Role Key를 다시 확인하세요',
        });
      }
    } else {
      results.push({
        category,
        variable: 'SUPABASE',
        status: 'pass',
        message: 'Supabase 연결 성공',
      });

      results.push({
        category,
        variable: 'SUPABASE_TABLE',
        status: 'pass',
        message: 'keyword_rankings 테이블 존재 확인',
      });
    }
  } catch (error) {
    results.push({
      category,
      variable: 'SUPABASE',
      status: 'fail',
      message: `Supabase 연결 오류: ${error instanceof Error ? error.message : 'Unknown error'}`,
      suggestion: '환경 변수를 다시 확인하세요',
    });
  }
}

/**
 * 검증 결과 출력
 */
function printResults(): void {
  console.log('\n' + '='.repeat(80));
  console.log('📊 환경 변수 검증 결과 요약');
  console.log('='.repeat(80));

  // 카테고리별 그룹화
  const categories = Array.from(new Set(results.map(r => r.category)));

  let totalPass = 0;
  let totalFail = 0;
  let totalWarning = 0;

  for (const category of categories) {
    const categoryResults = results.filter(r => r.category === category);
    const pass = categoryResults.filter(r => r.status === 'pass').length;
    const fail = categoryResults.filter(r => r.status === 'fail').length;
    const warning = categoryResults.filter(r => r.status === 'warning').length;

    totalPass += pass;
    totalFail += fail;
    totalWarning += warning;

    console.log(`\n📁 ${category}`);
    console.log(
      `   ✅ Pass: ${pass} | ❌ Fail: ${fail} | ⚠️  Warning: ${warning}`
    );

    // 실패 및 경고 항목 상세 출력
    const issues = categoryResults.filter(
      r => r.status === 'fail' || r.status === 'warning'
    );
    for (const issue of issues) {
      const icon = issue.status === 'fail' ? '❌' : '⚠️';
      console.log(`\n   ${icon} ${issue.variable}`);
      console.log(`      ${issue.message}`);
      if (issue.suggestion) {
        console.log(`      💡 ${issue.suggestion}`);
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📈 전체 통계');
  console.log('='.repeat(80));
  console.log(`✅ Pass:    ${totalPass}`);
  console.log(`❌ Fail:    ${totalFail}`);
  console.log(`⚠️  Warning: ${totalWarning}`);
  console.log(`📊 Total:   ${totalPass + totalFail + totalWarning}`);

  // 최종 판정
  console.log('\n' + '='.repeat(80));
  if (totalFail === 0 && totalWarning === 0) {
    console.log('✅ 모든 환경 변수가 올바르게 설정되었습니다!');
    console.log('🚀 Phase 1 BMAD 추적 시스템을 사용할 준비가 되었습니다.');
  } else if (totalFail === 0) {
    console.log('⚠️  일부 경고가 있지만, 시스템은 작동할 수 있습니다.');
    console.log('💡 최적의 성능을 위해 경고 항목을 검토하세요.');
  } else {
    console.log('❌ 필수 환경 변수가 누락되었거나 잘못 설정되었습니다.');
    console.log('🔧 위의 제안사항을 참고하여 문제를 해결하세요.');
    console.log('📖 자세한 내용은 docs/PHASE2_SETUP_GUIDE.md를 참조하세요.');
  }
  console.log('='.repeat(80) + '\n');
}

/**
 * 메인 실행 함수
 */
async function main(): Promise<void> {
  console.log('🔍 Phase 1 BMAD 추적 시스템 환경 변수 검증 시작...\n');

  // 1. 환경 변수 형식 검증
  validateGA4Env();
  validateSerperEnv();
  validateSupabaseEnv();
  validateCronEnv();

  // 2. 외부 서비스 연결 테스트
  await testGA4Connection();
  await testSerperConnection();
  await testSupabaseConnection();

  // 3. 결과 출력
  printResults();

  // 4. 프로세스 종료 코드 설정
  const hasFail = results.some(r => r.status === 'fail');
  process.exit(hasFail ? 1 : 0);
}

// 실행
main().catch(error => {
  console.error('❌ 검증 스크립트 실행 중 오류 발생:', error);
  process.exit(1);
});
