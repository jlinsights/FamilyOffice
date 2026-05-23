import {
  shippingAddressSchema,
  createOrderInputSchema,
  confirmInputSchema,
  productInputSchema,
} from './schemas';

describe('shippingAddressSchema', () => {
  const ok = {
    buyerName: '김상철',
    buyerPhone: '010-1234-5678',
    shipZip: '06236',
    shipAddress: '서울특별시 강남구 테헤란로 123',
    shipAddressDetail: '11층 1101호',
  };

  it('passes a complete address', () => {
    expect(shippingAddressSchema.parse(ok)).toEqual(expect.objectContaining(ok));
  });

  it('rejects empty buyerName', () => {
    expect(() =>
      shippingAddressSchema.parse({ ...ok, buyerName: '' })
    ).toThrow();
  });

  it('rejects bad zip', () => {
    expect(() =>
      shippingAddressSchema.parse({ ...ok, shipZip: '123' })
    ).toThrow();
  });

  it('rejects bad phone', () => {
    expect(() =>
      shippingAddressSchema.parse({ ...ok, buyerPhone: 'abc' })
    ).toThrow();
  });
});

describe('createOrderInputSchema', () => {
  it('requires productId uuid + shipping address', () => {
    const result = createOrderInputSchema.safeParse({
      productId: '11111111-1111-1111-1111-111111111111',
      shipping: {
        buyerName: 'X',
        buyerPhone: '010-1234-5678',
        shipZip: '06236',
        shipAddress: '서울특별시 강남구 테헤란로 123',
        shipAddressDetail: '11층',
      },
    });
    expect(result.success).toBe(true);
  });

  it('rejects non-uuid productId', () => {
    expect(
      createOrderInputSchema.safeParse({ productId: 'nope', shipping: {} })
        .success
    ).toBe(false);
  });
});

describe('confirmInputSchema', () => {
  it('requires paymentKey + orderId + positive integer amount', () => {
    expect(
      confirmInputSchema.safeParse({
        paymentKey: 'pk_123',
        orderId: 'SHOP-20260523-AAAA',
        amount: 100000,
      }).success
    ).toBe(true);
  });

  it('rejects zero amount', () => {
    expect(
      confirmInputSchema.safeParse({
        paymentKey: 'pk_123',
        orderId: 'SHOP-20260523-AAAA',
        amount: 0,
      }).success
    ).toBe(false);
  });
});

describe('productInputSchema', () => {
  it('accepts a valid product', () => {
    const r = productInputSchema.safeParse({
      slug: 'gyeomjae-50x70',
      title: '겸재 鎌齋 — 한지 50×70',
      artist: '겸재',
      category: 'calligraphy',
      description: 'desc',
      priceKrw: 1_200_000,
      shippingFee: 0,
      images: ['https://example.com/a.jpg'],
      status: 'on_sale',
    });
    expect(r.success).toBe(true);
  });

  it('rejects unknown category', () => {
    expect(
      productInputSchema.safeParse({
        slug: 's',
        title: 't',
        artist: 'a',
        category: 'unknown',
        priceKrw: 1000,
        shippingFee: 0,
        images: [],
        status: 'on_sale',
      }).success
    ).toBe(false);
  });
});
