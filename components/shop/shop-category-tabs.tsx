'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  getCategoryLabel,
  isShopCategory,
  SHOP_CATEGORIES,
  type ShopCategory,
} from '@/lib/shop/constants';

const ALL_TAB = 'all';

function buildHref(category: typeof ALL_TAB | ShopCategory): string {
  if (category === ALL_TAB) return '/shop';
  return `/shop?category=${category}`;
}

export function ShopCategoryTabs() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category') ?? undefined;
  const activeCategory =
    rawCategory && isShopCategory(rawCategory) ? rawCategory : ALL_TAB;

  const tabs: Array<{ id: typeof ALL_TAB | ShopCategory; label: string }> = [
    { id: ALL_TAB, label: '전체' },
    ...SHOP_CATEGORIES.map(category => ({
      id: category,
      label: getCategoryLabel(category),
    })),
  ];

  return (
    <div
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
      role="tablist"
      aria-label="작품 카테고리"
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeCategory;
        return (
          <Link
            key={tab.id}
            href={buildHref(tab.id)}
            role="tab"
            aria-selected={isActive}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${
              isActive
                ? 'bg-brand-navy text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-gold/40 hover:text-brand-navy'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
