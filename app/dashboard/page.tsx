import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserProfile } from '@clerk/nextjs';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function DashboardPage() {
  const { userId, sessionClaims } = auth();

  // 로그인하지 않은 경우 로그인 페이지로
  if (!userId) {
    redirect('/auth/sign-in');
  }

  const email = sessionClaims?.email as string;

  // 관리자인 경우 /admin으로 리디렉트
  if (email === 'jhlim725@gmail.com') {
    redirect('/admin');
  }

  // 일반 사용자 대시보드
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">내 계정</h1>
              <p className="text-muted-foreground">
                프로필 정보를 관리하고 계정 설정을 변경하세요.
              </p>
            </div>

            {/* Clerk UserProfile 컴포넌트 */}
            <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <UserProfile
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0 bg-transparent",
                    navbar: "hidden",
                    pageScrollBox: "p-0",
                    profileSectionPrimaryButton: "bg-primary hover:bg-primary/90",
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    formFieldInput: "border-border",
                    identityPreviewEditButton: "text-primary",
                  },
                }}
              />
            </div>

            {/* 추가 안내 */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">💡 계정 관리 안내</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>프로필</strong>: 이름, 이메일 등 기본 정보 수정</li>
                <li>• <strong>보안</strong>: 비밀번호 변경 및 2단계 인증 설정</li>
                <li>• <strong>계정</strong>: 연결된 계정 관리 및 계정 삭제</li>
                <li>• <strong>세션</strong>: 로그인된 디바이스 관리</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
