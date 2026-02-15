/**
 * 네이버 검색 순위 추적 React Hook
 * 실시간 키워드 순위 모니터링 및 관리
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

export interface KeywordRanking {
  id: string;
  keyword: string;
  currentRank: number;
  previousRank: number;
  bestRank: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  lastUpdated: string;
  targetRank: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  clicks?: number;
  impressions?: number;
  ctr?: number;
}

export interface NaverRankingData {
  keywords: KeywordRanking[];
  summary: {
    totalKeywords: number;
    avgRank: number;
    improvingKeywords: number;
    decliningKeywords: number;
    top10Keywords: number;
    top20Keywords: number;
    totalSearchVolume: number;
  };
  categories: Record<
    string,
    {
      count: number;
      avgRank: number;
      trend: 'up' | 'down' | 'stable';
    }
  >;
  lastUpdate: string;
  note?: string;
}

interface UseNaverRankingOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  enableRealTime?: boolean;
}

interface AddKeywordRequest {
  keyword: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  targetRank?: number;
}

interface UpdateTargetRequest {
  keyword: string;
  targetRank: number;
}

export function useNaverRanking(options: UseNaverRankingOptions = {}) {
  const {
    autoRefresh = true,
    refreshInterval = 15 * 60 * 1000, // 15분
    enableRealTime = false,
  } = options;

  const [data, setData] = useState<NaverRankingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 순위 데이터 가져오기
  const fetchRankings = useCallback(async () => {
    try {
      const response = await fetch('/api/naver/ranking?action=get_rankings');
      if (!response.ok) throw new Error('순위 데이터 가져오기 실패');

      const result = await response.json();
      if (!result.success) throw new Error(result.error || '데이터 조회 실패');

      return result.data;
    } catch (err) {
      console.error('순위 데이터 조회 오류:', err);
      return null;
    }
  }, []);

  // 전체 데이터 새로고침
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const rankingData = await fetchRankings();
      if (!rankingData) {
        throw new Error('순위 데이터를 가져올 수 없습니다');
      }

      setData(rankingData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('데이터 새로고침 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, [fetchRankings]);

  // 새 키워드 추가
  const addKeyword = useCallback(
    async (keywordData: AddKeywordRequest) => {
      try {
        const response = await fetch('/api/naver/ranking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add_keyword',
            ...keywordData,
          }),
        });

        if (!response.ok) throw new Error('키워드 추가 실패');

        const result = await response.json();
        if (!result.success)
          throw new Error(result.error || '키워드 추가 실패');

        // 데이터 새로고침
        await refreshData();

        return result.data;
      } catch (err) {
        console.error('키워드 추가 오류:', err);
        throw err;
      }
    },
    [refreshData]
  );

  // 목표 순위 업데이트
  const updateTargetRank = useCallback(
    async (updateData: UpdateTargetRequest) => {
      try {
        const response = await fetch('/api/naver/ranking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update_target',
            ...updateData,
          }),
        });

        if (!response.ok) throw new Error('목표 순위 업데이트 실패');

        const result = await response.json();
        if (!result.success)
          throw new Error(result.error || '목표 순위 업데이트 실패');

        // 데이터 새로고침
        await refreshData();

        return result.data;
      } catch (err) {
        console.error('목표 순위 업데이트 오류:', err);
        throw err;
      }
    },
    [refreshData]
  );

  // 벌크 순위 체크
  const bulkCheckRankings = useCallback(async (keywords: string[]) => {
    try {
      const response = await fetch('/api/naver/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk_check',
          keywords,
        }),
      });

      if (!response.ok) throw new Error('벌크 순위 체크 실패');

      const result = await response.json();
      if (!result.success)
        throw new Error(result.error || '벌크 순위 체크 실패');

      return result.data;
    } catch (err) {
      console.error('벌크 순위 체크 오류:', err);
      throw err;
    }
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // 자동 새로고침
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(refreshData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshData]);

  // 실시간 업데이트 (WebSocket - 추후 구현)
  useEffect(() => {
    if (!enableRealTime) return;

    // WebSocket 연결 로직
    // const ws = new WebSocket('ws://localhost:3000/api/naver/ranking/ws');
    // ws.onmessage = (event) => {
    //   const update = JSON.parse(event.data);
    //   if (update.type === 'ranking_update') {
    //     setData(prev => prev ? { ...prev, ...update.data } : null);
    //   }
    // };

    // return () => ws.close();
  }, [enableRealTime]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refreshData,
    addKeyword,
    updateTargetRank,
    bulkCheckRankings,

    // 유틸리티 함수들
    getKeywordById: (id: string) => {
      return data?.keywords.find(k => k.id === id) || null;
    },

    getKeywordsByCategory: (category: string) => {
      if (!data) return [];
      return category === '전체'
        ? data.keywords
        : data.keywords.filter(k => k.category === category);
    },

    getTopPerformers: (limit = 5) => {
      if (!data) return [];
      return data.keywords
        .filter(k => k.currentRank <= 10)
        .sort((a, b) => a.currentRank - b.currentRank)
        .slice(0, limit);
    },

    getUnderPerformers: (limit = 5) => {
      if (!data) return [];
      return data.keywords
        .filter(k => k.currentRank > k.targetRank)
        .sort(
          (a, b) =>
            b.currentRank - b.targetRank - (a.currentRank - a.targetRank)
        )
        .slice(0, limit);
    },

    getMostImproved: (limit = 3) => {
      if (!data) return [];
      return data.keywords
        .filter(k => k.trend === 'up')
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, limit);
    },

    getCategoryPerformance: () => {
      if (!data) return [];
      return Object.entries(data.categories)
        .map(([category, stats]) => ({
          category,
          ...stats,
          performance:
            stats.avgRank <= 15
              ? 'good'
              : stats.avgRank <= 25
                ? 'average'
                : 'poor',
        }))
        .sort((a, b) => a.avgRank - b.avgRank);
    },

    getOverallProgress: () => {
      if (!data) return null;

      const totalKeywords = data.summary.totalKeywords;
      const achievedTargets = data.keywords.filter(
        k => k.currentRank <= k.targetRank
      ).length;
      const progressPercentage =
        totalKeywords > 0 ? (achievedTargets / totalKeywords) * 100 : 0;

      return {
        achievedTargets,
        totalKeywords,
        progressPercentage: Math.round(progressPercentage),
        avgRankImprovement:
          data.summary.improvingKeywords - data.summary.decliningKeywords,
      };
    },

    getSearchVolumeOpportunity: () => {
      if (!data) return 0;

      // 상위 20위 내 키워드들의 검색량 합계
      const top20Volume = data.keywords
        .filter(k => k.currentRank <= 20)
        .reduce((sum, k) => sum + k.searchVolume, 0);

      return top20Volume;
    },

    getCompetitiveAnalysis: () => {
      if (!data) return null;

      const highCompetitionKeywords = data.keywords.filter(
        k => k.difficulty >= 80
      );
      const lowHangingFruit = data.keywords.filter(
        k => k.difficulty < 70 && k.currentRank > k.targetRank
      );

      return {
        highCompetitionCount: highCompetitionKeywords.length,
        lowHangingFruitCount: lowHangingFruit.length,
        avgDifficulty:
          data.keywords.reduce((sum, k) => sum + k.difficulty, 0) /
          data.keywords.length,
        recommendedFocus: lowHangingFruit.slice(0, 3),
      };
    },
  };
}
