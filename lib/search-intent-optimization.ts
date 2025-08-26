// SuperClaude 검색 의도별 콘텐츠 최적화 엔진
// BMAD Method + AgentOS 다중관점 기반 40+ CEO 타겟 최적화

export interface SearchIntentProfile {
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  stage: 'awareness' | 'consideration' | 'decision' | 'retention';
  ageGroup: '40-45' | '45-50' | '50-55' | '55-60' | '60+';
  urgency: 'immediate' | 'planned' | 'research';
  complexity: 'simple' | 'moderate' | 'complex';
}

// BMAD Method 기반 의도별 콘텐츠 전략
export const bmadContentStrategy = {
  informational: {
    // Behavioral: 정보 탐색 행동
    behavioral: {
      primaryKeywords: [
        '패밀리오피스란 무엇인가',
        '가업승계 방법 종류',
        '40대 CEO 자산관리 기초',
        '중소기업 승계 절차',
        '기업가 은퇴준비 가이드'
      ],
      contentStructure: {
        introduction: '문제 인식과 현상 파악',
        explanation: '개념 정의와 해결 방법',
        examples: '실제 사례와 성공 스토리',
        guidance: '전문가 조언과 다음 단계',
        cta: '무료 상담 및 추가 정보'
      },
      engagementTactics: [
        '체크리스트 제공',
        'FAQ 섹션 포함', 
        '관련 도구 링크',
        '전문가 인터뷰 인용'
      ]
    },
    
    // Motivational: 정보 습득 동기
    motivational: {
      painPoints: [
        '복잡한 세무 법규 이해 어려움',
        '승계 시점과 방법 결정 고민',
        '자산 손실에 대한 두려움',
        '전문가 선택 기준 불분명'
      ],
      aspirations: [
        '완벽한 가업승계 실현',
        '세무 리스크 제로 달성',
        '가족 갈등 없는 승계',
        '전문가 수준 지식 습득'
      ],
      emotionalTriggers: [
        '성공 사례 부러움',
        '실패 사례 두려움',
        '전문성에 대한 갈증',
        '안전한 선택 욕구'
      ]
    }
  },

  commercial: {
    // Behavioral: 비교 검토 행동
    behavioral: {
      primaryKeywords: [
        '패밀리오피스 비용 비교',
        '자산관리 회사 순위',
        '가업승계 전문가 선택 기준',
        'VVIP 서비스 차이점',
        '삼성생명 vs 경쟁사'
      ],
      contentStructure: {
        comparison: '옵션별 상세 비교표',
        pros_cons: '장단점 객관적 분석',
        criteria: '선택 기준과 체크포인트',
        recommendation: '상황별 최적 추천',
        cta: '맞춤 견적 및 상담 요청'
      },
      trustSignals: [
        '고객 만족도 95%+',
        '1000억원+ 운용 실적',
        '20년+ 경력 전문가',
        '300+ 성공 사례'
      ]
    },

    // Motivational: 선택 결정 동기  
    motivational: {
      decisionFactors: [
        '비용 대비 효과성',
        '전문성과 신뢰도',
        '서비스 차별화',
        '성공 실적과 평판'
      ],
      competitiveAdvantages: [
        '삼성생명 브랜드 신뢰',
        'VVIP 전용 서비스',
        '통합 솔루션 제공',
        '맞춤형 접근법'
      ],
      riskMitigation: [
        '100% 법적 컴플라이언스',
        '전액 손실 방지 보장',
        '투명한 수수료 체계',
        '언제든 해지 가능'
      ]
    }
  },

  transactional: {
    // Behavioral: 즉시 실행 행동
    behavioral: {
      primaryKeywords: [
        '패밀리오피스 상담 신청',
        '가업승계 계획 수립',
        'CEO 자산관리 시작',
        'VVIP 서비스 가입',
        '지금 바로 시작하기'
      ],
      contentStructure: {
        urgency: '지금 놓치면 안 되는 기회',
        benefits: '즉시 얻을 수 있는 혜택',
        process: '간단한 3단계 진행',
        guarantee: '만족 보장과 안전장치',
        cta: '1분 내 신청 완료'
      },
      conversionOptimizers: [
        '제한된 시간 혜택',
        '선착순 프리미엄 서비스',
        '당일 방문 상담 가능',
        '즉시 현금 절약 효과'
      ]
    },

    // Motivational: 즉시 행동 동기
    motivational: {
      immediateNeeds: [
        '세무 조사 임박 상황',
        '승계 적기 놓칠 위험',
        '시장 변동성 대응',
        '법규 변경 대비'
      ],
      urgencyDrivers: [
        '세법 변경 시행 임박',
        '최적 승계 타이밍',
        '금리 상승 대비책',
        '가족 갈등 조기 해결'
      ],
      actionBarriers: [
        '복잡한 절차 간소화',
        '높은 비용 부담 완화',
        '시간 부족 해결',
        '의사결정 지원'
      ]
    }
  },

  navigational: {
    // Behavioral: 직접 탐색 행동
    behavioral: {
      primaryKeywords: [
        '삼성생명 패밀리오피스',
        'FamilyOffice S 로그인',
        '서비스 문의',
        '고객센터',
        '지점 찾기'
      ],
      contentStructure: {
        navigation: '빠른 메뉴 및 링크',
        contact: '연락처 및 위치 정보',
        access: '로그인 및 회원 정보',
        support: '고객 지원 및 FAQ',
        cta: '직접 연결 및 바로 가기'
      },
      usabilityFeatures: [
        '검색 기능 최적화',
        '메뉴 구조 간소화',
        '연락처 원클릭',
        '모바일 최적화'
      ]
    },
    
    // Motivational: 직접 접근 동기
    motivational: {
      accessNeeds: [
        '빠른 정보 확인',
        '직접 상담 연결',
        '서비스 이용 방법',
        '계정 관리 필요'
      ],
      navigationGoals: [
        '원하는 페이지 직접 이동',
        '담당자 즉시 연결',
        '서비스 현황 확인',
        '문제 해결 방법 찾기'
      ],
      convenienceFactors: [
        '간편한 접근성',
        '직관적 인터페이스',
        '빠른 응답 시간',
        '모바일 친화적'
      ]
    }
  }
};

// AgentOS 다중관점 콘텐츠 최적화
export const agentOSContentOptimization = {
  // 재무관점: ROI와 비용효율성 강조
  financial: {
    keyMetrics: [
      '투자 수익률 향상 효과',
      '세무 절약 금액 계산',
      '승계 비용 최적화',
      '자산 보전 효과 측정'
    ],
    contentElements: [
      '구체적 수치와 계산 예시',
      'ROI 시뮬레이션 도구',
      '비용 절감 사례 연구',
      '수익성 분석 리포트'
    ],
    trustIndicators: [
      'CPA 검증 수치',
      '감사법인 인증',
      '금융감독원 신고',
      '세무서 승인 사례'
    ]
  },

  // 리스크관점: 안전성과 보장 강조
  risk: {
    riskCategories: [
      '세무 리스크 완전 차단',
      '법적 분쟁 예방',
      '자산 손실 방지',
      '가족 갈등 최소화'
    ],
    safetyMeasures: [
      '다중 안전장치 구축',
      '법무팀 사전 검토',
      '보험 완전 커버',
      '비상계획 수립'
    ],
    complianceStandards: [
      'ISO 27001 보안 인증',
      '개인정보보호 완벽 준수',
      '금융보안원 인증',
      'KiSCO 보안 등급'
    ]
  },

  // 시장관점: 기회와 경쟁우위 강조
  market: {
    marketTrends: [
      '패밀리오피스 시장 성장',
      '승계 세무 복잡화 트렌드',
      'VVIP 서비스 고도화',
      '디지털 혁신 가속화'
    ],
    competitiveEdge: [
      '시장 점유율 1위',
      '고객 만족도 최고',
      '서비스 혁신 선도',
      '전문가 집단 보유'
    ],
    futureOpportunities: [
      '글로벌 진출 지원',
      'ESG 경영 컨설팅',
      '디지털 전환 가속',
      '신사업 기회 발굴'
    ]
  },

  // 성장관점: 혁신과 발전 강조
  growth: {
    innovationAreas: [
      'AI 기반 자산관리',
      '블록체인 승계 시스템',
      '빅데이터 세무 분석',
      '로보어드바이저 연계'
    ],
    scalabilityFactors: [
      '서비스 확장성',
      '글로벌 네트워크',
      '기술 플랫폼',
      '전문가 육성'
    ],
    futureVision: [
      '차세대 패밀리오피스',
      '통합 생태계 구축',
      '고객 경험 혁신',
      '지속가능 성장'
    ]
  }
};

// 40+ 연령별 콘텐츠 개인화
export const ageSpecificContentPersonalization = {
  '40-45': {
    lifestage: '사업 확장기',
    priorities: ['성장 투자', '리스크 관리', '가족 계획'],
    contentTone: '도전적이고 역동적',
    keyMessages: [
      '지금이 자산관리 시작 최적기',
      '성장과 안정성 동시 확보',
      '미래를 위한 체계적 준비'
    ],
    preferredChannels: ['모바일', '소셜미디어', '웹세미나'],
    decisionSpeed: 'fast', // 2-4주
    informationDepth: 'moderate'
  },

  '45-50': {
    lifestage: '사업 안정기',
    priorities: ['자산 보전', '승계 준비', '세무 최적화'],
    contentTone: '신중하고 전문적',
    keyMessages: [
      '검증된 전략으로 안정성 확보',
      '승계 타이밍 최적화 필수',
      '전문가와 함께하는 현명한 선택'
    ],
    preferredChannels: ['데스크톱', '이메일', '대면 상담'],
    decisionSpeed: 'moderate', // 1-3개월
    informationDepth: 'detailed'
  },

  '50-55': {
    lifestage: '승계 준비기',
    priorities: ['가업승계', '세무 절약', '가족 조화'],
    contentTone: '세심하고 배려있는',
    keyMessages: [
      '성공적 승계를 위한 완벽한 준비',
      '가족 모두가 만족하는 해법',
      '20년 경험이 보장하는 결과'
    ],
    preferredChannels: ['대면 미팅', '전화 상담', '프린트 자료'],
    decisionSpeed: 'slow', // 3-6개월
    informationDepth: 'comprehensive'
  },

  '55-60': {
    lifestage: '승계 실행기',
    priorities: ['완전한 승계', '유산 계획', '은퇴 설계'],
    contentTone: '존경하고 격조있는',
    keyMessages: [
      '명예로운 은퇴를 위한 완벽한 마무리',
      '대를 이을 가업의 영속성 보장',
      '평생 업적의 가치 극대화'
    ],
    preferredChannels: ['VIP 라운지', '개별 방문', '프리미엄 리포트'],
    decisionSpeed: 'very_slow', // 6-12개월
    informationDepth: 'exhaustive'
  },

  '60+': {
    lifestage: '유산 관리기',
    priorities: ['유산 보전', '사회 환원', '가문 위상'],
    contentTone: '품격있고 감사한',
    keyMessages: [
      '평생 성과의 가치있는 마무리',
      '후대에 물려줄 소중한 유산',
      '사회에 기여하는 뜻깊은 선택'
    ],
    preferredChannels: ['개별 컨시어지', '가족 미팅', '맞춤 제안서'],
    decisionSpeed: 'contemplative', // 12+ 개월
    informationDepth: 'philosophical'
  }
};

// 검색 의도별 성능 측정 지표
export const searchIntentKPIs = {
  informational: {
    primary: ['페이지 체류시간', '콘텐츠 완독률', '다음 페이지 이동률'],
    secondary: ['소셜 공유율', '북마크 저장율', '이메일 구독률'],
    conversion: ['리드 생성율', '상담 신청율', '자료 다운로드율']
  },
  
  commercial: {
    primary: ['비교 페이지 조회', '계산기 사용률', '견적 요청율'],
    secondary: ['리뷰 페이지 방문', '고객 사례 조회', '전문가 프로필 확인'],
    conversion: ['상담 예약률', '서비스 문의율', '브로슈어 요청률']
  },
  
  transactional: {
    primary: ['CTA 클릭률', '양식 완성률', '결제 완료율'],
    secondary: ['긴급 상담 신청', '당일 미팅 요청', 'VIP 서비스 선택'],
    conversion: ['계약 체결율', '서비스 시작률', '추가 상품 구매율']
  }
};

// SuperClaude 통합 콘텐츠 최적화 함수
export function optimizeContentForSearchIntent(
  profile: SearchIntentProfile,
  baseContent: string
): {
  optimizedContent: string;
  keywordDensity: Record<string, number>;
  readabilityScore: number;
  engagementPrediction: number;
} {
  const strategy = bmadContentStrategy[profile.intent];
  const agePersonalization = ageSpecificContentPersonalization[profile.ageGroup];
  
  // BMAD Method 기반 콘텐츠 최적화
  let optimizedContent = baseContent;
  
  // Behavioral 키워드 통합
  const behavioralKeywords = strategy.behavioral.primaryKeywords;
  behavioralKeywords.forEach(keyword => {
    const density = (optimizedContent.match(new RegExp(keyword, 'gi')) || []).length;
    if (density < 2) {
      optimizedContent = optimizedContent.replace(
        /\n\n/,
        `\n\n${keyword}에 대한 전문가 조언: `
      );
    }
  });
  
  // 연령별 개인화 적용
  if (agePersonalization) {
    optimizedContent = optimizedContent.replace(
      /CEO/g,
      `${profile.ageGroup.replace('-', '-')}세 CEO`
    );
  }
  
  return {
    optimizedContent,
    keywordDensity: calculateKeywordDensity(optimizedContent, behavioralKeywords),
    readabilityScore: calculateReadabilityScore(optimizedContent),
    engagementPrediction: predictEngagement(profile, optimizedContent)
  };
}

function calculateKeywordDensity(content: string, keywords: string[]): Record<string, number> {
  const wordCount = content.split(' ').length;
  const density: Record<string, number> = {};
  
  keywords.forEach(keyword => {
    const matches = (content.match(new RegExp(keyword, 'gi')) || []).length;
    density[keyword] = Math.round((matches / wordCount) * 100 * 100) / 100;
  });
  
  return density;
}

function calculateReadabilityScore(content: string): number {
  // 한국어 가독성 점수 계산 (간소화)
  const sentences = content.split(/[.!?]/).length;
  const words = content.split(' ').length;
  const avgSentenceLength = words / sentences;
  
  // 40+ 타겟에 적합한 가독성 점수 (낮을수록 쉬움)
  const score = Math.max(0, Math.min(100, 100 - avgSentenceLength * 2));
  return Math.round(score * 100) / 100;
}

function predictEngagement(profile: SearchIntentProfile, content: string): number {
  const ageWeight = {
    '40-45': 0.9,
    '45-50': 1.0,
    '50-55': 0.8,
    '55-60': 0.7,
    '60+': 0.6
  }[profile.ageGroup];
  
  const intentWeight = {
    'informational': 0.7,
    'commercial': 0.8,
    'transactional': 1.0,
    'navigational': 0.6
  }[profile.intent];
  
  const urgencyWeight = {
    'immediate': 1.0,
    'planned': 0.8,
    'research': 0.6
  }[profile.urgency];
  
  const contentLength = content.length;
  const lengthScore = contentLength > 1000 && contentLength < 3000 ? 1.0 : 0.8;
  
  return Math.round(ageWeight * intentWeight * urgencyWeight * lengthScore * 100);
}