import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';

export const metadata: Metadata = {
  title: '대시보드 | FamilyOffice S',
  description: '개인화된 자산관리 대시보드에서 포트폴리오 현황을 확인하세요.',
  robots: { index: false, follow: false }
};

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// 클라이언트 전용 대시보드 컴포넌트
const DashboardContent = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold dark:text-white">대시보드</h1>
              </div>
              <Badge variant="outline" className="mb-4">
                Dashboard
              </Badge>
            </div>
            <div className="text-right text-sm text-muted-foreground dark:text-gray-300">
              마지막 업데이트: {new Date().toLocaleDateString('ko-KR')}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>자산관리 대시보드</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                개인화된 자산관리 대시보드 기능을 준비 중입니다. 로그인 기능과 함께 곧 제공될 예정입니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// 에러 폴백 컴포넌트
const DashboardErrorFallback = ({ resetError }: { error: Error; resetError: () => void }) => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">대시보드 로딩 중...</h1>
        <p className="text-muted-foreground mb-4">잠시만 기다려주세요.</p>
        <button 
          onClick={resetError}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ErrorBoundary fallback={DashboardErrorFallback}>
      <DashboardContent />
    </ErrorBoundary>
  );
}