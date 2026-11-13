/**
 * ensureHubSpotContact — public endpoints must never overwrite an existing
 * HubSpot contact (the submitted email is unverified).
 */
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { ensureHubSpotContact } from '@/lib/hubspot/sync';

type Call = { url: string; method: string; body?: unknown };

function mockFetch(responses: Response[]) {
  const calls: Call[] = [];
  const fn = jest.fn(async (url: unknown, init?: RequestInit) => {
    calls.push({
      url: String(url),
      method: init?.method ?? 'GET',
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    });
    const next = responses.shift();
    if (!next) throw new Error('unexpected fetch');
    return next;
  });
  global.fetch = fn as unknown as typeof fetch;
  return calls;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const env = process.env;
const realFetch = global.fetch;
beforeEach(() => {
  process.env = { ...env, HUBSPOT_PRIVATE_ACCESS_TOKEN: 'test-token' };
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  process.env = env;
  global.fetch = realFetch;
  jest.restoreAllMocks();
});

describe('ensureHubSpotContact', () => {
  it('creates a missing contact with the submitted standard properties', async () => {
    const calls = mockFetch([json(201, { id: 'c1' })]);
    const result = await ensureHubSpotContact({
      email: 'a@x.org',
      firstname: '홍',
      phone: '010',
    });
    expect(result).toEqual({ synced: true, contactId: 'c1', error: null });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.method).toBe('POST');
    expect(calls[0]?.body).toEqual({
      properties: {
        email: 'a@x.org',
        lifecyclestage: 'lead',
        firstname: '홍',
        phone: '010',
      },
    });
  });

  it('only looks up an existing contact and never PATCHes it', async () => {
    const calls = mockFetch([
      json(409, { message: 'Contact already exists' }),
      json(200, { id: 'c9' }),
    ]);
    const result = await ensureHubSpotContact({
      email: 'victim@x.org',
      firstname: 'attacker',
      phone: '000',
      company: 'spoofed',
    });
    expect(result).toEqual({ synced: true, contactId: 'c9', error: null });
    expect(calls.map(c => c.method)).toEqual(['POST', 'GET']);
    expect(calls.some(c => c.method === 'PATCH')).toBe(false);
  });

  it('reports a failed lookup without throwing', async () => {
    mockFetch([json(409, {}), json(404, {})]);
    await expect(ensureHubSpotContact({ email: 'a@x.org' })).resolves.toEqual({
      synced: false,
      contactId: null,
      error: 'HUBSPOT_LOOKUP_404',
    });
  });

  it('skips without a token', async () => {
    delete process.env.HUBSPOT_PRIVATE_ACCESS_TOKEN;
    delete process.env.HUBSPOT_ACCESS_TOKEN;
    const calls = mockFetch([]);
    await expect(
      ensureHubSpotContact({ email: 'a@x.org' })
    ).resolves.toMatchObject({
      synced: false,
      error: 'NO_TOKEN',
    });
    expect(calls).toHaveLength(0);
  });
});
