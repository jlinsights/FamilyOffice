import { NextRequest } from 'next/server';

import { checkRateLimit, withRateLimit, rateLimitConfig } from '../rate-limit';

// Mock Redis and NodeCache
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    setex: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
    disconnect: jest.fn(),
  }));
});

jest.mock('node-cache', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    clear: jest.fn(),
  }));
});

describe('Rate Limiting System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rateLimitConfig', () => {
    it('should have proper configuration structure', () => {
      expect(rateLimitConfig).toHaveProperty('api');
      expect(rateLimitConfig).toHaveProperty('form');
      expect(rateLimitConfig).toHaveProperty('auth');

      expect(rateLimitConfig.api.max).toBe(100);
      expect(rateLimitConfig.form.max).toBe(5);
      expect(rateLimitConfig.auth.max).toBe(10);
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests under the limit', async () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'user-agent': 'test-agent',
          'x-forwarded-for': '127.0.0.1',
        },
      });

      const result = await checkRateLimit(request, 'api');

      expect(result.success).toBe(true);
      expect(result.remaining).toBeGreaterThan(0);
    });

    it('should handle different rate limit types', async () => {
      const request = new NextRequest('http://localhost:3000/api/test');

      const apiResult = await checkRateLimit(request, 'api');
      const formResult = await checkRateLimit(request, 'form');

      expect(apiResult).toHaveProperty('success');
      expect(formResult).toHaveProperty('success');
    });
  });

  describe('withRateLimit', () => {
    it('should wrap a handler with rate limiting', async () => {
      const mockHandler = jest.fn().mockResolvedValue(new Response('OK'));
      const wrappedHandler = withRateLimit(mockHandler, 'api');

      const request = new NextRequest('http://localhost:3000/api/test');

      await wrappedHandler(request, {});

      expect(mockHandler).toHaveBeenCalledWith(request);
    });
  });
});
