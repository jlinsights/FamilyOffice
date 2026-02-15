/**
 * 관리자 권한 확인 유틸리티
 * Clerk 인증과 연동하여 관리자 권한을 검증
 */
import { auth, currentUser } from '@clerk/nextjs/server';
import { logger } from '@/lib/logger';

/**
 * 환경변수에서 관리자 이메일 목록 가져오기
 * ADMIN_EMAILS 환경변수를 쉼표로 구분하여 파싱
 * 예: ADMIN_EMAILS=admin1@example.com,admin2@example.com
 */
export function getAdminEmails(): string[] {
  const envAdminEmails =
    process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()).filter(Boolean) || [];

  if (envAdminEmails.length === 0) {
    logger.warn('ADMIN_EMAILS 환경변수가 설정되지 않았습니다. 관리자 접근이 불가합니다.', {
      component: 'admin-permissions',
      function: 'getAdminEmails',
    });
  }

  return envAdminEmails;
}

/**
 * 현재 사용자가 관리자인지 확인
 */
export async function checkAdminPermissions(): Promise<boolean> {
  try {
    // 개발 환경 또는 Vercel Preview 환경에서는 디버깅을 위해 권한 체크 패스
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.VERCEL_ENV === 'preview'
    ) {
      logger.debug(
        'Admin permissions bypassed in development/preview environment',
        {
          component: 'admin-permissions',
          function: 'checkAdminPermissions',
        }
      );
      return true;
    }

    // Clerk 세션 확인
    const { userId } = await auth();

    if (!userId) {
      logger.warn(
        'Admin permission check failed: No authenticated user session',
        {
          component: 'admin-permissions',
          function: 'checkAdminPermissions',
        }
      );
      return false;
    }

    // 현재 사용자 정보 가져오기
    const user = await currentUser();

    if (!user) {
      logger.warn(
        'Admin permission check failed: User session exists but currentUser() returned null',
        {
          component: 'admin-permissions',
          function: 'checkAdminPermissions',
        }
      );
      return false;
    }

    // 사용자 이메일 주소 확인
    if (!user.emailAddresses || user.emailAddresses.length === 0) {
      logger.warn(
        'Admin permission check failed: User has no email addresses',
        {
          component: 'admin-permissions',
          function: 'checkAdminPermissions',
          metadata: { userId },
        }
      );
      return false;
    }

    // 관리자 이메일 목록 가져오기
    const adminEmails = getAdminEmails();

    // 관리자 이메일인지 확인
    const isAdmin = user.emailAddresses.some(
      (email: { emailAddress: string }) =>
        adminEmails.includes(email.emailAddress)
    );

    if (isAdmin) {
      logger.info('Admin access granted', {
        component: 'admin-permissions',
        function: 'checkAdminPermissions',
        metadata: {
          userEmail: user.emailAddresses[0]?.emailAddress || 'unknown',
        },
      });
    } else {
      logger.warn('Admin access denied', {
        component: 'admin-permissions',
        function: 'checkAdminPermissions',
        metadata: {
          userEmail: user.emailAddresses[0]?.emailAddress || 'unknown',
          allowedEmails: adminEmails,
        },
      });
    }

    return isAdmin;
  } catch (error) {
    logger.error('Error checking admin permissions', error as Error, {
      component: 'admin-permissions',
      function: 'checkAdminPermissions',
    });

    return false;
  }
}

/**
 * 관리자가 아닌 경우 에러를 던지는 함수
 * API 라우트에서 사용하기 위한 헬퍼 함수
 */
export async function requireAdminPermissions(): Promise<boolean> {
  // 개발 환경 또는 Preview 환경 bypass
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview'
  ) {
    logger.debug(
      'Admin permissions requirement bypassed in development/preview environment',
      {
        component: 'admin-permissions',
        function: 'requireAdminPermissions',
      }
    );
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
    logger.error('Error getting user role', error as Error, {
      component: 'admin-permissions',
      function: 'getUserRole',
    });
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
    logger.error('Error getting current user email', error as Error, {
      component: 'admin-permissions',
      function: 'getCurrentUserEmail',
    });
    return null;
  }
}
