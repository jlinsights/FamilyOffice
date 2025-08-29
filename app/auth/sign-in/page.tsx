'use client';

import KakaoLoginButton from '@/components/auth/kakao-login-button';
import { SignInForm } from '@/components/auth/sign-in-form';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, TrendingUp, Users } from 'lucide-react';
import { Suspense, useEffect } from 'react';

export default function SignInPage() {
  // Set page metadata for SEO
  useEffect(() => {
    document.title = '로그인 | FamilyOffice S - 중소중견기업 전문 자산관리';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '중소중견기업 법인대표를 위한 전문적인 자산관리 서비스. 카카오로 간편하게 로그인하세요.');
    }
  }, []);
  const benefits = [
    {
      icon: Shield,
      title: '보안 강화',
      description: '기업급 보안으로 안전하게 관리'
    },
    {
      icon: Users,
      title: '전문가 직접 상담',
      description: '업종별 전문가와 1:1 상담'
    },
    {
      icon: TrendingUp,
      title: '맞춤형 포트폴리오',
      description: 'CEO님만을 위한 투자 전략'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 좌측: 브랜딩 섹션 */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                성공한 CEO 전용 서비스
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              중소중견기업
              <br />
              <span className="text-primary">전문 자산관리</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              중소중견기업 법인대표님을 위한 전문적인 자산관리와 가업승계 솔루션을 제공합니다.
            </p>
          </div>

          {/* 혜택 카드들 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">법인 고객</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500억+</div>
              <div className="text-sm text-muted-foreground">관리 자산</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">20년+</div>
              <div className="text-sm text-muted-foreground">전문 경험</div>
            </div>
          </div>
        </div>

        {/* 우측: 로그인 폼 */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-2xl bg-card/80 backdrop-blur-sm border border-border/50">
            <CardHeader className="space-y-4 text-center">
              <CardTitle className="text-2xl font-bold">환영합니다</CardTitle>
              <CardDescription className="text-base">
                성공한 CEO님들을 위한 전용 서비스에 로그인하세요
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 카카오 로그인 */}
              <div className="space-y-4">
                <Suspense fallback={<div>로딩 중...</div>}>
                  <KakaoLoginButton 
                    fullWidth
                    size="lg"
                    onSuccess={() => {
                      // 로그인 성공 시 대시보드로 리다이렉트
                      window.location.href = '/dashboard';
                    }}
                  >
                    카카오로 간편 로그인
                  </KakaoLoginButton>
                </Suspense>
                
                <p className="text-xs text-center text-muted-foreground">
                  카카오 계정으로 빠르고 안전하게 로그인하세요
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    또는
                  </span>
                </div>
              </div>

              {/* 기존 로그인 폼 (이메일/패스워드) */}
              <Suspense fallback={<div>로딩 중...</div>}>
                <SignInForm />
              </Suspense>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  아직 계정이 없으신가요?{' '}
                  <a 
                    href="/auth/sign-up" 
                    className="text-primary hover:underline font-medium"
                  >
                    회원가입
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">
                  로그인하시면{' '}
                  <a href="/terms" className="hover:underline">이용약관</a> 및{' '}
                  <a href="/privacy" className="hover:underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}