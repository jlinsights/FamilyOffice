import { pgPool, withTransaction, TenantContext } from '../../../shared/database/connection';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
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
} from '../types/integration';

export class IntegrationRepository {
  // 통합 생성
  async createIntegration(
    request: CreateIntegrationRequest,
    context: TenantContext
  ): Promise<Integration> {
    const startTime = Date.now();
    
    try {
      const result = await withTransaction(async (client) => {
        const integrationQuery = `
          INSERT INTO integrations (
            tenant_id, name, type, provider, status, config, credentials,
            sync_interval, max_retries, created_by, updated_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING *
        `;
        
        const integrationValues = [
          context.tenantId,
          request.name,
          request.type,
          request.provider,
          IntegrationStatus.PENDING,
          JSON.stringify(request.config),
          JSON.stringify(request.credentials),
          request.syncInterval,
          request.maxRetries,
          context.userId,
          context.userId,
        ];
        
        const integrationResult = await client.query(integrationQuery, integrationValues);
        const integration = integrationResult.rows[0];
        
        // 감사 로그 생성
        const auditQuery = `
          INSERT INTO integration_audit_logs (
            integration_id, tenant_id, event, user_id, details
          ) VALUES ($1, $2, $3, $4, $5)
        `;
        
        await client.query(auditQuery, [
          integration.id,
          context.tenantId,
          'integration_created',
          context.userId,
          JSON.stringify({ request }),
        ]);
        
        return integration;
      });
      
      metricsCollector.recordDatabaseOperation('integration', 'create', Date.now() - startTime);
      logger.info('Integration created successfully', { integrationId: result.id, tenantId: context.tenantId });
      
      return this.mapIntegrationFromDb(result);
    } catch (error) {
      metricsCollector.recordDatabaseError('integration', 'create');
      logger.error('Failed to create integration', { error, tenantId: context.tenantId });
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
      const result = await withTransaction(async (client) => {
        const updateFields: string[] = [];
        const updateValues: any[] = [];
        let paramIndex = 1;
        
        if (request.name !== undefined) {
          updateFields.push(`name = $${paramIndex++}`);
          updateValues.push(request.name);
        }
        
        if (request.status !== undefined) {
          updateFields.push(`status = $${paramIndex++}`);
          updateValues.push(request.status);
        }
        
        if (request.config !== undefined) {
          updateFields.push(`config = $${paramIndex++}`);
          updateValues.push(JSON.stringify(request.config));
        }
        
        if (request.credentials !== undefined) {
          updateFields.push(`credentials = $${paramIndex++}`);
          updateValues.push(JSON.stringify(request.credentials));
        }
        
        if (request.syncInterval !== undefined) {
          updateFields.push(`sync_interval = $${paramIndex++}`);
          updateValues.push(request.syncInterval);
        }
        
        if (request.maxRetries !== undefined) {
          updateFields.push(`max_retries = $${paramIndex++}`);
          updateValues.push(request.maxRetries);
        }
        
        updateFields.push(`updated_by = $${paramIndex++}`);
        updateValues.push(context.userId);
        
        updateFields.push(`updated_at = NOW()`);
        
        const updateQuery = `
          UPDATE integrations 
          SET ${updateFields.join(', ')}
          WHERE id = $${paramIndex} AND tenant_id = $${paramIndex + 1}
          RETURNING *
        `;
        
        updateValues.push(integrationId, context.tenantId);
        
        const updateResult = await client.query(updateQuery, updateValues);
        
        if (updateResult.rows.length === 0) {
          throw new Error('Integration not found');
        }
        
        // 감사 로그 생성
        const auditQuery = `
          INSERT INTO integration_audit_logs (
            integration_id, tenant_id, event, user_id, details
          ) VALUES ($1, $2, $3, $4, $5)
        `;
        
        await client.query(auditQuery, [
          integrationId,
          context.tenantId,
          'integration_updated',
          context.userId,
          JSON.stringify({ request }),
        ]);
        
        return updateResult.rows[0];
      });
      
      metricsCollector.recordDatabaseOperation('integration', 'update', Date.now() - startTime);
      logger.info('Integration updated successfully', { integrationId, tenantId: context.tenantId });
      
      return this.mapIntegrationFromDb(result);
    } catch (error) {
      metricsCollector.recordDatabaseError('integration', 'update');
      logger.error('Failed to update integration', { error, integrationId, tenantId: context.tenantId });
      throw error;
    }
  }

  // 통합 조회
  async getIntegration(integrationId: string, context: TenantContext): Promise<Integration | null> {
    const startTime = Date.now();
    
    try {
      const query = `
        SELECT * FROM integrations 
        WHERE id = $1 AND tenant_id = $2
      `;
      
      const result = await pgPool.query(query, [integrationId, context.tenantId]);
      
      metricsCollector.recordDatabaseOperation('integration', 'read', Date.now() - startTime);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapIntegrationFromDb(result.rows[0]);
    } catch (error) {
      metricsCollector.recordDatabaseError('integration', 'read');
      logger.error('Failed to get integration', { error, integrationId, tenantId: context.tenantId });
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
      let whereConditions = ['tenant_id = $1'];
      let queryParams: any[] = [context.tenantId];
      let paramIndex = 2;
      
      if (filter.type) {
        whereConditions.push(`type = $${paramIndex++}`);
        queryParams.push(filter.type);
      }
      
      if (filter.status) {
        whereConditions.push(`status = $${paramIndex++}`);
        queryParams.push(filter.status);
      }
      
      if (filter.provider) {
        whereConditions.push(`provider = $${paramIndex++}`);
        queryParams.push(filter.provider);
      }
      
      if (filter.search) {
        whereConditions.push(`(name ILIKE $${paramIndex} OR provider ILIKE $${paramIndex})`);
        queryParams.push(`%${filter.search}%`);
        paramIndex++;
      }
      
      const whereClause = whereConditions.join(' AND ');
      const offset = (pagination.page - 1) * pagination.limit;
      
      // 전체 개수 조회
      const countQuery = `
        SELECT COUNT(*) as total FROM integrations WHERE ${whereClause}
      `;
      
      const countResult = await pgPool.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);
      
      // 데이터 조회
      const dataQuery = `
        SELECT * FROM integrations 
        WHERE ${whereClause}
        ORDER BY ${sort.field} ${sort.direction}
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `;
      
      queryParams.push(pagination.limit, offset);
      
      const dataResult = await pgPool.query(dataQuery, queryParams);
      
      metricsCollector.recordDatabaseOperation('integration', 'list', Date.now() - startTime);
      
      const integrations = dataResult.rows.map(row => this.mapIntegrationFromDb(row));
      
      return {
        data: integrations,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total,
          totalPages: Math.ceil(total / pagination.limit),
          hasNext: pagination.page * pagination.limit < total,
          hasPrev: pagination.page > 1,
        },
      };
    } catch (error) {
      metricsCollector.recordDatabaseError('integration', 'list');
      logger.error('Failed to get integrations', { error, tenantId: context.tenantId });
      throw error;
    }
  }

  // 동기화 작업 생성
  async createSyncJob(
    integrationId: string,
    syncConfig: SyncConfig,
    context: TenantContext
  ): Promise<SyncJob> {
    const startTime = Date.now();
    
    try {
      const query = `
        INSERT INTO sync_jobs (
          integration_id, tenant_id, status, type, config, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      
      const values = [
        integrationId,
        context.tenantId,
        SyncJobStatus.PENDING,
        SyncJobType.FULL_SYNC,
        JSON.stringify(syncConfig),
        context.userId,
      ];
      
      const result = await pgPool.query(query, values);
      
      metricsCollector.recordDatabaseOperation('sync_job', 'create', Date.now() - startTime);
      logger.info('Sync job created successfully', { 
        syncJobId: result.rows[0].id, 
        integrationId, 
        tenantId: context.tenantId 
      });
      
      return this.mapSyncJobFromDb(result.rows[0]);
    } catch (error) {
      metricsCollector.recordDatabaseError('sync_job', 'create');
      logger.error('Failed to create sync job', { error, integrationId, tenantId: context.tenantId });
      throw error;
    }
  }

  // 동기화 작업 업데이트
  async updateSyncJob(
    syncJobId: string,
    updates: Partial<SyncJob>,
    context: TenantContext
  ): Promise<SyncJob> {
    const startTime = Date.now();
    
    try {
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;
      
      if (updates.status !== undefined) {
        updateFields.push(`status = $${paramIndex++}`);
        updateValues.push(updates.status);
      }
      
      if (updates.progress !== undefined) {
        updateFields.push(`progress = $${paramIndex++}`);
        updateValues.push(updates.progress);
      }
      
      if (updates.totalRecords !== undefined) {
        updateFields.push(`total_records = $${paramIndex++}`);
        updateValues.push(updates.totalRecords);
      }
      
      if (updates.processedRecords !== undefined) {
        updateFields.push(`processed_records = $${paramIndex++}`);
        updateValues.push(updates.processedRecords);
      }
      
      if (updates.errorRecords !== undefined) {
        updateFields.push(`error_records = $${paramIndex++}`);
        updateValues.push(updates.errorRecords);
      }
      
      if (updates.completedAt !== undefined) {
        updateFields.push(`completed_at = $${paramIndex++}`);
        updateValues.push(updates.completedAt);
      }
      
      updateFields.push(`updated_at = NOW()`);
      
      const updateQuery = `
        UPDATE sync_jobs 
        SET ${updateFields.join(', ')}
        WHERE id = $${paramIndex} AND tenant_id = $${paramIndex + 1}
        RETURNING *
      `;
      
      updateValues.push(syncJobId, context.tenantId);
      
      const result = await pgPool.query(updateQuery, updateValues);
      
      if (result.rows.length === 0) {
        throw new Error('Sync job not found');
      }
      
      metricsCollector.recordDatabaseOperation('sync_job', 'update', Date.now() - startTime);
      
      return this.mapSyncJobFromDb(result.rows[0]);
    } catch (error) {
      metricsCollector.recordDatabaseError('sync_job', 'update');
      logger.error('Failed to update sync job', { error, syncJobId, tenantId: context.tenantId });
      throw error;
    }
  }

  // 웹훅 이벤트 생성
  async createWebhookEvent(
    integrationId: string,
    eventType: string,
    payload: any,
    context: TenantContext
  ): Promise<WebhookEvent> {
    const startTime = Date.now();
    
    try {
      const query = `
        INSERT INTO webhook_events (
          integration_id, tenant_id, event_type, payload, status
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      
      const values = [
        integrationId,
        context.tenantId,
        eventType,
        JSON.stringify(payload),
        WebhookEventStatus.PENDING,
      ];
      
      const result = await pgPool.query(query, values);
      
      metricsCollector.recordDatabaseOperation('webhook_event', 'create', Date.now() - startTime);
      logger.info('Webhook event created successfully', { 
        webhookEventId: result.rows[0].id, 
        integrationId, 
        tenantId: context.tenantId 
      });
      
      return this.mapWebhookEventFromDb(result.rows[0]);
    } catch (error) {
      metricsCollector.recordDatabaseError('webhook_event', 'create');
      logger.error('Failed to create webhook event', { error, integrationId, tenantId: context.tenantId });
      throw error;
    }
  }

  // 통합 테스트 결과 저장
  async saveIntegrationTestResult(
    integrationId: string,
    testResult: IntegrationTestResult,
    context: TenantContext
  ): Promise<void> {
    const startTime = Date.now();
    
    try {
      const query = `
        INSERT INTO integration_test_results (
          integration_id, tenant_id, test_result, created_at
        ) VALUES ($1, $2, $3, NOW())
      `;
      
      await pgPool.query(query, [
        integrationId,
        context.tenantId,
        JSON.stringify(testResult),
      ]);
      
      metricsCollector.recordDatabaseOperation('integration_test_result', 'create', Date.now() - startTime);
      logger.info('Integration test result saved', { integrationId, tenantId: context.tenantId });
    } catch (error) {
      metricsCollector.recordDatabaseError('integration_test_result', 'create');
      logger.error('Failed to save integration test result', { error, integrationId, tenantId: context.tenantId });
      throw error;
    }
  }

  // 통합 메트릭 업데이트
  async updateIntegrationMetrics(
    integrationId: string,
    metrics: Partial<IntegrationMetrics>,
    context: TenantContext
  ): Promise<void> {
    const startTime = Date.now();
    
    try {
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;
      
      if (metrics.syncJobsCount !== undefined) {
        updateFields.push(`sync_jobs_count = $${paramIndex++}`);
        updateValues.push(metrics.syncJobsCount);
      }
      
      if (metrics.successfulSyncJobsCount !== undefined) {
        updateFields.push(`successful_sync_jobs_count = $${paramIndex++}`);
        updateValues.push(metrics.successfulSyncJobsCount);
      }
      
      if (metrics.failedSyncJobsCount !== undefined) {
        updateFields.push(`failed_sync_jobs_count = $${paramIndex++}`);
        updateValues.push(metrics.failedSyncJobsCount);
      }
      
      if (metrics.averageSyncDuration !== undefined) {
        updateFields.push(`average_sync_duration = $${paramIndex++}`);
        updateValues.push(metrics.averageSyncDuration);
      }
      
      if (metrics.lastSyncAt !== undefined) {
        updateFields.push(`last_sync_at = $${paramIndex++}`);
        updateValues.push(metrics.lastSyncAt);
      }
      
      if (metrics.nextSyncAt !== undefined) {
        updateFields.push(`next_sync_at = $${paramIndex++}`);
        updateValues.push(metrics.nextSyncAt);
      }
      
      if (metrics.webhookEventsCount !== undefined) {
        updateFields.push(`webhook_events_count = $${paramIndex++}`);
        updateValues.push(metrics.webhookEventsCount);
      }
      
      if (metrics.successfulWebhookEventsCount !== undefined) {
        updateFields.push(`successful_webhook_events_count = $${paramIndex++}`);
        updateValues.push(metrics.successfulWebhookEventsCount);
      }
      
      if (metrics.failedWebhookEventsCount !== undefined) {
        updateFields.push(`failed_webhook_events_count = $${paramIndex++}`);
        updateValues.push(metrics.failedWebhookEventsCount);
      }
      
      if (metrics.dataRecordsCount !== undefined) {
        updateFields.push(`data_records_count = $${paramIndex++}`);
        updateValues.push(metrics.dataRecordsCount);
      }
      
      if (metrics.errorRecordsCount !== undefined) {
        updateFields.push(`error_records_count = $${paramIndex++}`);
        updateValues.push(metrics.errorRecordsCount);
      }
      
      updateFields.push(`updated_at = NOW()`);
      
      const updateQuery = `
        UPDATE integration_metrics 
        SET ${updateFields.join(', ')}
        WHERE integration_id = $${paramIndex} AND tenant_id = $${paramIndex + 1}
      `;
      
      updateValues.push(integrationId, context.tenantId);
      
      await pgPool.query(updateQuery, updateValues);
      
      metricsCollector.recordDatabaseOperation('integration_metrics', 'update', Date.now() - startTime);
    } catch (error) {
      metricsCollector.recordDatabaseError('integration_metrics', 'update');
      logger.error('Failed to update integration metrics', { error, integrationId, tenantId: context.tenantId });
      throw error;
    }
  }

  // 데이터베이스 결과를 도메인 객체로 매핑
  private mapIntegrationFromDb(row: any): Integration {
    return {
      id: row.id,
      tenantId: row.tenant_id,
      name: row.name,
      type: row.type,
      provider: row.provider,
      status: row.status,
      config: JSON.parse(row.config),
      credentials: JSON.parse(row.credentials),
      lastSyncAt: row.last_sync_at,
      nextSyncAt: row.next_sync_at,
      syncInterval: row.sync_interval,
      retryCount: row.retry_count,
      maxRetries: row.max_retries,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      createdBy: row.created_by,
      updatedBy: row.updated_by,
      auditTrail: [], // 별도 쿼리로 조회 필요
    };
  }

  private mapSyncJobFromDb(row: any): SyncJob {
    return {
      id: row.id,
      integrationId: row.integration_id,
      tenantId: row.tenant_id,
      status: row.status,
      type: row.type,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      progress: row.progress,
      totalRecords: row.total_records,
      processedRecords: row.processed_records,
      errorRecords: row.error_records,
      errors: row.errors ? JSON.parse(row.errors) : [],
      config: JSON.parse(row.config),
    };
  }

  private mapWebhookEventFromDb(row: any): WebhookEvent {
    return {
      id: row.id,
      integrationId: row.integration_id,
      tenantId: row.tenant_id,
      eventType: row.event_type,
      payload: JSON.parse(row.payload),
      receivedAt: row.received_at,
      processedAt: row.processed_at,
      status: row.status,
      retryCount: row.retry_count,
      error: row.error,
    };
  }
} 