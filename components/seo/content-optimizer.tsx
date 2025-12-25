/**
 * 컨텐츠 최적화 컴포넌트
 * 페이지별 SEO 최적화 및 실시간 분석
 */

'use client';

import {
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Search,
  Link,
  Target,
  BarChart3,
} from 'lucide-react';

import { useState, useEffect } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  useContentOptimization,
  useSEOScore,
} from '@/hooks/use-content-optimization';

/**
 * 컨텐츠 최적화 컴포넌트
 * 페이지별 SEO 최적화 및 실시간 분석
 */

interface ContentOptimizerProps {
  content: string;
  targetKeywords?: string[];
  showAnalysis?: boolean;
  autoOptimize?: boolean;
  onOptimizedContent?: (content: string) => void;
}

/**
 * 메인 컨텐츠 최적화 컴포넌트
 */
export function ContentOptimizer({
  content,
  targetKeywords = [],
  showAnalysis = true,
  autoOptimize = true,
  onOptimizedContent,
}: ContentOptimizerProps) {
  const { analysis, optimizedContent, metaKeywords, isLoading, error } =
    useContentOptimization(content, targetKeywords, autoOptimize);

  const { score, factors } = useSEOScore(analysis);

  useEffect(() => {
    if (onOptimizedContent && optimizedContent !== content) {
      onOptimizedContent(optimizedContent);
    }
  }, [optimizedContent, content, onOptimizedContent]);

  if (error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>최적화 오류</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!showAnalysis) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* SEO 점수 개요 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            SEO 최적화 점수
          </CardTitle>
          <CardDescription>
            컨텐츠의 SEO 최적화 수준을 분석합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{score}/100</span>
              <Badge
                variant={
                  score >= 80
                    ? 'default'
                    : score >= 60
                      ? 'secondary'
                      : 'destructive'
                }
              >
                {score >= 80 ? '최적화됨' : score >= 60 ? '보통' : '개선 필요'}
              </Badge>
            </div>
            <Progress value={score} className="w-full" />

            {isLoading && (
              <div className="text-sm text-muted-foreground">
                컨텐츠 분석 중...
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">분석 결과</TabsTrigger>
            <TabsTrigger value="keywords">키워드</TabsTrigger>
            <TabsTrigger value="links">링크 구조</TabsTrigger>
            <TabsTrigger value="recommendations">개선 권장사항</TabsTrigger>
          </TabsList>

          {/* 분석 결과 */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">컨텐츠 기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>단어 수:</span>
                    <span className="font-mono">
                      {analysis.wordCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>가독성 점수:</span>
                    <span className="font-mono">
                      {analysis.readabilityScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>제목 개수:</span>
                    <span className="font-mono">
                      {analysis.headingStructure.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>내부 링크:</span>
                    <span className="font-mono">
                      {analysis.internalLinks.length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">SEO 요소별 점수</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {factors.map((factor, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{factor.name}</span>
                        <span className="font-mono">
                          {Math.round(factor.score)}/100
                        </span>
                      </div>
                      <Progress value={factor.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 키워드 분석 */}
          <TabsContent value="keywords" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    키워드 밀도
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(analysis.keywordDensity).map(
                    ([keyword, density]) => (
                      <div
                        key={keyword}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{keyword}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">
                            {density.toFixed(1)}%
                          </span>
                          {density >= 0.5 && density <= 3 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    메타 키워드
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {metaKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 링크 구조 */}
          <TabsContent value="links" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    내부 링크 ({analysis.internalLinks.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysis.internalLinks.slice(0, 5).map((link, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{link.text}</span>
                        <Badge variant="outline" className="text-xs">
                          {(link.relevanceScore * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {link.url}
                      </div>
                    </div>
                  ))}
                  {analysis.internalLinks.length > 5 && (
                    <div className="text-xs text-muted-foreground">
                      +{analysis.internalLinks.length - 5}개 더...
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">제목 구조</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysis.headingStructure.map((heading, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          H{heading.level}
                        </Badge>
                        <span className="text-sm">{heading.text}</span>
                      </div>
                      {heading.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-8">
                          {heading.keywords.map((keyword, kIndex) => (
                            <Badge
                              key={kIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 개선 권장사항 */}
          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  개선 권장사항
                </CardTitle>
                <CardDescription>
                  SEO 점수를 향상시키기 위한 구체적인 개선 방안
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.recommendations.map((recommendation, index) => (
                  <Alert key={index}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {recommendation}
                    </AlertDescription>
                  </Alert>
                ))}
                {analysis.recommendations.length === 0 && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      컨텐츠가 잘 최적화되어 있습니다! 현재 상태를 유지하세요.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

/**
 * 간단한 SEO 점수 표시 컴포넌트
 */
export function SEOScoreIndicator({
  content,
  targetKeywords = [],
}: {
  content: string;
  targetKeywords?: string[];
}) {
  const { analysis } = useContentOptimization(content, targetKeywords, false);
  const { score } = useSEOScore(analysis);

  if (!analysis) return null;

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant={
          score >= 80 ? 'default' : score >= 60 ? 'secondary' : 'destructive'
        }
      >
        SEO: {score}/100
      </Badge>
      {score < 60 && <AlertCircle className="h-4 w-4 text-orange-500" />}
    </div>
  );
}

export default ContentOptimizer;
