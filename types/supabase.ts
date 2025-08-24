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
          email: string | null;
          name: string | null;
          avatar_url: string | null;
          company_name: string | null;
          phone: string | null;
          kakao_id: string | null;
          kakao_access_token: string | null;
          provider: string | null;
          marketing_consent: boolean | null;
          last_sign_in_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          phone?: string | null;
          kakao_id?: string | null;
          kakao_access_token?: string | null;
          provider?: string | null;
          marketing_consent?: boolean | null;
          last_sign_in_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          phone?: string | null;
          kakao_id?: string | null;
          kakao_access_token?: string | null;
          provider?: string | null;
          marketing_consent?: boolean | null;
          last_sign_in_at?: string | null;
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
