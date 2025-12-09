# Marketing Automation Suite

## Overview

This directory contains experimental marketing automation features for FamilyOffice S platform:

- **Lead Scoring Engine** (`lead-scoring-engine.ts`) - Behavioral tracking and lead qualification
- **Workflow Automation** (`workflow-engine.ts`) - Trigger-based marketing action execution
- **AI Content Engine** (`ai-content-engine.ts`) - Personalized content recommendations

## Status: Experimental

These features are currently in development and have some TypeScript type inference limitations.

## Known Issues

### TypeScript Type Errors

The Supabase SSR client doesn't always properly infer table types in certain contexts, particularly with:
- Complex query chains
- Dynamic table name selection
- Nested JSON field access

**These are type system limitations, not runtime issues.** The database schema exists (see migration files in `supabase/migrations/`), and the code will work correctly at runtime.

### Resolution Steps

To fully resolve TypeScript errors:

1. **Apply Database Migrations**:
   ```bash
   # Using Supabase CLI (if configured)
   supabase db push

   # Or manually apply the migration:
   # supabase/migrations/20251209185317_add_marketing_and_analytics_tables.sql
   ```

2. **Regenerate Types**:
   ```bash
   npx supabase gen types typescript --project-id <your-project-id> > types/supabase.ts
   ```

3. **Verify**:
   ```bash
   npm run typecheck
   ```

## Database Tables

The following tables are required (defined in migration files):

- `lead_activities` - Lead behavior tracking and scoring
- `workflow_executions` - Marketing workflow state management
- `content_recommendations` - AI-powered content suggestions
- `performance_metrics` - Analytics and performance tracking

## Usage

```typescript
import { getLeadScoringEngine } from '@/lib/marketing/lead-scoring-engine';
import { getWorkflowEngine } from '@/lib/marketing/workflow-engine';
import { getAIContentEngine } from '@/lib/marketing/ai-content-engine';

// Track lead activity
const scoringEngine = getLeadScoringEngine();
await scoringEngine.trackActivity({
  hubspot_contact_id: 'contact-123',
  activity_type: 'page_view',
  activity_data: { url: '/services' },
  score_impact: 5
});

// Execute workflow
const workflowEngine = getWorkflowEngine();
await workflowEngine.enrollContact('contact-123', 'welcome_series');

// Get content recommendations
const contentEngine = getAIContentEngine();
const recommendations = await contentEngine.getRecommendations('contact-123');
```

## Integration

These engines integrate with:
- **HubSpot CRM** - Contact data and engagement tracking
- **Supabase** - Data persistence and real-time updates
- **Next.js API Routes** - HTTP endpoints in `app/api/marketing/`

## Security

All tables have Row Level Security (RLS) enabled:
- Admin users (jhlim725@gmail.com) have full access
- Regular users can only view their own data
- Service role has full access for backend operations

## Future Enhancements

- [ ] Complete HubSpot integration
- [ ] Add email template management
- [ ] Implement A/B testing for workflows
- [ ] Add real-time analytics dashboard
- [ ] Complete TypeScript type safety
