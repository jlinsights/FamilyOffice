# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository. For AI agents, see **[AGENTS.md](./AGENTS.md)** for optimized, agent-specific instructions.

## Quick Start (Agent-Friendly)

### Essential Commands

```bash
# Development (DO NOT use npm run build during dev sessions)
npm run dev          # Start development server with HMR
npm run dev:mobile   # Mobile development server

# Quality Checks
npm run lint         # ESLint analysis
npm run typecheck    # TypeScript validation

# Testing
npm run test:e2e     # Playwright E2E tests
```

### Key Project Facts

- **Framework**: Next.js 16.1.1 + React 18.3.1 + TypeScript 5.8.3 + Tailwind CSS
- **Target**: Korean mid-market company CEOs
- **Admin**: Environment variable based (`ADMIN_EMAILS` / `NEXT_PUBLIC_ADMIN_EMAILS`)
- **Auth**: Clerk + Supabase PostgreSQL sync
- **Testing**: Playwright (8 browser/device configs)
- **Email**: Resend (`email.familyoffices.vip` domain)

## Project Overview

FamilyOffice S is a premium wealth management platform targeting Korean mid-market company CEOs. The site focuses on business succession planning, corporate asset management, and comprehensive family office services with specialized programs for different industries.

## Development Commands

**AGENT WARNING**: Never run `npm run build` during development sessions - it breaks HMR and leaves the dev server in an inconsistent state.

```bash
# Development (Use these during agent sessions)
npm run dev          # Start development server (localhost:3000)
npm run dev:mobile   # Mobile development server (0.0.0.0:3000)
npm run dev:inspect  # Development with Node.js inspector

# Quality Assurance (Run before commits)
npm run lint         # ESLint code analysis
npm run typecheck    # TypeScript type checking

# Build Commands (Use outside agent sessions only)
npm run build        # Production build
npm run start        # Start production server
npm run vercel-build # Vercel-specific build process
```

## Tech Stack & Architecture

### Core Framework

- **Next.js 16.1.1** with App Router and TypeScript 5.8.3
- **React 18.3.1** with Server Components
- **Tailwind CSS** + shadcn/ui components
- **ESLint** + **Prettier** for code quality
- **Playwright** for E2E testing

### Authentication & Database

- **Clerk** for authentication with webhook sync
- **Supabase** PostgreSQL for data persistence
- **Real-time sync**: Clerk users → Supabase users table via webhook

### Key Integrations

- **Cal.com** for consultation booking (`@calcom/embed-react`)
  - Components located in `components/calendar/cal-com-*.tsx`
- **Newsletter**: Beehiiv platform (https://newsletter.familyoffices.vip)
  - 매주 월요일 오전 7:30, 금요일 오전 7:30 정기 발송
  - API 통합으로 블로그에서 직접 구독 가능
- **Blog System**: `/blog` 페이지에서 자산관리 인사이트 제공
  - SEO 최적화된 콘텐츠 관리 + 뉴스레터 구독 연동
- **Email**: Resend with `email.familyoffices.vip` domain
- **Google Analytics 4** with structured data markup
- **Financial APIs**: `/api/financial/` (stocks, forex, status, tax-optimization, korean-market)
- **Redis**: Multi-layer caching system with failover support

## Project Structure

```
app/
├── api/
│   ├── webhooks/clerk/        # Clerk webhook for user sync
│   ├── admin/                 # Admin API routes
│   ├── financial/             # Financial data APIs
│   ├── newsletter/            # Newsletter subscription
│   └── email/                 # Email service APIs
├── admin/                     # Admin dashboard (protected)
├── blog/                      # Blog system (/blog + /blog/[slug])
├── portal/                    # User portal (authenticated)
├── structure-check/           # Structure check request flow
├── (many service pages)/      # Service landing pages
├── layout.tsx                 # Root layout with providers
└── globals.css                # Tailwind base styles

components/
├── calendar/cal-com-*.tsx     # Booking widget variations
├── email/                     # Email templates & test panel
├── features/admin/            # Admin-specific components
├── forms/                     # Contact/consultation forms
├── icons/service-icons.tsx    # Custom SVG icons
├── performance/               # Performance monitoring dashboards
├── program/                   # Program section components
├── sections/                  # Page section components
├── seminar/                   # Seminar section components
└── ui/                        # shadcn/ui components

lib/
├── admin-permissions.ts       # Centralized admin email management (getAdminEmails)
├── supabase/                  # Database client/server/admin setup
├── email/resend-client.ts     # Resend email service
├── blog-data.ts               # Centralized blog content management
├── financial/                 # Financial APIs & caching
│   ├── cache.ts               # Redis + memory caching
│   └── error-handler.ts       # Structured logging
├── security/                  # Security monitoring & audit
├── performance/               # Performance optimization utilities
├── user-sync.ts               # Clerk→Supabase sync logic
├── env.ts                     # Environment validation with Zod
└── rate-limit.ts              # API rate limiting

constants/
├── services.ts                # Service definitions by industry
├── programs.ts                # Educational program data
├── seminars.ts                # Seminar data
└── faq.ts                     # FAQ content structure
```

## Authentication & Admin System

### Admin Access

- **Admin emails**: Configured via `ADMIN_EMAILS` environment variable (comma-separated)
- **Client-side admin check**: Uses `NEXT_PUBLIC_ADMIN_EMAILS` environment variable
- **Centralized function**: `getAdminEmails()` from `lib/admin-permissions.ts`
- **Protected Routes**: `/admin/*` with `AdminAccessDeniedAlert` component
- **User Sync**: Clerk webhook → `syncUserToSupabase()` → users table

### Admin Permission Pattern

```typescript
// Server Components / API Routes
import { getAdminEmails } from '@/lib/admin-permissions';
const isAdmin = getAdminEmails().includes(userEmail.toLowerCase());

// Client Components
const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
```

## Environment Variables

```bash
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Admin Configuration
ADMIN_EMAILS=admin1@example.com,admin2@example.com
NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com

# Email
RESEND_API_KEY=
NEXT_PUBLIC_RESEND_FROM_EMAIL=noreply@email.familyoffices.vip

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Optional
REDIS_URL=
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
NEXT_PUBLIC_CALCOM_API_KEY=
```

See `.env.example` for the complete list.

## Key Features & Content

### Target Industries

1. **Manufacturing**: Traditional Korean companies
2. **Construction**: Real estate and infrastructure
3. **IT/Venture**: Modern tech companies
4. **Family Corporations**: Multi-generational businesses

### Service Categories

- **Asset Management**: Portfolio optimization, risk management
- **Succession Planning**: Corporate governance, next-gen preparation
- **Tax Strategy**: Korean tax optimization, international structures
- **Education**: CEO programs, family workshops
- **Insurance**: Key-person, group, health, life insurance solutions

### Design System

- **Color Palette**: Navy (#1e3a8a) + Bronze (#cd7f32) for premium feel
- **Typography**: Korean-optimized fonts with professional hierarchy
- **Components**: Consistent shadcn/ui with custom Korean styling

## Development Guidelines

### Code Patterns

- **Server Components**: Default for data fetching and SEO
- **Client Components**: Minimal use with "use client" directive
- **Type Safety**: Strict TypeScript with Zod validation
- **Error Handling**: Comprehensive try/catch with user feedback
- **Admin Checks**: Always use `getAdminEmails()` - never hardcode admin emails

### SEO & Performance

- **Metadata**: Dynamic generation per page with Korean keywords
- **Structured Data**: JSON-LD for rich snippets
- **Image Optimization**: Next.js Image component with proper sizing
- **Core Web Vitals**: Optimized for Korean search engines

### Security

- **CSP Headers**: Configured in `next.config.mjs`
- **Webhook Validation**: Clerk signature verification
- **Admin Protection**: Environment variable-based access control
- **Rate Limiting**: `globalRateLimit()` in middleware for API routes
- **Environment Isolation**: Separate configs for dev/prod

## Middleware

The middleware (`middleware.ts`) handles:
1. Maintenance mode check
2. Rate limiting for API routes (single call, result cached for headers)
3. Clerk authentication
4. Admin route protection
5. Rate limit headers on successful responses

**Important**: `globalRateLimit()` must only be called once per request to avoid double-counting.

## Deployment

- **Platform**: Vercel with automatic deployments
- **Build Command**: `npm run vercel-build`
- **Environment**: Production variables set in Vercel dashboard
- **Domain**: familyoffices.vip

## Testing

### E2E Testing with Playwright

- **Cross-browser**: Chromium, Firefox, WebKit
- **Mobile testing**: Chrome Mobile, Safari Mobile
- **Korean content testing** included

```bash
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Playwright UI mode
npm run test:e2e:headed   # Headed mode for debugging
npm run test:e2e:debug    # Debug mode with inspector
npm run test:e2e:report   # View test reports
```

## Version Control

- Whenever code changes are made, record a one-line description with emoji in Korean in `.commit_message.txt` using Edit Tool.
  - Read `.commit_message.txt` first, then Edit.
  - Overwrite regardless of existing content.
  - If it was a git revert related operation, make the `.commit_message.txt` file empty.

---

**Last Updated**: February 2025
