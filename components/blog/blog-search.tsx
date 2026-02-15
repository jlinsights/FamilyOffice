'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { debounce } from '@/lib/utils';

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [isSearching, setIsSearching] = useState(false);

  // 디바운스된 검색 함수 - useMemo로 debounce 함수를 메모화
  const debouncedSearchFn = useMemo(
    () =>
      debounce((query: string) => {
        const url = new URL(window.location.href);

        if (query) {
          url.searchParams.set('search', query);
        } else {
          url.searchParams.delete('search');
        }

        router.push(url.pathname + url.search);
        setIsSearching(false);
      }, 500),
    [router]
  );

  const debouncedSearch = useCallback(debouncedSearchFn, [debouncedSearchFn]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsSearching(true);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    router.push(url.pathname + url.search);
  };

  // 인기 검색어 (실제로는 분석 데이터 기반)
  const popularSearches = ['자산관리', '상속', '세무', '투자', 'M&A'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-slate-400" />
          <Input
            type="search"
            placeholder="포스트 검색..."
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            className="pl-10 pr-10 h-12 text-base bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isSearching && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 animate-pulse" />
        )}
      </div>

      {/* 인기 검색어 */}
      {!searchQuery && (
        <div className="mt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            인기 검색어
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map(term => (
              <Badge
                key={term}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                onClick={() => handleSearchChange(term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
