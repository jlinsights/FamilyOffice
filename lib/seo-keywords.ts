// 🎯 SEO 키워드 관리 시스템 - SuperClaude Framework
// 네이버 블로그 전략과 통합된 키워드 시스템

export interface KeywordData {
  primary: string;
  secondary: string[];
  longTail: string[];
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  difficulty: 'low' | 'medium' | 'high';
  priority: 1 | 2 | 3;
  monthlyVolume: number;
  competition: 'low' | 'medium' | 'high';
  targetPosition: number;
  landingPage: string;
  metaTitle: string;
  metaDescription: string;
  localRelevance: number; // 1-10 (한국 시장 연관성)
  naverBlogKeywords: string[]; // 네이버 블로그 전용 키워드
}

export interface SEOPage {
  url: string;
  title: string;
  description: string;
  keywords: KeywordData;
  content: string;
  lastUpdated: string;
  structuredData?: any;
}

// 타겟 키워드 데이터베이스
export const targetKeywords: Record<string, KeywordData> = {
  // 🎯 핵심 타겟 키워드 확장
  taxPlan: {
    primary: '절세플랜',
    secondary: ['절세플랜 설계', '절세플랜 컨설팅', '맞춤형 절세플랜', 'CEO 절세플랜', '기업가 절세플랜'],
    intent: 'commercial',
    difficulty: 'medium',
    priority: 1,
    monthlyVolume: 1800,
    targetPosition: 3,
    landingPage: '/tax-plan',
    metaTitle: '절세플랜 전문가 | CEO·기업가 맞춤형 세무최적화 전략',
    metaDescription: '성공한 기업가를 위한 맞춤형 절세플랜. 법인세·소득세·상속세 통합 최적화로 세금 40% 절감. 전문가 무료 진단으로 최적 절세전략 설계.'
  },

  familyCorporation: {
    primary: '가족법인',
    secondary: ['가족법인 설립', '가족법인 운영', '가족법인 세무', '가족법인 장점', '가족법인 절세'],
    intent: 'commercial',
    difficulty: 'medium',
    priority: 1,
    monthlyVolume: 2200,
    targetPosition: 5,
    landingPage: '/family-corporation',
    metaTitle: '가족법인 설립 완벽 가이드 | 절세 효과부터 운영 전략까지',
    metaDescription: '가족법인으로 상속세 50% 절감! 설립부터 운영, 세무관리까지 완벽 가이드. 전문가 상담으로 최적 가족법인 구조 설계. 성공사례 200+건 보유.'
  },

  policyFunding: {
    primary: '정책자금',
    secondary: ['정책자금 신청', '정책자금 컨설팅', '정책자금 종류', '중소기업 정책자금', '창업 정책자금'],
    intent: 'commercial',
    difficulty: 'medium',
    priority: 1,
    monthlyVolume: 6500,
    targetPosition: 8,
    landingPage: '/policy-funding',
    metaTitle: '정책자금 신청 전문가 | 저금리 대출부터 보조금까지',
    metaDescription: '정책자금 신청 성공률 95%! 연 1.5~3.5% 저금리 대출, 보조금 신청까지. 전문가가 최적 정책자금 매칭. 무료 상담으로 즉시 확인.'
  },

  businessCertification: {
    primary: '기업인증',
    secondary: ['기업인증 종류', '기업인증 혜택', '기업인증 신청', '벤처기업인증', '이노비즈 인증'],
    intent: 'informational',
    difficulty: 'medium',
    priority: 2,
    monthlyVolume: 1800,
    targetPosition: 10,
    landingPage: '/corporate-certification',
    metaTitle: '기업인증 완벽 가이드 | 벤처·이노비즈 인증 혜택부터 신청까지',
    metaDescription: '기업인증으로 세제혜택 극대화! 벤처기업, 이노비즈, ISO 인증별 혜택 비교. 정책자금 우대, 세액공제까지. 전문가 무료 컨설팅.'
  },

  familyOffice: {
    primary: '패밀리오피스',
    secondary: ['패밀리오피스란', '패밀리오피스 서비스', '패밀리오피스 비용', '패밀리오피스 설립'],
    intent: 'informational',
    difficulty: 'medium',
    priority: 1,
    monthlyVolume: 2400,
    targetPosition: 3,
    landingPage: '/family-office',
    metaTitle: '패밀리오피스란? | 성공한 기업가를 위한 통합 자산관리 솔루션',
    metaDescription: '패밀리오피스는 중소중견기업 CEO와 고액자산가를 위한 종합 자산관리 서비스입니다. 가업승계, 세무최적화, 투자전략, 리스크관리를 원스톱으로 해결하는 프리미엄 서비스의 모든 것을 알아보세요.'
  },
  
  businessSuccession: {
    primary: '가업승계',
    secondary: ['가업승계 방법', '가업승계 절차', '가업승계 세금', '가업승계 절세', '중소기업 가업승계'],
    intent: 'commercial',
    difficulty: 'medium',
    priority: 1,
    monthlyVolume: 4800,
    targetPosition: 5,
    landingPage: '/business-succession',
    metaTitle: '가업승계 완벽 가이드 | 중소기업 CEO를 위한 단계별 전략',
    metaDescription: '가업승계 성공률 95% 달성! 세금 40% 절감, 경영권 안정화, 차세대 교육까지. 300개 기업 성공사례 기반 맞춤형 가업승계 로드맵. 무료 진단 서비스 제공'
  },

  inheritanceGift: {
    primary: '상속증여',
    secondary: ['상속세 절세', '증여세 절감', '상속세 계산기', '증여세 면제한도', '상속증여 세무'],
    intent: 'commercial',
    difficulty: 'high',
    priority: 2,
    monthlyVolume: 8200,
    targetPosition: 10,
    landingPage: '/inheritance-gift',
    metaTitle: '상속증여 완벽 가이드 | 절세 전략부터 계산기까지',
    metaDescription: '상속세 50% 절감 가능! 전문가가 알려주는 상속증여 완벽 절세 전략. 계산기 제공, 무료 세무 상담, 성공사례 300+건. 지금 바로 확인하세요.'
  },

  corporateCertification: {
    primary: '기업인증',
    secondary: ['벤처기업 인증', '이노비즈 인증', 'ISO 인증', '가족친화기업', '경영혁신형 중소기업'],
    intent: 'informational',
    difficulty: 'medium',
    priority: 2,
    monthlyVolume: 1800,
    targetPosition: 15,
    landingPage: '/business-certification',
    metaTitle: '기업인증 완벽 가이드 | 혜택부터 신청방법까지',
    metaDescription: '벤처기업, 이노비즈, ISO 등 기업인증 완벽 가이드. 인증별 혜택 비교, 신청 절차, 준비사항까지. 정책자금 우대, 세제혜택 최대화 방법 공개.'
  },

  policyFunds: {
    primary: '정책자금',
    secondary: ['정책자금 신청', '중소기업 정책자금', '창업자금', '시설자금', '운전자금'],
    intent: 'commercial',
    difficulty: 'medium',
    priority: 2,
    monthlyVolume: 6500,
    targetPosition: 15,
    landingPage: '/policy-funds',
    metaTitle: '정책자금 신청 가이드 | 저금리 대출부터 보조금까지',
    metaDescription: '중소기업 정책자금 완벽 가이드. 연 1.5~3.5% 저금리 대출, 보조금 신청방법, 자격요건, 신청절차까지. 전문가 무료 상담으로 최적 자금 매칭.'
  },

  samsungLife: {
    primary: '삼성생명',
    secondary: ['삼성생명 패밀리오피스', '삼성생명 자산관리', '삼성생명 VIP'],
    intent: 'navigational',
    difficulty: 'high',
    priority: 3,
    monthlyVolume: 27100,
    targetPosition: 20,
    landingPage: '/samsung-life-partnership',
    metaTitle: '삼성생명 패밀리오피스 | FamilyOffice S 프리미엄 파트너십',
    metaDescription: '삼성생명 1000억+ 검증된 운용실적. 프리미엄 패밀리오피스 서비스, 전문 컨설턴트 네트워크, VVIP 고객 전용 혜택을 확인하세요.'
  },

  samsungGFC: {
    primary: '삼성생명 GFC',
    secondary: ['GFC 채용', 'GFC 위촉', 'GFC 연봉', 'GFC 자격조건', 'GFC란'],
    intent: 'commercial',
    difficulty: 'low',
    priority: 1,
    monthlyVolume: 1200,
    targetPosition: 3,
    landingPage: '/samsung-gfc',
    metaTitle: '삼성생명 GFC 채용 | 최고 수입 보장, 전문가 양성 프로그램',
    metaDescription: '삼성생명 GFC(기업재무컨설턴트) 채용. 연봉 상위 1%, 전문 교육, 프리미엄 고객 매칭. 경력자 우대, 즉시 상담 가능. 성공한 미래를 설계하세요.'
  },

  samsungFire: {
    primary: '삼성화재',
    secondary: ['삼성화재 법인보험', '삼성화재 기업보험', '삼성화재 상품'],
    intent: 'commercial',
    difficulty: 'high',
    priority: 3,
    monthlyVolume: 9900,
    targetPosition: 20,
    landingPage: '/samsung-fire',
    metaTitle: '삼성화재 기업보험 | 법인 전용 종합보장 솔루션',
    metaDescription: '삼성화재 기업보험 완벽 가이드. 중대재해처벌법 대응보험, 임원배상책임보험, 영업배상책임보험 등 기업 리스크 완전 보장.'
  },

  seriousAccidentLaw: {
    primary: '중대재해처벌법',
    secondary: ['중대재해처벌법 대응', '중대재해처벌법 보험', '안전관리체계', '경영책임자 처벌'],
    intent: 'informational',
    difficulty: 'medium',
    priority: 1,
    monthlyVolume: 3600,
    targetPosition: 10,
    landingPage: '/serious-accident-law',
    metaTitle: '중대재해처벌법 완벽 대응 가이드 | 경영진 처벌 예방 전략',
    metaDescription: '중대재해처벌법 완벽 대응 가이드. 안전관리체계 구축, 경영책임자 보험, 법적 리스크 완전 차단. 전문가 무료 진단으로 완벽한 준비를.'
  },

  groupInsurance: {
    primary: '단체보험',
    secondary: ['단체보험 가입', '임직원 단체보험', '단체보험 혜택', '단체보험 절세'],
    intent: 'commercial',
    difficulty: 'medium',
    priority: 2,
    monthlyVolume: 2100,
    targetPosition: 10,
    landingPage: '/group-insurance',
    metaTitle: '단체보험 완벽 가이드 | 임직원 복리후생부터 절세까지',
    metaDescription: '임직원 단체보험 완벽 설계. 복리후생비 100% 손금처리, 직원 비과세 혜택, 사기 진작 효과까지. 맞춤형 단체보험 설계 상담.'
  },

  keyPersonInsurance: {
    primary: '경영인정기보험',
    secondary: ['경영인정기보험 가입조건', '핵심인물보험', 'CEO 보험', '임원보험'],
    intent: 'commercial',
    difficulty: 'low',
    priority: 1,
    monthlyVolume: 800,
    targetPosition: 5,
    landingPage: '/key-person-insurance',
    metaTitle: '경영인정기보험 | CEO·핵심임원 전용 리스크 관리',
    metaDescription: '경영인정기보험으로 기업 핵심인물 리스크 완전 보장. 사망·질병 시 기업 손실 보상, 보험료 손금처리, 해약환급금 활용. 맞춤 설계 상담.'
  },


  healthInsurance: {
    primary: '건강보험',
    secondary: ['기업 건강보험', '임직원 건강보험', '건강보험 혜택'],
    intent: 'informational',
    difficulty: 'high',
    priority: 3,
    monthlyVolume: 74000,
    targetPosition: 30,
    landingPage: '/corporate-health-insurance',
    metaTitle: '기업 건강보험 | 임직원 건강관리부터 복리후생까지',
    metaDescription: '기업 맞춤형 건강보험 솔루션. 임직원 건강관리, 의료비 절감, 복리후생 개선까지. 기업과 직원 모두 만족하는 건강보험 설계.'
  }
};

// 키워드별 관련 키워드 매핑 (타겟 키워드 확장)
export const relatedKeywords: Record<string, string[]> = {
  // 🎯 새로운 타겟 키워드 클러스터
  taxPlan: [
    '절세전략', '세무최적화', '세무설계', '세금절약', '절세상품',
    '소득세절세', '법인세절세', '상속세절세', '증여세절세', '종합소득세'
  ],
  familyCorporation: [
    '가족회사', '동족회사', '법인설립', '지주회사', '가족신탁',
    '법인전환', '개인사업자법인전환', '가족지분', '법인세무', '법인운영'
  ],
  policyFunding: [
    '정책금융', '정부지원금', '창업자금', '시설자금', '운전자금',
    '기술보증기금', '신용보증기금', '소상공인진흥공단', '중소벤처기업진흥공단', '저금리대출'
  ],
  businessCertification: [
    '벤처확인서', '이노비즈인증', '기업부설연구소', '연구개발전담부서', 'ISO인증',
    '가족친화기업', 'WE기업', '청년친화강소기업', '일학습병행기업', '강소기업'
  ],
  corporateCertification: [
    '벤처확인서', '이노비즈인증', '기업부설연구소', '연구개발전담부서', 'ISO인증',
    '가족친화기업', 'WE기업', '청년친화강소기업', '일학습병행기업', '강소기업'
  ],
  familyOffice: [
    '웰스매니지먼트', '프라이빗뱅킹', '자산관리회사', '투자자문', 
    '고액자산가', 'UHNW', '자산배분', '포트폴리오관리'
  ],
  businessSuccession: [
    '경영권승계', '2세경영', '후계자육성', '지분이전', '승계계획',
    '기업가치평가', '경영권방어', '승계세무', '가족협약'
  ],
  inheritanceGift: [
    '상속세법', '증여세법', '가업상속공제', '증여세과세특례', 
    '세무신고', '상속재산', '증여재산', '절세방법'
  ],
  corporateInsurance: [
    '임원배상책임보험', '영업배상책임보험', 'D&O보험', '사이버보험',
    '재산종합보험', '기업종합보험', '손해보험', '생명보험'
  ]
};

// SEO 점수 계산 함수
export function calculateSEOScore(content: string, targetKeyword: string): {
  score: number;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let score = 0;

  // 키워드 밀도 확인 (2-4% 권장)
  const keywordCount = (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length;
  const wordCount = content.split(/\s+/).length;
  const density = (keywordCount / wordCount) * 100;

  if (density < 1) {
    suggestions.push(`키워드 "${targetKeyword}" 사용 빈도를 늘려주세요 (현재: ${density.toFixed(1)}%)`);
  } else if (density > 5) {
    suggestions.push(`키워드 "${targetKeyword}" 사용을 줄여주세요. 과도한 키워드 스터핑 위험 (현재: ${density.toFixed(1)}%)`);
  } else {
    score += 20;
  }

  // 제목 태그 확인
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match && h1Match[1]?.toLowerCase().includes(targetKeyword.toLowerCase())) {
    score += 25;
  } else {
    suggestions.push('H1 태그에 타겟 키워드를 포함해주세요');
  }

  // 메타 설명 길이 확인 (120-160자 권장)
  const metaDesc = content.match(/description.*?content=['"]([^'"]*)['"]/i);
  if (metaDesc && metaDesc[1]) {
    const descLength = metaDesc[1].length;
    if (descLength >= 120 && descLength <= 160) {
      score += 15;
    } else {
      suggestions.push(`메타 설명 길이를 120-160자로 조정해주세요 (현재: ${descLength}자)`);
    }
  }

  // 이미지 alt 텍스트 확인
  const imgMatches = content.match(/<img[^>]*alt=['"]([^'"]*)['"]/gi);
  if (imgMatches && imgMatches.length > 0) {
    const hasKeywordInAlt = imgMatches.some(img => 
      img.toLowerCase().includes(targetKeyword.toLowerCase())
    );
    if (hasKeywordInAlt) {
      score += 10;
    } else {
      suggestions.push('이미지 alt 텍스트에 타겟 키워드를 포함해주세요');
    }
  }

  // 내부 링크 확인
  const internalLinks = content.match(/<a[^>]*href=['"]\/[^'"]*['"][^>]*>/g);
  if (internalLinks && internalLinks.length >= 3) {
    score += 15;
  } else {
    suggestions.push('관련 페이지로의 내부 링크를 3개 이상 추가해주세요');
  }

  // 콘텐츠 길이 확인 (1000자 이상 권장)
  const contentLength = content.replace(/<[^>]*>/g, '').length;
  if (contentLength >= 1000) {
    score += 15;
  } else {
    suggestions.push(`콘텐츠 길이를 늘려주세요 (현재: ${contentLength}자, 권장: 1000자 이상)`);
  }

  return { score, suggestions };
}

// 주요 경쟁사 키워드 분석 (생명보험사 및 자산관리 회사)
export const competitorKeywords = {
  // 주요 생명보험사 경쟁사
  '한화생명': ['한화생명 패밀리오피스', '한화 자산관리', '한화생명 VIP'],
  '교보생명': ['교보생명 자산관리', '교보 패밀리오피스', '교보생명 프리미엄'],
  'KB생명보험': ['KB생명 자산관리', 'KB 패밀리오피스', 'KB생명 VIP'],
  '신한생명': ['신한생명 자산관리', '신한 패밀리오피스', '신한생명 프리미엄'],
  '메트라이프': ['메트라이프생명', '메트라이프 자산관리', '메트라이프 VIP'],
  'AIA생명': ['AIA생명 자산관리', 'AIA 패밀리오피스', 'AIA생명 프리미엄'],
  '흥국생명': ['흥국생명 자산관리', '흥국 패밀리오피스'],
  
  // 자산관리 회사
  '하나은행 프라이빗': ['프라이빗뱅킹', '자산관리', 'VIP고객'],
  'KB증권 자산관리': ['자산관리', '투자자문', '포트폴리오'],
  '신한PWM': ['자산관리', 'PWM', '프라이빗웰스'],
  '미래에셋 패밀리오피스': ['패밀리오피스', '자산관리', '상속계획'],
  '삼성증권 자산관리': ['자산관리', '투자상품', '프리미엄서비스']
};

// 계절성 키워드 (시기별 최적화)
export const seasonalKeywords = {
  '1월-2월': ['신년 재무계획', '연초 절세전략', '신년 투자계획'],
  '3월-4월': ['종합소득세', '세무신고', '절세상품'],
  '5월': ['가정의달 가족자산', '자녀교육비', '가족보험'],
  '9월-10월': ['연말정산 준비', '절세상품', '보험정리'],
  '11월-12월': ['연말 절세', '내년 계획', '가업승계 준비']
};

// 지역별 키워드
export const localKeywords = {
  서울: ['서울 패밀리오피스', '서울 자산관리', '서울 가업승계'],
  강남: ['강남 패밀리오피스', '강남 자산관리', '강남 세무상담'],
  중구: ['중구 패밀리오피스', '중구 금융서비스'],
  영등포: ['영등포 자산관리', '여의도 금융서비스'],
  분당: ['분당 패밀리오피스', '판교 자산관리']
};

// AI 검색엔진 최적화 키워드 (타겟 키워드 확장)
export const aiSearchKeywords = [
  // 🎯 타겟 키워드 자연어 질문 형식
  '절세플랜 어떻게 세워야 하나요',
  '가족법인 설립해야 하나요',
  '정책자금 신청 조건이 뭔가요',
  '기업인증 어떤 게 좋을까요',
  '가업승계 언제 시작해야 하나요',
  
  // 기존 자연어 질문 형식
  '패밀리오피스가 뭐예요',
  '가업승계 어떻게 해야 하나요',
  '상속세 얼마나 내야 하나요',
  '경영인정기보험 필요한가요',
  '중대재해처벌법 어떻게 대응하나요',
  
  // 🎯 타겟 키워드 대화형 키워드
  '절세플랜 수립 방법',
  '가족법인 vs 개인법인',
  '정책자금 vs 은행대출',
  '기업인증 종류별 비교',
  '가업승계 체크리스트',
  
  // 기존 대화형 키워드
  '패밀리오피스 장단점',
  '가업승계 성공 방법',
  '절세 전략 알려줘',
  '법인보험 추천',
  '정책자금 신청방법',
  
  // 🎯 타겟 키워드 비교 검색
  '절세플랜 vs 절세상품',
  '가족법인 vs 가족신탁',
  '정책자금 vs 민간대출',
  '벤처인증 vs 이노비즈',
  '가업승계 vs 매각',
  
  // 기존 비교 검색
  '패밀리오피스 vs 프라이빗뱅킹',
  '상속 vs 증여 장단점',
  '정기보험 vs 종신보험',
  'SFO vs MFO 차이점',
  
  // 🎯 실무 검색 키워드
  '절세플랜 실행 단계',
  '가족법인 실무 가이드',
  '정책자금 신청 팁',
  '기업인증 성공 사례',
  '가업승계 실무 매뉴얼'
];

// 키워드 우선순위 계산
export function calculateKeywordPriority(
  monthlyVolume: number,
  difficulty: 'low' | 'medium' | 'high',
  businessValue: 'low' | 'medium' | 'high'
): number {
  const volumeScore = Math.log10(monthlyVolume) * 20;
  const difficultyScore = difficulty === 'low' ? 30 : difficulty === 'medium' ? 20 : 10;
  const valueScore = businessValue === 'high' ? 30 : businessValue === 'medium' ? 20 : 10;
  
  return Math.round(volumeScore + difficultyScore + valueScore);
}

// 콘텐츠 추천 엔진
export function getContentRecommendations(currentKeywords: string[]): {
  missingPages: string[];
  contentGaps: string[];
  opportunityKeywords: string[];
} {
  const allTargetKeywords = Object.keys(targetKeywords);
  const missingPages = allTargetKeywords.filter(keyword => 
    !currentKeywords.includes(targetKeywords[keyword]?.primary || '')
  );

  const contentGaps = [
    '업종별 맞춤 가이드',
    '성공사례 스토리',
    '전문가 인터뷰',
    '계산기 도구',
    '체크리스트',
    '비교 분석표'
  ];

  const opportunityKeywords = aiSearchKeywords.filter(keyword =>
    !currentKeywords.some(current => keyword.includes(current))
  );

  return { missingPages, contentGaps, opportunityKeywords };
}