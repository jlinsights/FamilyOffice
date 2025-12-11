import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ShareButton } from '@/components/share-button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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

  // 관련 포스트 추천: 같은 카테고리에서 최대 3개 (SEO & 내부 링크 강화)
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  // 관련 포스트가 3개 미만이면 다른 카테고리에서 채우기
  if (relatedPosts.length < 3) {
    const additionalPosts = Object.values(blogPosts)
      .filter(p => p.slug !== slug && !relatedPosts.includes(p))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...additionalPosts);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="pt-20">
        {/* Brunch-Style Minimalist Header */}
        <article className="max-w-[720px] mx-auto px-6 md:px-8 py-16 md:py-24">
          {/* Back Link - Subtle and Clean */}
          <Link
            href="/insights/market-intelligence"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>목록으로 돌아가기</span>
          </Link>

          {/* Category and Meta - Clean Typography */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span className="font-medium text-blue-600 dark:text-blue-400">{post.category}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title - Serif, Large, Elegant */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-[1.2] tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt - Generous Spacing */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-[1.6] mb-12 font-light">
            {post.excerpt}
          </p>

          {/* Author Info - Minimal and Clean */}
          <div className="flex items-center gap-4 pb-12 mb-12 border-b border-slate-200 dark:border-slate-800">
            <Link
              href="https://litt.ly/familyoffice"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:opacity-80 transition-opacity">
                <Image
                  src="/Images/Profile Image-3-1080 x 1080 px.png"
                  alt={post.author}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="flex-1">
              <Link
                href="https://litt.ly/familyoffice"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {post.author}
              </Link>
              <div className="text-sm text-slate-500 dark:text-slate-400">수석 컨설턴트</div>
            </div>
            <div className="flex items-center gap-2">
              <ShareButton
                title={post.title}
                description={post.excerpt}
                image={post.image || post.coverImage || ''}
              />
            </div>
          </div>

          {/* Hero Image - Full Width, Natural */}
          {post.image && (
            <div className="relative -mx-6 md:-mx-8 mb-16 aspect-video md:aspect-[21/9] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}
        </article>

        {/* Article Schema for SEO/AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.excerpt,
              image: post.image || post.coverImage || 'https://familyoffices.vip/og-image.jpg',
              datePublished: post.date,
              dateModified: post.lastUpdated || post.date,
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: '수석 컨설턴트',
                image: '/Images/Profile Image-3-1080 x 1080 px.png',
                url: 'https://litt.ly/familyoffice'
              },
              publisher: {
                '@type': 'Organization',
                name: 'FamilyOffice S',
                url: 'https://familyoffices.vip',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://familyoffices.vip/logo.png'
                }
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://familyoffices.vip/insights/market-intelligence/${post.slug}`
              },
              articleSection: post.category,
              keywords: post.tags.join(', '),
              wordCount: post.content.split(' ').length,
              inLanguage: 'ko-KR',
              isAccessibleForFree: true,
              about: {
                '@type': 'Thing',
                name: '패밀리오피스 및 자산관리',
                sameAs: 'https://ko.wikipedia.org/wiki/패밀리_오피스'
              }
            })
          }}
        />

        {/* Breadcrumb Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '홈',
                  item: 'https://familyoffices.vip'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: '인사이트',
                  item: 'https://familyoffices.vip/insights/market-intelligence'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: post.category,
                  item: `https://familyoffices.vip/insights/market-intelligence?category=${encodeURIComponent(post.category)}`
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: post.title
                }
              ]
            })
          }}
        />

        {/* Content - Brunch Style: Clean Typography, Generous Spacing */}
        <article className="max-w-[720px] mx-auto px-6 md:px-8">
          {/* Main Content with Beautiful Typography */}
          <div className="prose prose-lg md:prose-xl max-w-none
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:tracking-tight
            prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-[1.3]
            prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:leading-[1.3]
            prose-p:text-lg md:prose-p:text-xl prose-p:leading-[1.8] prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:mb-6 prose-p:font-light
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:transition-all
            prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-white
            prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400
            prose-code:text-sm prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:p-6
            prose-ul:my-8 prose-li:my-2 prose-li:text-lg prose-li:leading-[1.8] prose-li:text-slate-700 dark:prose-li:text-slate-300
            prose-img:rounded-none prose-img:my-12 prose-img:w-full
            dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, '<br/>'),
              }}
              className="blog-content"
            />
          </div>

          {/* Tags - Minimal Style */}
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* References - Minimal Style */}
        {post.sources && post.sources.length > 0 && (
          <article className="max-w-[720px] mx-auto px-6 md:px-8 mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-4">참고 문헌</h4>
            <ul className="space-y-3">
              {post.sources.map((source, index) => (
                <li key={index} className="text-sm text-slate-600 dark:text-slate-400">
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
                    >
                      {source.title}
                    </a>
                  ) : (
                    <span>{source.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </article>
        )}

        {/* Newsletter - Clean CTA */}
        <div className="max-w-[720px] mx-auto px-6 md:px-8 mt-20">
          <NewsletterSubscription
            source={`blog-post-${slug}`}
            variant="inline"
          />
        </div>

        {/* Author Bio - Minimal Card */}
        <article className="max-w-[720px] mx-auto px-6 md:px-8 mt-20 py-12 border-y border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Link
              href="https://litt.ly/familyoffice"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:opacity-90 transition-opacity">
                <Image
                  src="/Images/Profile Image-3-1080 x 1080 px.png"
                  alt={post.author}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div>
                  <Link
                    href="https://litt.ly/familyoffice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.author}
                  </Link>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">수석 컨설턴트</div>
                </div>
                <CalComPopup
                  buttonText="상담 신청"
                  variant="outline"
                  size="sm"
                  eventType="consultation"
                  className="border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                />
              </div>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.7]">
                국내 대기업 및 글로벌 외국계 기업 출신으로 중견기업 자산관리 경험과 전문성을 보유하고 있습니다.
                패밀리오피스 설계, 가업승계 전략, 세무최적화 등 통합적인 솔루션으로
                기업과 가족의 지속가능한 성장을 지원합니다.
              </p>
            </div>
          </div>
        </article>

        {/* Related Posts - Minimal Grid */}
        {relatedPosts.length > 0 && (
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mt-20 pb-24">
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-8">
              관련 글
            </h3>
            <div className="space-y-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/insights/market-intelligence/${relatedPost.slug}`}
                  className="group block py-6 border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                        {relatedPost.category}
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-snug">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {relatedPost.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section - Minimal Style */}
        {post.faq && post.faq.length > 0 && (
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mt-20 pb-24">
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-8">
              자주 묻는 질문
            </h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {post.faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 dark:border-slate-800 rounded-lg px-6 py-2"
                >
                  <AccordionTrigger className="text-base font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-slate-600 dark:text-slate-400 leading-[1.7] pt-2 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

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
        )}

        {/* CTA Section - Clean & Minimal */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              매주 화·금요일 아침,<br/>
              성공한 기업가의 인사이트를 받아보세요
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto">
              1,200+ 명의 CEO가 선택한 프리미엄 뉴스레터.<br className="hidden sm:block" />
              기업승계, 자산관리, 세무 전략 등 깊이 있는 정보를 전해드립니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                asChild
              >
                <Link href="https://newsletter.familyoffices.vip" target="_blank" rel="noopener noreferrer">
                  뉴스레터 구독하기
                </Link>
              </Button>
              <CalComPopup
                buttonText="전문가 상담"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-3 rounded-lg font-medium"
                eventType="consultation"
              />
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-600 mt-8">
              언제든지 구독을 취소하실 수 있습니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
