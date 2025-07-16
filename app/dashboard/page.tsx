import { Metadata } from 'next';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: '대시보드 | 패밀리오피스 VIP',
  description: '개인화된 자산관리 대시보드에서 포트폴리오 현황을 확인하세요.',
  robots: { index: false, follow: false }
};

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">대시보드</h1>
              <p className="text-muted-foreground dark:text-gray-300">
                안녕하세요, {user.firstName || user.emailAddresses[0].emailAddress}님
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground dark:text-gray-300">
              마지막 업데이트: {new Date().toLocaleDateString('ko-KR')}
            </div>
          </div>
          
          <div className="text-center py-20">
            <p className="text-muted-foreground">대시보드 기능을 준비 중입니다.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 