/**
 * 컨텐츠 최적화 커스텀 훅
 * 페이지별 컨텐츠 분석 및 SEO 최적화
 */

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  analyzeContent, 
  generateInternalLinks, 
  generateMetaKeywords,
  type ContentAnalysis 
} from '@/lib/seo/content-optimizer';

interface OptimizationResult {
  analysis: ContentAnalysis | null;
  optimizedContent: string;
  metaKeywords: string[];
  isLoading: boolean;
  error: string | null;
}

/**
 * 컨텐츠 최적화 훅
 */
export function useContentOptimization(
  content: string,
  targetKeywords: string[] = [],
  autoOptimize: boolean = true
): OptimizationResult {
  const pathname = usePathname();
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [optimizedContent, setOptimizedContent] = useState(content);
  const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!content || content.length < 50) return;

    const optimizeContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. 컨텐츠 분석
        const contentAnalysis = analyzeContent(content, targetKeywords);
        setAnalysis(contentAnalysis);

        // 2. 자동 최적화가 활성화된 경우
        if (autoOptimize) {
          // 내부 링크 생성
          const linkedContent = generateInternalLinks(content, pathname);
          setOptimizedContent(linkedContent);

          // 메타 키워드 생성
          const keywords = generateMetaKeywords(content, targetKeywords);
          setMetaKeywords(keywords);
        } else {
          setOptimizedContent(content);
          setMetaKeywords(targetKeywords);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : '컨텐츠 최적화 중 오류가 발생했습니다.');
        console.error('Content optimization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // 디바운스 처리 (500ms)
    const timeoutId = setTimeout(optimizeContent, 500);
    return () => clearTimeout(timeoutId);
  }, [content, targetKeywords, pathname, autoOptimize]);

  return {
    analysis,
    optimizedContent,
    metaKeywords,
    isLoading,
    error
  };
}

/**
 * 페이지별 키워드 최적화 훅
 */
export function usePageKeywords(pathname: string): string[] {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    // 페이지별 타겟 키워드 매핑
    const pageKeywordMap: Record<string, string[]> = {
      '/': ['패밀리오피스', '자산관리서비스', '삼성생명', 'CEO 자산관리'],
      '/services': ['자산관리서비스', '프라이빗뱅킹', '포트폴리오관리', '투자자문'],
      '/business-succession-strategy': ['기업승계', '가업승계', '승계계획', '경영권승계'],
      '/tax-strategy': ['세무최적화', '절세전략', '상속세', '증여세'],
      '/corporate-life-insurance': ['기업임원 생명보험', 'CEO 보험설계', '고액보험'],
      '/key-person-insurance': ['핵심인력보험', '기업 리스크 관리', '위험관리'],
      '/program': ['CEO 자산관리 교육', '차세대 경영진 교육', '패밀리오피스 세미나'],
      '/seminar': ['자산관리 세미나', '기업가 금융교육', '자산관리교육'],
      '/blog': ['자산관리 블로그', '패밀리오피스 인사이트', '투자 전략'],
      '/insights/market-intelligence': ['마켓 인텔리전스', '자산관리 시장분석', '투자 트렌드']
    };

    // 현재 경로에 맞는 키워드 설정
    const currentKeywords = pageKeywordMap[pathname] || ['패밀리오피스', '자산관리'];
    setKeywords(currentKeywords);
  }, [pathname]);

  return keywords;
}

/**
 * SEO 점수 계산 훅
 */
export function useSEOScore(analysis: ContentAnalysis | null): {
  score: number;
  factors: Array<{ name: string; score: number; weight: number; description: string }>;
} {
  const [score, setScore] = useState(0);
  const [factors, setFactors] = useState<Array<{ name: string; score: number; weight: number; description: string }>>([]);

  useEffect(() => {
    if (!analysis) {
      setScore(0);
      setFactors([]);
      return;
    }

    const scoringFactors = [
      {
        name: '컨텐츠 길이',
        score: analysis.wordCount >= 300 ? 100 : (analysis.wordCount / 300) * 100,
        weight: 0.15,
        description: '최소 300단어 이상 권장'
      },
      {
        name: '키워드 밀도',
        score: Object.values(analysis.keywordDensity).every(density => density >= 0.5 && density <= 3) ? 100 : 50,
        weight: 0.25,
        description: '키워드 밀도 0.5-3% 권장'
      },
      {
        name: '제목 구조',
        score: analysis.headingStructure.length > 0 ? 100 : 0,
        weight: 0.20,
        description: 'H1, H2, H3 태그 사용'
      },
      {
        name: '내부 링크',
        score: analysis.internalLinks.length >= 3 ? 100 : (analysis.internalLinks.length / 3) * 100,
        weight: 0.20,
        description: '최소 3개 이상 내부 링크'
      },
      {
        name: '가독성',
        score: analysis.readabilityScore >= 60 ? 100 : (analysis.readabilityScore / 60) * 100,
        weight: 0.20,
        description: '가독성 점수 60점 이상'
      }
    ];

    // 전체 점수 계산
    const totalScore = scoringFactors.reduce((total, factor) => {
      return total + (factor.score * factor.weight);
    }, 0);

    setScore(Math.round(totalScore));
    setFactors(scoringFactors);
  }, [analysis]);

  return { score, factors };
}

export default {
  useContentOptimization,
  usePageKeywords,
  useSEOScore
};