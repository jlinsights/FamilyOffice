/**
 * 자산 관리 시스템 TypeScript 타입 정의
 */

// 기본 자산 타입
export type AssetType = 'stocks' | 'bonds' | 'realEstate' | 'alternatives' | 'cash'

// 위험도 레벨
export type RiskLevel = 'conservative' | 'moderate' | 'aggressive'

// 시장 심리
export type MarketSentiment = 'bullish' | 'bearish' | 'neutral'

// 투자 전망
export type InvestmentOutlook = 'positive' | 'negative' | 'neutral'

// 정책 영향도
export type PolicyImpact = 'positive' | 'negative' | 'neutral'

// 정책 카테고리
export type PolicyCategory = 'tax' | 'regulation' | 'monetary' | 'fiscal'

// 위험 알림 타입
export type RiskAlertType = 'high' | 'medium' | 'low'

// 포트폴리오 데이터 인터페이스
export interface PortfolioData {
  totalValue: number
  dayChange: number
  dayChangePercent: number
  allocations: {
    stocks: number
    bonds: number
    realEstate: number
    alternatives: number
    cash: number
  }
  topHoldings: Array<{
    symbol: string
    name: string
    value: number
    weight: number
    change: number
  }>
  riskMetrics: RiskMetrics
}

// 위험 메트릭 인터페이스
export interface RiskMetrics {
  volatility: number
  var95: number // Value at Risk (95%)
  sharpeRatio: number
  beta: number
  maxDrawdown: number
  correlationToMarket: number
  concentrationRisk: number
}

// 위험 알림 인터페이스
export interface RiskAlert {
  type: RiskAlertType
  title: string
  description: string
  recommendation: string
}

// 자산군별 데이터 인터페이스
export interface AssetClassData {
  type: AssetType
  totalValue: number
  allocation: number
  targetAllocation: number
  dayChange: number
  dayChangePercent: number
  ytdReturn: number
  holdings: Array<{
    name: string
    symbol?: string
    value: number
    weight: number
    change: number
  }>
  metrics: {
    count: number
    avgReturn?: number
    volatility?: number
    yield?: number
  }
}

// 포트폴리오 요약 데이터 인터페이스
export interface PortfolioSummaryData {
  totalValue: number
  dayChange: number
  dayChangePercent: number
  monthlyReturn: number
  yearlyReturn: number
  riskLevel: RiskLevel
  topPerformer: {
    name: string
    return: number
  }
  rebalanceAlert: boolean
}

// 시장 심리 데이터 인터페이스
export interface MarketSentimentData {
  kospi: { value: number; change: number }
  kosdaq: { value: number; change: number }
  sentiment: MarketSentiment
  foreignInvestment: number
  institutionalFlow: number
}

// 정책 업데이트 인터페이스
export interface PolicyUpdate {
  title: string
  category: PolicyCategory
  impact: PolicyImpact
  summary: string
  date: string
}

// 업종 인사이트 인터페이스
export interface IndustryInsight {
  sector: string
  performance: number
  outlook: InvestmentOutlook
  keyFactors: string[]
  recommendedStocks: string[]
}

// 자산 관리 대시보드 컴포넌트 Props
export interface AssetManagementDashboardProps {
  clientId?: string
  className?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

// 자산군 카드 컴포넌트 Props
export interface AssetClassCardProps {
  data: AssetClassData
  className?: string
  onViewDetails?: () => void
  onRebalance?: () => void
}

// 포트폴리오 요약 위젯 Props
export interface PortfolioSummaryWidgetProps {
  clientId?: string
  className?: string
  onViewFull?: () => void
}

// 위험 분석 패널 Props
export interface RiskAnalysisPanelProps {
  metrics: RiskMetrics
  className?: string
  onOptimize?: () => void
  onViewDetails?: () => void
}

// 한국 시장 인사이트 Props
export interface KoreanMarketInsightProps {
  className?: string
  autoRefresh?: boolean
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

// 포트폴리오 성과 데이터
export interface PerformanceData {
  daily: number
  weekly: number
  monthly: number
  quarterly: number
  yearly: number
  inception: number
}

// 벤치마크 비교 데이터
export interface BenchmarkComparison {
  kospi: number
  sp500: number
  bondIndex: number
  realEstateIndex: number
}

// 리밸런싱 제안 데이터
export interface RebalancingProposal {
  currentAllocation: Record<AssetType, number>
  targetAllocation: Record<AssetType, number>
  recommendations: Array<{
    assetType: AssetType
    action: 'buy' | 'sell' | 'hold'
    amount: number
    reason: string
  }>
  expectedImpact: {
    riskReduction: number
    expectedReturn: number
  }
}

// 투자 제안 데이터
export interface InvestmentRecommendation {
  type: 'buy' | 'sell' | 'hold'
  symbol: string
  name: string
  reason: string
  targetPrice?: number
  timeHorizon: 'short' | 'medium' | 'long'
  riskLevel: RiskLevel
  confidence: number
}

// 시장 이벤트 데이터
export interface MarketEvent {
  type: 'earnings' | 'economic' | 'policy' | 'technical'
  title: string
  description: string
  date: string
  impact: PolicyImpact
  affectedAssets: string[]
}

// 알림 설정 데이터
export interface NotificationSettings {
  priceAlerts: boolean
  portfolioAlerts: boolean
  marketAlerts: boolean
  policyAlerts: boolean
  thresholds: {
    dailyLoss: number
    portfolioValue: number
    concentrationRisk: number
  }
}

// 대시보드 설정 데이터
export interface DashboardSettings {
  layout: 'compact' | 'detailed' | 'minimal'
  refreshInterval: number
  defaultTab: string
  visibleMetrics: string[]
  theme: 'light' | 'dark' | 'auto'
}

// 고객 프로필 데이터
export interface ClientProfile {
  id: string
  name: string
  email: string
  riskTolerance: RiskLevel
  investmentGoals: string[]
  timeHorizon: number
  totalAssets: number
  monthlyIncome: number
  investmentExperience: 'beginner' | 'intermediate' | 'advanced'
  preferences: {
    esgFocus: boolean
    dividendFocus: boolean
    growthFocus: boolean
    internationalExposure: boolean
  }
}

// 세션 데이터
export interface DashboardSession {
  userId: string
  sessionId: string
  lastAccess: Date
  settings: DashboardSettings
  notifications: NotificationSettings
  bookmarks: string[]
  recentActivities: Array<{
    type: string
    description: string
    timestamp: Date
  }>
}