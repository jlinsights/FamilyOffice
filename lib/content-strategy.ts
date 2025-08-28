// 콘텐츠 마케팅 전략 시스템
// SuperClaude Framework + BMAD Method + AgentOS 통합

/**
 * 주간 콘텐츠 발행 일정
 * - 화요일 오전 7:30: 실무 중심 뉴스레터 (Behavioral + Decisional)
 * - 목요일 저녁 8:00: 전략 분석 블로그 (Motivational + Aspirational)  
 * - 금요일 오전 7:30: 주간 시장 분석 뉴스레터 (Market Intelligence)
 */

export interface ContentSchedule {
  day: 'tuesday' | 'thursday' | 'friday';
  time: string;
  type: 'newsletter' | 'blog';
  category: 'practical' | 'strategic' | 'market-analysis';
  bmdFocus: string[];
  targetAudience: string;
  expectedLength: number;
  seoKeywords: string[];
}

export const WEEKLY_CONTENT_SCHEDULE: ContentSchedule[] = [
  {
    day: 'tuesday',
    time: '07:30',
    type: 'newsletter',
    category: 'practical',
    bmdFocus: ['behavioral', 'decisional'],
    targetAudience: '성공한 중소중견기업 CEO',
    expectedLength: 800,
    seoKeywords: ['패밀리오피스 실무', 'CEO 자산관리', '기업가 실전 가이드', '가업승계 방법']
  },
  {
    day: 'thursday',
    time: '20:00',
    type: 'blog',
    category: 'strategic',
    bmdFocus: ['motivational', 'aspirational'],
    targetAudience: '성장 지향 기업가',
    expectedLength: 2500,
    seoKeywords: ['기업가 성장 전략', '자산관리 혁신', '미래 비전', '세계적 기업가문']
  },
  {
    day: 'friday',
    time: '07:30',
    type: 'newsletter',
    category: 'market-analysis',
    bmdFocus: ['behavioral', 'aspirational'],
    targetAudience: '투자 관심 기업가',
    expectedLength: 1000,
    seoKeywords: ['주간 시장 동향', '투자 기회', '경제 분석', '자산배분 전략']
  }
];

/**
 * 콘텐츠 템플릿 시스템
 */
export interface ContentTemplate {
  id: string;
  name: string;
  type: 'newsletter' | 'blog';
  structure: string[];
  bmdElements: Record<string, string>;
  seoOptimization: {
    titleFormula: string;
    metaDescriptionTemplate: string;
    keywordDensity: number;
    structuredDataType: string;
  };
}

export const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: 'tuesday-newsletter',
    name: '화요일 실무 가이드 뉴스레터',
    type: 'newsletter',
    structure: [
      '🎯 이번 주 핵심 이슈',
      '💡 실전 적용 가이드',
      '📋 체크리스트',
      '🔗 관련 리소스',
      '📞 전문가 상담 안내'
    ],
    bmdElements: {
      behavioral: '실제 기업가 사례와 경험 공유',
      decisional: '즉시 실행 가능한 구체적 방법 제시'
    },
    seoOptimization: {
      titleFormula: '[실무] {주제} | 성공한 CEO를 위한 실전 가이드',
      metaDescriptionTemplate: '성공한 기업가를 위한 실무 중심 {주제} 가이드. 즉시 적용 가능한 구체적 방법과 체크리스트 제공.',
      keywordDensity: 0.025,
      structuredDataType: 'Article'
    }
  },
  {
    id: 'thursday-blog',
    name: '목요일 전략 분석 블로그',
    type: 'blog', 
    structure: [
      '🔍 Executive Summary',
      '📊 현황 분석',
      '🚀 성장 전략',
      '✨ 미래 비전',
      '💎 핵심 인사이트',
      '🎯 실행 로드맵',
      '📈 성과 지표',
      '🔗 추가 자료'
    ],
    bmdElements: {
      motivational: '성취 동기와 성장 욕구 자극',
      aspirational: '미래 비전과 큰 그림 제시'
    },
    seoOptimization: {
      titleFormula: '{주제} 전략 분석: 성공한 기업가를 위한 심층 인사이트',
      metaDescriptionTemplate: '성장하는 기업가를 위한 {주제} 전략 분석. 전문가 관점의 심층 인사이트와 실행 가능한 로드맵 제공.',
      keywordDensity: 0.02,
      structuredDataType: 'BlogPosting'
    }
  },
  {
    id: 'friday-newsletter',
    name: '금요일 시장 분석 뉴스레터',
    type: 'newsletter',
    structure: [
      '📈 이번 주 시장 하이라이트',
      '🔍 주요 섹터 분석',
      '💰 투자 기회 포착',
      '⚠️ 리스크 요인',
      '📋 다음 주 주목할 이벤트',
      '🎯 추천 액션 아이템'
    ],
    bmdElements: {
      behavioral: '시장 데이터와 실제 투자 사례',
      aspirational: '투자를 통한 자산 성장 비전'
    },
    seoOptimization: {
      titleFormula: '주간 시장 분석 | {날짜} 투자 인사이트',
      metaDescriptionTemplate: '{날짜} 주간 시장 분석과 투자 기회. 성공한 기업가를 위한 전문적 시장 인사이트와 실행 가능한 투자 전략.',
      keywordDensity: 0.03,
      structuredDataType: 'NewsArticle'
    }
  }
];

/**
 * 콘텐츠 성과 측정 지표
 */
export interface ContentPerformanceMetrics {
  contentId: string;
  publishDate: Date;
  type: 'newsletter' | 'blog';
  title: string;
  
  // 참여 지표
  views: number;
  uniqueViews: number;
  readingTime: number;
  bounceRate: number;
  
  // 뉴스레터 지표
  opens?: number;
  openRate?: number;
  clicks?: number;
  clickRate?: number;
  unsubscribes?: number;
  
  // SEO 지표
  organicTraffic: number;
  searchRanking: Record<string, number>;
  backlinks: number;
  socialShares: number;
  
  // 비즈니스 지표
  consultationRequests: number;
  leadGenerated: number;
  conversionRate: number;
  
  // AI 검색엔진 지표
  aiMentions: Record<string, number>; // ChatGPT, Perplexity 등에서 언급 횟수
}

/**
 * 콘텐츠 생성기 클래스
 */
export class ContentGenerator {
  /**
   * 주제와 템플릿 기반 콘텐츠 구조 생성
   */
  static generateContentStructure(
    topic: string, 
    templateId: string, 
    _customData?: Record<string, any>
  ): {
    title: string;
    metaDescription: string;
    structure: Array<{ section: string; content: string; bmdElement?: string }>;
    keywords: string[];
    publishSchedule: Date;
  } {
    const template = CONTENT_TEMPLATES.find(t => t.id === templateId);
    if (!template) throw new Error('Invalid template ID');

    const title = template.seoOptimization.titleFormula.replace('{주제}', topic);
    const metaDescription = template.seoOptimization.metaDescriptionTemplate.replace('{주제}', topic);
    
    const structure = template.structure.map(section => {
      const element = this.getBMDElement(section, template.bmdElements);
      return {
        section,
        content: `${section}에 대한 ${topic} 관련 내용...`,
        ...(element && { bmdElement: element })
      };
    });

    return {
      title,
      metaDescription,
      structure,
      keywords: this.generateKeywords(topic, template.type),
      publishSchedule: this.getNextPublishDate(templateId)
    };
  }

  /**
   * BMAD Method 기반 키워드 생성
   */
  private static generateKeywords(topic: string, type: 'newsletter' | 'blog'): string[] {
    const baseKeywords = [
      `성공한 기업가 ${topic}`,
      `패밀리오피스 ${topic}`,
      `CEO ${topic} 전략`,
      `기업오너 ${topic} 가이드`
    ];

    const typeSpecificKeywords = type === 'blog' 
      ? [`${topic} 심층 분석`, `${topic} 전략적 접근`, `${topic} 미래 전망`]
      : [`${topic} 실무 가이드`, `${topic} 체크리스트`, `${topic} 즉시 적용`];

    return [...baseKeywords, ...typeSpecificKeywords];
  }

  /**
   * BMAD 요소 매핑
   */
  private static getBMDElement(section: string, bmdElements: Record<string, string>): string | undefined {
    if (section.includes('사례') || section.includes('경험')) return bmdElements.behavioral;
    if (section.includes('전략') || section.includes('성장')) return bmdElements.motivational;  
    if (section.includes('비전') || section.includes('미래')) return bmdElements.aspirational;
    if (section.includes('실행') || section.includes('방법')) return bmdElements.decisional;
    return undefined;
  }

  /**
   * 다음 발행일 계산
   */
  private static getNextPublishDate(templateId: string): Date {
    const now = new Date();
    const schedule = WEEKLY_CONTENT_SCHEDULE.find(s => 
      CONTENT_TEMPLATES.find(t => t.id === templateId)?.type === s.type
    );
    
    if (!schedule) return new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const targetDay = schedule.day === 'tuesday' ? 2 : 
                     schedule.day === 'thursday' ? 4 : 5; // friday

    const nextDate = new Date(now);
    const daysUntilTarget = (targetDay - now.getDay() + 7) % 7;
    nextDate.setDate(now.getDate() + (daysUntilTarget === 0 ? 7 : daysUntilTarget));
    
    const [hours, minutes] = schedule.time.split(':').map(Number);
    nextDate.setHours(hours || 0, minutes || 0, 0, 0);
    
    return nextDate;
  }
}

/**
 * 성과 측정 및 분석 클래스
 */
export class ContentAnalytics {
  /**
   * 콘텐츠 성과 종합 분석
   */
  static analyzeContentPerformance(metrics: ContentPerformanceMetrics[]): {
    overview: {
      totalViews: number;
      avgEngagement: number;
      topPerformingContent: string;
      conversionRate: number;
    };
    trends: {
      viewsTrend: number;
      engagementTrend: number;
      seoTrend: number;
      aiMentionsTrend: number;
    };
    recommendations: string[];
  } {
    const totalViews = metrics.reduce((sum, m) => sum + m.views, 0);
    const avgEngagement = metrics.reduce((sum, m) => sum + (1 - m.bounceRate), 0) / metrics.length;
    const topContent = metrics.sort((a, b) => b.views - a.views)[0];
    const totalConversions = metrics.reduce((sum, m) => sum + m.consultationRequests, 0);
    const conversionRate = totalViews > 0 ? (totalConversions / totalViews) * 100 : 0;

    return {
      overview: {
        totalViews,
        avgEngagement: Math.round(avgEngagement * 100),
        topPerformingContent: topContent?.title || 'N/A',
        conversionRate: Math.round(conversionRate * 100) / 100
      },
      trends: {
        viewsTrend: this.calculateTrend(metrics, 'views'),
        engagementTrend: this.calculateTrend(metrics, 'engagement'),
        seoTrend: this.calculateTrend(metrics, 'seo'),
        aiMentionsTrend: this.calculateTrend(metrics, 'ai')
      },
      recommendations: this.generateRecommendations(metrics)
    };
  }

  /**
   * 트렌드 계산 (간단한 구현)
   */
  private static calculateTrend(metrics: ContentPerformanceMetrics[], type: string): number {
    if (metrics.length < 2) return 0;
    
    const recent = metrics.slice(-4); // 최근 4개
    const previous = metrics.slice(-8, -4); // 이전 4개
    
    let recentAvg = 0, previousAvg = 0;
    
    switch (type) {
      case 'views':
        recentAvg = recent.reduce((sum, m) => sum + m.views, 0) / recent.length;
        previousAvg = previous.reduce((sum, m) => sum + m.views, 0) / previous.length;
        break;
      case 'engagement':
        recentAvg = recent.reduce((sum, m) => sum + (1 - m.bounceRate), 0) / recent.length;
        previousAvg = previous.reduce((sum, m) => sum + (1 - m.bounceRate), 0) / previous.length;
        break;
      // 추가 타입들...
    }
    
    return previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0;
  }

  /**
   * 개선 권장사항 생성
   */
  private static generateRecommendations(metrics: ContentPerformanceMetrics[]): string[] {
    const recommendations = [];
    
    const avgBounceRate = metrics.reduce((sum, m) => sum + m.bounceRate, 0) / metrics.length;
    if (avgBounceRate > 0.7) {
      recommendations.push('독자 참여를 높이기 위해 인터랙티브 요소 추가 권장');
    }
    
    const avgConversionRate = metrics.reduce((sum, m) => sum + m.conversionRate, 0) / metrics.length;
    if (avgConversionRate < 2) {
      recommendations.push('상담 예약으로의 전환율 개선을 위한 CTA 최적화 필요');
    }
    
    const blogMetrics = metrics.filter(m => m.type === 'blog');
    const newsletterMetrics = metrics.filter(m => m.type === 'newsletter');
    
    if (blogMetrics.length > 0 && newsletterMetrics.length > 0) {
      const blogAvgViews = blogMetrics.reduce((sum, m) => sum + m.views, 0) / blogMetrics.length;
      const newsletterAvgOpens = newsletterMetrics.reduce((sum, m) => sum + (m.opens || 0), 0) / newsletterMetrics.length;
      
      if (blogAvgViews < newsletterAvgOpens * 0.3) {
        recommendations.push('블로그 콘텐츠의 소셜 미디어 프로모션 강화 권장');
      }
    }
    
    return recommendations;
  }
}

/**
 * 콘텐츠 자동화 시스템
 */
export class ContentAutomation {
  /**
   * 주간 콘텐츠 일정 생성
   */
  static generateWeeklySchedule(startDate: Date = new Date()): Array<{
    date: Date;
    type: 'newsletter' | 'blog';
    category: string;
    suggestedTopic: string;
    templateId: string;
  }> {
    const schedule: Array<{
      date: Date;
      type: 'newsletter' | 'blog';
      category: string;
      suggestedTopic: string;
      templateId: string;
    }> = [];
    const currentDate = new Date(startDate);
    
    // 다음 4주간의 콘텐츠 일정 생성
    for (let week = 0; week < 4; week++) {
      WEEKLY_CONTENT_SCHEDULE.forEach(item => {
        const contentDate = new Date(currentDate);
        const targetDay = item.day === 'tuesday' ? 2 : item.day === 'thursday' ? 4 : 5;
        const daysToAdd = (targetDay - currentDate.getDay() + 7) % 7 + (week * 7);
        contentDate.setDate(currentDate.getDate() + daysToAdd);
        
        const [hours, minutes] = item.time.split(':').map(Number);
        contentDate.setHours(hours || 0, minutes || 0, 0, 0);
        
        schedule.push({
          date: contentDate,
          type: item.type,
          category: item.category,
          suggestedTopic: this.generateTopicSuggestion(item),
          templateId: item.type === 'newsletter' 
            ? (item.day === 'tuesday' ? 'tuesday-newsletter' : 'friday-newsletter')
            : 'thursday-blog'
        });
      });
    }
    
    return schedule.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * 주제 제안 생성
   */
  private static generateTopicSuggestion(schedule: ContentSchedule): string {
    const topics = {
      practical: [
        '중소기업 CEO를 위한 절세 체크리스트',
        '가업승계 준비 단계별 가이드',
        '기업보험 최적화 실무',
        '법인과 개인자산 분리 전략'
      ],
      strategic: [
        '2024년 패밀리오피스 트렌드 분석',
        '성공한 기업가의 자산배분 전략',
        '차세대 기업가 양성 로드맵',
        '글로벌 자산관리 전략'
      ],
      'market-analysis': [
        '이번 주 주요 경제 지표 분석',
        '섹터별 투자 기회 분석',
        '환율 변동과 자산관리 전략',
        '부동산 시장 동향과 대응책'
      ]
    };
    
    const categoryTopics = topics[schedule.category as keyof typeof topics] || topics.practical;
    const topicIndex = Math.floor(Math.random() * categoryTopics.length);
    return categoryTopics[topicIndex] || '기본 주제';
  }
}

// 전역 인스턴스
export const contentGenerator = ContentGenerator;
export const contentAnalytics = ContentAnalytics;
export const contentAutomation = ContentAutomation;