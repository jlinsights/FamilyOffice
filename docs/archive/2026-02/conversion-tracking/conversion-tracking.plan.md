# Conversion Tracking Planning Document

> **Summary**: End-to-end conversion funnel tracking from first visit to paid client, replacing fragmented analytics with a unified pipeline
>
> **Project**: FamilyOffice S (familyoffice-s)
> **Version**: 0.1.2
> **Author**: jaehong
> **Date**: 2026-02-24
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose

Track the complete conversion funnel: **Visit -> Engagement -> Lead -> Consultation -> Client**. Currently the platform has fragmented tracking (GA4 gtag, localStorage analytics, lead scoring system, SEO tracker, Kakao business API) with no unified view of which channels and touchpoints produce paying clients.

### 1.2 Background

The 3-agent exploration revealed a critical gap: **no evidence that web leads convert to paying clients**. The devil's advocate flagged this as Risk #1 (Channel Mismatch), the UX analyst found post-diagnosis journey gaps, and the architect confirmed scattered analytics infrastructure.

**Current state of tracking**:
- `lib/analytics.ts`: Basic gtag wrapper + localStorage (dev-only debug)
- `lib/lead-scoring-system.ts`: BMAD-stage lead scoring with Supabase (sophisticated but disconnected from revenue)
- `lib/analytics/seo-tracker.ts`: SEO-focused conversion rate tracking (traffic metrics, not business outcomes)
- `lib/kakao/business-api.ts`: Kakao conversion tracking (channel-specific)
- `lib/korean-performance-monitor.ts`: Performance metrics with conversion event counting
- GA4 via `window.gtag`: Client-side event tracking (no server-side validation)

**The gap**: None of these systems answer: "How many website visitors become paying clients, and through which path?"

### 1.3 Related Documents

- Team Analysis: `docs/ARCHITECTURE-REVIEW-2025.md`
- Lead Scoring: `lib/lead-scoring-system.ts`
- Existing Analytics: `lib/analytics.ts`, `lib/analytics/seo-tracker.ts`

---

## 2. Scope

### 2.1 In Scope

- [ ] Define canonical funnel stages with clear stage transitions
- [ ] Unified event tracking API (server-side + client-side)
- [ ] Funnel stage tracking: Visit -> Engagement -> Lead -> Consultation Booked -> Consultation Done -> Client
- [ ] Attribution: which page/channel/CTA drove each conversion
- [ ] Admin dashboard: funnel visualization with conversion rates per stage
- [ ] Integration with existing lead scoring system (BMAD stages)
- [ ] Form submission tracking (ConsultationForm, StructureCheckRequestForm, newsletter)
- [ ] Cal.com booking event capture

### 2.2 Out of Scope

- Revenue/LTV tracking (requires billing system integration)
- A/B testing framework (separate feature)
- Predictive analytics / ML models
- Third-party analytics tool migration (keep GA4 as-is)
- Kakao/Naver ad platform deep integration
- Historical data backfill

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | Define 6 funnel stages with clear entry/exit criteria | High | Pending |
| FR-02 | Server-side event ingestion API (`/api/analytics/events`) | High | Pending |
| FR-03 | Client-side event tracking hook (`useConversionTracking`) | High | Pending |
| FR-04 | Automatic form submission tracking (ConsultationForm, StructureCheckForm) | High | Pending |
| FR-05 | Cal.com webhook capture for "consultation booked" events | High | Pending |
| FR-06 | UTM parameter capture and persistence across sessions | Medium | Pending |
| FR-07 | Admin funnel dashboard with stage-by-stage conversion rates | Medium | Pending |
| FR-08 | Bridge to existing LeadScoringSystem (BMAD stage sync) | Medium | Pending |
| FR-09 | Daily/weekly conversion summary email to admin | Low | Pending |
| FR-10 | Export conversion data as CSV from admin panel | Low | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Performance | Event ingestion < 50ms (non-blocking) | Server-side latency logging |
| Reliability | Zero event loss for form submissions | Supabase row count vs. form submit count |
| Privacy | No PII in client-side events, KPIPA compliance | Code review + audit |
| Scale | Handle 10K events/day without degradation | Load testing with Playwright |
| Data Retention | 12 months rolling, aggregated after 90 days | Cron job validation |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] All 6 funnel stages tracked with events flowing to Supabase
- [ ] Admin can view funnel conversion rates per week/month
- [ ] Form submissions (consultation, structure-check, newsletter) auto-tracked
- [ ] Cal.com booking events captured via webhook
- [ ] UTM attribution persisted across page navigations
- [ ] Existing LeadScoringSystem receives stage transition events
- [ ] TypeScript types cover all event schemas
- [ ] Zero lint/typecheck errors

### 4.2 Quality Criteria

- [ ] Event tracking adds < 5ms to page load (non-blocking)
- [ ] Admin dashboard loads in < 2s
- [ ] All API endpoints have error handling and rate limiting
- [ ] Privacy: no email/phone in client-side tracking payloads

### 4.3 North Star Metric

**Answer this question within 2 weeks of deployment**: "What percentage of website visitors book a consultation, and what percentage of consultations become paying clients?"

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Cal.com webhook unreliable | High - miss consultation bookings | Medium | Fallback: poll Cal.com API daily; dead letter queue for failed webhooks |
| Event volume overwhelms Supabase | Medium - data loss or latency | Low | Batch inserts, rate limiting, memory buffer with flush |
| Client-side tracking blocked by ad blockers | Medium - incomplete data | High | Server-side tracking as primary; client-side as enhancement only |
| Privacy compliance (KPIPA) | High - legal risk | Medium | Anonymize client-side events; PII only in server-side with consent |
| Existing analytics.ts conflicts | Low - duplicate events | Medium | Deprecate `lib/analytics.ts` localStorage approach; unify under new system |
| Admin dashboard performance with large datasets | Medium - slow UX | Low | Aggregation tables, pagination, date-range filtering |

---

## 6. Architecture Considerations

### 6.1 Project Level Selection

| Level | Characteristics | Recommended For | Selected |
|-------|-----------------|-----------------|:--------:|
| **Starter** | Simple structure | Static sites | |
| **Dynamic** | Feature-based modules, services layer | Web apps with backend, SaaS MVPs | :white_check_mark: |
| **Enterprise** | Strict layer separation, DI, microservices | High-traffic systems | |

### 6.2 Key Architectural Decisions

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| Event Storage | Supabase / Separate analytics DB / Third-party | Supabase | Already in stack, lead_scores table exists, admin can query directly |
| Tracking Method | Client-only / Server-only / Hybrid | Hybrid | Server-side for reliability (forms, webhooks); client-side for engagement signals |
| Event Schema | Freeform JSON / Typed events / Both | Typed events with Zod | Matches project pattern (StructureCheckForm already uses Zod) |
| Admin Dashboard | New page / Extend existing admin | Extend `/admin/analytics` | Admin analytics page already exists |
| State Management | Cookie / localStorage / Server session | Cookie (httpOnly) + Supabase | UTM persistence across pages; server-side for funnel state |
| Integration Pattern | Replace analytics.ts / Wrap it / Parallel | Replace | Current analytics.ts is minimal (32 lines); clean replacement preferred |

### 6.3 Funnel Stage Architecture

```
Stage 1: VISIT
  Trigger: First page view (no prior session)
  Data: UTM params, referrer, landing page, device

Stage 2: ENGAGED
  Trigger: 2+ page views OR 60s+ on site OR scroll >50%
  Data: Pages viewed, time on site, content interests

Stage 3: LEAD
  Trigger: Form submission (consultation, structure-check, newsletter)
  Data: Form type, service interest, contact info (server-side only)

Stage 4: CONSULTATION_BOOKED
  Trigger: Cal.com booking confirmed (webhook)
  Data: Booking date, consultation type, advisor

Stage 5: CONSULTATION_DONE
  Trigger: Manual admin update OR Cal.com post-event webhook
  Data: Outcome notes, follow-up actions

Stage 6: CLIENT
  Trigger: Manual admin update (contract signed)
  Data: Service type, contract date, value tier
```

### 6.4 Data Flow

```
Client Browser                    Server                         Supabase
─────────────                    ──────                         ────────
page_view event ──────────→ POST /api/analytics/events ──→ conversion_events table
form_submit event ─────────→ POST /api/analytics/events ──→ conversion_events table
                                                           ──→ lead_scores table (sync)
                   Cal.com webhook ──→ POST /api/cal-com/webhook ──→ conversion_events
                   Admin action ───→ PUT /api/admin/leads/[id]/stage ──→ conversion_events
                                                                       ──→ lead_scores update
```

---

## 7. Convention Prerequisites

### 7.1 Existing Project Conventions

- [x] `CLAUDE.md` has coding conventions section
- [ ] `docs/01-plan/conventions.md` exists
- [ ] `CONVENTIONS.md` exists at project root
- [x] ESLint configuration (`.eslintrc.*`)
- [x] Prettier configuration
- [x] TypeScript configuration (`tsconfig.json`)

### 7.2 Conventions to Define/Verify

| Category | Current State | To Define | Priority |
|----------|---------------|-----------|:--------:|
| **Event naming** | Missing | `snake_case` event names: `page_view`, `form_submit`, `consultation_booked` | High |
| **API route pattern** | Exists (`app/api/`) | New routes under `app/api/analytics/` | High |
| **Zod schemas** | Exists (StructureCheckForm) | Event payload validation schemas in `lib/analytics/schemas.ts` | High |
| **Supabase table naming** | Exists (`lead_scores`) | New table: `conversion_events`, `conversion_funnel_stages` | Medium |
| **Error handling** | Exists (try/catch pattern) | Analytics errors: silent client-side, logged server-side | Medium |

### 7.3 Environment Variables Needed

| Variable | Purpose | Scope | To Be Created |
|----------|---------|-------|:-------------:|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 event forwarding | Client | Exists |
| `CALCOM_WEBHOOK_SECRET` | Cal.com webhook validation | Server | :white_check_mark: |
| `CONVERSION_TRACKING_ENABLED` | Feature flag for rollout | Server | :white_check_mark: |

### 7.4 Pipeline Integration

| Phase | Status | Notes |
|-------|:------:|-------|
| Phase 1 (Schema) | :white_check_mark: | Supabase schema exists; new tables needed |
| Phase 2 (Convention) | :white_check_mark: | Follows existing project patterns |

---

## 8. Implementation Estimate

| Component | Effort | Dependencies |
|-----------|--------|-------------|
| Supabase tables + types | 2h | None |
| Event ingestion API | 3h | Tables |
| Client-side tracking hook | 2h | API |
| Form integration (3 forms) | 2h | Hook |
| Cal.com webhook handler | 2h | Tables |
| UTM capture middleware | 1h | None |
| Admin funnel dashboard | 4h | API + data |
| LeadScoringSystem bridge | 2h | API |
| **Total** | **~18h** | |

---

## 9. Next Steps

1. [ ] Review and approve this plan
2. [ ] Write design document (`conversion-tracking.design.md`)
3. [ ] Create Supabase migration for new tables
4. [ ] Start implementation (API first, then client, then admin)

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-02-24 | Initial draft from 3-agent exploration findings | jaehong |
