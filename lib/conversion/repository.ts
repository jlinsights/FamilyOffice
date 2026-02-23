import { createAdminClient } from '@/lib/supabase/admin-client';

import type {
  AttributionMetric,
  ConversionEvent,
  ConversionFunnel,
  FunnelStage,
  FunnelStageMetric,
} from './types';
import { FUNNEL_STAGES, getStageIndex } from './stages';

export class ConversionRepository {
  private get supabase() {
    return createAdminClient();
  }

  // === Events ===

  async insertEvent(
    event: Omit<ConversionEvent, 'id' | 'created_at'>
  ): Promise<void> {
    const { error } = await this.supabase
      .from('conversion_events')
      .insert(event as any);

    if (error) {
      console.error('[ConversionRepo] Failed to insert event:', error.message);
      throw error;
    }
  }

  async insertEvents(
    events: Omit<ConversionEvent, 'id' | 'created_at'>[]
  ): Promise<void> {
    if (events.length === 0) return;

    const { error } = await this.supabase
      .from('conversion_events')
      .insert(events as any);

    if (error) {
      console.error('[ConversionRepo] Failed to batch insert events:', error.message);
      throw error;
    }
  }

  // === Funnel ===

  async upsertFunnel(
    sessionId: string,
    updates: Partial<Omit<ConversionFunnel, 'id' | 'created_at'>>
  ): Promise<ConversionFunnel | null> {
    const { data, error } = await this.supabase
      .from('conversion_funnel')
      .upsert(
        {
          session_id: sessionId,
          ...updates,
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: 'session_id' }
      )
      .select()
      .single();

    if (error) {
      console.error('[ConversionRepo] Failed to upsert funnel:', error.message);
      return null;
    }

    return data as unknown as ConversionFunnel;
  }

  async getFunnelBySession(sessionId: string): Promise<ConversionFunnel | null> {
    const { data, error } = await this.supabase
      .from('conversion_funnel')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error || !data) return null;
    return data as unknown as ConversionFunnel;
  }

  async getFunnelByLeadId(leadId: string): Promise<ConversionFunnel | null> {
    const { data, error } = await this.supabase
      .from('conversion_funnel')
      .select('*')
      .eq('lead_id', leadId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;
    return data as unknown as ConversionFunnel;
  }

  // === Metrics ===

  async getFunnelMetrics(
    startDate: string,
    endDate: string,
    utmSource?: string
  ): Promise<FunnelStageMetric[]> {
    let query = this.supabase
      .from('conversion_funnel')
      .select('current_stage', { count: 'exact' })
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (utmSource) {
      query = query.eq('first_utm_source', utmSource);
    }

    // Count funnels that reached each stage
    const stageCounts: FunnelStageMetric[] = [];
    let previousCount = 0;

    for (const stage of FUNNEL_STAGES) {
      const stageIndex = getStageIndex(stage);
      let stageQuery = this.supabase
        .from('conversion_funnel')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      if (utmSource) {
        stageQuery = stageQuery.eq('first_utm_source', utmSource);
      }

      // Count funnels where current_stage >= this stage
      // A funnel at "lead" stage also counts for "visit" and "engaged"
      const stagesAtOrBeyond = FUNNEL_STAGES.slice(stageIndex);
      stageQuery = stageQuery.in('current_stage', stagesAtOrBeyond);

      const { count } = await stageQuery;
      const stageCount = count || 0;

      const conversionRate =
        previousCount > 0
          ? Number(((stageCount / previousCount) * 100).toFixed(1))
          : stageIndex === 0
            ? 100
            : 0;

      stageCounts.push({
        stage,
        count: stageCount,
        conversion_rate: conversionRate,
      });

      previousCount = stageCount;
    }

    return stageCounts;
  }

  async getAttributionMetrics(
    startDate: string,
    endDate: string
  ): Promise<AttributionMetric[]> {
    const { data, error } = await this.supabase
      .from('conversion_funnel')
      .select('first_utm_source, first_utm_medium, current_stage')
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error || !data) return [];

    // Group by source+medium
    const grouped = new Map<string, {
      source: string;
      medium: string;
      visitors: number;
      leads: number;
      consultations: number;
      clients: number;
    }>();

    for (const row of data as any[]) {
      const source = row.first_utm_source || 'direct';
      const medium = row.first_utm_medium || 'none';
      const key = `${source}|${medium}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          source,
          medium,
          visitors: 0,
          leads: 0,
          consultations: 0,
          clients: 0,
        });
      }

      const entry = grouped.get(key)!;
      entry.visitors++;

      const stageIndex = getStageIndex(row.current_stage);
      if (stageIndex >= getStageIndex('lead')) entry.leads++;
      if (stageIndex >= getStageIndex('consultation_booked')) entry.consultations++;
      if (stageIndex >= getStageIndex('client')) entry.clients++;
    }

    return Array.from(grouped.values())
      .map((entry) => ({
        ...entry,
        conversion_rate:
          entry.visitors > 0
            ? Number(((entry.clients / entry.visitors) * 100).toFixed(2))
            : 0,
      }))
      .sort((a, b) => b.visitors - a.visitors);
  }

  async getRecentConversions(limit = 20): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('conversion_events')
      .select('*')
      .in('event_type', [
        'consultation_form_submit',
        'structure_check_submit',
        'calcom_booking_created',
        'consultation_completed',
        'client_converted',
      ])
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) return [];
    return data || [];
  }

  async exportFunnelData(
    startDate: string,
    endDate: string
  ): Promise<ConversionFunnel[]> {
    const { data, error } = await this.supabase
      .from('conversion_funnel')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []) as unknown as ConversionFunnel[];
  }
}

export const conversionRepository = new ConversionRepository();
