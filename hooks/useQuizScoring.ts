import { useState } from 'react';

import {
  CATEGORY_SOLUTIONS,
  QUIZ_CATEGORIES,
  QUIZ_QUESTIONS,
  QuizCategory,
  RecommendedSolution,
} from '@/constants/quiz';

export interface QuizScores {
  [category: string]: number;
}

export interface QuizResult {
  topCategories: QuizCategory[];
  recommendations: Array<{
    category: QuizCategory;
    solutions: RecommendedSolution[];
  }>;
  scores: QuizScores;
}

export const useQuizScoring = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const calculateResults = (): QuizResult => {
    // Initialize scores
    const scores: QuizScores = {};
    Object.keys(QUIZ_CATEGORIES).forEach(key => {
      scores[key] = 0;
    });

    // Calculate weighted scores
    QUIZ_QUESTIONS.forEach(question => {
      const selectedOptionId = answers[question.id];
      if (!selectedOptionId) return;

      const selectedOption = question.options.find(
        opt => opt.id === selectedOptionId
      );
      if (!selectedOption || !selectedOption.scores) return;

      Object.entries(selectedOption.scores).forEach(([category, score]) => {
        scores[category] = (scores[category] || 0) + score * question.weight;
      });
    });

    // Apply conditional rules
    const adjustedScores = applyConditionalRules(scores, answers);

    // Sort categories by score
    const sortedCategories = Object.entries(adjustedScores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([category]) => category as QuizCategory);

    // Get top 3 categories
    const topCategories = sortedCategories.slice(0, 3);

    // Map to recommendations
    const recommendations = topCategories.map(category => ({
      category,
      solutions: CATEGORY_SOLUTIONS[category],
    }));

    return {
      topCategories,
      recommendations,
      scores: adjustedScores,
    };
  };

  const applyConditionalRules = (
    scores: QuizScores,
    answers: Record<string, string>
  ): QuizScores => {
    const newScores = { ...scores };

    // Q1: Size, Q2: Priority, Q3: Type, Q4: Timing, Q5: Prep

    // Rule 1: Emergency Situation
    // Condition: Q4 = D (Urgent) OR (Q2 = B (Risk) AND Q4 = D)
    const isUrgent = answers['q4'] === 'D';
    const isRiskPriority = answers['q2'] === 'B';

    if (isUrgent || (isRiskPriority && isUrgent)) {
      newScores['보험'] = (newScores['보험'] || 0) + 3;
    }

    // Rule 2: Tax Optimization Priority
    // Condition: Q2 = A (Tax) AND Q1 >= B (Medium+)
    const isTaxPriority = answers['q2'] === 'A';
    const isMediumOrLarger = ['B', 'C', 'D'].includes(answers['q1'] || '');

    if (isTaxPriority && isMediumOrLarger) {
      newScores['세무'] = (newScores['세무'] || 0) + 2;
    }

    // Rule 3: Integrated Solution Needed (Family Office)
    // Condition: Q1 >= C (Large+) AND Q3 >= C (Multi Corp)
    const isLargeOrLarger = ['C', 'D'].includes(answers['q1'] || '');
    const isMultiCorp = ['C', 'D'].includes(answers['q3'] || '');

    if (isLargeOrLarger && isMultiCorp) {
      // Boost comprehensive categories
      newScores['자산'] = (newScores['자산'] || 0) + 1.5;
      newScores['승계'] = (newScores['승계'] || 0) + 1.5;
      newScores['법인'] = (newScores['법인'] || 0) + 1.5;
    }

    // Rule 4: Foundation Education Needed
    // Condition: Q5 = A (None) AND Q1 = A (Small)
    const isPrepNone = answers['q5'] === 'A';
    const isSmall = answers['q1'] === 'A';

    if (isPrepNone && isSmall) {
      // Boost entry level categories if needed, or maybe specific content recommendation logic
      // For now, let's boost '특허' (Startup) and '인사' (HR) slightly as they are foundational
      newScores['특허'] = (newScores['특허'] || 0) + 1;
      newScores['인사'] = (newScores['인사'] || 0) + 1;
    }

    return newScores;
  };

  return {
    answers,
    handleAnswer,
    calculateResults,
  };
};
