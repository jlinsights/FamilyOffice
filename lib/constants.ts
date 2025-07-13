import { ServiceItem, NavigationItem } from "@/types/globals"
import { WealthManagementIcon, InheritanceIcon, TaxLegalIcon } from "@/components/icons/service-icons"

// 네비게이션 메뉴 데이터
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "/about", label: "소개" },
  { href: "/services", label: "서비스" },
  { href: "/program", label: "프로그램" },
  { href: "/faq", label: "FAQ" },
  { href: "/seminar", label: "세미나" },
  { href: "https://recruit.familyoffices.vip/", label: "채용" }
] as const

// 서비스 데이터
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "wealth-management",
    icon: WealthManagementIcon({}),
    title: "통합 자산관리",
    description: "자산 전체를 아우르는 통합적 관점에서 효율적인 자산관리 전략을 수립하고 실행합니다.",
    href: "/services#wealth-management"
  },
  {
    id: "inheritance",
    icon: InheritanceIcon({}),
    title: "상속·증여 설계",
    description: "가족의 미래와 다음 세대를 위한 체계적인 자산 이전 전략을 설계합니다.",
    href: "/services#inheritance"
  },
  {
    id: "tax-legal",
    icon: TaxLegalIcon({}),
    title: "세무·법률 자문",
    description: "복잡한 세무 및 법률 이슈를 효과적으로 해결하고, 최적의 구조를 설계합니다.",
    href: "/services#tax-legal"
  }
] as const

// 프로그램 데이터 (familyoffices.vip 벤치마킹)
export const PROGRAM_DATA = {
  membership: {
    totalMembers: "500+",
    averageAssets: "50억원+",
    industries: ["제조업", "건설업", "IT/벤처", "유통업", "서비스업"],
    memberBenefits: [
      "업종별 CEO 네트워킹",
      "월간 자산관리 세미나",
      "분기별 투자 전략 워크숍",
      "연간 패밀리오피스 컨퍼런스",
      "실시간 시장 정보 공유",
      "전문가 1:1 자문 서비스"
    ]
  },
  events: {
    monthly: "CEO 조찬 모임",
    quarterly: "업종별 라운드테이블",
    annually: "패밀리오피스 서밋"
  },
  exclusiveServices: [
    "프리미엄 투자 정보 리포트",
    "해외 투자 기회 소개",
    "M&A 네트워킹",
    "차세대 경영진 교육 프로그램",
    "가족 자산 승계 전략 컨설팅"
  ]
} as const

// 교육/세미나 프로그램 데이터
export const EDUCATION_PROGRAMS = {
  monthly: [
    "최신 세법 변화와 대응 전략",
    "중대재해처벌법 완전 정복",
    "ESG 경영과 투자 기회"
  ],
  quarterly: [
    "업종별 리스크 관리 전략",
    "가족법인 설립 실무",
    "해외 투자 진출 가이드"
  ],
  annual: [
    "패밀리오피스 트렌드 분석",
    "차세대 승계 전략 수립",
    "글로벌 자산 배분 전략"
  ]
} as const

// 애플리케이션 메타데이터
export const APP_CONFIG = {
  name: "패밀리오피스 VIP",
  description: "대한민국 상위 1% 자산가를 위한 맞춤형 자산관리 솔루션",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://familyoffice-vip.com",
      keywords: "패밀리오피스, 자산관리, 상속, 증여, 세무, 법률, 부동산, 가업승계",
  contact: {
    phone: "☎︎ 0502-5550-8700",
    phoneNumber: "0502-5550-8700",
    email: "info@familyoffices.vip",
    address: "서울 중구 세종대로 73(태평로2가 310) 태평로빌딩 10층",
    businessHours: "평일 09:00 - 18:00"
  }
} as const

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  easing: "cubic-bezier(0.4, 0, 0.2, 1)"
} as const 