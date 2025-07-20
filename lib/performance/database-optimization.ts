/**
 * 데이터베이스 성능 최적화
 * Portfolio dashboard load time: <2 seconds 목표
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// 성능 최적화된 Supabase 클라이언트 설정
export function createOptimizedSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'cache-control': 'public, max-age=300', // 5분 캐시
        },
      },
      realtime: {
        params: {
          eventsPerSecond: 10, // 실시간 이벤트 제한
        },
      },
    }
  )
}

// 데이터베이스 인덱스 생성 스크립트
export const DATABASE_INDEXES = `
-- 포트폴리오 쿼리 최적화 인덱스
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id_created_at 
ON portfolios(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_portfolios_status_updated_at 
ON portfolios(status, updated_at DESC);

-- 거래 기록 최적화 인덱스
CREATE INDEX IF NOT EXISTS idx_transactions_portfolio_id_date 
ON transactions(portfolio_id, transaction_date DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_symbol_date 
ON transactions(symbol, transaction_date DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id_type_date 
ON transactions(user_id, transaction_type, transaction_date DESC);

-- 자산 가격 데이터 최적화 인덱스
CREATE INDEX IF NOT EXISTS idx_asset_prices_symbol_timestamp 
ON asset_prices(symbol, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_asset_prices_timestamp_symbol 
ON asset_prices(timestamp DESC, symbol);

-- 복합 인덱스로 조인 성능 개선
CREATE INDEX IF NOT EXISTS idx_holdings_portfolio_symbol 
ON holdings(portfolio_id, symbol);

-- 부분 인덱스로 활성 데이터만 인덱싱
CREATE INDEX IF NOT EXISTS idx_active_portfolios 
ON portfolios(user_id, updated_at DESC) 
WHERE status = 'active';

-- 해시 인덱스로 정확한 매칭 최적화
CREATE INDEX IF NOT EXISTS idx_users_email_hash 
ON users USING hash(email);

-- GIN 인덱스로 JSON 필드 검색 최적화
CREATE INDEX IF NOT EXISTS idx_portfolio_metadata_gin 
ON portfolios USING gin(metadata);
`

// 파티셔닝 전략
export const DATABASE_PARTITIONING = `
-- 거래 기록 월별 파티셔닝
CREATE TABLE transactions_partitioned (
  LIKE transactions INCLUDING ALL
) PARTITION BY RANGE (transaction_date);

-- 월별 파티션 생성 함수
CREATE OR REPLACE FUNCTION create_monthly_partition(table_name text, start_date date)
RETURNS void AS $$
DECLARE
  partition_name text;
  end_date date;
BEGIN
  partition_name := table_name || '_' || to_char(start_date, 'YYYY_MM');
  end_date := start_date + interval '1 month';
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF %I 
                  FOR VALUES FROM (%L) TO (%L)',
                 partition_name, table_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;

-- 자동 파티션 생성
SELECT create_monthly_partition('transactions_partitioned', date_trunc('month', CURRENT_DATE - interval '12 months'));
SELECT create_monthly_partition('transactions_partitioned', date_trunc('month', CURRENT_DATE));
SELECT create_monthly_partition('transactions_partitioned', date_trunc('month', CURRENT_DATE + interval '1 month'));
`

// 최적화된 포트폴리오 쿼리
export class OptimizedPortfolioQueries {
  private supabase = createOptimizedSupabaseClient()

  // 대시보드용 포트폴리오 요약 (목표: <500ms)
  async getPortfolioSummary(userId: string) {
    const startTime = performance.now()
    
    try {
      // 병렬로 데이터 가져오기
      const [portfolioData, recentTransactions, performance] = await Promise.all([
        // 포트폴리오 기본 정보
        this.supabase
          .from('portfolios')
          .select(`
            id,
            name,
            total_value,
            total_return,
            return_percentage,
            updated_at,
            holdings (
              symbol,
              quantity,
              current_price,
              total_value
            )
          `)
          .eq('user_id', userId)
          .eq('status', 'active')
          .order('updated_at', { ascending: false })
          .limit(5),

        // 최근 거래 내역 (인덱스 활용)
        this.supabase
          .from('transactions')
          .select('id, symbol, transaction_type, quantity, price, transaction_date')
          .eq('user_id', userId)
          .order('transaction_date', { ascending: false })
          .limit(10),

        // 성과 지표 (집계 쿼리 최적화)
        this.supabase
          .rpc('get_portfolio_performance', { 
            p_user_id: userId,
            p_days: 30 
          })
      ])

      const duration = performance.now() - startTime
      console.log(`Portfolio summary query completed in ${duration.toFixed(2)}ms`)

      if (duration > 1000) {
        console.warn(`Slow portfolio query detected: ${duration}ms`)
      }

      return {
        portfolios: portfolioData.data || [],
        recentTransactions: recentTransactions.data || [],
        performance: performance.data,
        queryTime: duration
      }
    } catch (error) {
      console.error('Portfolio summary query error:', error)
      throw new Error('Failed to fetch portfolio summary')
    }
  }

  // 실시간 포트폴리오 값 업데이트 (목표: <100ms)
  async updatePortfolioValues(portfolioId: string, priceUpdates: Record<string, number>) {
    const startTime = performance.now()

    try {
      // 배치 업데이트로 성능 최적화
      const updates = Object.entries(priceUpdates).map(([symbol, price]) => ({
        portfolio_id: portfolioId,
        symbol,
        current_price: price,
        updated_at: new Date().toISOString()
      }))

      // upsert로 한 번에 처리
      const { error } = await this.supabase
        .from('holdings')
        .upsert(updates, {
          onConflict: 'portfolio_id,symbol',
          ignoreDuplicates: false
        })

      if (error) throw error

      // 포트폴리오 총액 재계산 (트리거로 자동화)
      await this.supabase.rpc('recalculate_portfolio_value', {
        p_portfolio_id: portfolioId
      })

      const duration = performance.now() - startTime
      console.log(`Portfolio value update completed in ${duration.toFixed(2)}ms`)

      return { success: true, duration }
    } catch (error) {
      console.error('Portfolio value update error:', error)
      throw new Error('Failed to update portfolio values')
    }
  }

  // 복잡한 리포트 생성 쿼리 최적화 (목표: <30초)
  async generatePerformanceReport(userId: string, params: {
    startDate: string
    endDate: string
    portfolioIds?: string[]
    includeComparisons?: boolean
  }) {
    const startTime = performance.now()

    try {
      // 청크로 나누어 처리하여 메모리 효율성 확보
      const chunkSize = 1000
      const results = []

      // 스트리밍 쿼리로 대용량 데이터 처리
      const { data, error } = await this.supabase
        .rpc('generate_performance_report', {
          p_user_id: userId,
          p_start_date: params.startDate,
          p_end_date: params.endDate,
          p_portfolio_ids: params.portfolioIds || null,
          p_include_comparisons: params.includeComparisons || false
        })

      if (error) throw error

      const duration = performance.now() - startTime
      console.log(`Performance report generated in ${duration.toFixed(2)}ms`)

      return {
        report: data,
        generationTime: duration,
        recordCount: data?.length || 0
      }
    } catch (error) {
      console.error('Performance report generation error:', error)
      throw new Error('Failed to generate performance report')
    }
  }

  // 연결 풀 상태 모니터링
  async getConnectionPoolStats() {
    try {
      const { data, error } = await this.supabase
        .rpc('pg_stat_database')

      if (error) throw error

      return {
        activeConnections: data?.numbackends || 0,
        maxConnections: 100, // Supabase 기본값
        connectionUtilization: ((data?.numbackends || 0) / 100) * 100
      }
    } catch (error) {
      console.error('Connection pool stats error:', error)
      return null
    }
  }
}

// 쿼리 성능 모니터링
export class QueryPerformanceMonitor {
  private slowQueryThreshold = 1000 // 1초
  private queryStats = new Map<string, {
    count: number
    totalTime: number
    avgTime: number
    slowQueries: number
  }>()

  trackQuery<T>(queryName: string, queryFn: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const startTime = performance.now()
      
      try {
        const result = await queryFn()
        const duration = performance.now() - startTime
        
        this.recordQueryStats(queryName, duration)
        resolve(result)
      } catch (error) {
        const duration = performance.now() - startTime
        this.recordQueryStats(queryName, duration, true)
        reject(error)
      }
    })
  }

  private recordQueryStats(queryName: string, duration: number, isError = false) {
    const stats = this.queryStats.get(queryName) || {
      count: 0,
      totalTime: 0,
      avgTime: 0,
      slowQueries: 0
    }

    stats.count++
    stats.totalTime += duration
    stats.avgTime = stats.totalTime / stats.count

    if (duration > this.slowQueryThreshold) {
      stats.slowQueries++
      console.warn(`Slow query detected: ${queryName} took ${duration.toFixed(2)}ms`)
    }

    this.queryStats.set(queryName, stats)

    // 성능 메트릭 전송
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'database_query', {
        event_category: 'Performance',
        event_label: queryName,
        value: Math.round(duration),
        custom_map: {
          query_name: queryName,
          is_slow: duration > this.slowQueryThreshold,
          is_error: isError
        }
      })
    }
  }

  getQueryStats() {
    return Object.fromEntries(this.queryStats)
  }

  getSlowQueries() {
    return Array.from(this.queryStats.entries())
      .filter(([_, stats]) => stats.slowQueries > 0)
      .map(([queryName, stats]) => ({
        queryName,
        ...stats,
        slowQueryRate: (stats.slowQueries / stats.count) * 100
      }))
  }
}

// 데이터베이스 최적화 유틸리티
export class DatabaseOptimizer {
  private supabase = createOptimizedSupabaseClient()

  // 인덱스 사용률 분석
  async analyzeIndexUsage() {
    const { data, error } = await this.supabase
      .rpc('pg_stat_user_indexes')

    if (error) {
      console.error('Index analysis error:', error)
      return null
    }

    return data?.map((index: any) => ({
      tableName: index.relname,
      indexName: index.indexrelname,
      scans: index.idx_scan,
      tuplesRead: index.idx_tup_read,
      tuplesReturned: index.idx_tup_fetch,
      efficiency: index.idx_tup_fetch / (index.idx_tup_read || 1)
    }))
  }

  // 테이블 통계 업데이트
  async updateTableStatistics(tableNames: string[]) {
    try {
      for (const tableName of tableNames) {
        await this.supabase.rpc('analyze_table', { table_name: tableName })
      }
      console.log('Table statistics updated successfully')
    } catch (error) {
      console.error('Failed to update table statistics:', error)
    }
  }

  // 쿼리 플랜 분석
  async explainQuery(query: string) {
    const { data, error } = await this.supabase
      .rpc('explain_query', { query_text: query })

    if (error) {
      console.error('Query plan analysis error:', error)
      return null
    }

    return data
  }
}

// 성능 최적화 초기화
export function initializeDatabaseOptimization() {
  console.log('🔧 Database optimization initialized')
  
  // 정기적인 통계 업데이트 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    const optimizer = new DatabaseOptimizer()
    
    // 1시간마다 주요 테이블 통계 업데이트
    setInterval(() => {
      optimizer.updateTableStatistics([
        'portfolios',
        'transactions',
        'holdings',
        'asset_prices'
      ])
    }, 60 * 60 * 1000)
  }
}

// 사용 예시
export const portfolioQueries = new OptimizedPortfolioQueries()
export const queryMonitor = new QueryPerformanceMonitor()
export const dbOptimizer = new DatabaseOptimizer()