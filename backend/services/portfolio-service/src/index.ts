import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { register } from 'prom-client';
import { PortfolioController } from './controllers/portfolio.controller';
import { logger } from '../../shared/logging/logger';
import { metricsCollector } from '../../shared/monitoring/metrics';
import { pgPool, redisClient } from '../../shared/database/connection';

// 환경 변수
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Express 앱 생성
const app = express();

// 보안 미들웨어
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
    },
  },
}));

// CORS 설정
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));

// 요청 제한 설정
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 요청 수
  message: {
    success: false,
    error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
    timestamp: new Date(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// JSON 파싱 미들웨어
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  const startTime = Date.now();
  
  logger.info('HTTP 요청', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    userId: req.user?.id || 'anonymous',
  });

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info('HTTP 응답', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userId: req.user?.id || 'anonymous',
    });

    metricsCollector.recordHttpRequest(req.method, req.url, res.statusCode, duration);
  });

  next();
});

// 인증 미들웨어 (간단한 버전)
app.use((req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    // 실제로는 JWT 토큰 검증 필요
    req.user = {
      id: 'user-123', // 실제로는 토큰에서 추출
      email: 'user@example.com',
      roles: ['user'],
    };
  }
  
  next();
});

// 컨트롤러 생성
const portfolioController = new PortfolioController();

// API 라우트
const apiRouter = express.Router();

// 포트폴리오 라우트
apiRouter.post('/portfolios', 
  PortfolioController.getValidationRules().createPortfolio,
  portfolioController.createPortfolio.bind(portfolioController)
);

apiRouter.get('/portfolios', 
  PortfolioController.getValidationRules().getPortfolios,
  portfolioController.getPortfolios.bind(portfolioController)
);

apiRouter.get('/portfolios/:id', 
  PortfolioController.getValidationRules().getPortfolio,
  portfolioController.getPortfolio.bind(portfolioController)
);

apiRouter.put('/portfolios/:id', 
  PortfolioController.getValidationRules().updatePortfolio,
  portfolioController.updatePortfolio.bind(portfolioController)
);

apiRouter.post('/portfolios/:id/assets', 
  PortfolioController.getValidationRules().addAssetToPortfolio,
  portfolioController.addAssetToPortfolio.bind(portfolioController)
);

apiRouter.get('/portfolios/:id/assets', 
  PortfolioController.getValidationRules().getPortfolioAssets,
  portfolioController.getPortfolioAssets.bind(portfolioController)
);

apiRouter.get('/portfolios/:id/stats', 
  PortfolioController.getValidationRules().getPortfolioStats,
  portfolioController.getPortfolioStats.bind(portfolioController)
);

apiRouter.get('/portfolios/:id/allocation', 
  PortfolioController.getValidationRules().getAssetAllocation,
  portfolioController.getAssetAllocation.bind(portfolioController)
);

app.use('/api/v1', apiRouter);

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'portfolio-service',
    timestamp: new Date(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// 메트릭 엔드포인트
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    logger.error('메트릭 수집 실패', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    res.status(500).json({
      success: false,
      error: '메트릭 수집 중 오류가 발생했습니다.',
      timestamp: new Date(),
    });
  }
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: '요청한 리소스를 찾을 수 없습니다.',
    timestamp: new Date(),
  });
});

// 전역 에러 핸들러
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('전역 에러 핸들러', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    userId: req.user?.id || 'anonymous',
  });

  metricsCollector.recordError('portfolio-service', 'unhandled_error');

  res.status(500).json({
    success: false,
    error: NODE_ENV === 'production' 
      ? '서버 내부 오류가 발생했습니다.' 
      : error.message,
    timestamp: new Date(),
  });
});

// 데이터베이스 연결 테스트
async function testDatabaseConnections() {
  try {
    // PostgreSQL 연결 테스트
    const pgClient = await pgPool.connect();
    await pgClient.query('SELECT NOW()');
    pgClient.release();
    logger.info('PostgreSQL 연결 성공');

    // Redis 연결 테스트
    await redisClient.ping();
    logger.info('Redis 연결 성공');
  } catch (error) {
    logger.error('데이터베이스 연결 실패', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    process.exit(1);
  }
}

// 서버 시작
async function startServer() {
  try {
    // 데이터베이스 연결 테스트
    await testDatabaseConnections();

    // 서버 시작
    app.listen(PORT, () => {
      logger.info('포트폴리오 서비스 시작', {
        port: PORT,
        environment: NODE_ENV,
        timestamp: new Date(),
      });
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM 신호 수신, 서버 종료 시작');
      
      // 연결 풀 종료
      await pgPool.end();
      await redisClient.quit();
      
      logger.info('서버 종료 완료');
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT 신호 수신, 서버 종료 시작');
      
      // 연결 풀 종료
      await pgPool.end();
      await redisClient.quit();
      
      logger.info('서버 종료 완료');
      process.exit(0);
    });

  } catch (error) {
    logger.error('서버 시작 실패', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    process.exit(1);
  }
}

// 서버 시작
startServer(); 