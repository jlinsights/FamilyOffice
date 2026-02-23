import { createHash } from 'crypto';

import { conversionRepository } from './repository';
import {
  getStageForEvent,
  getStageTimestampColumn,
  isValidTransition,
} from './stages';

import type {
  ConversionEventPayload,
  ConversionFunnel,
  FunnelMetrics,
  FunnelStage,
  AttributionMetric,
} from './types';

// Lazy import to avoid circular deps
let _leadScoringSystem: any = null;
async function getLeadScoringSystem() {
  if (!_leadScoringSystem) {
    const mod = await import('@/lib/lead-scoring-system');
    _leadScoringSystem = mod.leadScoringSystem;
  }
  return _leadScoringSystem;
}

export class ConversionTrackingService {
  private repo = conversionRepository;

  /**
   * Record a client-side or server-side event.
   * Non-blocking: errors are logged but don't propagate to callers.
   */
  async recordEvent(
    payload: ConversionEventPayload,
    serverContext?: {
      email?: string;
      leadId?: string;
      ip?: string;
      userAgent?: string;
    }
  ): Promise<void> {
    try {
      const eventStage = getStageForEvent(payload.event_type);

      // 1. Insert event
      await this.repo.insertEvent({
        session_id: payload.session_id,
        event_type: payload.event_type,
        funnel_stage: eventStage,
        page_path: payload.page_path,
        page_title: payload.page_title,
        referrer: payload.referrer,
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
        utm_content: payload.utm_content,
        utm_term: payload.utm_term,
        metadata: payload.metadata,
        email: serverContext?.email,
        lead_id: serverContext?.leadId,
        ip_hash: serverContext?.ip ? this.hashIp(serverContext.ip) : undefined,
        user_agent: serverContext?.userAgent,
        client_timestamp: payload.client_timestamp,
      });

      // 2. Update funnel
      await this.updateFunnel(payload, eventStage, serverContext);

      // 3. Bridge to LeadScoringSystem for lead-stage events
      await this.bridgeToLeadScoring(payload, serverContext);
    } catch (error) {
      console.error('[ConversionTracking] recordEvent failed:', error);
    }
  }

  /**
   * Record multiple events in batch
   */
  async recordEvents(
    payloads: ConversionEventPayload[],
    serverContext?: {
      ip?: string;
      userAgent?: string;
    }
  ): Promise<void> {
    for (const payload of payloads) {
      await this.recordEvent(payload, serverContext);
    }
  }

  /**
   * Manually advance a funnel stage (admin action for stages 5-6)
   */
  async advanceStage(
    leadId: string,
    newStage: FunnelStage,
    options?: { notes?: string; metadata?: Record<string, unknown> }
  ): Promise<{ previous_stage: FunnelStage; current_stage: FunnelStage } | null> {
    try {
      const funnel = await this.repo.getFunnelByLeadId(leadId);
      if (!funnel) {
        console.error('[ConversionTracking] No funnel found for lead:', leadId);
        return null;
      }

      const currentStage = funnel.current_stage as FunnelStage;

      if (!isValidTransition(currentStage, newStage)) {
        throw new Error(
          `Invalid stage transition: ${currentStage} -> ${newStage}`
        );
      }

      const timestampCol = getStageTimestampColumn(newStage);
      const now = new Date().toISOString();

      await this.repo.upsertFunnel(funnel.session_id, {
        current_stage: newStage,
        [timestampCol]: now,
      });

      // Record the transition as an event
      const eventType = newStage === 'consultation_done'
        ? 'consultation_completed' as const
        : 'client_converted' as const;

      await this.repo.insertEvent({
        session_id: funnel.session_id,
        event_type: eventType,
        funnel_stage: newStage,
        page_path: '/admin',
        email: funnel.email,
        lead_id: leadId,
        metadata: {
          ...options?.metadata,
          notes: options?.notes,
          admin_action: true,
        },
      });

      return { previous_stage: currentStage, current_stage: newStage };
    } catch (error) {
      console.error('[ConversionTracking] advanceStage failed:', error);
      throw error;
    }
  }

  /**
   * Get funnel metrics for admin dashboard
   */
  async getFunnelMetrics(
    startDate: string,
    endDate: string,
    utmSource?: string
  ): Promise<FunnelMetrics> {
    const stages = await this.repo.getFunnelMetrics(
      startDate,
      endDate,
      utmSource
    );

    const totalVisitors = stages.find((s) => s.stage === 'visit')?.count || 0;
    const totalClients = stages.find((s) => s.stage === 'client')?.count || 0;

    return {
      period: { start: startDate, end: endDate },
      stages,
      total_visitors: totalVisitors,
      total_clients: totalClients,
      overall_conversion_rate:
        totalVisitors > 0
          ? Number(((totalClients / totalVisitors) * 100).toFixed(2))
          : 0,
    };
  }

  /**
   * Get attribution metrics for admin dashboard
   */
  async getAttributionMetrics(
    startDate: string,
    endDate: string
  ): Promise<AttributionMetric[]> {
    return this.repo.getAttributionMetrics(startDate, endDate);
  }

  /**
   * Get recent conversion events for live feed
   */
  async getRecentConversions(limit = 20) {
    return this.repo.getRecentConversions(limit);
  }

  /**
   * Export funnel data as array (caller formats as CSV)
   */
  async exportFunnelData(startDate: string, endDate: string) {
    return this.repo.exportFunnelData(startDate, endDate);
  }

  // === Private ===

  private async updateFunnel(
    payload: ConversionEventPayload,
    eventStage: FunnelStage,
    serverContext?: { email?: string; leadId?: string }
  ): Promise<void> {
    const existing = await this.repo.getFunnelBySession(payload.session_id);

    if (!existing) {
      // Create new funnel record
      await this.repo.upsertFunnel(payload.session_id, {
        current_stage: eventStage,
        visited_at: new Date().toISOString(),
        first_utm_source: payload.utm_source,
        first_utm_medium: payload.utm_medium,
        first_utm_campaign: payload.utm_campaign,
        first_landing_page: payload.page_path,
        first_referrer: payload.referrer,
        email: serverContext?.email,
        lead_id: serverContext?.leadId,
        total_events: 1,
        total_page_views: payload.event_type === 'page_view' ? 1 : 0,
        [getStageTimestampColumn(eventStage)]: new Date().toISOString(),
      });
      return;
    }

    // Update existing funnel
    const updates: Record<string, any> = {
      total_events: (existing.total_events || 0) + 1,
    };

    if (payload.event_type === 'page_view') {
      updates.total_page_views = (existing.total_page_views || 0) + 1;
    }

    // Advance stage if applicable
    const currentStage = existing.current_stage as FunnelStage;
    if (isValidTransition(currentStage, eventStage)) {
      updates.current_stage = eventStage;
      updates[getStageTimestampColumn(eventStage)] = new Date().toISOString();
    }

    // Set email/lead_id if becoming a lead
    if (serverContext?.email && !existing.email) {
      updates.email = serverContext.email;
    }
    if (serverContext?.leadId && !existing.lead_id) {
      updates.lead_id = serverContext.leadId;
    }

    await this.repo.upsertFunnel(payload.session_id, updates);
  }

  /**
   * Bridge conversion events to the existing LeadScoringSystem.
   * Maps conversion event types to LeadScoring activity types.
   */
  private async bridgeToLeadScoring(
    payload: ConversionEventPayload,
    serverContext?: { email?: string; leadId?: string }
  ): Promise<void> {
    const email = serverContext?.email;
    if (!email) return;

    const eventToActivity: Record<string, string> = {
      consultation_form_submit: 'consultation_request',
      structure_check_submit: 'form_submission',
      calcom_booking_created: 'consultation_request',
      page_view: 'page_view',
    };

    const activityType = eventToActivity[payload.event_type];
    if (!activityType) return;

    try {
      const lss = await getLeadScoringSystem();
      await lss.recordActivity(email, activityType, {
        source: 'conversion_tracking',
        event_type: payload.event_type,
        page_path: payload.page_path,
      });
    } catch (error) {
      // Non-blocking: lead scoring bridge should never break tracking
      console.error('[ConversionTracking] LeadScoring bridge error:', error);
    }
  }

  private hashIp(ip: string): string {
    const dailySalt = new Date().toISOString().split('T')[0];
    return createHash('sha256')
      .update(`${ip}:${dailySalt}`)
      .digest('hex')
      .slice(0, 16);
  }
}

export const conversionTrackingService = new ConversionTrackingService();
