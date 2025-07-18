// 공통 타입 정의
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// 사용자 관련 타입
export interface User extends BaseEntity {
  email: string
  name: string
  role: UserRole
  company?: string
  position?: string
  phone?: string
}

export type UserRole = 'admin' | 'user' | 'consultant'

// 서비스 관련 타입
export interface Service extends BaseEntity {
  title: string
  description: string
  category: ServiceCategory
  features: string[]
  icon: string
  isActive: boolean
}

export type ServiceCategory = 
  | 'succession-planning'
  | 'm&a-advisory'
  | 'legal-risk'
  | 'asset-optimization'
  | 'tax-optimization'
  | 'expert-network'

// 문의 관련 타입
export interface Inquiry extends BaseEntity {
  name: string
  email: string
  company?: string
  phone?: string
  service: ServiceCategory
  message: string
  status: InquiryStatus
}

export type InquiryStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled'

// 성과 지표 타입
export interface Metric {
  id: string
  label: string
  value: number
  suffix?: string
  color: string
  description?: string
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// 환경변수 타입
export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test'
  NEXT_PUBLIC_APP_URL: string
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
  CLERK_SECRET_KEY: string
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  AIRTABLE_API_KEY?: string
  AIRTABLE_BASE_ID?: string
  CAL_API_KEY?: string
  CAL_WEBHOOK_SECRET?: string
  GOOGLE_ANALYTICS_ID?: string
  GOOGLE_TAG_MANAGER_ID?: string
  NAVER_ANALYTICS_ID?: string
  KAKAO_ANALYTICS_ID?: string
}

// 컴포넌트 Props 타입
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// 애니메이션 타입
export interface AnimationProps {
  delay?: number
  duration?: number
  easing?: string
}

// SEO 타입
export interface SeoProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}


// 에러 타입
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// 로깅 타입
export interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  context?: Record<string, any>
  timestamp: Date
  userId?: string
} 