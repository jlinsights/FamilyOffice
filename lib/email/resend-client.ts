/**
 * Resend 이메일 클라이언트 - FamilyOffice S
 * email.familyoffices.vip 도메인 통합
 */
import { Resend } from 'resend';
import { env } from '@/lib/env';
import { logger } from '@/lib/debug-logger';

// Resend 클라이언트 초기화
const resend = new Resend((env as any).RESEND_API_KEY || process.env.RESEND_API_KEY);

// 기본 발송자 이메일
export const DEFAULT_FROM_EMAIL = (env as any).NEXT_PUBLIC_RESEND_FROM_EMAIL || process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'noreply@email.familyoffices.vip';

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

    logger.info('이메일 전송 성공:', { id: response.data?.id, to: emailData.to });
    return { success: true, id: response.data?.id };

  } catch (error) {
    logger.error('이메일 전송 중 오류 발생:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
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
    replyTo: 'support@familyoffices.vip'
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
  const adminEmail = 'jhlim725@gmail.com';
  const severityColors = {
    info: '#3b82f6',
    warning: '#f59e0b',
    error: '#ef4444'
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
    from: 'system@email.familyoffices.vip'
  });
}

export { resend };