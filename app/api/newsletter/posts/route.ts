import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');

    // Beehiiv API에서 최근 게시물 가져오기
    const response = await beehiiv.getRecentPosts(limit);
    
    // 데이터 변환 - Beehiiv 형식을 우리 앱에서 사용하는 형식으로
    const posts = response.data?.map((post: any) => ({
      issueNumber: `#${post.stats?.email_sent || ''}`,
      date: new Date(post.published_at || post.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\. /g, '.').replace(/\.$/, ''),
      title: post.subject || post.title,
      excerpt: post.preview_text || post.content_preview || '',
      readTime: Math.ceil((post.content?.length || 0) / 1000) + '분',
      categories: post.tags || [],
      url: post.web_url || `https://newsletter.familyoffices.vip/p/${post.slug}`,
      thumbnail: post.thumbnail_url || null,
    })) || [];

    return NextResponse.json({
      success: true,
      posts,
      total: response.total || posts.length
    });
  } catch (error) {
    console.error('Error fetching newsletter posts:', error);
    
    // 에러 시 하드코딩된 기본 데이터 반환
    const fallbackPosts = [
      {
        issueNumber: '#50',
        date: '2025.01.17',
        title: '2025년 상속세법 개정안 핵심 포인트',
        excerpt: '상속세 과세표준 구간 조정과 세율 변화가 중견기업에 미치는 영향을 분석했습니다.',
        readTime: '4분',
        categories: ['세무', '법률', '기업승계'],
        url: 'https://newsletter.familyoffices.vip',
      },
      {
        issueNumber: '#49',
        date: '2025.01.10',
        title: 'AI 시대 기업 밸류에이션의 새로운 기준',
        excerpt: '전통적인 기업 가치 평가 방식에서 벗어나 AI 역량을 반영한 새로운 평가 모델을 제시합니다.',
        readTime: '5분',
        categories: ['투자', '기업가치', 'AI'],
        url: 'https://newsletter.familyoffices.vip',
      },
      {
        issueNumber: '#48',
        date: '2025.01.03',
        title: '2025년 글로벌 경제 전망과 자산배분 전략',
        excerpt: '새해를 맞아 주요 투자은행들의 경제 전망을 종합하여 한국 중견기업을 위한 자산배분 가이드를 정리했습니다.',
        readTime: '6분',
        categories: ['투자전략', '자산배분', '글로벌'],
        url: 'https://newsletter.familyoffices.vip',
      },
    ];

    return NextResponse.json({
      success: false,
      posts: fallbackPosts,
      total: fallbackPosts.length,
      error: 'Failed to fetch from Beehiiv API, returning cached data'
    });
  }
}