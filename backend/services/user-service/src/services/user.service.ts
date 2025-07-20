import { UserRepository } from '../repositories/user.repository';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../../../shared/utils/security';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import { TenantContext } from '../../../shared/database/connection';
import {
  User,
  UserStatus,
  UserRole,
  Permission,
  CreateUserRequest,
  UpdateUserRequest,
  CreateFamilyMemberRequest,
  LoginRequest,
  LoginResponse,
  UserFilter,
  UserSort,
  PaginationParams,
  PaginatedResponse,
  FamilyMember,
  FamilyGroup,
  Trust,
  Session,
  AuditEntry,
  TwoFactorSetup,
  PasswordResetRequest,
  ChangePasswordRequest,
  UserProfile,
  UserPermissions,
  FamilyHierarchy,
  SessionInfo,
  LoginHistory,
  SecuritySettings,
} from '../types/user';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // 사용자 생성
  async createUser(
    request: CreateUserRequest,
    context: TenantContext
  ): Promise<User> {
    const startTime = Date.now();
    
    try {
      // 이메일 중복 확인
      const existingUser = await this.userRepository.findByEmail(request.email, context);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // 비밀번호 해싱
      const hashedPassword = await hashPassword(request.password);

      // 사용자 생성
      const user = await this.userRepository.createUser(
        { ...request, password: hashedPassword },
        context
      );

      // 감사 로그 기록
      await this.logAuditEvent(user.id, 'USER_CREATED', {
        createdBy: context.userId,
        userData: { email: request.email, role: request.role }
      }, context);

      // 메트릭 기록
      metricsCollector.recordUserCreation(user.tenantId, user.role);
      
      logger.info('User created successfully', {
        userId: user.id,
        email: user.email,
        role: user.role,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });

      return user;
    } catch (error) {
      logger.error('Failed to create user', {
        error: error.message,
        email: request.email,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });
      throw error;
    }
  }

  // 사용자 로그인
  async login(
    request: LoginRequest,
    context: TenantContext
  ): Promise<LoginResponse> {
    const startTime = Date.now();
    
    try {
      // 사용자 조회
      const user = await this.userRepository.findByEmail(request.email, context);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // 계정 상태 확인
      if (user.status !== UserStatus.ACTIVE) {
        throw new Error(`Account is ${user.status}`);
      }

      // 계정 잠금 확인
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        throw new Error('Account is temporarily locked');
      }

      // 비밀번호 검증
      const isValidPassword = await verifyPassword(request.password, user.password);
      if (!isValidPassword) {
        // 로그인 실패 기록
        await this.userRepository.incrementLoginAttempts(user.id, context);
        
        // 5회 실패 시 계정 잠금
        if (user.loginAttempts >= 4) {
          await this.userRepository.lockAccount(user.id, 30, context); // 30분 잠금
          throw new Error('Account locked due to multiple failed attempts');
        }
        
        throw new Error('Invalid credentials');
      }

      // 2FA 확인
      if (user.twoFactorEnabled) {
        if (!request.twoFactorCode) {
          throw new Error('Two-factor authentication code required');
        }
        
        const isValid2FA = await this.verifyTwoFactorCode(user, request.twoFactorCode);
        if (!isValid2FA) {
          throw new Error('Invalid two-factor authentication code');
        }
      }

      // 로그인 성공 처리
      await this.userRepository.resetLoginAttempts(user.id, context);
      await this.userRepository.updateLastLogin(user.id, context);

      // 세션 생성
      const session = await this.userRepository.createSession(user.id, context);

      // JWT 토큰 생성
      const accessToken = generateToken({
        userId: user.id,
        tenantId: user.tenantId,
        role: user.role,
        sessionId: session.id
      });

      const refreshToken = generateToken({
        userId: user.id,
        sessionId: session.id,
        type: 'refresh'
      });

      // 감사 로그 기록
      await this.logAuditEvent(user.id, 'USER_LOGIN', {
        ipAddress: request.ipAddress,
        userAgent: request.userAgent,
        sessionId: session.id
      }, context);

      // 메트릭 기록
      metricsCollector.recordUserLogin(user.tenantId, user.role);

      logger.info('User login successful', {
        userId: user.id,
        email: user.email,
        sessionId: session.id,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });

      return {
        user: this.sanitizeUser(user),
        accessToken,
        refreshToken,
        sessionId: session.id,
        expiresIn: 3600, // 1시간
        refreshExpiresIn: 604800 // 7일
      };
    } catch (error) {
      logger.error('Login failed', {
        error: error.message,
        email: request.email,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });
      throw error;
    }
  }

  // 사용자 조회
  async getUser(userId: string, context: TenantContext): Promise<User> {
    const user = await this.userRepository.findById(userId, context);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // 사용자 목록 조회
  async getUsers(
    filter: UserFilter,
    sort: UserSort,
    pagination: PaginationParams,
    context: TenantContext
  ): Promise<PaginatedResponse<User>> {
    return await this.userRepository.findUsers(filter, sort, pagination, context);
  }

  // 사용자 업데이트
  async updateUser(
    userId: string,
    request: UpdateUserRequest,
    context: TenantContext
  ): Promise<User> {
    const startTime = Date.now();
    
    try {
      const user = await this.userRepository.updateUser(userId, request, context);
      
      // 감사 로그 기록
      await this.logAuditEvent(userId, 'USER_UPDATED', {
        updatedBy: context.userId,
        changes: request
      }, context);

      logger.info('User updated successfully', {
        userId,
        updatedBy: context.userId,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });

      return user;
    } catch (error) {
      logger.error('Failed to update user', {
        error: error.message,
        userId,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });
      throw error;
    }
  }

  // 사용자 삭제
  async deleteUser(userId: string, context: TenantContext): Promise<void> {
    const startTime = Date.now();
    
    try {
      await this.userRepository.deleteUser(userId, context);
      
      // 감사 로그 기록
      await this.logAuditEvent(userId, 'USER_DELETED', {
        deletedBy: context.userId
      }, context);

      logger.info('User deleted successfully', {
        userId,
        deletedBy: context.userId,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });
    } catch (error) {
      logger.error('Failed to delete user', {
        error: error.message,
        userId,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });
      throw error;
    }
  }

  // 패밀리 멤버 생성
  async createFamilyMember(
    request: CreateFamilyMemberRequest,
    context: TenantContext
  ): Promise<FamilyMember> {
    const startTime = Date.now();
    
    try {
      const familyMember = await this.userRepository.createFamilyMember(request, context);
      
      // 감사 로그 기록
      await this.logAuditEvent(familyMember.userId, 'FAMILY_MEMBER_CREATED', {
        createdBy: context.userId,
        familyData: { relationship: request.relationship, familyGroupId: request.familyGroupId }
      }, context);

      logger.info('Family member created successfully', {
        familyMemberId: familyMember.id,
        userId: familyMember.userId,
        relationship: familyMember.relationship,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });

      return familyMember;
    } catch (error) {
      logger.error('Failed to create family member', {
        error: error.message,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });
      throw error;
    }
  }

  // 세션 검증
  async validateSession(sessionId: string, context: TenantContext): Promise<Session> {
    const session = await this.userRepository.findSessionById(sessionId, context);
    if (!session || session.expiresAt < new Date()) {
      throw new Error('Invalid or expired session');
    }
    return session;
  }

  // 세션 종료
  async logout(sessionId: string, context: TenantContext): Promise<void> {
    await this.userRepository.deleteSession(sessionId, context);
    
    logger.info('User logged out', {
      sessionId,
      tenantId: context.tenantId
    });
  }

  // 2FA 설정
  async setupTwoFactor(userId: string, context: TenantContext): Promise<TwoFactorSetup> {
    const secret = this.generateTwoFactorSecret();
    const qrCode = this.generateQRCode(secret);
    
    await this.userRepository.updateTwoFactorSecret(userId, secret, context);
    
    return {
      secret,
      qrCode,
      backupCodes: this.generateBackupCodes()
    };
  }

  // 2FA 검증
  async verifyTwoFactorCode(user: User, code: string): Promise<boolean> {
    // 실제 구현에서는 TOTP 라이브러리 사용
    return true; // 임시 구현
  }

  // 비밀번호 재설정 요청
  async requestPasswordReset(email: string, context: TenantContext): Promise<void> {
    const user = await this.userRepository.findByEmail(email, context);
    if (!user) {
      // 보안상 사용자가 존재하지 않아도 성공 응답
      return;
    }

    const resetToken = this.generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // 1시간

    await this.userRepository.createPasswordReset(user.id, resetToken, expiresAt, context);
    
    // 이메일 발송 (실제 구현에서는 이메일 서비스 사용)
    logger.info('Password reset requested', {
      userId: user.id,
      email: user.email,
      tenantId: context.tenantId
    });
  }

  // 비밀번호 변경
  async changePassword(
    userId: string,
    request: ChangePasswordRequest,
    context: TenantContext
  ): Promise<void> {
    const user = await this.userRepository.findById(userId, context);
    if (!user) {
      throw new Error('User not found');
    }

    // 현재 비밀번호 확인
    const isValidPassword = await verifyPassword(request.currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // 새 비밀번호 해싱
    const hashedPassword = await hashPassword(request.newPassword);
    
    // 비밀번호 업데이트
    await this.userRepository.updatePassword(userId, hashedPassword, context);
    
    // 모든 세션 종료 (보안상)
    await this.userRepository.deleteAllUserSessions(userId, context);
    
    // 감사 로그 기록
    await this.logAuditEvent(userId, 'PASSWORD_CHANGED', {
      changedBy: context.userId
    }, context);

    logger.info('Password changed successfully', {
      userId,
      changedBy: context.userId,
      tenantId: context.tenantId
    });
  }

  // 사용자 프로필 조회
  async getUserProfile(userId: string, context: TenantContext): Promise<UserProfile> {
    const user = await this.userRepository.findById(userId, context);
    if (!user) {
      throw new Error('User not found');
    }

    const familyMember = await this.userRepository.findFamilyMemberByUserId(userId, context);
    const permissions = await this.getUserPermissions(userId, context);

    return {
      user: this.sanitizeUser(user),
      familyMember,
      permissions
    };
  }

  // 사용자 권한 조회
  async getUserPermissions(userId: string, context: TenantContext): Promise<UserPermissions> {
    const user = await this.userRepository.findById(userId, context);
    if (!user) {
      throw new Error('User not found');
    }

    // 역할 기반 권한 매핑
    const rolePermissions: Record<UserRole, Permission[]> = {
      [UserRole.SUPER_ADMIN]: [
        Permission.ALL_ACCESS
      ],
      [UserRole.FAMILY_ADMIN]: [
        Permission.VIEW_PORTFOLIO,
        Permission.EDIT_PORTFOLIO,
        Permission.VIEW_REPORTS,
        Permission.EDIT_REPORTS,
        Permission.MANAGE_FAMILY_MEMBERS,
        Permission.VIEW_TRANSACTIONS,
        Permission.EDIT_TRANSACTIONS
      ],
      [UserRole.FAMILY_MEMBER]: [
        Permission.VIEW_PORTFOLIO,
        Permission.VIEW_REPORTS,
        Permission.VIEW_TRANSACTIONS
      ],
      [UserRole.WEALTH_MANAGER]: [
        Permission.VIEW_PORTFOLIO,
        Permission.EDIT_PORTFOLIO,
        Permission.VIEW_REPORTS,
        Permission.EDIT_REPORTS,
        Permission.VIEW_TRANSACTIONS,
        Permission.EDIT_TRANSACTIONS
      ],
      [UserRole.ADVISOR]: [
        Permission.VIEW_PORTFOLIO,
        Permission.VIEW_REPORTS,
        Permission.VIEW_TRANSACTIONS
      ],
      [UserRole.ADMINISTRATOR]: [
        Permission.VIEW_PORTFOLIO,
        Permission.VIEW_REPORTS,
        Permission.VIEW_TRANSACTIONS,
        Permission.MANAGE_USERS
      ]
    };

    return {
      role: user.role,
      permissions: rolePermissions[user.role] || [],
      customPermissions: user.permissions
    };
  }

  // 패밀리 계층 구조 조회
  async getFamilyHierarchy(familyGroupId: string, context: TenantContext): Promise<FamilyHierarchy> {
    const familyMembers = await this.userRepository.findFamilyMembersByGroupId(familyGroupId, context);
    const familyGroups = await this.userRepository.findFamilyGroupsByTenantId(context.tenantId, context);
    const trusts = await this.userRepository.findTrustsByFamilyGroupId(familyGroupId, context);

    return {
      familyMembers,
      familyGroups,
      trusts
    };
  }

  // 세션 정보 조회
  async getSessionInfo(sessionId: string, context: TenantContext): Promise<SessionInfo> {
    const session = await this.userRepository.findSessionById(sessionId, context);
    if (!session) {
      throw new Error('Session not found');
    }

    const user = await this.userRepository.findById(session.userId, context);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      sessionId: session.id,
      userId: session.userId,
      user: this.sanitizeUser(user),
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      lastActivityAt: session.lastActivityAt
    };
  }

  // 로그인 히스토리 조회
  async getLoginHistory(userId: string, context: TenantContext): Promise<LoginHistory[]> {
    return await this.userRepository.findLoginHistoryByUserId(userId, context);
  }

  // 보안 설정 조회
  async getSecuritySettings(userId: string, context: TenantContext): Promise<SecuritySettings> {
    const user = await this.userRepository.findById(userId, context);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      twoFactorEnabled: user.twoFactorEnabled,
      lastPasswordChange: user.updatedAt,
      loginAttempts: user.loginAttempts,
      lockedUntil: user.lockedUntil,
      sessionTimeout: 3600, // 1시간
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        maxAge: 90 // 90일
      }
    };
  }

  // 보안 설정 업데이트
  async updateSecuritySettings(
    userId: string,
    settings: Partial<SecuritySettings>,
    context: TenantContext
  ): Promise<SecuritySettings> {
    const startTime = Date.now();
    
    try {
      await this.userRepository.updateSecuritySettings(userId, settings, context);
      
      // 감사 로그 기록
      await this.logAuditEvent(userId, 'SECURITY_SETTINGS_UPDATED', {
        updatedBy: context.userId,
        changes: settings
      }, context);

      logger.info('Security settings updated successfully', {
        userId,
        updatedBy: context.userId,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });

      return await this.getSecuritySettings(userId, context);
    } catch (error) {
      logger.error('Failed to update security settings', {
        error: error.message,
        userId,
        tenantId: context.tenantId,
        duration: Date.now() - startTime
      });
      throw error;
    }
  }

  // 감사 로그 기록
  private async logAuditEvent(
    userId: string,
    event: string,
    details: any,
    context: TenantContext
  ): Promise<void> {
    const auditEntry: AuditEntry = {
      id: crypto.randomUUID(),
      userId,
      event,
      details,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      timestamp: new Date(),
      tenantId: context.tenantId
    };

    await this.userRepository.createAuditEntry(auditEntry, context);
  }

  // 사용자 정보 정제 (민감한 정보 제거)
  private sanitizeUser(user: User): Omit<User, 'password' | 'twoFactorSecret'> {
    const { password, twoFactorSecret, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  // 2FA 시크릿 생성
  private generateTwoFactorSecret(): string {
    return crypto.randomBytes(20).toString('base32');
  }

  // QR 코드 생성
  private generateQRCode(secret: string): string {
    // 실제 구현에서는 QR 코드 라이브러리 사용
    return `otpauth://totp/FamilyOffice:${secret}?secret=${secret}&issuer=FamilyOffice`;
  }

  // 백업 코드 생성
  private generateBackupCodes(): string[] {
    return Array.from({ length: 10 }, () => 
      crypto.randomBytes(4).toString('hex').toUpperCase()
    );
  }

  // 리셋 토큰 생성
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
} 