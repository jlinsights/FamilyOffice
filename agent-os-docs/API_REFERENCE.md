# FamilyOffice S - API Reference

## API Overview

The FamilyOffice S API provides comprehensive endpoints for wealth management, financial data integration, user management, and business services. All APIs are built using Next.js 15.2.4 App Router with TypeScript and include comprehensive error handling, rate limiting, and security features.

## Base Configuration

```typescript
// API Base URL
Production: https://familyoffices.vip/api
Development: http://localhost:3000/api

// Authentication
Authorization: Bearer <clerk_session_token>
Content-Type: application/json

// Rate Limiting
Rate Limit: 100 requests per minute per user
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

## Core API Modules

### 1. Authentication & User Management

#### Check Admin Permission

```typescript
GET /api/admin/check-permission

// Request Headers
Authorization: Bearer <token>

// Response
{
  "success": true,
  "isAdmin": true,
  "permissions": ["read", "write", "admin"],
  "timestamp": 1640995200
}

// Error Response
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Admin access required",
    "timestamp": 1640995200
  }
}
```

#### User Statistics

```typescript
GET /api/admin/users/stats

// Response
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "activeUsers": 1100,
    "premiumMembers": 450,
    "newUsersThisMonth": 85,
    "membershipTiers": {
      "basic": 600,
      "premium": 450,
      "vip": 200
    },
    "industryBreakdown": {
      "manufacturing": 350,
      "construction": 280,
      "it_venture": 220,
      "finance": 180,
      "retail": 120,
      "other": 100
    }
  },
  "timestamp": 1640995200
}
```

#### Sync User Profile

```typescript
POST /api/sync-user

// Request Body
{
  "userId": "user_2abc123def456",
  "email": "ceo@company.co.kr",
  "fullName": "김대표",
  "companyName": "(주)한국기업",
  "industry": "manufacturing",
  "companySize": "51-200",
  "assetsUnderManagement": 5000000000
}

// Response
{
  "success": true,
  "data": {
    "id": "user_2abc123def456",
    "profileCreated": true,
    "syncedAt": "2024-01-15T09:30:00Z"
  }
}
```

### 2. Financial Data Services

#### Korean Market Data

```typescript
GET /api/financial/korean-market

// Query Parameters
?symbols=005930.KS,000660.KS,035420.KS&refresh=false

// Response
{
  "success": true,
  "data": [
    {
      "symbol": "005930.KS",
      "name": "삼성전자",
      "price": 73500,
      "change": 1500,
      "changePercent": 2.08,
      "volume": 15680000,
      "marketCap": 4420000000000000,
      "currency": "KRW",
      "timestamp": "2024-01-15T15:30:00+09:00",
      "source": "yahoo"
    }
  ],
  "fromCache": false,
  "timestamp": 1640995200
}
```

#### Global Stock Data

```typescript
GET /api/financial/stocks

// Query Parameters
?symbol=AAPL&market=US&refresh=true

// Response
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 185.25,
    "change": 2.15,
    "changePercent": 1.17,
    "volume": 45820000,
    "marketCap": 2890000000000,
    "currency": "USD",
    "fiftyTwoWeekHigh": 199.62,
    "fiftyTwoWeekLow": 164.08,
    "dividendYield": 0.44,
    "peRatio": 31.2,
    "timestamp": "2024-01-15T16:00:00-05:00",
    "source": "yahoo"
  },
  "fromCache": false,
  "timestamp": 1640995200
}
```

#### Forex Rates

```typescript
GET /api/financial/forex

// Query Parameters
?from=USD&to=KRW&amount=1000

// Response
{
  "success": true,
  "data": {
    "fromCurrency": "USD",
    "toCurrency": "KRW",
    "rate": 1305.50,
    "amount": 1000,
    "convertedAmount": 1305500,
    "lastUpdated": "2024-01-15T15:30:00+09:00",
    "source": "yahoo"
  },
  "fromCache": true,
  "timestamp": 1640995200
}
```

#### Tax Optimization Calculator

```typescript
POST /api/financial/tax-optimization

// Request Body
{
  "scenario": "business_succession",
  "businessValue": 5000000000,
  "ownershipPercentage": 75,
  "successorAge": 35,
  "timeframe": "5_years",
  "currentStructure": "sole_proprietorship",
  "targetStructure": "family_corporation"
}

// Response
{
  "success": true,
  "data": {
    "currentTaxLiability": 1250000000,
    "optimizedTaxLiability": 875000000,
    "potentialSavings": 375000000,
    "savingsPercentage": 30,
    "recommendedStrategy": {
      "primaryMethod": "가업승계특례",
      "secondaryMethods": ["가족법인설립", "단계적증여"],
      "timeline": "5년 단계적 실행",
      "keyRequirements": [
        "10년 이상 사업 영위",
        "정규직 근로자 3인 이상 고용",
        "승계 후 7년간 사업 지속"
      ]
    },
    "riskFactors": [
      "세법 개정 리스크",
      "사업 지속 요건 미충족 리스크",
      "평가액 변동 리스크"
    ],
    "nextSteps": [
      "가업승계 적격성 정밀 검토",
      "평가기관 선정 및 기업가치 평가",
      "승계 계획서 작성"
    ]
  },
  "timestamp": 1640995200
}
```

### 3. Consultation & Booking System

#### Cal.com Integration

```typescript
GET /api/cal-com/bookings

// Query Parameters
?userId=user_123&startDate=2024-01-15&endDate=2024-01-31

// Response
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "booking_abc123",
        "title": "가업승계 전략 상담",
        "startTime": "2024-01-18T10:00:00+09:00",
        "endTime": "2024-01-18T11:00:00+09:00",
        "attendees": [
          {
            "name": "김대표",
            "email": "ceo@company.co.kr",
            "timeZone": "Asia/Seoul"
          }
        ],
        "eventType": "succession_planning",
        "status": "confirmed",
        "location": "서울 강남구 테헤란로 123",
        "notes": "가족법인 설립 관련 상담"
      }
    ],
    "totalCount": 5,
    "nextBookingAvailable": "2024-01-19T14:00:00+09:00"
  },
  "timestamp": 1640995200
}
```

#### Create Consultation Booking

```typescript
POST /api/cal-com/bookings

// Request Body
{
  "eventTypeId": "succession_planning",
  "startTime": "2024-01-20T14:00:00+09:00",
  "attendee": {
    "name": "이대표",
    "email": "ceo@newcompany.co.kr",
    "phone": "+82-10-1234-5678",
    "company": "(주)신성장기업"
  },
  "consultationType": "세무 최적화",
  "notes": "M&A 관련 세무 이슈 상담 요청",
  "preferredLanguage": "ko"
}

// Response
{
  "success": true,
  "data": {
    "bookingId": "booking_def456",
    "confirmationNumber": "FO-2024-0120-001",
    "scheduledTime": "2024-01-20T14:00:00+09:00",
    "consultant": {
      "name": "박전문가",
      "title": "세무 전문 컨설턴트",
      "credentials": ["세무사", "회계사"]
    },
    "preparationMaterials": [
      "재무제표 최근 3년",
      "사업자등록증",
      "기업개요서"
    ],
    "meetingLink": "https://meet.familyoffices.vip/booking_def456",
    "calendarInvite": "https://calendar.google.com/event?action=TEMPLATE&..."
  },
  "timestamp": 1640995200
}
```

### 4. Analytics & Monitoring

#### Performance Metrics

```typescript
GET /api/analytics/performance

// Query Parameters
?period=30d&metrics=api_response_time,page_load_time,error_rate

// Response
{
  "success": true,
  "data": {
    "period": "30d",
    "metrics": {
      "api_response_time": {
        "average": 245,
        "p95": 450,
        "p99": 850,
        "unit": "ms"
      },
      "page_load_time": {
        "average": 1.2,
        "p95": 2.1,
        "p99": 3.8,
        "unit": "seconds"
      },
      "error_rate": {
        "percentage": 0.05,
        "total_errors": 12,
        "total_requests": 24000
      }
    },
    "trends": {
      "api_response_time": "improving",
      "page_load_time": "stable",
      "error_rate": "improving"
    }
  },
  "timestamp": 1640995200
}
```

#### System Health Check

```typescript
GET /api/monitoring/health

// Response
{
  "success": true,
  "data": {
    "status": "healthy",
    "services": {
      "database": {
        "status": "healthy",
        "responseTime": 15,
        "lastChecked": "2024-01-15T10:30:00Z"
      },
      "redis_cache": {
        "status": "healthy",
        "responseTime": 2,
        "hitRate": 0.85,
        "lastChecked": "2024-01-15T10:30:00Z"
      },
      "external_apis": {
        "yahoo_finance": {
          "status": "healthy",
          "responseTime": 180,
          "successRate": 0.99
        },
        "alpha_vantage": {
          "status": "healthy",
          "responseTime": 320,
          "successRate": 0.97
        },
        "cal_com": {
          "status": "healthy",
          "responseTime": 95,
          "successRate": 1.0
        }
      }
    },
    "uptime": "99.95%",
    "lastIncident": "2024-01-10T02:15:00Z"
  },
  "timestamp": 1640995200
}
```

### 5. Document & Newsletter Management

#### Newsletter Subscription

```typescript
POST /api/newsletter/subscribe

// Request Body
{
  "email": "investor@company.co.kr",
  "name": "정투자자",
  "company": "(주)투자회사",
  "interests": ["succession_planning", "tax_optimization", "m_and_a"],
  "language": "ko",
  "source": "website_form"
}

// Response
{
  "success": true,
  "data": {
    "subscriptionId": "sub_abc123",
    "email": "investor@company.co.kr",
    "status": "confirmed",
    "subscribedAt": "2024-01-15T10:30:00Z",
    "preferences": {
      "frequency": "weekly",
      "topics": ["succession_planning", "tax_optimization", "m_and_a"],
      "format": "html"
    }
  },
  "timestamp": 1640995200
}
```

#### Document Generation

```typescript
POST /api/docs

// Request Body
{
  "documentType": "succession_plan_summary",
  "userId": "user_123",
  "parameters": {
    "companyName": "(주)한국기업",
    "businessValue": 3000000000,
    "ownershipPercentage": 80,
    "timeframe": "7_years",
    "includeCharts": true,
    "language": "ko"
  }
}

// Response
{
  "success": true,
  "data": {
    "documentId": "doc_def456",
    "downloadUrl": "https://familyoffices.vip/documents/doc_def456.pdf",
    "expiresAt": "2024-01-22T10:30:00Z",
    "metadata": {
      "pages": 15,
      "fileSize": 2048576,
      "format": "PDF",
      "watermarked": true
    }
  },
  "timestamp": 1640995200
}
```

## Error Handling

### Standard Error Response Format

```typescript
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional technical details",
    "timestamp": 1640995200,
    "requestId": "req_abc123"
  }
}
```

### Common Error Codes

```typescript
// Authentication Errors
UNAUTHORIZED: 'Authentication required';
FORBIDDEN: 'Insufficient permissions';
INVALID_TOKEN: 'Invalid or expired token';

// Validation Errors
VALIDATION_ERROR: 'Request validation failed';
INVALID_PARAMETER: 'Invalid parameter value';
MISSING_REQUIRED_FIELD: 'Required field missing';

// Rate Limiting
RATE_LIMIT_EXCEEDED: 'Too many requests';
QUOTA_EXCEEDED: 'API quota exceeded';

// External Service Errors
EXTERNAL_API_ERROR: 'External service unavailable';
FINANCIAL_DATA_UNAVAILABLE: 'Financial data service error';
BOOKING_SERVICE_ERROR: 'Booking service unavailable';

// Business Logic Errors
INSUFFICIENT_DATA: 'Insufficient data for calculation';
INVALID_BUSINESS_SCENARIO: 'Invalid business scenario';
CALCULATION_ERROR: 'Calculation failed';

// System Errors
INTERNAL_SERVER_ERROR: 'Internal server error';
DATABASE_ERROR: 'Database connection failed';
CACHE_ERROR: 'Cache service unavailable';
```

## WebSocket Real-Time APIs

### Financial Data Streaming

```typescript
// WebSocket Connection
wss://familyoffices.vip/ws/financial

// Subscribe to Korean Market Updates
{
  "action": "subscribe",
  "channel": "korean_market",
  "symbols": ["005930.KS", "000660.KS", "035420.KS"]
}

// Real-time Price Updates
{
  "channel": "korean_market",
  "data": {
    "symbol": "005930.KS",
    "price": 73750,
    "change": 250,
    "changePercent": 0.34,
    "volume": 2150000,
    "timestamp": "2024-01-15T15:45:00+09:00"
  }
}
```

### Portfolio Updates

```typescript
// Subscribe to Portfolio Changes
{
  "action": "subscribe",
  "channel": "portfolio_updates",
  "userId": "user_123"
}

// Portfolio Value Update
{
  "channel": "portfolio_updates",
  "data": {
    "portfolioId": "portfolio_abc",
    "totalValue": 1275000000,
    "change": 15000000,
    "changePercent": 1.19,
    "updatedAt": "2024-01-15T15:45:00+09:00",
    "trigger": "market_movement"
  }
}
```

## SDK & Client Libraries

### JavaScript/TypeScript SDK

```typescript
import { FamilyOfficeClient } from '@familyoffice-s/sdk';

const client = new FamilyOfficeClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://familyoffices.vip/api',
  timeout: 10000,
});

// Financial Data
const koreanStocks = await client.financial.getKoreanMarketData({
  symbols: ['005930.KS', '000660.KS'],
  refresh: false,
});

// Tax Optimization
const taxAnalysis = await client.financial.calculateTaxOptimization({
  scenario: 'business_succession',
  businessValue: 5000000000,
  ownershipPercentage: 75,
});

// Booking Management
const booking = await client.booking.createConsultation({
  eventType: 'succession_planning',
  startTime: '2024-01-20T14:00:00+09:00',
  attendee: {
    name: '김대표',
    email: 'ceo@company.co.kr',
  },
});
```

## Rate Limiting & Quotas

### Rate Limits by Endpoint Category

```typescript
// Financial Data APIs
- Korean Market: 120 requests/minute
- Global Stocks: 100 requests/minute
- Forex Rates: 60 requests/minute
- Tax Calculator: 30 requests/minute

// User Management APIs
- Profile Updates: 10 requests/minute
- Admin Operations: 50 requests/minute

// Booking APIs
- Create Booking: 5 requests/minute
- View Bookings: 30 requests/minute

// Document APIs
- Generate Document: 3 requests/minute
- Download Document: 20 requests/minute
```

### Headers for Rate Limiting

```typescript
X-RateLimit-Limit: 100        // Requests allowed per minute
X-RateLimit-Remaining: 85     // Requests remaining in current window
X-RateLimit-Reset: 1640995260 // Unix timestamp when rate limit resets
X-RateLimit-Retry-After: 45   // Seconds to wait before retrying (when rate limited)
```

This comprehensive API reference provides developers with all the necessary information to integrate with FamilyOffice S services efficiently and securely.
