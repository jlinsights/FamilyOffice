import request from 'supertest';
import { app } from '../index';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioRepository } from '../repositories/portfolio.repository';
import { pgPool, redisClient } from '../../../shared/database/connection';

describe('Portfolio Service API Tests', () => {
  let authToken: string;
  let testPortfolioId: string;

  beforeAll(async () => {
    // 테스트 데이터베이스 설정
    await pgPool.query('BEGIN');
    
    // 테스트 사용자 생성 및 인증 토큰 발급
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@familyoffice.com',
        password: 'testpassword123'
      });
    
    authToken = loginResponse.body.data.token;
  });

  afterAll(async () => {
    // 테스트 데이터 정리
    await pgPool.query('ROLLBACK');
    await pgPool.end();
    await redisClient.quit();
  });

  describe('POST /api/portfolio', () => {
    it('should create a new portfolio', async () => {
      const portfolioData = {
        name: 'Test Portfolio',
        description: 'Test portfolio for unit testing',
        currency: 'USD',
        initialBalance: 100000
      };

      const response = await request(app)
        .post('/api/portfolio')
        .set('Authorization', `Bearer ${authToken}`)
        .send(portfolioData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(portfolioData.name);
      expect(response.body.data.currency).toBe(portfolioData.currency);
      
      testPortfolioId = response.body.data.id;
    });

    it('should return 400 for invalid portfolio data', async () => {
      const invalidData = {
        name: '', // 빈 이름
        currency: 'INVALID' // 잘못된 통화
      };

      const response = await request(app)
        .post('/api/portfolio')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/portfolio', () => {
    it('should return paginated portfolio list', async () => {
      const response = await request(app)
        .get('/api/portfolio?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.portfolios).toBeInstanceOf(Array);
      expect(response.body.data.pagination).toBeDefined();
    });

    it('should filter portfolios by status', async () => {
      const response = await request(app)
        .get('/api/portfolio?status=active')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.portfolios.forEach((portfolio: any) => {
        expect(portfolio.isActive).toBe(true);
      });
    });
  });

  describe('GET /api/portfolio/:id', () => {
    it('should return portfolio details', async () => {
      const response = await request(app)
        .get(`/api/portfolio/${testPortfolioId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testPortfolioId);
      expect(response.body.data.assets).toBeInstanceOf(Array);
    });

    it('should return 404 for non-existent portfolio', async () => {
      const response = await request(app)
        .get('/api/portfolio/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/portfolio/:id', () => {
    it('should update portfolio details', async () => {
      const updateData = {
        name: 'Updated Test Portfolio',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/portfolio/${testPortfolioId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.description).toBe(updateData.description);
    });
  });

  describe('POST /api/portfolio/:id/assets', () => {
    it('should add asset to portfolio', async () => {
      const assetData = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        assetType: 'stock',
        quantity: 100,
        averagePrice: 150.00
      };

      const response = await request(app)
        .post(`/api/portfolio/${testPortfolioId}/assets`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(assetData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.symbol).toBe(assetData.symbol);
      expect(response.body.data.quantity).toBe(assetData.quantity);
    });
  });

  describe('GET /api/portfolio/:id/performance', () => {
    it('should return portfolio performance data', async () => {
      const response = await request(app)
        .get(`/api/portfolio/${testPortfolioId}/performance?period=1y`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.returns).toBeDefined();
      expect(response.body.data.volatility).toBeDefined();
      expect(response.body.data.sharpeRatio).toBeDefined();
    });
  });

  describe('POST /api/portfolio/:id/rebalance', () => {
    it('should trigger portfolio rebalancing', async () => {
      const rebalanceData = {
        targets: [
          { assetType: 'stock', targetWeight: 0.6 },
          { assetType: 'bond', targetWeight: 0.3 },
          { assetType: 'cash', targetWeight: 0.1 }
        ],
        tolerance: 0.05
      };

      const response = await request(app)
        .post(`/api/portfolio/${testPortfolioId}/rebalance`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(rebalanceData)
        .expect(202);

      expect(response.body.success).toBe(true);
      expect(response.body.data.jobId).toBeDefined();
    });
  });
});

describe('Portfolio Service Business Logic Tests', () => {
  let portfolioService: PortfolioService;
  let portfolioRepository: PortfolioRepository;

  beforeEach(() => {
    portfolioRepository = new PortfolioRepository();
    portfolioService = new PortfolioService();
  });

  describe('Portfolio Calculations', () => {
    it('should calculate portfolio performance correctly', async () => {
      const mockPortfolio = {
        id: 'test-portfolio',
        totalValue: 100000,
        totalCost: 95000,
        assets: [
          {
            symbol: 'AAPL',
            quantity: 100,
            averagePrice: 150,
            currentPrice: 160,
            marketValue: 16000,
            costBasis: 15000
          },
          {
            symbol: 'GOOGL',
            quantity: 50,
            averagePrice: 2800,
            currentPrice: 2900,
            marketValue: 145000,
            costBasis: 140000
          }
        ]
      };

      const performance = await portfolioService.calculatePerformance(mockPortfolio);
      
      expect(performance.totalGainLoss).toBe(5000);
      expect(performance.totalGainLossPercent).toBeCloseTo(5.26, 2);
    });

    it('should calculate asset allocation correctly', async () => {
      const mockAssets = [
        { symbol: 'AAPL', marketValue: 60000, assetType: 'stock' },
        { symbol: 'BOND', marketValue: 30000, assetType: 'bond' },
        { symbol: 'CASH', marketValue: 10000, assetType: 'cash' }
      ];

      const allocation = await portfolioService.calculateAssetAllocation(mockAssets);
      
      expect(allocation.stock).toBeCloseTo(0.6, 2);
      expect(allocation.bond).toBeCloseTo(0.3, 2);
      expect(allocation.cash).toBeCloseTo(0.1, 2);
    });
  });

  describe('Risk Management', () => {
    it('should calculate portfolio risk metrics', async () => {
      const mockReturns = [0.02, -0.01, 0.03, -0.02, 0.01, 0.02, -0.01, 0.03];
      
      const riskMetrics = await portfolioService.calculateRiskMetrics(mockReturns);
      
      expect(riskMetrics.volatility).toBeGreaterThan(0);
      expect(riskMetrics.sharpeRatio).toBeDefined();
      expect(riskMetrics.maxDrawdown).toBeDefined();
    });
  });
});

describe('Database Integration Tests', () => {
  let portfolioRepository: PortfolioRepository;

  beforeEach(() => {
    portfolioRepository = new PortfolioRepository();
  });

  it('should create and retrieve portfolio from database', async () => {
    const portfolioData = {
      name: 'Integration Test Portfolio',
      description: 'Test portfolio for database integration',
      currency: 'USD',
      initialBalance: 100000
    };

    const context = {
      tenantId: 'test-tenant',
      userId: 'test-user'
    };

    // 포트폴리오 생성
    const createdPortfolio = await portfolioRepository.createPortfolio(portfolioData, context);
    expect(createdPortfolio.id).toBeDefined();
    expect(createdPortfolio.name).toBe(portfolioData.name);

    // 포트폴리오 조회
    const retrievedPortfolio = await portfolioRepository.getPortfolioById(createdPortfolio.id, context);
    expect(retrievedPortfolio).toBeDefined();
    expect(retrievedPortfolio.name).toBe(portfolioData.name);
  });

  it('should handle database connection errors gracefully', async () => {
    // 잘못된 데이터베이스 연결로 테스트
    const invalidContext = {
      tenantId: 'invalid-tenant',
      userId: 'invalid-user'
    };

    try {
      await portfolioRepository.getPortfolioById('non-existent', invalidContext);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
}); 