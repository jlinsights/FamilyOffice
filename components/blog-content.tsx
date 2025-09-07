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

interface BlogContentProps {
  className?: string;
}

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
  const getPlatformStyle = () => {
    switch (post.platform) {
      case 'naver-premium':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ring-2 ring-blue-200 dark:ring-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900',
          headerClass: 'aspect-video bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center relative',
          icon: '💎'
        };
      case 'substack':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ring-2 ring-red-200 dark:ring-red-800 bg-gradient-to-br from-red-50 to-white dark:from-red-950 dark:to-gray-900',
          headerClass: 'aspect-video bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center relative',
          icon: '🌍'
        };
      case 'brunch':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ring-2 ring-amber-200 dark:ring-amber-800 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950 dark:to-gray-900',
          headerClass: 'aspect-video bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center relative',
          icon: '✨'
        };
      case 'naver-blog':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up ring-1 ring-green-200 dark:ring-green-800 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900',
          headerClass: 'aspect-video bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center relative',
          icon: '📚'
        };
      default:
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up',
          headerClass: 'aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center',
          icon: '🏠'
        };
    }
  };

  const style = getPlatformStyle();

  return (
    <div
      className={`${style.cardClass} ${featured ? 'ring-1 ring-primary/20' : ''}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className={style.headerClass}>
        <div className="text-4xl opacity-80">{style.icon}</div>
        <div className="absolute top-2 right-2">
          <Badge variant={post.platform === 'naver-premium' ? 'default' : post.platform === 'brunch' ? 'secondary' : post.platform === 'substack' ? 'destructive' : 'outline'} size="sm">
            {post.platform === 'naver-premium' ? '프리미엄' : post.platform === 'naver-blog' ? '네이버 블로그' : post.platform === 'brunch' ? '브런치' : post.platform === 'substack' ? 'Substack' : '내부'}
          </Badge>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="ghost" size="sm">{post.category}</Badge>
          {featured && (
            <Badge variant="success" size="sm">추천</Badge>
          )}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
          <Link href={post.externalUrl || '#'} target="_blank" rel="noopener noreferrer">{post.title}</Link>
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
          <Link href={post.externalUrl || '#'} target="_blank" rel="noopener noreferrer">
            {post.platform === 'naver-premium' ? '프리미엄 콘텐츠 보기' : post.platform === 'substack' ? 'Read on Substack' : post.platform === 'brunch' ? '브런치에서 읽기' : post.platform === 'naver-blog' ? '블로그에서 보기' : '자세히 보기'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function PostListItem({ post, animationDelay = 0 }: PostCardProps) {
  const getPlatformStyle = () => {
    switch (post.platform) {
      case 'naver-premium':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ring-1 ring-blue-200 dark:ring-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900',
          iconAreaClass: 'md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center relative',
          icon: '💎'
        };
      case 'substack':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ring-1 ring-red-200 dark:ring-red-800 bg-gradient-to-br from-red-50 to-white dark:from-red-950 dark:to-gray-900',
          iconAreaClass: 'md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center relative',
          icon: '🌍'
        };
      case 'brunch':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ring-1 ring-amber-200 dark:ring-amber-800 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950 dark:to-gray-900',
          iconAreaClass: 'md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center relative',
          icon: '✨'
        };
      case 'naver-blog':
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up ring-1 ring-green-200 dark:ring-green-800 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900',
          iconAreaClass: 'md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center relative',
          icon: '📚'
        };
      default:
        return {
          cardClass: 'card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up',
          iconAreaClass: 'md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center',
          icon: '🏠'
        };
    }
  };

  const style = getPlatformStyle();

  return (
    <div
      className={style.cardClass}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="md:flex">
        <div className={style.iconAreaClass}>
          <div className="text-3xl opacity-80">{style.icon}</div>
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
            <Link href={post.externalUrl || '#'} target="_blank" rel="noopener noreferrer">{post.title}</Link>
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={post.externalUrl || '#'} target="_blank" rel="noopener noreferrer">
                {post.platform === 'naver-premium' ? '프리미엄 보기' : post.platform === 'substack' ? 'Read More' : post.platform === 'brunch' ? '브런치' : post.platform === 'naver-blog' ? '블로그' : '보기'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}