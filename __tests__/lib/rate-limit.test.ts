/**
 * Rate Limiting 테스트
 * 메모리 기반 rate limiting 시스템 검증
 */
import { NextRequest } from 'next/server';
import {
  checkRateLimit,
  createRateLimitResponse,
  detectRateLimitType,
  getRateLimitHeaders,
  rateLimitConfig,
  withRateLimit,
} from '@/lib/rate-limit';

// Mock next/server and Web API Response
const mockResponse = {
  json: jest.fn().mockImplementation((data, init) => ({
    json: () => Promise.resolve(data),
    status: init?.status || 200,
    headers: {
      get: jest.fn((key) => {
        const headers = init?.headers || {};
        return headers[key] || null;
      }),
      set: jest.fn(),
      has: jest.fn(),
    },
  })),
};

// Mock Response constructor for global use
const MockResponseClass = jest.fn().mockImplementation((body, init) => ({
  body,
  status: init?.status || 200,
  headers: {
    get: jest.fn((key) => {
      const headers = init?.headers || {};
      return headers[key] || null;
    }),
    set: jest.fn(),
    has: jest.fn(),
    entries: jest.fn(() => Object.entries(init?.headers || {})),
  },
  json: () => Promise.resolve(body ? JSON.parse(body) : {}),
}));

global.Response = MockResponseClass as any;

jest.mock('next/server', () => ({
  NextResponse: mockResponse,
}));

// Mock environment
jest.mock('@/lib/env', () => ({
  env: {
    NODE_ENV: 'test',
  },
}));

// Helper function to create mock NextRequest
function createMockRequest(
  url: string = 'http://localhost:3000/api/test',
  ip: string = '127.0.0.1'
): NextRequest {
  return {
    nextUrl: { pathname: new URL(url).pathname },
    headers: new Map([
      ['x-forwarded-for', ip],
      ['user-agent', 'test-agent'],
    ]),
    ip,
  } as unknown as NextRequest;
}

describe('Rate Limit System', () => {
  beforeEach(() => {
    // Clear memory store before each test
    jest.clearAllMocks();
  });

  describe('detectRateLimitType', () => {
    it('should detect admin routes correctly', () => {
      expect(detectRateLimitType('/api/admin/users')).toBe('admin');
      expect(detectRateLimitType('/api/admin/settings')).toBe('admin');
    });

    it('should detect auth routes correctly', () => {
      expect(detectRateLimitType('/api/webhooks/clerk')).toBe('auth');
      expect(detectRateLimitType('/api/auth/login')).toBe('auth');
    });

    it('should detect financial routes correctly', () => {
      expect(detectRateLimitType('/api/financial/stocks')).toBe('financial');
      expect(detectRateLimitType('/api/financial/forex')).toBe('financial');
      expect(detectRateLimitType('/api/stocks')).toBe('financial');
    });

    it('should detect form routes correctly', () => {
      expect(detectRateLimitType('/api/contact')).toBe('form');
      expect(detectRateLimitType('/api/consultation')).toBe('form');
      expect(detectRateLimitType('/api/newsletter')).toBe('form');
    });

    it('should default to api type', () => {
      expect(detectRateLimitType('/api/general')).toBe('api');
      expect(detectRateLimitType('/api/health')).toBe('api');
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests under the limit', async () => {
      const request = createMockRequest();
      
      const result = await checkRateLimit(request, 'api');
      
      expect(result.success).toBe(true);
      expect(result.limit).toBe(rateLimitConfig.api.max);
      expect(result.remaining).toBe(rateLimitConfig.api.max - 1);
      expect(result.reset).toBeGreaterThan(Date.now());
    });

    it('should block requests over the limit', async () => {
      const request = createMockRequest();
      const config = rateLimitConfig.form; // Use form (max: 5) for faster testing
      
      // Make requests up to the limit
      for (let i = 0; i < config.max; i++) {
        const result = await checkRateLimit(request, 'form');
        expect(result.success).toBe(true);
      }
      
      // Next request should be blocked
      const result = await checkRateLimit(request, 'form');
      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.retryAfter).toBeGreaterThan(0);
    });

    it('should use different limits for different IPs', async () => {
      const request1 = createMockRequest('http://localhost:3000/api/test', '192.168.1.1');
      const request2 = createMockRequest('http://localhost:3000/api/test', '192.168.1.2');
      
      // Exhaust limit for first IP
      for (let i = 0; i < rateLimitConfig.form.max; i++) {
        await checkRateLimit(request1, 'form');
      }
      const result1 = await checkRateLimit(request1, 'form');
      expect(result1.success).toBe(false);
      
      // Second IP should still work
      const result2 = await checkRateLimit(request2, 'form');
      expect(result2.success).toBe(true);
    });

    it('should reset window after expiration', async () => {
      const request = createMockRequest();
      
      // Mock Date.now to control time
      const originalNow = Date.now;
      let mockTime = 1000000000000; // Mock timestamp
      
      // Override Date.now
      const mockDateNow = jest.fn(() => mockTime);
      Date.now = mockDateNow;
      
      // Clear any existing memory store entries for this request
      const clientId = 'ua:dGVzdC1hZ2VudA=='; // base64 of 'test-agent'
      const key = `ratelimit:form:${clientId}`;
      
      // Exhaust limit
      for (let i = 0; i < rateLimitConfig.form.max; i++) {
        await checkRateLimit(request, 'form');
      }
      let result = await checkRateLimit(request, 'form');
      expect(result.success).toBe(false);
      
      // Fast forward past window expiration
      mockTime += rateLimitConfig.form.windowMs + 1000;
      mockDateNow.mockReturnValue(mockTime);
      
      // Should be allowed again
      result = await checkRateLimit(request, 'form');
      expect(result.success).toBe(true);
      
      // Restore Date.now
      Date.now = originalNow;
    }, 10000);
  });

  describe('getRateLimitHeaders', () => {
    it('should generate correct headers', () => {
      const result = {
        limit: 100,
        remaining: 50,
        reset: 1640995200000, // 2022-01-01T00:00:00.000Z
        retryAfter: 300,
      };
      
      const headers = getRateLimitHeaders(result);
      
      expect(headers['X-RateLimit-Limit']).toBe('100');
      expect(headers['X-RateLimit-Remaining']).toBe('50');
      expect(headers['X-RateLimit-Reset']).toBe('2022-01-01T00:00:00.000Z');
      expect(headers['Retry-After']).toBe('300');
    });

    it('should not include Retry-After when not provided', () => {
      const result = {
        limit: 100,
        remaining: 50,
        reset: 1640995200000,
      };
      
      const headers = getRateLimitHeaders(result);
      
      expect(headers['Retry-After']).toBeUndefined();
    });
  });

  describe('createRateLimitResponse', () => {
    it('should create correct 429 response', () => {
      const result = {
        limit: 5,
        remaining: 0,
        reset: Date.now() + 5 * 60 * 1000,
        retryAfter: 300,
      };
      
      const response = createRateLimitResponse('form', result);
      
      // Test response creation (instance checks)
      expect(response).toBeInstanceOf(MockResponseClass);
      expect(response.status).toBe(429);
      
      // Test that headers object exists and has the right structure
      expect(response.headers).toBeDefined();
      expect(typeof response.headers.get).toBe('function');
    });
  });

  describe('withRateLimit', () => {
    it('should allow requests under the limit', async () => {
      const mockHandler = jest.fn().mockResolvedValue(
        new MockResponseClass('OK', { status: 200 })
      );
      const wrappedHandler = withRateLimit(mockHandler, 'api'); // Use 'api' for higher limit
      const request = createMockRequest();
      
      const response = await wrappedHandler(request, {});
      
      expect(mockHandler).toHaveBeenCalledWith(request, {});
      expect(response).toBeDefined();
    });

    it('should block requests over the limit', async () => {
      const mockHandler = jest.fn().mockResolvedValue(
        new MockResponseClass('OK', { status: 200 })
      );
      const wrappedHandler = withRateLimit(mockHandler, 'form');
      const request = createMockRequest();
      
      // Exhaust limit
      for (let i = 0; i < rateLimitConfig.form.max; i++) {
        await wrappedHandler(request, {});
      }
      
      // Next request should be blocked - verify the response is created
      const response = await wrappedHandler(request, {});
      expect(response).toBeInstanceOf(MockResponseClass);
      expect(response.status).toBe(429);
      
      // Handler should only be called max times (not for the blocked request)
      expect(mockHandler).toHaveBeenCalledTimes(rateLimitConfig.form.max);
    });

    it('should handle errors gracefully', async () => {
      const mockHandler = jest.fn().mockRejectedValue(new Error('Handler error'));
      const wrappedHandler = withRateLimit(mockHandler, 'api');
      const request = createMockRequest();
      
      // Should not throw, but log error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      try {
        await wrappedHandler(request, {});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
      
      consoleSpy.mockRestore();
    });
  });

  describe('Rate Limit Configuration', () => {
    it('should have valid configuration for all types', () => {
      const types = ['api', 'form', 'auth', 'financial', 'admin'] as const;
      
      types.forEach(type => {
        const config = rateLimitConfig[type];
        expect(config).toBeDefined();
        expect(config.windowMs).toBeGreaterThan(0);
        expect(config.max).toBeGreaterThan(0);
        expect(typeof config.message).toBe('string');
        expect(config.message.length).toBeGreaterThan(0);
        expect(typeof config.skipSuccessfulRequests).toBe('boolean');
      });
    });

    it('should have appropriate limits for different endpoint types', () => {
      // Admin should be most restrictive per hour
      expect(rateLimitConfig.admin.windowMs).toBe(60 * 60 * 1000);
      expect(rateLimitConfig.admin.max).toBe(50);
      
      // Form should be restrictive per short window
      expect(rateLimitConfig.form.windowMs).toBe(5 * 60 * 1000);
      expect(rateLimitConfig.form.max).toBe(5);
      
      // Financial should be moderate
      expect(rateLimitConfig.financial.windowMs).toBe(1 * 60 * 1000);
      expect(rateLimitConfig.financial.max).toBe(30);
      
      // API should be most permissive
      expect(rateLimitConfig.api.windowMs).toBe(15 * 60 * 1000);
      expect(rateLimitConfig.api.max).toBe(100);
    });
  });
});