import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { logger } from '../../shared/logging/logger';
import { authMiddleware } from '../../shared/middleware/auth';
import { tenantMiddleware } from '../../shared/middleware/tenant';
import { metricsCollector } from '../../shared/monitoring/metrics';
import { errorHandler } from '../../shared/utils/errorHandler';
import { requestLogger } from '../../shared/utils/requestLogger';
import { IntegrationController } from './controllers/integration.controller';

const app = express();
const port = process.env.INTEGRATION_HUB_PORT || 3004;

// 미들웨어 설정
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
  })
);

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 속도 제한 설정
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 요청 수
  message: {
    success: false,
    error: 'Too many requests from this IP',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// 요청 로깅
app.use(requestLogger);

// 테넌트 미들웨어
app.use(tenantMiddleware);

// 인증 미들웨어 (선택적)
app.use(authMiddleware);

// 컨트롤러 인스턴스 생성
const integrationController = new IntegrationController();

// API 라우트 정의
const apiRouter = express.Router();

// 통합 관리 라우트
apiRouter.post(
  '/integrations',
  integrationController.createIntegration.bind(integrationController)
);
apiRouter.get(
  '/integrations',
  integrationController.getIntegrations.bind(integrationController)
);
apiRouter.get(
  '/integrations/:integrationId',
  integrationController.getIntegration.bind(integrationController)
);
apiRouter.put(
  '/integrations/:integrationId',
  integrationController.updateIntegration.bind(integrationController)
);
apiRouter.delete(
  '/integrations/:integrationId',
  integrationController.deleteIntegration.bind(integrationController)
);

// 동기화 작업 라우트
apiRouter.post(
  '/integrations/:integrationId/sync',
  integrationController.startSyncJob.bind(integrationController)
);
apiRouter.get(
  '/sync-jobs/:syncJobId/status',
  integrationController.getSyncJobStatus.bind(integrationController)
);

// 웹훅 이벤트 라우트
apiRouter.post(
  '/integrations/:integrationId/webhooks',
  integrationController.processWebhookEvent.bind(integrationController)
);

// 통합 테스트 라우트
apiRouter.post(
  '/integrations/:integrationId/test',
  integrationController.testIntegration.bind(integrationController)
);

// 메트릭 라우트
apiRouter.get(
  '/integrations/:integrationId/metrics',
  integrationController.getIntegrationMetrics.bind(integrationController)
);

// API 라우트 등록
app.use('/api/v1', apiRouter);

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'integration-hub',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// 메트릭 엔드포인트
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await metricsCollector.getMetrics();
    res.set('Content-Type', 'text/plain');
    res.status(200).send(metrics);
  } catch (error) {
    logger.error('Failed to get metrics', { error });
    res.status(500).json({
      success: false,
      error: 'Failed to get metrics',
    });
  }
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// 에러 핸들러
app.use(errorHandler);

// 서버 시작
const server = app.listen(port, () => {
  logger.info('Integration Hub Service started', {
    port,
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// 예상치 못한 에러 처리
process.on('uncaughtException', error => {
  logger.error('Uncaught Exception', { error });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
  process.exit(1);
});

export default app;
