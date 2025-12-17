/**
 * 리드 스코어링 시스템
 * 행동 기반 점수 계산, BMAD 단계 분류, 자동 세그먼트 생성, CRM 연동 준비
 */

export type BMADStage = 'behavioral' | 'motivational' | 'aspirational' | 'decisional';
export type LeadStatus = 'new' | 'qualified' | 'nurturing' | 'hot' | 'cold' | 'converted' | 'lost';
export type LeadSegment =
  | 'high-value'
  | 'medium-value'
  | 'low-value'
  | 'enterprise'
  | 'mid-market'
  | 'startup';
export type ActivityType =
  | 'page_view'
  | 'form_submission'
  | 'email_open'
  | 'email_click'
  | 'download'
  | 'webinar_attendance'
  | 'consultation_request'
  | 'demo_request'
  | 'pricing_view'
  | 'case_study_view'
  | 'return_visit'
  | 'social_engagement';

export interface Lead {
  id: string;
  email: string;
  name?: string;
  company?: string;
  position?: string;
  phone?: string;

  // 리드 스코어링
  score: number;
  maxScore: number;
  scoreHistory: ScoreChange[];

  // BMAD 분류
  bmadStage: BMADStage;
  bmadStageConfidence: number; // 0-100%

  // 상태 & 세그먼트
  status: LeadStatus;
  segment: LeadSegment;

  // 행동 데이터
  activities: LeadActivity[];
  firstSeenAt: Date;
  lastActivityAt: Date;
  totalActivities: number;

  // 관심사 & 의도
  interests: string[];
  intentSignals: IntentSignal[];
  engagementLevel: 'low' | 'medium' | 'high';

  // 인구통계학적 데이터
  demographics?: {
    industry?: string;
    companySize?: string;
    revenue?: string;
    location?: string;
  };

  // 예측
  conversionProbability: number; // 0-100%
  estimatedValue: number;
  daysToConversion?: number;

  // CRM 연동
  crmId?: string;
  crmLastSyncedAt?: Date;

  metadata?: Record<string, unknown>;
}

export interface LeadActivity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  scoreImpact: number;
  details?: {
    pageUrl?: string;
    contentTitle?: string;
    emailSubject?: string;
    formName?: string;
    duration?: number;
    source?: string;
  };
}

export interface ScoreChange {
  timestamp: Date;
  oldScore: number;
  newScore: number;
  change: number;
  reason: string;
  activityId?: string;
}

export interface IntentSignal {
  signal: string;
  strength: 'weak' | 'moderate' | 'strong';
  detectedAt: Date;
  evidence: string[];
}

export interface ScoringRule {
  id: string;
  name: string;
  activityType: ActivityType;
  baseScore: number;
  decayRate?: number; // 시간에 따른 감점 비율 (일 단위)
  maxOccurrences?: number; // 최대 반영 횟수
  conditions?: {
    urlPattern?: RegExp;
    contentType?: string;
    duration?: { min?: number; max?: number };
    frequency?: { min?: number; max?: number };
  };
}

export interface LeadSegmentDefinition {
  id: string;
  name: string;
  segment: LeadSegment;
  criteria: {
    scoreMin?: number;
    scoreMax?: number;
    bmadStages?: BMADStage[];
    activityCountMin?: number;
    conversionProbabilityMin?: number;
    demographics?: {
      industry?: string[];
      companySize?: string[];
    };
  };
}

export interface ScoringStats {
  totalLeads: number;
  averageScore: number;
  byStatus: Record<LeadStatus, number>;
  bySegment: Record<LeadSegment, number>;
  byBMADStage: Record<BMADStage, number>;
  conversionRate: number;
  averageConversionProbability: number;
}

/**
 * 리드 스코어링 시스템 클래스
 */
export class LeadScoringSystem {
  private leads: Map<string, Lead> = new Map();
  private scoringRules: Map<string, ScoringRule> = new Map();
  private segmentDefinitions: LeadSegmentDefinition[] = [];
  private maxScore: number = 100;

  constructor() {
    this.initializeDefaultScoringRules();
    this.initializeDefaultSegments();
  }

  /**
   * 기본 스코어링 규칙 초기화
   */
  private initializeDefaultScoringRules(): void {
    const defaultRules: ScoringRule[] = [
      // High-Intent Activities (고의도 활동)
      {
        id: 'consultation_request',
        name: '상담 요청',
        activityType: 'consultation_request',
        baseScore: 20,
      },
      {
        id: 'demo_request',
        name: '데모 요청',
        activityType: 'demo_request',
        baseScore: 18,
      },
      {
        id: 'pricing_view',
        name: '가격 페이지 조회',
        activityType: 'pricing_view',
        baseScore: 15,
        maxOccurrences: 3,
      },

      // Medium-Intent Activities (중의도 활동)
      {
        id: 'form_submission',
        name: '폼 제출',
        activityType: 'form_submission',
        baseScore: 10,
      },
      {
        id: 'download',
        name: '자료 다운로드',
        activityType: 'download',
        baseScore: 8,
      },
      {
        id: 'webinar_attendance',
        name: '웨비나 참석',
        activityType: 'webinar_attendance',
        baseScore: 12,
      },
      {
        id: 'case_study_view',
        name: '케이스 스터디 조회',
        activityType: 'case_study_view',
        baseScore: 7,
        maxOccurrences: 5,
      },

      // Low-Intent Activities (저의도 활동)
      {
        id: 'email_open',
        name: '이메일 오픈',
        activityType: 'email_open',
        baseScore: 2,
        decayRate: 0.1,
        maxOccurrences: 10,
      },
      {
        id: 'email_click',
        name: '이메일 클릭',
        activityType: 'email_click',
        baseScore: 5,
        maxOccurrences: 10,
      },
      {
        id: 'page_view',
        name: '페이지 조회',
        activityType: 'page_view',
        baseScore: 1,
        decayRate: 0.05,
        maxOccurrences: 20,
      },
      {
        id: 'return_visit',
        name: '재방문',
        activityType: 'return_visit',
        baseScore: 3,
        maxOccurrences: 10,
      },
      {
        id: 'social_engagement',
        name: '소셜 미디어 참여',
        activityType: 'social_engagement',
        baseScore: 2,
        maxOccurrences: 15,
      },
    ];

    defaultRules.forEach(rule => this.scoringRules.set(rule.id, rule));
    console.log(`[LeadScoring] Initialized ${defaultRules.length} scoring rules`);
  }

  /**
   * 기본 세그먼트 정의 초기화
   */
  private initializeDefaultSegments(): void {
    this.segmentDefinitions = [
      {
        id: 'high_value',
        name: 'High-Value Leads',
        segment: 'high-value',
        criteria: {
          scoreMin: 70,
          conversionProbabilityMin: 60,
          activityCountMin: 15,
        },
      },
      {
        id: 'medium_value',
        name: 'Medium-Value Leads',
        segment: 'medium-value',
        criteria: {
          scoreMin: 40,
          scoreMax: 69,
          conversionProbabilityMin: 30,
          activityCountMin: 8,
        },
      },
      {
        id: 'low_value',
        name: 'Low-Value Leads',
        segment: 'low-value',
        criteria: {
          scoreMax: 39,
        },
      },
      {
        id: 'enterprise',
        name: 'Enterprise Segment',
        segment: 'enterprise',
        criteria: {
          scoreMin: 50,
          demographics: {
            companySize: ['1000+', '500-1000'],
          },
        },
      },
      {
        id: 'mid_market',
        name: 'Mid-Market Segment',
        segment: 'mid-market',
        criteria: {
          scoreMin: 30,
          demographics: {
            companySize: ['100-500', '50-100'],
          },
        },
      },
    ];

    console.log(`[LeadScoring] Initialized ${this.segmentDefinitions.length} segment definitions`);
  }

  /**
   * 리드 생성 또는 업데이트
   */
  createOrUpdateLead(params: {
    email: string;
    name?: string;
    company?: string;
    position?: string;
    phone?: string;
    demographics?: Lead['demographics'];
  }): Lead {
    let lead = this.findLeadByEmail(params.email);

    if (lead) {
      // 기존 리드 업데이트
      lead.name = params.name || lead.name;
      lead.company = params.company || lead.company;
      lead.position = params.position || lead.position;
      lead.phone = params.phone || lead.phone;
      lead.demographics = { ...lead.demographics, ...params.demographics };

      this.leads.set(lead.id, lead);
      console.log(`[LeadScoring] Updated lead: ${lead.email}`);
    } else {
      // 새 리드 생성
      lead = {
        id: this.generateLeadId(),
        email: params.email,
        name: params.name,
        company: params.company,
        position: params.position,
        phone: params.phone,
        score: 0,
        maxScore: this.maxScore,
        scoreHistory: [],
        bmadStage: 'behavioral',
        bmadStageConfidence: 0,
        status: 'new',
        segment: 'low-value',
        activities: [],
        firstSeenAt: new Date(),
        lastActivityAt: new Date(),
        totalActivities: 0,
        interests: [],
        intentSignals: [],
        engagementLevel: 'low',
        demographics: params.demographics,
        conversionProbability: 0,
        estimatedValue: 0,
      };

      this.leads.set(lead.id, lead);
      console.log(`[LeadScoring] Created new lead: ${lead.email}`);
    }

    return lead;
  }

  /**
   * 활동 기록 및 점수 업데이트
   */
  recordActivity(
    leadId: string,
    activityType: ActivityType,
    details?: LeadActivity['details']
  ): Lead {
    const lead = this.leads.get(leadId);
    if (!lead) {
      throw new Error(`Lead not found: ${leadId}`);
    }

    // 활동 생성
    const activity: LeadActivity = {
      id: this.generateActivityId(),
      type: activityType,
      timestamp: new Date(),
      scoreImpact: 0,
      details,
    };

    // 점수 계산
    const scoreImpact = this.calculateScoreImpact(lead, activity);
    activity.scoreImpact = scoreImpact;

    // 활동 추가
    lead.activities.push(activity);
    lead.totalActivities += 1;
    lead.lastActivityAt = new Date();

    // 점수 업데이트
    if (scoreImpact !== 0) {
      this.updateLeadScore(lead, scoreImpact, `Activity: ${activityType}`, activity.id);
    }

    // BMAD 단계 재분류
    this.classifyBMADStage(lead);

    // 의도 신호 감지
    this.detectIntentSignals(lead, activity);

    // 세그먼트 재분류
    this.classifySegment(lead);

    // 전환 확률 재계산
    this.calculateConversionProbability(lead);

    // 상태 자동 업데이트
    this.updateLeadStatus(lead);

    this.leads.set(leadId, lead);

    console.log(
      `[LeadScoring] Recorded activity: ${activityType} for ${lead.email} (score impact: ${scoreImpact >= 0 ? '+' : ''}${scoreImpact})`
    );

    return lead;
  }

  /**
   * 점수 영향 계산
   */
  private calculateScoreImpact(lead: Lead, activity: LeadActivity): number {
    const rule = Array.from(this.scoringRules.values()).find(
      r => r.activityType === activity.type
    );

    if (!rule) {
      return 0;
    }

    let score = rule.baseScore;

    // 최대 발생 횟수 체크
    if (rule.maxOccurrences) {
      const previousOccurrences = lead.activities.filter(a => a.type === activity.type).length;
      if (previousOccurrences >= rule.maxOccurrences) {
        return 0; // 최대 횟수 초과
      }
    }

    // 시간 감쇠 적용
    if (rule.decayRate) {
      const daysSinceFirstActivity =
        (new Date().getTime() - lead.firstSeenAt.getTime()) / (1000 * 60 * 60 * 24);
      const decayFactor = Math.max(0, 1 - rule.decayRate * daysSinceFirstActivity);
      score *= decayFactor;
    }

    // 조건 체크
    if (rule.conditions) {
      if (
        rule.conditions.urlPattern &&
        activity.details?.pageUrl &&
        !rule.conditions.urlPattern.test(activity.details.pageUrl)
      ) {
        return 0;
      }

      if (
        rule.conditions.duration &&
        activity.details?.duration !== undefined &&
        (activity.details.duration < (rule.conditions.duration.min || 0) ||
          activity.details.duration > (rule.conditions.duration.max || Infinity))
      ) {
        score *= 0.5; // 조건 미충족 시 50% 감점
      }
    }

    return Math.round(score);
  }

  /**
   * 리드 점수 업데이트
   */
  private updateLeadScore(lead: Lead, change: number, reason: string, activityId?: string): void {
    const oldScore = lead.score;
    const newScore = Math.max(0, Math.min(this.maxScore, oldScore + change));

    lead.scoreHistory.push({
      timestamp: new Date(),
      oldScore,
      newScore,
      change,
      reason,
      activityId,
    });

    lead.score = newScore;
  }

  /**
   * BMAD 단계 분류
   */
  private classifyBMADStage(lead: Lead): void {
    const activities = lead.activities;

    // 활동 유형별 가중치
    const stageScores: Record<BMADStage, number> = {
      behavioral: 0,
      motivational: 0,
      aspirational: 0,
      decisional: 0,
    };

    for (const activity of activities) {
      switch (activity.type) {
        case 'page_view':
        case 'email_open':
        case 'social_engagement':
          stageScores.behavioral += 1;
          break;

        case 'download':
        case 'webinar_attendance':
        case 'case_study_view':
          stageScores.motivational += 2;
          break;

        case 'form_submission':
        case 'email_click':
        case 'return_visit':
          stageScores.aspirational += 3;
          break;

        case 'consultation_request':
        case 'demo_request':
        case 'pricing_view':
          stageScores.decisional += 4;
          break;
      }
    }

    // 가장 높은 점수의 단계 선택
    const maxStage = Object.entries(stageScores).reduce((max, [stage, score]) =>
      score > max[1] ? [stage as BMADStage, score] : max
    )[0] as BMADStage;

    const totalScore = Object.values(stageScores).reduce((sum, score) => sum + score, 0);
    const confidence = totalScore > 0 ? (stageScores[maxStage] / totalScore) * 100 : 0;

    lead.bmadStage = maxStage;
    lead.bmadStageConfidence = Math.round(confidence);

    console.log(
      `[LeadScoring] BMAD Stage: ${lead.email} → ${maxStage} (confidence: ${confidence.toFixed(1)}%)`
    );
  }

  /**
   * 의도 신호 감지
   */
  private detectIntentSignals(lead: Lead, activity: LeadActivity): void {
    const signals: IntentSignal[] = [];

    // High-Intent 신호
    if (['consultation_request', 'demo_request', 'pricing_view'].includes(activity.type)) {
      signals.push({
        signal: 'High Purchase Intent',
        strength: 'strong',
        detectedAt: new Date(),
        evidence: [`${activity.type} activity detected`],
      });
    }

    // Frequency-based 신호
    const recentActivities = lead.activities.filter(
      a => new Date().getTime() - a.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000 // 최근 7일
    );

    if (recentActivities.length >= 10) {
      signals.push({
        signal: 'High Engagement',
        strength: 'strong',
        detectedAt: new Date(),
        evidence: [`${recentActivities.length} activities in the last 7 days`],
      });
    } else if (recentActivities.length >= 5) {
      signals.push({
        signal: 'Moderate Engagement',
        strength: 'moderate',
        detectedAt: new Date(),
        evidence: [`${recentActivities.length} activities in the last 7 days`],
      });
    }

    // Return Visit 신호
    const returnVisits = lead.activities.filter(a => a.type === 'return_visit').length;
    if (returnVisits >= 3) {
      signals.push({
        signal: 'Recurring Interest',
        strength: returnVisits >= 5 ? 'strong' : 'moderate',
        detectedAt: new Date(),
        evidence: [`${returnVisits} return visits`],
      });
    }

    // 새로운 신호만 추가
    for (const signal of signals) {
      const existingSignal = lead.intentSignals.find(s => s.signal === signal.signal);
      if (!existingSignal) {
        lead.intentSignals.push(signal);
        console.log(`[LeadScoring] Intent signal detected: ${signal.signal} (${signal.strength})`);
      } else {
        // 기존 신호 업데이트
        existingSignal.strength = signal.strength;
        existingSignal.detectedAt = signal.detectedAt;
        existingSignal.evidence.push(...signal.evidence);
      }
    }
  }

  /**
   * 세그먼트 분류
   */
  private classifySegment(lead: Lead): void {
    for (const segmentDef of this.segmentDefinitions) {
      const { criteria } = segmentDef;

      // 점수 범위 체크
      if (criteria.scoreMin !== undefined && lead.score < criteria.scoreMin) continue;
      if (criteria.scoreMax !== undefined && lead.score > criteria.scoreMax) continue;

      // BMAD 단계 체크
      if (
        criteria.bmadStages &&
        criteria.bmadStages.length > 0 &&
        !criteria.bmadStages.includes(lead.bmadStage)
      )
        continue;

      // 활동 수 체크
      if (criteria.activityCountMin && lead.totalActivities < criteria.activityCountMin) continue;

      // 전환 확률 체크
      if (
        criteria.conversionProbabilityMin &&
        lead.conversionProbability < criteria.conversionProbabilityMin
      )
        continue;

      // 인구통계학적 데이터 체크
      if (criteria.demographics) {
        if (
          criteria.demographics.companySize &&
          lead.demographics?.companySize &&
          !criteria.demographics.companySize.includes(lead.demographics.companySize)
        )
          continue;

        if (
          criteria.demographics.industry &&
          lead.demographics?.industry &&
          !criteria.demographics.industry.includes(lead.demographics.industry)
        )
          continue;
      }

      // 모든 조건 통과
      if (lead.segment !== segmentDef.segment) {
        console.log(
          `[LeadScoring] Segment changed: ${lead.email} → ${segmentDef.segment} (was ${lead.segment})`
        );
        lead.segment = segmentDef.segment;
      }
      break;
    }
  }

  /**
   * 전환 확률 계산
   */
  private calculateConversionProbability(lead: Lead): void {
    // 간단한 로지스틱 회귀 모델 (실제로는 ML 모델 사용 권장)

    // 특징 점수
    let probability = 0;

    // 리드 점수 (최대 40점)
    probability += (lead.score / this.maxScore) * 40;

    // BMAD 단계 (최대 20점)
    const bmadScore = {
      behavioral: 5,
      motivational: 10,
      aspirational: 15,
      decisional: 20,
    };
    probability += bmadScore[lead.bmadStage];

    // 활동 빈도 (최대 15점)
    const activityScore = Math.min((lead.totalActivities / 20) * 15, 15);
    probability += activityScore;

    // 의도 신호 (최대 15점)
    const strongSignals = lead.intentSignals.filter(s => s.strength === 'strong').length;
    const moderateSignals = lead.intentSignals.filter(s => s.strength === 'moderate').length;
    const intentScore = Math.min(strongSignals * 5 + moderateSignals * 3, 15);
    probability += intentScore;

    // 참여 수준 (최대 10점)
    const engagementScore = {
      low: 3,
      medium: 7,
      high: 10,
    };
    probability += engagementScore[lead.engagementLevel];

    lead.conversionProbability = Math.min(Math.round(probability), 100);

    // 예상 전환 기간 (간단한 휴리스틱)
    if (lead.conversionProbability >= 70) {
      lead.daysToConversion = 7; // 1주일
    } else if (lead.conversionProbability >= 50) {
      lead.daysToConversion = 14; // 2주일
    } else if (lead.conversionProbability >= 30) {
      lead.daysToConversion = 30; // 1달
    } else {
      lead.daysToConversion = 60; // 2달
    }

    console.log(
      `[LeadScoring] Conversion probability: ${lead.email} → ${lead.conversionProbability}% (${lead.daysToConversion} days)`
    );
  }

  /**
   * 리드 상태 자동 업데이트
   */
  private updateLeadStatus(lead: Lead): void {
    const oldStatus = lead.status;

    if (lead.conversionProbability >= 70) {
      lead.status = 'hot';
    } else if (lead.conversionProbability >= 50) {
      lead.status = 'qualified';
    } else if (lead.conversionProbability >= 30) {
      lead.status = 'nurturing';
    } else if (lead.score < 10 && lead.totalActivities < 3) {
      lead.status = 'cold';
    } else {
      lead.status = 'new';
    }

    if (oldStatus !== lead.status) {
      console.log(`[LeadScoring] Status changed: ${lead.email} → ${lead.status} (was ${oldStatus})`);
    }
  }

  /**
   * 참여 수준 업데이트
   */
  updateEngagementLevel(lead: Lead): void {
    const recentActivities = lead.activities.filter(
      a => new Date().getTime() - a.timestamp.getTime() < 30 * 24 * 60 * 60 * 1000 // 최근 30일
    );

    if (recentActivities.length >= 15) {
      lead.engagementLevel = 'high';
    } else if (recentActivities.length >= 7) {
      lead.engagementLevel = 'medium';
    } else {
      lead.engagementLevel = 'low';
    }
  }

  /**
   * 리드 조회
   */
  getLead(leadId: string): Lead | undefined {
    return this.leads.get(leadId);
  }

  /**
   * 이메일로 리드 찾기
   */
  findLeadByEmail(email: string): Lead | undefined {
    return Array.from(this.leads.values()).find(l => l.email === email);
  }

  /**
   * 상태별 리드 조회
   */
  getLeadsByStatus(status: LeadStatus): Lead[] {
    return Array.from(this.leads.values()).filter(l => l.status === status);
  }

  /**
   * 세그먼트별 리드 조회
   */
  getLeadsBySegment(segment: LeadSegment): Lead[] {
    return Array.from(this.leads.values()).filter(l => l.segment === segment);
  }

  /**
   * BMAD 단계별 리드 조회
   */
  getLeadsByBMADStage(stage: BMADStage): Lead[] {
    return Array.from(this.leads.values()).filter(l => l.bmadStage === stage);
  }

  /**
   * 점수 범위별 리드 조회
   */
  getLeadsByScoreRange(minScore: number, maxScore: number): Lead[] {
    return Array.from(this.leads.values()).filter(
      l => l.score >= minScore && l.score <= maxScore
    );
  }

  /**
   * Hot Leads (높은 전환 확률)
   */
  getHotLeads(minProbability: number = 70): Lead[] {
    return Array.from(this.leads.values())
      .filter(l => l.conversionProbability >= minProbability)
      .sort((a, b) => b.conversionProbability - a.conversionProbability);
  }

  /**
   * 통계 조회
   */
  getStats(): ScoringStats {
    const leads = Array.from(this.leads.values());

    const byStatus = leads.reduce(
      (acc, l) => {
        acc[l.status] = (acc[l.status] || 0) + 1;
        return acc;
      },
      {} as Record<LeadStatus, number>
    );

    const bySegment = leads.reduce(
      (acc, l) => {
        acc[l.segment] = (acc[l.segment] || 0) + 1;
        return acc;
      },
      {} as Record<LeadSegment, number>
    );

    const byBMADStage = leads.reduce(
      (acc, l) => {
        acc[l.bmadStage] = (acc[l.bmadStage] || 0) + 1;
        return acc;
      },
      {} as Record<BMADStage, number>
    );

    const totalScore = leads.reduce((sum, l) => sum + l.score, 0);
    const averageScore = leads.length > 0 ? totalScore / leads.length : 0;

    const totalConversionProbability = leads.reduce((sum, l) => sum + l.conversionProbability, 0);
    const averageConversionProbability =
      leads.length > 0 ? totalConversionProbability / leads.length : 0;

    const convertedLeads = leads.filter(l => l.status === 'converted').length;
    const conversionRate = leads.length > 0 ? (convertedLeads / leads.length) * 100 : 0;

    return {
      totalLeads: leads.length,
      averageScore: Math.round(averageScore),
      byStatus,
      bySegment,
      byBMADStage,
      conversionRate: Math.round(conversionRate * 10) / 10,
      averageConversionProbability: Math.round(averageConversionProbability),
    };
  }

  /**
   * 대시보드 데이터
   */
  getDashboardData(): {
    stats: ScoringStats;
    hotLeads: Lead[];
    recentActivities: LeadActivity[];
    topIntentSignals: { signal: string; count: number }[];
  } {
    const stats = this.getStats();
    const hotLeads = this.getHotLeads(70).slice(0, 10);

    // 최근 활동 (최근 24시간)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentActivities: LeadActivity[] = [];
    for (const lead of this.leads.values()) {
      recentActivities.push(...lead.activities.filter(a => a.timestamp >= oneDayAgo));
    }
    recentActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // 의도 신호 집계
    const intentSignalCounts = new Map<string, number>();
    for (const lead of this.leads.values()) {
      for (const signal of lead.intentSignals) {
        intentSignalCounts.set(signal.signal, (intentSignalCounts.get(signal.signal) || 0) + 1);
      }
    }

    const topIntentSignals = Array.from(intentSignalCounts.entries())
      .map(([signal, count]) => ({ signal, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      stats,
      hotLeads,
      recentActivities: recentActivities.slice(0, 20),
      topIntentSignals,
    };
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  private generateLeadId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private generateActivityId(): string {
    return `activity_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  /**
   * CRM 동기화 준비 (Supabase 저장 + 외부 CRM API 연동)
   */
  async syncToCRM(leadId: string): Promise<void> {
    const lead = this.leads.get(leadId);
    if (!lead) {
      throw new Error(`Lead not found: ${leadId}`);
    }

    console.log(`[LeadScoring] Syncing lead to CRM: ${lead.email}`);

    // TODO: Supabase에 저장
    // await supabase.from('leads').upsert({
    //   id: lead.id,
    //   email: lead.email,
    //   score: lead.score,
    //   ...
    // });

    // TODO: 외부 CRM API 연동 (HubSpot, Salesforce 등)
    // await crmClient.createOrUpdateContact({
    //   email: lead.email,
    //   ...
    // });

    lead.crmLastSyncedAt = new Date();
    this.leads.set(leadId, lead);
  }
}

/**
 * 싱글톤 인스턴스
 */
export const leadScoringSystem = new LeadScoringSystem();

// 개발 환경에서 테스트 데이터 생성
if (process.env.NODE_ENV === 'development') {
  console.log('[LeadScoring] Development mode: Ready to score leads');
}
