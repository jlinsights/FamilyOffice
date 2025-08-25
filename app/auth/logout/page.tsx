'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getKakaoAuthService } from '@/lib/auth/kakao-auth';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Loader2, LogOut, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function LogoutContent() {
  const router = useRouter();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('로그아웃 처리 중...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // 1. Supabase 로그아웃
        const supabase = createClient();
        await supabase.auth.signOut();

        // 2. 카카오 로그아웃 (카카오싱크 사용 시)
        const kakaoAuth = getKakaoAuthService();
        await kakaoAuth.signOutFromKakao();

        // 3. 로컬 스토리지 정리
        if (typeof window !== 'undefined') {
          localStorage.removeItem('kakao_access_token');
          localStorage.removeItem('kakao_refresh_token');
          sessionStorage.clear();
        }

        setStatus('success');
        setMessage('로그아웃이 완료되었습니다.');

        // 3초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 3000);

      } catch (error) {
        console.error('로그아웃 처리 오류:', error);
        setStatus('error');
        setMessage('로그아웃 처리 중 오류가 발생했습니다.');
        setError(error instanceof Error ? error.message : '알 수 없는 오류');
      }
    };

    handleLogout();
  }, [router]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <LogOut className="h-8 w-8 text-yellow-500" />;
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
          <div className="flex justify-center">
            {getStatusIcon()}
          </div>
          <CardTitle className={`text-2xl font-bold ${getStatusColor()}`}>
            {status === 'loading' && '로그아웃 처리 중'}
            {status === 'success' && '로그아웃 완료'}
            {status === 'error' && '로그아웃 실패'}
          </CardTitle>
          <CardDescription className="text-base">
            {message}
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
                잠시만 기다려주세요...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  곧 로그인 페이지로 이동합니다...
                </p>
              </div>
              <Button 
                onClick={() => router.push('/auth/sign-in')}
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
                  로그인 페이지로 이동
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
                  <span className="font-medium">URL:</span> {typeof window !== 'undefined' ? window.location.href : 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Referrer:</span> {typeof window !== 'undefined' ? (document.referrer || '직접 접근') : 'N/A'}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function LogoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-600">
              로그아웃 준비 중
            </CardTitle>
            <CardDescription className="text-base">
              로그아웃 페이지를 준비하고 있습니다...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    }>
      <LogoutContent />
    </Suspense>
  );
}
