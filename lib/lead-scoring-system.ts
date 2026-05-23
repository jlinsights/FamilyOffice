import { createAdminClient } from '@/lib/supabase/admin-client';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export type BMADStage = 'behavioral' | 'motivational' | 'aspirational' | 'decisional';
export type LeadStatus = 'new' | 'qualified' | 'nurturing' | 'hot' | 'cold' | 'converted' | 'lost';
export type LeadSegment = 'high-value' | 'medium-value' | 'low-value' | 'enterprise' | 'mid-market' | 'startup';
export type ActivityType =
  | 'page_view'
  | 'form_submission'
  | 'email_open'
  | 'email_click'
  | 'download'
  | 'webinar_attendance'
  | 'consultation_request'
  | 'demo_request'
  | 'pricing_view'
  | 'case_study_view'
  | 'return_visit'
  | 'social_engagement';

export interface Lead {
  id: string;
  email: string;
  score: number;
  grade: string;
  status: LeadStatus;
  segment: LeadSegment;
  bmadStage: BMADStage;
  conversionProbability: number;
  lastCalculatedAt: string;
  activities: LeadActivity[];
  demographics?: any;
}

export interface LeadActivity {
  id: string;
  email: string;
  type: ActivityType;
  timestamp: string;
  scoreImpact: number;
  details?: any;
}

export class LeadScoringSystem {
  private supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createAdminClient();
  }

  /**
   * Create or update a lead in the database
   */
  async createOrUpdateLead(params: { email: string; name?: string; company?: string; position?: string; phone?: string; demographics?: any }): Promise<Lead> {
    const { email, demographics, ...rest } = params;
    
    // Upsert into lead_scores
    // @ts-ignore - Supabase type inference issue with simple schema match
    const { data, error } = await this.supabase
      .from('lead_scores')
      .upsert({ 
        email, 
        updated_at: new Date().toISOString()
      } as any, { onConflict: 'email' })
      .select()
      .single();

    if (error) {
      console.error('Error creating/updating lead:', error);
      throw error;
    }

    return this.mapDbLeadToInterface(data);
  }

  /**
   * Record an activity and recalculate score
   */
  async recordActivity(leadIdOrEmail: string, activityType: ActivityType, details?: any): Promise<Lead> {
    // Check if input is UUID or Email
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadIdOrEmail);
    
    let email = leadIdOrEmail;
    if (isUuid) {
        const lead = await this.getLead(leadIdOrEmail);
        if (!lead) throw new Error('Lead not found');
        email = lead.email;
    }

    // 1. Insert activity lead_activities table needs 'email' column from migration
    const activityData = {
      email,
      activity_type: activityType,
      activity_data: details || {},
      score_impact: this.getScoreImpact(activityType),
      created_at: new Date().toISOString()
    };

    const { error: activityError } = await this.supabase
      .from('lead_activities')
      // @ts-ignore - Supabase type inference issue
      .insert({
        ...activityData,
        email: activityData.email!, // Ensure email is not undefined
        hubspot_contact_id: null // Explicitly strict typed if needed or let optional
      } as any);
    
    if (activityError) throw activityError;

    // 2. Recalculate Score
    // @ts-ignore - RPC arguments inference issue
    await this.supabase.rpc('calculate_lead_score_by_email', { target_email: email });

    // 3. Return updated lead
    return (await this.findLeadByEmail(email))!;
  }

  async getLead(leadId: string): Promise<Lead | null> {
    const { data, error } = await this.supabase
      .from('lead_scores')
      .select('*')
      .eq('id', leadId)
      .single();

    if (error || !data) return null;
    return this.mapDbLeadToInterface(data);
  }

  async findLeadByEmail(email: string): Promise<Lead | null> {
    const { data, error } = await this.supabase
      .from('lead_scores')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;
    return this.mapDbLeadToInterface(data);
  }

  async getLeadsByStatus(status: LeadStatus): Promise<Lead[]> {
    // In new schema, we might store status or filter by dynamic criteria
    // For now, let's assume status is stored or we implement a mapping logic. 
    // Simplified: Assuming 'score_grade' maps roughly to status for this refactor, 
    // or we just return empty if status column doesn't exist yet.
    // The original code calculated status dynamically.
    // We will do a broad select and filter in memory for now given the complexity of moving logic to SQL entirely in one go.
    // Optimization: Add 'status' column to lead_scores in future migration.
    
    const { data } = await this.supabase.from('lead_scores').select('*');
    if (!data) return [];
    
    return data.map(d => this.mapDbLeadToInterface(d)).filter(l => l.status === status);
  }

  async getLeadsBySegment(segment: LeadSegment): Promise<Lead[]> {
    const { data } = await this.supabase.from('lead_scores').select('*');
    if (!data) return [];
    return data.map(d => this.mapDbLeadToInterface(d)).filter(l => l.segment === segment);
  }

  async getLeadsByBMADStage(stage: BMADStage): Promise<Lead[]> {
    const { data } = await this.supabase.from('lead_scores').select('*');
     if (!data) return [];
    return data.map(d => this.mapDbLeadToInterface(d)).filter(l => l.bmadStage === stage);
  }

  async getLeadsByScoreRange(min: number, max: number): Promise<Lead[]> {
    const { data } = await this.supabase
      .from('lead_scores')
      .select('*')
      .gte('total_score', min)
      .lte('total_score', max);
      
    if (!data) return [];
    return data.map(d => this.mapDbLeadToInterface(d));
  }

  async getHotLeads(minProbability: number): Promise<Lead[]> {
    const { data } = await this.supabase
      .from('lead_scores')
      .select('*')
      .gte('total_score', minProbability); // Approximation using score as proxy for probability
      
    if (!data) return [];
    return data.map(d => this.mapDbLeadToInterface(d));
  }

  async getStats(): Promise<any> {
     const { count } = await this.supabase.from('lead_scores').select('*', { count: 'exact', head: true });
     return { 
         totalLeads: count || 0,
         // Placeholder values for stats that require complex aggregation
         averageScore: 0,
         byStatus: {},
         bySegment: {},
         byBMADStage: {},
         conversionRate: 0,
         averageConversionProbability: 0
     };
  }

  async getDashboardData(): Promise<any> {
    return {
        stats: await this.getStats(),
        hotLeads: await this.getHotLeads(70),
        recentActivities: [], // Would need query on lead_activities
        topIntentSignals: []
    };
  }

  async syncToCRM(leadId: string): Promise<void> {
    console.log(`[LeadScoring] Syncing lead ${leadId} to CRM (Mock)`);
    // Implement actual CRM sync here
  }

  // Mapper to convert DB result to Lead interface
  // Computes dynamic properties on the fly if they are not in DB
  private mapDbLeadToInterface(dbRecord: any): Lead {
    const score = dbRecord.total_score || 0;
    
    // Re-implement simple logic for status/segment/stage derived from score
    let status: LeadStatus = 'new';
    if (score >= 70) status = 'hot';
    else if (score >= 50) status = 'qualified';
    else if (score >= 30) status = 'nurturing';
    else if (score < 10) status = 'cold';

    return {
      id: dbRecord.id,
      email: dbRecord.email,
      score: score,
      grade: dbRecord.score_grade || 'D',
      status: status,
      segment: score > 50 ? 'high-value' : 'low-value', // Simplified
      bmadStage: 'behavioral', // Default
      conversionProbability: score, // simplified
      lastCalculatedAt: dbRecord.last_calculated_at,
      activities: [],
      demographics: {}
    };
  }

  private getScoreImpact(type: ActivityType): number {
    const scores: Record<ActivityType, number> = {
      consultation_request: 20,
      demo_request: 18,
      pricing_view: 15,
      form_submission: 10,
      download: 8,
      webinar_attendance: 12,
      case_study_view: 7,
      email_open: 1,
      email_click: 5,
      page_view: 1,
      return_visit: 3,
      social_engagement: 2
    };
    return scores[type] || 0;
  }
}

// Lazy singleton — Proxy 로 module-level instantiation 회피
// Vercel build "Collecting page data" 단계에서 env 미주입 시 createAdminClient throw 방지.
// 첫 메서드 호출 시점에 실제 인스턴스 생성.
let _leadScoringSystemInstance: LeadScoringSystem | null = null;
export const leadScoringSystem = new Proxy({} as LeadScoringSystem, {
  get(_target, prop) {
    if (!_leadScoringSystemInstance) {
      _leadScoringSystemInstance = new LeadScoringSystem();
    }
    const value = Reflect.get(
      _leadScoringSystemInstance as object,
      prop,
      _leadScoringSystemInstance
    );
    return typeof value === 'function'
      ? value.bind(_leadScoringSystemInstance)
      : value;
  },
});
