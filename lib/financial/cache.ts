/**
 * 금융 데이터 캐싱 전략 구현
 * Redis + In-Memory 캐시 조합으로 최적화
 */
import type {
  StockData,
  ForexData,
  IndexData,
  CacheKeyType,
} from '../types/financial';
import { recordCacheHit, recordCacheMiss } from './cache-monitoring';

// SSR 안전성을 위한 조건부 import
let NodeCache: any = null;
let memoryCache: any = null;
let redisClient: any = null;

/**
 * NodeCache 초기화 (SSR 안전)
 */
async function initializeNodeCache() {
  if (typeof window !== 'undefined') {
    // Client-side에서는 기본값 반환
    return null;
  }

  if (!NodeCache) {
    try {
      // node-cache 모듈을 직접 import
      const NodeCacheModule = require('node-cache');
      NodeCache = NodeCacheModule;
      memoryCache = new NodeCache({
        stdTTL: 300, // 5분 기본 TTL
        checkperiod: 60, // 1분마다 만료된 키 정리
        useClones: false, // 성능 최적화
        maxKeys: 1000, // 최대 1000개 키 저장
      });
    } catch (error) {
      console.error('NodeCache 로드 실패:', error);
      return null;
    }
  }

  return memoryCache;
}

/**
 * Redis 클라이언트 초기화
 */
async function initializeRedis() {
  if (typeof window !== 'undefined') {
    // Client-side에서는 사용하지 않음
    return null;
  }

  if (redisClient) return redisClient;

  try {
    const Redis = (await import('ioredis')).default;

    // Redis URL이 있으면 URL로 연결, 없으면 개별 설정으로 연결
    if (process.env.REDIS_URL) {
      redisClient = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        lazyConnect: true,
      });
    } else if (process.env.REDIS_HOST) {
      redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        ...(process.env.REDIS_PASSWORD && {
          password: process.env.REDIS_PASSWORD,
        }),
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        lazyConnect: true,
      });
    } else {
      console.log('🔶 Redis 설정이 없어 메모리 캐시만 사용합니다.');
      return null;
    }

    // Redis 연결 상태 확인
    redisClient.on('connect', () => {
      console.log('✅ Redis 연결 성공');
    });

    redisClient.on('error', (error: Error) => {
      console.error('❌ Redis 연결 오류:', error.message);
      redisClient = null;
    });

    // 연결 테스트
    await redisClient.ping();
    console.log('✅ Redis 초기화 완료');

    return redisClient;
  } catch (error) {
    console.error('❌ Redis 초기화 실패:', error);
    redisClient = null;
    return null;
  }
}

/**
 * 캐시 키 생성
 */
function generateCacheKey(type: CacheKeyType, identifier: string): string {
  const prefix = 'financial';
  const timestamp = Math.floor(Date.now() / (1000 * 60)); // 1분 단위로 키 변경

  switch (type) {
    case 'stock':
      return `${prefix}:stock:${identifier}:${timestamp}`;
    case 'forex':
      return `${prefix}:forex:${identifier}:${timestamp}`;
    case 'index':
      return `${prefix}:index:${identifier}:${timestamp}`;
    default:
      return `${prefix}:unknown:${identifier}:${timestamp}`;
  }
}

/**
 * 메모리 캐시에서 데이터 가져오기
 */
async function getFromMemoryCache<T>(key: string): Promise<T | null> {
  const startTime = Date.now();
  
  try {
    const cache = await initializeNodeCache();
    if (!cache) {
      return null;
    }

    const cached = cache.get(key) as T | undefined;
    const responseTime = Date.now() - startTime;
    
    if (cached) {
      console.log(`🎯 메모리 캐시 히트: ${key}`);
      const dataSize = JSON.stringify(cached).length;
      recordCacheHit(key, 'memory', responseTime, dataSize);
      return cached;
    }

    return null;
  } catch (error) {
    console.error('메모리 캐시 조회 오류:', error);
    return null;
  }
}

/**
 * 메모리 캐시에 데이터 저장
 */
async function setToMemoryCache<T>(
  key: string,
  data: T,
  ttl: number = 300
): Promise<boolean> {
  try {
    const cache = await initializeNodeCache();
    if (!cache) {
      return false;
    }

    const success = cache.set(key, data, ttl);
    if (success) {
      console.log(`💾 메모리 캐시 저장: ${key} (TTL: ${ttl}s)`);
    }
    return success;
  } catch (error) {
    console.error('메모리 캐시 저장 오류:', error);
    return false;
  }
}

/**
 * Redis에서 데이터 가져오기
 */
async function getFromRedisCache<T>(key: string): Promise<T | null> {
  const startTime = Date.now();
  
  if (!redisClient) {
    redisClient = await initializeRedis();
  }

  if (!redisClient) return null;

  try {
    const cached = await redisClient.get(key);
    const responseTime = Date.now() - startTime;
    
    if (cached) {
      console.log(`🎯 Redis 캐시 히트: ${key}`);
      const data = JSON.parse(cached);
      const dataSize = cached.length;
      recordCacheHit(key, 'redis', responseTime, dataSize);
      return data;
    }
    return null;
  } catch (error) {
    console.error('❌ Redis 캐시 읽기 오류:', error);
    return null;
  }
}

/**
 * Redis에 데이터 저장
 */
async function setToRedisCache<T>(
  key: string,
  data: T,
  ttl: number = 300
): Promise<boolean> {
  if (!redisClient) {
    redisClient = await initializeRedis();
  }

  if (!redisClient) return false;

  try {
    await redisClient.setex(key, ttl, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('❌ Redis 캐시 쓰기 오류:', error);
    return false;
  }
}

/**
 * 통합 캐시에서 데이터 가져오기 (메모리 -> Redis 순서)
 */
export async function getCachedData<T>(
  type: CacheKeyType,
  identifier: string
): Promise<T | null> {
  const key = generateCacheKey(type, identifier);
  const startTime = Date.now();

  // 1. 메모리 캐시 확인 (가장 빠름)
  const memoryData = await getFromMemoryCache<T>(key);
  if (memoryData) {
    return memoryData;
  }

  // 2. Redis 캐시 확인
  const redisData = await getFromRedisCache<T>(key);
  if (redisData) {
    // Redis에서 가져온 데이터를 메모리 캐시에도 저장
    setToMemoryCache(key, redisData, 300);
    return redisData;
  }

  // 3. 캐시 미스 기록
  const responseTime = Date.now() - startTime;
  recordCacheMiss(key, responseTime);
  
  return null;
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
  const key = generateCacheKey(type, identifier);

  // 병렬로 메모리와 Redis에 저장
  const promises = [
    Promise.resolve(setToMemoryCache(key, data, ttl)),
    setToRedisCache(key, data, ttl),
  ];

  try {
    const results = await Promise.allSettled(promises);
    const memorySuccess = results[0]?.status === 'fulfilled' && results[0]?.value;
    const redisSuccess = results[1]?.status === 'fulfilled' && results[1]?.value;

    if (memorySuccess || redisSuccess) {
      console.log(
        `✅ 캐시 저장 성공: ${key} (메모리: ${memorySuccess}, Redis: ${redisSuccess})`
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error('❌ 캐시 저장 오류:', error);
    return false;
  }
}

/**
 * 주식 데이터 캐시
 */
export async function getCachedStockData(
  symbol: string
): Promise<StockData | null> {
  return getCachedData<StockData>('stock', symbol);
}

export async function setCachedStockData(
  symbol: string,
  data: StockData,
  ttl: number = 300
): Promise<boolean> {
  return setCachedData('stock', symbol, { ...data, cached: true }, ttl);
}

/**
 * 환율 데이터 캐시
 */
export async function getCachedForexData(
  fromCurrency: string,
  toCurrency: string
): Promise<ForexData | null> {
  const identifier = `${fromCurrency}-${toCurrency}`;
  return getCachedData<ForexData>('forex', identifier);
}

export async function setCachedForexData(
  fromCurrency: string,
  toCurrency: string,
  data: ForexData,
  ttl: number = 300
): Promise<boolean> {
  const identifier = `${fromCurrency}-${toCurrency}`;
  return setCachedData('forex', identifier, { ...data, cached: true }, ttl);
}

/**
 * 지수 데이터 캐시
 */
export async function getCachedIndexData(
  symbol: string
): Promise<IndexData | null> {
  return getCachedData<IndexData>('index', symbol);
}

export async function setCachedIndexData(
  symbol: string,
  data: IndexData,
  ttl: number = 300
): Promise<boolean> {
  return setCachedData('index', symbol, { ...data, cached: true }, ttl);
}

/**
 * 캐시 통계 정보 (기존 호환성을 위해 유지)
 */
export async function getCacheStats() {
  try {
    const cache = await initializeNodeCache();
    if (!cache) {
      return {
        memory: {
          keys: 0,
          hits: 0,
          misses: 0,
          hitRate: 0,
        },
        redis: {
          connected: false,
          keys: 0,
        },
      };
    }

    const stats = cache.getStats();

    return {
      memory: {
        keys: stats.keys,
        hits: stats.hits,
        misses: stats.misses,
        hitRate: stats.hits / (stats.hits + stats.misses) || 0,
      },
      redis: {
        connected: redisClient !== null,
        keys: 0, // Redis 키 수는 별도로 계산 필요
      },
    };
  } catch (error) {
    console.error('캐시 통계 조회 오류:', error);
    return {
      memory: { keys: 0, hits: 0, misses: 0, hitRate: 0 },
      redis: { connected: false, keys: 0 },
    };
  }
}

/**
 * 고급 캐시 모니터링 통계 (새로운 모니터링 시스템 사용)
 */
export async function getAdvancedCacheStats(windowMs?: number) {
  const { getCacheStats: getMonitoringStats } = await import('./cache-monitoring');
  return getMonitoringStats(windowMs);
}

/**
 * 실시간 히트율 조회
 */
export async function getRealTimeCacheHitRate() {
  const { getRealTimeHitRate } = await import('./cache-monitoring');
  return getRealTimeHitRate();
}

/**
 * 캐시 성능 알림 확인
 */
export async function checkCachePerformanceAlerts() {
  const { checkCacheAlerts } = await import('./cache-monitoring');
  return checkCacheAlerts();
}

/**
 * 캐시 초기화
 */
export async function clearCache(): Promise<void> {
  try {
    // 메모리 캐시 클리어
    const cache = await initializeNodeCache();
    if (cache) {
      cache.flushAll();
      console.log('🧹 메모리 캐시 클리어 완료');
    }

    // Redis 캐시 클리어
    const redis = await initializeRedis();
    if (redis) {
      await redis.flushdb();
      console.log('🧹 Redis 캐시 클리어 완료');
    }
  } catch (error) {
    console.error('캐시 클리어 오류:', error);
  }
}

/**
 * 캐시 유효성 검사 (개발용)
 */
export async function validateCache(): Promise<boolean> {
  try {
    // 테스트 데이터로 캐시 동작 확인
    const testKey = 'test';
    const testData = { test: true, timestamp: Date.now() };

    // 캐시 저장 테스트
    const setResult = await setCachedData('stock', testKey, testData, 60);
    if (!setResult) {
      console.error('❌ 캐시 저장 테스트 실패');
      return false;
    }

    // 캐시 읽기 테스트
    const getData = await getCachedData('stock', testKey);
    if (!getData) {
      console.error('❌ 캐시 읽기 테스트 실패');
      return false;
    }

    console.log('✅ 캐시 유효성 검사 통과');
    return true;
  } catch (error) {
    console.error('❌ 캐시 유효성 검사 실패:', error);
    return false;
  }
}

// 앱 시작 시 Redis 초기화 (선택적)
if (process.env.NODE_ENV === 'production') {
  initializeRedis().catch(error => {
    console.warn('⚠️ Redis 초기화 실패, 메모리 캐시만 사용:', error.message);
  });
}
