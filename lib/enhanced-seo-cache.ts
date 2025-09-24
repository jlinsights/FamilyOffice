// Enhanced multi-layer caching for Week 3 AI-powered SEO features
import { isFeatureEnabled } from './feature-flags';
import { performanceMonitor } from './performance-monitor';

interface EnhancedCacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  computationCost: number; // Estimated ms to regenerate
}

interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  totalRequests: number;
}

class EnhancedSEOCache {
  private cache = new Map<string, EnhancedCacheEntry<any>>();
  private stats: CacheStats = { hits: 0, misses: 0, evictions: 0, totalRequests: 0 };
  private readonly maxEntries = 2000; // Increased for AI features
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes
  
  // Priority-based TTL
  private readonly priorityTTL = {
    low: 2 * 60 * 1000,       // 2 minutes
    medium: 10 * 60 * 1000,   // 10 minutes  
    high: 30 * 60 * 1000,     // 30 minutes
    critical: 2 * 60 * 60 * 1000 // 2 hours
  };

  constructor() {
    // Clean up expired entries every 2 minutes for better performance
    if (typeof window === 'undefined') {
      setInterval(() => this.cleanup(), 2 * 60 * 1000);
    }
  }

  // Enhanced get with access tracking
  get<T>(key: string): T | null {
    if (!isFeatureEnabled('enableServerSideCaching')) {
      return null;
    }

    this.stats.totalRequests++;
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if entry is expired
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    // Update access tracking
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;

    return entry.value as T;
  }

  // Enhanced set with priority and cost tracking
  set<T>(
    key: string, 
    value: T, 
    options?: {
      ttl?: number;
      priority?: 'low' | 'medium' | 'high' | 'critical';
      computationCost?: number;
    }
  ): void {
    if (!isFeatureEnabled('enableServerSideCaching')) {
      return;
    }

    // Prevent cache from growing too large
    if (this.cache.size >= this.maxEntries) {
      this.evictLeastValuable();
    }

    const priority = options?.priority || 'medium';
    const ttl = options?.ttl || this.priorityTTL[priority];

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
      lastAccessed: Date.now(),
      priority,
      computationCost: options?.computationCost || 100,
    });
  }

  // Smart eviction based on value (frequency, recency, priority, cost)
  private evictLeastValuable(): void {
    if (this.cache.size === 0) return;

    let leastValuableKey: string | null = null;
    let lowestScore = Infinity;
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      // Calculate value score (higher = more valuable)
      const ageScore = Math.max(0, 1 - (now - entry.lastAccessed) / (24 * 60 * 60 * 1000)); // 0-1 based on recency
      const frequencyScore = Math.min(1, entry.accessCount / 10); // 0-1 based on access count
      const priorityScore = { low: 0.2, medium: 0.5, high: 0.8, critical: 1.0 }[entry.priority];
      const costScore = Math.min(1, entry.computationCost / 1000); // 0-1 based on computation cost
      
      const valueScore = (ageScore * 0.3) + (frequencyScore * 0.3) + (priorityScore * 0.3) + (costScore * 0.1);

      if (valueScore < lowestScore) {
        lowestScore = valueScore;
        leastValuableKey = key;
      }
    }

    if (leastValuableKey) {
      this.cache.delete(leastValuableKey);
      this.stats.evictions++;
    }
  }

  // Get cache statistics
  getStats(): CacheStats & { hitRate: number; size: number } {
    const hitRate = this.stats.totalRequests > 0 
      ? (this.stats.hits / this.stats.totalRequests) * 100 
      : 0;

    return {
      ...this.stats,
      hitRate: Math.round(hitRate * 100) / 100,
      size: this.cache.size,
    };
  }

  // AI-specific caching operations
  async cacheAIOperation<T>(
    key: string,
    operation: () => Promise<T>,
    options?: {
      priority?: 'low' | 'medium' | 'high' | 'critical';
      estimatedCost?: number;
    }
  ): Promise<T> {
    const cacheKey = `ai_${key}`;
    
    return await performanceMonitor.trackAsyncOperation(
      'ai_cache_operation',
      async () => {
        // Check cache first
        const cached = this.get<T>(cacheKey);
        if (cached !== null) {
          return cached;
        }

        // Execute operation with performance tracking
        const startTime = performance.now();
        const result = await operation();
        const actualCost = performance.now() - startTime;

        // Cache with enhanced metadata
        this.set(cacheKey, result, {
          priority: options?.priority || 'high', // AI operations are high priority
          computationCost: actualCost,
          ttl: this.priorityTTL[options?.priority || 'high'],
        });

        return result;
      },
      { operation: 'ai_cache_operation', priority: options?.priority || 'high' }
    );
  }

  // Clear expired entries with performance optimization
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        keysToDelete.push(key);
      }
    }

    // Batch delete for better performance
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // Reset statistics
  resetStats(): void {
    this.stats = { hits: 0, misses: 0, evictions: 0, totalRequests: 0 };
  }

  // Standard cache operations
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.resetStats();
  }

  size(): number {
    return this.cache.size;
  }
}

// Create enhanced singleton instance
export const enhancedSEOCache = new EnhancedSEOCache();

// AI-specific cache operations
export const aiCacheOperations = {
  // Cache AI keyword optimization results
  async optimizeKeywords(
    domain: string,
    keywords: string[],
    operation: () => Promise<any>
  ): Promise<any> {
    const key = `keywords_${domain}_${keywords.join('_')}`;
    return await enhancedSEOCache.cacheAIOperation(
      key,
      operation,
      { priority: 'high', estimatedCost: 500 }
    );
  },

  // Cache AI content optimization results
  async optimizeContent(
    pageName: string,
    content: string,
    operation: () => Promise<any>
  ): Promise<any> {
    const key = `content_${pageName}_${content.substring(0, 50)}`;
    return await enhancedSEOCache.cacheAIOperation(
      key,
      operation,
      { priority: 'medium', estimatedCost: 800 }
    );
  },

  // Cache advanced metadata generation
  async generateAdvancedMetadata(
    domain: string,
    pageName: string,
    context: any,
    operation: () => Promise<any>
  ): Promise<any> {
    const key = `metadata_${domain}_${pageName}_${JSON.stringify(context).substring(0, 100)}`;
    return await enhancedSEOCache.cacheAIOperation(
      key,
      operation,
      { priority: 'critical', estimatedCost: 300 }
    );
  },

  // Get cache performance metrics
  getPerformanceMetrics() {
    return enhancedSEOCache.getStats();
  },

  // Clear AI-specific caches
  clearAICache() {
    // Clear only AI-related entries
    const allKeys = Array.from((enhancedSEOCache as any).cache.keys());
    allKeys
      .filter((key): key is string => typeof key === 'string' && key.startsWith('ai_'))
      .forEach(key => enhancedSEOCache.delete(key));
  }
};

// Backward compatibility with existing SEO cache
export const seoCache = enhancedSEOCache;