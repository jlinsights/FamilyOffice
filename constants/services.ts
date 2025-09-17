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
  Heart,
  AlertTriangle,
  Banknote,
  PiggyBank,
  Lightbulb,
  HandshakeIcon,
  ClipboardCheck,
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
  // 법인세 결산 체크리스트
  '법인세 결산 체크리스트': '/corporate-tax-checklist',
  '결산 후 필수 점검': '/corporate-tax-checklist',
  '법인세 신고 체크리스트': '/corporate-tax-checklist#taxDeclaration',
  '재무제표 검토 체크리스트': '/corporate-tax-checklist#financialReview',
  '절세 전략 검토': '/corporate-tax-checklist#taxOptimization',
  '세무 컴플라이언스': '/corporate-tax-checklist#compliance',
  '차기년도 세무계획': '/corporate-tax-checklist#planning',
  '세무조정 검토': '/corporate-tax-checklist',
  '외부감사 대응': '/corporate-tax-checklist',
  
  // CEO 체크리스트 & 경영진단
  'CEO 체크리스트': '/ceo-checklist',
  '경영진단': '/ceo-checklist',
  '기업 리스크 진단': '/ceo-checklist#risk',
  '가업승계 준비도 진단': '/ceo-checklist#succession',
  '중대재해처벌법 체크리스트': '/ceo-checklist#serious-accident',
  '재무 건전성 진단': '/ceo-checklist#financial',
  '성장전략 점검': '/ceo-checklist#growth',
  '개인자산 관리 진단': '/ceo-checklist#personal',
  
  // 절세 전략
  '절세의 미학': '/tax-strategy',
  '법인세 절세 전략': '/tax-strategy#corporate',
  '개인세 절세 전략': '/tax-strategy#personal',
  '승계세 절세 전략': '/tax-strategy#succession',
  '법인종신보험 절세': '/tax-strategy#corporate-life-insurance',
  '가지급금 절세 솔루션': '/tax-strategy#provisional-payment',
  '자기주식 절세 활용': '/tax-strategy#treasury-stock',
  
  // 가업승계 전략
  '패밀리오피스 전략적 가업승계': '/business-succession-strategy',
  '가업승계 전략': '/business-succession-strategy',
  '전략적 가업승계': '/business-succession-strategy',
  '승계 로드맵': '/business-succession-strategy',
  '5단계 승계': '/business-succession-strategy',
  '생전증여 승계': '/business-succession-strategy#gift',
  '상속승계 전략': '/business-succession-strategy#inheritance',
  '매각승계 방안': '/business-succession-strategy#sale',
  'MBO/MBI 승계': '/business-succession-strategy#mbo',
  '가족헌장 제정': '/business-succession-strategy#charter',
  '가족경영협의회': '/business-succession-strategy#council',
  '패밀리오피스 설립': '/business-succession-strategy#office',
  '가족신탁 활용': '/business-succession-strategy#trust',
  '차세대 경영자 교육': '/business-succession-strategy',
  '승계 세무 최적화': '/business-succession-strategy',
  '경영권 안정화': '/business-succession-strategy',
  
  // 법인종신보험 전략
  '법인명의 종신보험': '/corporate-life-insurance',
  '법인종신보험': '/corporate-life-insurance',
  '법인보험': '/corporate-life-insurance',
  '기업보험': '/corporate-life-insurance',
  '임원보험': '/corporate-life-insurance',
  '퇴직금보험': '/corporate-life-insurance',
  '절세보험': '/corporate-life-insurance',
  '법인세 절세보험': '/corporate-life-insurance',
  '상속세 대비보험': '/corporate-life-insurance',
  '유동성 확보보험': '/corporate-life-insurance',
  '자산보전보험': '/corporate-life-insurance',
  '삼성생명 법인보험': '/corporate-life-insurance',
  '변액종신보험': '/corporate-life-insurance#variable',
  '유니버셜보험': '/corporate-life-insurance#universal',
  '보험료 손금처리': '/corporate-life-insurance',
  '계약자대출': '/corporate-life-insurance',
  
  // 기업보험 & 금융솔루션
  '기업인증 컨설팅': '/business-certification',
  '단체보험 - 기업보장보험': '/group-insurance',
  '상속·증여 컨설팅': '/inheritance-gift',
  '경영인정기보험': '/key-person-insurance',
  '정책자금 컨설팅': '/policy-funds',
  '중대재해처벌법 대응': '/serious-accident-law',
  '개인/법인 건강보험': '/health-insurance',
  '퇴직연금 컨설팅': '/retirement-pension',
  
  // 상속·증여세 가이드
  '상속·증여세 가이드': '/inheritance-gift-tax',
  '상속세': '/inheritance-gift-tax',
  '증여세': '/inheritance-gift-tax',
  '상속세율': '/inheritance-gift-tax#inheritanceTax',
  '증여세율': '/inheritance-gift-tax#giftTax',
  '상속공제': '/inheritance-gift-tax#deductions',
  '증여공제': '/inheritance-gift-tax#deductions',
  '상속신고': '/inheritance-gift-tax#schedule',
  '증여신고': '/inheritance-gift-tax#schedule',
  '국세청 상속세': '/inheritance-gift-tax',
  '국세청 증여세': '/inheritance-gift-tax',
  '세금상식 Q&A': '/inheritance-gift-tax#faq',
  '상속·증여 세금상식': '/inheritance-gift-tax',
  '상속세 절세 방법': '/inheritance-gift-tax#strategies',
  '증여세 절세 방법': '/inheritance-gift-tax#strategies',
  '배우자공제': '/inheritance-gift-tax#deductions',
  '자녀공제': '/inheritance-gift-tax#deductions',
  '기초공제': '/inheritance-gift-tax#deductions',
  '상속세 계산': '/inheritance-gift-tax#calculator',
  '증여세 계산': '/inheritance-gift-tax#calculator',
  '상속세 신고기한': '/inheritance-gift-tax#schedule',
  '증여세 신고기한': '/inheritance-gift-tax#schedule',
  '상속재산 평가': '/inheritance-gift-tax',
  '증여재산 평가': '/inheritance-gift-tax',
  '상속세 납부방법': '/inheritance-gift-tax',
  '증여세 납부방법': '/inheritance-gift-tax',
  
  // FP센터 (Financial Planner Center)
  'FP센터': '/fp-center',
  'Financial Planner': '/fp-center',
  '재무설계': '/fp-center',
  '종합 재무설계': '/fp-center',
  '맞춤형 재무설계': '/fp-center',
  '자산관리 컨설팅': '/fp-center#investment',
  '보험설계': '/fp-center#insurance',
  '은퇴설계': '/fp-center#retirement',
  '상속설계': '/fp-center#estate',
  '기업 금융컨설팅': '/fp-center#corporate',
  '삼성생명 FP센터': '/fp-center',
  '전문 FP': '/fp-center',
  '재무진단': '/fp-center',
  '자산배분': '/fp-center',
  '포트폴리오 관리': '/fp-center',
  '금융 전문가': '/fp-center',
  '재무상담': '/fp-center',
  '투자자문': '/fp-center',
  '연금설계': '/fp-center',
  '세무최적화': '/fp-center',
  '리스크관리': '/fp-center',
  '종합금융서비스': '/fp-center',
  
  // 기존 SEO 페이지 매핑
  '가업승계지원 제도 컨설팅': '/business-succession-strategy',
  '가업주식증여특례': '/business-succession-strategy',
  '가업상속공제': '/business-succession-strategy',
  '자녀법인 활용 전략': '/business-succession-strategy',
  '창업자금증여특례': '/business-succession-strategy',
  '법인계약 세무회계': '/tax-strategy',
  '보험계약 상증세법 컨설팅': '/tax-strategy',
  '개인사업자 법인전환': '/tax-strategy',
  '경정청구 컨설팅': '/tax-strategy',
  '가지급금 컨설팅': '/inheritance-gift-tax',
  '자기주식 컨설팅': '/inheritance-gift-tax',
  '차명주식 컨설팅': '/inheritance-gift-tax',
  '법인종합재무 컨설팅': '/inheritance-gift-tax',
  '상환전환우선주 발행': '/investment-advisory',
  '중소기업 자금조달': '/investment-advisory',
  '비상장주식 가치평가': '/investment-advisory',
  '기업연구소 및 정책자금 컨설팅': '/policy-funds',
  '유상증자 컨설팅': '/asset-diversification',
  '스톡옵션 설계': '/asset-diversification',
  '법인 재무제표 분석': '/portfolio-optimization',
  '양수도거래 컨설팅': '/portfolio-optimization',
  '세법개정안 분석': '/portfolio-optimization',
  '세무조정계산서의 이해': '/portfolio-optimization',
  '고액자산가 자산관리': '/wealth-consulting',
  '부유층 자산관리 컨설팅': '/wealth-consulting',
  
  // 특허 & 창업지원
  '사업계획서 작성': '/patent-startup/business-plan',
  '창업 컨설팅': '/patent-startup/startup-consulting',
  '특허출원 지원': '/patent-startup/patent-application',
  '홈페이지 제작 지원': '/patent-startup/homepage-creation',
  
  // 인수합병 & 부실채권
  '부실채권 정리': '/ma-debt/debt-restructuring',
  '인수합병(M&A) 컨설팅': '/ma-debt/ma-consulting',
  '기업구조조정 지원': '/ma-debt/corporate-restructuring',
  
  // 인사노무 관리
  '인사노무 관리 가이드': '/hr-labor-management',
  '인사노무 체크리스트': '/hr-labor-management',
  '노동법 준수 관리': '/hr-labor-management#compliance',
  '채용 관리 시스템': '/hr-labor-management#recruitment',
  '근로시간 관리': '/hr-labor-management#workingTime',
  '임금 및 휴가 관리': '/hr-labor-management#wagesLeave',
  '안전보건 관리': '/hr-labor-management#safetyHealth',
  '노사관계 관리': '/hr-labor-management#laborRelations',
  '취업규칙 작성': '/hr-labor-management#employment-rules',
  '4대보험 관리': '/hr-labor-management#employment-insurance',
  '직장 내 괴롭힘 방지': '/hr-labor-management#workplace-harassment',
  
  // 재무·세무·노무 통합관리
  '가지급금 해결 방안': '/finance-tax-labor/provisional-payment',
  '경정청구 전문 서비스': '/finance-tax-labor/tax-refund',
  '고용지원금 활용 컨설팅': '/finance-tax-labor/employment-subsidy',
  
  // HR 지원 (기존 항목 유지)
  '중소기업 노무관리': '/hr-labor-management'
};

/**
 * 전문 서비스 카테고리별 상세 서비스
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'corporate-insurance-finance',
    title: '기업보험 & 금융솔루션',
    description: '기업의 리스크 관리와 금융 최적화를 위한 종합 솔루션을 제공합니다.',
    icon: Shield,
    services: [
      {
        title: '개인/법인 건강보험',
        description: '개인과 기업을 위한 종합 건강보험 및 의료비 보장 솔루션',
        features: [
          '맞춤형 건강보험 설계',
          '실손의료비 최적화',
          '법인 단체보험 구성',
          '건강관리 서비스 연계'
        ],
        benefits: [
          '의료비 부담 최소화',
          '종합적 건강 보장',
          '임직원 복리후생 향상',
          '예방 중심 건강관리'
        ],
        targetClient: '개인, 중소중견기업',
        caseStudy: {
          situation: '제조업 H사, 임직원 건강관리 및 의료비 절감 필요',
          solution: '법인 단체건강보험 + 개인별 맞춤 건강관리 프로그램',
          result: '의료비 40% 절감, 직원 만족도 95% 향상'
        }
      },
      {
        title: '경영인정기보험',
        description: '핵심 경영진의 유고시 기업 안정성 확보를 위한 전문 보험 솔루션',
        features: [
          'Key Person 보장',
          '기업 연속성 보장',
          '대출담보 활용',
          '세무효율성 극대화'
        ],
        benefits: [
          '경영 공백 최소화',
          '기업가치 보호',
          '금융기관 신뢰도 향상',
          '세무상 혜택 확보'
        ],
        targetClient: '중견기업, 창업기업 CEO',
        caseStudy: {
          situation: 'IT기업 E사 대표, 핵심인력 보장 필요',
          solution: '경영진정기보험을 통한 리스크 헤지',
          result: '기업 신용도 향상 및 대출한도 확대'
        }
      },
      {
        title: '기업인증 컨설팅',
        description: '벤처기업, 이노비즈 등 각종 기업인증 취득을 통한 정책 혜택 극대화',
        features: [
          '벤처기업 인증 지원',
          '이노비즈 인증 컨설팅',
          'ISO 인증 지원',
          '정부지원사업 연계'
        ],
        benefits: [
          '세제혜택 최대 30% 절감',
          '정부지원사업 우선선정',
          '금융지원 우대조건',
          '기업 신뢰도 향상'
        ],
        targetClient: '성장기 중소기업, 스타트업',
        caseStudy: {
          situation: 'IT 스타트업 A사, 벤처기업 인증 필요',
          solution: '벤처기업 요건 분석 및 인증 절차 지원',
          result: '벤처기업 인증 취득, 연간 3억원 세제혜택 확보'
        }
      },
      {
        title: '단체보험 - 기업보장보험',
        description: '임직원 보장과 기업 리스크를 동시에 관리하는 종합보험 솔루션',
        features: [
          '임직원 단체보험',
          '기업배상책임보험',
          '중대재해처벌법 대응',
          '맞춤형 보장설계'
        ],
        benefits: [
          '임직원 복리후생 향상',
          '기업 리스크 전이',
          '법적 책임 보호',
          '보험료 손금처리'
        ],
        targetClient: '중소중견기업, 제조업체',
        caseStudy: {
          situation: '건설업 C사, 중대재해처벌법 대응 필요',
          solution: '종합적인 기업보장보험 설계',
          result: '법적 리스크 최소화 및 임직원 만족도 향상'
        }
      },
      {
        title: '법인종신보험',
        description: '경영진의 사망보험금을 활용한 기업 자금조달 및 세무최적화 전략',
        features: [
          '경영진 사망보장',
          '기업 유동성 확보',
          '세무최적화 설계',
          '상속세 절감 효과'
        ],
        benefits: [
          '낮은 실효세율 적용',
          '기업 유동성 개선',
          '상속세 부담 경감',
          '안정적 자금 확보'
        ],
        targetClient: '대표이사, 주요 임원진',
        caseStudy: {
          situation: '제조업 B사 대표, 상속세 부담 우려',
          solution: '법인종신보험을 통한 세무최적화 설계',
          result: '상속세 30% 절감 및 기업 안정성 확보'
        }
      },
      {
        title: '상속·증여 컨설팅',
        description: '가족 자산의 효율적 이전과 세무최적화를 위한 종합 상속증여 전략',
        features: [
          '상속세 절세 전략',
          '증여세 최적화',
          '가업승계 설계',
          '자산이전 구조화'
        ],
        benefits: [
          '상속세 부담 최소화',
          '가족 갈등 예방',
          '체계적 자산관리',
          '세대간 부의 이전'
        ],
        targetClient: '고액자산가, 기업 오너가',
        caseStudy: {
          situation: '유통업 D사 회장, 100억 자산 상속 계획',
          solution: '단계적 증여와 신탁 활용 전략',
          result: '상속세 50억 → 15억으로 70% 절감'
        }
      },
      {
        title: '정책자금 컨설팅',
        description: '정부 및 공공기관의 다양한 정책자금 확보를 위한 전문 컨설팅',
        features: [
          '정책자금 발굴',
          '신청서류 작성',
          '심사 대응 지원',
          '사후관리 서비스'
        ],
        benefits: [
          '저리 자금 확보',
          '신청 성공률 향상',
          '행정 부담 경감',
          '자금조달 다각화'
        ],
        targetClient: '성장기업, 혁신기업',
        caseStudy: {
          situation: '바이오기업 F사, 연구개발 자금 필요',
          solution: '정책자금 매칭 및 신청 지원',
          result: '15억원 정책자금 확보, 금리 2% 절감'
        }
      },
      {
        title: '중대재해처벌법 대응',
        description: '중대재해처벌법 완전 대응을 위한 법률·보험·관리시스템 통합 솔루션',
        features: [
          '법적 요건 점검',
          '안전관리시스템 구축',
          '배상책임보험 설계',
          '정기 모니터링'
        ],
        benefits: [
          '법적 처벌 위험 제거',
          '안전관리 체계화',
          '보험을 통한 리스크 전가',
          '기업 이미지 보호'
        ],
        targetClient: '제조업, 건설업, 물류업',
        caseStudy: {
          situation: '물류기업 G사, 중대재해처벌법 완전 대응 필요',
          solution: '법률·보험·시스템 통합 솔루션 제공',
          result: '100% 법적 요건 충족 및 산업재해 50% 감소'
        }
      },
      {
        title: '퇴직연금 컨설팅',
        description: '개인형퇴직연금(IRP)부터 기업형 퇴직연금까지 종합 컨설팅 서비스',
        features: [
          'IRP/DC/DB형 맞춤 설계',
          '세제혜택 극대화',
          '퇴직연금 운용관리',
          '퇴직연금 이전 서비스'
        ],
        benefits: [
          '연 최대 270만원 세액공제',
          '운용수익 과세이연',
          '퇴직소득세 우대',
          '안정적 노후자금 확보'
        ],
        targetClient: '개인, 기업 임직원',
        caseStudy: {
          situation: '40대 직장인, 퇴직금 3억원 IRP 이전 필요',
          solution: 'IRP 계좌 개설 + 안정형 포트폴리오 + 세액공제 최적화',
          result: '연 105만원 절세 + 5% 안정수익, 10년간 1,500만원 절약'
        }
      }
    ]
  },
  {
    id: 'corporate-governance',
    title: '법인 지배구조 & 컨설팅',
    description: '정관 설계부터 임원 운영까지 법인 경영의 모든 영역',
    icon: Gavel,
    services: [
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
    ],
  },
  {
    id: 'hr-support',
    title: '인사노무 & 지원제도',
    description: '중소기업 특화 인사관리부터 정부지원금까지',
    icon: Users,
    services: [
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
    ],
  },
  {
    id: 'tax-accounting',
    title: '세무회계 & 절세전략',
    description: '법인 세무부터 개인 절세까지 통합 세무 솔루션',
    icon: Calculator,
    services: [
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
    ],
  },
  {
    id: 'investment-finance',
    title: '투자금융 & 자금조달',
    description: '자본시장 활용부터 가치평가까지 금융 전문 서비스',
    icon: TrendingUp,
    services: [
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
    ],
  },
  {
    id: 'business-succession',
    title: '가업승계 & 증여상속',
    description: '세대를 잇는 체계적인 승계 설계 및 실행',
    icon: Target,
    services: [
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
  {
    id: 'patent-startup',
    title: '특허 & 창업지원',
    description: '사업계획서 작성부터 특허출원, 창업까지 원스톱 지원',
    icon: Lightbulb,
    services: [
      {
        title: '사업계획서 작성',
        description: '투자유치와 정책자금 확보를 위한 전문 사업계획서 작성 서비스',
        features: [
          '시장분석 및 경쟁력 분석',
          '사업모델 구체화',
          '재무계획 수립',
          '투자제안서 작성',
        ],
        benefits: [
          '투자유치 성공률 향상',
          '정책자금 확보 가능성 증대',
          '사업 방향성 명확화',
          '전문적인 프레젠테이션 자료',
        ],
        targetClient: '스타트업, 신규사업 추진 기업',
        caseStudy: {
          situation: '바이오 스타트업 P사, Series A 투자유치 필요',
          solution: '시장분석, 기술경쟁력, 재무계획을 포함한 전문 사업계획서 작성',
          result: '50억원 Series A 투자유치 성공',
        },
      },
      {
        title: '창업 컨설팅',
        description: '창업 초기부터 성장기까지 단계별 맞춤 컨설팅',
        features: [
          '창업 아이템 검증',
          '법인설립 지원',
          '창업지원사업 연계',
          '초기 운영 컨설팅',
        ],
        benefits: [
          '창업 성공률 제고',
          '정부지원 최대 활용',
          '초기 리스크 최소화',
          '안정적 사업 기반 구축',
        ],
        targetClient: '예비창업자, 초기 스타트업',
      },
      {
        title: '특허출원 지원',
        description: '기술 특허부터 비즈니스 모델 특허까지 종합 지원',
        features: [
          '특허 가능성 검토',
          '특허 명세서 작성',
          '출원 절차 대행',
          '특허 포트폴리오 구축',
        ],
        benefits: [
          '지식재산권 확보',
          '기술경쟁력 강화',
          '투자 가치 상승',
          '라이선스 수익 창출',
        ],
        targetClient: '기술기반 기업, R&D 중심 기업',
      },
      {
        title: '홈페이지 제작 지원',
        description: '전문적인 기업 홈페이지부터 브랜딩까지 원스톱 디지털 마케팅 솔루션',
        features: [
          '맞춤형 홈페이지 기획 및 설계',
          '반응형 웹사이트 제작',
          'SEO 최적화 및 검색엔진 등록',
          '브랜드 아이덴티티 디자인',
          '콘텐츠 관리 시스템 구축',
          '유지보수 및 업데이트 지원'
        ],
        benefits: [
          '전문적인 기업 이미지 구축',
          '온라인 마케팅 효과 극대화',
          '고객 접근성 향상',
          '브랜드 신뢰도 제고',
          '비용 효율적인 마케팅',
          '24시간 온라인 홍보 창구'
        ],
        targetClient: '스타트업, 중소기업, 리브랜딩 필요 기업',
        caseStudy: {
          situation: '제조업 Q사, 온라인 마케팅 강화 및 브랜드 이미지 개선 필요',
          solution: '기업 특성을 반영한 전문 홈페이지 제작 및 SEO 최적화',
          result: '온라인 문의 300% 증가, 브랜드 인지도 대폭 향상'
        }
      },
    ],
  },
  {
    id: 'ma-debt',
    title: '인수합병 & 부실채권',
    description: 'M&A 전략수립부터 부실채권 정리까지 전문 솔루션',
    icon: HandshakeIcon,
    services: [
      {
        title: '기업구조조정 지원',
        description: '재무적 어려움을 겪는 기업의 회생을 위한 종합 지원',
        features: [
          '재무구조 개선 방안',
          '사업구조 재편 전략',
          '채권자 협상 지원',
          '정부지원제도 활용',
        ],
        benefits: [
          '기업 회생 가능성 제고',
          '채무 부담 경감',
          '사업 정상화',
          '고용 유지',
        ],
        targetClient: '재무적 어려움을 겪는 기업',
      },
      {
        title: '부실채권 정리',
        description: '부실채권 매입, 정리, 회수를 위한 전문 컨설팅',
        features: [
          '부실채권 실사 및 평가',
          '채권 회수 전략 수립',
          '법적 절차 진행 지원',
          '채권 매각 중개',
        ],
        benefits: [
          '자산 건전성 개선',
          '현금 유동성 확보',
          '재무구조 개선',
          '신용등급 상승',
        ],
        targetClient: '부실채권 보유 기업, 금융기관',
        caseStudy: {
          situation: '중견기업 Q사, 거래처 부도로 30억 부실채권 발생',
          solution: '채권 실사, 회수전략 수립, 일부 매각을 통한 단계적 정리',
          result: '18개월 내 70% 회수, 재무건전성 회복',
        },
      },
      {
        title: '인수합병(M&A) 컨설팅',
        description: 'M&A 전 과정에 대한 종합적인 자문 서비스',
        features: [
          'M&A 전략 수립',
          '대상기업 발굴 및 평가',
          'Due Diligence 지원',
          'PMI(Post Merger Integration) 컨설팅',
        ],
        benefits: [
          '성공적인 M&A 실행',
          '시너지 효과 극대화',
          '인수가격 최적화',
          '통합 리스크 최소화',
        ],
        targetClient: 'M&A를 고려하는 중소중견기업',
      },
    ],
  },
  {
    id: 'finance-tax-labor',
    title: '재무·세무·노무 통합관리',
    description: '가지급금 해결부터 고용지원금, 경정청구까지 통합 솔루션',
    icon: ClipboardCheck,
    services: [
      {
        title: '가지급금 해결 방안',
        description: '가지급금 문제의 근본적 해결과 재발 방지 시스템 구축',
        features: [
          '가지급금 현황 정밀 분석',
          '단계별 정리 계획 수립',
          '세무상 불이익 최소화 방안',
          '내부통제 시스템 구축',
        ],
        benefits: [
          '세무조사 리스크 해소',
          '재무건전성 회복',
          '금융기관 신용도 개선',
          '경영 투명성 확보',
        ],
        targetClient: '가지급금 문제로 고민하는 중소기업',
        caseStudy: {
          situation: 'IT기업 R사, 대표이사 가지급금 8억원으로 세무리스크 상존',
          solution: '3년 단계별 정리계획 수립, 급여/배당 조정, 내부통제 강화',
          result: '가지급금 완전 정리, 의제배당 회피로 2억원 절세',
        },
      },
      {
        title: '경정청구 전문 서비스',
        description: '과다납부 세금의 체계적 분석과 환급 절차 지원',
        features: [
          '5년간 세무신고 정밀 검토',
          '경정청구 사유 발굴',
          '증빙자료 준비 및 신청',
          '세무서 대응 및 환급 지원',
        ],
        benefits: [
          '과납세액 환급',
          '세무 정확성 향상',
          '현금 유동성 개선',
          '세무 전문성 확보',
        ],
        targetClient: '세무신고 실수가 의심되는 모든 기업',
      },
      {
        title: '고용지원금 활용 컨설팅',
        description: '정부 고용지원금 발굴부터 신청, 사후관리까지 원스톱 서비스',
        features: [
          '기업별 활용 가능 지원금 발굴',
          '신청서류 작성 및 제출',
          '지원금 수령 후 관리',
          '추가 지원제도 연계',
        ],
        benefits: [
          '인건비 부담 대폭 경감',
          '고용 창출 활성화',
          '기업 경쟁력 강화',
          '정부정책 혜택 극대화',
        ],
        targetClient: '신규채용 계획이 있는 모든 기업',
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

/**
 * 서비스 통계 정보 조회 함수
 */
export function getServiceStats() {
  const totalCategories = SERVICE_CATEGORIES.length;
  const totalServices = SERVICE_CATEGORIES.reduce((total, category) => total + category.services.length, 0);
  
  return {
    totalCategories,
    totalServices,
    categories: SERVICE_CATEGORIES.map(category => ({
      id: category.id,
      title: category.title,
      serviceCount: category.services.length
    }))
  };
}
