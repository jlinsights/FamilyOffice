'use client';

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Loader2,
  Search,
  Sparkles,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { blogCategories } from '@/lib/blog-data';
import { RSSItem } from '@/lib/rss-aggregator';

interface InsightsFeedProps {
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
}

export default function InsightsFeed({
  limit = 100, // Fetch more items for client-side filtering
  showHeader = true,
  showViewAll = false,
}: InsightsFeedProps) {
  const [content, setContent] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('limit', limit.toString());

      const response = await fetch(`/api/insights?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const items = data.data || data.items || [];

      if (Array.isArray(items)) {
        // Remove duplicates
        const uniqueItems = Array.from(
          new Map(items.map((item: RSSItem) => [item.id, item])).values()
        );
        setContent(uniqueItems);
      } else {
        setContent([]);
      }
    } catch (error: any) {
      console.error('Failed to fetch insights:', error);
      setError(error.message || 'Failed to load content.');
      setContent([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Filter Logic
  const filteredContent = useMemo(() => {
    return content.filter(item => {
      // 1. Source Filter
      if (activeTab !== 'all') {
        if (activeTab === 'local' && item.source !== 'local') return false;
        if (activeTab === 'newsletter' && item.source !== 'beehiiv')
          return false;
        if (activeTab === 'blog' && item.source !== 'naver-blog') return false;
        if (activeTab === 'tistory' && item.source !== 'tistory') return false;
        if (activeTab === 'brunch' && item.source !== 'brunch') return false;
        if (activeTab === 'substack' && item.source !== 'substack')
          return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'all') {
        // Simple string match for category or tags
        const categoryMatch = item.category
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase());
        const tagMatch = item.tags?.some(tag =>
          tag.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        if (!categoryMatch && !tagMatch) return false;
      }

      // 3. Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(query);
        const excerptMatch = item.excerpt?.toLowerCase().includes(query);
        const contentMatch = item.content?.toLowerCase().includes(query);
        if (!titleMatch && !excerptMatch && !contentMatch) return false;
      }

      return true;
    });
  }, [content, activeTab, selectedCategory, searchQuery]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedCategory, searchQuery]);

  // Featured Content (Top 3 items with featured: true, or just top 3 latest if none)
  const featuredContent = useMemo(() => {
    if (searchQuery || activeTab !== 'all' || selectedCategory !== 'all')
      return [];

    const featured = content.filter(item => item.featured);
    if (featured.length > 0) return featured.slice(0, 3);

    // Fallback to top 3 latest local posts if no explicit featured posts
    return content.filter(item => item.source === 'local').slice(0, 3);
  }, [content, searchQuery, activeTab, selectedCategory]);

  // Main Feed Content (Exclude featured if showing featured section)
  const mainFeedContent = useMemo(() => {
    if (featuredContent.length > 0) {
      const featuredIds = new Set(featuredContent.map(item => item.id));
      return filteredContent.filter(item => !featuredIds.has(item.id));
    }
    return filteredContent;
  }, [filteredContent, featuredContent]);

  // Pagination Logic
  const totalPages = Math.ceil(mainFeedContent.length / ITEMS_PER_PAGE);
  const paginatedContent = mainFeedContent.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'local':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200">
            전문가 칼럼
          </Badge>
        );
      case 'beehiiv':
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200">
            뉴스레터
          </Badge>
        );
      case 'naver-blog':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 border-green-200">
            네이버 블로그
          </Badge>
        );
      case 'tistory':
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200">
            티스토리
          </Badge>
        );
      case 'brunch':
        return (
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200">
            브런치
          </Badge>
        );
      case 'substack':
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200">
            Substack
          </Badge>
        );
      default:
        return <Badge variant="outline">인사이트</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <span className="text-lg text-muted-foreground">
          최신 인사이트를 불러오는 중입니다...
        </span>
      </div>
    );
  }

  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-900/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              탐색하기
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-1">
              원하는 주제의 인사이트를 쉽고 빠르게 찾아보세요.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              📅 발행 일정: 전문가 칼럼(월/목), 뉴스레터(화/금), 블로그(수) 오전
              7:30
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="검색어 입력 (제목, 내용)"
                className="pl-10 bg-white dark:bg-slate-800"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48 bg-white dark:bg-slate-800">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                {blogCategories.map(cat => (
                  <SelectItem key={cat.slug} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-10">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 h-auto gap-2 max-w-5xl bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded-xl">
              <TabsTrigger
                value="all"
                className="rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700 py-2"
              >
                전체
              </TabsTrigger>
              <TabsTrigger
                value="local"
                className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-300 py-2"
              >
                전문가 칼럼
              </TabsTrigger>
              <TabsTrigger
                value="newsletter"
                className="rounded-lg data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300 py-2"
              >
                뉴스레터
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="rounded-lg data-[state=active]:bg-green-50 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-300 py-2"
              >
                블로그
              </TabsTrigger>
              <TabsTrigger
                value="tistory"
                className="rounded-lg data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/30 dark:data-[state=active]:text-orange-300 py-2"
              >
                티스토리
              </TabsTrigger>
              <TabsTrigger
                value="brunch"
                className="rounded-lg data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/30 dark:data-[state=active]:text-teal-300 py-2"
              >
                브런치
              </TabsTrigger>
              <TabsTrigger
                value="substack"
                className="rounded-lg data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/30 dark:data-[state=active]:text-orange-300 py-2"
              >
                Substack
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Section (Only visible when no filters active) */}
        {featuredContent.length > 0 && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Featured Insights
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredContent.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`group ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <CardContent className="relative z-20 h-full flex flex-col justify-end p-6 md:p-8">
                      <div className="mb-3 flex gap-2">
                        {getSourceBadge(item.source)}
                        {item.category && (
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-0"
                          >
                            {item.category}
                          </Badge>
                        )}
                      </div>
                      <h3
                        className={`font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors ${idx === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-slate-200 line-clamp-2 mb-4 text-sm md:text-base font-light">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center text-slate-300 text-xs md:text-sm gap-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />{' '}
                          {formatDate(item.publishedAt)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />{' '}
                          {item.readTime || '5분 읽기'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="insights-grid"
        >
          {paginatedContent.length > 0 ? (
            paginatedContent.map(item => (
              <Card
                key={item.id}
                className="group flex flex-col h-full border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      <span className="text-4xl opacity-20">📄</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    {getSourceBadge(item.source)}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                    <span className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      {item.category || '일반'}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.lastUpdated ? (
                        <span
                          className="text-blue-600 dark:text-blue-400 font-semibold"
                          title={`최초 발행: ${formatDate(item.publishedAt)}`}
                        >
                          {formatDate(item.lastUpdated)} (Updated)
                        </span>
                      ) : (
                        formatDate(item.publishedAt)
                      )}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    <Link
                      href={item.url}
                      target={item.source === 'local' ? '_self' : '_blank'}
                    >
                      {item.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow pb-3">
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {item.excerpt}
                  </CardDescription>
                </CardContent>

                <CardFooter className="pt-0 pb-5 border-t border-slate-50 dark:border-slate-800/50 mt-auto">
                  <div className="flex items-center justify-between w-full mt-4">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.readTime || '5분 읽기'}
                    </div>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 p-0 h-auto font-medium"
                    >
                      <Link
                        href={item.url}
                        target={item.source === 'local' ? '_self' : '_blank'}
                        className="flex items-center"
                      >
                        Read More <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                다른 검색어나 카테고리를 선택해보세요.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                  setSelectedCategory('all');
                }}
              >
                필터 초기화
              </Button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                document
                  .getElementById('insights-grid')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              disabled={currentPage === 1}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'ghost'}
                  onClick={() => {
                    setCurrentPage(page);
                    document
                      .getElementById('insights-grid')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-10 h-10 p-0 rounded-full ${currentPage === page ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                document
                  .getElementById('insights-grid')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              disabled={currentPage === totalPages}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
