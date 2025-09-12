# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository. For AI agents, see **[AGENTS.md](./AGENTS.md)** for optimized, agent-specific instructions.

## 🚀 Quick Start (Agent-Friendly)

### Essential Commands
```bash
# Development (DO NOT use npm run build during dev sessions)
npm run dev          # Start development server with HMR
npm run dev:mobile   # Mobile development server

# Quality Checks  
npm run lint         # ESLint analysis
npm run typecheck    # TypeScript validation

# Testing
npm run test:e2e     # Playwright E2E tests (56 tests)
```

### Key Project Facts
- **Framework**: Next.js 15.4.6 + TypeScript + Tailwind CSS
- **Target**: Korean mid-market company CEOs
- **Admin**: `jhlim725@gmail.com` (super admin)
- **Database**: Supabase PostgreSQL with Clerk sync
- **Testing**: Playwright (replaced Cypress, 8 browser/device configs)

## Project Overview

FamilyOffice S is a premium wealth management platform targeting Korean mid-market company CEOs. The site focuses on business succession planning, corporate asset management, and comprehensive family office services with specialized programs for different industries.

## Development Commands

⚠️ **AGENT WARNING**: Never run `npm run build` during development sessions - it breaks HMR and leaves the dev server in an inconsistent state.

```bash
# Development (Use these during agent sessions)
npm run dev          # Start development server (localhost:3000) - No deprecation warnings
npm run dev:mobile   # Mobile development server (0.0.0.0:3000)
npm run dev:inspect  # Development with Node.js inspector

# Quality Assurance (Run before commits)
npm run lint         # ESLint code analysis  
npm run typecheck    # TypeScript type checking

# Build Commands (Use outside agent sessions only)
npm run build        # Production build - No deprecation warnings
npm run start        # Start production server  
npm run vercel-build # Vercel-specific build process
```

## Tech Stack & Architecture

### Core Framework

- **Next.js 15.4.6** with App Router and TypeScript 5.8.3
- **Tailwind CSS 3.4.17** + shadcn/ui components
- **ESLint** + **Prettier** for code quality
- **Playwright** for E2E testing (replaced Cypress)

### Authentication & Database

- **Clerk** for authentication with webhook sync
- **Supabase** PostgreSQL for data persistence
- **Real-time sync**: Clerk users → Supabase users table via webhook

### Key Integrations

- **Cal.com** for consultation booking (`@calcom/embed-react`)
- **Newsletter**: Beehiiv platform (https://newsletter.familyoffices.vip)
  - 매주 화요일 오전 9:30, 금요일 오전 7:30 정기 발송
  - API 통합으로 블로그에서 직접 구독 가능
  - 태그 기반 세분화 및 추적
- **Blog System**: /blog 페이지에서 자산관리 인사이트 제공
  - **발행 일정**: 화요일 오후 2:30 (실무 가이드) + 목요일 저녁 8:00 (전략 분석)
  - **콘텐츠 전략**: 교육형(화) + 분석형(목)
  - SEO 최적화된 콘텐츠 관리
  - Shield.io 배지 통합
  - 뉴스레터 구독 연동
- **v0 AI** integration for content generation
- **Google Analytics 4** with structured data markup
- **Financial APIs**: Yahoo Finance + Alpha Vantage for real-time stock/forex data
- **Redis**: Multi-layer caching system with failover support

## Project Structure

````
app/
├── api/webhooks/clerk/     # Clerk webhook for user sync
├── admin/                  # Admin dashboard (protected)
├── blog/                   # Blog system (/blog + /blog/[slug])
├── (marketing pages)/      # Public pages with Korean content
├── layout.tsx             # Root layout with providers
└── globals.css            # Tailwind base styles

components/
├── cal-com-*.tsx          # Booking widget variations
├── forms/                 # Contact/consultation forms
├── icons/service-icons.tsx # Custom SVG icons
└── ui/                    # shadcn/ui components

lib/
├── supabase/              # Database client/server setup
├── blog-data.ts           # Centralized blog content management
├── financial/             # Financial APIs & caching system
│   ├── financial-service.ts  # Main service with failover
│   ├── yahoo-finance.ts      # Yahoo Finance API client
│   ├── alpha-vantage.ts      # Alpha Vantage API client
│   ├── cache.ts              # Redis + memory caching
│   └── error-handler.ts      # Structured logging
├── user-sync.ts           # Clerk→Supabase sync logic
├── env.ts                 # Environment validation with Zod
└── utils.ts               # Utility functions

types/
├── blog.ts                # Blog system type definitions
└── (other type files)/    # Additional TypeScript types

constants/
├── services.ts            # Service definitions by industry
├── programs.ts            # Educational program data
└── faq.ts                 # FAQ content structure

tests/
├── e2e/                   # Playwright E2E tests (replaced Cypress)
├── unit/                  # Jest unit tests
├── integration/           # Integration tests
└── performance/           # Performance tests

## Authentication System

### Admin Access

- **Super Admin**: `jhlim725@gmail.com` (hardcoded check)
- **Protected Routes**: `/admin/*` with `AdminAccessDeniedAlert` component
- **User Sync**: Clerk webhook → `syncUserToSupabase()` → users table

### Database Schema

```sql
-- Key Supabase tables
users (id, email, name, created_at, updated_at)
-- Additional tables as needed for consultations, analytics
````

## Environment Variables

```bash
# Required for development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

V0_API_KEY=

NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Financial APIs (optional)
ALPHA_VANTAGE_API_KEY=
YAHOO_FINANCE_API_KEY=

# Redis (optional)
REDIS_URL=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

## Key Features & Content

### Target Industries

1. **Manufacturing**: Traditional Korean companies (삼성, LG style)
2. **Construction**: Real estate and infrastructure
3. **IT/Venture**: Modern tech companies
4. **Family Corporations**: Multi-generational businesses

### Service Categories

- **Asset Management**: Portfolio optimization, risk management
- **Succession Planning**: Corporate governance, next-gen preparation
- **Tax Strategy**: Korean tax optimization, international structures
- **Education**: CEO programs, family workshops

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

### SEO & Performance

- **Metadata**: Dynamic generation per page with Korean keywords
- **Structured Data**: JSON-LD for rich snippets
- **Image Optimization**: Next.js Image component with proper sizing
- **Core Web Vitals**: Optimized for Korean search engines

### Security

- **CSP Headers**: Configured in `next.config.mjs`
- **Webhook Validation**: Clerk signature verification
- **Admin Protection**: Email-based access control
- **Environment Isolation**: Separate configs for dev/prod

## Cal.com Integration

Multiple booking widget implementations:

- `CalComButton`: Simple CTA button
- `CalComInline`: Embedded calendar view
- `CalComFloating`: Persistent floating widget
- `CalComAdvanced`: Full-featured booking flow

Configuration for Korean timezone and business hours.

## Financial Data Integration

### Real-time Financial APIs

- **Dual API Strategy**: Yahoo Finance (primary) + Alpha Vantage (fallback)
- **Multi-layer Caching**: Memory cache (5min) → Redis (5min) → API
- **Korean Market Focus**: KRX stocks (삼성전자, SK하이닉스, NAVER 등)
- **Major Forex Pairs**: USD/KRW, EUR/KRW, JPY/KRW

### API Endpoints

```bash
# Stock data
GET /api/financial/stocks?symbol=005930.KS
GET /api/financial/stocks?korean=true

# Forex data
GET /api/financial/forex?from=USD&to=KRW
GET /api/financial/forex?major=true

# Service status
GET /api/financial/status?detailed=true
```

### Financial Components

- `StockCard`: Real-time stock display with auto-refresh
- `ForexCard`: Currency exchange rates
- `FinancialDashboard`: Integrated financial overview

## Deployment

- **Platform**: Vercel with automatic deployments
- **Build Command**: `npm run vercel-build`
- **Environment**: Production variables set in Vercel dashboard
- **Domain**: Custom domain with Korean SSL certificate

## Testing & Quality Assurance

### E2E Testing with Playwright

**Migration from Cypress completed (December 2024)**

- **56 E2E tests** across 8 browser/device configurations
- **Cross-browser support**: Chromium, Firefox, WebKit
- **Mobile testing**: Chrome Mobile, Safari Mobile
- **Financial platform specific**: financial-desktop, financial-mobile projects
- **Korean content testing** included

### Test Commands

```bash
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Playwright UI mode
npm run test:e2e:headed   # Headed mode for debugging
npm run test:e2e:debug    # Debug mode with inspector
npm run test:e2e:report   # View test reports
```

### Test Coverage

- **Unit tests**: Jest + React Testing Library
- **Integration tests**: Supabase test environment
- **Performance tests**: Artillery load testing
- **Security tests**: Automated security scanning

## Recent Technical Improvements

### 1. Cypress → Playwright Migration

- ✅ Complete removal of Cypress dependencies
- ✅ Package.json cleanup (133 packages removed)
- ✅ Playwright configuration with Korean market focus
- ✅ 8 browser/device test matrix

### 2. Node.js Deprecation Warnings Resolution

- ✅ `punycode` deprecation warnings eliminated
- ✅ NODE_OPTIONS='--no-deprecation' configuration
- ✅ Clean development and build processes

### 3. Build Performance Optimization

- ✅ **Build time**: 14 seconds
- ✅ **37 static pages** generated
- ✅ **Bundle optimization**: Main page 4.28 kB (First Load JS: 239 kB)
- ✅ **Code splitting** and **image optimization**

## Analytics & Monitoring

- **Google Analytics 4**: Enhanced ecommerce tracking
- **Supabase Analytics**: Real-time database insights
- **Vercel Analytics**: Performance and usage metrics
- **Error Tracking**: Built-in Next.js error boundaries

---

## 📝 Document Update History

**Last Updated**: December 2024

### Recent Changes

- ✅ **Cypress → Playwright Migration**: Complete E2E testing environment overhaul
- ✅ **Node.js Deprecation Resolution**: punycode warnings eliminated
- ✅ **Build Performance**: 14-second build time, 37 static pages
- ✅ **Package Cleanup**: 133 unused packages removed
- ✅ **Korean Market Focus**: Enhanced testing for Korean content and mobile usage

### Next Steps

- 🚀 **Vercel Production Deployment**: Ready for production deployment
- 🔍 **Performance Monitoring**: Core Web Vitals tracking
- 📱 **Mobile Optimization**: Korean mobile user experience enhancement
- 🌏 **Internationalization**: Korean language support optimization
