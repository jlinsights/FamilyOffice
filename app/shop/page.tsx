import { ShopPageContent } from '@/components/shop/shop-page-content';
import { generateMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata(
  'SHOP | 서예·사진·그림·럭셔리 큐레이션 | FamilyOffice S',
  'FamilyOffice S SHOP에서 서예, 사진, 그림, 럭셔리 아이템을 만나보세요. 큐레이션된 작품과 컬렉션을 순차적으로 오픈합니다.',
  [
    '패밀리오피스 SHOP',
    '서예 작품',
    '아트 포토',
    '럭셔리 큐레이션',
    'FamilyOffice S',
  ]
);

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;

  return <ShopPageContent category={category} />;
}
