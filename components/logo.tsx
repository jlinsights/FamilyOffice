import React from 'react'

interface LogoProps {
  language?: 'en' | 'ko'
  size?: 'small' | 'default' | 'large'
  showTagline?: boolean
  align?: 'left' | 'center'
  className?: string
}

// 반응형 및 다국어 최적화 FamilyOffice 로고 컴포넌트
export const FamilyOfficeLogo: React.FC<LogoProps> = ({ 
  language = "en", 
  size = "default",
  showTagline = true,
  align = "center",
  className = ""
}) => {
  const sizes = {
    small: {
      title: "text-lg",
      icon: "h-5 w-5",
      iconText: "text-lg",
      tagline: "text-[7px]",
      spacing: "space-y-2",
      iconSpacing: "space-x-1.5"
    },
    default: {
      title: "text-xl",
      icon: "h-6 w-6", 
      iconText: "text-xl",
      tagline: "text-[8px]",
      spacing: "space-y-3",
      iconSpacing: "space-x-2"
    },
    large: {
      title: "text-2xl",
      icon: "h-8 w-8",
      iconText: "text-2xl",
      tagline: "text-[9px]",
      spacing: "space-y-4",
      iconSpacing: "space-x-2"
    }
  }

  const content = {
    en: { 
      title: "FamilyOffice", 
      tagline: "Your Trusted Financial Partner for Life" 
    },
    ko: { 
      title: "FamilyOffice", 
      tagline: "중소중견기업 전문 자산관리 파트너" 
    }
  }

  const currentSize = sizes[size]
  const themeClasses = "text-foreground"
  
  const alignmentClasses = align === "left" 
    ? "items-start" 
    : "items-center"
  
  const taglineAlignmentClasses = align === "left" 
    ? "justify-start" 
    : "justify-center"

  return (
    <header 
      className={`flex flex-col ${alignmentClasses} ${currentSize.spacing} ${className}`} 
      role="banner"
    >
      {/* 로고 컨테이너 */}
      <div className={`flex items-center ${currentSize.iconSpacing} group`}>
        <h1 className={`${currentSize.title} font-playfair font-medium ${themeClasses} tracking-tight transition-all duration-200 group-hover:tracking-normal`}>
          {content[language].title}
        </h1>
        <div 
          className={`${currentSize.icon} rounded-md bg-primary flex items-center justify-center shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:rotate-2`}
          role="img" 
          aria-label={`${content[language].title} logo`}
        >
          <span className={`text-primary-foreground font-medium ${currentSize.iconText}`} aria-hidden="true">
            S
          </span>
        </div>
      </div>
      
      {/* 태그라인 - 줄바꿈 완전 방지 */}
      {showTagline && (
        <div className={`flex ${taglineAlignmentClasses}`}>
          <p className={`${currentSize.tagline} text-muted-foreground font-light tracking-wider whitespace-nowrap select-none transition-opacity duration-200 hover:opacity-75`}>
            {content[language].tagline}
          </p>
        </div>
      )}
    </header>
  )
}

// 미니멀 버전 - 인라인 사용을 위한 컴포넌트
export const MinimalFamilyOfficeLogo: React.FC<Omit<LogoProps, 'showTagline'>> = ({ 
  size = "default",
  className = ""
}) => {
  const sizes = {
    small: {
      title: "text-base",
      icon: "h-4 w-4",
      iconText: "text-base",
      spacing: "space-x-1.5"
    },
    default: {
      title: "text-xl",
      icon: "h-6 w-6",
      iconText: "text-xl",
      spacing: "space-x-2"
    },
    large: {
      title: "text-2xl",
      icon: "h-8 w-8",
      iconText: "text-2xl",
      spacing: "space-x-2"
    }
  }

  const currentSize = sizes[size]
  const themeClasses = "text-foreground"

  return (
    <div className={`inline-flex items-center ${currentSize.spacing} group ${className}`}>
      <h1 className={`${currentSize.title} font-playfair font-medium ${themeClasses} tracking-tight transition-all duration-200 group-hover:tracking-normal`}>
        FamilyOffice
      </h1>
      <div 
        className={`${currentSize.icon} rounded-md bg-primary flex items-center justify-center shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:rotate-2`}
        role="img" 
                  aria-label="FamilyOffice logo"
      >
        <span className={`text-primary-foreground font-medium ${currentSize.iconText}`} aria-hidden="true">
          S
        </span>
      </div>
    </div>
  )
}

// 프리미엄 버전 - 특별한 페이지나 섹션용
export const PremiumFamilyOfficeLogo: React.FC<Omit<LogoProps, 'size' | 'language'>> = ({ 
  showTagline = true,
  className = ""
}) => {
  const themeClasses = "text-foreground"

  return (
    <header className={`flex flex-col items-center space-y-4 ${className}`} role="banner">
      {/* 메인 로고 */}
      <div className="flex items-center space-x-3 group">
        <div className="relative">
          <h1 className={`text-2xl font-playfair font-light ${themeClasses} tracking-[-0.01em] relative`}>
            FamilyOffice
            {/* 언더라인 효과 */}
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full"></div>
          </h1>
        </div>
        
        <div 
          className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:rotate-3"
          role="img" 
          aria-label="FamilyOffice premium logo"
        >
          <span className="text-primary-foreground font-semibold text-2xl tracking-wide" aria-hidden="true">
            S
          </span>
          
          {/* 미묘한 하이라이트 효과 */}
          <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>
      
      {/* 태그라인 - 정확한 중앙 정렬과 줄바꿈 방지 */}
      {showTagline && (
        <div className="flex justify-center">
                  <p className="text-[9px] text-muted-foreground font-extralight tracking-[0.15em] whitespace-nowrap opacity-90 transition-opacity duration-300 hover:opacity-100">
          중소중견기업 전문 자산관리 파트너
        </p>
        </div>
      )}
    </header>
  )
}

export default FamilyOfficeLogo 