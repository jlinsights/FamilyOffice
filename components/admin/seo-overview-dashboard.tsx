
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface SearchConsoleData {
  searchMetrics: Array<{
    query: string;
    clicks: number;
    impressions: number;
    position: number;
    change: number;
  }>;
}

export function SeoOverviewDashboard() {
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/search-console/metrics');
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch SEO overview", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          SEO 데이터 분석 중...
        </CardContent>
      </Card>
    );
  }

  // Calculate Summary Metrics from Real Data
  const metrics = data?.searchMetrics || [];
  
  // 1. Average Position (Top 10 queries average)
  const avgPosition = metrics.length > 0 
    ? (metrics.reduce((acc, curr) => acc + curr.position, 0) / metrics.length).toFixed(1)
    : '-';

  // 2. Total Traffic (Clicks)
  const totalClicks = metrics.reduce((acc, curr) => acc + curr.clicks, 0);

  // 3. Traffic Trend (Average change % of top queries)
  const avgChange = metrics.length > 0
    ? Math.round(metrics.reduce((acc, curr) => acc + curr.change, 0) / metrics.length)
    : 0;

  return (
      <Card>
        <CardHeader>
          <CardTitle>SEO 성과 지표 (Live)</CardTitle>
          <CardDescription>Google Search Console 실시간 데이터 기반</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{avgPosition}위</div>
              <p className="text-sm text-muted-foreground">평균 검색순위 (Top 10)</p>
              <p className="text-xs text-muted-foreground">주요 키워드 기준</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${avgChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {avgChange > 0 ? '+' : ''}{avgChange}%
              </div>
              <p className="text-sm text-muted-foreground">트래픽 증감율</p>
              <p className="text-xs text-muted-foreground">지난 기간 대비 클릭 변화</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600">{totalClicks.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">최근 28일 클릭수</p>
              <p className="text-xs text-muted-foreground">Google Organic Search</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">실시간 인기 검색어</h4>
              <ul className="space-y-2 text-sm">
                {metrics.slice(0, 3).map((m, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                       <span className="text-primary font-bold">{i+1}.</span>
                       <span>{m.query}</span>
                    </span>
                    <span className="text-muted-foreground text-xs">{m.position.toFixed(1)}위 / {m.clicks}클릭</span>
                  </li>
                ))}
                {metrics.length === 0 && <li className="text-muted-foreground">데이터가 충분하지 않습니다.</li>}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
