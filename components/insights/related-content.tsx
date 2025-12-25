'use client';

import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getRecommendations } from '@/lib/content-recommendations';
import { RSSItem } from '@/lib/rss-aggregator';

interface RelatedContentProps {
  currentItem: RSSItem;
  allItems: RSSItem[];
  limit?: number;
}

export function RelatedContent({
  currentItem,
  allItems,
  limit = 3,
}: RelatedContentProps) {
  const recommendations = getRecommendations(currentItem, allItems, limit);

  if (recommendations.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <section className="mt-16 border-t pt-12 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          이 글과 함께 읽으면 좋은 콘텐츠
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {recommendations.map(item => (
          <Link
            key={item.id}
            href={item.url}
            target={item.source === 'local' ? '_self' : '_blank'}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 overflow-hidden">
              {/* Image */}
              {item.imageUrl && (
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}

              <CardHeader className="pb-3">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-2 text-xs">
                  {item.category && (
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  )}
                  <span className="text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(item.publishedAt)}
                  </span>
                </div>

                {/* Title */}
                <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                {/* Excerpt */}
                <CardDescription className="line-clamp-2 text-sm leading-relaxed mb-3">
                  {item.excerpt}
                </CardDescription>

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.readTime || '5분 읽기'}
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    계속 읽기 <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/insights"
          className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          더 많은 인사이트 탐색하기 <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </section>
  );
}
