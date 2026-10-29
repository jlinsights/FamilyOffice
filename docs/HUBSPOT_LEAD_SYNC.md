# HubSpot Lead Sync (Outbound)

> How leads flow from the website to HubSpot CRM.

## Architecture

```
Browser ─► /api/leads/capture  ─► Supabase (leads)
                                 ├► Beehiiv (newsletter)
                                 └► HubSpot (contact upsert)

Browser ─► /api/structure-check ─► Supabase (structure_check_requests)
                                 ├► Resend (admin + user email)
                                 └► HubSpot (contact upsert)
```

### Inbound (existing)

`POST /api/webhooks/hubspot` receives events **from** HubSpot (contact
creation, property changes, deal updates) and logs them to Supabase
`lead_activities` / `deal_activities`.

### Outbound

`lib/hubspot/sync.ts` provides `upsertHubSpotContact()`:

- **Create-or-update** via `POST /crm/v3/objects/contacts`. On 409 conflict
  it falls back to a lookup-by-email then PATCH.
- **Soft-fail**: if no token is set or HubSpot returns an error, the primary
  lead-save flow is unaffected. The result is reported in the API response.
- **Standard properties only**: `email`, `firstname`, `lastname`, `phone`,
  `company`, `lifecyclestage` (default `lead`).
- Custom properties like `lead_source` are **not** sent to avoid
  `PROPERTY_DOESNT_EXIST` errors.

### Response Fields

Both `/api/leads/capture` and `/api/structure-check` return:

```json
{
  "success": true,
  "hubspotSynced": true,
  "hubspotError": null
}
```

| `hubspotSynced` | `hubspotError` | Meaning |
|---|---|---|
| `true` | `null` | Contact created/updated in HubSpot |
| `false` | `NO_TOKEN` | No HubSpot token configured — skipped |
| `false` | `HUBSPOT_400` | Bad request (check property names) |
| `false` | `HUBSPOT_401` | Invalid token |
| `false` | `NETWORK_ERROR` | Fetch failed |

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `HUBSPOT_PRIVATE_ACCESS_TOKEN` | Server | HubSpot Private App token (preferred) |
| `HUBSPOT_ACCESS_TOKEN` | Server | Fallback token name used by `api-client.ts` |

Either variable works. If **neither** is set the sync is skipped
(`hubspotSynced: false, hubspotError: "NO_TOKEN"`).

## Verifying with a Test Lead

```bash
curl -s -X POST https://www.familyoffices.vip/api/leads/capture \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "hs-test@example.com",
    "name": "홍길동",
    "source": "manual_test"
  }' | jq '{success, hubspotSynced, hubspotError, leadId}'
```

Expected:

```json
{
  "success": true,
  "hubspotSynced": true,
  "hubspotError": null,
  "leadId": "..."
}
```

Then check HubSpot → Contacts → search `hs-test@example.com`. The contact
should appear with `lifecyclestage = lead`.

## Existing HubSpot Infrastructure (Reference)

| File | Role |
|---|---|
| `lib/hubspot/api-client.ts` | Full CRM client (contacts, deals, tracking) |
| `lib/hubspot/sync.ts` | Thin upsert helper used by lead routes |
| `lib/hubspot-integration.ts` | Client-side Webflow form integration |
| `app/api/webhooks/hubspot/route.ts` | Inbound webhook handler |
| `lib/marketing/workflow-engine.ts` | Marketing automation (uses api-client) |
| `components/forms/hubspot-contact-form.tsx` | Embedded HubSpot form component |
