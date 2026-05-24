'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

// 환경 변수를 빌드 타임에 인라인으로 대체
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // SSR/프리렌더 단계에서는 throw하지 않음 (Vercel 빌드 시 env 미주입 방지)
    if (typeof window !== 'undefined') {
      throw new Error('Missing Supabase environment variables');
    }
    return createBrowserClient<Database>(
      'https://placeholder.local',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};
