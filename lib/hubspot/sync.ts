/**
 * Lightweight outbound HubSpot contact sync.
 *
 * Creates a contact by email using only standard HubSpot properties, and
 * NEVER modifies an existing contact. Callers are public, unauthenticated
 * endpoints: anyone who knows an address could otherwise overwrite that
 * contact's name, phone or company. An existing contact is only looked up
 * so its id can be reported.
 * Returns a result object so callers can report sync status without
 * leaking secrets or blocking the primary flow.
 */

const HUBSPOT_API = 'https://api.hubapi.com';

export interface HubSpotContactInput {
  email: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  lifecyclestage?: string | undefined;
}

export interface HubSpotSyncResult {
  synced: boolean;
  contactId: string | null;
  error: string | null;
}

const SKIPPED: HubSpotSyncResult = { synced: false, contactId: null, error: 'NO_TOKEN' };

function getAccessToken(): string | undefined {
  return (
    process.env.HUBSPOT_PRIVATE_ACCESS_TOKEN ||
    process.env.HUBSPOT_ACCESS_TOKEN ||
    undefined
  );
}

/**
 * Make sure a HubSpot contact exists for this email — create it if missing,
 * leave an existing contact untouched.
 *
 * Only standard HubSpot properties are sent (email, firstname, lastname,
 * phone, company, lifecyclestage). Custom properties like lead_source are
 * omitted to avoid 400 PROPERTY_DOESNT_EXIST errors.
 *
 * Never throws — always returns a result object.
 */
export async function ensureHubSpotContact(
  data: HubSpotContactInput,
): Promise<HubSpotSyncResult> {
  const token = getAccessToken();
  if (!token) return SKIPPED;

  const properties: Record<string, string> = {
    email: data.email,
    lifecyclestage: data.lifecyclestage ?? 'lead',
  };
  if (data.firstname) properties.firstname = data.firstname;
  if (data.lastname) properties.lastname = data.lastname;
  if (data.phone) properties.phone = data.phone;
  if (data.company) properties.company = data.company;

  try {
    const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (res.ok) {
      const body = await res.json();
      const contactId = body?.id ?? null;
      console.log('[hubspot-sync] contact created:', contactId);
      return { synced: true, contactId, error: null };
    }

    if (res.status === 409) {
      // Already exists: report its id, never overwrite it from a public request
      return await lookupExistingContact(token, data.email);
    }

    const errText = await res.text().catch(() => '');
    const errCode = `HUBSPOT_${res.status}`;
    console.error(`[hubspot-sync] create failed (${res.status}):`, errText.slice(0, 300));
    return { synced: false, contactId: null, error: errCode };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[hubspot-sync] network error:', msg);
    return { synced: false, contactId: null, error: 'NETWORK_ERROR' };
  }
}

async function lookupExistingContact(
  token: string,
  email: string,
): Promise<HubSpotSyncResult> {
  try {
    const lookupRes = await fetch(
      `${HUBSPOT_API}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!lookupRes.ok) {
      const errText = await lookupRes.text().catch(() => '');
      console.error(`[hubspot-sync] lookup failed (${lookupRes.status}):`, errText.slice(0, 200));
      return { synced: false, contactId: null, error: `HUBSPOT_LOOKUP_${lookupRes.status}` };
    }

    const contact = await lookupRes.json();
    const contactId: string = contact?.id;
    if (!contactId) {
      return { synced: false, contactId: null, error: 'HUBSPOT_NO_ID' };
    }

    console.log('[hubspot-sync] existing contact kept unchanged:', contactId);
    return { synced: true, contactId, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[hubspot-sync] lookup error:', msg);
    return { synced: false, contactId: null, error: 'NETWORK_ERROR' };
  }
}
