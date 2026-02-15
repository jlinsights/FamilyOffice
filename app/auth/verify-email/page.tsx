'use client';

import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

function VerifyEmailContent() {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const supabase = createClient();

  useEffect(() => {
    document.title = '이메일 인증 | FamilyOffice S';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        '이메일 인증을 완료하여 FamilyOffice S 서비스를 시작하세요.'
      );
    }
  }, []);

  const handleResendEmail = async () => {
    if (!email) {
      toast({
        title: '오류',
        description: '이메일 주소를 찾을 수 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    setIsResending(true);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        toast({
          title: '재전송 실패',
          description:
            '이메일 재전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: '이메일 재전송 완료',
        description: '인증 이메일을 다시 전송했습니다. 이메일을 확인해주세요.',
      });
    } catch (error) {
      console.error('이메일 재전송 오류:', error);
      toast({
        title: '오류',
        description: '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">이메일 인증</CardTitle>
              <CardDescription className="text-base">
                회원가입을 완료하기 위해 이메일 인증이 필요합니다
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    인증 이메일을 전송했습니다!
                  </p>
                  {email && (
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      {email}
                    </p>
                  )}
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>이메일을 확인하고 인증 링크를 클릭하세요.</p>
                  <p>인증 완료 후 자동으로 로그인됩니다.</p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleResendEmail}
                    disabled={isResending}
                    variant="outline"
                    className="w-full"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        재전송 중...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        인증 이메일 다시 받기
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => router.push('/auth/sign-in')}
                    variant="ghost"
                    className="w-full"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    로그인 페이지로 돌아가기
                  </Button>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-muted-foreground">
                  이메일이 오지 않나요? 스팸 폴더를 확인해주세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-24">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          </div>
          <Footer />
        </>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
