import { createPendingOrder, markOrderPaid } from './orders';

const baseShipping = {
  buyerName: 'X',
  buyerPhone: '010-1234-5678',
  shipZip: '06236',
  shipAddress: 'a',
  shipAddressDetail: 'b',
};

function productSelectMock(product: unknown) {
  return {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: product, error: null }),
  };
}

function ordersInsertMock(
  error: { code?: string; message?: string } | null = null
) {
  return {
    insert: jest.fn().mockResolvedValue({ data: null, error }),
  };
}

function updateChainMock(error: { message?: string } | null = null) {
  // chain: .update(...).eq(...).eq(...)
  const tail = { data: null, error };
  const inner = jest.fn().mockResolvedValue(tail);
  const outerEq = jest.fn().mockReturnValue({ eq: inner });
  return {
    update: jest.fn().mockReturnValue({ eq: outerEq }),
  };
}

describe('createPendingOrder', () => {
  it('throws when product not on_sale', async () => {
    const mock = {
      from: jest.fn((table: string) => {
        if (table === 'shop_products') {
          return productSelectMock({
            id: 'p1',
            status: 'sold',
            price_krw: 100,
            shipping_fee: 0,
          });
        }
        return ordersInsertMock();
      }),
    };
    await expect(
      createPendingOrder(mock as never, {
        productId: 'p1',
        userId: 'u1',
        shipping: baseShipping,
      })
    ).rejects.toThrow(/판매중이 아닙니다/);
  });

  it('returns conflict when partial UNIQUE violation (23505)', async () => {
    const mock = {
      from: jest.fn((table: string) => {
        if (table === 'shop_products') {
          return productSelectMock({
            id: 'p1',
            status: 'on_sale',
            price_krw: 100,
            shipping_fee: 0,
          });
        }
        return ordersInsertMock({
          code: '23505',
          message: 'unique violation',
        });
      }),
    };
    await expect(
      createPendingOrder(mock as never, {
        productId: 'p1',
        userId: 'u1',
        shipping: baseShipping,
      })
    ).rejects.toMatchObject({ code: 'ORDER_CONFLICT' });
  });
});

describe('markOrderPaid', () => {
  it('returns ok=false when orders update returns error', async () => {
    const mock = {
      from: jest.fn((table: string) => {
        if (table === 'shop_orders') {
          return updateChainMock({ message: 'fail' });
        }
        // shop_products update — not reached because orders fails first
        return updateChainMock();
      }),
    };
    const r = await markOrderPaid(mock as never, {
      orderId: 'SHOP-20260523-AAAA',
      productId: 'p1',
      paymentKey: 'pk',
      totalAmount: 100,
      approvedAt: '2026-05-23T00:00:00Z',
      method: 'CARD',
    });
    expect(r.ok).toBe(false);
  });

  it('returns ok=true when both updates succeed', async () => {
    const mock = {
      from: jest.fn(() => updateChainMock(null)),
    };
    const r = await markOrderPaid(mock as never, {
      orderId: 'SHOP-20260523-AAAA',
      productId: 'p1',
      paymentKey: 'pk',
      totalAmount: 100,
      approvedAt: '2026-05-23T00:00:00Z',
      method: 'CARD',
    });
    expect(r.ok).toBe(true);
  });
});
