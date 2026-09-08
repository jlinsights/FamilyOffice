# HubSpot Lead Sync (Outbound)

> How leads flow from the website to HubSpot CRM.

## Architecture

```
Browser ─► /api/leads/capture  ─► Supabase (leads)
                                 ├► Beehiiv (newsletter)
                                 └► HubSpot (contact upsert)  ← NEW

Browser ─► /api/structure-check ─► Supabase (structure_check_requests)
                                 ├► Resend (admin + user email)
                                 └► HubSpot (contact upsert)  ← NEW
```

### Inbound (existing)

`POST /api/webhooks/hubspot` receives events **from** HubSpot (contact
creation, property changes, deal updates) and logs them to Supabase
`lead_activities` / `deal_activities`.

### Outbound (added by this PR)

`lib/hubspot/sync.ts` provides `upsertHubSpotContact()`:

- **Create-or-update** via `POST /crm/v3/objects/contacts`. On 409 conflict
  it falls back to a lookup-by-email then PATCH.
- **Soft-fail**: if no token is set or HubSpot returns an error, the primary
  lead-save flow is unaffected.
- Properties synced: `email`, `firstname`, `lastname`, `phone`, `company`,
  `lifecyclestage` (default `lead`), `lead_source`.

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `HUBSPOT_PRIVATE_ACCESS_TOKEN` | Server | HubSpot Private App token (preferred) |
| `HUBSPOT_ACCESS_TOKEN` | Server | Fallback token name used by `api-client.ts` |

Either variable works. If **neither** is set the sync is silently skipped.

## Verifying with a Test Lead

Once `HUBSPOT_PRIVATE_ACCESS_TOKEN` is set (Vercel Dashboard → Settings →
Environment Variables), you can test end-to-end:

```bash
# leads/capture
curl -X POST https://familyoffices.vip/api/leads/capture \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test-lead@example.com",
    "name": "홍길동",
    "source": "manual_test",
    "calculationResult": {
      "totalAssets": 5000000000,
      "totalDebts": 500000000,
      "netAssets": 4500000000,
      "estimatedTax": 900000000,
      "hasSpouse": true,
      "numChildren": 2
    }
  }'

# structure-check
curl -X POST https://familyoffices.vip/api/structure-check \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "테스트",
    "email": "test-sc@example.com",
    "phone": "01012345678",
    "company": "테스트주식회사",
    "q1_decision_made": "no",
    "q2_documented": "no",
    "q3_authority_clear": "unclear",
    "q4_cash_plan": "not_considered",
    "q5_deadline": "within_6m"
  }'
```

Then check HubSpot → Contacts → search for the email. The contact should
appear with `lifecyclestage = lead` and `lead_source = manual_test` (or
`structure_check`).

## Existing HubSpot Infrastructure (Reference)

| File | Role |
|---|---|
| `lib/hubspot/api-client.ts` | Full CRM client (contacts, deals, tracking) |
| `lib/hubspot/sync.ts` | Thin upsert helper used by lead routes |
| `lib/hubspot-integration.ts` | Client-side Webflow form integration |
| `app/api/webhooks/hubspot/route.ts` | Inbound webhook handler |
| `lib/marketing/workflow-engine.ts` | Marketing automation (uses api-client) |
| `components/forms/hubspot-contact-form.tsx` | Embedded HubSpot form component |
