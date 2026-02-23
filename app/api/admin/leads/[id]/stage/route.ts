import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import { getAdminEmails } from '@/lib/admin-permissions';
import { conversionTrackingService } from '@/lib/conversion/service';
import { StageAdvanceRequest } from '@/lib/conversion/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * PUT /api/admin/leads/[id]/stage
 * Manually advance a lead's funnel stage (admin action).
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id: leadId } = await params;

  try {
    const body = await request.json();
    const parsed = StageAdvanceRequest.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.message },
        { status: 400 }
      );
    }

    const result = await conversionTrackingService.advanceStage(
      leadId,
      parsed.data.stage,
      {
        ...(parsed.data.notes ? { notes: parsed.data.notes } : {}),
        metadata: { admin_email: email },
      }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Lead not found or stage advance failed' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[admin/leads/stage] Error:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
