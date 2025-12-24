# Tech Stack - FamilyOffice S

**Last Updated**: December 24, 2024
**Project Version**: 0.1.2
**Node.js**: >=18.0.0

---

## Core Framework

### Frontend Framework
- **Next.js 16.1.1** - React framework with App Router
  - App Router architecture (not Pages Router)
  - Server Components by default
  - Turbopack for development (--turbo flag)
  - Server Actions for mutations
  - 14-second build time
  - 37 static pages generated

- **React 18.3.1** - UI library
  - Server Components + Client Components
  - Hooks API
  - Concurrent features

- **TypeScript 5.8.3** - Type safety
  - Strict mode enabled
  - `exactOptionalPropertyTypes: true`
  - Path aliases configured

### Styling & UI Components

- **Tailwind CSS 3.4.17** - Utility-first CSS
  - Custom color palette: Navy (#1e3a8a) + Bronze (#cd7f32)
  - Korean-optimized typography
  - Responsive design system

- **shadcn/ui** - Component library
  - 30+ Radix UI components
  - Accessible by default (WCAG 2.1 AA)
  - Customizable with Tailwind

- **Framer Motion 12.23.26** - Animation library
  - Page transitions
  - Component animations
  - Gesture handling

### Icon Libraries
- **Lucide React 0.525.0** - Icon set (primary)
- **Iconify React 6.0.2** - Multi-icon framework

---

## Backend & Infrastructure

### Authentication & User Management

- **Clerk 6.20.0** - Authentication platform
  - Social login (Google, Kakao)
  - Email/password authentication
  - Webhook-based user sync
  - Admin role management

- **Supabase 2.50.5** - Backend platform
  - PostgreSQL database
  - SSR support (@supabase/ssr 0.6.1)
  - Real-time subscriptions
  - Row-level security (RLS)

### Database Architecture
- **PostgreSQL** (via Supabase)
  - `users` table (synced from Clerk)
  - `consultations` table (booking data)
  - Real-time sync via webhook (`/api/webhooks/clerk`)

### Caching & Performance

- **Redis 5.6.0** - Primary cache
  - Multi-layer caching strategy
  - 5-minute TTL for financial data
  - Upstash Redis integration (@upstash/redis 1.35.1)

- **node-cache 5.1.2** - Memory fallback
  - In-memory caching when Redis unavailable
  - Session-level caching

- **ioredis 5.6.1** - Redis client
  - Connection pooling
  - Cluster support

### Rate Limiting & Security
- **Upstash Rate Limit 2.0.5** - API rate limiting
- **Svix 1.67.0** - Webhook signature verification
- **Zod 3.24.1** - Runtime validation and schema

---

## Third-Party Integrations

### Booking & Scheduling
- **Cal.com Embed React 1.5.3**
  - CalComButton, CalComInline, CalComFloating widgets
  - Korean timezone support
  - Business hours configuration

### Marketing & CRM
- **HubSpot** - CRM integration (via API)
  - Contact sync
  - Form submissions tracking
  - Lead scoring (experimental)

- **Google Analytics Data 5.2.1**
  - GA4 integration
  - Custom event tracking
  - Conversion tracking

- **Beehiiv** - Newsletter platform (via API)
  - Weekly newsletters (Monday 7:30 AM, Friday 7:30 AM)
  - Tag-based segmentation
  - Subscription management

### Financial Data APIs
- **Yahoo Finance** - Stock data (primary)
- **Alpha Vantage** - Stock/forex data (fallback)
- **Axios 1.10.0** - HTTP client for API calls

### Communication
- **Channel Talk** - Customer support chat (via script)
- **Kakao Business** - Korean messaging platform (via API)

### Email
- **Resend 6.2.2** - Transactional email
- **React Email 4.3.2** - Email templates
- **@react-email/components 0.5.7** - Email component library

---

## Developer Tools & Quality

### Code Quality

- **ESLint 9.31.0** - Linting
  - Next.js config (eslint-config-next 15.3.5)
  - Custom rules for Korean content

- **Prettier 3.6.2** - Code formatting
  - Import sorting plugin (@trivago/prettier-plugin-sort-imports 5.2.2)
  - Consistent code style

- **TypeScript 5.8.3** - Type checking
  - `tsc --noEmit` for validation
  - Strict mode enabled

### Testing Frameworks

#### E2E Testing (Primary)
- **Playwright 1.56.1** - Cross-browser testing
  - 56 E2E tests
  - 8 browser/device configurations:
    - Chromium (desktop, mobile, tablet)
    - Firefox (desktop)
    - WebKit (desktop, mobile)
    - Financial-specific: desktop, mobile
  - Korean content testing
  - Visual regression testing
  - Performance testing

#### Unit & Integration Testing
- **Jest 29.7.0** - Test runner
  - Unit tests
  - Integration tests
  - Security tests

- **Testing Library**
  - @testing-library/react 14.3.1
  - @testing-library/jest-dom 6.6.3
  - @testing-library/user-event 14.6.1

#### Performance Testing
- **Artillery 2.0.26** - Load testing
  - API endpoint testing
  - Stress testing
  - Performance benchmarking

### Build & Bundle Analysis

- **@next/bundle-analyzer 15.4.3**
  - Bundle size visualization
  - Code splitting analysis
  - Main page: 4.28 kB (First Load JS: 239 kB)

- **webpack-bundle-analyzer 4.10.2**
  - Detailed bundle analysis
  - Tree-shaking verification

### Monitoring & Error Tracking

- **Sentry 10.22.0** - Error tracking
  - Next.js integration (@sentry/nextjs)
  - Performance profiling (@sentry/profiling-node)
  - Source maps support

- **Vercel Analytics 1.5.0** - Usage analytics
- **Vercel Speed Insights 1.2.0** - Performance monitoring
- **Web Vitals 5.1.0** - Core Web Vitals tracking

---

## Utility Libraries

### Form Management
- **React Hook Form 7.54.1** - Form state management
- **@hookform/resolvers 3.9.1** - Validation integration
- **Zod 3.24.1** - Schema validation

### UI Utilities
- **clsx 2.1.1** - Conditional className
- **tailwind-merge 2.5.5** - Tailwind class merging
- **class-variance-authority 0.7.1** - Component variants
- **cmdk 1.0.4** - Command menu component

### Date & Time
- **date-fns 3.6.0** - Date utilities (Korean timezone support)
- **react-day-picker 8.10.1** - Calendar component

### Data Visualization
- **Recharts 2.15.0** - Charts and graphs
  - Stock charts
  - Portfolio visualization

### QR Code & OTP
- **qrcode 1.5.4** - QR code generation
- **otplib 12.0.1** - OTP generation/verification
- **input-otp 1.4.1** - OTP input component

### Other Utilities
- **nanoid 5.1.5** - Unique ID generation
- **mini-svg-data-uri 1.4.4** - SVG optimization
- **rss-parser 3.13.0** - RSS feed parsing
- **logs-so 2.2.2** - Enhanced logging

### Google APIs
- **googleapis 131.0.0** - Google API client
  - Google Analytics API
  - Google Sheets API (potential)

---

## Development Environment

### Package Manager
- **npm >=8.0.0** (required)
- **Node.js >=18.0.0** (required)

### Build Tools
- **PostCSS 8.4.38** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixes
- **cross-env 7.0.3** - Cross-platform environment variables

### Image Optimization
- **Next.js Image Optimization** (built-in)
  - AVIF/WebP formats
  - Automatic responsive images
  - Lazy loading

### TypeScript Configuration
- **ts-jest 29.4.0** - Jest TypeScript support
- **openapi-types 12.1.3** - OpenAPI type definitions

### SVG Handling
- **@svgr/webpack 8.1.0** - SVG to React component conversion

---

## Deployment & Infrastructure

### Platform
- **Vercel** (primary deployment)
  - Automatic deployments from Git
  - Edge functions
  - Image optimization CDN
  - Analytics integration

### Environment Management
- **1Password** (secret management)
  - Scripts for secret sync
  - Environment variable management

### Build Configuration
- **NODE_OPTIONS='--no-deprecation'** - Clean builds
- **Turbopack** - Fast development builds
- **Code splitting** - Optimized bundle size

---

## Removed/Deprecated Technologies

### Migrated from Cypress to Playwright (December 2024)
- **Removed**: Cypress 13.18.3 and 133 related packages
- **Reason**: Better cross-browser support, faster execution, Korean mobile testing
- **Replaced by**: Playwright 1.56.1 with 8 browser/device configurations

---

## Performance Metrics

### Build Performance
- **Build Time**: 14 seconds
- **Static Pages**: 37 generated
- **Bundle Size**: Main page 4.28 kB (First Load JS: 239 kB)
- **Optimizations**:
  - Granular code splitting (React, UI libs, Clerk, Supabase separate)
  - 12 optimized package imports
  - Image optimization (AVIF/WebP)

### Runtime Performance
- **Caching Strategy**:
  - Memory cache: 5-minute TTL
  - Redis cache: 5-minute TTL
  - Financial API fallback chain
- **API Response Time**: <200ms (cached)
- **Core Web Vitals**: Optimized for Korean networks

---

## Architecture Decisions

### Frontend
- **App Router over Pages Router**: Better performance, server components
- **Server Components by default**: Reduced JavaScript bundle
- **Client Components**: Minimal use for interactivity

### Backend
- **Supabase over custom backend**: Faster development, built-in auth/RLS
- **Redis caching**: High performance for financial data
- **Multi-provider fallback**: Yahoo Finance + Alpha Vantage for reliability

### Testing
- **Playwright over Cypress**: Cross-browser testing, better Korean mobile support
- **56 E2E tests over 100+ unit tests**: Focus on user workflows

### Authentication
- **Clerk over custom auth**: Social login, webhook sync, admin management
- **Webhook sync to Supabase**: Single source of truth for user data

---

*Last Updated: December 24, 2024*
*Version: 1.0 (Agent OS Installed)*
