'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CalComPopup } from '@/components/calendar/cal-com-popup';

export function HomeClosingCTA() {
  return (
    <section className="bg-hp-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        <h2 className="mb-10 max-w-3xl font-editorial font-normal leading-[1.15] tracking-[-0.01em] text-hp-text text-[clamp(2rem,4.5vw,3.5rem)]">
          세대를 잇는 자산관리, <br />
          백년영속의 설계를 시작하세요
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CalComPopup
            buttonText="상담 신청하기"
            variant="legacyNavy"
            size="lg"
            className="w-full rounded-md bg-hp-navy hover:bg-hp-panel sm:w-auto"
          />
          <Link
            href="/solutions"
            className="group inline-flex h-14 w-full items-center justify-center rounded-md border border-hp-text/20 px-8 text-base font-semibold text-hp-text transition-colors hover:border-hp-text sm:w-auto"
          >
            업종·규모별 맞춤 패키지 보기
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <p className="mt-16 border-t border-hp-text/10 pt-6 text-sm text-hp-mute font-korean">
          고액자산가를 위한 차별화된 패밀리오피스 서비스를 경험해보세요
        </p>
      </div>
    </section>
  );
}
