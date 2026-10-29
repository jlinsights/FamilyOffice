'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/animation/FadeIn';

const STEPS = [
  { no: '01', label: '10문항 체크' },
  { no: '02', label: '점수화' },
  { no: '03', label: '권장 패키지 제안' },
] as const;

interface SelfCheckEntry {
  href: string;
  title: string;
  packages: string;
}

const ENTRIES: SelfCheckEntry[] = [
  {
    href: '/serious-accident-law#risk-assessment',
    title: '중대재해 위험도 자가진단',
    packages: 'Essential / Advanced / Premium 패키지 추천',
  },
  {
    href: '/inheritance-gift-tax#self-check',
    title: '승계·증여(법인명의) 자가진단',
    packages: 'Cash Shield / Value Control / Succession Ready 권장',
  },
];

export function SelfCheckCTASection() {
  return (
    <section className="bg-white px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[20px] bg-hp-navy lg:grid-cols-[1fr_1fr]">
        {/* Process */}
        <div className="flex flex-col justify-between gap-12 p-8 sm:p-12 lg:p-16">
          <div>
            <p className="mb-5 text-xs font-medium tracking-wide text-hp-gold">
              Risk &amp; Tax Self-Check
            </p>
            <h2 className="font-editorial font-normal leading-[1.15] text-[#FCF7EE] text-[clamp(2rem,4vw,3rem)]">
              자가진단으로 <br />
              맞춤 솔루션 받기
            </h2>
          </div>
          <div>
            <ol className="mb-8 border-t border-white/10">
              {STEPS.map(step => (
                <li
                  key={step.no}
                  className="flex items-baseline gap-6 border-b border-white/10 py-4"
                >
                  <span className="text-sm tabular-nums text-hp-gold">
                    {step.no}.
                  </span>
                  <span className="font-editorial text-xl text-white">
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-white/65 font-korean">
              복잡한 기업 상황을 3분 만에 진단해보세요
            </p>
          </div>
        </div>

        {/* Entry points */}
        <FadeIn
          className="flex flex-col justify-center gap-4 bg-hp-panel/60 p-8 sm:p-12 lg:p-16"
          stagger={0.12}
        >
          {ENTRIES.map(entry => (
            <Link
              key={entry.href}
              href={entry.href}
              className="group block rounded-xl bg-hp-cream p-6 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <p className="mb-6 text-xs text-hp-mute font-korean">
                {entry.packages}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <h3 className="font-editorial text-2xl text-hp-text break-keep">
                  {entry.title}
                </h3>
                <span className="inline-flex shrink-0 items-center text-sm font-medium text-hp-gold-deep">
                  바로 시작하기
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
