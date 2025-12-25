/**
 * Maintenance Page
 * Shown when critical environment variables are missing or invalid
 */

'use client';

import { AlertTriangle, RefreshCw, Settings } from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Maintenance Page
 * Shown when critical environment variables are missing or invalid
 */

/**
 * Maintenance Page
 * Shown when critical environment variables are missing or invalid
 */

/**
 * Maintenance Page
 * Shown when critical environment variables are missing or invalid
 */

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 text-orange-500">
            <Settings className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl">시스템 점검 중</CardTitle>
          <CardDescription className="text-lg">
            서비스 품질 향상을 위해 시스템 점검을 진행하고 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-orange-700 dark:text-orange-300 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">임시 서비스 중단</span>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                환경 변수 설정을 업데이트하고 있습니다.
                <br />
                불편을 드려 죄송합니다.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground">
                예상 복구 시간: <strong>5-10분</strong>
              </p>

              <div className="text-sm text-muted-foreground">
                <p>점검 내용:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>시스템 환경 변수 업데이트</li>
                  <li>보안 설정 강화</li>
                  <li>성능 최적화</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              새로고침
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/api/health/env">시스템 상태 확인</Link>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              문의사항이 있으시면{' '}
              <a
                href="mailto:support@familyoffices.vip"
                className="text-primary hover:underline"
              >
                support@familyoffices.vip
              </a>
              로 연락해주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
