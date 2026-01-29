'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { QuizQuestion } from '@/constants/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionCard = ({
  question,
  selectedOptionId,
  onSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: QuestionCardProps) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="relative overflow-hidden transition-all duration-300 shadow-2xl border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl hover:shadow-3xl">
        {/* Decorative gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-600 via-navy-500 to-amber-500 dark:from-amber-600 dark:via-amber-500 dark:to-navy-500" />

        <div className="p-8 md:p-10">
          {/* Question Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-navy-50 text-navy-600 dark:bg-amber-900/30 dark:text-amber-400 border border-navy-100 dark:border-amber-800/50">
                {question.section}
              </span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-white mb-3 leading-tight">
              {question.question}
            </h2>
            {question.description && (
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                {question.description}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map(option => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(option.id)}
                className={cn(
                  'w-full p-5 text-left rounded-xl transition-all duration-200 group',
                  selectedOptionId === option.id
                    ? 'border-[3px] border-navy-700 dark:border-amber-500 bg-navy-100 dark:bg-amber-900/20 shadow-xl shadow-navy-600/30 dark:shadow-amber-500/20 ring-2 ring-navy-600/20 dark:ring-amber-500/20'
                    : 'border-2 border-slate-300 dark:border-slate-700 hover:border-navy-400 dark:hover:border-amber-600 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:shadow-md'
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all',
                      selectedOptionId === option.id
                        ? 'border-[3px] border-navy-700 dark:border-amber-500 bg-navy-700 dark:bg-amber-500 shadow-md shadow-navy-700/40 dark:shadow-amber-500/40'
                        : 'border-[2.5px] border-slate-400 dark:border-slate-600 group-hover:border-navy-500 dark:group-hover:border-amber-500 bg-white dark:bg-slate-800'
                    )}
                  >
                    {selectedOptionId === option.id && (
                      <CheckCircle
                        className="w-5 h-5 text-white"
                        strokeWidth={3.5}
                        fill="currentColor"
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      'font-medium text-base md:text-lg transition-colors',
                      selectedOptionId === option.id
                        ? 'text-navy-900 dark:text-amber-100 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 group-hover:text-navy-800 dark:group-hover:text-amber-200'
                    )}
                  >
                    {option.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t-2 border-slate-100 dark:border-slate-700/50">
            <Button
              variant="ghost"
              onClick={onPrev}
              disabled={isFirst}
              size="lg"
              className={cn(
                'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800',
                isFirst && 'invisible'
              )}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              이전
            </Button>

            <Button
              onClick={onNext}
              disabled={!selectedOptionId}
              size="lg"
              className={cn(
                'px-10 py-6 text-base font-semibold shadow-lg',
                'bg-gradient-to-r from-navy-900 to-navy-800 dark:from-amber-600 dark:to-amber-700',
                'hover:from-navy-800 hover:to-navy-700 dark:hover:from-amber-500 dark:hover:to-amber-600',
                'text-white hover:shadow-xl hover:scale-105 transition-all duration-200',
                !selectedOptionId &&
                  'opacity-40 cursor-not-allowed hover:scale-100 hover:shadow-lg'
              )}
            >
              {isLast ? (
                <>
                  결과 보기
                  <CheckCircle className="ml-2 w-5 h-5" />
                </>
              ) : (
                <>
                  다음
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
