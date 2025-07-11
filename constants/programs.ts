import { Coffee, BookOpen, Globe, Brain, Users, TrendingUp, Building2, Crown, Network, Trophy, Target } from "lucide-react";
import type { MembershipStat, MemberBenefit, ExclusiveProgramCategory, EducationPrograms, SpecialProgram } from "@/types/program";

export const MEMBERSHIP_STATS: MembershipStat[] = [
  { icon: Users, value: "500+", label: "프리미엄 멤버", description: "검증된 중소중견기업 CEO들" },
  { icon: TrendingUp, value: "50억원+", label: "평균 관리 자산", description: "수준 높은 자산관리 니즈" },
  { icon: Building2, value: "5개", label: "주요 업종", description: "업종별 전문 네트워킹" },
  { icon: Crown, value: "VIP", label: "멤버십 등급", description: "배타적 프리미엄 서비스" }
];

export const MEMBER_BENEFITS: MemberBenefit[] = [
  { icon: Coffee, title: "월간 CEO 조찬 모임", description: "매월 첫째 주 목요일, 업계 리더들과의 정기 네트워킹", details: ["업계 트렌드 정보 공유", "경영 현안 토론", "비즈니스 협력 기회 발굴"] },
  { icon: BookOpen, title: "분기별 전략 워크숍", description: "업종별 맞춤형 전략 세션과 전문가 초청 강연", details: ["업종별 라운드테이블", "전문가 1:1 멘토링", "실무진 교육 프로그램"] },
  { icon: Globe, title: "해외 투자 기회 공유", description: "글로벌 투자 정보와 해외 진출 기회 공유", details: ["해외 시장 분석 리포트", "현지 파트너 소개", "투자 기회 공동 검토"] },
  { icon: Brain, title: "차세대 경영진 교육", description: "자녀 및 후계자를 위한 체계적 경영 교육 프로그램", details: ["리더십 개발 과정", "해외 연수 프로그램", "멘토링 시스템"] }
];

export const EXCLUSIVE_PROGRAMS: ExclusiveProgramCategory[] = [
  { category: "네트워킹", icon: Network, programs: [
    { name: "업종별 CEO 라운드테이블", frequency: "분기 1회", description: "제조업, 건설업, IT/벤처 등 업종별 심화 토론" },
    { name: "프리미엄 골프 모임", frequency: "월 1회", description: "라운딩을 통한 자연스러운 네트워킹과 관계 형성" },
    { name: "가족 동반 이벤트", frequency: "연 2회", description: "가족 단위 참여 가능한 특별 이벤트" }
  ] },
  { category: "교육", icon: Trophy, programs: [
    { name: "패밀리오피스 마스터클래스", frequency: "연 4회", description: "고급 자산관리 전략과 승계 설계 집중 교육" },
    { name: "글로벌 경제 전망 세미나", frequency: "분기 1회", description: "해외 석학 초청 글로벌 경제 트렌드 분석" },
    { name: "차세대 CEO 아카데미", frequency: "연중 운영", description: "후계자를 위한 체계적 경영 교육 과정" }
  ] },
  { category: "투자", icon: Target, programs: [
    { name: "프라이빗 투자 기회 소개", frequency: "수시", description: "검증된 프라이빗 투자 기회 우선 소개" },
    { name: "공동 투자 프로젝트", frequency: "분기 1회", description: "멤버 간 공동 투자 기회 발굴 및 진행" },
    { name: "M&A 딜 네트워킹", frequency: "월 1회", description: "M&A 정보 공유 및 파트너 매칭" }
  ] }
];

export const EDUCATION_PROGRAMS: EducationPrograms = {
  monthly: ["최신 세법 변화와 대응 전략", "중대재해처벌법 완전 정복", "ESG 경영과 투자 기회"],
  quarterly: ["업종별 리스크 관리 전략", "가족법인 설립 실무", "해외 투자 진출 가이드"],
  annual: ["패밀리오피스 트렌드 분석", "차세대 승계 전략 수립", "글로벌 자산 배분 전략"]
};

export const CEO_PROGRAMS: SpecialProgram[] = [
  { title: "2030 Business Live On", subtitle: "경제, 경영, 인문 등 명사 강연 및 조찬 (온/오프라인)", desc: "경영, 산업 트렌드, 리더십, 인문학 등 다양한 강연을 통해 사회의 리더로서 올바른 경영 철학을 고민하는 시간. 미래를 바라보는 지혜와 창조적 영감을 얻을 수 있습니다.", place: "서울 세미나룸 및 온라인 접속", target: "VIP 고객", freq: "월1회" },
  { title: "CEO 명경재(明鏡齋)", subtitle: "법인CEO 고객을 위한 소수정예 인문학 클럽", desc: "명경재는 매우 맑은 거울에 자신을 비추며 함께 공부하는 곳을 의미합니다. 책의 저자와 함께 하는 강연을 통해 자신의 내면을 돌아보고, 자유로운 소통으로 인문학적 혜안을 나눕니다.", place: "서울 세미나룸", target: "VIP 고객", freq: "반기 1회" },
  { title: "100년 기업 차세대 CEO 과정", subtitle: "경영 2,3세 가업승계 재직자 고객을 위한 교육 과정", desc: "가업승계의 방향과 트렌드를 선도하는 비즈니스 사례를 통해 실질적인 경영 노하우를 습득할 수 있는 다양한 커리큘럼 제공. 사업의 확장과 발전을 도모하며, 교육생들 간의 상호 네트워크를 구축합니다.", place: "서울 세미나룸", target: "가업승계 재직 중인 경영 2,3세", freq: "연1회" },
  { title: "Global Insight Program", subtitle: "가업승계 대상 재학생 고객을 위한 과정", desc: "가문의 시작, 발전, 승계, 가치는 4가지 CORE VALUE에 입각하여 가문의 시작인 '나'로부터 나의 가족, 근원을 탐색하고 미래를 정립합니다. 미래 경영 리더로서의 경영 방향에 가이드를 제공합니다.", place: "서울 세미나룸 및 외부 장소", target: "VIP 고객의 자녀", freq: "연1회" }
];

export const ASSET_PROGRAMS: SpecialProgram[] = [
  { title: "예술자산클래스 ART", subtitle: "문화 예술에 관심있는 고객을 위한 과정", desc: "예술은 인문학적 소양과 예술적 감각 뿐 아니라, 자테크의 방법으로까지 활용되고 있습니다. 강연, 전시회/경매 관람 등 예술을 다각도로 바라보는 관점을 키웁니다.", place: "서울 세미나룸", target: "예술에 관심이 있는 VIP 고객", freq: "반기 1회" },
  { title: "WM 부동산 아카데미", subtitle: "부동산 투자/세금 교육 및 유망 상권 필드트립 과정", desc: "부동산은 가문을 이어나갈 중점 자산인 만큼 장기적인 안목과 관리가 필요합니다. 관련 세법/투자 강의 및 수도권 주요지역 물건 답사를 통해 실전 감각을 키웁니다.", place: "세미나룸 및 현장 필드트립", target: "부동산 투자에 관심이 있는 VIP 고객", freq: "연1회" },
  { title: "WM VIP 여성고객 초청 프로그램", subtitle: "4060 여성고객을 위한 문화 참여 프로그램", desc: "VIP 여성고객의 품격과 여유를 위해, 시즌별 여성들의 주요 관심사에 대한 강연 및 명소 투어를 통한 힐링과 삶의 여유를 느끼실 수 있습니다.", place: "서울 세미나룸", target: "VIP 여성고객", freq: "연 1회" },
  { title: "WM 프라이빗 골프대회", subtitle: "프로 골퍼와 함께 필드를 누빌 수 있는 기회", desc: "골프는 이제 대중적인 스포츠가 되었지만, 여전히 상류층들의 주된 네트워크의 수단으로 활용되고 있습니다. 프로 골퍼와 함께 필드에서 다양한 기술과 VIP들과의 인연을 쌓으실 수 있습니다.", place: "각 지역별 주요 골프CC", target: "VIP 고객", freq: "운영 사업부별 연 1회" }
];
