import {
  pgPool,
  withTransaction,
  TenantContext,
} from '../../../shared/database/connection';
import { logger } from '../../../shared/logging/logger';
import { metricsCollector } from '../../../shared/monitoring/metrics';
import {
  User,
  UserStatus,
  UserRole,
  Permission,
  AuditEntry,
  FamilyMember,
  FamilyGroup,
  Trust,
  Session,
  CreateUserRequest,
  UpdateUserRequest,
  CreateFamilyMemberRequest,
  LoginRequest,
  UserFilter,
  UserSort,
  PaginationParams,
  PaginatedResponse,
} from '../types/user';

export class UserRepository {
  // 사용자 생성
  async createUser(
    request: CreateUserRequest,
    context: TenantContext
  ): Promise<User> {
    const startTime = Date.now();

    try {
      const result = await withTransaction(async client => {
        const userQuery = `
          INSERT INTO users (
            tenant_id, email, first_name, last_name, phone_number, 
            date_of_birth, status, role, created_by, updated_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `;

        const userResult = await client.query(userQuery, [
          context.tenantId,
          request.email,
          request.firstName,
          request.lastName,
          request.phoneNumber,
          request.dateOfBirth,
          UserStatus.PENDING,
          request.role,
          context.userId,
          context.userId,
        ]);

        const user = userResult.rows[0];

        // 권한 저장
        if (request.permissions && request.permissions.length > 0) {
          const permissionQuery = `
            INSERT INTO user_permissions (user_id, resource, action, conditions, description)
            VALUES ($1, $2, $3, $4, $5)
          `;

          for (const permission of request.permissions) {
            await client.query(permissionQuery, [
              user.id,
              permission.resource,
              permission.action,
              JSON.stringify(permission.conditions),
              permission.description,
            ]);
          }
        }

        // 감사 로그 생성
        await this.createAuditEntry(client, {
          userId: context.userId,
          action: 'CREATE_USER',
          resource: 'users',
          resourceId: user.id,
          newValue: user,
          ipAddress: context.ipAddress || '',
          userAgent: context.userAgent || '',
          timestamp: new Date(),
        });

        return user;
      });

      metricsCollector.recordDatabaseOperation(
        'create_user',
        Date.now() - startTime
      );
      logger.info('User created successfully', {
        userId: result.id,
        tenantId: context.tenantId,
      });

      return result;
    } catch (error) {
      logger.error('Failed to create user', {
        error,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 사용자 조회
  async getUserById(
    userId: string,
    context: TenantContext
  ): Promise<User | null> {
    const startTime = Date.now();

    try {
      const query = `
        SELECT u.*, 
               array_agg(json_build_object(
                 'id', up.id,
                 'resource', up.resource,
                 'action', up.action,
                 'conditions', up.conditions,
                 'description', up.description
               )) as permissions
        FROM users u
        LEFT JOIN user_permissions up ON u.id = up.user_id
        WHERE u.id = $1 AND u.tenant_id = $2
        GROUP BY u.id
      `;

      const result = await pgPool.query(query, [userId, context.tenantId]);

      if (result.rows.length === 0) {
        return null;
      }

      const user = result.rows[0];
      user.permissions = user.permissions.filter((p: any) => p.id !== null);

      metricsCollector.recordDatabaseOperation(
        'get_user_by_id',
        Date.now() - startTime
      );
      return user;
    } catch (error) {
      logger.error('Failed to get user by ID', {
        error,
        userId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 이메일로 사용자 조회
  async getUserByEmail(
    email: string,
    context: TenantContext
  ): Promise<User | null> {
    const startTime = Date.now();

    try {
      const query = `
        SELECT u.*, 
               array_agg(json_build_object(
                 'id', up.id,
                 'resource', up.resource,
                 'action', up.action,
                 'conditions', up.conditions,
                 'description', up.description
               )) as permissions
        FROM users u
        LEFT JOIN user_permissions up ON u.id = up.user_id
        WHERE u.email = $1 AND u.tenant_id = $2
        GROUP BY u.id
      `;

      const result = await pgPool.query(query, [email, context.tenantId]);

      if (result.rows.length === 0) {
        return null;
      }

      const user = result.rows[0];
      user.permissions = user.permissions.filter((p: any) => p.id !== null);

      metricsCollector.recordDatabaseOperation(
        'get_user_by_email',
        Date.now() - startTime
      );
      return user;
    } catch (error) {
      logger.error('Failed to get user by email', {
        error,
        email,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 사용자 목록 조회
  async getUsers(
    pagination: PaginationParams,
    context: TenantContext
  ): Promise<PaginatedResponse<User>> {
    const startTime = Date.now();

    try {
      let whereConditions = ['u.tenant_id = $1'];
      const queryParams: any[] = [context.tenantId];
      let paramIndex = 2;

      // 필터 적용
      if (pagination.filter) {
        if (pagination.filter.status) {
          whereConditions.push(`u.status = $${paramIndex}`);
          queryParams.push(pagination.filter.status);
          paramIndex++;
        }

        if (pagination.filter.role) {
          whereConditions.push(`u.role = $${paramIndex}`);
          queryParams.push(pagination.filter.role);
          paramIndex++;
        }

        if (pagination.filter.search) {
          whereConditions.push(
            `(u.first_name ILIKE $${paramIndex} OR u.last_name ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex})`
          );
          queryParams.push(`%${pagination.filter.search}%`);
          paramIndex++;
        }

        if (pagination.filter.createdAfter) {
          whereConditions.push(`u.created_at >= $${paramIndex}`);
          queryParams.push(pagination.filter.createdAfter);
          paramIndex++;
        }

        if (pagination.filter.createdBefore) {
          whereConditions.push(`u.created_at <= $${paramIndex}`);
          queryParams.push(pagination.filter.createdBefore);
          paramIndex++;
        }
      }

      const whereClause = whereConditions.join(' AND ');

      // 정렬 설정
      const sortField = pagination.sort?.field || 'created_at';
      const sortDirection = pagination.sort?.direction || 'desc';
      const orderClause = `ORDER BY u.${sortField} ${sortDirection.toUpperCase()}`;

      // 총 개수 조회
      const countQuery = `
        SELECT COUNT(*) as total
        FROM users u
        WHERE ${whereClause}
      `;

      const countResult = await pgPool.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);

      // 페이지네이션 적용
      const offset = (pagination.page - 1) * pagination.limit;
      const limitClause = `LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      queryParams.push(pagination.limit, offset);

      // 사용자 목록 조회
      const usersQuery = `
        SELECT u.*, 
               array_agg(json_build_object(
                 'id', up.id,
                 'resource', up.resource,
                 'action', up.action,
                 'conditions', up.conditions,
                 'description', up.description
               )) as permissions
        FROM users u
        LEFT JOIN user_permissions up ON u.id = up.user_id
        WHERE ${whereClause}
        GROUP BY u.id
        ${orderClause}
        ${limitClause}
      `;

      const usersResult = await pgPool.query(usersQuery, queryParams);

      const users = usersResult.rows.map((user: any) => ({
        ...user,
        permissions: user.permissions.filter((p: any) => p.id !== null),
      }));

      const totalPages = Math.ceil(total / pagination.limit);

      metricsCollector.recordDatabaseOperation(
        'get_users',
        Date.now() - startTime
      );

      return {
        data: users,
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
      logger.error('Failed to get users', {
        error,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 사용자 업데이트
  async updateUser(
    userId: string,
    request: UpdateUserRequest,
    context: TenantContext
  ): Promise<User> {
    const startTime = Date.now();

    try {
      const result = await withTransaction(async client => {
        // 기존 사용자 정보 조회
        const existingUser = await this.getUserById(userId, context);
        if (!existingUser) {
          throw new Error('User not found');
        }

        // 업데이트할 필드 구성
        const updateFields: string[] = [];
        const updateValues: any[] = [];
        let paramIndex = 1;

        if (request.firstName !== undefined) {
          updateFields.push(`first_name = $${paramIndex}`);
          updateValues.push(request.firstName);
          paramIndex++;
        }

        if (request.lastName !== undefined) {
          updateFields.push(`last_name = $${paramIndex}`);
          updateValues.push(request.lastName);
          paramIndex++;
        }

        if (request.phoneNumber !== undefined) {
          updateFields.push(`phone_number = $${paramIndex}`);
          updateValues.push(request.phoneNumber);
          paramIndex++;
        }

        if (request.dateOfBirth !== undefined) {
          updateFields.push(`date_of_birth = $${paramIndex}`);
          updateValues.push(request.dateOfBirth);
          paramIndex++;
        }

        if (request.status !== undefined) {
          updateFields.push(`status = $${paramIndex}`);
          updateValues.push(request.status);
          paramIndex++;
        }

        if (request.role !== undefined) {
          updateFields.push(`role = $${paramIndex}`);
          updateValues.push(request.role);
          paramIndex++;
        }

        updateFields.push(`updated_by = $${paramIndex}`);
        updateValues.push(context.userId);
        paramIndex++;

        updateFields.push(`updated_at = NOW()`);

        const updateQuery = `
          UPDATE users 
          SET ${updateFields.join(', ')}
          WHERE id = $${paramIndex} AND tenant_id = $${paramIndex + 1}
          RETURNING *
        `;

        updateValues.push(userId, context.tenantId);

        const updateResult = await client.query(updateQuery, updateValues);
        const updatedUser = updateResult.rows[0];

        // 권한 업데이트
        if (request.permissions) {
          // 기존 권한 삭제
          await client.query(
            'DELETE FROM user_permissions WHERE user_id = $1',
            [userId]
          );

          // 새 권한 추가
          if (request.permissions.length > 0) {
            const permissionQuery = `
              INSERT INTO user_permissions (user_id, resource, action, conditions, description)
              VALUES ($1, $2, $3, $4, $5)
            `;

            for (const permission of request.permissions) {
              await client.query(permissionQuery, [
                userId,
                permission.resource,
                permission.action,
                JSON.stringify(permission.conditions),
                permission.description,
              ]);
            }
          }
        }

        // 감사 로그 생성
        await this.createAuditEntry(client, {
          userId: context.userId,
          action: 'UPDATE_USER',
          resource: 'users',
          resourceId: userId,
          oldValue: existingUser,
          newValue: updatedUser,
          ipAddress: context.ipAddress || '',
          userAgent: context.userAgent || '',
          timestamp: new Date(),
        });

        return updatedUser;
      });

      metricsCollector.recordDatabaseOperation(
        'update_user',
        Date.now() - startTime
      );
      logger.info('User updated successfully', {
        userId,
        tenantId: context.tenantId,
      });

      return result;
    } catch (error) {
      logger.error('Failed to update user', {
        error,
        userId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 사용자 삭제
  async deleteUser(userId: string, context: TenantContext): Promise<void> {
    const startTime = Date.now();

    try {
      await withTransaction(async client => {
        // 기존 사용자 정보 조회
        const existingUser = await this.getUserById(userId, context);
        if (!existingUser) {
          throw new Error('User not found');
        }

        // 사용자 삭제 (소프트 삭제)
        await client.query(
          'UPDATE users SET status = $1, updated_by = $2, updated_at = NOW() WHERE id = $3 AND tenant_id = $4',
          [UserStatus.INACTIVE, context.userId, userId, context.tenantId]
        );

        // 권한 삭제
        await client.query('DELETE FROM user_permissions WHERE user_id = $1', [
          userId,
        ]);

        // 세션 삭제
        await client.query(
          'UPDATE sessions SET is_active = false WHERE user_id = $1',
          [userId]
        );

        // 감사 로그 생성
        await this.createAuditEntry(client, {
          userId: context.userId,
          action: 'DELETE_USER',
          resource: 'users',
          resourceId: userId,
          oldValue: existingUser,
          ipAddress: context.ipAddress || '',
          userAgent: context.userAgent || '',
          timestamp: new Date(),
        });
      });

      metricsCollector.recordDatabaseOperation(
        'delete_user',
        Date.now() - startTime
      );
      logger.info('User deleted successfully', {
        userId,
        tenantId: context.tenantId,
      });
    } catch (error) {
      logger.error('Failed to delete user', {
        error,
        userId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 로그인 처리
  async authenticateUser(
    request: LoginRequest,
    context: TenantContext
  ): Promise<User | null> {
    const startTime = Date.now();

    try {
      const user = await this.getUserByEmail(request.email, context);
      if (!user) {
        return null;
      }

      // 계정 잠금 확인
      if (
        user.status === UserStatus.LOCKED &&
        user.lockedUntil &&
        user.lockedUntil > new Date()
      ) {
        throw new Error('Account is locked');
      }

      // 비밀번호 검증 (실제 구현에서는 bcrypt 사용)
      const isValidPassword = await this.verifyPassword(
        request.password,
        user.passwordHash
      );
      if (!isValidPassword) {
        // 로그인 실패 횟수 증가
        await this.incrementLoginAttempts(user.id, context);
        return null;
      }

      // 2FA 검증
      if (user.twoFactorEnabled) {
        if (!request.twoFactorCode) {
          throw new Error('Two-factor authentication code required');
        }

        const isValid2FA = await this.verifyTwoFactorCode(
          user.id,
          request.twoFactorCode
        );
        if (!isValid2FA) {
          throw new Error('Invalid two-factor authentication code');
        }
      }

      // 로그인 성공 시 계정 잠금 해제
      await this.resetLoginAttempts(user.id, context);

      // 마지막 로그인 시간 업데이트
      await pgPool.query(
        'UPDATE users SET last_login_at = NOW() WHERE id = $1',
        [user.id]
      );

      metricsCollector.recordDatabaseOperation(
        'authenticate_user',
        Date.now() - startTime
      );
      logger.info('User authenticated successfully', {
        userId: user.id,
        tenantId: context.tenantId,
      });

      return user;
    } catch (error) {
      logger.error('Failed to authenticate user', {
        error,
        email: request.email,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 세션 생성
  async createSession(
    userId: string,
    token: string,
    refreshToken: string,
    deviceInfo: any,
    context: TenantContext
  ): Promise<Session> {
    const startTime = Date.now();

    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24시간 후 만료

      const query = `
        INSERT INTO sessions (
          user_id, tenant_id, token, refresh_token, ip_address, 
          user_agent, device_info, expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      const result = await pgPool.query(query, [
        userId,
        context.tenantId,
        token,
        refreshToken,
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        JSON.stringify(deviceInfo),
        expiresAt,
      ]);

      metricsCollector.recordDatabaseOperation(
        'create_session',
        Date.now() - startTime
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Failed to create session', {
        error,
        userId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 세션 조회
  async getSession(
    sessionId: string,
    context: TenantContext
  ): Promise<Session | null> {
    const startTime = Date.now();

    try {
      const query = `
        SELECT * FROM sessions 
        WHERE id = $1 AND tenant_id = $2 AND is_active = true AND expires_at > NOW()
      `;

      const result = await pgPool.query(query, [sessionId, context.tenantId]);

      if (result.rows.length === 0) {
        return null;
      }

      metricsCollector.recordDatabaseOperation(
        'get_session',
        Date.now() - startTime
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Failed to get session', {
        error,
        sessionId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 세션 삭제
  async deleteSession(
    sessionId: string,
    context: TenantContext
  ): Promise<void> {
    const startTime = Date.now();

    try {
      await pgPool.query(
        'UPDATE sessions SET is_active = false WHERE id = $1 AND tenant_id = $2',
        [sessionId, context.tenantId]
      );

      metricsCollector.recordDatabaseOperation(
        'delete_session',
        Date.now() - startTime
      );
      logger.info('Session deleted successfully', {
        sessionId,
        tenantId: context.tenantId,
      });
    } catch (error) {
      logger.error('Failed to delete session', {
        error,
        sessionId,
        tenantId: context.tenantId,
      });
      throw error;
    }
  }

  // 감사 로그 생성
  private async createAuditEntry(
    client: any,
    auditData: {
      userId: string;
      action: string;
      resource: string;
      resourceId?: string;
      oldValue?: any;
      newValue?: any;
      ipAddress: string;
      userAgent: string;
      timestamp: Date;
    }
  ): Promise<void> {
    const query = `
      INSERT INTO audit_logs (
        user_id, action, resource, resource_id, old_value, new_value, 
        ip_address, user_agent, timestamp
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    await client.query(query, [
      auditData.userId,
      auditData.action,
      auditData.resource,
      auditData.resourceId,
      auditData.oldValue ? JSON.stringify(auditData.oldValue) : null,
      auditData.newValue ? JSON.stringify(auditData.newValue) : null,
      auditData.ipAddress,
      auditData.userAgent,
      auditData.timestamp,
    ]);
  }

  // 비밀번호 검증 (실제 구현에서는 bcrypt 사용)
  private async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    // 실제 구현에서는 bcrypt.compare 사용
    return password === 'testpassword'; // 임시 구현
  }

  // 2FA 코드 검증
  private async verifyTwoFactorCode(
    userId: string,
    code: string
  ): Promise<boolean> {
    // 실제 구현에서는 TOTP 라이브러리 사용
    return code === '123456'; // 임시 구현
  }

  // 로그인 실패 횟수 증가
  private async incrementLoginAttempts(
    userId: string,
    context: TenantContext
  ): Promise<void> {
    await pgPool.query(
      'UPDATE users SET login_attempts = login_attempts + 1 WHERE id = $1',
      [userId]
    );

    // 5회 실패 시 계정 잠금
    const user = await this.getUserById(userId, context);
    if (user && user.loginAttempts >= 5) {
      const lockedUntil = new Date();
      lockedUntil.setMinutes(lockedUntil.getMinutes() + 30); // 30분 잠금

      await pgPool.query(
        'UPDATE users SET status = $1, locked_until = $2 WHERE id = $3',
        [UserStatus.LOCKED, lockedUntil, userId]
      );
    }
  }

  // 로그인 실패 횟수 초기화
  private async resetLoginAttempts(
    userId: string,
    context: TenantContext
  ): Promise<void> {
    await pgPool.query(
      'UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = $1',
      [userId]
    );
  }
}
