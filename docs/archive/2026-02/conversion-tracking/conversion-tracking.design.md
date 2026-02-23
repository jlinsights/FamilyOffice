# Conversion Tracking Design Document

> **Summary**: Technical design for unified 6-stage conversion funnel tracking with hybrid client/server event collection, Supabase storage, and admin dashboard
>
> **Project**: FamilyOffice S (familyoffice-s)
> **Version**: 0.1.2
> **Author**: jaehong
> **Date**: 2026-02-24
> **Status**: Draft
> **Planning Doc**: [conversion-tracking.plan.md](../01-plan/features/conversion-tracking.plan.md)

### Pipeline References

| Phase | Document | Status |
|-------|----------|--------|
| Phase 1 | Schema Definition | N/A (inline below) |
| Phase 2 | Coding Conventions | N/A (follows CLAUDE.md) |
| Phase 3 | Mockup | N/A (admin dashboard wireframe below) |
| Phase 4 | API Spec | Inline below |

---

## 1. Overview

### 1.1 Design Goals

1. **Single source of truth** for conversion data (replace 5 fragmented tracking systems)
2. **Server-first reliability** - form submissions and webhooks never lost, client events are enhancement
3. **Zero-impact on UX** - all tracking is non-blocking, async, invisible to users
4. **Bridge to existing LeadScoringSystem** - enrich lead scores with funnel stage data
5. **Admin-actionable** - dashboard answers "what converts?" within 2 clicks

### 1.2 Design Principles

- **Server-side as primary**: Ad blockers can't block API route handlers or webhooks
- **Typed events with Zod**: Matches existing StructureCheckRequestForm pattern (already uses zod + react-hook-form)
- **Additive, not destructive**: New `conversion_events` table alongside existing `lead_scores` / `lead_activities`
- **Feature-flagged rollout**: `CONVERSION_TRACKING_ENABLED` env var for safe deployment

---

## 2. Architecture

### 2.1 Component Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                                │
│                                                                      │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────────┐  │
│  │ useConversion    │  │ ConsultationForm │  │ StructureCheck     │  │
│  │ Tracking (hook)  │  │ (enhanced)       │  │ RequestForm        │  │
│  │                  │  │                  │  │ (enhanced)         │  │
│  │ - page_view      │  │ - form_submit    │  │ - form_submit      │  │
│  │ - engagement     │  │   (server-side)  │  │   (server-side)    │  │
│  │ - scroll_depth   │  │                  │  │                    │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬───────────┘  │
│           │                     │                      │             │
└───────────┼─────────────────────┼──────────────────────┼─────────────┘
            │                     │                      │
            ▼                     ▼                      ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         SERVER (Next.js API)                          │
│                                                                      │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────────┐  │
│  │ POST /api/      │  │ POST /api/       │  │ POST /api/cal-com/ │  │
│  │ analytics/events│  │ structure-check  │  │ webhook            │  │
│  │                 │  │ (existing+hook)  │  │ (enhanced)         │  │
│  └────────┬────────┘  └────────┬─────────┘  └────────┬───────────┘  │
│           │                     │                      │             │
│           ▼                     ▼                      ▼             │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │              ConversionTrackingService                        │    │
│  │                                                              │    │
│  │  - recordEvent(event)     → conversion_events table          │    │
│  │  - advanceFunnelStage()   → conversion_funnel table          │    │
│  │  - syncToLeadScoring()    → lead_scores / lead_activities    │    │
│  │  - getFunnelMetrics()     → admin dashboard queries          │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌─────────────────┐                                                │
│  │ Admin Dashboard  │  GET /api/admin/analytics/funnel              │
│  │ /admin/analytics │  GET /api/admin/analytics/attribution         │
│  │ /funnel          │  GET /api/admin/leads/[id]/stage (PUT)        │
│  └─────────────────┘                                                │
└──────────────────────────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         SUPABASE (PostgreSQL)                         │
│                                                                      │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────────┐  │
│  │ conversion_     │  │ conversion_      │  │ lead_scores        │  │
│  │ events          │  │ funnel           │  │ (existing)         │  │
│  │ (NEW)           │  │ (NEW)            │  │                    │  │
│  └─────────────────┘  └──────────────────┘  └────────────────────┘  │
│                                                                      │
│  ┌─────────────────┐                                                │
│  │ conversion_     │                                                │
│  │ daily_stats     │                                                │
│  │ (materialized)  │                                                │
│  └─────────────────┘                                                │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

```
[Client Event] ─── POST /api/analytics/events ──┐
                                                 │
[Form Submit]  ─── POST /api/structure-check ────┤
               ─── POST /api/consultation ───────┤
                                                 ▼
                                    ConversionTrackingService
                                         │
                              ┌──────────┼──────────┐
                              ▼          ▼          ▼
                     conversion_   conversion_   lead_scores
                     events        funnel        (bridge)
                                         │
                                         ▼
                              conversion_daily_stats
                              (cron aggregation)
                                         │
                                         ▼
                              Admin Dashboard Query
```

### 2.3 Dependencies

| Component | Depends On | Purpose |
|-----------|-----------|---------|
| `useConversionTracking` | `/api/analytics/events` | Client-side event dispatch |
| `ConversionTrackingService` | Supabase admin client | Server-side event storage + funnel logic |
| Form enhancements | `ConversionTrackingService` | Auto-track form submissions |
| Cal.com webhook handler | `ConversionTrackingService` | Capture booking events |
| Admin funnel dashboard | `/api/admin/analytics/funnel` | Visualize conversion data |
| `/api/admin/analytics/funnel` | `ConversionTrackingService.getFunnelMetrics()` | Query aggregated data |

---

## 3. Data Model

### 3.1 Entity Definitions

```typescript
// lib/conversion/types.ts

import { z } from 'zod';

// === Funnel Stages ===
export const FunnelStage = z.enum([
  'visit',
  'engaged',
  'lead',
  'consultation_booked',
  'consultation_done',
  'client',
]);
export type FunnelStage = z.infer<typeof FunnelStage>;

// === Event Types ===
export const ConversionEventType = z.enum([
  // Stage 1: Visit
  'page_view',
  'session_start',
  // Stage 2: Engaged
  'scroll_depth',
  'time_on_site',
  'multi_page_view',
  // Stage 3: Lead
  'consultation_form_submit',
  'structure_check_submit',
  'newsletter_signup',
  // Stage 4: Consultation Booked
  'calcom_booking_created',
  // Stage 5: Consultation Done
  'consultation_completed',
  // Stage 6: Client
  'client_converted',
  // Attribution
  'cta_click',
]);
export type ConversionEventType = z.infer<typeof ConversionEventType>;

// === Event Payload (client → server) ===
export const ConversionEventPayload = z.object({
  event_type: ConversionEventType,
  // Anonymous session ID (not PII)
  session_id: z.string().uuid(),
  // Page context
  page_path: z.string().max(500),
  page_title: z.string().max(200).optional(),
  referrer: z.string().max(1000).optional(),
  // Attribution
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  // Event-specific metadata (no PII on client-side)
  metadata: z.record(z.unknown()).optional(),
  // Timestamp (client-side, validated server-side)
  client_timestamp: z.string().datetime().optional(),
});
export type ConversionEventPayload = z.infer<typeof ConversionEventPayload>;

// === Server-side enriched event ===
export interface ConversionEvent {
  id: string;
  session_id: string;
  event_type: ConversionEventType;
  funnel_stage: FunnelStage;
  page_path: string;
  page_title?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  metadata?: Record<string, unknown>;
  // Server-side only (PII for leads)
  email?: string;
  lead_id?: string;
  ip_hash?: string;
  user_agent?: string;
  created_at: string;
}

// === Funnel Record (one per visitor/lead journey) ===
export interface ConversionFunnel {
  id: string;
  session_id: string;
  email?: string;           // Set when visitor becomes lead
  lead_id?: string;         // Bridge to lead_scores
  current_stage: FunnelStage;
  // Stage timestamps (null = not reached)
  visited_at: string;
  engaged_at?: string;
  lead_at?: string;
  consultation_booked_at?: string;
  consultation_done_at?: string;
  client_at?: string;
  // Attribution (first-touch)
  first_utm_source?: string;
  first_utm_medium?: string;
  first_utm_campaign?: string;
  first_landing_page?: string;
  first_referrer?: string;
  // Metadata
  total_events: number;
  total_page_views: number;
  created_at: string;
  updated_at: string;
}

// === Admin Dashboard Types ===
export interface FunnelMetrics {
  period: { start: string; end: string };
  stages: {
    stage: FunnelStage;
    count: number;
    conversion_rate: number; // % from previous stage
  }[];
  total_visitors: number;
  total_clients: number;
  overall_conversion_rate: number;
}

export interface AttributionMetrics {
  source: string;
  visitors: number;
  leads: number;
  clients: number;
  conversion_rate: number;
}
```

### 3.2 Entity Relationships

```
[conversion_events] N ──── 1 [conversion_funnel] (via session_id)
                                    │
[conversion_funnel]  1 ──── 0..1   [lead_scores] (via lead_id/email)
                                    │
[lead_scores]        1 ──── N      [lead_activities] (existing)
```

### 3.3 Database Schema

```sql
-- Migration: create_conversion_tracking_tables

-- 1. Raw event log (append-only)
CREATE TABLE conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  funnel_stage TEXT NOT NULL DEFAULT 'visit',
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  -- Attribution
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  -- Server-side enrichment (PII)
  email TEXT,
  lead_id UUID REFERENCES lead_scores(id),
  ip_hash TEXT,
  user_agent TEXT,
  -- Flexible metadata
  metadata JSONB DEFAULT '{}',
  -- Timestamps
  client_timestamp TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_conversion_events_session ON conversion_events(session_id);
CREATE INDEX idx_conversion_events_type ON conversion_events(event_type);
CREATE INDEX idx_conversion_events_stage ON conversion_events(funnel_stage);
CREATE INDEX idx_conversion_events_created ON conversion_events(created_at);
CREATE INDEX idx_conversion_events_email ON conversion_events(email) WHERE email IS NOT NULL;

-- 2. Funnel journey tracker (one per visitor journey)
CREATE TABLE conversion_funnel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE NOT NULL,
  email TEXT,
  lead_id UUID REFERENCES lead_scores(id),
  current_stage TEXT NOT NULL DEFAULT 'visit',
  -- Stage timestamps
  visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  engaged_at TIMESTAMPTZ,
  lead_at TIMESTAMPTZ,
  consultation_booked_at TIMESTAMPTZ,
  consultation_done_at TIMESTAMPTZ,
  client_at TIMESTAMPTZ,
  -- First-touch attribution
  first_utm_source TEXT,
  first_utm_medium TEXT,
  first_utm_campaign TEXT,
  first_landing_page TEXT,
  first_referrer TEXT,
  -- Counters
  total_events INTEGER DEFAULT 0,
  total_page_views INTEGER DEFAULT 0,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversion_funnel_stage ON conversion_funnel(current_stage);
CREATE INDEX idx_conversion_funnel_email ON conversion_funnel(email) WHERE email IS NOT NULL;
CREATE INDEX idx_conversion_funnel_created ON conversion_funnel(created_at);

-- 3. Daily aggregation table (populated by cron)
CREATE TABLE conversion_daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  stage TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  -- Attribution breakdown
  utm_source TEXT,
  utm_medium TEXT,
  -- Conversion rates (from previous stage)
  conversion_rate NUMERIC(5,2),
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, stage, utm_source, utm_medium)
);

CREATE INDEX idx_daily_stats_date ON conversion_daily_stats(date);

-- 4. RLS policies (admin-only read, service-role write)
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_funnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_daily_stats ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (used by ConversionTrackingService)
-- No public access - all writes go through API routes with service role
```

---

## 4. API Specification

### 4.1 Endpoint List

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/analytics/events` | Ingest client-side events | None (rate-limited) |
| GET | `/api/admin/analytics/funnel` | Get funnel metrics | Admin |
| GET | `/api/admin/analytics/attribution` | Get attribution data | Admin |
| PUT | `/api/admin/leads/[id]/stage` | Manually advance funnel stage | Admin |
| GET | `/api/admin/analytics/export` | Export CSV | Admin |

### 4.2 Detailed Specifications

#### `POST /api/analytics/events`

Public endpoint, rate-limited (100 req/min per IP).

**Request:**
```json
{
  "event_type": "page_view",
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "page_path": "/solutions/succession",
  "page_title": "가업승계 솔루션",
  "referrer": "https://google.com",
  "utm_source": "google",
  "utm_medium": "organic",
  "metadata": { "scroll_depth": 75 },
  "client_timestamp": "2026-02-24T10:30:00Z"
}
```

**Response (202 Accepted):**
```json
{ "ok": true }
```

**Error Responses:**
- `400`: Zod validation failure
- `429`: Rate limit exceeded
- `503`: Tracking disabled (feature flag off)

**Implementation Notes:**
- Non-blocking: respond 202 immediately, process async
- Server enrichment: add `ip_hash`, `user_agent` from request headers
- Auto-detect funnel stage from `event_type`
- Batch-friendly: accept array of events (max 20)

#### `GET /api/admin/analytics/funnel`

**Query params:**
- `start_date` (required): ISO date string
- `end_date` (required): ISO date string
- `utm_source` (optional): Filter by source

**Response (200):**
```json
{
  "period": { "start": "2026-02-01", "end": "2026-02-24" },
  "stages": [
    { "stage": "visit", "count": 3240, "conversion_rate": 100 },
    { "stage": "engaged", "count": 1620, "conversion_rate": 50.0 },
    { "stage": "lead", "count": 89, "conversion_rate": 5.5 },
    { "stage": "consultation_booked", "count": 23, "conversion_rate": 25.8 },
    { "stage": "consultation_done", "count": 18, "conversion_rate": 78.3 },
    { "stage": "client", "count": 7, "conversion_rate": 38.9 }
  ],
  "total_visitors": 3240,
  "total_clients": 7,
  "overall_conversion_rate": 0.22
}
```

#### `PUT /api/admin/leads/[id]/stage`

Manual stage advancement (for stages 5-6 that require human input).

**Request:**
```json
{
  "stage": "client",
  "notes": "계약 완료 - 가업승계 종합 패키지",
  "metadata": { "service_type": "succession", "value_tier": "premium" }
}
```

**Response (200):**
```json
{
  "funnel_id": "uuid",
  "previous_stage": "consultation_done",
  "current_stage": "client",
  "updated_at": "2026-02-24T11:00:00Z"
}
```

---

## 5. UI/UX Design

### 5.1 Admin Funnel Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│  분석 대시보드  >  전환 퍼널                    [기간 선택 ▼]   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐ │
│  │ 방문  │→│ 참여  │→│ 리드  │→│ 상담  │→│ 완료  │→│ 고객  │ │
│  │ 3240 │  │ 1620 │  │  89  │  │  23  │  │  18  │  │   7  │ │
│  │ 100% │  │  50% │  │ 5.5% │  │  26% │  │  78% │  │  39% │ │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘ │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  유입 채널 (Attribution)              │  최근 전환 이벤트       │
│  ┌──────────────────────────────┐    │  ┌────────────────────┐ │
│  │ Google Organic    1240  38%  │    │  │ kim@co.kr → 상담예약│ │
│  │ Direct            890   27%  │    │  │ lee@co.kr → 리드    │ │
│  │ Kakao             450   14%  │    │  │ park@co.kr → 고객   │ │
│  │ Newsletter        320   10%  │    │  │ ...                 │ │
│  │ Referral          340   11%  │    │  │                     │ │
│  └──────────────────────────────┘    │  └────────────────────┘ │
│                                       │                        │
├───────────────────────────────────────┴────────────────────────┤
│  [CSV 내보내기]                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 5.2 User Flow (Admin)

```
/admin → /admin/analytics → Funnel Tab → Select Date Range → View Metrics
                                      → Attribution Tab → View by Source
                                      → Click Lead → /admin/leads/[id] → Advance Stage
```

### 5.3 Component List

| Component | Location | Responsibility |
|-----------|----------|----------------|
| `FunnelChart` | `components/admin/analytics/funnel-chart.tsx` | Visual funnel with stage counts and rates |
| `AttributionTable` | `components/admin/analytics/attribution-table.tsx` | Source-based conversion breakdown |
| `RecentConversions` | `components/admin/analytics/recent-conversions.tsx` | Live feed of recent stage transitions |
| `FunnelDatePicker` | `components/admin/analytics/funnel-date-picker.tsx` | Date range selector for metrics |
| `StageAdvanceDialog` | `components/admin/analytics/stage-advance-dialog.tsx` | Manual stage promotion with notes |

---

## 6. Error Handling

### 6.1 Error Strategy by Layer

| Layer | Strategy | Rationale |
|-------|----------|-----------|
| Client-side hook | **Silent fail** - log to console only | Tracking must never break user experience |
| Event ingestion API | **Accept and log** - 202 even if DB write queued | Non-blocking; batch retry on failure |
| Cal.com webhook | **Retry with logging** - return 200 to Cal.com, queue retry internally | Prevent Cal.com from disabling webhook |
| Admin API | **Standard error** - 4xx/5xx with error body | Admin expects explicit errors |
| Funnel stage transition | **Validate + reject** - only forward transitions allowed | Data integrity for funnel metrics |

### 6.2 Error Response Format

```json
{
  "error": {
    "code": "INVALID_STAGE_TRANSITION",
    "message": "Cannot move from 'visit' to 'client' - intermediate stages required",
    "details": {
      "current_stage": "visit",
      "requested_stage": "client",
      "allowed_next": ["engaged"]
    }
  }
}
```

---

## 7. Security Considerations

- [x] **Input validation**: All event payloads validated with Zod schemas
- [x] **No PII in client payloads**: session_id is UUID, no email/phone client-side
- [x] **Rate limiting**: `/api/analytics/events` at 100 req/min per IP (uses existing `globalRateLimit`)
- [x] **Admin auth**: All `/api/admin/*` routes protected by Clerk + admin email check
- [x] **IP hashing**: Store `SHA-256(ip + daily_salt)` not raw IP
- [x] **Cal.com webhook validation**: `CALCOM_WEBHOOK_SECRET` signature verification
- [x] **RLS**: Supabase tables locked; only service role writes
- [x] **KPIPA compliance**: Email only stored server-side with form consent checkbox

---

## 8. Test Plan

### 8.1 Test Scope

| Type | Target | Tool |
|------|--------|------|
| Unit Test | ConversionTrackingService, Zod schemas, stage transition logic | Vitest |
| Integration Test | API endpoints (event ingestion, funnel query, stage advance) | Playwright API testing |
| E2E Test | Full form submission → event in DB → dashboard display | Playwright |

### 8.2 Test Cases (Key)

- [x] Happy path: page_view event → stored in conversion_events → funnel record created
- [x] Happy path: form submission → lead stage → funnel updated → lead_scores synced
- [x] Happy path: Cal.com webhook → consultation_booked stage
- [x] Happy path: Admin advances stage → funnel dashboard reflects change
- [x] Error: Invalid event_type rejected with 400
- [x] Error: Stage can only move forward (visit→client rejected)
- [x] Error: Rate limit exceeded returns 429
- [x] Edge case: Duplicate session_id upserts funnel (no duplicates)
- [x] Edge case: Ad blocker blocks client hook → server-side form tracking still works
- [x] Privacy: Client-side payload contains no email/phone fields

---

## 9. Clean Architecture

### 9.1 Layer Structure

| Layer | Responsibility | Location |
|-------|---------------|----------|
| **Presentation** | Admin dashboard components, tracking hook | `components/admin/analytics/`, `hooks/` |
| **Application** | ConversionTrackingService (orchestration) | `lib/conversion/service.ts` |
| **Domain** | Types, schemas, stage transition rules | `lib/conversion/types.ts`, `lib/conversion/stages.ts` |
| **Infrastructure** | Supabase queries, API routes | `lib/conversion/repository.ts`, `app/api/` |

### 9.2 Dependency Rules

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  components/admin/analytics/*  ──→ lib/conversion/service.ts    │
│           (Presentation)              (Application)             │
│                                           │                     │
│  hooks/useConversionTracking.ts ──→ lib/conversion/types.ts     │
│           (Presentation)              (Domain)                  │
│                                           ▲                     │
│                                           │                     │
│  lib/conversion/repository.ts ────────────┘                     │
│           (Infrastructure)                                      │
│                                                                 │
│  app/api/analytics/events/route.ts ──→ service.ts ──→ types.ts  │
│           (Infrastructure)              (App)         (Domain)  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.4 This Feature's Layer Assignment

| Component | Layer | Location |
|-----------|-------|----------|
| `FunnelChart`, `AttributionTable` | Presentation | `components/admin/analytics/` |
| `useConversionTracking` | Presentation | `hooks/use-conversion-tracking.ts` |
| `ConversionTrackingService` | Application | `lib/conversion/service.ts` |
| `FunnelStage`, `ConversionEventPayload` | Domain | `lib/conversion/types.ts` |
| `stageTransitionRules` | Domain | `lib/conversion/stages.ts` |
| `ConversionRepository` | Infrastructure | `lib/conversion/repository.ts` |
| `POST /api/analytics/events` | Infrastructure | `app/api/analytics/events/route.ts` |
| `GET /api/admin/analytics/funnel` | Infrastructure | `app/api/admin/analytics/funnel/route.ts` |

---

## 10. Coding Convention Reference

### 10.1 Naming Conventions (Feature-Specific)

| Target | Rule | Example |
|--------|------|---------|
| Event types | `snake_case` | `page_view`, `consultation_form_submit` |
| Funnel stages | `snake_case` | `consultation_booked`, `consultation_done` |
| Components | PascalCase | `FunnelChart`, `AttributionTable` |
| Hooks | camelCase with `use` prefix | `useConversionTracking` |
| API routes | kebab-case dirs | `app/api/analytics/events/route.ts` |
| DB tables | `snake_case` | `conversion_events`, `conversion_funnel` |
| DB columns | `snake_case` | `funnel_stage`, `utm_source` |
| Zod schemas | PascalCase | `ConversionEventPayload`, `FunnelStage` |

### 10.2 Import Order

```typescript
// 1. External
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

// 2. Internal absolute
import { createAdminClient } from '@/lib/supabase/admin-client';
import { ConversionTrackingService } from '@/lib/conversion/service';

// 3. Relative
import { stageTransitionRules } from './stages';

// 4. Types
import type { ConversionEvent, FunnelStage } from '@/lib/conversion/types';
```

### 10.3 Environment Variables

| Prefix | Purpose | Scope | Example |
|--------|---------|-------|---------|
| (none) | Feature flag | Server | `CONVERSION_TRACKING_ENABLED=true` |
| (none) | Webhook secret | Server | `CALCOM_WEBHOOK_SECRET=whsec_...` |
| `NEXT_PUBLIC_` | GA forwarding | Client | `NEXT_PUBLIC_GA_MEASUREMENT_ID` (existing) |

### 10.4 This Feature's Conventions

| Item | Convention Applied |
|------|-------------------|
| Component naming | PascalCase, co-located in `components/admin/analytics/` |
| File organization | Feature module: `lib/conversion/{types,stages,service,repository}.ts` |
| State management | Server Components for dashboard; hook for client tracking |
| Error handling | Silent client-side; logged server-side; explicit admin errors |
| Form integration | Add tracking call after existing form submit logic (non-breaking) |

---

## 11. Implementation Guide

### 11.1 File Structure

```
lib/conversion/
├── types.ts              # Zod schemas, TypeScript types
├── stages.ts             # Stage transition rules, stage detection from event types
├── service.ts            # ConversionTrackingService class
└── repository.ts         # Supabase queries (CRUD for events, funnel, stats)

hooks/
└── use-conversion-tracking.ts  # Client-side tracking hook

app/api/analytics/
└── events/
    └── route.ts          # POST - event ingestion

app/api/admin/analytics/
├── funnel/
│   └── route.ts          # GET - funnel metrics
├── attribution/
│   └── route.ts          # GET - attribution data
└── export/
    └── route.ts          # GET - CSV export

app/api/admin/leads/[id]/stage/
└── route.ts              # PUT - manual stage advance

components/admin/analytics/
├── funnel-chart.tsx       # Funnel visualization
├── attribution-table.tsx  # Source breakdown table
├── recent-conversions.tsx # Live event feed
├── funnel-date-picker.tsx # Date range selector
└── stage-advance-dialog.tsx # Manual stage promotion

supabase/migrations/
└── YYYYMMDD_create_conversion_tracking.sql
```

### 11.2 Implementation Order

1. [ ] **Domain layer**: `lib/conversion/types.ts` + `lib/conversion/stages.ts`
2. [ ] **Database**: Supabase migration (3 tables + indexes + RLS)
3. [ ] **Infrastructure**: `lib/conversion/repository.ts`
4. [ ] **Application**: `lib/conversion/service.ts`
5. [ ] **Event API**: `app/api/analytics/events/route.ts`
6. [ ] **Client hook**: `hooks/use-conversion-tracking.ts`
7. [ ] **Form integration**: Enhance ConsultationForm + StructureCheckRequestForm
8. [ ] **Cal.com webhook**: Enhance existing cal-com webhook handler
9. [ ] **Admin APIs**: funnel + attribution + export + stage advance
10. [ ] **Admin dashboard**: Funnel tab in existing `/admin/analytics` page
11. [ ] **LeadScoring bridge**: Sync funnel stage → `lead_scores`
12. [ ] **Replace analytics.ts**: Deprecate old `lib/analytics.ts`

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-02-24 | Initial design from plan document | jaehong |
