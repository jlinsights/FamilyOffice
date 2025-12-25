'use server';

import { createAdminClient } from '@/lib/supabase/admin-client';

export interface AdminStats {
  consultations: {
    total: number;
    today: number;
    pending: number;
  };
  structureChecks: {
    total: number;
    today: number;
    pending: number;
  };
}

export interface StructureCheckRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  q1_decision_made: 'yes' | 'no';
  q1_decision_detail?: string;
  q2_documented: 'yes' | 'no';
  q3_authority_clear: 'clear' | 'partial' | 'unclear';
  q4_cash_plan: 'structure_exists' | 'rough_idea' | 'not_considered';
  q5_deadline: 'within_6m' | '1_2y' | 'when_needed';
  q6_concerns?: string[];
  q7_advisors?: string[];
  additional_notes?: string;
  qualification_score: number;
  status: 'pending_review' | 'low_priority' | 'contacted' | 'completed';
  submitted_at: string;
}

export async function getStructureCheckRequests(): Promise<{
  data: StructureCheckRequest[] | null;
  error: string | null;
}> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('structure_check_requests')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return {
      data: data || [],
      error: null,
    };
  } catch (error: any) {
    console.error('Error fetching structure check requests:', error);
    return {
      data: null,
      error: error.message || 'Failed to fetch structure check requests',
    };
  }
}

export async function getAdminStats(): Promise<{
  data: AdminStats | null;
  error: string | null;
}> {
  try {
    const supabase = createAdminClient();

    // Check if client creation failed (though createAdminClient throws, we wrap in try/catch)

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).toISOString();

    // Fetch Total Consultations (This Month - to match UI "This Month")
    // Wait, UI says "67 This Month". Let's fetch "This Month".
    const { count: monthCount, error: monthError } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth);

    if (monthError) throw monthError;

    // Fetch Today's Scheduled (or just created today?)
    // UI says "Today Scheduled". But consultations table usually has 'scheduled_at' or just 'created_at'.
    // Let's check the schema in types/supabase.ts or just assume 'created_at' for 'Today's requests'
    // OR check for a specific status like 'scheduled'.
    // The table view showed: created_at, name, ... status.
    // Let's assume "Today" means "Requests received today".
    const { count: todayCount, error: todayError } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfDay);

    if (todayError) throw todayError;

    // Fetch Pending
    const { count: pendingCount, error: pendingError } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (pendingError) throw pendingError;

    // Fetch Structure Check Requests Statistics
    const { count: structureMonthCount, error: structureMonthError } =
      await supabase
        .from('structure_check_requests')
        .select('*', { count: 'exact', head: true })
        .gte('submitted_at', startOfMonth);

    if (structureMonthError) throw structureMonthError;

    const { count: structureTodayCount, error: structureTodayError } =
      await supabase
        .from('structure_check_requests')
        .select('*', { count: 'exact', head: true })
        .gte('submitted_at', startOfDay);

    if (structureTodayError) throw structureTodayError;

    const { count: structurePendingCount, error: structurePendingError } =
      await supabase
        .from('structure_check_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending_review');

    if (structurePendingError) throw structurePendingError;

    return {
      data: {
        consultations: {
          total: monthCount || 0,
          today: todayCount || 0,
          pending: pendingCount || 0,
        },
        structureChecks: {
          total: structureMonthCount || 0,
          today: structureTodayCount || 0,
          pending: structurePendingCount || 0,
        },
      },
      error: null,
    };
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return {
      data: null,
      error: error.message || 'Failed to fetch admin stats',
    };
  }
}
