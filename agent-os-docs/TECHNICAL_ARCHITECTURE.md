# FamilyOffice S - Technical Architecture

## System Overview

FamilyOffice S is built as a modern, scalable web application using Next.js 15.2.4 with a focus on performance, security, and Korean market optimization. The architecture follows microservices principles with integrated third-party services for specialized functionality.

## Technology Stack

### Frontend Architecture
```typescript
// Core Framework
Next.js 15.2.4 (App Router) + TypeScript 5.4.5
React 18.3.1 + React DOM 18.3.1

// UI Framework
Tailwind CSS 3.4.17 + shadcn/ui components
Radix UI primitives for accessibility
Lucide React for iconography

// State Management
React Context API for global state
React Hook Form 7.54.1 for form management
Zustand (via custom hooks) for UI state

// Styling & Animation
next-themes 0.2.0 for theme management
tailwindcss-animate 1.0.7 for animations
class-variance-authority 0.7.1 for component variants
```

### Backend & API Layer
```typescript
// API Routes (Next.js App Router)
app/api/
├── admin/                 # Admin-only endpoints
│   ├── check-permission/  # Role-based access control
│   └── users/stats/       # User analytics
├── financial/            # Financial data services
│   ├── forex/            # Currency exchange rates
│   ├── korean-market/    # KRX stock data
│   ├── stocks/           # Global stock data
│   └── tax-optimization/ # Tax calculation services
├── cal-com/             # Booking system integration
├── monitoring/          # System health & performance
├── analytics/           # Business intelligence
└── webhooks/           # External service callbacks

// Database
Supabase PostgreSQL with Drizzle ORM patterns
Redis caching layer (multi-tier strategy)
Real-time subscriptions for live data
```

### Authentication & Security
```typescript
// Authentication Provider
Clerk Authentication 6.20.0
- Multi-factor authentication support
- Social login (Google, Korean platforms)
- Session management with JWT
- Role-based access control (RBAC)

// Database Sync
Supabase SSR 0.6.1 for server-side rendering
Automatic user profile synchronization
Webhook-based data consistency

// Security Features
Rate limiting with Upstash (@upstash/ratelimit 2.0.5)
Input validation with Zod 3.24.1
CSRF protection and security headers
Data encryption for sensitive information
```

### External Integrations

#### Financial Data Services
```typescript
// Multi-Provider Strategy (Failover Architecture)
Yahoo Finance 2 (Primary) + Alpha Vantage (Backup)

interface FinancialDataConfig {
  refreshInterval: number;     // 5 minutes default
  cacheTimeout: number;        // 5 minutes cache
  maxRetries: number;          // 3 retry attempts
  fallbackToCache: boolean;    // Use cached data on failure
  enableRealtime: boolean;     // Real-time updates
}

// Supported Data Types
- Korean Stock Market (KRX symbols: .KS, .KQ)
- Global Forex (USD/KRW, EUR/KRW, JPY/KRW, CNY/KRW)
- Market Indices (KOSPI, KOSDAQ, S&P 500, NASDAQ)
- Real-time price updates with 5-minute refresh
```

#### Customer Engagement Platform
```typescript
// HubSpot Integration
- CRM data synchronization
- Lead scoring and qualification
- Marketing automation
- Customer journey tracking

// ChannelTalk Integration  
- Real-time customer support
- Korean language optimization
- Business hours management
- Escalation workflows
```

#### Booking & Scheduling
```typescript
// Cal.com Integration (@calcom/embed-react 1.5.3)
- Consultation scheduling
- Korean timezone optimization
- Multi-calendar synchronization
- Automated confirmations and reminders
- Integration with Korean business calendar
```

## Database Architecture

### Supabase PostgreSQL Schema
```sql
-- Core User Management
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  company_size TEXT,
  industry TEXT,
  assets_under_management BIGINT,
  membership_tier TEXT DEFAULT 'basic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial Portfolio Management
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  portfolio_name TEXT NOT NULL,
  total_value DECIMAL(15,2),
  currency TEXT DEFAULT 'KRW',
  risk_profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset Holdings
CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id),
  asset_type TEXT NOT NULL, -- 'stock', 'bond', 'real_estate', 'alternative'
  symbol TEXT,
  name TEXT NOT NULL,
  quantity DECIMAL(15,4),
  purchase_price DECIMAL(15,2),
  current_price DECIMAL(15,2),
  currency TEXT DEFAULT 'KRW',
  purchase_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation Records
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  consultant_id UUID,
  consultation_type TEXT NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  follow_up_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business Succession Planning
CREATE TABLE succession_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  business_value DECIMAL(15,2),
  succession_timeline TEXT,
  tax_optimization_strategy TEXT,
  next_generation_readiness TEXT,
  plan_status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Caching Strategy
```typescript
// Multi-Layer Redis Caching
interface CacheStrategy {
  L1: {
    provider: 'Redis Memory';
    ttl: '5 minutes';
    scope: 'Financial data, user sessions';
  };
  L2: {
    provider: 'Redis Persistent';
    ttl: '1 hour';
    scope: 'API responses, calculated values';
  };
  L3: {
    provider: 'Database Query Cache';
    ttl: '24 hours';
    scope: 'Static content, configurations';
  };
}

// Cache Implementation
export class FinancialDataCache {
  async getCachedStockData(symbol: string): Promise<StockData | null> {
    const cacheKey = `stock:${symbol}:${Math.floor(Date.now() / 300000)}`;
    return await redis.get(cacheKey);
  }

  async setCachedStockData(symbol: string, data: StockData, ttl: number): Promise<void> {
    const cacheKey = `stock:${symbol}:${Math.floor(Date.now() / 300000)}`;
    await redis.setex(cacheKey, ttl, JSON.stringify(data));
  }
}
```

## Performance Optimization

### Frontend Performance
```typescript
// Code Splitting & Lazy Loading
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const FinancialCharts = lazy(() => import('./charts/FinancialCharts'));

// Image Optimization
import Image from 'next/image';
// Automatic WebP conversion, responsive sizing, lazy loading

// Font Optimization
// Playfair Display with display=swap for reduced CLS
// DNS prefetch for Google Fonts

// Bundle Analysis
// @next/bundle-analyzer for monitoring bundle size
// Target: <500KB initial bundle, <2MB total
```

### API Optimization
```typescript
// Request Batching
export async function getMultipleStocks(symbols: string[]): Promise<StockData[]> {
  // Batch API calls for improved performance
  const batchSize = 10;
  const batches = chunk(symbols, batchSize);
  
  const results = await Promise.allSettled(
    batches.map(batch => fetchStockDataBatch(batch))
  );
  
  return results.flatMap(result => 
    result.status === 'fulfilled' ? result.value : []
  );
}

// Response Compression
// Automatic gzip compression for API responses
// JSON response optimization and minification
```

### Database Performance
```typescript
// Query Optimization
-- Indexes for performance-critical queries
CREATE INDEX idx_holdings_portfolio_id ON holdings(portfolio_id);
CREATE INDEX idx_consultations_user_id_date ON consultations(user_id, scheduled_date);
CREATE INDEX idx_profiles_membership_tier ON profiles(membership_tier);

// Connection Pooling
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    global: {
      headers: { 'x-application-name': 'familyoffice-s' },
    },
  }
);
```

## Security Implementation

### Authentication & Authorization
```typescript
// Clerk + Supabase Integration
export async function syncUserToSupabase(clerkUser: ClerkUser) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      full_name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      updated_at: new Date().toISOString(),
    });
  
  if (error) throw new Error('Failed to sync user');
  return data;
}

// Role-Based Access Control
export function checkAdminPermission(userId: string): Promise<boolean> {
  // Verify admin status from Supabase
  // Return boolean for access control
}
```

### Rate Limiting
```typescript
// Upstash Redis Rate Limiting
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
});

export async function rateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);
  
  if (!success) {
    throw new Error('Rate limit exceeded');
  }
  
  return { limit, reset, remaining };
}
```

### Data Protection
```typescript
// Input Validation with Zod
const UserProfileSchema = z.object({
  full_name: z.string().min(2).max(100),
  company_name: z.string().min(2).max(200),
  company_size: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']),
  industry: z.string().min(2).max(100),
  assets_under_management: z.number().positive().optional(),
});

// Environment Variable Validation
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  YAHOO_FINANCE_API_KEY: z.string().optional(),
  ALPHA_VANTAGE_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

## Korean Market Optimization

### SEO & Localization
```typescript
// Korean Search Engine Optimization
export const koreanSEOConfig = {
  naver: {
    verification: 'your-naver-verification-code',
    robotsPolicy: 'All',
    siteMap: '/sitemap.xml',
  },
  daum: {
    robotsPolicy: 'index,follow',
  },
  google: {
    verification: '18ba3lEeatksZPWrS7AdbCYodbZgCg_frKSFPSJdQ0c',
  },
  geo: {
    region: 'KR',
    placename: 'Seoul',
    coordinates: '37.5665;126.9780',
  },
  language: 'ko',
  contentLanguage: 'ko',
};

// Korean Financial Data Integration
const KOREAN_STOCK_SYMBOLS: KoreanStockSymbol[] = [
  '005930.KS', // Samsung Electronics
  '000660.KS', // SK Hynix
  '035420.KS', // NAVER
  '051910.KS', // LG Chem
  '035720.KS', // Kakao
];

const MAJOR_FOREX_PAIRS: MajorForexPair[] = [
  'USD/KRW',
  'EUR/KRW', 
  'JPY/KRW',
  'CNY/KRW',
];
```

### Korean Business Calendar Integration
```typescript
// Korean Holiday and Business Calendar
export const koreanBusinessCalendar = {
  holidays: [
    '2024-01-01', // New Year
    '2024-02-09', '2024-02-10', '2024-02-11', '2024-02-12', // Lunar New Year
    '2024-03-01', // Independence Movement Day
    '2024-05-05', // Children's Day
    '2024-05-15', // Buddha's Birthday
    '2024-06-06', // Memorial Day
    '2024-08-15', // Liberation Day
    '2024-09-16', '2024-09-17', '2024-09-18', // Chuseok
    '2024-10-03', // National Foundation Day
    '2024-10-09', // Hangeul Day
    '2024-12-25', // Christmas
  ],
  businessHours: {
    weekdays: { start: '09:00', end: '18:00' },
    saturday: { start: '09:00', end: '13:00' },
    sunday: 'closed',
  },
  timezone: 'Asia/Seoul',
};
```

## Monitoring & Analytics

### Performance Monitoring
```typescript
// Custom Performance Monitoring
export class PerformanceMonitor {
  static trackPageLoad(route: string, loadTime: number) {
    gtag('event', 'page_load_time', {
      route,
      value: loadTime,
      custom_parameter: 'performance_tracking',
    });
  }

  static trackAPICall(endpoint: string, responseTime: number, success: boolean) {
    gtag('event', 'api_performance', {
      endpoint,
      response_time: responseTime,
      success: success ? 'true' : 'false',
    });
  }
}

// Real-time Error Monitoring
export function logError(error: Error, context: string) {
  console.error(`[${context}] ${error.message}`, error.stack);
  
  // Send to monitoring service
  gtag('event', 'exception', {
    description: error.message,
    fatal: false,
    custom_parameter: context,
  });
}
```

### Business Analytics
```typescript
// Google Analytics 4 Integration
export const GA4_CONFIG = {
  measurementId: 'G-DB6TXRZLTK',
  customDimensions: {
    user_type: 'dimension1',        // 'premium', 'standard', 'trial'
    industry: 'dimension2',         // User's industry
    company_size: 'dimension3',     // Company size category
    membership_tier: 'dimension4',  // Membership level
  },
  customEvents: {
    consultation_booked: 'consultation_booked',
    portfolio_viewed: 'portfolio_viewed',
    service_inquiry: 'service_inquiry',
    document_downloaded: 'document_downloaded',
  },
};

// HubSpot Analytics Integration
export function trackHubSpotEvent(eventName: string, properties: Record<string, any>) {
  if (typeof window !== 'undefined' && window.hbspt) {
    window.hbspt.cta.load(24900000, properties);
  }
}
```

## Deployment & DevOps

### Vercel Deployment Configuration
```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  images: {
    domains: ['images.unsplash.com', 'supabase.com'],
    formats: ['image/webp', 'image/avif'],
  },
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://familyoffices.vip' },
        { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
      ],
    },
  ],
  redirects: async () => [
    {
      source: '/admin',
      destination: '/admin/dashboard',
      permanent: true,
    },
  ],
};
```

### Environment Configuration
```bash
# Production Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
HUBSPOT_API_KEY=your-hubspot-key
CAL_COM_API_KEY=your-calcom-key
GOOGLE_ANALYTICS_ID=G-DB6TXRZLTK
```

### Testing Strategy
```typescript
// Jest Configuration
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

// Test Categories
// Unit Tests: lib/__tests__/ (utilities, calculations)
// Integration Tests: app/api/__tests__/ (API endpoints)
// E2E Tests: cypress/e2e/ (user workflows)
// Security Tests: tests/security/ (authentication, authorization)
// Performance Tests: tests/performance/ (load testing, API stress)
```

This technical architecture provides a robust, scalable foundation for FamilyOffice S while maintaining the flexibility to evolve with changing business requirements and Korean market demands.