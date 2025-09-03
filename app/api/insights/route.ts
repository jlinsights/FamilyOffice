import { NextRequest, NextResponse } from 'next/server';
import { rssAggregator } from '@/lib/rss-aggregator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 쿼리 파라미터 추출
    const source = searchParams.get('source') as 'beehiiv' | 'naver-blog' | null;
    const limit = parseInt(searchParams.get('limit') || '20');
    const blogId = searchParams.get('blog_id'); // 네이버 블로그 ID
    const category = searchParams.get('category');
    
    let content;
    
    if (source) {
      // 특정 소스의 콘텐츠만 가져오기
      content = await rssAggregator.getContentBySource(source, blogId || undefined, limit);
    } else {
      // 통합 콘텐츠 가져오기
      content = await rssAggregator.getIntegratedContent(blogId || undefined, limit);
    }
    
    // 카테고리 필터링
    if (category) {
      content = content.filter(item => 
        item.category?.toLowerCase().includes(category.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
      );
    }
    
    return NextResponse.json({
      success: true,
      data: content,
      meta: {
        total: content.length,
        source,
        limit,
        category,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Insights API 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch insights content',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// RSS 피드 상태 확인 엔드포인트
export async function HEAD() {
  try {
    const status = await rssAggregator.checkFeedHealth();
    
    return new NextResponse(null, {
      status: status.beehiiv ? 200 : 503,
      headers: {
        'X-Feed-Status': JSON.stringify(status),
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}