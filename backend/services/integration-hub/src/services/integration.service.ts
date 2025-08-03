import { TenantContext } from '../../../shared/database/connection';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import { IntegrationRepository } from '../repositories/integration.repository';
import {
  Integration,
  IntegrationType,
  IntegrationStatus,
  SyncJob,
  SyncJobStatus,
  SyncJobType,
  WebhookEvent,
  WebhookEventStatus,
  DataMappingTemplate,
  IntegrationMetrics,
  CreateIntegrationRequest,
  UpdateIntegrationRequest,
  IntegrationFilter,
  IntegrationSort,
  PaginationParams,
  PaginatedResponse,
  IntegrationTestResult,
  SyncConfig,
  ConnectionTestResult,
  AuthenticationTestResult,
  DataAccessTestResult,
} from '../types/integration';

export class IntegrationService {
  private integrationRepository: IntegrationRepository;

  constructor() {
    this.integrationRepository = new IntegrationRepository();
  }

  // 통합 생성
  async createIntegration(
    request: CreateIntegrationRequest,
    context: TenantContext
  ): Promise<Integration> {
    const startTime = Date.now();

    try {
      // 통합 설정 검증
      this.validateIntegrationConfig(request.config);

      // 자격 증명 암호화
      const encryptedCredentials = await this.encryptCredentials(
        request.credentials
      );

      const integration = await this.integrationRepository.createIntegration(
        { ...request, credentials: encryptedCredentials },
        context
      );

      // 통합 테스트 실행
      const testResult = await this.testIntegration(integration);
      await this.integrationRepository.saveIntegrationTestResult(
        integration.id,
        testResult,
        context
      );

      // 테스트 실패 시 상태 업데이트
      if (!testResult.success) {
        await this.integrationRepository.updateIntegration(
          integration.id,
          { status: IntegrationStatus.ERROR },
          context
        );
      }

      metricsCollector.recordServiceOperation(
        'integration',
        'create',
        Date.now() - startTime
      );
      logger.info('Integration service created successfully', {
        integrationId: integration.id,
        tenantId: context.tenantId,
      });

      return integration;
    } catch (error) {
      metricsCollector.recordServiceError('integration', 'create');
      logger.error('Failed to create integration service', {
        error,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 통합 업데이트
  async updateIntegration(
    integrationId: string,
    request: UpdateIntegrationRequest,
    context: TenantContext
  ): Promise<Integration> {
    const startTime = Date.now();

    try {
      // 기존 통합 조회
      const existingIntegration =
        await this.integrationRepository.getIntegration(integrationId, context);

      if (!existingIntegration) {
        throw new Error('Integration not found');
      }

      // 설정 업데이트 시 검증
      if (request.config) {
        this.validateIntegrationConfig(request.config);
      }

      // 자격 증명 업데이트 시 암호화
      let encryptedCredentials = request.credentials;
      if (request.credentials) {
        encryptedCredentials = await this.encryptCredentials(
          request.credentials
        );
      }

      const integration = await this.integrationRepository.updateIntegration(
        integrationId,
        { ...request, credentials: encryptedCredentials },
        context
      );

      // 설정 변경 시 재테스트
      if (request.config || request.credentials) {
        const testResult = await this.testIntegration(integration);
        await this.integrationRepository.saveIntegrationTestResult(
          integrationId,
          testResult,
          context
        );

        if (!testResult.success) {
          await this.integrationRepository.updateIntegration(
            integrationId,
            { status: IntegrationStatus.ERROR },
            context
          );
        }
      }

      metricsCollector.recordServiceOperation(
        'integration',
        'update',
        Date.now() - startTime
      );
      logger.info('Integration service updated successfully', {
        integrationId,
        tenantId: context.tenantId,
      });

      return integration;
    } catch (error) {
      metricsCollector.recordServiceError('integration', 'update');
      logger.error('Failed to update integration service', {
        error,
        integrationId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 통합 조회
  async getIntegration(
    integrationId: string,
    context: TenantContext
  ): Promise<Integration | null> {
    const startTime = Date.now();

    try {
      const integration = await this.integrationRepository.getIntegration(
        integrationId,
        context
      );

      metricsCollector.recordServiceOperation(
        'integration',
        'read',
        Date.now() - startTime
      );

      return integration;
    } catch (error) {
      metricsCollector.recordServiceError('integration', 'read');
      logger.error('Failed to get integration service', {
        error,
        integrationId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 통합 목록 조회
  async getIntegrations(
    filter: IntegrationFilter,
    sort: IntegrationSort,
    pagination: PaginationParams,
    context: TenantContext
  ): Promise<PaginatedResponse<Integration>> {
    const startTime = Date.now();

    try {
      const result = await this.integrationRepository.getIntegrations(
        filter,
        sort,
        pagination,
        context
      );

      metricsCollector.recordServiceOperation(
        'integration',
        'list',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      metricsCollector.recordServiceError('integration', 'list');
      logger.error('Failed to get integrations service', {
        error,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 동기화 작업 시작
  async startSyncJob(
    integrationId: string,
    syncConfig: SyncConfig,
    context: TenantContext
  ): Promise<SyncJob> {
    const startTime = Date.now();

    try {
      // 통합 상태 확인
      const integration = await this.integrationRepository.getIntegration(
        integrationId,
        context
      );
      if (!integration) {
        throw new Error('Integration not found');
      }

      if (integration.status !== IntegrationStatus.ACTIVE) {
        throw new Error('Integration is not active');
      }

      // 동기화 작업 생성
      const syncJob = await this.integrationRepository.createSyncJob(
        integrationId,
        syncConfig,
        context
      );

      // 비동기 동기화 실행
      this.executeSyncJob(syncJob, context).catch(error => {
        logger.error('Sync job execution failed', {
          error,
          syncJobId: syncJob.id,
          tenantId: context.tenantId,
        });
      });

      metricsCollector.recordServiceOperation(
        'sync_job',
        'start',
        Date.now() - startTime
      );
      logger.info('Sync job started successfully', {
        syncJobId: syncJob.id,
        integrationId,
        tenantId: context.tenantId,
      });

      return syncJob;
    } catch (error) {
      metricsCollector.recordServiceError('sync_job', 'start');
      logger.error('Failed to start sync job', {
        error,
        integrationId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 웹훅 이벤트 처리
  async processWebhookEvent(
    integrationId: string,
    eventType: string,
    payload: any,
    context: TenantContext
  ): Promise<WebhookEvent> {
    const startTime = Date.now();

    try {
      // 웹훅 이벤트 생성
      const webhookEvent = await this.integrationRepository.createWebhookEvent(
        integrationId,
        eventType,
        payload,
        context
      );

      // 비동기 이벤트 처리
      this.processWebhookEventAsync(webhookEvent, context).catch(error => {
        logger.error('Webhook event processing failed', {
          error,
          webhookEventId: webhookEvent.id,
          tenantId: context.tenantId,
        });
      });

      metricsCollector.recordServiceOperation(
        'webhook_event',
        'process',
        Date.now() - startTime
      );
      logger.info('Webhook event processed successfully', {
        webhookEventId: webhookEvent.id,
        integrationId,
        tenantId: context.tenantId,
      });

      return webhookEvent;
    } catch (error) {
      metricsCollector.recordServiceError('webhook_event', 'process');
      logger.error('Failed to process webhook event', {
        error,
        integrationId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 통합 테스트
  async testIntegration(
    integration: Integration
  ): Promise<IntegrationTestResult> {
    const startTime = Date.now();

    try {
      const connectionTest = await this.testConnection(integration);
      const authenticationTest = await this.testAuthentication(integration);
      const dataAccessTest = await this.testDataAccess(integration);

      const success =
        connectionTest.success &&
        authenticationTest.success &&
        dataAccessTest.success;

      const result: IntegrationTestResult = {
        success,
        connectionTest,
        authenticationTest,
        dataAccessTest,
        error: success ? undefined : 'Integration test failed',
      };

      metricsCollector.recordServiceOperation(
        'integration',
        'test',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      metricsCollector.recordServiceError('integration', 'test');
      logger.error('Failed to test integration', {
        error,
        integrationId: integration.id,
      });

      return {
        success: false,
        connectionTest: {
          success: false,
          responseTime: 0,
          error: error.message,
        },
        authenticationTest: { success: false, error: error.message },
        dataAccessTest: { success: false, error: error.message },
        error: error.message,
      };
    }
  }

  // 연결 테스트
  private async testConnection(
    integration: Integration
  ): Promise<ConnectionTestResult> {
    const startTime = Date.now();

    try {
      // 통합 타입에 따른 연결 테스트
      switch (integration.type) {
        case IntegrationType.CUSTODY_BANK:
          return await this.testCustodyBankConnection(integration);
        case IntegrationType.MARKET_DATA:
          return await this.testMarketDataConnection(integration);
        case IntegrationType.ACCOUNTING_SYSTEM:
          return await this.testAccountingSystemConnection(integration);
        default:
          return await this.testGenericConnection(integration);
      }
    } catch (error) {
      return {
        success: false,
        responseTime: Date.now() - startTime,
        error: error.message,
      };
    }
  }

  // 인증 테스트
  private async testAuthentication(
    integration: Integration
  ): Promise<AuthenticationTestResult> {
    try {
      // 통합 타입에 따른 인증 테스트
      switch (integration.type) {
        case IntegrationType.CUSTODY_BANK:
          return await this.testCustodyBankAuthentication(integration);
        case IntegrationType.MARKET_DATA:
          return await this.testMarketDataAuthentication(integration);
        case IntegrationType.ACCOUNTING_SYSTEM:
          return await this.testAccountingSystemAuthentication(integration);
        default:
          return await this.testGenericAuthentication(integration);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // 데이터 접근 테스트
  private async testDataAccess(
    integration: Integration
  ): Promise<DataAccessTestResult> {
    try {
      // 통합 타입에 따른 데이터 접근 테스트
      switch (integration.type) {
        case IntegrationType.CUSTODY_BANK:
          return await this.testCustodyBankDataAccess(integration);
        case IntegrationType.MARKET_DATA:
          return await this.testMarketDataDataAccess(integration);
        case IntegrationType.ACCOUNTING_SYSTEM:
          return await this.testAccountingSystemDataAccess(integration);
        default:
          return await this.testGenericDataAccess(integration);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // 통합 설정 검증
  private validateIntegrationConfig(config: any): void {
    if (!config.baseUrl) {
      throw new Error('Base URL is required');
    }

    if (!config.dataMapping || !config.dataMapping.entities) {
      throw new Error('Data mapping configuration is required');
    }

    if (config.timeout && config.timeout < 1000) {
      throw new Error('Timeout must be at least 1000ms');
    }

    if (config.batchSize && config.batchSize < 1) {
      throw new Error('Batch size must be at least 1');
    }
  }

  // 자격 증명 암호화
  private async encryptCredentials(credentials: any): Promise<any> {
    // 실제 구현에서는 암호화 라이브러리 사용
    return {
      ...credentials,
      encrypted: true,
      data: credentials.data, // 실제로는 암호화
    };
  }

  // 동기화 작업 실행 (비동기)
  private async executeSyncJob(
    syncJob: SyncJob,
    context: TenantContext
  ): Promise<void> {
    try {
      // 동기화 작업 상태를 실행 중으로 업데이트
      await this.integrationRepository.updateSyncJob(
        syncJob.id,
        { status: SyncJobStatus.RUNNING, startedAt: new Date() },
        context
      );

      // 통합 조회
      const integration = await this.integrationRepository.getIntegration(
        syncJob.integrationId,
        context
      );

      if (!integration) {
        throw new Error('Integration not found');
      }

      // 동기화 실행
      await this.performSync(integration, syncJob, context);

      // 동기화 작업 완료
      await this.integrationRepository.updateSyncJob(
        syncJob.id,
        {
          status: SyncJobStatus.COMPLETED,
          completedAt: new Date(),
          progress: 100,
        },
        context
      );

      // 메트릭 업데이트
      await this.updateSyncMetrics(integration.id, context);
    } catch (error) {
      // 동기화 작업 실패
      await this.integrationRepository.updateSyncJob(
        syncJob.id,
        {
          status: SyncJobStatus.FAILED,
          completedAt: new Date(),
          errors: [
            {
              recordId: 'sync_job',
              error: error.message,
              timestamp: new Date(),
              retryCount: 0,
            },
          ],
        },
        context
      );

      throw error;
    }
  }

  // 실제 동기화 수행
  private async performSync(
    integration: Integration,
    syncJob: SyncJob,
    context: TenantContext
  ): Promise<void> {
    // 통합 타입에 따른 동기화 로직
    switch (integration.type) {
      case IntegrationType.CUSTODY_BANK:
        await this.syncCustodyBankData(integration, syncJob, context);
        break;
      case IntegrationType.MARKET_DATA:
        await this.syncMarketData(integration, syncJob, context);
        break;
      case IntegrationType.ACCOUNTING_SYSTEM:
        await this.syncAccountingData(integration, syncJob, context);
        break;
      default:
        await this.syncGenericData(integration, syncJob, context);
    }
  }

  // 웹훅 이벤트 처리 (비동기)
  private async processWebhookEventAsync(
    webhookEvent: WebhookEvent,
    context: TenantContext
  ): Promise<void> {
    try {
      // 웹훅 이벤트 상태를 처리 중으로 업데이트
      await this.integrationRepository.updateWebhookEvent(
        webhookEvent.id,
        { status: WebhookEventStatus.PROCESSING, processedAt: new Date() },
        context
      );

      // 통합 조회
      const integration = await this.integrationRepository.getIntegration(
        webhookEvent.integrationId,
        context
      );

      if (!integration) {
        throw new Error('Integration not found');
      }

      // 웹훅 이벤트 처리
      await this.processWebhookPayload(integration, webhookEvent, context);

      // 웹훅 이벤트 완료
      await this.integrationRepository.updateWebhookEvent(
        webhookEvent.id,
        { status: WebhookEventStatus.COMPLETED },
        context
      );
    } catch (error) {
      // 웹훅 이벤트 처리 실패
      await this.integrationRepository.updateWebhookEvent(
        webhookEvent.id,
        {
          status: WebhookEventStatus.FAILED,
          error: error.message,
          retryCount: webhookEvent.retryCount + 1,
        },
        context
      );

      throw error;
    }
  }

  // 메트릭 업데이트
  private async updateSyncMetrics(
    integrationId: string,
    context: TenantContext
  ): Promise<void> {
    // 실제 구현에서는 메트릭 계산 및 업데이트
    const metrics: Partial<IntegrationMetrics> = {
      syncJobsCount: 1,
      successfulSyncJobsCount: 1,
      lastSyncAt: new Date(),
    };

    await this.integrationRepository.updateIntegrationMetrics(
      integrationId,
      metrics,
      context
    );
  }

  // 통합별 연결 테스트 구현
  private async testCustodyBankConnection(
    integration: Integration
  ): Promise<ConnectionTestResult> {
    // 실제 구현에서는 custody bank API 연결 테스트
    return { success: true, responseTime: 100 };
  }

  private async testMarketDataConnection(
    integration: Integration
  ): Promise<ConnectionTestResult> {
    // 실제 구현에서는 market data API 연결 테스트
    return { success: true, responseTime: 50 };
  }

  private async testAccountingSystemConnection(
    integration: Integration
  ): Promise<ConnectionTestResult> {
    // 실제 구현에서는 accounting system 연결 테스트
    return { success: true, responseTime: 200 };
  }

  private async testGenericConnection(
    integration: Integration
  ): Promise<ConnectionTestResult> {
    // 일반적인 HTTP 연결 테스트
    return { success: true, responseTime: 150 };
  }

  // 통합별 인증 테스트 구현
  private async testCustodyBankAuthentication(
    integration: Integration
  ): Promise<AuthenticationTestResult> {
    // 실제 구현에서는 custody bank 인증 테스트
    return { success: true };
  }

  private async testMarketDataAuthentication(
    integration: Integration
  ): Promise<AuthenticationTestResult> {
    // 실제 구현에서는 market data 인증 테스트
    return { success: true };
  }

  private async testAccountingSystemAuthentication(
    integration: Integration
  ): Promise<AuthenticationTestResult> {
    // 실제 구현에서는 accounting system 인증 테스트
    return { success: true };
  }

  private async testGenericAuthentication(
    integration: Integration
  ): Promise<AuthenticationTestResult> {
    // 일반적인 인증 테스트
    return { success: true };
  }

  // 통합별 데이터 접근 테스트 구현
  private async testCustodyBankDataAccess(
    integration: Integration
  ): Promise<DataAccessTestResult> {
    // 실제 구현에서는 custody bank 데이터 접근 테스트
    return { success: true, sampleData: [] };
  }

  private async testMarketDataDataAccess(
    integration: Integration
  ): Promise<DataAccessTestResult> {
    // 실제 구현에서는 market data 데이터 접근 테스트
    return { success: true, sampleData: [] };
  }

  private async testAccountingSystemDataAccess(
    integration: Integration
  ): Promise<DataAccessTestResult> {
    // 실제 구현에서는 accounting system 데이터 접근 테스트
    return { success: true, sampleData: [] };
  }

  private async testGenericDataAccess(
    integration: Integration
  ): Promise<DataAccessTestResult> {
    // 일반적인 데이터 접근 테스트
    return { success: true, sampleData: [] };
  }

  // 통합별 동기화 구현
  private async syncCustodyBankData(
    integration: Integration,
    syncJob: SyncJob,
    context: TenantContext
  ): Promise<void> {
    // 실제 구현에서는 custody bank 데이터 동기화
    logger.info('Syncing custody bank data', { integrationId: integration.id });
  }

  private async syncMarketData(
    integration: Integration,
    syncJob: SyncJob,
    context: TenantContext
  ): Promise<void> {
    // 실제 구현에서는 market data 동기화
    logger.info('Syncing market data', { integrationId: integration.id });
  }

  private async syncAccountingData(
    integration: Integration,
    syncJob: SyncJob,
    context: TenantContext
  ): Promise<void> {
    // 실제 구현에서는 accounting data 동기화
    logger.info('Syncing accounting data', { integrationId: integration.id });
  }

  private async syncGenericData(
    integration: Integration,
    syncJob: SyncJob,
    context: TenantContext
  ): Promise<void> {
    // 일반적인 데이터 동기화
    logger.info('Syncing generic data', { integrationId: integration.id });
  }

  // 웹훅 페이로드 처리
  private async processWebhookPayload(
    integration: Integration,
    webhookEvent: WebhookEvent,
    context: TenantContext
  ): Promise<void> {
    // 실제 구현에서는 웹훅 페이로드 처리
    logger.info('Processing webhook payload', {
      integrationId: integration.id,
      eventType: webhookEvent.eventType,
    });
  }
}
