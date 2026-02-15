import {
  Brain,
  Building2,
  Coffee,
  Crown,
  Globe,
  Network,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import type {
  EducationPrograms,
  ExclusiveProgramCategory,
  MemberBenefit,
  MembershipStat,
  SpecialProgram,
} from '@/types/program';

export const MEMBERSHIP_STATS: MembershipStat[] = [
  {
    icon: Users,
    value: '500+',
    label: '프리미엄 멤버',
    description: '검증된 기업가와 고액자산가들',
  },
  {
    icon: TrendingUp,
    value: '100억원+',
    label: '평균 관리 자산',
    description: '기업자산 + 개인자산 통합관리',
  },
  {
    icon: Building2,
    value: '30억+',
    label: '개인자산 최소기준',
    description: '고액자산가 전용 자산관리',
  },
  {
    icon: Crown,
    value: 'VVIP',
    label: '멤버십 등급',
    description: '배타적 프리미엄 서비스',
  },
];

export const MEMBER_BENEFITS: MemberBenefit[] = [
  {
    icon: Target,
    title: 'CEO Risk Audit & Simulation',
    description:
      '국세청 시스템 기반 모의 세무조사와 가업승계 출구전략 시뮬레이션',
    details: [
      '국세청 시스템 기반 정밀 세무진단',
      '가업승계 Exit Plan 시뮬레이션',
      '최상위 법무/세무법인 제휴 리포트',
    ],
  },
  {
    icon: Globe,
    title: 'The Private Retreat',
    description: '비공개 도슨트 투어와 프라이빗 힐링 여행으로 특별한 경험 제공',
    details: [
      '미술관/갤러리 휴관일 대관 Private View',
      '일본 나오시마·스위스 웰니스 리트릿',
      '비공개 장소 도슨트 & 프라이빗 만찬',
    ],
  },
  {
    icon: Crown,
    title: 'Premier Concierge Service',
    description: '해외 출장, 골프, 건강검진 등 CEO의 일상을 전담 비서처럼 케어',
    details: [
      'Airport Protocol: 자택-공항 리무진',
      'Medical Care: VIP 검진센터 우선 예약',
      'Golf & Dining: 명문 골프장 부킹',
    ],
  },
  {
    icon: Coffee,
    title: 'CEO 전용 네트워킹',
    description: '매월 첫째 주 목요일, 업계 리더들과의 정기 조찬 모임',
    details: [
      '업계 트렌드 정보 공유',
      '경영 현안 토론',
      '비즈니스 협력 기회 발굴',
    ],
  },
  {
    icon: Brain,
    title: '차세대 경영진 교육',
    description: '자녀 및 후계자를 위한 체계적 경영 교육 프로그램',
    details: ['리더십 개발 과정', '해외 연수 프로그램', '멘토링 시스템'],
  },
];

export const EXCLUSIVE_PROGRAMS: ExclusiveProgramCategory[] = [
  {
    category: 'Financial Shield',
    icon: Target,
    programs: [
      {
        name: 'CEO Risk Audit',
        frequency: '연 2회',
        description: '국세청 시스템 기반 모의 세무조사 및 정밀 진단 리포트',
      },
      {
        name: '가업승계 시뮬레이션',
        frequency: '분기 1회',
        description: 'Exit Plan 설계 및 승계 시나리오별 전략 수립',
      },
      {
        name: '자산보전 컨설팅',
        frequency: '수시',
        description: '최상위 법무/세무법인 제휴 전문가 1:1 상담',
      },
    ],
  },
  {
    category: 'Private Art & Wellness',
    icon: Globe,
    programs: [
      {
        name: 'Private View 도슨트 투어',
        frequency: '분기 1회',
        description: '미술관/갤러리 휴관일 비공개 대관 프라이빗 관람',
      },
      {
        name: '글로벌 힐링 리트릿',
        frequency: '반기 1회',
        description: '일본 나오시마, 스위스 등 청정지역 웰니스 여행',
      },
      {
        name: '아트 컬렉션 자문',
        frequency: '수시',
        description: '예술 자산 투자 및 컬렉션 관리 전문가 상담',
      },
    ],
  },
  {
    category: 'VVIP Concierge',
    icon: Crown,
    programs: [
      {
        name: 'Airport Protocol',
        frequency: '상시',
        description: '자택-공항 리무진 픽업 & 샌딩 서비스',
      },
      {
        name: 'Medical Care',
        frequency: '상시',
        description: '대학병원 VIP 검진센터 우선 예약 및 전담 에스코트',
      },
      {
        name: 'Golf & Dining',
        frequency: '상시',
        description: '명문 골프장 부킹 및 특급호텔 파인다이닝 예약',
      },
    ],
  },
  {
    category: 'CEO 네트워킹',
    icon: Network,
    programs: [
      {
        name: '업종별 CEO 라운드테이블',
        frequency: '분기 1회',
        description: '제조업, 건설업, IT/벤처 등 업종별 심화 토론',
      },
      {
        name: '프리미엄 골프 모임',
        frequency: '월 1회',
        description: '라운딩을 통한 자연스러운 네트워킹과 관계 형성',
      },
      {
        name: '가족 동반 이벤트',
        frequency: '연 2회',
        description: '가족 단위 참여 가능한 특별 프라이빗 이벤트',
      },
    ],
  },
];

export const EDUCATION_PROGRAMS: EducationPrograms = {
  monthly: [
    '최신 세법 변화와 대응 전략',
    '중대재해처벌법 완전 정복',
    'ESG 경영과 투자 기회',
    '개인자산가 상속세 절세 전략',
  ],
  quarterly: [
    '업종별 리스크 관리 전략',
    '가족법인 설립 실무',
    '해외 투자 진출 가이드',
    '가족신탁과 자산보전 전략',
  ],
  annual: [
    '패밀리오피스 트렌드 분석',
    '차세대 승계 전략 수립',
    '글로벌 자산 배분 전략',
    '고액자산가 통합자산관리 마스터클래스',
  ],
};

export const CEO_PROGRAMS: SpecialProgram[] = [
  {
    title: '2030 Business Live On',
    subtitle: '경제, 경영, 인문 등 명사 강연 및 조찬 (온/오프라인)',
    desc: '경영, 산업 트렌드, 리더십, 인문학 등 다양한 강연을 통해 사회의 리더로서 올바른 경영 철학을 고민하는 시간. 미래를 바라보는 지혜와 창조적 영감을 얻을 수 있습니다.',
    place: '서울 세미나룸 및 온라인 접속',
    target: 'VIP 고객',
    freq: '월1회',
  },
  {
    title: 'CEO 명경재(明鏡齋)',
    subtitle: '법인CEO 고객을 위한 소수정예 인문학 클럽',
    desc: '명경재는 매우 맑은 거울에 자신을 비추며 함께 공부하는 곳을 의미합니다. 책의 저자와 함께 하는 강연을 통해 자신의 내면을 돌아보고, 자유로운 소통으로 인문학적 혜안을 나눕니다.',
    place: '서울 세미나룸',
    target: 'VIP 고객',
    freq: '반기 1회',
  },
  {
    title: '100년 기업 차세대 CEO 과정',
    subtitle: '경영 2,3세 가업승계 재직자 고객을 위한 교육 과정',
    desc: '가업승계의 방향과 트렌드를 선도하는 비즈니스 사례를 통해 실질적인 경영 노하우를 습득할 수 있는 다양한 커리큘럼 제공. 사업의 확장과 발전을 도모하며, 교육생들 간의 상호 네트워크를 구축합니다.',
    place: '서울 세미나룸',
    target: '가업승계 재직 중인 경영 2,3세',
    freq: '연1회',
    href: '/program/100-years-ceo',
  },
  {
    title: 'Global Insight Program',
    subtitle: '가업승계 대상 재학생 고객을 위한 과정',
    desc: "가문의 시작, 발전, 승계, 가치는 4가지 CORE VALUE에 입각하여 가문의 시작인 '나'로부터 나의 가족, 근원을 탐색하고 미래를 정립합니다. 미래 경영 리더로서의 경영 방향에 가이드를 제공합니다.",
    place: '서울 세미나룸 및 외부 장소',
    target: 'VIP 고객의 자녀',
    freq: '연1회',
  },
];

export const ASSET_PROGRAMS: SpecialProgram[] = [
  {
    title: '예술자산클래스 ART',
    subtitle: '문화 예술에 관심있는 고객을 위한 과정',
    desc: '예술은 인문학적 소양과 예술적 감각 뿐 아니라, 자테크의 방법으로까지 활용되고 있습니다. 강연, 전시회/경매 관람 등 예술을 다각도로 바라보는 관점을 키웁니다.',
    place: '서울 세미나룸',
    target: '예술에 관심이 있는 VIP 고객',
    freq: '반기 1회',
    href: '/program/art-asset-class',
  },
  {
    title: 'WM 부동산 아카데미',
    subtitle: '부동산 투자/세금 교육 및 유망 상권 필드트립 과정',
    desc: '부동산은 가문을 이어나갈 중점 자산인 만큼 장기적인 안목과 관리가 필요합니다. 관련 세법/투자 강의 및 수도권 주요지역 물건 답사를 통해 실전 감각을 키웁니다.',
    place: '세미나룸 및 현장 필드트립',
    target: '부동산 투자에 관심이 있는 VIP 고객',
    freq: '연1회',
  },
  {
    title: 'WM VIP 여성고객 초청 프로그램',
    subtitle: '4060 여성고객을 위한 문화 참여 프로그램',
    desc: 'VIP 여성고객의 품격과 여유를 위해, 시즌별 여성들의 주요 관심사에 대한 강연 및 명소 투어를 통한 힐링과 삶의 여유를 느끼실 수 있습니다.',
    place: '서울 세미나룸',
    target: 'VIP 여성고객',
    freq: '연 1회',
  },
  {
    title: 'WM 프라이빗 골프대회',
    subtitle: '프로 골퍼와 함께 필드를 누빌 수 있는 기회',
    desc: '골프는 이제 대중적인 스포츠가 되었지만, 여전히 상류층들의 주된 네트워크의 수단으로 활용되고 있습니다. 프로 골퍼와 함께 필드에서 다양한 기술과 VIP들과의 인연을 쌓으실 수 있습니다.',
    place: '각 지역별 주요 골프CC',
    target: 'VIP 고객',
    freq: '운영 사업부별 연 1회',
  },
  {
    title: '개인자산가 전용 패밀리오피스 아카데미',
    subtitle: '30억+ 고액자산가를 위한 통합자산관리 교육',
    desc: '개인자산 30억원 이상의 고액자산가를 위한 전문 교육 과정입니다. 가족신탁, 상속세 최적화, 해외자산 관리, 프라이빗 뱅킹 등 고액자산가만의 특별한 니즈에 맞춘 체계적인 교육을 제공합니다.',
    place: '서울 프리미엄 세미나룸',
    target: '개인자산 30억원 이상 고액자산가',
    freq: '연 2회',
    href: '/program/private-wealth-academy',
  },
  {
    title: '가족신탁 설립 마스터클래스',
    subtitle: '고액자산가를 위한 Family Trust 전문 과정',
    desc: '가족자산의 체계적 보전과 승계를 위한 가족신탁 설립 전문 교육입니다. 신탁 구조 설계, 세무 최적화, 수익자 관리, 운영 실무까지 가족신탁의 모든 것을 다루는 고급 과정입니다.',
    place: '서울 세미나룸',
    target: '자산보전 및 승계 계획이 있는 고액자산가',
    freq: '분기 1회',
    href: '/program/family-trust-masterclass',
  },
  {
    title: '글로벌 자산배분 전략 세미나',
    subtitle: '해외투자 및 국제 자산관리 전문 과정',
    desc: '국내 자산만으로는 한계가 있는 고액자산가를 위한 글로벌 자산배분 전략 교육입니다. 해외 부동산, 프라이빗 에쿼티, 헤지펀드 등 다양한 대체투자 기회와 리스크 관리 방법을 제공합니다.',
    place: '서울 세미나룸 및 해외 현지',
    target: '해외투자에 관심있는 고액자산가',
    freq: '반기 1회',
    href: '/program/global-asset-allocation',
  },
];
