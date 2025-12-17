export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          service_type: string;
          message: string;
          status: 'pending' | 'contacted' | 'completed';
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          service_type?: string;
          message?: string;
          status?: 'pending' | 'contacted' | 'completed';
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          service_type?: string;
          message?: string;
          status?: 'pending' | 'contacted' | 'completed';
        };
      };
      users: {
        Row: {
          id: string;
          clerk_id: string | null;
          email: string | null;
          first_name: string | null;
          last_name: string | null;
          name: string | null;
          image_url: string | null;
          avatar_url: string | null;
          company_name: string | null;
          phone_number: string | null;
          phone: string | null;
          kakao_id: string | null;
          kakao_access_token: string | null;
          provider: string | null;
          marketing_consent: boolean | null;
          last_sign_in_at: string | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id?: string | null;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          name?: string | null;
          image_url?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          phone_number?: string | null;
          phone?: string | null;
          kakao_id?: string | null;
          kakao_access_token?: string | null;
          provider?: string | null;
          marketing_consent?: boolean | null;
          last_sign_in_at?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string | null;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          name?: string | null;
          image_url?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          phone_number?: string | null;
          phone?: string | null;
          kakao_id?: string | null;
          kakao_access_token?: string | null;
          provider?: string | null;
          marketing_consent?: boolean | null;
          last_sign_in_at?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      performance_metrics: {
        Row: {
          id: string;
          metric_name: string;
          metric_value: number;
          metric_type: string;
          url: string | null;
          user_agent: string | null;
          timestamp: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          metric_name: string;
          metric_value: number;
          metric_type?: string;
          url?: string | null;
          user_agent?: string | null;
          timestamp?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          metric_name?: string;
          metric_value?: number;
          metric_type?: string;
          url?: string | null;
          user_agent?: string | null;
          timestamp?: string;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      content_recommendations: {
        Row: {
          id: string;
          user_id: string | null;
          hubspot_contact_id: string | null;
          content_id: string;
          content_title: string;
          content_type: string;
          content_url: string;
          relevance_score: number;
          ai_confidence: number;
          recommendation_reason: string | null;
          status: string;
          created_at: string;
          viewed_at: string | null;
          clicked_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          hubspot_contact_id?: string | null;
          content_id: string;
          content_title: string;
          content_type: string;
          content_url: string;
          relevance_score: number;
          ai_confidence: number;
          recommendation_reason?: string | null;
          status?: string;
          created_at?: string;
          viewed_at?: string | null;
          clicked_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          hubspot_contact_id?: string | null;
          content_id?: string;
          content_title?: string;
          content_type?: string;
          content_url?: string;
          relevance_score?: number;
          ai_confidence?: number;
          recommendation_reason?: string | null;
          status?: string;
          created_at?: string;
          viewed_at?: string | null;
          clicked_at?: string | null;
        };
      };
      workflow_executions: {
        Row: {
          id: string;
          workflow_id: string;
          workflow: Json | null;
          workflow_steps: Json | null;
          hubspot_contact_id: string;
          status: string;
          current_step: number;
          total_steps: number;
          execution_data: Json | null;
          error_message: string | null;
          started_at: string;
          completed_at: string | null;
          next_action_at: string | null;
          created_at: string;
          updated_at: string;
          enrolled_count: number;
        };
        Insert: {
          id?: string;
          workflow_id: string;
          workflow?: Json | null;
          workflow_steps?: Json | null;
          hubspot_contact_id: string;
          status?: string;
          current_step?: number;
          total_steps: number;
          execution_data?: Json | null;
          error_message?: string | null;
          started_at?: string;
          completed_at?: string | null;
          next_action_at?: string | null;
          created_at?: string;
          updated_at?: string;
          enrolled_count?: number;
        };
        Update: {
          id?: string;
          workflow_id?: string;
          workflow?: Json | null;
          workflow_steps?: Json | null;
          hubspot_contact_id?: string;
          status?: string;
          current_step?: number;
          total_steps?: number;
          execution_data?: Json | null;
          error_message?: string | null;
          started_at?: string;
          completed_at?: string | null;
          next_action_at?: string | null;
          created_at?: string;
          updated_at?: string;
          enrolled_count?: number;
        };
      };
      lead_activities: {
        Row: {
          id: string;
          hubspot_contact_id: string;
          user_id: string | null;
          activity_type: string;
          activity_data: Json;
          score_impact: number;
          total_score: number;
          score_grade: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          hubspot_contact_id: string;
          user_id?: string | null;
          activity_type: string;
          activity_data?: Json;
          score_impact: number;
          total_score?: number;
          score_grade?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          hubspot_contact_id?: string;
          user_id?: string | null;
          activity_type?: string;
          activity_data?: Json;
          score_impact?: number;
          total_score?: number;
          score_grade?: string | null;
          created_at?: string;
        };
      };
      structure_check_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company: string | null;
          q1_decision_made: 'yes' | 'no';
          q1_decision_detail: string | null;
          q2_documented: 'yes' | 'no';
          q3_authority_clear: 'clear' | 'partial' | 'unclear';
          q4_cash_plan: 'structure_exists' | 'rough_idea' | 'not_considered';
          q5_deadline: 'within_6m' | '1_2y' | 'when_needed';
          q6_concerns: string[] | null;
          q7_advisors: string[] | null;
          additional_notes: string | null;
          qualification_score: number;
          status: string;
          meeting_scheduled_at: string | null;
          meeting_completed_at: string | null;
          admin_notes: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          confirmation_email_sent: boolean;
          confirmation_email_sent_at: string | null;
          meeting_email_sent: boolean;
          meeting_email_sent_at: string | null;
          submitted_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          company?: string | null;
          q1_decision_made: 'yes' | 'no';
          q1_decision_detail?: string | null;
          q2_documented: 'yes' | 'no';
          q3_authority_clear: 'clear' | 'partial' | 'unclear';
          q4_cash_plan: 'structure_exists' | 'rough_idea' | 'not_considered';
          q5_deadline: 'within_6m' | '1_2y' | 'when_needed';
          q6_concerns?: string[] | null;
          q7_advisors?: string[] | null;
          additional_notes?: string | null;
          qualification_score?: number;
          status?: string;
          meeting_scheduled_at?: string | null;
          meeting_completed_at?: string | null;
          admin_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          confirmation_email_sent?: boolean;
          confirmation_email_sent_at?: string | null;
          meeting_email_sent?: boolean;
          meeting_email_sent_at?: string | null;
          submitted_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          company?: string | null;
          q1_decision_made?: 'yes' | 'no';
          q1_decision_detail?: string | null;
          q2_documented?: 'yes' | 'no';
          q3_authority_clear?: 'clear' | 'partial' | 'unclear';
          q4_cash_plan?: 'structure_exists' | 'rough_idea' | 'not_considered';
          q5_deadline?: 'within_6m' | '1_2y' | 'when_needed';
          q6_concerns?: string[] | null;
          q7_advisors?: string[] | null;
          additional_notes?: string | null;
          qualification_score?: number;
          status?: string;
          meeting_scheduled_at?: string | null;
          meeting_completed_at?: string | null;
          admin_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          confirmation_email_sent?: boolean;
          confirmation_email_sent_at?: string | null;
          meeting_email_sent?: boolean;
          meeting_email_sent_at?: string | null;
          submitted_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}
