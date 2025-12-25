/**
 * 리드 스코어링 엔진
 * 행동 추적, 스코어 계산, 자동화 트리거를 처리하는 핵심 엔진
 *
 * NOTE: Experimental feature with TypeScript type inference limitations.
 * See workflow-engine.ts for detailed explanation.
 */
import { getHubSpotClient } from '@/lib/hubspot/api-client';
import { safeFrom, safeInsert, safeUpdate } from '@/lib/supabase/helpers';
import { createClient } from '@/lib/supabase/server';

export interface LeadActivity {
  hubspot_contact_id: string;
  user_id?: string;
  activity_type: string;
  activity_data: Record<string, any>;
  score_impact: number;
}

export interface LeadScore {
  hubspot_contact_id: string;
  demographic_score: number;
  behavioral_score: number;
  engagement_score: number;
  total_score: number;
  score_grade: 'A' | 'B' | 'C' | 'D';
  last_calculated_at: string;
}

export interface ScoringRules {
  page_view: number;
  form_submit: number;
  consultation_request: number;
  email_open: number;
  email_click: number;
  document_download: number;
  service_inquiry: number;
  webinar_attendance: number;
  repeat_visit: number;
  high_value_page: number;
}

// 기본 스코어링 규칙
const DEFAULT_SCORING_RULES: ScoringRules = {
  page_view: 2,
  form_submit: 15,
  consultation_request: 25,
  email_open: 3,
  email_click: 8,
  document_download: 10,
  service_inquiry: 20,
  webinar_attendance: 15,
  repeat_visit: 5,
  high_value_page: 8,
};

// 높은 가치의 페이지들
const HIGH_VALUE_PAGES = [
  '/services',
  '/program',
  '/seminar',
  '/contact',
  '/about',
];

export class LeadScoringEngine {
  private supabase;
  private hubspotClient;
  private scoringRules: ScoringRules;

  constructor(customRules?: Partial<ScoringRules>) {
    this.supabase = createClient();
    this.hubspotClient = getHubSpotClient();
    this.scoringRules = { ...DEFAULT_SCORING_RULES, ...customRules };
  }

  /**
   * 사용자 활동 추적 및 스코어 업데이트
   */
  async trackActivity(
    activity: Omit<LeadActivity, 'score_impact'>
  ): Promise<void> {
    try {
      // 1. 활동 타입별 점수 계산
      const scoreImpact = this.calculateActivityScore(
        activity.activity_type,
        activity.activity_data
      );

      // 2. 활동 데이터베이스 저장
      const supabase = await this.supabase;
      const { error: activityError } = await safeInsert(
        supabase,
        'lead_activities',
        {
          ...activity,
          score_impact: scoreImpact,
          created_at: new Date().toISOString(),
        }
      );

      if (activityError) {
        console.error('활동 저장 실패:', activityError);
        throw activityError;
      }

      // 3. 리드 스코어 재계산 및 업데이트
      await this.recalculateLeadScore(activity.hubspot_contact_id);

      // 4. 고득점 리드 자동 처리
      await this.handleHighScoreActions(activity.hubspot_contact_id);

      console.log(
        `✅ 활동 추적 완료: ${activity.activity_type} (${scoreImpact}점)`
      );
    } catch (error) {
      console.error('활동 추적 실패:', error);
      throw error;
    }
  }

  /**
   * 활동별 점수 계산
   */
  private calculateActivityScore(
    activityType: string,
    activityData: Record<string, any>
  ): number {
    let baseScore = this.scoringRules[activityType as keyof ScoringRules] || 1;

    // 특별 조건에 따른 점수 조정
    switch (activityType) {
      case 'page_view':
        // 높은 가치 페이지 방문
        if (
          activityData.page_url &&
          HIGH_VALUE_PAGES.some(page => activityData.page_url.includes(page))
        ) {
          baseScore += this.scoringRules.high_value_page;
        }

        // 재방문 보너스
        if (activityData.is_repeat_visit) {
          baseScore += this.scoringRules.repeat_visit;
        }
        break;

      case 'form_submit':
        // 컨설팅 신청 폼은 높은 점수
        if (activityData.form_type === 'consultation') {
          baseScore = this.scoringRules.consultation_request;
        }
        break;

      case 'email_engagement':
        // 이메일 타입별 점수
        if (activityData.action === 'open') {
          baseScore = this.scoringRules.email_open;
        } else if (activityData.action === 'click') {
          baseScore = this.scoringRules.email_click;
        }
        break;

      case 'document_download':
        // 문서 타입별 점수 조정
        if (
          activityData.document_type === 'whitepaper' ||
          activityData.document_type === 'case_study'
        ) {
          baseScore += 5; // 전문 자료 다운로드는 추가 점수
        }
        break;
    }

    return baseScore;
  }

  /**
   * 리드 스코어 재계산
   */
  async recalculateLeadScore(contactId: string): Promise<LeadScore> {
    try {
      const supabase = await this.supabase;
      // 1. Supabase 함수를 사용한 스코어 계산
      const { data: scoreData, error: scoreError } = await (
        supabase as any
      ).rpc('calculate_lead_score', { contact_id: contactId });

      if (scoreError) {
        throw scoreError;
      }

      // 2. 계산된 스코어 조회
      const { data: leadScore, error: fetchError } = await safeFrom(
        supabase,
        'lead_scores' as any
      )
        .select('*')
        .eq('hubspot_contact_id', contactId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // 3. HubSpot에도 스코어 동기화
      await this.syncScoreToHubSpot(contactId, leadScore.total_score);

      console.log(
        `📊 리드 스코어 업데이트: ${contactId} → ${leadScore.total_score}점 (${leadScore.score_grade})`
      );

      return leadScore as LeadScore;
    } catch (error) {
      console.error('리드 스코어 계산 실패:', error);
      throw error;
    }
  }

  /**
   * HubSpot에 스코어 동기화
   */
  private async syncScoreToHubSpot(
    contactId: string,
    score: number
  ): Promise<void> {
    try {
      await this.hubspotClient.updateLeadScore(contactId, score);
    } catch (error) {
      console.error('HubSpot 스코어 동기화 실패:', error);
      // HubSpot 동기화 실패는 전체 프로세스를 중단시키지 않음
    }
  }

  /**
   * 고득점 리드 자동 처리
   */
  private async handleHighScoreActions(contactId: string): Promise<void> {
    try {
      const supabase = await this.supabase;
      // 1. 현재 스코어 조회
      const { data: leadScore } = await safeFrom(supabase, 'lead_scores' as any)
        .select('total_score, score_grade')
        .eq('hubspot_contact_id', contactId)
        .single();

      if (!leadScore) return;

      // 2. 고득점 리드 처리 (80점 이상)
      if (leadScore.total_score >= 80) {
        await this.triggerHighScoreWorkflow(contactId, leadScore.total_score);
      }

      // 3. 자격 있는 리드 처리 (60점 이상)
      else if (leadScore.total_score >= 60) {
        await this.triggerNurtureWorkflow(contactId, leadScore.total_score);
      }
    } catch (error) {
      console.error('고득점 리드 처리 실패:', error);
    }
  }

  /**
   * 고득점 리드 워크플로우 트리거
   */
  private async triggerHighScoreWorkflow(
    contactId: string,
    score: number
  ): Promise<void> {
    try {
      const supabase = await this.supabase;
      // 1. 영업팀 알림 로그
      await safeInsert(supabase, 'lead_activities', {
        hubspot_contact_id: contactId,
        activity_type: 'high_score_alert',
        activity_data: {
          score,
          priority: 'urgent',
          action_required: true,
          alert_type: 'sales_notification',
          timestamp: new Date().toISOString(),
        },
        score_impact: 0,
      });

      // 2. 마케팅 워크플로우 실행 로그
      await this.executeWorkflow(contactId, '고득점 리드 육성', {
        score,
        trigger_reason: 'high_score_achievement',
      });

      console.log(`🔥 고득점 리드 알림: ${contactId} (${score}점)`);
    } catch (error) {
      console.error('고득점 워크플로우 실행 실패:', error);
    }
  }

  /**
   * 육성 워크플로우 트리거
   */
  private async triggerNurtureWorkflow(
    contactId: string,
    score: number
  ): Promise<void> {
    try {
      await this.executeWorkflow(contactId, '신규 리드 환영 시퀀스', {
        score,
        trigger_reason: 'qualified_lead',
      });

      console.log(`📈 육성 워크플로우 시작: ${contactId} (${score}점)`);
    } catch (error) {
      console.error('육성 워크플로우 실행 실패:', error);
    }
  }

  /**
   * 워크플로우 실행
   */
  private async executeWorkflow(
    contactId: string,
    workflowName: string,
    context: Record<string, any>
  ): Promise<void> {
    try {
      const supabase = await this.supabase;
      // 1. 워크플로우 조회
      const { data: workflow } = await safeFrom(
        supabase,
        'marketing_workflows' as any
      )
        .select('*')
        .eq('name', workflowName)
        .eq('is_active', true)
        .single();

      if (!workflow) {
        console.warn(`활성 워크플로우를 찾을 수 없음: ${workflowName}`);
        return;
      }

      // 2. 워크플로우 실행 로그 생성
      const { error: executionError } = await safeInsert(
        supabase,
        'workflow_executions',
        {
          workflow_id: workflow.id,
          hubspot_contact_id: contactId,
          status: 'running',
          current_step: 0,
          total_steps: workflow.workflow_steps.length,
          execution_data: context,
          started_at: new Date().toISOString(),
          next_action_at: new Date().toISOString(),
        } as any
      );

      if (executionError) {
        throw executionError;
      }

      // 워크플로우 카운터 증가
      await safeUpdate(
        supabase,
        'marketing_workflows' as any,
        {
          enrolled_count: workflow.enrolled_count + 1,
        } as any
      ).eq('id', workflow.id);
    } catch (error) {
      console.error('워크플로우 실행 실패:', error);
      throw error;
    }
  }

  /**
   * 웹사이트 활동 추적 헬퍼
   */
  async trackWebActivity(params: {
    contactId: string;
    userId?: string;
    pageUrl: string;
    pageTitle?: string;
    sessionId?: string;
    referrer?: string;
    timeOnPage?: number;
  }): Promise<void> {
    const isRepeatVisit = await this.checkRepeatVisit(
      params.contactId,
      params.pageUrl
    );

    await this.trackActivity({
      hubspot_contact_id: params.contactId,
      ...(params.userId && { user_id: params.userId }),
      activity_type: 'page_view',
      activity_data: {
        page_url: params.pageUrl,
        page_title: params.pageTitle,
        session_id: params.sessionId,
        referrer: params.referrer,
        time_on_page: params.timeOnPage,
        is_repeat_visit: isRepeatVisit,
        timestamp: new Date().toISOString(),
      },
    });

    // HubSpot에도 웹 활동 기록
    try {
      await this.hubspotClient.trackWebActivity(
        params.contactId,
        params.pageUrl,
        params.pageTitle
      );
    } catch (error) {
      console.error('HubSpot 웹 활동 추적 실패:', error);
    }
  }

  /**
   * 재방문 체크
   */
  private async checkRepeatVisit(
    contactId: string,
    pageUrl: string
  ): Promise<boolean> {
    const supabase = await this.supabase;
    const { data } = await safeFrom(supabase, 'lead_activities')
      .select('id')
      .eq('hubspot_contact_id', contactId)
      .eq('activity_type', 'page_view')
      .contains('activity_data', { page_url: pageUrl })
      .gte(
        'created_at',
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      ) // 24시간 내
      .limit(1);

    return (data?.length || 0) > 0;
  }

  /**
   * 폼 제출 추적
   */
  async trackFormSubmission(params: {
    contactId: string;
    userId?: string;
    formType: string;
    formData: Record<string, any>;
    pageUrl: string;
  }): Promise<void> {
    await this.trackActivity({
      hubspot_contact_id: params.contactId,
      ...(params.userId && { user_id: params.userId }),
      activity_type: 'form_submit',
      activity_data: {
        form_type: params.formType,
        form_data: params.formData,
        page_url: params.pageUrl,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * 이메일 참여 추적
   */
  async trackEmailEngagement(params: {
    contactId: string;
    action: 'open' | 'click';
    emailId: string;
    campaignId?: string;
    linkUrl?: string;
  }): Promise<void> {
    await this.trackActivity({
      hubspot_contact_id: params.contactId,
      activity_type: 'email_engagement',
      activity_data: {
        action: params.action,
        email_id: params.emailId,
        campaign_id: params.campaignId,
        link_url: params.linkUrl,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * 리드 스코어 조회
   */
  async getLeadScore(contactId: string): Promise<LeadScore | null> {
    const supabase = await this.supabase;
    const { data, error } = await safeFrom(supabase, 'lead_scores' as any)
      .select('*')
      .eq('hubspot_contact_id', contactId)
      .single();

    if (error || !data) {
      return null;
    }

    return data as LeadScore;
  }

  /**
   * 마케팅 성과 메트릭 조회
   */
  async getMarketingMetrics(daysBack = 30) {
    const supabase = await this.supabase;
    const { data, error } = await (supabase as any).rpc(
      'get_marketing_metrics',
      { days_back: daysBack }
    );

    if (error) {
      throw error;
    }

    return data[0];
  }
}

// 싱글톤 인스턴스
let leadScoringEngine: LeadScoringEngine | null = null;

export function getLeadScoringEngine(): LeadScoringEngine {
  if (!leadScoringEngine) {
    leadScoringEngine = new LeadScoringEngine();
  }
  return leadScoringEngine;
}
