'use client';

import { useCallback, useEffect, useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { FunnelChart } from './funnel-chart';
import { FunnelDatePicker } from './funnel-date-picker';
import { AttributionTable } from './attribution-table';
import { RecentConversions } from './recent-conversions';

import type { FunnelMetrics, AttributionMetric } from '@/lib/conversion/types';

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function ConversionDashboard() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return toDateString(d);
  });
  const [endDate, setEndDate] = useState(() => toDateString(new Date()));
  const [funnelData, setFunnelData] = useState<FunnelMetrics | null>(null);
  const [attribution, setAttribution] = useState<AttributionMetric[]>([]);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const start = startDate || toDateString(new Date());
      const end = endDate || toDateString(new Date());
      const params = new URLSearchParams({
        start: new Date(start).toISOString(),
        end: new Date(end + 'T23:59:59').toISOString(),
      });

      const [funnelRes, attrRes, recentRes] = await Promise.all([
        fetch(`/api/admin/analytics/funnel?${params}`),
        fetch(`/api/admin/analytics/attribution?${params}`),
        fetch('/api/admin/analytics/recent?limit=15'),
      ]);

      if (funnelRes.ok) {
        setFunnelData(await funnelRes.json());
      }
      if (attrRes.ok) {
        const attrData = await attrRes.json();
        setAttribution(attrData.attribution || []);
      }
      if (recentRes.ok) {
        const recentData = await recentRes.json();
        setRecentEvents(Array.isArray(recentData) ? recentData : []);
      }
    } catch (e) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error('[ConversionDashboard] fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExport = () => {
    const start = startDate || toDateString(new Date());
    const end = endDate || toDateString(new Date());
    const params = new URLSearchParams({
      start: new Date(start).toISOString(),
      end: new Date(end + 'T23:59:59').toISOString(),
    });
    window.open(`/api/admin/analytics/export?${params}`, '_blank');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
        <Button variant="outline" className="mt-4" onClick={fetchData}>
          <RefreshCw className="mr-2 h-4 w-4" />
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top controls */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <FunnelDatePicker
          startDate={startDate || ''}
          endDate={endDate || ''}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="mr-2 h-3 w-3" />
            새로고침
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-3 w-3" />
            CSV 내보내기
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      {funnelData && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">총 방문자</p>
            <p className="text-2xl font-bold">
              {funnelData.total_visitors.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">총 고객 전환</p>
            <p className="text-2xl font-bold">
              {funnelData.total_clients.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">전체 전환율</p>
            <p className="text-2xl font-bold text-blue-600">
              {funnelData.overall_conversion_rate}%
            </p>
          </div>
        </div>
      )}

      {/* Funnel chart */}
      {funnelData && <FunnelChart stages={funnelData.stages} />}

      {/* Attribution + Recent events */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AttributionTable data={attribution} />
        <RecentConversions events={recentEvents} />
      </div>
    </div>
  );
}
