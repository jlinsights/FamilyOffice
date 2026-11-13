/**
 * POST /api/leads/capture — a public request for an email that already has a
 * lead must not change that lead (the email is unverified).
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NextRequest } from 'next/server';

type Op = { table: string; op: string; args: unknown[] };
const ops: Op[] = [];
let existing: Record<string, unknown> | null = null;
let eventInsertError: { code: string } | null = null;

function table(name: string) {
  const chain: Record<string, unknown> = {};
  for (const op of ['select', 'eq', 'update', 'insert']) {
    chain[op] = (...args: unknown[]) => {
      ops.push({ table: name, op, args });
      return chain;
    };
  }
  chain.maybeSingle = async () => {
    const isInsert = ops.some(o => o.table === name && o.op === 'insert');
    if (isInsert) return { data: { id: 'new-lead' }, error: null };
    return { data: existing, error: null };
  };
  chain.then = (resolve: (v: unknown) => unknown) =>
    resolve({
      data: null,
      error: name === 'email_events' ? eventInsertError : null,
    });
  return chain;
}

jest.mock('@/lib/supabase/admin-client', () => ({
  createAdminClient: () => ({ from: (name: string) => table(name) }),
}));
const ensureHubSpotContact = jest.fn(async (_input: unknown) => ({
  synced: true,
  contactId: 'c1',
  error: null,
}));
jest.mock('@/lib/hubspot/sync', () => ({
  ensureHubSpotContact: (input: unknown) => ensureHubSpotContact(input),
}));
const addCalculatorLead = jest.fn(async () => ({ data: { id: 'bh1' } }));
jest.mock('@/lib/beehiiv/client', () => ({
  beehiiv: {
    addCalculatorLead: (...a: unknown[]) => addCalculatorLead(...(a as [])),
    startAutomation: async () => undefined,
  },
}));

const { POST } = require('@/app/api/leads/capture/route');

const post = (body: unknown) =>
  POST(
    new NextRequest('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  );

const attack = {
  email: 'victim@x.org',
  name: 'attacker',
  source: 'inheritance_tax_calculator',
  calculationResult: {
    totalAssets: 1,
    totalDebts: 999,
    netAssets: -998,
    estimatedTax: 0,
    hasSpouse: false,
    numChildren: 0,
  },
};

beforeEach(() => {
  ops.length = 0;
  existing = null;
  eventInsertError = null;
  ensureHubSpotContact.mockReset();
  ensureHubSpotContact.mockImplementation(async () => ({
    synced: true,
    contactId: 'c1',
    error: null,
  }));
  addCalculatorLead.mockReset();
  addCalculatorLead.mockImplementation(async () => ({ data: { id: 'bh1' } }));
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('POST /api/leads/capture — existing lead', () => {
  it('never updates the stored lead from an unverified request', async () => {
    existing = {
      id: 'lead-1',
      email: 'victim@x.org',
      name: '김원래',
      beehiiv_subscription_id: 'b',
    };
    const res = await post(attack);
    expect(res.status).toBe(200);
    expect(ops.filter(o => o.table === 'leads' && o.op === 'update')).toEqual(
      []
    );
    expect(ops.filter(o => o.table === 'leads' && o.op === 'insert')).toEqual(
      []
    );
    expect(addCalculatorLead).not.toHaveBeenCalled();
  });

  it('keeps the resubmitted values as an append-only event', async () => {
    existing = { id: 'lead-1', email: 'victim@x.org', name: '김원래' };
    await post(attack);
    const event = ops.find(
      o => o.table === 'email_events' && o.op === 'insert'
    );
    expect(event?.args[0]).toMatchObject({
      lead_id: 'lead-1',
      event_type: 'resubmitted',
      event_data: { name: 'attacker', calculation: attack.calculationResult },
    });
  });

  it('still ensures the HubSpot contact, with the stored name not the request name', async () => {
    existing = { id: 'lead-1', email: 'victim@x.org', name: '김원래' };
    const body = await (await post(attack)).json();
    expect(ensureHubSpotContact).toHaveBeenCalledWith({
      email: 'victim@x.org',
      firstname: '김원래',
    });
    expect(body).toMatchObject({ success: true, hubspotSynced: true });
    expect(body).not.toHaveProperty('leadId');
  });

  it('reports failure when the resubmitted values could not be stored', async () => {
    existing = { id: 'lead-1', email: 'victim@x.org', name: '김원래' };
    eventInsertError = { code: '42501' };
    const res = await post(attack);
    expect(res.status).toBe(500);
    expect(await res.json()).toMatchObject({ success: false });
    expect(ops.filter(o => o.table === 'leads' && o.op === 'update')).toEqual(
      []
    );
  });
});

describe('POST /api/leads/capture — new lead', () => {
  it('inserts the lead and ensures the HubSpot contact as before', async () => {
    const body = await (await post({ ...attack, email: 'new@x.org' })).json();
    expect(ops.some(o => o.table === 'leads' && o.op === 'insert')).toBe(true);
    expect(ensureHubSpotContact).toHaveBeenCalledWith({
      email: 'new@x.org',
      firstname: 'attacker',
    });
    expect(body).toMatchObject({ success: true, leadId: 'new-lead' });
  });
});
