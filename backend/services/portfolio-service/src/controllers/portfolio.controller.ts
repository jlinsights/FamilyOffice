import { Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { PortfolioService } from '../services/portfolio.service';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import {
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  CreatePortfolioAsset,
  PerformanceFilter,
  PaginationParams,
  TenantContext,
} from '../types/portfolio';

export class PortfolioController {
  private service: PortfolioService;

  constructor() {
    this.service = new PortfolioService();
  }

  // 포트폴리오 생성
  async createPortfolio(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      // 입력 검증
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const context = this.extractTenantContext(req);
      const request: CreatePortfolioRequest = req.body;

      const result = await this.service.createPortfolio(request, context);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('POST', '/portfolios', result.success ? 200 : 400, duration);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('포트폴리오 생성 컨트롤러 오류', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: req.user?.id,
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('POST', '/portfolios', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 포트폴리오 조회
  async getPortfolio(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const portfolioId = req.params.id;
      const context = this.extractTenantContext(req);

      const result = await this.service.getPortfolio(portfolioId, context);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id', result.success ? 200 : 404, duration);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('포트폴리오 조회 컨트롤러 오류', {
        portfolioId: req.params.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 포트폴리오 목록 조회
  async getPortfolios(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const context = this.extractTenantContext(req);
      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        sortBy: req.query.sortBy as string,
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      };

      const result = await this.service.getPortfolios(context, pagination);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios', result.success ? 200 : 400, duration);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('포트폴리오 목록 조회 컨트롤러 오류', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: req.user?.id,
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 포트폴리오 업데이트
  async updatePortfolio(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const portfolioId = req.params.id;
      const context = this.extractTenantContext(req);
      const request: UpdatePortfolioRequest = req.body;

      const result = await this.service.updatePortfolio(portfolioId, request, context);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('PUT', '/portfolios/:id', result.success ? 200 : 404, duration);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('포트폴리오 업데이트 컨트롤러 오류', {
        portfolioId: req.params.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('PUT', '/portfolios/:id', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 포트폴리오 자산 추가
  async addAssetToPortfolio(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const portfolioId = req.params.id;
      const context = this.extractTenantContext(req);
      const asset: CreatePortfolioAsset = req.body;

      const result = await this.service.addAssetToPortfolio(portfolioId, asset, context);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('POST', '/portfolios/:id/assets', result.success ? 201 : 400, duration);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('포트폴리오 자산 추가 컨트롤러 오류', {
        portfolioId: req.params.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('POST', '/portfolios/:id/assets', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 포트폴리오 자산 조회
  async getPortfolioAssets(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const portfolioId = req.params.id;
      const context = this.extractTenantContext(req);

      const result = await this.service.getPortfolioAssets(portfolioId, context);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id/assets', result.success ? 200 : 400, duration);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('포트폴리오 자산 조회 컨트롤러 오류', {
        portfolioId: req.params.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id/assets', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 포트폴리오 통계 조회
  async getPortfolioStats(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const portfolioId = req.params.id;
      const context = this.extractTenantContext(req);

      const result = await this.service.getPortfolioStats(portfolioId, context);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id/stats', result.success ? 200 : 404, duration);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('포트폴리오 통계 조회 컨트롤러 오류', {
        portfolioId: req.params.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id/stats', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 자산 할당 조회
  async getAssetAllocation(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: '입력 데이터가 유효하지 않습니다.',
          details: errors.array(),
          timestamp: new Date(),
        });
        return;
      }

      const portfolioId = req.params.id;
      const context = this.extractTenantContext(req);

      const result = await this.service.getAssetAllocation(portfolioId, context);

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id/allocation', result.success ? 200 : 400, duration);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('자산 할당 조회 컨트롤러 오류', {
        portfolioId: req.params.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest('GET', '/portfolios/:id/allocation', 500, duration);

      res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date(),
      });
    }
  }

  // 테넌트 컨텍스트 추출
  private extractTenantContext(req: Request): TenantContext {
    return {
      tenantId: req.headers['x-tenant-id'] as string || 'default',
      userId: req.user?.id || 'anonymous',
    };
  }

  // 입력 검증 규칙
  static getValidationRules() {
    return {
      createPortfolio: [
        body('name').notEmpty().withMessage('포트폴리오 이름은 필수입니다.'),
        body('currency').notEmpty().withMessage('통화는 필수입니다.'),
        body('description').optional().isString(),
        body('initialAssets').optional().isArray(),
        body('initialAssets.*.symbol').optional().notEmpty(),
        body('initialAssets.*.name').optional().notEmpty(),
        body('initialAssets.*.assetType').optional().isIn(['stock', 'bond', 'etf', 'mutual_fund', 'real_estate', 'private_equity', 'hedge_fund', 'cash', 'commodity', 'cryptocurrency', 'other']),
        body('initialAssets.*.quantity').optional().isFloat({ min: 0.01 }),
        body('initialAssets.*.averagePrice').optional().isFloat({ min: 0.01 }),
      ],
      updatePortfolio: [
        param('id').isUUID().withMessage('유효한 포트폴리오 ID가 필요합니다.'),
        body('name').optional().notEmpty(),
        body('description').optional().isString(),
        body('isActive').optional().isBoolean(),
      ],
      getPortfolio: [
        param('id').isUUID().withMessage('유효한 포트폴리오 ID가 필요합니다.'),
      ],
      getPortfolios: [
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('sortBy').optional().isIn(['name', 'created_at', 'updated_at', 'total_value']),
        query('sortOrder').optional().isIn(['asc', 'desc']),
      ],
      addAssetToPortfolio: [
        param('id').isUUID().withMessage('유효한 포트폴리오 ID가 필요합니다.'),
        body('symbol').notEmpty().withMessage('자산 심볼은 필수입니다.'),
        body('name').notEmpty().withMessage('자산 이름은 필수입니다.'),
        body('assetType').isIn(['stock', 'bond', 'etf', 'mutual_fund', 'real_estate', 'private_equity', 'hedge_fund', 'cash', 'commodity', 'cryptocurrency', 'other']).withMessage('유효한 자산 타입이 필요합니다.'),
        body('quantity').isFloat({ min: 0.01 }).withMessage('수량은 0보다 커야 합니다.'),
        body('averagePrice').isFloat({ min: 0.01 }).withMessage('평균 가격은 0보다 커야 합니다.'),
        body('purchaseDate').optional().isISO8601(),
      ],
      getPortfolioAssets: [
        param('id').isUUID().withMessage('유효한 포트폴리오 ID가 필요합니다.'),
      ],
      getPortfolioStats: [
        param('id').isUUID().withMessage('유효한 포트폴리오 ID가 필요합니다.'),
      ],
      getAssetAllocation: [
        param('id').isUUID().withMessage('유효한 포트폴리오 ID가 필요합니다.'),
      ],
    };
  }
} 