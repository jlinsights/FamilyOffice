// Simple in-memory cache for SEO calculations
import { isFeatureEnabled } from './feature-flags';

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

class SEOCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes
  private readonly maxEntries = 1000;
  
  constructor() {
    // Clean up expired entries every minute
    if (typeof window === 'undefined') { // Server-side only
      setInterval(() => this.cleanup(), 60000);
    }
  }

  // Get cached value
  get<T>(key: string): T | null {
    if (!isFeatureEnabled('enableServerSideCaching')) {
      return null;
    }

    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    // Check if entry is expired
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  // Set cached value
  set<T>(key: string, value: T, ttl?: number): void {
    if (!isFeatureEnabled('enableServerSideCaching')) {
      return;
    }

    // Prevent cache from growing too large
    if (this.cache.size >= this.maxEntries) {
      this.evictOldest();
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    });
  }

  // Check if key exists and is valid
  has(key: string): boolean {
    const value = this.get(key);
    return value !== null;
  }

  // Clear specific key
  delete(key: string): void {
    this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Get cache size
  size(): number {
    return this.cache.size;
  }

  // Clean up expired entries
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Evict oldest entries when cache is full
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
}

// Create singleton instance
export const seoCache = new SEOCache();

// Cache decorator for async functions
export function withSEOCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: {
    ttl?: number;
    keyGenerator?: (...args: Parameters<T>) => string;
  }
): T {
  return (async (...args: Parameters<T>) => {
    // Generate cache key
    const key = options?.keyGenerator 
      ? options.keyGenerator(...args)
      : `${fn.name}_${JSON.stringify(args)}`;

    // Check cache
    const cached = seoCache.get(key);
    if (cached !== null) {
      return cached;
    }

    // Execute function
    const result = await fn(...args);

    // Cache result
    seoCache.set(key, result, options?.ttl);

    return result;
  }) as T;
}

// Specific cache helpers for SEO operations
export const seoOperationCache = {
  // Cache metadata generation
  async getMetadata(key: string, generator: () => Promise<any>) {
    const cached = seoCache.get(`metadata_${key}`);
    if (cached) return cached;

    const result = await generator();
    seoCache.set(`metadata_${key}`, result, 10 * 60 * 1000); // 10 minutes
    return result;
  },

  // Cache keyword optimization
  async getKeywords(key: string, generator: () => Promise<string[]>) {
    const cached = seoCache.get<string[]>(`keywords_${key}`);
    if (cached) return cached;

    const result = await generator();
    seoCache.set(`keywords_${key}`, result, 30 * 60 * 1000); // 30 minutes
    return result;
  },

  // Cache structured data
  async getStructuredData(key: string, generator: () => Promise<any>) {
    const cached = seoCache.get(`structured_${key}`);
    if (cached) return cached;

    const result = await generator();
    seoCache.set(`structured_${key}`, result, 60 * 60 * 1000); // 1 hour
    return result;
  },

  // Clear all SEO caches
  clearAll() {
    seoCache.clear();
  }
};