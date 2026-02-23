import { createHmac } from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

import { conversionTrackingService } from '@/lib/conversion/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Verify Cal.com webhook signature using HMAC-SHA256.
 * Returns true if signature is valid or if no secret is configured (dev mode).
 */
function verifyCalcomSignature(
  rawBody: string,
  signature: string | null
): boolean {
  const secret = process.env.CALCOM_WEBHOOK_SECRET;

  // If no secret configured, skip verification (log warning)
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[webhooks/cal-com] CALCOM_WEBHOOK_SECRET not set - skipping signature verification'
      );
    }
    return true;
  }

  if (!signature) {
    console.error('[webhooks/cal-com] Missing webhook signature header');
    return false;
  }

  const expectedSignature = createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  return signature === expectedSignature;
}

/**
 * POST /api/webhooks/cal-com
 * Cal.com webhook handler for booking events.
 * Records conversion funnel events when bookings are created/completed.
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // Verify webhook signature
    const signature = request.headers.get('x-cal-signature-256');
    if (!verifyCalcomSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const body = JSON.parse(rawBody);

    // Cal.com webhook payload structure
    const { triggerEvent, payload } = body;

    if (!triggerEvent || !payload) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const attendeeEmail = payload.attendees?.[0]?.email;
    const attendeeName = payload.attendees?.[0]?.name;

    if (triggerEvent === 'BOOKING_CREATED') {
      // Extract session_id from booking metadata if available
      const sessionId =
        payload.metadata?.sessionId || payload.metadata?.session_id;

      if (sessionId) {
        await conversionTrackingService.recordEvent(
          {
            event_type: 'calcom_booking_created',
            session_id: sessionId,
            page_path: '/consultation',
            metadata: {
              booking_id: payload.uid,
              event_type_name: payload.eventType?.title,
              start_time: payload.startTime,
              attendee_name: attendeeName,
            },
          },
          { email: attendeeEmail }
        );
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[webhooks/cal-com] Error:', error);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
