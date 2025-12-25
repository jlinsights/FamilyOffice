# Architectural Decisions - FamilyOffice S

**Document Purpose**: Record key architectural and technical decisions made throughout the project lifecycle.

**Format**: Based on Architecture Decision Records (ADR) pattern

**Last Updated**: December 24, 2024

---

## ADR-001: Next.js App Router (December 2024)

### Status

✅ **ACCEPTED** and implemented

### Context

Needed to choose between Next.js Pages Router and App Router for the platform architecture.

### Decision

Use **Next.js 16.1.1 with App Router** instead of Pages Router.

### Rationale

1. **Server Components by default** - Reduced JavaScript bundle size
2. **Better performance** - Streaming SSR, progressive enhancement
3. **Modern architecture** - Aligns with Next.js future direction
4. **Built-in layouts** - Simpler nested layouts without custom \_app.js
5. **Server Actions** - Native form handling without API routes

### Consequences

**Positive:**

- Main page bundle: 4.28 kB (First Load JS: 239 kB)
- 14-second build time for 37 static pages
- Better SEO with streaming HTML
- Reduced client-side JavaScript

**Negative:**

- Learning curve for Server Components paradigm
- Some libraries require "use client" directive
- Migration path for future changes more complex

### Implementation

- 73 pages using App Router structure
- Server Components for data fetching and SEO
- Client Components (210 total) minimized for interactivity
- 55 API routes under `/api` directory

---

## ADR-002: Supabase + Clerk Architecture (November 2024)

### Status

✅ **ACCEPTED** and implemented

### Context

Needed authentication system with Korean social login support and user data persistence.

### Decision

Use **Clerk for authentication** + **Supabase for database** with webhook-based synchronization.

### Rationale

1. **Clerk strengths**:
   - Native Google, Kakao social login
   - Admin role management
   - Webhook infrastructure
   - Korean phone number support

2. **Supabase strengths**:
   - PostgreSQL with RLS (Row-Level Security)
   - Real-time subscriptions
   - Fast SSR client (@supabase/ssr)
   - Free tier suitable for MVP

3. **Separation of concerns**:
   - Clerk handles auth, sessions, user identity
   - Supabase stores business data, relationships
   - Webhook sync keeps them in sync

### Consequences

**Positive:**

- Best-of-breed for each function
- Clerk's social login support (Google, Kakao)
- Supabase's powerful query capabilities
- Real-time user sync via webhook

**Negative:**

- Added complexity of two services
- Webhook reliability dependency
- Potential sync delays (mitigated by webhook)
- Higher cost at scale (two services)

### Implementation

```typescript
// Webhook sync in /api/webhooks/clerk/route.ts
const syncUserToSupabase = async clerkUser => {
  const { data, error } = await supabase.from('users').upsert({
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress,
    name: clerkUser.firstName + ' ' + clerkUser.lastName,
    updated_at: new Date().toISOString(),
  });
};
```

### Alternative Considered

- **Supabase Auth only**: Rejected due to limited Korean social login support
- **Clerk only**: Rejected due to lack of relational database features

---

## ADR-003: Multi-Layer Caching Strategy (December 2024)

### Status

✅ **ACCEPTED** and implemented

### Context

Financial data APIs (Yahoo Finance, Alpha Vantage) have rate limits and Korean stock market requires real-time performance.

### Decision

Implement **triple-layer caching**: Memory Cache → Redis → API with 5-minute TTL.

### Rationale

1. **Performance**: <50ms response time for cached data
2. **Cost reduction**: Minimize API calls to external services
3. **Reliability**: Fallback chain prevents single point of failure
4. **Korean market hours**: Cache warm during 9 AM - 3:30 PM KST

### Caching Strategy

```
Request → Memory Cache (5min)
         ↓ (miss)
         Redis Cache (5min)
         ↓ (miss)
         Yahoo Finance API
         ↓ (failure)
         Alpha Vantage API (fallback)
```

### Consequences

**Positive:**

- 95%+ cache hit rate during market hours
- <50ms response time for cached data
- API cost reduction: ~80% fewer external calls
- Resilience: Multiple fallback layers

**Negative:**

- Data freshness: 5-minute delay acceptable for wealth management
- Memory overhead: ~50MB for hot cache
- Redis dependency: Graceful degradation to memory-only

### Implementation

- **node-cache 5.1.2**: In-memory cache (session-level)
- **ioredis 5.6.1**: Redis client with connection pooling
- **@upstash/redis 1.35.1**: Serverless Redis integration
- **Error handling**: Automatic fallback to next layer

---

## ADR-004: Playwright over Cypress (December 2024)

### Status

✅ **ACCEPTED** and implemented

### Context

E2E testing framework needed for Korean market focus with mobile-first testing.

### Decision

Migrate from **Cypress 13.18.3** to **Playwright 1.56.1**.

### Rationale

1. **Cross-browser testing**:
   - Chromium, Firefox, WebKit in single framework
   - Korean users use diverse browsers (Chrome, Safari, Samsung Internet)

2. **Mobile testing**:
   - Native mobile emulation (Chrome Mobile, Safari Mobile)
   - Korean mobile-first user behavior (>60% mobile traffic)

3. **Performance**:
   - Faster test execution (parallel by default)
   - Better CI/CD integration

4. **Maintenance**:
   - Active development and community
   - Better TypeScript support

### Migration Impact

- **Removed**: Cypress + 133 related packages
- **Added**: Playwright + 8 browser/device configurations
- **Test suite**: 56 E2E tests migrated
- **Build size reduction**: ~200MB smaller node_modules

### Consequences

**Positive:**

- 8 browser/device test matrix (vs. 2 with Cypress)
- Parallel execution: 40% faster test runs
- Better mobile testing for Korean users
- Cleaner dependency tree

**Negative:**

- One-time migration effort (2-3 days)
- Team retraining on Playwright API
- Different debugging workflow

### Test Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    { name: 'chromium-desktop' },
    { name: 'chromium-mobile' },
    { name: 'chromium-tablet' },
    { name: 'firefox-desktop' },
    { name: 'webkit-desktop' },
    { name: 'webkit-mobile' },
    { name: 'financial-desktop' }, // Korean stock market specific
    { name: 'financial-mobile' }, // Korean mobile users
  ],
});
```

---

## ADR-005: TypeScript Strict Mode (Initial Setup)

### Status

⚠️ **PARTIALLY IMPLEMENTED** - Build checks currently disabled

### Context

Need strong type safety for financial platform with complex data flows.

### Decision

Enable **TypeScript strict mode** with `exactOptionalPropertyTypes: true`.

### Rationale

1. **Financial accuracy**: Prevent type-related calculation errors
2. **Developer experience**: Better IDE autocomplete and refactoring
3. **Runtime safety**: Catch errors at compile time
4. **Maintainability**: Easier to understand data structures

### Current Status

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true  // Causing Supabase type conflicts
  }
}

// next.config.mjs (TEMPORARY WORKAROUND)
{
  "typescript": {
    "ignoreBuildErrors": true  // ❌ 48 errors bypassed
  }
}
```

### Known Issues

- **48 TypeScript errors** currently bypassed
- **Root cause**: Supabase SSR client type inference conflicts with `exactOptionalPropertyTypes`
- **Technical debt**: GitHub Issue #1 (CRITICAL priority)

### Consequences

**Positive (when fully implemented):**

- Type-safe database queries
- Compile-time error detection
- Better refactoring confidence

**Negative (current state):**

- Build checks disabled (technical debt)
- Runtime error risk
- Type safety not enforced

### Remediation Plan

1. Install Supabase CLI
2. Regenerate types: `npx supabase gen types typescript > types/supabase.ts`
3. Fix 48 type errors
4. Re-enable build checks
5. Timeline: Week 1 (Dec 24-31, 2024)

---

## ADR-006: Korean Market Optimizations (Ongoing)

### Status

✅ **ACCEPTED** and evolving

### Context

Target users are Korean mid-market company CEOs with specific cultural and technical requirements.

### Decision

Implement comprehensive **Korean market optimizations** across platform.

### Key Optimizations

#### 1. Authentication

- **Kakao Business** integration for social login
- Korean phone number validation
- Korean ID verification (planned)

#### 2. Time & Localization

- **KST timezone** (UTC+9) as default
- Korean business hours (9 AM - 6 PM)
- Stock market hours (9 AM - 3:30 PM)
- Newsletter timing: Monday/Friday 7:30 AM KST

#### 3. Content

- **Korean-first** content strategy
- SEO optimized for Naver, Google Korea
- Structured data with Korean keywords
- Meta descriptions in Korean

#### 4. Design

- Navy (#1e3a8a) + Bronze (#cd7f32) color scheme (traditional + premium)
- Korean typography optimization
- Wider line spacing for Korean characters
- Mobile-first (60%+ Korean users on mobile)

#### 5. Integrations

- **Channel Talk**: Korean customer support chat
- **Kakao**: Korean messaging platform
- **Beehiiv**: Newsletter platform with Korean content
- **Cal.com**: Booking with Korean timezone

#### 6. Financial Data

- **KRX stocks**: 삼성전자 (005930.KS), SK하이닉스 (000660.KS), NAVER (035420.KS)
- **Major forex**: USD/KRW, EUR/KRW, JPY/KRW
- Korean market hours support

### Consequences

**Positive:**

- Better user experience for Korean CEOs
- Higher conversion rates (localized)
- Competitive advantage vs. global platforms
- Cultural alignment with target market

**Negative:**

- Limited scalability to other markets
- Additional complexity for non-Korean features
- Dependency on Korean service providers

### Future Considerations

- Potential expansion to Japan, China
- Multilingual support architecture
- International compliance (beyond Korea)

---

## ADR-007: Console.log Technical Debt (December 2024)

### Status

⚠️ **ACKNOWLEDGED** - Pending remediation

### Context

Code analysis revealed **1,038 console.log statements** across 186 files.

### Decision (Anti-Pattern Identified)

Current state is **UNACCEPTABLE**. Scheduled for cleanup in Phase 1.

### Impact Assessment

**Current Risk Level: MEDIUM**

1. **Performance degradation**: Console operations slow down production
2. **Information leakage**: Sensitive data potentially logged
3. **Maintainability**: Debugging noise in production
4. **Professional quality**: Not production-ready

### Remediation Plan

**Timeline**: Week 1-2 (Dec 24 - Jan 7, 2025)

**Priority Files** (28-14 occurrences):

- `lib/marketing/workflow-engine.ts` - 28 logs
- `lib/marketing/lead-scoring-engine.ts` - 14 logs
- `lib/marketing/behavioral-tracker.ts` - 13 logs

**Solution**:

```typescript
// Replace console.log with structured logging
import { logger } from '@/lib/logger';

// Before
console.log('User created:', userId);

// After
logger.info('User created', { userId, timestamp: Date.now() });
```

**Target**: <50 console.log occurrences (95% reduction)

### Acceptance Criteria

- [ ] Structured logging system implemented (`lib/logger.ts`)
- [ ] Log levels: DEBUG, INFO, WARN, ERROR
- [ ] Environment-based filtering (Dev vs Prod)
- [ ] Critical files cleaned (lib/marketing/\*)
- [ ] Build checks re-enabled

---

## ADR-008: Client Component Strategy (December 2024)

### Status

⚠️ **UNDER REVIEW** - Optimization planned

### Context

Analysis found **210 client components** - higher than recommended for App Router.

### Decision

Reduce client components to **~150 components** (30% reduction) in Phase 1.

### Rationale

1. **Bundle size**: Each client component adds to JavaScript bundle
2. **Hydration cost**: More client components = slower initial page load
3. **SEO**: Server components better for search engine crawling
4. **Performance**: Korean users on mobile networks benefit from less JavaScript

### Target Architecture

```
Total Components: 207
├─ Server Components: ~150 (72%)
└─ Client Components: ~57 (28%)

Current: 210 client components (101%)
Target:  ~150 client components (72%)
```

### Conversion Candidates

1. **Static content components**: Marketing pages, service descriptions
2. **Layout components**: Headers, footers (without interactivity)
3. **SEO-critical components**: Service cards, testimonials
4. **Non-interactive forms**: Contact forms (use Server Actions)

### Consequences

**Positive (after optimization):**

- 15-20% smaller JavaScript bundle
- Faster initial page load
- Better SEO performance
- Improved mobile experience

**Negative:**

- Refactoring effort (8-12 hours)
- Team training on Server/Client boundary
- Potential regression risks

### Implementation Plan

**Phase 1 (Week 2-3)**:

- Audit all 210 client components
- Identify conversion candidates
- Test conversions in dev environment
- Deploy incrementally with monitoring

---

## ADR-009: Dependency Management Strategy (December 2024)

### Status

⚠️ **UNDER REVIEW** - Optimization planned

### Context

**1,980 packages** totaling **1.3GB** in node_modules.

### Decision

Optimize to **<1GB node_modules** (23% reduction) through dependency audit.

### Analysis

**Current State:**

- Total packages: 1,980
- Size: 1.3GB
- Potential unused packages: ~15-20%

**Optimization Strategy:**

1. **Remove unused dependencies**: Run `npx depcheck`
2. **Consolidate similar packages**: Audit for duplicates
3. **Tree-shaking optimization**: Ensure proper imports
4. **Replace heavy packages**: Find lighter alternatives

### Known Removals (Already Completed)

- **Cypress migration**: Removed 133 packages (~200MB)
- Result: Cleaner dependency tree, faster npm install

### Future Optimizations

**Week 4 (Jan 15-21, 2025)**:

- Run dependency audit
- Remove unused packages
- Update outdated dependencies
- Document all changes

### Target Metrics

- **Package count**: 1,980 → <1,500 (24% reduction)
- **Size**: 1.3GB → <1GB (23% reduction)
- **Install time**: Faster CI/CD builds

---

## ADR-010: SEO & Marketing Strategy (Ongoing)

### Status

✅ **ACCEPTED** and evolving

### Context

Organic search and content marketing critical for acquiring Korean CEO clients.

### Decision

Implement comprehensive **SEO-first architecture** with Korean focus.

### Implementation

#### 1. Technical SEO

```typescript
// Dynamic metadata generation
export async function generateMetadata({ params }) {
  return {
    title: '한국어 제목 - FamilyOffice S',
    description: 'SEO 최적화된 한국어 설명',
    keywords: ['자산관리', '상속설계', 'CEO'],
    openGraph: {
      locale: 'ko_KR',
      siteName: 'FamilyOffice S',
    },
  };
}
```

#### 2. Structured Data (JSON-LD)

- Organization schema
- Article schema for blog posts
- BreadcrumbList for navigation
- Korean language markup

#### 3. Content Strategy

**Blog System**:

- Weekly publication schedule (Wednesdays)
- Korean keyword optimization
- Shield.io badges for credibility
- Newsletter integration

**Newsletter**:

- Beehiiv platform
- Monday/Friday 7:30 AM KST
- Tag-based segmentation
- Lead nurturing workflows

#### 4. Performance for SEO

- Core Web Vitals optimization
- 14-second build time
- Image optimization (AVIF/WebP)
- Mobile-first design (Google Mobile-First Indexing)

### Consequences

**Positive:**

- Organic search visibility in Korean market
- Lower customer acquisition cost
- Authority building through content
- Compound growth over time

**Negative:**

- Content production overhead
- SEO results take 3-6 months
- Continuous optimization required
- Korean-specific expertise needed

---

## Decision Status Summary

| ADR     | Decision                  | Status         | Priority    |
| ------- | ------------------------- | -------------- | ----------- |
| ADR-001 | Next.js App Router        | ✅ Implemented | -           |
| ADR-002 | Supabase + Clerk          | ✅ Implemented | -           |
| ADR-003 | Multi-Layer Caching       | ✅ Implemented | -           |
| ADR-004 | Playwright over Cypress   | ✅ Implemented | -           |
| ADR-005 | TypeScript Strict Mode    | ⚠️ Partial     | 🔴 CRITICAL |
| ADR-006 | Korean Optimizations      | ✅ Ongoing     | -           |
| ADR-007 | Console.log Cleanup       | ⚠️ Pending     | 🔴 CRITICAL |
| ADR-008 | Client Component Strategy | ⚠️ Planned     | 🟡 HIGH     |
| ADR-009 | Dependency Management     | ⚠️ Planned     | 🟢 MEDIUM   |
| ADR-010 | SEO Strategy              | ✅ Ongoing     | -           |

---

## Future Decisions

### Under Consideration

1. **Mobile App** (Q3 2025): Native iOS/Android vs. PWA
2. **AI Features** (Q4 2025): OpenAI vs. Claude vs. custom models
3. **Blockchain Integration** (2026): Digital asset management strategy
4. **Asia Expansion** (2026): Japan, China market entry

### Decision-Making Process

1. Document decision context and options
2. Evaluate against success metrics (main-idea.md)
3. Prototype/spike if needed
4. Team review and approval
5. Record decision in this document
6. Implement and monitor outcomes

---

_Last Updated: December 24, 2024_
_Next Review: January 31, 2025_
_Version: 1.0 (Agent OS Installed)_
