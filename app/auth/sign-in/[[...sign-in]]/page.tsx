import { Crown, Palette, Shield, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { isClerkBypassMode } from '@/lib/auth/clerk-utils';

export const metadata: Metadata = {
  title: '로그인 | FamilyOffice S - 100억 CEO 전용 멤버십',
  description:
    '성공한 CEO의 삶을 완벽하게 케어하는 VVIP 멤버십에 로그인하세요.',
};

export default function SignInPage() {
  const benefits = [
    {
      icon: Shield,
      title: 'CEO Risk Audit & Simulation',
      description: '국세청 기반 모의 세무조사, 가업승계 Exit Plan',
    },
    {
      icon: Palette,
      title: 'The Private Retreat',
      description: '비공개 도슨트 투어, 프라이빗 힐링 여행',
    },
    {
      icon: Crown,
      title: 'Premier Concierge',
      description: '의전/라이프스타일 케어, VIP 검진 예약',
    },
  ];

  const isBypass = isClerkBypassMode();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 좌측: 멤버십 혜택 섹션 */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  100억 CEO 전용 멤버십
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                성공, 그 이상의
                <br />
                <span className="text-primary">가치를 디자인합니다</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                성공한 CEO의 삶을 완벽하게 케어하는
                <br className="hidden md:block" />
                <span className="font-semibold">통합 자산관리 솔루션</span>을
                경험하세요.
              </p>
            </div>

            {/* 핵심 혜택 카드들 */}
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
                    <h3 className="font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 멤버십 통계 */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">VVIP</div>
                <div className="text-sm text-muted-foreground">멤버십 등급</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100억+</div>
                <div className="text-sm text-muted-foreground">
                  CEO 자산기준
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100명</div>
                <div className="text-sm text-muted-foreground">한정 멤버</div>
              </div>
            </div>
          </div>

          {/* 우측: Clerk 로그인 컴포넌트 */}
          <div className="w-full max-w-md mx-auto lg:mx-0 flex items-center justify-center">
            {isBypass ? (
              <div className="w-full p-8 rounded-lg bg-card border border-border/50 text-center shadow-2xl">
                <h2 className="text-2xl font-bold mb-4">Development Mode</h2>
                <p className="text-muted-foreground mb-4">
                  Authentication is disabled because you are using production
                  Clerk keys in a development environment.
                </p>
                <div className="p-4 bg-muted/50 rounded font-mono break-all text-xs">
                  Review setup in .env.local
                </div>
              </div>
            ) : (
              <SignIn
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-2xl bg-card/80 backdrop-blur-sm border border-border/50 w-full',
                    headerTitle: 'text-2xl font-bold',
                    headerSubtitle: 'text-base text-muted-foreground',
                    socialButtonsBlockButton: 'bg-primary hover:bg-primary/90',
                    formButtonPrimary: 'bg-primary hover:bg-primary/90',
                    footerActionLink: 'text-primary hover:text-primary/80',
                    formFieldInput: 'border-border',
                    identityPreviewEditButton: 'text-primary',
                  },
                  layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton',
                  },
                }}
                signUpUrl="/auth/sign-up"
                fallbackRedirectUrl="/dashboard"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
