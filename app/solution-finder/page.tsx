'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PremiumContentGuard } from '@/components/premium-content-guard';
import { ProgressBar } from '@/components/quiz/ProgressBar';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { QuizResults } from '@/components/quiz/QuizResults';

import { QUIZ_QUESTIONS } from '@/constants/quiz';
import { useQuizScoring } from '@/hooks/useQuizScoring';

export default function SolutionFinderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { answers, handleAnswer, calculateResults } = useQuizScoring();

  const currentQuestion = QUIZ_QUESTIONS[currentStep] || QUIZ_QUESTIONS[0]!;
  const totalSteps = QUIZ_QUESTIONS.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRetry = () => {
    setIsCompleted(false);
    setCurrentStep(0);
    // Ideally reset answers too, but for now simple retry
    window.location.reload();
  };

  const result = isCompleted ? calculateResults() : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <PremiumContentGuard>
        <main className="flex-grow flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-navy-100 dark:bg-navy-900/20 rounded-full blur-3xl opacity-30 dark:opacity-40" />
            <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-amber-100 dark:bg-amber-900/20 rounded-full blur-3xl opacity-30 dark:opacity-40" />
          </div>

          <div className="max-w-5xl mx-auto w-full z-10">
            {/* Header */}
            <div className="text-center mb-12">
              {!isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center mb-6"
                >
                  <span className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-navy-100 dark:border-navy-700 text-navy-800 dark:text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                    Smart Solution Finder
                  </span>
                </motion.div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-6 tracking-tight leading-tight"
              >
                {isCompleted
                  ? '진단 결과 리포트'
                  : '당신에게 꼭 필요한 솔루션은?'}
              </motion.h1>
              {!isCompleted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
                >
                  <b>5개의 전략적 질문</b>에 답하시면 귀사의 현황을 분석하여
                  <br className="hidden md:block" />
                  <span className="text-navy-700 dark:text-amber-400 font-semibold">
                    가장 적합한 솔루션 TOP 3
                  </span>
                  를 즉시 추천해 드립니다.
                </motion.p>
              )}
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {!isCompleted ? (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-10">
                      <ProgressBar
                        current={currentStep + 1}
                        total={totalSteps}
                      />
                    </div>

                    <QuestionCard
                      question={currentQuestion}
                      selectedOptionId={answers[currentQuestion.id] || ''}
                      onSelect={optionId =>
                        handleAnswer(currentQuestion.id, optionId)
                      }
                      onNext={handleNext}
                      onPrev={handlePrev}
                      isFirst={currentStep === 0}
                      isLast={currentStep === totalSteps - 1}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    {result && (
                      <QuizResults result={result} onRetry={handleRetry} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </PremiumContentGuard>

      <Footer />
    </div>
  );
}
