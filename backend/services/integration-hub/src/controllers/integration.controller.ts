import { Request, Response } from 'express';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import { rateLimiter } from '../../../shared/utils/rateLimiter';
import { validateRequest } from '../../../shared/utils/validation';
import { IntegrationService } from '../services/integration.service';
import {
  CreateIntegrationRequest,
  UpdateIntegrationRequest,
  IntegrationFilter,
  IntegrationSort,
  PaginationParams,
  SyncConfig,
} from '../types/integration';

export class IntegrationController {
  private integrationService: IntegrationService;

  constructor() {
    this.integrationService = new IntegrationService();
  }

  // 통합 생성
  async createIntegration(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      // 요청 검증
      const validationResult = validateRequest(
        req.body,
        CreateIntegrationRequest
      );
      if (!validationResult.isValid) {
        res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: validationResult.errors,
        });
        return;
      }

      // 속도 제한 확인
      const rateLimitResult = await rateLimiter.checkLimit(
        req,
        'integration_create'
      );
      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const request: CreateIntegrationRequest = req.body;
      const context = req.tenantContext;

      const integration = await this.integrationService.createIntegration(
        request,
        context
      );

      metricsCollector.recordApiCall(
        'integration',
        'create',
        Date.now() - startTime
      );

      res.status(201).json({
        success: true,
        data: integration,
      });
    } catch (error) {
      metricsCollector.recordApiError('integration', 'create');
      logger.error('Failed to create integration', {
        error,
        tenantId: req.tenantContext?.tenantId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to create integration',
        message: error.message,
      });
    }
  }

  // 통합 업데이트
  async updateIntegration(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { integrationId } = req.params;

      // 요청 검증
      const validationResult = validateRequest(
        req.body,
        UpdateIntegrationRequest
      );
      if (!validationResult.isValid) {
        res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: validationResult.errors,
        });
        return;
      }

      // 속도 제한 확인
      const rateLimitResult = await rateLimiter.checkLimit(
        req,
        'integration_update'
      );
      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const request: UpdateIntegrationRequest = req.body;
      const context = req.tenantContext;

      const integration = await this.integrationService.updateIntegration(
        integrationId,
        request,
        context
      );

      metricsCollector.recordApiCall(
        'integration',
        'update',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: integration,
      });
    } catch (error) {
      metricsCollector.recordApiError('integration', 'update');
      logger.error('Failed to update integration', {
        error,
        integrationId: req.params.integrationId,
      });

      if (error.message === 'Integration not found') {
        res.status(404).json({
          success: false,
          error: 'Integration not found',
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to update integration',
          message: error.message,
        });
      }
    }
  }

  // 통합 조회
  async getIntegration(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { integrationId } = req.params;
      const context = req.tenantContext;

      const integration = await this.integrationService.getIntegration(
        integrationId,
        context
      );

      if (!integration) {
        res.status(404).json({
          success: false,
          error: 'Integration not found',
        });
        return;
      }

      metricsCollector.recordApiCall(
        'integration',
        'read',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: integration,
      });
    } catch (error) {
      metricsCollector.recordApiError('integration', 'read');
      logger.error('Failed to get integration', {
        error,
        integrationId: req.params.integrationId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to get integration',
        message: error.message,
      });
    }
  }

  // 통합 목록 조회
  async getIntegrations(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const context = req.tenantContext;

      // 쿼리 파라미터 파싱
      const filter: IntegrationFilter = {
        type: req.query.type as string,
        status: req.query.status as string,
        provider: req.query.provider as string,
        search: req.query.search as string,
      };

      const sort: IntegrationSort = {
        field: (req.query.sortBy as string) || 'createdAt',
        direction: (req.query.sortOrder as string) || 'desc',
      };

      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
      };

      const result = await this.integrationService.getIntegrations(
        filter,
        sort,
        pagination,
        context
      );

      metricsCollector.recordApiCall(
        'integration',
        'list',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: result.data,
        pagination: {
          page: result.pagination.page,
          limit: result.pagination.limit,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages,
        },
      });
    } catch (error) {
      metricsCollector.recordApiError('integration', 'list');
      logger.error('Failed to get integrations', {
        error,
        tenantId: req.tenantContext?.tenantId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to get integrations',
        message: error.message,
      });
    }
  }

  // 통합 삭제
  async deleteIntegration(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { integrationId } = req.params;
      const context = req.tenantContext;

      // 속도 제한 확인
      const rateLimitResult = await rateLimiter.checkLimit(
        req,
        'integration_delete'
      );
      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      await this.integrationService.deleteIntegration(integrationId, context);

      metricsCollector.recordApiCall(
        'integration',
        'delete',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        message: 'Integration deleted successfully',
      });
    } catch (error) {
      metricsCollector.recordApiError('integration', 'delete');
      logger.error('Failed to delete integration', {
        error,
        integrationId: req.params.integrationId,
      });

      if (error.message === 'Integration not found') {
        res.status(404).json({
          success: false,
          error: 'Integration not found',
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to delete integration',
          message: error.message,
        });
      }
    }
  }

  // 동기화 작업 시작
  async startSyncJob(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { integrationId } = req.params;
      const context = req.tenantContext;

      // 요청 검증
      const validationResult = validateRequest(req.body, SyncConfig);
      if (!validationResult.isValid) {
        res.status(400).json({
          success: false,
          error: 'Invalid sync configuration',
          details: validationResult.errors,
        });
        return;
      }

      // 속도 제한 확인
      const rateLimitResult = await rateLimiter.checkLimit(
        req,
        'sync_job_start'
      );
      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const syncConfig: SyncConfig = req.body;
      const syncJob = await this.integrationService.startSyncJob(
        integrationId,
        syncConfig,
        context
      );

      metricsCollector.recordApiCall(
        'sync_job',
        'start',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: syncJob,
      });
    } catch (error) {
      metricsCollector.recordApiError('sync_job', 'start');
      logger.error('Failed to start sync job', {
        error,
        integrationId: req.params.integrationId,
      });

      if (error.message === 'Integration not found') {
        res.status(404).json({
          success: false,
          error: 'Integration not found',
        });
      } else if (error.message === 'Integration is not active') {
        res.status(400).json({
          success: false,
          error: 'Integration is not active',
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to start sync job',
          message: error.message,
        });
      }
    }
  }

  // 웹훅 이벤트 처리
  async processWebhookEvent(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { integrationId } = req.params;
      const context = req.tenantContext;

      // 요청 검증
      if (!req.body.eventType || !req.body.payload) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: eventType, payload',
        });
        return;
      }

      // 속도 제한 확인
      const rateLimitResult = await rateLimiter.checkLimit(
        req,
        'webhook_event'
      );
      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const { eventType, payload } = req.body;
      const webhookEvent = await this.integrationService.processWebhookEvent(
        integrationId,
        eventType,
        payload,
        context
      );

      metricsCollector.recordApiCall(
        'webhook_event',
        'process',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: webhookEvent,
      });
    } catch (error) {
      metricsCollector.recordApiError('webhook_event', 'process');
      logger.error('Failed to process webhook event', {
        error,
        integrationId: req.params.integrationId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to process webhook event',
        message: error.message,
      });
    }
  }

  // 통합 테스트
  async testIntegration(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { integrationId } = req.params;
      const context = req.tenantContext;

      // 속도 제한 확인
      const rateLimitResult = await rateLimiter.checkLimit(
        req,
        'integration_test'
      );
      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const integration = await this.integrationService.getIntegration(
        integrationId,
        context
      );
      if (!integration) {
        res.status(404).json({
          success: false,
          error: 'Integration not found',
        });
        return;
      }

      const testResult =
        await this.integrationService.testIntegration(integration);

      metricsCollector.recordApiCall(
        'integration',
        'test',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: testResult,
      });
    } catch (error) {
      metricsCollector.recordApiError('integration', 'test');
      logger.error('Failed to test integration', {
        error,
        integrationId: req.params.integrationId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to test integration',
        message: error.message,
      });
    }
  }

  // 동기화 작업 상태 조회
  async getSyncJobStatus(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { syncJobId } = req.params;
      const context = req.tenantContext;

      const syncJob = await this.integrationService.getSyncJobStatus(
        syncJobId,
        context
      );

      if (!syncJob) {
        res.status(404).json({
          success: false,
          error: 'Sync job not found',
        });
        return;
      }

      metricsCollector.recordApiCall(
        'sync_job',
        'status',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: syncJob,
      });
    } catch (error) {
      metricsCollector.recordApiError('sync_job', 'status');
      logger.error('Failed to get sync job status', {
        error,
        syncJobId: req.params.syncJobId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to get sync job status',
        message: error.message,
      });
    }
  }

  // 통합 메트릭 조회
  async getIntegrationMetrics(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const { integrationId } = req.params;
      const context = req.tenantContext;

      const metrics = await this.integrationService.getIntegrationMetrics(
        integrationId,
        context
      );

      if (!metrics) {
        res.status(404).json({
          success: false,
          error: 'Integration metrics not found',
        });
        return;
      }

      metricsCollector.recordApiCall(
        'integration',
        'metrics',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: metrics,
      });
    } catch (error) {
      metricsCollector.recordApiError('integration', 'metrics');
      logger.error('Failed to get integration metrics', {
        error,
        integrationId: req.params.integrationId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to get integration metrics',
        message: error.message,
      });
    }
  }
}
