# FamilyOffice S - Troubleshooting Guide

## Overview

This comprehensive troubleshooting guide covers common issues, debugging procedures, and resolution strategies for FamilyOffice S platform. It's designed for developers, system administrators, and support teams to quickly identify and resolve technical and business-related issues.

## System Health Monitoring

### Health Check Endpoints
```bash
# System Health
curl https://familyoffices.vip/api/monitoring/health

# Database Connectivity
curl https://familyoffices.vip/api/test-supabase

# External Service Status
curl https://familyoffices.vip/api/financial/status

# Performance Metrics
curl https://familyoffices.vip/api/monitoring/performance
```

### Key System Metrics
```typescript
interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: string;
  responseTime: number;        // Target: <500ms
  errorRate: number;          // Target: <0.1%
  throughput: number;         // Requests per minute
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
    clerk: ServiceStatus;
    supabase: ServiceStatus;
    externalAPIs: ExternalAPIStatus;
  };
}
```

## Common Issues & Solutions

### 1. Authentication & Authorization Issues

#### Issue: User Cannot Login
```bash
# Symptoms
- "Invalid credentials" error despite correct information
- Infinite loading on login page
- Clerk authentication failures

# Debugging Steps
1. Check Clerk service status
curl https://api.clerk.dev/v1/health

2. Verify environment variables
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY

3. Check browser console for errors
4. Verify user exists in Clerk dashboard
5. Check Supabase sync status
```

**Resolution Steps:**
```typescript
// 1. Clear browser cookies and localStorage
localStorage.clear();
sessionStorage.clear();

// 2. Verify Clerk configuration
const clerkConfig = {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  signInUrl: '/sign-in',
  signUpUrl: '/sign-up',
  afterSignInUrl: '/dashboard',
  afterSignUpUrl: '/onboarding'
};

// 3. Force user sync
POST /api/sync-user
{
  "userId": "user_2abc123def456",
  "forceSync": true
}

// 4. Check database connection
SELECT * FROM profiles WHERE id = 'user_2abc123def456';
```

#### Issue: Admin Access Denied
```bash
# Symptoms
- "Insufficient permissions" error for admin users
- Admin routes returning 403 Forbidden
- Admin panel not loading

# Debugging Steps
1. Verify admin role in database
SELECT * FROM profiles WHERE id = 'user_id' AND membership_tier = 'admin';

2. Check middleware configuration
3. Verify API endpoint permissions
4. Check Clerk user metadata
```

**Resolution:**
```sql
-- Update user to admin status
UPDATE profiles 
SET membership_tier = 'admin', 
    updated_at = NOW() 
WHERE id = 'user_id';

-- Verify admin permissions
SELECT id, email, membership_tier, created_at 
FROM profiles 
WHERE membership_tier = 'admin';
```

### 2. Financial Data Integration Issues

#### Issue: Korean Stock Data Not Loading
```bash
# Symptoms
- Empty stock data responses
- Outdated price information
- API timeout errors

# Debugging Process
1. Check external API status
curl "https://query1.finance.yahoo.com/v8/finance/chart/005930.KS"

2. Verify API keys and rate limits
3. Check cache status
4. Review error logs
```

**Resolution Steps:**
```typescript
// 1. Clear financial data cache
await redis.del('stock:005930.KS:*');
await redis.del('forex:USD:KRW:*');

// 2. Test API connectivity
const testYahooAPI = async () => {
  try {
    const response = await yahooFinance.quote('005930.KS');
    console.log('Yahoo Finance API:', response);
  } catch (error) {
    console.error('Yahoo Finance Error:', error);
    // Fallback to Alpha Vantage
    const alphaResponse = await getAlphaVantageData('005930.KS');
    console.log('Alpha Vantage Fallback:', alphaResponse);
  }
};

// 3. Force refresh financial data
GET /api/financial/korean-market?symbols=005930.KS&refresh=true

// 4. Check cache hit rates
const cacheStats = await getCacheStats();
console.log('Cache Statistics:', cacheStats);
```

#### Issue: Forex Rates Inconsistent
```bash
# Symptoms
- Inconsistent USD/KRW rates
- Delayed currency updates
- Rate calculation errors

# Investigation Steps
1. Compare multiple data sources
2. Check update frequencies
3. Verify calculation logic
4. Review historical data consistency
```

**Fix Implementation:**
```typescript
// Enhanced forex data validation
interface ForexValidation {
  rate: number;
  timestamp: Date;
  source: 'yahoo' | 'alpha_vantage';
  validationChecks: {
    reasonabilityCheck: boolean;    // Rate within 10% of previous
    freshnessCheck: boolean;        // Data less than 5 minutes old
    crossRateValidation: boolean;   // Consistent with cross rates
  };
}

const validateForexRate = (data: ForexData): boolean => {
  const checks = {
    reasonabilityCheck: isReasonableRate(data.rate, data.fromCurrency, data.toCurrency),
    freshnessCheck: isDataFresh(data.lastUpdated, 5 * 60 * 1000),
    crossRateValidation: validateCrossRates(data)
  };
  
  return Object.values(checks).every(check => check === true);
};
```

### 3. Database & Performance Issues

#### Issue: Slow Database Queries
```bash
# Symptoms
- API response times >2 seconds
- Dashboard loading slowly
- Database connection timeouts

# Performance Analysis
1. Check database connection pool
2. Analyze slow query logs
3. Review database indexes
4. Monitor connection counts
```

**Optimization Steps:**
```sql
-- Identify slow queries
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Add missing indexes
CREATE INDEX CONCURRENTLY idx_holdings_portfolio_user 
ON holdings(portfolio_id, user_id);

CREATE INDEX CONCURRENTLY idx_consultations_scheduled_date 
ON consultations(scheduled_date) 
WHERE status = 'scheduled';

-- Analyze table statistics
ANALYZE profiles;
ANALYZE portfolios;
ANALYZE holdings;

-- Check connection pool status
SELECT state, count(*) 
FROM pg_stat_activity 
GROUP BY state;
```

**Connection Pool Optimization:**
```typescript
// Supabase connection optimization
const supabaseConfig = {
  db: {
    schema: 'public',
    poolSize: 10,           // Increased from default
    idleTimeout: 30000,     // 30 seconds
    connectionTimeout: 5000, // 5 seconds
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'x-application-name': 'familyoffice-s',
      'x-connection-source': 'nextjs-app'
    }
  }
};
```

#### Issue: Redis Cache Problems
```bash
# Symptoms
- Cache misses despite recent data
- Memory usage warnings
- Connection errors to Redis

# Diagnostic Commands
redis-cli INFO memory
redis-cli INFO stats
redis-cli MONITOR
redis-cli SLOWLOG GET 10
```

**Cache Troubleshooting:**
```typescript
// Cache health check
const checkCacheHealth = async () => {
  try {
    // Connection test
    await redis.ping();
    
    // Memory usage check
    const info = await redis.info('memory');
    const usedMemory = parseInt(info.split('\r\n')
      .find(line => line.startsWith('used_memory:'))
      ?.split(':')[1] || '0');
    
    // Hit rate analysis
    const stats = await redis.info('stats');
    const hits = parseInt(stats.split('\r\n')
      .find(line => line.startsWith('keyspace_hits:'))
      ?.split(':')[1] || '0');
    const misses = parseInt(stats.split('\r\n')
      .find(line => line.startsWith('keyspace_misses:'))
      ?.split(':')[1] || '0');
    
    const hitRate = hits / (hits + misses);
    
    console.log('Cache Health:', {
      usedMemory: `${(usedMemory / 1024 / 1024).toFixed(2)} MB`,
      hitRate: `${(hitRate * 100).toFixed(2)}%`,
      totalKeys: await redis.dbsize()
    });
    
  } catch (error) {
    console.error('Cache Health Check Failed:', error);
  }
};

// Clear problematic cache entries
const clearCache = async (pattern: string) => {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
    console.log(`Cleared ${keys.length} cache entries matching ${pattern}`);
  }
};
```

### 4. External Service Integration Issues

#### Issue: Cal.com Booking Failures
```bash
# Symptoms
- Booking confirmation emails not sent
- Calendar integration not working
- Appointment scheduling errors

# Debugging Steps
1. Check Cal.com service status
2. Verify API credentials
3. Test webhook endpoints
4. Review booking flow logs
```

**Resolution Process:**
```typescript
// Test Cal.com integration
const testCalComIntegration = async () => {
  try {
    // Test API connectivity
    const response = await fetch('https://api.cal.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${process.env.CAL_COM_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Cal.com API Error: ${response.status}`);
    }
    
    const userData = await response.json();
    console.log('Cal.com User Data:', userData);
    
    // Test booking creation
    const testBooking = await createTestBooking({
      eventTypeId: 'succession_planning',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      attendee: {
        name: 'Test User',
        email: 'test@example.com'
      }
    });
    
    console.log('Test Booking:', testBooking);
    
  } catch (error) {
    console.error('Cal.com Integration Error:', error);
  }
};

// Webhook verification
const verifyWebhooks = async () => {
  const webhookUrl = 'https://familyoffices.vip/api/cal-com/webhooks';
  
  // Check webhook registration
  const webhooks = await fetch('https://api.cal.com/v1/webhooks', {
    headers: {
      'Authorization': `Bearer ${process.env.CAL_COM_API_KEY}`
    }
  });
  
  console.log('Registered Webhooks:', await webhooks.json());
};
```

#### Issue: HubSpot Sync Problems
```bash
# Symptoms
- Contact data not syncing
- Lead scoring not updating
- Marketing automation failures

# Investigation Steps
1. Check HubSpot API rate limits
2. Verify contact properties mapping
3. Review webhook delivery status
4. Test API endpoints manually
```

**HubSpot Integration Fix:**
```typescript
// HubSpot health check
const checkHubSpotIntegration = async () => {
  try {
    const hubspotClient = new HubSpotAPI({
      apiKey: process.env.HUBSPOT_API_KEY
    });
    
    // Test API connectivity
    const account = await hubspotClient.auth.oauth.accessTokensApi.get();
    console.log('HubSpot Account:', account);
    
    // Check rate limit status
    const rateLimitInfo = await hubspotClient.crm.contacts.basicApi.getPage(1);
    console.log('Rate Limit Info:', {
      remaining: rateLimitInfo.headers['x-hubspot-ratelimit-remaining'],
      max: rateLimitInfo.headers['x-hubspot-ratelimit-max']
    });
    
    // Test contact sync
    const testContact = await syncContactToHubSpot({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company'
    });
    
    console.log('Test Contact Sync:', testContact);
    
  } catch (error) {
    console.error('HubSpot Integration Error:', error);
  }
};
```

### 5. Korean Localization Issues

#### Issue: Korean Characters Not Displaying
```bash
# Symptoms
- Korean text appearing as boxes or question marks
- Font loading failures
- Encoding issues in database

# Debugging Steps
1. Check font loading in browser DevTools
2. Verify UTF-8 encoding in database
3. Test font fallbacks
4. Review CSS font declarations
```

**Font & Encoding Fix:**
```css
/* Korean font optimization */
@font-face {
  font-family: 'Korean Sans';
  src: local('Noto Sans KR'),
       local('Malgun Gothic'),
       local('Apple SD Gothic Neo'),
       url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR') format('woff2');
  font-display: swap;
  unicode-range: U+AC00-D7AF, U+1100-11FF, U+3130-318F;
}

body {
  font-family: 'Korean Sans', -apple-system, BlinkMacSystemFont, 
               'Segoe UI', Roboto, sans-serif;
}
```

```sql
-- Verify database encoding
SHOW client_encoding;
SHOW server_encoding;

-- Check Korean text storage
SELECT 
  id, 
  company_name,
  length(company_name) as char_count,
  octet_length(company_name) as byte_count
FROM profiles 
WHERE company_name ~ '[가-힣]'
LIMIT 5;
```

#### Issue: Korean Date/Time Formatting
```bash
# Symptoms
- Incorrect timezone display
- Wrong date format for Korean users
- Business hours not aligned with KST

# Resolution Steps
1. Verify timezone configuration
2. Check date formatting functions
3. Update Korean business calendar
4. Test with Korean locale
```

**Date/Time Localization:**
```typescript
// Korean timezone handling
const koreaTimezone = 'Asia/Seoul';

const formatKoreanDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: koreaTimezone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(date);
};

const formatKoreanDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: koreaTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
};

// Business hours validation
const isKoreanBusinessHours = (date: Date): boolean => {
  const koreaTime = new Date(date.toLocaleString("en-US", {timeZone: koreaTimezone}));
  const day = koreaTime.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = koreaTime.getHours();
  
  // Monday to Friday, 9 AM to 6 PM KST
  return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
};
```

## Error Codes & Resolution Matrix

### HTTP Status Codes
| Code | Meaning | Common Causes | Resolution |
|------|---------|---------------|------------|
| 400 | Bad Request | Invalid input data, malformed JSON | Validate request format, check required fields |
| 401 | Unauthorized | Missing/invalid authentication token | Refresh token, re-authenticate |
| 403 | Forbidden | Insufficient permissions | Check user roles, verify admin status |
| 404 | Not Found | Resource doesn't exist | Verify resource ID, check database |
| 429 | Too Many Requests | Rate limit exceeded | Implement backoff, check rate limits |
| 500 | Internal Server Error | Server-side error | Check logs, restart services |
| 502 | Bad Gateway | External service unavailable | Check external API status |
| 503 | Service Unavailable | Maintenance mode, overload | Check system resources, scaling |

### Custom Error Codes
```typescript
enum FamilyOfficeErrorCodes {
  // Authentication Errors
  INVALID_CLERK_TOKEN = 'AUTH001',
  USER_SYNC_FAILED = 'AUTH002',
  ADMIN_ACCESS_DENIED = 'AUTH003',
  
  // Financial Data Errors
  YAHOO_API_UNAVAILABLE = 'FIN001',
  ALPHA_VANTAGE_QUOTA_EXCEEDED = 'FIN002',
  KOREAN_MARKET_DATA_STALE = 'FIN003',
  INVALID_CURRENCY_PAIR = 'FIN004',
  
  // Database Errors
  CONNECTION_TIMEOUT = 'DB001',
  QUERY_EXECUTION_FAILED = 'DB002',
  CONSTRAINT_VIOLATION = 'DB003',
  
  // Cache Errors
  REDIS_CONNECTION_FAILED = 'CACHE001',
  CACHE_SERIALIZATION_ERROR = 'CACHE002',
  
  // External Service Errors
  CALCOM_BOOKING_FAILED = 'EXT001',
  HUBSPOT_SYNC_ERROR = 'EXT002',
  EMAIL_DELIVERY_FAILED = 'EXT003',
  
  // Business Logic Errors
  INVALID_SUCCESSION_SCENARIO = 'BIZ001',
  TAX_CALCULATION_ERROR = 'BIZ002',
  PORTFOLIO_VALIDATION_FAILED = 'BIZ003'
}
```

## Monitoring & Alerting

### Alert Conditions
```typescript
interface AlertingRules {
  critical: {
    responseTime: '>2000ms for 5 minutes';
    errorRate: '>5% for 2 minutes';
    dbConnections: '<5 available connections';
    cacheHitRate: '<50% for 10 minutes';
  };
  warning: {
    responseTime: '>1000ms for 10 minutes';
    errorRate: '>1% for 5 minutes';
    memoryUsage: '>80% for 15 minutes';
    diskSpace: '>85% for 30 minutes';
  };
  info: {
    newUserRegistration: 'immediate';
    largeTransaction: '>₩10억 portfolio change';
    highValueConsultation: 'VIP client booking';
  };
}
```

### Log Analysis
```bash
# Error log patterns to monitor
grep "ERROR" /var/log/familyoffice/app.log | tail -100
grep "TIMEOUT" /var/log/familyoffice/app.log | wc -l
grep "401\|403" /var/log/familyoffice/access.log | tail -50

# Performance monitoring
grep "slow query" /var/log/postgresql/postgresql.log
grep "cache miss" /var/log/familyoffice/app.log | wc -l

# Business metrics monitoring
grep "booking_created" /var/log/familyoffice/business.log | wc -l
grep "portfolio_updated" /var/log/familyoffice/business.log | tail -20
```

## Emergency Procedures

### Critical System Failure
```bash
# Immediate Response Checklist
1. Check system status page
2. Verify external service dependencies
3. Review recent deployments
4. Check resource utilization
5. Implement emergency maintenance page if needed

# Emergency contacts
- Technical Lead: +82-10-xxxx-xxxx
- Infrastructure Team: +82-10-xxxx-xxxx  
- Business Continuity: +82-10-xxxx-xxxx
```

### Data Backup & Recovery
```bash
# Database backup verification
pg_dump familyoffice_production > backup_$(date +%Y%m%d).sql
aws s3 cp backup_$(date +%Y%m%d).sql s3://familyoffice-backups/

# Cache data recovery
redis-cli BGSAVE
redis-cli LASTSAVE

# Configuration backup
tar -czf config_backup_$(date +%Y%m%d).tar.gz \
  /app/.env.production \
  /app/next.config.mjs \
  /app/middleware.ts
```

### Communication Templates
```markdown
# User Communication Template - Service Disruption

Subject: [FamilyOffice S] Temporary Service Disruption Notice

Dear Valued Client,

We are currently experiencing technical difficulties that may affect 
your access to our platform. Our team is working to resolve this issue 
as quickly as possible.

Current Status: [Brief description]
Expected Resolution: [Time estimate]
Affected Services: [List of affected features]

We apologize for any inconvenience and will provide updates every 30 minutes.

For urgent matters, please contact our support team directly at 
+82-2-xxxx-xxxx.

Thank you for your patience.

FamilyOffice S Technical Team
```

This troubleshooting guide provides comprehensive coverage for maintaining system reliability and resolving issues quickly to ensure uninterrupted service for FamilyOffice S clients.