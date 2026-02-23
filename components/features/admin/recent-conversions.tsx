'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const EVENT_LABELS: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  consultation_form_submit: { label: '상담 신청', variant: 'default' },
  structure_check_submit: { label: '구조 점검', variant: 'secondary' },
  calcom_booking_created: { label: '예약 생성', variant: 'default' },
  consultation_completed: { label: '상담 완료', variant: 'outline' },
  client_converted: { label: '고객 전환', variant: 'destructive' },
};

interface ConversionEvent {
  id: string;
  event_type: string;
  email?: string;
  page_path?: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

export function RecentConversions({
  events,
}: {
  events: ConversionEvent[];
}) {
  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>최근 전환 이벤트</CardTitle>
          <CardDescription>실시간 전환 활동 피드</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            아직 전환 이벤트가 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 전환 이벤트</CardTitle>
        <CardDescription>실시간 전환 활동 피드</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event) => {
            const info = EVENT_LABELS[event.event_type] || {
              label: event.event_type,
              variant: 'outline' as const,
            };
            const time = new Date(event.created_at);
            const timeStr = time.toLocaleString('ko-KR', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={event.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={info.variant}>{info.label}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {event.email
                      ? event.email.replace(
                          /(.{2})(.*)(@.*)/,
                          '$1***$3'
                        )
                      : '익명'}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{timeStr}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
