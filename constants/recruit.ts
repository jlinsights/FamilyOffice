import {
  Award,
  Building,
  DollarSign,
  FileText,
  GraduationCap,
  Info,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

export interface RecruitFaqCategory {
  title: string;
  icon: string;
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export interface Position {
  title: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  description: string;
  requirements: string[];
}

// GFC 채용 FAQ 카테고리 데이터
export const recruitFaqCategories: RecruitFaqCategory[] = [
  {
    title: 'GFC 기본 정보',
    icon: 'Info',
    faqs: [
      {
        id: 'basic-1',
        question: '삼성생명 GFC란 무엇인가요?',
        answer:
          '삼성생명 GFC(Group Financial Consultant)는 기업재무컨설턴트로서, 중소중견기업 CEO와 고액자산가를 대상으로 가업승계, 자산관리, 세무최적화, 리스크관리 등 종합적인 재무컨설팅을 제공하는 전문가입니다. 삼성생명의 프리미엄 브랜드와 전문성을 바탕으로 고품질 서비스를 제공합니다.',
      },
      {
        id: 'basic-2',
        question: '기업재무컨설턴트와 일반 보험설계사의 차이점은?',
        answer:
          '일반 보험설계사는 주로 개인 고객 대상 보험상품 판매에 집중하는 반면, 기업재무컨설턴트(GFC)는 중소중견기업 CEO와 고액자산가를 대상으로 종합적인 재무컨설팅을 제공합니다. 가업승계, 절세전략, 기업보험, 자산관리 등 복합적이고 전문적인 서비스로 훨씬 높은 수수료와 안정적인 고객관계를 유지합니다.',
      },
      {
        id: 'basic-3',
        question: 'GFC의 주요 업무 영역은 무엇인가요?',
        answer:
          'GFC의 주요 업무는 ①가업승계 설계 및 실행 지원 ②기업 및 개인 자산관리 ③세무최적화 전략 수립 ④기업보험 및 리스크관리 ⑤투자 포트폴리오 관리 등입니다. 고객의 니즈에 맞는 맞춤형 통합 솔루션을 제공하는 것이 핵심입니다.',
      },
    ],
  },
  {
    title: '채용 조건 및 자격',
    icon: 'FileText',
    faqs: [
      {
        id: 'requirements-1',
        question: '삼성생명 GFC 채용 자격조건은 어떻게 되나요?',
        answer:
          '기본적으로 4년제 대졸 이상, 금융/경영/회계 관련 전공자를 우대합니다. 가업승계 전문가는 관련 경력 5년 이상, 자산관리 전문가는 3년 이상의 경력이 필요합니다. CFP, CFA, 세무사, 변호사 등 관련 자격증 보유자는 우대하며, 무엇보다 성실하고 책임감 있는 성격이 중요합니다.',
      },
      {
        id: 'requirements-2',
        question: '경력이 부족한 경우에도 지원할 수 있나요?',
        answer:
          '경력이 부족하더라도 관련 자격증이나 전공, 그리고 학습 의지가 뛰어난 분은 지원 가능합니다. 삼성생명에서 24개월간의 체계적인 교육과정을 제공하므로, 열정과 성장 가능성이 더 중요한 평가 기준입니다.',
      },
      {
        id: 'requirements-3',
        question: '필요한 자격증이나 전문지식은 무엇인가요?',
        answer:
          'CFP(Certified Financial Planner), CFA(Chartered Financial Analyst), 세무사, 변호사 등의 자격증이 있으면 유리하지만 필수는 아닙니다. 금융, 세무, 법무에 대한 기본 지식과 지속적인 학습 의지가 더 중요합니다.',
      },
    ],
  },
  {
    title: '급여 및 처우',
    icon: 'DollarSign',
    faqs: [
      {
        id: 'compensation-1',
        question: '삼성생명 GFC 연봉은 얼마나 되나요?',
        answer:
          '삼성생명 GFC는 위촉직으로 고정급과 성과급을 결합한 보수체계를 운영합니다. 경력과 실력에 따라 연봉 상위 1% 수준의 높은 수입이 가능하며, 프리미엄 고객 대상으로 고단가 서비스를 제공하여 일반 설계사 대비 3-5배 높은 수익을 기대할 수 있습니다. 자세한 조건은 면접 시 상담받으실 수 있습니다.',
      },
      {
        id: 'compensation-2',
        question: 'GFC의 수입 구조는 어떻게 되나요?',
        answer:
          '기본급 + 성과급 구조로 운영됩니다. 기본급은 안정적인 생활을 보장하고, 성과급은 개인의 실력과 노력에 따라 무제한으로 가능합니다. 특히 장기적인 고객 관계를 통한 지속적인 수수료 수입이 특징입니다.',
      },
      {
        id: 'compensation-3',
        question: '복리후생이나 교육 지원은 어떤 것들이 있나요?',
        answer:
          '삼성생명 임직원과 동일한 복리후생 혜택을 받을 수 있으며, 24개월간의 전문 교육과정은 전액 회사 부담입니다. 교육 기간 중에도 기본급을 지급하며, 지속적인 재교육과 전문성 향상을 위한 지원을 제공합니다.',
      },
    ],
  },
  {
    title: '채용 과정 및 교육',
    icon: 'GraduationCap',
    faqs: [
      {
        id: 'process-1',
        question: 'GFC 채용 과정은 어떻게 진행되나요?',
        answer:
          '채용 과정은 ①지원서 접수 → ②서류심사(3-5일) → ③면접진행(1차 실무진, 2차 임원) → ④최종선발 순으로 진행됩니다. 전체 과정은 약 2-3주 소요되며, 합격 시 위촉계약을 체결하고 24개월간의 체계적인 교육과정을 제공받게 됩니다. 온라인 지원과 잡페어 참석, 두 가지 방법으로 지원 가능합니다.',
      },
      {
        id: 'process-2',
        question: '삼성생명 GFC 교육 시스템은 어떻게 운영되나요?',
        answer:
          '삼성생명 GFC는 24개월간의 체계적인 교육과정을 제공합니다. 기본 금융지식부터 고급 컨설팅 스킬, 세무·법무 전문지식까지 단계별 커리큘럼으로 구성되어 있습니다. 삼성생명 본사 전문 강사진과 외부 전문가가 참여하며, 실무 중심의 OJT(On the Job Training)도 병행합니다. 교육비는 전액 회사 부담이며, 교육 기간 중에도 기본급을 지급합니다.',
      },
      {
        id: 'process-3',
        question: '신입자도 성공할 수 있는 지원 시스템이 있나요?',
        answer:
          '네, 멘토링 시스템과 단계별 목표 관리를 통해 신입자도 체계적으로 성장할 수 있도록 지원합니다. 선배 컨설턴트의 1:1 멘토링, 정기적인 피드백, 그리고 개인별 맞춤형 교육 계획을 통해 성공적인 커리어를 만들어갈 수 있습니다.',
      },
    ],
  },
  {
    title: '경력 및 연령',
    icon: 'Award',
    faqs: [
      {
        id: 'career-1',
        question: '50대 이상도 지원 가능한가요?',
        answer:
          '물론입니다. GFC는 나이보다 경력과 전문성을 중시합니다. 오히려 50대 이상의 풍부한 경험과 인맥은 고객 신뢰 구축에 큰 강점이 됩니다. 실제로 많은 50대 이상 GFC가 뛰어난 성과를 내고 계시며, 20-30년의 경력이 세컨드 커리어에서 최고의 자산이 됩니다. 경험을 활용한 고소득 비즈니스 파이프라인 구축이 가능합니다.',
      },
      {
        id: 'career-2',
        question: '비즈니스 파이프라인이란 무엇인가요?',
        answer:
          '비즈니스 파이프라인은 한 번의 고객 관계 구축으로 지속적인 수입을 창출하는 구조를 말합니다. GFC는 단순 일회성 영업이 아닌, 고객의 평생 재무 파트너로서 장기적인 관계를 유지합니다. 초기 계약 후에도 연금, 자산 재배분, 가업승계 등 지속적인 컨설팅을 통해 안정적이고 누적되는 수입원을 확보할 수 있습니다. 이는 평생 수입원이 되는 자산입니다.',
      },
      {
        id: 'career-3',
        question: '일반 재취업과 어떻게 다른가요?',
        answer:
          'GFC 위촉은 일반 재취업과 근본적으로 다릅니다. ①독립적 업무: 출퇴근 자유, 자기주도적 일정 관리 ②무제한 수입: 연봉제가 아닌 성과급 체계로 능력에 따른 고소득 가능 ③전문가 포지셔닝: 단순 직원이 아닌 전문 컨설턴트로서의 위상 ④경험 가치 극대화: 오랜 경력과 인맥이 경쟁력이 되는 구조입니다. 나이 제한 없이 능력으로만 평가받는 진정한 세컨드 커리어입니다.',
      },
      {
        id: 'career-4',
        question: '금융업계 경험이 없어도 가능한가요?',
        answer:
          '금융업계 경험이 없어도 충분히 가능합니다. 중요한 것은 사업가적 마인드, 고객 관계 구축 능력, 그리고 학습 의지입니다. 전직 사업가, 임원 출신 등 다양한 배경의 전문가들이 성공하고 있습니다. 24개월 교육 프로그램을 통해 필요한 금융 지식과 컨설팅 스킬을 체계적으로 습득할 수 있으며, 오히려 다양한 산업 경험이 고객과의 공감대 형성에 도움이 됩니다.',
      },
    ],
  },
];

// 아이콘 매핑 함수
export const getIcon = (iconName: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    Info: Info,
    FileText: FileText,
    DollarSign: DollarSign,
    GraduationCap: GraduationCap,
    Building: Building,
    Users: Users,
    Award: Award,
    Star: Star,
    TrendingUp: TrendingUp,
  };
  return iconMap[iconName] || Info;
};

export const positions: Position[] = [
  {
    title: '기업재무컨설턴트(GFC) - 가업승계 전문가',
    department: '삼성생명GFC',
    type: '위촉직',
    experience: '경력 5년 이상',
    location: '서울',
    description: '가족기업의 체계적인 가업승계 설계 및 실행 지원',
    requirements: [
      '금융/경영 관련 학과 졸업 또는 동등한 경력',
      '기업재무 또는 가업승계 컨설팅 경력 5년 이상',
      'CFP, 세무사, 변호사 등 전문 자격증 우대',
      '가족기업 및 상속/증여 관련 업무 경험 필수',
    ],
  },
  {
    title: '기업재무컨설턴트(GFC) - 자산관리 전문가',
    department: '삼성생명GFC',
    type: '위촉직',
    experience: '경력 3년 이상',
    location: '서울',
    description: '고액자산가 및 기업의 종합자산관리 서비스 제공',
    requirements: [
      '금융 관련 학과 졸업 또는 동등한 경력',
      '자산관리 또는 기업재무 경력 3년 이상',
      '금융투자분석사, CFP, CFA 등 관련 자격증 우대',
      '법인 자산관리 및 포트폴리오 운용 경험',
    ],
  },
  {
    title: '기업재무컨설턴트(GFC) - 세무회계 전문가',
    department: '삼성생명GFC',
    type: '위촉직',
    experience: '경력 5년 이상',
    location: '서울',
    description: '기업 세무전략 수립 및 절세 컨설팅 업무',
    requirements: [
      '세무사 자격증 보유 필수',
      '기업세무 컨설팅 경력 5년 이상',
      '법인세무 및 상속증여세 전문 경험',
      '국제세무 및 기업구조조정 경험자 우대',
    ],
  },
  {
    title: '기업재무컨설턴트(GFC) - 투자금융 전문가',
    department: '삼성생명GFC',
    type: '위촉직',
    experience: '경력 3년 이상',
    location: '서울',
    description: '기업 자금조달 및 투자금융 전문 컨설팅 서비스',
    requirements: [
      '투자은행 또는 금융 관련 학과 졸업',
      '투자금융 또는 기업금융 경력 3년 이상',
      'IB, 기업금융, M&A 관련 업무 경험',
      'CFA, FRM 등 투자 관련 자격증 우대',
    ],
  },
];
