// FamilyOffice S - 사용자 통계 API
// 관리자가 사용자 통계 정보를 조회하는 엔드포인트

import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getUserStats } from '@/lib/user-sync';

// 슈퍼 관리자 이메일 목록
const SUPER_ADMIN_EMAILS = [
  'jhlim725@gmail.com'
];

export async function GET(_req: NextRequest) {
  try {
    // 사용자 인증 확인
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 현재 사용자 정보 가져오기
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    // 기본 이메일 주소 찾기
    const primaryEmail = user.emailAddresses.find(
      email => email.id === user.primaryEmailAddressId
    );

    if (!primaryEmail) {
      return NextResponse.json(
        { error: 'No primary email found' },
        { status: 400 }
      );
    }

    // 슈퍼 관리자 이메일 체크
    const isAdmin = SUPER_ADMIN_EMAILS.includes(primaryEmail.emailAddress.toLowerCase());
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Super admin access required (jhlim725@gmail.com only)' },
        { status: 403 }
      );
    }

    // 사용자 통계 조회
    const stats = await getUserStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch user stats',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 