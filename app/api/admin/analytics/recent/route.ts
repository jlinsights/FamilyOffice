import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import { getAdminEmails } from '@/lib/admin-permissions';
import { conversionTrackingService } from '@/lib/conversion/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/analytics/recent
 * Returns recent conversion events for the admin dashboard live feed.
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
  const limit = Math.min(
    parseInt(searchParams.get('limit') || '20', 10),
    50
  );

  try {
    const events = await conversionTrackingService.getRecentConversions(limit);
    return NextResponse.json(events);
  } catch (error) {
    console.error('[admin/analytics/recent] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent conversions' },
      { status: 500 }
    );
  }
}
