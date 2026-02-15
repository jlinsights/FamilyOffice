/**
 * API 엔드포인트 입력 검증 시스템
 * 모든 API 라우트에서 사용할 수 있는 포괄적인 Zod 검증 스키마
 */
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

// 기본 데이터 타입 검증
export const idSchema = z
  .string()
  .min(1, 'ID는 필수입니다')
  .max(100, 'ID가 너무 깁니다');
export const emailSchema = z
  .string()
  .email('올바른 이메일 주소를 입력해주세요');
export const phoneSchema = z
  .string()
  .regex(
    /^(\+82|0)1[0-9]-?\d{3,4}-?\d{4}$/,
    '올바른 한국 휴대폰 번호를 입력해주세요'
  );
export const urlSchema = z.string().url('올바른 URL을 입력해주세요');
export const uuidSchema = z.string().uuid('올바른 UUID 형식이 아닙니다');

// 날짜 및 시간 검증
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식의 날짜를 입력해주세요');
export const datetimeSchema = z
  .string()
  .datetime('올바른 ISO datetime 형식이 아닙니다');

// 페이지네이션 검증
export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, '페이지는 1 이상이어야 합니다')
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100, '한 번에 최대 100개까지 조회 가능합니다')
    .default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

// Newsletter API 검증
export const newsletterSubscribeSchema = z.object({
  email: emailSchema,
  source: z.string().min(1).max(50).default('website'),
  tags: z
    .array(z.string().max(30))
    .max(10, '태그는 최대 10개까지 설정 가능합니다')
    .default([]),
  utmSource: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
});

// Financial API 검증
export const stockQuerySchema = z.object({
  symbol: z
    .string()
    .min(1, '종목 코드는 필수입니다')
    .max(20, '종목 코드가 너무 깁니다'),
  period: z
    .enum(['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y'])
    .default('1d'),
  interval: z
    .enum(['1m', '5m', '15m', '30m', '1h', '1d', '1wk', '1mo'])
    .default('1d'),
  korean: z.coerce.boolean().default(false),
});

export const forexQuerySchema = z.object({
  from: z.string().length(3, '통화 코드는 3자리여야 합니다').toUpperCase(),
  to: z.string().length(3, '통화 코드는 3자리여야 합니다').toUpperCase(),
  amount: z.coerce.number().positive('금액은 양수여야 합니다').optional(),
  major: z.coerce.boolean().default(false),
});

// SEO API 검증
export const keywordAnalysisSchema = z.object({
  keyword: z
    .string()
    .min(1, '키워드는 필수입니다')
    .max(200, '키워드가 너무 깁니다'),
  language: z.enum(['ko', 'en']).default('ko'),
  region: z.enum(['KR', 'US', 'JP', 'CN']).default('KR'),
  device: z.enum(['desktop', 'mobile', 'tablet']).default('desktop'),
  competitors: z
    .array(z.string().url())
    .max(5, '경쟁사는 최대 5개까지 분석 가능합니다')
    .optional(),
});

export const naverRankingSchema = z.object({
  action: z
    .enum(['get_rankings', 'add_keyword', 'remove_keyword', 'check_rank'])
    .default('get_rankings'),
  keyword: z.string().min(1).max(200).optional(),
  target_rank: z.coerce.number().int().min(1).max(100).optional(),
  category: z.string().max(50).optional(),
});

// Admin API 검증
export const adminSecurityAuditSchema = z.object({
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  eventType: z
    .enum([
      'suspicious_login',
      'rate_limit_exceeded',
      'invalid_auth',
      'admin_access',
      'data_breach_attempt',
    ])
    .optional(),
  ip: z.string().ip().optional(),
  limit: z.coerce.number().int().min(1).max(1000).default(100),
});

export const ipUnblockSchema = z.object({
  ip: z.string().ip('올바른 IP 주소를 입력해주세요'),
  reason: z
    .string()
    .min(10, '차단 해제 사유를 10자 이상 입력해주세요')
    .max(500, '사유가 너무 깁니다'),
});

// Monitoring API 검증
export const monitoringQuerySchema = z.object({
  metric: z
    .enum(['performance', 'errors', 'usage', 'security'])
    .default('performance'),
  startTime: datetimeSchema.optional(),
  endTime: datetimeSchema.optional(),
  aggregation: z.enum(['1m', '5m', '15m', '1h', '1d']).default('1h'),
});

// Webhook 검증 (일반적인 webhook payload)
export const webhookSchema = z.object({
  event: z.string().min(1, '이벤트 타입은 필수입니다'),
  timestamp: datetimeSchema,
  data: z.record(z.unknown()),
  signature: z.string().min(1, '서명은 필수입니다'),
});

// Cal.com 예약 검증
export const calcomBookingSchema = z.object({
  eventTypeId: z.coerce
    .number()
    .int()
    .positive('올바른 이벤트 타입 ID가 아닙니다'),
  start: datetimeSchema,
  end: datetimeSchema,
  responses: z.record(z.union([z.string(), z.number(), z.boolean()])),
  metadata: z.record(z.unknown()).optional(),
  timeZone: z.string().min(1, '타임존은 필수입니다').default('Asia/Seoul'),
});

// 보안 이벤트 로깅 검증
export const securityEventSchema = z.object({
  type: z.enum([
    'suspicious_login',
    'rate_limit_exceeded',
    'invalid_auth',
    'admin_access',
    'data_breach_attempt',
  ]),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z
    .string()
    .min(1, '이벤트 설명은 필수입니다')
    .max(1000, '설명이 너무 깁니다'),
  ip_address: z.string().ip().optional(),
  user_agent: z.string().max(500).optional(),
  user_id: z.string().optional(),
  additional_data: z.record(z.unknown()).optional(),
});

// 이메일 발송 검증
export const emailSendSchema = z.object({
  to: emailSchema,
  subject: z
    .string()
    .min(1, '제목은 필수입니다')
    .max(200, '제목이 너무 깁니다'),
  content: z
    .string()
    .min(1, '내용은 필수입니다')
    .max(100000, '내용이 너무 깁니다'),
  type: z.enum(['html', 'text']).default('html'),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
});

// API 응답 타입 정의
export interface ApiValidationResult<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    field?: string;
    code?: string;
  };
}

// 검증 래퍼 함수
export async function validateApiRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
  source: 'body' | 'query' | 'params' = 'body'
): Promise<ApiValidationResult<T>> {
  try {
    let data: unknown;

    switch (source) {
      case 'body':
        try {
          data = await request.json();
        } catch {
          return {
            success: false,
            error: {
              message: '올바른 JSON 형식이 아닙니다',
              code: 'INVALID_JSON',
            },
          };
        }
        break;

      case 'query':
        const url = new URL(request.url);
        data = Object.fromEntries(url.searchParams.entries());
        break;

      case 'params':
        // URL params는 Next.js에서 별도로 처리해야 함
        data = {};
        break;

      default:
        return {
          success: false,
          error: {
            message: '지원하지 않는 데이터 소스입니다',
            code: 'INVALID_SOURCE',
          },
        };
    }

    const result = schema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.errors[0];
      if (!firstError) {
        return {
          success: false,
          error: {
            message: '입력값이 올바르지 않습니다',
            code: 'VALIDATION_ERROR',
          },
        };
      }

      return {
        success: false,
        error: {
          message: firstError.message,
          field: firstError.path.join('.'),
          code: 'VALIDATION_ERROR',
        },
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message:
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

// 검증 실패 응답 생성 헬퍼
export function createValidationErrorResponse(
  result: ApiValidationResult,
  status: number = 400
): NextResponse {
  return NextResponse.json(
    {
      error: {
        message: result.error?.message || '입력값이 올바르지 않습니다',
        field: result.error?.field,
        code: result.error?.code || 'VALIDATION_ERROR',
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

// 공통 API 응답 래퍼
export function createApiResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

// 에러 응답 래퍼
export function createErrorResponse(
  message: string,
  code: string = 'INTERNAL_ERROR',
  status: number = 500,
  details?: unknown
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

// Rate limit 헤더 검증
export const rateLimitHeaderSchema = z.object({
  'x-forwarded-for': z.string().optional(),
  'x-real-ip': z.string().optional(),
  'user-agent': z.string().optional(),
  referer: z.string().optional(),
});

// Content Security Policy 검증을 위한 스키마
export const cspReportSchema = z.object({
  'csp-report': z.object({
    'document-uri': z.string(),
    referrer: z.string().optional(),
    'violated-directive': z.string(),
    'effective-directive': z.string().optional(),
    'original-policy': z.string(),
    disposition: z.enum(['enforce', 'report']),
    'blocked-uri': z.string().optional(),
    'line-number': z.number().optional(),
    'column-number': z.number().optional(),
    'source-file': z.string().optional(),
  }),
});

export type PaginationQuery = z.infer<typeof paginationSchema>;
export type NewsletterSubscribeData = z.infer<typeof newsletterSubscribeSchema>;
export type StockQuery = z.infer<typeof stockQuerySchema>;
export type ForexQuery = z.infer<typeof forexQuerySchema>;
export type KeywordAnalysisQuery = z.infer<typeof keywordAnalysisSchema>;
export type NaverRankingQuery = z.infer<typeof naverRankingSchema>;
export type AdminSecurityAuditQuery = z.infer<typeof adminSecurityAuditSchema>;
export type IpUnblockData = z.infer<typeof ipUnblockSchema>;
export type MonitoringQuery = z.infer<typeof monitoringQuerySchema>;
export type WebhookData = z.infer<typeof webhookSchema>;
export type CalcomBookingData = z.infer<typeof calcomBookingSchema>;
export type SecurityEventData = z.infer<typeof securityEventSchema>;
export type EmailSendData = z.infer<typeof emailSendSchema>;
export type CspReportData = z.infer<typeof cspReportSchema>;
