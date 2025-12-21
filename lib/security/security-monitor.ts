/**
 * 보안 모니터링 및 실시간 알림 시스템
 * 의심스러운 활동 감지 및 자동 대응
 */

import { NextRequest } from 'next/server';

interface SecurityEvent {
  type: 'suspicious_login' | 'rate_limit_exceeded' | 'invalid_auth' | 'admin_access' | 'data_breach_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  ip_address?: string;
  user_agent?: string;
  user_id?: string;
  additional_data?: Record<string, any>;
}

interface SecurityMetrics {
  failed_logins: number;
  blocked_ips: string[];
  suspicious_patterns: Array<{
    pattern: string;
    count: number;
    last_seen: Date;
  }>;
  admin_access_attempts: number;
}

// 메모리 기반 보안 메트릭스 (Redis로 이전 가능)
const securityMetrics: SecurityMetrics = {
  failed_logins: 0,
  blocked_ips: [],
  suspicious_patterns: [],
  admin_access_attempts: 0
};

// 의심스러운 IP 목록 (실시간 업데이트)
const suspiciousIPs = new Set<string>();
const rateLimitViolations = new Map<string, number>();

/**
 * 보안 이벤트 로깅 (Edge Runtime 호환 - fetch 사용)
 */
export async function logSecurityEvent(event: SecurityEvent, request?: NextRequest): Promise<void> {
  try {
    const ip = request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip') || 'unknown';
    const userAgent = request?.headers.get('user-agent') || 'unknown';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      // Supabase REST API 호출 (RPC)
      await fetch(`${supabaseUrl}/rest/v1/rpc/log_security_event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          event_type: event.type,
          event_description: event.description,
          user_id_param: event.user_id || null,
          severity_level: event.severity.toUpperCase(),
          additional_data: {
            ip_address: ip,
            user_agent: userAgent,
            ...event.additional_data
          }
        })
      });
    }

    // 심각한 이벤트인 경우 즉시 알림
    if (event.severity === 'critical' || event.severity === 'high') {
      await triggerSecurityAlert(event, ip, userAgent);
    }

    // 메트릭스 업데이트
    updateSecurityMetrics(event, ip);

  } catch (error) {
    console.error('Security event logging failed:', error);
  }
}

/**
 * 실시간 보안 알림 트리거
 */
async function triggerSecurityAlert(event: SecurityEvent, ip: string, userAgent: string): Promise<void> {
  const alertMessage = `🚨 보안 경고: ${event.description}
IP: ${ip}
User-Agent: ${userAgent}
심각도: ${event.severity}
시간: ${new Date().toLocaleString('ko-KR')}`;

  console.warn('SECURITY ALERT:', alertMessage);

  // 병렬로 모든 알림 채널에 전송
  const alertPromises = [];

  // 1. 슬랙 웹훅 알림
  if (process.env.SLACK_SECURITY_WEBHOOK_URL) {
    alertPromises.push(sendSlackAlert(event, ip, userAgent, alertMessage));
  }

  // 2. 디스코드 웹훅 알림
  if (process.env.DISCORD_SECURITY_WEBHOOK_URL) {
    alertPromises.push(sendDiscordAlert(event, ip, userAgent, alertMessage));
  }

  // 3. 이메일 알림 (critical/high 등급만)
  if ((event.severity === 'critical' || event.severity === 'high') && process.env.ADMIN_EMAIL) {
    alertPromises.push(sendEmailAlert(event, ip, userAgent, alertMessage));
  }

  // 4. SMS 알림 (critical 등급만, 업무시간 외)
  if (event.severity === 'critical' && shouldSendUrgentSMS()) {
    alertPromises.push(sendSMSAlert(event, ip, alertMessage));
  }

  // 모든 알림 전송 (실패해도 계속 진행)
  try {
    await Promise.allSettled(alertPromises);
  } catch (error) {
    console.error('Alert sending failed:', error);
  }

  // 개발 환경에서는 상세 로그
  if (process.env.NODE_ENV === 'development') {
    console.error('SECURITY ALERT:', {
      event,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
      alertChannels: {
        slack: !!process.env.SLACK_SECURITY_WEBHOOK_URL,
        discord: !!process.env.DISCORD_SECURITY_WEBHOOK_URL,
        email: !!process.env.ADMIN_EMAIL,
        sms: event.severity === 'critical'
      }
    });
  }
}

/**
 * 슬랙 웹훅 알림 전송
 */
async function sendSlackAlert(event: SecurityEvent, ip: string, userAgent: string, alertMessage: string): Promise<void> {
  try {
    const webhookUrl = process.env.SLACK_SECURITY_WEBHOOK_URL;
    if (!webhookUrl) return;

    const payload = {
      text: "🚨 보안 경고",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*🚨 보안 경고*\n\n*유형:* ${event.type}\n*심각도:* ${event.severity}\n*설명:* ${event.description}`
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*IP 주소:*\n${ip}`
            },
            {
              type: "mrkdwn",
              text: `*User-Agent:*\n${userAgent}`
            },
            {
              type: "mrkdwn",
              text: `*시간:*\n${new Date().toLocaleString('ko-KR')}`
            },
            {
              type: "mrkdwn",
              text: `*사용자 ID:*\n${event.user_id || '알 수 없음'}`
            }
          ]
        }
      ],
      attachments: [
        {
          color: event.severity === 'critical' ? 'danger' : 
                 event.severity === 'high' ? 'warning' : 'good',
          fields: [
            {
              title: "추가 정보",
              value: JSON.stringify(event.additional_data || {}, null, 2),
              short: false
            }
          ]
        }
      ]
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Slack alert failed:', error);
  }
}

/**
 * 디스코드 웹훅 알림 전송
 */
async function sendDiscordAlert(event: SecurityEvent, ip: string, userAgent: string, alertMessage: string): Promise<void> {
  try {
    const webhookUrl = process.env.DISCORD_SECURITY_WEBHOOK_URL;
    if (!webhookUrl) return;

    const embed = {
      title: "🚨 보안 경고",
      description: event.description,
      color: event.severity === 'critical' ? 0xff0000 : 
             event.severity === 'high' ? 0xff8c00 : 0xffd700,
      fields: [
        { name: "유형", value: event.type, inline: true },
        { name: "심각도", value: event.severity, inline: true },
        { name: "IP 주소", value: ip, inline: true },
        { name: "사용자 ID", value: event.user_id || '알 수 없음', inline: true },
        { name: "시간", value: new Date().toLocaleString('ko-KR'), inline: true },
        { name: "User-Agent", value: userAgent.substring(0, 100) + (userAgent.length > 100 ? '...' : ''), inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: "FamilyOffice Security System" }
    };

    if (event.additional_data && Object.keys(event.additional_data).length > 0) {
      embed.fields.push({
        name: "추가 정보",
        value: "```json\n" + JSON.stringify(event.additional_data, null, 2).substring(0, 1000) + "\n```",
        inline: false
      });
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });
  } catch (error) {
    console.error('Discord alert failed:', error);
  }
}

/**
 * 이메일 알림 전송 (critical/high 등급만)
 */
async function sendEmailAlert(event: SecurityEvent, ip: string, userAgent: string, alertMessage: string): Promise<void> {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) return;

    // 이메일 서비스가 설정되지 않은 경우 콘솔 로그로 대체
    if (!process.env.SMTP_HOST) {
      console.warn('[EMAIL ALERT] SMTP not configured. Alert details:', {
        to: adminEmail,
        subject: `🚨 [${event.severity.toUpperCase()}] 보안 경고 - ${event.type}`,
        event,
        ip,
        userAgent
      });
      return;
    }

    // 실제 이메일 전송 로직 (SMTP 설정 시)
    const emailBody = `
보안 경고가 발생했습니다.

유형: ${event.type}
심각도: ${event.severity}
설명: ${event.description}
IP 주소: ${ip}
User-Agent: ${userAgent}
사용자 ID: ${event.user_id || '알 수 없음'}
시간: ${new Date().toLocaleString('ko-KR')}

추가 정보:
${JSON.stringify(event.additional_data || {}, null, 2)}

즉시 확인이 필요합니다.

FamilyOffice 보안 시스템
`;

    // SMTP email implementation: https://github.com/jlinsights/FamilyOffice/issues/6
    console.log('[EMAIL ALERT] Would send email:', {
      to: adminEmail,
      subject: `🚨 [${event.severity.toUpperCase()}] 보안 경고`,
      body: emailBody
    });

  } catch (error) {
    console.error('Email alert failed:', error);
  }
}

/**
 * SMS 알림 전송 (critical 등급만, 업무시간 외)
 */
async function sendSMSAlert(event: SecurityEvent, ip: string, alertMessage: string): Promise<void> {
  try {
    const adminPhone = process.env.ADMIN_PHONE;
    if (!adminPhone) return;

    // SMS 서비스가 설정되지 않은 경우 콘솔 로그로 대체
    if (!process.env.SMS_API_KEY) {
      console.warn('[SMS ALERT] SMS service not configured. Alert details:', {
        to: adminPhone,
        message: `🚨 CRITICAL 보안 경고: ${event.description}. IP: ${ip}. 즉시 확인 필요.`,
        event
      });
      return;
    }

    const smsMessage = `🚨 FamilyOffice 보안 경고\n${event.description}\nIP: ${ip}\n시간: ${new Date().toLocaleString('ko-KR')}\n즉시 확인 필요`;

    // SMS API integration (Twilio, AWS SNS): https://github.com/jlinsights/FamilyOffice/issues/6
    console.log('[SMS ALERT] Would send SMS:', {
      to: adminPhone,
      message: smsMessage
    });

  } catch (error) {
    console.error('SMS alert failed:', error);
  }
}

/**
 * 긴급 SMS 발송 여부 확인 (업무시간 외 판단)
 */
function shouldSendUrgentSMS(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  
  // 주말 또는 업무시간 외 (오후 6시 - 오전 9시)
  const isWeekend = day === 0 || day === 6;
  const isAfterHours = hour < 9 || hour >= 18;
  
  return isWeekend || isAfterHours;
}

/**
 * 보안 메트릭스 업데이트
 */
function updateSecurityMetrics(event: SecurityEvent, ip: string): void {
  switch (event.type) {
    case 'suspicious_login':
    case 'invalid_auth':
      securityMetrics.failed_logins++;
      break;
      
    case 'admin_access':
      securityMetrics.admin_access_attempts++;
      break;
      
    case 'rate_limit_exceeded':
      const currentCount = rateLimitViolations.get(ip) || 0;
      rateLimitViolations.set(ip, currentCount + 1);
      
      // 5회 이상 위반 시 의심스러운 IP로 등록
      if (currentCount >= 5) {
        suspiciousIPs.add(ip);
        securityMetrics.blocked_ips.push(ip);
      }
      break;
  }
}

/**
 * 의심스러운 활동 감지
 */
export function detectSuspiciousActivity(request: NextRequest): {
  isSuspicious: boolean;
  reasons: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
} {
  const reasons: string[] = [];
  const ip =  request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  // 1. 알려진 의심스러운 IP 확인
  if (suspiciousIPs.has(ip)) {
    reasons.push('Known suspicious IP address');
  }
  
  // 2. 비정상적인 User-Agent 확인
  const suspiciousUserAgents = [
    'curl', 'wget', 'python-requests', 'bot', 'crawler', 'scanner'
  ];
  
  if (suspiciousUserAgents.some(agent => 
    userAgent.toLowerCase().includes(agent)
  )) {
    reasons.push('Suspicious user agent detected');
  }
  
  // 3. 관리자 경로 접근 시간 확인
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const currentHour = new Date().getHours();
    // 업무 시간 외(오후 6시 - 오전 9시) 접근
    if (currentHour < 9 || currentHour > 18) {
      reasons.push('Admin access outside business hours');
    }
  }
  
  // 4. 비정상적인 헤더 확인
  const referer = request.headers.get('referer');
  if (referer && !referer.includes('familyoffices.vip') && !referer.includes('localhost')) {
    reasons.push('Suspicious referer header');
  }
  
  // 5. Rate limit 위반 이력 확인
  const violationCount = rateLimitViolations.get(ip) || 0;
  if (violationCount >= 3) {
    reasons.push('Multiple rate limit violations');
  }
  
  // 위험도 계산
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
  
  if (reasons.length >= 3) {
    riskLevel = 'critical';
  } else if (reasons.length >= 2) {
    riskLevel = 'high';
  } else if (reasons.length >= 1) {
    riskLevel = 'medium';
  }
  
  return {
    isSuspicious: reasons.length > 0,
    reasons,
    riskLevel
  };
}

/**
 * 자동 보안 대응
 */
export async function autoSecurityResponse(
  request: NextRequest, 
  suspiciousActivity: ReturnType<typeof detectSuspiciousActivity>
): Promise<Response | null> {
  
  if (!suspiciousActivity.isSuspicious) {
    return null;
  }
  
  const ip =  request.headers.get('x-forwarded-for') || 'unknown';
  
  // 로그 기록
  await logSecurityEvent({
    type: 'suspicious_login',
    severity: suspiciousActivity.riskLevel,
    description: `Suspicious activity detected: ${suspiciousActivity.reasons.join(', ')}`,
    additional_data: {
      reasons: suspiciousActivity.reasons,
      risk_level: suspiciousActivity.riskLevel,
      path: request.nextUrl.pathname
    }
  }, request);
  
  // 위험도에 따른 자동 대응
  if (suspiciousActivity.riskLevel === 'critical') {
    // 즉시 차단
    return new Response(JSON.stringify({
      error: 'Access Denied',
      message: 'Your request has been blocked due to suspicious activity.',
      code: 'SECURITY_BLOCK'
    }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        'X-Security-Block': 'true'
      }
    });
  }
  
  if (suspiciousActivity.riskLevel === 'high') {
    // 추가 검증 요구 (향후 CAPTCHA 등)
    console.warn(`High-risk activity from IP ${ip}: ${suspiciousActivity.reasons.join(', ')}`);
  }
  
  return null; // 계속 진행
}

/**
 * 보안 상태 조회
 */
export function getSecurityStatus(): SecurityMetrics & {
  suspicious_ips_count: number;
  recent_events_count: number;
  overall_threat_level: 'low' | 'medium' | 'high' | 'critical';
} {
  const suspiciousIpsCount = suspiciousIPs.size;
  const totalViolations = Array.from(rateLimitViolations.values()).reduce((a, b) => a + b, 0);
  
  // 전체 위협 수준 계산
  let overallThreatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
  
  if (suspiciousIpsCount > 10 || totalViolations > 100) {
    overallThreatLevel = 'critical';
  } else if (suspiciousIpsCount > 5 || totalViolations > 50) {
    overallThreatLevel = 'high';  
  } else if (suspiciousIpsCount > 2 || totalViolations > 20) {
    overallThreatLevel = 'medium';
  }
  
  return {
    ...securityMetrics,
    suspicious_ips_count: suspiciousIpsCount,
    recent_events_count: securityMetrics.failed_logins + securityMetrics.admin_access_attempts,
    overall_threat_level: overallThreatLevel
  };
}

/**
 * 보안 메트릭스 초기화 (테스트용)
 */
export function resetSecurityMetrics(): void {
  securityMetrics.failed_logins = 0;
  securityMetrics.blocked_ips = [];
  securityMetrics.suspicious_patterns = [];
  securityMetrics.admin_access_attempts = 0;
  
  suspiciousIPs.clear();
  rateLimitViolations.clear();
}

/**
 * IP 차단 해제 (관리자 전용)
 */
export async function unblockIP(ip: string, adminUserId: string): Promise<boolean> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const adminEmails = (process.env.ADMIN_EMAILS || 'jhlim725@gmail.com')
      .split(',')
      .map(e => e.trim().toLowerCase());

    if (!supabaseUrl || !supabaseKey) return false;

    // 관리자 권한 확인 (REST API)
    const response = await fetch(`${supabaseUrl}/rest/v1/users?id=eq.${adminUserId}&select=email`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    if (!response.ok) return false;
    
    const users = await response.json();
    const admin = users[0];

    if (!admin || !adminEmails.includes(admin.email.toLowerCase())) {
      return false;
    }
    
    // IP 차단 해제
    suspiciousIPs.delete(ip);
    rateLimitViolations.delete(ip);
    
    // 로그 기록
    await logSecurityEvent({
      type: 'admin_access',
      severity: 'medium',
      description: `IP ${ip} unblocked by admin`,
      user_id: adminUserId
    });
    
    return true;
  } catch (error) {
    console.error('Failed to unblock IP:', error);
    return false;
  }
}