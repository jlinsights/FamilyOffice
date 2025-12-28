'use client';

import { AlertCircle, CheckCircle, Loader2, XCircle } from 'lucide-react';

import { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';



import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';



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
        // const kakaoAuth = getKakaoAuthService();
        // const result = await kakaoAuth.handleOAuthCallback(code);
        const result = { success: false, isNewUser: false, error: 'OAuth disabled' };

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
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">{getStatusIcon()}</div>
          <CardTitle className={`text-2xl font-bold ${getStatusColor()}`}>
            {status === 'loading'
              ? '인증 처리 중'
              : status === 'success'
                ? '인증 성공'
                : '인증 실패'}
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-300">
            {message}
          </CardDescription>
        </CardHeader>
        {error && (
          <div className="px-6 pb-6">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          </div>
        )}
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
