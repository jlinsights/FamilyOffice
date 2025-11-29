/**
 * SEO 성과 측정 및 추적 시스템
 * 네이버 검색 최적화 중심 성과 모니터링
 */

export interface SEOMetrics {
  date: string;
  keywordRankings: KeywordRanking[];
  organicTraffic: TrafficData;
  technicalSEO: TechnicalSEOScore;
  contentPerformance: ContentMetrics;
  competitorAnalysis: CompetitorData;
  naverSpecificMetrics: NaverMetrics;
}

export interface KeywordRanking {
  keyword: string;
  currentRank: number;
  previousRank: number;
  searchVolume: number;
  difficulty: 'low' | 'medium' | 'high';
  url: string;
  searchEngine: 'naver' | 'google' | 'daum';
  category: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface TrafficData {
  totalSessions: number;
  organicSessions: number;
  organicPercentage: number;
  bounceRate: number;
  avgSessionDuration: number;
  pagesPerSession: number;
  conversions: number;
  conversionRate: number;
  topLandingPages: LandingPageData[];
}

export interface LandingPageData {
  url: string;
  sessions: number;
  bounceRate: number;
  conversions: number;
  avgPosition: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface TechnicalSEOScore {
  overall: number; // 0-100
  pagespeed: {
    desktop: number;
    mobile: number;
  };
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay  
    cls: number; // Cumulative Layout Shift
  };
  indexability: {
    indexedPages: number;
    totalPages: number;
    crawlErrors: number;
  };
  structured_data: {
    valid: number;
    warnings: number;
    errors: number;
  };
  mobileUsability: number;
  security: {
    httpsScore: number;
    mixedContentIssues: number;
  };
}

export interface ContentMetrics {
  totalPosts: number;
  avgWordCount: number;
  keywordDensity: number;
  readabilityScore: number;
  internalLinkCount: number;
  externalLinkCount: number;
  imageOptimization: number;
  duplicateContentIssues: number;
  topPerformingContent: ContentPerformanceData[];
}

export interface ContentPerformanceData {
  title: string;
  url: string;
  views: number;
  timeOnPage: number;
  socialShares: number;
  backlinks: number;
  keywordCount: number;
  seoScore: number;
}

export interface CompetitorData {
  competitor: string;
  estimatedTraffic: number;
  topKeywords: string[];
  averageRank: number;
  backlinkCount: number;
  contentGap: string[];
  marketShare: number;
}

export interface NaverMetrics {
  blogOptimization: {
    blogRank: number;
    postFrequency: number;
    engagement: number;
    subscriberCount: number;
  };
  naverSearchConsole: {
    impressions: number;
    clicks: number;
    ctr: number;
    avgPosition: number;
  };
  naverPlaceOptimization: {
    businessListingScore: number;
    reviewCount: number;
    averageRating: number;
    photoCount: number;
  };
  premiumContent: {
    subscribers: number;
    monthlyRevenue: number;
    engagementRate: number;
    churnRate: number;
  };
}

// SEO 목표 설정
export const SEO_TARGETS = {
  keywordRankings: {
    '가업승계 컨설팅': { target: 5, timeframe: '3개월' },
    '패밀리오피스': { target: 3, timeframe: '1개월' },
    '법인세 절세': { target: 8, timeframe: '3개월' },
    '절세전략': { target: 10, timeframe: '2개월' },
    '정책자금 신청': { target: 15, timeframe: '3개월' },
    '기업인증 혜택': { target: 12, timeframe: '2개월' },
    '경영인정기보험': { target: 10, timeframe: '2개월' }
  },
  
  trafficTargets: {
    monthly: {
      organic: { target: 10000, current: 0 },
      total: { target: 15000, current: 0 },
      conversion: { target: 200, current: 0 }
    },
    daily: {
      organic: { target: 300, current: 0 },
      total: { target: 500, current: 0 }
    }
  },

  technicalTargets: {
    pagespeedScore: { target: 90, current: 0 },
    coreWebVitals: {
      lcp: { target: 2.5, current: 0 },
      fid: { target: 100, current: 0 },
      cls: { target: 0.1, current: 0 }
    },
    indexedPages: { target: 100, current: 0 }
  },

  naverTargets: {
    blogSubscribers: { target: 2000, current: 0 },
    premiumSubscribers: { target: 500, current: 0 },
    monthlyRevenue: { target: 5000000, current: 0 },
    naverSearchRank: { target: 10, current: 0 }
  }
};

// SEO 점수 계산 함수
export function calculateSEOScore(metrics: SEOMetrics): {
  overall: number;
  breakdown: Record<string, number>;
  improvements: string[];
} {
  const breakdown: Record<string, number> = {};
  const improvements: string[] = [];

  // 키워드 순위 점수 (40점)
  const keywordScore = calculateKeywordScore(metrics.keywordRankings);
  breakdown['키워드 순위'] = keywordScore;
  if (keywordScore < 30) improvements.push('주요 키워드 순위 개선 필요');

  // 기술적 SEO 점수 (25점)
  const technicalScore = metrics.technicalSEO.overall * 0.25;
  breakdown['기술적 SEO'] = technicalScore;
  if (technicalScore < 20) improvements.push('페이지 속도 및 기술적 최적화 필요');

  // 콘텐츠 품질 점수 (20점)
  const contentScore = calculateContentScore(metrics.contentPerformance);
  breakdown['콘텐츠 품질'] = contentScore;
  if (contentScore < 15) improvements.push('콘텐츠 품질 및 키워드 최적화 필요');

  // 트래픽 성과 점수 (15점)
  const trafficScore = calculateTrafficScore(metrics.organicTraffic);
  breakdown['트래픽 성과'] = trafficScore;
  if (trafficScore < 10) improvements.push('유기적 트래픽 증가 전략 필요');

  const overall = keywordScore + technicalScore + contentScore + trafficScore;

  return { overall, breakdown, improvements };
}

function calculateKeywordScore(rankings: KeywordRanking[]): number {
  if (rankings.length === 0) return 0;
  
  const targetKeywords = Object.keys(SEO_TARGETS.keywordRankings);
  const relevantRankings = rankings.filter(r => targetKeywords.includes(r.keyword));
  
  let totalScore = 0;
  relevantRankings.forEach(ranking => {
    const keywordTarget = (SEO_TARGETS.keywordRankings as Record<string, any>)[ranking.keyword];
    const target = keywordTarget?.target || 20;
    const score = Math.max(0, 100 - (ranking.currentRank - target) * 5);
    totalScore += score;
  });

  return Math.min(40, (totalScore / relevantRankings.length) * 0.4);
}

function calculateContentScore(content: ContentMetrics): number {
  let score = 0;
  
  // 키워드 밀도 점수 (적정 범위: 1.5-3.5%)
  if (content.keywordDensity >= 1.5 && content.keywordDensity <= 3.5) score += 5;
  
  // 가독성 점수
  if (content.readabilityScore >= 60) score += 5;
  
  // 내부 링크 점수
  if (content.internalLinkCount >= 3) score += 3;
  
  // 이미지 최적화 점수
  if (content.imageOptimization >= 80) score += 3;
  
  // 중복 콘텐츠 점수
  if (content.duplicateContentIssues === 0) score += 4;

  return score;
}

function calculateTrafficScore(traffic: TrafficData): number {
  let score = 0;
  
  const target = SEO_TARGETS.trafficTargets.monthly.organic.target;
  const current = traffic.organicSessions;
  
  // 트래픽 달성률
  const achievementRate = (current / target) * 100;
  score += Math.min(8, achievementRate * 0.08);
  
  // 전환율 점수
  if (traffic.conversionRate >= 2) score += 4;
  else if (traffic.conversionRate >= 1) score += 2;
  
  // 바운스율 점수
  if (traffic.bounceRate <= 40) score += 3;
  else if (traffic.bounceRate <= 60) score += 1;

  return Math.min(15, score);
}

// 경쟁사 분석 함수
export function analyzeCompetitors(): CompetitorData[] {
  return [
    {
      competitor: '한국투자증권 PB센터',
      estimatedTraffic: 15000,
      topKeywords: ['자산관리', '프라이빗뱅킹', '포트폴리오'],
      averageRank: 12,
      backlinkCount: 450,
      contentGap: ['가업승계 실무', '중소기업 특화'],
      marketShare: 25
    },
    {
      competitor: 'KB프라이빗뱅킹',
      estimatedTraffic: 12000,
      topKeywords: ['VIP서비스', '종합자산관리', '상속계획'],
      averageRank: 15,
      backlinkCount: 320,
      contentGap: ['정책자금 정보', '세무 전문성'],
      marketShare: 20
    },
    {
      competitor: '삼성증권 패밀리오피스',
      estimatedTraffic: 8000,
      topKeywords: ['패밀리오피스', '상속설계', '부동산투자'],
      averageRank: 18,
      backlinkCount: 280,
      contentGap: ['실무 가이드', '중소기업 사례'],
      marketShare: 15
    }
  ];
}

// 개선 제안 생성 함수
export function generateSEORecommendations(metrics: SEOMetrics): {
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  expectedImpact: string;
  implementation: string;
}[] {
  const recommendations = [];
  
  // 키워드 순위 개선
  const lowRankKeywords = metrics.keywordRankings.filter(k => k.currentRank > 20);
  if (lowRankKeywords.length > 0) {
    recommendations.push({
      priority: 'high' as const,
      category: '키워드 최적화',
      title: '순위 저조 키워드 집중 최적화',
      description: `${lowRankKeywords.length}개 키워드의 순위가 20위 이하입니다.`,
      expectedImpact: '3개월 내 평균 10위 이상 순위 상승',
      implementation: '콘텐츠 개선, 내부링크 강화, 키워드 밀도 조정'
    });
  }

  // 기술적 SEO 개선
  if (metrics.technicalSEO.pagespeed.mobile < 80) {
    recommendations.push({
      priority: 'high' as const,
      category: '기술적 SEO',
      title: '모바일 페이지 속도 최적화',
      description: `모바일 페이지 속도: ${metrics.technicalSEO.pagespeed.mobile}점`,
      expectedImpact: '검색 순위 5-10위 상승, 사용자 경험 개선',
      implementation: '이미지 최적화, CSS/JS 압축, 캐싱 설정'
    });
  }

  // 콘텐츠 최적화
  if (metrics.contentPerformance.avgWordCount < 1500) {
    recommendations.push({
      priority: 'medium' as const,
      category: '콘텐츠 최적화',
      title: '콘텐츠 길이 확장',
      description: `평균 글자 수: ${metrics.contentPerformance.avgWordCount}자`,
      expectedImpact: '검색 노출 증가, 체류시간 연장',
      implementation: '기존 콘텐츠 확장, 새로운 섹션 추가'
    });
  }

  // 네이버 블로그 최적화
  if (metrics.naverSpecificMetrics.blogOptimization.postFrequency < 3) {
    recommendations.push({
      priority: 'medium' as const,
      category: '네이버 블로그',
      title: '포스팅 빈도 증가',
      description: `주간 포스팅: ${metrics.naverSpecificMetrics.blogOptimization.postFrequency}회`,
      expectedImpact: '네이버 검색 노출 증가, 블로그 구독자 증가',
      implementation: '콘텐츠 캘린더 수립, 자동화 도구 활용'
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

// 실시간 알림 시스템
export class SEOAlertSystem {
  static checkRankingChanges(current: KeywordRanking[], previous: KeywordRanking[]) {
    const alerts: Array<{
      type: 'ranking_drop' | 'ranking_gain' | 'new_keyword';
      keyword: string;
      message: string;
      severity: 'low' | 'medium' | 'high';
      timestamp: string;
    }> = [];
    
    current.forEach(curr => {
      const prev = previous.find(p => p.keyword === curr.keyword);
      if (prev) {
        const change = prev.currentRank - curr.currentRank;
        if (change >= 5) {
          alerts.push({
            type: 'ranking_gain',
            keyword: curr.keyword,
            message: `"${curr.keyword}" 키워드 ${change}위 상승! (${curr.currentRank}위)`,
            severity: 'low',
            timestamp: new Date().toISOString()
          });
        } else if (change <= -5) {
          alerts.push({
            type: 'ranking_drop',
            keyword: curr.keyword,
            message: `"${curr.keyword}" 키워드 ${Math.abs(change)}위 하락 (${curr.currentRank}위)`,
            severity: 'high',
            timestamp: new Date().toISOString()
          });
        }
      }
    });
    
    return alerts;
  }
  
  static checkTrafficAnomalies(current: TrafficData, baseline: TrafficData) {
    const alerts = [];
    
    const trafficChange = ((current.organicSessions - baseline.organicSessions) / baseline.organicSessions) * 100;
    
    if (trafficChange <= -20) {
      alerts.push({
        type: 'error',
        message: `유기적 트래픽 ${Math.abs(trafficChange).toFixed(1)}% 감소`,
        action: 'SEO 문제 점검 필요'
      });
    } else if (trafficChange >= 20) {
      alerts.push({
        type: 'success',
        message: `유기적 트래픽 ${trafficChange.toFixed(1)}% 증가!`,
        action: '성공 요인 분석 및 확대'
      });
    }
    
    return alerts;
  }
}

// 보고서 생성 함수
export function generateSEOReport(metrics: SEOMetrics, timeframe: 'weekly' | 'monthly'): {
  summary: string;
  keyFindings: string[];
  actionItems: string[];
  projections: string[];
} {
  const score = calculateSEOScore(metrics);
  
  const summary = `
    SEO 전체 점수: ${score.overall.toFixed(1)}/100점
    주요 키워드 평균 순위: ${metrics.keywordRankings.reduce((acc, k) => acc + k.currentRank, 0) / metrics.keywordRankings.length}위
    월간 유기적 트래픽: ${metrics.organicTraffic.organicSessions.toLocaleString()}회
    전환율: ${metrics.organicTraffic.conversionRate.toFixed(2)}%
  `;

  const keyFindings = [
    `상위 5개 키워드 중 ${metrics.keywordRankings.filter(k => k.currentRank <= 10).length}개가 10위 이내`,
    `기술적 SEO 점수: ${metrics.technicalSEO.overall}점`,
    `네이버 블로그 구독자: ${metrics.naverSpecificMetrics.blogOptimization.subscriberCount}명`
  ];

  const actionItems = score.improvements;

  const projections = [
    '현재 추세 유지 시 3개월 후 유기적 트래픽 30% 증가 예상',
    '키워드 최적화 완료 시 전환율 50% 개선 가능',
    '네이버 블로그 전략 실행 시 월간 리드 200% 증가'
  ];

  return { summary, keyFindings, actionItems, projections };
}