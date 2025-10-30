'use client';

import { useEffect, useState, useCallback } from 'react';
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
  limit = 9,
  source,
  category,
  showHeader = true,
  showViewAll = true
}: InsightsFeedProps) {
  const [content, setContent] = useState<RSSItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'beehiiv' | 'naver-blog'>('all');

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // source 파라미터를 제거하여 모든 콘텐츠(beehiiv + naver-blog)를 가져오도록 수정
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      params.append('limit', (limit * 2).toString()); // 필터링을 위해 더 많은 데이터 가져오기

      const response = await fetch(`/api/insights?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched content:', data);
      
      // API 응답 형식에 맞게 수정: data.data 또는 data.items
      const items = data.data || data.items || [];
      
      if (Array.isArray(items)) {
        // 중복 ID 제거 (같은 ID를 가진 첫 번째 항목만 유지)
        const uniqueItems = Array.from(
          new Map(items.map(item => [item.id, item])).values()
        );
        setContent(uniqueItems);
      } else {
        console.warn('No items found in response');
        setContent([]);
      }
    } catch (error: any) {
      console.error('RSS 피드 로딩 오류:', error);
      setError(error.message || 'RSS 피드를 불러오는데 실패했습니다.');
      setContent([]);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchContent();
    // 5분마다 자동 갱신
    const interval = setInterval(() => {
      fetchContent();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchContent]); // fetchContent dependency added

  useEffect(() => {
    // 필터링 적용
    console.log('Filtering content:', { activeFilter, contentLength: content.length });
    if (activeFilter === 'all') {
      setFilteredContent(content);
    } else {
      const filtered = content.filter(item => {
        console.log('Item source:', item.source, 'Filter:', activeFilter);
        return item.source === activeFilter;
      });
      console.log('Filtered result:', filtered.length);
      setFilteredContent(filtered);
    }
  }, [activeFilter, content]);


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

        {/* 필터 버튼 */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
            className="px-6"
          >
            전체 ({content.length})
          </Button>
          <Button
            variant={activeFilter === 'naver-blog' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('naver-blog')}
            className="px-6"
          >
            블로그 ({content.filter(item => item.source === 'naver-blog').length})
          </Button>
          <Button
            variant={activeFilter === 'beehiiv' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('beehiiv')}
            className="px-6"
          >
            뉴스레터 ({content.filter(item => item.source === 'beehiiv').length})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.slice(0, 9).map((item, index) => (
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
                
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 group-hover:border-primary group-hover:text-primary"
                  >
                    <Link href="/insights/market-intelligence">
                      읽어보기
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                  
                  {item.url && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="group-hover:border-primary group-hover:text-primary"
                    >
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="원본 보기"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="ml-1">원본</span>
                      </a>
                    </Button>
                  )}
                </div>
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
  },
  {
    id: 'fallback-4',
    title: 'CEO 경영권 방어를 위한 법적 조치 가이드',
    content: '',
    excerpt: '적대적 M&A와 경영권 위협으로부터 기업을 보호하는 실전 전략을 소개합니다.',
    url: 'https://newsletter.familyoffices.vip',
    publishedAt: '2025-01-08T00:00:00Z',
    author: 'Editor',
    source: 'beehiiv',
    category: '경영전략',
    tags: ['M&A', '경영권', '법무'],
    readTime: '10분 읽기'
  },
  {
    id: 'fallback-5',
    title: '부동산 PF 투자의 리스크 관리 방안',
    content: '',
    excerpt: '프로젝트 파이낸싱 투자 시 고려해야 할 핵심 리스크 요소와 대응 전략을 다룹니다.',
    url: 'https://blog.naver.com/lim_jaehong',
    publishedAt: '2025-01-06T00:00:00Z',
    author: 'Editor',
    source: 'naver-blog',
    category: '부동산',
    tags: ['부동산', 'PF', '투자'],
    readTime: '6분 읽기'
  },
  {
    id: 'fallback-6',
    title: 'ESG 경영이 기업가치에 미치는 영향',
    content: '',
    excerpt: '지속가능경영이 장기적 기업가치 향상에 미치는 영향을 데이터로 분석합니다.',
    url: 'https://newsletter.familyoffices.vip',
    publishedAt: '2025-01-04T00:00:00Z',
    author: 'Editor',
    source: 'beehiiv',
    category: 'ESG',
    tags: ['ESG', '지속가능경영', '기업가치'],
    readTime: '8분 읽기'
  },
  {
    id: 'fallback-7',
    title: '가족신탁을 활용한 자산관리 전략',
    content: '',
    excerpt: '고액자산가를 위한 신탁 구조 설계와 세무 최적화 방법을 상세히 안내합니다.',
    url: 'https://blog.naver.com/lim_jaehong',
    publishedAt: '2025-01-02T00:00:00Z',
    author: 'Editor',
    source: 'naver-blog',
    category: '자산관리',
    tags: ['신탁', '자산관리', '절세'],
    readTime: '9분 읽기'
  },
  {
    id: 'fallback-8',
    title: '주식시장 변동성 대응 전략: 헤지펀드 투자의 모든 것',
    content: '',
    excerpt: '시장 불확실성 속에서 안정적인 수익을 추구하는 헤지펀드 투자 전략을 분석합니다.',
    url: 'https://blog.naver.com/lim_jaehong',
    publishedAt: '2024-12-30T00:00:00Z',
    author: 'Editor',
    source: 'naver-blog',
    category: '투자전략',
    tags: ['헤지펀드', '투자', '리스크관리'],
    readTime: '7분 읽기'
  },
  {
    id: 'fallback-9',
    title: '2025년 기업 인수합병(M&A) 시장 전망',
    content: '',
    excerpt: '국내외 M&A 시장의 주요 트렌드와 기회 요인을 전문가 시각에서 분석합니다.',
    url: 'https://newsletter.familyoffices.vip',
    publishedAt: '2024-12-28T00:00:00Z',
    author: 'Editor',
    source: 'beehiiv',
    category: 'M&A',
    tags: ['M&A', '시장전망', '투자기회'],
    readTime: '12분 읽기'
  }
];