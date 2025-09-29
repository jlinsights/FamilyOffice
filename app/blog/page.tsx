import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { BlogContentSkeleton } from '@/components/blog/blog-content-advanced';

export const metadata: Metadata = {
  title: '블로그 - 패밀리오피스 및 자산관리 인사이트',
  description: '패밀리오피스 및 자산관리의 최신 인사이트와 전문가 분석을 만나보세요. 실무 가이드부터 전략 분석까지 다양한 콘텐츠를 제공합니다.',
  keywords: '블로그, 패밀리오피스, 자산관리, 투자전략, 세무최적화, 기업승계',
};

// Dynamic import for blog components
const BlogContentAdvanced = dynamic(
  () => import('@/components/blog/blog-content-advanced').then(mod => ({ default: mod.BlogContentAdvanced })),
  { 
    loading: () => <BlogContentSkeleton />
  }
);

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-900/50">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="outline" className="mb-6 bg-white/50 dark:bg-slate-800/50 border-blue-200 dark:border-blue-700">
              📝 FamilyOffice S 블로그
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-slate-900 dark:text-white">자산관리 전문가의</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                실무 인사이트
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              패밀리오피스, 자산관리, 투자전략부터 세무최적화와 기업승계까지.
              <br />
              한국 중견기업 CEO를 위한 전문가 분석과 실무 가이드를 제공합니다.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">전문 아티클</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">5개</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">전문 영역</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">매주 2회</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">정기 발행</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">실무진</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">전문가 검증</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Blog Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<BlogContentSkeleton />}>
              <BlogContentAdvanced
                showSearch={true}
                showFilters={true}
                showViewToggle={true}
                infiniteScroll={false}
                itemsPerPage={12}
                className="animate-slide-up"
              />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}