# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FamilyOffice S is a premium wealth management platform targeting Korean mid-market company CEOs. The site focuses on business succession planning, corporate asset management, and comprehensive family office services with specialized programs for different industries.

## Development Commands

```bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint code analysis
npm run vercel-build # Vercel-specific build process
```

## Tech Stack & Architecture

### Core Framework
- **Next.js 15.2.4** with App Router and TypeScript 5.4.5
- **Tailwind CSS 3.4.17** + shadcn/ui components
- **ESLint** + **Prettier** for code quality

### Authentication & Database
- **Clerk** for authentication with webhook sync
- **Supabase** PostgreSQL for data persistence
- **Real-time sync**: Clerk users → Supabase users table via webhook

### Key Integrations
- **Cal.com** for consultation booking (`@calcom/embed-react`)
- **v0 AI** integration for content generation
- **Google Analytics 4** with structured data markup
- **Financial APIs**: Yahoo Finance + Alpha Vantage for real-time stock/forex data
- **Redis**: Multi-layer caching system with failover support

## Project Structure

```
app/
├── api/webhooks/clerk/     # Clerk webhook for user sync
├── admin/                  # Admin dashboard (protected)
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
├── financial/             # Financial APIs & caching system
│   ├── financial-service.ts  # Main service with failover
│   ├── yahoo-finance.ts      # Yahoo Finance API client
│   ├── alpha-vantage.ts      # Alpha Vantage API client
│   ├── cache.ts              # Redis + memory caching
│   └── error-handler.ts      # Structured logging
├── user-sync.ts           # Clerk→Supabase sync logic
├── env.ts                 # Environment validation with Zod
└── utils.ts               # Utility functions

constants/
├── services.ts            # Service definitions by industry
├── programs.ts            # Educational program data
└── faq.ts                 # FAQ content structure
```

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
```

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

## Analytics & Monitoring

- **Google Analytics 4**: Enhanced ecommerce tracking
- **Supabase Analytics**: Real-time database insights
- **Vercel Analytics**: Performance and usage metrics
- **Error Tracking**: Built-in Next.js error boundaries