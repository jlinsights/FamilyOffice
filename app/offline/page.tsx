'use client';

import { BookOpen, Home, RefreshCw, WifiOff } from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function OfflinePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Pulsing background circles */}
              <div className="absolute inset-0 animate-ping">
                <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-800 opacity-75"></div>
              </div>

              {/* Main icon */}
              <div className="relative w-32 h-32 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xl">
                <WifiOff className="w-16 h-16 text-slate-400 dark:text-slate-500" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            오프라인 모드
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            인터넷 연결이 필요합니다.
            <br className="hidden sm:block" />
            연결을 확인하고 다시 시도해주세요.
          </p>

          {/* Status Card */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                연결 상태
              </span>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full">
                오프라인
              </span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-500 text-left">
              현재 인터넷에 연결되어 있지 않습니다. Wi-Fi 또는 모바일 데이터
              연결을 확인해주세요.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                홈으로
              </Link>
            </Button>
          </div>

          {/* Cached Content Info */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-100 dark:border-blue-900/50">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  일부 콘텐츠는 오프라인에서도 이용 가능합니다
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  이전에 방문한 페이지는 캐시되어 있어 오프라인에서도 볼 수
                  있습니다. 브라우저의 뒤로가기 버튼을 눌러 확인해보세요.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              연결 문제 해결 팁
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  1.
                </span>
                Wi-Fi 또는 모바일 데이터가 켜져 있는지 확인
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  2.
                </span>
                비행기 모드가 꺼져 있는지 확인
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  3.
                </span>
                다른 웹사이트가 정상 작동하는지 테스트
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  4.
                </span>
                라우터 재부팅 시도 (Wi-Fi 사용 시)
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
