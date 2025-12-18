
import { requireAdminPermissions } from '@/lib/admin-permissions';
import { GoogleSearchConsoleAPI } from '@/lib/google/search-console';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Check Admin Permissions
    await requireAdminPermissions();

    // 2. Initialize API
    const api = new GoogleSearchConsoleAPI();

    // 3. Define Date Ranges (Last 28 days vs Previous 28 days)
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 28);
    
    const prevEnd = new Date(start);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevEnd.getDate() - 28);

    const dateStr = (d: Date) => d.toISOString().split('T')[0];

    // 4. Fetch Current Period Data
    const currentData = await api.getKeywordRankings(
      dateStr(start),
      dateStr(end),
      ['query']
    );

    // 5. Fetch Page Performance
    // Note: getPagePerformance in lib already handles 30 days logic internally
    const pagePerformance = await api.getPagePerformance();

    // 6. Calculate "Change" for top queries (simplified version)
    // To do this strictly we need previous period data.
    // We'll fetch previous period for top 10 queries only to save quota/time.
    const topQueries = currentData.queries.slice(0, 10);
    
    // Fetch previous period for comparison (Global stats)
    const previousData = await api.getKeywordRankings(
      dateStr(prevStart),
      dateStr(prevEnd),
      ['query']
    );

    const searchMetrics = topQueries.map(q => {
      const prevQ = previousData.queries.find(p => p.query === q.query);
      
      // Calculate change in Clicks or Position? 
      // The dashboard shows "change" as a percentage (likely clicks or general score).
      // Let's use Clicks change %
      let change = 0;
      if (prevQ && prevQ.clicks > 0) {
        change = Math.round(((q.clicks - prevQ.clicks) / prevQ.clicks) * 100);
      } else if (q.clicks > 0) {
        change = 100; // New query
      }

      return {
        query: q.query,
        clicks: q.clicks,
        impressions: q.impressions,
        ctr: q.ctr,
        position: q.position,
        change: change
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        searchMetrics,
        pagePerformance: pagePerformance.slice(0, 10).map(p => ({
          url: p.url,
          clicks: p.clicks,
          impressions: p.impressions,
          ctr: p.ctr,
          position: p.position
        }))
      }
    });

  } catch (error) {
    console.error('Search Console API Error:', error);
    
    // Fallback/Mock for error case to prevent dashboard crash, 
    // but log the error.
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown Error' 
      },
      { status: 500 }
    );
  }
}
