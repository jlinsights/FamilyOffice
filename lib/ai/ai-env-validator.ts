/**
 * AI 환경 변수 검증 및 상태 확인
 */
export class AIEnvironmentValidator {
  private static instance: AIEnvironmentValidator;
  private validationCache: Map<string, { valid: boolean; error?: string; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5분

  private constructor() {}

  static getInstance(): AIEnvironmentValidator {
    if (!AIEnvironmentValidator.instance) {
      AIEnvironmentValidator.instance = new AIEnvironmentValidator();
    }
    return AIEnvironmentValidator.instance;
  }

  /**
   * 모든 AI API 키 검증
   */
  async validateAllAPIKeys(): Promise<{
    claude: { valid: boolean; error?: string };
    openai: { valid: boolean; error?: string };
    gemini: { valid: boolean; error?: string };
    overall: boolean;
  }> {
    const cacheKey = 'all-api-keys';
    const cached = this.validationCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.valid as any;
    }

    const results = {
      claude: await this.validateClaudeAPI(),
      openai: await this.validateOpenAIAPI(),
      gemini: await this.validateGeminiAPI(),
      overall: false
    };

    results.overall = results.claude.valid || results.openai.valid || results.gemini.valid;

    this.validationCache.set(cacheKey, {
      valid: results,
      timestamp: Date.now()
    });

    return results;
  }

  /**
   * Claude API 검증
   */
  private async validateClaudeAPI(): Promise<{ valid: boolean; error?: string }> {
    const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return { valid: false, error: 'Claude API 키가 설정되지 않았습니다' };
    }

    try {
      const { Anthropic } = await import('@anthropic-ai/sdk');
      const client = new Anthropic({ apiKey });
      
      // 간단한 테스트 요청
      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hello' }]
      });

      return { valid: true };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Claude API 연결 실패' 
      };
    }
  }

  /**
   * OpenAI API 검증
   */
  private async validateOpenAIAPI(): Promise<{ valid: boolean; error?: string }> {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return { valid: false, error: 'OpenAI API 키가 설정되지 않았습니다' };
    }

    try {
      const OpenAI = await import('openai');
      const client = new OpenAI.default({ apiKey });
      
      // 간단한 테스트 요청
      const response = await client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hello' }]
      });

      return { valid: true };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'OpenAI API 연결 실패' 
      };
    }
  }

  /**
   * Gemini API 검증
   */
  private async validateGeminiAPI(): Promise<{ valid: boolean; error?: string }> {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      return { valid: false, error: 'Gemini API 키가 설정되지 않았습니다' };
    }

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      // 간단한 테스트 요청
      const result = await model.generateContent('Hello');
      const response = await result.response;

      return { valid: true };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Gemini API 연결 실패' 
      };
    }
  }

  /**
   * 개발 환경에서 사용할 수 있는 AI 서비스 확인
   */
  getAvailableServices(): string[] {
    const services = [];
    
    if (process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY) {
      services.push('Claude');
    }
    
    if (process.env.OPENAI_API_KEY) {
      services.push('OpenAI');
    }
    
    if (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY) {
      services.push('Gemini');
    }

    return services;
  }

  /**
   * 환경 변수 상태 요약
   */
  getEnvironmentSummary(): {
    isDevelopment: boolean;
    availableServices: string[];
    missingServices: string[];
    recommendations: string[];
  } {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const availableServices = this.getAvailableServices();
    const allServices = ['Claude', 'OpenAI', 'Gemini'];
    const missingServices = allServices.filter(service => !availableServices.includes(service));

    const recommendations = [];
    
    if (missingServices.length > 0) {
      recommendations.push(`${missingServices.join(', ')} API 키를 설정하면 더 정확한 답변을 받을 수 있습니다.`);
    }
    
    if (availableServices.length === 0) {
      recommendations.push('개발 환경에서는 기본 응답을 제공합니다. 프로덕션에서는 최소 하나의 AI 서비스가 필요합니다.');
    }

    return {
      isDevelopment,
      availableServices,
      missingServices,
      recommendations
    };
  }

  /**
   * 캐시 초기화
   */
  clearCache(): void {
    this.validationCache.clear();
  }
}