/**
 * HubSpot 웹훅 처리 API
 * 리드 상태 변경, 딜 업데이트 등 HubSpot 이벤트 실시간 동기화
 */
import { NextRequest, NextResponse } from 'next/server';
import { verifyHubSpotWebhook } from '@/lib/hubspot/api-client';
import { globalRateLimit } from '@/lib/rate-limit';
import { logSecurityEvent } from '@/lib/security/security-monitor';
import { createClient } from '@/lib/supabase/server';

interface HubSpotWebhookEvent {
  eventId: number;
  subscriptionId: number;
  portalId: number;
  appId: number;
  eventType: string;
  subscriptionType: string;
  attemptNumber: number;
  objectId: number;
  changeSource: string;
  changeFlag: string;
  changeTimestamp: number;
  propertyName?: string;
  propertyValue?: string;
  // Contact specific
  firstName?: string;
  lastName?: string;
  email?: string;
  // Deal specific
  dealname?: string;
  dealstage?: string;
  amount?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 웹훅 서명 검증
    const signature = request.headers.get('x-hubspot-signature-v2');
    const requestBody = await request.text();

    if (!signature) {
      await logSecurityEvent(
        {
          type: 'invalid_auth',
          severity: 'high',
          description: 'HubSpot webhook received without signature',
          additional_data: { endpoint: '/api/webhooks/hubspot' },
        },
        request
      );

      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
    if (!clientSecret) {
      console.error('Missing HUBSPOT_CLIENT_SECRET environment variable');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // 서명 검증
    const isValid = verifyHubSpotWebhook(signature, requestBody, clientSecret);
    if (!isValid) {
      await logSecurityEvent(
        {
          type: 'invalid_auth',
          severity: 'high',
          description: 'Invalid HubSpot webhook signature',
          additional_data: {
            signature: signature.substring(0, 20) + '...',
            endpoint: '/api/webhooks/hubspot',
          },
        },
        request
      );

      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 3. 웹훅 이벤트 파싱
    let events: HubSpotWebhookEvent[];
    try {
      const data = JSON.parse(requestBody);
      events = Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Failed to parse HubSpot webhook payload:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // 4. Supabase 클라이언트 초기화
    const supabase = await createClient();

    // 5. 각 이벤트 처리
    const processedEvents = [];
    for (const event of events) {
      try {
        const result = await processHubSpotEvent(supabase, event);
        processedEvents.push(result);
      } catch (error) {
        console.error('Failed to process HubSpot event:', error);
        processedEvents.push({
          eventId: event.eventId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // 6. 성공 응답
    return NextResponse.json({
      success: true,
      processed: processedEvents.length,
      results: processedEvents,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('HubSpot webhook processing error:', error);

    // 보안 이벤트 로깅
    await logSecurityEvent(
      {
        type: 'data_breach_attempt',
        severity: 'medium',
        description: `HubSpot webhook processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        additional_data: { endpoint: '/api/webhooks/hubspot' },
      },
      request
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Webhook processing failed',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * HubSpot 이벤트 처리 함수
 */
async function processHubSpotEvent(supabase: any, event: HubSpotWebhookEvent) {
  const { eventType, objectId, subscriptionType } = event;

  console.log(
    `Processing HubSpot event: ${eventType} for ${subscriptionType} ${objectId}`
  );

  switch (subscriptionType) {
    case 'contact.propertyChange':
      return await handleContactChange(supabase, event);

    case 'contact.creation':
      return await handleContactCreation(supabase, event);

    case 'deal.propertyChange':
      return await handleDealChange(supabase, event);

    case 'deal.creation':
      return await handleDealCreation(supabase, event);

    default:
      console.log(`Unhandled subscription type: ${subscriptionType}`);
      return {
        eventId: event.eventId,
        success: true,
        action: 'ignored',
        reason: `Unhandled subscription type: ${subscriptionType}`,
      };
  }
}

/**
 * 콘택트 변경 처리
 */
async function handleContactChange(supabase: any, event: HubSpotWebhookEvent) {
  const { objectId, propertyName, propertyValue } = event;

  // 중요한 속성 변경만 처리
  const importantProperties = [
    'lifecyclestage',
    'lead_status',
    'lead_score',
    'email',
    'firstname',
    'lastname',
    'company',
  ];

  if (!propertyName || !importantProperties.includes(propertyName)) {
    return {
      eventId: event.eventId,
      success: true,
      action: 'ignored',
      reason: `Property ${propertyName} not tracked`,
    };
  }

  // 리드 활동 로그 저장
  const { error } = await supabase.from('lead_activities').insert({
    hubspot_contact_id: objectId.toString(),
    activity_type: 'property_change',
    activity_data: {
      property_name: propertyName,
      new_value: propertyValue,
      timestamp: new Date(event.changeTimestamp).toISOString(),
    },
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Failed to log lead activity:', error);
  }

  // 리드 스코어 변경인 경우 특별 처리
  if (propertyName === 'lead_score') {
    await handleLeadScoreChange(
      supabase,
      objectId.toString(),
      parseInt(propertyValue || '0')
    );
  }

  return {
    eventId: event.eventId,
    success: true,
    action: 'contact_updated',
    propertyName,
    newValue: propertyValue,
  };
}

/**
 * 새 콘택트 생성 처리
 */
async function handleContactCreation(
  supabase: any,
  event: HubSpotWebhookEvent
) {
  const { objectId, email, firstName, lastName } = event;

  // 새 리드 생성 로그
  const { error } = await supabase.from('lead_activities').insert({
    hubspot_contact_id: objectId.toString(),
    activity_type: 'contact_created',
    activity_data: {
      email,
      first_name: firstName,
      last_name: lastName,
      timestamp: new Date(event.changeTimestamp).toISOString(),
    },
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Failed to log new contact:', error);
  }

  // 신규 리드 환영 워크플로우 트리거 (향후 구현)
  await triggerWelcomeWorkflow(objectId.toString());

  return {
    eventId: event.eventId,
    success: true,
    action: 'contact_created',
    contactId: objectId,
  };
}

/**
 * 딜 변경 처리
 */
async function handleDealChange(supabase: any, event: HubSpotWebhookEvent) {
  const { objectId, propertyName, propertyValue } = event;

  // 딜 단계 변경 추적
  if (propertyName === 'dealstage') {
    const { error } = await supabase.from('deal_activities').insert({
      hubspot_deal_id: objectId.toString(),
      activity_type: 'stage_change',
      activity_data: {
        new_stage: propertyValue,
        timestamp: new Date(event.changeTimestamp).toISOString(),
      },
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Failed to log deal stage change:', error);
    }
  }

  return {
    eventId: event.eventId,
    success: true,
    action: 'deal_updated',
    propertyName,
    newValue: propertyValue,
  };
}

/**
 * 새 딜 생성 처리
 */
async function handleDealCreation(supabase: any, event: HubSpotWebhookEvent) {
  const { objectId, dealname, amount } = event;

  const { error } = await supabase.from('deal_activities').insert({
    hubspot_deal_id: objectId.toString(),
    activity_type: 'deal_created',
    activity_data: {
      deal_name: dealname,
      amount: amount,
      timestamp: new Date(event.changeTimestamp).toISOString(),
    },
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Failed to log new deal:', error);
  }

  return {
    eventId: event.eventId,
    success: true,
    action: 'deal_created',
    dealId: objectId,
  };
}

/**
 * 리드 스코어 변경 처리
 */
async function handleLeadScoreChange(
  supabase: any,
  contactId: string,
  newScore: number
) {
  // 고득점 리드에 대한 자동 액션
  if (newScore >= 80) {
    // 영업팀 알림 (Slack, 이메일 등)
    console.log(
      `🔥 High-score lead detected: Contact ${contactId} scored ${newScore}`
    );

    // 우선 처리 플래그 설정
    await supabase.from('lead_activities').insert({
      hubspot_contact_id: contactId,
      activity_type: 'high_score_alert',
      activity_data: {
        score: newScore,
        priority: 'high',
        action_required: true,
        timestamp: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
    });
  }
}

/**
 * 신규 리드 환영 워크플로우 트리거
 */
async function triggerWelcomeWorkflow(contactId: string) {
  // 환영 이메일 시퀀스 시작
  console.log(`Triggering welcome workflow for contact ${contactId}`);

  // 실제 구현 시:
  // 1. 환영 이메일 전송
  // 2. 서비스 소개 자료 발송
  // 3. 상담 신청 유도 캠페인 시작
}
