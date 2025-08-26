/**
 * Rate Limiting 미들웨어 - API 엔드포인트 보호
 * Redis 기반 고성능 rate limiting with fallback to memory
 */
import { NextRequest } from 'next/server';
// import { env } from '@/lib/env';

// Rate limit configuration per endpoint type
export const rateLimitConfig = {
  // API endpoints
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
    message: 'API 요청 한도를 초과했습니다. 15분 후 다시 시도해주세요.',
    skipSuccessfulRequests: false,
  },
  
  // Form submissions (more restrictive)
  form: {
    windowMs: 5 * 60 * 1000, // 5 minutes  
    max: 5, // requests per window
    message: '폼 제출 한도를 초과했습니다. 5분 후 다시 시도해주세요.',
    skipSuccessfulRequests: true,
  },
  
  // Authentication endpoints (very restrictive)
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // requests per window
    message: '인증 요청 한도를 초과했습니다. 15분 후 다시 시도해주세요.',
    skipSuccessfulRequests: false,
  },
  
  // Financial data endpoints
  financial: {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // requests per window
    message: '금융 데이터 요청 한도를 초과했습니다. 1분 후 다시 시도해주세요.',
    skipSuccessfulRequests: false,
  },
  
  // Admin endpoints (most restrictive)
  admin: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // requests per window
    message: '관리자 요청 한도를 초과했습니다. 1시간 후 다시 시도해주세요.',
    skipSuccessfulRequests: false,
  },
} as const;

export type RateLimitType = keyof typeof rateLimitConfig;

// In-memory store for fallback (when Redis is not available)
const memoryStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries from memory store
const cleanupMemoryStore = () => {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (now > value.resetTime) {
      memoryStore.delete(key);
    }
  }
};

// Clean up every 5 minutes
setInterval(cleanupMemoryStore, 5 * 60 * 1000);

/**
 * Get client identifier from request
 */
function getClientId(request: NextRequest): string {
  // Priority order: user ID > IP address > User-Agent hash
  const userId = request.headers.get('x-user-id');
  if (userId) {
    return `user:${userId}`;
  }
  
  // Get real IP address (considering proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  // Fallback to User-Agent hash for localhost development
  if (ip === 'unknown' || ip === '127.0.0.1' || ip === '::1') {
    const userAgent = request.headers.get('user-agent') || 'unknown';
    return `ua:${Buffer.from(userAgent).toString('base64').slice(0, 10)}`;
  }
  
  return `ip:${ip}`;
}

/**
 * Redis-based rate limiting (if available)
 */
async function checkRateLimitRedis(
  _key: string,
  _config: typeof rateLimitConfig[RateLimitType]
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
} | null> {
  try {
    // Redis implementation would go here
    // For now, return null to fallback to memory store
    return null;
  } catch (error) {
    console.warn('Redis rate limit check failed, falling back to memory store:', error);
    return null;
  }
}

/**
 * Memory-based rate limiting (fallback)
 */
function checkRateLimitMemory(
  key: string,
  config: typeof rateLimitConfig[RateLimitType]
): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
} {
  const now = Date.now();
  
  // Get or create entry
  let entry = memoryStore.get(key);
  
  // Reset if window expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
    memoryStore.set(key, entry);
  }
  
  // Check if limit exceeded
  if (entry.count >= config.max) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return {
      success: false,
      limit: config.max,
      remaining: 0,
      reset: entry.resetTime,
      retryAfter,
    };
  }
  
  // Increment counter
  entry.count++;
  
  return {
    success: true,
    limit: config.max,
    remaining: Math.max(0, config.max - entry.count),
    reset: entry.resetTime,
  };
}

/**
 * Check rate limit for a request
 */
export async function checkRateLimit(
  request: NextRequest,
  type: RateLimitType = 'api'
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}> {
  const config = rateLimitConfig[type];
  const clientId = getClientId(request);
  const key = `ratelimit:${type}:${clientId}`;
  
  // Try Redis first, fallback to memory
  const redisResult = await checkRateLimitRedis(key, config);
  if (redisResult) {
    return redisResult;
  }
  
  return checkRateLimitMemory(key, config);
}

/**
 * Rate limit response headers
 */
export function getRateLimitHeaders(result: {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}) {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
  
  if (result.retryAfter) {
    headers['Retry-After'] = result.retryAfter.toString();
  }
  
  return headers;
}

/**
 * Rate limit error response
 */
export function createRateLimitResponse(
  type: RateLimitType,
  result: {
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number;
  }
) {
  const config = rateLimitConfig[type];
  const headers = getRateLimitHeaders(result);
  
  return new Response(
    JSON.stringify({
      error: 'RATE_LIMIT_EXCEEDED',
      message: config.message,
      retryAfter: result.retryAfter,
      limit: result.limit,
      reset: new Date(result.reset).toISOString(),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
  );
}

/**
 * Rate limiting middleware wrapper for API routes
 */
export function withRateLimit(
  handler: (request: NextRequest, context: any) => Promise<Response> | Response,
  type: RateLimitType = 'api'
) {
  return async (request: NextRequest, context: any) => {
    // Skip rate limiting in development (optional)
    if (process.env.NODE_ENV === 'development' && process.env.SKIP_RATE_LIMIT === 'true') {
      return handler(request, context);
    }
    
    try {
      // Check rate limit
      const rateLimitResult = await checkRateLimit(request, type);
      
      // If rate limit exceeded, return 429 response
      if (!rateLimitResult.success) {
        return createRateLimitResponse(type, rateLimitResult);
      }
      
      // Execute the actual handler
      const response = await handler(request, context);
      
      // Add rate limit headers to successful responses
      const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      return response;
      
    } catch (error) {
      console.error('Rate limiting error:', error);
      // If rate limiting fails, allow the request to proceed
      return handler(request, context);
    }
  };
}

/**
 * Endpoint type detection from URL path
 */
export function detectRateLimitType(pathname: string): RateLimitType {
  if (pathname.startsWith('/api/admin/')) {
    return 'admin';
  }
  
  if (pathname.startsWith('/api/webhooks/') || pathname.includes('auth')) {
    return 'auth';
  }
  
  if (pathname.startsWith('/api/financial/') || pathname.includes('stocks') || pathname.includes('forex')) {
    return 'financial';
  }
  
  if (pathname.includes('contact') || pathname.includes('consultation') || pathname.includes('newsletter')) {
    return 'form';
  }
  
  return 'api';
}

/**
 * Global rate limiter for middleware
 */
export async function globalRateLimit(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip rate limiting for static assets
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.includes('.')) {
    return null;
  }
  
  // Only apply to API routes
  if (!pathname.startsWith('/api/')) {
    return null;
  }
  
  const type = detectRateLimitType(pathname);
  const rateLimitResult = await checkRateLimit(request, type);
  
  if (!rateLimitResult.success) {
    return createRateLimitResponse(type, rateLimitResult);
  }
  
  return getRateLimitHeaders(rateLimitResult);
}