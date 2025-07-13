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
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    key: "finance",
    name: "금융 & 자산관리",
    description: "체계적인 자산관리와 포트폴리오 최적화 전략",
    icon: TrendingUp,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    key: "legal",
    name: "법무 & 컴플라이언스",
    description: "기업 법무 실무와 최신 규제 대응 방안",
    icon: Scale,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  {
    key: "succession",
    name: "가업승계",
    description: "체계적인 가업승계 설계와 실행 전략",
    icon: Users,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20"
  },
  {
    key: "investment",
    name: "투자 전략",
    description: "프라이빗 투자와 대체투자 기회 분석",
    icon: DollarSign,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
  },
  {
    key: "taxation",
    name: "세무 & 절세",
    description: "최신 세법 변화와 효과적인 절세 전략",
    icon: Calculator,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-900/20"
  },
  {
    key: "management",
    name: "경영 혁신",
    description: "디지털 전환과 경영 혁신 사례 분석",
    icon: Building2,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    key: "networking",
    name: "네트워킹",
    description: "동종업계 리더들과의 교류와 정보 공유",
    icon: Network,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-900/20"
  },
  {
    key: "technology",
    name: "기술 & 혁신",
    description: "최신 기술 트렌드와 혁신 사례 연구",
    icon: Laptop,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
  },
  {
    key: "esg",
    name: "ESG & 지속가능경영",
    description: "ESG 경영과 지속가능한 성장 전략",
    icon: Leaf,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-50 dark:bg-teal-900/20"
  }
];

export const FEATURED_SPEAKERS: Speaker[] = [
  {
    id: "kim-chairman",
    name: "김영철",
    title: "회장",
    company: "한국경영자총협회",
    bio: "30년 이상의 기업 경영 경험을 바탕으로 현재 한국경영자총협회 회장으로 활동하며, 한국 기업의 글로벌 경쟁력 강화를 위해 노력하고 있습니다.",
    expertise: ["경영전략", "리더십", "조직관리", "글로벌경영"]
  },
  {
    id: "park-professor",
    name: "박재성",
    title: "교수",
    company: "서울대학교 경영대학",
    bio: "하버드 비즈니스 스쿨 출신으로 패밀리비즈니스와 가업승계 분야의 국내 최고 권위자입니다.",
    expertise: ["가업승계", "패밀리비즈니스", "지배구조", "승계설계"]
  },
  {
    id: "lee-attorney",
    name: "이수정",
    title: "변호사",
    company: "김앤장 법률사무소",
    bio: "기업법무 전문 변호사로 M&A, 구조조정, 컴플라이언스 분야에서 15년 이상의 경험을 보유하고 있습니다.",
    expertise: ["기업법무", "M&A", "컴플라이언스", "세무법"]
  },
  {
    id: "choi-cio",
    name: "최민수",
    title: "CIO",
    company: "한국투자신탁운용",
    bio: "글로벌 자산운용사에서 20년간 포트폴리오 매니저로 활동하며, 현재 대체투자 분야의 전문가로 인정받고 있습니다.",
    expertise: ["자산운용", "대체투자", "포트폴리오", "리스크관리"]
  }
];

export const UPCOMING_SEMINARS: Seminar[] = [
  {
    id: "leadership-2025-q1",
    title: "2025년 리더십 트렌드와 변화 관리",
    subtitle: "불확실한 시대의 리더십 패러다임",
    description: "급변하는 경영환경에서 요구되는 새로운 리더십 스타일과 조직 변화 관리 전략을 학습합니다.",
    speaker: FEATURED_SPEAKERS[0],
    date: "2025-02-15",
    time: "14:00",
    duration: "3시간",
    location: {
      type: "hybrid",
      venue: "패밀리오피스 S 세미나룸",
      address: "서울시 강남구 테헤란로 123",
      onlineLink: "zoom.us/j/familyoffice",
      capacity: 50
    },
    category: "leadership",
    targetAudience: ["CEO", "임원", "차세대 경영진"],
    capacity: 50,
    registeredCount: 32,
    price: 0,
    isPremium: true,
    status: "upcoming",
    tags: ["리더십", "변화관리", "조직문화", "경영전략"],
    agenda: [
      {
        time: "14:00",
        title: "개회 및 인사말",
        duration: 15
      },
      {
        time: "14:15",
        title: "2025년 리더십 메가트렌드",
        description: "디지털 전환, 세대교체, ESG 경영 시대의 리더십",
        speaker: "김영철 회장",
        duration: 60
      },
      {
        time: "15:15",
        title: "휴식",
        duration: 15
      },
      {
        time: "15:30",
        title: "변화 관리 실전 전략",
        description: "성공적인 조직 변화를 위한 단계별 접근법",
        speaker: "김영철 회장",
        duration: 60
      },
      {
        time: "16:30",
        title: "Q&A 및 네트워킹",
        duration: 30
      }
    ]
  },
  {
    id: "succession-2025-q1",
    title: "체계적인 가업승계 설계와 실행",
    subtitle: "3세대를 위한 승계 로드맵",
    description: "성공적인 가업승계를 위한 체계적인 설계 방법론과 실행 전략을 제시합니다.",
    speaker: FEATURED_SPEAKERS[1],
    date: "2025-02-28",
    time: "10:00",
    duration: "4시간",
    location: {
      type: "offline",
      venue: "롯데호텔 서울 크리스탈볼룸",
      address: "서울시 중구 을지로 30",
      capacity: 80
    },
    category: "succession",
    targetAudience: ["창업주", "2세 경영진", "승계 계획자"],
    capacity: 80,
    registeredCount: 65,
    price: 150000,
    isPremium: false,
    status: "upcoming",
    tags: ["가업승계", "승계설계", "세무전략", "지배구조"],
    agenda: [
      {
        time: "10:00",
        title: "등록 및 환영 인사",
        duration: 30
      },
      {
        time: "10:30",
        title: "가업승계의 핵심 이슈",
        description: "법적, 세무적, 경영적 관점에서의 승계 전략",
        speaker: "박재성 교수",
        duration: 90
      },
      {
        time: "12:00",
        title: "점심 식사 및 네트워킹",
        duration: 60
      },
      {
        time: "13:00",
        title: "승계 설계 실무 워크숍",
        description: "단계별 승계 계획 수립 실습",
        speaker: "박재성 교수",
        duration: 90
      },
      {
        time: "14:30",
        title: "사례 연구 및 토론",
        description: "성공/실패 사례 분석과 교훈",
        duration: 60
      }
    ]
  },
  {
    id: "investment-2025-q1",
    title: "2025년 대체투자 시장 전망",
    subtitle: "프라이빗 마켓의 새로운 기회",
    description: "변화하는 투자 환경에서 대체투자의 역할과 새로운 기회를 탐색합니다.",
    speaker: FEATURED_SPEAKERS[3],
    date: "2025-03-15",
    time: "15:00",
    duration: "2시간",
    location: {
      type: "online",
      onlineLink: "zoom.us/j/investment-seminar"
    },
    category: "investment",
    targetAudience: ["투자결정권자", "자산운용담당자", "재무담당임원"],
    capacity: 100,
    registeredCount: 78,
    price: 50000,
    isPremium: false,
    status: "upcoming",
    tags: ["대체투자", "프라이빗마켓", "포트폴리오", "시장전망"],
    agenda: [
      {
        time: "15:00",
        title: "웨비나 시작 및 소개",
        duration: 10
      },
      {
        time: "15:10",
        title: "2025년 글로벌 대체투자 전망",
        description: "PE, VC, 헤지펀드, 부동산 투자 트렌드",
        speaker: "최민수 CIO",
        duration: 50
      },
      {
        time: "16:00",
        title: "한국 투자자를 위한 전략",
        description: "국내 대체투자 기회와 주의사항",
        speaker: "최민수 CIO",
        duration: 40
      },
      {
        time: "16:40",
        title: "Q&A 세션",
        duration: 20
      }
    ]
  }
];

export const PAST_SEMINARS: Seminar[] = [
  {
    id: "tax-2024-q4",
    title: "2024년 세법 개정과 절세 전략",
    subtitle: "중소중견기업을 위한 실무 가이드",
    description: "2024년 세법 개정 사항을 분석하고 효과적인 절세 방안을 제시했습니다.",
    speaker: {
      id: "tax-expert",
      name: "김세무",
      title: "세무사",
      company: "삼일회계법인",
      bio: "기업세무 전문가로 20년 이상의 경험을 보유하고 있습니다.",
      expertise: ["법인세", "부가가치세", "상속세", "증여세"]
    },
    date: "2024-12-10",
    time: "14:00",
    duration: "3시간",
    location: {
      type: "hybrid",
      venue: "패밀리오피스 S 세미나룸",
      address: "서울시 강남구 테헤란로 123"
    },
    category: "taxation",
    targetAudience: ["CEO", "CFO", "세무담당자"],
    capacity: 60,
    registeredCount: 60,
    price: 0,
    isPremium: true,
    status: "completed",
    tags: ["세법개정", "절세전략", "법인세", "상속세"],
    agenda: [],
    videoUrl: "https://video.familyoffices.vip/tax-2024-q4",
    presentationUrl: "https://slides.familyoffices.vip/tax-2024-q4.pdf"
  },
  {
    id: "esg-2024-q4",
    title: "ESG 경영과 지속가능한 성장",
    subtitle: "중견기업의 ESG 도입 전략",
    description: "ESG 경영의 필요성과 중견기업에 적합한 ESG 전략을 논의했습니다.",
    speaker: {
      id: "esg-expert",
      name: "이지속",
      title: "이사",
      company: "KPMG 한국",
      bio: "ESG 컨설팅 분야의 전문가로 다수의 기업 ESG 도입을 지원했습니다.",
      expertise: ["ESG 전략", "지속가능경영", "ESG 공시", "ESG 평가"]
    },
    date: "2024-11-20",
    time: "10:00",
    duration: "4시간",
    location: {
      type: "offline",
      venue: "코엑스 컨퍼런스룸",
      address: "서울시 강남구 영동대로 513"
    },
    category: "esg",
    targetAudience: ["CEO", "지속가능경영담당자", "IR담당자"],
    capacity: 70,
    registeredCount: 68,
    price: 100000,
    isPremium: false,
    status: "completed",
    tags: ["ESG", "지속가능경영", "ESG공시", "투자자관계"],
    agenda: [],
    presentationUrl: "https://slides.familyoffices.vip/esg-2024-q4.pdf"
  }
];

export const SEMINAR_SERIES: SeminarSeries[] = [
  {
    id: "ceo-mastery-2025",
    title: "CEO 마스터클래스 2025",
    description: "차세대 CEO를 위한 종합 교육 프로그램",
    seminars: ["leadership-2025-q1", "succession-2025-q1", "investment-2025-q1"],
    totalDuration: "9시간",
    price: 500000,
    discount: 0.2,
    certificate: true
  },
  {
    id: "wealth-management-series",
    title: "웰스매니지먼트 시리즈",
    description: "체계적인 자산관리를 위한 전문가 과정",
    seminars: ["investment-2025-q1"],
    totalDuration: "12시간",
    price: 800000,
    discount: 0.15,
    certificate: true
  }
];