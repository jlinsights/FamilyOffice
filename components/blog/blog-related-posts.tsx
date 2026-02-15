'use client';

import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import { useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/types/blog';

interface BlogRelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

export function BlogRelatedPosts({
  currentPost,
  maxPosts = 3,
}: BlogRelatedPostsProps) {
  const relatedPosts = useMemo(() => {
    const allPosts = Object.values(blogPosts).filter(
      post => post.id !== currentPost.id
    );

    // Score posts based on similarity
    const scoredPosts = allPosts.map(post => {
      let score = 0;

      // Same category = highest score
      if (post.category === currentPost.category) {
        score += 10;
      }

      // Shared tags
      const sharedTags = post.tags.filter(tag =>
        currentPost.tags.includes(tag)
      );
      score += sharedTags.length * 3;

      // Similar author
      if (post.author === currentPost.author) {
        score += 2;
      }

      return { post, score };
    });

    // Sort by score and return top posts
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, maxPosts)
      .map(item => item.post);
  }, [currentPost, maxPosts]);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          관련 포스트
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          이 포스트와 유사한 주제의 글들을 확인해보세요
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <Card
            key={post.id}
            className="group hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-3">
                {post.category}
              </Badge>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                <Link href={`/insights/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString('ko-KR')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </div>
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" asChild className="rounded-xl">
          <Link href="/insights">
            더 많은 포스트 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
