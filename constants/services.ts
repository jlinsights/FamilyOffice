import { Building, Cpu, Hammer, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface IndustryService {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const INDUSTRY_SERVICES: IndustryService[] = [
  {
    icon: Hammer,
    title: "제조업",
    description: "제조업 특유의 자산구조와 리스크를 고려한 맞춤형 자산관리 및 보험 설계",
    features: ["기업재해보장보험", "설비 투자 컨설팅", "공장 부동산 관리", "프로젝트 파이낸싱"]
  },
  {
    icon: Building,
    title: "건설업",
    description: "프로젝트별 자금 운용과 시공 리스크에 최적화된 자산관리 및 보장 설계",
    features: ["시공보증보험", "하도급 리스크 관리", "프로젝트 자금 컨설팅", "부동산 투자"]
  },
  {
    icon: Cpu,
    title: "IT·벤처기업",
    description: "성장 단계별 투자 전략과 핵심인재 유지, 스톡옵션 등 IT기업 특화 자산관리",
    features: ["정책자금 활용", "핵심인재 보험", "스톡옵션 설계", "IPO 준비 지원"]
  },
  {
    icon: Users,
    title: "가족법인·MSO",
    description: "가족법인 설립부터 MSO 운영까지 세대를 넘어드는 자산관리 및 승계 설계",
    features: ["법인 구조 설계", "경영권 승계", "세무 최적화", "자녀 교육 펀드"]
  }
];
