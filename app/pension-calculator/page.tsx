import {
  AlertCircle,
  Calculator,
  CheckCircle,
  PiggyBank,
  Shield,
  Target,
  TrendingUp,
} from 'lucide-react';

import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PensionCalculatorTracking } from '@/components/kakao/pension-calculator-tracking';
import PensionCalculatorForm from '@/components/pension/pension-calculator-form';

export const metadata: Metadata = {
  title: '연금 계산기 - 정확한 노후 준비 계산',
  description:
    '개인연금, 퇴직연금, 국민연금을 종합적으로 계산해보세요. 성공한 CEO를 위한 맞춤형 연금 설계 서비스.',
  keywords:
    '연금계산기, 노후설계, 개인연금, 퇴직연금, 연금보험, 세금 절약, 은퇴 계획',
  openGraph: {
    title: '연금 계산기 | FamilyOffice S',
    description:
      '성공한 CEO를 위한 정확한 연금 계산과 노후 설계. 세금 혜택까지 고려한 종합 연금 플래너.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function PensionCalculatorPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-800/30 pt-20">
        <PensionCalculatorTracking />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* 🎯 BMAD Method: Behavioral Header - 전문성과 신뢰성 강조 */}
          <div className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl dark:shadow-slate-900/50 mb-16">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/10 via-teal-400/10 to-cyan-400/10 dark:from-emerald-300/5 dark:via-teal-300/5 dark:to-cyan-300/5 rounded-full blur-3xl"></div>

            <div className="relative px-8 py-12 text-center">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-400/20 dark:to-teal-400/20 rounded-2xl blur-xl animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 rounded-2xl shadow-lg">
                    <Calculator className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-6xl font-black bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-900 dark:from-slate-100 dark:via-emerald-200 dark:to-teal-200 bg-clip-text text-transparent leading-tight">
                    연금 계산기
                  </h1>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold rounded-full border border-emerald-200 dark:border-emerald-700">
                      💰 복리 효과 분석
                    </span>
                    <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-full border border-blue-200 dark:border-blue-700">
                      📉 세액공제 계산
                    </span>
                    <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-bold rounded-full border border-purple-200 dark:border-purple-700">
                      ⚡ AI 은퇴 설계
                    </span>
                  </div>
                </div>
              </div>

              <div className="max-w-5xl mx-auto mb-8">
                <p className="text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    성공적인 노후
                  </span>
                  를 위한 정밀 시뮬레이션
                </p>
                <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
                  개인연금, 퇴직연금, 세금혜택까지{' '}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    한 번에 계산
                  </span>
                  하세요
                </p>
              </div>

              {/* 🎯 BMAD Method: Motivational - 핵심 가치 제안 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-3 mx-auto" />
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                    수익률 분석
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    복리 효과 정밀 계산
                  </p>
                </div>
                <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <PiggyBank className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 mx-auto" />
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                    맞춤형 설계
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    개인별 최적 포트폴리오
                  </p>
                </div>
                <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3 mx-auto" />
                  <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                    세금 절약
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    세액공제 효과 분석
                  </p>
                </div>
                <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-amber-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Target className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-3 mx-auto" />
                  <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                    목표 달성
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    은퇴 자금 시뮬레이션
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Calculator Section */}
          <PensionCalculatorForm />

          {/* 🎯 2025년 연금 세제 혜택 정보 */}
          <div className="mt-16">
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl dark:shadow-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 rounded-xl text-white">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-slate-900 dark:text-slate-100">
                    2025년 연금 세제 혜택 주요 포인트
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-800 dark:text-emerald-200 block">
                        세액공제 한도 확대
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        연금저축 + IRP 합산 최대 900만원
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50/80 dark:bg-blue-900/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-800 dark:text-blue-200 block">
                        연금소득세 저율 과세
                      </span>
                      <span className="text-blue-700 dark:text-blue-300">
                        연령에 따라 3.3% ~ 5.5% 적용
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50/80 dark:bg-purple-900/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-purple-800 dark:text-purple-200 block">
                        사적연금 분리과세
                      </span>
                      <span className="text-purple-700 dark:text-purple-300">
                        연 1,500만원 이하 분리과세 선택 가능
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-amber-50/80 dark:bg-amber-900/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-800 dark:text-amber-200 block">
                        ISA 만기 자금 전환
                      </span>
                      <span className="text-amber-700 dark:text-amber-300">
                        추가 세액공제 혜택 (전환금액의 10%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 🎯 하단 면책 고지 */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto p-6 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl">
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                ⚠️{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  면책 고지
                </strong>
                : 본 계산기는 일반적인 연금 수령액 예상 금액 산출을 위한
                도구입니다. 실제 수령액은 투자 수익률, 물가상승률, 세법 변경
                등에 따라 달라질 수 있으므로 정확한 노후 설계 수립을 위해서는
                반드시{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  전문가와 상담
                </strong>
                하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
