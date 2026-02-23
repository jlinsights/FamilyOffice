import { z } from 'zod';

// === Funnel Stages ===
export const FunnelStage = z.enum([
  'visit',
  'engaged',
  'lead',
  'consultation_booked',
  'consultation_done',
  'client',
]);
export type FunnelStage = z.infer<typeof FunnelStage>;

// === Event Types ===
export const ConversionEventType = z.enum([
  // Stage 1: Visit
  'page_view',
  'session_start',
  // Stage 2: Engaged
  'scroll_depth',
  'time_on_site',
  'multi_page_view',
  // Stage 3: Lead
  'consultation_form_submit',
  'structure_check_submit',
  'newsletter_signup',
  // Stage 4: Consultation Booked
  'calcom_booking_created',
  // Stage 5: Consultation Done
  'consultation_completed',
  // Stage 6: Client
  'client_converted',
  // Attribution
  'cta_click',
]);
export type ConversionEventType = z.infer<typeof ConversionEventType>;

// === Client → Server Event Payload ===
export const ConversionEventPayload = z.object({
  event_type: ConversionEventType,
  session_id: z.string().uuid(),
  page_path: z.string().max(500),
  page_title: z.string().max(200).optional(),
  referrer: z.string().max(1000).optional(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  metadata: z.record(z.unknown()).optional(),
  client_timestamp: z.string().datetime().optional(),
});
export type ConversionEventPayload = z.infer<typeof ConversionEventPayload>;

// Batch payload (max 20 events)
export const ConversionEventBatchPayload = z.union([
  ConversionEventPayload,
  z.array(ConversionEventPayload).max(20),
]);
export type ConversionEventBatchPayload = z.infer<typeof ConversionEventBatchPayload>;

// === Server-side enriched event ===
export interface ConversionEvent {
  id: string;
  session_id: string;
  event_type: ConversionEventType;
  funnel_stage: FunnelStage;
  page_path: string;
  page_title?: string | undefined;
  referrer?: string | undefined;
  utm_source?: string | undefined;
  utm_medium?: string | undefined;
  utm_campaign?: string | undefined;
  utm_content?: string | undefined;
  utm_term?: string | undefined;
  metadata?: Record<string, unknown> | undefined;
  email?: string | undefined;
  lead_id?: string | undefined;
  ip_hash?: string | undefined;
  user_agent?: string | undefined;
  client_timestamp?: string | undefined;
  created_at: string;
}

// === Funnel Record ===
export interface ConversionFunnel {
  id: string;
  session_id: string;
  email?: string | undefined;
  lead_id?: string | undefined;
  current_stage: FunnelStage;
  visited_at: string;
  engaged_at?: string | undefined;
  lead_at?: string | undefined;
  consultation_booked_at?: string | undefined;
  consultation_done_at?: string | undefined;
  client_at?: string | undefined;
  first_utm_source?: string | undefined;
  first_utm_medium?: string | undefined;
  first_utm_campaign?: string | undefined;
  first_landing_page?: string | undefined;
  first_referrer?: string | undefined;
  total_events: number;
  total_page_views: number;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

// === Admin Dashboard Types ===
export interface FunnelStageMetric {
  stage: FunnelStage;
  count: number;
  conversion_rate: number;
}

export interface FunnelMetrics {
  period: { start: string; end: string };
  stages: FunnelStageMetric[];
  total_visitors: number;
  total_clients: number;
  overall_conversion_rate: number;
}

export interface AttributionMetric {
  source: string;
  medium: string;
  visitors: number;
  leads: number;
  consultations: number;
  clients: number;
  conversion_rate: number;
}

// === Stage Advance Request ===
export const StageAdvanceRequest = z.object({
  stage: FunnelStage,
  notes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});
export type StageAdvanceRequest = z.infer<typeof StageAdvanceRequest>;
