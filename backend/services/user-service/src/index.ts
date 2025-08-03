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
import { UserController } from './controllers/user.controller';

const app = express();
const port = process.env.USER_SERVICE_PORT || 3001;

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

app.use(compression());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Tenant-ID',
      'X-User-ID',
    ],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 100개 요청
  message: {
    success: false,
    error: 'Too many requests from this IP',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Request logging
app.use(requestLogger);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check (인증 불필요)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'user-service',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Metrics endpoint (인증 불필요)
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await metricsCollector.getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  } catch (error) {
    logger.error('Failed to get metrics', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to get metrics',
    });
  }
});

// 컨트롤러 인스턴스 생성
const userController = new UserController();

// API 라우트 설정
const apiRouter = express.Router();

// 인증이 필요한 라우트
apiRouter.use(authMiddleware);
apiRouter.use(tenantMiddleware);

// 사용자 관리 라우트
apiRouter.post('/users', userController.createUser.bind(userController));
apiRouter.get('/users', userController.getUsers.bind(userController));
apiRouter.get('/users/:id', userController.getUser.bind(userController));
apiRouter.put('/users/:id', userController.updateUser.bind(userController));
apiRouter.delete('/users/:id', userController.deleteUser.bind(userController));

// 인증 라우트 (인증 미들웨어 제외)
const authRouter = express.Router();
authRouter.post('/login', userController.login.bind(userController));
authRouter.post(
  '/logout/:sessionId',
  userController.logout.bind(userController)
);
authRouter.post(
  '/password-reset/request',
  userController.requestPasswordReset.bind(userController)
);
authRouter.post(
  '/password-reset/change',
  userController.changePassword.bind(userController)
);

// 세션 관리 라우트
authRouter.get(
  '/sessions/:sessionId/validate',
  userController.validateSession.bind(userController)
);
authRouter.get(
  '/sessions/:sessionId/info',
  userController.getSessionInfo.bind(userController)
);

// 패밀리 관리 라우트
apiRouter.post(
  '/family-members',
  userController.createFamilyMember.bind(userController)
);
apiRouter.get(
  '/family-hierarchy/:familyGroupId',
  userController.getFamilyHierarchy.bind(userController)
);

// 보안 설정 라우트
apiRouter.get(
  '/users/:id/profile',
  userController.getUserProfile.bind(userController)
);
apiRouter.get(
  '/users/:id/permissions',
  userController.getUserPermissions.bind(userController)
);
apiRouter.get(
  '/users/:id/login-history',
  userController.getLoginHistory.bind(userController)
);
apiRouter.get(
  '/users/:id/security-settings',
  userController.getSecuritySettings.bind(userController)
);
apiRouter.put(
  '/users/:id/security-settings',
  userController.updateSecuritySettings.bind(userController)
);

// 2FA 설정 라우트
apiRouter.post(
  '/users/:id/two-factor/setup',
  userController.setupTwoFactor.bind(userController)
);

// 라우터 마운트
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', apiRouter);

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
  logger.info('User service started', {
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

// Unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', {
    promise,
    reason,
    stack: reason instanceof Error ? reason.stack : undefined,
  });
});

// Uncaught exception
process.on('uncaughtException', error => {
  logger.error('Uncaught Exception:', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

export default app;
