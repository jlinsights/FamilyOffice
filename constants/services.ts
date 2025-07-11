import { Building, Cpu, Hammer, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * 업종별 특화 서비스 데이터 구조 (프리미엄 컨설팅 브랜드 기준)
 */
export interface IndustryService {
  icon: LucideIcon;
  title: string;
  description: string;
  painPoints: string[]; // 업종별 주요 고민/문제
  solutions: string[];  // FamilyOffice S만의 맞춤 솔루션
  caseStudy: {
    company: string;
    challenge: string;
    solution: string;
    result: string;
  };
  differentiators: string[]; // 차별화 포인트
  expertComment: string;     // 전문가 코멘트/인용구
}

export const INDUSTRY_SERVICES: IndustryService[] = [
  {
    icon: Hammer,
    title: "제조업",
    description: "제조업 특유의 자산구조와 리스크를 고려한 맞춤형 자산관리 및 보험 설계",
    painPoints: [
      "중대재해처벌법 등 규제 강화로 인한 리스크 증가",
      "설비 투자 및 공장 부동산 관리의 복잡성",
      "원자재 가격 변동성 및 공급망 리스크",
      "가업승계 및 세무 이슈"
    ],
    solutions: [
      "기업재해보장보험 및 생산설비 특화 보험 설계",
      "공장 부동산 자산 최적화 컨설팅",
      "원자재 리스크 헤지 및 공급망 관리 솔루션",
      "가업승계 맞춤 세무·법률 자문"
    ],
    caseStudy: {
      company: "중견 자동차부품 제조업 K사",
      challenge: "중대재해처벌법 시행으로 CEO 형사처벌 리스크 증가, 안전관리체계 구축 및 관련 보험 필요",
      solution: "기업재해보장보험 설계, 안전관리 컨설팅, CEO 개인보험 최적화를 통한 통합 솔루션 제공",
      result: "연간 보험료 30% 절감과 동시에 포괄적 리스크 커버리지 달성"
    },
    differentiators: [
      "제조업 특화 보험·자산관리 노하우",
      "공장 부동산·설비 투자 통합 컨설팅",
      "실제 제조업 성공사례 기반 솔루션"
    ],
    expertComment: "제조업은 규제와 리스크가 빠르게 변화합니다. FamilyOffice S는 업계 실무 경험을 바탕으로, CEO의 안심 경영을 지원합니다."
  },
  {
    icon: Building,
    title: "건설업",
    description: "프로젝트별 자금 운용과 시공 리스크에 최적화된 자산관리 및 보장 설계",
    painPoints: [
      "프로젝트별 자금 운용의 불확실성",
      "시공 리스크 및 하도급 관리의 어려움",
      "공사이행보증 등 보험 설계 복잡성",
      "대형 프로젝트 자금조달 및 리스크 관리"
    ],
    solutions: [
      "프로젝트별 맞춤 시공보증보험 설계",
      "하도급 리스크 관리 및 법률 자문",
      "프로젝트 파이낸싱 및 자금 컨설팅",
      "건설업 특화 리스크 관리 솔루션"
    ],
    caseStudy: {
      company: "종합건설업 L사",
      challenge: "고위험 업종으로 보험료 부담 과다, 프로젝트별 리스크 관리 체계 필요",
      solution: "업종 특화 보험 패키지 설계, 프로젝트별 보험 최적화, 안전관리 시스템 도입 지원",
      result: "보험비용 25% 절감, 프로젝트 리스크 관리 체계 확립"
    },
    differentiators: [
      "건설업 프로젝트별 맞춤 컨설팅",
      "하도급·시공 리스크 통합 관리",
      "프로젝트 파이낸싱 전문성"
    ],
    expertComment: "건설업은 프로젝트마다 리스크와 자금 흐름이 다릅니다. FamilyOffice S는 현장 중심의 맞춤 솔루션을 제공합니다."
  },
  {
    icon: Cpu,
    title: "IT·벤처기업",
    description: "성장 단계별 투자 전략과 핵심인재 유지, 스톡옵션 등 IT기업 특화 자산관리",
    painPoints: [
      "정책자금 및 투자 유치의 어려움",
      "핵심인재 이탈 및 인센티브 설계",
      "스톡옵션 세무 이슈",
      "IPO 준비 및 성장 전략"
    ],
    solutions: [
      "정책자금 활용 컨설팅 및 투자 유치 지원",
      "핵심인재 retention 프로그램 설계",
      "스톡옵션·퇴직연금 세무 최적화",
      "IPO 준비 맞춤 자문"
    ],
    caseStudy: {
      company: "AI 기술 스타트업 M사",
      challenge: "Series B 투자 유치 후 핵심인재 retention과 세무 최적화 필요",
      solution: "스톡옵션 설계, 핵심인재 인센티브 프로그램, 법인 구조 최적화",
      result: "핵심인재 retention rate 95% 달성, 세무비용 40% 절감"
    },
    differentiators: [
      "IT·벤처기업 성장 단계별 맞춤 컨설팅",
      "정책자금·투자 유치 실전 경험",
      "스톡옵션·세무 최적화 전문성"
    ],
    expertComment: "IT·벤처기업은 빠른 성장과 인재 확보가 핵심입니다. FamilyOffice S는 성장 단계별로 최적의 전략을 제시합니다."
  },
  {
    icon: Users,
    title: "가족법인·MSO",
    description: "가족법인 설립부터 MSO 운영까지 세대를 넘어드는 자산관리 및 승계 설계",
    painPoints: [
      "가족/자녀법인 설립 및 지배구조 설계의 복잡성",
      "경영권 승계 및 세무 이슈",
      "다중 사업(MSO) 운영의 리스크",
      "차세대 교육 및 자산 승계"
    ],
    solutions: [
      "가족/자녀법인 설립 및 지배구조 설계",
      "경영권 승계 맞춤 전략 및 세무 자문",
      "MSO 구조화 및 리스크 관리",
      "차세대 교육 펀드 및 승계 설계"
    ],
    caseStudy: {
      company: "2세 제조업체 N사",
      challenge: "창업주 고령화로 승계 준비 필요, 복잡한 가족 자산 정리 필요",
      solution: "가족법인 설립, 지분 승계 전략, 세무 최적화를 통한 단계별 승계 설계",
      result: "승계세 30% 절감, 경영권 안정적 이전 완료"
    },
    differentiators: [
      "가족법인·MSO 설계 실전 경험",
      "승계·세무·교육 통합 컨설팅",
      "세대를 잇는 자산관리 노하우"
    ],
    expertComment: "가족법인과 MSO는 단순한 법인 설립이 아닙니다. FamilyOffice S는 세대를 잇는 자산관리와 승계를 지원합니다."
  }
];
