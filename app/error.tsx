'use client';

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (Sentry 등에 전송)
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            오류가 발생했습니다
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            예상치 못한 오류가 발생했습니다. 다시 시도해주세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 개발 환경에서만 에러 상세 정보 표시 */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
              <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={reset}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              다시 시도
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="flex-1"
            >
              <Home className="mr-2 h-4 w-4" />
              홈으로 이동
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              문제가 지속되면 고객센터에 문의해주세요
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
