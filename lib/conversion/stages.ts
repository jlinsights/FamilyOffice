import type { ConversionEventType, FunnelStage } from './types';

// Ordered stages for transition validation
const STAGE_ORDER: FunnelStage[] = [
  'visit',
  'engaged',
  'lead',
  'consultation_booked',
  'consultation_done',
  'client',
];

// Map event types to the funnel stage they represent
const EVENT_TO_STAGE: Record<ConversionEventType, FunnelStage> = {
  // Stage 1: Visit
  page_view: 'visit',
  session_start: 'visit',
  // Stage 2: Engaged
  scroll_depth: 'engaged',
  time_on_site: 'engaged',
  multi_page_view: 'engaged',
  // Stage 3: Lead
  consultation_form_submit: 'lead',
  structure_check_submit: 'lead',
  newsletter_signup: 'lead',
  // Stage 4
  calcom_booking_created: 'consultation_booked',
  // Stage 5
  consultation_completed: 'consultation_done',
  // Stage 6
  client_converted: 'client',
  // Attribution events don't advance stage
  cta_click: 'visit',
};

/**
 * Get the funnel stage index (0-based)
 */
export function getStageIndex(stage: FunnelStage): number {
  return STAGE_ORDER.indexOf(stage);
}

/**
 * Determine funnel stage from event type
 */
export function getStageForEvent(eventType: ConversionEventType): FunnelStage {
  return EVENT_TO_STAGE[eventType];
}

/**
 * Check if a stage transition is valid (only forward allowed)
 */
export function isValidTransition(
  currentStage: FunnelStage,
  newStage: FunnelStage
): boolean {
  const currentIndex = getStageIndex(currentStage);
  const newIndex = getStageIndex(newStage);
  return newIndex > currentIndex;
}

/**
 * Get the next allowed stages from a given stage
 */
export function getNextAllowedStages(currentStage: FunnelStage): FunnelStage[] {
  const currentIndex = getStageIndex(currentStage);
  return STAGE_ORDER.slice(currentIndex + 1);
}

/**
 * Get the timestamp column name for a stage
 */
export function getStageTimestampColumn(stage: FunnelStage): string {
  const map: Record<FunnelStage, string> = {
    visit: 'visited_at',
    engaged: 'engaged_at',
    lead: 'lead_at',
    consultation_booked: 'consultation_booked_at',
    consultation_done: 'consultation_done_at',
    client: 'client_at',
  };
  return map[stage];
}

/**
 * Determine if the incoming event should advance the funnel stage
 */
export function shouldAdvanceStage(
  currentStage: FunnelStage,
  eventType: ConversionEventType
): boolean {
  const eventStage = getStageForEvent(eventType);
  return isValidTransition(currentStage, eventStage);
}

/**
 * All stage values in order
 */
export const FUNNEL_STAGES = STAGE_ORDER;
