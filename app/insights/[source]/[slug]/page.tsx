import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, ExternalLink, Share2, User } from 'lucide-react';
import { rssAggregator } from '@/lib/rss-aggregator';

interface InsightContentPageProps {
  params: {
    source: string;
    slug: string;
  };
}

// 메타데이터 생성
export async function generateMetadata({ params }: InsightContentPageProps): Promise<Metadata> {
  const { source, slug } = params;
  
  try {
    const content = await rssAggregator.getContentById(slug);
    
    if (!content) {
      return {
        title: '콘텐츠를 찾을 수 없습니다 | FamilyOffice S',
        description: '요청하신 콘텐츠를 찾을 수 없습니다.',
      };
    }

    const sourceLabel = getSourceLabel(source);

    return {
      title: `${content.title} | ${sourceLabel} | FamilyOffice S`,
      description: content.excerpt,
      keywords: content.tags.join(', '),
      openGraph: {
        title: content.title,
        description: content.excerpt,
        type: 'article',
        publishedTime: content.publishedAt,
        authors: [content.author],
        tags: content.tags,
        images: content.imageUrl ? [{ url: content.imageUrl }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: content.title,
        description: content.excerpt,
        images: content.imageUrl ? [content.imageUrl] : undefined,
      },
      alternates: {
        canonical: `/insights/${source}/${slug}`,
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 오류:', error);
    return {
      title: '인사이트 | FamilyOffice S',
      description: '자산관리 전문가의 인사이트를 확인해보세요.',
    };
  }
}

function getSourceLabel(source: string): string {
  switch (source) {
    case 'beehiiv':
      return '뉴스레터';
    case 'naver-blog':
      return '블로그';
    default:
      return '인사이트';
  }
}

function getSourceBadgeVariant(source: string) {
  switch (source) {
    case 'beehiiv':
      return 'default';
    case 'naver-blog':
      return 'secondary';
    default:
      return 'outline';
  }
}

export default async function InsightContentPage({ params }: InsightContentPageProps) {
  const { source, slug } = params;
  
  try {
    const content = await rssAggregator.getContentById(slug);
    
    if (!content) {
      notFound();
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    };

    // 구조화된 데이터 (JSON-LD)
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": content.title,
      "description": content.excerpt,
      "author": {
        "@type": "Person",
        "name": content.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "FamilyOffice S",
        "logo": {
          "@type": "ImageObject",
          "url": "https://familyoffices.vip/favicon.png"
        }
      },
      "datePublished": content.publishedAt,
      "dateModified": content.publishedAt,
      "articleSection": content.category,
      "keywords": content.tags.join(', '),
      "url": `https://familyoffices.vip/insights/${source}/${slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://familyoffices.vip/insights/${source}/${slug}`
      }
    };

    if (content.imageUrl) {
      articleSchema["image"] = {
        "@type": "ImageObject",
        "url": content.imageUrl
      };
    }

    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
        
        <main className="pt-20">
          {/* Breadcrumb & Back Navigation */}
          <section className="py-8 border-b border-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-foreground/70">
                  <Link href="/" className="hover:text-foreground">홈</Link>
                  <span>·</span>
                  <Link href="/insights" className="hover:text-foreground">인사이트</Link>
                  <span>·</span>
                  <Badge variant={getSourceBadgeVariant(source)}>
                    {getSourceLabel(source)}
                  </Badge>
                </div>
                
                <Button asChild variant="outline" size="sm">
                  <Link href="/insights">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    목록으로
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Article Header */}
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                {content.category && (
                  <Badge variant="outline" className="mb-4">
                    {content.category}
                  </Badge>
                )}
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {content.title}
                </h1>
                
                <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                  {content.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-foreground/60">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {content.author}
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(content.publishedAt)}
                  </div>
                  
                  {content.readTime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {content.readTime}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {content.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                {content.url && (
                  <Button asChild variant="default">
                    <a href={content.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      원문 보기
                    </a>
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: content.title,
                        text: content.excerpt,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('링크가 복사되었습니다.');
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  공유하기
                </Button>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">콘텐츠 미리보기</h3>
                    {content.url && (
                      <Button asChild variant="ghost" size="sm">
                        <a href={content.url} target="_blank" rel="noopener noreferrer">
                          전체 내용 보기
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {content.content ? (
                    <div 
                      className="prose prose-lg max-w-none text-foreground/80"
                      dangerouslySetInnerHTML={{ 
                        __html: content.content.slice(0, 500) + (content.content.length > 500 ? '...' : '')
                      }}
                    />
                  ) : (
                    <div className="text-foreground/70">
                      <p className="mb-4">{content.excerpt}</p>
                      <p className="text-sm">
                        전체 내용을 보시려면 위의 "원문 보기" 버튼을 클릭해주세요.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                더 많은 인사이트를 받아보세요
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                매주 업데이트되는 자산관리 전문 인사이트를 놓치지 마세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/insights/weekly-brief">
                    뉴스레터 구독하기
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/insights">
                    더 많은 글 보기
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
    
  } catch (error) {
    console.error('콘텐츠 페이지 오류:', error);
    notFound();
  }
}