// Advanced rate limiting with Redis and memory fallback
import { NextRequest } from 'next/server'

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyGenerator?: (req: NextRequest) => string
  onLimitReached?: (req: NextRequest) => void
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  total: number
}

class MemoryStore {
  private store = new Map<string, { count: number; resetTime: number }>()

  async get(key: string): Promise<{ count: number; resetTime: number } | null> {
    const data = this.store.get(key)
    if (!data) return null
    
    // Clean up expired entries
    if (Date.now() > data.resetTime) {
      this.store.delete(key)
      return null
    }
    
    return data
  }

  async set(key: string, value: { count: number; resetTime: number }): Promise<void> {
    this.store.set(key, value)
  }

  async increment(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
    const now = Date.now()
    const existing = await this.get(key)
    
    if (!existing) {
      const newData = { count: 1, resetTime: now + windowMs }
      await this.set(key, newData)
      return newData
    }
    
    existing.count++
    await this.set(key, existing)
    return existing
  }

  // Cleanup expired entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, data] of this.store.entries()) {
      if (now > data.resetTime) {
        this.store.delete(key)
      }
    }
  }
}

class RedisStore {
  private redisClient: any = null

  constructor() {
    // Initialize Redis client if available
    if (process.env.REDIS_URL) {
      try {
        // Dynamic import to avoid issues in environments without Redis
        import('ioredis').then((Redis) => {
          this.redisClient = new Redis.default(process.env.REDIS_URL!)
        }).catch((error) => {
          console.warn('Redis not available, falling back to memory store:', error)
        })
      } catch (error) {
        console.warn('Redis initialization failed:', error)
      }
    }
  }

  async get(key: string): Promise<{ count: number; resetTime: number } | null> {
    if (!this.redisClient) return null
    
    try {
      const result = await this.redisClient.hmget(key, 'count', 'resetTime')
      if (!result[0] || !result[1]) return null
      
      return {
        count: parseInt(result[0]),
        resetTime: parseInt(result[1])
      }
    } catch (error) {
      console.error('Redis get error:', error)
      return null
    }
  }

  async set(key: string, value: { count: number; resetTime: number }, ttlMs: number): Promise<void> {
    if (!this.redisClient) return
    
    try {
      await this.redisClient.multi()
        .hmset(key, 'count', value.count, 'resetTime', value.resetTime)
        .pexpire(key, ttlMs)
        .exec()
    } catch (error) {
      console.error('Redis set error:', error)
    }
  }

  async increment(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
    if (!this.redisClient) {
      throw new Error('Redis client not available')
    }

    try {
      const now = Date.now()
      const resetTime = now + windowMs
      
      // Use Redis pipeline for atomic operations
      const results = await this.redisClient.multi()
        .hincrby(key, 'count', 1)
        .hsetnx(key, 'resetTime', resetTime)
        .pexpire(key, windowMs)
        .exec()

      const count = results[0][1]
      const existing = await this.get(key)
      
      return {
        count,
        resetTime: existing?.resetTime || resetTime
      }
    } catch (error) {
      console.error('Redis increment error:', error)
      throw error
    }
  }
}

export class RateLimiter {
  private memoryStore = new MemoryStore()
  private redisStore = new RedisStore()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
    
    // Setup cleanup interval for memory store
    setInterval(() => {
      this.memoryStore.cleanup()
    }, 60000) // Cleanup every minute
  }

  private getClientId(req: NextRequest): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(req)
    }

    // Try to get real IP from various headers
    const forwarded = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const cfConnectingIp = req.headers.get('cf-connecting-ip')
    
    const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'
    
    // Create composite key for more accuracy
    return `ratelimit:${ip}:${Buffer.from(userAgent).toString('base64').slice(0, 10)}`
  }

  async checkLimit(req: NextRequest): Promise<RateLimitResult> {
    const key = this.getClientId(req)
    const { windowMs, maxRequests } = this.config

    try {
      // Try Redis first, fallback to memory
      let data: { count: number; resetTime: number }
      
      try {
        data = await this.redisStore.increment(key, windowMs)
      } catch (error) {
        console.warn('Redis rate limit failed, using memory store:', error)
        data = await this.memoryStore.increment(key, windowMs)
      }

      const allowed = data.count <= maxRequests
      const remaining = Math.max(0, maxRequests - data.count)

      if (!allowed && this.config.onLimitReached) {
        this.config.onLimitReached(req)
      }

      return {
        allowed,
        remaining,
        resetTime: data.resetTime,
        total: maxRequests
      }
    } catch (error) {
      console.error('Rate limit check failed:', error)
      // In case of error, allow the request but log it
      return {
        allowed: true,
        remaining: maxRequests,
        resetTime: Date.now() + windowMs,
        total: maxRequests
      }
    }
  }

  // Create middleware function
  createMiddleware() {
    return async (req: NextRequest): Promise<Response | null> => {
      const result = await this.checkLimit(req)
      
      if (!result.allowed) {
        return new Response(
          JSON.stringify({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': result.total.toString(),
              'X-RateLimit-Remaining': result.remaining.toString(),
              'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
              'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
            }
          }
        )
      }

      return null // Allow request to continue
    }
  }
}

// Predefined rate limiters for different endpoints
export const rateLimiters = {
  // API endpoints - strict limit
  api: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
    keyGenerator: (req) => {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
      const path = new URL(req.url).pathname
      return `api:${ip}:${path}`
    }
  }),

  // Authentication - very strict
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    keyGenerator: (req) => {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
      return `auth:${ip}`
    },
    onLimitReached: (req) => {
      console.warn(`Authentication rate limit exceeded for IP: ${req.headers.get('x-forwarded-for')}`)
    }
  }),

  // Contact forms - moderate limit
  contact: new RateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 submissions per hour
    keyGenerator: (req) => {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
      return `contact:${ip}`
    }
  }),

  // Financial data - generous limit for legitimate use
  financial: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    keyGenerator: (req) => {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
      return `financial:${ip}`
    }
  }),

  // General pages - very generous
  pages: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200, // 200 requests per minute
    keyGenerator: (req) => {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
      return `pages:${ip}`
    }
  })
}

// Helper function to apply rate limiting to API routes
export const withRateLimit = (
  handler: (req: NextRequest) => Promise<Response>,
  limiter: RateLimiter
) => {
  return async (req: NextRequest): Promise<Response> => {
    const limitResponse = await limiter.createMiddleware()(req)
    
    if (limitResponse) {
      return limitResponse
    }
    
    return handler(req)
  }
}

// CSRF Protection
export class CSRFProtection {
  private static readonly CSRF_HEADER = 'x-csrf-token'
  private static readonly CSRF_COOKIE = 'csrf-token'

  static generateToken(): string {
    return Buffer.from(crypto.randomUUID()).toString('base64url')
  }

  static validateToken(req: NextRequest, expectedToken?: string): boolean {
    // Skip for GET, HEAD, OPTIONS
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return true
    }

    const headerToken = req.headers.get(this.CSRF_HEADER)
    const cookieToken = expectedToken || req.cookies.get(this.CSRF_COOKIE)?.value

    if (!headerToken || !cookieToken) {
      return false
    }

    return headerToken === cookieToken
  }

  static createMiddleware() {
    return (req: NextRequest): Response | null => {
      if (!this.validateToken(req)) {
        return new Response(
          JSON.stringify({
            error: 'CSRF token validation failed',
            message: 'Invalid or missing CSRF token'
          }),
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }

      return null
    }
  }
}

// Security headers middleware
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
}

export const applySecurityHeaders = (response: Response): Response => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}