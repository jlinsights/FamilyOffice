// Type definitions for automated content optimization

// Historical performance data
interface HistoricalPerformance {
  traffic: number[];
  ranking: number[];
  engagement: number[];
}

// Generated content structure
interface GeneratedContent {
  title: string;
  metaDescription: string;
  headings: Array<{ level: number; text: string }>;
  sections: Array<{
    heading: string;
    content: string;
    keywords: string[];
  }>;
  callToActions: string[];
}

// SEO optimization result
interface SEOOptimization {
  titleTags: string[];
  metaTags: Record<string, string>;
  structuredData: StructuredData;
  internalLinks: string[];
}

// Structured data (Schema.org)
interface StructuredData {
  '@context': string;
  '@type': string;
  headline?: string;
  description?: string;
  [key: string]: unknown;
}

// Content quality metrics
interface ContentQuality {
  readability: number;
  seoOptimization: number;
  userValue: number;
  originalityScore: number;
}

// A/B test configuration
interface ABTestConfiguration {
  testId: string;
  url: string;
  variants: Array<{
    name: string;
    trafficAllocation: number;
    currentMetrics: Record<string, number>;
  }>;
  startDate: Date;
  duration: number;
  successMetric: string;
}

// Seasonal update
interface SeasonalUpdate {
  url: string;
  updateType: 'keyword' | 'content' | 'imagery' | 'offers';
  changes: string[];
  expectedImpact: string;
}

// Seasonal schedule
interface SeasonalSchedule {
  date: string;
  action: string;
  targetContent: string[];
}

// User intent analysis
interface UserIntentAnalysis {
  detectedIntent: string;
  confidence: number;
  userJourneyAlignment: number;
}

// Intent-based optimizations
interface IntentBasedOptimizations {
  contentStructure: string[];
  callToActions: string[];
  keywordFocus: string[];
  userExperience: string[];
}

// Conversion optimization
interface ConversionOptimization {
  recommendations: string[];
  expectedLift: number;
  testSuggestions: string[];
}

export type {
  ABTestConfiguration,
  ContentQuality,
  ConversionOptimization,
  GeneratedContent,
  HistoricalPerformance,
  IntentBasedOptimizations,
  SEOOptimization,
  SeasonalSchedule,
  SeasonalUpdate,
  StructuredData,
  UserIntentAnalysis,
};
