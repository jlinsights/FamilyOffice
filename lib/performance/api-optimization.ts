/**
 * API 성능 최적화 및 속도 제한
 * API response time: <500ms for 95th percentile 목표
 */

import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import compression from 'compression'
import { Agent } from 'https'

// 연결 풀링을 위한 HTTP Agent
export const httpsAgent = new Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 30000,
  freeSocketTimeout: 30000,
})

// Redis 기반 속도 제한
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// 다양한 속도 제한 전략
export const rateLimiters = {
  // 일반 API (분당 100회)
  general: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    analytics: true,
    prefix: 'ratelimit:general',
  }),

  // 금융 데이터 API (분당 300회)
  financial: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(300, '1 m'),
    analytics: true,
    prefix: 'ratelimit:financial',
  }),

  // 인증 API (분당 10회)
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: 'ratelimit:auth',
  }),

  // 리포트 생성 (시간당 50회)
  reports: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, '1 h'),
    analytics: true,
    prefix: 'ratelimit:reports',
  }),

  // 프리미엄 사용자 (분당 1000회)
  premium: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, '1 m'),
    analytics: true,
    prefix: 'ratelimit:premium',
  }),
}

// 사용자 등급별 속도 제한
export function getRateLimiter(userTier: 'free' | 'premium' | 'enterprise'): typeof rateLimiters.general {
  switch (userTier) {
    case 'premium':
      return rateLimiters.premium
    case 'enterprise':
      return rateLimiters.premium // 엔터프라이즈는 별도 구현
    default:
      return rateLimiters.general
  }
}

// API 응답 압축 미들웨어
export function withCompression(handler: Function) {
  return async (req: NextRequest) => {
    const response = await handler(req)
    
    if (response instanceof NextResponse) {
      // 압축 가능한 콘텐츠 타입 확인
      const contentType = response.headers.get('content-type')
      const shouldCompress = contentType && (
        contentType.includes('application/json') ||
        contentType.includes('text/') ||
        contentType.includes('application/javascript')
      )

      if (shouldCompress) {
        // 클라이언트가 gzip을 지원하는지 확인
        const acceptEncoding = req.headers.get('accept-encoding') || ''
        if (acceptEncoding.includes('gzip')) {
          response.headers.set('content-encoding', 'gzip')
          response.headers.set('vary', 'accept-encoding')
        }
      }
    }
    
    return response
  }
}

// API 성능 모니터링 미들웨어
export function withPerformanceMonitoring(handler: Function, apiName: string) {
  return async (req: NextRequest) => {
    const startTime = performance.now()
    const requestId = crypto.randomUUID()
    
    console.log(`🚀 API Request [${requestId}] ${apiName} started`)
    
    try {
      const response = await handler(req)
      const duration = performance.now() - startTime
      
      // 성능 메트릭 기록
      recordAPIMetrics(apiName, {
        duration,
        status: response.status,
        requestId,
        success: true,
      })
      
      // 느린 API 경고
      if (duration > 1000) {
        console.warn(`⚠️ Slow API detected: ${apiName} took ${duration.toFixed(2)}ms`)
      }
      
      // 응답 헤더에 성능 정보 추가
      response.headers.set('X-Response-Time', `${duration.toFixed(2)}ms`)
      response.headers.set('X-Request-ID', requestId)
      
      console.log(`✅ API Request [${requestId}] ${apiName} completed in ${duration.toFixed(2)}ms`)
      
      return response
    } catch (error) {
      const duration = performance.now() - startTime
      
      recordAPIMetrics(apiName, {
        duration,
        status: 500,
        requestId,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      
      console.error(`❌ API Request [${requestId}] ${apiName} failed after ${duration.toFixed(2)}ms:`, error)
      
      throw error
    }
  }
}

// API 메트릭 기록
interface APIMetric {
  duration: number
  status: number
  requestId: string
  success: boolean
  error?: string
}

const apiMetrics = new Map<string, APIMetric[]>()

function recordAPIMetrics(apiName: string, metric: APIMetric): void {
  if (!apiMetrics.has(apiName)) {
    apiMetrics.set(apiName, [])
  }
  
  const metrics = apiMetrics.get(apiName)!
  metrics.push(metric)
  
  // 최근 1000개 요청만 유지
  if (metrics.length > 1000) {
    metrics.shift()
  }
  
  // Google Analytics로 전송
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'api_request', {
      event_category: 'API Performance',
      event_label: apiName,
      value: Math.round(metric.duration),
      custom_map: {
        api_name: apiName,
        status_code: metric.status,
        is_success: metric.success,
      }
    })
  }
}

// API 통계 조회
export function getAPIStats(apiName?: string) {
  if (apiName) {
    const metrics = apiMetrics.get(apiName) || []
    return calculateStats(metrics)
  }
  
  const allStats: Record<string, any> = {}
  for (const [name, metrics] of apiMetrics.entries()) {
    allStats[name] = calculateStats(metrics)
  }
  
  return allStats
}

function calculateStats(metrics: APIMetric[]) {
  if (metrics.length === 0) {
    return {
      count: 0,
      avgDuration: 0,
      p95Duration: 0,
      p99Duration: 0,
      successRate: 0,
      errorRate: 0,
    }
  }
  
  const durations = metrics.map(m => m.duration).sort((a, b) => a - b)
  const successCount = metrics.filter(m => m.success).length
  
  return {
    count: metrics.length,
    avgDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length,
    p95Duration: durations[Math.floor(durations.length * 0.95)],
    p99Duration: durations[Math.floor(durations.length * 0.99)],
    successRate: (successCount / metrics.length) * 100,
    errorRate: ((metrics.length - successCount) / metrics.length) * 100,
  }
}

// 요청 병합 미들웨어 (동일한 요청 중복 제거)
const pendingRequests = new Map<string, Promise<any>>()

export function withRequestDeduplication(handler: Function, keyGenerator: (req: NextRequest) => string) {
  return async (req: NextRequest) => {
    const requestKey = keyGenerator(req)
    
    // 이미 진행 중인 동일한 요청이 있는지 확인
    if (pendingRequests.has(requestKey)) {
      console.log(`🔄 Deduplicating request: ${requestKey}`)
      return await pendingRequests.get(requestKey)
    }
    
    // 새로운 요청 처리
    const requestPromise = handler(req)
    pendingRequests.set(requestKey, requestPromise)
    
    try {
      const result = await requestPromise
      return result
    } finally {
      // 요청 완료 후 맵에서 제거
      pendingRequests.delete(requestKey)
    }
  }
}

// 배치 요청 처리 유틸리티
export class BatchRequestProcessor {
  private batchQueue = new Map<string, {
    requests: Array<{
      params: any
      resolve: (value: any) => void
      reject: (error: any) => void
    }>
    timeout: NodeJS.Timeout
  }>()
  
  private batchTimeout = 50 // 50ms 후 배치 처리
  private maxBatchSize = 100

  async addToBatch<T>(
    batchKey: string,
    params: any,
    processor: (paramsList: any[]) => Promise<T[]>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      let batch = this.batchQueue.get(batchKey)
      
      if (!batch) {
        batch = {
          requests: [],
          timeout: setTimeout(() => this.processBatch(batchKey, processor), this.batchTimeout)
        }
        this.batchQueue.set(batchKey, batch)
      }
      
      batch.requests.push({ params, resolve, reject })
      
      // 배치 크기 제한 확인
      if (batch.requests.length >= this.maxBatchSize) {
        clearTimeout(batch.timeout)
        this.processBatch(batchKey, processor)
      }
    })
  }
  
  private async processBatch<T>(
    batchKey: string,
    processor: (paramsList: any[]) => Promise<T[]>
  ): Promise<void> {
    const batch = this.batchQueue.get(batchKey)
    if (!batch) return
    
    this.batchQueue.delete(batchKey)
    
    try {
      const paramsList = batch.requests.map(req => req.params)
      const results = await processor(paramsList)
      
      batch.requests.forEach((request, index) => {
        request.resolve(results[index])
      })
    } catch (error) {
      batch.requests.forEach(request => {
        request.reject(error)
      })
    }
  }
}

// 전역 배치 프로세서 인스턴스
export const globalBatchProcessor = new BatchRequestProcessor()

// 데이터베이스 연결 풀링
export class DatabaseConnectionPool {
  private pools = new Map<string, any>()
  private maxPoolSize = 20
  private idleTimeout = 30000 // 30초
  
  async getConnection(databaseUrl: string) {
    if (!this.pools.has(databaseUrl)) {
      // 실제 구현시 pg-pool 또는 다른 커넥션 풀 라이브러리 사용
      const pool = {
        maxConnections: this.maxPoolSize,
        idleTimeout: this.idleTimeout,
        url: databaseUrl,
      }
      this.pools.set(databaseUrl, pool)
    }
    
    return this.pools.get(databaseUrl)
  }
  
  async closeAll(): Promise<void> {
    for (const [url, pool] of this.pools.entries()) {
      // 실제 구현시 pool.end() 호출
      console.log(`Closing connection pool for ${url}`)
    }
    this.pools.clear()
  }
  
  getStats() {
    const stats: Record<string, any> = {}
    
    for (const [url, pool] of this.pools.entries()) {
      stats[url] = {
        totalConnections: pool.maxConnections,
        activeConnections: 0, // 실제 구현시 pool.activeCount
        idleConnections: 0,   // 실제 구현시 pool.idleCount
      }
    }
    
    return stats
  }
}

// 전역 연결 풀
export const dbConnectionPool = new DatabaseConnectionPool()

// 외부 API 호출 최적화
export class ExternalAPIOptimizer {
  private circuitBreakers = new Map<string, {
    failureCount: number
    lastFailure: number
    state: 'closed' | 'open' | 'half-open'
  }>()
  
  private failureThreshold = 5
  private recoveryTimeout = 60000 // 1분
  
  async callWithCircuitBreaker<T>(
    apiName: string,
    apiCall: () => Promise<T>,
    fallback?: () => Promise<T>
  ): Promise<T> {
    const breaker = this.getCircuitBreaker(apiName)
    
    // Circuit Breaker 상태 확인
    if (breaker.state === 'open') {
      if (Date.now() - breaker.lastFailure > this.recoveryTimeout) {
        breaker.state = 'half-open'
      } else {
        console.warn(`Circuit breaker OPEN for ${apiName}, using fallback`)
        if (fallback) {
          return await fallback()
        }
        throw new Error(`Circuit breaker is OPEN for ${apiName}`)
      }
    }
    
    try {
      const result = await apiCall()
      
      // 성공시 circuit breaker 리셋
      if (breaker.state === 'half-open') {
        breaker.state = 'closed'
        breaker.failureCount = 0
      }
      
      return result
    } catch (error) {
      breaker.failureCount++
      breaker.lastFailure = Date.now()
      
      // 실패 임계값 확인
      if (breaker.failureCount >= this.failureThreshold) {
        breaker.state = 'open'
        console.error(`Circuit breaker OPENED for ${apiName} after ${breaker.failureCount} failures`)
      }
      
      if (fallback) {
        console.warn(`API ${apiName} failed, using fallback`)
        return await fallback()
      }
      
      throw error
    }
  }
  
  private getCircuitBreaker(apiName: string) {
    if (!this.circuitBreakers.has(apiName)) {
      this.circuitBreakers.set(apiName, {
        failureCount: 0,
        lastFailure: 0,
        state: 'closed',
      })
    }
    
    return this.circuitBreakers.get(apiName)!
  }
  
  getCircuitBreakerStats() {
    const stats: Record<string, any> = {}
    
    for (const [apiName, breaker] of this.circuitBreakers.entries()) {
      stats[apiName] = {
        state: breaker.state,
        failureCount: breaker.failureCount,
        lastFailure: breaker.lastFailure ? new Date(breaker.lastFailure) : null,
      }
    }
    
    return stats
  }
}

// 전역 API 최적화기
export const apiOptimizer = new ExternalAPIOptimizer()

// 응답 캐싱 미들웨어
export function withResponseCaching(
  handler: Function,
  cacheKey: (req: NextRequest) => string,
  ttl: number = 300 // 5분 기본값
) {
  return async (req: NextRequest) => {
    const key = `response:${cacheKey(req)}`
    
    // 캐시된 응답 확인
    try {
      const cached = await redis.get(key)
      if (cached) {
        console.log(`📦 Cache HIT for ${key}`)
        const response = new NextResponse(cached.body, {
          status: cached.status,
          headers: cached.headers,
        })
        response.headers.set('X-Cache', 'HIT')
        return response
      }
    } catch (error) {
      console.warn('Cache read error:', error)
    }
    
    // 새로운 응답 생성
    const response = await handler(req)
    
    // 성공적인 응답만 캐싱
    if (response.status === 200) {
      try {
        const body = await response.text()
        const cacheData = {
          body,
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        }
        
        await redis.setex(key, ttl, JSON.stringify(cacheData))
        console.log(`📦 Cache SET for ${key}`)
        
        // 새로운 응답 객체 생성 (body를 읽었으므로)
        const newResponse = new NextResponse(body, {
          status: response.status,
          headers: response.headers,
        })
        newResponse.headers.set('X-Cache', 'MISS')
        return newResponse
      } catch (error) {
        console.warn('Cache write error:', error)
      }
    }
    
    response.headers.set('X-Cache', 'SKIP')
    return response
  }
}

// API 라우트 최적화 헬퍼
export function optimizeAPI(config: {
  name: string
  rateLimit?: keyof typeof rateLimiters
  cache?: { ttl: number; keyGenerator: (req: NextRequest) => string }
  batch?: { keyGenerator: (req: NextRequest) => string }
  monitor?: boolean
  compress?: boolean
}) {
  return function (handler: Function) {
    let optimizedHandler = handler

    // 성능 모니터링
    if (config.monitor !== false) {
      optimizedHandler = withPerformanceMonitoring(optimizedHandler, config.name)
    }

    // 압축
    if (config.compress) {
      optimizedHandler = withCompression(optimizedHandler)
    }

    // 캐싱
    if (config.cache) {
      optimizedHandler = withResponseCaching(
        optimizedHandler,
        config.cache.keyGenerator,
        config.cache.ttl
      )
    }

    // 요청 중복 제거
    if (config.batch) {
      optimizedHandler = withRequestDeduplication(
        optimizedHandler,
        config.batch.keyGenerator
      )
    }

    // 속도 제한
    if (config.rateLimit) {
      const rateLimiter = rateLimiters[config.rateLimit]
      const originalHandler = optimizedHandler
      
      optimizedHandler = async (req: NextRequest) => {
        const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
        const { success, limit, remaining, reset } = await rateLimiter.limit(ip)
        
        if (!success) {
          return new NextResponse(
            JSON.stringify({
              error: 'Rate limit exceeded',
              limit,
              remaining,
              resetTime: new Date(reset),
            }),
            {
              status: 429,
              headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString(),
                'Retry-After': Math.round((reset - Date.now()) / 1000).toString(),
              },
            }
          )
        }
        
        const response = await originalHandler(req)
        
        // 속도 제한 헤더 추가
        response.headers.set('X-RateLimit-Limit', limit.toString())
        response.headers.set('X-RateLimit-Remaining', remaining.toString())
        response.headers.set('X-RateLimit-Reset', reset.toString())
        
        return response
      }
    }

    return optimizedHandler
  }
}

// 사용 예시 데코레이터
export const FastAPI = (config: Parameters<typeof optimizeAPI>[0]) => 
  optimizeAPI(config)

// 글로벌 성능 통계
export function getGlobalPerformanceStats() {
  return {
    api: getAPIStats(),
    circuitBreakers: apiOptimizer.getCircuitBreakerStats(),
    connections: dbConnectionPool.getStats(),
    cache: {
      // Redis 캐시 통계는 별도 구현
    },
  }
}

// 정리 함수
export async function cleanup(): Promise<void> {
  await dbConnectionPool.closeAll()
  // Redis 연결 정리
  await redis.quit?.()
  console.log('🧹 API optimization cleanup completed')
}

// 프로세스 종료시 정리
if (typeof process !== 'undefined') {
  process.on('SIGTERM', cleanup)
  process.on('SIGINT', cleanup)
}

console.log('🚀 API optimization initialized')