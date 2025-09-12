/**
 * AI 콘텐츠 추천 엔진
 * 리드의 행동과 프로필을 분석하여 개인화된 콘텐츠 추천
 */

import { createClient } from '@/lib/supabase/server';
import { getHubSpotClient, HubSpotContact } from '@/lib/hubspot/api-client';

export interface ContentItem {
  id: string;
  title: string;
  type: 'blog_post' | 'whitepaper' | 'case_study' | 'webinar' | 'guide' | 'video' | 'infographic';
  category: 'asset_management' | 'succession_planning' | 'tax_strategy' | 'education' | 'general';
  description: string;
  url: string;
  tags: string[];
  target_audience: string[];
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  reading_time_minutes?: number;
  created_at: string;
  performance_score: number; // 과거 참여도 기반 점수
}

export interface ContentRecommendation {
  content: ContentItem;
  relevance_score: number;
  ai_confidence: number;
  recommendation_reason: string;
  personalization_factors: string[];
}

export interface RecommendationContext {
  contact_id: string;
  contact_profile: HubSpotContact;
  recent_activities: any[];
  lead_score: number;
  service_interests: string[];
  company_profile: {
    size?: string;
    industry?: string;
    revenue_range?: string;
  };
}

// 미리 정의된 콘텐츠 카탈로그
const CONTENT_CATALOG: ContentItem[] = [
  {
    id: 'succession-planning-guide-2024',
    title: '2024년 기업승계 완전가이드',
    type: 'whitepaper',
    category: 'succession_planning',
    description: '중견기업 CEO를 위한 체계적인 기업승계 전략과 세무 최적화 방안',
    url: '/resources/succession-planning-guide-2024.pdf',
    tags: ['기업승계', '세무계획', '지배구조', '상속세'],
    target_audience: ['중견기업CEO', '1세대사업가', '가족기업'],
    difficulty_level: 'intermediate',
    reading_time_minutes: 45,
    created_at: '2024-01-15T00:00:00Z',
    performance_score: 85
  },
  {
    id: 'asset-diversification-strategy',
    title: '자산배분 다각화 전략',
    type: 'blog_post',
    category: 'asset_management',
    description: '위험 분산을 통한 안정적 자산 포트폴리오 구성 방법',
    url: '/blog/asset-diversification-strategy',
    tags: ['자산관리', '포트폴리오', '위험관리', '투자'],
    target_audience: ['고액자산가', '투자자', '기업임원'],
    difficulty_level: 'intermediate',
    reading_time_minutes: 12,
    created_at: '2024-02-01T00:00:00Z',
    performance_score: 92
  },
  {
    id: 'tax-optimization-case-study',
    title: '중견기업 세무최적화 성공사례',
    type: 'case_study',
    category: 'tax_strategy',
    description: '매출 500억 제조업체의 법인세 절약 전략과 실행 결과',
    url: '/case-studies/tax-optimization-manufacturing',
    tags: ['세무최적화', '법인세', '제조업', '성공사례'],
    target_audience: ['제조업CEO', '세무담당자', '중견기업'],
    difficulty_level: 'advanced',
    reading_time_minutes: 20,
    created_at: '2024-01-30T00:00:00Z',
    performance_score: 78
  },
  {
    id: 'family-office-webinar-series',
    title: '패밀리오피스 실무 웨비나 시리즈',
    type: 'webinar',
    category: 'education',
    description: '월 1회 진행되는 패밀리오피스 실무진을 위한 교육 웨비나',
    url: '/webinars/family-office-series',
    tags: ['패밀리오피스', '교육', '웨비나', '실무'],
    target_audience: ['패밀리오피스임직원', '자산관리사', '고액자산가'],
    difficulty_level: 'intermediate',
    reading_time_minutes: 60,
    created_at: '2024-02-15T00:00:00Z',
    performance_score: 88
  },
  {
    id: 'korean-tax-changes-2024',
    title: '2024년 세법 변경사항과 대응전략',
    type: 'guide',
    category: 'tax_strategy',
    description: '올해 달라진 세법의 주요 변화와 기업의 대응 방안',
    url: '/guides/tax-changes-2024',
    tags: ['세법변경', '2024', '대응전략', '법인세'],
    target_audience: ['기업CEO', '세무담당자', '고액자산가'],
    difficulty_level: 'intermediate',
    reading_time_minutes: 25,
    created_at: '2024-01-10T00:00:00Z',
    performance_score: 91
  },
  {
    id: 'it-company-asset-management',
    title: 'IT기업 특화 자산관리 전략',
    type: 'blog_post',
    category: 'asset_management',
    description: '급성장하는 IT기업을 위한 맞춤형 자산관리 및 투자 전략',
    url: '/blog/it-company-asset-management',
    tags: ['IT기업', '급성장기업', '자산관리', '투자전략'],
    target_audience: ['IT기업CEO', '벤처기업가', '스타트업'],
    difficulty_level: 'beginner',
    reading_time_minutes: 15,
    created_at: '2024-02-20T00:00:00Z',
    performance_score: 83
  },
];

export class AIContentEngine {
  private supabase;
  private hubspotClient;
  private contentCatalog: ContentItem[];

  constructor() {
    this.supabase = createClient();
    this.hubspotClient = getHubSpotClient();
    this.contentCatalog = CONTENT_CATALOG;
  }

  /**
   * 리드를 위한 개인화된 콘텐츠 추천 생성
   */
  async generateRecommendations(
    contactId: string,
    maxRecommendations: number = 5
  ): Promise<ContentRecommendation[]> {
    try {
      // 1. 추천 컨텍스트 수집
      const context = await this.gatherRecommendationContext(contactId);
      
      if (!context) {
        throw new Error(`콘택트 정보를 찾을 수 없음: ${contactId}`);
      }

      // 2. 각 콘텐츠에 대해 관련도 점수 계산
      const scoredContent = await Promise.all(
        this.contentCatalog.map(content => this.scoreContentRelevance(content, context))
      );

      // 3. 점수별 정렬 및 상위 항목 선택
      const recommendations = scoredContent
        .sort((a, b) => b.relevance_score - a.relevance_score)
        .slice(0, maxRecommendations)
        .filter(rec => rec.relevance_score > 30); // 최소 관련도 임계값

      // 4. 추천 결과 데이터베이스 저장
      await this.saveRecommendations(contactId, recommendations);

      console.log(`🤖 AI 콘텐츠 추천 생성: ${contactId} → ${recommendations.length}개`);
      
      return recommendations;

    } catch (error) {
      console.error('콘텐츠 추천 생성 실패:', error);
      throw error;
    }
  }

  /**
   * 추천 컨텍스트 수집
   */
  private async gatherRecommendationContext(contactId: string): Promise<RecommendationContext | null> {
    try {
      // 1. HubSpot 콘택트 정보 조회
      const contact = await this.hubspotClient.getContactByEmail(contactId);
      if (!contact) return null;

      // 2. 최근 활동 조회 (30일)
      const supabase = await this.supabase;
      const { data: activities } = await supabase
        .from('lead_activities')
        .select('*')
        .eq('hubspot_contact_id', contactId)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(50);

      // 3. 리드 스코어 조회
      const { data: leadScore } = await supabase
        .from('lead_scores')
        .select('total_score')
        .eq('hubspot_contact_id', contactId)
        .single();

      // 4. 서비스 관심도 추출
      const serviceInterests = this.extractServiceInterests(contact, activities || []);

      // 5. 회사 프로필 정보
      const industryInfo = this.inferIndustry(contact);
      const companyProfile = {
        ...(contact.properties.company_size && { size: contact.properties.company_size }),
        ...(industryInfo && { industry: industryInfo }),
        ...(contact.properties.revenue_range && { revenue_range: contact.properties.revenue_range }),
      };

      return {
        contact_id: contactId,
        contact_profile: contact,
        recent_activities: activities || [],
        lead_score: leadScore?.total_score || 0,
        service_interests: serviceInterests,
        company_profile: companyProfile,
      };

    } catch (error) {
      console.error('추천 컨텍스트 수집 실패:', error);
      return null;
    }
  }

  /**
   * 콘텐츠 관련도 점수 계산
   */
  private async scoreContentRelevance(
    content: ContentItem,
    context: RecommendationContext
  ): Promise<ContentRecommendation> {
    let relevanceScore = 0;
    let aiConfidence = 0;
    const personalizationFactors: string[] = [];
    let recommendationReason = '';

    // 1. 서비스 관심도 매칭 (30점)
    const serviceMatch = this.calculateServiceMatch(content, context);
    relevanceScore += serviceMatch.score;
    aiConfidence += serviceMatch.confidence;
    if (serviceMatch.score > 0) {
      personalizationFactors.push(`서비스 관심도 매칭 (${serviceMatch.reason})`);
    }

    // 2. 회사 프로필 매칭 (25점)
    const companyMatch = this.calculateCompanyMatch(content, context);
    relevanceScore += companyMatch.score;
    aiConfidence += companyMatch.confidence;
    if (companyMatch.score > 0) {
      personalizationFactors.push(`회사 프로필 매칭 (${companyMatch.reason})`);
    }

    // 3. 행동 패턴 매칭 (20점)
    const behaviorMatch = this.calculateBehaviorMatch(content, context);
    relevanceScore += behaviorMatch.score;
    aiConfidence += behaviorMatch.confidence;
    if (behaviorMatch.score > 0) {
      personalizationFactors.push(`행동 패턴 매칭 (${behaviorMatch.reason})`);
    }

    // 4. 리드 스코어 기반 난이도 매칭 (15점)
    const difficultyMatch = this.calculateDifficultyMatch(content, context);
    relevanceScore += difficultyMatch.score;
    aiConfidence += difficultyMatch.confidence;
    if (difficultyMatch.score > 0) {
      personalizationFactors.push(`난이도 적합성 (${difficultyMatch.reason})`);
    }

    // 5. 콘텐츠 성과 점수 (10점)
    const performanceBonus = (content.performance_score / 100) * 10;
    relevanceScore += performanceBonus;
    aiConfidence += 10;

    // 6. 최신성 보너스 (5점)
    const recencyBonus = this.calculateRecencyBonus(content);
    relevanceScore += recencyBonus;
    aiConfidence += 5;

    // 7. 추천 이유 생성
    recommendationReason = this.generateRecommendationReason(content, personalizationFactors);

    // 8. AI 신뢰도 정규화 (0-100)
    aiConfidence = Math.min(aiConfidence / 1.05, 100); // 105점 만점을 100점으로 정규화

    return {
      content,
      relevance_score: Math.round(relevanceScore),
      ai_confidence: Math.round(aiConfidence),
      recommendation_reason: recommendationReason,
      personalization_factors: personalizationFactors,
    };
  }

  /**
   * 서비스 관심도 매칭 계산
   */
  private calculateServiceMatch(content: ContentItem, context: RecommendationContext) {
    let score = 0;
    let confidence = 0;
    let reason = '';

    // 직접적인 서비스 관심도 매칭
    const matchingInterests = context.service_interests.filter(interest => 
      content.category === interest || 
      content.tags.some(tag => tag.includes(interest))
    );

    if (matchingInterests.length > 0) {
      score = 30;
      confidence = 25;
      reason = `${matchingInterests.join(', ')} 관심사와 일치`;
    } else {
      // 간접적인 매칭 (태그 기반)
      const indirectMatches = content.tags.filter(tag =>
        context.service_interests.some(interest => 
          tag.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(tag.toLowerCase())
        )
      );

      if (indirectMatches.length > 0) {
        score = 15;
        confidence = 15;
        reason = `관련 주제 ${indirectMatches.join(', ')}와 연관`;
      }
    }

    return { score, confidence, reason };
  }

  /**
   * 회사 프로필 매칭 계산
   */
  private calculateCompanyMatch(content: ContentItem, context: RecommendationContext) {
    let score = 0;
    let confidence = 0;
    let reason = '';

    const { company_profile, contact_profile } = context;

    // 회사 규모 매칭
    if (company_profile.size && content.target_audience.some(audience => 
      audience.includes('중견기업') && company_profile.size === 'medium'
    )) {
      score += 10;
      confidence += 10;
      reason += '회사 규모 적합 ';
    }

    // 산업 매칭
    if (company_profile.industry) {
      const industryMatch = content.tags.some(tag => 
        tag.includes(company_profile.industry!) || 
        content.target_audience.some(audience => audience.includes(company_profile.industry!))
      );

      if (industryMatch) {
        score += 15;
        confidence += 15;
        reason += `${company_profile.industry} 업종 특화 `;
      }
    }

    // 직책/역할 매칭
    const isExecutive = contact_profile.properties.jobtitle?.toLowerCase().includes('ceo') ||
                       contact_profile.properties.jobtitle?.toLowerCase().includes('대표') ||
                       contact_profile.properties.jobtitle?.toLowerCase().includes('사장');

    if (isExecutive && content.target_audience.some(audience => 
      audience.includes('CEO') || audience.includes('대표') || audience.includes('임원')
    )) {
      score += 5;
      confidence += 5;
      reason += '경영진 대상 ';
    }

    return { score, confidence, reason: reason.trim() };
  }

  /**
   * 행동 패턴 매칭 계산
   */
  private calculateBehaviorMatch(content: ContentItem, context: RecommendationContext) {
    let score = 0;
    let confidence = 0;
    let reason = '';

    // 최근 활동에서 관심 주제 추출
    const recentTopics = context.recent_activities
      .filter(activity => activity.activity_type === 'page_view')
      .map(activity => activity.activity_data.page_url)
      .join(' ');

    // 페이지 방문 패턴 분석
    if (content.category === 'succession_planning' && 
        recentTopics.includes('/program')) {
      score += 15;
      confidence += 15;
      reason += '교육 프로그램 관심 ';
    }

    if (content.category === 'asset_management' && 
        recentTopics.includes('/services')) {
      score += 15;
      confidence += 15;
      reason += '자산관리 서비스 관심 ';
    }

    // 폼 제출 이력 분석
    const formSubmissions = context.recent_activities.filter(
      activity => activity.activity_type === 'form_submit'
    );

    if (formSubmissions.length > 0 && content.type === 'whitepaper') {
      score += 10;
      confidence += 10;
      reason += '심화 자료 선호 ';
    }

    // 반복 방문 패턴
    const pageViews = context.recent_activities.filter(
      activity => activity.activity_type === 'page_view'
    ).length;

    if (pageViews > 5 && content.difficulty_level === 'advanced') {
      score += 5;
      confidence += 5;
      reason += '고급 콘텐츠 적합 ';
    }

    return { score, confidence, reason: reason.trim() };
  }

  /**
   * 난이도 매칭 계산
   */
  private calculateDifficultyMatch(content: ContentItem, context: RecommendationContext) {
    let score = 0;
    let confidence = 15;
    let reason = '';

    const leadScore = context.lead_score;

    // 리드 스코어 기반 난이도 매칭
    if (leadScore >= 80) {
      // 고득점 리드는 고급 콘텐츠 선호
      if (content.difficulty_level === 'advanced') {
        score = 15;
        reason = '고급 수준 적합';
      } else if (content.difficulty_level === 'intermediate') {
        score = 10;
        reason = '중급 수준';
      }
    } else if (leadScore >= 40) {
      // 중간 점수 리드는 중급 콘텐츠 선호
      if (content.difficulty_level === 'intermediate') {
        score = 15;
        reason = '중급 수준 적합';
      } else if (content.difficulty_level === 'beginner') {
        score = 10;
        reason = '기초 수준';
      }
    } else {
      // 낮은 점수 리드는 기초 콘텐츠 선호
      if (content.difficulty_level === 'beginner') {
        score = 15;
        reason = '기초 수준 적합';
      }
    }

    return { score, confidence, reason };
  }

  /**
   * 최신성 보너스 계산
   */
  private calculateRecencyBonus(content: ContentItem): number {
    const contentAge = Date.now() - new Date(content.created_at).getTime();
    const daysOld = contentAge / (1000 * 60 * 60 * 24);

    if (daysOld < 30) {
      return 5; // 30일 미만: 최대 보너스
    } else if (daysOld < 90) {
      return 3; // 90일 미만: 중간 보너스
    } else if (daysOld < 180) {
      return 1; // 180일 미만: 작은 보너스
    }

    return 0; // 180일 이상: 보너스 없음
  }

  /**
   * 추천 이유 생성
   */
  private generateRecommendationReason(
    content: ContentItem, 
    personalizationFactors: string[]
  ): string {
    if (personalizationFactors.length === 0) {
      return `인기 콘텐츠로 추천됩니다 (성과 점수: ${content.performance_score}점)`;
    }

    const mainFactor = personalizationFactors[0];
    const additionalFactors = personalizationFactors.slice(1, 3).join(', ');

    let reason = `${mainFactor}에 기반해 추천됩니다`;
    if (additionalFactors) {
      reason += `. 추가로 ${additionalFactors}도 고려되었습니다`;
    }

    return reason + '.';
  }

  /**
   * 추천 결과 데이터베이스 저장
   */
  private async saveRecommendations(
    contactId: string, 
    recommendations: ContentRecommendation[]
  ): Promise<void> {
    try {
      const recommendationRows = recommendations.map(rec => ({
        hubspot_contact_id: contactId,
        content_type: rec.content.type,
        content_id: rec.content.id,
        content_title: rec.content.title,
        content_url: rec.content.url,
        recommendation_reason: rec.recommendation_reason,
        relevance_score: rec.relevance_score,
        ai_confidence: rec.ai_confidence,
        status: 'pending',
        created_at: new Date().toISOString(),
      }));

      const supabase = await this.supabase;
      const { error } = await supabase
        .from('content_recommendations')
        .insert(recommendationRows);

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error('추천 결과 저장 실패:', error);
      // 저장 실패가 추천 생성을 중단시키지 않음
    }
  }

  /**
   * 서비스 관심도 추출
   */
  private extractServiceInterests(contact: HubSpotContact, activities: any[]): string[] {
    const interests: Set<string> = new Set();

    // HubSpot 프로필에서 추출
    if (contact.properties.service_interest) {
      interests.add(contact.properties.service_interest);
    }

    // 활동 패턴에서 추출
    const pageUrls = activities
      .filter(activity => activity.activity_type === 'page_view')
      .map(activity => activity.activity_data.page_url || '');

    if (pageUrls.some(url => url.includes('/services') || url.includes('asset'))) {
      interests.add('asset_management');
    }

    if (pageUrls.some(url => url.includes('/program') || url.includes('succession'))) {
      interests.add('succession_planning');
    }

    if (pageUrls.some(url => url.includes('tax') || url.includes('세무'))) {
      interests.add('tax_strategy');
    }

    if (pageUrls.some(url => url.includes('/seminar') || url.includes('education'))) {
      interests.add('education');
    }

    return Array.from(interests);
  }

  /**
   * 업종 추론
   */
  private inferIndustry(contact: HubSpotContact): string | undefined {
    const company = contact.properties.company?.toLowerCase() || '';
    const jobTitle = contact.properties.jobtitle?.toLowerCase() || '';

    if (company.includes('제조') || company.includes('manufacturing') || 
        jobTitle.includes('제조') || jobTitle.includes('생산')) {
      return '제조업';
    }

    if (company.includes('IT') || company.includes('소프트웨어') || 
        company.includes('개발') || jobTitle.includes('개발') || 
        jobTitle.includes('IT')) {
      return 'IT';
    }

    if (company.includes('건설') || company.includes('부동산') || 
        jobTitle.includes('건설') || jobTitle.includes('부동산')) {
      return '건설업';
    }

    return undefined;
  }

  /**
   * 콘텐츠 추천 성과 추적
   */
  async trackRecommendationEngagement(
    recommendationId: string,
    engagementType: 'viewed' | 'clicked' | 'downloaded'
  ): Promise<void> {
    try {
      const updateData: any = {
        status: engagementType,
      };

      switch (engagementType) {
        case 'viewed':
          updateData.viewed_at = new Date().toISOString();
          break;
        case 'clicked':
          updateData.clicked_at = new Date().toISOString();
          break;
      }

      const supabase = await this.supabase;
      const { error } = await supabase
        .from('content_recommendations')
        .update(updateData)
        .eq('id', recommendationId);

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error('추천 성과 추적 실패:', error);
    }
  }

  /**
   * 추천 성과 분석
   */
  async getRecommendationAnalytics(daysBack: number = 30) {
    try {
      const supabase = await this.supabase;
      const { data, error } = await supabase
        .from('content_recommendations')
        .select('*')
        .gte('created_at', new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        throw error;
      }

      const total = data.length;
      const viewed = data.filter(rec => rec.viewed_at).length;
      const clicked = data.filter(rec => rec.clicked_at).length;

      return {
        total_recommendations: total,
        view_rate: total > 0 ? (viewed / total * 100).toFixed(1) : '0',
        click_rate: total > 0 ? (clicked / total * 100).toFixed(1) : '0',
        avg_relevance_score: total > 0 ? (data.reduce((sum, rec) => sum + rec.relevance_score, 0) / total).toFixed(1) : '0',
        avg_ai_confidence: total > 0 ? (data.reduce((sum, rec) => sum + rec.ai_confidence, 0) / total).toFixed(1) : '0',
        top_performing_content: this.getTopPerformingContent(data),
      };

    } catch (error) {
      console.error('추천 성과 분석 실패:', error);
      throw error;
    }
  }

  /**
   * 최고 성과 콘텐츠 추출
   */
  private getTopPerformingContent(recommendations: any[]) {
    const contentPerformance = recommendations.reduce((acc, rec) => {
      const contentId = rec.content_id;
      if (!acc[contentId]) {
        acc[contentId] = {
          content_id: contentId,
          content_title: rec.content_title,
          content_type: rec.content_type,
          total_recommendations: 0,
          total_clicks: 0,
          click_rate: 0,
        };
      }
      acc[contentId].total_recommendations++;
      if (rec.clicked_at) {
        acc[contentId].total_clicks++;
      }
      return acc;
    }, {} as Record<string, any>);

    // 클릭률 계산 및 정렬
    return Object.values(contentPerformance)
      .map((content: any) => ({
        ...content,
        click_rate: content.total_recommendations > 0 
          ? (content.total_clicks / content.total_recommendations * 100).toFixed(1)
          : '0'
      }))
      .sort((a, b) => parseFloat(b.click_rate) - parseFloat(a.click_rate))
      .slice(0, 5);
  }
}

// 싱글톤 인스턴스
let aiContentEngine: AIContentEngine | null = null;

export function getAIContentEngine(): AIContentEngine {
  if (!aiContentEngine) {
    aiContentEngine = new AIContentEngine();
  }
  return aiContentEngine;
}