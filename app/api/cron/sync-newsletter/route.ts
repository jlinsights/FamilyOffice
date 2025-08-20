import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { beehiiv } from '@/lib/beehiiv/client';

// Vercel Cron Job handler for newsletter synchronization
export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = headers().get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Beehiiv API is configured
    if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
      console.log('Beehiiv API not configured, skipping sync');
      return NextResponse.json({
        success: true,
        message: 'Beehiiv API not configured',
        synced: false
      });
    }

    // Fetch latest posts from Beehiiv
    const response = await beehiiv.getRecentPosts(10);
    
    if (!response.data || response.data.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No posts to sync',
        synced: false
      });
    }

    // Here you could implement additional logic to:
    // 1. Cache the posts in a database
    // 2. Send notifications about new posts
    // 3. Update any statistics
    
    // For now, we'll just log the sync
    console.log(`Newsletter sync completed: ${response.data.length} posts found`);
    
    return NextResponse.json({
      success: true,
      message: 'Newsletter sync completed',
      synced: true,
      postsCount: response.data.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Newsletter sync error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to sync newsletter',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle POST requests (Vercel Cron also supports POST)
export async function POST(request: NextRequest) {
  return GET(request);
}