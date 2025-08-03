// 통합 기본 타입
export interface Integration {
  id: string;
  tenantId: string;
  name: string;
  type: IntegrationType;
  provider: string;
  status: IntegrationStatus;
  config: IntegrationConfig;
  credentials: IntegrationCredentials;
  lastSyncAt?: Date;
  nextSyncAt?: Date;
  syncInterval: number; // 초 단위
  retryCount: number;
  maxRetries: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  auditTrail: AuditEntry[];
}

// 통합 타입 열거형
export enum IntegrationType {
  CUSTODY_BANK = 'custody_bank',
  MARKET_DATA = 'market_data',
  ACCOUNTING_SYSTEM = 'accounting_system',
  TRADING_PLATFORM = 'trading_platform',
  DOCUMENT_MANAGEMENT = 'document_management',
  CRM_SYSTEM = 'crm_system',
  EMAIL_SYSTEM = 'email_system',
  CALENDAR_SYSTEM = 'calendar_system',
  NEWS_FEED = 'news_feed',
  RESEARCH_PLATFORM = 'research_platform',
  COMPLIANCE_SYSTEM = 'compliance_system',
  TAX_SYSTEM = 'tax_system',
  INSURANCE_SYSTEM = 'insurance_system',
  REAL_ESTATE_SYSTEM = 'real_estate_system',
  PRIVATE_EQUITY_SYSTEM = 'private_equity_system',
}

// 통합 상태 열거형
export enum IntegrationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  SYNCING = 'syncing',
  PENDING = 'pending',
  DISCONNECTED = 'disconnected',
}

// 통합 설정
export interface IntegrationConfig {
  baseUrl: string;
  timeout: number;
  retryDelay: number;
  batchSize: number;
  syncMode: SyncMode;
  dataMapping: DataMapping;
  webhookConfig?: WebhookConfig;
  apiConfig?: ApiConfig;
  ftpConfig?: FtpConfig;
  sftpConfig?: SftpConfig;
  databaseConfig?: DatabaseConfig;
}

// 동기화 모드
export enum SyncMode {
  REAL_TIME = 'real_time',
  SCHEDULED = 'scheduled',
  MANUAL = 'manual',
  EVENT_DRIVEN = 'event_driven',
}

// 데이터 매핑
export interface DataMapping {
  entities: EntityMapping[];
  transformations: Transformation[];
  validations: Validation[];
}

// 엔티티 매핑
export interface EntityMapping {
  sourceEntity: string;
  targetEntity: string;
  fieldMappings: FieldMapping[];
  filters?: Filter[];
  transformations?: Transformation[];
}

// 필드 매핑
export interface FieldMapping {
  sourceField: string;
  targetField: string;
  dataType: string;
  required: boolean;
  defaultValue?: any;
  transformation?: string;
}

// 필터
export interface Filter {
  field: string;
  operator: FilterOperator;
  value: any;
}

// 필터 연산자
export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  IN = 'in',
  NOT_IN = 'not_in',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null',
}

// 변환
export interface Transformation {
  name: string;
  type: TransformationType;
  config: any;
}

// 변환 타입
export enum TransformationType {
  FORMAT_DATE = 'format_date',
  CONVERT_CURRENCY = 'convert_currency',
  CALCULATE_FIELD = 'calculate_field',
  MERGE_FIELDS = 'merge_fields',
  SPLIT_FIELD = 'split_field',
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
  TRIM = 'trim',
  REPLACE = 'replace',
  REGEX_REPLACE = 'regex_replace',
  CUSTOM_FUNCTION = 'custom_function',
}

// 검증
export interface Validation {
  name: string;
  type: ValidationType;
  config: any;
  errorMessage: string;
}

// 검증 타입
export enum ValidationType {
  REQUIRED = 'required',
  EMAIL = 'email',
  PHONE = 'phone',
  DATE = 'date',
  NUMBER = 'number',
  STRING_LENGTH = 'string_length',
  REGEX = 'regex',
  CUSTOM = 'custom',
}

// 웹훅 설정
export interface WebhookConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  events: string[];
  retryCount: number;
  timeout: number;
}

// API 설정
export interface ApiConfig {
  authType: AuthType;
  apiKey?: string;
  oauthConfig?: OAuthConfig;
  certificateConfig?: CertificateConfig;
  rateLimitConfig?: RateLimitConfig;
}

// 인증 타입
export enum AuthType {
  NONE = 'none',
  API_KEY = 'api_key',
  BASIC_AUTH = 'basic_auth',
  OAUTH2 = 'oauth2',
  CERTIFICATE = 'certificate',
  JWT = 'jwt',
}

// OAuth 설정
export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  scope: string[];
  redirectUri: string;
}

// 인증서 설정
export interface CertificateConfig {
  certificatePath: string;
  privateKeyPath: string;
  caPath?: string;
  passphrase?: string;
}

// 속도 제한 설정
export interface RateLimitConfig {
  requestsPerSecond: number;
  requestsPerMinute: number;
  requestsPerHour: number;
  burstSize: number;
}

// FTP 설정
export interface FtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
  passive: boolean;
}

// SFTP 설정
export interface SftpConfig {
  host: string;
  port: number;
  username: string;
  privateKeyPath: string;
  passphrase?: string;
}

// 데이터베이스 설정
export interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
  connectionPool: ConnectionPoolConfig;
}

// 데이터베이스 타입
export enum DatabaseType {
  POSTGRESQL = 'postgresql',
  MYSQL = 'mysql',
  ORACLE = 'oracle',
  SQLSERVER = 'sqlserver',
  MONGODB = 'mongodb',
}

// 연결 풀 설정
export interface ConnectionPoolConfig {
  min: number;
  max: number;
  acquireTimeout: number;
  idleTimeout: number;
}

// 통합 자격 증명
export interface IntegrationCredentials {
  type: CredentialType;
  encrypted: boolean;
  data: Record<string, any>;
  expiresAt?: Date;
}

// 자격 증명 타입
export enum CredentialType {
  API_KEY = 'api_key',
  USERNAME_PASSWORD = 'username_password',
  OAUTH_TOKEN = 'oauth_token',
  CERTIFICATE = 'certificate',
  JWT_TOKEN = 'jwt_token',
}

// 감사 항목
export interface AuditEntry {
  id: string;
  timestamp: Date;
  event: string;
  userId: string;
  details: any;
  ipAddress?: string;
  userAgent?: string;
}

// 통합 생성 요청
export interface CreateIntegrationRequest {
  name: string;
  type: IntegrationType;
  provider: string;
  config: IntegrationConfig;
  credentials: IntegrationCredentials;
  syncInterval: number;
  maxRetries: number;
}

// 통합 업데이트 요청
export interface UpdateIntegrationRequest {
  name?: string;
  status?: IntegrationStatus;
  config?: Partial<IntegrationConfig>;
  credentials?: IntegrationCredentials;
  syncInterval?: number;
  maxRetries?: number;
}

// 동기화 작업
export interface SyncJob {
  id: string;
  integrationId: string;
  tenantId: string;
  status: SyncJobStatus;
  type: SyncJobType;
  startedAt: Date;
  completedAt?: Date;
  progress: number;
  totalRecords: number;
  processedRecords: number;
  errorRecords: number;
  errors: SyncError[];
  config: SyncConfig;
}

// 동기화 작업 상태
export enum SyncJobStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
}

// 동기화 작업 타입
export enum SyncJobType {
  FULL_SYNC = 'full_sync',
  INCREMENTAL_SYNC = 'incremental_sync',
  DELTA_SYNC = 'delta_sync',
  BACKFILL_SYNC = 'backfill_sync',
  REAL_TIME_SYNC = 'real_time_sync',
}

// 동기화 오류
export interface SyncError {
  recordId: string;
  error: string;
  timestamp: Date;
  retryCount: number;
}

// 동기화 설정
export interface SyncConfig {
  entities: string[];
  filters?: Filter[];
  transformations?: Transformation[];
  batchSize: number;
  timeout: number;
  retryCount: number;
}

// 웹훅 이벤트
export interface WebhookEvent {
  id: string;
  integrationId: string;
  tenantId: string;
  eventType: string;
  payload: any;
  receivedAt: Date;
  processedAt?: Date;
  status: WebhookEventStatus;
  retryCount: number;
  error?: string;
}

// 웹훅 이벤트 상태
export enum WebhookEventStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  RETRY = 'retry',
}

// 데이터 매핑 템플릿
export interface DataMappingTemplate {
  id: string;
  name: string;
  description: string;
  integrationType: IntegrationType;
  provider: string;
  mapping: DataMapping;
  version: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 통합 필터
export interface IntegrationFilter {
  type?: IntegrationType;
  status?: IntegrationStatus;
  provider?: string;
  search?: string;
}

// 통합 정렬
export interface IntegrationSort {
  field: 'name' | 'type' | 'status' | 'provider' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
}

// 페이지네이션 파라미터
export interface PaginationParams {
  page: number;
  limit: number;
}

// 페이지네이션 응답
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

// 통합 테스트 결과
export interface IntegrationTestResult {
  success: boolean;
  connectionTest: ConnectionTestResult;
  authenticationTest: AuthenticationTestResult;
  dataAccessTest: DataAccessTestResult;
  error?: string;
}

// 연결 테스트 결과
export interface ConnectionTestResult {
  success: boolean;
  responseTime: number;
  error?: string;
}

// 인증 테스트 결과
export interface AuthenticationTestResult {
  success: boolean;
  error?: string;
}

// 데이터 접근 테스트 결과
export interface DataAccessTestResult {
  success: boolean;
  sampleData?: any[];
  error?: string;
}

// 통합 메트릭
export interface IntegrationMetrics {
  integrationId: string;
  tenantId: string;
  syncJobsCount: number;
  successfulSyncJobsCount: number;
  failedSyncJobsCount: number;
  averageSyncDuration: number;
  lastSyncAt?: Date;
  nextSyncAt?: Date;
  webhookEventsCount: number;
  successfulWebhookEventsCount: number;
  failedWebhookEventsCount: number;
  dataRecordsCount: number;
  errorRecordsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
