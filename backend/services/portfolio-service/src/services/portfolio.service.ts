import { PortfolioRepository } from '../repositories/portfolio.repository';
import { QueueManager } from '../../../shared/messaging/queue';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import {
  Portfolio,
  PortfolioAsset,
  AssetAllocation,
  PortfolioPerformance,
  PortfolioStats,
  RebalancingTarget,
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  CreatePortfolioAsset,
  PerformanceFilter,
  TenantContext,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '../types/portfolio';

export class PortfolioService {
  private repository: PortfolioRepository;
  private queueManager: QueueManager;

  constructor() {
    this.repository = new PortfolioRepository();
    this.queueManager = new QueueManager();
  }

  // 포트폴리오 생성
  async createPortfolio(
    request: CreatePortfolioRequest,
    context: TenantContext
  ): Promise<ApiResponse<Portfolio>> {
    try {
      // 입력 검증
      this.validateCreatePortfolioRequest(request);

      const portfolio = await this.repository.createPortfolio(request, context);

      // 포트폴리오 생성 이벤트 발행
      await this.publishPortfolioEvent(
        portfolio.id,
        'portfolio_created',
        {
          portfolioId: portfolio.id,
          name: portfolio.name,
          currency: portfolio.currency,
        },
        context
      );

      // 성과 계산 작업 예약
      await this.schedulePerformanceCalculation(portfolio.id, context);

      logger.info('포트폴리오 서비스: 포트폴리오 생성 완료', {
        portfolioId: portfolio.id,
        tenantId: context.tenantId,
        userId: context.userId,
      });

      return {
        success: true,
        data: portfolio,
        message: '포트폴리오가 성공적으로 생성되었습니다.',
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 포트폴리오 생성 실패', {
        error: error instanceof Error ? error.message : 'Unknown error',
        tenantId: context.tenantId,
        userId: context.userId,
      });

      metricsCollector.recordError('portfolio-service', 'create_portfolio_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '포트폴리오 생성 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 포트폴리오 조회
  async getPortfolio(
    id: string,
    context: TenantContext
  ): Promise<ApiResponse<Portfolio | null>> {
    try {
      const portfolio = await this.repository.getPortfolio(id, context);

      if (!portfolio) {
        return {
          success: false,
          error: '포트폴리오를 찾을 수 없습니다.',
          timestamp: new Date(),
        };
      }

      return {
        success: true,
        data: portfolio,
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 포트폴리오 조회 실패', {
        portfolioId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      metricsCollector.recordError('portfolio-service', 'get_portfolio_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '포트폴리오 조회 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 포트폴리오 목록 조회
  async getPortfolios(
    context: TenantContext,
    pagination: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<Portfolio>>> {
    try {
      const result = await this.repository.getPortfolios(context, pagination);

      return {
        success: true,
        data: result,
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 포트폴리오 목록 조회 실패', {
        error: error instanceof Error ? error.message : 'Unknown error',
        tenantId: context.tenantId,
      });

      metricsCollector.recordError('portfolio-service', 'get_portfolios_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '포트폴리오 목록 조회 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 포트폴리오 업데이트
  async updatePortfolio(
    id: string,
    request: UpdatePortfolioRequest,
    context: TenantContext
  ): Promise<ApiResponse<Portfolio | null>> {
    try {
      const portfolio = await this.repository.updatePortfolio(id, request, context);

      if (!portfolio) {
        return {
          success: false,
          error: '포트폴리오를 찾을 수 없습니다.',
          timestamp: new Date(),
        };
      }

      // 포트폴리오 업데이트 이벤트 발행
      await this.publishPortfolioEvent(
        portfolio.id,
        'portfolio_updated',
        {
          portfolioId: portfolio.id,
          updatedFields: Object.keys(request),
        },
        context
      );

      return {
        success: true,
        data: portfolio,
        message: '포트폴리오가 성공적으로 업데이트되었습니다.',
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 포트폴리오 업데이트 실패', {
        portfolioId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      metricsCollector.recordError('portfolio-service', 'update_portfolio_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '포트폴리오 업데이트 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 포트폴리오 자산 추가
  async addAssetToPortfolio(
    portfolioId: string,
    asset: CreatePortfolioAsset,
    context: TenantContext
  ): Promise<ApiResponse<PortfolioAsset>> {
    try {
      // 포트폴리오 존재 확인
      const portfolio = await this.repository.getPortfolio(portfolioId, context);
      if (!portfolio) {
        return {
          success: false,
          error: '포트폴리오를 찾을 수 없습니다.',
          timestamp: new Date(),
        };
      }

      const portfolioAsset = await this.repository.addAssetToPortfolio(
        portfolioId,
        asset,
        context
      );

      // 자산 추가 이벤트 발행
      await this.publishPortfolioEvent(
        portfolioId,
        'asset_added',
        {
          portfolioId,
          assetId: portfolioAsset.id,
          symbol: portfolioAsset.symbol,
          quantity: portfolioAsset.quantity,
        },
        context
      );

      // 리밸런싱 검사
      await this.checkRebalancingNeeded(portfolioId, context);

      return {
        success: true,
        data: portfolioAsset,
        message: '자산이 성공적으로 추가되었습니다.',
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 자산 추가 실패', {
        portfolioId,
        symbol: asset.symbol,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      metricsCollector.recordError('portfolio-service', 'add_asset_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '자산 추가 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 포트폴리오 자산 조회
  async getPortfolioAssets(
    portfolioId: string,
    context: TenantContext
  ): Promise<ApiResponse<PortfolioAsset[]>> {
    try {
      const assets = await this.repository.getPortfolioAssets(portfolioId, context);

      return {
        success: true,
        data: assets,
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 자산 조회 실패', {
        portfolioId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      metricsCollector.recordError('portfolio-service', 'get_assets_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '자산 조회 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 포트폴리오 통계 계산
  async getPortfolioStats(
    portfolioId: string,
    context: TenantContext
  ): Promise<ApiResponse<PortfolioStats>> {
    try {
      const [portfolio, assets] = await Promise.all([
        this.repository.getPortfolio(portfolioId, context),
        this.repository.getPortfolioAssets(portfolioId, context),
      ]);

      if (!portfolio) {
        return {
          success: false,
          error: '포트폴리오를 찾을 수 없습니다.',
          timestamp: new Date(),
        };
      }

      const stats = this.calculatePortfolioStats(portfolio, assets);

      return {
        success: true,
        data: stats,
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 통계 계산 실패', {
        portfolioId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      metricsCollector.recordError('portfolio-service', 'calculate_stats_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '통계 계산 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 자산 할당 분석
  async getAssetAllocation(
    portfolioId: string,
    context: TenantContext
  ): Promise<ApiResponse<AssetAllocation[]>> {
    try {
      const assets = await this.repository.getPortfolioAssets(portfolioId, context);
      const allocation = this.calculateAssetAllocation(assets);

      return {
        success: true,
        data: allocation,
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error('포트폴리오 서비스: 자산 할당 분석 실패', {
        portfolioId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      metricsCollector.recordError('portfolio-service', 'asset_allocation_failed');

      return {
        success: false,
        error: error instanceof Error ? error.message : '자산 할당 분석 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
    }
  }

  // 리밸런싱 필요성 검사
  async checkRebalancingNeeded(
    portfolioId: string,
    context: TenantContext
  ): Promise<void> {
    try {
      const assets = await this.repository.getPortfolioAssets(portfolioId, context);
      const allocation = this.calculateAssetAllocation(assets);

      // 리밸런싱 임계값 (5% 이상 편차)
      const rebalancingThreshold = 0.05;
      const needsRebalancing = allocation.some(
        (asset) => Math.abs(asset.deviation) > rebalancingThreshold
      );

      if (needsRebalancing) {
        await this.publishPortfolioEvent(
          portfolioId,
          'rebalancing_needed',
          {
            portfolioId,
            allocation,
            threshold: rebalancingThreshold,
          },
          context
        );

        logger.info('리밸런싱 필요 감지', {
          portfolioId,
          tenantId: context.tenantId,
        });
      }
    } catch (error) {
      logger.error('리밸런싱 검사 실패', {
        portfolioId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // 포트폴리오 이벤트 발행
  private async publishPortfolioEvent(
    portfolioId: string,
    eventType: string,
    data: Record<string, any>,
    context: TenantContext
  ): Promise<void> {
    try {
      const queue = this.queueManager.getQueue('portfolio-events');
      await queue.add(eventType, {
        portfolioId,
        tenantId: context.tenantId,
        userId: context.userId,
        timestamp: new Date(),
        data,
      });
    } catch (error) {
      logger.error('포트폴리오 이벤트 발행 실패', {
        portfolioId,
        eventType,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // 성과 계산 작업 예약
  private async schedulePerformanceCalculation(
    portfolioId: string,
    context: TenantContext
  ): Promise<void> {
    try {
      const queue = this.queueManager.getQueue('performance-calculations');
      await queue.add('calculate_performance', {
        portfolioId,
        tenantId: context.tenantId,
        userId: context.userId,
      });
    } catch (error) {
      logger.error('성과 계산 작업 예약 실패', {
        portfolioId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // 포트폴리오 통계 계산
  private calculatePortfolioStats(
    portfolio: Portfolio,
    assets: PortfolioAsset[]
  ): PortfolioStats {
    const totalAssets = assets.length;
    const totalValue = portfolio.totalValue;
    const totalCost = portfolio.totalCost;
    const totalGainLoss = portfolio.totalGainLoss;
    const totalGainLossPercent = portfolio.totalGainLossPercent;

    // 최고/최저 성과 자산
    const sortedByPerformance = [...assets].sort(
      (a, b) => b.unrealizedGainLossPercent - a.unrealizedGainLossPercent
    );

    const bestPerformer = sortedByPerformance[0];
    const worstPerformer = sortedByPerformance[sortedByPerformance.length - 1];

    // 상위 보유 자산 (시가총액 기준)
    const topHoldings = [...assets]
      .sort((a, b) => b.marketValue - a.marketValue)
      .slice(0, 10);

    // 자산 할당
    const assetAllocation = this.calculateAssetAllocation(assets);

    // 위험 지표 계산 (간단한 버전)
    const riskMetrics = this.calculateRiskMetrics(assets);

    return {
      totalAssets,
      totalValue,
      totalCost,
      totalGainLoss,
      totalGainLossPercent,
      bestPerformer: {
        symbol: bestPerformer.symbol,
        gainLossPercent: bestPerformer.unrealizedGainLossPercent,
      },
      worstPerformer: {
        symbol: worstPerformer.symbol,
        gainLossPercent: worstPerformer.unrealizedGainLossPercent,
      },
      topHoldings,
      assetAllocation,
      riskMetrics,
    };
  }

  // 자산 할당 계산
  private calculateAssetAllocation(assets: PortfolioAsset[]): AssetAllocation[] {
    const totalValue = assets.reduce((sum, asset) => sum + asset.marketValue, 0);
    
    const allocationMap = new Map<string, AssetAllocation>();

    for (const asset of assets) {
      const key = asset.assetType;
      const weight = totalValue > 0 ? (asset.marketValue / totalValue) * 100 : 0;

      if (allocationMap.has(key)) {
        const existing = allocationMap.get(key)!;
        existing.currentWeight += weight;
        existing.marketValue += asset.marketValue;
        existing.costBasis += asset.costBasis;
        existing.gainLoss += asset.unrealizedGainLoss;
      } else {
        allocationMap.set(key, {
          assetType: asset.assetType,
          currentWeight: weight,
          targetWeight: 0, // 타겟 가중치는 별도 설정 필요
          deviation: weight, // 타겟이 0이므로 현재 가중치가 편차
          marketValue: asset.marketValue,
          costBasis: asset.costBasis,
          gainLoss: asset.unrealizedGainLoss,
          gainLossPercent: asset.unrealizedGainLossPercent,
        });
      }
    }

    return Array.from(allocationMap.values());
  }

  // 위험 지표 계산
  private calculateRiskMetrics(assets: PortfolioAsset[]): PortfolioStats['riskMetrics'] {
    // 간단한 위험 지표 계산 (실제로는 더 복잡한 계산 필요)
    const totalValue = assets.reduce((sum, asset) => sum + asset.marketValue, 0);
    const totalCost = assets.reduce((sum, asset) => sum + asset.costBasis, 0);
    
    const volatility = 0.15; // 임시 값 (실제로는 히스토리컬 데이터 필요)
    const sharpeRatio = totalCost > 0 ? (totalValue - totalCost) / (totalCost * volatility) : 0;
    const maxDrawdown = 0.10; // 임시 값
    const beta = 1.0; // 임시 값

    return {
      volatility,
      sharpeRatio,
      maxDrawdown,
      beta,
    };
  }

  // 입력 검증
  private validateCreatePortfolioRequest(request: CreatePortfolioRequest): void {
    if (!request.name || request.name.trim().length === 0) {
      throw new Error('포트폴리오 이름은 필수입니다.');
    }

    if (!request.currency || request.currency.trim().length === 0) {
      throw new Error('통화는 필수입니다.');
    }

    if (request.initialAssets) {
      for (const asset of request.initialAssets) {
        if (!asset.symbol || asset.symbol.trim().length === 0) {
          throw new Error('자산 심볼은 필수입니다.');
        }

        if (asset.quantity <= 0) {
          throw new Error('자산 수량은 0보다 커야 합니다.');
        }

        if (asset.averagePrice <= 0) {
          throw new Error('평균 가격은 0보다 커야 합니다.');
        }
      }
    }
  }
} 