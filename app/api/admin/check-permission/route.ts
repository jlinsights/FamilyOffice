// FamilyOffice S - 관리자 권한 체크 API
// 슈퍼관리자(jhlim725@gmail.com) 권한을 확인하는 엔드포인트

import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

// 슈퍼 관리자 이메일 목록
const SUPER_ADMIN_EMAILS = [
  'jhlim725@gmail.com'
];

export async function POST() {
  try {
    // 현재 사용자 정보 가져오기
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { isAdmin: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // 기본 이메일 주소 찾기
    const primaryEmail = user.emailAddresses.find(
      email => email.id === user.primaryEmailAddressId
    );

    if (!primaryEmail) {
      return NextResponse.json(
        { isAdmin: false, error: 'No primary email found' },
        { status: 400 }
      );
    }

    // 슈퍼 관리자 이메일 체크
    const isAdmin = SUPER_ADMIN_EMAILS.includes(primaryEmail.emailAddress.toLowerCase());

    console.log(`Admin check for ${primaryEmail.emailAddress}: ${isAdmin}`);

    return NextResponse.json({
      isAdmin,
      email: primaryEmail.emailAddress,
      userId: user.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Admin permission check error:', error);
    
    return NextResponse.json(
      { 
        isAdmin: false, 
        error: 'Permission check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 