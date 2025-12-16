'use client';

import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/types/supabase';

// 환경 변수를 빌드 타임에 인라인으로 대체
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  );
};
