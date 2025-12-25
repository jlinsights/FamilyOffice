// SuperClaude Designer 관점 40+ CEO 전용 디자인 시스템
// BMAD Method + AgentOS 다중관점 통합 접근성 최적화

export interface AccessibilityProfile {
  ageGroup: '40-45' | '45-50' | '50-55' | '55-60' | '60+';
  visionLevel: 'excellent' | 'good' | 'moderate' | 'poor';
  devicePreference: 'desktop' | 'tablet' | 'mobile';
  techComfort: 'high' | 'medium' | 'low';
  touchPrecision: 'high' | 'medium' | 'low';
}

// BMAD Method 기반 디자인 원칙
export const bmadDesignPrinciples = {
  // Behavioral - 행동 기반 디자인
  behavioral: {
    interaction: {
      clickOverHover: true, // 호버보다 클릭 선호
      directNavigation: true, // 직접적인 네비게이션
      minimizeScrolling: true, // 스크롤 최소화
      clearFeedback: true, // 명확한 피드백
    },
    layout: {
      leftToRightReading: true, // 좌우 읽기 패턴
      topToBottomImportance: true, // 상하 중요도
      centeredContent: true, // 중앙 정렬 선호
      whiteSpaceGenerous: true, // 여백 충분히
    },
    content: {
      shortParagraphs: true, // 짧은 문단
      bulletsOverProse: true, // 불릿 포인트 선호
      numberedSteps: true, // 번호 매긴 단계
      highlightKeyInfo: true, // 핵심 정보 강조
    },
  },

  // Motivational - 동기 기반 디자인
  motivational: {
    trust: {
      professionalImagery: true,
      certificationBadges: true,
      testimonialProminence: true,
      contactInfoVisible: true,
    },
    urgency: {
      limitedTimeOffers: true,
      callToActionClear: true,
      benefitsUpfront: true,
      riskMinimization: true,
    },
    status: {
      premiumVisualCues: true,
      exclusiveLanguage: true,
      vipTreatment: true,
      personalizedService: true,
    },
  },

  // Aspirational - 열망 기반 디자인
  aspirational: {
    vision: {
      futureFocusedImagery: true,
      legacyThemes: true,
      generationalSuccess: true,
      worldClassStandards: true,
    },
    sophistication: {
      elegantTypography: true,
      refinedColorPalette: true,
      premiumMaterials: true,
      thoughtfulAnimations: true,
    },
  },

  // Decisional - 결정 기반 디자인
  decisional: {
    clarity: {
      singlePrimaryAction: true,
      obviousNextSteps: true,
      progressIndicators: true,
      completionRewards: true,
    },
    support: {
      humanContactEasy: true,
      helpAccessible: true,
      undoOptions: true,
      safetyNets: true,
    },
  },
};

// 40+ 사용자 타이포그래피 시스템
export const typography40Plus = {
  // 기본 폰트 크기 (기존보다 20% 증가)
  fontSizes: {
    // 모바일 우선 (sm: 640px+, md: 768px+, lg: 1024px+, xl: 1280px+)
    xs: 'text-sm sm:text-base md:text-lg', // 14px → 16px → 18px
    sm: 'text-base sm:text-lg md:text-xl', // 16px → 18px → 20px
    base: 'text-lg sm:text-xl md:text-2xl', // 18px → 20px → 24px
    lg: 'text-xl sm:text-2xl md:text-3xl', // 20px → 24px → 30px
    xl: 'text-2xl sm:text-3xl md:text-4xl', // 24px → 30px → 36px
    '2xl': 'text-3xl sm:text-4xl md:text-5xl', // 30px → 36px → 48px
    '3xl': 'text-4xl sm:text-5xl md:text-6xl', // 36px → 48px → 60px
    '4xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl', // 48px → 60px → 72px → 96px
    '5xl': 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl', // 60px → 72px → 96px → 128px
  },

  // 라인 높이 (가독성 향상)
  lineHeights: {
    tight: 'leading-tight', // 1.25
    normal: 'leading-normal', // 1.5
    relaxed: 'leading-relaxed', // 1.625
    loose: 'leading-loose', // 2
  },

  // 폰트 두께 (중요도 구분)
  fontWeights: {
    light: 'font-light', // 300
    normal: 'font-normal', // 400
    medium: 'font-medium', // 500 (기본 텍스트)
    semibold: 'font-semibold', // 600 (강조)
    bold: 'font-bold', // 700 (헤드라인)
    extrabold: 'font-extrabold', // 800 (메인 타이틀)
  },

  // 문자 간격 (가독성)
  letterSpacing: {
    tight: 'tracking-tight', // -0.025em
    normal: 'tracking-normal', // 0em
    wide: 'tracking-wide', // 0.025em
    wider: 'tracking-wider', // 0.05em
  },
};

// AgentOS 다중관점 컬러 시스템
export const colorSystem40Plus = {
  // 신뢰도 기반 컬러 (Trust-Based Colors)
  trust: {
    primary: {
      50: '#eff6ff', // 아주 밝은 파란색
      100: '#dbeafe', // 밝은 파란색
      500: '#3b82f6', // 기본 파란색 (신뢰)
      600: '#2563eb', // 진한 파란색
      900: '#1e3a8a', // 아주 진한 파란색
    },
    secondary: {
      50: '#f8fafc', // 아주 밝은 회색
      100: '#f1f5f9', // 밝은 회색
      500: '#64748b', // 중간 회색 (안정)
      700: '#334155', // 진한 회색
      900: '#0f172a', // 아주 진한 회색
    },
  },

  // 프리미엄 골드 액센트
  premium: {
    gold: {
      50: '#fffbeb', // 아주 밝은 골드
      100: '#fef3c7', // 밝은 골드
      400: '#fbbf24', // 기본 골드
      500: '#f59e0b', // 진한 골드
      600: '#d97706', // 아주 진한 골드
    },
  },

  // 의미 기반 컬러
  semantic: {
    success: {
      light: '#dcfce7', // 밝은 녹색 배경
      base: '#16a34a', // 성공 녹색
      dark: '#15803d', // 진한 녹색
    },
    warning: {
      light: '#fef3c7', // 밝은 노란색 배경
      base: '#eab308', // 경고 노란색
      dark: '#ca8a04', // 진한 노란색
    },
    error: {
      light: '#fecaca', // 밝은 빨간색 배경
      base: '#dc2626', // 오류 빨간색
      dark: '#b91c1c', // 진한 빨간색
    },
  },

  // 대비율 보장 컬러 (WCAG AAA 준수)
  highContrast: {
    text: {
      primary: '#0f172a', // 진한 회색 (배경 대비 21:1)
      secondary: '#374151', // 중간 회색 (배경 대비 12:1)
      muted: '#6b7280', // 연한 회색 (배경 대비 7:1)
    },
    background: {
      primary: '#ffffff', // 순백색
      secondary: '#f9fafb', // 아주 밝은 회색
      muted: '#f3f4f6', // 밝은 회색
    },
  },
};

// 터치 타겟 크기 시스템 (40+ 사용자 친화적)
export const touchTargets40Plus = {
  // 최소 터치 타겟 크기
  minimum: {
    width: 'min-w-[44px]', // 44px 최소 너비
    height: 'min-h-[44px]', // 44px 최소 높이
    padding: 'p-2', // 8px 패딩
  },

  // 권장 터치 타겟 크기
  recommended: {
    width: 'min-w-[48px]', // 48px 권장 너비
    height: 'min-h-[48px]', // 48px 권장 높이
    padding: 'p-3', // 12px 패딩
  },

  // 최적 터치 타겟 크기
  optimal: {
    width: 'min-w-[56px]', // 56px 최적 너비
    height: 'min-h-[56px]', // 56px 최적 높이
    padding: 'p-4', // 16px 패딩
  },

  // 중요 CTA 버튼
  primary: {
    width: 'min-w-[120px]', // 120px 최소 너비
    height: 'min-h-[56px]', // 56px 높이
    padding: 'px-6 py-4', // 24px 좌우, 16px 상하
  },

  // 플로팅 버튼
  floating: {
    width: 'min-w-[64px]', // 64px 너비
    height: 'min-h-[64px]', // 64px 높이
    padding: 'p-4', // 16px 패딩
  },
};

// 스페이싱 시스템 (여백 및 간격)
export const spacing40Plus = {
  // 섹션 간 여백
  sectionGap: 'py-16 sm:py-20 md:py-24 lg:py-32', // 64px → 80px → 96px → 128px

  // 컨테이너 패딩
  containerPadding: 'px-4 sm:px-6 md:px-8 lg:px-12', // 16px → 24px → 32px → 48px

  // 카드 내부 패딩
  cardPadding: 'p-6 sm:p-8 md:p-10', // 24px → 32px → 40px

  // 요소 간 간격
  elementGap: 'space-y-4 sm:space-y-6 md:space-y-8', // 16px → 24px → 32px

  // 버튼 그룹 간격
  buttonGap: 'gap-3 sm:gap-4 md:gap-6', // 12px → 16px → 24px
};

// 애니메이션 시스템 (40+ 사용자 친화적)
export const animations40Plus = {
  // 부드러운 전환 (멀미 방지)
  gentle: {
    duration: 'duration-300', // 300ms
    easing: 'ease-out',
    transform: 'transition-all',
  },

  // 호버 효과 (미묘함)
  hover: {
    scale: 'hover:scale-105', // 5% 확대
    shadow: 'hover:shadow-lg',
    opacity: 'hover:opacity-90',
  },

  // 포커스 효과 (접근성)
  focus: {
    ring: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    outline: 'focus:outline-none',
    visible: 'focus-visible:ring-2',
  },

  // 로딩 상태 (불안감 감소)
  loading: {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },
};

// 레이아웃 패턴 (40+ 친화적 구조)
export const layoutPatterns40Plus = {
  // F-패턴 레이아웃 (읽기 친화적)
  fPattern: {
    container: 'max-w-4xl mx-auto', // 좁은 컨테이너
    header: 'text-left mb-8', // 좌측 정렬 헤더
    content: 'text-left space-y-6', // 좌측 정렬 콘텐츠
    sidebar: 'space-y-4', // 사이드바 간격
  },

  // Z-패턴 레이아웃 (중요 정보 강조)
  zPattern: {
    top: 'flex justify-between items-center mb-8',
    middle: 'text-center my-12',
    bottom: 'flex justify-between items-center mt-8',
  },

  // 그리드 시스템 (명확한 구조)
  grid: {
    columns: {
      mobile: 'grid-cols-1', // 모바일: 1열
      tablet: 'sm:grid-cols-2', // 태블릿: 2열
      desktop: 'lg:grid-cols-3', // 데스크톱: 3열
    },
    gap: 'gap-6 sm:gap-8 md:gap-10', // 24px → 32px → 40px
  },

  // 카드 레이아웃
  card: {
    base: 'bg-white rounded-lg shadow-sm border border-gray-200',
    hover: 'hover:shadow-md transition-shadow duration-300',
    padding: 'p-6 sm:p-8',
    spacing: 'space-y-4',
  },
};

// 반응형 브레이크포인트 (40+ 사용 패턴 반영)
export const breakpoints40Plus = {
  // 모바일 퍼스트 접근
  mobile: '0px', // 기본
  tablet: '768px', // 태블릿 (iPad 크기)
  desktop: '1024px', // 데스크톱 (기본)
  wide: '1280px', // 와이드 스크린
  ultra: '1536px', // 울트라 와이드
};

// 접근성 유틸리티 함수
export const a11yUtils = {
  // 스크린 리더 전용 텍스트
  srOnly: 'sr-only',

  // 포커스 가능한 요소
  focusable: 'focus:outline-none focus:ring-2 focus:ring-blue-500',

  // 키보드 네비게이션
  keyboardNav: 'focus-visible:ring-2 focus-visible:ring-blue-500',

  // 색상 대비 보장
  highContrast: 'text-gray-900 bg-white',

  // 터치 친화적
  touchFriendly: 'min-w-[44px] min-h-[44px] p-2',
};

// 사용 예시 헬퍼 함수
export function getResponsiveText(
  size: keyof typeof typography40Plus.fontSizes
): string {
  return `${typography40Plus.fontSizes[size]} ${typography40Plus.lineHeights.normal} ${typography40Plus.fontWeights.medium}`;
}

export function getTouchFriendlyButton(
  _importance: 'primary' | 'secondary' | 'tertiary' = 'secondary'
): string {
  const baseClasses = `${touchTargets40Plus.recommended.width} ${touchTargets40Plus.recommended.height} ${touchTargets40Plus.recommended.padding}`;
  const focusClasses = animations40Plus.focus.ring;
  const hoverClasses = `${animations40Plus.hover.scale} ${animations40Plus.hover.shadow}`;

  return `${baseClasses} ${focusClasses} ${hoverClasses} ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration}`;
}

export function getAccessibleCard(): string {
  const cardBase = layoutPatterns40Plus.card.base;
  const cardHover = layoutPatterns40Plus.card.hover;
  const cardPadding = layoutPatterns40Plus.card.padding;
  const cardSpacing = layoutPatterns40Plus.card.spacing;

  return `${cardBase} ${cardHover} ${cardPadding} ${cardSpacing}`;
}
