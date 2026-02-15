import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Return empty list or mock data
  return NextResponse.json({
    members: [],
    total: 0,
    page: 1,
    limit: 10,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[API] /api/members POST received:', body);

    // Validating basic fields to simulate a real response
    if (!body.email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Mock success - in real implementation this would save to Supabase 'profiles' or 'members' table
    return NextResponse.json({
      success: true,
      member: {
        id: 'mock-id-' + Date.now(),
        email: body.email,
        name: body.name || 'Anonymous',
        role: 'member',
        created_at: new Date().toISOString(),
      },
      message: 'Member created successfully (Mock)',
    });
  } catch (error) {
    console.error('[API] /api/members POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
