import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';
import { newsletterPosts } from '@/lib/newsletter/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');

    // 환경 변수가 설정되어 있으면 Beehiiv API 사용
    if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
      try {
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
      } catch (apiError) {
        console.error('Beehiiv API error:', apiError);
        // API 에러 시 아래 정적 데이터로 폴백
      }
    }

    // 환경 변수가 없거나 API 호출 실패 시 정적 데이터 사용
    const posts = newsletterPosts.slice(0, limit);
    
    return NextResponse.json({
      success: true,
      posts,
      total: newsletterPosts.length,
      source: 'static' // 데이터 소스 표시
    });
  } catch (error) {
    console.error('Error in newsletter posts route:', error);
    
    return NextResponse.json({
      success: false,
      posts: [],
      total: 0,
      error: 'Internal server error'
    }, { status: 500 });
  }
}