import { NextRequest, NextResponse } from 'next/server';

import { blogPosts } from '@/lib/blog-data';
import {
  ContentSyncManager,
  TistoryContentConverter,
} from '@/lib/tistory-integration';

/**
 * 티스토리 콘텐츠 동기화 API
 * POST /api/tistory-sync
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, postId, newsletterData } = body;

    const syncManager = new ContentSyncManager();

    switch (action) {
      case 'convert-existing':
        // 기존 블로그 포스트를 티스토리용으로 변환
        return await handleConvertExisting();

      case 'sync-new':
        // 새로운 뉴스레터를 모든 플랫폼에 동기화
        return await handleSyncNew(newsletterData, syncManager);

      case 'convert-single':
        // 특정 블로그 포스트만 티스토리용으로 변환
        return await handleConvertSingle(postId);

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: convert-existing, sync-new, or convert-single',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tistory sync error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * 기존 블로그 포스트들을 티스토리용으로 일괄 변환
 */
async function handleConvertExisting() {
  try {
    // 최근 추가된 뉴스레터 기반 포스트들만 변환
    const newsletterBasedPosts = [
      'corporate-life-insurance-ceo-risk-management',
      'hospital-mso-guide-tax-saving-strategy',
      'retained-earnings-dividend-strategy-ceo-asset-optimization',
      'corporate-treasury-stock-retirement-2025-tax-analysis',
    ];

    const convertedPosts = [];

    for (const postId of newsletterBasedPosts) {
      const blogPost = blogPosts[postId];
      if (blogPost) {
        const tistoryPost = TistoryContentConverter.convertForTistory(blogPost);
        convertedPosts.push({
          original: blogPost,
          tistory: tistoryPost,
          formattedContent: formatTistoryContent(tistoryPost),
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `${convertedPosts.length} posts converted for Tistory`,
      data: convertedPosts,
      instructions: {
        step1: '아래 변환된 콘텐츠를 복사하세요',
        step2: 'https://family-office.tistory.com 관리자로 이동하세요',
        step3: '각 포스트를 새 글쓰기에 붙여넣고 발행하세요',
        step4: '카테고리를 올바르게 설정하세요',
        step5: '태그를 추가하세요',
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to convert existing posts: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 새로운 뉴스레터를 모든 플랫폼에 동기화
 */
async function handleSyncNew(
  newsletterData: any,
  syncManager: ContentSyncManager
) {
  if (!newsletterData) {
    return NextResponse.json(
      { error: 'Newsletter data is required for sync-new action' },
      { status: 400 }
    );
  }

  try {
    await syncManager.syncAllPlatforms(newsletterData);

    return NextResponse.json({
      success: true,
      message: 'Newsletter content synchronized to all platforms',
      data: {
        blog: 'Published to familyoffices.vip/blog',
        tistory: 'Ready for family-office.tistory.com',
        newsletter: 'Original source maintained',
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to sync new content: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 특정 블로그 포스트만 티스토리용으로 변환
 */
async function handleConvertSingle(postId: string) {
  if (!postId) {
    return NextResponse.json(
      { error: 'Post ID is required for convert-single action' },
      { status: 400 }
    );
  }

  const blogPost = blogPosts[postId];
  if (!blogPost) {
    return NextResponse.json(
      { error: `Blog post with ID '${postId}' not found` },
      { status: 404 }
    );
  }

  try {
    const tistoryPost = TistoryContentConverter.convertForTistory(blogPost);
    const formattedContent = formatTistoryContent(tistoryPost);

    return NextResponse.json({
      success: true,
      message: `Post '${postId}' converted for Tistory`,
      data: {
        original: blogPost,
        tistory: tistoryPost,
        formattedContent,
        publishUrl: 'https://family-office.tistory.com/admin/entry/post',
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to convert single post: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 티스토리 콘텐츠를 발행 준비 상태로 포맷팅
 */
function formatTistoryContent(tistoryPost: any): string {
  return `
## 📋 ${tistoryPost.title}

### 🎯 핵심 요약
${tistoryPost.summary}

### 💡 주요 포인트
${tistoryPost.mainPoints.map((point: string) => `• ${point}`).join('\n')}

### 📊 실제 사례
${tistoryPost.caseStudy}

### ✅ 실행 방법
${tistoryPost.actionItems.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n')}

---

### 💬 더 자세한 정보가 필요하시다면?

👉 **[완전한 가이드 보기](${tistoryPost.originalBlogUrl})**
📧 **[뉴스레터 구독하기](https://newsletter.familyoffices.vip)**
📞 **[전문가 상담 신청](https://familyoffices.vip/contact)**

---

### 🔖 관련 태그
#${tistoryPost.tags.join(' #')}

---

**카테고리**: ${tistoryPost.category}
**키워드**: ${tistoryPost.naverKeywords.join(', ')}
  `.trim();
}

/**
 * GET: 현재 동기화 상태 확인
 */
export async function GET() {
  try {
    const newsletterBasedPosts = [
      'corporate-life-insurance-ceo-risk-management',
      'hospital-mso-guide-tax-saving-strategy',
      'retained-earnings-dividend-strategy-ceo-asset-optimization',
      'corporate-treasury-stock-retirement-2025-tax-analysis',
    ];

    const status = {
      totalBlogPosts: Object.keys(blogPosts).length,
      newsletterBasedPosts: newsletterBasedPosts.length,
      tistoryIntegration: 'Ready',
      lastSync: new Date().toISOString(),
      availableActions: [
        'POST /api/tistory-sync with action: convert-existing',
        'POST /api/tistory-sync with action: sync-new + newsletterData',
        'POST /api/tistory-sync with action: convert-single + postId',
      ],
    };

    return NextResponse.json({
      success: true,
      status,
      posts: newsletterBasedPosts.map(id => ({
        id,
        title: blogPosts[id]?.title || 'Unknown',
        category: blogPosts[id]?.category || 'Unknown',
        date: blogPosts[id]?.date || 'Unknown',
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to get sync status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
