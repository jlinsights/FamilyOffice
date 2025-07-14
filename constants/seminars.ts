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
    id: "asset-management-2025",
    title: "2025년 VVIP 자산관리 전략",
    subtitle: "삼성생명 패밀리오피스 전문가가 제시하는 맞춤형 포트폴리오",
    description: "고액자산가를 위한 통합 자산관리 전략과 시장 변화에 대응하는 포트폴리오 구성 방법을 심도 있게 다룹니다.",
    speaker: FEATURED_SPEAKERS[0],
    date: "2025-02-20",
    time: "14:00",
    duration: "2.5시간",
    location: {
      type: "hybrid",
      venue: "삼성생명 본사 VIP룸",
      address: "서울시 중구 태평로2가 150",
      onlineLink: "cal.com/familyoffice/coffeechat",
      capacity: 30
    },
    category: "finance",
    targetAudience: ["VVIP 고객", "자산가", "기업오너"],
    capacity: 30,
    registeredCount: 24,
    price: 0,
    isPremium: true,
    status: "upcoming",
    tags: ["자산관리", "포트폴리오", "VVIP", "투자전략"],
    agenda: [
      {
        time: "14:00",
        title: "VVIP 고객 환영 인사",
        duration: 15
      },
      {
        time: "14:15",
        title: "2025년 글로벌 자산시장 전망",
        description: "주요 자산군별 투자 기회와 리스크 분석",
        speaker: "김재원 상무",
        duration: 60
      },
      {
        time: "15:15",
        title: "커피브레이크 & 네트워킹",
        duration: 15
      },
      {
        time: "15:30",
        title: "맞춤형 포트폴리오 구성 전략",
        description: "고액자산가 유형별 최적 자산배분 방법론",
        speaker: "김재원 상무",
        duration: 60
      },
      {
        time: "16:30",
        title: "개별 상담 및 Q&A",
        duration: 30
      }
    ]
  },
  {
    id: "tax-optimization-2025",
    title: "2025년 상속·증여세 최적화 전략",
    subtitle: "새로운 세법 개정사항과 절세 방안",
    description: "고액자산가를 위한 상속·증여세 절세 전략과 최신 세법 변화에 대한 실무적 대응 방안을 제시합니다.",
    speaker: FEATURED_SPEAKERS[1],
    date: "2025-03-05",
    time: "10:00",
    duration: "3시간",
    location: {
      type: "offline",
      venue: "코엑스 컨퍼런스센터",
      address: "서울시 강남구 영동대로 513",
      capacity: 50
    },
    category: "taxation",
    targetAudience: ["기업오너", "고액자산가", "재무담당임원"],
    capacity: 50,
    registeredCount: 42,
    price: 100000,
    isPremium: false,
    status: "upcoming",
    tags: ["상속세", "증여세", "절세전략", "세무설계"],
    agenda: [
      {
        time: "10:00",
        title: "등록 및 자료 배포",
        duration: 30
      },
      {
        time: "10:30",
        title: "2025년 세법 개정 주요사항",
        description: "상속·증여세 관련 주요 변화와 영향",
        speaker: "박세무 세무사",
        duration: 60
      },
      {
        time: "11:30",
        title: "휴식",
        duration: 15
      },
      {
        time: "11:45",
        title: "고액자산가 절세 전략 사례",
        description: "실제 사례를 통한 절세 방법론",
        speaker: "박세무 세무사",
        duration: 75
      },
      {
        time: "13:00",
        title: "개별 세무상담 및 질의응답",
        duration: 30
      }
    ]
  },
  {
    id: "succession-planning-2025",
    title: "가족법인을 통한 승계 설계",
    subtitle: "지속가능한 가업승계를 위한 법적 구조 설계",
    description: "가족법인 설립을 통한 체계적인 가업승계 방법과 법적 리스크 관리 방안에 대해 전문가가 상세히 설명합니다.",
    speaker: FEATURED_SPEAKERS[2],
    date: "2025-03-20",
    time: "14:30",
    duration: "2시간",
    location: {
      type: "offline",
      venue: "법무법인 광장 회의실",
      address: "서울시 종로구 새문안로 92",
      capacity: 25
    },
    category: "succession",
    targetAudience: ["창업주", "후계자", "기업 법무팀"],
    capacity: 25,
    registeredCount: 18,
    price: 150000,
    isPremium: false,
    status: "upcoming",
    tags: ["가업승계", "가족법인", "지배구조", "법적설계"],
    agenda: [
      {
        time: "14:30",
        title: "가족법인의 이해",
        description: "가족법인의 개념과 장점, 설립 요건",
        speaker: "이승계 변호사",
        duration: 45
      },
      {
        time: "15:15",
        title: "승계 구조 설계 실무",
        description: "단계별 승계 과정과 법적 고려사항",
        speaker: "이승계 변호사",
        duration: 45
      },
      {
        time: "16:00",
        title: "사례 연구 및 질의응답",
        description: "실제 승계 사례 분석과 개별 상담",
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
      expertise: ["연말정산", "상속세", "증여세", "절세전략"]
    },
    date: "2024-11-28",
    time: "14:00",
    duration: "2.5시간",
    location: {
      type: "hybrid",
      venue: "코엑스 컨퍼런스센터",
      address: "서울시 강남구 영동대로 513"
    },
    category: "taxation",
    targetAudience: ["고액자산가", "기업오너", "재무담당자"],
    capacity: 50,
    registeredCount: 48,
    price: 80000,
    isPremium: false,
    status: "completed",
    tags: ["연말정산", "절세전략", "세법변화", "고액자산가"],
    agenda: [],
    videoUrl: "https://cal.com/familyoffice/coffeechat",
    presentationUrl: "https://cal.com/familyoffice/coffeechat"
  },
  {
    id: "private-banking-2024",
    title: "프라이빗뱅킹과 대체투자 동향",
    subtitle: "2024년 하반기 투자 트렌드 분석",
    description: "프라이빗뱅킹 시장의 최신 동향과 대체투자 기회를 분석하여 고액자산가를 위한 투자 인사이트를 제공했습니다.",
    speaker: {
      id: "private-banking-expert",
      name: "정투자",
      title: "투자본부장",
      company: "미래에셋대우",
      bio: "프라이빗뱅킹 부문 투자 전문가로 고액자산가 대상 투자자문을 담당합니다.",
      expertise: ["프라이빗뱅킹", "대체투자", "해외투자", "자산배분"]
    },
    date: "2024-10-24",
    time: "16:00",
    duration: "1.5시간",
    location: {
      type: "online",
      onlineLink: "zoom.us/j/private-banking"
    },
    category: "investment",
    targetAudience: ["투자자", "자산가", "프라이빗뱅킹 고객"],
    capacity: 100,
    registeredCount: 87,
    price: 50000,
    isPremium: false,
    status: "completed",
    tags: ["프라이빗뱅킹", "대체투자", "투자동향", "자산배분"],
    agenda: [],
    videoUrl: "https://cal.com/familyoffice/coffeechat",
    presentationUrl: "https://cal.com/familyoffice/coffeechat"
  }
];

export const SEMINAR_SERIES: SeminarSeries[] = [
  {
    id: "vvip-premium-2025",
    title: "VVIP 프리미엄 시리즈 2025",
    description: "삼성생명 패밀리오피스가 제공하는 최고급 자산관리 교육 프로그램",
    seminars: ["asset-management-2025", "tax-optimization-2025", "succession-planning-2025"],
    totalDuration: "7.5시간",
    price: 0,
    discount: 0,
    certificate: true
  },
  {
    id: "wealth-protection-series",
    title: "자산보호 전문가 과정",
    description: "고액자산가를 위한 종합 자산보호 전략 과정",
    seminars: ["tax-optimization-2025", "succession-planning-2025"],
    totalDuration: "5시간",
    price: 200000,
    discount: 0.1,
    certificate: true
  }
];