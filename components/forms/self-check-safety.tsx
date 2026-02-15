'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalComPopup } from '@/components/calendar/cal-com-popup';

type ChecklistItem = {
  id: string;
  label: string;
  weight?: number; // 기본 1점, 고위험 항목 가중치 적용
};

const managementItems: ChecklistItem[] = [
  { id: 'mgr-responsible', label: '안전보건관리책임자 지정 부재' },
  { id: 'rules-outdated', label: '안전보건관리규정 미비·미갱신' },
  { id: 'edu-missing', label: '정기 안전보건교육 미이행' },
  { id: 'env-measure-missing', label: '작업환경측정 미실시' },
  { id: 'records-poor', label: '점검·사고 기록 관리 부실' },
];

const riskItems: ChecklistItem[] = [
  { id: 'aged-machines', label: '기계·전기 설비 노후화', weight: 2 },
  { id: 'chemicals', label: '화학물질 취급', weight: 2 },
  { id: 'highplace', label: '고소작업/중량물 빈번', weight: 2 },
  { id: 'accident-recent', label: '최근 1년 내 안전사고 발생', weight: 2 },
  { id: 'no-insurance', label: '임원배상책임(D&O) 등 보험 부재', weight: 1.5 },
];

function scoreToGrade(score: number) {
  if (score >= 12)
    return { grade: 'High', color: 'text-red-600', recommendation: 'Premium' };
  if (score >= 7)
    return {
      grade: 'Medium',
      color: 'text-orange-600',
      recommendation: 'Advanced',
    };
  return { grade: 'Low', color: 'text-green-600', recommendation: 'Essential' };
}

export function SelfCheckSafety() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const score = useMemo(() => {
    const sum = [...managementItems, ...riskItems].reduce((acc, item) => {
      const w = item.weight ?? 1;
      return acc + (answers[item.id] ? w : 0);
    }, 0);
    return Math.round(sum * 10) / 10;
  }, [answers]);

  const { grade, color, recommendation } = scoreToGrade(score);

  return (
    <Card className="border-blue-200 dark:border-blue-800/50 bg-card text-card-foreground">
      <CardHeader>
        <Badge variant="outline" className="mb-2">
          Risk Self-Check
        </Badge>
        <CardTitle className="text-xl text-foreground">
          중대재해 위험도 자가진단
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-foreground">
              📋 안전관리 현황
            </h4>
            <div className="space-y-2">
              {managementItems.map(item => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mt-1 border-border text-primary focus:ring-primary"
                    checked={!!answers[item.id]}
                    onChange={e =>
                      setAnswers(prev => ({
                        ...prev,
                        [item.id]: e.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm text-foreground/90">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">⚠️ 위험 요소</h4>
            <div className="space-y-2">
              {riskItems.map(item => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mt-1 border-border text-primary focus:ring-primary"
                    checked={!!answers[item.id]}
                    onChange={e =>
                      setAnswers(prev => ({
                        ...prev,
                        [item.id]: e.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm text-foreground/90">
                    {item.label}
                    {item.weight ? ` (가중치 x${item.weight})` : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">위험도 점수</div>
            <div className={`font-bold ${color}`}>{grade}</div>
          </div>
          <Progress value={Math.min(100, score * 6)} className="h-2" />
          <div className="mt-2 text-sm">
            현재 점수:{' '}
            <span className="font-semibold text-foreground">{score}</span> /
            추천 패키지:{' '}
            <span className="font-semibold text-foreground">
              {recommendation}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <CalComPopup
            buttonText={`추천 패키지 상담 (${recommendation})`}
            size="lg"
          />
          <Link
            href="/serious-accident-law"
            className={buttonVariants({ variant: 'outline' })}
          >
            상세 대응 가이드 보기
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
