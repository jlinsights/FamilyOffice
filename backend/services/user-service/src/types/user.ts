// 사용자 기본 타입
export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  profileImage?: string;
  status: UserStatus;
  role: UserRole;
  permissions: Permission[];
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  auditTrail: AuditEntry[];
}

// 사용자 상태 열거형
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  LOCKED = 'locked',
}

// 사용자 역할 열거형
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  FAMILY_ADMIN = 'family_admin',
  FAMILY_MEMBER = 'family_member',
  WEALTH_MANAGER = 'wealth_manager',
  ADVISOR = 'advisor',
  ACCOUNTANT = 'accountant',
  VIEWER = 'viewer',
}

// 권한 인터페이스
export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
  description?: string;
}

// 감사 항목 인터페이스
export interface AuditEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// 가족 구성원 타입
export interface FamilyMember extends User {
  familyId: string;
  relationship: FamilyRelationship;
  inheritanceShare?: number;
  isBeneficiary: boolean;
  beneficiaryShare?: number;
  trustAccess: boolean;
  trustAccessLevel?: TrustAccessLevel;
}

// 가족 관계 열거형
export enum FamilyRelationship {
  SPOUSE = 'spouse',
  CHILD = 'child',
  PARENT = 'parent',
  SIBLING = 'sibling',
  GRANDPARENT = 'grandparent',
  GRANDCHILD = 'grandchild',
  OTHER = 'other',
}

// 신뢰 접근 레벨 열거형
export enum TrustAccessLevel {
  FULL = 'full',
  LIMITED = 'limited',
  READ_ONLY = 'read_only',
  NONE = 'none',
}

// 가족 그룹 타입
export interface FamilyGroup {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  primaryContactId: string;
  members: FamilyMember[];
  advisors: User[];
  trusts: Trust[];
  createdAt: Date;
  updatedAt: Date;
}

// 신뢰 타입
export interface Trust {
  id: string;
  familyId: string;
  name: string;
  type: TrustType;
  trusteeId: string;
  beneficiaries: FamilyMember[];
  assets: TrustAsset[];
  createdAt: Date;
  updatedAt: Date;
}

// 신뢰 타입 열거형
export enum TrustType {
  REVOCABLE = 'revocable',
  IRREVOCABLE = 'irrevocable',
  CHARITABLE = 'charitable',
  SPECIAL_NEEDS = 'special_needs',
  GENERATION_SKIPPING = 'generation_skipping',
}

// 신뢰 자산 타입
export interface TrustAsset {
  id: string;
  trustId: string;
  assetId: string;
  assetType: AssetType;
  value: number;
  ownershipPercentage: number;
  acquisitionDate: Date;
  notes?: string;
}

// 자산 타입 열거형
export enum AssetType {
  STOCK = 'stock',
  BOND = 'bond',
  REAL_ESTATE = 'real_estate',
  PRIVATE_EQUITY = 'private_equity',
  CASH = 'cash',
  ALTERNATIVE = 'alternative',
}

// 세션 타입
export interface Session {
  id: string;
  userId: string;
  tenantId: string;
  token: string;
  refreshToken: string;
  ipAddress: string;
  userAgent: string;
  deviceInfo?: DeviceInfo;
  lastActivity: Date;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
}

// 디바이스 정보 타입
export interface DeviceInfo {
  deviceId: string;
  deviceType: string;
  browser: string;
  os: string;
  location?: string;
}

// API 요청 타입
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  role: UserRole;
  permissions?: Permission[];
  tenantId: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  status?: UserStatus;
  role?: UserRole;
  permissions?: Permission[];
}

export interface CreateFamilyMemberRequest extends CreateUserRequest {
  familyId: string;
  relationship: FamilyRelationship;
  inheritanceShare?: number;
  isBeneficiary: boolean;
  beneficiaryShare?: number;
  trustAccess: boolean;
  trustAccessLevel?: TrustAccessLevel;
}

export interface LoginRequest {
  email: string;
  password: string;
  twoFactorCode?: string;
  deviceInfo?: DeviceInfo;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetToken: string;
  newPassword: string;
}

export interface EnableTwoFactorRequest {
  userId: string;
  secret: string;
  code: string;
}

export interface VerifyTwoFactorRequest {
  userId: string;
  code: string;
}

// API 응답 타입
export interface LoginResponse {
  user: User;
  session: Session;
  permissions: Permission[];
  familyGroups?: FamilyGroup[];
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FamilyGroupResponse {
  familyGroup: FamilyGroup;
  members: FamilyMember[];
  advisors: User[];
  trusts: Trust[];
}

// 필터링 및 정렬 타입
export interface UserFilter {
  status?: UserStatus;
  role?: UserRole;
  familyId?: string;
  search?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

export interface UserSort {
  field: 'createdAt' | 'lastName' | 'email' | 'status' | 'role';
  direction: 'asc' | 'desc';
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: UserSort;
  filter?: UserFilter;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// 테넌트 컨텍스트 타입
export interface TenantContext {
  tenantId: string;
  userId: string;
  userRole: UserRole;
  permissions: Permission[];
  sessionId: string;
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
} 