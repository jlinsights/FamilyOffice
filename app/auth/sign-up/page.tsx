'use client';

import KakaoSignUpButton from '@/components/auth/kakao-signup-button';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Crown, Shield, TrendingUp, Users } from 'lucide-react';
import { Suspense, useEffect } from 'react';

export default function SignUpPage() {
  // Set page metadata for SEO
  useEffect(() => {
    document.title = '회원가입 | FamilyOffice S - 百年永續 기업의 가치를 다음 세대로';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '중소중견기업 법인대표를 위한 百年永續 솔루션. 기업의 가치를 다음 세대로 이어가는 전문 서비스입니다.');
    }
  }, []);
  const features = [
    {
      icon: Crown,
      title: 'CEO 전용 서비스',
      description: '중소중견기업 대표님만을 위한 맞춤형 솔루션'
    },
    {
      icon: Shield,
      title: '안전한 자산관리',
      description: '기업급 보안으로 소중한 자산을 안전하게 보호'
    },
    {
      icon: Users,
      title: '전문가 1:1 상담',
      description: '20년 경력의 전문가와 직접 상담'
    },
    {
      icon: TrendingUp,
      title: '맞춤형 투자전략',
      description: '기업 상황에 최적화된 투자 포트폴리오'
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
                ⭐ 성공한 CEO 전용 플랫폼
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <span className="text-primary">百年永續</span>
              <br />
              기업의 가치를 다음 세대로
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              중소중견기업 법인대표님을 위한 전문적인 자산관리와 가업승계 솔루션을 제공합니다. 
              지금 가입하고 프리미엄 서비스를 경험하세요.
            </p>
          </div>

          {/* 특징 카드들 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 신뢰 지표 */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">법인 고객</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500억+</div>
              <div className="text-sm text-muted-foreground">관리 자산</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">고객 만족도</div>
            </div>
          </div>
        </div>

        {/* 우측: 회원가입 폼 */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center">
              <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
              <CardDescription className="text-base">
                성공한 CEO님들을 위한 전용 서비스에 가입하세요
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 카카오 회원가입 */}
              <div className="space-y-4">
                <Suspense fallback={<div>로딩 중...</div>}>
                  <KakaoSignUpButton 
                    fullWidth
                    size="lg"
                    onSuccess={() => {
                      // 회원가입 성공 시 대시보드로 리다이렉트
                      window.location.href = '/dashboard';
                    }}
                  />
                </Suspense>
                
                <p className="text-xs text-center text-muted-foreground">
                  카카오 계정으로 빠르고 안전하게 가입하세요
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

              {/* 기존 회원가입 폼 (이메일/패스워드) */}
              <Suspense fallback={<div>로딩 중...</div>}>
                <SignUpForm />
              </Suspense>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  이미 계정이 있으신가요?{' '}
                  <a 
                    href="/auth/sign-in" 
                    className="text-primary hover:underline font-medium"
                  >
                    로그인
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">
                  회원가입하시면{' '}
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