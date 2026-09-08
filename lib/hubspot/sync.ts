/**
 * Lightweight outbound HubSpot contact sync.
 *
 * Upserts a contact by email with soft-fail semantics:
 * - Skips silently when no HubSpot token is configured.
 * - Catches all errors so the caller's primary flow is never blocked.
 */

const HUBSPOT_API = 'https://api.hubapi.com';

interface LeadContactData {
  email: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  lifecyclestage?: string | undefined;
  lead_source?: string | undefined;
}

function getAccessToken(): string | undefined {
  return (
    process.env.HUBSPOT_PRIVATE_ACCESS_TOKEN ||
    process.env.HUBSPOT_ACCESS_TOKEN ||
    undefined
  );
}

/**
 * Upsert a contact in HubSpot by email.
 *
 * Uses the "create or update" v3 endpoint. Properties are merged; existing
 * values are kept when the incoming field is undefined.
 *
 * Returns the HubSpot contact id on success, or `null` on skip / error.
 */
export async function upsertHubSpotContact(
  data: LeadContactData,
): Promise<string | null> {
  const token = getAccessToken();
  if (!token) return null;

  const properties: Record<string, string> = {
    email: data.email,
    lifecyclestage: data.lifecyclestage ?? 'lead',
    lead_source: data.lead_source ?? 'website',
  };

  if (data.firstname) properties.firstname = data.firstname;
  if (data.lastname) properties.lastname = data.lastname;
  if (data.phone) properties.phone = data.phone;
  if (data.company) properties.company = data.company;

  try {
    const res = await fetch(
      `${HUBSPOT_API}/crm/v3/objects/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      },
    );

    if (res.ok) {
      const body = await res.json();
      return body?.id ?? null;
    }

    if (res.status === 409) {
      const existingId = await patchExistingContact(token, data.email, properties);
      return existingId;
    }

    const errText = await res.text().catch(() => '');
    console.error(
      `[hubspot-sync] create failed (${res.status}):`,
      errText.slice(0, 300),
    );
    return null;
  } catch (err) {
    console.error('[hubspot-sync] network error:', err instanceof Error ? err.message : err);
    return null;
  }
}

async function patchExistingContact(
  token: string,
  email: string,
  properties: Record<string, string>,
): Promise<string | null> {
  try {
    const { email: _email, lifecyclestage: _lcs, ...updateProps } = properties;

    const lookupRes = await fetch(
      `${HUBSPOT_API}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!lookupRes.ok) return null;

    const contact = await lookupRes.json();
    const contactId: string = contact?.id;
    if (!contactId) return null;

    if (Object.keys(updateProps).length > 0) {
      await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties: updateProps }),
      });
    }

    return contactId;
  } catch {
    return null;
  }
}
