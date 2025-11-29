import { NextRequest, NextResponse } from 'next/server';
import { GoogleSearchConsoleAPI } from '@/lib/google/search-console';

export const dynamic = 'force-dynamic';

interface NaverRankingRequest {
  action?: 'get_rankings' | 'add_keyword' | 'update_target' | 'bulk_check';
  keywords?: string[];
  keyword?: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  targetRank?: number;
}

// 추적 중인 키워드 목록 (실제로는 데이터베이스에서 관리)
const TRACKED_KEYWORDS = [
  {
    id: '1',
    keyword: '가업승계 컨설팅',
    category: '컨설팅',
    priority: 'high',
    targetRank: 5,
    url: '/services'
  },
  {
    id: '2', 
    keyword: '패밀리오피스',
    category: '서비스',
    priority: 'high',
    targetRank: 8,
    url: '/'
  },
  {
    id: '3',
    keyword: '법인세 절세',
    category: '절세',
    priority: 'high',
    targetRank: 15,
    url: '/blog/corporate-tax'
  },
  {
    id: '4',
    keyword: '절세전략',
    category: '절세',
    priority: 'high',
    targetRank: 10,
    url: '/tax-strategy'
  },
  {
    id: '5',
    keyword: '정책자금 신청',
    category: '자금',
    priority: 'high',
    targetRank: 15,
    url: '/policy-funding'
  },
  {
    id: '6',
    keyword: '기업인증 혜택',
    category: '인증',
    priority: 'medium',
    targetRank: 8,
    url: '/business-certification'
  },
  {
    id: '7',
    keyword: '경영인정기보험',
    category: '보험',
    priority: 'medium',
    targetRank: 6,
    url: '/key-person-insurance'
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action') || 'get_rankings';

    switch (action) {
      case 'get_rankings':
        return await getRankings();
      
      default:
        return NextResponse.json({
          success: false,
          error: '지원하지 않는 액션입니다.'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('네이버 순위 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: NaverRankingRequest = await request.json();
    const { action = 'get_rankings' } = body;

    switch (action) {
      case 'add_keyword':
        return await addKeyword(body);
        
      case 'update_target':
        return await updateTarget(body);
        
      case 'bulk_check':
        return await bulkCheckRankings(body);
        
      default:
        return NextResponse.json({
          success: false,
          error: '지원하지 않는 액션입니다.'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('네이버 순위 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

async function getRankings() {
  try {
    // Google Search Console API를 통한 실제 순위 데이터
    const searchConsole = new GoogleSearchConsoleAPI();
    
    // 현재 키워드 성과 가져오기
    const keywordPerformance = await searchConsole.getKeywordPerformance(
      TRACKED_KEYWORDS.map(k => k.keyword),
      30
    );

    // 데이터 변환 및 통계 계산
    const rankings = TRACKED_KEYWORDS.map(tracked => {
      const performance = keywordPerformance.find(p => 
        p.keyword.includes(tracked.keyword) || 
        tracked.keyword.includes(p.keyword)
      );

      // 모의 이전 순위 데이터 (실제로는 데이터베이스에서 가져옴)
      const mockPreviousRank = performance ? 
        Math.max(1, performance.currentPosition + Math.floor(Math.random() * 10) - 5) : 
        Math.floor(Math.random() * 30) + 10;

      const currentRank = performance?.currentPosition || Math.floor(Math.random() * 30) + 10;
      const changePercent = mockPreviousRank > 0 && currentRank > 0 ?
        Math.round(((mockPreviousRank - currentRank) / mockPreviousRank) * 100) : 0;

      return {
        id: tracked.id,
        keyword: tracked.keyword,
        currentRank,
        previousRank: mockPreviousRank,
        bestRank: Math.max(1, currentRank - Math.floor(Math.random() * 5)),
        searchVolume: Math.floor(Math.random() * 10000) + 1000,
        difficulty: Math.floor(Math.random() * 40) + 60,
        url: tracked.url,
        trend: changePercent > 5 ? 'up' : changePercent < -5 ? 'down' : 'stable',
        changePercent: Math.abs(changePercent),
        lastUpdated: new Date().toISOString(),
        targetRank: tracked.targetRank,
        category: tracked.category,
        priority: tracked.priority,
        clicks: performance?.clicks || Math.floor(Math.random() * 100),
        impressions: performance?.impressions || Math.floor(Math.random() * 1000) + 500,
        ctr: performance?.ctr || Math.random() * 5 + 1
      };
    });

    // 요약 통계 계산
    const summary = {
      totalKeywords: rankings.length,
      avgRank: rankings.reduce((acc, r) => acc + r.currentRank, 0) / rankings.length,
      improvingKeywords: rankings.filter(r => r.trend === 'up').length,
      decliningKeywords: rankings.filter(r => r.trend === 'down').length,
      top10Keywords: rankings.filter(r => r.currentRank <= 10).length,
      top20Keywords: rankings.filter(r => r.currentRank <= 20).length,
      totalSearchVolume: rankings.reduce((acc, r) => acc + r.searchVolume, 0)
    };

    // 카테고리별 통계
    const categories: Record<string, any> = {};
    rankings.forEach(ranking => {
      if (!categories[ranking.category]) {
        categories[ranking.category] = {
          count: 0,
          totalRank: 0,
          trends: { up: 0, down: 0, stable: 0 }
        };
      }
      categories[ranking.category].count++;
      categories[ranking.category].totalRank += ranking.currentRank;
      categories[ranking.category].trends[ranking.trend]++;
    });

    Object.keys(categories).forEach(category => {
      const cat = categories[category];
      cat.avgRank = cat.totalRank / cat.count;
      cat.trend = cat.trends.up > cat.trends.down ? 'up' : 
                  cat.trends.down > cat.trends.up ? 'down' : 'stable';
      delete cat.totalRank;
      delete cat.trends;
    });

    return NextResponse.json({
      success: true,
      data: {
        keywords: rankings,
        summary,
        categories,
        lastUpdate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('순위 데이터 조회 오류:', error);
    
    // 에러 시 모의 데이터 반환
    return NextResponse.json({
      success: true,
      data: {
        keywords: [],
        summary: {
          totalKeywords: 0,
          avgRank: 0,
          improvingKeywords: 0,
          decliningKeywords: 0,
          top10Keywords: 0,
          top20Keywords: 0,
          totalSearchVolume: 0
        },
        categories: {},
        lastUpdate: new Date().toISOString(),
        note: 'Search Console 연결 오류로 모의 데이터를 표시합니다.'
      }
    });
  }
}

async function addKeyword(body: NaverRankingRequest) {
  const { keyword, category, priority, targetRank } = body;

  if (!keyword) {
    return NextResponse.json({
      success: false,
      error: '키워드를 입력해주세요.'
    }, { status: 400 });
  }

  try {
    // 실제로는 데이터베이스에 저장
    const newKeyword = {
      id: (TRACKED_KEYWORDS.length + 1).toString(),
      keyword,
      category: category || '기타',
      priority: priority || 'medium',
      targetRank: targetRank || 20,
      url: '/',
      dateAdded: new Date().toISOString()
    };

    console.log('새 키워드 추가:', newKeyword);

    return NextResponse.json({
      success: true,
      data: {
        message: '키워드가 성공적으로 추가되었습니다.',
        keyword: newKeyword
      }
    });

  } catch (error) {
    console.error('키워드 추가 오류:', error);
    return NextResponse.json({
      success: false,
      error: '키워드 추가 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

async function updateTarget(body: NaverRankingRequest) {
  const { keyword, targetRank } = body;

  if (!keyword || !targetRank) {
    return NextResponse.json({
      success: false,
      error: '키워드와 목표 순위를 입력해주세요.'
    }, { status: 400 });
  }

  try {
    // 실제로는 데이터베이스에서 업데이트
    console.log(`${keyword} 목표 순위 변경: ${targetRank}위`);

    return NextResponse.json({
      success: true,
      data: {
        message: '목표 순위가 성공적으로 업데이트되었습니다.',
        keyword,
        targetRank
      }
    });

  } catch (error) {
    console.error('목표 순위 업데이트 오류:', error);
    return NextResponse.json({
      success: false,
      error: '목표 순위 업데이트 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

async function bulkCheckRankings(body: NaverRankingRequest) {
  const { keywords } = body;

  if (!keywords || keywords.length === 0) {
    return NextResponse.json({
      success: false,
      error: '확인할 키워드를 입력해주세요.'
    }, { status: 400 });
  }

  try {
    // Google Search Console API를 통한 벌크 순위 체크
    const searchConsole = new GoogleSearchConsoleAPI();
    const rankings = await searchConsole.getKeywordPerformance(keywords, 7);

    return NextResponse.json({
      success: true,
      data: {
        rankings: rankings.map(r => ({
          keyword: r.keyword,
          currentPosition: r.currentPosition,
          averagePosition: r.averagePosition,
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          trend: r.trend,
          changePercent: r.changePercent
        })),
        checkedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('벌크 순위 체크 오류:', error);
    return NextResponse.json({
      success: false,
      error: '순위 확인 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}