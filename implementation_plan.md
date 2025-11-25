# Implementation Plan - Security & Refactoring

## Goal

Address critical security vulnerabilities, improve code quality, and fix configuration issues identified in the code review.

## User Review Required

> [!IMPORTANT]
> **Upstash Redis Credentials**: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are required for Rate Limiting.
> **New Environment Variables**: You will need to add `ADMIN_EMAILS`, `NEXT_PUBLIC_GTM_ID`, and `NEXT_PUBLIC_GA_ID` to your Vercel project settings.

## Proposed Changes

### 1. Security Fixes (Priority: High)

#### [MODIFY] [middleware.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/middleware.ts)

- Update `config.matcher` to explicitly include `/api/:path*`.
- Replace hardcoded admin email with `process.env.ADMIN_EMAILS`.

#### [MODIFY] [lib/rate-limit.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/rate-limit.ts)

- Implement Redis-based rate limiting using `@upstash/redis`.
- Add fallback logic for when Redis is unavailable.

#### [MODIFY] [lib/security/security-monitor.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/security/security-monitor.ts)

- Replace hardcoded admin email with `process.env.ADMIN_EMAILS`.

### 2. Refactoring & Cleanup (Priority: Medium)

#### [DELETE] [components/client-app.tsx](file:///Users/jaehong/Developer/Projects/FamilyOffice/components/client-app.tsx)

- Remove this unused file.

#### [MODIFY] [app/page.tsx](file:///Users/jaehong/Developer/Projects/FamilyOffice/app/page.tsx)

- Remove large blocks of commented-out code (AI Consulting, Test Button).

#### [MODIFY] [app/layout.tsx](file:///Users/jaehong/Developer/Projects/FamilyOffice/app/layout.tsx)

- Remove the hacky Vercel Toolbar removal script (`document.querySelectorAll...`).
- We will rely on `NEXT_PUBLIC_VERCEL_TOOLBAR=false` in `.env` (or Vercel Dashboard) to disable it properly.

### 3. Environment Variables

#### [MODIFY] [.env.example](file:///Users/jaehong/Developer/Projects/FamilyOffice/.env.example)

- Add `ADMIN_EMAILS`.
- Add `NEXT_PUBLIC_GTM_ID`.
- Add `NEXT_PUBLIC_GA_ID`.
- Add `NEXT_PUBLIC_VERCEL_TOOLBAR=false`.

## Verification Plan

### Automated Tests

- Run `npm run build` to ensure no build errors after deletions.
- Run `npm run lint` to check for any lingering unused imports.

### Manual Verification

1.  **Security**: Verify API routes return 403/429 as expected.
2.  **Cleanup**: Verify the homepage loads correctly without the deleted component.
3.  **Toolbar**: Verify the Vercel Toolbar is gone (after setting the env var).
