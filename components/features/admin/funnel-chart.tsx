'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type { FunnelStageMetric } from '@/lib/conversion/types';

const STAGE_LABELS: Record<string, string> = {
  visit: '방문',
  engaged: '관심',
  lead: '리드',
  consultation_booked: '상담 예약',
  consultation_done: '상담 완료',
  client: '고객 전환',
};

const STAGE_COLORS = [
  'bg-blue-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-orange-500',
  'bg-rose-500',
];

export function FunnelChart({ stages }: { stages: FunnelStageMetric[] }) {
  const maxCount = stages[0]?.count || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>전환 퍼널</CardTitle>
        <CardDescription>방문자 → 고객 전환 단계별 현황</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, i) => {
            const widthPct = Math.max((stage.count / maxCount) * 100, 8);
            return (
              <div key={stage.stage} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {STAGE_LABELS[stage.stage] || stage.stage}
                  </span>
                  <span className="text-muted-foreground">
                    {stage.count.toLocaleString()}명
                    {i > 0 && (
                      <span className="ml-2 text-xs">
                        ({stage.conversion_rate}%)
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-8 w-full rounded bg-muted/30 overflow-hidden">
                  <div
                    className={`h-full rounded ${STAGE_COLORS[i] || 'bg-gray-400'} transition-all duration-500`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
