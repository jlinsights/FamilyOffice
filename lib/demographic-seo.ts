// SuperClaude 연령별/업종별 맞춤 SEO 전략 - 40+ 법인 대표 타겟
// BMAD Method + AgentOS 다중관점 분석 결합

export interface DemographicTarget {
  ageGroup: '40-45' | '45-50' | '50-55' | '55-60' | '60+';
  industry: string;
  businessStage: '성장기' | '성숙기' | '승계준비' | '전환기';
  searchBehavior: {
    devices: ('mobile' | 'desktop' | 'tablet')[];
    timePattern: 'morning' | 'lunch' | 'evening' | 'weekend';
    searchStyle: 'direct' | 'research' | 'comparative';
  };
  painPoints: string[];
  motivations: string[];
  aspirations: string[];
  decisionFactors: string[];
}

// BMAD Method 기반 타겟별 키워드 매핑
export const bmadKeywordStrategy = {
  // Behavioral (행동 기반) - 실제 검색 패턴
  behavioral: {
    '40-45': [
      '40대 기업가 자산관리 시작',
      '사업확장 자금 관리법',
      '젊은 CEO 투자 실수 방지',
      '40대 사업가 재테크 기초',
      '스타트업 CEO 자산 보호'
    ],
    '45-50': [
      '중년 기업가 안정적 투자',
      '45세 이후 자산관리 전략',
      '중견기업 대표 포트폴리오',
      '사업안정화 후 투자방향',
      '중년 CEO 위험관리'
    ],
    '50-55': [
      '50대 기업가 은퇴준비',
      '가업승계 시점 판단',
      '중년 후기 자산 재배치',
      '50대 CEO 상속 고민',
      '사업 정점기 자산전략'
    ],
    '55-60': [
      '승계 타이밍 결정',
      '55세 이후 자산 이전',
      '시니어 CEO 세무전략',
      '은퇴 10년 전 준비',
      '경영권 승계 준비'
    ],
    '60+': [
      '60대 기업가 완전승계',
      '시니어 사업가 유산계획',
      '원로 CEO 자산 정리',
      '3세대 승계 전략',
      '평생 자산 총정리'
    ]
  },

  // Motivational (동기 기반) - 성취와 성장 욕구
  motivational: {
    성공인정: [
      '업계 1위 기업 자산관리법',
      '성공한 CEO들의 투자 비밀',
      '억만장자 기업가 전략',
      '명문 기업가 자산관리',
      '최고경영진 전용 서비스'
    ],
    가족보호: [
      '자녀 미래 보장 투자',
      '가족 평생 안전망 구축',
      '대물림 자산 만들기',
      '자녀 교육비 완벽 준비',
      '가족 의료비 대비책'
    ],
    사회기여: [
      'ESG 경영과 자산관리',
      '사회적 책임 투자',
      '선량한 기업가 유산',
      '지역사회 공헌 계획',
      '기업가정신 계승'
    ],
    전문성: [
      '전문가가 인정한 서비스',
      '업계 최고 수준 컨설팅',
      '검증된 자산관리 시스템',
      '삼성생명 전문가 집단',
      'VVIP 전용 프리미엄'
    ]
  },

  // Aspirational (열망 기반) - 미래 비전과 꿈
  aspirational: {
    글로벌비전: [
      '세계적인 기업가문 꿈',
      '글로벌 패밀리오피스 구축',
      '국제적 자산 분산',
      '해외 진출 자금 계획',
      '월드클래스 기업 만들기'
    ],
    세대계승: [
      '100년 기업 만들기',
      '3대까지 이어갈 기업',
      '차세대 CEO 양성',
      '가문의 영속성',
      '기업가정신 대물림'
    ],
    사회지위: [
      '존경받는 기업가 되기',
      '명예로운 은퇴 준비',
      '사회적 영향력 확대',
      '업계 리더로 인정',
      '품격 있는 라이프스타일'
    ],
    레거시구축: [
      '역사에 남을 기업 유산',
      '후대에 자랑스러운 성과',
      '사회에 기여한 기업가',
      '모범적 경영 사례',
      '지속가능한 성장 모델'
    ]
  },

  // Decisional (결정 기반) - 구체적 실행 요소
  decisional: {
    즉시실행: [
      '오늘부터 시작하는 자산관리',
      '지금 당장 가업승계 준비',
      '무료상담 즉시 신청',
      '당일 방문 상담 가능',
      '긴급 세무 문제 해결'
    ],
    신뢰검증: [
      '삼성생명 공식 인증',
      '1000억+ 운용 실적',
      '300+ 성공 사례',
      '20년+ 경력 전문가',
      'VVIP 고객 추천'
    ],
    비교우위: [
      '타사 대비 절세 효과',
      '경쟁사보다 높은 수익',
      '차별화된 서비스 품질',
      '독점적 투자 기회',
      '최고 수준 전문성'
    ],
    위험완화: [
      '100% 안전 보장',
      '전액 손실 방지',
      '법적 리스크 제로',
      '세무 문제 완전 해결',
      '가족 갈등 방지'
    ]
  }
};

// AgentOS 다중관점 업종별 키워드 전략
export const agentOSIndustryStrategy = {
  제조업: {
    financial: [
      '제조업 운영자금 최적화',
      '생산설비 투자 회수',
      '제조원가 절감 효과',
      '공장 부동산 활용'
    ],
    risk: [
      '제조업 특유 리스크',
      '환경규제 대응 비용',
      '산업재해 보상 준비',
      '품질사고 배상책임'
    ],
    market: [
      '제조업 M&A 기회',
      '글로벌 진출 자금',
      '스마트팩토리 투자',
      '친환경 전환 자금'
    ],
    growth: [
      '제조업 디지털 혁신',
      '자동화 설비 투자',
      'R&D 자금 확보',
      '해외 공장 확장'
    ]
  },
  
  건설업: {
    financial: [
      '건설업 자금 순환 관리',
      '프로젝트 수익성 분석',
      '부동산 개발 수익',
      '건설사 현금흐름 최적화'
    ],
    risk: [
      '건설업 안전사고 대비',
      '하자보수 충당금 관리',
      '건설경기 변동 대응',
      '대금 회수 불능 리스크'
    ],
    market: [
      '재건축 재개발 기회',
      '부동산 경기 예측',
      '건설업 통합 트렌드',
      '도시개발 프로젝트'
    ],
    growth: [
      '건설업 신기술 도입',
      '친환경 건축 전환',
      '해외 건설 진출',
      '부동산 테크 활용'
    ]
  },

  IT서비스업: {
    financial: [
      'IT기업 가치평가 최적화',
      '기술자산 가치 산정',
      '소프트웨어 수익 모델',
      '구독형 매출 관리'
    ],
    risk: [
      'IT보안 사고 대비',
      '기술유출 방지 전략',
      '개인정보 보호 비용',
      '사이버 공격 대응'
    ],
    market: [
      'IT업계 IPO 준비',
      '유니콘 기업 투자',
      '빅테크 M&A 동향',
      '디지털 혁신 기회'
    ],
    growth: [
      'AI 사업 확장 전략',
      '클라우드 전환 투자',
      '글로벌 IT 진출',
      '핀테크 사업 다각화'
    ]
  },

  유통업: {
    financial: [
      '유통업 재고 관리 최적화',
      '매장 임대료 절감',
      '물류비용 효율화',
      '옴니채널 투자 회수'
    ],
    risk: [
      '온라인 쇼핑 변화 대응',
      '유통업 임대료 상승',
      '소비 패턴 변화 리스크',
      '재고 손실 최소화'
    ],
    market: [
      '유통업계 구조조정',
      'O2O 비즈니스 기회',
      '라이브커머스 트렌드',
      '해외 브랜드 도입'
    ],
    growth: [
      '디지털 유통 전환',
      '프랜차이즈 확장',
      '프리미엄 브랜드 육성',
      '구독형 서비스 도입'
    ]
  },

  의료업: {
    financial: [
      '의료기관 수익 최적화',
      '의료장비 투자 회수',
      '보험수가 대응 전략',
      '의료진 인건비 관리'
    ],
    risk: [
      '의료사고 배상 대비',
      '의료진 이탈 리스크',
      '감염병 대응 비용',
      '의료법 변경 대응'
    ],
    market: [
      '의료업계 통합 동향',
      '디지털 헬스케어',
      '원격의료 기회',
      '바이오 투자 동향'
    ],
    growth: [
      '스마트 병원 구축',
      '의료 AI 도입',
      '해외 의료진출',
      '헬스케어 플랫폼'
    ]
  }
};

// 검색 의도별 콘텐츠 최적화 전략
export const searchIntentOptimization = {
  informational: {
    contentType: '교육형 콘텐츠',
    keywords: [
      '패밀리오피스란 무엇인가',
      '가업승계 방법 종류',
      '자산관리 기본 원칙',
      'CEO 투자 전략 가이드'
    ],
    structure: '문제 정의 → 해결 방법 → 전문가 조언',
    cta: '전문가 무료 상담'
  },
  
  commercial: {
    contentType: '비교 검토형',
    keywords: [
      '패밀리오피스 비용 비교',
      '자산관리 회사 순위',
      '가업승계 전문가 선택',
      'VVIP 서비스 차이점'
    ],
    structure: '옵션 비교 → 장단점 분석 → 추천',
    cta: '맞춤 견적 받기'
  },
  
  transactional: {
    contentType: '실행형 콘텐츠',
    keywords: [
      '패밀리오피스 상담 신청',
      '가업승계 계획 수립',
      'CEO 자산관리 시작',
      'VVIP 서비스 가입'
    ],
    structure: '혜택 강조 → 긴급성 → 즉시 행동',
    cta: '지금 바로 시작'
  }
};

// SuperClaude 적응형 SEO 스코어링 시스템
export function calculateDemographicScore(
  ageGroup: string,
  industry: string,
  searchIntent: string
): number {
  const ageWeight = {
    '40-45': 0.8,
    '45-50': 1.0,  // 최적 타겟
    '50-55': 0.9,
    '55-60': 0.7,
    '60+': 0.6
  }[ageGroup as keyof typeof ageWeight] || 0.5;

  const industryWeight = {
    '제조업': 0.9,
    '건설업': 0.8,
    'IT서비스업': 0.9,
    '유통업': 0.7,
    '의료업': 0.8
  }[industry as keyof typeof industryWeight] || 0.6;

  const intentWeight = {
    'informational': 0.6,
    'commercial': 0.8,
    'transactional': 1.0
  }[searchIntent as keyof typeof intentWeight] || 0.5;

  return Math.round((ageWeight * industryWeight * intentWeight) * 100);
}

// 개인화된 키워드 생성 함수
export function generatePersonalizedKeywords(
  target: DemographicTarget
): string[] {
  const behavioralKeys = bmadKeywordStrategy.behavioral[target.ageGroup] || [];
  const motivationalKeys = Object.values(bmadKeywordStrategy.motivational).flat();
  const aspirationalKeys = Object.values(bmadKeywordStrategy.aspirational).flat();
  const decisionalKeys = Object.values(bmadKeywordStrategy.decisional).flat();
  
  const industryKeys = agentOSIndustryStrategy[target.industry as keyof typeof agentOSIndustryStrategy]
    ? Object.values(agentOSIndustryStrategy[target.industry as keyof typeof agentOSIndustryStrategy]).flat()
    : [];

  return [
    ...behavioralKeys.slice(0, 3),
    ...motivationalKeys.slice(0, 2),
    ...aspirationalKeys.slice(0, 2),
    ...decisionalKeys.slice(0, 2),
    ...industryKeys.slice(0, 3)
  ];
}