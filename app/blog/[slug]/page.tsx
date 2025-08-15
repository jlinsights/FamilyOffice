import { CalendarDays, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { blogPosts } from '@/lib/blog-data';
import { NewsletterSubscription } from '@/components/newsletter-subscription';

// BlogPost interface and data imported from lib/blog-data

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Korea Market Insights`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        {/* Hero Section */}
        <section className="pb-8 bg-gradient-to-r from-blue-900 to-slate-900 dark:from-slate-900 dark:to-blue-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button
                variant="outline"
                className="mb-6 border-white/20 text-white hover:bg-white/10 dark:border-white/30 dark:text-white dark:hover:bg-white/20"
                asChild
              >
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  블로그로 돌아가기
                </Link>
              </Button>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="info" size="default">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-2 text-blue-100 dark:text-blue-200">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-2 text-blue-100 dark:text-blue-200">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-2 text-blue-100 dark:text-blue-200">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">{post.excerpt}</p>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 dark:border-white/30 dark:text-white dark:hover:bg-white/20"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  아티클 공유
                </Button>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/20 text-white/80 dark:border-white/30 dark:text-white/90"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg bg-background border-border">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.replace(/\n/g, '<br/>'),
                      }}
                      className="blog-content text-foreground"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Subscription - Inline */}
              <div className="mt-8">
                <NewsletterSubscription 
                  source={`blog-post-${slug}`}
                  variant="inline"
                />
              </div>

              {/* Author Bio */}
              <Card className="mt-8 shadow-lg bg-background border-border">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        {post.author} 소개
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        FamilyOffice S는 한국 중견기업을 위한 전문 패밀리오피스 서비스를 제공합니다. 
                        자산관리, 세무최적화, 승계계획 등 통합적인 솔루션으로 기업과 가족의 지속가능한 
                        성장을 지원합니다.
                      </p>
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/about">회사 소개</Link>
                        </Button>
                        <CalComPopup
                          buttonText="상담 신청"
                          variant="outline"
                          size="sm"
                          eventType="consultation"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="mt-8 shadow-lg bg-background border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">관련 인사이트</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
                      <Badge variant="outline" className="mb-2">
                        자산관리
                      </Badge>
                      <h4 className="font-semibold mb-2 text-foreground">
                        체계적인 자산관리 전략
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        분산된 자산을 체계적으로 관리하기 위한 전략과 방법을 소개합니다.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/blog/asset-management-strategy">
                          자세히 보기
                        </Link>
                      </Button>
                    </div>
                    <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
                      <Badge variant="outline" className="mb-2">
                        세무최적화
                      </Badge>
                      <h4 className="font-semibold mb-2 text-foreground">
                        중견기업을 위한 절세 전략
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        합법적이고 효과적인 절세 방법과 상속세 대비 전략을 알아봅니다.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/blog/tax-optimization-basics">
                          자세히 보기
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-slate-800">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white dark:text-white mb-4">
                FamilyOffice S 뉴스레터 구독하기
              </h2>
              <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
                매주 월·수·금 오전 7시 30분에 발송되는<br/>
                패밀리오피스 전문 인사이트를 받아보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100"
                  asChild
                >
                  <Link href="https://newsletter.familyoffices.vip" target="_blank" rel="noopener noreferrer">
                    뉴스레터 구독하기 →
                  </Link>
                </Button>
                <CalComPopup
                  buttonText="무료 상담 신청"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/20"
                  eventType="consultation"
                />
              </div>
              <p className="text-sm text-blue-100 dark:text-blue-200 mt-4 opacity-90">
                매주 월·수·금 오전 7:30 정기 발송 | 500+ 중견기업 경영진 구독 중
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
