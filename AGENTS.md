# AGENTS.md

Agent-optimized development guidelines for the FamilyOffice project.

## 🚀 Essential Commands

### Development (Primary)

```bash
npm run dev              # Start development server with HMR (localhost:3000)
npm run dev:mobile       # Mobile testing server (0.0.0.0:3000)
npm run dev:inspect      # Development with Node.js inspector
```

### Code Quality (Run before commits)

```bash
npm run agent:check      # Lint + TypeScript validation (agent-optimized)
npm run lint             # ESLint analysis
npm run typecheck        # TypeScript type checking
npm run agent:test       # Full quality check + E2E tests
```

### Testing (Single test support)

```bash
# Playwright E2E Tests (8 browser/device configs)
npm run test:e2e         # Run all 134 E2E tests
npm run test:e2e:ui      # Playwright UI mode for test development
npm run test:e2e:debug   # Debug mode with inspector

# Jest Unit Tests (90%+ coverage for financial modules)
npm run test:unit        # Run unit tests with coverage
npm run test:coverage    # Generate coverage report
npm run test:integration # Integration tests
npm run test:security    # Security tests

# Single test execution
npx playwright test tests/e2e/financial.spec.ts           # Specific test file
npx playwright test --project=chromium tests/e2e/mobile.spec.ts  # Specific browser
npx jest tests/unit/financial-calculations.test.ts        # Specific unit test
```

### ⚠️ CRITICAL: Commands to AVOID during development

- `npm run build` - Breaks HMR and leaves dev server inconsistent
- Deleting `.next` folder - Use `npm run cache:clear` instead
- `rm -rf node_modules` - Restart dev server instead

## 📋 Code Style Guidelines

### Import Ordering (Prettier auto-sorts)

```typescript
// Order: React → Next → Clerk → Radix UI → shadcn/ui → components → lib → relative imports
import { useState } from 'react';
import { Metadata } from 'next';
import { currentUser } from '@clerk/nextjs';
import { Button } from '@radix-ui/react-button';
import { Card } from '@/components/ui/card';
import { CalComButton } from '@/components/cal-com-button';
import { supabase } from '@/lib/supabase';
import { localUtil } from './utils';
```

### TypeScript Standards

```typescript
// Strict typing with Zod for validation
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
});

type User = z.infer<typeof UserSchema>;

// Server components (default for SEO + performance)
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Client components (minimal use, always with directive)
'use client';
export function InteractiveComponent() {
  const [state, setState] = useState();
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `CalComButton`, `StockCard`)
- **Files**: kebab-case (e.g., `cal-com-button.tsx`, `stock-card.tsx`)
- **Variables/Functions**: camelCase (e.g., `fetchUserData`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `DEFAULT_TIMEOUT`)
- **Types/Interfaces**: PascalCase with descriptive suffixes (e.g., `UserProps`, `ApiResponse`)

### Error Handling Pattern

```typescript
// Comprehensive error handling with user feedback
try {
  const result = await apiCall();
  return { success: true, data: result };
} catch (error) {
  console.error('API call failed:', error);
  return {
    success: false,
    error: error instanceof Error ? error.message : 'Unknown error',
  };
}
```

## 🏗️ Architecture Patterns

### Component Structure

```typescript
// Server component wrapper (SEO + data fetching)
export default async function ServicePage() {
  const services = await getServices();
  return <ServiceList services={services} />;
}

// Client component for interactivity
'use client';
export function ServiceList({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);
  // Interactive logic
}
```

### API Route Pattern

```typescript
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const RequestSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = RequestSchema.parse(body);

    // Process request
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

## 🎯 Project-Specific Guidelines

### Korean Content Development

- **Target Audience**: Korean mid-market company CEOs (45-65 age)
- **Industries**: Manufacturing, Construction, IT/Venture, Family Corporations
- **Language**: Korean优先, technical terms bilingual (Korean + English)
- **Timezone**: Asia/Seoul (KST) for all datetime displays

### Financial API Integration

```typescript
// Korean stock data
GET /api/financial/stocks?korean=true  // Samsung(005930.KS), SK Hynix, NAVER
GET /api/financial/forex?from=USD&to=KRW  // USD/KRW, EUR/KRW, JPY/KRW

// Caching: Memory(5min) → Redis(5min) → API with fallback
```

### Admin Access Control

- **Super Admin**: `jhlim725@gmail.com` (hardcoded validation)
- **Protected Routes**: `/admin/*` with `AdminAccessDeniedAlert`
- **Auth Flow**: Clerk authentication → Supabase sync via webhook

## 🧪 Testing Strategy

### Playwright E2E Testing

- **134 tests** across 8 browser/device configurations
- **Cross-browser**: Chromium, Firefox, WebKit
- **Mobile**: Chrome Mobile, Safari Mobile
- **Financial platform specific**: financial-desktop, financial-mobile projects
- **Korean content** testing included

### Test File Naming

```
tests/e2e/
├── auth.spec.ts           # Authentication flows
├── financial.spec.ts      # Financial data display
├── mobile.spec.ts         # Mobile responsiveness
└── korean-content.spec.ts # Korean language rendering
```

### Single Test Execution

```bash
# Run specific test file
npx playwright test tests/e2e/financial.spec.ts

# Run with specific browser
npx playwright test --project=chromium tests/e2e/mobile.spec.ts

# Run in headed mode for debugging
npx playwright test --headed tests/e2e/auth.spec.ts
```

## 🎨 UI/UX Standards

### Design System

- **Colors**: Navy (#1e3a8a) + Bronze (#cd7f32) for premium feel
- **Typography**: Korean-optimized fonts with professional hierarchy
- **Components**: shadcn/ui with custom Korean styling
- **Accessibility**: WCAG 2.1 AA compliance

### Component Priority

1. **Cal.com booking widgets** (5 variations available)
2. **Newsletter integration** (Beehiiv platform)
3. **Financial data display** (real-time stocks/forex)
4. **Blog system** (SEO-optimized content)

## 📊 Performance Requirements

### Build Targets

- **Build time**: 14-26 seconds (134 static pages)
- **Bundle size**: Main page 4.28 kB (First Load JS: 239 kB)
- **Image optimization**: Next.js Image component mandatory

### Code Splitting

```typescript
// Dynamic imports for bundle optimization
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Client-only when appropriate
});
```

## 🔍 Debugging Protocol

### Common Issues & Solutions

1. **HMR not working**: Restart dev server (`npm run dev`)
2. **Type errors**: Run `npm run typecheck` for detailed errors
3. **Build failures**: Check environment variables and dependencies
4. **Test failures**: Verify Playwright browser configuration

### Development Workflow

```bash
# Before starting work
npm run dev                    # Start dev server
npm run agent:check            # Verify code quality

# During development
npm run typecheck              # After significant changes
npm run lint                   # Before commits

# Before finishing
npm run agent:test             # Full quality validation
# Manual testing: Korean content, mobile responsive, financial data
```

---

## 🚨 Agent Quick Reference

| Command               | Purpose                 | When to Use                  |
| --------------------- | ----------------------- | ---------------------------- |
| `npm run dev`         | HMR dev server          | 🟢 Always during development |
| `npm run agent:check` | Lint + type check       | 🟢 After code changes        |
| `npm run agent:test`  | Full quality validation | 🟢 Before commits            |
| `npm run dev:mobile`  | Mobile testing          | 🟡 Responsive work           |
| `npm run test:e2e:ui` | Test development        | 🟡 Writing new tests         |

**❌ NEVER during development**: `npm run build` (breaks HMR)
