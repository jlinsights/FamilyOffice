// 캠시 엔트리 타입 정의
interface CacheEntry<T = unknown> {
  value: T;
  expiry: number;
}

// 캠시 인스턴스 인터페이스
interface CacheInstance {
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T, ttlSeconds?: number): void;
  del(key: string): void;
  keys(): string[];
  flushAll(): void;
  getStats(): CacheStats;
  mget?(keys: string[]): Record<string, unknown>;
  mset?(pairs: Array<{ key: string; val: unknown; ttl?: number }>): boolean;
  has?(key: string): boolean;
}

// 캠시 통계 타입
interface CacheStats {
  hits: number;
  misses: number;
  keys: number;
  expired?: number;
  size?: number;
}

// 간단한 메모리 캠시 fallback
class SimpleMemoryCache implements CacheInstance {
  private cache = new Map<string, CacheEntry>();

  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item || Date.now() > item.expiry) {
      if (item) this.cache.delete(key);
      return undefined;
    }
    return item.value as T;
  }

  set<T>(key: string, value: T, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  del(key: string): void {
    this.cache.delete(key);
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  flushAll(): void {
    this.cache.clear();
  }

  getStats(): CacheStats {
    const now = Date.now();
    const totalKeys = this.cache.size;
    const expiredKeys = Array.from(this.cache.entries()).filter(
      ([, item]) => now > item.expiry
    ).length;

    return {
      hits: 0, // SimpleMemoryCache doesn't track hits
      misses: 0, // SimpleMemoryCache doesn't track misses
      keys: totalKeys,
      expired: expiredKeys,
      size: totalKeys,
    };
  }
}

// SSR 안전한 캐시 생성
const createCache = () => {
  if (typeof window !== 'undefined') {
    // 클라이언트 사이드에서는 간단한 메모리 캐시 사용
    return new SimpleMemoryCache();
  }

  // 서버 사이드에서는 항상 SimpleMemoryCache 사용 (안정성 우선)
  return new SimpleMemoryCache();
};

// Cache configuration
export interface CacheConfig {
  stdTTL: number; // Standard Time To Live in seconds
  checkperiod: number; // Check period for expired keys in seconds
  useClones: boolean; // Whether to use clones of cached data
  maxKeys: number; // Maximum number of keys to store
}

// Default cache configurations
export const cacheConfigs = {
  // Short-term cache (5 minutes)
  short: {
    stdTTL: 300,
    checkperiod: 120,
    useClones: true,
    maxKeys: 1000,
  },

  // Medium-term cache (30 minutes)
  medium: {
    stdTTL: 1800,
    checkperiod: 600,
    useClones: true,
    maxKeys: 500,
  },

  // Long-term cache (2 hours)
  long: {
    stdTTL: 7200,
    checkperiod: 1800,
    useClones: true,
    maxKeys: 200,
  },

  // Session cache (24 hours)
  session: {
    stdTTL: 86400,
    checkperiod: 3600,
    useClones: true,
    maxKeys: 100,
  },
} as const;

// Cache instances - 즉시 사용 가능
export const caches = {
  short: createCache(),
  medium: createCache(),
  long: createCache(),
  session: createCache(),
};

// Cache wrapper class
export class CacheManager<T = unknown> {
  private cache: CacheInstance;
  private prefix: string;

  constructor(cache: CacheInstance, prefix: string = '') {
    this.cache = cache;
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }

  async get<T>(key: string): Promise<T | undefined> {
    try {
      const result = this.cache.get(this.getKey(key)) as T;
      return result;
    } catch (error) {
      console.error('Cache get error:', error);
      return undefined;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      this.cache.set(this.getKey(key), value, ttl);
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<number> {
    try {
      this.cache.del(this.getKey(key));
      return 1; // Successfully deleted
    } catch (error) {
      console.error('Cache del error:', error);
      return 0;
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      if (this.cache.has) {
        return this.cache.has(this.getKey(key));
      }
      // Fallback: check if get returns a value
      const value = this.cache.get(this.getKey(key));
      return value !== undefined;
    } catch (error) {
      console.error('Cache has error:', error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      if (this.prefix) {
        // Clear only keys with this prefix
        const keys = this.cache.keys();
        const prefixedKeys = keys.filter((key: string) =>
          key.startsWith(this.prefix)
        );
        // Delete each key individually
        prefixedKeys.forEach((key: string) => this.cache.del(key));
      } else {
        this.cache.flushAll();
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  async mget<T>(keys: string[]): Promise<Record<string, T | undefined>> {
    try {
      if (!this.cache.mget) {
        // Fallback: get each key individually
        const result: Record<string, T | undefined> = {};
        for (const key of keys) {
          result[key] = this.cache.get<T>(this.getKey(key));
        }
        return result;
      }

      const prefixedKeys = keys.map(key => this.getKey(key));
      const result = this.cache.mget(prefixedKeys);

      // Convert back to original keys
      const converted: Record<string, T | undefined> = {};
      keys.forEach((originalKey, index) => {
        const prefixedKey = prefixedKeys[index];
        if (prefixedKey) {
          converted[originalKey] = result[prefixedKey] as T | undefined;
        }
      });

      return converted;
    } catch (error) {
      console.error('Cache mget error:', error);
      return {};
    }
  }

  async mset<T>(
    pairs: Array<{ key: string; value: T; ttl?: number }>
  ): Promise<boolean> {
    try {
      if (!this.cache.mset) {
        // Fallback: set each key individually
        for (const { key, value, ttl } of pairs) {
          this.cache.set(this.getKey(key), value, ttl);
        }
        return true;
      }

      const mappedPairs = pairs.map(({ key, value, ttl }) => {
        const pair: { key: string; val: unknown; ttl?: number } = {
          key: this.getKey(key),
          val: value,
        };
        // Conditionally add ttl if defined
        if (ttl !== undefined) {
          pair.ttl = ttl;
        }
        return pair;
      });

      return this.cache.mset(mappedPairs);
    } catch (error) {
      console.error('Cache mset error:', error);
      return false;
    }
  }

  getStats() {
    return this.cache.getStats();
  }
}

// Cache managers for different purposes
export const cacheManagers = {
  api: new CacheManager(caches.medium),
  user: new CacheManager(caches.session),
  content: new CacheManager(caches.long),
  temp: new CacheManager(caches.short),
};

// Cache decorator for functions
export function cached<T extends (...args: any[]) => any>(
  cacheManager: CacheManager,
  keyGenerator: (args: Parameters<T>) => string,
  ttl?: number
) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Parameters<T>) {
      const cacheKey = keyGenerator(args);

      // Try to get from cache
      const cached = await cacheManager.get(cacheKey);
      if (cached !== undefined) {
        return cached;
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Cache the result
      await cacheManager.set(cacheKey, result, ttl);

      return result;
    };
  };
}

// Cache utility functions
export async function getOrSet<T>(
  cacheManager: CacheManager,
  key: string,
  fetchFn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Try to get from cache
  const cached = await cacheManager.get<T>(key);
  if (cached !== undefined) {
    return cached;
  }

  // Fetch and cache
  const result = await fetchFn();
  await cacheManager.set(key, result, ttl);

  return result;
}

// Cache warming utility
export async function warmCache<T>(
  cacheManager: CacheManager,
  entries: Array<{ key: string; fetchFn: () => Promise<T>; ttl?: number }>
): Promise<void> {
  const promises = entries.map(async ({ key, fetchFn, ttl }) => {
    try {
      const exists = await cacheManager.has(key);
      if (!exists) {
        const value = await fetchFn();
        await cacheManager.set(key, value, ttl);
      }
    } catch (error) {
      console.error(`Cache warming failed for key ${key}:`, error);
    }
  });

  await Promise.allSettled(promises);
}

// Cache invalidation patterns
export class CacheInvalidator {
  private cacheManager: CacheManager;
  private patterns: Map<string, Set<string>> = new Map();

  constructor(cacheManager: CacheManager) {
    this.cacheManager = cacheManager;
  }

  registerPattern(pattern: string, keys: string[]) {
    this.patterns.set(pattern, new Set(keys));
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = this.patterns.get(pattern);
    if (keys) {
      const deletePromises = Array.from(keys).map(key =>
        this.cacheManager.del(key)
      );
      await Promise.allSettled(deletePromises);
    }
  }

  async invalidateByPrefix(): Promise<void> {
    // This would require implementing a prefix-based deletion
    // For now, we'll clear all cache if no Redis
    await this.cacheManager.clear();
  }
}

// Tag-based cache invalidation
export class TaggedCache {
  private cacheManager: CacheManager;
  private tags: Map<string, Set<string>> = new Map();

  constructor(cacheManager: CacheManager) {
    this.cacheManager = cacheManager;
  }

  async set<T>(
    key: string,
    value: T,
    tags: string[],
    ttl?: number
  ): Promise<boolean> {
    // Store the value
    const success = await this.cacheManager.set(key, value, ttl);

    if (success) {
      // Associate key with tags
      tags.forEach(tag => {
        if (!this.tags.has(tag)) {
          this.tags.set(tag, new Set());
        }
        this.tags.get(tag)!.add(key);
      });
    }

    return success;
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async invalidateTag(tag: string): Promise<void> {
    const keys = this.tags.get(tag);
    if (keys) {
      const deletePromises = Array.from(keys).map(key =>
        this.cacheManager.del(key)
      );
      await Promise.allSettled(deletePromises);
      this.tags.delete(tag);
    }
  }

  async invalidateTags(tags: string[]): Promise<void> {
    const promises = tags.map(tag => this.invalidateTag(tag));
    await Promise.allSettled(promises);
  }
}

// Response caching for Next.js API routes
export function withResponseCache(
  handler: (req: any, res: any) => Promise<any>,
  cacheManager: CacheManager,
  keyGenerator: (req: any) => string,
  ttl?: number
) {
  return async (req: any, res: any) => {
    const cacheKey = keyGenerator(req);

    // Try to get from cache
    const cached = await cacheManager.get(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    // Execute handler
    const result = await handler(req, res);

    // Cache the result if it's successful
    if (res.statusCode === 200) {
      await cacheManager.set(cacheKey, result, ttl);
    }

    return result;
  };
}

// Cache monitoring and statistics
export function getCacheStats() {
  return {
    short: caches.short?.getStats(),
    medium: caches.medium?.getStats(),
    long: caches.long?.getStats(),
    session: caches.session?.getStats(),
  };
}

// Periodic cache cleanup
export function startCacheCleanup(intervalMs: number = 300000) {
  // 5 minutes
  setInterval(() => {
    try {
      // Get stats and log cache usage
      const stats = getCacheStats();
      console.log('Cache stats:', stats);

      // Optional: Implement custom cleanup logic
      Object.values(caches).forEach(cache => {
        const stats = cache?.getStats();
        // If hit rate is low, consider clearing some entries
        if (
          stats &&
          stats.hits > 0 &&
          stats.hits / (stats.hits + stats.misses) < 0.1
        ) {
          console.log(
            'Low cache hit rate detected, consider reviewing cache strategy'
          );
        }
      });
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }, intervalMs);
}

// Note: startCacheCleanup()은 서버리스 환경(Vercel)에서 setInterval이
// 인스턴스 간 공유되지 않아 실효성이 없으므로 자동 실행하지 않음.
// node-cache의 자체 TTL 만료가 캐시 정리를 담당합니다.
