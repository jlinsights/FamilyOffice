// 지능적 AI 라우팅 시스템
import {
  QueryAnalysis,
  RoutingDecision,
  ClientProfile,
  QueryType,
  QueryDifficulty,
  AIModel,
  ExecutionStrategy,
  FileAttachment
} from './types';

export class IntelligentRouter {
  private routingMatrix: Map<string, RoutingDecision>;
  private performanceHistory: Map<string, number[]>;

  constructor() {
    this.routingMatrix = new Map();
    this.performanceHistory = new Map();
    this.initializeRoutingMatrix();
  }

  private initializeRoutingMatrix() {
    // FAQ & 기본 정보 - GPT-4 주도
    this.routingMatrix.set('basic-faq', {
      primary_ai: AIModel.GPT4_TURBO,
      strategy: ExecutionStrategy.SINGLE_AI,
      estimated_response_time: 5,
      estimated_cost: 0.02,
      confidence: 0.95
    });

    // 세무/재무 계산 - GPT-4 + Gemini 하이브리드
    this.routingMatrix.set('intermediate-tax_calc', {
      primary_ai: AIModel.GPT4_TURBO,
      secondary_ai: AIModel.GEMINI_PRO,
      strategy: ExecutionStrategy.PARALLEL_HYBRID,
      estimated_response_time: 15,
      estimated_cost: 0.08,
      confidence: 0.92
    });

    // 가업승계 전략 - Claude 주도
    this.routingMatrix.set('advanced-succession', {
      primary_ai: AIModel.CLAUDE_OPUS,
      secondary_ai: AIModel.GPT4_TURBO,
      strategy: ExecutionStrategy.SEQUENTIAL_CASCADE,
      estimated_response_time: 45,
      estimated_cost: 0.25,
      confidence: 0.88
    });

    // 문서 분석 - Gemini 주도
    this.routingMatrix.set('intermediate-doc_analysis', {
      primary_ai: AIModel.GEMINI_PRO,
      secondary_ai: AIModel.CLAUDE_OPUS,
      strategy: ExecutionStrategy.PARALLEL_HYBRID,
      estimated_response_time: 30,
      estimated_cost: 0.15,
      confidence: 0.90
    });

    // 위기 상황 - 전체 하이브리드
    this.routingMatrix.set('expert-crisis', {
      primary_ai: AIModel.CLAUDE_OPUS,
      strategy: ExecutionStrategy.CONSENSUS_VOTING,
      estimated_response_time: 90,
      estimated_cost: 0.50,
      confidence: 0.85
    });
  }

  async analyzeQuery(
    query: string, 
    clientProfile: ClientProfile,
    attachments?: FileAttachment[]
  ): Promise<QueryAnalysis> {
    // 1. 난이도 분석
    const difficulty = this.assessDifficulty(query);
    
    // 2. 질문 유형 분류
    const type = this.classifyQueryType(query);
    
    // 3. 긴급도 평가
    const urgency = this.assessUrgency(query);
    
    // 4. 문화적 민감도
    const cultural_sensitivity = this.assessCulturalSensitivity(query, clientProfile);
    
    // 5. 멀티모달 필요성
    const requires_multimodal = this.assessMultimodalNeeds(query, attachments);
    
    // 6. 토큰 사용량 추정
    const estimated_tokens = this.estimateTokenUsage(query, attachments);
    
    // 7. 복잡도 점수 계산
    const complexity_score = this.calculateComplexityScore(
      difficulty, type, urgency, cultural_sensitivity, requires_multimodal
    );

    return {
      difficulty,
      type,
      urgency,
      cultural_sensitivity,
      requires_multimodal,
      estimated_tokens,
      complexity_score
    };
  }

  determineOptimalAI(
    analysis: QueryAnalysis, 
    clientProfile: ClientProfile
  ): RoutingDecision {
    // 1. 기본 라우팅 키 생성
    const routingKey = `${analysis.difficulty}-${analysis.type}`;
    
    // 2. 기본 라우팅 결정 가져오기
    let decision = this.routingMatrix.get(routingKey);
    
    if (!decision) {
      // 기본값으로 fallback
      decision = this.getDefaultRouting(analysis);
    }

    // 3. 클라이언트 프로파일 기반 조정
    decision = this.adjustForClientProfile(decision, clientProfile);
    
    // 4. 성능 히스토리 기반 조정
    decision = this.adjustForPerformance(decision, routingKey);
    
    // 5. 비용 최적화
    decision = this.optimizeForCost(decision, clientProfile);

    return decision;
  }

  private assessDifficulty(query: string): QueryDifficulty {
    const complexKeywords = [
      '전략', '계획', '분석', '평가', '최적화', '구조조정', '합병', '인수',
      'strategy', 'analysis', 'optimization', 'restructuring', 'M&A'
    ];
    
    const expertKeywords = [
      '위기', '갈등', '분쟁', '소송', '세무조사', '규제', '컴플라이언스',
      'crisis', 'conflict', 'dispute', 'litigation', 'audit', 'compliance'
    ];

    const basicKeywords = [
      '문의', '안내', '예약', '비용', '서비스', '위치', '시간',
      'inquiry', 'information', 'booking', 'cost', 'service', 'location'
    ];

    const queryLower = query.toLowerCase();
    
    if (expertKeywords.some(keyword => queryLower.includes(keyword))) {
      return QueryDifficulty.EXPERT;
    }
    
    if (complexKeywords.some(keyword => queryLower.includes(keyword))) {
      return QueryDifficulty.ADVANCED;
    }
    
    if (query.length > 200 || (query.match(/\?/g) || []).length > 1) {
      return QueryDifficulty.INTERMEDIATE;
    }
    
    if (basicKeywords.some(keyword => queryLower.includes(keyword))) {
      return QueryDifficulty.BASIC;
    }

    // 기본값
    return QueryDifficulty.INTERMEDIATE;
  }

  private classifyQueryType(query: string): QueryType {
    const typePatterns = {
      [QueryType.FAQ]: ['문의', '안내', '서비스', '비용', '예약', 'FAQ', 'information', '채용', '구인', '입사', '경력', '지원', '면접', 'GFC', '기업재무컨설턴트'],
      [QueryType.TAX_CALCULATION]: ['세금', '상속세', '증여세', '절세', '세무', 'tax', 'calculation'],
      [QueryType.SUCCESSION_STRATEGY]: ['승계', '후계', '상속', '가업', 'succession', 'inheritance'],
      [QueryType.DOCUMENT_ANALYSIS]: ['분석', '검토', '문서', '계약서', 'analysis', 'document', 'review'],
      [QueryType.MARKET_RESEARCH]: ['시장', '동향', '연구', '조사', 'market', 'research', 'trend'],
      [QueryType.CRISIS_MANAGEMENT]: ['위기', '긴급', '응급', 'crisis', 'emergency', 'urgent'],
      [QueryType.RELATIONSHIP_MEDIATION]: ['갈등', '조정', '중재', '협상', 'conflict', 'mediation'],
      [QueryType.FINANCIAL_ANALYSIS]: ['투자', '자산', '포트폴리오', '수익', 'investment', 'portfolio', 'ROI']
    };

    const queryLower = query.toLowerCase();
    
    for (const [type, keywords] of Object.entries(typePatterns)) {
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        return type as QueryType;
      }
    }

    return QueryType.BASIC_INFO; // 기본값
  }

  private assessUrgency(query: string): 'immediate' | 'normal' | 'deep_analysis' {
    const immediateKeywords = ['긴급', '즉시', '빨리', '급한', 'urgent', 'immediate', 'asap'];
    const deepKeywords = ['분석', '연구', '계획', '전략', 'analysis', 'research', 'strategy'];
    
    const queryLower = query.toLowerCase();
    
    if (immediateKeywords.some(keyword => queryLower.includes(keyword))) {
      return 'immediate';
    }
    
    if (deepKeywords.some(keyword => queryLower.includes(keyword))) {
      return 'deep_analysis';
    }
    
    return 'normal';
  }

  private assessCulturalSensitivity(query: string, profile: ClientProfile): 'high' | 'medium' | 'low' {
    const highSensitivityTopics = [
      '가족', '승계', '갈등', '관계', '예의', '존댓말', '상하관계',
      'family', 'succession', 'relationship', 'hierarchy', 'respect'
    ];
    
    const queryLower = query.toLowerCase();
    
    // 한국 전통 기업이나 가족 기업인 경우 높은 민감도
    if (profile.industry === 'family_corp' || profile.company?.includes('그룹')) {
      return 'high';
    }
    
    if (highSensitivityTopics.some(topic => queryLower.includes(topic))) {
      return 'high';
    }
    
    // 비즈니스 관련 질문은 중간 민감도
    if (query.includes('사업') || query.includes('business')) {
      return 'medium';
    }
    
    return 'low';
  }

  private assessMultimodalNeeds(query: string, attachments?: FileAttachment[]): boolean {
    if (attachments && attachments.length > 0) {
      return true;
    }
    
    const multimodalKeywords = [
      '차트', '그래프', '이미지', '문서', '재무제표', 'chart', 'graph', 'document', 'image'
    ];
    
    return multimodalKeywords.some(keyword => query.toLowerCase().includes(keyword));
  }

  private estimateTokenUsage(query: string, attachments?: FileAttachment[]): number {
    let baseTokens = Math.ceil(query.length / 4); // 대략적인 토큰 계산
    
    if (attachments) {
      attachments.forEach(attachment => {
        if (attachment.extracted_text) {
          baseTokens += Math.ceil(attachment.extracted_text.length / 4);
        } else {
          // 이미지나 파일 크기 기반 추정
          baseTokens += Math.ceil(attachment.size / 1000);
        }
      });
    }
    
    return Math.min(baseTokens, 8000); // 최대 토큰 제한
  }

  private calculateComplexityScore(
    difficulty: QueryDifficulty,
    type: QueryType,
    urgency: string,
    cultural_sensitivity: string,
    requires_multimodal: boolean
  ): number {
    let score = 0;
    
    // 난이도 점수
    switch (difficulty) {
      case QueryDifficulty.BASIC: score += 0.1; break;
      case QueryDifficulty.INTERMEDIATE: score += 0.4; break;
      case QueryDifficulty.ADVANCED: score += 0.7; break;
      case QueryDifficulty.EXPERT: score += 1.0; break;
    }
    
    // 유형별 가중치
    const typeWeights = {
      [QueryType.FAQ]: 0.1,
      [QueryType.BASIC_INFO]: 0.1,
      [QueryType.TAX_CALCULATION]: 0.5,
      [QueryType.FINANCIAL_ANALYSIS]: 0.6,
      [QueryType.DOCUMENT_ANALYSIS]: 0.6,
      [QueryType.MARKET_RESEARCH]: 0.7,
      [QueryType.SUCCESSION_STRATEGY]: 0.8,
      [QueryType.CRISIS_MANAGEMENT]: 0.9,
      [QueryType.RELATIONSHIP_MEDIATION]: 0.9,
      [QueryType.INNOVATION_STRATEGY]: 0.7
    };
    
    score *= (typeWeights[type] || 0.5);
    
    // 추가 요소들
    if (urgency === 'deep_analysis') score += 0.2;
    if (cultural_sensitivity === 'high') score += 0.1;
    if (requires_multimodal) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  private getDefaultRouting(analysis: QueryAnalysis): RoutingDecision {
    // 복잡도 기반 기본 라우팅
    if (analysis.complexity_score >= 0.8) {
      return {
        primary_ai: AIModel.CLAUDE_OPUS,
        strategy: ExecutionStrategy.CONSENSUS_VOTING,
        estimated_response_time: 90,
        estimated_cost: 0.50,
        confidence: 0.75
      };
    } else if (analysis.complexity_score >= 0.5) {
      return {
        primary_ai: AIModel.CLAUDE_OPUS,
        secondary_ai: AIModel.GPT4_TURBO,
        strategy: ExecutionStrategy.PARALLEL_HYBRID,
        estimated_response_time: 30,
        estimated_cost: 0.15,
        confidence: 0.80
      };
    } else {
      return {
        primary_ai: AIModel.GPT4_TURBO,
        strategy: ExecutionStrategy.SINGLE_AI,
        estimated_response_time: 10,
        estimated_cost: 0.05,
        confidence: 0.85
      };
    }
  }

  private adjustForClientProfile(decision: RoutingDecision, profile: ClientProfile): RoutingDecision {
    // 프리미엄 클라이언트는 더 높은 품질의 AI 사용
    if (profile.tier === 'premium') {
      if (decision.primary_ai === AIModel.GPT4_TURBO) {
        decision.primary_ai = AIModel.CLAUDE_OPUS;
        decision.estimated_cost *= 1.5;
        decision.confidence += 0.05;
      }
    }
    
    // 베이직 클라이언트는 비용 최적화
    if (profile.tier === 'basic') {
      if (decision.strategy === ExecutionStrategy.CONSENSUS_VOTING) {
        decision.strategy = ExecutionStrategy.SINGLE_AI;
        decision.estimated_cost *= 0.5;
        decision.confidence -= 0.1;
      }
    }

    return decision;
  }

  private adjustForPerformance(decision: RoutingDecision, routingKey: string): RoutingDecision {
    const history = this.performanceHistory.get(routingKey) || [];
    
    if (history.length > 5) {
      const avgPerformance = history.reduce((a, b) => a + b, 0) / history.length;
      
      // 성능이 좋지 않으면 더 강력한 AI로 변경
      if (avgPerformance < 0.7) {
        if (decision.primary_ai === AIModel.GPT4_TURBO) {
          decision.primary_ai = AIModel.CLAUDE_OPUS;
          decision.estimated_cost *= 1.3;
        }
      }
    }

    return decision;
  }

  private optimizeForCost(decision: RoutingDecision, profile: ClientProfile): RoutingDecision {
    // 비용 한도가 있는 경우 최적화
    const costBudget = this.getCostBudget(profile);
    
    if (decision.estimated_cost > costBudget) {
      // 더 저렴한 전략으로 변경
      if (decision.strategy === ExecutionStrategy.CONSENSUS_VOTING) {
        decision.strategy = ExecutionStrategy.PARALLEL_HYBRID;
        decision.estimated_cost *= 0.6;
      } else if (decision.strategy === ExecutionStrategy.PARALLEL_HYBRID) {
        decision.strategy = ExecutionStrategy.SINGLE_AI;
        decision.estimated_cost *= 0.4;
      }
    }

    return decision;
  }

  private getCostBudget(profile: ClientProfile): number {
    switch (profile.tier) {
      case 'premium': return 1.0;
      case 'standard': return 0.5;
      case 'basic': return 0.2;
      default: return 0.3;
    }
  }

  // 성능 피드백 기록
  recordPerformance(routingKey: string, satisfaction: number) {
    const history = this.performanceHistory.get(routingKey) || [];
    history.push(satisfaction);
    
    // 최근 10개 기록만 유지
    if (history.length > 10) {
      history.shift();
    }
    
    this.performanceHistory.set(routingKey, history);
  }
}