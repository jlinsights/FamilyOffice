'use client';

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

import { cn } from '@/lib/utils';

interface KoreanMarketData {
  kospi: {
    value: number;
    change: number;
    changePercent: number;
    volume: number;
  };
  kosdaq: {
    value: number;
    change: number;
    changePercent: number;
    volume: number;
  };
  usdkrw: {
    value: number;
    change: number;
    changePercent: number;
  };
  topStocks: Array<{
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  }>;
  sectors: Array<{
    name: string;
    performance: number;
    topStocks: string[];
  }>;
}

export function KoreanMarketDashboard() {
  const [data, setData] = useState<KoreanMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/financial/korean-market');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setLastUpdated(new Date());
      } else {
        setError(result.message || '데이터를 가져오는데 실패했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('Market data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();

    // 5분마다 자동 새로고침
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(num);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) {
      return `${(volume / 1000000000).toFixed(1)}B`;
    } else if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return formatNumber(volume);
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
                onClick={fetchMarketData}
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

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">한국 시장 현황</h2>
          <p className="text-muted-foreground text-sm">
            실시간 한국 주식 시장 데이터
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              마지막 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchMarketData}
            disabled={isLoading}
          >
            <RefreshCw
              className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')}
            />
            새로고침
          </Button>
        </div>
      </div>

      {/* 주요 지수 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">KOSPI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {formatNumber(data.kospi?.value || 0)}
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-sm',
                  (data.kospi?.change || 0) >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                {(data.kospi?.change || 0) >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {(data.kospi?.change || 0) >= 0 ? '+' : ''}
                  {formatNumber(data.kospi?.change || 0)}
                </span>
                <span>
                  ({(data.kospi?.changePercent || 0) >= 0 ? '+' : ''}
                  {(data.kospi?.changePercent || 0).toFixed(2)}%)
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                거래량: {formatVolume(data.kospi?.volume || 0)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">KOSDAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {formatNumber(data.kosdaq?.value || 0)}
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-sm',
                  (data.kosdaq?.change || 0) >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                {(data.kosdaq?.change || 0) >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {(data.kosdaq?.change || 0) >= 0 ? '+' : ''}
                  {formatNumber(data.kosdaq?.change || 0)}
                </span>
                <span>
                  ({(data.kosdaq?.changePercent || 0) >= 0 ? '+' : ''}
                  {(data.kosdaq?.changePercent || 0).toFixed(2)}%)
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                거래량: {formatVolume(data.kosdaq?.volume || 0)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              USD/KRW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {(data.usdkrw?.value || 0).toFixed(2)}
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-sm',
                  (data.usdkrw?.change || 0) >= 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                )}
              >
                {(data.usdkrw?.change || 0) >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {(data.usdkrw?.change || 0) >= 0 ? '+' : ''}
                  {(data.usdkrw?.change || 0).toFixed(2)}
                </span>
                <span>
                  ({(data.usdkrw?.changePercent || 0) >= 0 ? '+' : ''}
                  {(data.usdkrw?.changePercent || 0).toFixed(2)}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 섹터별 성과 */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            섹터별 성과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data.sectors || []).map((sector, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{sector.name}</span>
                  <Badge
                    variant={sector.performance >= 0 ? 'default' : 'secondary'}
                    className={cn(
                      sector.performance >= 0
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    )}
                  >
                    {sector.performance >= 0 ? '+' : ''}
                    {sector.performance.toFixed(1)}%
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  주요 종목: {sector.topStocks.slice(0, 3).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 주요 종목 */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>주요 종목</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(data.topStocks || []).map(stock => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stock.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {stock.symbol}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    거래량: {formatVolume(stock.volume)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {formatCurrency(stock.price)}
                  </div>
                  <div
                    className={cn(
                      'text-sm',
                      stock.change >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {stock.change >= 0 ? '+' : ''}
                    {formatCurrency(stock.change)}
                    <span className="ml-1">
                      ({stock.changePercent >= 0 ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
