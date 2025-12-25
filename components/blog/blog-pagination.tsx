'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BlogPaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
}

export function BlogPagination({
  totalItems,
  itemsPerPage = 12,
  currentPage = 1,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
}: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const updateURL = (page: number, perPage?: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    if (perPage) {
      url.searchParams.set('per_page', perPage.toString());
    }
    router.push(url.pathname + url.search);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange?.(page);
    updateURL(page, itemsPerPage);
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value);
    onItemsPerPageChange?.(newItemsPerPage);
    updateURL(1, newItemsPerPage); // Reset to page 1
  };

  // 페이지 번호 생성 로직
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    const halfVisible = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    // 시작이나 끝에 가까울 때 조정
    if (currentPage <= halfVisible) {
      end = Math.min(totalPages, maxVisible);
    }
    if (currentPage > totalPages - halfVisible) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    // 첫 페이지 추가
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    // 중간 페이지들
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 마지막 페이지 추가
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* 왼쪽: 페이지 정보 */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          전체 {totalItems}개 중 {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}개 표시
        </p>

        {showItemsPerPage && (
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[120px] h-9 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6개씩 보기</SelectItem>
              <SelectItem value="12">12개씩 보기</SelectItem>
              <SelectItem value="24">24개씩 보기</SelectItem>
              <SelectItem value="48">48개씩 보기</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* 오른쪽: 페이지네이션 버튼 */}
      <div className="flex items-center gap-1">
        {/* 처음으로 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* 이전 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* 페이지 번호들 */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-2 text-slate-400">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handlePageChange(page as number)}
                  className={`h-9 min-w-[36px] ${
                    currentPage === page
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* 다음 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* 마지막으로 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// 무한 스크롤 컴포넌트
export function InfiniteScrollTrigger({
  onLoadMore,
}: {
  onLoadMore: () => void;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            onLoadMore();
          }
        }
      },
      { threshold: 0.1 }
    );

    const trigger = document.getElementById('infinite-scroll-trigger');
    if (trigger) observer.observe(trigger);

    return () => {
      if (trigger) observer.unobserve(trigger);
    };
  }, [onLoadMore]);

  return (
    <div id="infinite-scroll-trigger" className="flex justify-center py-8">
      {isIntersecting && (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <span className="text-slate-600 dark:text-slate-400">
            더 불러오는 중...
          </span>
        </div>
      )}
    </div>
  );
}
