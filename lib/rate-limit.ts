import { NextRequest, NextResponse } from 'next/server';

// SSR 안전성을 위한 dynamic imports
let NodeCache: any = null;

// In-memory cache for rate limiting (use Redis in production)
let cache: any = null;

// SSR 안전성을 위한 dynamic imports
let Ratelimit: any = null;
let Redis: any = null;

// SSR 안전성을 위한 dynamic imports
let authenticator: any = null;
let QRCode: any = null;

// SSR 안전한 캐시 초기화
const initializeCache = async () => {
  if (typeof window === 'undefined' && !cache) {
    try {
      // Server-side에서만 NodeCache 사용
      const NodeCacheModule = await import('node-cache');
      NodeCache = NodeCacheModule.default || NodeCacheModule;
      cache = new NodeCache({
        stdTTL: 60, // 1 minute default TTL
        checkperiod: 120, // cleanup every 2 minutes
      });
    } catch (error) {
      console.error('NodeCache 초기화 실패:', error);
      // Fallback to simple Map-based cache
      cache = new Map();
    }
  }
};

// SSR 안전한 Upstash 초기화
export const initializeUpstash = async () => {
  if (typeof window === 'undefined' && !Ratelimit && !Redis) {
    try {
      const upstashRedisModule = await import('@upstash/redis');
      const upstashRatelimitModule = await import('@upstash/ratelimit');

      Redis = upstashRedisModule.Redis;
      Ratelimit = upstashRatelimitModule.Ratelimit;
    } catch (error) {
      console.error('Upstash 초기화 실패:', error);
      Redis = null;
      Ratelimit = null;
    }
  }
};

// SSR 안전한 MFA 패키지 초기화
export const initializeMFAPackages = async () => {
  if (typeof window === 'undefined' && !authenticator && !QRCode) {
    try {
      const otplibModule = await import('otplib');
      const qrcodeModule = await import('qrcode');

      authenticator = otplibModule.authenticator || otplibModule.default;
      QRCode = qrcodeModule.default || qrcodeModule;
    } catch (error) {
      console.error('MFA 패키지 초기화 실패:', error);
      authenticator = null;
      QRCode = null;
    }
  }
};

// 초기화는 함수 호출 시 lazy loading

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: NextRequest) => string;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: Date;
  total: number;
}

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async check(req: NextRequest): Promise<RateLimitResult> {
    // 캐시 초기화 확인
    if (!cache) {
      await initializeCache();
    }

    const key = this.config.keyGenerator
      ? this.config.keyGenerator(req)
      : this.getDefaultKey(req);
    const now = Date.now();
    const windowStart =
      Math.floor(now / this.config.windowMs) * this.config.windowMs;

    const cacheKey = `${key}:${windowStart}`;
    const current = (cache?.get(cacheKey) as number) || 0;

    const remaining = Math.max(0, this.config.maxRequests - current - 1);
    const reset = new Date(windowStart + this.config.windowMs);

    if (current >= this.config.maxRequests) {
      return {
        success: false,
        remaining: 0,
        reset,
        total: this.config.maxRequests,
      };
    }

    // Increment counter
    cache?.set(cacheKey, current + 1, Math.ceil(this.config.windowMs / 1000));

    return {
      success: true,
      remaining,
      reset,
      total: this.config.maxRequests,
    };
  }

  private getDefaultKey(req: NextRequest): string {
    // Get IP address
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Include user agent for additional fingerprinting
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const userAgentHash = this.simpleHash(userAgent);

    return `${ip}:${userAgentHash}`;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }
}

// Predefined rate limiters
export const rateLimiters = {
  // General API rate limit
  general:
    Ratelimit && Redis
      ? new Ratelimit({
          redis: new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
          }),
          limiter: Ratelimit.slidingWindow(100, '1 m'),
          analytics: true,
          prefix: 'ratelimit:general',
        })
      : null,

  // Contact form rate limit
  contact: new RateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 contact form submissions per hour
  }),

  // Admin API rate limit
  admin: new RateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 50, // 50 requests per 5 minutes
  }),

  // Authentication rate limit
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 login attempts per 15 minutes
  }),

  // Webhook rate limit
  webhook: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 webhook calls per minute
  }),
};

// Middleware function to apply rate limiting
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  limiter?: RateLimiter | null
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Skip rate limiting if no limiter provided
    if (!limiter) {
      return handler(req);
    }

    const result = await limiter.check(req);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: result.reset.getTime() - Date.now(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': result.total.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.getTime().toString(),
            'Retry-After': Math.ceil(
              (result.reset.getTime() - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const response = await handler(req);

    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', result.total.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set(
      'X-RateLimit-Reset',
      result.reset.getTime().toString()
    );

    return response;
  };
}

// Helper function for manual rate limit checking
export async function checkRateLimit(
  req: NextRequest,
  limiter: RateLimiter = rateLimiters.general
): Promise<RateLimitResult> {
  return await limiter.check(req);
}

// IP-based rate limiter for extra security
export class IPRateLimiter {
  private suspiciousIPs = new Set<string>();
  private blockedIPs = new Set<string>();

  constructor() {
    // Clean up suspicious IPs every hour
    setInterval(
      () => {
        this.suspiciousIPs.clear();
      },
      60 * 60 * 1000
    );
  }

  getIP(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    return forwarded ? forwarded.split(',')[0] : 'unknown';
  }

  isBlocked(ip: string): boolean {
    return this.blockedIPs.has(ip);
  }

  markSuspicious(ip: string): void {
    this.suspiciousIPs.add(ip);

    // Block IP if it's been marked suspicious multiple times
    if (this.suspiciousIPs.size > 5) {
      this.blockedIPs.add(ip);
    }
  }

  blockIP(ip: string): void {
    this.blockedIPs.add(ip);
  }

  unblockIP(ip: string): void {
    this.blockedIPs.delete(ip);
    this.suspiciousIPs.delete(ip);
  }
}

export const ipRateLimiter = new IPRateLimiter();
