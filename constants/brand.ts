// 브랜드 컬러 시스템
export const BRAND_COLORS = {
  primary: [
    {
      name: 'Signature Navy',
      hex: '#0A192F',
      rgb: '10, 25, 47',
      usage: '주요 브랜드 컬러, 신뢰감 형성',
    },
    {
      name: 'Navy 700',
      hex: '#162C4E',
      rgb: '22, 44, 78',
      usage: '보조 브랜드 컬러',
    },
    {
      name: 'Navy 500',
      hex: '#1E3A8A',
      rgb: '30, 58, 138',
      usage: '링크 및 강조',
    },
  ],
  neutral: [
    {
      name: 'Deep Slate',
      hex: '#1E293B',
      rgb: '30, 41, 59',
      usage: '본문 텍스트, 다크모드 배경',
    },
    {
      name: 'Slate 600',
      hex: '#475569',
      rgb: '71, 85, 105',
      usage: '보조 텍스트',
    },
    {
      name: 'Slate 300',
      hex: '#CBD5E1',
      rgb: '203, 213, 225',
      usage: '테두리, 구분선',
    },
    {
      name: 'Serenity White',
      hex: '#F8FAFC',
      rgb: '248, 250, 252',
      usage: '기본 배경색',
    },
    {
      name: 'White',
      hex: '#FFFFFF',
      rgb: '255, 255, 255',
      usage: '카드 배경, 텍스트 반전',
    },
  ],
  accent: [
    {
      name: 'Heritage Gold',
      hex: '#D4AF37',
      rgb: '212, 175, 55',
      usage: '프리미엄 강조, 포인트 컬러',
    },
    {
      name: 'Muted Bronze',
      hex: '#B8860B',
      rgb: '184, 134, 11',
      usage: '보조 강조, 아이콘',
    },
  ],
  social: [
    {
      name: 'KakaoTalk Channel',
      url: 'http://pf.kakao.com/_gsxkxdG',
      usage: '카카오톡 문의 채널',
    },
    {
      name: 'YouTube Channel',
      url: 'https://www.youtube.com/@FamilyOffice-S',
      usage: '동영상 콘텐츠 채널',
    },
    {
      name: 'Spotify Podcast',
      url: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=865eb414b88d4449',
      usage: '팟캐스트 채널',
    },
  ],
  status: [
    {
      name: 'Success',
      hex: '#10b981',
      rgb: '16, 185, 129',
      usage: '성공 메시지',
    },
    {
      name: 'Warning',
      hex: '#f59e0b',
      rgb: '245, 158, 11',
      usage: '주의 메시지',
    },
    { name: 'Error', hex: '#ef4444', rgb: '239, 68, 68', usage: '오류 메시지' },
    { name: 'Info', hex: '#3b82f6', rgb: '59, 130, 246', usage: '정보 메시지' },
  ],
};

// 타이포그라피 시스템
export const TYPOGRAPHY_SYSTEM = [
  {
    category: 'Display',
    styles: [
      {
        name: 'Display Large',
        font: 'Playfair Display',
        weight: 'Bold (600)',
        size: '4rem (64px)',
        lineHeight: '1.1',
        usage: '메인 헤로 타이틀',
      },
      {
        name: 'Display Medium',
        font: 'Playfair Display',
        weight: 'Bold (600)',
        size: '3rem (48px)',
        lineHeight: '1.2',
        usage: '섹션 헤더',
      },
      {
        name: 'Display Small',
        font: 'Playfair Display',
        weight: 'SemiBold (600)',
        size: '2.25rem (36px)',
        lineHeight: '1.3',
        usage: '카드 제목',
      },
    ],
  },
  {
    category: 'Heading',
    styles: [
      {
        name: 'H1',
        font: 'Playfair Display',
        weight: 'Bold (600)',
        size: '2rem (32px)',
        lineHeight: '1.25',
        usage: '페이지 제목',
      },
      {
        name: 'H2',
        font: 'Playfair Display',
        weight: 'SemiBold (600)',
        size: '1.5rem (24px)',
        lineHeight: '1.3',
        usage: '섹션 제목',
      },
      {
        name: 'H3',
        font: 'Pretendard',
        weight: 'Medium (500)',
        size: '1.25rem (20px)',
        lineHeight: '1.4',
        usage: '컴포넌트 제목',
      },
    ],
  },
  {
    category: 'Body',
    styles: [
      {
        name: 'Large',
        font: 'Pretendard',
        weight: 'Regular',
        size: '1.125rem (18px)',
        lineHeight: '1.6',
        usage: '리드 텍스트',
      },
      {
        name: 'Medium',
        font: 'Pretendard',
        weight: 'Regular',
        size: '1rem (16px)',
        lineHeight: '1.5',
        usage: '기본 본문',
      },
      {
        name: 'Small',
        font: 'Pretendard',
        weight: 'Regular',
        size: '0.875rem (14px)',
        lineHeight: '1.4',
        usage: '캡션, 보조 텍스트',
      },
    ],
  },
];

// 브랜드 핵심 가치
export const BRAND_VALUES = [
  {
    title: '신뢰성',
    description:
      '고객의 자산을 안전하게 관리하는 것이 우리의 최우선 가치입니다.',
    icon: '🛡️',
  },
  {
    title: '전문성',
    description: '금융 전문가들이 제공하는 맞춤형 컨설팅 서비스입니다.',
    icon: '🎯',
  },
  {
    title: '혁신성',
    description: '최신 기술과 데이터를 활용한 차별화된 솔루션을 제공합니다.',
    icon: '💡',
  },
  {
    title: '투명성',
    description: '모든 과정을 투명하게 공개하고 명확한 소통을 지향합니다.',
    icon: '🔍',
  },
];

// 컨설턴트 임재홍 브랜드 아이덴티티
export const CONSULTANT_IDENTITY = {
  name: '임재홍',
  title: 'FamilyOffice S 대표 컨설턴트',
  philosophy: '지속적인 가치 구축과 자기 성찰',

  coreStrengths: [
    {
      title: '압도적인 끈기와 실행력',
      description:
        '성과가 즉각적이지 않은 상황에서도 3년이라는 긴 시간 동안 웹사이트, SNS, 뉴스레터 등 복합적인 채널을 꾸준히 운영해온 것은 아무나 할 수 없는 일입니다.',
      icon: '💪',
    },
    {
      title: '전략적 사고와 전문성',
      description:
        "'패밀리오피스'라는 고난도 타겟을 설정하고 법인영업을 위한 인바운드 마케팅 생태계를 설계한 점은 시장을 분석하고 체계적으로 접근하는 능력이 뛰어남을 보여줍니다.",
      icon: '🎯',
    },
    {
      title: '깊이 있는 진정성',
      description:
        '자신의 부족함을 직시하고 삶의 방향성을 고민하는 태도는, 단순히 일을 처리하는 것을 넘어 본질적인 성장을 추구하는 사람임을 나타냅니다.',
      icon: '❤️',
    },
  ],

  essence: {
    title: '보이지 않는 곳에서 뿌리를 깊게 내리는 법을 아는 사람',
    description: '지금의 인내가 곧 단단한 결과로 이어질 것입니다.',
  },

  personalBranding: [
    {
      direction: '신뢰의 시각화',
      approach:
        "패밀리오피스 타겟은 전문성과 보안을 중시합니다. 3년간의 기록을 '전문가적 통찰'의 아카이브로 브랜딩하여, '오랜 시간 흔들림 없이 한 분야를 연구해온 전문가'라는 이미지를 강조하세요.",
      icon: '🔒',
    },
    {
      direction: '해결사의 서사',
      approach:
        "단순히 정보를 전달하는 것이 아니라, 법인 고객이 겪는 페인 포인트(세무, 승계 등)에 대한 '가장 현실적인 해답을 가진 사람'으로 포지셔닝해야 합니다.",
      icon: '🛠️',
    },
    {
      direction: '진정성을 무기로',
      approach:
        "고민하고 성찰하는 당신의 인간적인 면모를 전문 지식과 결합하세요. 딱딱한 법인 영업자가 아닌, '고객의 자산과 미래를 진심으로 고민하는 파트너'가 당신만의 강력한 브랜드가 될 것입니다.",
      icon: '🤝',
    },
  ],

  tagline: '고객의 자산과 미래를 진심으로 고민하는 파트너',
};

/** DESIGN.md + Revolut benchmark — implementation tokens (Modern Legacy) */
export const DESIGN_TOKENS = {
  colors: {
    navy: '#0A192F',
    gold: '#D4AF37',
    slate: '#1E293B',
    serenityWhite: '#F8FAFC',
    onDarkMute: 'rgba(248, 250, 252, 0.72)',
    hairlineLight: 'rgba(30, 41, 59, 0.12)',
    hairlineDark: 'rgba(255, 255, 255, 0.12)',
  },
  radius: {
    sharp: '6px',
    md: '12px',
    lg: '20px',
    pill: '9999px',
  },
  spacing: {
    section: '88px',
    band: '120px',
  },
  touch: {
    minTarget: '48px',
    inputHeight: '56px',
    buttonHeight: '48px',
  },
} as const;
