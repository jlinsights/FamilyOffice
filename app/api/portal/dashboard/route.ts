import { NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs/server';

import { safeFrom } from '@/lib/supabase/helpers';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const email =
      user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)
        ?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

    const fullName =
      `${user.lastName || ''}${user.firstName || ''}`.trim() ||
      user.fullName ||
      '';

    const supabase = await createClient();

    // Fetch user record from Supabase (using safeFrom for clerk_id filtering)
    const { data: dbUser } = await safeFrom(supabase, 'users')
      .select('*')
      .eq('clerk_id', user.id)
      .single();

    // Fetch consultation stats for this user's email
    const { count: totalConsultations } = await safeFrom(supabase, 'consultations')
      .select('*', { count: 'exact', head: true })
      .eq('email', email ?? '');

    const { count: pendingConsultations } = await safeFrom(supabase, 'consultations')
      .select('*', { count: 'exact', head: true })
      .eq('email', email ?? '')
      .eq('status', 'pending');

    // Fetch recent consultations (last 5)
    const { data: recentConsultations } = await safeFrom(supabase, 'consultations')
      .select('id, service_type, status, created_at')
      .eq('email', email ?? '')
      .order('created_at', { ascending: false })
      .limit(5);

    // Fetch structure check requests for this user
    const { count: totalStructureChecks } = await safeFrom(supabase, 'structure_check_requests')
      .select('*', { count: 'exact', head: true })
      .eq('email', email ?? '');

    const { data: recentStructureChecks } = await safeFrom(supabase, 'structure_check_requests')
      .select('id, status, qualification_score, created_at')
      .eq('email', email ?? '')
      .order('created_at', { ascending: false })
      .limit(3);

    return NextResponse.json({
      user: {
        name: fullName,
        email,
        imageUrl: user.imageUrl,
        createdAt: dbUser?.created_at ?? user.createdAt,
        lastSignInAt: dbUser?.last_sign_in_at,
        companyName: dbUser?.company_name,
        phone: dbUser?.phone_number ?? dbUser?.phone,
        provider: dbUser?.provider,
      },
      stats: {
        consultations: {
          total: totalConsultations ?? 0,
          pending: pendingConsultations ?? 0,
        },
        structureChecks: {
          total: totalStructureChecks ?? 0,
        },
      },
      recentConsultations: recentConsultations ?? [],
      recentStructureChecks: recentStructureChecks ?? [],
    });
  } catch (error) {
    console.error('Portal dashboard API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to load dashboard data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
