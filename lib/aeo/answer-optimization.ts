/**
 * AEO (Answer Engine Optimization) 전략 시스템
 * AI 검색엔진, 음성검색, ChatGPT/Gemini/Claude 최적화
 */

export interface AEOStrategy {
  answerFormats: AnswerFormat[];
  voiceSearchOptimization: VoiceSearchConfig;
  aiEngineTargets: AIEngineTarget[];
  structuredAnswers: StructuredAnswer[];
  conversationalQueries: ConversationalQuery[];
}

export interface AnswerFormat {
  type: 'featured_snippet' | 'voice_answer' | 'ai_response' | 'quick_answer';
  question: string;
  answer: string;
  format: 'paragraph' | 'list' | 'table' | 'step_by_step';
  keywords: string[];
  intent: 'informational' | 'instructional' | 'transactional' | 'navigational';
  confidence: number; // 0-100
}

export interface VoiceSearchConfig {
  naturalLanguageQueries: string[];
  conversationalKeywords: string[];
  localIntent: boolean;
  questionFormats: ('what' | 'how' | 'when' | 'where' | 'why' | 'who')[];
  deviceTargets: ('smart_speaker' | 'mobile' | 'car' | 'wearable')[];
}

export interface AIEngineTarget {
  engine: 'chatgpt' | 'gemini' | 'claude' | 'bing_chat' | 'perplexity' | 'naver_hyperclova';
  contentFormat: string;
  optimizationRules: string[];
  trainingDataStyle: string;
  responsePatterns: string[];
}

export interface StructuredAnswer {
  questionPattern: string;
  answerTemplate: string;
  dataSource: string;
  updateFrequency: 'realtime' | 'daily' | 'weekly' | 'monthly';
  factualAccuracy: number; // 0-100
  citations: Citation[];
}

export interface Citation {
  source: string;
  url: string;
  authority: number; // 0-100
  freshness: Date;
  relevance: number; // 0-100
}

export interface ConversationalQuery {
  query: string;
  intent: string;
  followUpQuestions: string[];
  contextualAnswers: string[];
  businessValue: 'high' | 'medium' | 'low';
}

// 패밀리오피스 업계 특화 AEO 전략
export const FAMILY_OFFICE_AEO_STRATEGY: AEOStrategy = {
  answerFormats: [
    {
      type: 'featured_snippet',
      question: '가업승계란 무엇인가요?',
      answer: '가업승계는 중소중견기업의 경영권과 소유권을 다음 세대에 안정적으로 이양하는 과정입니다. 세무 최적화, 법적 절차, 후계자 교육을 통해 기업의 지속가능성을 보장하는 종합적인 전략입니다.',
      format: 'paragraph',
      keywords: ['가업승계', '기업승계', '경영권 이양', '후계자'],
      intent: 'informational',
      confidence: 95
    },
    {
      type: 'voice_answer',
      question: '중소기업 CEO 절세 방법 알려줘',
      answer: '중소기업 CEO 절세 방법은 크게 3가지입니다. 첫째, 경영인정기보험 활용으로 연간 최대 1억원 손금처리. 둘째, 가족법인 설립을 통한 소득분산. 셋째, 연구개발비 세액공제 최대 활용입니다.',
      format: 'list',
      keywords: ['CEO 절세', '경영인정기보험', '가족법인', '세액공제'],
      intent: 'instructional',
      confidence: 90
    },
    {
      type: 'ai_response',
      question: '패밀리오피스 서비스가 필요한 자산 규모는?',
      answer: '일반적으로 개인 순자산 30억원 이상 또는 기업 매출 100억원 이상에서 패밀리오피스 서비스의 효과가 극대화됩니다. 자산관리, 세무최적화, 승계계획의 복합적 니즈가 발생하는 구간입니다.',
      format: 'paragraph',
      keywords: ['패밀리오피스', '자산 규모', '30억', '자산관리'],
      intent: 'informational',
      confidence: 88
    },
    {
      type: 'quick_answer',
      question: '정책자금 신청 조건은?',
      answer: '중소기업 정책자금 신청 조건: 1) 중소기업기본법상 중소기업 2) 업력 3년 이상 3) 신용등급 6등급 이상 4) 세금 완납 5) 업종별 특화조건 충족. 자세한 조건은 기관별로 상이합니다.',
      format: 'step_by_step',
      keywords: ['정책자금', '중소기업', '신청조건', '자격요건'],
      intent: 'instructional',
      confidence: 92
    }
  ],

  voiceSearchOptimization: {
    naturalLanguageQueries: [
      '우리 회사 가업승계 어떻게 준비해야 해?',
      '중소기업 절세 방법 좀 알려줘',
      '패밀리오피스 서비스 비용이 얼마나 들어?',
      '정책자금 어디서 신청할 수 있나?',
      '경영인정기보험이 정말 절세에 도움돼?'
    ],
    conversationalKeywords: [
      '어떻게', '언제', '얼마나', '왜', '어디서',
      '방법', '조건', '절차', '비용', '효과'
    ],
    localIntent: true,
    questionFormats: ['how', 'what', 'when', 'where', 'why'],
    deviceTargets: ['smart_speaker', 'mobile', 'car']
  },

  aiEngineTargets: [
    {
      engine: 'chatgpt',
      contentFormat: 'conversational_expert_advice',
      optimizationRules: [
        '전문용어 설명 포함',
        '단계별 실행방안 제시',
        '실제 사례 기반 설명',
        '추가 질문 유도'
      ],
      trainingDataStyle: '전문가 상담 톤앤매너',
      responsePatterns: [
        '질문 요약 → 핵심 답변 → 상세 설명 → 주의사항 → 다음 단계'
      ]
    },
    {
      engine: 'naver_hyperclova',
      contentFormat: 'korean_business_context',
      optimizationRules: [
        '한국 세법 기준 설명',
        '국내 금융기관 정보',
        '정부 정책 연계',
        '업계 관행 반영'
      ],
      trainingDataStyle: '한국형 비즈니스 컨설팅',
      responsePatterns: [
        '상황 분석 → 한국 기준 해법 → 실무 팁 → 전문가 추천'
      ]
    },
    {
      engine: 'perplexity',
      contentFormat: 'research_based_insights',
      optimizationRules: [
        '최신 정보 인용',
        '다양한 출처 종합',
        '데이터 기반 분석',
        '신뢰성 있는 소스'
      ],
      trainingDataStyle: '리서치 기반 분석 보고서',
      responsePatterns: [
        '현황 분석 → 전문가 의견 → 실증 데이터 → 실행 방안'
      ]
    }
  ],

  structuredAnswers: [
    {
      questionPattern: '{업종} {규모}기업 가업승계 방법',
      answerTemplate: '{업종} 업계 {규모} 기업의 가업승계는 1) 업종 특성 분석 2) 세무 구조 최적화 3) 후계자 준비 4) 법적 절차 완비 순으로 진행됩니다. 특히 {업종}의 경우 {특화포인트}를 주의해야 합니다.',
      dataSource: 'industry_specific_database',
      updateFrequency: 'monthly',
      factualAccuracy: 94,
      citations: [
        {
          source: '중소벤처기업부',
          url: 'https://www.mss.go.kr',
          authority: 95,
          freshness: new Date('2024-12-01'),
          relevance: 88
        }
      ]
    },
    {
      questionPattern: '{지역} 정책자금 신청 방법',
      answerTemplate: '{지역} 지역의 정책자금은 1) {지역}테크노파크 2) {지역}신용보증기금 3) {지역}경제진흥원에서 신청 가능합니다. {지역} 특화 지원사업으로 {특화사업명}이 있어 최대 {지원한도}까지 지원받을 수 있습니다.',
      dataSource: 'regional_policy_database',
      updateFrequency: 'weekly',
      factualAccuracy: 91,
      citations: [
        {
          source: '지역별 정책자금 통합포털',
          url: 'https://www.bizinfo.go.kr',
          authority: 90,
          freshness: new Date('2024-12-15'),
          relevance: 95
        }
      ]
    }
  ],

  conversationalQueries: [
    {
      query: '우리 회사 규모면 패밀리오피스 서비스 받을 수 있을까?',
      intent: 'service_qualification_inquiry',
      followUpQuestions: [
        '회사 매출 규모가 어느 정도인가요?',
        '개인 자산은 얼마나 되시나요?',
        '어떤 서비스가 가장 필요하신가요?'
      ],
      contextualAnswers: [
        '매출 100억 이상이면 종합 서비스 가능',
        '30-100억 구간은 맞춤형 서비스 제공',
        '30억 미만은 기본 컨설팅부터 시작'
      ],
      businessValue: 'high'
    },
    {
      query: '가업승계 준비 언제부터 시작해야 해?',
      intent: 'timing_consultation',
      followUpQuestions: [
        '현재 대표님 연령대는?',
        '후계자가 정해져 있나요?',
        '현재 주식 보유 구조는?'
      ],
      contextualAnswers: [
        '50대부터 본격 시작 권장',
        '후계자 확정 전에도 구조 준비 필요',
        '세무 최적화는 5-10년 장기 계획'
      ],
      businessValue: 'high'
    }
  ]
};

// AEO 최적화 함수들
export class AEOOptimizer {
  
  // 자연어 질의 최적화
  static optimizeForNaturalLanguage(content: string, targetQueries: string[]): string {
    let optimizedContent = content;
    
    // 질문형 헤딩 추가
    targetQueries.forEach(query => {
      if (!optimizedContent.includes(query)) {
        const questionHeading = `## ${query}\n\n`;
        optimizedContent = questionHeading + optimizedContent;
      }
    });
    
    // 대화형 톤 조정
    optimizedContent = optimizedContent
      .replace(/입니다\./g, '입니다. 이런 방법이 도움될 수 있어요.')
      .replace(/합니다\./g, '합니다. 더 자세한 내용이 궁금하시면 언제든 문의해 주세요.');
    
    return optimizedContent;
  }
  
  // AI 엔진별 답변 형식 최적화
  static formatForAIEngine(
    answer: AnswerFormat, 
    engine: AIEngineTarget['engine']
  ): string {
    const engineRules = FAMILY_OFFICE_AEO_STRATEGY.aiEngineTargets
      .find(target => target.engine === engine);
      
    if (!engineRules) return answer.answer;
    
    let formatted = answer.answer;
    
    // 엔진별 최적화
    switch (engine) {
      case 'chatgpt':
        formatted = `**${answer.question}**\n\n${formatted}\n\n💡 **추가 팁**: 구체적인 상황에 따라 최적 방법이 달라질 수 있으니, 전문가와 상담받으시기를 권합니다.`;
        break;
        
      case 'naver_hyperclova':
        formatted = `🔍 **${answer.question}**\n\n${formatted}\n\n📞 **전문 상담**: 한국 세법과 금융 환경에 특화된 맞춤 상담을 받아보세요.`;
        break;
        
      case 'claude':
        formatted = `## ${answer.question}\n\n${formatted}\n\n**관련 고려사항**: 개별 상황에 따른 세부 전략이 중요하므로, 전문가 검토를 권장드립니다.`;
        break;
    }
    
    return formatted;
  }
  
  // 음성 검색 최적화 텍스트 생성
  static generateVoiceOptimizedContent(topic: string): string {
    const voiceConfig = FAMILY_OFFICE_AEO_STRATEGY.voiceSearchOptimization;
    
    const naturalQuestions = voiceConfig.naturalLanguageQueries
      .filter(q => q.includes(topic));
      
    let content = `# ${topic}에 대해 자주 묻는 질문들\n\n`;
    
    naturalQuestions.forEach((question, index) => {
      content += `## ${question}\n\n`;
      content += `간단히 말씀드리면, ${topic}는... (구체적 답변 내용)\n\n`;
      content += `더 자세한 내용은 다음과 같습니다:\n\n`;
    });
    
    return content;
  }
  
  // 구조화된 답변 생성
  static generateStructuredAnswer(
    questionPattern: string, 
    context: Record<string, string>
  ): StructuredAnswer | null {
    const template = FAMILY_OFFICE_AEO_STRATEGY.structuredAnswers
      .find(sa => new RegExp(sa.questionPattern.replace(/\{[^}]+\}/g, '.*')).test(questionPattern));
      
    if (!template) return null;
    
    let answer = template.answerTemplate;
    Object.entries(context).forEach(([key, value]) => {
      answer = answer.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });
    
    return {
      ...template,
      answerTemplate: answer
    };
  }
  
  // AEO 성과 측정
  static analyzeAEOPerformance(queries: string[], answers: AnswerFormat[]): {
    coverage: number;
    accuracy: number;
    conversationalScore: number;
    aiReadiness: number;
  } {
    const coverage = (answers.length / queries.length) * 100;
    const accuracy = answers.reduce((acc, a) => acc + a.confidence, 0) / answers.length;
    
    const conversationalAnswers = answers.filter(a => 
      a.answer.includes('입니다') || a.answer.includes('해주세요') || a.answer.includes('도움')
    );
    const conversationalScore = (conversationalAnswers.length / answers.length) * 100;
    
    const aiOptimizedAnswers = answers.filter(a => 
      a.format === 'step_by_step' || a.format === 'list'
    );
    const aiReadiness = (aiOptimizedAnswers.length / answers.length) * 100;
    
    return {
      coverage,
      accuracy,
      conversationalScore,
      aiReadiness
    };
  }
  
  // FAQ를 AEO 형식으로 변환
  static convertFAQtoAEO(faqs: Array<{question: string; answer: string}>): AnswerFormat[] {
    return faqs.map(faq => ({
      type: 'ai_response' as const,
      question: faq.question,
      answer: faq.answer,
      format: faq.answer.includes('1)') || faq.answer.includes('첫째') ? 'list' as const : 'paragraph' as const,
      keywords: this.extractKeywords(faq.question + ' ' + faq.answer),
      intent: this.determineIntent(faq.question),
      confidence: 85
    }));
  }
  
  private static extractKeywords(text: string): string[] {
    // 한국어 키워드 추출 로직 (실제로는 더 정교한 NLP 사용)
    const keywords = text.match(/[가-힣]{2,}/g) || [];
    return [...new Set(keywords)].slice(0, 10);
  }
  
  private static determineIntent(question: string): AnswerFormat['intent'] {
    if (question.includes('무엇') || question.includes('설명')) return 'informational';
    if (question.includes('어떻게') || question.includes('방법')) return 'instructional';
    if (question.includes('신청') || question.includes('문의')) return 'transactional';
    return 'informational';
  }
}