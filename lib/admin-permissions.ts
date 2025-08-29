/**
 * 관리자 권한 확인 유틸리티
 * Clerk 인증과 연동하여 관리자 권한을 검증
 */

import { auth } from '@clerk/nextjs/server';

/**
 * 현재 사용자가 관리자인지 확인
 */
export async function checkAdminPermissions(): Promise<boolean> {
  try {
    const { userId } = await auth();
    
    // 로그인하지 않은 경우
    if (!userId) {
      return false;
    }

    // 사용자 정보 가져오기
    const user = await auth();
    
    // 이메일이 없는 경우
    if (!user.sessionClaims?.email) {
      return false;
    }

    // 관리자 이메일 목록 (환경변수에서 가져오거나 하드코딩)
    const adminEmails = [
      'jhlim725@gmail.com',
      // 필요시 추가 관리자 이메일
    ];

    // 관리자 이메일인지 확인
    return adminEmails.includes(user.sessionClaims.email as string);
    
  } catch (error) {
    console.error('관리자 권한 확인 중 오류:', error);
    return false;
  }
}

/**
 * 관리자가 아닌 경우 에러 응답 반환
 */
export async function requireAdminPermissions(): Promise<boolean> {
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