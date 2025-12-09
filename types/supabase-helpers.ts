/**
 * Supabase Type Helpers
 * Helper types and utilities to work around Supabase SSR type inference limitations
 */

import { Database } from './supabase';

// Extract table row types for easier use
export type Tables = Database['public']['Tables'];

export type Consultation = Tables['consultations']['Row'];
export type User = Tables['users']['Row'];
export type PerformanceMetric = Tables['performance_metrics']['Row'];
export type ContentRecommendation = Tables['content_recommendations']['Row'];
export type WorkflowExecution = Tables['workflow_executions']['Row'];
export type LeadActivity = Tables['lead_activities']['Row'];

// Insert types
export type ConsultationInsert = Tables['consultations']['Insert'];
export type UserInsert = Tables['users']['Insert'];
export type PerformanceMetricInsert = Tables['performance_metrics']['Insert'];
export type ContentRecommendationInsert = Tables['content_recommendations']['Insert'];
export type WorkflowExecutionInsert = Tables['workflow_executions']['Insert'];
export type LeadActivityInsert = Tables['lead_activities']['Insert'];

// Update types
export type ConsultationUpdate = Tables['consultations']['Update'];
export type UserUpdate = Tables['users']['Update'];
export type PerformanceMetricUpdate = Tables['performance_metrics']['Update'];
export type ContentRecommendationUpdate = Tables['content_recommendations']['Update'];
export type WorkflowExecutionUpdate = Tables['workflow_executions']['Update'];
export type LeadActivityUpdate = Tables['lead_activities']['Update'];

// Type guard to assert Supabase query results
export function assertQueryResult<T>(data: unknown): asserts data is T[] {
  if (!Array.isArray(data)) {
    throw new Error('Expected array from query result');
  }
}

// Helper to safely access query results with type assertion
export function getQueryData<T>(data: unknown): T[] {
  assertQueryResult<T>(data);
  return data;
}

// Helper for single row results
export function getSingleResult<T>(data: unknown): T {
  if (!data || typeof data !== 'object') {
    throw new Error('Expected object from query result');
  }
  return data as T;
}
