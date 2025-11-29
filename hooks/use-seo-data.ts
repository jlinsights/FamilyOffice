/**
 * SEO 데이터 관리 React Hook
 * 실시간 SEO 성과 데이터 및 상태 관리
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SEOData {
  keywords: {
    [keyword: string]: {
      currentRank: number;
      previousRank: number;
      trend: 'up' | 'down' | 'stable';
      searchVolume: number;
      changePercent: number;
    };
  };
  traffic: {
    totalSessions: number;
    organicSessions: number;
    organicPercentage: number;
    conversions: number;
    conversionRate: number;
  };
  naver: {
    blog: {
      rank: number;
      subscriberCount: number;
      engagement: number;
    };
    premium: {
      subscribers: number;
      monthlyRevenue: number;
      engagementRate: number;
    };
  };
  technical: {
    seoScore: number;
    pagespeed: { mobile: number; desktop: number; };
    coreWebVitals: { lcp: number; fid: number; cls: number; };
  };
}

interface UseSEODataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // milliseconds
  enableRealTime?: boolean;
}

export function useSEOData(options: UseSEODataOptions = {}) {
  const {
    autoRefresh = true,
    refreshInterval = 5 * 60 * 1000, // 5분
    enableRealTime = true
  } = options;

  const [data, setData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 키워드 데이터 가져오기
  const fetchKeywordData = useCallback(async () => {
    try {
      const response = await fetch('/api/seo/keywords');
      if (!response.ok) throw new Error('키워드 데이터 가져오기 실패');
      const result = await response.json();
      return result.data.keywords;
    } catch (err) {
      console.error('키워드 데이터 오류:', err);
      return null;
    }
  }, []);

  // 네이버 데이터 가져오기
  const fetchNaverData = useCallback(async () => {
    try {
      const response = await fetch('/api/seo/naver');
      if (!response.ok) throw new Error('네이버 데이터 가져오기 실패');
      const result = await response.json();
      return {
        blog: result.data.blog.stats,
        premium: result.data.premium.stats
      };
    } catch (err) {
      console.error('네이버 데이터 오류:', err);
      return null;
    }
  }, []);

  // 분석 데이터 가져오기
  const fetchAnalyticsData = useCallback(async () => {
    try {
      const response = await fetch('/api/seo/analytics?metrics=traffic,technical');
      if (!response.ok) throw new Error('분석 데이터 가져오기 실패');
      const result = await response.json();
      return {
        traffic: result.data.traffic,
        technical: result.data.technical
      };
    } catch (err) {
      console.error('분석 데이터 오류:', err);
      return null;
    }
  }, []);

  // 전체 데이터 새로고침
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [keywordData, naverData, analyticsData] = await Promise.all([
        fetchKeywordData(),
        fetchNaverData(),
        fetchAnalyticsData()
      ]);

      if (!keywordData || !naverData || !analyticsData) {
        throw new Error('일부 데이터를 가져올 수 없습니다');
      }

      const seoData: SEOData = {
        keywords: keywordData,
        traffic: {
          totalSessions: analyticsData.traffic.totalSessions,
          organicSessions: analyticsData.traffic.organicSessions,
          organicPercentage: analyticsData.traffic.organicPercentage,
          conversions: analyticsData.traffic.conversions || 0,
          conversionRate: analyticsData.traffic.conversionRate || 0
        },
        naver: {
          blog: {
            rank: naverData.blog.rank,
            subscriberCount: naverData.blog.subscriberCount,
            engagement: naverData.blog.engagement
          },
          premium: {
            subscribers: naverData.premium.subscribers,
            monthlyRevenue: naverData.premium.monthlyRevenue,
            engagementRate: naverData.premium.engagementRate
          }
        },
        technical: {
          seoScore: analyticsData.technical.seoScore || 85,
          pagespeed: analyticsData.technical.pagespeedInsights || { mobile: 85, desktop: 92 },
          coreWebVitals: analyticsData.technical.pagespeedInsights?.coreWebVitals || { lcp: 2.1, fid: 95, cls: 0.08 }
        }
      };

      setData(seoData);
      setLastUpdated(new Date());

    } catch (err) {
      console.error('SEO 데이터 새로고침 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, [fetchKeywordData, fetchNaverData, fetchAnalyticsData]);

  // 특정 키워드 순위 업데이트
  const updateKeywordRank = useCallback(async (keyword: string) => {
    try {
      const response = await fetch('/api/seo/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'refresh',
          keywords: [keyword]
        })
      });

      if (!response.ok) throw new Error('키워드 업데이트 실패');
      
      // 성공시 데이터 새로고침
      await refreshData();
      return true;

    } catch (err) {
      console.error('키워드 업데이트 오류:', err);
      return false;
    }
  }, [refreshData]);

  // 네이버 블로그 자동 포스팅
  const autoPostToBlog = useCallback(async (postData: {
    title: string;
    content: string;
    keywords: string[];
  }) => {
    try {
      const response = await fetch('/api/seo/naver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'auto-post',
          data: postData
        })
      });

      if (!response.ok) throw new Error('자동 포스팅 실패');
      const result = await response.json();
      return result.data;

    } catch (err) {
      console.error('자동 포스팅 오류:', err);
      throw err;
    }
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // 자동 새로고침 설정
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(refreshData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshData]);

  // 실시간 업데이트 (WebSocket 연결)
  useEffect(() => {
    if (!enableRealTime) return;

    // 실제 구현에서는 WebSocket 또는 Server-Sent Events 사용
    // 현재는 간단한 시뮬레이션
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enableRealTime, refreshData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refreshData,
    updateKeywordRank,
    autoPostToBlog,
    
    // 유틸리티 함수들
    getKeywordTrend: (keyword: string) => {
      if (!data?.keywords[keyword]) return null;
      const kw = data.keywords[keyword];
      return {
        trend: kw.trend,
        change: kw.currentRank - kw.previousRank,
        percentage: kw.changePercent
      };
    },
    
    getSEOScore: () => {
      if (!data) return 0;
      
      // 종합 SEO 점수 계산
      const keywordScore = Object.values(data.keywords).reduce((acc, kw) => {
        return acc + (kw.currentRank <= 10 ? 10 : Math.max(0, 10 - kw.currentRank / 10));
      }, 0) / Object.keys(data.keywords).length;
      
      const trafficScore = Math.min(10, data.traffic.organicPercentage / 10);
      const technicalScore = data.technical.seoScore / 10;
      
      return Math.round((keywordScore + trafficScore + technicalScore) / 3 * 10);
    },
    
    getTopPerformingKeywords: (limit = 5) => {
      if (!data) return [];
      
      return Object.entries(data.keywords)
        .filter(([_, kw]) => kw.currentRank <= 20)
        .sort(([_, a], [__, b]) => a.currentRank - b.currentRank)
        .slice(0, limit)
        .map(([keyword, kw]) => ({
          keyword,
          rank: kw.currentRank,
          trend: kw.trend
        }));
    }
  };
}