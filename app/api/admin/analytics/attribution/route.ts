import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import { getAdminEmails } from '@/lib/admin-permissions';
import { conversionTrackingService } from '@/lib/conversion/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/analytics/attribution
 * Returns UTM source/medium attribution metrics.
 */
export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const email = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;
  if (!email || !getAdminEmails().includes(email.toLowerCase())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('start') || getDefaultStartDate();
  const endDate = searchParams.get('end') || new Date().toISOString();

  try {
    const metrics = await conversionTrackingService.getAttributionMetrics(
      startDate,
      endDate
    );

    return NextResponse.json({ attribution: metrics });
  } catch (error) {
    console.error('[admin/analytics/attribution] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attribution metrics' },
      { status: 500 }
    );
  }
}

function getDefaultStartDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString();
}
