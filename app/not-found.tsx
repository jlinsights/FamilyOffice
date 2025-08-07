import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-3xl font-semibold">페이지를 찾을 수 없습니다</h2>
          <p className="text-lg text-muted-foreground max-w-md">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background transition-colors focus-visible:ring-offset-2 h-12 px-8 py-4 bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              홈으로 돌아가기
            </Link>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background transition-colors focus-visible:ring-offset-2 h-12 px-8 py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-lg"
            >
              상담 신청
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
