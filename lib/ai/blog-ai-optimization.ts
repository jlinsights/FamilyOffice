/**
 * Blog AI Optimization System
 * 블로그 콘텐츠에 AI 검색엔진 최적화 적용
 *
 * SuperClaude Framework + BMAD Method 통합
 * ChatGPT, Perplexity, Claude, Gemini, Bing Copilot 최적화
 */
import type { BlogPost } from '@/types/blog';
import { BMAD_AI_KEYWORDS } from './ai-search-monitoring';

/**
 * AI 최적화 FAQ 항목 인터페이스
 */
export interface AIOptimizedFAQ {
  question: string;
  answer: string;
  category?: string;
  targetEngines: string[]; // ChatGPT, Perplexity, Claude, Gemini, BingCopilot
}

/**
 * AI 검색엔진별 콘텐츠 최적화 전략
 */
export const AI_ENGINE_OPTIMIZATION = {
  chatgpt: {
    name: 'ChatGPT',
    preferredFormat: 'Q&A',
    optimalLength: '200-400자',
    keyFeatures: ['구조화된 답변', '단계별 설명', '실용적 예시'],
    contentStyle: '대화형 Q&A 구조',
  },
  perplexity: {
    name: 'Perplexity',
    preferredFormat: '인용 기반',
    optimalLength: '300-500자',
    keyFeatures: ['명확한 출처', '전문가 인용', '데이터 기반'],
    contentStyle: '사실 중심, 인용문 포함',
  },
  claude: {
    name: 'Claude',
    preferredFormat: '깊이 있는 분석',
    optimalLength: '400-800자',
    keyFeatures: ['종합 분석', '맥락 제공', '다각도 접근'],
    contentStyle: '분석적, 포괄적 설명',
  },
  gemini: {
    name: 'Gemini',
    preferredFormat: '간결한 핵심',
    optimalLength: '150-300자',
    keyFeatures: ['핵심 정보', '다중모달 지원', '빠른 답변'],
    contentStyle: '간결하고 명확한 요약',
  },
  bingcopilot: {
    name: 'Bing Copilot',
    preferredFormat: '비즈니스 실용',
    optimalLength: '250-450자',
    keyFeatures: ['실행 가능한 조언', '비즈니스 중심', '단계별 가이드'],
    contentStyle: '실용적 솔루션 중심',
  },
} as const;

/**
 * 블로그 카테고리별 BMAD 키워드 매핑
 */
export const BLOG_CATEGORY_BMAD_MAPPING: Record<
  string,
  keyof typeof BMAD_AI_KEYWORDS
> = {
  패밀리오피스: 'behavioral',
  투자전략: 'aspirational',
  세무최적화: 'decisional',
  기업승계: 'motivational',
  자산관리: 'behavioral',
  부동산투자: 'aspirational',
  보험설계: 'decisional',
  법인세절세: 'decisional',
  가업승계: 'motivational',
  자녀교육: 'aspirational',
  ESG경영: 'motivational',
  디지털전환: 'aspirational',
  재무설계: 'decisional',
  리스크관리: 'behavioral',
};

/**
 * 블로그 포스트에서 AI 최적화 키워드 추출
 */
export function extractAIOptimizedKeywords(post: BlogPost): string[] {
  const bmadCategory =
    BLOG_CATEGORY_BMAD_MAPPING[post.category] || 'behavioral';
  const bmadKeywords = BMAD_AI_KEYWORDS[bmadCategory] || [];

  // 기존 태그 + BMAD 키워드 + 카테고리 관련 키워드
  const allKeywords = [
    ...post.tags,
    ...bmadKeywords.slice(0, 5), // BMAD 키워드 상위 5개
    post.category,
    '패밀리오피스',
    '자산관리',
    'CEO',
  ];

  // 중복 제거 및 정렬
  return Array.from(new Set(allKeywords));
}

/**
 * AI 검색엔진 친화적 FAQ 자동 생성
 * 블로그 포스트 내용 기반으로 5가지 FAQ 생성
 */
export function generateAIOptimizedFAQ(post: BlogPost): AIOptimizedFAQ[] {
  // 기존 FAQ가 있으면 AI 최적화만 추가
  if (post.faq && post.faq.length > 0) {
    return post.faq.map((item, index) => ({
      question: item.question,
      answer: item.answer,
      category: post.category,
      targetEngines: determineTargetEngines(item.answer.length),
    }));
  }

  // FAQ가 없으면 카테고리별 기본 FAQ 생성
  const categoryFAQ = generateCategoryBasedFAQ(post);
  return categoryFAQ;
}

/**
 * 답변 길이에 따라 최적 AI 엔진 결정
 */
function determineTargetEngines(answerLength: number): string[] {
  if (answerLength < 200) {
    return ['Gemini', 'ChatGPT', 'BingCopilot'];
  } else if (answerLength < 400) {
    return ['ChatGPT', 'Perplexity', 'BingCopilot'];
  } else {
    return ['Claude', 'Perplexity', 'ChatGPT'];
  }
}

/**
 * 카테고리 기반 기본 FAQ 생성
 */
function generateCategoryBasedFAQ(post: BlogPost): AIOptimizedFAQ[] {
  const baseFAQs: Record<string, AIOptimizedFAQ[]> = {
    패밀리오피스: [
      {
        question: '패밀리오피스란 무엇인가요?',
        answer:
          '패밀리오피스는 고액자산가 가문의 종합 자산관리 기관입니다. 투자관리, 세무계획, 가업승계, 자산보전 등 가문의 모든 재정적 니즈를 통합적으로 관리합니다.',
        category: '패밀리오피스',
        targetEngines: ['ChatGPT', 'Gemini', 'BingCopilot'],
      },
      {
        question: '패밀리오피스 설립에 필요한 최소 자산 규모는?',
        answer:
          '일반적으로 관리자산 500억 원 이상이 권장됩니다. 하지만 멀티 패밀리오피스(MFO)를 활용하면 100억 원대부터도 전문적인 서비스를 받을 수 있습니다.',
        category: '패밀리오피스',
        targetEngines: ['Perplexity', 'ChatGPT', 'BingCopilot'],
      },
      {
        question: '패밀리오피스의 주요 서비스는?',
        answer:
          '투자자산 관리, 세무최적화, 기업승계 계획, 부동산 관리, 자녀 교육 및 경력 관리, 자선활동 조율, 법률 자문 등 가문의 전방위적 니즈를 지원합니다.',
        category: '패밀리오피스',
        targetEngines: ['ChatGPT', 'Gemini'],
      },
    ],
    투자전략: [
      {
        question: 'CEO를 위한 자산배분 전략은?',
        answer:
          '기업 경영 리스크를 고려한 분산 투자가 핵심입니다. 주식 30-40%, 채권 20-30%, 대체투자 20-30%, 부동산 10-20% 비중으로 포트폴리오를 구성하는 것이 일반적입니다.',
        category: '투자전략',
        targetEngines: ['Perplexity', 'Claude', 'ChatGPT'],
      },
      {
        question: '대체투자의 장점은 무엇인가요?',
        answer:
          '전통 자산과 낮은 상관관계로 포트폴리오 변동성을 줄이고, 인플레이션 헤지 효과가 있으며, 장기적으로 안정적인 수익을 추구할 수 있습니다.',
        category: '투자전략',
        targetEngines: ['Claude', 'Perplexity'],
      },
    ],
    세무최적화: [
      {
        question: '상속세 절세 전략의 핵심은?',
        answer:
          '사전 증여를 통한 분산, 가업승계 특례 활용, 공익법인 설립, 보험 활용 등 다양한 방법을 조합해야 합니다. 최소 10년 이상의 장기 계획이 필요합니다.',
        category: '세무최적화',
        targetEngines: ['BingCopilot', 'ChatGPT', 'Perplexity'],
      },
      {
        question: '증여세 절세 시 주의할 점은?',
        answer:
          '10년 단위로 증여 계획을 수립하고, 가업승계 특례를 최대한 활용하며, 증여 시점의 자산 가치 평가를 신중하게 진행해야 합니다.',
        category: '세무최적화',
        targetEngines: ['ChatGPT', 'BingCopilot'],
      },
    ],
    기업승계: [
      {
        question: '성공적인 기업승계의 조건은?',
        answer:
          '명확한 승계 계획, 후계자 역량 강화, 가족 간 합의, 세무 최적화 전략, 지배구조 개편이 필수적입니다. 최소 5-10년의 준비 기간이 필요합니다.',
        category: '기업승계',
        targetEngines: ['Claude', 'Perplexity', 'ChatGPT'],
      },
      {
        question: '가업승계 특례 요건은?',
        answer:
          '중소·중견기업, 10년 이상 계속 경영, 가업 영위 기간 20년(30% 공제) 또는 30년(40% 공제) 이상 등의 요건을 충족해야 합니다.',
        category: '기업승계',
        targetEngines: ['Perplexity', 'BingCopilot'],
      },
    ],
  };

  // 카테고리에 맞는 FAQ 반환, 없으면 기본 FAQ
  return baseFAQs[post.category] || baseFAQs['패밀리오피스'] || [];
}

/**
 * AI 검색엔진 최적화 메타데이터 생성
 */
export function generateAIOptimizedMetadata(post: BlogPost) {
  const aiKeywords = extractAIOptimizedKeywords(post);
  const bmadCategory =
    BLOG_CATEGORY_BMAD_MAPPING[post.category] || 'behavioral';

  return {
    // 기본 메타데이터
    title: `${post.title} | FamilyOffice S - 패밀리오피스 전문`,
    description: `${post.excerpt} - AI 검색엔진 최적화된 전문가 가이드`,
    keywords: aiKeywords.join(', '),

    // AI 검색엔진 특화
    aiOptimization: {
      bmadCategory,
      targetEngines: Object.keys(AI_ENGINE_OPTIMIZATION),
      contentFormat: '전문가 Q&A + 실무 가이드',
      optimizedFor: [
        'ChatGPT 검색',
        'Perplexity AI 검색',
        'Claude AI 검색',
        'Google Gemini',
        'Bing Copilot',
      ],
    },

    // Schema.org 확장
    aiEnhancedSchema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      keywords: aiKeywords,

      // AI 친화적 추가 필드
      educationalLevel: 'Professional',
      educationalUse: 'CEO 자산관리 가이드',
      audience: {
        '@type': 'Audience',
        audienceType: '중견기업 CEO',
        geographicArea: {
          '@type': 'Country',
          name: 'South Korea',
        },
      },

      // BMAD 카테고리 정보
      about: {
        '@type': 'Thing',
        name: post.category,
        description: `${bmadCategory.toUpperCase()} 카테고리 - ${post.category}`,
      },
    },
  };
}

/**
 * AI 검색엔진별 최적화 점수 계산
 */
export function calculateAIOptimizationScore(post: BlogPost): {
  overall: number;
  byEngine: Record<string, number>;
} {
  const scores: Record<string, number> = {};
  let totalScore = 0;

  // 각 AI 엔진별 최적화 점수 계산
  Object.entries(AI_ENGINE_OPTIMIZATION).forEach(([engine, config]) => {
    let engineScore = 0;

    // 콘텐츠 길이 적합성 (30%)
    const contentLength = post.content.length;
    const [minLen = 0, maxLen = Infinity] = config.optimalLength
      .split('-')
      .map(s => parseInt(s.replace('자', '')));
    if (
      minLen &&
      maxLen &&
      contentLength >= minLen &&
      contentLength <= maxLen
    ) {
      engineScore += 30;
    } else if (
      minLen &&
      maxLen &&
      contentLength >= minLen * 0.8 &&
      contentLength <= maxLen * 1.2
    ) {
      engineScore += 20;
    }

    // FAQ 존재 여부 (25%)
    if (post.faq && post.faq.length > 0) {
      engineScore += 25;
    }

    // 키워드 최적화 (25%)
    const aiKeywords = extractAIOptimizedKeywords(post);
    if (aiKeywords.length >= 10) {
      engineScore += 25;
    } else if (aiKeywords.length >= 5) {
      engineScore += 15;
    }

    // 구조화 데이터 (20%)
    if (post.tags && post.tags.length >= 5) {
      engineScore += 10;
    }
    if (post.category) {
      engineScore += 10;
    }

    scores[engine] = engineScore;
    totalScore += engineScore;
  });

  const engineCount = Object.keys(AI_ENGINE_OPTIMIZATION).length;

  return {
    overall: Math.round(totalScore / engineCount),
    byEngine: scores,
  };
}

/**
 * AI 검색엔진 최적화 권장사항 생성
 */
export function generateOptimizationRecommendations(post: BlogPost): string[] {
  const score = calculateAIOptimizationScore(post);
  const recommendations: string[] = [];

  // 전체 점수 기반 권장사항
  if (score.overall < 60) {
    recommendations.push(
      '📊 전반적인 AI 최적화가 필요합니다. FAQ 추가 및 키워드 강화를 권장합니다.'
    );
  }

  // FAQ 권장사항
  if (!post.faq || post.faq.length === 0) {
    recommendations.push(
      '❓ AI 검색엔진을 위한 FAQ 섹션을 추가하세요. 사용자 질문에 직접 답하는 형식이 효과적입니다.'
    );
  }

  // 키워드 권장사항
  const aiKeywords = extractAIOptimizedKeywords(post);
  if (aiKeywords.length < 10) {
    recommendations.push(
      '🔑 BMAD 키워드를 추가하여 검색 최적화를 강화하세요. 현재 ' +
        aiKeywords.length +
        '개 → 목표 10개 이상'
    );
  }

  // 콘텐츠 길이 권장사항
  if (post.content.length < 1000) {
    recommendations.push(
      '📝 콘텐츠를 확장하여 AI 검색엔진의 깊이 있는 분석을 지원하세요. (현재: ' +
        post.content.length +
        '자)'
    );
  }

  // 엔진별 최적화
  Object.entries(score.byEngine).forEach(([engine, engineScore]) => {
    if (engineScore < 50) {
      const config =
        AI_ENGINE_OPTIMIZATION[engine as keyof typeof AI_ENGINE_OPTIMIZATION];
      recommendations.push(
        `🤖 ${config.name}: ${config.preferredFormat} 형식 콘텐츠를 추가하세요.`
      );
    }
  });

  return recommendations;
}
