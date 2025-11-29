/**
 * Google Search Console API 연동
 * 실시간 키워드 랭킹 및 검색 성과 데이터
 */

import { google } from 'googleapis';

const searchconsole = google.searchconsole('v1');

// Google 인증 설정 - 환경변수가 있을 때만 생성
function createAuth() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return null;
  }
  
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
}

export interface SearchConsoleData {
  queries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    date: string;
  }>;
  pages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  countries: Array<{
    country: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  devices: Array<{
    device: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
}

export class GoogleSearchConsoleAPI {
  private siteUrl: string;

  constructor(siteUrl: string = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || 'https://familyoffices.vip') {
    this.siteUrl = siteUrl;
  }

  // 키워드 랭킹 데이터 가져오기
  async getKeywordRankings(
    startDate: string, 
    endDate: string, 
    dimensions: ('query' | 'page' | 'country' | 'device')[] = ['query']
  ): Promise<SearchConsoleData> {
    try {
      const auth = createAuth();
      if (!auth) {
        throw new Error('Google 인증 설정이 없습니다.');
      }
      
      const authClient = await auth.getClient();
      
      const response = await searchconsole.searchanalytics.query({
        auth: authClient as any,
        siteUrl: this.siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions,
          rowLimit: 1000,
          aggregationType: 'auto',
        },
      });

      const rows = response.data.rows || [];
      
      // 데이터 변환
      const result: SearchConsoleData = {
        queries: [],
        pages: [],
        countries: [],
        devices: []
      };

      rows.forEach(row => {
        const keys = row.keys || [];
        const clicks = row.clicks || 0;
        const impressions = row.impressions || 0;
        const ctr = row.ctr || 0;
        const position = row.position || 0;

        dimensions.forEach((dimension, index) => {
          const key = keys[index];
          if (!key) return;

          switch (dimension) {
            case 'query':
              result.queries.push({
                query: key,
                clicks,
                impressions,
                ctr: ctr * 100, // 백분율로 변환
                position: Math.round(position),
                date: endDate
              });
              break;
            case 'page':
              result.pages.push({
                page: key,
                clicks,
                impressions,
                ctr: ctr * 100,
                position: Math.round(position)
              });
              break;
            case 'country':
              result.countries.push({
                country: key,
                clicks,
                impressions,
                ctr: ctr * 100,
                position: Math.round(position)
              });
              break;
            case 'device':
              result.devices.push({
                device: key,
                clicks,
                impressions,
                ctr: ctr * 100,
                position: Math.round(position)
              });
              break;
          }
        });
      });

      // 정렬: 클릭수 높은 순
      result.queries.sort((a, b) => b.clicks - a.clicks);
      result.pages.sort((a, b) => b.clicks - a.clicks);
      result.countries.sort((a, b) => b.clicks - a.clicks);
      result.devices.sort((a, b) => b.clicks - a.clicks);

      return result;

    } catch (error) {
      console.error('Search Console API 오류:', error);
      throw new Error('Search Console 데이터를 가져올 수 없습니다.');
    }
  }

  // 특정 키워드 성과 추적
  async getKeywordPerformance(keywords: string[], days: number = 30): Promise<Array<{
    keyword: string;
    currentPosition: number;
    averagePosition: number;
    clicks: number;
    impressions: number;
    ctr: number;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
  }>> {
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const midDate = new Date(Date.now() - Math.floor(days/2) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      if (!endDate || !startDate || !midDate) {
        throw new Error('날짜 생성 실패');
      }

      // 최근 데이터와 이전 데이터 모두 가져오기
      const [recentData, previousData] = await Promise.all([
        this.getKeywordRankings(midDate, endDate, ['query']),
        this.getKeywordRankings(startDate, midDate, ['query'])
      ]);

      return keywords.map(keyword => {
        const recentQuery = recentData.queries.find(q => q.query.toLowerCase().includes(keyword.toLowerCase()));
        const previousQuery = previousData.queries.find(q => q.query.toLowerCase().includes(keyword.toLowerCase()));

        const currentPosition = recentQuery?.position || 0;
        const previousPosition = previousQuery?.position || 0;
        const averagePosition = recentQuery?.position || 0;

        let trend: 'up' | 'down' | 'stable' = 'stable';
        let changePercent = 0;

        if (previousPosition > 0 && currentPosition > 0) {
          changePercent = ((previousPosition - currentPosition) / previousPosition) * 100;
          if (changePercent > 5) trend = 'up';
          else if (changePercent < -5) trend = 'down';
        }

        return {
          keyword,
          currentPosition,
          averagePosition,
          clicks: recentQuery?.clicks || 0,
          impressions: recentQuery?.impressions || 0,
          ctr: recentQuery?.ctr || 0,
          trend,
          changePercent: Math.abs(changePercent)
        };
      });

    } catch (error) {
      console.error('키워드 성과 추적 오류:', error);
      throw error;
    }
  }

  // 페이지별 SEO 성과
  async getPagePerformance(): Promise<Array<{
    url: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    keywords: string[];
  }>> {
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      if (!endDate || !startDate) {
        throw new Error('날짜 생성 실패');
      }

      // 페이지별 데이터
      const pageData = await this.getKeywordRankings(startDate, endDate, ['page']);
      
      // 각 페이지의 키워드 가져오기
      const auth = createAuth();
      if (!auth) {
        throw new Error('Google 인증 설정이 없습니다.');
      }

      const results = await Promise.all(
        pageData.pages.slice(0, 20).map(async (page) => {
          try {
            const authClient = await auth.getClient();
            
            const keywordResponse = await searchconsole.searchanalytics.query({
              auth: authClient as any,
              siteUrl: this.siteUrl,
              requestBody: {
                startDate,
                endDate,
                dimensions: ['query'],
                dimensionFilterGroups: [{
                  filters: [{
                    dimension: 'page',
                    operator: 'equals',
                    expression: page.page
                  }]
                }],
                rowLimit: 10,
              },
            });

            const keywords = (keywordResponse.data.rows || [])
              .map(row => row.keys?.[0])
              .filter(Boolean) as string[];

            return {
              url: page.page,
              clicks: page.clicks,
              impressions: page.impressions,
              ctr: page.ctr,
              position: page.position,
              keywords
            };
          } catch (error) {
            return {
              url: page.page,
              clicks: page.clicks,
              impressions: page.impressions,
              ctr: page.ctr,
              position: page.position,
              keywords: []
            };
          }
        })
      );

      return results;

    } catch (error) {
      console.error('페이지 성과 분석 오류:', error);
      throw error;
    }
  }

  // 사이트맵 제출
  async submitSitemap(sitemapUrl: string): Promise<{ success: boolean; message: string }> {
    try {
      const auth = createAuth();
      if (!auth) {
        throw new Error('Google 인증 설정이 없습니다.');
      }
      
      const authClient = await auth.getClient();
      
      await searchconsole.sitemaps.submit({
        auth: authClient as any,
        siteUrl: this.siteUrl,
        feedpath: sitemapUrl,
      });

      return {
        success: true,
        message: '사이트맵이 성공적으로 제출되었습니다.'
      };

    } catch (error: any) {
      console.error('사이트맵 제출 오류:', error);
      return {
        success: false,
        message: `사이트맵 제출 실패: ${error.message}`
      };
    }
  }

  // 인덱싱 요청
  async requestIndexing(urls: string[]): Promise<Array<{
    url: string;
    success: boolean;
    message: string;
  }>> {
    try {
      const auth = createAuth();
      if (!auth) {
        throw new Error('Google 인증 설정이 없습니다.');
      }
      
      const indexing = google.indexing('v3');
      const authClient = await auth.getClient();

      const results = await Promise.all(
        urls.map(async (url) => {
          try {
            await indexing.urlNotifications.publish({
              auth: authClient as any,
              requestBody: {
                url,
                type: 'URL_UPDATED'
              }
            });

            return {
              url,
              success: true,
              message: '인덱싱 요청이 성공했습니다.'
            };
          } catch (error: any) {
            return {
              url,
              success: false,
              message: `인덱싱 요청 실패: ${error.message}`
            };
          }
        })
      );

      return results;

    } catch (error) {
      console.error('인덱싱 요청 오류:', error);
      throw error;
    }
  }

  // Core Web Vitals 데이터
  async getCoreWebVitals(): Promise<{
    mobile: { lcp: number; fid: number; cls: number; };
    desktop: { lcp: number; fid: number; cls: number; };
  }> {
    try {
      const auth = createAuth();
      if (!auth) {
        throw new Error('Google 인증 설정이 없습니다.');
      }
      
      // PageSpeed Insights API 사용
      const pageSpeed = google.pagespeedonline('v5');
      const authClient = await auth.getClient();

      const [mobileResult, desktopResult] = await Promise.all([
        pageSpeed.pagespeedapi.runpagespeed({
          auth: authClient as any,
          url: this.siteUrl,
          strategy: 'mobile',
          category: ['performance']
        }),
        pageSpeed.pagespeedapi.runpagespeed({
          auth: authClient as any,
          url: this.siteUrl,
          strategy: 'desktop',
          category: ['performance']
        })
      ]);

      const extractCWV = (data: any) => {
        const metrics = data?.lighthouseResult?.audits;
        return {
          lcp: metrics?.['largest-contentful-paint']?.numericValue || 0,
          fid: metrics?.['max-potential-fid']?.numericValue || 0,
          cls: metrics?.['cumulative-layout-shift']?.numericValue || 0,
        };
      };

      return {
        mobile: extractCWV(mobileResult.data),
        desktop: extractCWV(desktopResult.data)
      };

    } catch (error) {
      console.error('Core Web Vitals 데이터 오류:', error);
      // 기본값 반환
      return {
        mobile: { lcp: 2500, fid: 100, cls: 0.1 },
        desktop: { lcp: 2000, fid: 80, cls: 0.05 }
      };
    }
  }
}