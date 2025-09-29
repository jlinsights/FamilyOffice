'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, Filter, Tag, TrendingUp, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { blogCategories } from '@/lib/blog-data';
import { X } from 'lucide-react';

export type SortOption = 'latest' | 'popular' | 'views' | 'oldest';

const sortOptions = [
  { value: 'latest', label: '최신순', icon: Clock },
  { value: 'popular', label: '인기순', icon: TrendingUp },
  { value: 'views', label: '조회순', icon: Eye },
  { value: 'oldest', label: '과거순', icon: Calendar },
];

const dateRanges = [
  { value: 'all', label: '전체 기간' },
  { value: 'today', label: '오늘' },
  { value: 'week', label: '이번 주' },
  { value: 'month', label: '이번 달' },
  { value: 'quarter', label: '최근 3개월' },
  { value: 'year', label: '올해' },
];

// 예시 태그 (실제로는 포스트에서 추출)
const popularTags = ['자산관리', '상속', '세무', '투자전략', 'M&A', '기업승계', '부동산', '해외투자'];

export function BlogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'latest'
  );
  const [dateRange, setDateRange] = useState(searchParams.get('date') || 'all');
  const [activeFilters, setActiveFilters] = useState(0);

  const updateURL = (updates: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    
    router.push(url.pathname + url.search);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category: category || null });
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    updateURL({ tags: newTags.length > 0 ? newTags.join(',') : null });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    updateURL({ sort });
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    updateURL({ date: range !== 'all' ? range : null });
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setSortBy('latest');
    setDateRange('all');
    
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('tags');
    url.searchParams.delete('sort');
    url.searchParams.delete('date');
    router.push(url.pathname + url.search);
  };

  // 활성 필터 수 계산
  const countActiveFilters = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedTags.length > 0) count += selectedTags.length;
    if (sortBy !== 'latest') count++;
    if (dateRange !== 'all') count++;
    return count;
  };

  const filterCount = countActiveFilters();

  return (
    <div className="space-y-4">
      {/* 상단 필터 바 */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        {/* 정렬 옵션 */}
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[140px] rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* 필터 메뉴 */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                필터
                {filterCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    {filterCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>필터 옵션</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* 기간 필터 */}
              <div className="p-2">
                <p className="text-sm font-medium mb-2">기간</p>
                <Select value={dateRange} onValueChange={handleDateRangeChange}>
                  <SelectTrigger className="w-full rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <DropdownMenuSeparator />
              
              {/* 태그 필터 */}
              <div className="p-2">
                <p className="text-sm font-medium mb-2">태그</p>
                <div className="flex flex-wrap gap-1">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {filterCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearAllFilters}>
                    <X className="h-4 w-4 mr-2" />
                    모든 필터 초기화
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 활성 필터 표시 */}
      {(selectedTags.length > 0 || dateRange !== 'all') && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">활성 필터:</span>
          
          {dateRange !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              <Calendar className="h-3 w-3" />
              {dateRanges.find(r => r.value === dateRange)?.label}
              <button
                onClick={() => handleDateRangeChange('all')}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          )}
          
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              <Tag className="h-3 w-3" />
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-slate-600 dark:text-slate-400 hover:text-red-600"
          >
            모두 지우기
          </Button>
        </div>
      )}
    </div>
  );
}

