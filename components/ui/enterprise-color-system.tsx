/**
 * 엔터프라이즈급 색상 시스템 - FamilyOffice S 프리미엄 플랫폼
 */

import { cn } from '@/lib/utils'

// 엔터프라이즈급 색상 팔레트
export const enterpriseColors = {
  // 프리미엄 골드 - 신뢰성과 성공
  premium: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  // 딥 네이비 - 전문성과 안정성
  navy: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  // 에메랄드 럭셔리 - 성과 지표
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  // 크림슨 - 리스크 및 경고
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  // 인디고 - 데이터 시각화
  data: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  }
}

// 색상 쉐이드 타입 정의
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

// 엔터프라이즈급 색상 적용 유틸리티
export const getEnterpriseColor = (color: keyof typeof enterpriseColors, shade: ColorShade) => {
  return enterpriseColors[color][shade]
}

// 프리미엄 그라데이션 클래스
export const premiumGradients = {
  primary: 'bg-gradient-to-br from-premium-500 to-premium-600',
  secondary: 'bg-gradient-to-br from-navy-600 to-navy-700',
  success: 'bg-gradient-to-br from-success-500 to-success-600',
  danger: 'bg-gradient-to-br from-danger-500 to-danger-600',
  data: 'bg-gradient-to-br from-data-500 to-data-600',
}

// 엔터프라이즈급 색상 적용 컴포넌트
interface EnterpriseColorProps {
  color?: keyof typeof enterpriseColors
  shade?: ColorShade
  className?: string
  children: React.ReactNode
}

export function EnterpriseColor({ 
  color = 'premium', 
  shade = '500', 
  className, 
  children 
}: EnterpriseColorProps) {
  return (
    <div 
      className={cn(
        `text-${color}-${shade}`,
        className
      )}
    >
      {children}
    </div>
  )
} 