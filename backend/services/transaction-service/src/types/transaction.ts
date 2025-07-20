// 트랜잭션 기본 타입
export interface Transaction {
  id: string;
  tenantId: string;
  portfolioId: string;
  transactionType: TransactionType;
  symbol: string;
  assetName: string;
  assetType: AssetType;
  quantity: number;
  price: number;
  totalAmount: number;
  currency: string;
  transactionDate: Date;
  settlementDate: Date;
  status: TransactionStatus;
  executionVenue?: string;
  broker?: string;
  commission: number;
  fees: number;
  netAmount: number;
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  auditTrail: AuditEntry[];
}

// 트랜잭션 타입 열거형
export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
  DIVIDEND = 'dividend',
  INTEREST = 'interest',
  DISTRIBUTION = 'distribution',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER_IN = 'transfer_in',
  TRANSFER_OUT = 'transfer_out',
  CORPORATE_ACTION = 'corporate_action',
  FEE = 'fee',
  ADJUSTMENT = 'adjustment',
}

// 트랜잭션 상태 열거형
export enum TransactionStatus {
  PENDING = 'pending',
  EXECUTED = 'executed',
  SETTLED = 'settled',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  PARTIALLY_FILLED = 'partially_filled',
}

// 자산 타입 열거형
export enum AssetType {
  STOCK = 'stock',
  BOND = 'bond',
  ETF = 'etf',
  MUTUAL_FUND = 'mutual_fund',
  REAL_ESTATE = 'real_estate',
  PRIVATE_EQUITY = 'private_equity',
  HEDGE_FUND = 'hedge_fund',
  CASH = 'cash',
  COMMODITY = 'commodity',
  CRYPTOCURRENCY = 'cryptocurrency',
  OTHER = 'other',
}

// 감사 로그 엔트리
export interface AuditEntry {
  id: string;
  action: string;
  field: string;
  oldValue?: any;
  newValue?: any;
  timestamp: Date;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
}

// 트랜잭션 생성 요청
export interface CreateTransactionRequest {
  portfolioId: string;
  transactionType: TransactionType;
  symbol: string;
  assetName: string;
  assetType: AssetType;
  quantity: number;
  price: number;
  currency: string;
  transactionDate: Date;
  settlementDate?: Date;
  executionVenue?: string;
  broker?: string;
  commission?: number;
  fees?: number;
  notes?: string;
  tags?: string[];
}

// 트랜잭션 업데이트 요청
export interface UpdateTransactionRequest {
  status?: TransactionStatus;
  price?: number;
  quantity?: number;
  totalAmount?: number;
  commission?: number;
  fees?: number;
  netAmount?: number;
  notes?: string;
  tags?: string[];
  settlementDate?: Date;
}

// 트랜잭션 필터
export interface TransactionFilter {
  portfolioId?: string;
  transactionType?: TransactionType[];
  status?: TransactionStatus[];
  symbol?: string;
  assetType?: AssetType[];
  dateFrom?: Date;
  dateTo?: Date;
  amountFrom?: number;
  amountTo?: number;
  tags?: string[];
}

// 트랜잭션 요약
export interface TransactionSummary {
  totalTransactions: number;
  totalBuyAmount: number;
  totalSellAmount: number;
  totalDividends: number;
  totalInterest: number;
  totalFees: number;
  totalCommissions: number;
  netCashFlow: number;
  averageTransactionSize: number;
  largestTransaction: Transaction;
  mostActiveSymbol: {
    symbol: string;
    transactionCount: number;
    totalAmount: number;
  };
}

// 정산 정보
export interface SettlementInfo {
  transactionId: string;
  settlementDate: Date;
  settlementAmount: number;
  settlementCurrency: string;
  custodian: string;
  accountNumber: string;
  referenceNumber: string;
  status: SettlementStatus;
  notes?: string;
}

// 정산 상태
export enum SettlementStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// 기업 행사
export interface CorporateAction {
  id: string;
  transactionId: string;
  actionType: CorporateActionType;
  description: string;
  recordDate: Date;
  exDate: Date;
  paymentDate?: Date;
  ratio?: string; // 예: "2:1" for stock split
  amount?: number;
  currency?: string;
  status: CorporateActionStatus;
}

// 기업 행사 타입
export enum CorporateActionType {
  STOCK_SPLIT = 'stock_split',
  STOCK_DIVIDEND = 'stock_dividend',
  CASH_DIVIDEND = 'cash_dividend',
  RIGHTS_OFFERING = 'rights_offering',
  MERGER = 'merger',
  SPIN_OFF = 'spin_off',
  TENDER_OFFER = 'tender_offer',
  REVERSE_SPLIT = 'reverse_split',
}

// 기업 행사 상태
export enum CorporateActionStatus {
  ANNOUNCED = 'announced',
  RECORD_DATE_PASSED = 'record_date_passed',
  EX_DATE_PASSED = 'ex_date_passed',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

// 페이지네이션 파라미터
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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

// 테넌트 컨텍스트
export interface TenantContext {
  tenantId: string;
  userId: string;
} 