// 간단한 메모리 캐시 fallback
class SimpleMemoryCache {
  private cache = new Map<string, { value: any; expiry: number }>();

  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item || Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    return item.value;
  }

  set(key: string, value: any, ttlSeconds: number = 300) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  del(key: string) {
    this.cache.delete(key);
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  flushAll() {
    this.cache.clear();
  }

  getStats() {
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
export class CacheManager {
  private cache: any;
  private prefix: string;

  constructor(cache: any, prefix?: string) {
    this.cache = cache;
    this.prefix = prefix || '';
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
      return this.cache.set(this.getKey(key), value, ttl);
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<number> {
    try {
      return this.cache.del(this.getKey(key));
    } catch (error) {
      console.error('Cache del error:', error);
      return 0;
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      return this.cache.has(this.getKey(key));
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
        this.cache.del(prefixedKeys);
      } else {
        this.cache.flushAll();
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  async mget<T>(keys: string[]): Promise<Record<string, T | undefined>> {
    try {
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
      const mappedPairs = pairs.map(({ key, value, ttl }) => ({
        key: this.getKey(key),
        val: value,
        ttl,
      }));

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

// Initialize cache monitoring in production
if (process.env.NODE_ENV === 'production') {
  startCacheCleanup();
}
