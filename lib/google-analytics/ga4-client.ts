/**
 * Google Analytics 4 Data API Client
 * BMAD 키워드 성과 데이터 수집을 위한 GA4 연동
 *
 * 필요 환경 변수:
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL: 서비스 계정 이메일
 * - GOOGLE_PRIVATE_KEY: 서비스 계정 비공개 키
 * - GOOGLE_ANALYTICS_PROPERTY_ID: GA4 속성 ID
 */
import { BetaAnalyticsDataClient } from '@google-analytics/data';

/**
 * GA4 클라이언트 인스턴스 생성
 */
function getGA4Client(): BetaAnalyticsDataClient {
  const credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  // 개발 환경에서 credentials 없으면 에러 대신 경고
  if (!credentials.client_email || !credentials.private_key) {
    console.warn(
      '⚠️  GA4 credentials not found. Using mock data in development.'
    );
    throw new Error('GA4 credentials not configured');
  }

  // Type assertion after validation
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
  });
}

/**
 * 키워드별 성과 데이터 조회
 */
export interface KeywordPerformanceData {
  keyword: string;
  landingPage: string;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}

export async function getKeywordPerformance(
  startDate: string,
  endDate: string,
  keywords: string[]
): Promise<KeywordPerformanceData[]> {
  try {
    const analyticsDataClient = getGA4Client();
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      throw new Error('GOOGLE_ANALYTICS_PROPERTY_ID not configured');
    }

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'landingPage' },
        { name: 'sessionSource' }, // 검색 엔진 소스
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'conversions' },
      ],
      // 키워드 필터링
      dimensionFilter: {
        filter: {
          fieldName: 'sessionSource',
          inListFilter: {
            values: ['google', 'google.com', 'organic'],
          },
        },
      },
      // 세션 수 기준 내림차순
      orderBys: [
        {
          metric: {
            metricName: 'sessions',
          },
          desc: true,
        },
      ],
      limit: 100,
    });

    // 응답 데이터 파싱
    const performanceData: KeywordPerformanceData[] = [];

    if (response.rows) {
      for (const row of response.rows) {
        const landingPage = row.dimensionValues?.[0]?.value || '';
        const source = row.dimensionValues?.[1]?.value || '';
        const sessions = parseInt(row.metricValues?.[0]?.value || '0');
        const pageViews = parseInt(row.metricValues?.[1]?.value || '0');
        const bounceRate = parseFloat(row.metricValues?.[2]?.value || '0');
        const avgDuration = parseFloat(row.metricValues?.[3]?.value || '0');
        const conversions = parseInt(row.metricValues?.[4]?.value || '0');

        // 랜딩 페이지에서 키워드 추출 (URL 매칭)
        const matchedKeyword = keywords.find(keyword =>
          landingPage
            .toLowerCase()
            .includes(keyword.toLowerCase().replace(/\s+/g, '-'))
        );

        if (matchedKeyword) {
          performanceData.push({
            keyword: matchedKeyword,
            landingPage,
            sessions,
            pageViews,
            bounceRate,
            avgSessionDuration: avgDuration,
            conversions,
          });
        }
      }
    }

    return performanceData;
  } catch (error) {
    console.error('GA4 데이터 조회 실패:', error);
    throw error;
  }
}

/**
 * 카테고리별 집계 성과 데이터
 */
export interface CategoryPerformanceData {
  category: string;
  totalSessions: number;
  totalPageViews: number;
  avgBounceRate: number;
  avgSessionDuration: number;
  totalConversions: number;
  conversionRate: number;
}

export async function getCategoryPerformance(
  startDate: string,
  endDate: string,
  categoryKeywordsMap: Record<string, string[]>
): Promise<CategoryPerformanceData[]> {
  try {
    const allKeywords = Object.values(categoryKeywordsMap).flat();
    const keywordData = await getKeywordPerformance(
      startDate,
      endDate,
      allKeywords
    );

    // 카테고리별 집계
    const categoryStats: Record<string, CategoryPerformanceData> = {};

    for (const [category, keywords] of Object.entries(categoryKeywordsMap)) {
      const categoryData = keywordData.filter(data =>
        keywords.includes(data.keyword)
      );

      const totalSessions = categoryData.reduce(
        (sum, d) => sum + d.sessions,
        0
      );
      const totalPageViews = categoryData.reduce(
        (sum, d) => sum + d.pageViews,
        0
      );
      const totalConversions = categoryData.reduce(
        (sum, d) => sum + d.conversions,
        0
      );
      const avgBounceRate =
        categoryData.length > 0
          ? categoryData.reduce((sum, d) => sum + d.bounceRate, 0) /
            categoryData.length
          : 0;
      const avgSessionDuration =
        categoryData.length > 0
          ? categoryData.reduce((sum, d) => sum + d.avgSessionDuration, 0) /
            categoryData.length
          : 0;

      categoryStats[category] = {
        category,
        totalSessions,
        totalPageViews,
        avgBounceRate,
        avgSessionDuration,
        totalConversions,
        conversionRate:
          totalSessions > 0 ? (totalConversions / totalSessions) * 100 : 0,
      };
    }

    return Object.values(categoryStats);
  } catch (error) {
    console.error('카테고리 성과 데이터 조회 실패:', error);
    throw error;
  }
}

/**
 * 주간 트렌드 데이터 조회
 */
export interface TrendData {
  date: string;
  sessions: number;
  conversions: number;
  conversionRate: number;
}

export async function getWeeklyTrend(
  startDate: string,
  endDate: string
): Promise<TrendData[]> {
  try {
    const analyticsDataClient = getGA4Client();
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      throw new Error('GOOGLE_ANALYTICS_PROPERTY_ID not configured');
    }

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }, { name: 'conversions' }],
      orderBys: [
        {
          dimension: {
            dimensionName: 'date',
          },
          desc: false,
        },
      ],
    });

    const trendData: TrendData[] = [];

    if (response.rows) {
      for (const row of response.rows) {
        const date = row.dimensionValues?.[0]?.value || '';
        const sessions = parseInt(row.metricValues?.[0]?.value || '0');
        const conversions = parseInt(row.metricValues?.[1]?.value || '0');

        trendData.push({
          date,
          sessions,
          conversions,
          conversionRate: sessions > 0 ? (conversions / sessions) * 100 : 0,
        });
      }
    }

    return trendData;
  } catch (error) {
    console.error('주간 트렌드 데이터 조회 실패:', error);
    throw error;
  }
}

/**
 * 상위 랜딩 페이지 조회
 */
export interface TopPageData {
  page: string;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export async function getTopLandingPages(
  startDate: string,
  endDate: string,
  limit: number = 10
): Promise<TopPageData[]> {
  try {
    const analyticsDataClient = getGA4Client();
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      throw new Error('GOOGLE_ANALYTICS_PROPERTY_ID not configured');
    }

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'landingPage' }],
      metrics: [
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'sessions',
          },
          desc: true,
        },
      ],
      limit,
    });

    const topPages: TopPageData[] = [];

    if (response.rows) {
      for (const row of response.rows) {
        const page = row.dimensionValues?.[0]?.value || '';
        const sessions = parseInt(row.metricValues?.[0]?.value || '0');
        const pageViews = parseInt(row.metricValues?.[1]?.value || '0');
        const bounceRate = parseFloat(row.metricValues?.[2]?.value || '0');
        const avgDuration = parseFloat(row.metricValues?.[3]?.value || '0');

        topPages.push({
          page,
          sessions,
          pageViews,
          bounceRate,
          avgSessionDuration: avgDuration,
        });
      }
    }

    return topPages;
  } catch (error) {
    console.error('상위 랜딩 페이지 조회 실패:', error);
    throw error;
  }
}

/**
 * GA4 연결 상태 확인
 */
export async function checkGA4Connection(): Promise<boolean> {
  try {
    const analyticsDataClient = getGA4Client();
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      return false;
    }

    // 간단한 메타데이터 조회로 연결 테스트
    const [response] = await analyticsDataClient.getMetadata({
      name: `properties/${propertyId}/metadata`,
    });

    return !!response;
  } catch (error) {
    console.error('GA4 연결 확인 실패:', error);
    return false;
  }
}
