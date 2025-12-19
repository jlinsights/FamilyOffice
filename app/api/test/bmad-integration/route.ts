/**
 * BMAD 통합 테스트 API 엔드포인트
 *
 * Phase 1 구현의 모든 구성 요소를 테스트하는 단일 API 엔드포인트
 *
 * 테스트 항목:
 * 1. 환경 변수 설정 확인
 * 2. Google Analytics 4 연결
 * 3. Serper.dev API 연결
 * 4. Supabase 연결 및 테이블 존재
 * 5. 샘플 데이터 수집 (1개 키워드)
 * 6. 데이터 저장 및 조회
 *
 * 사용 방법:
 * GET /api/test/bmad-integration
 * GET /api/test/bmad-integration?detailed=true
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkGA4Connection, getKeywordPerformance } from '@/lib/google-analytics/ga4-client';
import { checkSerperConnection, checkDomainRanking } from '@/lib/serper/client';
import { createClient } from '@supabase/supabase-js';

interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'skip';
  message: string;
  duration?: number;
  data?: any;
  error?: string;
}

interface IntegrationTestReport {
  success: boolean;
  timestamp: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  results: TestResult[];
  summary: {
    environment: 'pass' | 'fail';
    ga4: 'pass' | 'fail' | 'skip';
    serper: 'pass' | 'fail' | 'skip';
    supabase: 'pass' | 'fail' | 'skip';
    endToEnd: 'pass' | 'fail' | 'skip';
  };
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const results: TestResult[] = [];

  // Query parameter for detailed output
  const { searchParams } = new URL(request.url);
  const detailed = searchParams.get('detailed') === 'true';

  console.log('🧪 BMAD 통합 테스트 시작...');

  // Test 1: 환경 변수 확인
  console.log('\n📋 Test 1: 환경 변수 확인...');
  const envTest = await testEnvironmentVariables();
  results.push(envTest);

  // Test 2: Google Analytics 4 연결 (환경 변수 성공 시)
  if (envTest.status === 'pass') {
    console.log('\n📊 Test 2: Google Analytics 4 연결...');
    const ga4Test = await testGA4Connection(detailed);
    results.push(ga4Test);
  } else {
    results.push({
      test: 'GA4 Connection',
      status: 'skip',
      message: '환경 변수 테스트 실패로 건너뜀',
    });
  }

  // Test 3: Serper.dev API 연결
  console.log('\n🔍 Test 3: Serper.dev API 연결...');
  const serperTest = await testSerperConnection(detailed);
  results.push(serperTest);

  // Test 4: Supabase 연결 및 테이블 확인
  console.log('\n💾 Test 4: Supabase 연결...');
  const supabaseTest = await testSupabaseConnection(detailed);
  results.push(supabaseTest);

  // Test 5: End-to-End 테스트 (모든 이전 테스트 성공 시)
  const allPreviousTestsPassed = results.every(r => r.status === 'pass' || r.status === 'skip');
  if (allPreviousTestsPassed && results.filter(r => r.status === 'pass').length >= 3) {
    console.log('\n🚀 Test 5: End-to-End 데이터 수집 테스트...');
    const e2eTest = await testEndToEnd(detailed);
    results.push(e2eTest);
  } else {
    results.push({
      test: 'End-to-End Collection',
      status: 'skip',
      message: '이전 테스트 실패로 건너뜀',
    });
  }

  // 결과 집계
  const duration = Date.now() - startTime;
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const skipped = results.filter(r => r.status === 'skip').length;

  const report: IntegrationTestReport = {
    success: failed === 0 && passed >= 3,
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passed,
    failed,
    skipped,
    duration,
    results: detailed ? results : results.map(r => ({
      test: r.test,
      status: r.status,
      message: r.message,
      duration: r.duration,
    })),
    summary: {
      environment: results.find(r => r.test === 'Environment Variables')?.status || 'fail',
      ga4: results.find(r => r.test === 'GA4 Connection')?.status || 'skip',
      serper: results.find(r => r.test === 'Serper Connection')?.status || 'skip',
      supabase: results.find(r => r.test === 'Supabase Connection')?.status || 'skip',
      endToEnd: results.find(r => r.test === 'End-to-End Collection')?.status || 'skip',
    },
  };

  console.log('\n' + '='.repeat(80));
  console.log('📊 통합 테스트 완료');
  console.log('='.repeat(80));
  console.log(`✅ Pass: ${passed} | ❌ Fail: ${failed} | ⏭️  Skip: ${skipped}`);
  console.log(`⏱️  Duration: ${duration}ms`);
  console.log(`🎯 Success: ${report.success ? 'YES' : 'NO'}`);
  console.log('='.repeat(80) + '\n');

  return NextResponse.json(report, {
    status: report.success ? 200 : 500,
  });
}

/**
 * Test 1: 환경 변수 확인
 */
async function testEnvironmentVariables(): Promise<TestResult> {
  const startTime = Date.now();

  const requiredVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_PROJECT_ID',
    'GOOGLE_ANALYTICS_PROPERTY_ID',
    'SERPER_API_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const missing = requiredVars.filter(v => !process.env[v]);

  if (missing.length > 0) {
    return {
      test: 'Environment Variables',
      status: 'fail',
      message: `${missing.length}개의 필수 환경 변수가 누락되었습니다`,
      duration: Date.now() - startTime,
      data: { missing },
      error: `Missing variables: ${missing.join(', ')}`,
    };
  }

  return {
    test: 'Environment Variables',
    status: 'pass',
    message: `모든 필수 환경 변수 설정 확인 (${requiredVars.length}개)`,
    duration: Date.now() - startTime,
  };
}

/**
 * Test 2: Google Analytics 4 연결
 */
async function testGA4Connection(detailed: boolean): Promise<TestResult> {
  const startTime = Date.now();

  try {
    const isConnected = await checkGA4Connection();

    if (!isConnected) {
      return {
        test: 'GA4 Connection',
        status: 'fail',
        message: 'GA4 API 연결 실패',
        duration: Date.now() - startTime,
        error: 'Connection check returned false',
      };
    }

    // Detailed 모드: 실제 데이터 조회 테스트
    if (detailed) {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      const testKeywords = ['패밀리오피스란'];
      const performance = await getKeywordPerformance(startDate, endDate, testKeywords);

      return {
        test: 'GA4 Connection',
        status: 'pass',
        message: 'GA4 API 연결 성공 (데이터 조회 확인)',
        duration: Date.now() - startTime,
        data: {
          dateRange: `${startDate} ~ ${endDate}`,
          keywords: testKeywords,
          recordsRetrieved: performance.length,
        },
      };
    }

    return {
      test: 'GA4 Connection',
      status: 'pass',
      message: 'GA4 API 연결 성공',
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      test: 'GA4 Connection',
      status: 'fail',
      message: 'GA4 연결 오류 발생',
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Test 3: Serper.dev API 연결
 */
async function testSerperConnection(detailed: boolean): Promise<TestResult> {
  const startTime = Date.now();

  try {
    const isConnected = await checkSerperConnection();

    if (!isConnected) {
      return {
        test: 'Serper Connection',
        status: 'fail',
        message: 'Serper API 연결 실패',
        duration: Date.now() - startTime,
        error: 'Connection check returned false',
      };
    }

    // Detailed 모드: 실제 검색 테스트
    if (detailed) {
      const testKeyword = '패밀리오피스란';
      const testDomain = 'familyoffices.vip';

      const ranking = await checkDomainRanking(testKeyword, testDomain, {
        country: 'kr',
        language: 'ko',
      });

      return {
        test: 'Serper Connection',
        status: 'pass',
        message: 'Serper API 연결 성공 (검색 테스트 완료)',
        duration: Date.now() - startTime,
        data: {
          keyword: testKeyword,
          domain: testDomain,
          found: ranking.found,
          position: ranking.position,
          url: ranking.url,
        },
      };
    }

    return {
      test: 'Serper Connection',
      status: 'pass',
      message: 'Serper API 연결 성공',
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      test: 'Serper Connection',
      status: 'fail',
      message: 'Serper 연결 오류 발생',
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Test 4: Supabase 연결 및 테이블 확인
 */
async function testSupabaseConnection(detailed: boolean): Promise<TestResult> {
  const startTime = Date.now();

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        test: 'Supabase Connection',
        status: 'fail',
        message: 'Supabase 환경 변수 누락',
        duration: Date.now() - startTime,
        error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 테이블 존재 확인
    const { data, error } = await supabase
      .from('keyword_rankings')
      .select('*')
      .limit(1);

    if (error) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        return {
          test: 'Supabase Connection',
          status: 'fail',
          message: 'keyword_rankings 테이블이 존재하지 않습니다',
          duration: Date.now() - startTime,
          error: 'Table not found - run migration first',
        };
      }

      return {
        test: 'Supabase Connection',
        status: 'fail',
        message: 'Supabase 연결 오류',
        duration: Date.now() - startTime,
        error: error.message,
      };
    }

    // Detailed 모드: 데이터 통계 조회
    if (detailed) {
      const { count } = await supabase
        .from('keyword_rankings')
        .select('*', { count: 'exact', head: true });

      return {
        test: 'Supabase Connection',
        status: 'pass',
        message: 'Supabase 연결 성공 (테이블 확인)',
        duration: Date.now() - startTime,
        data: {
          tableExists: true,
          totalRecords: count || 0,
        },
      };
    }

    return {
      test: 'Supabase Connection',
      status: 'pass',
      message: 'Supabase 연결 성공 (keyword_rankings 테이블 확인)',
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      test: 'Supabase Connection',
      status: 'fail',
      message: 'Supabase 연결 오류 발생',
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Test 5: End-to-End 데이터 수집 테스트
 */
async function testEndToEnd(detailed: boolean): Promise<TestResult> {
  const startTime = Date.now();

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const testKeyword = '패밀리오피스란';
    const testDomain = 'familyoffices.vip';

    // Step 1: Serper로 검색 순위 확인
    const ranking = await checkDomainRanking(testKeyword, testDomain, {
      country: 'kr',
      language: 'ko',
    });

    // Step 2: Supabase에 테스트 데이터 저장
    const testRecord = {
      keyword: `TEST_${testKeyword}_${Date.now()}`,
      position: ranking.position,
      found: ranking.found,
      url: ranking.url,
      bmad_category: 'behavioral',
      created_at: new Date().toISOString(),
    };

    const { data: inserted, error: insertError } = await supabase
      .from('keyword_rankings')
      .insert(testRecord)
      .select();

    if (insertError) {
      return {
        test: 'End-to-End Collection',
        status: 'fail',
        message: '데이터 저장 실패',
        duration: Date.now() - startTime,
        error: insertError.message,
      };
    }

    // Step 3: 저장된 데이터 조회
    const { data: retrieved, error: retrieveError } = await supabase
      .from('keyword_rankings')
      .select('*')
      .eq('keyword', testRecord.keyword)
      .single();

    if (retrieveError) {
      return {
        test: 'End-to-End Collection',
        status: 'fail',
        message: '데이터 조회 실패',
        duration: Date.now() - startTime,
        error: retrieveError.message,
      };
    }

    // Step 4: 테스트 데이터 정리
    await supabase
      .from('keyword_rankings')
      .delete()
      .eq('keyword', testRecord.keyword);

    const result: TestResult = {
      test: 'End-to-End Collection',
      status: 'pass',
      message: 'End-to-End 데이터 수집 성공 (검색 → 저장 → 조회 → 정리)',
      duration: Date.now() - startTime,
    };

    if (detailed) {
      result.data = {
        keyword: testKeyword,
        serperResult: {
          found: ranking.found,
          position: ranking.position,
          url: ranking.url,
        },
        supabaseInserted: inserted?.[0],
        supabaseRetrieved: retrieved,
      };
    }

    return result;
  } catch (error) {
    return {
      test: 'End-to-End Collection',
      status: 'fail',
      message: 'End-to-End 테스트 오류 발생',
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
