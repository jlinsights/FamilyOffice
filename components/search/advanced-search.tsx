'use client';

import { Search, X, Clock, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface AdvancedSearchProps {
  onSearch: (query: string, filters: Record<string, any>) => void;
  filters?: Array<{
    key: string;
    label: string;
    type: 'select' | 'date' | 'number';
    options?: Array<{ value: string; label: string }>;
  }>;
  placeholder?: string;
  className?: string;
}

export function AdvancedSearch({
  onSearch,
  filters = [],
  placeholder = '거래내역, 자산, 계좌 검색...',
  className,
}: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const debouncedSearch = useCallback(
    (searchQuery: string, filters: Record<string, any>) => {
      const debouncedFn = debounce(() => {
        onSearch(searchQuery, filters);
        if (searchQuery.trim()) {
          setRecentSearches(prev =>
            [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5)
          );
        }
      }, 300);
      debouncedFn();
    },
    [onSearch]
  );

  const handleSearch = (
    searchQuery: string,
    searchFilters: Record<string, any>
  ) => {
    setQuery(searchQuery);
    debouncedSearch(searchQuery, searchFilters);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters };
    if (value === '' || value === null || value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    setActiveFilters(newFilters);
    debouncedSearch(query, newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    debouncedSearch(query, {});
  };

  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newOrder);
    // 실제 정렬 로직은 부모 컴포넌트에서 처리
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* 검색 입력 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={e => handleSearch(e.target.value, activeFilters)}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleSearch('', activeFilters)}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* 필터 영역 */}
      {showFilters && (
        <div className="p-4 bg-muted/50 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">필터</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              모두 지우기
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filters.map(filter => (
              <div key={filter.key} className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {filter.label}
                </label>
                {filter.type === 'select' && filter.options ? (
                  <select
                    value={activeFilters[filter.key] || ''}
                    onChange={e =>
                      handleFilterChange(filter.key, e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border rounded-md bg-background"
                  >
                    <option value="">전체</option>
                    {filter.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : filter.type === 'date' ? (
                  <Input
                    type="date"
                    value={activeFilters[filter.key] || ''}
                    onChange={e =>
                      handleFilterChange(filter.key, e.target.value)
                    }
                    className="text-sm"
                  />
                ) : (
                  <Input
                    type="number"
                    placeholder="숫자 입력"
                    value={activeFilters[filter.key] || ''}
                    onChange={e =>
                      handleFilterChange(filter.key, e.target.value)
                    }
                    className="text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 활성 필터 표시 */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.key === key);
            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {filter?.label || key}: {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleFilterChange(key, '')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* 최근 검색어 */}
      {recentSearches.length > 0 && query === '' && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">최근 검색어</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSearch(search, activeFilters)}
                className="text-xs"
              >
                <Clock className="h-3 w-3 mr-1" />
                {search}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 정렬 옵션 */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">정렬:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSort('date')}
          className={cn(
            'text-xs',
            sortBy === 'date' && 'bg-primary text-primary-foreground'
          )}
        >
          날짜
          {sortBy === 'date' &&
            (sortOrder === 'asc' ? (
              <SortAsc className="h-3 w-3 ml-1" />
            ) : (
              <SortDesc className="h-3 w-3 ml-1" />
            ))}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSort('amount')}
          className={cn(
            'text-xs',
            sortBy === 'amount' && 'bg-primary text-primary-foreground'
          )}
        >
          금액
          {sortBy === 'amount' &&
            (sortOrder === 'asc' ? (
              <SortAsc className="h-3 w-3 ml-1" />
            ) : (
              <SortDesc className="h-3 w-3 ml-1" />
            ))}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSort('type')}
          className={cn(
            'text-xs',
            sortBy === 'type' && 'bg-primary text-primary-foreground'
          )}
        >
          유형
          {sortBy === 'type' &&
            (sortOrder === 'asc' ? (
              <SortAsc className="h-3 w-3 ml-1" />
            ) : (
              <SortDesc className="h-3 w-3 ml-1" />
            ))}
        </Button>
      </div>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 검색 결과 컴포넌트
interface SearchResult {
  id: string;
  type: 'transaction' | 'asset' | 'account';
  title: string;
  description: string;
  amount?: number;
  date: string;
  category?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
  onResultClick?: (result: SearchResult) => void;
}

export function SearchResults({
  results,
  isLoading,
  onResultClick,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {results.map(result => (
        <div
          key={result.id}
          className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
          onClick={() => onResultClick?.(result)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium">{result.title}</h4>
              <p className="text-sm text-muted-foreground">
                {result.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-muted-foreground">
                  {result.date}
                </span>
                {result.category && (
                  <Badge variant="outline" className="text-xs">
                    {result.category}
                  </Badge>
                )}
              </div>
            </div>
            {result.amount && (
              <div className="text-right">
                <p className="font-medium">₩{result.amount.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
