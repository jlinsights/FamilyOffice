import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/_next/',
          '/static/',
          '*.json',
          '*.xml',
          '/search',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
        ],
      },
      {
        userAgent: 'NaverBot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
        ],
      },
      {
        userAgent: 'Daumoa',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
        ],
      },
    ],
    sitemap: 'https://familyoffices.vip/sitemap.xml',
    host: 'https://familyoffices.vip',
  }
} 