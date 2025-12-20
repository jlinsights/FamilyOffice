/**
 * 관리자 권한 확인 유틸리티
 * Clerk 인증과 연동하여 관리자 권한을 검증
 */

import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * 환경변수 또는 하드코딩된 관리자 이메일 목록 가져오기
 */
function getAdminEmails(): string[] {
  // 환경변수에서 관리자 이메일 목록 가져오기 (쉼표로 구분)
  const envAdminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
  
  // 기본 관리자 이메일 (환경변수가 없을 경우 폴백)
  const defaultAdminEmails = [
    'jhlim725@gmail.com',
    // 필요시 추가 관리자 이메일
  ];

  // 환경변수가 설정되어 있으면 우선 사용, 없으면 기본값 사용
  return envAdminEmails.length > 0 ? envAdminEmails : defaultAdminEmails;
}

/**
 * 현재 사용자가 관리자인지 확인
 */
export async function checkAdminPermissions(): Promise<boolean> {
  try {
    // 개발 환경 또는 Vercel Preview 환경에서는 디버깅을 위해 권한 체크 패스
    if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview') {
      console.log('🔓 Admin permissions bypassed in development/preview environment');
      return true;
    }

    // Clerk 세션 확인
    const { userId } = await auth();
    
    if (!userId) {
      console.warn('⚠️ Admin permission check failed: No authenticated user session');
      return false;
    }

    // 현재 사용자 정보 가져오기
    const user = await currentUser();
    
    if (!user) {
      console.warn('⚠️ Admin permission check failed: User session exists but currentUser() returned null');
      return false;
    }

    // 사용자 이메일 주소 확인
    if (!user.emailAddresses || user.emailAddresses.length === 0) {
      console.warn('⚠️ Admin permission check failed: User has no email addresses');
      return false;
    }

    // 관리자 이메일 목록 가져오기
    const adminEmails = getAdminEmails();
    
    // 관리자 이메일인지 확인
    const isAdmin = user.emailAddresses.some((email: { emailAddress: string }) => 
      adminEmails.includes(email.emailAddress)
    );

    if (isAdmin) {
      console.log(`✅ Admin access granted for user: ${user.emailAddresses[0]?.emailAddress || 'unknown'}`);
    } else {
      console.warn(`🚫 Admin access denied for user: ${user.emailAddresses[0]?.emailAddress || 'unknown'}`);
      console.warn(`   Allowed admin emails: ${adminEmails.join(', ')}`);
    }

    return isAdmin;
    
  } catch (error) {
    console.error('❌ Error checking admin permissions:', error);
    
    // Clerk 관련 오류인 경우 상세 로그
    if (error instanceof Error) {
      console.error('   Error message:', error.message);
      console.error('   Error stack:', error.stack);
    }
    
    return false;
  }
}

/**
 * 관리자가 아닌 경우 에러를 던지는 함수
 * API 라우트에서 사용하기 위한 헬퍼 함수
 */
export async function requireAdminPermissions(): Promise<boolean> {
  // 개발 환경 또는 Preview 환경 bypass
  if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview') {
    console.log('🔓 Admin permissions requirement bypassed in development/preview environment');
    return true;
  }

  const isAdmin = await checkAdminPermissions();
  
  if (!isAdmin) {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error('인증이 필요합니다. 로그인 후 다시 시도해주세요.');
    }
    
    throw new Error('관리자 권한이 필요합니다. 권한이 없는 사용자입니다.');
  }
  
  return true;
}

/**
 * 사용자 역할 확인
 */
export async function getUserRole(): Promise<'admin' | 'user' | 'anonymous'> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return 'anonymous';
    }

    const isAdmin = await checkAdminPermissions();
    return isAdmin ? 'admin' : 'user';
    
  } catch (error) {
    console.error('❌ Error getting user role:', error);
    return 'anonymous';
  }
}

/**
 * 현재 인증된 사용자의 이메일 가져오기 (디버깅용)
 */
export async function getCurrentUserEmail(): Promise<string | null> {
  try {
    const user = await currentUser();
    return user?.emailAddresses[0]?.emailAddress || null;
  } catch (error) {
    console.error('❌ Error getting current user email:', error);
    return null;
  }
}