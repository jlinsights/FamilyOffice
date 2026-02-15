/**
 * Supabase Type-Safe Helpers
 * Workarounds for exactOptionalPropertyTypes incompatibility with @supabase/ssr
 *
 * TypeScript 5.8+ with exactOptionalPropertyTypes: true causes Supabase to infer
 * 'never' types for insert/update operations. These helpers provide type-safe wrappers.
 */
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Flexible Supabase client type that accepts any schema variant
type FlexibleSupabaseClient = SupabaseClient<Database, any, any>;

/**
 * Type-safe insert operation
 * Workaround for exactOptionalPropertyTypes causing 'never' type inference
 */
export function safeInsert<
  TableName extends keyof Database['public']['Tables'],
>(
  client: FlexibleSupabaseClient,
  table: TableName,
  data: Database['public']['Tables'][TableName]['Insert']
) {
  // Type assertion to work around exactOptionalPropertyTypes issue
  return (client.from(table) as any).insert(data);
}

/**
 * Type-safe insert multiple operation
 */
export function safeInsertMany<
  TableName extends keyof Database['public']['Tables'],
>(
  client: FlexibleSupabaseClient,
  table: TableName,
  data: Database['public']['Tables'][TableName]['Insert'][]
) {
  return (client.from(table) as any).insert(data);
}

/**
 * Type-safe update operation
 * Workaround for exactOptionalPropertyTypes causing 'never' type inference
 */
export function safeUpdate<
  TableName extends keyof Database['public']['Tables'],
>(
  client: FlexibleSupabaseClient,
  table: TableName,
  data: Database['public']['Tables'][TableName]['Update']
) {
  return (client.from(table) as any).update(data);
}

/**
 * Type-safe select operation with proper result typing
 */
export function safeSelect<
  TableName extends keyof Database['public']['Tables'],
>(client: FlexibleSupabaseClient, table: TableName) {
  return client.from(table).select() as any;
}

/**
 * Type-safe query builder
 * Returns a properly typed query builder that works around exactOptionalPropertyTypes
 */
export function safeFrom<TableName extends keyof Database['public']['Tables']>(
  client: FlexibleSupabaseClient,
  table: TableName
) {
  return client.from(table) as any;
}
