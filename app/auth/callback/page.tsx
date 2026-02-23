'use client';

export const dynamic = 'force-dynamic';

import { AlertCircle, CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSupabaseKakaoAuthService } from '@/lib/auth/supabase-kakao-auth';
import { cn } from '@/lib/utils';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState<string>('인증 처리 중...');
  const [error, setError] = useState<string>('');
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    isNewUser?: boolean;
  } | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const authService = getSupabaseKakaoAuthService();

        // URL 파라미터 확인
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        const accessToken = searchParams.get('access_token');
        // refreshToken은 디버그 섹션에서 사용됨

        if (error) {
          setStatus('error');
          setMessage('인증에 실패했습니다.');
          setError(errorDescription || error);
          return;
        }

        // Supabase가 자동으로 세션을 처리했는지 확인
        const session = await authService.getSession();

        if (session?.user) {
          // 사용자 레코드 동기화
          const userRecord = await authService.syncKakaoUserToDatabase(
            session.user
          );
          const isNewUser =
            !userRecord ||
            new Date(userRecord.created_at).getTime() > Date.now() - 5000; // 5초 이내 생성

          const displayInfo = authService.getDisplayUserInfo(
            session.user,
            userRecord
          );

          setUserInfo({
            name: displayInfo?.displayName,
            isNewUser,
          });

          setStatus('success');
          setMessage(
            isNewUser
              ? '회원가입이 완료되었습니다!'
              : '로그인이 완료되었습니다!'
          );

          // 3초 후 리다이렉트
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          // 세션이 없는 경우 - 수동으로 토큰 처리 시도
          if (accessToken) {
            console.log('수동 토큰 처리 필요 - 향후 구현');
          }

          setStatus('error');
          setMessage('인증 세션을 생성하지 못했습니다.');
          setError(
            '인증이 완료되었지만 세션 생성에 실패했습니다. 다시 시도해주세요.'
          );
        }
      } catch (error) {
        console.error('Auth callback 처리 오류:', error);
        setStatus('error');
        setMessage('인증 처리 중 오류가 발생했습니다.');
        setError(error instanceof Error ? error.message : '알 수 없는 오류');
      }
    };

    handleAuthCallback();
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
          <CardDescription className="text-base">
            {message}
            {userInfo?.name && (
              <div className="mt-2 text-lg font-semibold text-foreground">
                {userInfo.name}님{userInfo.isNewUser ? ', 환영합니다!' : ''}
              </div>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {status === 'loading' && (
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Supabase와 카카오 계정을 연동하는 중입니다...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  곧 대시보드로 이동합니다...
                </p>
                {userInfo?.isNewUser && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-green-600 dark:text-green-400">
                      ✅ 카카오 계정 연동 완료
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      ✅ 프로필 정보 동기화 완료
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      ✅ 데이터베이스 레코드 생성 완료
                    </p>
                  </div>
                )}
              </div>
              {/* <Button
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                대시보드로 바로 이동
              </Button> */}
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
                <button
                  onClick={() => router.push('/auth/sign-in')}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full'
                  )}
                >
                  로그인 페이지로 돌아가기
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'w-full'
                  )}
                >
                  다시 시도하기
                </button>
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
                  <span className="font-medium">Access Token:</span>{' '}
                  {searchParams.get('access_token') ? '있음' : '없음'}
                </div>
                <div>
                  <span className="font-medium">Refresh Token:</span>{' '}
                  {searchParams.get('refresh_token') ? '있음' : '없음'}
                </div>
                <div>
                  <span className="font-medium">Error:</span>{' '}
                  {searchParams.get('error') || '없음'}
                </div>
                <div>
                  <span className="font-medium">Token Type:</span>{' '}
                  {searchParams.get('token_type') || '없음'}
                </div>
                <div>
                  <span className="font-medium">Expires In:</span>{' '}
                  {searchParams.get('expires_in') || '없음'}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthCallbackPage() {
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
                Supabase 인증 콜백을 처리하고 있습니다...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
