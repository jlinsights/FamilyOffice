/**
 * AEO (Answer Engine Optimization) React Hook
 * AI 검색엔진 및 음성검색 최적화 상태 관리
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * AEO (Answer Engine Optimization) React Hook
 * AI 검색엔진 및 음성검색 최적화 상태 관리
 */

export interface AEOData {
  answerCoverage: {
    totalQueries: number;
    answeredQueries: number;
    coverage: number;
    gaps: string[];
  };
  voiceSearch: {
    optimizedQuestions: number;
    naturalLanguageQueries: number;
    voiceReadiness: number;
    devicePerformance: Record<string, number>;
    commonPatterns: Array<{ pattern: string; frequency: number }>;
  };
  aiEngines: {
    [engine: string]: {
      optimizationScore: number;
      responseQuality: number;
      contextUnderstanding: number;
      businessRelevance: number;
      strengths: string[];
      improvements: string[];
    };
  };
  conversationalQueries: {
    totalIdentified: number;
    optimized: number;
    businessValueDistribution: { high: number; medium: number; low: number };
    intentAnalysis: Record<string, number>;
    followUpOpportunities: Array<{
      query: string;
      followUps: string[];
    }>;
  };
  structuredAnswers: {
    totalTemplates: number;
    accuracyScore: number;
    freshnessScore: number;
    citationQuality: number;
    templatePerformance: Array<{
      pattern: string;
      usage: number;
      accuracy: number;
      lastUpdated: string;
    }>;
  };
}

interface UseAEOOptimizationOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  enableRealTimeUpdates?: boolean;
}

export function useAEOOptimization(options: UseAEOOptimizationOptions = {}) {
  const {
    autoRefresh = true,
    refreshInterval = 10 * 60 * 1000, // 10분
    enableRealTimeUpdates = true,
  } = options;

  const [data, setData] = useState<AEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [optimizationTasks, setOptimizationTasks] = useState<
    Array<{
      id: string;
      type: string;
      status: 'pending' | 'running' | 'completed' | 'failed';
      progress: number;
      eta?: string;
    }>
  >([]);

  // AEO 데이터 가져오기
  const fetchAEOData = useCallback(async () => {
    try {
      const response = await fetch('/api/aeo/analysis');
      if (!response.ok) throw new Error('AEO 데이터 가져오기 실패');
      const result = await response.json();
      return result.data;
    } catch (err) {
      console.error('AEO 데이터 오류:', err);
      return null;
    }
  }, []);

  // 전체 데이터 새로고침
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const aeoData = await fetchAEOData();
      if (!aeoData) {
        throw new Error('AEO 데이터를 가져올 수 없습니다');
      }

      setData(aeoData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('AEO 데이터 새로고침 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, [fetchAEOData]);

  // 음성 검색 최적화
  const optimizeVoiceSearch = useCallback(async (queries: string[]) => {
    try {
      const response = await fetch('/api/aeo/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'optimize-voice',
          config: { queries, format: 'conversational' },
        }),
      });

      if (!response.ok) throw new Error('음성 검색 최적화 실패');

      const result = await response.json();

      // 최적화 작업 추가
      setOptimizationTasks(prev => [
        ...prev,
        {
          id: result.data.optimizationId,
          type: 'voice-search',
          status: 'running',
          progress: 0,
          eta: result.data.expectedCompletion,
        },
      ]);

      return result.data;
    } catch (err) {
      console.error('음성 검색 최적화 오류:', err);
      throw err;
    }
  }, []);

  // AI 엔진 최적화
  const optimizeAIEngines = useCallback(
    async (engines: string[], contentTypes: string[]) => {
      try {
        const response = await fetch('/api/aeo/analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'optimize-ai-engines',
            config: { engines, contentTypes },
          }),
        });

        if (!response.ok) throw new Error('AI 엔진 최적화 실패');

        const result = await response.json();

        // 최적화 작업 추가
        setOptimizationTasks(prev => [
          ...prev,
          {
            id: result.data.optimizationId,
            type: 'ai-engines',
            status: 'running',
            progress: 0,
            eta: result.data.estimatedCompletion,
          },
        ]);

        return result.data;
      } catch (err) {
        console.error('AI 엔진 최적화 오류:', err);
        throw err;
      }
    },
    []
  );

  // 구조화 답변 생성
  const generateStructuredAnswers = useCallback(async (topics: string[]) => {
    try {
      const response = await fetch('/api/aeo/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-structured-answers',
          config: {
            topics,
            format: 'template',
            sources: ['expert_knowledge', 'official_docs'],
          },
        }),
      });

      if (!response.ok) throw new Error('구조화 답변 생성 실패');

      const result = await response.json();

      // 생성 작업 추가
      setOptimizationTasks(prev => [
        ...prev,
        {
          id: result.data.generationId,
          type: 'structured-answers',
          status: 'running',
          progress: 0,
          eta: result.data.estimatedCompletion,
        },
      ]);

      return result.data;
    } catch (err) {
      console.error('구조화 답변 생성 오류:', err);
      throw err;
    }
  }, []);

  // 경쟁사 AEO 분석
  const analyzeCompetitors = useCallback(async () => {
    try {
      const response = await fetch('/api/aeo/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze-competitors',
        }),
      });

      if (!response.ok) throw new Error('경쟁사 AEO 분석 실패');

      const result = await response.json();

      // 분석 작업 추가
      setOptimizationTasks(prev => [
        ...prev,
        {
          id: result.data.analysisId,
          type: 'competitor-analysis',
          status: 'running',
          progress: 0,
          eta: result.data.estimatedCompletion,
        },
      ]);

      return result.data;
    } catch (err) {
      console.error('경쟁사 AEO 분석 오류:', err);
      throw err;
    }
  }, []);

  // 최적화 작업 상태 업데이트 (모의)
  useEffect(() => {
    const interval = setInterval(() => {
      setOptimizationTasks(prev =>
        prev.map(task => {
          if (task.status === 'running') {
            const newProgress = Math.min(
              task.progress + Math.random() * 10,
              100
            );
            return {
              ...task,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'running',
            };
          }
          return task;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
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

  return {
    data,
    loading,
    error,
    lastUpdated,
    optimizationTasks,
    refreshData,
    optimizeVoiceSearch,
    optimizeAIEngines,
    generateStructuredAnswers,
    analyzeCompetitors,

    // 유틸리티 함수들
    getAEOScore: () => {
      if (!data) return 0;

      // AEO 종합 점수 계산
      const coverageScore = data.answerCoverage.coverage * 0.25;
      const voiceScore = data.voiceSearch.voiceReadiness * 0.2;
      const aiEngineScore =
        (Object.values(data.aiEngines).reduce(
          (acc, engine) => acc + engine.optimizationScore,
          0
        ) /
          Object.keys(data.aiEngines).length) *
        0.3;
      const structuredScore = data.structuredAnswers.accuracyScore * 0.25;

      return Math.round(
        coverageScore + voiceScore + aiEngineScore + structuredScore
      );
    },

    getTopPerformingEngines: (limit = 3) => {
      if (!data) return [];

      return Object.entries(data.aiEngines)
        .sort(([_, a], [__, b]) => b.optimizationScore - a.optimizationScore)
        .slice(0, limit)
        .map(([engine, data]) => ({
          engine,
          score: data.optimizationScore,
          strengths: data.strengths,
        }));
    },

    getVoiceOptimizationOpportunities: () => {
      if (!data) return [];

      const currentOptimized = data.voiceSearch.optimizedQuestions;
      const totalQueries = data.voiceSearch.naturalLanguageQueries;
      const gap = totalQueries - currentOptimized;

      return {
        totalGap: gap,
        potentialImprovement: Math.round((gap / totalQueries) * 100),
        topPatterns: data.voiceSearch.commonPatterns
          .sort((a, b) => b.frequency - a.frequency)
          .slice(0, 5),
      };
    },

    getHighValueQueries: () => {
      if (!data) return [];

      return data.conversationalQueries.followUpOpportunities
        .filter(opportunity => opportunity.followUps.length >= 2)
        .map(opportunity => ({
          query: opportunity.query,
          businessValue: 'high',
          followUpCount: opportunity.followUps.length,
          followUps: opportunity.followUps,
        }));
    },

    getOptimizationProgress: (taskType?: string) => {
      const filteredTasks = taskType
        ? optimizationTasks.filter(task => task.type === taskType)
        : optimizationTasks;

      if (filteredTasks.length === 0) return { progress: 0, status: 'idle' };

      const avgProgress =
        filteredTasks.reduce((acc, task) => acc + task.progress, 0) /
        filteredTasks.length;
      const allCompleted = filteredTasks.every(
        task => task.status === 'completed'
      );
      const anyRunning = filteredTasks.some(task => task.status === 'running');

      return {
        progress: avgProgress,
        status: allCompleted ? 'completed' : anyRunning ? 'running' : 'idle',
        tasks: filteredTasks,
      };
    },
  };
}
