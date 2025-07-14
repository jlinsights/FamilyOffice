// Advanced caching strategies for Next.js
import { unstable_cache } from 'next/cache'
import { revalidateTag, revalidatePath } from 'next/cache'

// Cache duration constants
export const CACHE_DURATIONS = {
  VERY_SHORT: 60, // 1분
  SHORT: 300, // 5분
  MEDIUM: 900, // 15분
  LONG: 3600, // 1시간
  VERY_LONG: 86400, // 24시간
  WEEK: 604800, // 1주일
} as const

// Cache tags for selective revalidation
export const CACHE_TAGS = {
  FINANCIAL: 'financial-data',
  USER: 'user-data',
  CONSULTATION: 'consultation',
  ANALYTICS: 'analytics',
  STATIC_CONTENT: 'static-content',
} as const

// Memory cache for client-side caching
class MemoryCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private maxSize = 100

  set(key: string, data: any, ttl: number = CACHE_DURATIONS.SHORT * 1000) {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get(key: string): any | null {
    const entry = this.cache.get(key)
    
    if (!entry) return null
    
    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }

  delete(key: string) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

// Singleton memory cache instance
export const memoryCache = new MemoryCache()

// Server-side caching wrapper with tags
export const createCachedFunction = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: {
    keyPrefix: string
    ttl?: number
    tags?: string[]
    revalidateOnError?: boolean
  }
) => {
  return unstable_cache(
    async (...args: T): Promise<R> => {
      try {
        return await fn(...args)
      } catch (error) {
        if (options.revalidateOnError) {
          // Revalidate cache on error
          options.tags?.forEach(tag => revalidateTag(tag))
        }
        throw error
      }
    },
    [options.keyPrefix],
    {
      revalidate: options.ttl || CACHE_DURATIONS.MEDIUM,
      tags: options.tags || [],
    }
  )
}

// Client-side caching wrapper
export const createClientCache = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: {
    keyPrefix: string
    ttl?: number
    enableMemoryCache?: boolean
  }
) => {
  return async (...args: T): Promise<R> => {
    const cacheKey = `${options.keyPrefix}:${JSON.stringify(args)}`
    
    // Try memory cache first (client-side only)
    if (options.enableMemoryCache && typeof window !== 'undefined') {
      const cachedResult = memoryCache.get(cacheKey)
      if (cachedResult !== null) {
        return cachedResult
      }
    }

    try {
      const result = await fn(...args)
      
      // Store in memory cache
      if (options.enableMemoryCache && typeof window !== 'undefined') {
        memoryCache.set(
          cacheKey, 
          result, 
          (options.ttl || CACHE_DURATIONS.SHORT) * 1000
        )
      }
      
      return result
    } catch (error) {
      // If we have cached data, return it on error
      if (options.enableMemoryCache && typeof window !== 'undefined') {
        const cachedResult = memoryCache.get(cacheKey)
        if (cachedResult !== null) {
          console.warn('Returning cached data due to error:', error)
          return cachedResult
        }
      }
      throw error
    }
  }
}

// Stale-while-revalidate pattern
export const createSWRCache = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: {
    keyPrefix: string
    staleTime: number
    maxAge: number
  }
) => {
  const cache = new Map<string, { 
    data: R
    timestamp: number
    promise?: Promise<R>
  }>()

  return async (...args: T): Promise<R> => {
    const cacheKey = `${options.keyPrefix}:${JSON.stringify(args)}`
    const now = Date.now()
    const entry = cache.get(cacheKey)

    // If no cache or expired, fetch new data
    if (!entry || now - entry.timestamp > options.maxAge) {
      const promise = fn(...args)
      cache.set(cacheKey, { 
        data: entry?.data as R, 
        timestamp: now, 
        promise 
      })
      return promise
    }

    // If stale, trigger background refresh
    if (now - entry.timestamp > options.staleTime && !entry.promise) {
      const promise = fn(...args).then(newData => {
        cache.set(cacheKey, { 
          data: newData, 
          timestamp: Date.now()
        })
        return newData
      })
      
      cache.set(cacheKey, { 
        ...entry, 
        promise 
      })
    }

    return entry.data
  }
}

// Preload critical resources
export const preloadCriticalData = async () => {
  if (typeof window === 'undefined') return

  try {
    // Preload critical API endpoints
    const criticalEndpoints = [
      '/api/financial/status',
      '/api/user/profile',
    ]

    const preloadPromises = criticalEndpoints.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint)
        if (response.ok) {
          const data = await response.json()
          memoryCache.set(endpoint, data, CACHE_DURATIONS.SHORT * 1000)
        }
      } catch (error) {
        console.warn(`Failed to preload ${endpoint}:`, error)
      }
    })

    await Promise.allSettled(preloadPromises)
  } catch (error) {
    console.warn('Failed to preload critical data:', error)
  }
}

// Cache invalidation utilities
export const invalidateCache = {
  financial: () => revalidateTag(CACHE_TAGS.FINANCIAL),
  user: () => revalidateTag(CACHE_TAGS.USER),
  consultation: () => revalidateTag(CACHE_TAGS.CONSULTATION),
  analytics: () => revalidateTag(CACHE_TAGS.ANALYTICS),
  staticContent: () => revalidateTag(CACHE_TAGS.STATIC_CONTENT),
  page: (path: string) => revalidatePath(path),
  all: () => {
    Object.values(CACHE_TAGS).forEach(tag => revalidateTag(tag))
    memoryCache.clear()
  }
}

// Background cache warming
export const warmCache = async (endpoints: string[]) => {
  if (typeof window === 'undefined') return

  const warmPromises = endpoints.map(async (endpoint) => {
    try {
      const response = await fetch(endpoint)
      if (response.ok) {
        const data = await response.json()
        memoryCache.set(endpoint, data, CACHE_DURATIONS.LONG * 1000)
      }
    } catch (error) {
      console.warn(`Failed to warm cache for ${endpoint}:`, error)
    }
  })

  await Promise.allSettled(warmPromises)
}

// ISR (Incremental Static Regeneration) helpers
export const createISRFunction = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  revalidateSeconds: number = CACHE_DURATIONS.MEDIUM
) => {
  return {
    fn,
    revalidate: revalidateSeconds,
  }
}

// Cache metrics and monitoring
export const getCacheMetrics = () => {
  return {
    memoryCache: {
      size: memoryCache.size(),
      maxSize: 100,
    },
    hitRate: 0, // TODO: Implement hit rate tracking
    missRate: 0, // TODO: Implement miss rate tracking
  }
}

// Auto-cleanup for memory cache
if (typeof window !== 'undefined') {
  // Clean up memory cache every 10 minutes
  setInterval(() => {
    const now = Date.now()
    const cacheEntries = (memoryCache as any).cache.entries()
    
    for (const [key, entry] of cacheEntries) {
      if (now - entry.timestamp > entry.ttl) {
        memoryCache.delete(key)
      }
    }
  }, 10 * 60 * 1000) // 10 minutes
}