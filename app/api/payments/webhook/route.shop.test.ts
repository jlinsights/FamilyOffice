import { createAdminClient } from '@/lib/supabase/admin-client';
import { POST } from './route';

jest.mock('@/lib/supabase/admin-client', () => ({
  createAdminClient: jest.fn(),
}));

const mockedAdminClient = createAdminClient as jest.Mock;

const originalFetch = global.fetch;
afterEach(() => {
  (global as { fetch: typeof fetch }).fetch = originalFetch;
});

function req(body: unknown): Request {
  return new Request('http://localhost/api/payments/webhook', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function shopMockClient() {
  return {
    from: jest.fn().mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ error: null }),
    }),
  };
}

describe('webhook orderId prefix routing', () => {
  beforeEach(() => {
    process.env.TOSS_SECRET_KEY = 'test_sk_x';
    delete process.env.TOSS_WEBHOOK_SECRET;
    mockedAdminClient.mockReturnValue(shopMockClient());
  });

  it('routes SHOP- orderId via shop branch (no payment_secret select)', async () => {
    (global as { fetch: typeof fetch }).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        orderId: 'SHOP-20260523-AAAA',
        paymentKey: 'pk',
        status: 'DONE',
        totalAmount: 100000,
        method: 'CARD',
        approvedAt: '2026-05-23T00:00:00Z',
      }),
    });
    const res = await POST(
      req({ paymentKey: 'pk', orderId: 'SHOP-20260523-AAAA' }) as never
    );
    expect(res.status).toBe(200);

    const client = mockedAdminClient.mock.results[0]?.value as {
      from: jest.Mock;
    };
    // Shop 분기는 shop_orders 만 호출, structure_check_requests 는 호출 안 함
    const calledTables = client.from.mock.calls.map(c => c[0]);
    expect(calledTables).toContain('shop_orders');
    expect(calledTables).not.toContain('structure_check_requests');
  });

  it('orderId-only lookup uses /payments/orders/{orderId} (M1 fix)', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        orderId: 'SHOP-20260523-AAAA',
        paymentKey: 'pk',
        status: 'DONE',
        totalAmount: 100000,
        method: 'CARD',
        approvedAt: '2026-05-23T00:00:00Z',
      }),
    });
    (global as { fetch: typeof fetch }).fetch = fetchMock;
    await POST(req({ orderId: 'SHOP-20260523-AAAA' }) as never);
    const url = (fetchMock.mock.calls[0]?.[0] ?? '') as string;
    expect(url).toContain('/payments/orders/SHOP-20260523-AAAA');
  });
});
