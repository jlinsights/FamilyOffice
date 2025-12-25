'use client';

import {
  AlertTriangle,
  ArrowRight,
  Building,
  Crown,
  HeartHandshake,
  Shield,
  Target,
} from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CalComPopup } from '@/components/cal-com-popup';

export function DualPillarSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-6 shadow-sm animate-fade-in">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full mr-2">
              Core Strategy
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
              <Crown className="h-3 w-3 mr-1" />
              한국 중견·패밀리기업 전용 리스크·세무 통합
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight animate-slide-up">
            이중 방어선으로 완성하는{' '}
            <span className="text-blue-600 dark:text-blue-400">
              기업 지속성
            </span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed animate-slide-up font-light">
            중대재해처벌법 통합 대응 × 승계세무 최적화
            <br />
            <span className="text-base font-semibold text-slate-900 dark:text-white mt-2 bg-slate-100 dark:bg-slate-800/50 inline-block px-4 py-1 rounded-full">
              Compliance + Insurance + Tax Engineering = 차세대 경영 기반
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1: 중대재해 대응 */}
          <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent dark:from-red-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardHeader className="relative pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    중대재해 대응 솔루션
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    사고 전 예방/교육/점검 + 사고 후 비용/법률 대응
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2.5 flex-shrink-0"></div>
                  <span>D&O/임원배상, 변호사비/벌금, 사고대응 비용 담보</span>
                </li>
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2.5 flex-shrink-0"></div>
                  <span>
                    업종별(제조/건설/물류/IT시설) 안전 가이드 + 교육·점검 연계
                  </span>
                </li>
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2.5 flex-shrink-0"></div>
                  <span>Essential / Advanced / Premium 패키지</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/serious-accident-law"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 bg-white dark:bg-slate-800"
                >
                  <Shield className="h-4 w-4 mr-2" /> 상세 보기
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                <CalComPopup
                  buttonText="30분 리스크 스크리닝"
                  size="sm"
                  className="px-5 py-2.5 text-sm font-bold rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300 border-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pillar 2: 승계·증여 */}
          <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardHeader className="relative pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    승계·증여 설계
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    세후 유동성 확보 + 비상장주식 가치/거버넌스 설계
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2.5 flex-shrink-0"></div>
                  <span>
                    법인명의 종신/정기 조합, 콜옵션·주식매수자금·구주매입
                    시나리오
                  </span>
                </li>
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2.5 flex-shrink-0"></div>
                  <span>배당/급여/퇴직금 병행, 단계별 타이밍·증빙 문서화</span>
                </li>
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2.5 flex-shrink-0"></div>
                  <span>
                    Cash Shield / Value Control / Succession Ready 패키지
                  </span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/inheritance-gift-tax"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 bg-white dark:bg-slate-800"
                >
                  <HeartHandshake className="h-4 w-4 mr-2" /> 상세 보기
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                <CalComPopup
                  buttonText="유동성·세무 상담"
                  size="sm"
                  className="px-5 py-2.5 text-sm font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 border-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="px-10 py-6 text-lg font-bold rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/solutions">
              <Target className="h-5 w-5 mr-2" />
              업종·규모별 맞춤 패키지 보기
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
