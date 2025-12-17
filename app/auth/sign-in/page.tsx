import { SignIn } from '@clerk/nextjs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 | FamilyOffice S - 중소중견기업 전문 자산관리',
  description: '중소중견기업 법인대표를 위한 전문적인 자산관리 서비스에 로그인하세요.',
};

export default function SignInPage() {
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

          {/* 우측: Clerk 로그인 컴포넌트 */}
          <div className="w-full max-w-md mx-auto lg:mx-0 flex items-center justify-center">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-2xl bg-card/80 backdrop-blur-sm border border-border/50 w-full",
                  headerTitle: "text-2xl font-bold",
                  headerSubtitle: "text-base text-muted-foreground",
                  socialButtonsBlockButton: "bg-primary hover:bg-primary/90",
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footerActionLink: "text-primary hover:text-primary/80",
                  formFieldInput: "border-border",
                  identityPreviewEditButton: "text-primary",
                },
                layout: {
                  socialButtonsPlacement: "top",
                  socialButtonsVariant: "blockButton",
                },
              }}
              routing="path"
              path="/auth/sign-in"
              signUpUrl="/auth/sign-up"
              afterSignInUrl="/dashboard"
              redirectUrl="/dashboard"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
