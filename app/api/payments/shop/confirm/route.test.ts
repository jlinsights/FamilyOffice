import { currentUser } from '@clerk/nextjs/server';
import { markOrderPaid } from '@/lib/shop/orders';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { POST } from './route';

jest.mock('@clerk/nextjs/server', () => ({ currentUser: jest.fn() }));
jest.mock('@/lib/supabase/admin-client', () => ({
  createAdminClient: jest.fn(),
}));
jest.mock('@/lib/shop/orders', () => ({ markOrderPaid: jest.fn() }));
jest.mock('@/lib/email/resend-client', () => ({
  sendSystemNotification: jest.fn().mockResolvedValue(undefined),
  sendStructureCheckConfirmation: jest.fn().mockResolvedValue(undefined),
}));

const mockedCurrentUser = currentUser as jest.Mock;
const mockedAdminClient = createAdminClient as jest.Mock;
const mockedMarkPaid = markOrderPaid as jest.Mock;

const originalFetch = global.fetch;
afterEach(() => {
  (global as { fetch: typeof fetch }).fetch = originalFetch;
});

function makeReq(body: unknown): Request {
  return new Request('http://localhost/api/payments/shop/confirm', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function supabaseWith(order: Record<string, unknown> | null) {
  const single = jest.fn().mockResolvedValue({
    data: order,
    error: order ? null : { message: 'not found' },
  });
  return {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single,
    }),
  };
}

describe('POST /api/payments/shop/confirm', () => {
  beforeEach(() => jest.resetAllMocks());

  it('401 when unauthenticated', async () => {
    mockedCurrentUser.mockResolvedValue(null);
    const res = await POST(makeReq({}));
    expect(res.status).toBe(401);
  });

  it('400 on bad zod', async () => {
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    const res = await POST(
      makeReq({ paymentKey: 'x', orderId: 'bad', amount: 0 })
    );
    expect(res.status).toBe(400);
  });

  it('404 when order not found / not owned', async () => {
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    mockedAdminClient.mockReturnValue(supabaseWith(null));
    const res = await POST(
      makeReq({
        paymentKey: 'pk',
        orderId: 'SHOP-20260523-AAAA',
        amount: 100000,
      })
    );
    expect(res.status).toBe(404);
  });

  it('400 when amount mismatch (tampering)', async () => {
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    mockedAdminClient.mockReturnValue(
      supabaseWith({
        id: 'o1',
        order_id: 'SHOP-20260523-AAAA',
        user_id: 'u1',
        product_id: 'p1',
        amount: 100000,
        payment_status: 'pending',
        buyer_name: 'X',
        buyer_email: 'a@b.c',
      })
    );
    const res = await POST(
      makeReq({
        paymentKey: 'pk',
        orderId: 'SHOP-20260523-AAAA',
        amount: 50000,
      })
    );
    expect(res.status).toBe(400);
  });

  it('returns idempotent 200 when already paid', async () => {
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    mockedAdminClient.mockReturnValue(
      supabaseWith({
        id: 'o1',
        order_id: 'SHOP-20260523-AAAA',
        user_id: 'u1',
        product_id: 'p1',
        amount: 100000,
        payment_status: 'paid',
        payment_key: 'pk-old',
        paid_amount: 100000,
      })
    );
    const res = await POST(
      makeReq({
        paymentKey: 'pk',
        orderId: 'SHOP-20260523-AAAA',
        amount: 100000,
      })
    );
    expect(res.status).toBe(200);
    expect((await res.json()).idempotent).toBe(true);
  });

  it('happy path: Toss ok → markOrderPaid → 200', async () => {
    process.env.TOSS_SECRET_KEY = 'test_sk_x';
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    mockedAdminClient.mockReturnValue(
      supabaseWith({
        id: 'o1',
        order_id: 'SHOP-20260523-AAAA',
        user_id: 'u1',
        product_id: 'p1',
        amount: 100000,
        payment_status: 'pending',
        buyer_name: 'X',
        buyer_email: 'a@b.c',
      })
    );
    (global as { fetch: typeof fetch }).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        paymentKey: 'pk',
        orderId: 'SHOP-20260523-AAAA',
        totalAmount: 100000,
        status: 'DONE',
        method: 'CARD',
        approvedAt: '2026-05-23T00:00:00Z',
      }),
    });
    mockedMarkPaid.mockResolvedValue({ ok: true });
    const res = await POST(
      makeReq({
        paymentKey: 'pk',
        orderId: 'SHOP-20260523-AAAA',
        amount: 100000,
      })
    );
    expect(res.status).toBe(200);
    expect(mockedMarkPaid).toHaveBeenCalled();
  });
});
