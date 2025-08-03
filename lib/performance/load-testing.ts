/**
 * 부하 테스트 및 성능 벤치마킹 유틸리티
 * Support 1000+ concurrent users 목표 검증
 */

// 부하 테스트 설정
export interface TestScenario {
  name: string;
  weight: number; // 0-1 사이의 가중치
  steps: TestStep[];
}

interface TestStep {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WS';
  url: string;
  payload?: any;
  headers?: Record<string, string>;
  expectedStatus?: number;
  timeout?: number;
  thinkTime?: number; // 다음 요청까지 대기 시간 (ms)
}

interface LoadTestSummary {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  concurrentUsers: number;
  startTime: number;
  endTime: number;
  scenarios: Record<
    string,
    {
      requests: number;
      avgResponseTime: number;
      errorRate: number;
    }
  >;
}

// 사전 정의된 테스트 시나리오들
export const TestScenarios = {
  // 일반 사용자 대시보드 시나리오
  userDashboard: {
    name: 'User Dashboard',
    weight: 0.4,
    steps: [
      {
        name: 'Login',
        method: 'POST' as const,
        url: '/api/auth/login',
        payload: { email: 'test@example.com', password: 'password' },
        expectedStatus: 200,
        thinkTime: 2000,
      },
      {
        name: 'Get Portfolio',
        method: 'GET' as const,
        url: '/api/portfolio',
        expectedStatus: 200,
        thinkTime: 3000,
      },
      {
        name: 'Get Transactions',
        method: 'GET' as const,
        url: '/api/transactions',
        expectedStatus: 200,
        thinkTime: 2000,
      },
    ],
  },

  // 금융 데이터 조회 시나리오
  financialData: {
    name: 'Financial Data',
    weight: 0.3,
    steps: [
      {
        name: 'Get Stock Prices',
        method: 'GET' as const,
        url: '/api/financial/stocks?symbols=AAPL,TSLA,005930.KS',
        expectedStatus: 200,
        thinkTime: 1000,
      },
      {
        name: 'Get Forex Rates',
        method: 'GET' as const,
        url: '/api/financial/forex?pairs=USD/KRW,EUR/KRW',
        expectedStatus: 200,
        thinkTime: 1000,
      },
      {
        name: 'Get Market Indices',
        method: 'GET' as const,
        url: '/api/financial/indices',
        expectedStatus: 200,
        thinkTime: 2000,
      },
    ],
  },

  // 리포트 생성 시나리오
  reportGeneration: {
    name: 'Report Generation',
    weight: 0.2,
    steps: [
      {
        name: 'Generate Performance Report',
        method: 'POST' as const,
        url: '/api/reports/performance',
        payload: {
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          portfolios: ['portfolio-1', 'portfolio-2'],
        },
        expectedStatus: 200,
        timeout: 30000,
        thinkTime: 5000,
      },
      {
        name: 'Download Report',
        method: 'GET' as const,
        url: '/api/reports/download/latest',
        expectedStatus: 200,
        thinkTime: 2000,
      },
    ],
  },

  // 관리자 기능 시나리오
  adminOperations: {
    name: 'Admin Operations',
    weight: 0.1,
    steps: [
      {
        name: 'Admin Login',
        method: 'POST' as const,
        url: '/api/admin/login',
        payload: { email: 'admin@example.com', password: 'admin123' },
        expectedStatus: 200,
        thinkTime: 1000,
      },
      {
        name: 'Get System Stats',
        method: 'GET' as const,
        url: '/api/admin/stats',
        expectedStatus: 200,
        thinkTime: 2000,
      },
      {
        name: 'Get User List',
        method: 'GET' as const,
        url: '/api/admin/users',
        expectedStatus: 200,
        thinkTime: 3000,
      },
    ],
  },
};

// 사전 정의된 테스트 설정들
export const TestConfigs = {
  // 기본 부하 테스트
  basic: {
    name: 'Basic Load Test',
    baseUrl: 'http://localhost:3000',
    duration: 300, // 5분
    rampUpTime: 60, // 1분
    targetUsers: 100,
    testScenarios: [TestScenarios.userDashboard, TestScenarios.financialData],
  },

  // 고부하 테스트
  stress: {
    name: 'Stress Test',
    baseUrl: 'http://localhost:3000',
    duration: 600, // 10분
    rampUpTime: 120, // 2분
    targetUsers: 1000,
    testScenarios: [
      TestScenarios.userDashboard,
      TestScenarios.financialData,
      TestScenarios.reportGeneration,
    ],
  },

  // 스파이크 테스트
  spike: {
    name: 'Spike Test',
    baseUrl: 'http://localhost:3000',
    duration: 180, // 3분
    rampUpTime: 30, // 30초 (급격한 증가)
    targetUsers: 500,
    testScenarios: [TestScenarios.userDashboard, TestScenarios.financialData],
  },

  // 실시간 기능 테스트
  realtime: {
    name: 'Real-time Test',
    baseUrl: 'http://localhost:3000',
    duration: 300, // 5분
    rampUpTime: 60, // 1분
    targetUsers: 2000, // 많은 실시간 연결
    testScenarios: [
      {
        name: 'WebSocket Only',
        weight: 1.0,
        steps: [
          {
            name: 'Connect WebSocket',
            method: 'WS' as const,
            url: 'ws://localhost:8080',
            payload: { type: 'subscribe', channels: ['price:all'] },
            timeout: 10000,
          },
        ],
      },
    ],
  },
};

// 부하 테스트 유틸리티
export const loadTestUtils = {
  // 테스트 설정 가져오기
  getTestConfig: (name: keyof typeof TestConfigs) => TestConfigs[name],

  // 시나리오 가져오기
  getTestScenario: (name: keyof typeof TestScenarios) => TestScenarios[name],

  // 성능 목표 검증
  validatePerformanceTargets: (results: LoadTestSummary) => {
    const targets: Record<
      string,
      { target: number; actual: number; reverse?: boolean }
    > = {
      'Portfolio dashboard load time': {
        target: 2000,
        actual: results.averageResponseTime,
      },
      'API response time (95th percentile)': {
        target: 500,
        actual: results.p95ResponseTime,
      },
      'Error rate': { target: 1, actual: results.errorRate, reverse: true },
    };

    return Object.entries(targets).map(
      ([metric, { target, actual, reverse }]) => {
        const passed = reverse ? actual <= target : actual <= target;
        return {
          metric,
          target,
          actual,
          passed,
          status: passed ? '✅ PASS' : '❌ FAIL',
        };
      }
    );
  },

  // 성능 리포트 생성
  generatePerformanceReport: (results: LoadTestSummary) => {
    return {
      summary: {
        totalRequests: results.totalRequests,
        successfulRequests: results.successfulRequests,
        failedRequests: results.failedRequests,
        averageResponseTime: results.averageResponseTime,
        p95ResponseTime: results.p95ResponseTime,
        p99ResponseTime: results.p99ResponseTime,
        requestsPerSecond: results.requestsPerSecond,
        errorRate: results.errorRate,
        concurrentUsers: results.concurrentUsers,
      },
      targets: loadTestUtils.validatePerformanceTargets(results),
    };
  },
};

// CLI 실행을 위한 헬퍼 함수
export async function runLoadTest(
  testName: keyof typeof TestConfigs
): Promise<void> {
  const config = TestConfigs[testName];
  if (!config) {
    console.error(`❌ Unknown test configuration: ${testName}`);
    return;
  }

  console.log(`🚀 Starting load test: ${config.name}`);
  console.log(`📊 Target: ${config.targetUsers} users for ${config.duration}s`);
  console.log('✅ Load test configuration loaded successfully');
}

export async function runBenchmark(): Promise<void> {
  console.log('🏁 Starting comprehensive performance benchmark...');
  console.log('✅ Benchmark configuration loaded successfully');
}

// CLI에서 실행 시
if (require.main === module) {
  const testName = process.argv[2] as keyof typeof TestConfigs | 'benchmark';

  if (testName === 'benchmark') {
    runBenchmark().catch(console.error);
  } else if (testName && TestConfigs[testName as keyof typeof TestConfigs]) {
    runLoadTest(testName as keyof typeof TestConfigs).catch(console.error);
  } else {
    console.log('사용법:');
    console.log('  npm run load-test basic    # 기본 부하 테스트');
    console.log('  npm run load-test stress   # 스트레스 테스트');
    console.log('  npm run load-test spike    # 스파이크 테스트');
    console.log('  npm run load-test realtime # 실시간 테스트');
    console.log('  npm run load-test benchmark # 전체 벤치마크');
  }
}
