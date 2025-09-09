/**
 * 인바운드 마케팅 리드 스코어링 엔진
 * HubSpot 연동하여 자동화된 리드 품질 평가 시스템
 */

export interface Lead {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  title?: string;
  industry?: string;
  companySize?: string;
  phone?: string;
  website?: string;
  source: string;
  createdAt: Date;
  lastActivity?: Date;
  activities: Activity[];
  emailMetrics?: EmailMetrics;
}

export interface Activity {
  type: 'page_view' | 'form_submission' | 'email_click' | 'download' | 'webinar_attend' | 'consultation_request';
  page?: string;
  timestamp: Date;
  duration?: number;
  content?: string;
  value: number; // 활동별 점수
}

export interface EmailMetrics {
  opens: number;
  clicks: number;
  lastOpened?: Date;
  lastClicked?: Date;
  unsubscribed: boolean;
}

export interface LeadScore {
  demographic: number;    // 인구통계학적 점수 (0-25)
  behavioral: number;     // 행동 점수 (0-40) 
  engagement: number;     // 참여 점수 (0-20)
  timing: number;        // 최신성 점수 (0-15)
  total: number;         // 총점 (0-100)
  grade: 'A' | 'B' | 'C' | 'D'; // 등급
  hotness: 'Hot' | 'Warm' | 'Cold'; // 온도
}

export class LeadScoringEngine {
  // 인구통계학적 점수 계산
  private scoreDemographics(lead: Lead): number {
    let score = 0;
    
    // 직책별 점수
    const titleScore = this.getTitleScore(lead.title);
    score += titleScore;
    
    // 회사 규모별 점수
    const companySizeScore = this.getCompanySizeScore(lead.companySize);
    score += companySizeScore;
    
    // 산업별 점수
    const industryScore = this.getIndustryScore(lead.industry);
    score += industryScore;
    
    return Math.min(score, 25);
  }
  
  private getTitleScore(title?: string): number {
    if (!title) return 0;
    
    const titleLower = title.toLowerCase();
    
    // CEO, 회장, 대표 (최고점)
    if (titleLower.includes('ceo') || titleLower.includes('회장') || 
        titleLower.includes('대표') || titleLower.includes('사장')) {
      return 15;
    }
    
    // 임원급 (고점)
    if (titleLower.includes('임원') || titleLower.includes('이사') ||
        titleLower.includes('부사장') || titleLower.includes('전무')) {
      return 12;
    }
    
    // 부장, 팀장급 (중점)
    if (titleLower.includes('부장') || titleLower.includes('팀장') ||
        titleLower.includes('차장') || titleLower.includes('과장')) {
      return 8;
    }
    
    // 기타 관리직
    if (titleLower.includes('매니저') || titleLower.includes('관리')) {
      return 5;
    }
    
    return 2;
  }
  
  private getCompanySizeScore(companySize?: string): number {
    if (!companySize) return 0;
    
    const sizeLower = companySize.toLowerCase();
    
    // 대기업 (100억+ 매출)
    if (sizeLower.includes('대기업') || sizeLower.includes('상장')) {
      return 8;
    }
    
    // 중견기업 (100-1000억 매출) - 핵심 타겟
    if (sizeLower.includes('중견') || sizeLower.includes('500억+')) {
      return 10; // 최고점
    }
    
    // 중소기업 (성장 잠재력)
    if (sizeLower.includes('중소') || sizeLower.includes('50억+')) {
      return 7;
    }
    
    // 소규모/스타트업
    if (sizeLower.includes('스타트업') || sizeLower.includes('10억+')) {
      return 3;
    }
    
    return 1;
  }
  
  private getIndustryScore(industry?: string): number {
    if (!industry) return 0;
    
    const industryLower = industry.toLowerCase();
    
    // 고수익 업종 (핵심 타겟)
    const highValueIndustries = [
      '제조', '건설', 'it', '금융', '부동산', '의료', 
      '제약', '에너지', '화학', '철강', '자동차'
    ];
    
    if (highValueIndustries.some(ind => industryLower.includes(ind))) {
      return 5;
    }
    
    // 중간 수익 업종
    const mediumValueIndustries = [
      '유통', '서비스', '교육', '미디어', '광고', '컨설팅'
    ];
    
    if (mediumValueIndustries.some(ind => industryLower.includes(ind))) {
      return 3;
    }
    
    return 1;
  }
  
  // 행동 점수 계산
  private scoreBehavior(activities: Activity[]): number {
    if (!activities.length) return 0;
    
    let score = 0;
    const recentActivities = activities.filter(
      activity => new Date(activity.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    
    // 활동별 점수 합계
    const activityScore = recentActivities.reduce((sum, activity) => sum + activity.value, 0);
    score += Math.min(activityScore, 25);
    
    // 방문 빈도 보너스
    const visitFrequency = recentActivities.filter(a => a.type === 'page_view').length;
    if (visitFrequency > 10) score += 8;
    else if (visitFrequency > 5) score += 5;
    else if (visitFrequency > 2) score += 3;
    
    // 고가치 콘텐츠 소비 보너스
    const highValueActivities = recentActivities.filter(a => 
      a.type === 'download' || a.type === 'webinar_attend' || a.type === 'consultation_request'
    );
    score += Math.min(highValueActivities.length * 3, 10);
    
    return Math.min(score, 40);
  }
  
  // 참여 점수 계산
  private scoreEngagement(emailMetrics?: EmailMetrics): number {
    if (!emailMetrics) return 0;
    
    let score = 0;
    
    // 이메일 오픈율 점수
    if (emailMetrics.opens > 10) score += 8;
    else if (emailMetrics.opens > 5) score += 6;
    else if (emailMetrics.opens > 2) score += 4;
    else if (emailMetrics.opens > 0) score += 2;
    
    // 클릭율 점수
    if (emailMetrics.clicks > 5) score += 8;
    else if (emailMetrics.clicks > 2) score += 6;
    else if (emailMetrics.clicks > 0) score += 4;
    
    // 최근 참여 보너스
    if (emailMetrics.lastOpened && 
        new Date(emailMetrics.lastOpened) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      score += 4;
    }
    
    // 구독 취소 페널티
    if (emailMetrics.unsubscribed) {
      score = Math.max(0, score - 15);
    }
    
    return Math.min(score, 20);
  }
  
  // 최신성 점수 계산
  private scoreRecency(lastActivity?: Date): number {
    if (!lastActivity) return 0;
    
    const daysSinceLastActivity = Math.floor(
      (Date.now() - new Date(lastActivity).getTime()) / (24 * 60 * 60 * 1000)
    );
    
    if (daysSinceLastActivity <= 1) return 15;
    if (daysSinceLastActivity <= 3) return 12;
    if (daysSinceLastActivity <= 7) return 10;
    if (daysSinceLastActivity <= 14) return 8;
    if (daysSinceLastActivity <= 30) return 5;
    if (daysSinceLastActivity <= 60) return 2;
    
    return 0;
  }
  
  // 종합 점수 계산
  public calculateScore(lead: Lead): LeadScore {
    const demographic = this.scoreDemographics(lead);
    const behavioral = this.scoreBehavior(lead.activities);
    const engagement = this.scoreEngagement(lead.emailMetrics);
    const timing = this.scoreRecency(lead.lastActivity);
    
    const total = demographic + behavioral + engagement + timing;
    
    // 등급 산정
    let grade: 'A' | 'B' | 'C' | 'D';
    if (total >= 80) grade = 'A';
    else if (total >= 60) grade = 'B';
    else if (total >= 40) grade = 'C';
    else grade = 'D';
    
    // 온도 산정 (행동 + 최신성 기반)
    const hotScore = behavioral + timing;
    let hotness: 'Hot' | 'Warm' | 'Cold';
    if (hotScore >= 35) hotness = 'Hot';
    else if (hotScore >= 20) hotness = 'Warm';
    else hotness = 'Cold';
    
    return {
      demographic,
      behavioral,
      engagement,
      timing,
      total,
      grade,
      hotness
    };
  }
  
  // 활동별 점수 가이드
  public static getActivityValues(): Record<Activity['type'], number> {
    return {
      'page_view': 1,
      'form_submission': 8,
      'email_click': 3,
      'download': 10,
      'webinar_attend': 15,
      'consultation_request': 25
    };
  }
  
  // 리드 우선순위 결정
  public getPriority(score: LeadScore): 'High' | 'Medium' | 'Low' {
    if (score.grade === 'A' || (score.grade === 'B' && score.hotness === 'Hot')) {
      return 'High';
    }
    if (score.grade === 'B' || (score.grade === 'C' && score.hotness === 'Hot')) {
      return 'Medium';
    }
    return 'Low';
  }
  
  // 추천 액션 제안
  public getRecommendedActions(lead: Lead, score: LeadScore): string[] {
    const actions: string[] = [];
    const priority = this.getPriority(score);
    
    if (priority === 'High') {
      actions.push('즉시 직접 전화 컨택');
      actions.push('맞춤 제안서 발송');
      actions.push('1:1 미팅 스케줄링');
    } else if (priority === 'Medium') {
      actions.push('개인화된 이메일 발송');
      actions.push('관심 분야 콘텐츠 추천');
      actions.push('세미나 초대');
    } else {
      actions.push('뉴스레터 구독 유도');
      actions.push('교육 콘텐츠 제공');
      actions.push('장기 넛쳐링 워크플로우 진입');
    }
    
    // 활동 부족 시
    if (score.behavioral < 10) {
      actions.push('웹사이트 재방문 유도 캠페인');
    }
    
    // 참여 부족 시
    if (score.engagement < 5) {
      actions.push('이메일 참여율 개선 캠페인');
    }
    
    return actions;
  }
}

// 사용 예시
export const leadScoringEngine = new LeadScoringEngine();

// HubSpot 연동을 위한 헬퍼 함수
export function convertToHubSpotProperties(score: LeadScore): Record<string, any> {
  return {
    lead_score: score.total,
    lead_grade: score.grade,
    lead_temperature: score.hotness,
    demographic_score: score.demographic,
    behavioral_score: score.behavioral,
    engagement_score: score.engagement,
    recency_score: score.timing,
    last_scored: new Date().toISOString()
  };
}