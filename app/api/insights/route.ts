import { NextRequest, NextResponse } from 'next/server';

import { rssAggregator } from '@/lib/rss-aggregator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 추출
    const source = searchParams.get('source') as
      | 'beehiiv'
      | 'naver-blog'
      | 'tistory'
      | 'brunch'
      | 'substack'
      | null;
    const limit = parseInt(searchParams.get('limit') || '20');
    const blogId = searchParams.get('blog_id');
    const category = searchParams.get('category');

    let content;

    if (source) {
      // 특정 소스의 콘텐츠만 가져오기
      // 네이버 블로그인 경우에만 기본 ID 적용 (다른 소스는 각자의 기본값 사용)
      const targetId =
        source === 'naver-blog' && !blogId
          ? process.env.NAVER_BLOG_ID || 'lim_jaehong'
          : blogId || undefined;

      content = await rssAggregator.getContentBySource(source, targetId, limit);
    } else {
      // 통합 콘텐츠 가져오기 (beehiiv + 네이버 블로그)
      // 통합 모드에서는 네이버 블로그 ID 기본값 적용
      const targetId = blogId || process.env.NAVER_BLOG_ID || 'lim_jaehong';
      content = await rssAggregator.getIntegratedContent(targetId, limit);
    }

    // 카테고리 필터링
    if (category) {
      content = content.filter(
        item =>
          item.category?.toLowerCase().includes(category.toLowerCase()) ||
          item.tags.some(tag =>
            tag.toLowerCase().includes(category.toLowerCase())
          )
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
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Insights API 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch insights content',
        message: error instanceof Error ? error.message : 'Unknown error',
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
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}

// 수동 캐시 새로고침 엔드포인트
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'refresh-cache') {
      // 캐시 키 삭제하여 새로고침 트리거
      const sources = [
        'beehiiv',
        'naver-blog',
        'tistory',
        'brunch',
        'substack',
        'local',
      ];

      // 실제 캐시 삭제는 rss-aggregator 내부에서 처리
      // 새로운 데이터를 가져와서 자동으로 캐시 갱신
      const refreshedContent = await rssAggregator.getIntegratedContent(
        process.env.NAVER_BLOG_ID || 'lim_jaehong',
        50
      );

      return NextResponse.json({
        success: true,
        message: 'Cache refreshed successfully',
        data: {
          refreshedAt: new Date().toISOString(),
          itemsCount: refreshedContent.length,
          sources: Array.from(
            new Set(refreshedContent.map(item => item.source))
          ),
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action. Use ?action=refresh-cache',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Cache refresh error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh cache',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
