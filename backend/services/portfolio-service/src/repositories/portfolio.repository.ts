import { pgPool, withTransaction, TenantContext } from '../../../shared/database/connection';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import {
  Portfolio,
  PortfolioAsset,
  AssetType,
  PortfolioPerformance,
  PortfolioEvent,
  PortfolioEventType,
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  CreatePortfolioAsset,
  UpdatePortfolioAssetRequest,
  PaginationParams,
  PaginatedResponse,
} from '../types/portfolio';

export class PortfolioRepository {
  // 포트폴리오 생성
  async createPortfolio(
    request: CreatePortfolioRequest,
    context: TenantContext
  ): Promise<Portfolio> {
    const startTime = Date.now();
    
    try {
      const result = await withTransaction(async (client) => {
        const portfolioQuery = `
          INSERT INTO portfolios (
            id, tenant_id, name, description, currency, total_value, total_cost,
            total_gain_loss, total_gain_loss_percent, created_by, updated_by, is_active
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, 0, 0, 0, 0, $5, $5, true
          ) RETURNING *
        `;
        
        const portfolioResult = await client.query(portfolioQuery, [
          context.tenantId,
          request.name,
          request.description,
          request.currency,
          context.userId,
        ]);
        
        const portfolio = portfolioResult.rows[0];
        
        // 초기 자산 추가
        if (request.initialAssets && request.initialAssets.length > 0) {
          for (const asset of request.initialAssets) {
            await this.addAssetToPortfolio(portfolio.id, asset, context, client);
          }
        }
        
        return portfolio;
      });
      
      const duration = Date.now() - startTime;
      metricsCollector.recordDbQuery('create', 'portfolios', duration);
      
      logger.info('포트폴리오 생성됨', {
        portfolioId: result.id,
        tenantId: context.tenantId,
        userId: context.userId,
      });
      
      return this.mapPortfolioFromDb(result);
    } catch (error) {
      logger.error('포트폴리오 생성 실패', {
        error: error instanceof Error ? error.message : 'Unknown error',
        tenantId: context.tenantId,
        userId: context.userId,
      });
      throw error;
    }
  }

  // 포트폴리오 조회
  async getPortfolio(id: string, context: TenantContext): Promise<Portfolio | null> {
    const startTime = Date.now();
    
    try {
      const query = `
        SELECT * FROM portfolios 
        WHERE id = $1 AND tenant_id = $2 AND is_active = true
      `;
      
      const result = await pgPool.query(query, [id, context.tenantId]);
      
      const duration = Date.now() - startTime;
      metricsCollector.recordDbQuery('select', 'portfolios', duration);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapPortfolioFromDb(result.rows[0]);
    } catch (error) {
      logger.error('포트폴리오 조회 실패', {
        portfolioId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // 포트폴리오 목록 조회
  async getPortfolios(
    context: TenantContext,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Portfolio>> {
    const startTime = Date.now();
    
    try {
      const offset = (pagination.page - 1) * pagination.limit;
      
      const countQuery = `
        SELECT COUNT(*) FROM portfolios 
        WHERE tenant_id = $1 AND is_active = true
      `;
      
      const dataQuery = `
        SELECT * FROM portfolios 
        WHERE tenant_id = $1 AND is_active = true
        ORDER BY ${pagination.sortBy || 'created_at'} ${pagination.sortOrder || 'DESC'}
        LIMIT $2 OFFSET $3
      `;
      
      const [countResult, dataResult] = await Promise.all([
        pgPool.query(countQuery, [context.tenantId]),
        pgPool.query(dataQuery, [context.tenantId, pagination.limit, offset]),
      ]);
      
      const total = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(total / pagination.limit);
      
      const duration = Date.now() - startTime;
      metricsCollector.recordDbQuery('select', 'portfolios', duration);
      
      return {
        data: dataResult.rows.map(row => this.mapPortfolioFromDb(row)),
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total,
          totalPages,
          hasNext: pagination.page < totalPages,
          hasPrev: pagination.page > 1,
        },
      };
    } catch (error) {
      logger.error('포트폴리오 목록 조회 실패', {
        error: error instanceof Error ? error.message : 'Unknown error',
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 포트폴리오 업데이트
  async updatePortfolio(
    id: string,
    request: UpdatePortfolioRequest,
    context: TenantContext
  ): Promise<Portfolio | null> {
    const startTime = Date.now();
    
    try {
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;
      
      if (request.name !== undefined) {
        updateFields.push(`name = $${paramIndex++}`);
        values.push(request.name);
      }
      
      if (request.description !== undefined) {
        updateFields.push(`description = $${paramIndex++}`);
        values.push(request.description);
      }
      
      if (request.isActive !== undefined) {
        updateFields.push(`is_active = $${paramIndex++}`);
        values.push(request.isActive);
      }
      
      updateFields.push(`updated_at = NOW(), updated_by = $${paramIndex++}`);
      values.push(context.userId);
      
      const query = `
        UPDATE portfolios 
        SET ${updateFields.join(', ')}
        WHERE id = $${paramIndex++} AND tenant_id = $${paramIndex++}
        RETURNING *
      `;
      
      values.push(id, context.tenantId);
      
      const result = await pgPool.query(query, values);
      
      const duration = Date.now() - startTime;
      metricsCollector.recordDbQuery('update', 'portfolios', duration);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      logger.info('포트폴리오 업데이트됨', {
        portfolioId: id,
        tenantId: context.tenantId,
        userId: context.userId,
      });
      
      return this.mapPortfolioFromDb(result.rows[0]);
    } catch (error) {
      logger.error('포트폴리오 업데이트 실패', {
        portfolioId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // 포트폴리오 자산 추가
  async addAssetToPortfolio(
    portfolioId: string,
    asset: CreatePortfolioAsset,
    context: TenantContext,
    client?: any
  ): Promise<PortfolioAsset> {
    const dbClient = client || pgPool;
    const startTime = Date.now();
    
    try {
      const query = `
        INSERT INTO portfolio_assets (
          id, portfolio_id, asset_id, symbol, name, asset_type, quantity,
          average_price, current_price, market_value, cost_basis,
          unrealized_gain_loss, unrealized_gain_loss_percent, weight, last_updated
        ) VALUES (
          gen_random_uuid(), $1, gen_random_uuid(), $2, $3, $4, $5, $6, $6, $7, $7, 0, 0, 0, NOW()
        ) RETURNING *
      `;
      
      const marketValue = asset.quantity * asset.averagePrice;
      const costBasis = asset.quantity * asset.averagePrice;
      
      const result = await dbClient.query(query, [
        portfolioId,
        asset.symbol,
        asset.name,
        asset.assetType,
        asset.quantity,
        asset.averagePrice,
        marketValue,
        costBasis,
      ]);
      
      const duration = Date.now() - startTime;
      metricsCollector.recordDbQuery('insert', 'portfolio_assets', duration);
      
      // 포트폴리오 총액 업데이트
      await this.updatePortfolioTotals(portfolioId, context, dbClient);
      
      logger.info('포트폴리오 자산 추가됨', {
        portfolioId,
        symbol: asset.symbol,
        tenantId: context.tenantId,
        userId: context.userId,
      });
      
      return this.mapPortfolioAssetFromDb(result.rows[0]);
    } catch (error) {
      logger.error('포트폴리오 자산 추가 실패', {
        portfolioId,
        symbol: asset.symbol,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // 포트폴리오 자산 조회
  async getPortfolioAssets(
    portfolioId: string,
    context: TenantContext
  ): Promise<PortfolioAsset[]> {
    const startTime = Date.now();
    
    try {
      const query = `
        SELECT pa.* FROM portfolio_assets pa
        JOIN portfolios p ON pa.portfolio_id = p.id
        WHERE pa.portfolio_id = $1 AND p.tenant_id = $2 AND p.is_active = true
        ORDER BY pa.market_value DESC
      `;
      
      const result = await pgPool.query(query, [portfolioId, context.tenantId]);
      
      const duration = Date.now() - startTime;
      metricsCollector.recordDbQuery('select', 'portfolio_assets', duration);
      
      return result.rows.map(row => this.mapPortfolioAssetFromDb(row));
    } catch (error) {
      logger.error('포트폴리오 자산 조회 실패', {
        portfolioId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // 포트폴리오 총액 업데이트
  async updatePortfolioTotals(
    portfolioId: string,
    context: TenantContext,
    client?: any
  ): Promise<void> {
    const dbClient = client || pgPool;
    
    try {
      const query = `
        UPDATE portfolios 
        SET 
          total_value = COALESCE((
            SELECT SUM(market_value) 
            FROM portfolio_assets 
            WHERE portfolio_id = $1
          ), 0),
          total_cost = COALESCE((
            SELECT SUM(cost_basis) 
            FROM portfolio_assets 
            WHERE portfolio_id = $1
          ), 0),
          updated_at = NOW(),
          updated_by = $2
        WHERE id = $1
      `;
      
      await dbClient.query(query, [portfolioId, context.userId]);
      
      // 손익 계산
      const totalsQuery = `
        SELECT total_value, total_cost 
        FROM portfolios 
        WHERE id = $1
      `;
      
      const totalsResult = await dbClient.query(totalsQuery, [portfolioId]);
      const { total_value, total_cost } = totalsResult.rows[0];
      
      const totalGainLoss = total_value - total_cost;
      const totalGainLossPercent = total_cost > 0 ? (totalGainLoss / total_cost) * 100 : 0;
      
      const updateGainLossQuery = `
        UPDATE portfolios 
        SET 
          total_gain_loss = $2,
          total_gain_loss_percent = $3
        WHERE id = $1
      `;
      
      await dbClient.query(updateGainLossQuery, [
        portfolioId,
        totalGainLoss,
        totalGainLossPercent,
      ]);
    } catch (error) {
      logger.error('포트폴리오 총액 업데이트 실패', {
        portfolioId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // 데이터베이스 결과를 도메인 객체로 매핑
  private mapPortfolioFromDb(row: any): Portfolio {
    return {
      id: row.id,
      tenantId: row.tenant_id,
      name: row.name,
      description: row.description,
      currency: row.currency,
      totalValue: parseFloat(row.total_value),
      totalCost: parseFloat(row.total_cost),
      totalGainLoss: parseFloat(row.total_gain_loss),
      totalGainLossPercent: parseFloat(row.total_gain_loss_percent),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      createdBy: row.created_by,
      updatedBy: row.updated_by,
      isActive: row.is_active,
    };
  }

  private mapPortfolioAssetFromDb(row: any): PortfolioAsset {
    return {
      id: row.id,
      portfolioId: row.portfolio_id,
      assetId: row.asset_id,
      symbol: row.symbol,
      name: row.name,
      assetType: row.asset_type as AssetType,
      quantity: parseFloat(row.quantity),
      averagePrice: parseFloat(row.average_price),
      currentPrice: parseFloat(row.current_price),
      marketValue: parseFloat(row.market_value),
      costBasis: parseFloat(row.cost_basis),
      unrealizedGainLoss: parseFloat(row.unrealized_gain_loss),
      unrealizedGainLossPercent: parseFloat(row.unrealized_gain_loss_percent),
      weight: parseFloat(row.weight),
      lastUpdated: new Date(row.last_updated),
    };
  }
} 