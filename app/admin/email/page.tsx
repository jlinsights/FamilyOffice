/**
 * 이메일 관리 페이지 (관리자용)
 * /admin/email
 */
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { ResendTestPanel } from '@/components/email/resend-test-panel';

const SUPER_ADMIN_EMAILS = ['jhlim725@gmail.com'];

export default async function EmailAdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // 추가 권한 확인이 필요한 경우
  // const user = await currentUser();
  // if (!user?.emailAddresses.some(email => SUPER_ADMIN_EMAILS.includes(email.emailAddress))) {
  //   redirect('/');
  // }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">이메일 시스템 관리</h1>
        <p className="text-muted-foreground">
          Resend 이메일 서비스 설정 및 테스트
        </p>
      </div>

      <ResendTestPanel />

      <div className="bg-muted/30 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">📧 이메일 시스템 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium mb-2">도메인 설정</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 도메인: email.familyoffices.vip</li>
              <li>• 발송자: noreply@email.familyoffices.vip</li>
              <li>• 시스템: system@email.familyoffices.vip</li>
              <li>• 지원: support@familyoffices.vip</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">이메일 타입</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 상담 예약 확인</li>
              <li>• 뉴스레터 구독 환영</li>
              <li>• 시스템 알림 (관리자)</li>
              <li>• 커스텀 메시지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
