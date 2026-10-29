'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { PackageMatchCard } from '@/components/sections/home/home-mockups';

interface Pillar {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  detailHref: string;
  ctaText: string;
  packages: string[];
  highlight: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'serious-accident',
    eyebrow: '01 · 중대재해 대응',
    title: '중대재해 대응 솔루션',
    summary: '사고 전 예방/교육/점검 + 사고 후 비용/법률 대응',
    points: [
      'D&O/임원배상, 변호사비/벌금, 사고대응 비용 담보',
      '업종별(제조/건설/물류/IT시설) 안전 가이드 + 교육·점검 연계',
      'Essential / Advanced / Premium 패키지',
    ],
    detailHref: '/serious-accident-law',
    ctaText: '30분 리스크 스크리닝',
    packages: ['Essential', 'Advanced', 'Premium'],
    highlight: 'Advanced',
  },
  {
    id: 'succession',
    eyebrow: '02 · 승계·증여',
    title: '승계·증여 설계',
    summary: '세후 유동성 확보 + 비상장주식 가치/거버넌스 설계',
    points: [
      '법인명의 종신/정기 조합, 콜옵션·주식매수자금·구주매입 시나리오',
      '배당/급여/퇴직금 병행, 단계별 타이밍·증빙 문서화',
      'Cash Shield / Value Control / Succession Ready 패키지',
    ],
    detailHref: '/inheritance-gift-tax',
    ctaText: '유동성·세무 상담',
    packages: ['Cash Shield', 'Value Control', 'Succession Ready'],
    highlight: 'Value Control',
  },
];

function PillarPanel({ pillar }: { pillar: Pillar }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-hp-panel/50">
      <div className="flex min-h-[220px] items-center justify-center bg-[linear-gradient(160deg,rgba(212,175,55,0.10),rgba(17,36,66,0)_60%)] px-6 py-10">
        <PackageMatchCard
          title={`${pillar.title} 패키지`}
          packages={pillar.packages}
          highlight={pillar.highlight}
        />
      </div>
      <div className="border-t border-white/10 p-6 sm:p-8">
        <p className="mb-3 text-xs font-medium tracking-wide text-hp-gold font-korean">
          {pillar.eyebrow}
        </p>
        <h3 className="mb-2 font-editorial break-keep text-2xl text-[#FCF7EE] sm:text-3xl">
          {pillar.title}
        </h3>
        <p className="mb-6 text-white/70 font-korean">{pillar.summary}</p>
        <ul className="mb-8 space-y-3">
          {pillar.points.map(point => (
            <li
              key={point}
              className="flex gap-3 text-[15px] leading-relaxed text-white/85 font-korean"
            >
              <span
                className="mt-[0.6em] h-px w-4 shrink-0 bg-hp-gold"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3">
          <CalComPopup
            buttonText={pillar.ctaText}
            variant="legacyCtaLight"
            size="sm"
            className="h-10 rounded-md bg-hp-gold px-5 text-sm text-hp-navy hover:bg-[#E5C158]"
          />
          <Link
            href={pillar.detailHref}
            className="group inline-flex h-10 items-center rounded-md border border-white/25 px-5 text-sm text-white transition-colors hover:border-white hover:bg-white/5"
          >
            상세 보기
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function DualPillarSection() {
  return (
    <section className="bg-hp-ink py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-14">
        {/* Sticky story heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 text-xs font-medium tracking-wide text-hp-gold">
            Core Strategy · 한국 중견·패밀리기업 전용 리스크·세무 통합
          </p>
          <h2 className="mb-6 font-editorial font-normal leading-[1.15] tracking-[-0.01em] text-[#FCF7EE] text-[clamp(2rem,4vw,3.25rem)]">
            이중 방어선으로 완성하는{' '}
            <span className="text-hp-gold">기업 지속성</span>
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-white/75 font-korean">
            중대재해처벌법 통합 대응 × 승계세무 최적화
          </p>
          <p className="mb-10 max-w-md border-l border-hp-gold/60 pl-4 text-sm text-white/60">
            Compliance + Insurance + Tax Engineering = 차세대 경영 기반
          </p>
          <Link
            href="/solutions"
            className="group inline-flex items-center text-sm font-medium text-white underline decoration-hp-gold/60 underline-offset-8 transition-colors hover:decoration-hp-gold"
          >
            업종·규모별 맞춤 패키지 보기
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Pillars */}
        <FadeIn className="space-y-8" stagger={0.15}>
          {PILLARS.map(pillar => (
            <PillarPanel key={pillar.id} pillar={pillar} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
