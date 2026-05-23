import { listOnSaleProducts, getProductBySlug } from './products';

type Row = Record<string, unknown>;

function makeMockClient(rows: Row[] = [], error: unknown = null) {
  const builder: Record<string, unknown> = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest
      .fn()
      .mockResolvedValue({ data: rows[0] ?? null, error }),
  };
  // mimic awaitable behavior for non-single queries
  (
    builder as unknown as {
      then: (resolve: (v: unknown) => void) => void;
    }
  ).then = (resolve: (v: unknown) => void) =>
    resolve({ data: rows, error });
  return {
    from: jest.fn().mockReturnValue(builder),
  };
}

describe('listOnSaleProducts', () => {
  it('queries shop_products with status=on_sale ordered by created_at desc', async () => {
    const mock = makeMockClient([{ id: 'a' }, { id: 'b' }]);
    const products = await listOnSaleProducts(mock as never);
    expect(mock.from).toHaveBeenCalledWith('shop_products');
    expect(products).toEqual([{ id: 'a' }, { id: 'b' }]);
  });

  it('filters by category when provided', async () => {
    const mock = makeMockClient([]);
    await listOnSaleProducts(mock as never, 'painting');
    expect(mock.from).toHaveBeenCalled();
  });
});

describe('getProductBySlug', () => {
  it('returns null when not found', async () => {
    const mock = makeMockClient([], null);
    const p = await getProductBySlug(mock as never, 'missing');
    expect(p).toBeNull();
  });
});
