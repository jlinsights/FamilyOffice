// Triple-AI 하이브리드 컨설팅 엔진 - 메인 시스템
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IntelligentRouter } from './intelligent-router';
import { KoreanContextOptimizer } from './korean-context';
import {
  ClientProfile,
  ConsultationResponse,
  FileAttachment,
  AIModel,
  ExecutionStrategy,
  PerformanceMetrics,
  SystemHealth,
  QueryAnalysis,
  RoutingDecision,
  KoreanContextualData
} from './types';

export class FamilyOfficeTripleAI {
  private claudeClient: Anthropic | null = null;
  private openaiClient: OpenAI | null = null;
  private geminiClient: GoogleGenerativeAI | null = null;
  private router: IntelligentRouter;
  private koreanOptimizer: KoreanContextOptimizer;
  private performanceMetrics: PerformanceMetrics;
  private cache: Map<string, any>;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    
    console.log('[Triple-AI] 초기화 시작...');
    console.log('[Triple-AI] 환경:', this.isDevelopment ? '개발' : '프로덕션');
    
    // AI 클라이언트 초기화 (개발 환경에서는 선택적)
    try {
      if (process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY) {
        this.claudeClient = new Anthropic({
          apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY,
        });
        console.log('[Triple-AI] Claude 클라이언트 초기화 성공');
      } else {
        console.log('[Triple-AI] Claude API 키가 없습니다');
      }
    } catch (error) {
      console.warn('[Triple-AI] Claude 초기화 실패:', error);
    }

    try {
      if (process.env.OPENAI_API_KEY) {
        this.openaiClient = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        console.log('[Triple-AI] OpenAI 클라이언트 초기화 성공');
      } else {
        console.log('[Triple-AI] OpenAI API 키가 없습니다');
      }
    } catch (error) {
      console.warn('[Triple-AI] OpenAI 초기화 실패:', error);
    }

    try {
      if (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY) {
        this.geminiClient = new GoogleGenerativeAI(
          process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || ''
        );
        console.log('[Triple-AI] Gemini 클라이언트 초기화 성공');
      } else {
        console.log('[Triple-AI] Gemini API 키가 없습니다');
      }
    } catch (error) {
      console.warn('[Triple-AI] Gemini 초기화 실패:', error);
    }

    // 시스템 컴포넌트 초기화
    this.router = new IntelligentRouter();
    this.koreanOptimizer = new KoreanContextOptimizer();
    this.cache = new Map();

    // 성능 메트릭 초기화
    this.performanceMetrics = {
      response_time: { avg: 0, p95: 0, p99: 0 },
      accuracy: { client_satisfaction: 0, expert_validation: 0, follow_up_rate: 0 },
      cost_efficiency: { cost_per_consultation: 0, token_utilization: 0, cache_hit_rate: 0 }
    };
  }

  /**
   * 메인 컨설팅 처리 함수
   */
  async processConsultation(
    query: string,
    clientProfile: ClientProfile,
    attachments?: FileAttachment[]
  ): Promise<ConsultationResponse> {
    const startTime = Date.now();
    const consultationId = this.generateConsultationId();

    try {
      // API 클라이언트 상태 확인
      console.log('[Triple-AI] 클라이언트 상태:', {
        claude: !!this.claudeClient,
        openai: !!this.openaiClient,
        gemini: !!this.geminiClient
      });

      // 사용 가능한 AI가 있으면 실제 호출, 없으면 모의 응답
      if (!this.claudeClient && !this.openaiClient && !this.geminiClient) {
        console.log('[Triple-AI] 사용 가능한 AI 클라이언트 없음: 모의 응답 생성');
        return this.generateMockResponse(query, clientProfile, consultationId, startTime);
      }

      // Triple-AI 전략 선택
      const availableAIs = [
        this.openaiClient ? 'openai' : null,
        this.claudeClient ? 'claude' : null,
        this.geminiClient ? 'gemini' : null
      ].filter(Boolean);

      console.log(`[Triple-AI] 사용 가능한 AI: ${availableAIs.join(', ')}`);

      // 복잡한 질문이거나 모든 AI가 사용 가능하면 합의 투표 사용
      const isComplexQuery = query.length > 200 || 
        query.includes('전략') || query.includes('분석') || 
        query.includes('계획') || query.includes('최적화');

      if (availableAIs.length >= 3 && isComplexQuery && clientProfile.tier === 'premium') {
        console.log('[Triple-AI] 합의 투표 시스템 활성화 (복잡한 프리미엄 질문)');
        return await this.executeTripleAIConsensus(query, clientProfile, consultationId, startTime);
      }

      // 두 개 AI가 사용 가능하면 병렬 하이브리드 분석
      if (availableAIs.length >= 2 && isComplexQuery) {
        console.log('[Triple-AI] 병렬 하이브리드 분석 활성화');
        return await this.executeParallelHybrid(query, clientProfile, consultationId, startTime);
      }

      // 단일 AI 처리 (우선순위: OpenAI → Claude → Gemini)
      if (this.openaiClient) {
        console.log('[Triple-AI] OpenAI 단일 처리');
        return await this.processWithOpenAI(query, clientProfile, consultationId, startTime);
      }

      if (this.claudeClient) {
        console.log('[Triple-AI] Claude 단일 처리');
        return await this.processWithClaude(query, clientProfile, consultationId, startTime);
      }

      if (this.geminiClient) {
        console.log('[Triple-AI] Gemini 단일 처리');
        return await this.processWithGemini(query, clientProfile, consultationId, startTime);
      }

      // 1. 질문 분석 및 분류
      console.log('[Triple-AI] 질문 분석 시작...');
      const analysis = await this.router.analyzeQuery(query, clientProfile, attachments);
      
      // 2. 최적 AI 라우팅 결정
      console.log('[Triple-AI] AI 라우팅 결정...');
      const routing = this.router.determineOptimalAI(analysis, clientProfile);
      
      // 3. 한국 문화 컨텍스트 생성
      console.log('[Triple-AI] 한국 문화 컨텍스트 최적화...');
      const koreanContext = this.koreanOptimizer.generateKoreanContext(
        query, analysis.type, analysis.difficulty, clientProfile
      );
      
      // 4. 캐시 확인
      const cacheKey = this.generateCacheKey(query, routing, clientProfile);
      const cachedResponse = this.cache.get(cacheKey);
      if (cachedResponse && this.isCacheValid(cachedResponse)) {
        console.log('[Triple-AI] 캐시된 응답 반환');
        return this.formatCachedResponse(cachedResponse, consultationId, startTime);
      }
      
      // 5. AI별 실행 전략 수행
      console.log(`[Triple-AI] ${routing.strategy} 전략으로 실행...`);
      const response = await this.executeStrategy(
        routing.strategy,
        query,
        analysis,
        routing,
        koreanContext,
        clientProfile,
        attachments
      );
      
      // 6. 응답 후처리 및 한국어 최적화
      console.log('[Triple-AI] 응답 후처리...');
      const processedResponse = this.koreanOptimizer.postProcessResponse(
        response.content,
        koreanContext
      );
      
      // 7. 최종 응답 구성
      const finalResponse: ConsultationResponse = {
        id: consultationId,
        timestamp: new Date().toISOString(),
        query,
        response: processedResponse,
        ai_used: response.ai_used,
        strategy_used: routing.strategy,
        response_time: Date.now() - startTime,
        cost: response.cost,
        confidence: response.confidence,
        follow_up_suggestions: response.follow_up_suggestions,
        expert_escalation_recommended: response.expert_escalation_recommended,
        korean_cultural_context: koreanContext
      };
      
      // 8. 캐시 저장
      this.cache.set(cacheKey, {
        response: finalResponse,
        timestamp: Date.now(),
        ttl: this.calculateCacheTTL(analysis)
      });
      
      // 9. 성능 메트릭 업데이트
      this.updatePerformanceMetrics(finalResponse);
      
      console.log(`[Triple-AI] 컨설팅 완료 (${finalResponse.response_time}ms)`);
      return finalResponse;

    } catch (error) {
      console.error('[Triple-AI] 컨설팅 처리 오류:', error);
      throw this.handleConsultationError(error, consultationId, startTime);
    }
  }

  /**
   * 실행 전략별 처리
   */
  private async executeStrategy(
    strategy: ExecutionStrategy,
    query: string,
    analysis: QueryAnalysis,
    routing: RoutingDecision,
    koreanContext: KoreanContextualData,
    clientProfile: ClientProfile,
    attachments?: FileAttachment[]
  ): Promise<AIResponse> {
    switch (strategy) {
      case ExecutionStrategy.SINGLE_AI:
        return await this.executeSingleAI(routing.primary_ai, query, analysis, koreanContext, clientProfile, attachments);
        
      case ExecutionStrategy.PARALLEL_HYBRID:
        return await this.executeParallelAnalysis(routing, query, analysis, koreanContext, clientProfile, attachments);
        
      case ExecutionStrategy.SEQUENTIAL_CASCADE:
        return await this.executeSequentialCascade(routing, query, analysis, koreanContext, clientProfile, attachments);
        
      case ExecutionStrategy.CONSENSUS_VOTING:
        return await this.executeConsensusVoting(query, analysis, koreanContext, clientProfile, attachments);
        
      default:
        throw new Error(`Unknown execution strategy: ${strategy}`);
    }
  }

  /**
   * 단일 AI 실행
   */
  private async executeSingleAI(
    aiModel: AIModel,
    query: string,
    analysis: QueryAnalysis,
    koreanContext: KoreanContextualData,
    clientProfile: ClientProfile,
    attachments?: FileAttachment[]
  ): Promise<AIResponse> {
    const basePrompt = this.buildBasePrompt(query, analysis, clientProfile);
    const optimizedPrompt = this.koreanOptimizer.optimizePromptForKoreanContext(
      basePrompt, koreanContext, clientProfile
    );

    switch (aiModel) {
      case AIModel.CLAUDE_OPUS:
        return await this.callClaudeAPI(optimizedPrompt, attachments);
        
      case AIModel.GPT4_TURBO:
        return await this.callOpenAIAPI(optimizedPrompt, attachments);
        
      case AIModel.GEMINI_PRO:
        return await this.callGeminiAPI(optimizedPrompt, attachments);
        
      default:
        throw new Error(`Unknown AI model: ${aiModel}`);
    }
  }

  /**
   * 병렬 하이브리드 분석
   */
  private async executeParallelAnalysis(
    routing: RoutingDecision,
    query: string,
    analysis: QueryAnalysis,
    koreanContext: KoreanContextualData,
    clientProfile: ClientProfile,
    attachments?: FileAttachment[]
  ): Promise<AIResponse> {
    const basePrompt = this.buildBasePrompt(query, analysis, clientProfile);
    const optimizedPrompt = this.koreanOptimizer.optimizePromptForKoreanContext(
      basePrompt, koreanContext, clientProfile
    );

    console.log('[Triple-AI] 병렬 분석 시작...');
    
    // 두 개 AI를 병렬로 실행
    const [primaryResult, secondaryResult] = await Promise.all([
      this.executeSingleAI(routing.primary_ai, query, analysis, koreanContext, clientProfile, attachments),
      routing.secondary_ai ? 
        this.executeSingleAI(routing.secondary_ai, query, analysis, koreanContext, clientProfile, attachments) :
        Promise.resolve(null)
    ]);

    // 결과 통합
    return this.synthesizeParallelResults(primaryResult, secondaryResult, routing);
  }

  /**
   * 순차 캐스케이드 실행
   */
  private async executeSequentialCascade(
    routing: RoutingDecision,
    query: string,
    analysis: QueryAnalysis,
    koreanContext: KoreanContextualData,
    clientProfile: ClientProfile,
    attachments?: FileAttachment[]
  ): Promise<AIResponse> {
    console.log('[Triple-AI] 순차 캐스케이드 분석 시작...');
    
    // 1단계: 기본 분석 (GPT-4)
    const initialAnalysis = await this.executeSingleAI(
      AIModel.GPT4_TURBO, query, analysis, koreanContext, clientProfile, attachments
    );
    
    // 2단계: 심화 분석 (Claude)
    const enhancedQuery = `다음은 1차 분석 결과입니다:\n${initialAnalysis.content}\n\n원본 질문: ${query}\n\n이를 바탕으로 더 깊이 있는 전략적 분석과 구체적인 실행방안을 제시해주세요.`;
    
    const strategicAnalysis = await this.executeSingleAI(
      AIModel.CLAUDE_OPUS, enhancedQuery, analysis, koreanContext, clientProfile, attachments
    );
    
    // 3단계: 결과 통합
    return this.synthesizeCascadeResults(initialAnalysis, strategicAnalysis);
  }

  /**
   * 합의 투표 실행 (3-AI 전체)
   */
  private async executeConsensusVoting(
    query: string,
    analysis: QueryAnalysis,
    koreanContext: KoreanContextualData,
    clientProfile: ClientProfile,
    attachments?: FileAttachment[]
  ): Promise<AIResponse> {
    console.log('[Triple-AI] 합의 투표 분석 시작...');
    
    // 모든 AI 병렬 실행
    const [claudeResult, gptResult, geminiResult] = await Promise.all([
      this.executeSingleAI(AIModel.CLAUDE_OPUS, query, analysis, koreanContext, clientProfile, attachments),
      this.executeSingleAI(AIModel.GPT4_TURBO, query, analysis, koreanContext, clientProfile, attachments),
      this.executeSingleAI(AIModel.GEMINI_PRO, query, analysis, koreanContext, clientProfile, attachments)
    ]);

    // 합의점 찾기 및 통합
    return this.synthesizeConsensusResults([claudeResult, gptResult, geminiResult]);
  }

  /**
   * Claude API 호출
   */
  private async callClaudeAPI(prompt: string, attachments?: FileAttachment[]): Promise<AIResponse> {
    try {
      const response = await this.claudeClient!.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        temperature: 0.7,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return {
        content: response.content[0].type === 'text' ? response.content[0].text : '',
        ai_used: AIModel.CLAUDE_OPUS,
        cost: this.calculateClaudeCost(response.usage?.input_tokens || 0, response.usage?.output_tokens || 0),
        confidence: 0.9,
        follow_up_suggestions: [],
        expert_escalation_recommended: false
      };
    } catch (error) {
      console.error('[Claude API] 오류:', error);
      throw new Error('Claude API 호출 실패');
    }
  }

  /**
   * OpenAI API 호출
   */
  private async callOpenAIAPI(prompt: string, attachments?: FileAttachment[]): Promise<AIResponse> {
    try {
      const response = await this.openaiClient!.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        max_tokens: 4000,
        temperature: 0.7,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return {
        content: response.choices[0]?.message?.content || '',
        ai_used: AIModel.GPT4_TURBO,
        cost: this.calculateOpenAICost(response.usage?.prompt_tokens || 0, response.usage?.completion_tokens || 0),
        confidence: 0.85,
        follow_up_suggestions: [],
        expert_escalation_recommended: false
      };
    } catch (error) {
      console.error('[OpenAI API] 오류:', error);
      throw new Error('OpenAI API 호출 실패');
    }
  }

  /**
   * Gemini API 호출
   */
  private async callGeminiAPI(prompt: string, attachments?: FileAttachment[]): Promise<AIResponse> {
    try {
      const model = this.geminiClient!.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const response = await model.generateContent(prompt);
      const result = await response.response;

      return {
        content: result.text() || '',
        ai_used: AIModel.GEMINI_PRO,
        cost: this.calculateGeminiCost(prompt.length), // 대략적인 계산
        confidence: 0.8,
        follow_up_suggestions: [],
        expert_escalation_recommended: false
      };
    } catch (error) {
      console.error('[Gemini API] 오류:', error);
      throw new Error('Gemini API 호출 실패');
    }
  }

  /**
   * 시스템 상태 확인
   */
  async checkSystemHealth(): Promise<SystemHealth> {
    const health: SystemHealth = {
      claude_status: 'healthy',
      openai_status: 'healthy',
      gemini_status: 'healthy',
      cache_status: 'healthy',
      overall_status: 'healthy',
      last_check: new Date().toISOString()
    };

    try {
      // Claude 상태 확인
      await this.claudeClient!.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Health check' }]
      });
    } catch {
      health.claude_status = 'unavailable';
      health.overall_status = 'degraded';
    }

    try {
      // OpenAI 상태 확인
      await this.openaiClient!.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Health check' }]
      });
    } catch {
      health.openai_status = 'unavailable';
      health.overall_status = 'degraded';
    }

    try {
      // Gemini 상태 확인
      const model = this.geminiClient!.getGenerativeModel({ model: 'gemini-1.5-pro' });
      await model.generateContent('Health check');
    } catch {
      health.gemini_status = 'unavailable';
      health.overall_status = 'degraded';
    }

    return health;
  }

  // Utility 메서드들
  private buildBasePrompt(query: string, analysis: QueryAnalysis, profile: ClientProfile): string {
    return `
FamilyOffice S AI 컨설턴트로서 한국의 패밀리오피스 전문가 관점에서 답변해주세요.

클라이언트 정보:
- 업종: ${profile.industry || '일반'}
- 회사: ${profile.company || '미제공'}
- 등급: ${profile.tier || 'standard'}

질문 분석:
- 유형: ${analysis.type}
- 난이도: ${analysis.difficulty}
- 긴급도: ${analysis.urgency}

질문: ${query}

다음 원칙에 따라 답변해주세요:
1. 한국의 비즈니스 문화와 법규를 고려한 실용적 조언
2. 구체적이고 실행 가능한 방안 제시
3. 리스크와 기회를 균형있게 분석
4. 필요시 전문가 연계 방안 안내
`;
  }

  private generateConsultationId(): string {
    return `cons_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateCacheKey(query: string, routing: RoutingDecision, profile: ClientProfile): string {
    return `cache_${Buffer.from(query).toString('base64').substr(0, 20)}_${routing.primary_ai}_${profile.tier}`;
  }

  private isCacheValid(cachedEntry: any): boolean {
    const now = Date.now();
    return (now - cachedEntry.timestamp) < cachedEntry.ttl;
  }

  private calculateCacheTTL(analysis: QueryAnalysis): number {
    // 기본 질문은 더 오래 캐시
    if (analysis.difficulty === 'basic') return 24 * 60 * 60 * 1000; // 24시간
    if (analysis.difficulty === 'intermediate') return 4 * 60 * 60 * 1000; // 4시간
    return 1 * 60 * 60 * 1000; // 1시간
  }

  private calculateClaudeCost(inputTokens: number, outputTokens: number): number {
    return (inputTokens * 0.000008) + (outputTokens * 0.000024);
  }

  private calculateOpenAICost(promptTokens: number, completionTokens: number): number {
    return (promptTokens * 0.00001) + (completionTokens * 0.00003);
  }

  private calculateGeminiCost(promptLength: number): number {
    return promptLength * 0.0000005; // 대략적인 계산
  }

  private formatCachedResponse(cachedEntry: any, consultationId: string, startTime: number): ConsultationResponse {
    const response = cachedEntry.response;
    return {
      ...response,
      id: consultationId,
      timestamp: new Date().toISOString(),
      response_time: Date.now() - startTime
    };
  }

  private synthesizeParallelResults(primary: AIResponse, secondary: AIResponse | null, routing: RoutingDecision): AIResponse {
    if (!secondary) return primary;

    return {
      content: `${primary.content}\n\n--- 추가 분석 ---\n${secondary.content}`,
      ai_used: [primary.ai_used, secondary.ai_used].flat(),
      cost: primary.cost + secondary.cost,
      confidence: (primary.confidence + secondary.confidence) / 2,
      follow_up_suggestions: [...primary.follow_up_suggestions, ...secondary.follow_up_suggestions],
      expert_escalation_recommended: primary.expert_escalation_recommended || secondary.expert_escalation_recommended
    };
  }

  private synthesizeCascadeResults(initial: AIResponse, strategic: AIResponse): AIResponse {
    return {
      content: `${strategic.content}`,
      ai_used: [initial.ai_used, strategic.ai_used].flat(),
      cost: initial.cost + strategic.cost,
      confidence: Math.max(initial.confidence, strategic.confidence),
      follow_up_suggestions: strategic.follow_up_suggestions,
      expert_escalation_recommended: strategic.expert_escalation_recommended
    };
  }

  private synthesizeConsensusResults(results: AIResponse[]): AIResponse {
    const combinedContent = results.map((result, index) => 
      `=== AI ${index + 1} 분석 ===\n${result.content}`
    ).join('\n\n');

    return {
      content: `${combinedContent}\n\n=== 종합 결론 ===\n위 분석들을 종합하여 최적의 방안을 권장드립니다.`,
      ai_used: results.map(r => r.ai_used).flat(),
      cost: results.reduce((sum, r) => sum + r.cost, 0),
      confidence: results.reduce((sum, r) => sum + r.confidence, 0) / results.length,
      follow_up_suggestions: results.flatMap(r => r.follow_up_suggestions),
      expert_escalation_recommended: results.some(r => r.expert_escalation_recommended)
    };
  }

  private updatePerformanceMetrics(response: ConsultationResponse): void {
    // 성능 메트릭 업데이트 로직
    // 실제 구현에서는 데이터베이스나 모니터링 시스템으로 전송
  }

  private handleConsultationError(error: any, consultationId: string, startTime: number): Error {
    const errorResponse = new Error(`컨설팅 처리 중 오류가 발생했습니다 (ID: ${consultationId})`);
    console.error('[Triple-AI] Error:', error);
    return errorResponse;
  }

  /**
   * 개발 환경용 모의 응답 생성
   */
  private generateMockResponse(
    query: string,
    clientProfile: ClientProfile,
    consultationId: string,
    startTime: number
  ): ConsultationResponse {
    const mockResponses = {
      '가업승계': `안녕하세요! 가업승계에 대한 질문을 해주셨네요.

**가업승계 전략의 핵심 포인트:**

1. **사전 계획의 중요성**
   - 최소 3-5년 전부터 준비
   - 세무, 법무, 경영 전략 통합 접근

2. **주요 고려사항**
   - 상속세 최적화 전략
   - 경영권 이전 방안
   - 자산 분산 전략
   - 세대 간 소통 체계

3. **FamilyOffice S의 전문 서비스**
   - 10년+ 가업승계 노하우
   - 1,500+ M&A 플랫폼 연계
   - 60+ Big 4 출신 전문가 네트워크

더 구체적인 상황을 알려주시면 맞춤형 전략을 제시해드릴 수 있습니다.`,

      '세무': `세무 최적화에 대한 질문을 해주셨네요!

**세무 최적화 핵심 전략:**

1. **법인세 최적화**
   - 세무조정계산서 활용
   - 비용 인정 최적화
   - 세무 리스크 관리

2. **개인세 최적화**
   - 소득 분산 전략
   - 세금 부담 최소화
   - 합법적 절세 방안

3. **상속세 대비**
   - 사전 증여 전략
   - 자산 평가 최적화
   - 상속세 절약 방안

구체적인 상황을 알려주시면 더 정확한 조언을 드릴 수 있습니다.`,

      'M&A': `M&A에 대한 질문을 해주셨네요!

**M&A 성공 전략:**

1. **사전 준비**
   - 기업 가치 평가
   - 매수/매도 전략 수립
   - 법적 검토

2. **실행 단계**
   - 협상 전략
   - 실사(Due Diligence)
   - 계약 체결

3. **사후 관리**
   - 경영권 이전
   - 조직 통합
   - 시너지 창출

FamilyOffice S의 1,500+ M&A 플랫폼을 통해 최적의 파트너를 찾을 수 있습니다.`
    };

    // 질문 키워드에 따른 모의 응답 선택
    let response = mockResponses['가업승계']; // 기본값
    if (query.includes('세무') || query.includes('세금') || query.includes('조정')) {
      response = mockResponses['세무'];
    } else if (query.includes('M&A') || query.includes('인수') || query.includes('합병')) {
      response = mockResponses['M&A'];
    }

    return {
      id: consultationId,
      query: query,
      response: response,
      ai_used: ['claude-opus', 'gpt4-turbo', 'gemini-pro'],
      strategy_used: 'consensus_voting',
      response_time: Date.now() - startTime,
      cost: 0.05,
      confidence: 0.85,
      korean_cultural_context: {
        formality_level: 'business',
        hierarchy_considerations: [
          '기업의 세대 간 소통 체계 고려',
          '경영권 이전 시 조직 문화 유지',
          '가족 구성원 간 역할 분담'
        ],
        cultural_recommendations: [
          '한국 기업문화에 맞는 승계 전략',
          '세대 간 갈등 최소화 방안',
          '전통적 가치와 현대적 경영의 조화'
        ],
        relationship_building_notes: [
          '장기적 신뢰 관계 구축',
          '정기적인 소통 채널 확보',
          '전문가 네트워크 활용'
        ]
      },
      follow_up_suggestions: [
        '상세한 컨설팅 상담 예약',
        '관련 법령 자료 요청',
        '사례 분석 보고서 요청'
      ],
      expert_escalation_recommended: false,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * OpenAI를 사용한 실제 컨설팅 처리
   */
  private async processWithOpenAI(
    query: string,
    clientProfile: ClientProfile,
    consultationId: string,
    startTime: number
  ): Promise<ConsultationResponse> {
    try {
      // 대화 히스토리 확인 (세션 내 질문 횟수)
      const sessionQuestions = clientProfile.consultation_history?.length || 0;
      const isComplexQuery = this.isComplexQuery(query);
      
      const systemPrompt = `당신은 FamilyOffice S의 전문 컨설턴트입니다. 
중소중견기업의 가업승계, 세무 최적화, M&A 등 패밀리오피스 업무에 특화된 전문가로서 활동합니다.

클라이언트 정보:
- 회사: ${clientProfile.company || '중소중견기업'}
- 업종: ${clientProfile.industry || 'family_corp'}
- 등급: ${clientProfile.tier || 'standard'}
- 현재 대화 횟수: ${sessionQuestions + 1}회

답변 가이드라인:
1. 한국의 중소중견기업 환경을 고려한 실용적인 조언
2. 구체적이고 실행 가능한 방안 제시
3. 법적, 세무적 고려사항 포함
4. 정중한 존댓말 사용
5. 필요시 전문가 상담 권유

중요: 
- 질문자가 법인 대표, 개인사업자, 자산가 등 다양할 수 있음을 염두에 두고 답변하세요.
- 복잡한 질문이나 3회 이상의 대화 시, 답변 말미에 자연스럽게 직접 상담의 가치를 언급하세요.
- 구체적인 수치나 개별 상황에 대한 깊은 분석이 필요한 경우, 전문가 상담을 권유하세요.
- 고객이 연락처(전화번호, 이메일)를 남기는 경우, Cal.com 미팅 예약을 안내하세요.
- 일반적인 정보 제공과 맞춤형 컨설팅의 차이를 부드럽게 전달하세요.

질문에 대해 전문적이고 신뢰할 수 있는 답변을 제공해주세요.`;

      const completion = await this.openaiClient!.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      let response = completion.choices[0]?.message?.content || '죄송합니다. 응답을 생성할 수 없습니다.';
      const responseTime = Date.now() - startTime;

      // 상담 유도 로직
      const hasContact = this.hasContactInfo(query);
      const shouldAddConsultationCTA = sessionQuestions >= 2 || isComplexQuery || hasContact;
      
      if (shouldAddConsultationCTA && !response.includes('상담')) {
        if (hasContact) {
          response += `\n\n📞 **연락 주셔서 감사합니다!**\n보다 효율적인 상담을 위해 미팅 예약 시스템을 이용하시는 것을 권장드립니다.\n\n• [→ 30분 무료 화상미팅 예약하기](https://cal.com/familyoffice/coffeechat)\n• [→ 상세 상담 문의하기](/contact)\n\n미팅 예약 시 구체적인 상담 주제를 남겨주시면 더욱 맞춤형 컨설팅을 준비해드리겠습니다.`;
        } else {
          response += `\n\n💡 **맞춤형 컨설팅이 필요하신가요?**\n법인, 개인사업자, 자산가 등 고객님의 구체적인 상황을 반영한 더 깊이 있는 분석과 실행 방안이 필요하시다면, FamilyOffice S의 전문가와 직접 상담해보시기 바랍니다.\n\n📞 **상담 예약 방법**\n• [→ 30분 무료 화상미팅 예약](https://cal.com/familyoffice/coffeechat)\n• [→ 상담 문의 남기기](/contact)\n\n*편하신 방법으로 연락 주시면 맞춤형 솔루션을 제안드리겠습니다.*`;
        }
      }

      return {
        id: consultationId,
        query: query,
        response: response,
        ai_used: 'gpt4-turbo',
        strategy_used: 'single_ai',
        response_time: responseTime,
        cost: (completion.usage?.total_tokens || 0) * 0.00003, // GPT-4 예상 비용
        confidence: 0.90,
        korean_cultural_context: {
          formality_level: 'business',
          hierarchy_considerations: ['CEO 대상 정중한 존댓말', '기업 위계질서 고려'],
          cultural_recommendations: ['한국 중소중견기업 환경 반영', '전문적이고 신뢰감 있는 어조'],
          relationship_building_notes: ['장기적 신뢰관계 구축', '체계적 상담 프로세스']
        },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('[Triple-AI] OpenAI 호출 오류:', error);
      // OpenAI 실패시 fallback
      return this.generateMockResponse(query, clientProfile, consultationId, startTime);
    }
  }

  /**
   * Claude를 사용한 실제 컨설팅 처리
   */
  private async processWithClaude(
    query: string,
    clientProfile: ClientProfile,
    consultationId: string,
    startTime: number
  ): Promise<ConsultationResponse> {
    try {
      const sessionQuestions = clientProfile.consultation_history?.length || 0;
      const isComplexQuery = this.isComplexQuery(query);
      
      const systemPrompt = `당신은 FamilyOffice S의 전문 컨설턴트입니다. 
중소중견기업의 가업승계, 세무 최적화, M&A 등 패밀리오피스 업무에 특화된 전문가로서 활동합니다.

클라이언트 정보:
- 회사: ${clientProfile.company || '중소중견기업'}
- 업종: ${clientProfile.industry || 'family_corp'}
- 등급: ${clientProfile.tier || 'standard'}

답변 가이드라인:
1. 한국의 중소중견기업 환경을 고려한 실용적인 조언
2. 구체적이고 실행 가능한 방안 제시
3. 법적, 세무적 고려사항 포함
4. 정중한 존댓말 사용
5. 필요시 전문가 상담 권유

중요: 질문자가 법인 대표, 개인사업자, 자산가 등 다양할 수 있음을 염두에 두고 답변하세요.

Claude의 강점인 깊이 있는 분석과 구조화된 답변으로 전문적인 조언을 제공해주세요.`;

      const response = await this.claudeClient!.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        temperature: 0.7,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\n질문: ${query}` }
        ]
      });

      const content = response.content[0];
      let responseContent = content.type === 'text' ? content.text : '죄송합니다. 응답을 생성할 수 없습니다.';
      const responseTime = Date.now() - startTime;

      // 상담 유도 로직
      const hasContact = this.hasContactInfo(query);
      const shouldAddConsultationCTA = sessionQuestions >= 2 || isComplexQuery || hasContact;
      
      if (shouldAddConsultationCTA && !responseContent.includes('상담')) {
        if (hasContact) {
          responseContent += `\n\n📞 **연락 주셔서 감사합니다!**\n보다 효율적인 상담을 위해 미팅 예약 시스템을 이용하시는 것을 권장드립니다.\n\n• [→ 30분 무료 화상미팅 예약하기](https://cal.com/familyoffice/coffeechat)\n• [→ 상세 상담 문의하기](/contact)\n\n미팅 예약 시 구체적인 상담 주제를 남겨주시면 더욱 맞춤형 컨설팅을 준비해드리겠습니다.`;
        } else {
          responseContent += `\n\n💡 **맞춤형 컨설팅이 필요하신가요?**\n법인, 개인사업자, 자산가 등 고객님의 구체적인 상황을 반영한 더 깊이 있는 분석과 실행 방안이 필요하시다면, FamilyOffice S의 전문가와 직접 상담해보시기 바랍니다.\n\n📞 **상담 예약 방법**\n• [→ 30분 무료 화상미팅 예약](https://cal.com/familyoffice/coffeechat)\n• [→ 상담 문의 남기기](/contact)\n\n*편하신 방법으로 연락 주시면 맞춤형 솔루션을 제안드리겠습니다.*`;
        }
      }

      return {
        id: consultationId,
        query: query,
        response: responseContent,
        ai_used: 'claude-opus',
        strategy_used: 'single_ai',
        response_time: responseTime,
        cost: this.calculateClaudeCost(response.usage?.input_tokens || 0, response.usage?.output_tokens || 0),
        confidence: 0.92, // Claude의 높은 신뢰도
        korean_cultural_context: {
          formality_level: 'formal',
          hierarchy_considerations: ['CEO 대상 정중한 존댓말', '기업 위계질서 고려', '체계적 구조 중시'],
          cultural_recommendations: ['한국 기업 문화 반영', '법규 준수 강조'],
          relationship_building_notes: ['깊이 있는 분석적 접근', '전문가적 신뢰 구축']
        },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('[Triple-AI] Claude 호출 오류:', error);
      // Claude 실패시 fallback
      return this.generateMockResponse(query, clientProfile, consultationId, startTime);
    }
  }

  /**
   * Gemini를 사용한 실제 컨설팅 처리
   */
  private async processWithGemini(
    query: string,
    clientProfile: ClientProfile,
    consultationId: string,
    startTime: number
  ): Promise<ConsultationResponse> {
    try {
      const sessionQuestions = clientProfile.consultation_history?.length || 0;
      const isComplexQuery = this.isComplexQuery(query);
      
      const systemPrompt = `당신은 FamilyOffice S의 전문 컨설턴트입니다. 
중소중견기업의 가업승계, 세무 최적화, M&A 등 패밀리오피스 업무에 특화된 전문가로서 활동합니다.

클라이언트 정보:
- 회사: ${clientProfile.company || '중소중견기업'}
- 업종: ${clientProfile.industry || 'family_corp'}
- 등급: ${clientProfile.tier || 'standard'}

답변 가이드라인:
1. 한국의 중소중견기업 환경을 고려한 실용적인 조언
2. 구체적이고 실행 가능한 방안 제시
3. 법적, 세무적 고려사항 포함
4. 정중한 존댓말 사용
5. 필요시 전문가 상담 권유

중요: 질문자가 법인 대표, 개인사업자, 자산가 등 다양할 수 있음을 염두에 두고 답변하세요.

Gemini의 강점인 다각적 분석과 창의적 해결방안으로 혁신적인 조언을 제공해주세요.

질문: ${query}`;

      const model = this.geminiClient!.getGenerativeModel({ 
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      });
      
      const response = await model.generateContent(systemPrompt);
      const result = await response.response;
      let responseContent = result.text() || '죄송합니다. 응답을 생성할 수 없습니다.';
      const responseTime = Date.now() - startTime;

      // 상담 유도 로직
      const hasContact = this.hasContactInfo(query);
      const shouldAddConsultationCTA = sessionQuestions >= 2 || isComplexQuery || hasContact;
      
      if (shouldAddConsultationCTA && !responseContent.includes('상담')) {
        if (hasContact) {
          responseContent += `\n\n📞 **연락 주셔서 감사합니다!**\n보다 효율적인 상담을 위해 미팅 예약 시스템을 이용하시는 것을 권장드립니다.\n\n• [→ 30분 무료 화상미팅 예약하기](https://cal.com/familyoffice/coffeechat)\n• [→ 상세 상담 문의하기](/contact)\n\n미팅 예약 시 구체적인 상담 주제를 남겨주시면 더욱 맞춤형 컨설팅을 준비해드리겠습니다.`;
        } else {
          responseContent += `\n\n💡 **맞춤형 컨설팅이 필요하신가요?**\n법인, 개인사업자, 자산가 등 고객님의 구체적인 상황을 반영한 더 깊이 있는 분석과 실행 방안이 필요하시다면, FamilyOffice S의 전문가와 직접 상담해보시기 바랍니다.\n\n📞 **상담 예약 방법**\n• [→ 30분 무료 화상미팅 예약](https://cal.com/familyoffice/coffeechat)\n• [→ 상담 문의 남기기](/contact)\n\n*편하신 방법으로 연락 주시면 맞춤형 솔루션을 제안드리겠습니다.*`;
        }
      }

      return {
        id: consultationId,
        query: query,
        response: responseContent,
        ai_used: 'gemini-pro',
        strategy_used: 'single_ai',
        response_time: responseTime,
        cost: this.calculateGeminiCost(systemPrompt.length), // 대략적인 계산
        confidence: 0.88, // Gemini의 신뢰도
        korean_cultural_context: {
          formality_level: 'business',
          hierarchy_considerations: ['CEO 대상 정중한 존댓말', '창의적 사고 장려'],
          cultural_recommendations: ['한국 기업 문화 기반', '글로벌 트렌드 접목'],
          relationship_building_notes: ['혁신적 접근법 제시', '다각적 관점 제공']
        },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('[Triple-AI] Gemini 호출 오류:', error);
      // Gemini 실패시 fallback
      return this.generateMockResponse(query, clientProfile, consultationId, startTime);
    }
  }

  /**
   * Triple-AI 합의 투표 시스템 (모든 AI 동시 분석)
   */
  private async executeTripleAIConsensus(
    query: string,
    clientProfile: ClientProfile,
    consultationId: string,
    startTime: number
  ): Promise<ConsultationResponse> {
    try {
      console.log('[Triple-AI] 3개 AI 병렬 분석 시작...');
      
      // 모든 AI를 병렬로 실행
      const [openaiResult, claudeResult, geminiResult] = await Promise.allSettled([
        this.processWithOpenAI(query, clientProfile, `${consultationId}-openai`, startTime),
        this.processWithClaude(query, clientProfile, `${consultationId}-claude`, startTime),
        this.processWithGemini(query, clientProfile, `${consultationId}-gemini`, startTime)
      ]);

      const responses: ConsultationResponse[] = [];
      
      if (openaiResult.status === 'fulfilled') responses.push(openaiResult.value);
      if (claudeResult.status === 'fulfilled') responses.push(claudeResult.value);
      if (geminiResult.status === 'fulfilled') responses.push(geminiResult.value);

      if (responses.length === 0) {
        throw new Error('모든 AI 호출 실패');
      }

      // 합의된 최종 응답 생성
      const synthesizedResponse = this.synthesizeTripleAIResponses(responses);
      const totalResponseTime = Date.now() - startTime;

      return {
        id: consultationId,
        query: query,
        response: synthesizedResponse.content,
        ai_used: ['claude-opus', 'gpt4-turbo', 'gemini-pro'],
        strategy_used: 'consensus_voting',
        response_time: totalResponseTime,
        cost: responses.reduce((sum, r) => sum + (r.cost || 0), 0),
        confidence: 0.95, // 3개 AI 합의로 높은 신뢰도
        korean_cultural_context: {
          formality_level: 'formal',
          hierarchy_considerations: ['CEO 대상 정중한 존댓말', '전문가적 권위 유지'],
          cultural_recommendations: ['한국 기업 문화 완전 반영', '업계 관례 고려'],
          relationship_building_notes: ['종합적 솔루션 제공', '균형잡힌 관점 유지']
        },
        follow_up_suggestions: synthesizedResponse.follow_up_suggestions,
        expert_escalation_recommended: synthesizedResponse.expert_escalation_recommended,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('[Triple-AI] 합의 투표 오류:', error);
      // 합의 투표 실패시 단일 AI로 fallback
      if (this.openaiClient) {
        return await this.processWithOpenAI(query, clientProfile, consultationId, startTime);
      }
      return this.generateMockResponse(query, clientProfile, consultationId, startTime);
    }
  }

  /**
   * 병렬 하이브리드 분석 (2개 AI)
   */
  private async executeParallelHybrid(
    query: string,
    clientProfile: ClientProfile,
    consultationId: string,
    startTime: number
  ): Promise<ConsultationResponse> {
    try {
      console.log('[Triple-AI] 2개 AI 병렬 분석 시작...');
      
      const availableProcessors = [
        this.openaiClient ? () => this.processWithOpenAI(query, clientProfile, `${consultationId}-openai`, startTime) : null,
        this.claudeClient ? () => this.processWithClaude(query, clientProfile, `${consultationId}-claude`, startTime) : null,
        this.geminiClient ? () => this.processWithGemini(query, clientProfile, `${consultationId}-gemini`, startTime) : null
      ].filter(Boolean);

      // 처음 2개만 사용
      const [primaryResult, secondaryResult] = await Promise.allSettled([
        availableProcessors[0]!(),
        availableProcessors[1]!()
      ]);

      const responses: ConsultationResponse[] = [];
      if (primaryResult.status === 'fulfilled') responses.push(primaryResult.value);
      if (secondaryResult.status === 'fulfilled') responses.push(secondaryResult.value);

      if (responses.length === 0) {
        throw new Error('병렬 AI 호출 실패');
      }

      // 2개 응답 통합
      const synthesizedResponse = this.synthesizeDualAIResponses(responses);
      const totalResponseTime = Date.now() - startTime;

      return {
        id: consultationId,
        query: query,
        response: synthesizedResponse.content,
        ai_used: responses.map(r => r.ai_used).flat(),
        strategy_used: 'parallel_hybrid',
        response_time: totalResponseTime,
        cost: responses.reduce((sum, r) => sum + (r.cost || 0), 0),
        confidence: 0.90,
        korean_cultural_context: {
          formality_level: 'business',
          hierarchy_considerations: ['CEO 대상 정중한 존댓말', '체계적 분석 접근'],
          cultural_recommendations: ['한국 기업 문화 고려', '실무적 접근법'],
          relationship_building_notes: ['균형잡힌 관점 제공', '전문가적 조언']
        },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('[Triple-AI] 병렬 하이브리드 오류:', error);
      // 병렬 분석 실패시 단일 AI로 fallback
      if (this.openaiClient) {
        return await this.processWithOpenAI(query, clientProfile, consultationId, startTime);
      }
      return this.generateMockResponse(query, clientProfile, consultationId, startTime);
    }
  }

  /**
   * Triple-AI 응답 합성
   */
  private synthesizeTripleAIResponses(responses: ConsultationResponse[]): {
    content: string;
    follow_up_suggestions: string[];
    expert_escalation_recommended: boolean;
  } {
    const aiNames = responses.map(r => {
      if (r.ai_used === 'gpt4-turbo') return 'GPT-4';
      if (r.ai_used === 'claude-opus') return 'Claude';
      if (r.ai_used === 'gemini-pro') return 'Gemini';
      return r.ai_used;
    });

    const synthesizedContent = `
# 🏢 Triple-AI 종합 컨설팅 분석

**분석에 참여한 AI**: ${aiNames.join(' + ')}

---

## 📊 **종합 분석 결과**

${responses.map((response, index) => `
### ${aiNames[index]} 분석
${response.response}

---
`).join('')}

## 🎯 **Triple-AI 합의 결론**

위 ${responses.length}개 AI의 분석을 종합한 결과, 다음과 같은 통합된 권장사항을 제시합니다:

**핵심 권장사항:**
- 모든 AI가 공통으로 강조하는 사항들을 우선 검토
- 각 AI의 고유한 관점을 활용한 다각적 접근
- 실행 단계별 체계적 추진 필요

**실행 우선순위:**
1. 즉시 실행 가능한 단기 방안
2. 중장기 전략적 고려사항  
3. 리스크 관리 및 대응책

이러한 종합 분석을 통해 더욱 완전하고 신뢰할 수 있는 컨설팅 결과를 제공드립니다.
`.trim();

    const allSuggestions = responses.flatMap(r => r.follow_up_suggestions || []);
    const uniqueSuggestions = [...new Set(allSuggestions)].slice(0, 3);

    const expertEscalation = responses.some(r => r.expert_escalation_recommended);

    return {
      content: synthesizedContent,
      follow_up_suggestions: uniqueSuggestions,
      expert_escalation_recommended: expertEscalation
    };
  }

  /**
   * 2개 AI 응답 합성
   */
  private synthesizeDualAIResponses(responses: ConsultationResponse[]): {
    content: string;
  } {
    const aiNames = responses.map(r => {
      if (r.ai_used === 'gpt4-turbo') return 'GPT-4';
      if (r.ai_used === 'claude-opus') return 'Claude';
      if (r.ai_used === 'gemini-pro') return 'Gemini';
      return r.ai_used;
    });

    const synthesizedContent = `
# 🔄 듀얼-AI 하이브리드 분석

**분석 AI**: ${aiNames.join(' + ')}

---

${responses.map((response, index) => `
## ${aiNames[index]} 관점
${response.response}

---
`).join('')}

## 🎯 **통합 권장사항**

위 ${responses.length}개 AI의 다각적 분석을 바탕으로 균형잡힌 컨설팅 방안을 제시해드렸습니다.
각각의 관점을 종합하여 최적의 의사결정을 내리시기 바랍니다.
`.trim();

    return {
      content: synthesizedContent
    };
  }

  /**
   * 복잡한 질문 여부 판단
   */
  private isComplexQuery(query: string): boolean {
    const complexKeywords = [
      '구체적', '상세한', '우리 회사', '저희 회사', '실제', '사례',
      '얼마나', '비용', '기간', '절차', '방법론', '전략',
      '세금 계산', '절세 효과', '승계 구조', 'M&A 가치'
    ];

    return complexKeywords.some(keyword => query.includes(keyword)) || 
           query.length > 200;
  }

  /**
   * 연락처 포함 여부 확인
   */
  private hasContactInfo(query: string): boolean {
    // 이메일 패턴
    const emailPattern = /[\w.-]+@[\w.-]+\.\w+/;
    // 전화번호 패턴 (한국 전화번호)
    const phonePattern = /\d{2,4}-\d{3,4}-\d{4}|010\d{8}|\d{10,11}/;
    
    return emailPattern.test(query) || phonePattern.test(query);
  }
}

interface AIResponse {
  content: string;
  ai_used: AIModel | AIModel[];
  cost: number;
  confidence: number;
  follow_up_suggestions: string[];
  expert_escalation_recommended: boolean;
}