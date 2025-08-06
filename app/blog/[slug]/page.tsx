import { CalendarDays, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      <main className="pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="pb-8 bg-gradient-to-r from-blue-900 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button
                variant="outline"
                className="mb-6 border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-blue-600 text-white">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-2 text-blue-100">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-blue-100 mb-8">{post.excerpt}</p>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </Button>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/20 text-white/80"
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
              <Card className="shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-lg max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.replace(/\n/g, '<br/>'),
                      }}
                      className="blog-content"
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
              <Card className="mt-8 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        About {post.author}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Jaehong Lim is a strategic partnership expert with over
                        10 years of experience in Korea market entry, M&A
                        transactions, and cross-border business development. He
                        specializes in helping global companies establish
                        successful partnerships in Korea.
                      </p>
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/about">View Profile</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/contact">Get in Touch</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="mt-8 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Related Insights</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <Badge variant="outline" className="mb-2">
                        Market Entry
                      </Badge>
                      <h4 className="font-semibold mb-2">
                        Strategic Partnership Models: European Success Stories
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Learn from successful European companies that have
                        entered the Korean market through strategic
                        partnerships.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/blog/strategic-partnership-models">
                          Read More
                        </Link>
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <Badge variant="outline" className="mb-2">
                        Regulatory
                      </Badge>
                      <h4 className="font-semibold mb-2">
                        2024 Regulatory Changes: What Global Companies Need to
                        Know
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Stay updated on the latest regulatory changes affecting
                        foreign companies in Korea.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/blog/regulatory-changes-2024">
                          Read More
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                FamilyOffice S 뉴스레터 구독하기
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                매주 월·수·금 오전 9시 30분에 발송되는<br/>
                패밀리오피스 전문 인사이트를 받아보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href="https://newsletter.familyoffices.vip" target="_blank" rel="noopener noreferrer">
                    뉴스레터 구독하기 →
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">무료 상담 신청</Link>
                </Button>
              </div>
              <p className="text-sm text-blue-100 mt-4 opacity-90">
                매주 월·수·금 오전 9:30 정기 발송 | 500+ 중견기업 경영진 구독 중
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
