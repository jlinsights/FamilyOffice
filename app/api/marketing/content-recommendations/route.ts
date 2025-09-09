import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { contentRecommendationEngine } from '@/lib/marketing/content-recommendation';

// 콘텐츠 추천 요청 스키마
const recommendationRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  email: z.string().email('Valid email is required'),
  profile: z.object({
    industry: z.string().optional(),
    companySize: z.string().optional(),
    title: z.string().optional(),
    interests: z.array(z.string()).default([]),
    stage: z.enum(['awareness', 'consideration', 'decision', 'customer']).default('awareness')
  }),
  viewHistory: z.array(z.object({
    contentId: z.string(),
    viewedAt: z.string().transform(str => new Date(str)),
    timeSpent: z.number().default(0),
    completed: z.boolean().default(false),
    shared: z.boolean().default(false),
    downloaded: z.boolean().default(false)
  })).default([]),
  excludeViewed: z.boolean().default(true),
  limit: z.number().min(1).max(20).default(5),
  contentTypes: z.array(z.enum(['blog', 'whitepaper', 'webinar', 'case_study', 'tool', 'newsletter'])).optional()
});

// POST: 개인화된 콘텐츠 추천
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestData = recommendationRequestSchema.parse(body);
    
    // 사용자 프로필 구성
    const userProfile: any = {
      id: requestData.userId,
      email: requestData.email,
      industry: requestData.profile.industry,
      companySize: requestData.profile.companySize,
      title: requestData.profile.title,
      interests: requestData.profile.interests,
      stage: requestData.profile.stage,
      lastActivity: requestData.viewHistory.length > 0 
        ? requestData.viewHistory[requestData.viewHistory.length - 1]?.viewedAt
        : undefined
    };
    
    // 추천 콘텐츠 가져오기
    const recommendations = await contentRecommendationEngine.getRecommendations(
      userProfile,
      requestData.viewHistory,
      requestData.excludeViewed,
      requestData.limit
    );
    
    // 콘텐츠 타입 필터링 (선택적)
    const filteredRecommendations = requestData.contentTypes
      ? recommendations.filter(rec => requestData.contentTypes!.includes(rec.content.type))
      : recommendations;
    
    // 개인화된 여정 생성
    const personalizedJourney = contentRecommendationEngine.generatePersonalizedJourney(userProfile);
    
    // 사용자 행동 기반 관심사 추출
    const extractedInterests = contentRecommendationEngine.extractInterests(requestData.viewHistory);
    
    // 응답 데이터 구성
    const response = {
      success: true,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        stage: userProfile.stage,
        profileCompleteness: calculateProfileCompleteness(userProfile)
      },
      recommendations: filteredRecommendations.map(rec => ({
        content: {
          id: rec.content.id,
          title: rec.content.title,
          type: rec.content.type,
          category: rec.content.category,
          url: rec.content.url,
          description: rec.content.description,
          publishedAt: rec.content.publishedAt,
          estimatedReadTime: estimateReadTime(rec.content),
          difficulty: getDifficultyLevel(rec.content, userProfile)
        },
        relevanceScore: rec.relevanceScore,
        reason: rec.reason,
        priority: rec.priority,
        personalizedTitle: personalizeTitle(rec.content.title, userProfile),
        callToAction: generateCTA(rec.content, userProfile)
      })),
      insights: {
        dominantInterests: getMostRelevantInterests(extractedInterests, userProfile.interests),
        recommendedStage: getRecommendedStageProgression(userProfile),
        contentGaps: identifyContentGaps(userProfile, requestData.viewHistory),
        nextBestActions: getNextBestActions(userProfile, recommendations)
      },
      personalizedJourney: {
        currentStage: userProfile.stage,
        nextStage: getNextStage(userProfile.stage),
        recommendedContent: personalizedJourney.slice(0, 3).map(content => ({
          id: content.id,
          title: content.title,
          type: content.type,
          reason: getJourneyReason(content, userProfile)
        }))
      },
      metadata: {
        timestamp: new Date().toISOString(),
        algorithm: 'hybrid-collaborative-content',
        version: '2.0'
      }
    };
    
    // 추천 성과 추적
    await trackRecommendationEvent(requestData.userId, 'recommendation_generated', {
      recommendationCount: filteredRecommendations.length,
      topScore: filteredRecommendations[0]?.relevanceScore || 0,
      userStage: userProfile.stage
    });
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('콘텐츠 추천 오류:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Content recommendation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET: 트렌딩/인기 콘텐츠 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'trending' | 'popular' | 'recent' | null;
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const industry = searchParams.get('industry');
    
    let content;
    
    switch (type) {
      case 'trending':
        content = await getTrendingContent(limit, category, industry);
        break;
      case 'popular':
        content = await getPopularContent(limit, category, industry);
        break;
      case 'recent':
        content = await getRecentContent(limit, category, industry);
        break;
      default:
        content = await getFeaturedContent(limit, category, industry);
    }
    
    return NextResponse.json({
      success: true,
      content,
      metadata: {
        type: type || 'featured',
        category,
        industry,
        limit,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('콘텐츠 조회 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 프로필 완성도 계산
function calculateProfileCompleteness(profile: any): number {
  const fields = ['industry', 'companySize', 'title'];
  const completedFields = fields.filter(field => profile[field]).length;
  const interestWeight = Math.min(profile.interests.length / 3, 1);
  
  return Math.round(((completedFields / fields.length) * 0.7 + interestWeight * 0.3) * 100);
}

// 읽기 시간 추정
function estimateReadTime(content: any): string {
  const wordsPerMinute = 200;
  const estimatedWords = content.description ? content.description.length / 5 : 500;
  const minutes = Math.ceil(estimatedWords / wordsPerMinute);
  
  return `${minutes}분`;
}

// 콘텐츠 난이도 결정
function getDifficultyLevel(content: any, profile: any): 'beginner' | 'intermediate' | 'advanced' {
  const titleWords = content.title.toLowerCase();
  
  if (titleWords.includes('기초') || titleWords.includes('입문') || titleWords.includes('시작')) {
    return 'beginner';
  }
  
  if (titleWords.includes('고급') || titleWords.includes('전문') || titleWords.includes('마스터')) {
    return 'advanced';
  }
  
  return 'intermediate';
}

// 제목 개인화
function personalizeTitle(title: string, profile: any): string {
  if (profile.industry) {
    return title.replace(/기업|회사/g, `${profile.industry} 기업`);
  }
  
  if (profile.title && profile.title.includes('CEO')) {
    return `[CEO 전용] ${title}`;
  }
  
  return title;
}

// CTA 생성
function generateCTA(content: any, profile: any): string {
  const ctas = {
    blog: '지금 읽어보기',
    whitepaper: '무료 다운로드',
    webinar: '웨비나 신청',
    case_study: '성공사례 보기',
    tool: '도구 사용하기',
    newsletter: '구독하기'
  };
  
  let baseCTA = ctas[content.type as keyof typeof ctas] || '자세히 보기';
  
  if (profile.stage === 'decision') {
    baseCTA = `상담받고 ${baseCTA}`;
  }
  
  return baseCTA;
}

// 가장 관련성 높은 관심사 추출
function getMostRelevantInterests(extracted: string[], existing: string[]): string[] {
  const combined = [...new Set([...extracted, ...existing])];
  
  // 실제로는 관심사별 가중치를 계산하여 정렬
  return combined.slice(0, 5);
}

// 권장 단계 진행 분석
function getRecommendedStageProgression(profile: any): string {
  const progressionMap = {
    awareness: 'consideration',
    consideration: 'decision',
    decision: 'customer',
    customer: 'advocate'
  };
  
  return progressionMap[profile.stage as keyof typeof progressionMap] || profile.stage;
}

// 콘텐츠 갭 식별
function identifyContentGaps(profile: any, viewHistory: any[]): string[] {
  const gaps: string[] = [];
  
  // 기본 관심 영역 체크
  const coreTopics = ['가업승계', '자산관리', '세무최적화', '리스크관리'];
  const viewedTopics = viewHistory.map(h => h.contentId); // 실제로는 콘텐츠 주제 추출
  
  coreTopics.forEach(topic => {
    if (!viewedTopics.some(viewed => viewed.includes(topic))) {
      gaps.push(`${topic} 관련 기초 학습 필요`);
    }
  });
  
  return gaps;
}

// 다음 최적 액션 제안
function getNextBestActions(profile: any, recommendations: any[]): string[] {
  const actions: string[] = [];
  
  if (recommendations.length > 0) {
    const topRec = recommendations[0];
    actions.push(`${topRec.content.title} 먼저 확인하기`);
  }
  
  if (profile.stage === 'awareness') {
    actions.push('기초 교육 콘텐츠 학습');
  } else if (profile.stage === 'consideration') {
    actions.push('상세 가이드 및 케이스 스터디 검토');
  } else if (profile.stage === 'decision') {
    actions.push('전문가 상담 예약');
  }
  
  return actions;
}

// 다음 단계 가져오기
function getNextStage(currentStage: string): string {
  const stages = {
    awareness: 'consideration',
    consideration: 'decision',
    decision: 'customer',
    customer: 'advocate'
  };
  
  return stages[currentStage as keyof typeof stages] || currentStage;
}

// 여정 추천 이유
function getJourneyReason(content: any, profile: any): string {
  return `${profile.stage} 단계에 최적화된 콘텐츠`;
}

// 트렌딩 콘텐츠 조회
async function getTrendingContent(limit: number, category?: string | null, industry?: string | null) {
  // 실제로는 DB에서 조회, 여기서는 예시 데이터
  return [
    {
      id: 'trending-1',
      title: '2024년 가업승계 트렌드 분석',
      type: 'blog',
      category: '가업승계',
      trendScore: 98,
      viewGrowth: '+45%'
    }
  ];
}

// 인기 콘텐츠 조회
async function getPopularContent(limit: number, category?: string | null, industry?: string | null) {
  return [
    {
      id: 'popular-1',
      title: 'CEO가 꼭 알아야 할 자산관리 기초',
      type: 'whitepaper',
      category: '자산관리',
      downloadCount: 1250,
      rating: 4.8
    }
  ];
}

// 최신 콘텐츠 조회
async function getRecentContent(limit: number, category?: string | null, industry?: string | null) {
  return [
    {
      id: 'recent-1',
      title: '최신 세무 규정 변경 안내',
      type: 'blog',
      category: '세무',
      publishedAt: new Date().toISOString(),
      isNew: true
    }
  ];
}

// 추천 콘텐츠 조회
async function getFeaturedContent(limit: number, category?: string | null, industry?: string | null) {
  return [
    {
      id: 'featured-1',
      title: '패밀리오피스 완벽 가이드',
      type: 'whitepaper',
      category: '종합',
      featured: true,
      priority: 'high'
    }
  ];
}

// 추천 이벤트 추적
async function trackRecommendationEvent(userId: string, event: string, data: any) {
  // 실제로는 분석 시스템 (GA, HubSpot 등)에 이벤트 전송
  console.log(`Tracking: ${userId} - ${event}`, data);
}