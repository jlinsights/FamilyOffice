import { Pool, PoolConfig } from 'pg';
import { createClient } from 'redis';
import { logger } from '../logging/logger';

// PostgreSQL 연결 풀 설정
const pgConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'familyoffice',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  max: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
  min: parseInt(process.env.DB_MIN_CONNECTIONS || '5'),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '2000'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// PostgreSQL 연결 풀 생성
export const pgPool = new Pool(pgConfig);

// Redis 클라이언트 설정
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
};

export const redisClient = createClient(redisConfig);

// 데이터베이스 연결 초기화
export const initializeDatabase = async (): Promise<void> => {
  try {
    // PostgreSQL 연결 테스트
    const client = await pgPool.connect();
    await client.query('SELECT NOW()');
    client.release();
    logger.info('PostgreSQL 연결 성공');

    // Redis 연결 테스트
    await redisClient.connect();
    await redisClient.ping();
    logger.info('Redis 연결 성공');
  } catch (error) {
    logger.error('데이터베이스 연결 실패:', error);
    throw error;
  }
};

// 연결 종료
export const closeDatabaseConnections = async (): Promise<void> => {
  try {
    await pgPool.end();
    await redisClient.quit();
    logger.info('데이터베이스 연결 종료');
  } catch (error) {
    logger.error('데이터베이스 연결 종료 실패:', error);
  }
};

// 트랜잭션 헬퍼
export const withTransaction = async <T>(
  callback: (client: any) => Promise<T>
): Promise<T> => {
  const client = await pgPool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// 멀티 테넌트 지원을 위한 테넌트 컨텍스트
export interface TenantContext {
  tenantId: string;
  userId: string;
  permissions: string[];
}

export const getTenantContext = (headers: Record<string, string>): TenantContext => {
  return {
    tenantId: headers['x-tenant-id'] || 'default',
    userId: headers['x-user-id'] || 'anonymous',
    permissions: headers['x-permissions']?.split(',') || [],
  };
}; 