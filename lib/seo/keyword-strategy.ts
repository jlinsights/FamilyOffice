/**
 * SEO 키워드 전략 및 타겟팅 시스템
 * Family Office 업계 특화 키워드 분석 및 컨텐츠 매핑
 */

export interface KeywordCluster {
  primary: string;
  secondary: string[];
  longtail: string[];
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial';
  difficulty: 'low' | 'medium' | 'high';
  volume: number; // 월간 검색량 추정
  competition: number; // 경쟁 강도 (1-10)
}

export interface ContentMapping {
  url: string;
  title: string;
  keywords: string[];
  cluster: string;
  contentType: 'service' | 'blog' | 'guide' | 'case-study' | 'tool';
  priority: 'high' | 'medium' | 'low';
}

/**
 * Family Office 핵심 키워드 클러스터
 */
export const KEYWORD_CLUSTERS: Record<string, KeywordCluster> = {
  // 핵심 비즈니스 키워드
  familyOffice: {
    primary: '패밀리오피스',
    secondary: ['가족자산관리', '자산관리서비스', '프라이빗뱅킹'],
    longtail: [
      '패밀리오피스 서비스 비용',
      '국내 패밀리오피스 추천',
      '삼성생명 패밀리오피스',
      '패밀리오피스 설립 방법',
      '중견기업 자산관리 서비스',
    ],
    intent: 'commercial',
    difficulty: 'high',
    volume: 8900,
    competition: 8,
  },

  // 기업승계 전략
  businessSuccession: {
    primary: '기업승계',
    secondary: ['승계계획', '경영권승계', '가업승계'],
    longtail: [
      '기업승계 세금 최적화',
      '가업승계 전략 컨설팅',
      '경영권 승계 방법',
      '기업승계 절차 안내',
      '2세 경영 준비 프로그램',
    ],
    intent: 'informational',
    difficulty: 'medium',
    volume: 12400,
    competition: 6,
  },

  // 자산관리 전략
  wealthManagement: {
    primary: '자산관리',
    secondary: ['포트폴리오관리', '투자자문', '자산배분'],
    longtail: [
      '고액자산가 투자 전략',
      '자산관리 포트폴리오 구성',
      '분산투자 전략 가이드',
      '해외투자 자산관리',
      '중견기업 CEO 자산관리',
    ],
    intent: 'commercial',
    difficulty: 'high',
    volume: 45600,
    competition: 9,
  },

  // 세무 최적화
  taxOptimization: {
    primary: '세무최적화',
    secondary: ['절세전략', '상속세', '증여세'],
    longtail: [
      '상속세 절세 방법',
      '증여세 최적화 전략',
      '기업 세무 컨설팅',
      '세무 리스크 관리',
      '국제조세 최적화',
    ],
    intent: 'informational',
    difficulty: 'medium',
    volume: 18700,
    competition: 7,
  },

  // 금융상품
  financialProducts: {
    primary: '금융상품',
    secondary: ['생명보험', '연금보험', '투자상품'],
    longtail: [
      '기업임원 생명보험',
      '퇴직연금 상품 비교',
      '고액보험 상품 추천',
      '변액보험 투자 전략',
      'CEO 보험 설계',
    ],
    intent: 'transactional',
    difficulty: 'medium',
    volume: 34200,
    competition: 8,
  },

  // 리스크 관리
  riskManagement: {
    primary: '리스크관리',
    secondary: ['위험관리', '보험설계', '보장분석'],
    longtail: [
      '기업 리스크 관리 방법',
      'CEO 개인보험 설계',
      '중대재해법 대응 보험',
      '기업임원배상책임보험',
      '사업위험 보장 상품',
    ],
    intent: 'informational',
    difficulty: 'low',
    volume: 15300,
    competition: 5,
  },

  // 교육 프로그램
  education: {
    primary: '자산관리교육',
    secondary: ['CEO교육', '경영진교육', '금융교육'],
    longtail: [
      'CEO 자산관리 교육',
      '차세대 경영진 교육',
      '패밀리오피스 세미나',
      '자산관리 전문교육',
      '기업가 금융교육',
    ],
    intent: 'informational',
    difficulty: 'low',
    volume: 8900,
    competition: 4,
  },
};

/**
 * 컨텐츠-키워드 매핑
 */
export const CONTENT_KEYWORD_MAPPING: ContentMapping[] = [
  // 메인 서비스 페이지
  {
    url: '/services',
    title: '패밀리오피스 종합 자산관리 서비스',
    keywords: ['패밀리오피스', '자산관리서비스', '프라이빗뱅킹'],
    cluster: 'familyOffice',
    contentType: 'service',
    priority: 'high',
  },
  {
    url: '/business-succession-strategy',
    title: '기업승계 전략 컨설팅 | 가업승계 최적화',
    keywords: ['기업승계', '가업승계', '승계계획', '경영권승계'],
    cluster: 'businessSuccession',
    contentType: 'service',
    priority: 'high',
  },
  {
    url: '/tax-strategy',
    title: '세무최적화 전략 | 상속세 증여세 절세',
    keywords: ['세무최적화', '절세전략', '상속세', '증여세'],
    cluster: 'taxOptimization',
    contentType: 'service',
    priority: 'high',
  },

  // 금융상품 페이지
  {
    url: '/corporate-life-insurance',
    title: '기업임원 생명보험 | CEO 보험설계 전문',
    keywords: ['기업임원 생명보험', 'CEO 보험설계', '고액보험'],
    cluster: 'financialProducts',
    contentType: 'service',
    priority: 'medium',
  },
  {
    url: '/key-person-insurance',
    title: '핵심인력보험 | 기업 리스크 관리 솔루션',
    keywords: ['핵심인력보험', '기업 리스크 관리', '위험관리'],
    cluster: 'riskManagement',
    contentType: 'service',
    priority: 'medium',
  },

  // 교육 및 프로그램
  {
    url: '/program',
    title: 'CEO 자산관리 교육 프로그램 | 차세대 경영진 교육',
    keywords: [
      'CEO 자산관리 교육',
      '차세대 경영진 교육',
      '패밀리오피스 세미나',
    ],
    cluster: 'education',
    contentType: 'service',
    priority: 'medium',
  },
  {
    url: '/seminar',
    title: '자산관리 세미나 | 기업가 금융교육 전문',
    keywords: ['자산관리 세미나', '기업가 금융교육', '자산관리교육'],
    cluster: 'education',
    contentType: 'service',
    priority: 'medium',
  },

  // 블로그 컨텐츠
  {
    url: '/blog',
    title: '자산관리 인사이트 | 패밀리오피스 전문 블로그',
    keywords: ['자산관리 블로그', '패밀리오피스 인사이트', '투자 전략'],
    cluster: 'wealthManagement',
    contentType: 'blog',
    priority: 'high',
  },
  {
    url: '/insights',
    title: '마켓 인텔리전스 | 자산관리 시장 분석',
    keywords: ['마켓 인텔리전스', '자산관리 시장분석', '투자 트렌드'],
    cluster: 'wealthManagement',
    contentType: 'blog',
    priority: 'medium',
  },
];

/**
 * 키워드 우선순위 계산
 */
export function calculateKeywordPriority(cluster: KeywordCluster): number {
  const volumeScore = Math.min(cluster.volume / 1000, 10); // 최대 10점
  const competitionScore = (11 - cluster.competition) / 10; // 경쟁도 역산
  const difficultyScore =
    cluster.difficulty === 'low'
      ? 1
      : cluster.difficulty === 'medium'
        ? 0.7
        : 0.4;

  return volumeScore * 0.4 + competitionScore * 0.3 + difficultyScore * 0.3;
}

/**
 * 타겟 키워드 추천
 */
export function getTargetKeywords(
  contentType: string,
  limit: number = 5
): string[] {
  const relevantMappings = CONTENT_KEYWORD_MAPPING.filter(
    mapping => mapping.contentType === contentType
  ).sort((a, b) => {
    const aPriority =
      a.priority === 'high' ? 3 : a.priority === 'medium' ? 2 : 1;
    const bPriority =
      b.priority === 'high' ? 3 : b.priority === 'medium' ? 2 : 1;
    return bPriority - aPriority;
  });

  const keywords = relevantMappings
    .flatMap(mapping => mapping.keywords)
    .slice(0, limit);

  return [...new Set(keywords)]; // 중복 제거
}

/**
 * 장기 키워드 생성
 */
export function generateLongTailKeywords(
  primaryKeyword: string,
  location?: string
): string[] {
  const modifiers = [
    '방법',
    '가이드',
    '전략',
    '컨설팅',
    '서비스',
    '추천',
    '비교',
    '장점',
    '단점',
    '비용',
    '절차',
    '조건',
    '혜택',
    '신청',
    '선택',
    '종류',
    '상품',
    '솔루션',
    '전문가',
  ];

  const questionWords = [
    '어떻게',
    '무엇을',
    '언제',
    '어디서',
    '왜',
    '누가',
    '얼마나',
    '몇',
  ];

  const longTailKeywords: string[] = [];

  // 수식어 조합
  modifiers.forEach(modifier => {
    longTailKeywords.push(`${primaryKeyword} ${modifier}`);
    if (location) {
      longTailKeywords.push(`${location} ${primaryKeyword} ${modifier}`);
    }
  });

  // 질문형 키워드
  questionWords.forEach(question => {
    longTailKeywords.push(`${question} ${primaryKeyword}`);
  });

  return longTailKeywords;
}

/**
 * 경쟁사 키워드 분석
 */
export interface CompetitorAnalysis {
  competitor: string;
  domain: string;
  targetKeywords: string[];
  estimatedTraffic: number;
  strengths: string[];
  opportunities: string[];
}

export const COMPETITOR_ANALYSIS: CompetitorAnalysis[] = [
  {
    competitor: '하나금융투자 PB센터',
    domain: 'hanafn.com',
    targetKeywords: ['프라이빗뱅킹', '자산관리', 'PB서비스'],
    estimatedTraffic: 125000,
    strengths: ['브랜드 인지도', '오프라인 네트워크'],
    opportunities: ['디지털 경험', '맞춤형 컨텐츠'],
  },
  {
    competitor: 'KB증권 WM센터',
    domain: 'kbsec.co.kr',
    targetKeywords: ['자산관리', 'WM서비스', '투자자문'],
    estimatedTraffic: 98000,
    strengths: ['금융상품 다양성', '시장 점유율'],
    opportunities: ['교육 컨텐츠', '세무 전문성'],
  },
  {
    competitor: '미래에셋 패밀리오피스',
    domain: 'miraeasset.com',
    targetKeywords: ['패밀리오피스', '고액자산관리', '글로벌투자'],
    estimatedTraffic: 156000,
    strengths: ['글로벌 네트워크', '투자 전문성'],
    opportunities: ['중견기업 특화', '보험 통합 서비스'],
  },
];

/**
 * 계절별 키워드 트렌드
 */
export const SEASONAL_KEYWORDS = {
  Q1: ['세무신고', '절세', '상속세 신고', '증여세 절세'],
  Q2: ['주주총회', '배당', '기업승계 계획', '여름휴가 자산관리'],
  Q3: ['추석 선물세', '하반기 투자전략', '연금저축 세액공제'],
  Q4: ['연말정산', '절세상품', '내년 투자계획', '보험료 세액공제'],
};

const keywordStrategy = {
  KEYWORD_CLUSTERS,
  CONTENT_KEYWORD_MAPPING,
  calculateKeywordPriority,
  getTargetKeywords,
  generateLongTailKeywords,
  COMPETITOR_ANALYSIS,
  SEASONAL_KEYWORDS,
};

export default keywordStrategy;
