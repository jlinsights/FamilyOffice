// FamilyOffice S - 사용자 동기화 유틸리티
// Clerk 사용자와 Supabase 사용자 데이터를 동기화하는 함수들

import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 (서비스 키)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 사용자 타입 정의
export interface SyncedUser {
  id: string;
  clerk_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  image_url?: string;
  phone_number?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
  metadata: Record<string, any>;
}

/**
 * 현재 로그인한 Clerk 사용자를 Supabase에 동기화
 * 로그인 시 호출하여 사용자 정보가 Supabase에 존재하는지 확인하고,
 * 없으면 생성하고 있으면 업데이트
 */
export async function syncCurrentUser(): Promise<SyncedUser | null> {
  try {
    // 현재 Clerk 사용자 정보 가져오기
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return null;
    }

    // 기본 이메일 주소 찾기
    const primaryEmail = clerkUser.emailAddresses.find(
      email => email.id === clerkUser.primaryEmailAddressId
    );

    if (!primaryEmail) {
      throw new Error('Primary email not found');
    }

    // 기본 전화번호 찾기
    const primaryPhone = clerkUser.phoneNumbers.find(
      phone => phone.id === clerkUser.primaryPhoneNumberId
    );

    // 사용자 메타데이터 정리
    const metadata = {
      ...clerkUser.privateMetadata,
      ...clerkUser.publicMetadata,
      clerk_created_at: clerkUser.createdAt,
      clerk_updated_at: clerkUser.updatedAt,
    };

    // Supabase에서 사용자 확인
    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_id', clerkUser.id)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = no rows found
      throw new Error(`Failed to check existing user: ${selectError.message}`);
    }

    const userPayload = {
      clerk_id: clerkUser.id,
      email: primaryEmail.emailAddress,
      first_name: clerkUser.firstName || null,
      last_name: clerkUser.lastName || null,
      image_url: clerkUser.imageUrl || null,
      phone_number: primaryPhone?.phoneNumber || null,
      last_sign_in_at: new Date().toISOString(),
      metadata: metadata,
    };

    let userData: SyncedUser;

    if (existingUser) {
      // 기존 사용자 업데이트
      const { data, error } = await supabaseAdmin
        .from('users')
        .update(userPayload)
        .eq('clerk_id', clerkUser.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }

      userData = data;
      console.log(`User updated: ${userData.email}`);
    } else {
      // 새 사용자 생성
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert(userPayload)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }

      userData = data;
      console.log(`User created: ${userData.email}`);
    }

    return userData;
  } catch (error) {
    console.error('Error syncing current user:', error);
    throw error;
  }
}

/**
 * Clerk ID로 Supabase 사용자 정보 조회
 */
export async function getUserByClerkId(clerkId: string): Promise<SyncedUser | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // 사용자 없음
      }
      throw new Error(`Failed to get user: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error getting user by clerk ID:', error);
    throw error;
  }
}

/**
 * 모든 Clerk 사용자를 Supabase에 일괄 동기화
 * 관리자 전용 - 기존 사용자들을 한 번에 동기화할 때 사용
 */
export async function bulkSyncUsers(): Promise<{ success: number; failed: number }> {
  try {
    // 이 함수는 Clerk의 User Management API를 사용해야 합니다
    // 현재는 개별 사용자 동기화만 지원
    console.warn('Bulk sync not implemented yet. Use individual user sync instead.');
    return { success: 0, failed: 0 };
  } catch (error) {
    console.error('Error in bulk sync:', error);
    throw error;
  }
}

/**
 * 사용자 관리자 권한 확인
 */
export async function checkUserAdmin(clerkId: string): Promise<boolean> {
  try {
    const user = await getUserByClerkId(clerkId);
    return user?.is_admin || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * 사용자 통계 조회
 */
export async function getUserStats() {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, is_admin, created_at, last_sign_in_at, metadata')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get user stats: ${error.message}`);
    }

    const total = data.length;
    const admins = data.filter(user => user.is_admin).length;
    const active = data.filter(user => 
      user.last_sign_in_at && 
      new Date(user.last_sign_in_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;
    const deleted = data.filter(user => user.metadata?.deleted).length;

    return {
      total,
      admins,
      active,
      deleted,
      recent: data.slice(0, 10) // 최근 10명
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
} 