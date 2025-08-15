'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={selectedCategory === '' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleCategoryChange('')}
        className="flex items-center gap-2"
      >
        전체
        {selectedCategory === '' && (
          <Badge variant="ghost" size="xs">
            All
          </Badge>
        )}
      </Button>
      
      {blogCategories.map((category) => (
        <Button
          key={category.slug}
          variant={selectedCategory === category.name ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleCategoryChange(category.name)}
          className="flex items-center gap-2"
        >
          {category.name}
          <Badge variant="ghost" size="xs">
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