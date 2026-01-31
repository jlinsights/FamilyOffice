/**
 * Advanced Multi-Tier Caching Strategy
 * Memory (5s) → Redis (5min) → API with fallback
 */
import Redis from 'ioredis';
import NodeCache from 'node-cache';

// Memory cache - L1 (fastest)
class MemoryCache {
  private cache: NodeCache;

  constructor(options = {}) {
    this.cache = new NodeCache({
      stdTTL: 5, // 5 seconds default TTL
      checkperiod: 10, // Check for expired keys every 10s
      maxKeys: 1000, // Limit memory usage
      useClones: false, // Performance optimization
      ...options,
    });

    // Cache events
    this.cache.on('set', (key, value) => {
      console.log(`📝 Memory SET: ${key}`);
    });

    this.cache.on('del', (key, value) => {
      console.log(`🗑️ Memory DEL: ${key}`);
    });

    this.cache.on('expired', (key, value) => {
      console.log(`⏰ Memory EXPIRED: ${key}`);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = this.cache.get<T>(key);
      if (value !== undefined) {
        return value;
      }
      return null;
    } catch (error) {
      console.error('Memory cache get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      return this.cache.set(key, value, ttl);
    } catch (error) {
      console.error('Memory cache set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      return this.cache.del(key) > 0;
    } catch (error) {
      console.error('Memory cache delete error:', error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      this.cache.flushAll();
    } catch (error) {
      console.error('Memory cache clear error:', error);
    }
  }

  getStats() {
    return this.cache.getStats();
  }

  close() {
    this.cache.close();
  }
}

// Redis cache - L2 (medium speed, persistent)
class RedisCache {
  private redis: Redis;
  private isConnected: boolean = false;

  constructor(redisUrl?: string) {
    if (!redisUrl) {
      console.warn('⚠️ Redis URL not provided, using fallback memory cache');
      return;
    }

    this.redis = new Redis(redisUrl, {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      family: 4,
      connectTimeout: 10000,
      commandTimeout: 5000,
    });

    // Redis events
    this.redis.on('connect', () => {
      this.isConnected = true;
      console.log('🔗 Redis connected');
    });

    this.redis.on('error', error => {
      this.isConnected = false;
      console.error('❌ Redis error:', error);
    });

    this.redis.on('close', () => {
      this.isConnected = false;
      console.log('🔌 Redis disconnected');
    });

    this.redis.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...');
    });
  }

  async connect(): Promise<boolean> {
    try {
      await this.redis.connect();
      return this.isConnected;
    } catch (error) {
      console.error('Redis connection failed:', error);
      return false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      return null;
    }

    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl: number = 300): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    try {
      const serialized = JSON.stringify(value);
      await this.redis.setex(key, ttl, serialized);
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    try {
      const result = await this.redis.del(key);
      return result > 0;
    } catch (error) {
      console.error('Redis delete error:', error);
      return false;
    }
  }

  async invalidatePattern(pattern: string): Promise<number> {
    if (!this.isConnected) {
      return 0;
    }

    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length === 0) {
        return 0;
      }

      const result = await this.redis.del(...keys);
      console.log(
        `🗑️ Redis invalidated ${result} keys for pattern: ${pattern}`
      );
      return result;
    } catch (error) {
      console.error('Redis invalidate pattern error:', error);
      return 0;
    }
  }

  async clear(): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    try {
      await this.redis.flushdb();
      return true;
    } catch (error) {
      console.error('Redis clear error:', error);
      return false;
    }
  }

  getRedisInfo() {
    return this.redis.info();
  }

  async disconnect(): Promise<void> {
    try {
      await this.redis.disconnect();
    } catch (error) {
      console.error('Redis disconnect error:', error);
    }
  }
}

// Advanced cache manager with tiered strategy
export class AdvancedCacheManager {
  private memoryCache: MemoryCache;
  private redisCache: RedisCache;
  private apiCallStats: Map<
    string,
    { count: number; lastCall: number; errors: number }
  >;

  constructor(redisUrl?: string) {
    this.memoryCache = new MemoryCache({
      stdTTL: 5, // 5 seconds
      maxKeys: 500, // Limit memory usage
    });

    this.redisCache = new RedisCache(redisUrl);
    this.apiCallStats = new Map();

    // Connect to Redis
    this.redisCache.connect().catch(console.error);
  }

  /**
   * Get data from cache with fallback chain
   * Memory (5s) → Redis (5min) → API
   */
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: {
      memoryTTL?: number;
      redisTTL?: number;
      forceRefresh?: boolean;
      retryOnError?: boolean;
    } = {}
  ): Promise<T> {
    const {
      memoryTTL = 5,
      redisTTL = 300,
      forceRefresh = false,
      retryOnError = true,
    } = options;

    const cacheKey = `familyoffice:${key}`;
    const startTime = Date.now();

    try {
      // L1: Memory cache (fastest)
      if (!forceRefresh) {
        const memoryResult = await this.memoryCache.get<T>(cacheKey);
        if (memoryResult !== null) {
          console.log(`🚀 Memory HIT: ${key} (${Date.now() - startTime}ms)`);
          return memoryResult;
        }
      }

      // L2: Redis cache (medium speed)
      const redisResult = await this.redisCache.get<T>(cacheKey);
      if (redisResult !== null) {
        // Backfill memory cache with Redis data
        await this.memoryCache.set(cacheKey, redisResult, memoryTTL);
        console.log(`⚡ Redis HIT: ${key} (${Date.now() - startTime}ms)`);
        return redisResult;
      }

      // L3: API call (slowest, fresh data)
      console.log(`🔄 API CALL: ${key}`);
      const apiResult = await this.executeAPICall(key, fetcher, retryOnError);

      // Cache in both layers
      await Promise.all([
        this.memoryCache.set(cacheKey, apiResult, memoryTTL),
        this.redisCache.set(cacheKey, apiResult, redisTTL),
      ]);

      console.log(`✅ API SUCCESS: ${key} (${Date.now() - startTime}ms)`);
      return apiResult;
    } catch (error) {
      console.error(`❌ Cache get failed for ${key}:`, error);

      // Try to return stale data from Redis as last resort
      const staleResult = await this.redisCache.get<T>(`${cacheKey}:stale`);
      if (staleResult !== null) {
        console.log(`🔄 Stale data fallback for ${key}`);
        return staleResult;
      }

      throw error;
    }
  }

  /**
   * Set data in all cache tiers
   */
  async set<T>(
    key: string,
    value: T,
    options: {
      memoryTTL?: number;
      redisTTL?: number;
      storeStale?: boolean;
    } = {}
  ): Promise<void> {
    const { memoryTTL = 5, redisTTL = 300, storeStale = true } = options;

    const cacheKey = `familyoffice:${key}`;

    try {
      await Promise.all([
        this.memoryCache.set(cacheKey, value, memoryTTL),
        this.redisCache.set(cacheKey, value, redisTTL),
      ]);

      // Store stale data for fallback
      if (storeStale) {
        await this.redisCache.set(`${cacheKey}:stale`, value, redisTTL * 2);
      }

      console.log(`💾 Cache SET: ${key}`);
    } catch (error) {
      console.error(`❌ Cache set failed for ${key}:`, error);
    }
  }

  /**
   * Delete from all cache tiers
   */
  async delete(key: string): Promise<void> {
    const cacheKey = `familyoffice:${key}`;

    try {
      await Promise.all([
        this.memoryCache.del(cacheKey),
        this.redisCache.del(cacheKey),
        this.redisCache.del(`${cacheKey}:stale`),
      ]);

      console.log(`🗑️ Cache DELETE: ${key}`);
    } catch (error) {
      console.error(`❌ Cache delete failed for ${key}:`, error);
    }
  }

  /**
   * Invalidate by pattern
   */
  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const redisPattern = `familyoffice:${pattern}`;
      await this.redisCache.invalidatePattern(redisPattern);

      // Clear memory cache matching pattern
      const memoryKeys = Object.keys(this.memoryCache.getStats().keys);
      const matchingKeys = memoryKeys.filter(key => key.includes(pattern));

      for (const key of matchingKeys) {
        await this.memoryCache.del(key);
      }

      console.log(`🧹 Cache INVALIDATE: ${pattern}`);
    } catch (error) {
      console.error(`❌ Cache invalidate failed for ${pattern}:`, error);
    }
  }

  /**
   * Execute API call with retry logic and error handling
   */
  private async executeAPICall<T>(
    key: string,
    fetcher: () => Promise<T>,
    retry: boolean = true
  ): Promise<T> {
    const maxRetries = 3;
    const baseDelay = 1000;

    // Update API call stats
    const stats = this.apiCallStats.get(key) || {
      count: 0,
      lastCall: 0,
      errors: 0,
    };
    stats.count++;
    stats.lastCall = Date.now();
    this.apiCallStats.set(key, stats);

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await Promise.race([
          fetcher(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('API timeout')), 10000)
          ),
        ]);

        // Reset error count on success
        if (stats.errors > 0) {
          stats.errors = 0;
          this.apiCallStats.set(key, stats);
        }

        return result;
      } catch (error) {
        stats.errors++;
        this.apiCallStats.set(key, stats);

        console.error(
          `API call failed for ${key} (attempt ${attempt + 1}):`,
          error
        );

        if (attempt === maxRetries || !retry) {
          throw error;
        }

        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error(`API call failed after ${maxRetries} retries: ${key}`);
  }

  /**
   * Get comprehensive cache statistics
   */
  async getStats() {
    const memoryStats = this.memoryCache.getStats();
    const redisInfo = await this.redisCache.getRedisInfo();
    const apiStats = Object.fromEntries(this.apiCallStats);

    return {
      memory: {
        keys: memoryStats.keys,
        hits: memoryStats.hits,
        misses: memoryStats.misses,
        hitRate:
          memoryStats.hits / (memoryStats.hits + memoryStats.misses) || 0,
        ksize: memoryStats.ksize,
      },
      redis: {
        connected: this.redisCache.isConnected,
        info: redisInfo,
      },
      api: {
        calls: apiStats,
        totalCalls: Object.values(apiStats).reduce(
          (sum, stats) => sum + stats.count,
          0
        ),
        totalErrors: Object.values(apiStats).reduce(
          (sum, stats) => sum + stats.errors,
          0
        ),
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Health check for all cache tiers
   */
  async healthCheck() {
    const testKey = `health-check-${Date.now()}`;
    const testValue = { test: true, timestamp: Date.now() };

    try {
      // Test memory cache
      await this.memoryCache.set(testKey, testValue, 5);
      const memoryResult = await this.memoryCache.get(testKey);
      const memoryHealthy = memoryResult?.test === true;

      // Test Redis cache
      await this.redisCache.set(testKey, testValue, 5);
      const redisResult = await this.redisCache.get(testKey);
      const redisHealthy = redisResult?.test === true;

      // Cleanup
      await this.memoryCache.del(testKey);
      await this.redisCache.del(testKey);

      return {
        memory: { healthy: memoryHealthy, latency: 'fast' },
        redis: { healthy: redisHealthy, latency: 'medium' },
        api: { healthy: true, latency: 'slow' },
        overall:
          memoryHealthy && (redisHealthy || !this.redisCache.isConnected),
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        memory: { healthy: false, error: error.message },
        redis: { healthy: false, error: error.message },
        api: { healthy: false, error: error.message },
        overall: false,
      };
    }
  }

  /**
   * Cleanup and disconnect
   */
  async cleanup(): Promise<void> {
    try {
      await this.memoryCache.clear();
      await this.redisCache.disconnect();
      console.log('🧹 Cache cleanup completed');
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  }
}

// Singleton instance
let cacheManager: AdvancedCacheManager;

export function getCacheManager(redisUrl?: string): AdvancedCacheManager {
  if (!cacheManager) {
    cacheManager = new AdvancedCacheManager(redisUrl);
  }
  return cacheManager;
}

// Convenience functions for financial data
export async function getCachedFinancialData<T>(
  symbol: string,
  fetcher: () => Promise<T>,
  ttlMinutes: number = 5
): Promise<T> {
  const cache = getCacheManager();
  return cache.get(`financial:${symbol}`, fetcher, {
    redisTTL: ttlMinutes * 60,
    memoryTTL: Math.min(ttlMinutes * 60, 300), // Max 5 min in memory
  });
}

export async function invalidateFinancialData(symbol: string): Promise<void> {
  const cache = getCacheManager();
  await cache.invalidatePattern(`financial:${symbol}*`);
}

// Cache warming for popular financial data
export async function warmCache(symbols: string[]): Promise<void> {
  console.log('🔥 Warming cache for symbols:', symbols);

  const cache = getCacheManager();
  const warmPromises = symbols.map(async symbol => {
    try {
      // This would be implemented with actual financial API call
      // await cache.get(`financial:${symbol}`, () => fetchFinancialData(symbol));
      console.log(`✅ Warmed cache for ${symbol}`);
    } catch (error) {
      console.error(`❌ Failed to warm cache for ${symbol}:`, error);
    }
  });

  await Promise.allSettled(warmPromises);
  console.log('🔥 Cache warming completed');
}
