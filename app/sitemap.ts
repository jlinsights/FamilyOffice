import { blogCategories, blogPosts } from '@/lib/blog-data';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://familyoffices.vip';
  const currentDate = new Date();
  
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/program`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seminar`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recruit`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights/weekly-brief`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/family-office-center`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/business-succession-strategy`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // SEO Landing Pages
    {
      url: `${baseUrl}/wealth-consulting`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/investment-advisory`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tax-strategy`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/inheritance-gift-tax`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hr-labor-management`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business-certification`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/policy-funds`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/asset-diversification`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio-optimization`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // 블로그 카테고리별 페이지 추가
  const categoryPages = blogCategories.map(category => ({
    url: `${baseUrl}/insights?category=${encodeURIComponent(category.name)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 개별 블로그 포스트 페이지 추가 (SEO 최적화)
  const blogPostPages = Object.values(blogPosts).map(post => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: post.lastUpdated ? new Date(post.lastUpdated) : new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // RSS Feed 및 API 엔드포인트 추가
  const rssAndApiPages = [
    {
      url: `${baseUrl}/api/insights`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/api/insights?source=beehiiv`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/api/insights?source=naver-blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.4,
    },
  ];

  return [...staticPages, ...categoryPages, ...blogPostPages, ...rssAndApiPages];
}
