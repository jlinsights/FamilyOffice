/**
 * CSRF Origin guard helpers — used by middleware.ts state-changing request gate.
 *
 * Separated from middleware.ts so unit tests can import without pulling in
 * Clerk's ESM-only modules. See docs/02-design/features/familyoffice-csrf-hardening.design.md.
 */
import type { NextRequest } from 'next/server';
import { ALLOWED_ORIGINS } from '@/lib/config';

export const STATE_CHANGING_METHODS = new Set([
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
]);

/**
 * Paths exempt from CSRF Origin verification.
 * Webhooks rely on HMAC/svix signatures; cron uses Bearer CRON_SECRET.
 */
const CSRF_EXEMPT_PREFIXES = [
  '/api/webhooks',
  '/api/payments/webhook',
  '/api/cron',
];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export function isCsrfExemptRoute(request: NextRequest): boolean {
  const path = request.nextUrl.pathname;
  return CSRF_EXEMPT_PREFIXES.some(
    prefix => path === prefix || path.startsWith(`${prefix}/`)
  );
}
