'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { BENTO_SERVICES, type BentoService } from '@/constants/bento-services';
import { cn } from '@/lib/utils';

const FEATURED = BENTO_SERVICES.filter(s => s.size === 'large');
const REGULAR = BENTO_SERVICES.filter(s => s.size === 'regular');
const CTAS = BENTO_SERVICES.filter(s => s.size === 'cta');

function FeaturedCard({
  service,
  index,
}: {
  service: BentoService;
  index: number;
}) {
  const Icon = service.icon;
  return (
    <Link
      href={service.href}
      className="group flex h-full flex-col justify-between rounded-2xl border border-hp-text/10 bg-white p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-hp-gold/70 lg:p-10"
    >
      <div>
        <div className="mb-10 flex items-start justify-between">
          <span className="font-editorial text-5xl text-hp-gold-deep tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <Icon className="h-6 w-6 text-hp-text/40" aria-hidden="true" />
        </div>
        <h3 className="mb-2 font-editorial break-keep text-3xl text-hp-text">
          {service.title}
        </h3>
        {service.tagline ? (
          <p className="mb-4 text-sm font-medium text-hp-gold-ink font-korean">
            {service.tagline}
          </p>
        ) : null}
        <p className="mb-6 leading-relaxed text-hp-mute font-korean">
          {service.description}
        </p>
        <ul className="space-y-2">
          {service.features.slice(0, 3).map(feature => (
            <li
              key={feature}
              className="flex gap-3 text-sm text-hp-text/80 font-korean"
            >
              <span
                className="mt-[0.65em] h-px w-3 shrink-0 bg-hp-gold"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <span className="mt-10 inline-flex items-center text-sm font-medium text-hp-text">
        자세히 보기
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function RegularCard({ service }: { service: BentoService }) {
  const Icon = service.icon;
  return (
    <Link
      href={service.href}
      className="group flex h-full flex-col rounded-2xl border border-hp-text/10 bg-hp-cream p-6 transition-colors duration-300 hover:border-hp-gold/70 hover:bg-white"
    >
      <div className="mb-8 flex items-center justify-between">
        <Icon className="h-5 w-5 text-hp-gold-deep" aria-hidden="true" />
        <ArrowUpRight className="h-4 w-4 text-hp-text/30 transition-colors group-hover:text-hp-text" />
      </div>
      <h3 className="mb-2 font-editorial break-keep text-xl text-hp-text">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-hp-mute font-korean">
        {service.description}
      </p>
    </Link>
  );
}

function CtaCard({
  service,
  primary,
}: {
  service: BentoService;
  primary: boolean;
}) {
  return (
    <Link
      href={service.href}
      className={cn(
        'group flex items-center justify-between gap-6 rounded-2xl p-8 transition-colors duration-300',
        primary
          ? 'bg-hp-navy text-white hover:bg-hp-panel'
          : 'border border-hp-text/15 bg-white text-hp-text hover:border-hp-gold/70'
      )}
    >
      <div>
        {service.badge ? (
          <p
            className={cn(
              'mb-2 text-xs font-medium tracking-wide',
              primary ? 'text-hp-gold' : 'text-hp-gold-ink'
            )}
          >
            {service.badge} 전용
          </p>
        ) : null}
        <h3 className="mb-1 font-editorial break-keep text-2xl">
          {service.title}
        </h3>
        <p
          className={cn(
            'text-sm font-korean',
            primary ? 'text-white/70' : 'text-hp-mute'
          )}
        >
          {service.description}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-hp-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        <FadeIn
          direction="up"
          className="mb-16 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end"
        >
          <div>
            <p className="mb-5 text-xs font-medium tracking-wide text-hp-gold-ink">
              Family Office Excellence
            </p>
            <h2 className="font-editorial font-normal leading-[1.15] tracking-[-0.01em] text-hp-text text-[clamp(2rem,4vw,3.25rem)]">
              차별화된 패밀리오피스 <br />
              전용 솔루션
            </h2>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-hp-mute font-korean lg:justify-self-end">
            법인 자산 관리 및 가업승계 전문 통합 자산관리 포트폴리오로 세대를
            잇는 자산관리를 실현합니다
          </p>
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-4">
          {FEATURED.map((service, index) => (
            <div key={service.id} className="lg:col-span-2 lg:row-span-2">
              <FeaturedCard service={service} index={index} />
            </div>
          ))}
          {REGULAR.map(service => (
            <div key={service.id}>
              <RegularCard service={service} />
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {CTAS.map(service => (
            <CtaCard
              key={service.id}
              service={service}
              primary={service.id === 'family-office-center'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
