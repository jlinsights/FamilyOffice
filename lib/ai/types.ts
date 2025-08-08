// Triple-AI 시스템 타입 정의

export interface ClientProfile {
  id: string;
  email: string;
  name?: string;
  company?: string;
  industry?: 'manufacturing' | 'construction' | 'it_venture' | 'family_corp';
  tier?: 'premium' | 'standard' | 'basic';
  language_preference?: 'ko' | 'en';
  consultation_history?: ConsultationRecord[];
  created_at: string;
}

export interface ConsultationRecord {
  id: string;
  timestamp: string;
  query: string;
  ai_used: AIModel;
  response_time: number;
  satisfaction_score?: number;
  follow_up_required?: boolean;
}

export const AIModel = {
  CLAUDE_OPUS: 'claude-opus',
  GPT4_TURBO: 'gpt4-turbo',
  GEMINI_PRO: 'gemini-pro',
  DEVELOPMENT_FALLBACK: 'development-fallback'
} as const;

export type AIModel = typeof AIModel[keyof typeof AIModel];

export const QueryType = {
  FAQ: 'faq',
  TAX_CALCULATION: 'tax_calc',
  SUCCESSION_STRATEGY: 'succession',
  DOCUMENT_ANALYSIS: 'doc_analysis',
  MARKET_RESEARCH: 'market',
  CRISIS_MANAGEMENT: 'crisis',
  RELATIONSHIP_MEDIATION: 'relationship',
  INNOVATION_STRATEGY: 'innovation',
  BASIC_INFO: 'basic_info',
  FINANCIAL_ANALYSIS: 'financial_analysis'
} as const;

export type QueryType = typeof QueryType[keyof typeof QueryType];

export const QueryDifficulty = {
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert'
} as const;

export type QueryDifficulty = typeof QueryDifficulty[keyof typeof QueryDifficulty];

export const ExecutionStrategy = {
  SINGLE_AI: 'single_ai',
  PARALLEL_HYBRID: 'parallel_hybrid',
  SEQUENTIAL_CASCADE: 'sequential_cascade',
  CONSENSUS_VOTING: 'consensus_voting',
  KEYWORD_MATCHING: 'keyword-matching'
} as const;

export type ExecutionStrategy = typeof ExecutionStrategy[keyof typeof ExecutionStrategy];

export interface QueryAnalysis {
  difficulty: QueryDifficulty;
  type: QueryType;
  urgency: 'immediate' | 'normal' | 'deep_analysis';
  cultural_sensitivity: 'high' | 'medium' | 'low';
  requires_multimodal: boolean;
  estimated_tokens: number;
  complexity_score: number; // 0.0 - 1.0
}

export interface RoutingDecision {
  primary_ai: AIModel;
  secondary_ai?: AIModel;
  strategy: ExecutionStrategy;
  estimated_response_time: number; // seconds
  estimated_cost: number; // USD
  confidence: number; // 0.0 - 1.0
}

export interface ConsultationResponse {
  id: string;
  timestamp: string;
  query: string;
  response: string;
  ai_used: AIModel | AIModel[];
  strategy_used: ExecutionStrategy;
  response_time: number;
  cost: number;
  confidence: number;
  follow_up_suggestions?: string[];
  expert_escalation_recommended?: boolean;
  korean_cultural_context?: KoreanContextualData;
}

export interface KoreanContextualData {
  formality_level: 'formal' | 'business' | 'casual';
  hierarchy_considerations: string[];
  cultural_recommendations: string[];
  relationship_building_notes: string[];
}

export interface FileAttachment {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  url: string;
  extracted_text?: string;
}

export interface PerformanceMetrics {
  response_time: {
    avg: number;
    p95: number;
    p99: number;
  };
  accuracy: {
    client_satisfaction: number; // 0.0 - 1.0
    expert_validation: number; // 0.0 - 1.0
    follow_up_rate: number; // 0.0 - 1.0
  };
  cost_efficiency: {
    cost_per_consultation: number;
    token_utilization: number;
    cache_hit_rate: number;
  };
}

export interface AIConfiguation {
  claude: {
    model: string;
    max_tokens: number;
    temperature: number;
    korean_prompt_optimization: boolean;
  };
  openai: {
    model: string;
    max_tokens: number;
    temperature: number;
    korean_language_mode: boolean;
  };
  gemini: {
    model: string;
    max_output_tokens: number;
    temperature: number;
    multimodal_enabled: boolean;
  };
}

export interface CacheEntry {
  key: string;
  value: any;
  ttl: number;
  created_at: number;
  accessed_count: number;
  last_accessed: number;
}

export interface SystemHealth {
  claude_status: 'healthy' | 'degraded' | 'unavailable';
  openai_status: 'healthy' | 'degraded' | 'unavailable';
  gemini_status: 'healthy' | 'degraded' | 'unavailable';
  cache_status: 'healthy' | 'degraded' | 'unavailable';
  overall_status: 'healthy' | 'degraded' | 'unavailable';
  last_check: string;
}