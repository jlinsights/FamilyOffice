import { MetadataRoute } from 'next';

/**
 * 이미지 사이트맵 생성
 * Google 이미지 검색 최적화를 위한 이미지 정보 제공
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://familyoffices.vip';
  const currentDate = new Date().toISOString();

  // 주요 이미지 정보
  const images = [
    {
      url: `${baseUrl}/og-image.jpg`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/Images/hero-banner.jpg`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/Images/wealth-consulting-hero.jpg`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Images/investment-advisory-hero.jpg`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Images/family-office-center-hero.jpg`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Images/tax-strategy-hero.jpg`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/Images/business-certification-hero.jpg`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // SVG 아이콘들
    {
      url: `${baseUrl}/SVG/samsung-financial-networks.svg`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ];

  return images;
}
