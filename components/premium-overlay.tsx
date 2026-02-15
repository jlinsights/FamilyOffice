'use client';

import { Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  SafeSignInButton,
  SafeSignUpButton,
} from '@/components/auth/safe-clerk-components';

export function PremiumOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="max-w-md w-full mx-4">
        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border-2 border-blue-200 dark:border-blue-800 shadow-2xl p-8 animate-in zoom-in-95 duration-500">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/50 rounded-3xl pointer-events-none"></div>

          {/* Content */}
          <div className="relative">
            {/* Lock Icon with pulse */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 animate-ping">
                  <div className="w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-800 opacity-75"></div>
                </div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-3">
              프리미엄 콘텐츠
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-center text-slate-600 dark:text-slate-400 mb-6">
              성공한 기업가를 위한
              <br />
              전용 콘텐츠입니다
            </p>

            {/* Benefits */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-6">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                회원 가입 후 다음 혜택을 받으세요:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    프리미엄 프로그램 전체 접근
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    맞춤 솔루션 상세 정보
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    전문가 1:1 상담 예약
                  </span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <SafeSignUpButton mode="modal">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  회원가입하기
                </Button>
              </SafeSignUpButton>
              <SafeSignInButton mode="modal">
                <Button variant="outline" className="w-full" size="lg">
                  로그인
                </Button>
              </SafeSignInButton>
            </div>

            {/* Additional info */}
            <p className="text-xs text-center text-slate-500 dark:text-slate-500 mt-4">
              이미 계정이 있으신가요?{' '}
              <SafeSignInButton mode="modal">
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline">
                  로그인
                </button>
              </SafeSignInButton>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
