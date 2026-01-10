'use client';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';



export function KakaoFloatingButton() {
  // Always visible to avoid race conditions or state issues
  const isVisible = true;

  return (
    <Link
      id="kakao-floating-btn"
      href="https://open.kakao.com/me/familyoffice"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed z-[2147483647] transition-all duration-300 transform hover:scale-110",
        // Position considering typical ChannelTalk position (bottom: 20px, right: 20px, height: 60px)
        // We place this above it. aprox bottom-24 (96px). 
        // ScrollToTop is at bottom-[160px], so this sits below it.
        "bottom-[90px] right-[24px] md:bottom-[90px] md:right-[24px]", 
        "translate-y-0 opacity-100"
      )}
      style={{ zIndex: 2147483647 }} // Force inline max z-index
      aria-label="카카오톡 상담하기"
    >
      <div className="relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full shadow-lg hover:shadow-xl bg-[#FAE100]">
        <Image
          src="/images/kakao-logo.png"
          alt="Kakao Talk"
          fill
          className="object-cover p-0"
          priority
        />
        
        {/* Tooltip-like label on hover */}
        <span className="absolute right-full mr-3 bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          카카오톡 상담
        </span>
      </div>
    </Link>
  );
}
