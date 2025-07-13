/**
 * 금융 데이터 캐싱 전략 구현
 * Redis + In-Memory 캐시 조합으로 최적화
 */

import NodeCache from 'node-cache'
import type { StockData, ForexData, IndexData, CacheKeyType } from '../types/financial'

// In-Memory 캐시 설정 (빠른 액세스용)
const memoryCache = new NodeCache({
  stdTTL: 300,        // 5분 기본 TTL
  checkperiod: 60,    // 1분마다 만료된 키 정리
  useClones: false,   // 성능 최적화
  maxKeys: 1000      // 최대 1000개 키 저장
})

// Redis 클라이언트 (선택적)
let redisClient: any = null

/**
 * Redis 클라이언트 초기화
 */
async function initializeRedis() {
  if (redisClient) return redisClient

  try {
    const Redis = (await import('ioredis')).default
    
    // Redis URL이 있으면 URL로 연결, 없으면 개별 설정으로 연결
    if (process.env.REDIS_URL) {
      redisClient = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        lazyConnect: true
      })
    } else if (process.env.REDIS_HOST) {
      redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        maxRetriesPerRequest: 3,
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        lazyConnect: true
      })
    } else {
      console.log('🔶 Redis 설정이 없어 메모리 캐시만 사용합니다.')
      return null
    }

    // Redis 연결 상태 확인
    redisClient.on('connect', () => {
      console.log('✅ Redis 연결 성공')
    })

    redisClient.on('error', (error: Error) => {
      console.error('❌ Redis 연결 오류:', error.message)
      redisClient = null
    })

    // 연결 테스트
    await redisClient.ping()
    console.log('✅ Redis 초기화 완료')
    
    return redisClient

  } catch (error) {
    console.error('❌ Redis 초기화 실패:', error)
    redisClient = null
    return null
  }
}

/**
 * 캐시 키 생성
 */
function generateCacheKey(type: CacheKeyType, identifier: string): string {
  const prefix = 'financial'
  const timestamp = Math.floor(Date.now() / (1000 * 60)) // 1분 단위로 키 변경
  
  switch (type) {
    case 'stock':
      return `${prefix}:stock:${identifier}:${timestamp}`
    case 'forex':
      return `${prefix}:forex:${identifier}:${timestamp}`
    case 'index':
      return `${prefix}:index:${identifier}:${timestamp}`
    default:
      return `${prefix}:unknown:${identifier}:${timestamp}`
  }
}

/**
 * 메모리 캐시에서 데이터 가져오기
 */
function getFromMemoryCache<T>(key: string): T | null {
  try {
    const cached = memoryCache.get<T>(key)
    if (cached) {
      console.log(`🎯 메모리 캐시 히트: ${key}`)
      return cached
    }
    return null
  } catch (error) {
    console.error('❌ 메모리 캐시 읽기 오류:', error)
    return null
  }
}

/**
 * 메모리 캐시에 데이터 저장
 */
function setToMemoryCache<T>(key: string, data: T, ttl: number = 300): boolean {
  try {
    return memoryCache.set(key, data, ttl)
  } catch (error) {
    console.error('❌ 메모리 캐시 쓰기 오류:', error)
    return false
  }
}

/**
 * Redis에서 데이터 가져오기
 */
async function getFromRedisCache<T>(key: string): Promise<T | null> {
  if (!redisClient) {
    redisClient = await initializeRedis()
  }
  
  if (!redisClient) return null

  try {
    const cached = await redisClient.get(key)
    if (cached) {
      console.log(`🎯 Redis 캐시 히트: ${key}`)
      return JSON.parse(cached)
    }
    return null
  } catch (error) {
    console.error('❌ Redis 캐시 읽기 오류:', error)
    return null
  }
}

/**
 * Redis에 데이터 저장
 */
async function setToRedisCache<T>(key: string, data: T, ttl: number = 300): Promise<boolean> {
  if (!redisClient) {
    redisClient = await initializeRedis()
  }
  
  if (!redisClient) return false

  try {
    await redisClient.setex(key, ttl, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('❌ Redis 캐시 쓰기 오류:', error)
    return false
  }
}

/**
 * 통합 캐시에서 데이터 가져오기 (메모리 -> Redis 순서)
 */
export async function getCachedData<T>(type: CacheKeyType, identifier: string): Promise<T | null> {
  const key = generateCacheKey(type, identifier)
  
  // 1. 메모리 캐시 확인 (가장 빠름)
  const memoryData = getFromMemoryCache<T>(key)
  if (memoryData) {
    return memoryData
  }
  
  // 2. Redis 캐시 확인
  const redisData = await getFromRedisCache<T>(key)
  if (redisData) {
    // Redis에서 가져온 데이터를 메모리 캐시에도 저장
    setToMemoryCache(key, redisData, 300)
    return redisData
  }
  
  return null
}

/**
 * 통합 캐시에 데이터 저장 (메모리 + Redis 동시 저장)
 */
export async function setCachedData<T>(
  type: CacheKeyType, 
  identifier: string, 
  data: T, 
  ttl: number = 300
): Promise<boolean> {
  const key = generateCacheKey(type, identifier)
  
  // 병렬로 메모리와 Redis에 저장
  const promises = [
    Promise.resolve(setToMemoryCache(key, data, ttl)),
    setToRedisCache(key, data, ttl)
  ]
  
  try {
    const results = await Promise.allSettled(promises)
    const memorySuccess = results[0].status === 'fulfilled' && results[0].value
    const redisSuccess = results[1].status === 'fulfilled' && results[1].value
    
    if (memorySuccess || redisSuccess) {
      console.log(`✅ 캐시 저장 성공: ${key} (메모리: ${memorySuccess}, Redis: ${redisSuccess})`)
      return true
    }
    
    return false
  } catch (error) {
    console.error('❌ 캐시 저장 오류:', error)
    return false
  }
}

/**
 * 주식 데이터 캐시
 */
export async function getCachedStockData(symbol: string): Promise<StockData | null> {
  return getCachedData<StockData>('stock', symbol)
}

export async function setCachedStockData(symbol: string, data: StockData, ttl: number = 300): Promise<boolean> {
  return setCachedData('stock', symbol, { ...data, cached: true }, ttl)
}

/**
 * 환율 데이터 캐시
 */
export async function getCachedForexData(fromCurrency: string, toCurrency: string): Promise<ForexData | null> {
  const identifier = `${fromCurrency}-${toCurrency}`
  return getCachedData<ForexData>('forex', identifier)
}

export async function setCachedForexData(
  fromCurrency: string, 
  toCurrency: string, 
  data: ForexData, 
  ttl: number = 300
): Promise<boolean> {
  const identifier = `${fromCurrency}-${toCurrency}`
  return setCachedData('forex', identifier, { ...data, cached: true }, ttl)
}

/**
 * 지수 데이터 캐시
 */
export async function getCachedIndexData(symbol: string): Promise<IndexData | null> {
  return getCachedData<IndexData>('index', symbol)
}

export async function setCachedIndexData(symbol: string, data: IndexData, ttl: number = 300): Promise<boolean> {
  return setCachedData('index', symbol, { ...data, cached: true }, ttl)
}

/**
 * 캐시 통계 정보
 */
export function getCacheStats() {
  const memoryStats = memoryCache.getStats()
  
  return {
    memory: {
      keys: memoryStats.keys,
      hits: memoryStats.hits,
      misses: memoryStats.misses,
      hitRate: memoryStats.hits / (memoryStats.hits + memoryStats.misses),
      memory: `${Math.round(memoryStats.vsize / 1024 / 1024)}MB`
    },
    redis: {
      connected: !!redisClient,
      status: redisClient?.status || 'disconnected'
    }
  }
}

/**
 * 캐시 초기화
 */
export function clearCache(): void {
  console.log('🧹 캐시 초기화 중...')
  
  // 메모리 캐시 초기화
  memoryCache.flushAll()
  
  // Redis 캐시 초기화 (선택적)
  if (redisClient) {
    redisClient.flushdb().catch((error: Error) => {
      console.error('❌ Redis 캐시 초기화 실패:', error)
    })
  }
  
  console.log('✅ 캐시 초기화 완료')
}

/**
 * 캐시 유효성 검사 (개발용)
 */
export async function validateCache(): Promise<boolean> {
  try {
    // 테스트 데이터로 캐시 동작 확인
    const testKey = 'test'
    const testData = { test: true, timestamp: Date.now() }
    
    // 캐시 저장 테스트
    const setResult = await setCachedData('stock', testKey, testData, 60)
    if (!setResult) {
      console.error('❌ 캐시 저장 테스트 실패')
      return false
    }
    
    // 캐시 읽기 테스트
    const getData = await getCachedData('stock', testKey)
    if (!getData) {
      console.error('❌ 캐시 읽기 테스트 실패')
      return false
    }
    
    console.log('✅ 캐시 유효성 검사 통과')
    return true
    
  } catch (error) {
    console.error('❌ 캐시 유효성 검사 실패:', error)
    return false
  }
}

// 앱 시작 시 Redis 초기화 (선택적)
if (process.env.NODE_ENV === 'production') {
  initializeRedis().catch(error => {
    console.warn('⚠️ Redis 초기화 실패, 메모리 캐시만 사용:', error.message)
  })
}