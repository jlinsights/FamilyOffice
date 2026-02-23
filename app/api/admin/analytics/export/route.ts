import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import { getAdminEmails } from '@/lib/admin-permissions';
import { conversionTrackingService } from '@/lib/conversion/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/analytics/export
 * Export funnel data as CSV for download.
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
    const funnels = await conversionTrackingService.exportFunnelData(
      startDate,
      endDate
    );

    if (funnels.length === 0) {
      return new Response('No data for the selected period', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Build CSV
    const firstRow = funnels[0];
    if (!firstRow) {
      return new Response('No data', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }
    const headers = Object.keys(firstRow);
    const csvRows = [
      headers.join(','),
      ...funnels.map((row) =>
        headers
          .map((h) => {
            const val = row[h];
            const str = val === null || val === undefined ? '' : String(val);
            return str.includes(',') || str.includes('"')
              ? `"${str.replace(/"/g, '""')}"`
              : str;
          })
          .join(',')
      ),
    ];

    return new Response(csvRows.join('\n'), {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="funnel-export-${startDate.split('T')[0]}-${endDate.split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('[admin/analytics/export] Error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}

function getDefaultStartDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString();
}
