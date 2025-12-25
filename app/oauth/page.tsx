'use client';

import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

import { useEffect, useState, Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getKakaoAuthService } from '@/lib/auth/kakao-auth';

function OAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState<string>('인증 처리 중...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // URL 파라미터에서 인증 코드 추출
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage('인증에 실패했습니다.');
          setError(errorDescription || error);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('인증 코드를 받지 못했습니다.');
          setError('인증 코드가 URL에 포함되지 않았습니다.');
          return;
        }

        // 카카오 인증 서비스로 인증 코드 처리
        const kakaoAuth = getKakaoAuthService();
        const result = await kakaoAuth.handleOAuthCallback(code);

        if (result.success) {
          setStatus('success');
          setMessage(
            result.isNewUser
              ? '회원가입이 완료되었습니다!'
              : '로그인이 완료되었습니다!'
          );

          // 3초 후 대시보드로 리다이렉트
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('인증 처리에 실패했습니다.');
          setError(result.error || '알 수 없는 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('OAuth 처리 오류:', error);
        setStatus('error');
        setMessage('인증 처리 중 오류가 발생했습니다.');
        setError(error instanceof Error ? error.message : '알 수 없는 오류');
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">{getStatusIcon()}</div>
          <CardTitle className={`text-2xl font-bold ${getStatusColor()}`}>
            {status === 'loading' && '인증 처리 중'}
            {status === 'success' && '인증 완료'}
            {status === 'error' && '인증 실패'}
          </CardTitle>
          <CardDescription className="text-base">{message}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {status === 'loading' && (
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-sm text-muted-foreground">
                잠시만 기다려주세요...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  곧 대시보드로 이동합니다...
                </p>
              </div>
              <Button
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                바로 이동하기
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/auth/sign-in')}
                  variant="outline"
                  className="w-full"
                >
                  로그인 페이지로 돌아가기
                </Button>

                <Button
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  다시 시도하기
                </Button>
              </div>
            </div>
          )}

          {/* 디버그 정보 (개발 모드에서만 표시) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium mb-2">🔍 디버그 정보</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-medium">Status:</span> {status}
                </div>
                <div>
                  <span className="font-medium">Code:</span>{' '}
                  {searchParams.get('code') ? '있음' : '없음'}
                </div>
                <div>
                  <span className="font-medium">Error:</span>{' '}
                  {searchParams.get('error') || '없음'}
                </div>
                <div>
                  <span className="font-medium">State:</span>{' '}
                  {searchParams.get('state') || '없음'}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function OAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-600">
                페이지 로딩 중
              </CardTitle>
              <CardDescription className="text-base">
                인증 페이지를 준비하고 있습니다...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <OAuthContent />
    </Suspense>
  );
}
