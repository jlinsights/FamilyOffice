'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Download,
  Phone,
} from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { QUIZ_CATEGORIES } from '@/constants/quiz';
import { QuizResult } from '@/hooks/useQuizScoring';

interface QuizResultsProps {
  result: QuizResult;
  onRetry: () => void;
}

export const QuizResults = ({ result, onRetry }: QuizResultsProps) => {
  const topRecommendations = result.recommendations;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-20">
      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-navy-900 to-slate-900 dark:from-slate-900 dark:to-navy-900 text-white p-8 md:p-10 shadow-2xl overflow-hidden relative border-0">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <BarChart3 size={200} />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              귀사를 위한 맞춤형 솔루션 분석 완료
            </h2>
            <p className="text-slate-300 dark:text-slate-400 text-lg mb-8 max-w-2xl">
              제공해주신 정보를 바탕으로 기업 규모, 우선순위, 준비 상태를
              분석하여 가장 효과적인 3가지 솔루션을 도출했습니다.
            </p>

            <div className="flex flex-wrap gap-4">
              {result.topCategories.map((category, index) => {
                const CategoryIcon = QUIZ_CATEGORIES[category].icon;
                return (
                  <div
                    key={category}
                    className="flex items-center gap-3 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg px-5 py-3 border border-white/10 dark:border-white/20"
                  >
                    <div className="bg-amber-500 dark:bg-amber-400 rounded-full p-1 text-navy-900 dark:text-slate-900 font-bold w-6 h-6 flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    <CategoryIcon className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold text-lg">
                      {QUIZ_CATEGORIES[category].name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recommendations Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle className="text-navy-600 dark:text-amber-500" />
          추천 솔루션 세부 가이드
        </h3>

        {topRecommendations.map((rec, index) => (
          <motion.div
            key={rec.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-navy-100 dark:bg-amber-900/30 text-navy-800 dark:text-amber-400 text-sm font-bold px-3 py-1 rounded-full border border-navy-200 dark:border-amber-700">
                      우선순위 {index + 1}위
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {QUIZ_CATEGORIES[rec.category].name} 솔루션
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {QUIZ_CATEGORIES[rec.category].description}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {rec.solutions.map((solution, sIndex) => (
                  <Link
                    key={sIndex}
                    href={solution.link}
                    className="group block bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-navy-400 dark:hover:border-amber-600 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-navy-700 dark:group-hover:text-amber-400 transition-colors">
                        {solution.title}
                      </h5>
                      <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-navy-600 dark:group-hover:text-amber-500" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {solution.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-navy-700 dark:text-amber-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-navy-500 dark:bg-amber-500" />
                        기대효과: {solution.expectedBenefit}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                        소요기간: {solution.duration}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-navy-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-navy-100 dark:border-slate-700 text-center"
      >
        <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">
          이 문제, 혼자 판단하셔도 되는 단계인가요?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          진단 결과를 바탕으로 구조 점검을 통해 명확한 판단 기준을 정리하세요.
          전문가가 귀사의 현황을 정확히 파악하고, 우선순위를 명확히 해드립니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/structure-check">
            <Button
              size="lg"
              className="bg-navy-900 dark:bg-amber-600 text-white hover:bg-navy-800 dark:hover:bg-amber-700 w-full sm:w-auto px-8 py-6 text-lg"
            >
              <Phone className="mr-2 w-5 h-5" />
              구조 점검 요청
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-navy-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800 w-full sm:w-auto px-8 py-6 text-lg text-navy-800 dark:text-slate-200"
            onClick={() => window.print()}
          >
            <Download className="mr-2 w-5 h-5" />
            진단 리포트 저장하기
          </Button>
        </div>
      </motion.div>

      {/* Browse All Solutions Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center pt-6 pb-4 border-t border-slate-200 dark:border-slate-700"
      >
        <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
          다른 솔루션이 궁금하신가요?
        </p>
        <Link
          href="/services"
          className="inline-flex items-center text-navy-700 dark:text-amber-400 hover:text-navy-900 dark:hover:text-amber-300 font-medium transition-colors group"
        >
          <span>전체 솔루션 카탈로그 보기</span>
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <div className="text-center pt-8">
        <Button
          variant="link"
          onClick={onRetry}
          className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
        >
          테스트 다시하기
        </Button>
      </div>
    </div>
  );
};
