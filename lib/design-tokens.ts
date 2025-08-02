// Design Token System for FamilyOffice
// 한국 시장에 최적화된 디자인 토큰 시스템

export const designTokens = {
  colors: {
    // Enhanced brand colors
    brand: {
      navy: '#1e3a8a',
      bronze: '#cd7f32',
      forest: '#22c55e',
      gold: '#f59e0b',
      silver: '#94a3b8'
    },
    financial: {
      positive: '#10b981',
      negative: '#ef4444',
      neutral: '#6b7280',
      warning: '#f59e0b',
      info: '#3b82f6'
    },
    semantic: {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  
  typography: {
    fontFamily: {
      financial: ['SF Pro Display', 'Pretendard Variable', 'system-ui'],
      display: ['Pretendard Variable', 'system-ui'],
      body: ['Pretendard', 'system-ui'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  
  spacing: {
    component: {
      cardPadding: '1.5rem',
      sectionGap: '2rem',
      containerPadding: '1rem',
      buttonPadding: '0.75rem 1.5rem'
    },
    layout: {
      pageMargin: '1rem',
      sectionMargin: '2rem',
      containerMaxWidth: '1200px'
    }
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
}

// Utility functions for design tokens
export const getColor = (path: string) => {
  const keys = path.split('.')
  let value: any = designTokens.colors
  
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) break
  }
  
  return value
}

export const getSpacing = (path: string) => {
  const keys = path.split('.')
  let value: any = designTokens.spacing
  
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) break
  }
  
  return value
}

export const getTypography = (path: string) => {
  const keys = path.split('.')
  let value: any = designTokens.typography
  
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) break
  }
  
  return value
}

// Korean market specific utilities
export const koreanUtils = {
  // Korean date formatting
  formatKoreanDate: (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  },
  
  // Korean currency formatting
  formatKoreanCurrency: (amount: number): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  },
  
  // Korean phone number formatting
  formatKoreanPhone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`
    }
    return phone
  }
}

// Responsive breakpoints for Korean market (mobile-first)
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
}

export default designTokens 