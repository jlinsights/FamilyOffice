import { SHOP_CATEGORIES, getCategoryLabel } from './constants';

describe('shop constants', () => {
  it('exposes 4 categories in order', () => {
    expect(SHOP_CATEGORIES).toEqual([
      'calligraphy',
      'photography',
      'painting',
      'luxury',
    ]);
  });

  it('returns Korean label for each category', () => {
    expect(getCategoryLabel('calligraphy')).toBe('서예');
    expect(getCategoryLabel('photography')).toBe('사진');
    expect(getCategoryLabel('painting')).toBe('그림');
    expect(getCategoryLabel('luxury')).toBe('럭셔리');
  });
});
