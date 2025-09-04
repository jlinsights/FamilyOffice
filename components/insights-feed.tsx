'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { RSSItem } from '@/lib/rss-aggregator';

interface InsightsFeedProps {
  limit?: number;
  source?: 'beehiiv' | 'naver-blog';
  category?: string;
  showHeader?: boolean;
  showViewAll?: boolean;
}

export default function InsightsFeed({
  limit = 6,
  source,
  category,
  showHeader = true,
  showViewAll = true
}: InsightsFeedProps) {
  const [content, setContent] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [source, category, limit]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (source) params.append('source', source);
      if (category) params.append('category', category);
      params.append('limit', limit.toString());
      // 네이버 블로그 ID는 서버에서 환경변수로 자동 처리

      const response = await fetch(`/api/insights?${params.toString()}`);
      
      if (!response.ok) {
        console.warn('API response not ok, using fallback data');
        setContent(fallbackContent.slice(0, limit));
        return;
      }

      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setContent(data.data);
      } else {
        console.warn('No data from API, using fallback');
        setContent(fallbackContent.slice(0, limit));
      }
    } catch (err) {
      console.warn('Insights feed error, using fallback:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // 에러 시 fallback 데이터 사용
      setContent(fallbackContent.slice(0, limit));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const getSourceBadgeVariant = (source: string) => {
    switch (source) {
      case 'beehiiv':
        return 'default';
      case 'naver-blog':
        return 'default'; // 블로그도 뉴스레터와 동일한 디자인
      default:
        return 'outline';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'beehiiv':
        return '뉴스레터';
      case 'naver-blog':
        return '블로그';
      default:
        return '인사이트';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-foreground/70">콘텐츠를 불러오는 중...</span>
      </div>
    );
  }

  if (error && content.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground/70 mb-4">콘텐츠를 불러올 수 없습니다.</p>
        <Button onClick={fetchContent} variant="outline">다시 시도</Button>
      </div>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              최신 인사이트
            </h2>
            <p className="text-lg text-foreground/70">
              자산관리 전문가들이 전하는 최신 시장 분석과 투자 전략
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((item, index) => (
            <Card 
              key={item.id} 
              className="bg-card border-border hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={getSourceBadgeVariant(item.source)}>
                    {getSourceLabel(item.source)}
                  </Badge>
                  <div className="flex items-center text-foreground/60 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.readTime}
                  </div>
                </div>
                
                {item.category && (
                  <div className="text-sm font-medium text-primary mb-2">
                    {item.category}
                  </div>
                )}
                
                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                
                <CardDescription className="text-base line-clamp-3 mt-2">
                  {item.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-foreground/60 text-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(item.publishedAt)}
                  </div>
                  <div className="text-sm text-foreground/60">
                    {item.author}
                  </div>
                </div>
                
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:border-primary group-hover:text-primary"
                >
                  <a 
                    href={item.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    읽어보기
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-12">
            <Link href="/insights/market-intelligence">
              <Button size="lg" variant="outline">
                모든 글 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Fallback 데이터 (RSS 피드가 실패했을 때 사용)
const fallbackContent: RSSItem[] = [
  {
    id: 'fallback-1',
    title: '2025년 글로벌 투자 전망과 포트폴리오 전략',
    content: '',
    excerpt: '불확실한 시장 환경에서 안정적인 수익을 추구하는 자산 배분 전략을 소개합니다.',
    url: 'https://blog.naver.com/lim_jaehong',
    publishedAt: '2025-01-15T00:00:00Z',
    author: 'Editor',
    source: 'naver-blog',
    category: '투자전략',
    tags: ['투자', '전략', '포트폴리오'],
    readTime: '5분 읽기'
  },
  {
    id: 'fallback-2',
    title: '가족법인 설립을 통한 절세 전략 완벽 가이드',
    content: '',
    excerpt: '합법적인 세무 구조 개선을 통해 상속·증여세를 절감하는 방법을 알아봅니다.',
    url: 'https://newsletter.familyoffices.vip',
    publishedAt: '2025-01-12T00:00:00Z',
    author: 'Editor',
    source: 'beehiiv',
    category: '세무최적화',
    tags: ['세무', '절세', '가족법인'],
    readTime: '8분 읽기'
  },
  {
    id: 'fallback-3',
    title: '성공적인 가업승계를 위한 5가지 핵심 전략',
    content: '',
    excerpt: '100년 기업으로 나아가기 위한 체계적인 승계 계획 수립 방법을 제시합니다.',
    url: 'https://newsletter.familyoffices.vip',
    publishedAt: '2025-01-10T00:00:00Z',
    author: 'Editor',
    source: 'beehiiv',
    category: '패밀리오피스',
    tags: ['가업승계', '전략', '기업경영'],
    readTime: '6분 읽기'
  }
];