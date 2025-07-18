import { 
  Users, 
  TrendingUp, 
  Scale, 
  Crown, 
  DollarSign, 
  Calculator, 
  Building2, 
  Network, 
  Laptop, 
  Leaf 
} from "lucide-react";
import type { 
  Seminar, 
  Speaker, 
  SeminarCategoryInfo, 
  SeminarSeries 
} from "@/types/seminar";

export const SEMINAR_CATEGORIES: SeminarCategoryInfo[] = [
  {
    key: "leadership",
    name: "리더십 & 경영",
    description: "차세대 리더를 위한 경영 전략과 리더십 개발",
    icon: Crown,
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800"
  },
  {
    key: "finance",
    name: "금융 & 자산관리",
    description: "체계적인 자산관리와 포트폴리오 최적화 전략",
    icon: TrendingUp,
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
  },
  {
    key: "legal",
    name: "법무 & 컴플라이언스",
    description: "기업 법무 실무와 최신 규제 대응 방안",
    icon: Scale,
    color: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
  },
  {
    key: "succession",
    name: "가업승계",
    description: "체계적인 가업승계 설계와 실행 전략",
    icon: Users,
    color: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800"
  },
  {
    key: "investment",
    name: "투자 전략",
    description: "프라이빗 투자와 대체투자 기회 분석",
    icon: DollarSign,
    color: "text-emerald-700 dark:text-emerald-300",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
  },
  {
    key: "taxation",
    name: "세무 & 절세",
    description: "최신 세법 변화와 효과적인 절세 전략",
    icon: Calculator,
    color: "text-red-700 dark:text-red-300",
    bgColor: "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
  },
  {
    key: "management",
    name: "경영 혁신",
    description: "디지털 전환과 경영 혁신 사례 분석",
    icon: Building2,
    color: "text-indigo-700 dark:text-indigo-300",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800"
  },
  {
    key: "networking",
    name: "네트워킹",
    description: "동종업계 리더들과의 교류와 정보 공유",
    icon: Network,
    color: "text-pink-700 dark:text-pink-300",
    bgColor: "bg-pink-100 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800"
  },
  {
    key: "technology",
    name: "기술 & 혁신",
    description: "최신 기술 트렌드와 혁신 사례 연구",
    icon: Laptop,
    color: "text-cyan-700 dark:text-cyan-300",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800"
  },
  {
    key: "esg",
    name: "ESG & 지속가능경영",
    description: "ESG 경영과 지속가능한 성장 전략",
    icon: Leaf,
    color: "text-teal-700 dark:text-teal-300",
    bgColor: "bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800"
  }
];

// 새로운 강연자 정보 추가
export const SPEAKERS = {
  leeSangSun: {
    id: "lee-sang-sun",
    name: "이상선",
    title: "박사",
    company: "삼성생명 컨설턴트",
    bio: "삼성생명에서 패밀리오피스 분야의 전문가로 20년 이상의 경험을 보유하고 있으며, 가업승계와 자산관리 전략의 권위자입니다.",
    expertise: ["가업승계", "자산관리", "패밀리오피스", "경영전략"]
  },
  hwangByungHoon: {
    id: "hwang-byung-hoon",
    name: "황병훈",
    title: "세무전문가",
    company: "삼성패밀리오피스",
    bio: "삼성패밀리오피스 소속 세무전문가로 고액자산가 세무 전문가로 15년 이상의 경험을 보유하고 있으며, 상속·증여세 최적화 전략 수립의 전문가입니다.",
    expertise: ["상속세", "증여세", "절세전략", "세무설계"]
  },
  jungGiHong: {
    id: "jung-gi-hong",
    name: "정기홍",
    title: "FO",
    company: "삼성패밀리오피스",
    bio: "삼성패밀리오피스 소속으로 고액자산가 자산관리와 투자 자문을 담당하고 있습니다.",
    expertise: ["자산관리", "투자자문", "패밀리오피스", "포트폴리오"]
  }
};

export const FEATURED_SPEAKERS: Speaker[] = [
  {
    id: "samsung-life-director",
    name: "김재원",
    title: "상무",
    company: "삼성생명 패밀리오피스",
    bio: "삼성생명에서 25년간 자산관리 업무를 담당하며, 현재 패밀리오피스 사업부를 총괄하고 있습니다. VVIP 고객 대상 맞춤형 자산관리 전문가입니다.",
    expertise: ["자산관리", "포트폴리오", "패밀리오피스", "VVIP서비스"]
  },
  {
    id: "tax-specialist",
    name: "박세무",
    title: "세무사",
    company: "삼일회계법인",
    bio: "기업 및 개인 고액자산가 세무 전문가로 20년 이상의 경험을 보유하고 있으며, 상속·증여세 최적화 전략 수립의 권위자입니다.",
    expertise: ["상속세", "증여세", "절세전략", "세무설계"]
  },
  {
    id: "succession-expert",
    name: "이승계",
    title: "대표변호사",
    company: "법무법인 광장",
    bio: "패밀리비즈니스 승계 전문 변호사로 대기업 오너 가문의 승계 설계를 담당하고 있으며, 가족법인 설립 및 운영 전문가입니다.",
    expertise: ["가업승계", "가족법인", "지배구조", "M&A"]
  },
  {
    id: "investment-director",
    name: "정투자",
    title: "투자본부장",
    company: "미래에셋대우",
    bio: "프라이빗뱅킹 부문에서 15년간 고액자산가 투자 자문을 담당하며, 대체투자 및 해외투자 전문가로 활동하고 있습니다.",
    expertise: ["대체투자", "해외투자", "프라이빗뱅킹", "자산배분"]
  }
];

export const UPCOMING_SEMINARS: Seminar[] = [
  {
    id: "vvip-seminar-grand-hyatt-july",
    title: "VVIP 고객초청 세미나",
    subtitle: "미래를 준비하는 가업승계 전략",
    description: "차세대 경영진을 위한 체계적인 가업승계 전략과 자산관리 방안을 심도 있게 다룹니다. 업계 최고 전문가들과 함께하는 프리미엄 세미나에서 미래 경영 전략을 수립하세요.",
    speaker: SPEAKERS.leeSangSun,
    date: "2025-07-23",
    time: "10:30",
    duration: "3시간",
    location: {
      type: "offline",
      venue: "그랜드 하얏트 서울",
      address: "서울시 용산구 한강대로23길 322",
      capacity: 50
    },
    category: "succession",
    targetAudience: ["VVIP 고객", "기업 경영진", "차세대 리더"],
    capacity: 50,
    registeredCount: 12,
    price: 50000,
    isPremium: true,
    status: "upcoming",
    tags: ["가업승계", "VVIP", "경영전략", "차세대"],
    registrationUrl: "https://lu.ma/k0lpxec5",
    detailsUrl: "https://lu.ma/k0lpxec5",
    agenda: [
      {
        time: "10:30",
        title: "등록 및 Welcome Coffee",
        duration: 30
      },
      {
        time: "11:00",
        title: "효과적인 가업승계 및 자산관리 전략",
        description: "성공적인 가업승계를 위한 체계적인 전략과 자산관리 방안",
        speaker: "이상선 박사",
        duration: 60
      },
      {
        time: "12:00",
        title: "네트워킹 런치",
        duration: 60
      },
      {
        time: "13:00",
        title: "개별 상담 및 Q&A 세션",
        description: "맞춤형 가업승계 전략 수립을 위한 개별 상담",
        duration: 30
      }
    ]
  },
  {
    id: "vvip-seminar-shilla-august",
    title: "VVIP 고객초청 세미나",
    subtitle: "세무전문가와 패밀리오피스 전문가의 특별 강연",
    description: "황병훈 세무전문가와 정기홍 FO가 함께하는 특별 세미나입니다. 세무 설계와 패밀리오피스 운영에 대한 실무 중심의 강의를 통해 실질적인 도움을 드립니다.",
    speaker: SPEAKERS.hwangByungHoon,
    date: "2025-08-12",
    time: "10:30",
    duration: "3시간",
    location: {
      type: "offline",
      venue: "서울 신라호텔",
      address: "서울시 중구 동호로 249",
      capacity: 50
    },
    category: "taxation",
    targetAudience: ["VVIP 고객", "기업오너", "재무담당임원"],
    capacity: 50,
    registeredCount: 8,
    price: 50000,
    isPremium: true,
    status: "upcoming",
    tags: ["세무설계", "패밀리오피스", "VVIP", "절세전략"],
    registrationUrl: "https://lu.ma/sd0gfmmn",
    detailsUrl: "https://lu.ma/sd0gfmmn",
    agenda: [
      {
        time: "10:30",
        title: "등록 및 Welcome Coffee",
        duration: 30
      },
      {
        time: "11:00",
        title: "25년 개정세법 및 CEO 자산관리 전략",
        description: "최신 세법 개정사항과 CEO를 위한 자산관리 전략",
        speaker: "황병훈 세무전문가",
        duration: 60
      },
      {
        time: "12:00",
        title: "개정세법 주요내용 이해와 CEO 대응전략",
        description: "개정세법의 핵심 내용과 CEO들의 대응 방안",
        speaker: "정기홍 FO",
        duration: 45
      },
      {
        time: "12:45",
        title: "네트워킹 런치",
        duration: 45
      },
      {
        time: "13:30",
        title: "개별 상담 및 Q&A 세션",
        description: "맞춤형 세무 및 자산관리 전략 수립을 위한 개별 상담",
        duration: 30
      }
    ]
  },
  {
    id: "vvip-seminar-grand-hyatt-august",
    title: "VVIP 고객초청 세미나",
    subtitle: "스마트한 세무 설계와 절세 전략",
    description: "최신 세법 변화에 대응하는 효과적인 세무 설계 방법과 절세 전략을 제시합니다. 상속·증여세 최적화와 기업 세무 리스크 관리 방안을 전문가와 함께 학습하세요.",
    speaker: SPEAKERS.leeSangSun,
    date: "2025-08-27",
    time: "10:30",
    duration: "3시간",
    location: {
      type: "offline",
      venue: "그랜드 하얏트 서울",
      address: "서울시 용산구 한강대로23길 322",
      capacity: 50
    },
    category: "taxation",
    targetAudience: ["VVIP 고객", "기업오너", "재무담당임원"],
    capacity: 50,
    registeredCount: 15,
    price: 50000,
    isPremium: true,
    status: "upcoming",
    tags: ["세무설계", "절세전략", "VVIP", "상속증여"],
    registrationUrl: "https://lu.ma/t83yj5i9",
    detailsUrl: "https://lu.ma/t83yj5i9",
    agenda: [
      {
        time: "10:30",
        title: "등록 및 Welcome Coffee",
        duration: 30
      },
      {
        time: "11:00",
        title: "효과적인 가업승계 및 자산관리 전략",
        description: "성공적인 가업승계를 위한 체계적인 전략과 자산관리 방안",
        speaker: "이상선 박사",
        duration: 60
      },
      {
        time: "12:00",
        title: "네트워킹 런치",
        duration: 60
      },
      {
        time: "13:00",
        title: "개별 상담 및 Q&A 세션",
        description: "맞춤형 세무 전략 수립을 위한 개별 상담",
        duration: 30
      }
    ]
  }
];

export const PAST_SEMINARS: Seminar[] = [
  {
    id: "vvip-portfolio-2024",
    title: "2024년 VVIP 포트폴리오 성과 리뷰",
    subtitle: "삼성생명 패밀리오피스 연말 결산 세미나",
    description: "2024년 VVIP 고객 포트폴리오 성과를 분석하고 2025년 투자 전략 방향을 제시하는 연말 결산 세미나를 진행했습니다.",
    speaker: {
      id: "samsung-review-team",
      name: "김재원",
      title: "상무",
      company: "삼성생명 패밀리오피스",
      bio: "삼성생명 패밀리오피스 사업부 총괄로 VVIP 고객 자산관리를 담당하고 있습니다.",
      expertise: ["자산관리", "포트폴리오", "성과분석", "투자전략"]
    },
    date: "2024-12-15",
    time: "15:00",
    duration: "2시간",
    location: {
      type: "offline",
      venue: "삼성생명 본사 VIP룸",
      address: "서울시 중구 태평로2가 150"
    },
    category: "finance",
    targetAudience: ["VVIP 고객", "자산가", "기업오너"],
    capacity: 30,
    registeredCount: 30,
    price: 0,
    isPremium: true,
    status: "completed",
    tags: ["포트폴리오", "성과리뷰", "투자전략", "VVIP"],
    agenda: [],
    videoUrl: "https://cal.com/familyoffice/coffeechat",
    presentationUrl: "https://cal.com/familyoffice/coffeechat"
  },
  {
    id: "year-end-tax-2024",
    title: "2024년 연말정산 및 절세 전략",
    subtitle: "고액자산가를 위한 세무 최적화 방안",
    description: "연말정산 시즌을 맞아 고액자산가가 알아야 할 절세 전략과 2025년 세법 변화에 대한 대비책을 제시했습니다.",
    speaker: {
      id: "tax-year-end",
      name: "박세무",
      title: "세무사",
      company: "삼일회계법인",
      bio: "고액자산가 세무 전문가로 상속·증여세 최적화 전략을 전문으로 합니다.",
      expertise: ["연말정산", "절세전략", "세무설계", "고액자산가"]
    },
    date: "2024-11-30",
    time: "14:00",
    duration: "2시간",
    location: {
      type: "offline",
      venue: "삼성생명 본사 세미나룸",
      address: "서울시 중구 태평로2가 150"
    },
    category: "taxation",
    targetAudience: ["VVIP 고객", "자산가", "기업오너"],
    capacity: 40,
    registeredCount: 40,
    price: 0,
    isPremium: true,
    status: "completed",
    tags: ["연말정산", "절세전략", "세무설계", "고액자산가"],
    agenda: [],
    videoUrl: "https://cal.com/familyoffice/coffeechat",
    presentationUrl: "https://cal.com/familyoffice/coffeechat"
  }
];

export const SEMINAR_SERIES: SeminarSeries[] = [
  {
    id: "vvip-quarterly",
    name: "VVIP 분기별 세미나",
    description: "VVIP 고객을 위한 분기별 특별 세미나 시리즈",
    seminars: UPCOMING_SEMINARS.filter(s => s.isPremium),
    totalSeminars: UPCOMING_SEMINARS.filter(s => s.isPremium).length,
    completedSeminars: PAST_SEMINARS.filter(s => s.isPremium).length,
    nextSeminar: UPCOMING_SEMINARS.find(s => s.isPremium && s.status === "upcoming"),
    registrationUrl: "https://cal.com/familyoffice/coffeechat"
  },
  {
    id: "tax-strategy",
    name: "세무 전략 시리즈",
    description: "고액자산가를 위한 세무 설계와 절세 전략 시리즈",
    seminars: [...UPCOMING_SEMINARS, ...PAST_SEMINARS].filter(s => s.category === "taxation"),
    totalSeminars: [...UPCOMING_SEMINARS, ...PAST_SEMINARS].filter(s => s.category === "taxation").length,
    completedSeminars: PAST_SEMINARS.filter(s => s.category === "taxation").length,
    nextSeminar: UPCOMING_SEMINARS.find(s => s.category === "taxation" && s.status === "upcoming"),
    registrationUrl: "https://cal.com/familyoffice/coffeechat"
  }
];