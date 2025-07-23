/**
 * 부하 테스트 및 성능 벤치마킹
 * Support 1000+ concurrent users 목표 검증
 */

import { performance } from 'perf_hooks'
// SSR 안전성을 위한 dynamic imports
let WebSocket: any = null

// SSR 안전한 WebSocket 초기화
const initializeWebSocket = async () => {
  if (typeof window === 'undefined' && !WebSocket) {
    try {
      // Server-side에서만 WebSocket 사용
      const wsModule = await import('ws')
      WebSocket = wsModule.default || wsModule
    } catch (error) {
      console.error('WebSocket 초기화 실패:', error)
      WebSocket = null
    }
  }
}

// 초기화 호출
// initializeWebSocket() - lazy loading on first use

// 부하 테스트 설정
interface LoadTestConfig {
  name: string
  baseUrl: string
  duration: number // 테스트 지속 시간 (초)
  rampUpTime: number // 사용자 증가 시간 (초)
  targetUsers: number // 목표 사용자 수
  testScenarios: TestScenario[]
}

interface TestScenario {
  name: string
  weight: number // 0-1 사이의 가중치
  steps: TestStep[]
}

interface TestStep {
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WS'
  url: string
  payload?: any
  headers?: Record<string, string>
  expectedStatus?: number
  timeout?: number
  thinkTime?: number // 다음 요청까지 대기 시간 (ms)
}

interface TestResult {
  scenario: string
  step: string
  status: 'success' | 'failure' | 'timeout'
  responseTime: number
  statusCode?: number
  error?: string
  timestamp: number
  userId: string
}

interface LoadTestSummary {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  p95ResponseTime: number
  p99ResponseTime: number
  requestsPerSecond: number
  errorRate: number
  concurrentUsers: number
  startTime: number
  endTime: number
  scenarios: Record<string, {
    requests: number
    avgResponseTime: number
    errorRate: number
  }>
}

// 가상 사용자 클래스
class VirtualUser {
  private id: string
  private config: LoadTestConfig
  private results: TestResult[] = []
  private isRunning = false
  private ws: any | null = null

  constructor(id: string, config: LoadTestConfig) {
    this.id = id
    this.config = config
  }

  async start(): Promise<void> {
    this.isRunning = true
    console.log(`👤 Virtual User ${this.id} started`)

    while (this.isRunning) {
      const scenario = this.selectScenario()
      await this.executeScenario(scenario)
      
      // 시나리오 간 휴식 시간
      await this.sleep(Math.random() * 5000) // 0-5초 랜덤 대기
    }
  }

  stop(): void {
    this.isRunning = false
    if (this.ws) {
      this.ws.close()
    }
    console.log(`👤 Virtual User ${this.id} stopped`)
  }

  private selectScenario(): TestScenario {
    const random = Math.random()
    let cumulativeWeight = 0
    
    for (const scenario of this.config.testScenarios) {
      cumulativeWeight += scenario.weight
      if (random <= cumulativeWeight) {
        return scenario
      }
    }
    
    return this.config.testScenarios[0] // 기본값
  }

  private async executeScenario(scenario: TestScenario): Promise<void> {
    console.log(`📝 User ${this.id} executing scenario: ${scenario.name}`)
    
    for (const step of scenario.steps) {
      if (!this.isRunning) break
      
      try {
        await this.executeStep(scenario.name, step)
        
        // Think time
        if (step.thinkTime) {
          await this.sleep(step.thinkTime)
        }
      } catch (error) {
        console.error(`❌ User ${this.id} step failed:`, error)
      }
    }
  }

  private async executeStep(scenarioName: string, step: TestStep): Promise<void> {
    const startTime = performance.now()
    
    try {
      if (step.method === 'WS') {
        await this.executeWebSocketStep(scenarioName, step, startTime)
      } else {
        await this.executeHttpStep(scenarioName, step, startTime)
      }
    } catch (error) {
      this.recordResult(scenarioName, step.name, 'failure', performance.now() - startTime, {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  private async executeHttpStep(
    scenarioName: string, 
    step: TestStep, 
    startTime: number
  ): Promise<void> {
    const url = `${this.config.baseUrl}${step.url}`
    const timeout = step.timeout || 30000
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    try {
      const response = await fetch(url, {
        method: step.method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `LoadTest-User-${this.id}`,
          ...step.headers,
        },
        body: step.payload ? JSON.stringify(step.payload) : undefined,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      const responseTime = performance.now() - startTime
      
      const isSuccess = step.expectedStatus 
        ? response.status === step.expectedStatus
        : response.ok
      
      this.recordResult(scenarioName, step.name, isSuccess ? 'success' : 'failure', responseTime, {
        statusCode: response.status
      })
      
    } catch (error) {
      clearTimeout(timeoutId)
      const responseTime = performance.now() - startTime
      
      if (error.name === 'AbortError') {
        this.recordResult(scenarioName, step.name, 'timeout', responseTime)
      } else {
        throw error
      }
    }
  }

  private async executeWebSocketStep(
    scenarioName: string, 
    step: TestStep, 
    startTime: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = step.url.replace('http', 'ws')
      this.ws = WebSocket ? new WebSocket(wsUrl) : null
      
      if (!this.ws) {
        this.recordResult(scenarioName, step.name, 'failure', performance.now() - startTime, {
          error: 'WebSocket 초기화 실패'
        })
        return reject(new Error('WebSocket 초기화 실패'))
      }

      const timeout = setTimeout(() => {
        this.ws?.close()
        this.recordResult(scenarioName, step.name, 'timeout', performance.now() - startTime)
        reject(new Error('WebSocket timeout'))
      }, step.timeout || 10000)
      
      this.ws.on('open', () => {
        const responseTime = performance.now() - startTime
        this.recordResult(scenarioName, step.name, 'success', responseTime)
        clearTimeout(timeout)
        
        // 메시지 전송 (설정된 경우)
        if (step.payload) {
          this.ws?.send(JSON.stringify(step.payload))
        }
        
        resolve()
      })
      
      this.ws.on('error', (error) => {
        clearTimeout(timeout)
        this.recordResult(scenarioName, step.name, 'failure', performance.now() - startTime, {
          error: error.message
        })
        reject(error)
      })
    })
  }

  private recordResult(
    scenario: string,
    step: string,
    status: 'success' | 'failure' | 'timeout',
    responseTime: number,
    additional?: { statusCode?: number; error?: string }
  ): void {
    this.results.push({
      scenario,
      step,
      status,
      responseTime,
      statusCode: additional?.statusCode,
      error: additional?.error,
      timestamp: Date.now(),
      userId: this.id,
    })
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getResults(): TestResult[] {
    return [...this.results]
  }
}

// 부하 테스트 실행기
export class LoadTestRunner {
  private config: LoadTestConfig
  private users: VirtualUser[] = []
  private results: TestResult[] = []
  private startTime = 0
  private isRunning = false

  constructor(config: LoadTestConfig) {
    this.config = config
  }

  async run(): Promise<LoadTestSummary> {
    console.log(`🚀 Starting load test: ${this.config.name}`)
    console.log(`📊 Target: ${this.config.targetUsers} users for ${this.config.duration}s`)
    
    this.isRunning = true
    this.startTime = Date.now()
    
    // 사용자 점진적 추가
    await this.rampUpUsers()
    
    // 테스트 지속
    await this.sustainTest()
    
    // 사용자 정리
    await this.cleanupUsers()
    
    // 결과 수집 및 분석
    return this.analyzeResults()
  }

  private async rampUpUsers(): Promise<void> {
    const rampUpInterval = (this.config.rampUpTime * 1000) / this.config.targetUsers
    
    for (let i = 0; i < this.config.targetUsers; i++) {
      if (!this.isRunning) break
      
      const user = new VirtualUser(`user-${i}`, this.config)
      this.users.push(user)
      
      // 사용자 시작 (비동기)
      user.start().catch(error => {
        console.error(`User ${user} failed:`, error)
      })
      
      console.log(`📈 Ramping up: ${i + 1}/${this.config.targetUsers} users`)
      
      // 다음 사용자 추가 전 대기
      if (i < this.config.targetUsers - 1) {
        await this.sleep(rampUpInterval)
      }
    }
    
    console.log(`✅ Ramp-up completed: ${this.users.length} users active`)
  }

  private async sustainTest(): Promise<void> {
    const sustainDuration = this.config.duration - this.config.rampUpTime
    console.log(`⏱️ Sustaining load for ${sustainDuration}s`)
    
    await this.sleep(sustainDuration * 1000)
  }

  private async cleanupUsers(): Promise<void> {
    console.log('🧹 Stopping all virtual users...')
    
    this.users.forEach(user => user.stop())
    
    // 사용자 결과 수집
    this.users.forEach(user => {
      this.results.push(...user.getResults())
    })
    
    this.isRunning = false
    console.log(`✅ Load test completed. Collected ${this.results.length} results`)
  }

  private analyzeResults(): LoadTestSummary {
    const endTime = Date.now()
    const totalDuration = (endTime - this.startTime) / 1000
    
    const successful = this.results.filter(r => r.status === 'success')
    const failed = this.results.filter(r => r.status !== 'success')
    
    const responseTimes = successful.map(r => r.responseTime).sort((a, b) => a - b)
    
    const p95Index = Math.floor(responseTimes.length * 0.95)
    const p99Index = Math.floor(responseTimes.length * 0.99)
    
    // 시나리오별 분석
    const scenarioStats: Record<string, any> = {}
    this.config.testScenarios.forEach(scenario => {
      const scenarioResults = this.results.filter(r => r.scenario === scenario.name)
      const scenarioSuccessful = scenarioResults.filter(r => r.status === 'success')
      
      scenarioStats[scenario.name] = {
        requests: scenarioResults.length,
        avgResponseTime: scenarioSuccessful.length > 0 
          ? scenarioSuccessful.reduce((sum, r) => sum + r.responseTime, 0) / scenarioSuccessful.length
          : 0,
        errorRate: (scenarioResults.length - scenarioSuccessful.length) / scenarioResults.length * 100,
      }
    })
    
    const summary: LoadTestSummary = {
      totalRequests: this.results.length,
      successfulRequests: successful.length,
      failedRequests: failed.length,
      averageResponseTime: successful.length > 0 
        ? successful.reduce((sum, r) => sum + r.responseTime, 0) / successful.length
        : 0,
      p95ResponseTime: responseTimes[p95Index] || 0,
      p99ResponseTime: responseTimes[p99Index] || 0,
      requestsPerSecond: this.results.length / totalDuration,
      errorRate: (failed.length / this.results.length) * 100,
      concurrentUsers: this.config.targetUsers,
      startTime: this.startTime,
      endTime,
      scenarios: scenarioStats,
    }
    
    this.printSummary(summary)
    return summary
  }

  private printSummary(summary: LoadTestSummary): void {
    console.log('\n📊 ==================== LOAD TEST SUMMARY ====================')
    console.log(`🎯 Test: ${this.config.name}`)
    console.log(`👥 Concurrent Users: ${summary.concurrentUsers}`)
    console.log(`📈 Total Requests: ${summary.totalRequests}`)
    console.log(`✅ Successful: ${summary.successfulRequests} (${((summary.successfulRequests / summary.totalRequests) * 100).toFixed(2)}%)`)
    console.log(`❌ Failed: ${summary.failedRequests} (${summary.errorRate.toFixed(2)}%)`)
    console.log(`⚡ Requests/sec: ${summary.requestsPerSecond.toFixed(2)}`)
    console.log(`⏱️ Avg Response Time: ${summary.averageResponseTime.toFixed(2)}ms`)
    console.log(`📊 95th Percentile: ${summary.p95ResponseTime.toFixed(2)}ms`)
    console.log(`📊 99th Percentile: ${summary.p99ResponseTime.toFixed(2)}ms`)
    console.log('\n📋 Scenario Breakdown:')
    
    Object.entries(summary.scenarios).forEach(([name, stats]) => {
      console.log(`  ${name}:`)
      console.log(`    Requests: ${stats.requests}`)
      console.log(`    Avg Response: ${stats.avgResponseTime.toFixed(2)}ms`)
      console.log(`    Error Rate: ${stats.errorRate.toFixed(2)}%`)
    })
    
    console.log('\n==========================================================\n')
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  stop(): void {
    this.isRunning = false
    this.users.forEach(user => user.stop())
  }
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
      {
        name: 'Real-time Connection',
        method: 'WS' as const,
        url: 'ws://localhost:8080',
        payload: { type: 'subscribe', channels: ['portfolio', 'prices'] },
        timeout: 5000,
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
}

// 사전 정의된 테스트 설정들
export const TestConfigs = {
  // 기본 부하 테스트
  basic: {
    name: 'Basic Load Test',
    baseUrl: 'http://localhost:3000',
    duration: 300, // 5분
    rampUpTime: 60, // 1분
    targetUsers: 100,
    testScenarios: [
      TestScenarios.userDashboard,
      TestScenarios.financialData,
    ],
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
    testScenarios: [
      TestScenarios.userDashboard,
      TestScenarios.financialData,
    ],
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
}

// 성능 벤치마킹 클래스
export class PerformanceBenchmark {
  async runAllTests(): Promise<Record<string, LoadTestSummary>> {
    const results: Record<string, LoadTestSummary> = {}
    
    console.log('🏁 Starting comprehensive performance benchmark...')
    
    // 기본 부하 테스트
    console.log('\n1️⃣ Running Basic Load Test...')
    const basicRunner = new LoadTestRunner(TestConfigs.basic)
    results.basic = await basicRunner.run()
    
    // 휴식 시간
    await this.sleep(30000) // 30초 대기
    
    // 스트레스 테스트
    console.log('\n2️⃣ Running Stress Test...')
    const stressRunner = new LoadTestRunner(TestConfigs.stress)
    results.stress = await stressRunner.run()
    
    // 휴식 시간
    await this.sleep(30000)
    
    // 실시간 테스트
    console.log('\n3️⃣ Running Real-time Test...')
    const realtimeRunner = new LoadTestRunner(TestConfigs.realtime)
    results.realtime = await realtimeRunner.run()
    
    // 종합 결과 리포트
    this.generateBenchmarkReport(results)
    
    return results
  }

  private generateBenchmarkReport(results: Record<string, LoadTestSummary>): void {
    console.log('\n🏆 ==================== BENCHMARK REPORT ====================')
    console.log('📊 Performance Target Validation:')
    
    // 목표 달성 여부 확인
    const targets = {
      'Portfolio dashboard load time': { target: 2000, actual: results.basic?.averageResponseTime },
      'Real-time price updates latency': { target: 100, actual: results.realtime?.averageResponseTime },
      'API response time (95th percentile)': { target: 500, actual: results.stress?.p95ResponseTime },
      'Concurrent users support': { target: 1000, actual: results.stress?.concurrentUsers },
      'Error rate': { target: 1, actual: results.stress?.errorRate, reverse: true },
    }
    
    Object.entries(targets).forEach(([metric, { target, actual, reverse }]) => {
      if (actual === undefined) return
      
      const passed = reverse ? actual <= target : actual >= target
      const status = passed ? '✅ PASS' : '❌ FAIL'
      
      console.log(`  ${metric}: ${actual} (target: ${reverse ? '≤' : '≥'} ${target}) ${status}`)
    })
    
    console.log('\n📈 Summary by Test Type:')
    Object.entries(results).forEach(([testType, summary]) => {
      console.log(`\n  ${testType.toUpperCase()}:`)
      console.log(`    Users: ${summary.concurrentUsers}`)
      console.log(`    RPS: ${summary.requestsPerSecond.toFixed(2)}`)
      console.log(`    Avg Response: ${summary.averageResponseTime.toFixed(2)}ms`)
      console.log(`    Error Rate: ${summary.errorRate.toFixed(2)}%`)
    })
    
    console.log('\n=========================================================\n')
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// CLI 실행을 위한 헬퍼 함수
export async function runLoadTest(testName: keyof typeof TestConfigs): Promise<void> {
  const config = TestConfigs[testName]
  if (!config) {
    console.error(`❌ Unknown test configuration: ${testName}`)
    return
  }
  
  const runner = new LoadTestRunner(config)
  await runner.run()
}

export async function runBenchmark(): Promise<void> {
  const benchmark = new PerformanceBenchmark()
  await benchmark.runAllTests()
}

// CLI에서 실행 시
if (require.main === module) {
  const testName = process.argv[2] as keyof typeof TestConfigs
  
  if (testName === 'benchmark') {
    runBenchmark().catch(console.error)
  } else if (testName && TestConfigs[testName]) {
    runLoadTest(testName).catch(console.error)
  } else {
    console.log('사용법:')
    console.log('  npm run load-test basic    # 기본 부하 테스트')
    console.log('  npm run load-test stress   # 스트레스 테스트')
    console.log('  npm run load-test spike    # 스파이크 테스트')
    console.log('  npm run load-test realtime # 실시간 테스트')
    console.log('  npm run load-test benchmark # 전체 벤치마크')
  }
}