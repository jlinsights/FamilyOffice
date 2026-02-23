'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import type { FunnelStage } from '@/lib/conversion/types';

const STAGE_OPTIONS: { value: FunnelStage; label: string }[] = [
  { value: 'consultation_done', label: '상담 완료' },
  { value: 'client', label: '고객 전환' },
];

interface StageAdvanceDialogProps {
  leadId: string;
  leadEmail?: string;
  onSuccess?: () => void;
}

export function StageAdvanceDialog({
  leadId,
  leadEmail,
  onSuccess,
}: StageAdvanceDialogProps) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<FunnelStage | ''>('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!stage) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/stage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage,
          ...(notes.trim() ? { notes: notes.trim() } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '단계 변경에 실패했습니다.');
      }

      setOpen(false);
      setStage('');
      setNotes('');
      onSuccess?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          단계 승급
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>퍼널 단계 승급</DialogTitle>
          <DialogDescription>
            {leadEmail
              ? `${leadEmail}의 전환 단계를 수동으로 변경합니다.`
              : '리드의 전환 단계를 수동으로 변경합니다.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="stage-select">변경할 단계</Label>
            <Select
              value={stage}
              onValueChange={(v) => setStage(v as FunnelStage)}
            >
              <SelectTrigger id="stage-select">
                <SelectValue placeholder="단계를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {STAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stage-notes">메모 (선택)</Label>
            <Textarea
              id="stage-notes"
              placeholder="예: 계약 완료 - 가업승계 종합 패키지"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!stage || submitting}
          >
            {submitting ? '처리 중...' : '단계 변경'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
