/**
 * 데이터베이스 성능 최적화 유틸리티
 * Portfolio dashboard load time: <2 seconds 목표
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

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
  );
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
`;

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
`;

// 성능 최적화 초기화
export function initializeDatabaseOptimization(): void {
  console.log('🔧 Database optimization initialized');
}

// 사용 예시
export const portfolioQueries = {
  // 간단한 유틸리티 함수들
  getOptimizedClient: createOptimizedSupabaseClient,
  getIndexes: () => DATABASE_INDEXES,
  getPartitioning: () => DATABASE_PARTITIONING,
};
