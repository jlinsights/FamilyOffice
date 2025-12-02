import { ArrowLeft, CalendarDays, Clock, Share2 } from 'lucide-react';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { blogPosts } from '@/lib/blog-data';

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
    title: `${post.title} | Market Intelligence | FamilyOffice S`,
    description: `${post.excerpt} - 기업승계와 상속세 절세 전문가의 심층 분석`,
    keywords: `${post.tags.join(', ')}, 기업승계, 상속세 절세, 패밀리오피스, 중견기업`,
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | Market Intelligence | FamilyOffice S`,
      description: `${post.excerpt} - 기업승계와 상속세 절세 전문가의 심층 분석`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [...post.tags, '기업승계', '상속세절세', '패밀리오피스'],
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Market Intelligence | FamilyOffice S`,
      description: `${post.excerpt} - 기업승계와 상속세 절세 전문가의 심층 분석`,
    },
    alternates: {
      canonical: `/insights/market-intelligence/${post.slug}`,
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
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-slate-900" />
          {post.image && (
            <div className="absolute inset-0 opacity-50">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
          
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button
                variant="ghost"
                className="mb-8 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                asChild
              >
                <Link href="/insights/market-intelligence">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  인사이트 목록으로
                </Link>
              </Button>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors border-0">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-500" />
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
                {post.title}
              </h1>

              <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed font-medium drop-shadow-md">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-sm">
                    <Image 
                      src="/Images/Profile Image-3-1080 x 1080 px.png" 
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white">{post.author}</div>
                    <div className="text-sm text-slate-400">수석 컨설턴트</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    공유하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="prose prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-2xl prose-img:shadow-lg">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.replace(/\n/g, '<br/>'),
                      }}
                      className="blog-content"
                    />
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors px-3 py-1"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* References Section */}
              {post.sources && post.sources.length > 0 && (
                <div className="mt-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-slate-400">📚</span> 참고 문헌 및 출처
                  </h4>
                  <ul className="space-y-2">
                    {post.sources.map((source, index) => (
                      <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        {source.url ? (
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                          >
                            {source.title}
                          </a>
                        ) : (
                          <span>{source.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Newsletter Subscription - Inline */}
              <div className="mt-12">
                <NewsletterSubscription 
                  source={`blog-post-${slug}`}
                  variant="inline"
                />
              </div>


              {/* Author Bio */}
              <div className="mt-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-800 p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Link 
                    href="https://litt.ly/familyoffice" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex-shrink-0"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md group-hover:ring-4 group-hover:ring-blue-500/20 transition-all duration-300 group-hover:scale-105">
                      <Image 
                        src="/Images/Profile Image-3-1080 x 1080 px.png" 
                        alt="임재홍 수석 컨설턴트"
                        width={512}
                        height={512}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <Link 
                          href="https://litt.ly/familyoffice" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                            {post.author} 수석 컨설턴트
                            <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </h3>
                        </Link>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">
                          FamilyOffice S 대표 컨설턴트
                        </p>
                      </div>
                      <CalComPopup
                        buttonText="전문가 상담 신청"
                        variant="default"
                        size="sm"
                        eventType="consultation"
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                      />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                      국내 대기업 및 글로벌 외국계 기업 출신으로 중견기업 자산관리 경험과 전문성을 보유하고 있습니다. 
                      패밀리오피스 설계, 가업승계 전략, 세무최적화 등 통합적인 솔루션으로 
                      기업과 가족의 지속가능한 성장을 지원합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1 h-8 bg-blue-600 rounded-full block" />
                  관련 인사이트
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link href="/insights/market-intelligence/asset-management-strategy" className="group">
                    <div className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
                      <Badge variant="outline" className="mb-3 border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-300">
                        자산관리
                      </Badge>
                      <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        체계적인 자산관리 전략
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        분산된 자산을 체계적으로 관리하기 위한 전략과 방법을 소개합니다.
                      </p>
                    </div>
                  </Link>
                  <Link href="/insights/market-intelligence/tax-optimization-basics" className="group">
                    <div className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
                      <Badge variant="outline" className="mb-3 border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-300">
                        세무최적화
                      </Badge>
                      <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        중견기업을 위한 절세 전략
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        합법적이고 효과적인 절세 방법과 상속세 대비 전략을 알아봅니다.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section (AEO Optimized) */}
        {post.faq && post.faq.length > 0 && (
          <section className="pb-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-lg">
                  <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-blue-600">❓</span> 자주 묻는 질문 (FAQ)
                  </h3>
                  <div className="space-y-6">
                    {post.faq.map((item, index) => (
                      <div key={index} className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-6 last:pb-0">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                          Q. {item.question}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          A. {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* FAQ Schema */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'FAQPage',
                      mainEntity: post.faq.map(item => ({
                        '@type': 'Question',
                        name: item.question,
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: item.answer,
                        },
                      })),
                    }),
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container relative mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-6 border-blue-500/50 text-blue-400">
                Premium Newsletter
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                매주 화·금요일 아침,<br/>
                <span className="text-blue-400">성공한 기업가의 인사이트</span>를 받아보세요
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                1,200+ 명의 CEO가 선택한 프리미엄 뉴스레터.<br/>
                기업승계, 자산관리, 세무 전략 등 깊이 있는 정보를 전해드립니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 h-14 text-lg rounded-full shadow-lg shadow-blue-600/25 transition-all hover:scale-105"
                  asChild
                >
                  <Link href="https://newsletter.familyoffices.vip" target="_blank" rel="noopener noreferrer">
                    뉴스레터 무료 구독하기
                  </Link>
                </Button>
                <CalComPopup
                  buttonText="전문가 무료 상담"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 h-14 text-lg rounded-full"
                  eventType="consultation"
                />
              </div>
              
              <p className="text-sm text-slate-500 mt-8">
                언제든지 구독을 취소하실 수 있습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
