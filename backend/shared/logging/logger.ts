import winston from 'winston';
import { format } from 'winston';

// 로그 레벨 정의
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// 로그 색상 정의
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// 로그 포맷 정의
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.colorize({ all: true }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// 프로덕션용 JSON 포맷
const jsonFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
);

// 로거 생성
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: process.env.NODE_ENV === 'production' ? jsonFormat : logFormat,
  transports: [
    // 콘솔 출력
    new winston.transports.Console(),
    // 에러 로그 파일
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // 전체 로그 파일
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  // 예외 처리
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  // 프로미스 거부 처리
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
});

// 구조화된 로깅을 위한 헬퍼 함수들
export const logWithContext = (
  level: 'error' | 'warn' | 'info' | 'http' | 'debug',
  message: string,
  context: Record<string, any> = {}
) => {
  logger.log(level, message, {
    ...context,
    timestamp: new Date().toISOString(),
  });
};

// API 요청 로깅
export const logApiRequest = (
  method: string,
  url: string,
  statusCode: number,
  responseTime: number,
  userId?: string,
  tenantId?: string
) => {
  logger.http(`${method} ${url}`, {
    statusCode,
    responseTime: `${responseTime}ms`,
    userId,
    tenantId,
  });
};

// 비즈니스 로직 로깅
export const logBusinessEvent = (
  event: string,
  data: Record<string, any>,
  userId?: string,
  tenantId?: string
) => {
  logger.info(`Business Event: ${event}`, {
    ...data,
    userId,
    tenantId,
    eventType: 'business',
  });
};

// 보안 이벤트 로깅
export const logSecurityEvent = (
  event: string,
  data: Record<string, any>,
  userId?: string,
  tenantId?: string
) => {
  logger.warn(`Security Event: ${event}`, {
    ...data,
    userId,
    tenantId,
    eventType: 'security',
  });
};

// 성능 메트릭 로깅
export const logPerformanceMetric = (
  metric: string,
  value: number,
  unit: string,
  context: Record<string, any> = {}
) => {
  logger.info(`Performance Metric: ${metric}`, {
    value,
    unit,
    ...context,
    eventType: 'performance',
  });
};

// 에러 로깅 헬퍼
export const logError = (error: Error, context: Record<string, any> = {}) => {
  logger.error(error.message, {
    stack: error.stack,
    ...context,
    eventType: 'error',
  });
};
