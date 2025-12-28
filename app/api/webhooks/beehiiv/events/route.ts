/**
 * Beehiiv Email Events Webhook
 *
 * POST /api/webhooks/beehiiv/events
 *
 * Receives email engagement events from Beehiiv and updates lead tracking:
 * - email.sent → Update email_dayN_sent
 * - email.opened → Update email_dayN_opened
 * - email.clicked → Update email_dayN_clicked
 * - email.bounced → Update beehiiv_status to 'bounced'
 * - email.unsubscribed → Update beehiiv_status to 'unsubscribed'
 *
 * Flow:
 * 1. Verify Beehiiv webhook signature
 * 2. Parse event type and extract data
 * 3. Find lead by beehiiv_subscription_id or email
 * 4. Update leads table based on event type
 * 5. Insert event log into email_events table
 * 6. Return success response
 */

import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Beehiiv webhook event types
type BeehiivEventType =
  | 'email.sent'
  | 'email.opened'
  | 'email.clicked'
  | 'email.bounced'
  | 'email.unsubscribed'
  | 'email.complained';

// Beehiiv webhook payload
interface BeehiivWebhookPayload {
  type: BeehiivEventType;
  data: {
    subscription_id: string;
    email: string;
    email_id: string;
    clicked_url?: string;
    bounce_type?: 'hard' | 'soft';
    timestamp: number;
  };
}

/**
 * Verify Beehiiv webhook signature
 */
function verifyWebhookSignature(
  signature: string,
  body: string,
  secret: string | undefined
): boolean {
  if (!secret) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    return signature === expectedSignature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Extract email day from email_id or metadata
 * Email IDs might follow pattern like "day1_welcome", "day3_succession", etc.
 */
function extractEmailDay(emailId: string): number | null {
  // Try to extract day number from email_id
  const dayMatch = emailId.match(/day(\d+)/i);
  if (dayMatch && dayMatch[1]) {
    const day = parseInt(dayMatch[1], 10);
    if (day >= 1 && day <= 7) {
      return day;
    }
  }

  // If no day found, return null
  return null;
}

/**
 * Build update object for leads table based on event type and day
 */
function buildLeadUpdate(
  eventType: BeehiivEventType,
  day: number | null
): Record<string, any> {
  const update: Record<string, any> = {};

  if (!day || day < 1 || day > 7) {
    return update;
  }

  switch (eventType) {
    case 'email.sent':
      update[`email_day${day}_sent`] = true;
      break;
    case 'email.opened':
      update[`email_day${day}_opened`] = true;
      break;
    case 'email.clicked':
      update[`email_day${day}_clicked`] = true;
      break;
    case 'email.bounced':
      update.beehiiv_status = 'bounced';
      break;
    case 'email.unsubscribed':
      update.beehiiv_status = 'unsubscribed';
      break;
    case 'email.complained':
      update.beehiiv_status = 'complained';
      break;
  }

  return update;
}

/**
 * POST /api/webhooks/beehiiv/events
 */
export async function POST(request: NextRequest) {
  try {
    // Get webhook secret from environment
    const webhookSecret = process.env.BEEHIIV_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('BEEHIIV_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Get signature from header
    const signature = request.headers.get('x-beehiiv-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 401 }
      );
    }

    // Get raw body for signature verification
    const rawBody = await request.text();

    // Verify signature
    if (!verifyWebhookSignature(signature, rawBody, webhookSecret || undefined)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse webhook payload
    const payload: BeehiivWebhookPayload = JSON.parse(rawBody);

    const { type, data } = payload;
    const { subscription_id, email, email_id, clicked_url, bounce_type, timestamp } = data;

    // Create Supabase client
    const supabase = await createClient();

    // Find lead by beehiiv_subscription_id or email
    const { data: lead, error: leadError } = (await supabase
      .from('leads')
      .select('id, email, beehiiv_subscription_id')
      .or(`beehiiv_subscription_id.eq.${subscription_id},email.eq.${email}`)
      .single()) as any;

    if (leadError || !lead) {
      console.error('Lead not found:', { subscription_id, email, error: leadError });
      // Return 200 to prevent Beehiiv from retrying
      return NextResponse.json({
        success: false,
        message: 'Lead not found',
      });
    }

    const leadId = lead.id;

    // Extract email day from email_id
    const emailDay = extractEmailDay(email_id);

    // Build update object for leads table
    const leadUpdate = buildLeadUpdate(type, emailDay);

    // Update leads table if there are changes
    if (Object.keys(leadUpdate).length > 0) {
      const { error: updateError } = (await (supabase
        .from('leads') as any)
        .update({
          ...leadUpdate,
          updated_at: new Date().toISOString(),
        } as any)
        .eq('id', leadId)) as any;

      if (updateError) {
        console.error('Failed to update lead:', updateError);
        // Continue to log event even if update fails
      }
    }

    // Insert event log into email_events table
    const { error: eventError } = (await supabase.from('email_events').insert({
      lead_id: leadId,
      event_type: type.replace('email.', ''), // 'email.opened' → 'opened'
      email_day: emailDay,
      event_data: {
        email_id,
        clicked_url,
        bounce_type,
        timestamp,
        subscription_id,
      } as any,
    } as any)) as any;

    if (eventError) {
      console.error('Failed to insert email event:', eventError);
    }

    // Handle high-value events (Day 7 consultation clicks)
    if (type === 'email.clicked' && emailDay === 7) {
      console.log('🎯 High-value event: Day 7 consultation click:', {
        leadId,
        email: lead.email,
        clicked_url,
      });

      // TODO: Send notification to admin
      // TODO: Trigger consultation follow-up automation
    }

    // Log success
    console.log('✅ Beehiiv event processed:', {
      type,
      leadId,
      email: lead.email,
      emailDay,
    });

    return NextResponse.json({
      success: true,
      message: 'Event processed successfully',
    });
  } catch (error) {
    console.error('Webhook processing error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/beehiiv/events
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/webhooks/beehiiv/events',
    methods: ['POST'],
    version: '1.0.0',
    supported_events: [
      'email.sent',
      'email.opened',
      'email.clicked',
      'email.bounced',
      'email.unsubscribed',
      'email.complained',
    ],
  });
}
