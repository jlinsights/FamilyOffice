import {
  Building,
  Cpu,
  Hammer,
  Users,
  FileText,
  TrendingUp,
  Shield,
  Calculator,
  Gavel,
  BrainCircuit,
  Target,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

/**
 * 전문 서비스 카테고리 정의
 */
export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  services: DetailedService[];
}

export interface DetailedService {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  targetClient: string;
  caseStudy?: {
    situation: string;
    solution: string;
    result: string;
  };
}

/**
 * 업종별 특화 서비스 데이터 구조
 */
export interface IndustryService {
  icon: LucideIcon;
  title: string;
  description: string;
  painPoints: string[];
  solutions: string[];
  caseStudy: {
    company: string;
    challenge: string;
    solution: string;
    result: string;
  };
  differentiators: string[];
  expertComment: string;
}

/**
 * SEO 페이지 매핑 정의
 */
export const SEO_PAGE_MAPPING: { [key: string]: string } = {
  '가업승계지원 제도 컨설팅': '/business-succession',
  '가업주식증여특례': '/business-succession',
  '가업상속공제': '/business-succession',
  '자녀법인 활용 전략': '/business-succession',
  '창업자금증여특례': '/business-succession',
  '법인계약 세무회계': '/tax-planning',
  '보험계약 상증세법 컨설팅': '/tax-planning',
  '개인사업자 법인전환': '/tax-planning',
  '경정청구 컨설팅': '/tax-planning',
  '가지급금 컨설팅': '/estate-planning',
  '자기주식 컨설팅': '/estate-planning',
  '차명주식 컨설팅': '/estate-planning',
  '법인종합재무 컨설팅': '/estate-planning',
  '상환전환우선주 발행': '/investment-advisory',
  '중소기업 자금조달': '/investment-advisory',
  '비상장주식 가치평가': '/investment-advisory',
  '기업연구소 및 정책자금 컨설팅': '/policy-funds',
  '유상증자 컨설팅': '/asset-diversification',
  '스톡옵션 설계': '/asset-diversification',
  '기업인증 컨설팅': '/business-certification',
  '법인 재무제표 분석': '/portfolio-optimization',
  '양수도거래 컨설팅': '/portfolio-optimization',
  '세법개정안 분석': '/portfolio-optimization',
  '세무조정계산서의 이해': '/portfolio-optimization',
  '고액자산가 자산관리': '/wealth-consulting',
  '부유층 자산관리 컨설팅': '/wealth-consulting'
};

/**
 * 전문 서비스 카테고리별 상세 서비스
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'corporate-governance',
    title: '법인 지배구조 & 컨설팅',
    description: '정관 설계부터 임원 운영까지 법인 경영의 모든 영역',
    icon: Gavel,
    services: [
      {
        title: '정관 및 배당 컨설팅',
        description:
          '법인 운영의 기본틀이 되는 정관 설계와 최적화된 배당정책 수립',
        features: [
          '맞춤형 정관 설계 및 개정',
          '배당정책 최적화 전략',
          '주주권리 보호 조항 설계',
          '정관변경 등기 실무',
        ],
        benefits: [
          '법인 운영 리스크 최소화',
          '세무 효율성 극대화',
          '주주간 분쟁 사전 예방',
        ],
        targetClient: '법인 설립 초기 단계 또는 정관 개정이 필요한 기업',
        caseStudy: {
          situation: '가족기업 A사, 2세 승계를 위한 정관 개정 필요',
          solution: '차등의결권 도입 및 배당정책 최적화를 통한 정관 전면 개정',
          result: '승계과정에서 30% 세무비용 절감 및 경영권 안정화 달성',
        },
      },
      {
        title: 'CEO유고시 리스크 관리',
        description: '경영진 유고 상황에 대비한 종합적 리스크 관리체계 구축',
        features: [
          'CEO 유고시 경영권 승계 시나리오 설계',
          'Key-person 보험 설계 및 운영',
          '임시 경영체계 구축',
          '법적 대응 매뉴얼 작성',
        ],
        benefits: [
          '경영 연속성 보장',
          '기업가치 하락 방지',
          '이해관계자 신뢰 유지',
        ],
        targetClient: 'CEO 의존도가 높은 중견기업 및 가족기업',
      },
      {
        title: '임원소득보장플랜',
        description: '임원진의 안정적 소득 보장과 인센티브 시스템 설계',
        features: [
          '임원 보수체계 설계',
          '퇴직금지급규정 제정',
          '인센티브 시스템 구축',
          '임원 전용 복리후생 설계',
        ],
        benefits: [
          '핵심인재 retention 강화',
          '세무 효율성 제고',
          '경영성과 향상',
        ],
        targetClient: '핵심임원 이탈 우려가 있는 성장기업',
      },
    ],
  },
  {
    id: 'hr-support',
    title: '인사노무 & 지원제도',
    description: '중소기업 특화 인사관리부터 정부지원금까지',
    icon: Users,
    services: [
      {
        title: '중소기업 노무관리',
        description: '중소기업 맞춤형 인사노무 시스템 구축 및 운영 지원',
        features: [
          '노무관리 시스템 구축',
          '근로계약서 및 취업규칙 정비',
          '급여체계 설계',
          '노무 리스크 관리',
        ],
        benefits: ['노무 분쟁 사전 예방', '인건비 최적화', '직원 만족도 향상'],
        targetClient: '50인 이하 중소기업 CEO',
      },
      {
        title: '고용지원금 컨설팅',
        description: '다양한 정부 고용지원금 신청 및 관리 전문 서비스',
        features: [
          '고용지원금 발굴 및 신청 대행',
          '지원금 관리 및 사후관리',
          '고용 계획 수립 지원',
          '정부정책 모니터링',
        ],
        benefits: [
          '인건비 부담 경감',
          '고용 창출 인센티브 활용',
          '정부정책 선제적 대응',
        ],
        targetClient: '신규 채용 계획이 있는 중소기업',
      },
      {
        title: '사내근로복지기금',
        description: '직원 복리후생 향상과 세무혜택을 동시에 확보',
        features: [
          '복지기금 설립 및 운영',
          '복지제도 설계',
          '세무혜택 최적화',
          '복지기금 투자관리',
        ],
        benefits: ['법인세 절감효과', '직원 복리후생 향상', '기업 이미지 제고'],
        targetClient: '직원 복리후생 개선이 필요한 성장기업',
      },
    ],
  },
  {
    id: 'tax-accounting',
    title: '세무회계 & 절세전략',
    description: '법인 세무부터 개인 절세까지 통합 세무 솔루션',
    icon: Calculator,
    services: [
      {
        title: '법인계약 세무회계',
        description: '법인의 모든 세무업무를 전문가가 직접 관리',
        features: [
          '월별 세무신고 및 관리',
          '연말정산 및 종합소득세 신고',
          '부가가치세 신고',
          '세무조정 및 신고서 작성',
        ],
        benefits: ['세무 리스크 최소화', '절세 기회 발굴', '업무 효율성 향상'],
        targetClient: '세무업무 전담인력이 없는 중소기업',
      },
      {
        title: '보험계약 상증세법 컨설팅',
        description: '보험계약과 관련된 상속증여세 최적화 전략',
        features: [
          '보험계약 세무 설계',
          '상속증여세 절감 전략',
          '보험금 수령 최적화',
          '세무조사 대응',
        ],
        benefits: ['상속세 부담 경감', '보험 활용 극대화', '세무 안정성 확보'],
        targetClient: '고액 보험계약을 보유한 자산가',
      },
      {
        title: '개인사업자 법인전환',
        description: '개인사업자의 법인 전환을 통한 절세 및 사업 확장',
        features: [
          '법인전환 시뮬레이션',
          '최적 전환 시기 분석',
          '법인설립 실무',
          '전환 후 세무관리',
        ],
        benefits: [
          '세금 부담 대폭 경감',
          '사업 확장 기반 마련',
          '대외 신용도 향상',
        ],
        targetClient: '매출 증가로 세부담이 커진 개인사업자',
        caseStudy: {
          situation: '연매출 5억원 개인사업자 B씨, 세부담 과다로 법인전환 검토',
          solution: '법인전환 시뮬레이션 후 최적 시기에 법인설립 및 사업이관',
          result: '연간 2,000만원 세금 절감 및 사업 확장 기반 구축',
        },
      },
      {
        title: '경정청구 컨설팅',
        description: '과다 납부한 세금의 환급을 위한 전문 컨설팅',
        features: [
          '과세적부 검토',
          '경정청구서 작성 및 제출',
          '세무조사 대응',
          '환급금 최대화 전략',
        ],
        benefits: ['과납세액 환급', '세무 정확성 제고', '향후 절세 기회 발굴'],
        targetClient: '세무신고 오류로 과다 납부 가능성이 있는 기업',
      },
    ],
  },
  {
    id: 'investment-finance',
    title: '투자금융 & 자금조달',
    description: '자본시장 활용부터 가치평가까지 금융 전문 서비스',
    icon: TrendingUp,
    services: [
      {
        title: '상환전환우선주 발행',
        description: '투자 유치 및 자금 조달을 위한 우선주 발행 전문 서비스',
        features: [
          '우선주 조건 설계',
          '투자계약서 작성',
          '법무 및 세무 검토',
          '발행 실무 지원',
        ],
        benefits: [
          '유연한 자금 조달',
          '경영권 희석 최소화',
          '투자자 관계 최적화',
        ],
        targetClient: '성장자금이 필요한 벤처기업 및 중견기업',
      },
      {
        title: '중소기업 자금조달',
        description: '다양한 자금조달 방법을 통한 맞춤형 금융 솔루션',
        features: [
          '자금조달 전략 수립',
          '정책자금 신청 지원',
          '은행 대출 중개',
          '투자 유치 지원',
        ],
        benefits: [
          '자금조달 성공률 향상',
          '금융비용 최소화',
          '재무구조 최적화',
        ],
        targetClient: '운영자금 또는 투자자금이 필요한 중소기업',
      },
      {
        title: '비상장주식 가치평가',
        description: '전문적이고 객관적인 기업가치 평가 서비스',
        features: [
          'DCF, 시장비교법 등 다각적 평가',
          '업종별 특성 반영',
          '세무목적 평가서 작성',
          'M&A 목적 평가',
        ],
        benefits: [
          '객관적 기업가치 산정',
          '세무 리스크 최소화',
          'M&A 협상력 강화',
        ],
        targetClient: '주식 거래, 증여, 상속이 예정된 기업',
      },
      {
        title: '기업연구소 및 정책자금 컨설팅',
        description: '연구개발 지원제도 활용 및 기업부설연구소 설립 지원',
        features: [
          '기업부설연구소 설립',
          'R&D 과제 기획 및 신청',
          '정부지원사업 발굴',
          '연구개발비 세액공제 최적화',
        ],
        benefits: ['R&D 지원금 확보', '세액공제 혜택', '기술개발 역량 강화'],
        targetClient: '기술개발 투자를 계획하는 제조업 및 IT기업',
      },
    ],
  },
  {
    id: 'asset-management',
    title: '자산관리 & 구조화',
    description: '가지급금부터 자기주식까지 기업자산 통합 관리',
    icon: Shield,
    services: [
      {
        title: '가지급금 컨설팅',
        description: '가지급금 발생 예방 및 기존 가지급금 정리 전문 서비스',
        features: [
          '가지급금 현황 분석',
          '정리 방안 수립',
          '세무 리스크 관리',
          '내부통제 시스템 구축',
        ],
        benefits: [
          '세무조사 리스크 해소',
          '의제배당 부담 경감',
          '재무제표 건전성 확보',
        ],
        targetClient: '가지급금 문제가 있는 중소기업 및 가족기업',
        caseStudy: {
          situation: '제조업 C사, 5억원 가지급금으로 세무조사 우려',
          solution: '단계적 가지급금 정리 및 내부통제시스템 구축',
          result: '3년간 단계적 정리로 의제배당 부담 80% 절감',
        },
      },
      {
        title: '자기주식 컨설팅',
        description: '자기주식 취득 및 처분을 통한 재무구조 최적화',
        features: [
          '자기주식 취득 전략',
          '주주총회 결의 지원',
          '취득 및 처분 실무',
          '세무 영향 분석',
        ],
        benefits: ['재무구조 개선', '주가 안정화', '배당정책 유연성 확보'],
        targetClient: '재무구조 개선이 필요한 상장기업 및 비상장기업',
      },
      {
        title: '차명주식 컨설팅',
        description: '차명주식 정리 및 실명화를 통한 법적 리스크 해소',
        features: [
          '차명주식 현황 조사',
          '실명화 방안 수립',
          '법적 절차 진행',
          '세무 영향 최소화',
        ],
        benefits: ['법적 리스크 해소', '경영권 안정화', '세무 투명성 확보'],
        targetClient: '차명주식 문제를 해결해야 하는 기업',
      },
      {
        title: '법인종합재무 컨설팅',
        description: '기업의 재무전략 수립부터 실행까지 종합 컨설팅',
        features: [
          '재무전략 수립',
          '자본구조 최적화',
          '배당정책 설계',
          '재무 리스크 관리',
        ],
        benefits: ['재무 효율성 극대화', '기업가치 제고', '투자자 신뢰 확보'],
        targetClient: '재무전략 고도화가 필요한 중견기업',
      },
    ],
  },
  {
    id: 'business-succession',
    title: '가업승계 & 증여상속',
    description: '세대를 잇는 체계적인 승계 설계 및 실행',
    icon: Target,
    services: [
      {
        title: '가업승계지원 제도 컨설팅',
        description: '중소기업 가업승계 지원제도를 활용한 최적화된 승계 설계',
        features: [
          '가업승계 계획 수립',
          '정부지원제도 활용',
          '승계 실행 지원',
          '사후관리 서비스',
        ],
        benefits: [
          '승계비용 대폭 절감',
          '정부지원 최대 활용',
          '안정적 경영권 이전',
        ],
        targetClient: '1세 경영자의 가업승계를 준비하는 중소기업',
      },
      {
        title: '가업주식증여특례',
        description: '가업용 자산의 증여세 납부유예 및 면제 혜택 활용',
        features: [
          '가업증여 요건 검토',
          '증여계획 수립',
          '신고 및 승인 지원',
          '의무이행 관리',
        ],
        benefits: ['증여세 납부유예', '조건 충족시 면제', '체계적 승계 실행'],
        targetClient: '중소기업 또는 중견기업 가업승계 대상자',
      },
      {
        title: '가업상속공제',
        description: '가업용 자산 상속시 상속세 부담을 대폭 경감',
        features: [
          '가업상속 요건 분석',
          '공제한도 최적화',
          '상속세 신고',
          '사후의무 관리',
        ],
        benefits: ['상속세 대폭 절감', '가업 연속성 보장', '경영 안정성 확보'],
        targetClient: '가업상속이 예상되는 기업가 가족',
      },
      {
        title: '자녀법인 활용 전략',
        description: '자녀법인 설립 및 운영을 통한 절세 및 승계 전략',
        features: [
          '자녀법인 설립 전략',
          '사업이관 계획',
          '세무 최적화',
          '리스크 관리',
        ],
        benefits: ['승계세 부담 경감', '경영권 분산 방지', '차세대 경영 교육'],
        targetClient: '체계적 승계를 준비하는 기업가',
      },
      {
        title: '창업자금증여특례',
        description: '창업자금 증여시 증여세 감면 혜택을 최대한 활용',
        features: [
          '증여특례 요건 검토',
          '창업계획 수립 지원',
          '신고 및 승인',
          '사후관리',
        ],
        benefits: [
          '증여세 100% 면제',
          '창업 성공률 제고',
          '차세대 사업 기반 구축',
        ],
        targetClient: '자녀의 창업을 지원하려는 부모',
      },
    ],
  },
  {
    id: 'corporate-structure',
    title: '법인구조 & 등기실무',
    description: '법인설립부터 구조변경까지 기업 생애주기 전반',
    icon: FileText,
    services: [
      {
        title: '법인설립등기 및 사업자등록 실무',
        description: '법인설립부터 각종 인허가까지 원스톱 서비스',
        features: [
          '법인설립 등기',
          '사업자등록 신청',
          '각종 인허가 신청',
          '설립 후 세무신고',
        ],
        benefits: ['신속한 사업 시작', '법적 리스크 최소화', '행정업무 효율화'],
        targetClient: '법인설립을 준비하는 예비창업자',
      },
      {
        title: '유상증자 컨설팅',
        description: '유상증자를 통한 자금조달 및 자본구조 개선',
        features: [
          '증자 방식 결정',
          '주주총회 결의',
          '증자 실행',
          '등기 및 신고',
        ],
        benefits: ['자금조달 성공', '자본구조 개선', '재무 안정성 확보'],
        targetClient: '자금조달이 필요한 성장기업',
      },
      {
        title: '스톡옵션 설계',
        description: '핵심인재 유지를 위한 효과적인 스톡옵션 제도 설계',
        features: [
          '스톡옵션 제도 설계',
          '세무 최적화 방안',
          '계약서 작성',
          '운영 지원',
        ],
        benefits: ['핵심인재 retention', '세무 효율성', '동기부여 효과'],
        targetClient: '핵심인재 확보가 중요한 성장기업',
      },
      {
        title: '기업인증 컨설팅',
        description: '벤처기업, 이노비즈 등 각종 기업인증 획득 지원',
        features: [
          '인증 요건 분석',
          '신청서류 작성',
          '심사 대응 지원',
          '사후관리',
        ],
        benefits: ['정부지원 자격 확보', '세제혜택 획득', '기업 신뢰도 향상'],
        targetClient: '기업인증 취득이 필요한 중소기업',
      },
    ],
  },
  {
    id: 'analysis-planning',
    title: '분석기획 & 전략수립',
    description: '데이터 기반 의사결정과 미래전략 수립',
    icon: BrainCircuit,
    services: [
      {
        title: '법인 재무제표 분석',
        description: '재무제표 심층 분석을 통한 경영 개선방안 도출',
        features: [
          '재무비율 분석',
          '동종업계 비교',
          '트렌드 분석',
          '개선방안 제시',
        ],
        benefits: ['경영현황 정확한 파악', '개선영역 식별', '투자자 신뢰 확보'],
        targetClient: '재무분석이 필요한 모든 기업',
      },
      {
        title: '양수도거래 컨설팅',
        description: '기업 인수합병 과정의 전문적 지원 및 컨설팅',
        features: [
          '기업가치 평가',
          'Due Diligence 지원',
          '거래구조 설계',
          '계약 협상 지원',
        ],
        benefits: ['성공적 M&A 실행', '거래가격 최적화', '리스크 최소화'],
        targetClient: 'M&A를 추진하는 기업',
      },
      {
        title: '세법개정안 분석',
        description: '세법 변화에 선제적으로 대응하기 위한 전문 분석 서비스',
        features: [
          '세법개정 영향 분석',
          '대응전략 수립',
          '실무지침 제공',
          '정기 업데이트',
        ],
        benefits: [
          '세법 변화 선제 대응',
          '세무 리스크 최소화',
          '절세 기회 포착',
        ],
        targetClient: '세법 변화의 영향을 받는 모든 기업',
      },
      {
        title: '세무조정계산서의 이해',
        description: '복잡한 세무조정 과정의 이해와 최적화 방안 제시',
        features: [
          '세무조정 교육',
          '계산서 작성 지원',
          '오류 검토 및 수정',
          '절세 포인트 발굴',
        ],
        benefits: ['세무신고 정확성 제고', '절세 기회 확대', '세무 역량 강화'],
        targetClient: '세무조정에 어려움을 겪는 기업',
      },
    ],
  },
  {
    id: 'wealth-management',
    title: '고액자산가 & 부유층 관리',
    description: '고액자산가를 위한 전문적인 자산관리 및 부유층 맞춤 서비스',
    icon: TrendingUp,
    services: [
      {
        title: '고액자산가 자산관리',
        description: '100억원 이상 고액자산가를 위한 종합 자산관리 서비스',
        features: [
          '개인별 맞춤형 포트폴리오 구성',
          '글로벌 자산 배분 전략',
          '세무 최적화 방안',
          '위험 관리 솔루션',
        ],
        benefits: [
          '체계적인 자산 보전',
          '수익성 극대화',
          '세무 효율성 제고',
        ],
        targetClient: '100억원 이상 고액자산가',
        caseStudy: {
          situation: '제조업 오너 D씨, 500억원 자산의 체계적 관리 필요',
          solution: '글로벌 자산배분, 세무최적화, 리스크헤지를 통한 통합 자산관리',
          result: '연 15% 수익률 달성, 세금 부담 30% 절감',
        },
      },
      {
        title: '부유층 자산관리 컨설팅',
        description: '중상류층을 위한 전문적이고 체계적인 자산관리 컨설팅',
        features: [
          '자산 규모별 맞춤 전략',
          '다양한 투자 상품 포트폴리오',
          '세대간 자산 승계 설계',
          '정기적인 자산 점검',
        ],
        benefits: [
          '안정적인 자산 증식',
          '리스크 분산',
          '승계 준비',
        ],
        targetClient: '50억원 이상 중상류층',
      },
    ],
  },
];

/**
 * 업종별 특화 서비스 (기존 구조 유지)
 */
export const INDUSTRY_SERVICES: IndustryService[] = [
  {
    icon: Hammer,
    title: '제조업',
    description:
      '제조업 특유의 자산구조와 리스크를 고려한 맞춤형 자산관리 및 보험 설계',
    painPoints: [
      '중대재해처벌법 등 규제 강화로 인한 리스크 증가',
      '설비 투자 및 공장 부동산 관리의 복잡성',
      '원자재 가격 변동성 및 공급망 리스크',
      '가업승계 및 세무 이슈',
    ],
    solutions: [
      '기업재해보장보험 및 생산설비 특화 보험 설계',
      '공장 부동산 자산 최적화 컨설팅',
      '원자재 리스크 헤지 및 공급망 관리 솔루션',
      '가업승계 맞춤 세무·법률 자문',
    ],
    caseStudy: {
      company: '중견 자동차부품 제조업 K사',
      challenge:
        '중대재해처벌법 시행으로 CEO 형사처벌 리스크 증가, 안전관리체계 구축 및 관련 보험 필요',
      solution:
        '기업재해보장보험 설계, 안전관리 컨설팅, CEO 개인보험 최적화를 통한 통합 솔루션 제공',
      result: '연간 보험료 30% 절감과 동시에 포괄적 리스크 커버리지 달성',
    },
    differentiators: [
      '제조업 특화 보험·자산관리 노하우',
      '공장 부동산·설비 투자 통합 컨설팅',
      '실제 제조업 성공사례 기반 솔루션',
    ],
    expertComment:
      '제조업은 규제와 리스크가 빠르게 변화합니다. FamilyOffice S는 업계 실무 경험을 바탕으로, CEO의 안심 경영을 지원합니다.',
  },
  {
    icon: Building,
    title: '건설업',
    description:
      '프로젝트별 자금 운용과 시공 리스크에 최적화된 자산관리 및 보장 설계',
    painPoints: [
      '프로젝트별 자금 운용의 불확실성',
      '시공 리스크 및 하도급 관리의 어려움',
      '공사이행보증 등 보험 설계 복잡성',
      '대형 프로젝트 자금조달 및 리스크 관리',
    ],
    solutions: [
      '프로젝트별 맞춤 시공보증보험 설계',
      '하도급 리스크 관리 및 법률 자문',
      '프로젝트 파이낸싱 및 자금 컨설팅',
      '건설업 특화 리스크 관리 솔루션',
    ],
    caseStudy: {
      company: '종합건설업 L사',
      challenge:
        '고위험 업종으로 보험료 부담 과다, 프로젝트별 리스크 관리 체계 필요',
      solution:
        '업종 특화 보험 패키지 설계, 프로젝트별 보험 최적화, 안전관리 시스템 도입 지원',
      result: '보험비용 25% 절감, 프로젝트 리스크 관리 체계 확립',
    },
    differentiators: [
      '건설업 프로젝트별 맞춤 컨설팅',
      '하도급·시공 리스크 통합 관리',
      '프로젝트 파이낸싱 전문성',
    ],
    expertComment:
      '건설업은 프로젝트마다 리스크와 자금 흐름이 다릅니다. FamilyOffice S는 현장 중심의 맞춤 솔루션을 제공합니다.',
  },
  {
    icon: Cpu,
    title: 'IT·벤처기업',
    description:
      '성장 단계별 투자 전략과 핵심인재 유지, 스톡옵션 등 IT기업 특화 자산관리',
    painPoints: [
      '정책자금 및 투자 유치의 어려움',
      '핵심인재 이탈 및 인센티브 설계',
      '스톡옵션 세무 이슈',
      'IPO 준비 및 성장 전략',
    ],
    solutions: [
      '정책자금 활용 컨설팅 및 투자 유치 지원',
      '핵심인재 retention 프로그램 설계',
      '스톡옵션·퇴직연금 세무 최적화',
      'IPO 준비 맞춤 자문',
    ],
    caseStudy: {
      company: 'AI 기술 스타트업 M사',
      challenge: 'Series B 투자 유치 후 핵심인재 retention과 세무 최적화 필요',
      solution: '스톡옵션 설계, 핵심인재 인센티브 프로그램, 법인 구조 최적화',
      result: '핵심인재 retention rate 95% 달성, 세무비용 40% 절감',
    },
    differentiators: [
      'IT·벤처기업 성장 단계별 맞춤 컨설팅',
      '정책자금·투자 유치 실전 경험',
      '스톡옵션·세무 최적화 전문성',
    ],
    expertComment:
      'IT·벤처기업은 빠른 성장과 인재 확보가 핵심입니다. FamilyOffice S는 성장 단계별로 최적의 전략을 제시합니다.',
  },
  {
    icon: Users,
    title: '가족법인·MSO',
    description:
      '가족법인 설립부터 MSO 운영까지 세대를 넘나드는 자산관리 및 승계 설계',
    painPoints: [
      '가족/자녀법인 설립 및 지배구조 설계의 복잡성',
      '경영권 승계 및 세무 이슈',
      '다중 사업(MSO) 운영의 리스크',
      '차세대 교육 및 자산 승계',
    ],
    solutions: [
      '가족/자녀법인 설립 및 지배구조 설계',
      '경영권 승계 맞춤 전략 및 세무 자문',
      'MSO 구조화 및 리스크 관리',
      '차세대 교육 펀드 및 승계 설계',
    ],
    caseStudy: {
      company: '2세 제조업체 N사',
      challenge: '창업주 고령화로 승계 준비 필요, 복잡한 가족 자산 정리 필요',
      solution:
        '가족법인 설립, 지분 승계 전략, 세무 최적화를 통한 단계적 승계 설계',
      result: '승계세 30% 절감, 경영권 안정적 이전 완료',
    },
    differentiators: [
      '가족법인·MSO 설계 실전 경험',
      '승계·세무·교육 통합 컨설팅',
      '세대를 잇는 자산관리 노하우',
    ],
    expertComment:
      '가족법인과 MSO는 단순한 법인 설립이 아닙니다. FamilyOffice S는 세대를 잇는 자산관리와 승계를 지원합니다.',
  },
];

/**
 * 서비스 검색 및 필터링을 위한 유틸리티 함수
 */
export function searchServices(query: string): DetailedService[] {
  const allServices = SERVICE_CATEGORIES.flatMap(category => category.services);
  return allServices.filter(
    service =>
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase()) ||
      service.features.some(feature =>
        feature.toLowerCase().includes(query.toLowerCase())
      )
  );
}

export function getServicesByCategory(categoryId: string): DetailedService[] {
  const category = SERVICE_CATEGORIES.find(cat => cat.id === categoryId);
  return category?.services || [];
}

export function getAllServiceTitles(): string[] {
  return SERVICE_CATEGORIES.flatMap(category =>
    category.services.map(service => service.title)
  );
}
