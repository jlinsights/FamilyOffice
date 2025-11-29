/**
 * SEO 키워드 랭킹 API
 * 네이버 검색 순위 추적 및 성과 모니터링
 */

import { NextRequest, NextResponse } from 'next/server';
import { SEOMetrics } from '@/lib/analytics/seo-tracker';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';
    const keywords = searchParams.get('keywords')?.split(',') || [];

    // 실제 구현에서는 Google Search Console API, Naver Webmaster API 등을 사용
    // 현재는 모의 데이터로 응답
    const mockKeywordData = {
      '가업승계 컨설팅': {
        currentRank: 8,
        previousRank: 15,
        searchVolume: 3200,
        trend: 'up',
        changePercent: 87,
        url: '/services',
        naverRank: 6,
        googleRank: 12
      },
      '패밀리오피스': {
        currentRank: 12,
        previousRank: 18,
        searchVolume: 2400,
        trend: 'up',
        changePercent: 50,
        url: '/',
        naverRank: 8,
        googleRank: 15
      },
      '법인세 절세': {
        currentRank: 22,
        previousRank: 28,
        searchVolume: 5600,
        trend: 'up',
        changePercent: 27,
        url: '/blog/corporate-tax',
        naverRank: 18,
        googleRank: 25
      },
      '절세전략': {
        currentRank: 16,
        previousRank: 19,
        searchVolume: 6800,
        trend: 'up',
        changePercent: 18,
        url: '/tax-strategy',
        naverRank: 12,
        googleRank: 20
      },
      '정책자금 신청': {
        currentRank: 25,
        previousRank: 30,
        searchVolume: 12000,
        trend: 'up',
        changePercent: 20,
        url: '/policy-funding',
        naverRank: 20,
        googleRank: 30
      }
    };

    // 요청된 키워드가 있으면 필터링
    const filteredData = keywords.length > 0 
      ? Object.fromEntries(
          Object.entries(mockKeywordData).filter(([keyword]) => 
            keywords.includes(keyword)
          )
        )
      : mockKeywordData;

    const response = {
      success: true,
      data: {
        timeframe,
        keywords: filteredData,
        summary: {
          totalKeywords: Object.keys(filteredData).length,
          avgRank: Object.values(filteredData).reduce((acc, curr) => acc + curr.currentRank, 0) / Object.keys(filteredData).length,
          improvements: Object.values(filteredData).filter(k => k.trend === 'up').length,
          topPerformers: Object.entries(filteredData)
            .filter(([_, data]) => data.currentRank <= 10)
            .map(([keyword]) => keyword)
        },
        lastUpdated: new Date().toISOString()
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('키워드 API 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch keyword data',
        message: '키워드 데이터를 가져오는 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywords, action } = body;

    if (action === 'track') {
      // 새로운 키워드 추적 시작
      // 실제로는 데이터베이스에 키워드 저장하고 크론 작업 설정
      
      return NextResponse.json({
        success: true,
        message: `${keywords.length}개 키워드 추적이 시작되었습니다.`,
        data: {
          addedKeywords: keywords,
          trackingId: `track_${Date.now()}`,
          nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      });
    }

    if (action === 'refresh') {
      // 키워드 순위 강제 새로고침
      return NextResponse.json({
        success: true,
        message: '키워드 순위가 업데이트되었습니다.',
        data: {
          refreshedAt: new Date().toISOString(),
          affectedKeywords: keywords.length
        }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('키워드 추적 API 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process keyword tracking',
        message: '키워드 추적 요청 처리 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}