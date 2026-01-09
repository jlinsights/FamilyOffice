# Agent OS Development Guide - FamilyOffice Platform

## Quick Start for AI Agents

This guide provides AI agents with the essential information needed to effectively work with the FamilyOffice platform codebase.

## Project Context & Purpose

**FamilyOffice** is a production-ready Next.js platform serving Korean SME executives and high-net-worth individuals with:

- Comprehensive asset management services
- Consultation booking system (Cal.com integration)
- Premium financial advisory services
- Multi-language support (Korean primary, English secondary)

## Immediate Development Commands

```bash
# Essential commands for agents
npm run dev                    # Start development (localhost:3000)
npm run build                  # Verify production build
npm run test                   # Run unit tests
npm run lint                   # Check code quality
npm run type-check            # Validate TypeScript
```

## Key File Locations & Purposes

### Core Application Structure

```
app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Homepage (Korean SME focus)
├── admin/                     # Protected admin dashboard
├── api/                       # API routes (RESTful + OpenAPI)
├── services/                  # Service pages (asset management)
├── contact/                   # Contact and consultation forms
└── program/                   # Premium program pages

components/
├── forms/consultation-form.tsx # Main lead generation form
├── ui/                        # shadcn/ui base components
├── header.tsx                 # Main navigation
├── footer.tsx                 # Site footer with contact info
└── providers.tsx              # Theme + auth providers

lib/
├── supabase/                  # Database client setup
├── constants.ts               # App configuration
├── utils.ts                   # Utility functions
└── env.ts                     # Environment validation
```

### Critical Configuration Files

- `middleware.ts` - Clerk authentication middleware
- `next.config.mjs` - Advanced Next.js configuration
- `tailwind.config.ts` - Design system configuration
- `package.json` - Dependencies and scripts

## Common Development Patterns

### 1. Component Creation

```typescript
// Follow this pattern for new components
"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  // Define specific props
}

export function ComponentName({ className, ...props }: Props) {
  return (
    <div className={cn("default-classes", className)}>
      {/* Component content */}
    </div>
  )
}
```

### 2. API Route Creation

```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Business logic
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
```

### 3. Form Handling Pattern

```typescript
// Forms use react-hook-form + zod validation
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useForm } from 'react-hook-form';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
});

export function ExampleForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  // Form submission logic
}
```

## Database Schema (Supabase)

### Primary Tables

```sql
-- consultations table (main lead capture)
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed'))
);
```

### Database Client Usage

```typescript
// Server-side (app/api routes)
import { createClient } from '@/lib/supabase/server'

const supabase = createClient()
const { data, error } = await supabase
  .from('consultations')
  .insert({ name, email, phone })

// Client-side (components)
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
// Use for client-side operations
```

## Authentication System (Clerk)

### Protected Routes

```typescript
// middleware.ts automatically protects:
- /admin/*           # Admin dashboard
- /dashboard/*       # User dashboard
- /api/admin/*       # Admin API routes
```

### Authentication in Components

```typescript
import { useUser } from '@clerk/nextjs'

export function ProtectedComponent() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Please sign in</div>

  return <div>Welcome {user.firstName}!</div>
}
```

## Styling System (Tailwind + shadcn/ui)

### Design Tokens

```css
/* Key CSS variables in globals.css */
:root {
  --primary: 142 36 170; /* Purple brand color */
  --consultation: 234 88 12; /* Orange CTA color */
  --emerald-luxury: 5 150 105; /* Success/positive color */
}
```

### Component Styling Patterns

```typescript
// Use cn() for conditional classes
import { cn } from '@/lib/utils'

className={cn(
  "base-classes",
  variant === "primary" && "bg-primary text-primary-foreground",
  className
)}
```

## External Integrations

### Cal.com (Booking System)

```typescript
// API route: /api/cal-com/bookings
// Environment: CALCOM_API_KEY
// Usage: Consultation scheduling
```

### HubSpot (CRM)

```typescript
// Environment: NEXT_PUBLIC_HUBSPOT_PORTAL_ID
// Forms automatically sync to HubSpot
// Contact management integration
```

### Channel Talk (Support)

```typescript
// Environment: NEXT_PUBLIC_CHANNEL_IO_KEY
// Live chat integration for customer support
```

## Performance & SEO Optimizations

### Pre-configured Optimizations

- **Image optimization**: WebP/AVIF with Next.js Image
- **Code splitting**: Dynamic imports for heavy components
- **Caching**: Redis for API responses, browser caching
- **SEO**: Korean market optimized metadata and structured data

### Performance Targets

- **LCP**: < 2.5 seconds
- **FID**: < 100ms
- **CLS**: < 0.1
- **API Response**: < 500ms (95th percentile)

## Common Development Tasks

### 1. Adding a New Page

```bash
# Create page file
touch app/new-page/page.tsx

# Add navigation link
# Edit: components/header.tsx or constants/constants.ts
```

### 2. Creating a New API Endpoint

```bash
# Create API route
mkdir app/api/new-endpoint
touch app/api/new-endpoint/route.ts

# Add error handling and validation
# Follow existing patterns in app/api/
```

### 3. Adding New Form Fields

```typescript
// 1. Update TypeScript types in types/
// 2. Update Supabase schema if needed
// 3. Update form validation schema
// 4. Update component props and rendering
```

### 4. Modifying Styles

```typescript
// 1. Check if CSS variable exists in globals.css
// 2. Use Tailwind classes preferentially
// 3. Add custom CSS only if absolutely necessary
// 4. Maintain responsive design principles
```

## Testing Guidelines

### Unit Testing (Jest)

```bash
npm run test                   # Run all tests
npm run test:watch            # Watch mode
npm run test:coverage         # Coverage report
```

### E2E Testing (Cypress)

```bash
npm run test:e2e              # Run E2E tests
npm run test:e2e:open         # Open Cypress UI
```

### Test File Locations

```
__tests__/                    # Unit tests
cypress/e2e/                 # E2E test specs
components/__tests__/         # Component tests
```

## Deployment & Production

### Environment Setup

```env
# Required for development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Deployment Process

```bash
# Production build verification
npm run build

# Vercel deployment (automatic on git push)
# Or manual: vercel --prod
```

## Troubleshooting Common Issues

### 1. Build Failures

```bash
# Check TypeScript errors
npm run type-check

# Check linting issues
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

### 2. Database Connection Issues

```typescript
// Verify environment variables
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

// Check client initialization
const supabase = createClient();
console.log(supabase);
```

### 3. Authentication Issues

```typescript
// Check Clerk configuration
// Verify middleware.ts routes
// Check environment variables
```

## Best Practices for AI Agents

### DO ✅

- Follow existing component patterns
- Use TypeScript strictly
- Test changes locally first
- Maintain responsive design
- Follow Korean UX preferences
- Use established form validation patterns

### DON'T ❌

- Modify core authentication middleware
- Change Next.js configuration without testing
- Break existing API contracts
- Ignore TypeScript errors
- Modify production environment variables
- Skip testing after changes

### CAUTION ⚠️

- External API integrations have rate limits
- Security headers are strictly configured
- Database schema changes require migration planning
- Performance optimizations are finely tuned

## Getting Help & Resources

### Project Documentation

- `README.md` - Project overview and setup
- `DEPLOYMENT_CHECKLIST.md` - Production deployment guide
- `/docs` - Comprehensive project documentation

### External Documentation

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

This guide provides the essential information for AI agents to effectively contribute to the FamilyOffice platform development.
