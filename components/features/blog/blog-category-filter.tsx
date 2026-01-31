'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { blogCategories } from '@/lib/blog-data';

export function BlogCategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  const handleCategoryChange = (category: string) => {
    const url = new URL(window.location.href);

    if (category === '') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }

    router.push(url.pathname + url.search);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant={selectedCategory === '' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleCategoryChange('')}
        className={`flex items-center gap-2 rounded-xl transition-all duration-200 ${
          selectedCategory === ''
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
        }`}
      >
        전체
        {selectedCategory === '' && (
          <Badge
            variant="secondary"
            size="xs"
            className="bg-blue-500 text-white"
          >
            All
          </Badge>
        )}
      </Button>

      {blogCategories.map(category => (
        <Button
          key={category.slug}
          variant={selectedCategory === category.name ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleCategoryChange(category.name)}
          className={`flex items-center gap-2 rounded-xl transition-all duration-200 ${
            selectedCategory === category.name
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          {category.name}
          <Badge
            variant="secondary"
            size="xs"
            className={
              selectedCategory === category.name
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
            }
          >
            {category.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
}

export function BlogCategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <div className="h-8 w-16 bg-muted rounded-md animate-pulse" />
      <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
      <div className="h-8 w-18 bg-muted rounded-md animate-pulse" />
      <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
      <div className="h-8 w-16 bg-muted rounded-md animate-pulse" />
    </div>
  );
}
