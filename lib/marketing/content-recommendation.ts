/**
 * AI 기반 콘텐츠 추천 엔진
 * 사용자 프로필과 행동 데이터를 분석하여 맞춤 콘텐츠 제공
 */

export interface UserProfile {
  id: string;
  email: string;
  industry?: string;
  companySize?: string;
  title?: string;
  interests: string[];
  stage: 'awareness' | 'consideration' | 'decision' | 'customer';
  lastActivity?: Date;
}

export interface Content {
  id: string;
  title: string;
  type: 'blog' | 'whitepaper' | 'webinar' | 'case_study' | 'tool' | 'newsletter';
  category: string;
  tags: string[];
  targetAudience: {
    industries: string[];
    companySizes: string[];
    titles: string[];
    stages: string[];
  };
  contentScore: number; // 콘텐츠 품질 점수
  engagementRate: number; // 참여율
  publishedAt: Date;
  url: string;
  description?: string;
  downloadCount?: number;
  viewCount?: number;
  shareCount?: number;
}

export interface ViewHistory {
  contentId: string;
  viewedAt: Date;
  timeSpent: number;
  completed: boolean;
  shared: boolean;
  downloaded: boolean;
}

export interface ContentRecommendation {
  content: Content;
  relevanceScore: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export class ContentRecommendationEngine {
  private readonly weights = {
    industry: 0.25,
    companySize: 0.15,
    title: 0.20,
    stage: 0.30,
    engagement: 0.10
  };
  
  // 사용자 맞춤 콘텐츠 추천
  async getRecommendations(
    userProfile: UserProfile,
    viewHistory: ViewHistory[] = [],
    excludeViewed: boolean = true,
    limit: number = 5
  ): Promise<ContentRecommendation[]> {
    
    // 모든 콘텐츠 가져오기 (실제로는 DB에서)
    const allContent = await this.getAllContent();
    
    // 이미 본 콘텐츠 제외
    let availableContent = allContent;
    if (excludeViewed) {
      const viewedIds = viewHistory.map(h => h.contentId);
      availableContent = allContent.filter(c => !viewedIds.includes(c.id));
    }
    
    // 각 콘텐츠에 대한 관련성 점수 계산
    const recommendations: ContentRecommendation[] = availableContent.map(content => {
      const relevanceScore = this.calculateRelevanceScore(userProfile, content, viewHistory);
      const reason = this.generateRecommendationReason(userProfile, content);
      const priority = this.determinePriority(relevanceScore, content);
      
      return {
        content,
        relevanceScore,
        reason,
        priority
      };
    });
    
    // 점수순 정렬 및 제한
    return recommendations
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }
  
  // 관련성 점수 계산
  private calculateRelevanceScore(
    profile: UserProfile,
    content: Content,
    viewHistory: ViewHistory[]
  ): number {
    let score = 0;
    
    // 1. 산업 매칭
    if (profile.industry && content.targetAudience.industries.includes(profile.industry)) {
      score += this.weights.industry * 100;
    }
    
    // 2. 회사 규모 매칭
    if (profile.companySize && content.targetAudience.companySizes.includes(profile.companySize)) {
      score += this.weights.companySize * 100;
    }
    
    // 3. 직책 매칭
    if (profile.title && content.targetAudience.titles.some(title => 
      profile.title!.toLowerCase().includes(title.toLowerCase())
    )) {
      score += this.weights.title * 100;
    }
    
    // 4. 구매 단계 매칭
    if (content.targetAudience.stages.includes(profile.stage)) {
      score += this.weights.stage * 100;
    }
    
    // 5. 관심사 매칭
    const interestMatch = profile.interests.filter(interest =>
      content.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
    ).length;
    score += (interestMatch / profile.interests.length) * 15;
    
    // 6. 콘텐츠 품질 보정
    score *= (content.contentScore / 100);
    
    // 7. 인기도 보정
    score *= (1 + content.engagementRate / 100);
    
    // 8. 최신성 보정
    const daysSincePublished = Math.floor(
      (Date.now() - content.publishedAt.getTime()) / (24 * 60 * 60 * 1000)
    );
    const freshnessMultiplier = Math.max(0.5, 1 - (daysSincePublished / 365));
    score *= freshnessMultiplier;
    
    // 9. 사용자 행동 패턴 반영
    const behaviorScore = this.analyzeBehaviorPattern(viewHistory, content);
    score += behaviorScore;
    
    return Math.round(score);
  }
  
  // 사용자 행동 패턴 분석
  private analyzeBehaviorPattern(viewHistory: ViewHistory[], content: Content): number {
    if (!viewHistory.length) return 0;
    
    let behaviorScore = 0;
    
    // 선호하는 콘텐츠 타입 분석
    const typePreferences = this.getTypePreferences(viewHistory);
    const preference = typePreferences[content.type];
    if (preference) {
      behaviorScore += preference * 10;
    }
    
    // 참여 깊이 분석
    const avgEngagement = viewHistory.reduce((sum, h) => sum + h.timeSpent, 0) / viewHistory.length;
    if (avgEngagement > 300) { // 5분 이상
      behaviorScore += 5; // 깊이 있는 콘텐츠 선호
    }
    
    // 최근 활동 패턴
    const recentViews = viewHistory.filter(h => 
      new Date(h.viewedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    behaviorScore += Math.min(recentViews.length, 5); // 최근 활성도
    
    return behaviorScore;
  }
  
  // 콘텐츠 타입별 선호도 계산
  private getTypePreferences(viewHistory: ViewHistory[]): Record<string, number> {
    const typeCounts: Record<string, number> = {};
    const totalViews = viewHistory.length;
    
    // 실제로는 viewHistory에서 contentId로 콘텐츠 타입을 조회해야 함
    // 여기서는 예시로 구현
    
    return {
      'blog': 0.4,
      'whitepaper': 0.3,
      'webinar': 0.2,
      'case_study': 0.1,
      'tool': 0.05,
      'newsletter': 0.35
    };
  }
  
  // 추천 이유 생성
  private generateRecommendationReason(profile: UserProfile, content: Content): string {
    const reasons: string[] = [];
    
    if (profile.industry && content.targetAudience.industries.includes(profile.industry)) {
      reasons.push(`${profile.industry} 업종 맞춤`);
    }
    
    if (profile.title && content.targetAudience.titles.some(title => 
      profile.title!.toLowerCase().includes(title.toLowerCase())
    )) {
      reasons.push('직책에 특화된 내용');
    }
    
    if (content.targetAudience.stages.includes(profile.stage)) {
      const stageText = {
        'awareness': '인식 단계',
        'consideration': '고려 단계', 
        'decision': '결정 단계',
        'customer': '고객'
      };
      reasons.push(`${stageText[profile.stage]}에 적합`);
    }
    
    if (content.engagementRate > 15) {
      reasons.push('높은 참여율');
    }
    
    if (content.downloadCount && content.downloadCount > 100) {
      reasons.push('인기 콘텐츠');
    }
    
    return reasons.join(', ') || '맞춤 추천';
  }
  
  // 우선순위 결정
  private determinePriority(relevanceScore: number, content: Content): 'high' | 'medium' | 'low' {
    if (relevanceScore >= 80) return 'high';
    if (relevanceScore >= 60) return 'medium';
    return 'low';
  }
  
  // 관심사 추출 (사용자 행동 기반)
  extractInterests(viewHistory: ViewHistory[]): string[] {
    // 실제로는 viewHistory의 콘텐츠를 분석하여 관심사 추출
    // NLP나 키워드 분석을 통해 구현 가능
    
    const commonInterests = [
      '가업승계', '자산관리', '세무최적화', '법인보험', 
      '상속증여', '투자전략', '리스크관리', '재무설계'
    ];
    
    return commonInterests.filter(() => Math.random() > 0.5);
  }
  
  // 모든 콘텐츠 가져오기 (실제로는 DB 쿼리)
  private async getAllContent(): Promise<Content[]> {
    // 실제 구현에서는 데이터베이스에서 콘텐츠를 가져옴
    return [
      {
        id: 'blog-1',
        title: 'CEO를 위한 가업승계 완벽 가이드',
        type: 'blog',
        category: '가업승계',
        tags: ['가업승계', '세무', '상속', 'CEO'],
        targetAudience: {
          industries: ['제조', '건설', 'IT'],
          companySizes: ['중견기업', '중소기업'],
          titles: ['CEO', '대표', '회장'],
          stages: ['awareness', 'consideration']
        },
        contentScore: 95,
        engagementRate: 18.5,
        publishedAt: new Date('2024-01-15'),
        url: '/blog/ceo-succession-guide',
        description: 'CEO가 꼭 알아야 할 가업승계 전략과 실행 방법',
        viewCount: 1250,
        shareCount: 35,
        downloadCount: 89
      },
      {
        id: 'whitepaper-1',
        title: '중견기업 자산관리 전략 백서',
        type: 'whitepaper',
        category: '자산관리',
        tags: ['자산관리', '투자전략', '포트폴리오', '위험관리'],
        targetAudience: {
          industries: ['제조', '유통', '서비스'],
          companySizes: ['중견기업', '대기업'],
          titles: ['CFO', '재무이사', 'CEO'],
          stages: ['consideration', 'decision']
        },
        contentScore: 92,
        engagementRate: 22.3,
        publishedAt: new Date('2024-01-10'),
        url: '/resources/wealth-management-whitepaper',
        description: '중견기업을 위한 체계적인 자산관리 전략',
        downloadCount: 156
      },
      {
        id: 'webinar-1',
        title: '2024 세무 트렌드와 절세 전략 웨비나',
        type: 'webinar',
        category: '세무',
        tags: ['세무', '절세', '법인세', '트렌드'],
        targetAudience: {
          industries: ['전체'],
          companySizes: ['중소기업', '중견기업'],
          titles: ['CEO', '대표', '재무담당'],
          stages: ['awareness', 'consideration']
        },
        contentScore: 88,
        engagementRate: 31.2,
        publishedAt: new Date('2024-01-05'),
        url: '/webinars/tax-strategy-2024',
        description: '2024년 세무 변화와 기업의 대응 전략',
        viewCount: 890
      }
    ];
  }
  
  // 콘텐츠 성과 추적
  async trackContentPerformance(contentId: string, userId: string, action: string): Promise<void> {
    // HubSpot이나 GA로 이벤트 전송
    // 실제 구현에서는 분석 시스템으로 데이터 전송
    console.log(`Content tracking: ${contentId} - ${action} by ${userId}`);
  }
  
  // A/B 테스트용 콘텐츠 변형
  getContentVariation(content: Content, variation: 'A' | 'B'): Content {
    if (variation === 'B') {
      return {
        ...content,
        title: `[특별 제공] ${content.title}`,
        description: `한정 공개: ${content.description}`
      };
    }
    return content;
  }
  
  // 개인화된 콘텐츠 경로 생성
  generatePersonalizedJourney(profile: UserProfile): Content[] {
    const journey: Content[] = [];
    
    switch (profile.stage) {
      case 'awareness':
        // 교육 중심 콘텐츠
        journey.push(
          ...this.getContentByCategory(['기초 가이드', '업계 트렌드', '교육 콘텐츠'])
        );
        break;
        
      case 'consideration':
        // 비교 및 평가 콘텐츠
        journey.push(
          ...this.getContentByCategory(['전략 가이드', '케이스 스터디', '비교 분석'])
        );
        break;
        
      case 'decision':
        // 구매 결정 지원 콘텐츠
        journey.push(
          ...this.getContentByCategory(['상세 가이드', '성공 사례', '구현 방법'])
        );
        break;
        
      case 'customer':
        // 고객 유지 및 확장 콘텐츠
        journey.push(
          ...this.getContentByCategory(['고급 전략', '최신 업데이트', '추가 서비스'])
        );
        break;
    }
    
    return journey;
  }
  
  private getContentByCategory(categories: string[]): Content[] {
    // 실제로는 DB에서 카테고리별 콘텐츠 조회
    return [];
  }
}

// 인스턴스 생성 및 내보내기
export const contentRecommendationEngine = new ContentRecommendationEngine();