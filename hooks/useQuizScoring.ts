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

    // Rule A: Low Salary + Good Cash Flow -> Corporate Health Insurance (Salary Process)
    // q5_salary = A (Low), q2_cashflow = B (Sufficient)
    if (answers['q5_salary'] === 'A' && answers['q2_cashflow'] === 'B') {
      newScores['보험'] = (newScores['보험'] || 0) + 6; // Increased boost to ensure Top 3
      newScores['세무'] = (newScores['세무'] || 0) + 3; // Salary process tax benefit
      newScores['인사'] = (newScores['인사'] || 0) + 2; // HR/Salary benefit
    }

    // Rule B: High Salary + Weak Bylaws + Succession -> CEO Term Insurance + Bylaws
    // q5_salary = B (High), q9_articles = B (Old/Need update), q12_succession = A (Yes)
    // Note: Checking specific conditions.
    const isHighSalary = answers['q5_salary'] === 'B';
    const isBylawWeak =
      answers['q9_articles'] === 'B' || answers['q10_severance'] === 'B';
    const hasSuccessionNeeds = answers['q12_succession'] === 'A';

    if (isHighSalary && isBylawWeak && hasSuccessionNeeds) {
      newScores['보험'] = (newScores['보험'] || 0) + 6; // CEO Plan
      newScores['법인'] = (newScores['법인'] || 0) + 5; // Bylaws/Corporate Structure
    }

    // Rule C: High Suspense + Sole Owner -> Severance Funding
    // q3_debt = B (Exist), q6_shareholding = A (Family)
    if (answers['q3_debt'] === 'B' && answers['q6_shareholding'] === 'A') {
      newScores['보험'] = (newScores['보험'] || 0) + 4; // Funding
      newScores['세무'] = (newScores['세무'] || 0) + 4; // Suspense/Tax issue
    }

    // Additional Rule: Risk Preparation
    if (answers['q14_risk'] === 'B') {
      newScores['보험'] = (newScores['보험'] || 0) + 3; // Risk Hedge
    }

    return newScores;
  };

  return {
    answers,
    handleAnswer,
    calculateResults,
  };
};
