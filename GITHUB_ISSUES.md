# 📋 GitHub Issues - Code Quality Improvements

Copy and paste these into GitHub Issues for tracking.

---

## 🔴 Issue #1: [URGENT] Fix TypeScript Type Safety Violations

**Labels:** `bug`, `high-priority`, `typescript`
**Milestone:** Week 1
**Assignee:** TBD

### Description
48 TypeScript errors are currently bypassed via `ignoreBuildErrors: true` in next.config.mjs. This creates runtime risk and technical debt.

### Problem
- Type system bypassed in production
- Supabase SSR client type inference issues
- `exactOptionalPropertyTypes: true` conflicts with library types

### Root Cause
Missing/outdated Supabase type definitions

### Solution
1. Install Supabase CLI
2. Regenerate types from database schema
3. Fix remaining type errors
4. Re-enable TypeScript build checks

### Steps to Reproduce
```bash
npm run typecheck
# Shows 48 errors
```

### Acceptance Criteria
- [ ] Supabase CLI installed
- [ ] Types regenerated: `types/supabase.ts`
- [ ] All 48 TypeScript errors fixed
- [ ] `npm run typecheck` passes with 0 errors
- [ ] Build checks re-enabled in `next.config.mjs`

### Files Affected
- `lib/marketing/workflow-engine.ts` (28 errors)
- `lib/user-sync.ts` (8 errors)
- `lib/rss-aggregator.ts` (2 errors)
- `lib/serper/client.ts` (1 error)
- `scripts/collect-serper-rankings.ts` (3 errors)
- `scripts/test-connection.ts` (1 error)

### Commands
```bash
# Install CLI
npm install -g supabase

# Generate types
npx supabase gen types typescript --project-id syyklnwynskwoxvcghkf > types/supabase.ts

# Verify
npm run typecheck
```

### Related Issues
- Blocks re-enabling build quality checks
- Related to #4 (Re-enable Build Checks)

---

## 🔴 Issue #2: [URGENT] Remove Excessive Console Logging (1,038 occurrences)

**Labels:** `performance`, `security`, `high-priority`, `refactor`
**Milestone:** Week 1
**Assignee:** TBD

### Description
1,038 console.log statements throughout the codebase causing:
- Performance degradation in production
- Information leakage (internal logic exposed)
- Poor debugging experience

### Problem
- Production logs reveal business logic
- Performance overhead in hot paths
- No structured logging system

### Impact
- **Security:** Internal implementation details exposed
- **Performance:** Console I/O overhead
- **Maintainability:** Hard to filter/search logs

### Solution
Replace console.log with structured logging using existing `lib/logger.ts`

### High-Priority Files (61 logs)
```
lib/marketing/workflow-engine.ts        (28 logs)
lib/marketing/lead-scoring-engine.ts    (14 logs)
lib/marketing/behavioral-tracker.ts     (13 logs)
lib/marketing/ai-content-engine.ts      (6 logs)
```

### Acceptance Criteria
- [ ] All production code uses `lib/logger.ts`
- [ ] Console.log count: 1,038 → <50
- [ ] Only dev-only files (scripts/) keep console.log
- [ ] Logger supports: DEBUG, INFO, WARN, ERROR levels
- [ ] Production only logs WARN and ERROR

### Migration Pattern
```typescript
// BEFORE:
console.log('워크플로우 트리거 체크:', triggerType, contactId);

// AFTER:
import { logger } from '@/lib/logger';
logger.info('workflow_trigger_check', {
  triggerType,
  contactId,
  timestamp: new Date().toISOString()
});
```

### Commands
```bash
# Find all console.log
grep -rn "console\.log" --include="*.ts" --include="*.tsx" lib/ components/ app/ > console-audit.txt

# Count
grep -r "console\.log" --include="*.ts" --include="*.tsx" lib/ | wc -l
```

### Related
- Improves monitoring and debugging
- Required for production readiness

---

## 🟡 Issue #3: Audit and Reduce Client Components (210 → 150)

**Labels:** `performance`, `optimization`, `medium-priority`
**Milestone:** Week 2-3
**Assignee:** TBD

### Description
210 client components (`"use client"`) causing:
- Larger bundle sizes
- Slower page loads
- Unnecessary client-side hydration

### Problem
Many components marked as client components don't need interactivity:
- Static display components
- Layout components
- Content-only components

### Impact
- First Load JS: ~239 KB (can be reduced)
- Bundle size: Larger than necessary
- Performance: Slower initial page load

### Solution
Audit and convert server-eligible components to Server Components

### Strategy
1. Identify components without:
   - useState/useEffect
   - Event handlers
   - Browser APIs
2. Convert to Server Components
3. Measure bundle size improvement

### Acceptance Criteria
- [ ] Audit completed: 210/210 components reviewed
- [ ] Converted: ~60 components to Server Components
- [ ] Target: 210 → ~150 client components (30% reduction)
- [ ] Bundle size reduced: 15-20%
- [ ] First Load JS: -50KB to -100KB
- [ ] All pages still functional

### Commands
```bash
# Find all client components
grep -r "use client" components/ app/ --include="*.tsx" > client-components.txt

# Analyze bundle
npm run analyze
```

### Conversion Checklist Template
For each component:
- [ ] Uses useState/useEffect? → Keep Client
- [ ] Has event handlers? → Keep Client
- [ ] Uses browser APIs? → Keep Client
- [ ] Static content only? → Convert to Server
- [ ] Only fetches data? → Convert to Server

### Related
- Improves Core Web Vitals
- Better SEO performance

---

## 🟡 Issue #4: Re-enable TypeScript and ESLint Build Checks

**Labels:** `quality`, `medium-priority`, `dependencies`
**Milestone:** Week 2
**Assignee:** TBD

### Description
Build quality checks are disabled in `next.config.mjs`:
```javascript
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true }
```

This allows broken code to reach production.

### Problem
- No automated quality gates
- TypeScript errors ignored
- ESLint warnings ignored
- Technical debt accumulation

### Dependencies
- **Blocked by:** Issue #1 (Fix TypeScript errors)
- All TypeScript errors must be resolved first

### Solution
Remove the ignore flags after fixing all errors

### Acceptance Criteria
- [ ] Issue #1 completed (0 TypeScript errors)
- [ ] Remove `ignoreDuringBuilds: true`
- [ ] Remove `ignoreBuildErrors: true`
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] CI/CD updated to enforce checks

### Changes Required
**File:** `next.config.mjs`
```diff
- eslint: {
-   ignoreDuringBuilds: true,
- },
- typescript: {
-   ignoreBuildErrors: true,
- }
```

### Verification
```bash
npm run typecheck  # Should pass
npm run lint       # Should pass
npm run build      # Should succeed
```

### Related
- Prevents regression
- Improves code quality
- Required for production deployment

---

## 🟡 Issue #5: Security Audit - Review HTML Injection Points (36 files)

**Labels:** `security`, `medium-priority`, `audit`
**Milestone:** Week 2-3
**Assignee:** TBD

### Description
36 files use `dangerouslySetInnerHTML` or `innerHTML`, potential XSS vulnerability.

### Problem
Not all usages are properly sanitized:
- ✅ `lib/security/html-sanitizer.ts` - Uses DOMPurify (SAFE)
- ⚠️ Blog pages - Needs review
- ⚠️ `components/structured-data.tsx` - Needs review
- ⚠️ `components/footer.tsx` - Needs review

### Security Risk
- **XSS attacks** if user content not sanitized
- **Code injection** if dynamic content unsanitized
- **Data theft** through malicious scripts

### Solution
Audit all 36 files and ensure proper sanitization

### Acceptance Criteria
- [ ] All 36 files reviewed and documented
- [ ] Every usage has security assessment
- [ ] All user-generated content uses DOMPurify
- [ ] Static content verified as safe
- [ ] Security tests added for dynamic content
- [ ] Documentation updated with security patterns

### Review Checklist (per file)
- [ ] Is content sanitized with DOMPurify?
- [ ] Is source trusted (static/database)?
- [ ] Can we use React components instead?
- [ ] Is there user-generated content?
- [ ] Security test added?

### Standard Pattern
```typescript
import DOMPurify from 'isomorphic-dompurify';

const cleanHtml = DOMPurify.sanitize(dirtyHtml, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href', 'title']
});

<div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
```

### Commands
```bash
# Find all usages
grep -rn "dangerouslySetInnerHTML\|innerHTML" --include="*.ts" --include="*.tsx" components/ app/ lib/ > html-injection-audit.txt
```

### Related
- OWASP Top 10 compliance
- Production security requirement

---

## 🟢 Issue #6: Optimize Dependencies (1.3GB → <1GB)

**Labels:** `optimization`, `low-priority`, `dependencies`
**Milestone:** Week 4
**Assignee:** TBD

### Description
node_modules is 1.3GB with 1,980 packages - this is excessive.

### Problem
- Slow npm install (high bandwidth)
- Large deployment size
- Many unused dependencies
- Possible duplicate packages

### Impact
- CI/CD time: Longer builds
- Developer experience: Slow installs
- Deployment: Larger container images

### Solution
1. Analyze and remove unused packages
2. Optimize heavy dependencies
3. Use specific imports instead of entire libraries

### Acceptance Criteria
- [ ] node_modules: 1.3GB → <1GB (23% reduction)
- [ ] Total packages: 1,980 → <1,500 (24% reduction)
- [ ] Install time: -20% to -30%
- [ ] All functionality still works
- [ ] No unused dependencies remain

### Strategy
```bash
# 1. Find unused packages
npx depcheck

# 2. Analyze bundle
npm run analyze

# 3. Check for duplicates
npm dedupe

# 4. Update package.json
# Remove unused dependencies
```

### Optimization Examples
```javascript
// BEFORE: Import entire library
import _ from 'lodash';

// AFTER: Import specific function
import debounce from 'lodash/debounce';
```

### Expected Results
- Faster CI/CD pipelines
- Quicker local development
- Smaller Docker images

---

## 🟢 Issue #7: Implement Enhanced Structured Logging

**Labels:** `enhancement`, `monitoring`, `low-priority`
**Milestone:** Week 4
**Assignee:** TBD

### Description
Enhance existing `lib/logger.ts` with structured logging capabilities.

### Problem
Current logger is basic:
- No log levels filtering
- No structured metadata
- No environment-based logging
- No integration with monitoring tools

### Solution
Enhance logger with professional features

### Features to Add
1. **Log Levels:** DEBUG, INFO, WARN, ERROR
2. **Structured Metadata:** Context objects
3. **Environment Filtering:** Production vs Dev
4. **Timestamps:** ISO 8601 format
5. **Service Identification:** Track log source

### Acceptance Criteria
- [ ] Log levels implemented and working
- [ ] Production only logs WARN and ERROR
- [ ] Development logs all levels
- [ ] Structured metadata support
- [ ] Timestamps on all logs
- [ ] Integration with existing code
- [ ] Documentation updated

### Implementation
```typescript
interface LogEntry {
  level: LogLevel;
  message: string;
  context: Record<string, any>;
  timestamp: string;
  service: string;
}

class Logger {
  info(message: string, context?: Record<string, any>) {
    // Implementation
  }
  warn(message: string, context?: Record<string, any>) {
    // Implementation
  }
  error(message: string, context?: Record<string, any>) {
    // Implementation
  }
}
```

### Optional Enhancements
- [ ] Integration with Sentry/LogRocket
- [ ] Log aggregation service
- [ ] Real-time monitoring dashboard
- [ ] Alert system for errors

### Related
- Replaces console.log (Issue #2)
- Improves debugging and monitoring
- Production-ready logging

---

## 📊 Meta Issue: Code Quality Improvement Sprint

**Labels:** `epic`, `quality`, `tracking`
**Milestone:** 4 weeks
**Assignee:** TBD

### Description
Track overall progress of code quality improvements

### Sub-Issues
- #1 Fix TypeScript Errors (Week 1) 🔴
- #2 Remove Console Logging (Week 1) 🔴
- #3 Reduce Client Components (Week 2-3) 🟡
- #4 Re-enable Build Checks (Week 2) 🟡
- #5 Security Audit HTML (Week 2-3) 🟡
- #6 Optimize Dependencies (Week 4) 🟢
- #7 Enhanced Logging (Week 4) 🟢

### Success Metrics
**Current State:**
- Health Score: 72/100
- Security Vulnerabilities: 0 ✅
- TypeScript Errors: 48
- Console.log Count: 1,038
- Client Components: 210
- node_modules: 1.3GB

**Target State (4 weeks):**
- Health Score: 85/100
- Security Vulnerabilities: 0
- TypeScript Errors: 0
- Console.log Count: <50
- Client Components: ~150
- node_modules: <1GB

### Weekly Checkpoints
- **Week 1:** Issues #1, #2 completed
- **Week 2:** Issues #3, #4 in progress
- **Week 3:** Issues #3, #5 completed
- **Week 4:** Issues #6, #7 completed

### Overall Progress
- [ ] Week 1 (Dec 24-31): 🔴 Urgent fixes
- [ ] Week 2 (Jan 1-7): 🟡 High priority
- [ ] Week 3 (Jan 8-14): 🟡 High priority
- [ ] Week 4 (Jan 15-21): 🟢 Medium priority
- [ ] Final review and documentation

---

**How to Use:**
1. Copy each issue section
2. Create new GitHub issue
3. Add appropriate labels
4. Assign to team member
5. Track progress in project board

**Priority Legend:**
- 🔴 URGENT (Week 1)
- 🟡 HIGH (Week 2-3)
- 🟢 MEDIUM (Week 4)
