'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CalendarDays,
  Clock,
  User,
  FileText,
  ArrowRight,
  BookOpen,
  Eye,
  Heart,
  Share2,
  Tag,
  TrendingUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { blogPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/types/blog';
import { cn } from '@/lib/utils';

// Import our new components
import { BlogSearch } from './blog-search';
import { BlogViewToggle, ViewMode } from './blog-view-toggle';
import { BlogFilters, SortOption } from './blog-filters';
import { BlogPagination, InfiniteScrollTrigger } from './blog-pagination';

interface BlogContentAdvancedProps {
  className?: string;
  infiniteScroll?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showViewToggle?: boolean;
  itemsPerPage?: number;
}

export function BlogContentAdvanced({
  className,
  infiniteScroll = false,
  showSearch = true,
  showFilters = true,
  showViewToggle = true,
  itemsPerPage = 12,
}: BlogContentAdvancedProps) {
  const searchParams = useSearchParams();
  
  // States
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );
  const [perPage, setPerPage] = useState(
    parseInt(searchParams.get('per_page') || itemsPerPage.toString())
  );
  const [loadedPages, setLoadedPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // URL parameters
  const selectedCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const sortBy = (searchParams.get('sort') as SortOption) || 'latest';
  const dateRange = searchParams.get('date') || 'all';

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = Object.values(blogPosts);

    // Category filter
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      posts = posts.filter(post =>
        selectedTags.every(tag => post.tags.includes(tag))
      );
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      posts = posts.filter(post => new Date(post.date) >= filterDate);
    }

    // Sorting
    switch (sortBy) {
      case 'latest':
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'popular':
        posts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'views':
        posts.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }

    return posts;
  }, [selectedCategory, searchQuery, selectedTags, sortBy, dateRange]);

  // Pagination
  const paginatedPosts = useMemo(() => {
    if (infiniteScroll) {
      return filteredPosts.slice(0, loadedPages * perPage);
    }
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage, perPage, infiniteScroll, loadedPages]);

  // Featured posts
  const featuredPosts = useMemo(() => 
    filteredPosts.filter(post => post.featured).slice(0, 3),
    [filteredPosts]
  );

  // Infinite scroll handler
  const loadMore = useCallback(() => {
    if (isLoading || paginatedPosts.length >= filteredPosts.length) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setLoadedPages(prev => prev + 1);
      setIsLoading(false);
    }, 500);
  }, [isLoading, paginatedPosts.length, filteredPosts.length]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
    setLoadedPages(1);
  }, [selectedCategory, searchQuery, selectedTags, sortBy, dateRange]);

  if (filteredPosts.length === 0) {
    return (
      <div className={`text-center py-12 ${className || ''}`}>
        <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          검색 결과가 없습니다
        </h3>
        <p className="text-muted-foreground mb-6">
          다른 검색어나 필터를 사용해보세요
        </p>
        <Button asChild>
          <Link href="/insights/market-intelligence">전체 포스트 보기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Search and Filters Section */}
      <div className="space-y-6 mb-12">
        {showSearch && (
          <div className="max-w-3xl mx-auto">
            <BlogSearch />
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {showFilters && <BlogFilters />}
          {showViewToggle && (
            <BlogViewToggle
              defaultView={viewMode}
              onViewChange={setViewMode}
            />
          )}
        </div>
      </div>

      {/* Featured Posts - Only show on first page without active filters */}
      {featuredPosts.length > 0 && currentPage === 1 && !searchQuery && selectedTags.length === 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                추천 포스트
              </h3>
            </div>
            <p className="text-muted-foreground text-lg">
              전문가가 선정한 주요 인사이트
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                featured
                viewMode="grid"
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Posts Grid/List */}
      <section className="mb-12">
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </section>

      {/* Pagination or Infinite Scroll */}
      {!infiniteScroll ? (
        <BlogPagination
          totalItems={filteredPosts.length}
          itemsPerPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setPerPage}
        />
      ) : (
        paginatedPosts.length < filteredPosts.length && (
          <InfiniteScrollTrigger onLoadMore={loadMore} />
        )
      )}
    </div>
  );
}

// Enhanced Post Card Component
interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  viewMode: ViewMode;
}

function PostCard({ post, featured = false, viewMode }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/insights/market-intelligence/${post.slug}`,
      });
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-1 transition-all duration-300 group bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30 border-border/60 dark:border-gray-700">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-48 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-100/80 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            {featured && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                ⭐ 추천
              </Badge>
            )}
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-muted-foreground/70">
                {new Date(post.date).toLocaleDateString('ko-KR')}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
              <Link href={`/insights/market-intelligence/${post.slug}`}>
                {post.title}
              </Link>
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {post.author}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground/70">
                  {post.readTime}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 text-muted-foreground/70 hover:text-red-500 transition-colors"
                >
                  <Heart className={cn('h-4 w-4', isLiked && 'fill-current text-red-500')} />
                  <span className="text-sm">{likes}</span>
                </button>
                {post.views && (
                  <div className="flex items-center gap-1 text-muted-foreground/70">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{post.views}</span>
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="text-muted-foreground/70 hover:text-primary transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-2 transition-all duration-300 group bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30 border-border/60 dark:border-gray-700">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-blue-50/80 to-indigo-100/80 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
          {featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              ⭐ 추천
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="text-xs text-muted-foreground/70">
            {new Date(post.date).toLocaleDateString('ko-KR')}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <Link href={`/insights/market-intelligence/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-muted-foreground/70 hover:text-red-500 transition-colors"
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-current text-red-500')} />
              <span className="text-sm">{likes}</span>
            </button>
            {post.views && (
              <div className="flex items-center gap-1 text-muted-foreground/70">
                <Eye className="h-4 w-4" />
                <span className="text-sm">{post.views}</span>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-muted-foreground/70 hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Loading Skeleton
export function BlogContentSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}