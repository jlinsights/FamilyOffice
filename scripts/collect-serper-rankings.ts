/**
 * Serper API 일일 검색 순위 수집 스크립트
 *
 * BMAD 키워드의 Google 검색 순위를 일일 단위로 수집하여 Supabase에 저장
 *
 * 실행 방법:
 * npx ts-node scripts/collect-serper-rankings.ts
 *
 * Vercel Cron Job 설정:
 * - Path: /api/cron/daily-bmad-collection
 * - Schedule: "0 2 * * *" (매일 새벽 2시)
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';
import { BMAD_AI_KEYWORDS } from '../lib/ai/ai-search-monitoring';
import { batchSearch } from '../lib/serper/client';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Supabase 클라이언트 — lazy init (Vercel build-time evaluation 회피)
// 이 모듈은 Vercel Cron route (/api/cron/daily-bmad-collection) 에서 import 되므로
// module top-level instantiation 은 build 단계에서 env 미주입 시 throw 로 build 를 깨뜨림.
let _supabase: SupabaseClient | null = null;
function supabase(): SupabaseClient {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'collect-serper-rankings: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 누락'
    );
  }
  _supabase = createClient(url, key);
  return _supabase;
}

// 추적 대상 도메인
const TARGET_DOMAIN = 'familyoffices.vip';

/**
 * 모든 BMAD 키워드 수집
 */
function getAllBMADKeywords(): Array<{ keyword: string; category: string }> {
  const allKeywords: Array<{ keyword: string; category: string }> = [];

  for (const [category, keywords] of Object.entries(BMAD_AI_KEYWORDS)) {
    for (const keyword of keywords) {
      allKeywords.push({ keyword, category });
    }
  }

  return allKeywords;
}

/**
 * 일일 검색 순위 수집 및 저장
 */
export async function collectDailyRankings() {
  console.log('🚀 Serper API 일일 검색 순위 수집 시작');
  console.log('='.repeat(80));

  const startTime = Date.now();
  const allKeywords = getAllBMADKeywords();
  const totalKeywords = allKeywords.length;

  console.log(`📊 총 ${totalKeywords}개 키워드 수집 예정`);
  console.log(`🎯 대상 도메인: ${TARGET_DOMAIN}`);
  console.log('');

  // 키워드 목록 추출
  const keywordStrings = allKeywords.map(item => item.keyword);

  // Serper API로 배치 검색 (1초 간격)
  console.log('🔍 Serper API 검색 중...');
  const rankings = await batchSearch(keywordStrings, TARGET_DOMAIN, {
    country: 'kr',
    language: 'ko',
    delayMs: 1000, // Rate limit 방지
  });

  console.log(`✅ 검색 완료: ${rankings.length}개 결과`);
  console.log('');

  // Supabase에 저장
  console.log('💾 Supabase에 데이터 저장 중...');
  const recordsToInsert = rankings.map((ranking, index) => {
    const keywordData = allKeywords.find(k => k.keyword === ranking.keyword);

    return {
      keyword: ranking.keyword,
      position: ranking.position,
      found: ranking.found,
      url: ranking.url,
      bmad_category: keywordData?.category || 'unknown',
      created_at: ranking.timestamp,
    };
  });

  // 배치 인서트 (100개씩)
  const batchSize = 100;
  let insertedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < recordsToInsert.length; i += batchSize) {
    const batch = recordsToInsert.slice(i, i + batchSize);

    const { data, error } = await supabase()
      .from('keyword_rankings')
      .insert(batch);

    if (error) {
      console.error(
        `❌ 배치 ${Math.floor(i / batchSize) + 1} 저장 실패:`,
        error.message
      );
      errorCount += batch.length;
    } else {
      insertedCount += batch.length;
      console.log(
        `✅ 배치 ${Math.floor(i / batchSize) + 1} 저장 완료: ${batch.length}개`
      );
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // 결과 요약
  console.log('');
  console.log('='.repeat(80));
  console.log('📊 수집 결과 요약');
  console.log('='.repeat(80));
  console.log(`✅ 성공: ${insertedCount}개 키워드`);
  console.log(`❌ 실패: ${errorCount}개 키워드`);
  console.log(`⏱️  소요 시간: ${duration}초`);
  console.log('');

  // 카테고리별 통계
  console.log('📈 카테고리별 발견 통계:');
  const categoryStats: Record<string, { found: number; total: number }> = {};

  for (const ranking of rankings) {
    const keywordData = allKeywords.find(k => k.keyword === ranking.keyword);
    const category = keywordData?.category || 'unknown';

    if (!categoryStats[category]) {
      categoryStats[category] = { found: 0, total: 0 };
    }

    categoryStats[category].total += 1;
    if (ranking.found && ranking.position !== null) {
      categoryStats[category].found += 1;
    }
  }

  for (const [category, stats] of Object.entries(categoryStats)) {
    const percentage = ((stats.found / stats.total) * 100).toFixed(1);
    console.log(
      `  ${category}: ${stats.found}/${stats.total} (${percentage}%)`
    );
  }

  console.log('');
  console.log('✨ 일일 검색 순위 수집 완료!');

  return {
    success: true,
    collected: insertedCount,
    failed: errorCount,
    duration: parseFloat(duration),
    timestamp: new Date().toISOString(),
  };
}

/**
 * 상위 순위 키워드 조회 (Top 10)
 */
export async function getTopRankingKeywords(limit: number = 10) {
  const { data, error } = await supabase()
    .from('keyword_rankings')
    .select('*')
    .not('position', 'is', null)
    .order('position', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('상위 순위 조회 실패:', error);
    return [];
  }

  return data || [];
}

/**
 * 키워드별 순위 추이 조회 (최근 30일)
 */
export async function getKeywordTrend(keyword: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase()
    .from('keyword_rankings')
    .select('*')
    .eq('keyword', keyword)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.error(`키워드 "${keyword}" 추이 조회 실패:`, error);
    return [];
  }

  return data || [];
}

/**
 * 카테고리별 평균 순위 조회
 */
export async function getCategoryAverageRankings() {
  const { data, error } = await supabase()
    .from('keyword_rankings')
    .select('bmad_category, position')
    .not('position', 'is', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('카테고리별 평균 순위 조회 실패:', error);
    return {};
  }

  // 카테고리별 평균 계산
  const categoryAverages: Record<
    string,
    { sum: number; count: number; avg: number }
  > = {};

  for (const record of data || []) {
    const category = record.bmad_category || 'unknown';
    const position = record.position;

    if (!categoryAverages[category]) {
      categoryAverages[category] = { sum: 0, count: 0, avg: 0 };
    }

    categoryAverages[category].sum += position;
    categoryAverages[category].count += 1;
  }

  // 평균 계산
  for (const category in categoryAverages) {
    const stats = categoryAverages[category];
    if (stats) {
      stats.avg = stats.sum / stats.count;
    }
  }

  return categoryAverages;
}

// CLI에서 직접 실행 시
if (require.main === module) {
  collectDailyRankings()
    .then(result => {
      console.log('✅ 스크립트 실행 완료:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}
