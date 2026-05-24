import { Suspense } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ShopCategoryTabs } from '@/components/shop/shop-category-tabs';
import {
  getCategoryDescription,
  getCategoryLabel,
  isShopCategory,
  SHOP_CATEGORIES,
  type ShopCategory,
} from '@/lib/shop/constants';

type ShopPageContentProps = {
  category?: string | undefined;
};

function CategoryCards({
  activeCategory,
}: {
  activeCategory?: ShopCategory | undefined;
}) {
  const categories = activeCategory
    ? SHOP_CATEGORIES.filter(category => category === activeCategory)
    : SHOP_CATEGORIES;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map(category => (
        <article
          key={category}
          className="card-gold-border rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-playfair text-xs uppercase tracking-[0.2em] text-bronze">
            Collection
          </p>
          <h3 className="heading-editorial mt-3 text-2xl">
            {getCategoryLabel(category)}
          </h3>
          <p className="font-korean mt-3 text-sm leading-relaxed text-slate-600">
            {getCategoryDescription(category)}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ShopPageContent({ category }: ShopPageContentProps) {
  const activeCategory = isShopCategory(category) ? category : undefined;
  const activeLabel = activeCategory
    ? getCategoryLabel(activeCategory)
    : '전체';

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-navy-gradient section-editorial text-white">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <p className="font-playfair text-sm uppercase tracking-[0.25em] text-brand-gold">
              Curated Art & Luxury
            </p>
            <h1 className="font-playfair mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              SHOP
            </h1>
            <p className="font-korean mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              서예, 사진, 그림, 럭셔리까지 FamilyOffice S가 큐레이션한 작품과
              아이템을 만나보세요.
            </p>
          </div>
        </section>

        <section className="section-editorial">
          <div className="container mx-auto max-w-6xl px-4">
            <Suspense fallback={<div className="h-10" aria-hidden="true" />}>
              <ShopCategoryTabs />
            </Suspense>

            <div className="mt-12">
              <CategoryCards {...(activeCategory ? { activeCategory } : {})} />
            </div>

            <div className="card-gold-border mt-12 rounded-2xl bg-white p-8 text-center sm:p-12">
              <p className="font-playfair text-sm uppercase tracking-[0.2em] text-bronze">
                Coming Soon
              </p>
              <h2 className="heading-editorial mt-4 text-3xl">
                {activeLabel} 컬렉션 준비 중
              </h2>
              <p className="font-korean mx-auto mt-4 max-w-xl text-slate-600">
                작품 등록과 결제 기능을 순차적으로 오픈할 예정입니다. 오픈
                알림이나 작품 문의는 상담 신청을 통해 안내드리겠습니다.
              </p>
              <a
                href="/structure-check"
                className="btn-brand-gold mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold"
              >
                상담 신청하기
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
