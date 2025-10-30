'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalComPopup } from '@/components/cal-com-popup';

type Item = { id: string; label: string; weight?: number };

const liquidityItems: Item[] = [
  { id: 'cash-low', label: '상속/증여세 대비 현금 유동성 부족', weight: 2 },
  { id: 'illiquid-heavy', label: '비유동자산(부동산/비상장주식) 비중이 높음', weight: 2 },
  { id: 'loan-high', label: '기업/개인 부채 비중이 높음' },
];

const governanceItems: Item[] = [
  { id: 'no-plan', label: '가업승계 로드맵/타임라인 부재', weight: 2 },
  { id: 'valuation-risk', label: '비상장주식 평가 리스크(급등/감액 근거 부족)', weight: 1.5 },
  { id: 'docs-weak', label: '의사결정 문서화/거버넌스 체계 미흡', weight: 1.5 },
  { id: 'related-party', label: '특수관계인 거래·증여 이슈 가능성' },
];

function scoreToPlan(score: number) {
  if (score >= 11) return { tier: 'Succession Ready', color: 'text-blue-700', note: '상속·증여 전면 설계 필요(타임라인·증빙 포함)' };
  if (score >= 7) return { tier: 'Value Control', color: 'text-emerald-700', note: '비상장가치·거버넌스 정비 및 유동성 보강' };
  return { tier: 'Cash Shield', color: 'text-amber-700', note: '세후 유동성 우선 확보(법인명의 활용)' };
}

export function SelfCheckSuccession() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const score = useMemo(() => {
    const sum = [...liquidityItems, ...governanceItems].reduce((acc, i) => acc + ((answers[i.id] ? (i.weight ?? 1) : 0)), 0);
    return Math.round(sum * 10) / 10;
  }, [answers]);

  const { tier, color, note } = scoreToPlan(score);

  return (
    <Card className="border-amber-200 dark:border-amber-800/50 bg-card text-card-foreground">
      <CardHeader>
        <Badge variant="outline" className="mb-2">Liquidity & Governance</Badge>
        <CardTitle className="text-xl text-foreground">승계·증여(법인명의) 자가진단</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-foreground">💧 유동성</h4>
            <div className="space-y-2">
              {liquidityItems.map((item) => (
                <label key={item.id} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 border-border text-primary focus:ring-primary"
                    checked={!!answers[item.id]}
                    onChange={(e) => setAnswers((p) => ({ ...p, [item.id]: e.target.checked }))}
                  />
                  <span className="text-sm text-foreground/90">{item.label}{item.weight ? ` (가중치 x${item.weight})` : ''}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">🏛 거버넌스/세무</h4>
            <div className="space-y-2">
              {governanceItems.map((item) => (
                <label key={item.id} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 border-border text-primary focus:ring-primary"
                    checked={!!answers[item.id]}
                    onChange={(e) => setAnswers((p) => ({ ...p, [item.id]: e.target.checked }))}
                  />
                  <span className="text-sm text-foreground/90">{item.label}{item.weight ? ` (가중치 x${item.weight})` : ''}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">리스크 스코어</div>
            <div className={`font-bold ${color}`}>{tier}</div>
          </div>
          <Progress value={Math.min(100, score * 6)} className="h-2" />
          <div className="mt-2 text-sm">
            현재 점수: <span className="font-semibold text-foreground">{score}</span> / 권장 플랜: <span className="font-semibold text-foreground">{tier}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{note}</div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <CalComPopup buttonText={`권장 플랜 상담 (${tier})`} size="lg" />
          <Button asChild variant="outline">
            <a href="/inheritance-gift-tax">세무/승계 가이드 보기</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


