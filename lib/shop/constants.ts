export const SHOP_CATEGORIES = [
  'calligraphy',
  'photography',
  'painting',
  'luxury',
] as const;

export type ShopCategory = (typeof SHOP_CATEGORIES)[number];

const CATEGORY_LABELS: Record<ShopCategory, string> = {
  calligraphy: '서예',
  photography: '사진',
  painting: '그림',
  luxury: '럭셔리',
};

const CATEGORY_DESCRIPTIONS: Record<ShopCategory, string> = {
  calligraphy: '1-of-1 서예 작품',
  photography: '에디토리얼·아트 포토그래피',
  painting: '오리지널 회화 작품',
  luxury: '큐레이션 럭셔리 아이템',
};

export function getCategoryLabel(category: ShopCategory): string {
  return CATEGORY_LABELS[category];
}

export function getCategoryDescription(category: ShopCategory): string {
  return CATEGORY_DESCRIPTIONS[category];
}

export function isShopCategory(
  value: string | undefined
): value is ShopCategory {
  return SHOP_CATEGORIES.includes(value as ShopCategory);
}
