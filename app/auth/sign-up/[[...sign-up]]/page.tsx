import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { SignUp } from '@clerk/nextjs';
import { Crown, Shield, TrendingUp, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 | FamilyOffice S - 百年永續 기업의 가치를 다음 세대로',
  description: '중소중견기업 법인대표를 위한 百年永續 솔루션에 가입하세요. 기업의 가치를 다음 세대로 이어가는 전문 서비스입니다.',
};

export default function SignUpPage() {
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

          {/* 우측: Clerk 회원가입 컴포넌트 */}
          <div className="w-full max-w-md mx-auto lg:mx-0 flex items-center justify-center">
            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm w-full",
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
              signInUrl="/auth/sign-in"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
