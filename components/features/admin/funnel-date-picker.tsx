'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FunnelDatePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function FunnelDatePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: FunnelDatePickerProps) {
  return (
    <div className="flex items-end gap-3">
      <div className="space-y-1">
        <Label htmlFor="funnel-start" className="text-xs text-muted-foreground">
          시작일
        </Label>
        <Input
          id="funnel-start"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="h-8 w-36 text-sm"
        />
      </div>
      <span className="pb-1 text-muted-foreground">~</span>
      <div className="space-y-1">
        <Label htmlFor="funnel-end" className="text-xs text-muted-foreground">
          종료일
        </Label>
        <Input
          id="funnel-end"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="h-8 w-36 text-sm"
        />
      </div>
    </div>
  );
}
