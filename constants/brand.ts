// 브랜드 컬러 시스템
export const BRAND_COLORS = {
  primary: [
    { name: "Primary 900", hex: "#1e40af", rgb: "30, 64, 175", usage: "주요 CTA, 강조" },
    { name: "Primary 700", hex: "#2563eb", rgb: "37, 99, 235", usage: "기본 버튼, 링크" },
    { name: "Primary 500", hex: "#3b82f6", rgb: "59, 130, 246", usage: "호버 상태" },
    { name: "Primary 300", hex: "#93c5fd", rgb: "147, 197, 253", usage: "비활성 상태" },
  ],
  neutral: [
    { name: "Black", hex: "#000000", rgb: "0, 0, 0", usage: "헤드라인, 강조 텍스트" },
    { name: "Gray 900", hex: "#111827", rgb: "17, 24, 39", usage: "본문 텍스트" },
    { name: "Gray 600", hex: "#4b5563", rgb: "75, 85, 99", usage: "보조 텍스트" },
    { name: "Gray 300", hex: "#d1d5db", rgb: "209, 213, 219", usage: "테두리, 구분선" },
    { name: "Gray 100", hex: "#f3f4f6", rgb: "243, 244, 246", usage: "배경, 카드" },
    { name: "White", hex: "#ffffff", rgb: "255, 255, 255", usage: "배경, 카드 내용" },
  ],
  accent: [
    { name: "Gold 600", hex: "#c9b037", rgb: "201, 176, 55", usage: "프리미엄 강조" },
    { name: "Gold 500", hex: "#eab308", rgb: "234, 179, 8", usage: "아이콘, 포인트" },
    { name: "Gold 300", hex: "#fcd34d", rgb: "252, 211, 77", usage: "배경 강조" },
  ],
  status: [
    { name: "Success", hex: "#10b981", rgb: "16, 185, 129", usage: "성공 메시지" },
    { name: "Warning", hex: "#f59e0b", rgb: "245, 158, 11", usage: "주의 메시지" },
    { name: "Error", hex: "#ef4444", rgb: "239, 68, 68", usage: "오류 메시지" },
    { name: "Info", hex: "#3b82f6", rgb: "59, 130, 246", usage: "정보 메시지" },
  ]
};

// 타이포그라피 시스템
export const TYPOGRAPHY_SYSTEM = [
  { 
    category: "Display",
    variants: [
      { name: "Display Large", font: "Pretendard", weight: "Bold", size: "4rem (64px)", lineHeight: "1.1", usage: "메인 헤로 타이틀" },
      { name: "Display Medium", font: "Pretendard", weight: "Bold", size: "3rem (48px)", lineHeight: "1.2", usage: "섹션 헤더" },
      { name: "Display Small", font: "Pretendard", weight: "SemiBold", size: "2.25rem (36px)", lineHeight: "1.3", usage: "카드 제목" },
    ]
  },
  { 
    category: "Heading",
    variants: [
      { name: "H1", font: "Pretendard", weight: "Bold", size: "2rem (32px)", lineHeight: "1.25", usage: "페이지 제목" },
      { name: "H2", font: "Pretendard", weight: "SemiBold", size: "1.5rem (24px)", lineHeight: "1.3", usage: "섹션 제목" },
      { name: "H3", font: "Pretendard", weight: "Medium", size: "1.25rem (20px)", lineHeight: "1.4", usage: "컴포넌트 제목" },
    ]
  },
  { 
    category: "Body",
    variants: [
      { name: "Large", font: "Pretendard", weight: "Regular", size: "1.125rem (18px)", lineHeight: "1.6", usage: "리드 텍스트" },
      { name: "Medium", font: "Pretendard", weight: "Regular", size: "1rem (16px)", lineHeight: "1.5", usage: "기본 본문" },
      { name: "Small", font: "Pretendard", weight: "Regular", size: "0.875rem (14px)", lineHeight: "1.4", usage: "캡션, 보조 텍스트" },
    ]
  }
];

// 브랜드 핵심 가치
export const BRAND_VALUES = [
  {
    title: "신뢰성",
    description: "고객의 자산을 안전하게 관리하는 것이 우리의 최우선 가치입니다.",
    icon: "🛡️"
  },
  {
    title: "전문성",
    description: "금융 전문가들이 제공하는 맞춤형 컨설팅 서비스입니다.",
    icon: "🎯"
  },
  {
    title: "혁신성",
    description: "최신 기술과 데이터를 활용한 차별화된 솔루션을 제공합니다.",
    icon: "💡"
  },
  {
    title: "투명성",
    description: "모든 과정을 투명하게 공개하고 명확한 소통을 지향합니다.",
    icon: "🔍"
  }
];
