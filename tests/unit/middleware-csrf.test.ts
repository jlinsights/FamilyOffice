/**
 * CSRF Origin guard — unit tests for middleware building blocks
 *
 * Validates the two helpers used by the middleware CSRF Origin guard:
 *   - isAllowedOrigin(origin): origin allow-list check
 *   - isCsrfExemptRoute(request): webhook/cron path exemption matcher
 *
 * Design: docs/02-design/features/familyoffice-csrf-hardening.design.md §6
 */
import { describe, it, expect } from '@jest/globals';
import { NextRequest } from 'next/server';
import { isAllowedOrigin, isCsrfExemptRoute } from '@/lib/security/csrf';

function mockRequest(method: string, path: string): NextRequest {
  return new NextRequest(new URL(`http://localhost:3000${path}`), { method });
}

describe('CSRF Origin guard — isAllowedOrigin', () => {
  it('allows whitelisted origin (familyoffices.vip)', () => {
    expect(isAllowedOrigin('https://familyoffices.vip')).toBe(true);
  });

  it('allows whitelisted origin (www subdomain)', () => {
    expect(isAllowedOrigin('https://www.familyoffices.vip')).toBe(true);
  });

  it('blocks unknown origin', () => {
    expect(isAllowedOrigin('https://evil.com')).toBe(false);
  });

  it('blocks null Origin (D6: no Referer fallback, web-only client)', () => {
    expect(isAllowedOrigin(null)).toBe(false);
  });

  it('blocks empty Origin string', () => {
    expect(isAllowedOrigin('')).toBe(false);
  });
});

describe('CSRF exempt matcher — isCsrfExemptRoute', () => {
  it('exempts /api/webhooks/clerk (Clerk webhook svix signature)', () => {
    expect(isCsrfExemptRoute(mockRequest('POST', '/api/webhooks/clerk'))).toBe(
      true
    );
  });

  it('exempts /api/payments/webhook (Toss HMAC signature)', () => {
    expect(
      isCsrfExemptRoute(mockRequest('POST', '/api/payments/webhook'))
    ).toBe(true);
  });

  it('exempts /api/cron/* (Bearer CRON_SECRET)', () => {
    expect(isCsrfExemptRoute(mockRequest('POST', '/api/cron/newsletter'))).toBe(
      true
    );
  });

  it('does NOT exempt /api/payments/shop/* (must pass Origin guard)', () => {
    expect(
      isCsrfExemptRoute(mockRequest('POST', '/api/payments/shop/create-order'))
    ).toBe(false);
  });
});
