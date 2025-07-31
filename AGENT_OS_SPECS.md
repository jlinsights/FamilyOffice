# Agent OS Integration Specifications - FamilyOffice Platform

## Project Overview

**FamilyOffice** is a Next.js 15-based family office services platform designed for Korean SME executives and high-net-worth individuals. The platform provides comprehensive asset management, consultation booking, and premium financial services.

## Technical Architecture

### Core Stack
- **Framework**: Next.js 15.4.3 (App Router)
- **Runtime**: React 18.3.1 + TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17 + shadcn/ui
- **Authentication**: Clerk v6.20.0
- **Database**: Supabase (PostgreSQL) with SSR
- **Caching**: Redis/Upstash + Node Cache
- **Deployment**: Vercel with edge optimization

### External Integrations
- **Booking**: Cal.com API for consultation scheduling
- **CRM**: HubSpot for customer relationship management
- **Support**: Channel Talk for live customer support
- **Analytics**: Google Analytics 4 + GTM
- **Financial**: Yahoo Finance API for market data

## Agent OS Compatibility Matrix

### Development Commands
```yaml
primary_commands:
  dev: "npm run dev"          # Development server (localhost:3000)
  build: "npm run build"      # Production build
  vercel-build: "npm run vercel-build"  # Vercel-specific build
  
testing_commands:
  test: "npm run test"                    # Jest unit tests
  test:e2e: "npm run test:e2e"           # Cypress E2E tests
  test:coverage: "npm run test:coverage"  # Coverage reports
  test:all: "npm run test:all"           # Full test suite

quality_commands:
  lint: "npm run lint"                   # ESLint checks
  lint:fix: "npm run lint:fix"          # Auto-fix linting issues
  format: "npm run format"               # Prettier formatting
  type-check: "npm run type-check"       # TypeScript checking
```

### Agent-Friendly File Structure
```
/app/                    # Next.js App Router pages
├── admin/              # Protected admin routes (Clerk auth)
├── api/                # API routes with OpenAPI documentation
├── (public)/           # Public marketing pages
└── globals.css         # Global styles with CSS variables

/components/            # React components (Agent-modifiable)
├── ui/                 # shadcn/ui base components
├── forms/              # Form components with validation
├── sections/           # Page section components
└── providers.tsx       # App providers (theme, auth)

/lib/                   # Business logic and utilities
├── api/                # API client configurations
├── supabase/           # Database client setup
├── security/           # Security utilities and validation
├── performance/        # Optimization utilities
└── constants.ts        # App configuration constants

/types/                 # TypeScript definitions
├── supabase.ts         # Database type definitions
├── globals.d.ts        # Global type augmentations
└── index.ts            # Type exports
```

## Agent OS Integration Guidelines

### 1. Database Schema Management
```typescript
// Primary database interface (Supabase)
interface Database {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          service_type: string
          message: string
          status: "pending" | "contacted" | "completed"
        }
      }
    }
  }
}
```

### 2. API Route Patterns
All API routes follow this structure:
```typescript
// /app/api/[feature]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Authentication check
  // Business logic
  // Return standardized response
}
```

### 3. Component Development Standards
- All components use TypeScript with strict typing
- UI components extend shadcn/ui base components
- Form components include validation and error handling
- Responsive design using Tailwind CSS breakpoints

### 4. Authentication & Authorization
```typescript
// Clerk-based authentication with protected routes
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/dashboard(.*)',
  '/api/admin(.*)'
])
```

## Agent OS Development Workflows

### 1. Feature Development
```bash
# 1. Create feature branch
git checkout -b feature/agent-feature-name

# 2. Development workflow
npm run dev                  # Start development server
npm run type-check          # Validate TypeScript
npm run test                # Run unit tests

# 3. Quality assurance
npm run lint:fix            # Fix code style issues
npm run test:e2e            # Run E2E tests
npm run build               # Verify production build

# 4. Deployment preparation
npm run vercel-build        # Vercel-specific build check
```

### 2. Component Creation Template
```typescript
// components/new-component.tsx
"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export function NewComponent({ className, children }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  )
}
```

### 3. API Route Template
```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    // Request validation
    const data = await request.json()
    
    // Business logic here
    
    // Success response
    return NextResponse.json({ 
      success: true, 
      data 
    })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Security & Performance Considerations

### Security Headers (Pre-configured)
- Content Security Policy (CSP) with allowlisted domains
- Cross-Origin Resource Policy (CORP)
- Strict Transport Security (HSTS)
- X-Frame-Options: DENY

### Performance Optimizations
- Image optimization with WebP/AVIF formats
- Code splitting with dynamic imports
- Redis caching for API responses
- CDN optimization via Vercel Edge Network

### Environment Variables Required
```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# External Services
CALCOM_API_KEY=                    # Cal.com booking integration
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=     # HubSpot CRM
NEXT_PUBLIC_CHANNEL_IO_KEY=        # Customer support chat

# Caching (Upstash Redis)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Agent OS Compatibility Notes

### Safe Operations
✅ **Component modification** - All UI components are modular and safe to modify
✅ **API route creation** - Follow established patterns for new endpoints
✅ **Database operations** - Use Supabase client with proper error handling
✅ **Styling updates** - Tailwind CSS classes and CSS variables
✅ **Content updates** - Marketing pages and static content

### Caution Required
⚠️ **Authentication flows** - Clerk integration requires careful handling
⚠️ **External API integrations** - Cal.com, HubSpot have rate limits
⚠️ **Security headers** - Modifications may break CSP policies
⚠️ **Performance optimizations** - Bundle splitting configurations

### Avoid Modifying
❌ **Next.js configuration** - Complex webpack and build optimizations
❌ **Core middleware** - Authentication and security middleware
❌ **Production environment variables** - Sensitive API keys and secrets

## Testing & Quality Assurance

### Automated Testing
- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Cypress with real browser automation
- **Type Checking**: TypeScript strict mode enabled
- **Linting**: ESLint with Next.js and TypeScript rules

### Performance Monitoring
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **API Response Times**: < 500ms for 95th percentile
- **Bundle Size**: Monitored with @next/bundle-analyzer
- **Error Tracking**: Integrated with Sentry (when configured)

## Agent OS Recommendations

1. **Start with component-level modifications** before attempting system-wide changes
2. **Always run the test suite** after modifications
3. **Use TypeScript strictly** - the codebase has comprehensive type coverage
4. **Follow the existing patterns** for consistency and maintainability
5. **Test locally first** before suggesting production changes

This platform is production-ready and actively serving Korean SME executives with comprehensive asset management services.