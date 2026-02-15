import { Request, Response } from 'express';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import { rateLimiter } from '../../../shared/utils/rateLimiter';
import { validateRequest } from '../../../shared/utils/validation';
import { UserService } from '../services/user.service';
import {
  CreateUserRequest,
  UpdateUserRequest,
  CreateFamilyMemberRequest,
  LoginRequest,
  UserFilter,
  UserSort,
  PaginationParams,
  ChangePasswordRequest,
  SecuritySettings,
} from '../types/user';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // 사용자 생성
  async createUser(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      // 요청 검증
      const validation = validateRequest(req.body, {
        email: 'required|email',
        password: 'required|min:8',
        firstName: 'required|string',
        lastName: 'required|string',
        role: 'required|in:super_admin,family_admin,family_member,wealth_manager,advisor,administrator',
        tenantId: 'required|string',
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      // Rate limiting
      const rateLimitKey = `create_user:${req.ip}`;
      const rateLimitResult = await rateLimiter.checkLimit(
        rateLimitKey,
        10,
        3600
      ); // 10회/시간

      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const request: CreateUserRequest = req.body;
      const context = this.createTenantContext(req);

      const user = await this.userService.createUser(request, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'create_user',
        Date.now() - startTime
      );

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      logger.error('Failed to create user', {
        error: error.message,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 사용자 로그인
  async login(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      // 요청 검증
      const validation = validateRequest(req.body, {
        email: 'required|email',
        password: 'required|string',
        twoFactorCode: 'optional|string',
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      // Rate limiting (로그인은 더 엄격하게)
      const rateLimitKey = `login:${req.ip}`;
      const rateLimitResult = await rateLimiter.checkLimit(
        rateLimitKey,
        5,
        900
      ); // 5회/15분

      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Too many login attempts',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const request: LoginRequest = {
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent') || '',
      };

      const context = this.createTenantContext(req);
      const result = await this.userService.login(request, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'login',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error('Login failed', {
        error: error.message,
        email: req.body.email,
        ip: req.ip,
        duration: Date.now() - startTime,
      });

      res.status(401).json({
        success: false,
        error: error.message,
      });
    }
  }

  // 사용자 조회
  async getUser(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;
      const context = this.createTenantContext(req);

      const user = await this.userService.getUser(userId, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_user',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      logger.error('Failed to get user', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  }

  // 사용자 목록 조회
  async getUsers(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const filter: UserFilter = {
        status: req.query.status as any,
        role: req.query.role as any,
        familyGroupId: req.query.familyGroupId as string,
        search: req.query.search as string,
      };

      const sort: UserSort = {
        field: (req.query.sortBy as string) || 'createdAt',
        direction: (req.query.sortDir as 'asc' | 'desc') || 'desc',
      };

      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: Math.min(parseInt(req.query.limit as string) || 20, 100),
      };

      const context = this.createTenantContext(req);
      const result = await this.userService.getUsers(
        filter,
        sort,
        pagination,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_users',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error('Failed to get users', {
        error: error.message,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 사용자 업데이트
  async updateUser(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;

      // 요청 검증
      const validation = validateRequest(req.body, {
        firstName: 'optional|string',
        lastName: 'optional|string',
        phoneNumber: 'optional|string',
        status: 'optional|in:active,inactive,suspended,pending,locked',
        role: 'optional|in:super_admin,family_admin,family_member,wealth_manager,advisor,administrator',
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      const request: UpdateUserRequest = req.body;
      const context = this.createTenantContext(req);

      const user = await this.userService.updateUser(userId, request, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'update_user',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      logger.error('Failed to update user', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 사용자 삭제
  async deleteUser(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;
      const context = this.createTenantContext(req);

      await this.userService.deleteUser(userId, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'delete_user',
        Date.now() - startTime
      );

      res.status(204).send();
    } catch (error) {
      logger.error('Failed to delete user', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 패밀리 멤버 생성
  async createFamilyMember(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      // 요청 검증
      const validation = validateRequest(req.body, {
        userId: 'required|string',
        familyGroupId: 'required|string',
        relationship: 'required|string',
        isPrimaryContact: 'optional|boolean',
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      const request: CreateFamilyMemberRequest = req.body;
      const context = this.createTenantContext(req);

      const familyMember = await this.userService.createFamilyMember(
        request,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'create_family_member',
        Date.now() - startTime
      );

      res.status(201).json({
        success: true,
        data: familyMember,
      });
    } catch (error) {
      logger.error('Failed to create family member', {
        error: error.message,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 세션 검증
  async validateSession(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const sessionId = req.params.sessionId;
      const context = this.createTenantContext(req);

      const session = await this.userService.validateSession(
        sessionId,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'validate_session',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error) {
      logger.error('Session validation failed', {
        error: error.message,
        sessionId: req.params.sessionId,
        duration: Date.now() - startTime,
      });

      res.status(401).json({
        success: false,
        error: 'Invalid session',
      });
    }
  }

  // 로그아웃
  async logout(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const sessionId = req.params.sessionId;
      const context = this.createTenantContext(req);

      await this.userService.logout(sessionId, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'logout',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      logger.error('Logout failed', {
        error: error.message,
        sessionId: req.params.sessionId,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 2FA 설정
  async setupTwoFactor(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;
      const context = this.createTenantContext(req);

      const setup = await this.userService.setupTwoFactor(userId, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'setup_two_factor',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: setup,
      });
    } catch (error) {
      logger.error('Failed to setup two-factor authentication', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 비밀번호 재설정 요청
  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      // 요청 검증
      const validation = validateRequest(req.body, {
        email: 'required|email',
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      // Rate limiting
      const rateLimitKey = `password_reset:${req.ip}`;
      const rateLimitResult = await rateLimiter.checkLimit(
        rateLimitKey,
        3,
        3600
      ); // 3회/시간

      if (!rateLimitResult.allowed) {
        res.status(429).json({
          success: false,
          error: 'Too many password reset requests',
          retryAfter: rateLimitResult.retryAfter,
        });
        return;
      }

      const { email } = req.body;
      const context = this.createTenantContext(req);

      await this.userService.requestPasswordReset(email, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'request_password_reset',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        message: 'Password reset email sent',
      });
    } catch (error) {
      logger.error('Failed to request password reset', {
        error: error.message,
        email: req.body.email,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 비밀번호 변경
  async changePassword(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;

      // 요청 검증
      const validation = validateRequest(req.body, {
        currentPassword: 'required|string',
        newPassword: 'required|min:8',
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      const request: ChangePasswordRequest = req.body;
      const context = this.createTenantContext(req);

      await this.userService.changePassword(userId, request, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'change_password',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      logger.error('Failed to change password', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // 사용자 프로필 조회
  async getUserProfile(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;
      const context = this.createTenantContext(req);

      const profile = await this.userService.getUserProfile(userId, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_user_profile',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      logger.error('Failed to get user profile', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  }

  // 사용자 권한 조회
  async getUserPermissions(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;
      const context = this.createTenantContext(req);

      const permissions = await this.userService.getUserPermissions(
        userId,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_user_permissions',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: permissions,
      });
    } catch (error) {
      logger.error('Failed to get user permissions', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  }

  // 패밀리 계층 구조 조회
  async getFamilyHierarchy(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const familyGroupId = req.params.familyGroupId;
      const context = this.createTenantContext(req);

      const hierarchy = await this.userService.getFamilyHierarchy(
        familyGroupId,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_family_hierarchy',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: hierarchy,
      });
    } catch (error) {
      logger.error('Failed to get family hierarchy', {
        error: error.message,
        familyGroupId: req.params.familyGroupId,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 세션 정보 조회
  async getSessionInfo(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const sessionId = req.params.sessionId;
      const context = this.createTenantContext(req);

      const sessionInfo = await this.userService.getSessionInfo(
        sessionId,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_session_info',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: sessionInfo,
      });
    } catch (error) {
      logger.error('Failed to get session info', {
        error: error.message,
        sessionId: req.params.sessionId,
        duration: Date.now() - startTime,
      });

      res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }
  }

  // 로그인 히스토리 조회
  async getLoginHistory(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;
      const context = this.createTenantContext(req);

      const history = await this.userService.getLoginHistory(userId, context);

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_login_history',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      logger.error('Failed to get login history', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 보안 설정 조회
  async getSecuritySettings(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;
      const context = this.createTenantContext(req);

      const settings = await this.userService.getSecuritySettings(
        userId,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'get_security_settings',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      logger.error('Failed to get security settings', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  }

  // 보안 설정 업데이트
  async updateSecuritySettings(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      const userId = req.params.id;

      // 요청 검증
      const validation = validateRequest(req.body, {
        twoFactorEnabled: 'optional|boolean',
        sessionTimeout: 'optional|integer|min:300|max:86400',
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      const settings: Partial<SecuritySettings> = req.body;
      const context = this.createTenantContext(req);

      const updatedSettings = await this.userService.updateSecuritySettings(
        userId,
        settings,
        context
      );

      // 메트릭 기록
      metricsCollector.recordApiCall(
        'user_service',
        'update_security_settings',
        Date.now() - startTime
      );

      res.status(200).json({
        success: true,
        data: updatedSettings,
      });
    } catch (error) {
      logger.error('Failed to update security settings', {
        error: error.message,
        userId: req.params.id,
        duration: Date.now() - startTime,
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // 헬스체크
  async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      service: 'user-service',
      timestamp: new Date().toISOString(),
      status: 'healthy',
    });
  }

  // 테넌트 컨텍스트 생성
  private createTenantContext(req: Request) {
    return {
      tenantId: (req.headers['x-tenant-id'] as string) || 'default',
      userId: (req.headers['x-user-id'] as string) || 'system',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent') || '',
    };
  }
}
