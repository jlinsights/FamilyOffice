'use client';

import {
  CalendarDays,
  Clock,
  User,
  FileText,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

import { useMemo } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
  const featuredPosts = useMemo(
    () => filteredPosts.filter(post => post.featured).slice(0, 3),
    [filteredPosts]
  );

  const recentPosts = useMemo(
    () => filteredPosts.filter(post => !post.featured).slice(0, 6),
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
          <Link href="/insights">전체 포스트 보기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* 결과 표시 - Modern Header */}
      <div className="mb-12">
        <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {selectedCategory || '전체 포스트'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                📝 {filteredPosts.length}개의 포스트를 찾았습니다
              </p>
            </div>
            {selectedCategory && (
              <Badge
                variant="secondary"
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
              >
                {selectedCategory}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 추천 포스트 섹션 - Enhanced Design */}
      {featuredPosts.length > 0 && (
        <section className="mb-20">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
                <span className="text-white text-sm font-bold">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                추천 포스트
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
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

      {/* 일반 포스트 섹션 - Modern List Design */}
      {recentPosts.length > 0 && (
        <section>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <span className="text-white text-sm font-bold">📰</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {featuredPosts.length > 0 ? '최신 포스트' : '모든 포스트'}
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              최신 자산관리 동향과 전략적 인사이트
            </p>
          </div>

          <div className="space-y-6">
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

function PostCard({
  post,
  featured = false,
  animationDelay = 0,
}: PostCardProps) {
  return (
    <div
      className={`group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up ${
        featured ? 'ring-2 ring-yellow-400/20 shadow-lg' : ''
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Header Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center relative overflow-hidden">
        <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-sm">
              ⭐ 추천
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-4">
          <Badge
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            {post.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <Link href={`/insights/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <CalendarDays className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          asChild
        >
          <Link href={`/insights/${post.slug}`}>
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
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="md:flex">
        {/* Thumbnail */}
        <div className="md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
          <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Content */}
        <div className="md:w-3/4 p-6">
          {/* Meta Info Top */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <CalendarDays className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            <Link href={`/insights/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Bottom Meta & CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl"
              asChild
            >
              <Link href={`/insights/${post.slug}`}>
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
