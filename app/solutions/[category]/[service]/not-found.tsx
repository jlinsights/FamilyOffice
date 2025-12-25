import { ArrowLeft, Search } from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Search className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
              서비스를 찾을 수 없습니다
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              요청하신 서비스 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl rounded-full px-8"
                asChild
              >
                <Link href="/solutions">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  전체 솔루션 보기
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 dark:border-slate-700 font-bold rounded-full px-8"
                asChild
              >
                <Link href="/">홈으로 돌아가기</Link>
              </Button>
            </div>

            {/* Popular Services */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
                인기 서비스
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: '법인종신보험', href: '/life-insurance' },
                  {
                    title: '가업승계 전략',
                    href: '/business-succession-strategy',
                  },
                  { title: '경영인정기보험', href: '/key-person-insurance' },
                  { title: '상속·증여 컨설팅', href: '/inheritance-gift' },
                ].map((service, index) => (
                  <Link
                    key={index}
                    href={service.href}
                    className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all text-left"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {service.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
