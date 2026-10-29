import { Check, Clock, FileText, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Product-style mockup cards for the homepage (Amperos-inspired).
 * Illustrative only: every card carries an "예시" label and no client data.
 */

type StepStatus = 'done' | 'active' | 'todo';

interface MockStep {
  label: string;
  status: StepStatus;
}

interface MockCardProps {
  className?: string;
}

const SAMPLE_TAG = (
  <span className="shrink-0 whitespace-nowrap rounded-full border border-hp-text/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-hp-mute">
    예시
  </span>
);

function StepRow({ step }: { step: MockStep }) {
  return (
    <li className="flex items-center gap-3 py-2.5">
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
          step.status === 'done' && 'border-hp-gold bg-hp-gold text-hp-navy',
          step.status === 'active' && 'border-hp-gold text-hp-gold-deep',
          step.status === 'todo' && 'border-hp-text/20 text-hp-mute'
        )}
        aria-hidden="true"
      >
        {step.status === 'done' ? <Check className="h-3 w-3" /> : null}
        {step.status === 'active' ? <Clock className="h-3 w-3" /> : null}
      </span>
      <span
        className={cn(
          'text-sm font-korean',
          step.status === 'todo' ? 'text-hp-mute' : 'text-hp-text'
        )}
      >
        {step.label}
      </span>
    </li>
  );
}

const SUCCESSION_STEPS: MockStep[] = [
  { label: '비상장주식 가치평가', status: 'done' },
  { label: '증여·양도 시점 검토', status: 'done' },
  { label: '법인명의 보장으로 세후 유동성 확보', status: 'active' },
  { label: '거버넌스·증빙 문서화', status: 'todo' },
];

export function SuccessionScenarioCard({ className }: MockCardProps) {
  return (
    <div
      className={cn(
        'w-full max-w-sm rounded-xl bg-hp-cream p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]',
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-hp-text">
          <FileText className="h-4 w-4 text-hp-gold-deep" aria-hidden="true" />
          <span className="font-editorial text-base">승계 시나리오</span>
        </div>
        {SAMPLE_TAG}
      </div>
      <ul className="divide-y divide-hp-text/10">
        {SUCCESSION_STEPS.map(step => (
          <StepRow key={step.label} step={step} />
        ))}
      </ul>
    </div>
  );
}

interface RiskRow {
  area: string;
  level: '높음' | '중간' | '낮음';
}

const RISK_ROWS: RiskRow[] = [
  { area: '안전보건 관리체계', level: '중간' },
  { area: '임원 배상책임 담보', level: '높음' },
  { area: '사고대응 비용 준비', level: '낮음' },
];

const LEVEL_STYLE: Record<RiskRow['level'], string> = {
  높음: 'bg-[#F6E3DC] text-[#8A3B22]',
  중간: 'bg-[#F5ECD3] text-hp-gold-deep',
  낮음: 'bg-[#E4ECE4] text-[#2F5D3A]',
};

export function RiskScreeningCard({ className }: MockCardProps) {
  return (
    <div
      className={cn(
        'w-full max-w-sm rounded-xl bg-white p-5 shadow-[0_24px_60px_-20px_rgba(10,25,47,0.45)]',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-hp-text">
          <ShieldCheck
            className="h-4 w-4 text-hp-gold-deep"
            aria-hidden="true"
          />
          <span className="font-editorial text-base">리스크 스크리닝 결과</span>
        </div>
        {SAMPLE_TAG}
      </div>
      <dl className="space-y-2.5">
        {RISK_ROWS.map(row => (
          <div
            key={row.area}
            className="flex items-center justify-between rounded-lg bg-hp-cream px-3 py-2.5"
          >
            <dt className="text-sm text-hp-text font-korean">{row.area}</dt>
            <dd
              className={cn(
                'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                LEVEL_STYLE[row.level]
              )}
            >
              {row.level}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-hp-text/10 pt-3 text-xs text-hp-mute font-korean">
        권장 패키지 · Advanced
      </p>
    </div>
  );
}

interface PackageCardProps extends MockCardProps {
  title: string;
  packages: string[];
  highlight: string;
}

export function PackageMatchCard({
  title,
  packages,
  highlight,
  className,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        'w-full max-w-sm rounded-xl bg-white p-5 shadow-[0_24px_60px_-20px_rgba(10,25,47,0.35)]',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-editorial text-base text-hp-text">{title}</span>
        {SAMPLE_TAG}
      </div>
      <div className="flex flex-wrap gap-2">
        {packages.map(name => (
          <span
            key={name}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium',
              name === highlight
                ? 'border-hp-gold bg-hp-gold/15 text-hp-text'
                : 'border-hp-text/15 text-hp-mute'
            )}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
