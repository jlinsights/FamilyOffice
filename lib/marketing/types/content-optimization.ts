/**
 * Content Optimization Types
 * Stub implementation for TypeScript compatibility
 */

export interface ContentOptimizationConfig {
  enabled: boolean;
  threshold: number;
}

export interface OptimizedContent {
  original: string;
  optimized: string;
  score: number;
}

export interface ABTestConfiguration {
  testId?: string;
  url?: string;
  enabled: boolean;
  variants: Array<
    | {
        name?: string;
        trafficAllocation?: number;
        currentMetrics?: Record<string, unknown>;
      }
    | string
  >;
  startDate?: Date;
  duration?: number;
  successMetric?: string;
}

export interface ContentQuality {
  score: number;
  metrics: Record<string, number>;
  readability?: number;
  seoOptimization?: number;
  userValue?: number;
  originalityScore?: number;
}

export interface ConversionOptimization {
  enabled: boolean;
  targetRate: number;
  recommendations?: string[];
  expectedLift?: number;
  testSuggestions?: string[];
}

export interface GeneratedContent {
  title: string;
  body?: string;
  metadata?: Record<string, unknown>;
  metaDescription?: string;
  headings?: Array<{ level: number; text: string }>;
  sections?: Array<{ heading: string; content: string; keywords: string[] }>;
  callToActions?: string[];
}

export interface HistoricalPerformance {
  views: number;
  clicks: number;
  conversions: number;
  traffic?: number;
}

export interface IntentBasedOptimizations {
  intent?: string;
  optimizations?: string[];
  contentStructure?: string[];
  callToActions?: string[];
  keywordFocus?: string[];
  userExperience?: string[];
}

export interface SEOOptimization {
  enabled: boolean;
  targetKeywords?: string[];
  titleTags?: string[];
  metaTags?: Record<string, string>;
  structuredData?: Record<string, unknown>;
  internalLinks?: string[];
}

export interface SeasonalSchedule {
  season?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  action?: string;
  targetContent?: string[];
}

export interface SeasonalUpdate {
  content?: string;
  schedule?: SeasonalSchedule;
  url?: string;
  updateType?: 'keyword' | 'content' | 'imagery' | 'offers';
  changes?: string[];
  expectedImpact?: string;
}

export interface UserIntentAnalysis {
  intent?: string;
  confidence: number;
  keywords?: string[];
  detectedIntent?: string;
  userJourneyAlignment?: number;
}
