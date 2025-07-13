// FamilyOffice S - 사용자 동기화 API
// 로그인한 사용자를 Supabase에 자동 동기화하는 엔드포인트

import { NextResponse } from 'next/server';
import { syncCurrentUser } from '@/lib/user-sync';

export async function POST() {
  try {
    // 현재 사용자를 Supabase에 동기화
    const syncedUser = await syncCurrentUser();
    
    if (!syncedUser) {
      return NextResponse.json(
        { error: 'No authenticated user found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: syncedUser.id,
        email: syncedUser.email,
        full_name: syncedUser.full_name,
        is_admin: syncedUser.is_admin,
      }
    });
  } catch (error) {
    console.error('User sync error:', error);
    
    // 에러가 발생해도 클라이언트에는 성공 응답 (동기화 실패가 페이지 로딩에 영향 없도록)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 