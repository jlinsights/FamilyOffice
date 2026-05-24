import { currentUser } from '@clerk/nextjs/server';
import { createPendingOrder, ShopOrderError } from '@/lib/shop/orders';
import { POST } from './route';

jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(),
}));
jest.mock('@/lib/supabase/admin-client', () => ({
  createAdminClient: jest.fn(),
}));
jest.mock('@/lib/shop/orders', () => ({
  ShopOrderError: class extends Error {
    constructor(
      message: string,
      public code: string
    ) {
      super(message);
    }
  },
  createPendingOrder: jest.fn(),
}));

const mockedCurrentUser = currentUser as jest.Mock;
const mockedCreatePending = createPendingOrder as jest.Mock;

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/payments/shop/create-order', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const validShipping = {
  buyerName: 'X',
  buyerPhone: '010-1234-5678',
  shipZip: '06236',
  shipAddress: '서울',
  shipAddressDetail: '101호',
};

describe('POST /api/payments/shop/create-order', () => {
  beforeEach(() => jest.resetAllMocks());

  it('returns 401 when unauthenticated', async () => {
    mockedCurrentUser.mockResolvedValue(null);
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(401);
  });

  it('returns 400 when zod fails', async () => {
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    const res = await POST(makeRequest({ productId: 'nope' }));
    expect(res.status).toBe(400);
  });

  it('returns 200 with orderId on happy path', async () => {
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    mockedCreatePending.mockResolvedValue({
      orderId: 'SHOP-20260523-AAAA',
      amount: 100000,
    });
    const res = await POST(
      makeRequest({
        productId: '11111111-1111-1111-1111-111111111111',
        shipping: validShipping,
      })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toMatchObject({
      success: true,
      orderId: 'SHOP-20260523-AAAA',
    });
  });

  it('returns 409 on ORDER_CONFLICT', async () => {
    mockedCurrentUser.mockResolvedValue({
      id: 'u1',
      emailAddresses: [{ emailAddress: 'a@b.c' }],
    });
    mockedCreatePending.mockRejectedValue(
      new ShopOrderError('conflict', 'ORDER_CONFLICT')
    );
    const res = await POST(
      makeRequest({
        productId: '11111111-1111-1111-1111-111111111111',
        shipping: validShipping,
      })
    );
    expect(res.status).toBe(409);
  });
});
