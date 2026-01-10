'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

const KakaoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.122.49.178.483.376.351.155-.103 2.466-1.675 3.464-2.353.541.08 1.1.123 1.67.123 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z" />
  </svg>
);

export function KakaoFloatingButton() {
  // Always visible to avoid race conditions or state issues
  const isVisible = true;

  return (
    <Link
      href="https://open.kakao.com/me/familyoffice"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed z-[2147483647] transition-all duration-300 transform hover:scale-110",
        // Position considering typical ChannelTalk position (bottom: 20px, right: 20px, height: 60px)
        // We place this above it. aprox bottom-24 (96px). 
        // ScrollToTop is at bottom-[150px], so this sits below it.
        "bottom-[90px] right-[24px] md:bottom-[90px] md:right-[24px]", 
        "translate-y-0 opacity-100"
      )}
      style={{ zIndex: 2147483647 }} // Force inline max z-index
      aria-label="카카오톡 상담하기"
    >
      <div className="relative flex items-center justify-center w-[50px] h-[50px] bg-[#FAE100] rounded-full shadow-lg hover:shadow-xl ring-1 ring-black/5">
        <KakaoIcon className="w-6 h-6 text-[#371D1E]" />
        
        {/* Tooltip-like label on hover */}
        <span className="absolute right-full mr-3 bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          카카오톡 상담
        </span>
      </div>
    </Link>
  );
}
