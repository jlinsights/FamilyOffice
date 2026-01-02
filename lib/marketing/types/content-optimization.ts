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
