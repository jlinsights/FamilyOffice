# Implementation Plan - Code Review Improvements

## Goal

Implement the critical and high-priority improvements identified in the code review to enhance security, maintainability, and code quality.

## User Review Required

> [!IMPORTANT]
> **Environment Variables**: I will be adding references to new environment variables (e.g., `SUPER_ADMIN_EMAILS`). You will need to add these to your local `.env` file and deployment environment variables.
>
> **File Moves**: I will be reorganizing the `lib` directory. This involves moving many files and updating imports. This might cause temporary build errors if not all imports are caught, but I will do my best to search and replace all occurrences.

## Proposed Changes

### 1. Security Hardening

#### [MODIFY] [middleware.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/middleware.ts)

- Replace hardcoded `SUPER_ADMIN_EMAILS` with `process.env.SUPER_ADMIN_EMAILS`.

#### [MODIFY] [app/layout.tsx](file:///Users/jaehong/Developer/Projects/FamilyOffice/app/layout.tsx)

- Replace hardcoded verification codes with environment variables where appropriate.

### 2. Refactor `lib/seo.ts`

#### [NEW] `lib/seo/` Directory

- Create a new directory to house split SEO logic.

#### [NEW] [lib/seo/types.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/seo/types.ts)

- Define TypeScript interfaces for SEO data.

#### [NEW] [lib/seo/keywords.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/seo/keywords.ts)

- Move keyword constants (BMAD method lists) here.

#### [NEW] [lib/seo/metadata.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/seo/metadata.ts)

- Move `generateMetadata` and default metadata configuration here.

#### [NEW] [lib/seo/structured-data.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/seo/structured-data.ts)

- Move `generateStructuredData` and related functions here.

#### [DELETE] [lib/seo.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/seo.ts)

- Remove the original monolithic file after verifying all code is migrated and imports updated.

### 3. Reorganize `lib` Directory

#### [NEW] `lib/utils/` Directory

- Move `utils.ts` to `lib/utils/index.ts` (or keep as `lib/utils.ts` if we don't want to break too many imports, but moving to a folder is cleaner for future utils). _Decision: Let's keep `lib/utils.ts` for now to minimize friction, or move it to `lib/utils/index.ts` and update imports._
- **Better Approach**: Group other loose files.
  - `lib/api/`: `api-client.ts` (if exists), error handling.
  - `lib/auth/`: `auth-utils.ts`, `user-sync.ts`.
  - `lib/constants/`: `constants.ts`.
  - `lib/security/`: `rate-limit.ts`, `security-monitor.ts` (already in `security` folder?).

_Note: I will perform a search for usages before moving files to ensure I update imports correctly._

### 4. Refactor `app/layout.tsx`

#### [NEW] [components/seo/metadata-head.tsx](file:///Users/jaehong/Developer/Projects/FamilyOffice/components/seo/metadata-head.tsx)

- Extract `<head>` meta tags.

#### [NEW] [components/analytics/analytics-scripts.tsx](file:///Users/jaehong/Developer/Projects/FamilyOffice/components/analytics/analytics-scripts.tsx)

- Extract analytics scripts.

#### [MODIFY] [app/layout.tsx](file:///Users/jaehong/Developer/Projects/FamilyOffice/app/layout.tsx)

- Import and use the new components. Remove inline scripts.

### 5. Type Safety

#### [MODIFY] [lib/utils.ts](file:///Users/jaehong/Developer/Projects/FamilyOffice/lib/utils.ts)

- Fix `any` types in `debounce`, `throttle`, `storage`, `handleApiError`.

## Verification Plan

### Automated Tests

- Run `npm run build` to ensure no import errors or type errors.
- Run `npm run lint` to check for code quality issues.

### Manual Verification

- Check if the application starts (`npm run dev`).
- Verify SEO tags are still present in the `<head>`.
- Verify admin access (if possible/relevant) or at least that the middleware doesn't crash.
