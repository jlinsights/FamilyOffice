import { NextRequest, NextResponse } from 'next/server';

import { conversionTrackingService } from '@/lib/conversion/service';
import {
  ConversionEventBatchPayload,
  ConversionEventPayload,
} from '@/lib/conversion/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Feature flag check
  if (process.env.CONVERSION_TRACKING_ENABLED !== 'true') {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  try {
    const body = await request.json();
    const parsed = ConversionEventBatchPayload.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: parsed.error.message } },
        { status: 400 }
      );
    }

    const events: ConversionEventPayload[] = Array.isArray(parsed.data)
      ? parsed.data
      : [parsed.data];

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') ?? undefined;

    // Process async - respond immediately
    conversionTrackingService
      .recordEvents(events, {
        ip,
        ...(userAgent ? { userAgent } : {}),
      })
      .catch((err) =>
        console.error('[analytics/events] Background processing error:', err)
      );

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: true }, { status: 202 });
  }
}
