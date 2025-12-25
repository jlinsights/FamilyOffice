'use client';

import { ArrowRight, Building, CheckCircle, Shield } from 'lucide-react';

import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SelfCheckCTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-emerald-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-6 shadow-sm animate-fade-in">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full mr-2">
              Self Check
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Risk & Tax Self-Check
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight animate-slide-up">
            자가진단으로{' '}
            <span className="text-blue-600 dark:text-blue-400">
              맞춤 솔루션
            </span>{' '}
            받기
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-slide-up font-light">
            10문항 체크 → 점수화 → 권장 패키지 제안
            <br />
            <span className="text-base text-slate-500 dark:text-slate-500 mt-2 block">
              복잡한 기업 상황을 3분 만에 진단해보세요
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Link
            href="/serious-accident-law#risk-assessment"
            className="block group"
          >
            <Card className="h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent dark:from-red-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-7 w-7" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      중대재해 위험도 자가진단
                    </CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Essential / Advanced / Premium 패키지 추천
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-end text-red-600 dark:text-red-400 font-bold mt-4 group-hover:translate-x-2 transition-transform duration-300">
                  바로 시작하기 <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inheritance-gift-tax#self-check" className="block group">
            <Card className="h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Building className="h-7 w-7" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      승계·증여(법인명의) 자가진단
                    </CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Cash Shield / Value Control / Succession Ready 권장
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-end text-blue-600 dark:text-blue-400 font-bold mt-4 group-hover:translate-x-2 transition-transform duration-300">
                  바로 시작하기 <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
