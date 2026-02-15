/**
 * Resend 이메일 클라이언트 - FamilyOffice S
 * email.familyoffices.vip 도메인 통합
 */
import { Resend } from 'resend';
import { logger } from '@/lib/debug-logger';
import { env } from '@/lib/env';
import { getAdminEmails } from '@/lib/admin-permissions';

// Resend 클라이언트 초기화 (조건부)
const apiKey = (env as any).RESEND_API_KEY || process.env.RESEND_API_KEY;
const resend = new Resend(apiKey || 'dummy-key-for-build');

// 기본 발송자 이메일
export const DEFAULT_FROM_EMAIL =
  (env as any).NEXT_PUBLIC_RESEND_FROM_EMAIL ||
  process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL ||
  'noreply@email.familyoffices.vip';

// 이메일 타입 정의
export interface EmailData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

// 이메일 전송 결과 타입
export interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * 기본 이메일 전송 함수
 */
export async function sendEmail(emailData: EmailData): Promise<EmailResult> {
  try {
    const apiKey = (env as any).RESEND_API_KEY || process.env.RESEND_API_KEY;
    if (!apiKey) {
      logger.warn('Resend API 키가 설정되지 않았습니다');
      return { success: false, error: 'Resend API key not configured' };
    }

    const emailOptions: any = {
      from: emailData.from || DEFAULT_FROM_EMAIL,
      to: emailData.to,
      subject: emailData.subject,
    };

    if (emailData.html) emailOptions.html = emailData.html;
    if (emailData.text) emailOptions.text = emailData.text;
    if (emailData.replyTo) emailOptions.replyTo = emailData.replyTo;
    if (emailData.cc) emailOptions.cc = emailData.cc;
    if (emailData.bcc) emailOptions.bcc = emailData.bcc;
    if (emailData.attachments) emailOptions.attachments = emailData.attachments;

    const response = await resend.emails.send(emailOptions);

    if (response.error) {
      logger.error('Resend 이메일 전송 실패:', response.error);
      return { success: false, error: response.error.message };
    }

    logger.info('이메일 전송 성공:', {
      id: response.data?.id,
      to: emailData.to,
    });
    return { success: true, id: response.data?.id };
  } catch (error) {
    logger.error('이메일 전송 중 오류 발생:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * 상담 예약 확인 이메일
 */
export async function sendConsultationConfirmation(
  userEmail: string,
  userName: string,
  consultationDate: string,
  consultationType: string
): Promise<EmailResult> {
  const subject = '패밀리오피스 S - 상담 예약이 확정되었습니다';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>상담 예약 확인</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background-color: #1e3a8a; color: white; padding: 40px 30px; text-align: center; }
        .content { padding: 40px 30px; }
        .footer { background-color: #f1f5f9; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
        .button { display: inline-block; background-color: #cd7f32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .info-box { background-color: #f8fafc; border-left: 4px solid #cd7f32; padding: 20px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>패밀리오피스 S</h1>
          <p>상담 예약이 확정되었습니다</p>
        </div>
        
        <div class="content">
          <h2>안녕하세요, ${userName}님</h2>
          <p>패밀리오피스 S 상담 예약이 성공적으로 완료되었습니다.</p>
          
          <div class="info-box">
            <h3>예약 정보</h3>
            <p><strong>상담 유형:</strong> ${consultationType}</p>
            <p><strong>예약 일시:</strong> ${consultationDate}</p>
            <p><strong>참석자:</strong> ${userName} (${userEmail})</p>
          </div>
          
          <p>상담 전 준비사항이나 문의사항이 있으시면 언제든 연락주시기 바랍니다.</p>
          
          <a href="https://familyoffices.vip/contact" class="button">문의하기</a>
        </div>
        
        <div class="footer">
          <p>© 2024 패밀리오피스 S. All rights reserved.</p>
          <p>서울특별시 강남구 테헤란로 | 02-1234-5678</p>
          <p>이 이메일은 발신 전용입니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html,
    replyTo: 'support@familyoffices.vip',
  });
}

/**
 * 뉴스레터 구독 확인 이메일
 */
export async function sendNewsletterWelcome(
  userEmail: string,
  userName?: string
): Promise<EmailResult> {
  const subject = '패밀리오피스 S 뉴스레터에 오신 것을 환영합니다';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>뉴스레터 구독 환영</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background-color: #1e3a8a; color: white; padding: 40px 30px; text-align: center; }
        .content { padding: 40px 30px; }
        .footer { background-color: #f1f5f9; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
        .button { display: inline-block; background-color: #cd7f32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .highlight { background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>패밀리오피스 S</h1>
          <p>뉴스레터 구독을 환영합니다!</p>
        </div>
        
        <div class="content">
          <h2>${userName ? `안녕하세요, ${userName}님` : '안녕하세요'}</h2>
          <p>패밀리오피스 S 뉴스레터 구독을 진심으로 환영합니다.</p>
          
          <div class="highlight">
            <h3>📬 뉴스레터 발송 일정</h3>
            <p><strong>화요일 오전 9:30</strong> - 주간 자산관리 인사이트</p>
            <p><strong>금요일 오전 7:30</strong> - 주간 시장 브리핑</p>
          </div>
          
          <p>최신 자산관리 동향, 세무 전략, 상속 계획 등 중요한 정보를 정기적으로 받아보시게 됩니다.</p>
          
          <a href="https://newsletter.familyoffices.vip" class="button">뉴스레터 아카이브 보기</a>
        </div>
        
        <div class="footer">
          <p>© 2024 패밀리오피스 S. All rights reserved.</p>
          <p>구독 취소를 원하시면 <a href="mailto:unsubscribe@email.familyoffices.vip">여기</a>를 클릭하세요.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

/**
 * 시스템 알림 이메일 (관리자용)
 */
export async function sendSystemNotification(
  subject: string,
  message: string,
  severity: 'info' | 'warning' | 'error' = 'info'
): Promise<EmailResult> {
  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) {
    return { success: false, error: 'No admin emails configured' };
  }
  const adminEmail = adminEmails[0] as string;
  const severityColors = {
    info: '#3b82f6',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>시스템 알림</title>
      <style>
        body { font-family: monospace; margin: 0; padding: 20px; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border: 1px solid #e2e8f0; }
        .header { background-color: ${severityColors[severity]}; color: white; padding: 20px; }
        .content { padding: 20px; }
        .timestamp { color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>패밀리오피스 S - 시스템 알림</h2>
          <div class="timestamp">${new Date().toLocaleString('ko-KR')}</div>
        </div>
        <div class="content">
          <h3>알림 레벨: ${severity.toUpperCase()}</h3>
          <p><strong>제목:</strong> ${subject}</p>
          <p><strong>내용:</strong></p>
          <pre>${message}</pre>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `[FamilyOffice S] ${subject}`,
    html,
    from: 'system@email.familyoffices.vip',
  });
}

/**
 * 구조 점검 요청 접수 완료 이메일
 */
export async function sendStructureCheckConfirmation(
  userEmail: string,
  userName: string,
  requestId: string,
  qualificationScore: number
): Promise<EmailResult> {
  const subject = '패밀리오피스 S - 구조 점검 요청이 접수되었습니다';

  // 점수에 따른 메시지 조정
  const scoreMessage =
    qualificationScore >= 3
      ? '귀하의 상황에 대한 전문가 검토가 필요해 보입니다. 영업일 기준 1-2일 내에 담당자가 연락드리겠습니다.'
      : '접수하신 내용을 검토한 후 연락드리겠습니다.';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>구조 점검 요청 접수 완료</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
          line-height: 1.6;
        }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .content { padding: 40px 30px; color: #1e293b; }
        .footer {
          background-color: #f1f5f9;
          padding: 30px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #cd7f32 0%, #b8860b 100%);
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 8px;
          margin: 20px 0;
          font-weight: 600;
        }
        .info-box {
          background-color: #f8fafc;
          border-left: 4px solid #cd7f32;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .highlight {
          background-color: #fef3c7;
          padding: 16px 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #f59e0b;
        }
        .request-id {
          font-family: 'Courier New', monospace;
          background-color: #e2e8f0;
          padding: 8px 12px;
          border-radius: 4px;
          display: inline-block;
          margin: 10px 0;
        }
        h1 { margin: 0; font-size: 28px; }
        h2 { color: #1e3a8a; margin-top: 0; }
        h3 { color: #334155; margin-top: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>패밀리오피스 S</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">구조 점검 요청이 접수되었습니다</p>
        </div>

        <div class="content">
          <h2>안녕하세요, ${userName}님</h2>
          <p>패밀리오피스 S 구조 점검 요청이 성공적으로 접수되었습니다.</p>

          <div class="info-box">
            <h3>📋 접수 정보</h3>
            <p><strong>이름:</strong> ${userName}</p>
            <p><strong>이메일:</strong> ${userEmail}</p>
            <p><strong>접수 번호:</strong> <span class="request-id">${requestId}</span></p>
            <p><strong>접수 일시:</strong> ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
          </div>

          <div class="highlight">
            <h3>🎯 다음 단계</h3>
            <p>${scoreMessage}</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>담당자가 제출하신 내용을 검토합니다</li>
              <li>필요 시 추가 정보를 요청드릴 수 있습니다</li>
              <li>전문가와의 미팅 일정을 조율합니다</li>
            </ul>
          </div>

          <p><strong>구조 점검 미팅에서는...</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>현재 경영 구조의 리스크 포인트 분석</li>
            <li>의사결정 프로세스 최적화 방안</li>
            <li>권한 체계 정리 및 문서화 가이드</li>
            <li>현금 흐름 계획 수립 로드맵</li>
          </ul>

          <p style="margin-top: 30px;">문의사항이 있으시면 언제든 연락주시기 바랍니다.</p>

          <div style="text-align: center;">
            <a href="https://familyoffices.vip/structure-check" class="button">구조 점검 상세보기</a>
          </div>
        </div>

        <div class="footer">
          <p><strong>패밀리오피스 S</strong></p>
          <p>대한민국 중소중견기업 CEO들의 프리미엄 자산관리 파트너</p>
          <p style="margin-top: 20px;">© 2024 FamilyOffice S. All rights reserved.</p>
          <p>서울특별시 강남구 테헤란로</p>
          <p>이 이메일은 발신 전용입니다. 회신이 필요하신 경우 아래 연락처를 이용해주세요.</p>
          <p><a href="mailto:contact@familyoffices.vip" style="color: #3b82f6;">contact@familyoffices.vip</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html,
    replyTo: 'contact@familyoffices.vip',
  });
}

/**
 * 구조 점검 미팅 확정 이메일
 */
export async function sendStructureCheckMeetingConfirmation(
  userEmail: string,
  userName: string,
  meetingDate: string,
  meetingTime: string,
  meetingType: 'online' | 'offline',
  meetingLink?: string,
  meetingAddress?: string
): Promise<EmailResult> {
  const subject = '패밀리오피스 S - 구조 점검 미팅이 확정되었습니다';

  const meetingLocationHtml =
    meetingType === 'online'
      ? `
      <p><strong>미팅 방식:</strong> 온라인 (화상회의)</p>
      <p><strong>회의 링크:</strong> <a href="${meetingLink}" style="color: #3b82f6;">${meetingLink}</a></p>
      <p style="color: #64748b; font-size: 14px;">※ 미팅 시간 5분 전에 접속해주시기 바랍니다.</p>
    `
      : `
      <p><strong>미팅 방식:</strong> 오프라인 (대면)</p>
      <p><strong>장소:</strong> ${meetingAddress || '서울특별시 강남구 테헤란로 (상세 주소는 별도 안내)'}</p>
      <p style="color: #64748b; font-size: 14px;">※ 방문 시 주차는 건물 지하 주차장을 이용하시면 됩니다.</p>
    `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>구조 점검 미팅 확정</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
          line-height: 1.6;
        }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .content { padding: 40px 30px; color: #1e293b; }
        .footer {
          background-color: #f1f5f9;
          padding: 30px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #cd7f32 0%, #b8860b 100%);
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 8px;
          margin: 20px 0;
          font-weight: 600;
        }
        .meeting-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          padding: 24px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: center;
        }
        .info-box {
          background-color: #f8fafc;
          border-left: 4px solid #3b82f6;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .preparation-list {
          background-color: #f0f9ff;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        h1 { margin: 0; font-size: 28px; }
        h2 { color: #1e3a8a; margin-top: 0; }
        h3 { color: #334155; margin-top: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ 미팅이 확정되었습니다</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">패밀리오피스 S 구조 점검 미팅</p>
        </div>

        <div class="content">
          <h2>안녕하세요, ${userName}님</h2>
          <p>구조 점검 미팅 일정이 확정되었습니다. 아래 내용을 확인해주세요.</p>

          <div class="meeting-box">
            <h3 style="margin-top: 0; color: #92400e;">📅 미팅 일정</h3>
            <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #1e3a8a;">
              ${meetingDate} ${meetingTime}
            </p>
          </div>

          <div class="info-box">
            <h3>📍 미팅 정보</h3>
            <p><strong>참석자:</strong> ${userName}</p>
            ${meetingLocationHtml}
          </div>

          <div class="preparation-list">
            <h3>📋 미팅 전 준비사항</h3>
            <p>보다 생산적인 미팅을 위해 다음 사항을 미리 준비해주시면 좋습니다:</p>
            <ul style="margin: 10px 0; padding-left: 20px; text-align: left;">
              <li>현재 경영 조직도 (있는 경우)</li>
              <li>주요 의사결정 프로세스 관련 자료</li>
              <li>현금 흐름 관련 고민사항</li>
              <li>가장 시급하게 해결하고 싶은 이슈 리스트</li>
            </ul>
            <p style="color: #64748b; font-size: 14px; margin-top: 15px;">
              ※ 준비하지 못하셔도 괜찮습니다. 미팅 중에 함께 정리해드립니다.
            </p>
          </div>

          <p style="margin-top: 30px;"><strong>미팅 내용:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>현재 구조의 리스크 포인트 진단</li>
            <li>의사결정 체계 최적화 방안</li>
            <li>권한 및 책임 명확화 가이드</li>
            <li>실행 로드맵 수립</li>
          </ul>

          <p style="margin-top: 30px;">일정 변경이 필요하시거나 문의사항이 있으시면 언제든 연락주시기 바랍니다.</p>

          <div style="text-align: center;">
            <a href="https://familyoffices.vip/contact" class="button">문의하기</a>
          </div>
        </div>

        <div class="footer">
          <p><strong>패밀리오피스 S</strong></p>
          <p>대한민국 중소중견기업 CEO들의 프리미엄 자산관리 파트너</p>
          <p style="margin-top: 20px;">© 2024 FamilyOffice S. All rights reserved.</p>
          <p>서울특별시 강남구 테헤란로</p>
          <p>연락처: <a href="mailto:contact@familyoffices.vip" style="color: #3b82f6;">contact@familyoffices.vip</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html,
    replyTo: 'contact@familyoffices.vip',
  });
}

export { resend };
