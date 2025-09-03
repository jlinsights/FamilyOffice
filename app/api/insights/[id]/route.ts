import { NextRequest, NextResponse } from 'next/server';
import { rssAggregator } from '@/lib/rss-aggregator';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = context.params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      );
    }
    
    const content = await rssAggregator.getContentById(id);
    
    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: content,
      meta: {
        id,
        source: content.source,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('개별 콘텐츠 조회 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch content',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}