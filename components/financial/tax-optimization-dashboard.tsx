'use client';

import {
  TrendingUp,
  DollarSign,
  Calculator,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';

import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface TaxOptimizationData {
  dividendTax: {
    currentTax: number;
    optimizedTax: number;
    savings: number;
    strategies: string[];
  };
  capitalGainsTax: {
    currentTax: number;
    optimizedTax: number;
    savings: number;
    strategies: string[];
  };
  corporateTax: {
    currentTax: number;
    optimizedTax: number;
    savings: number;
    strategies: string[];
  };
  recommendations: Array<{
    category: string;
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    implementation: string;
  }>;
  koreanMarketSpecific: Array<{
    title: string;
    description: string;
    benefit: string;
  }>;
}

export function TaxOptimizationDashboard() {
  const [data, setData] = useState<TaxOptimizationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaxData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/financial/tax-optimization');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || '세무 데이터를 가져오는데 실패했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('Tax data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxData();
  }, []);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(num);
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return <LoadingSkeleton type="card" count={3} className="h-96" />;
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                데이터 로드 실패
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchTaxData}
                className="mt-2"
              >
                다시 시도
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const totalSavings =
    (data.dividendTax?.savings || 0) +
    (data.capitalGainsTax?.savings || 0) +
    (data.corporateTax?.savings || 0);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">세무 최적화</h2>
          <p className="text-muted-foreground text-sm">
            한국 세법에 맞춘 세무 최적화 전략
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
        >
          총 절약: {formatCurrency(totalSavings)}
        </Badge>
      </div>

      {/* 세무 절약 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              배당소득세
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">현재 세금</span>
                <span className="font-semibold">
                  {formatCurrency(data.dividendTax?.currentTax || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">최적화 후</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(data.dividendTax?.optimizedTax || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">절약액</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  +{formatCurrency(data.dividendTax?.savings || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              양도소득세
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">현재 세금</span>
                <span className="font-semibold">
                  {formatCurrency(data.capitalGainsTax?.currentTax || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">최적화 후</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(data.capitalGainsTax?.optimizedTax || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">절약액</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  +{formatCurrency(data.capitalGainsTax?.savings || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              법인세
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">현재 세금</span>
                <span className="font-semibold">
                  {formatCurrency(data.corporateTax?.currentTax || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">최적화 후</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(data.corporateTax?.optimizedTax || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">절약액</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  +{formatCurrency(data.corporateTax?.savings || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 세무 최적화 전략 */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            세무 최적화 전략
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(data.recommendations || []).map((recommendation, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{recommendation.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {recommendation.description}
                    </p>
                  </div>
                  <Badge className={getImpactColor(recommendation.impact)}>
                    {recommendation.impact === 'high'
                      ? '높음'
                      : recommendation.impact === 'medium'
                        ? '보통'
                        : '낮음'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>구현 방법:</strong> {recommendation.implementation}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 한국 시장 특화 전략 */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            한국 시장 특화 전략
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data.koreanMarketSpecific || []).map((strategy, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <h4 className="font-semibold mb-2">{strategy.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {strategy.description}
                </p>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">
                  {strategy.benefit}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 세무 전략 상세 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>배당소득세 전략</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {(data.dividendTax?.strategies || []).map((strategy, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>양도소득세 전략</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {(data.capitalGainsTax?.strategies || []).map(
                (strategy, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{strategy}</span>
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
