/**
 * 관리자 권한 확인 유틸리티
 * Clerk 인증과 연동하여 관리자 권한을 검증
 */

import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * 현재 사용자가 관리자인지 확인
 */
export async function checkAdminPermissions(): Promise<boolean> {
  try {
    // 개발 환경에서는 디버깅을 위해 권한 체크 패스
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    const user = await currentUser();
    
    // 로그인하지 않은 경우
    if (!user) {
      return false;
    }

    // 관리자 이메일 목록 (환경변수에서 가져오거나 하드코딩)
    const adminEmails = [
      'jhlim725@gmail.com',
      // 필요시 추가 관리자 이메일
    ];

    // 관리자 이메일인지 확인
    return user.emailAddresses.some((email: { emailAddress: string }) => 
      adminEmails.includes(email.emailAddress)
    );
    
  } catch (error) {
    console.error('관리자 권한 확인 중 오류:', error);
    return false;
  }
}

/**
 * 관리자가 아닌 경우 에러 응답 반환
 */
export async function requireAdminPermissions(): Promise<boolean> {
  // 개발 환경 bypass 추가
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const isAdmin = await checkAdminPermissions();
  
  if (!isAdmin) {
    throw new Error('관리자 권한이 필요합니다.');
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
    console.error('사용자 역할 확인 중 오류:', error);
    return 'anonymous';
  }
}