declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_APP_URL: string
    
    // Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
    CLERK_SECRET_KEY: string
    
    // v0 API Key
    V0_API_KEY?: string
    NEXT_PUBLIC_V0_API_KEY?: string // 클라이언트에서 접근이 필요한 경우 (권장하지 않음)
    
    // Analytics
    NEXT_PUBLIC_GTM_ID?: string
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
    
    // Cal.com
    NEXT_PUBLIC_CALCOM_NAMESPACE?: string
    CALCOM_API_KEY?: string
    
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL?: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
    SUPABASE_SERVICE_ROLE_KEY?: string
    
    // SEO & Verification
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?: string
    NEXT_PUBLIC_NAVER_SITE_VERIFICATION?: string
    NEXT_PUBLIC_BING_SITE_VERIFICATION?: string
    
    // Channel Talk
    NEXT_PUBLIC_CHANNEL_IO_KEY?: string
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

// 브랜드 색상 타입 정의 - 새로운 색상 체계에 맞게 업데이트
export type BrandColor = 
  | 'navy-primary' 
  | 'navy-dark' 
  | 'navy-light'
  | 'bronze-primary' 
  | 'bronze-light' 
  | 'bronze-dark'
  | 'forest-primary' 
  | 'forest-light'
  | 'forest-dark'

// 서비스 타입 정의
export interface ServiceItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

// 네비게이션 아이템 타입 정의
export interface NavigationItem {
  href: string
  label: string
}

// 폼 상태 타입
export interface FormState<T = any> {
  data: T
  errors: Record<string, string>
  isLoading: boolean
  isSubmitted: boolean
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 페이지 메타데이터 타입
export interface PageMetadata {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

// 사용자 권한 타입
export type UserRole = 'admin' | 'user' | 'guest'

// 테마 타입
export type Theme = 'light' | 'dark' | 'system'

// 로딩 상태 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error' 

declare global {
  interface Window {
    Cal?: ((command: string, ...args: any[]) => any) & { ns?: Record<string, (...args: any[]) => any> }
    ChannelIO?: (command: string, options?: any) => void
  }
} 