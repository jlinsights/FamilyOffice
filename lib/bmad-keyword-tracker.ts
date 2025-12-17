/**
 * BMAD 키워드 추적 시스템
 * Google Analytics 4 연동 및 키워드별 성과 추적
 */

import { BMAD_AI_KEYWORDS } from './ai-search-monitoring';

export type BMADCategory = 'behavioral' | 'motivational' | 'aspirational' | 'decisional';

export interface KeywordPerformance {
  keyword: string;
  category: BMADCategory;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number; // Click-through rate
  conversionRate: number;
  avgPosition: number;
  traffic: number;
  bounceRate: number;
  avgSessionDuration: number;
  pageViews: number;
  newUsers: number;
  returningUsers: number;
  revenue?: number;
  lastUpdated: Date;
}

export interface CategoryPerformance {
  category: BMADCategory;
  totalKeywords: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  avgCTR: number;
  avgConversionRate: number;
  avgPosition: number;
  totalTraffic: number;
  avgBounceRate: number;
  avgSessionDuration: number;
  performance: number; // 0-100 score
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export interface MonthlyReport {
  month: string;
  year: number;
  generatedAt: Date;
  overview: {
    totalKeywords: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    avgCTR: number;
    avgConversionRate: number;
  };
  categoryBreakdown: CategoryPerformance[];
  topPerformingKeywords: KeywordPerformance[];
  improvementOpportunities: Array<{
    keyword: string;
    category: BMADCategory;
    issue: string;
    recommendation: string;
    potentialImpact: 'high' | 'medium' | 'low';
  }>;
  insights: string[];
  recommendations: string[];
}

/**
 * BMAD 키워드 추적 클래스
 */
export class BMADKeywordTracker {
  private gaPropertyId: string;

  constructor(gaPropertyId: string = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '') {
    this.gaPropertyId = gaPropertyId;
  }

  /**
   * Google Analytics 4 데이터 가져오기
   * 실제 구현 시 Google Analytics Data API v1 사용
   */
  async fetchGA4Data(
    startDate: Date,
    endDate: Date,
    keywords: string[]
  ): Promise<Map<string, Partial<KeywordPerformance>>> {
    // TODO: 실제 GA4 API 연동
    // const { BetaAnalyticsDataClient } = require('@google-analytics/data');
    // const analyticsDataClient = new BetaAnalyticsDataClient();

    // 개발용 모의 데이터
    const mockData = new Map<string, Partial<KeywordPerformance>>();

    keywords.forEach(keyword => {
      mockData.set(keyword, {
        impressions: Math.floor(Math.random() * 1000) + 100,
        clicks: Math.floor(Math.random() * 100) + 10,
        conversions: Math.floor(Math.random() * 20) + 1,
        avgPosition: Math.floor(Math.random() * 10) + 1,
        traffic: Math.floor(Math.random() * 500) + 50,
        bounceRate: Math.random() * 0.5 + 0.3, // 30-80%
        avgSessionDuration: Math.floor(Math.random() * 300) + 60, // 60-360초
        pageViews: Math.floor(Math.random() * 1000) + 100,
        newUsers: Math.floor(Math.random() * 400) + 40,
        returningUsers: Math.floor(Math.random() * 100) + 10,
      });
    });

    return mockData;
  }

  /**
   * 모든 BMAD 키워드의 성과 추적
   */
  async trackAllKeywords(
    startDate: Date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 최근 30일
    endDate: Date = new Date()
  ): Promise<KeywordPerformance[]> {
    const allKeywords: KeywordPerformance[] = [];

    // 각 카테고리별로 키워드 추적
    for (const [category, keywords] of Object.entries(BMAD_AI_KEYWORDS)) {
      const gaData = await this.fetchGA4Data(startDate, endDate, keywords);

      for (const keyword of keywords) {
        const data = gaData.get(keyword) || {};
        const impressions = data.impressions || 0;
        const clicks = data.clicks || 0;
        const conversions = data.conversions || 0;

        allKeywords.push({
          keyword,
          category: category as BMADCategory,
          impressions,
          clicks,
          conversions,
          ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
          conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
          avgPosition: data.avgPosition || 0,
          traffic: data.traffic || 0,
          bounceRate: data.bounceRate || 0,
          avgSessionDuration: data.avgSessionDuration || 0,
          pageViews: data.pageViews || 0,
          newUsers: data.newUsers || 0,
          returningUsers: data.returningUsers || 0,
          revenue: data.revenue,
          lastUpdated: new Date(),
        });
      }
    }

    return allKeywords;
  }

  /**
   * 카테고리별 성과 분석
   */
  analyzeCategoryPerformance(
    keywordData: KeywordPerformance[]
  ): CategoryPerformance[] {
    const categories: BMADCategory[] = ['behavioral', 'motivational', 'aspirational', 'decisional'];
    const categoryPerformance: CategoryPerformance[] = [];

    for (const category of categories) {
      const categoryKeywords = keywordData.filter(k => k.category === category);

      if (categoryKeywords.length === 0) continue;

      const totalImpressions = categoryKeywords.reduce((sum, k) => sum + k.impressions, 0);
      const totalClicks = categoryKeywords.reduce((sum, k) => sum + k.clicks, 0);
      const totalConversions = categoryKeywords.reduce((sum, k) => sum + k.conversions, 0);
      const totalTraffic = categoryKeywords.reduce((sum, k) => sum + k.traffic, 0);

      const avgCTR = categoryKeywords.reduce((sum, k) => sum + k.ctr, 0) / categoryKeywords.length;
      const avgConversionRate = categoryKeywords.reduce((sum, k) => sum + k.conversionRate, 0) / categoryKeywords.length;
      const avgPosition = categoryKeywords.reduce((sum, k) => sum + k.avgPosition, 0) / categoryKeywords.length;
      const avgBounceRate = categoryKeywords.reduce((sum, k) => sum + k.bounceRate, 0) / categoryKeywords.length;
      const avgSessionDuration = categoryKeywords.reduce((sum, k) => sum + k.avgSessionDuration, 0) / categoryKeywords.length;

      // 성과 점수 계산 (0-100)
      const performanceScore = this.calculatePerformanceScore({
        avgCTR,
        avgConversionRate,
        avgPosition,
        avgBounceRate,
      });

      // 트렌드 분석 (TODO: 이전 기간 데이터와 비교)
      const trend: 'up' | 'down' | 'stable' = 'stable';
      const trendPercentage = 0;

      categoryPerformance.push({
        category,
        totalKeywords: categoryKeywords.length,
        totalImpressions,
        totalClicks,
        totalConversions,
        avgCTR,
        avgConversionRate,
        avgPosition,
        totalTraffic,
        avgBounceRate,
        avgSessionDuration,
        performance: performanceScore,
        trend,
        trendPercentage,
      });
    }

    return categoryPerformance;
  }

  /**
   * 성과 점수 계산 알고리즘
   */
  private calculatePerformanceScore(metrics: {
    avgCTR: number;
    avgConversionRate: number;
    avgPosition: number;
    avgBounceRate: number;
  }): number {
    // 각 지표별 점수 (0-100)
    const ctrScore = Math.min(metrics.avgCTR * 10, 100); // 10% CTR = 100점
    const conversionScore = Math.min(metrics.avgConversionRate * 5, 100); // 20% 전환율 = 100점
    const positionScore = Math.max(100 - (metrics.avgPosition - 1) * 10, 0); // 1위 = 100점
    const bounceScore = Math.max(100 - metrics.avgBounceRate * 100, 0); // 0% 이탈률 = 100점

    // 가중치 적용
    const totalScore = (
      ctrScore * 0.3 +
      conversionScore * 0.4 +
      positionScore * 0.2 +
      bounceScore * 0.1
    );

    return Math.round(totalScore);
  }

  /**
   * 월간 성과 리포트 자동 생성
   */
  async generateMonthlyReport(
    month: number,
    year: number
  ): Promise<MonthlyReport> {
    // 해당 월의 시작일과 종료일 계산
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // 키워드 데이터 수집
    const keywordData = await this.trackAllKeywords(startDate, endDate);
    const categoryBreakdown = this.analyzeCategoryPerformance(keywordData);

    // 상위 성과 키워드 (상위 10개)
    const topPerformingKeywords = keywordData
      .sort((a, b) => {
        const scoreA = a.conversions * 10 + a.clicks;
        const scoreB = b.conversions * 10 + b.clicks;
        return scoreB - scoreA;
      })
      .slice(0, 10);

    // 개선 기회 발견
    const improvementOpportunities = this.identifyImprovementOpportunities(keywordData);

    // 인사이트 생성
    const insights = this.generateInsights(categoryBreakdown, keywordData);

    // 권장사항 생성
    const recommendations = this.generateRecommendations(categoryBreakdown, improvementOpportunities);

    // 전체 통계
    const overview = {
      totalKeywords: keywordData.length,
      totalImpressions: keywordData.reduce((sum, k) => sum + k.impressions, 0),
      totalClicks: keywordData.reduce((sum, k) => sum + k.clicks, 0),
      totalConversions: keywordData.reduce((sum, k) => sum + k.conversions, 0),
      avgCTR: keywordData.reduce((sum, k) => sum + k.ctr, 0) / keywordData.length,
      avgConversionRate: keywordData.reduce((sum, k) => sum + k.conversionRate, 0) / keywordData.length,
    };

    return {
      month: `${year}-${String(month).padStart(2, '0')}`,
      year,
      generatedAt: new Date(),
      overview,
      categoryBreakdown,
      topPerformingKeywords,
      improvementOpportunities,
      insights,
      recommendations,
    };
  }

  /**
   * 개선 기회 식별
   */
  private identifyImprovementOpportunities(
    keywordData: KeywordPerformance[]
  ): MonthlyReport['improvementOpportunities'] {
    const opportunities: MonthlyReport['improvementOpportunities'] = [];

    keywordData.forEach(keyword => {
      // 높은 노출, 낮은 CTR
      if (keyword.impressions > 500 && keyword.ctr < 2) {
        opportunities.push({
          keyword: keyword.keyword,
          category: keyword.category,
          issue: '높은 노출 대비 낮은 클릭률',
          recommendation: '메타 설명 및 타이틀 태그 최적화로 CTR 개선',
          potentialImpact: 'high',
        });
      }

      // 높은 클릭, 낮은 전환율
      if (keyword.clicks > 50 && keyword.conversionRate < 2) {
        opportunities.push({
          keyword: keyword.keyword,
          category: keyword.category,
          issue: '높은 클릭 대비 낮은 전환율',
          recommendation: '랜딩 페이지 콘텐츠 및 CTA 개선',
          potentialImpact: 'high',
        });
      }

      // 높은 이탈률
      if (keyword.bounceRate > 0.7) {
        opportunities.push({
          keyword: keyword.keyword,
          category: keyword.category,
          issue: '높은 이탈률 (70% 이상)',
          recommendation: '페이지 로딩 속도 및 사용자 경험 개선',
          potentialImpact: 'medium',
        });
      }

      // 낮은 순위
      if (keyword.avgPosition > 10 && keyword.impressions > 100) {
        opportunities.push({
          keyword: keyword.keyword,
          category: keyword.category,
          issue: '낮은 검색 순위 (10위 이하)',
          recommendation: '키워드 타겟팅 강화 및 콘텐츠 품질 개선',
          potentialImpact: 'medium',
        });
      }
    });

    // 영향도 순으로 정렬
    return opportunities
      .sort((a, b) => {
        const impactOrder = { high: 3, medium: 2, low: 1 };
        return impactOrder[b.potentialImpact] - impactOrder[a.potentialImpact];
      })
      .slice(0, 10); // 상위 10개
  }

  /**
   * 인사이트 생성
   */
  private generateInsights(
    categoryBreakdown: CategoryPerformance[],
    keywordData: KeywordPerformance[]
  ): string[] {
    const insights: string[] = [];

    // 최고 성과 카테고리
    const bestCategory = categoryBreakdown.reduce((best, current) =>
      current.performance > best.performance ? current : best
    );
    insights.push(
      `✨ ${this.getCategoryName(bestCategory.category)} 카테고리가 ${bestCategory.performance.toFixed(1)}점으로 최고 성과를 기록했습니다.`
    );

    // 전환율 분석
    const highConversionKeywords = keywordData.filter(k => k.conversionRate > 5);
    if (highConversionKeywords.length > 0) {
      insights.push(
        `🎯 ${highConversionKeywords.length}개 키워드가 5% 이상의 우수한 전환율을 달성했습니다.`
      );
    }

    // Decisional 키워드 분석
    const decisionalCategory = categoryBreakdown.find(c => c.category === 'decisional');
    if (decisionalCategory && decisionalCategory.avgConversionRate > 3) {
      insights.push(
        `💰 Decisional 키워드의 평균 전환율 ${decisionalCategory.avgConversionRate.toFixed(2)}%는 높은 구매 의도를 보여줍니다.`
      );
    }

    // 트래픽 성장
    const totalTraffic = categoryBreakdown.reduce((sum, c) => sum + c.totalTraffic, 0);
    if (totalTraffic > 5000) {
      insights.push(
        `📈 BMAD 키워드를 통한 총 트래픽이 ${totalTraffic.toLocaleString()}회를 기록했습니다.`
      );
    }

    return insights;
  }

  /**
   * 권장사항 생성
   */
  private generateRecommendations(
    categoryBreakdown: CategoryPerformance[],
    opportunities: MonthlyReport['improvementOpportunities']
  ): string[] {
    const recommendations: string[] = [];

    // 저성과 카테고리 개선
    const lowPerformingCategories = categoryBreakdown.filter(c => c.performance < 70);
    if (lowPerformingCategories.length > 0) {
      lowPerformingCategories.forEach(category => {
        recommendations.push(
          `📊 ${this.getCategoryName(category.category)} 카테고리 (${category.performance.toFixed(1)}점): 콘텐츠 품질 강화 및 키워드 타겟팅 재검토 필요`
        );
      });
    }

    // 개선 기회 기반 권장사항
    const highImpactOpportunities = opportunities.filter(o => o.potentialImpact === 'high');
    if (highImpactOpportunities.length > 0) {
      recommendations.push(
        `🚀 ${highImpactOpportunities.length}개의 고영향 개선 기회 발견: 즉시 실행 권장`
      );
    }

    // 일반적인 최적화 권장사항
    recommendations.push(
      '🎯 A/B 테스트를 통한 랜딩 페이지 최적화',
      '📝 상위 성과 키워드 기반 신규 콘텐츠 제작',
      '🔍 Search Console 데이터와 교차 분석으로 추가 인사이트 발견'
    );

    return recommendations;
  }

  /**
   * 카테고리 한글명 반환
   */
  private getCategoryName(category: BMADCategory): string {
    const names = {
      behavioral: 'Behavioral (행동 기반)',
      motivational: 'Motivational (동기 기반)',
      aspirational: 'Aspirational (열망 기반)',
      decisional: 'Decisional (결정 기반)',
    };
    return names[category];
  }
}

/**
 * 싱글톤 인스턴스
 */
export const bmadKeywordTracker = new BMADKeywordTracker();
