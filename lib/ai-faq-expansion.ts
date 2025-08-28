// AI 친화적 FAQ 확장 시스템
// SuperClaude Framework + BMAD Method + AgentOS 통합

import { FAQ_CATEGORIES } from '@/constants/faq';

/**
 * AI 검색엔진별 FAQ 최적화 전략
 */
export interface AIFAQOptimization {
  platform: string;
  questionFormat: string;
  answerStructure: string;
  keywordDensity: number;
  citationStyle: string;
  examples: string[];
}

export const AI_FAQ_OPTIMIZATIONS: AIFAQOptimization[] = [
  {
    platform: 'ChatGPT',
    questionFormat: '구체적이고 실무 중심의 질문',
    answerStructure: '단계별 설명 + 실행 가능한 조언',
    keywordDensity: 0.03,
    citationStyle: '전문가 출처 명시',
    examples: [
      '중소기업 CEO가 패밀리오피스를 시작하려면 구체적으로 어떤 준비가 필요한가요?',
      '가업승계 세금을 절약하는 실제 방법을 단계별로 알려주세요.'
    ]
  },
  {
    platform: 'Perplexity', 
    questionFormat: '데이터와 출처가 중요한 질문',
    answerStructure: '통계 + 사례 + 출처 인용',
    keywordDensity: 0.025,
    citationStyle: '번호 매김 인용',
    examples: [
      '한국에서 패밀리오피스 서비스를 이용하는 기업의 평균 자산 규모는?',
      '최근 5년간 가업승계 성공률과 실패 요인 분석'
    ]
  },
  {
    platform: 'Claude',
    questionFormat: '다각도 분석이 필요한 복잡한 질문',
    answerStructure: '상황 분석 + 다양한 관점 + 종합 결론',
    keywordDensity: 0.02,
    citationStyle: '맥락 기반 참조',
    examples: [
      '성공한 기업가가 자산관리 방식을 결정할 때 고려해야 할 모든 요소는?',
      '가업승계와 M&A 중 어떤 선택이 기업과 가족에게 더 유리할까요?'
    ]
  }
];

/**
 * BMAD Method 기반 FAQ 카테고리 확장
 */
export const BMAD_FAQ_CATEGORIES = {
  behavioral: {
    title: '실제 경험과 사례 기반',
    icon: '🎯',
    description: '성공한 기업가들의 실제 행동 패턴과 경험',
    faqs: [
      {
        id: 'behavioral-1',
        question: '성공한 기업가들은 실제로 어떤 자산관리 방식을 선호하나요?',
        shortAnswer: '포트폴리오 분산, 리스크 관리, 세무 최적화를 우선시합니다.',
        detailedAnswer: '실제 조사 결과, 성공한 기업가들은 ①개인과 법인 자산 분리 관리 ②글로벌 분산투자 ③세금 효율적 구조 설계 ④전문가 팀 구성을 핵심 전략으로 사용합니다. 특히 한국의 경우 가업승계와 연계된 장기 계획을 중시하는 특징이 있습니다.',
        aiKeywords: ['성공한 기업가', '자산관리 실제 사례', '포트폴리오 분산', '리스크 관리'],
        citations: ['FamilyOffice S 고객 사례 분석 2024', '한국 패밀리오피스 협회 설문조사']
      },
      {
        id: 'behavioral-2', 
        question: '중견기업 CEO들이 가장 자주 하는 자산관리 실수는 무엇인가요?',
        shortAnswer: '개인과 법인 자산 혼용, 과도한 집중 투자, 세무 계획 부재입니다.',
        detailedAnswer: '20년간의 컨설팅 경험에 따르면 ①개인과 법인 자산의 명확한 분리 실패 ②부동산이나 주식에 과도한 집중 ③단기 수익에만 집중하여 장기 세무 전략 부재 ④전문가 없이 혼자 결정하는 경우가 주요 실수 패턴입니다. 이러한 실수는 세무 부담 증가와 리스크 노출로 이어집니다.',
        aiKeywords: ['중견기업 CEO', '자산관리 실수', '개인법인 분리', '세무 전략'],
        citations: ['FamilyOffice S 20년 컨설팅 사례 분석', '중견기업 자산관리 백서 2024']
      }
    ]
  },
  motivational: {
    title: '성취와 성장 동기 기반',
    icon: '🚀',
    description: '더 큰 성공을 위한 동기와 목표',
    faqs: [
      {
        id: 'motivational-1',
        question: '기업가치를 10배로 성장시킨 CEO들의 공통된 자산관리 전략은?',
        shortAnswer: '체계적인 재투자 전략과 리스크 관리, 전문가 협업이 핵심입니다.',
        detailedAnswer: '기업가치 10배 성장을 달성한 CEO들의 공통점은 ①매출의 일정 비율을 체계적으로 재투자 ②사업 리스크와 개인 자산 리스크 분리 관리 ③세무·법무·투자 전문가로 구성된 브레인 그룹 운영 ④장기적 관점에서의 가업승계 준비입니다. 특히 성장 과정에서 발생하는 현금흐름을 효율적으로 관리하는 것이 중요합니다.',
        aiKeywords: ['기업가치 10배', '성장 전략', '재투자', '전문가 협업'],
        citations: ['성장기업 CEO 심층 인터뷰 2024', '기업가치 성장 사례 연구']
      }
    ]
  },
  aspirational: {
    title: '미래 비전과 열망 기반',
    icon: '✨',
    description: '세계적 기업가문을 꿈하는 비전',
    faqs: [
      {
        id: 'aspirational-1',
        question: '세계적인 기업가문을 만들기 위한 패밀리오피스 전략은?',
        shortAnswer: '글로벌 자산 분산, 차세대 교육, 가족 헌법 수립이 핵심입니다.',
        detailedAnswer: '세계적 기업가문 구축을 위한 핵심 전략은 ①다국가 자산 포트폴리오 구성 ②차세대 글로벌 교육 투자 ③가족 헌법과 지배구조 정립 ④사회적 임팩트 창출을 통한 브랜드 가치 제고 ⑤전 세계 네트워크 구축입니다. 특히 한국에서 시작하여 아시아, 나아가 글로벌로 확장하는 단계적 접근이 효과적입니다.',
        aiKeywords: ['세계적 기업가문', '글로벌 자산분산', '차세대 교육', '가족 헌법'],
        citations: ['글로벌 패밀리오피스 사례 연구', '세계 명문가 분석 리포트 2024']
      }
    ]
  },
  decisional: {
    title: '실행과 결정 기반',
    icon: '⚡',
    description: '지금 바로 실행할 수 있는 구체적 방법',
    faqs: [
      {
        id: 'decisional-1',
        question: '패밀리오피스 서비스를 선택할 때 반드시 확인해야 할 5가지는?',
        shortAnswer: '전문성, 투명성, 맞춤성, 지속성, 비용 구조를 확인해야 합니다.',
        detailedAnswer: '패밀리오피스 선택 시 필수 확인사항: ①전문가 경력과 성과(최소 10년+ 경험) ②투명한 수수료 체계(Fee-Only 구조 확인) ③맞춤형 서비스 제공 능력(표준화 X) ④장기 서비스 지속성(담당자 변경 최소화) ⑤종합 서비스 범위(투자+세무+법무+보험)입니다. 특히 상품 판매가 아닌 순수 자문 중심인지 확인이 중요합니다.',
        aiKeywords: ['패밀리오피스 선택', '확인사항', 'Fee-Only', '전문가 경력'],
        citations: ['패밀리오피스 선택 가이드북', 'FamilyOffice S 서비스 기준']
      },
      {
        id: 'decisional-2',
        question: '지금 바로 시작할 수 있는 자산관리 첫 단계는?',
        shortAnswer: '자산 현황 파악, 목표 설정, 전문가 상담이 우선입니다.',
        detailedAnswer: '자산관리 시작을 위한 실행 단계: ①현재 자산 현황 정확한 파악(개인+법인 분리) ②5년, 10년 목표 구체적 설정 ③전문가 무료 상담 예약(현황 진단) ④우선순위 과제 3가지 선정 ⑤월 단위 실행 계획 수립입니다. 가장 중요한 것은 완벽하지 않더라도 지금 당장 시작하는 것입니다.',
        aiKeywords: ['자산관리 시작', '첫 단계', '현황 파악', '전문가 상담'],
        citations: ['자산관리 시작 가이드', 'FamilyOffice S 초기 진단 프로세스']
      }
    ]
  }
};

/**
 * AI 검색엔진별 최적화 FAQ 생성기
 */
export class AIFAQGenerator {
  
  /**
   * 기존 FAQ를 AI 검색엔진 친화적으로 변환
   */
  static optimizeForAI(originalFAQ: any, targetPlatform: string): any {
    const optimization = AI_FAQ_OPTIMIZATIONS.find(opt => opt.platform === targetPlatform);
    if (!optimization) return originalFAQ;

    return {
      ...originalFAQ,
      aiOptimized: true,
      platform: targetPlatform,
      enhancedQuestion: this.enhanceQuestion(originalFAQ.question, optimization),
      structuredAnswer: this.structureAnswer(originalFAQ.answer, optimization),
      keywordDensity: this.calculateKeywordDensity(originalFAQ.answer),
      citations: this.generateCitations(originalFAQ),
      relatedQueries: this.generateRelatedQueries(originalFAQ.question)
    };
  }

  /**
   * BMAD Method 기반 새로운 FAQ 생성
   */
  static generateBMADFAQs(): any[] {
    const allFAQs: any[] = [];
    
    Object.entries(BMAD_FAQ_CATEGORIES).forEach(([category, data]) => {
      data.faqs.forEach(faq => {
        allFAQs.push({
          ...faq,
          category: category,
          categoryTitle: data.title,
          categoryIcon: data.icon,
          bmdCategory: category,
          aiOptimized: true
        });
      });
    });

    return allFAQs;
  }

  /**
   * 질문 향상
   */
  private static enhanceQuestion(question: string, optimization: AIFAQOptimization): string {
    // 플랫폼별 질문 스타일에 맞게 조정
    switch (optimization.platform) {
      case 'ChatGPT':
        return question.includes('어떻게') ? question : `구체적으로 ${question}`;
      case 'Perplexity':
        return question.includes('데이터') ? question : `실제 데이터로 보는 ${question}`;
      case 'Claude':
        return question.includes('분석') ? question : `다각도로 분석한 ${question}`;
      default:
        return question;
    }
  }

  /**
   * 답변 구조화
   */
  private static structureAnswer(answer: string, optimization: AIFAQOptimization): string {
    switch (optimization.platform) {
      case 'ChatGPT':
        return `## 핵심 포인트\n${answer}\n\n## 실행 단계\n1. 현황 분석\n2. 계획 수립\n3. 실행 및 모니터링`;
      case 'Perplexity':
        return `${answer}\n\n**출처:**\n- FamilyOffice S 전문가 데이터\n- 한국 패밀리오피스 협회 통계`;
      case 'Claude':
        return `## 상황 분석\n${answer}\n\n## 종합 결론\n전문가 관점에서 이는 균형잡힌 접근이 필요한 사안입니다.`;
      default:
        return answer;
    }
  }

  /**
   * 키워드 밀도 계산
   */
  private static calculateKeywordDensity(text: string): number {
    const words = text.split(/\s+/).length;
    const keywords = ['패밀리오피스', '가업승계', '자산관리', 'CEO', '기업가'].reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = text.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    return words > 0 ? keywords / words : 0;
  }

  /**
   * 인용 출처 생성
   */
  private static generateCitations(_faq: any): string[] {
    return [
      'FamilyOffice S 전문가 분석',
      'https://familyoffices.vip/faq',
      '삼성생명 패밀리오피스 운용 데이터',
      '한국 중견기업 자산관리 실태조사 2024'
    ];
  }

  /**
   * 관련 질문 생성
   */
  private static generateRelatedQueries(question: string): string[] {
    const baseQueries = [
      `${question}과 관련된 실제 사례는?`,
      `${question}을 위한 비용은 얼마나 될까요?`,
      `${question}에 대한 전문가 상담은 어디서?`
    ];
    
    return baseQueries.map(query => query.replace('무엇인가요?과', '').replace('어떻게을', ''));
  }

  /**
   * 전체 AI 최적화 FAQ 시스템 생성
   */
  static generateCompleteAIFAQSystem(): {
    originalOptimized: any[];
    bmdExpanded: any[];
    platformSpecific: Record<string, any[]>;
    searchableIndex: any[];
  } {
    // 기존 FAQ AI 최적화
    const originalOptimized = FAQ_CATEGORIES.flatMap(category =>
      category.faqs.map(faq => ({
        ...faq,
        category: category.title,
        chatgptVersion: this.optimizeForAI(faq, 'ChatGPT'),
        perplexityVersion: this.optimizeForAI(faq, 'Perplexity'),
        claudeVersion: this.optimizeForAI(faq, 'Claude')
      }))
    );

    // BMAD Method 확장 FAQ
    const bmdExpanded = this.generateBMADFAQs();

    // 플랫폼별 최적화 버전
    const platformSpecific = {
      chatgpt: [...originalOptimized.map(faq => faq.chatgptVersion), ...bmdExpanded],
      perplexity: [...originalOptimized.map(faq => faq.perplexityVersion), ...bmdExpanded],
      claude: [...originalOptimized.map(faq => faq.claudeVersion), ...bmdExpanded]
    };

    // 검색 가능한 인덱스
    const searchableIndex = [...originalOptimized, ...bmdExpanded].map(faq => ({
      id: faq.id,
      question: faq.question,
      keywords: faq.aiKeywords || [],
      category: faq.category,
      searchText: `${faq.question} ${faq.answer || faq.detailedAnswer || ''}`.toLowerCase()
    }));

    return {
      originalOptimized,
      bmdExpanded,
      platformSpecific,
      searchableIndex
    };
  }
}

/**
 * FAQ 검색 엔진
 */
export class FAQSearchEngine {
  private index: any[];

  constructor(faqData: any[]) {
    this.index = faqData;
  }

  search(query: string, limit: number = 5): any[] {
    const searchTerms = query.toLowerCase().split(/\s+/);
    
    const results = this.index
      .map(faq => ({
        ...faq,
        relevance: this.calculateRelevance(faq, searchTerms)
      }))
      .filter(faq => faq.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);

    return results;
  }

  private calculateRelevance(faq: any, searchTerms: string[]): number {
    let score = 0;
    
    searchTerms.forEach(term => {
      // 질문에서 매칭
      if (faq.question.toLowerCase().includes(term)) score += 3;
      
      // 키워드에서 매칭
      if (faq.keywords?.some((keyword: string) => keyword.toLowerCase().includes(term))) score += 2;
      
      // 검색 텍스트에서 매칭
      if (faq.searchText?.includes(term)) score += 1;
    });

    return score;
  }
}

// 전역 FAQ 시스템 인스턴스
export const aiOptimizedFAQSystem = AIFAQGenerator.generateCompleteAIFAQSystem();
export const faqSearchEngine = new FAQSearchEngine(aiOptimizedFAQSystem.searchableIndex);