// FamilyOffice S - 사용자 동기화 API
// 로그인한 사용자를 Supabase에 자동 동기화하는 엔드포인트
import { NextResponse } from 'next/server';

import { logAPI, logAuth } from '@/lib/logs-so';
import { withRateLimit } from '@/lib/rate-limit';
import { syncCurrentUser } from '@/lib/user-sync';

async function handler() {
  const startTime = Date.now();
  
  try {
    // Log API request
    await logAPI.request('/api/sync-user', 'POST');
    
    // 현재 사용자를 Supabase에 동기화
    const syncedUser = await syncCurrentUser();

    if (!syncedUser) {
      await logAPI.response('/api/sync-user', 401, Date.now() - startTime);
      return NextResponse.json(
        { error: 'No authenticated user found' },
        { status: 401 }
      );
    }

    // Log successful sync
    await logAuth.login(syncedUser.id, 'sync', true);
    await logAPI.response('/api/sync-user', 200, Date.now() - startTime, syncedUser.id);

    return NextResponse.json({
      success: true,
      user: {
        id: syncedUser.id,
        email: syncedUser.email,
        full_name: syncedUser.full_name,
        is_admin: syncedUser.is_admin,
      },
    });
  } catch (error) {
    console.error('User sync error:', error);
    
    // Log the error
    await logAPI.error('/api/sync-user', error);
    await logAPI.response('/api/sync-user', 500, Date.now() - startTime);

    // 에러가 발생해도 클라이언트에는 성공 응답 (동기화 실패가 페이지 로딩에 영향 없도록)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Apply rate limiting to the handler
export const POST = withRateLimit(handler, 'auth');
