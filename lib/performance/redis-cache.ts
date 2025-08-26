/**
 * Redis 분산 캐싱 시스템
 * Real-time price updates: <100ms latency 목표
 */
import { logger } from '../logger';

// SSR 안전성을 위한 dynamic imports
let Redis: any = null;
let compress: any = null;
let decompress: any = null;

// Redis 클라이언트 설정
export class RedisCache {
  private redis: any;
  private fallbackCache = new Map<string, { value: any; expires: number }>();
  private compressionThreshold = 1024; // 1KB 이상 압축

  constructor() {
    this.initializeRedis();
  }

  private async initializeRedis() {
    if (typeof window !== 'undefined') {
      // Client-side에서는 사용하지 않음
      return;
    }

    try {
      // Dynamic imports
      if (!Redis) {
        const redisModule = await import('ioredis');
        Redis = redisModule.default;
      }

      if (!compress || !decompress) {
        // Fallback to default serialization (LZ4 compression disabled for compatibility)
        logger.warn(
          'Using default JSON serialization (LZ4 compression disabled)',
          {
            component: 'RedisCache',
            function: 'initializeRedis',
          }
        );
        compress = (data: any) => JSON.stringify(data);
        decompress = (data: any) => JSON.parse(data.toString());
      }

      this.redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        db: 0,
        retryDelayOnFailover: 100,
        enableReadyCheck: true,
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        // 연결 풀 설정
        family: 4,
        keepAlive: 30000,
        // 클러스터 설정 (프로덕션용)
        enableOfflineQueue: false,
        // 성능 최적화
        compression: 'gzip',
      });

      this.setupEventHandlers();
    } catch (error) {
      logger.error('Redis 초기화 실패', error as Error, {
        component: 'RedisCache',
        function: 'initializeRedis',
      });
      this.redis = null;
    }
  }

  private setupEventHandlers() {
    if (!this.redis) {
      logger.warn('Redis 클라이언트가 초기화되지 않음', {
        component: 'RedisCache',
        function: 'setupEventHandlers',
      });
      return;
    }

    this.redis.on('connect', () => {
      logger.info('Redis connected', {
        component: 'RedisCache',
        function: 'onConnect',
      });
    });

    this.redis.on('error', (error: any) => {
      logger.error('Redis error', error, {
        component: 'RedisCache',
        function: 'onError',
      });
      // Fallback to in-memory cache
    });

    this.redis.on('close', () => {
      logger.warn('Redis connection closed', {
        component: 'RedisCache',
        function: 'onClose',
      });
    });
  }

  // 압축된 데이터 저장
  async set(key: string, value: any, ttl: number = 300): Promise<boolean> {
    if (!this.redis) {
      logger.warn('Redis 클라이언트가 초기화되지 않음 - fallback cache 사용', {
        component: 'RedisCache',
        function: 'set',
        metadata: { key },
      });
      this.fallbackCache.set(key, {
        value,
        expires: Date.now() + ttl * 1000,
      });
      return true;
    }

    try {
      const serialized = JSON.stringify(value);
      const shouldCompress = serialized.length > this.compressionThreshold;

      const data = shouldCompress
        ? compress(Buffer.from(serialized)).toString('base64')
        : serialized;

      const result = await this.redis.setex(
        key,
        ttl,
        shouldCompress ? `compressed:${data}` : data
      );

      return result === 'OK';
    } catch (error) {
      logger.error('Redis set error - using fallback cache', error as Error, {
        component: 'RedisCache',
        function: 'set',
        metadata: { key },
      });
      // Fallback to memory cache
      this.fallbackCache.set(key, {
        value,
        expires: Date.now() + ttl * 1000,
      });
      return true;
    }
  }

  // 압축 해제된 데이터 조회
  async get<T>(key: string): Promise<T | null> {
    if (!this.redis) {
      logger.warn('Redis 클라이언트가 초기화되지 않음 - fallback cache 사용', {
        component: 'RedisCache',
        function: 'get',
        metadata: { key },
      });
      const fallback = this.fallbackCache.get(key);
      if (fallback && fallback.expires > Date.now()) {
        return fallback.value;
      }
      return null;
    }

    try {
      const data = await this.redis.get(key);
      if (!data) return null;

      let parsed: T;
      if (data.startsWith('compressed:')) {
        const compressed = data.slice(11); // Remove 'compressed:' prefix
        const decompressed = decompress(Buffer.from(compressed, 'base64'));
        parsed = JSON.parse(decompressed.toString());
      } else {
        parsed = JSON.parse(data);
      }

      return parsed;
    } catch (error) {
      logger.error('Redis get error - using fallback cache', error as Error, {
        component: 'RedisCache',
        function: 'get',
        metadata: { key },
      });
      // Fallback to memory cache
      const fallback = this.fallbackCache.get(key);
      if (fallback && fallback.expires > Date.now()) {
        return fallback.value;
      }
      return null;
    }
  }

  // 배치 데이터 조회 (파이프라인 사용)
  async mget<T>(keys: string[]): Promise<Record<string, T | null>> {
    if (!this.redis) {
      logger.warn('Redis 클라이언트가 초기화되지 않음 - mget 실패', {
        component: 'RedisCache',
        function: 'mget',
        metadata: { keyCount: keys.length },
      });
      return {};
    }

    try {
      const pipeline = this.redis.pipeline();
      keys.forEach(key => pipeline.get(key));

      const results = await pipeline.exec();
      const data: Record<string, T | null> = {};

      keys.forEach((key, index) => {
        const result = results?.[index];
        if (result && result[1]) {
          try {
            const value = result[1] as string;
            if (value.startsWith('compressed:')) {
              const compressed = value.slice(11);
              const decompressed = decompress(
                Buffer.from(compressed, 'base64')
              );
              data[key] = JSON.parse(decompressed.toString());
            } else {
              data[key] = JSON.parse(value);
            }
          } catch {
            data[key] = null;
          }
        } else {
          data[key] = null;
        }
      });

      return data;
    } catch (error) {
      logger.error('Redis mget error', error as Error, {
        component: 'RedisCache',
        function: 'mget',
        metadata: { keyCount: keys.length },
      });
      return {};
    }
  }

  // 배치 데이터 저장
  async mset(
    pairs: Array<{ key: string; value: any; ttl?: number }>
  ): Promise<boolean> {
    if (!this.redis) {
      logger.warn('Redis 클라이언트가 초기화되지 않음 - mset 실패', {
        component: 'RedisCache',
        function: 'mset',
        metadata: { pairCount: pairs.length },
      });
      return false;
    }

    try {
      const pipeline = this.redis.pipeline();

      pairs.forEach(({ key, value, ttl = 300 }) => {
        const serialized = JSON.stringify(value);
        const data =
          serialized.length > this.compressionThreshold
            ? compress(Buffer.from(serialized)).toString('base64')
            : serialized;

        pipeline.setex(
          key,
          ttl,
          serialized.length > this.compressionThreshold
            ? `compressed:${data}`
            : data
        );
      });

      const results = await pipeline.exec();
      return results?.every((result: any) => result[1] === 'OK') || false;
    } catch (error) {
      logger.error('Redis mset error', error as Error, {
        component: 'RedisCache',
        function: 'mset',
        metadata: { pairCount: pairs.length },
      });
      return false;
    }
  }

  // 패턴 기반 키 삭제
  async deletePattern(pattern: string): Promise<number> {
    if (!this.redis) {
      logger.warn('Redis 클라이언트가 초기화되지 않음 - 키 삭제 실패', {
        component: 'RedisCache',
        function: 'deletePattern',
        metadata: { pattern },
      });
      return 0;
    }

    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        return await this.redis.del(...keys);
      }
      return 0;
    } catch (error) {
      logger.error('Redis delete pattern error', error as Error, {
        component: 'RedisCache',
        function: 'deletePattern',
        metadata: { pattern },
      });
      return 0;
    }
  }

  // 실시간 데이터 발행/구독
  async publish(channel: string, data: any): Promise<number> {
    if (!this.redis) {
      logger.warn('Redis 클라이언트가 초기화되지 않음 - publish 실패', {
        component: 'RedisCache',
        function: 'publish',
        metadata: { channel },
      });
      return 0;
    }

    try {
      return await this.redis.publish(channel, JSON.stringify(data));
    } catch (error) {
      logger.error('Redis publish error', error as Error, {
        component: 'RedisCache',
        function: 'publish',
        metadata: { channel },
      });
      return 0;
    }
  }

  // 구독 설정
  subscribe(channel: string, callback: (data: any) => void): void {
    if (typeof window !== 'undefined') {
      logger.warn('브라우저 환경에서는 Redis 구독 설정 불가', {
        component: 'RedisCache',
        function: 'subscribe',
        metadata: { channel },
      });
      return;
    }

    const subscriber = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    });

    subscriber.subscribe(channel);
    subscriber.on('message', (receivedChannel: any, message: any) => {
      if (receivedChannel === channel) {
        try {
          const data = JSON.parse(message);
          callback(data);
        } catch (error) {
          logger.error('Redis message parse error', error as Error, {
            component: 'RedisCache',
            function: 'subscribe',
            metadata: { channel },
          });
        }
      }
    });
  }

  // 캐시 통계
  async getStats() {
    if (!this.redis) {
      logger.error(
        'Redis 클라이언트가 초기화되지 않음 - 통계 조회 실패',
        undefined,
        {
          component: 'RedisCache',
          function: 'getStats',
        }
      );
      return null;
    }

    try {
      const info = await this.redis.info('memory');
      const keyspace = await this.redis.info('keyspace');

      return {
        memoryUsed: this.parseMemoryUsage(info),
        keyCount: this.parseKeyCount(keyspace),
        hitRate: await this.getHitRate(),
        connected: this.redis.status === 'ready',
      };
    } catch (error) {
      logger.error('Redis stats error', error as Error, {
        component: 'RedisCache',
        function: 'getStats',
      });
      return null;
    }
  }

  private parseMemoryUsage(info: string): number {
    if (!this.redis) {
      return 0;
    }
    const match = info.match(/used_memory:(\d+)/);
    return match && match[1] ? parseInt(match[1]) : 0;
  }

  private parseKeyCount(keyspace: string): number {
    if (!this.redis) {
      return 0;
    }
    const match = keyspace.match(/keys=(\d+)/);
    return match && match[1] ? parseInt(match[1]) : 0;
  }

  private async getHitRate(): Promise<number> {
    if (!this.redis) {
      return 0;
    }
    try {
      const stats = await this.redis.info('stats');
      const hitsMatch = stats.match(/keyspace_hits:(\d+)/);
      const missesMatch = stats.match(/keyspace_misses:(\d+)/);

      const hits = hitsMatch && hitsMatch[1] ? parseInt(hitsMatch[1]) : 0;
      const misses = missesMatch && missesMatch[1] ? parseInt(missesMatch[1]) : 0;

      return hits + misses > 0 ? (hits / (hits + misses)) * 100 : 0;
    } catch {
      return 0;
    }
  }

  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
    }
  }
}

// 금융 데이터 전용 캐시 관리자
export class FinancialDataCache {
  private redis: RedisCache;
  private readonly STOCK_PREFIX = 'stock:';
  private readonly FOREX_PREFIX = 'forex:';
  private readonly PORTFOLIO_PREFIX = 'portfolio:';
  private readonly PRICE_STREAM = 'price_updates';

  constructor() {
    this.redis = new RedisCache();
  }

  // 주식 데이터 캐시 (5분 TTL)
  async cacheStockPrice(symbol: string, data: any): Promise<void> {
    const key = `${this.STOCK_PREFIX}${symbol}`;
    await this.redis.set(
      key,
      {
        ...data,
        cachedAt: Date.now(),
      },
      300
    ); // 5분

    // 실시간 업데이트 발행
    await this.redis.publish(this.PRICE_STREAM, {
      type: 'stock',
      symbol,
      price: data.currentPrice,
      change: data.change,
      timestamp: Date.now(),
    });
  }

  // 주식 데이터 조회
  async getStockPrice(symbol: string): Promise<any | null> {
    const key = `${this.STOCK_PREFIX}${symbol}`;
    return await this.redis.get(key);
  }

  // 다중 주식 데이터 조회 (병렬 처리)
  async getMultipleStockPrices(
    symbols: string[]
  ): Promise<Record<string, any>> {
    const keys = symbols.map(symbol => `${this.STOCK_PREFIX}${symbol}`);
    const results = await this.redis.mget(keys);

    const stockData: Record<string, any> = {};
    symbols.forEach((symbol, index) => {
      const key = keys[index];
      if (key) {
        stockData[symbol] = results[key];
      }
    });

    return stockData;
  }

  // 포트폴리오 캐시 (30분 TTL)
  async cachePortfolioSummary(userId: string, data: any): Promise<void> {
    const key = `${this.PORTFOLIO_PREFIX}${userId}:summary`;
    await this.redis.set(
      key,
      {
        ...data,
        cachedAt: Date.now(),
      },
      1800
    ); // 30분
  }

  // 포트폴리오 조회
  async getPortfolioSummary(userId: string): Promise<any | null> {
    const key = `${this.PORTFOLIO_PREFIX}${userId}:summary`;
    return await this.redis.get(key);
  }

  // 환율 데이터 캐시 (10분 TTL)
  async cacheForexRate(
    fromCurrency: string,
    toCurrency: string,
    data: any
  ): Promise<void> {
    const key = `${this.FOREX_PREFIX}${fromCurrency}_${toCurrency}`;
    await this.redis.set(
      key,
      {
        ...data,
        cachedAt: Date.now(),
      },
      600
    ); // 10분
  }

  // 캐시 무효화 (사용자별)
  async invalidateUserCache(userId: string): Promise<void> {
    await this.redis.deletePattern(`${this.PORTFOLIO_PREFIX}${userId}:*`);
  }

  // 심볼별 캐시 무효화
  async invalidateSymbolCache(symbol: string): Promise<void> {
    await this.redis.deletePattern(`${this.STOCK_PREFIX}${symbol}*`);
  }

  // 실시간 가격 업데이트 구독
  subscribeToPriceUpdates(callback: (update: any) => void): void {
    this.redis.subscribe(this.PRICE_STREAM, callback);
  }

  // 캐시 예열 (자주 조회되는 데이터)
  async warmCache(): Promise<void> {
    if (typeof window !== 'undefined') {
      logger.warn('브라우저 환경에서는 캐시 예열 불가', {
        component: 'FinancialDataCache',
        function: 'warmCache',
      });
      return;
    }

    const popularSymbols = [
      '005930.KS', // 삼성전자
      '000660.KS', // SK하이닉스
      '035420.KS', // NAVER
      'AAPL', // Apple
      'TSLA', // Tesla
    ];

    logger.info('Warming cache for popular symbols', {
      component: 'FinancialDataCache',
      function: 'warmCache',
      metadata: { symbolCount: popularSymbols.length },
    });

    // 외부 API에서 최신 데이터 가져와서 캐시
    // 실제 구현시 외부 API 호출 추가
    for (const symbol of popularSymbols) {
      // Mock data for warming
      await this.cacheStockPrice(symbol, {
        symbol,
        currentPrice: Math.random() * 1000,
        change: Math.random() * 10 - 5,
        changePercent: Math.random() * 5 - 2.5,
        volume: Math.floor(Math.random() * 1000000),
        lastUpdated: Date.now(),
      });
    }
  }
}

// CDN 캐시 관리
export class CDNCacheManager {
  // 정적 자산 캐시 설정
  static getOptimizedHeaders(fileType: string): Record<string, string> {
    const headers: Record<string, string> = {
      Vary: 'Accept-Encoding',
      'X-Content-Type-Options': 'nosniff',
    };

    switch (fileType) {
      case 'image':
        headers['Cache-Control'] = 'public, max-age=31536000, immutable'; // 1년
        break;
      case 'font':
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        headers['Access-Control-Allow-Origin'] = '*';
        break;
      case 'css':
      case 'js':
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        break;
      case 'html':
        headers['Cache-Control'] = 'public, max-age=300, must-revalidate'; // 5분
        break;
      case 'api':
        headers['Cache-Control'] =
          'public, max-age=60, stale-while-revalidate=300';
        break;
      default:
        headers['Cache-Control'] = 'public, max-age=3600'; // 1시간
    }

    return headers;
  }

  // CDN 캐시 퍼지
  async purgeCache(urls: string[]): Promise<boolean> {
    try {
      // CDN 제공업체별 구현 (예: CloudFlare, AWS CloudFront)
      logger.info('Purging CDN cache', {
        component: 'CDNCacheManager',
        function: 'purgeCache',
        metadata: {
          urlCount: urls.length,
          urls,
        },
      });

      // CloudFlare API 예시
      if (process.env.CLOUDFLARE_API_TOKEN) {
        const response = await fetch(
          `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/purge_cache`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ files: urls }),
          }
        );

        return response.ok;
      }

      return true;
    } catch (error) {
      logger.error('CDN cache purge error', error as Error, {
        component: 'CDNCacheManager',
        function: 'purgeCache',
        metadata: { urlCount: urls.length },
      });
      return false;
    }
  }
}

// 브라우저 캐시 최적화
export class BrowserCacheOptimizer {
  // Service Worker 캐시 전략
  static generateServiceWorkerCache(): string {
    return `
// 성능 최적화된 Service Worker
const CACHE_NAME = 'familyoffice-v1'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// 캐시할 정적 자산
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/portfolio',
  '/manifest.json',
  // 핵심 CSS/JS 파일들
]

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
  )
})

// 네트워크 요청 인터셉트
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // API 요청 처리 (stale-while-revalidate)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then(async cache => {
        const cachedResponse = await cache.match(request)
        
        // 캐시된 응답 즉시 반환하고 백그라운드에서 업데이트
        const fetchPromise = fetch(request).then(response => {
          if (response.status === 200) {
            cache.put(request, response.clone())
          }
          return response
        })
        
        return cachedResponse || fetchPromise
      })
    )
    return
  }

  // 정적 자산 처리 (cache-first)
  if (request.destination === 'image' || 
      request.destination === 'script' || 
      request.destination === 'style') {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          return caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, fetchResponse.clone())
            return fetchResponse
          })
        })
      })
    )
    return
  }

  // 기본 네트워크 우선 전략
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  )
})
`;
  }

  // 메모리 캐시 최적화
  static optimizeMemoryCache(): void {
    if (typeof window !== 'undefined') {
      // 이미지 프리로딩
      const criticalImages = [
        '/logo.png',
        '/dashboard-bg.jpg',
        '/chart-icons.svg',
      ];

      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });

      // 폰트 프리로딩
      const criticalFonts = [
        '/fonts/inter-var.woff2',
        '/fonts/pretendard-var.woff2',
      ];

      criticalFonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
      });
    }
  }
}

// 캐시 성능 모니터링
export class CachePerformanceMonitor {
  private metrics = {
    redisHits: 0,
    redisMisses: 0,
    browserHits: 0,
    browserMisses: 0,
    cdnHits: 0,
    cdnMisses: 0,
  };

  recordCacheHit(cacheType: 'redis' | 'browser' | 'cdn', isHit: boolean): void {
    if (isHit) {
      this.metrics[`${cacheType}Hits`]++;
    } else {
      this.metrics[`${cacheType}Misses`]++;
    }
  }

  getCacheStats() {
    const total = Object.values(this.metrics).reduce(
      (sum, count) => sum + count,
      0
    );
    const hits =
      this.metrics.redisHits + this.metrics.browserHits + this.metrics.cdnHits;

    return {
      ...this.metrics,
      totalRequests: total,
      overallHitRate: total > 0 ? (hits / total) * 100 : 0,
      redisHitRate: this.getHitRate('redis'),
      browserHitRate: this.getHitRate('browser'),
      cdnHitRate: this.getHitRate('cdn'),
    };
  }

  private getHitRate(cacheType: 'redis' | 'browser' | 'cdn'): number {
    const hits = this.metrics[`${cacheType}Hits`];
    const misses = this.metrics[`${cacheType}Misses`];
    const total = hits + misses;

    return total > 0 ? (hits / total) * 100 : 0;
  }

  // 성능 보고서 생성
  generatePerformanceReport() {
    const stats = this.getCacheStats();

    return {
      summary: {
        overallHitRate: stats.overallHitRate,
        totalRequests: stats.totalRequests,
        performanceGrade: this.getPerformanceGrade(stats.overallHitRate),
      },
      details: stats,
      recommendations: this.getRecommendations(stats),
    };
  }

  private getPerformanceGrade(hitRate: number): string {
    if (hitRate >= 90) return 'A';
    if (hitRate >= 80) return 'B';
    if (hitRate >= 70) return 'C';
    if (hitRate >= 60) return 'D';
    return 'F';
  }

  private getRecommendations(stats: any): string[] {
    const recommendations: string[] = [];

    if (stats.redisHitRate < 80) {
      recommendations.push('Redis 캐시 TTL 조정 필요');
    }
    if (stats.browserHitRate < 70) {
      recommendations.push('브라우저 캐시 헤더 최적화 필요');
    }
    if (stats.cdnHitRate < 85) {
      recommendations.push('CDN 캐시 정책 재검토 필요');
    }

    return recommendations;
  }
}

// 싱글톤 인스턴스
export const financialCache = new FinancialDataCache();
export const cdnManager = new CDNCacheManager();
export const cacheMonitor = new CachePerformanceMonitor();

// 초기화 함수
export function initializeRedisCache(): void {
  if (typeof window !== 'undefined') {
    logger.debug('Client-side에서는 Redis 캐시 초기화 제외', {
      component: 'redis-cache',
      function: 'initializeRedisCache',
    });
    return;
  }

  try {
    // 서버에서만 초기화
    new RedisCache();
    logger.info('Redis 캐시 초기화 완료', {
      component: 'redis-cache',
      function: 'initializeRedisCache',
    });
  } catch (error) {
    logger.error('Redis 캐시 초기화 실패', error as Error, {
      component: 'redis-cache',
      function: 'initializeRedisCache',
    });
  }
}
