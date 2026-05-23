import { generateShopOrderId, SHOP_ORDER_ID_PATTERN } from './order-id';

describe('generateShopOrderId', () => {
  it('returns SHOP-YYYYMMDD-XXXX (XXXX 4 alphanumeric)', () => {
    const id = generateShopOrderId(new Date('2026-05-23T12:00:00Z'));
    expect(id).toMatch(/^SHOP-20260523-[0-9A-Za-z]{4}$/);
  });

  it('SHOP_ORDER_ID_PATTERN matches generated ids', () => {
    const id = generateShopOrderId();
    expect(SHOP_ORDER_ID_PATTERN.test(id)).toBe(true);
  });

  it('produces unique ids on consecutive calls', () => {
    const a = generateShopOrderId();
    const b = generateShopOrderId();
    expect(a).not.toBe(b);
  });
});
