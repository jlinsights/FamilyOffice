import { NextRequest } from 'next/server';

import {
  RateLimiter,
  rateLimiters,
  withRateLimit,
  IPRateLimiter,
} from '../rate-limit';

// Mock NodeCache
jest.mock('node-cache', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    clear: jest.fn(),
  }));
});

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;
  let mockRequest: NextRequest;

  beforeEach(() => {
    rateLimiter = new RateLimiter({
      windowMs: 60000, // 1 minute
      maxRequests: 10,
    });

    mockRequest = {
      headers: new Headers({
        'x-forwarded-for': '127.0.0.1',
        'user-agent': 'test-agent',
      }),
      ip: '127.0.0.1',
    } as unknown as NextRequest;

    jest.clearAllMocks();
  });

  it('allows requests within rate limit', async () => {
    const result = await rateLimiter.check(mockRequest);

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9);
    expect(result.total).toBe(10);
    expect(result.reset).toBeInstanceOf(Date);
  });

  it('generates consistent keys for same IP', async () => {
    const request1 = { ...mockRequest };
    const request2 = { ...mockRequest };

    await rateLimiter.check(request1 as any);
    const result = await rateLimiter.check(request2 as any);

    expect(result.remaining).toBe(8); // Should be decremented
  });

  it('generates different keys for different IPs', async () => {
    const request1 = {
      ...mockRequest,
      headers: new Headers({
        'x-forwarded-for': '127.0.0.1',
        'user-agent': 'test-agent',
      }),
    } as unknown as NextRequest;

    const request2 = {
      ...mockRequest,
      headers: new Headers({
        'x-forwarded-for': '192.168.1.1',
        'user-agent': 'test-agent',
      }),
    } as unknown as NextRequest;

    await rateLimiter.check(request1 as any);
    const result = await rateLimiter.check(request2 as any);

    expect(result.remaining).toBe(9); // Should not be decremented
  });

  it('handles missing IP gracefully', async () => {
    const requestWithoutIP = {
      headers: new Headers({
        'user-agent': 'test-agent',
      }),
    } as unknown as NextRequest;

    const result = await rateLimiter.check(requestWithoutIP);

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9);
  });

  it('uses custom key generator when provided', async () => {
    const customRateLimiter = new RateLimiter({
      windowMs: 60000,
      maxRequests: 5,
      keyGenerator: () => 'custom-key',
    });

    const result = await customRateLimiter.check(mockRequest);

    expect(result.success).toBe(true);
    expect(result.total).toBe(5);
  });
});

describe('Predefined Rate Limiters', () => {
  it('has general rate limiter', () => {
    expect(rateLimiters.general).toBeInstanceOf(RateLimiter);
  });

  it('has contact rate limiter', () => {
    expect(rateLimiters.contact).toBeInstanceOf(RateLimiter);
  });

  it('has admin rate limiter', () => {
    expect(rateLimiters.admin).toBeInstanceOf(RateLimiter);
  });

  it('has auth rate limiter', () => {
    expect(rateLimiters.auth).toBeInstanceOf(RateLimiter);
  });

  it('has webhook rate limiter', () => {
    expect(rateLimiters.webhook).toBeInstanceOf(RateLimiter);
  });
});

describe('withRateLimit', () => {
  let mockHandler: jest.Mock;
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockHandler = jest.fn().mockResolvedValue(new Response('OK'));
    mockRequest = {
      headers: new Headers({
        'x-forwarded-for': '127.0.0.1',
        'user-agent': 'test-agent',
      }),
      ip: '127.0.0.1',
    } as unknown as NextRequest;
  });

  it('calls handler when rate limit not exceeded', async () => {
    const limitedHandler = withRateLimit(mockHandler);

    await limitedHandler(mockRequest);

    expect(mockHandler).toHaveBeenCalledWith(mockRequest);
  });

  it('adds rate limit headers to response', async () => {
    const limitedHandler = withRateLimit(mockHandler);

    const response = await limitedHandler(mockRequest);

    expect(response.headers.get('X-RateLimit-Limit')).toBeDefined();
    expect(response.headers.get('X-RateLimit-Remaining')).toBeDefined();
    expect(response.headers.get('X-RateLimit-Reset')).toBeDefined();
  });
});

describe('IPRateLimiter', () => {
  let ipRateLimiter: IPRateLimiter;
  let mockRequest: NextRequest;

  beforeEach(() => {
    ipRateLimiter = new IPRateLimiter();
    mockRequest = {
      headers: new Headers({
        'x-forwarded-for': '127.0.0.1',
      }),
      ip: '127.0.0.1',
    } as unknown as NextRequest;
  });

  it('extracts IP from request', () => {
    const ip = ipRateLimiter.getIP(mockRequest);
    expect(ip).toBe('127.0.0.1');
  });

  it('handles missing IP', () => {
    const requestWithoutIP = {
      headers: new Headers(),
    } as unknown as NextRequest;

    const ip = ipRateLimiter.getIP(requestWithoutIP);
    expect(ip).toBe('unknown');
  });

  it('blocks IP after marking as suspicious', () => {
    const ip = '192.168.1.1';

    expect(ipRateLimiter.isBlocked(ip)).toBe(false);

    ipRateLimiter.blockIP(ip);

    expect(ipRateLimiter.isBlocked(ip)).toBe(true);
  });

  it('unblocks IP', () => {
    const ip = '192.168.1.1';

    ipRateLimiter.blockIP(ip);
    expect(ipRateLimiter.isBlocked(ip)).toBe(true);

    ipRateLimiter.unblockIP(ip);
    expect(ipRateLimiter.isBlocked(ip)).toBe(false);
  });

  it('marks IP as suspicious', () => {
    const ip = '192.168.1.1';

    ipRateLimiter.markSuspicious(ip);

    // Should not be blocked yet
    expect(ipRateLimiter.isBlocked(ip)).toBe(false);
  });
});
