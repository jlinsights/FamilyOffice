/**
 * 인바운드 마케팅 자동화 시스템
 * SEO 최적화된 컨텐츠 자동 생성 및 배포
 */
import { CONTENT_KEYWORD_MAPPING, KEYWORD_CLUSTERS } from './keyword-strategy';

export interface ContentTemplate {
  type: 'blog' | 'guide' | 'case-study' | 'faq' | 'landing-page';
  title: string;
  description: string;
  targetKeywords: string[];
  outline: string[];
  callToAction: string;
  estimatedWordCount: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    type: 'schedule' | 'event' | 'keyword-opportunity';
    schedule?: string; // cron expression
    event?: string;
    keywordThreshold?: number;
  };
  action: {
    type:
      | 'generate-content'
      | 'optimize-existing'
      | 'update-metadata'
      | 'create-internal-links';
    template?: ContentTemplate;
    targetPages?: string[];
    config?: Record<string, unknown>;
  };
  enabled: boolean;
  retryPolicy?: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number;
  };
}

export interface ContentCalendar {
  date: string;
  title: string;
  type: 'blog' | 'seminar' | 'newsletter' | 'social';
  status: 'planned' | 'in-progress' | 'completed' | 'published';
  targetKeywords: string[];
  assignee?: string;
  dueDate?: string;
  publishDate?: Date;
  bmadCategory?: string;
  targetAudience?: string;
  description?: string;
  topics?: string[];
}

/**
 * 컨텐츠 템플릿 생성기
 */
export function generateContentTemplate(
  targetKeyword: string,
  contentType: ContentTemplate['type'],
  targetAudience: 'ceo' | 'high-net-worth' | 'mid-market' = 'ceo'
): ContentTemplate {
  const keywordCluster = Object.values(KEYWORD_CLUSTERS).find(
    cluster =>
      cluster.primary === targetKeyword ||
      cluster.secondary.includes(targetKeyword) ||
      cluster.longtail.includes(targetKeyword)
  );

  if (!keywordCluster) {
    throw new Error(`키워드 클러스터를 찾을 수 없습니다: ${targetKeyword}`);
  }

  const audienceMapping = {
    ceo: '중견기업 CEO',
    'high-net-worth': '개인자산 30억+ 고액자산가',
    'mid-market': '성장하는 중소기업 대표',
  };

  const templates: Record<ContentTemplate['type'], Partial<ContentTemplate>> = {
    blog: {
      outline: [
        `${targetKeyword}의 중요성과 현재 트렌드`,
        `${audienceMapping[targetAudience]}가 알아야 할 핵심 포인트`,
        '성공 사례 및 실제 적용 방법',
        '전문가 조언 및 실행 가이드',
        '자주 묻는 질문과 답변',
        '다음 단계 및 전문 상담 안내',
      ],
      callToAction: '전문가와 맞춤형 상담을 받아보세요',
      estimatedWordCount: 1500,
    },
    guide: {
      outline: [
        `${targetKeyword} 완전 가이드 소개`,
        '기본 개념과 필요성 이해',
        '단계별 실행 방법론',
        '실무 체크리스트 및 도구',
        '주의사항 및 전문가 팁',
        '성공적인 결과를 위한 후속 조치',
      ],
      callToAction: '무료 실행 체크리스트 다운로드',
      estimatedWordCount: 2500,
    },
    'case-study': {
      outline: [
        '고객 배경 및 도전 과제',
        `${targetKeyword} 적용 전략 수립`,
        '단계별 실행 과정',
        '결과 및 성과 분석',
        '얻은 교훈 및 인사이트',
        '유사한 상황에서의 적용 방법',
      ],
      callToAction: '비슷한 성과를 원한다면 상담 신청',
      estimatedWordCount: 2000,
    },
    faq: {
      outline: [
        `${targetKeyword} 관련 가장 많이 묻는 질문들`,
        '기본 개념 관련 Q&A',
        '실행 과정 관련 Q&A',
        '비용 및 시간 관련 Q&A',
        '성과 및 결과 관련 Q&A',
        '전문가 상담 관련 Q&A',
      ],
      callToAction: '추가 궁금한 점이 있다면 전문가 상담',
      estimatedWordCount: 1200,
    },
    'landing-page': {
      outline: [
        `${targetKeyword} 전문 서비스 소개`,
        `${audienceMapping[targetAudience]}를 위한 맞춤형 솔루션`,
        '핵심 서비스 및 차별화 포인트',
        '성공 사례 및 고객 후기',
        '서비스 프로세스 및 진행 방식',
        '무료 상담 및 시작하기',
      ],
      callToAction: '지금 바로 무료 상담 신청',
      estimatedWordCount: 1000,
    },
  };

  const template = templates[contentType];
  const relatedKeywords = [
    keywordCluster.primary,
    ...keywordCluster.secondary.slice(0, 3),
    ...keywordCluster.longtail.slice(0, 2),
  ];

  return {
    type: contentType,
    title: generateContentTitle(targetKeyword, contentType, targetAudience),
    description: generateContentDescription(
      targetKeyword,
      contentType,
      targetAudience
    ),
    targetKeywords: relatedKeywords,
    outline: template.outline || [],
    callToAction: template.callToAction || '전문가 상담 받기',
    estimatedWordCount: template.estimatedWordCount || 1500,
  };
}

/**
 * 컨텐츠 제목 생성
 */
function generateContentTitle(
  keyword: string,
  type: ContentTemplate['type'],
  audience: string
): string {
  const titleTemplates = {
    blog: [
      `${keyword} 완벽 가이드: 성공한 CEO들이 선택하는 방법`,
      `2024년 ${keyword} 트렌드와 성공 전략`,
      `${keyword} 실무진이 알려주는 핵심 포인트 7가지`,
      `성공한 기업가들의 ${keyword} 성공 사례`,
    ],
    guide: [
      `${keyword} 실행 가이드: 단계별 완벽 매뉴얼`,
      `${keyword} A to Z: 전문가가 알려주는 모든 것`,
      `성공적인 ${keyword}를 위한 완전 가이드`,
    ],
    'case-study': [
      `${keyword} 성공 사례: OO기업 40% 절세 달성기`,
      `실제 고객 사례로 보는 ${keyword} 성공 스토리`,
      `${keyword} 도입으로 이룬 놀라운 성과`,
    ],
    faq: [
      `${keyword} 자주 묻는 질문 완전 정리`,
      `${keyword} Q&A: 전문가가 답하는 모든 것`,
      `${keyword} 궁금증 해결: 실무진 답변 모음`,
    ],
    'landing-page': [
      `전문 ${keyword} 서비스 | 성공한 CEO들의 선택`,
      `${keyword} 전문 컨설팅 | 맞춤형 솔루션`,
      `프리미엄 ${keyword} 서비스 | 검증된 전문성`,
    ],
  };

  const templates = titleTemplates[type];
  const selectedTemplate =
    templates[Math.floor(Math.random() * templates.length)];
  return selectedTemplate || `${keyword} 전문 가이드`;
}

/**
 * 컨텐츠 설명 생성
 */
function generateContentDescription(
  keyword: string,
  type: ContentTemplate['type'],
  audience: string
): string {
  const audienceText =
    audience === 'ceo'
      ? '중견기업 CEO'
      : audience === 'high-net-worth'
        ? '개인자산 30억+ 고액자산가'
        : '성장하는 중소기업 대표';

  const descriptionTemplates = {
    blog: `${audienceText}를 위한 ${keyword} 전문 가이드. 실무 경험을 바탕으로 한 실행 가능한 전략과 성공 사례를 통해 ${keyword}의 모든 것을 알아보세요.`,
    guide: `${keyword} 실행을 위한 단계별 완벽 가이드. ${audienceText}가 알아야 할 핵심 내용과 실무 체크리스트를 제공합니다.`,
    'case-study': `실제 고객의 ${keyword} 성공 사례를 통해 구체적인 실행 방법과 성과를 확인해보세요. ${audienceText}를 위한 검증된 솔루션입니다.`,
    faq: `${keyword}에 대해 가장 많이 묻는 질문들과 전문가 답변을 정리했습니다. ${audienceText}의 궁금증을 해결해드립니다.`,
    'landing-page': `${audienceText}를 위한 전문 ${keyword} 서비스. 20년 경력의 전문가들이 맞춤형 솔루션을 제공합니다.`,
  };

  return descriptionTemplates[type];
}

/**
 * 자동화 규칙 생성
 */
export function createAutomationRule(
  name: string,
  triggerType: AutomationRule['trigger']['type'],
  actionType: AutomationRule['action']['type'],
  options: Partial<AutomationRule> = {}
): AutomationRule {
  const id = `automation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const defaultRules: Record<string, Partial<AutomationRule>> = {
    'weekly-blog': {
      trigger: { type: 'schedule', schedule: '0 9 * * 2' }, // 매주 화요일 9시
      action: {
        type: 'generate-content',
        template: generateContentTemplate('자산관리', 'blog'),
      },
    },
    'keyword-opportunity': {
      trigger: { type: 'keyword-opportunity', keywordThreshold: 100 },
      action: { type: 'generate-content' },
    },
    'monthly-optimization': {
      trigger: { type: 'schedule', schedule: '0 2 1 * *' }, // 매월 1일 2시
      action: {
        type: 'optimize-existing',
        targetPages: ['/', '/services', '/solutions'],
      },
    },
  };

  const baseRule = defaultRules[name] || {};

  return {
    id,
    name,
    trigger: {
      type: triggerType,
      ...baseRule.trigger,
      ...options.trigger,
    },
    action: {
      type: actionType,
      ...baseRule.action,
      ...options.action,
    },
    enabled: options.enabled ?? true,
  };
}

/**
 * 컨텐츠 캘린더 생성
 */
export function generateContentCalendar(
  startDate: Date,
  endDate: Date,
  targetKeywords: string[] = []
): ContentCalendar[] {
  const calendar: ContentCalendar[] = [];
  const currentDate = new Date(startDate);

  // 기본 컨텐츠 스케줄 패턴
  const contentPatterns = [
    { day: 2, type: 'blog' as const, title: '실무 가이드' }, // 화요일
    { day: 4, type: 'newsletter' as const, title: '주간 인사이트' }, // 목요일
    { day: 5, type: 'blog' as const, title: '전략 분석' }, // 금요일
  ];

  // 월별 특별 컨텐츠
  const monthlyContent = [
    { week: 1, type: 'seminar' as const, title: '월간 세미나' },
    { week: 3, type: 'blog' as const, title: '사례 분석' },
  ];

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const weekOfMonth = Math.ceil(currentDate.getDate() / 7);

    // 일반 컨텐츠 패턴 확인
    const pattern = contentPatterns.find(p => p.day === dayOfWeek);
    if (pattern) {
      const keyword =
        targetKeywords[Math.floor(Math.random() * targetKeywords.length)] ||
        '자산관리';

      const dateString = currentDate.toISOString().split('T')[0];
      const dueDateString = new Date(
        currentDate.getTime() - 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0];

      if (dateString && dueDateString) {
        calendar.push({
          date: dateString,
          title: `${pattern.title}: ${keyword}`,
          type: pattern.type,
          status: 'planned',
          targetKeywords: [keyword],
          dueDate: dueDateString, // 하루 전 마감
        });
      }
    }

    // 월별 특별 컨텐츠 확인
    const monthlyPattern = monthlyContent.find(
      p => p.week === weekOfMonth && dayOfWeek === 3
    ); // 수요일
    if (monthlyPattern) {
      const monthlyDateString = currentDate.toISOString().split('T')[0];
      const monthlyDueDateString = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0];

      if (monthlyDateString && monthlyDueDateString) {
        calendar.push({
          date: monthlyDateString,
          title: monthlyPattern.title,
          type: monthlyPattern.type,
          status: 'planned',
          targetKeywords: ['패밀리오피스', '자산관리'],
          dueDate: monthlyDueDateString, // 일주일 전 마감
        });
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendar.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/**
 * A/B 테스트 자동화
 */
export interface ABTestConfig {
  id: string;
  name: string;
  targetPage: string;
  variants: {
    id: string;
    name: string;
    changes: {
      element: string;
      property: string;
      value: string;
    }[];
  }[];
  trafficSplit: number; // 0-100
  metrics: string[];
  duration: number; // days
  status: 'draft' | 'running' | 'completed' | 'paused';
}

export function createABTest(
  name: string,
  targetPage: string,
  variants: ABTestConfig['variants'],
  options: Partial<ABTestConfig> = {}
): ABTestConfig {
  return {
    id: `abtest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    targetPage,
    variants: [{ id: 'control', name: '기존 버전', changes: [] }, ...variants],
    trafficSplit: options.trafficSplit ?? 50,
    metrics: options.metrics ?? [
      'conversion_rate',
      'bounce_rate',
      'time_on_page',
    ],
    duration: options.duration ?? 14,
    status: options.status ?? 'draft',
  };
}

/**
 * 자동 내부 링크 제안
 */
export function generateInternalLinkSuggestions(
  content: string,
  currentUrl: string
): Array<{
  text: string;
  url: string;
  context: string;
  relevanceScore: number;
}> {
  const suggestions: Array<{
    text: string;
    url: string;
    context: string;
    relevanceScore: number;
  }> = [];

  // 컨텐츠에서 키워드 추출
  const detectedKeywords = Object.values(KEYWORD_CLUSTERS).filter(cluster => {
    return (
      cluster.secondary.some(keyword =>
        content.toLowerCase().includes(keyword.toLowerCase())
      ) ||
      cluster.longtail.some(keyword =>
        content.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  });

  // 관련 페이지 찾기
  detectedKeywords.forEach(cluster => {
    const relatedMapping = CONTENT_KEYWORD_MAPPING.find(
      mapping =>
        mapping.cluster === cluster.primary.replace(/\s+/g, '_').toLowerCase()
    );

    if (relatedMapping && relatedMapping.url !== currentUrl) {
      const keyword = cluster.secondary[0] || cluster.primary;
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = content.match(regex);

      if (matches && matches.length > 0) {
        // 문맥 추출
        const keywordIndex = content
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        const start = Math.max(0, keywordIndex - 50);
        const end = Math.min(content.length, keywordIndex + 50);
        const context = content.substring(start, end);

        suggestions.push({
          text: keyword,
          url: relatedMapping.url,
          context: context.replace(regex, `<strong>${keyword}</strong>`),
          relevanceScore: calculateRelevanceScore(keyword, content, cluster),
        });
      }
    }
  });

  return suggestions
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5); // 상위 5개만 반환
}

/**
 * 관련성 점수 계산
 */
function calculateRelevanceScore(
  keyword: string,
  content: string,
  cluster: (typeof KEYWORD_CLUSTERS)[keyof typeof KEYWORD_CLUSTERS]
): number {
  let score = 0;

  // 키워드 등장 빈도
  const keywordCount = (
    content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []
  ).length;
  score += Math.min(keywordCount * 2, 10);

  // 관련 키워드 등장
  cluster.secondary.forEach(relatedKeyword => {
    if (content.toLowerCase().includes(relatedKeyword.toLowerCase())) {
      score += 1;
    }
  });

  // 의도 기반 가중치
  const intentWeight = {
    commercial: 3,
    transactional: 2.5,
    informational: 2,
    navigational: 1.5,
  };
  score *= intentWeight[cluster.intent];

  return Math.min(score, 10); // 최대 10점
}

/**
 * 인바운드 마케팅 성과 추적
 */
export interface MarketingMetrics {
  period: string;
  organicTraffic: number;
  keywordRankings: Record<string, number>;
  conversionRate: number;
  leadGeneration: number;
  contentEngagement: {
    averageTimeOnPage: number;
    bounceRate: number;
    pagesPerSession: number;
  };
  roi: number;
}

export function calculateMarketingROI(
  metrics: MarketingMetrics,
  investmentAmount: number
): {
  roi: number;
  costPerLead: number;
  ltv: number;
  recommendations: string[];
} {
  const revenue = metrics.leadGeneration * 5000000; // 평균 고객 가치 500만원 가정
  const roi = ((revenue - investmentAmount) / investmentAmount) * 100;
  const costPerLead = investmentAmount / Math.max(metrics.leadGeneration, 1);
  const ltv = 5000000 * 3; // 평균 고객 생애 가치

  const recommendations: string[] = [];

  if (roi < 200) {
    recommendations.push('컨버전율 개선을 위한 A/B 테스트 실시');
  }
  if (
    metrics.keywordRankings &&
    Object.values(metrics.keywordRankings).some(rank => rank > 10)
  ) {
    recommendations.push('상위 키워드 타겟팅 전략 강화');
  }
  if (metrics.contentEngagement.bounceRate > 60) {
    recommendations.push('컨텐츠 품질 및 사용자 경험 개선');
  }
  if (costPerLead > 100000) {
    recommendations.push('리드 생성 프로세스 최적화');
  }

  return {
    roi,
    costPerLead,
    ltv,
    recommendations,
  };
}

const inboundMarketingAutomation = {
  generateContentTemplate,
  createAutomationRule,
  generateContentCalendar,
  createABTest,
  generateInternalLinkSuggestions,
  calculateMarketingROI,
};

export default inboundMarketingAutomation;
