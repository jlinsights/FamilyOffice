/**
 * Vercel Cron Job: 일일 BMAD 키워드 순위 수집
 *
 * Vercel Cron 설정 (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/daily-bmad-collection",
 *     "schedule": "0 2 * * *"
 *   }]
 * }
 *
 * 실행 스케줄: 매일 새벽 2시 (KST 기준)
 * 인증: CRON_SECRET 환경 변수로 보호
 */
import { NextRequest, NextResponse } from 'next/server';
import { collectDailyRankings } from '@/scripts/collect-serper-rankings';

export async function GET(request: NextRequest) {
  // Vercel Cron 인증 확인
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedAuth) {
    console.error('❌ Unauthorized cron job access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('🚀 Starting daily BMAD keyword ranking collection...');

  try {
    // 일일 순위 수집 실행
    const result = await collectDailyRankings();

    console.log('✅ Daily BMAD collection completed:', result);

    return NextResponse.json({
      success: true,
      message: 'Daily BMAD keyword rankings collected successfully',
      result: {
        collected: result.collected,
        failed: result.failed,
        duration: result.duration,
        timestamp: result.timestamp,
      },
    });
  } catch (error) {
    console.error('❌ Daily BMAD collection failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to collect daily rankings',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// 수동 트리거 지원 (POST 요청)
export async function POST(request: NextRequest) {
  // 관리자 권한 확인 (선택사항)
  // const { userId } = auth();
  // if (!userId) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  console.log('🔧 Manual BMAD collection triggered');

  try {
    const result = await collectDailyRankings();

    return NextResponse.json({
      success: true,
      message: 'Manual BMAD collection completed',
      result: {
        collected: result.collected,
        failed: result.failed,
        duration: result.duration,
        timestamp: result.timestamp,
      },
    });
  } catch (error) {
    console.error('❌ Manual BMAD collection failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to collect rankings',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
