'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  User,
  FileText,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/types/blog';

/**
 * Props for the BlogContent component
 * @interface BlogContentProps
 */
interface BlogContentProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Blog content component that displays filtered blog posts with category support.
 * Handles URL-based category filtering and separates featured from regular posts.
 * 
 * Features:
 * - URL parameter-based category filtering
 * - Featured posts section
 * - Responsive grid layout
 * - Korean content optimization
 * - SEO-friendly structure
 * 
 * @example
 * ```tsx
 * <BlogContent className="animate-slide-up" />
 * ```
 * 
 * @param props - The component props
 * @returns JSX element with blog post grid
 */
export function BlogContent({ className }: BlogContentProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  // 카테고리 필터링된 포스트
  const filteredPosts = useMemo(() => {
    const allPosts = Object.values(blogPosts);
    
    if (!selectedCategory) {
      return allPosts;
    }
    
    return allPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  // 추천 포스트와 일반 포스트 분리
  const featuredPosts = useMemo(() => 
    filteredPosts.filter(post => post.featured).slice(0, 3),
    [filteredPosts]
  );
  
  const recentPosts = useMemo(() => 
    filteredPosts.filter(post => !post.featured).slice(0, 6),
    [filteredPosts]
  );

  if (filteredPosts.length === 0) {
    return (
      <div className={`text-center py-12 ${className || ''}`}>
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          해당 카테고리의 포스트가 없습니다
        </h3>
        <p className="text-muted-foreground mb-6">
          다른 카테고리를 선택하거나 전체 포스트를 확인해보세요.
        </p>
        <Button asChild>
          <Link href="/insights/market-intelligence">전체 포스트 보기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* 결과 표시 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              {selectedCategory || '전체 포스트'}
            </h2>
            <p className="text-muted-foreground mt-1">
              {filteredPosts.length}개의 포스트를 찾았습니다
            </p>
          </div>
          {selectedCategory && (
            <Badge variant="outline" size="default">
              {selectedCategory}
            </Badge>
          )}
        </div>
      </div>

      {/* 추천 포스트 섹션 */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              추천 포스트
            </h3>
            <p className="text-muted-foreground">
              전문가가 선정한 주요 인사이트
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <PostCard 
                key={post.id}
                post={post}
                featured
                animationDelay={index * 100}
              />
            ))}
          </div>
        </section>
      )}

      {/* 일반 포스트 섹션 */}
      {recentPosts.length > 0 && (
        <section>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {featuredPosts.length > 0 ? '최신 포스트' : '모든 포스트'}
            </h3>
            <p className="text-muted-foreground">
              최신 자산관리 동향과 전략적 인사이트
            </p>
          </div>
          
          <div className="space-y-8">
            {recentPosts.map((post, index) => (
              <PostListItem 
                key={post.id}
                post={post}
                animationDelay={index * 100}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  animationDelay?: number;
}

function PostCard({ post, featured = false, animationDelay = 0 }: PostCardProps) {
  return (
    <div
      className={`card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up ${
        featured ? 'ring-1 ring-primary/20' : ''
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
        <BookOpen className="h-12 w-12 text-primary" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="ghost" size="sm">{post.category}</Badge>
          {featured && (
            <Badge variant="success" size="sm">추천</Badge>
          )}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
          <Link href={`/insights/market-intelligence/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <CalendarDays className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <Button className="w-full" variant="outline" asChild>
          <Link href={`/insights/market-intelligence/${post.slug}`}>
            자세히 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function PostListItem({ post, animationDelay = 0 }: PostCardProps) {
  return (
    <div
      className="card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="md:flex">
        <div className="md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div className="md:w-3/4 p-6">
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <Badge variant="ghost" size="sm">{post.category}</Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
            <Link href={`/insights/market-intelligence/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/insights/market-intelligence/${post.slug}`}>
                자세히 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}