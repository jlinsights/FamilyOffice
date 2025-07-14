import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://familyoffices.vip'
  
  return {
    rules: [
      // 모든 검색엔진 봇 허용
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/admin/*',
          '/.well-known/*',
          '/dashboard/private/*',
          '/_next/static/development/*'
        ],
      },
      // 네이버 봇 특별 설정
      {
        userAgent: 'NaverBot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/admin/*'
        ],
        crawlDelay: 1
      },
      // 다음 봇 특별 설정
      {
        userAgent: 'Daumoa',
        allow: '/',
        disallow: [
          '/admin/*', 
          '/api/admin/*'
        ],
        crawlDelay: 1
      },
      // 구글 봇 설정
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/admin/*',
          '/dashboard/private/*'
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}