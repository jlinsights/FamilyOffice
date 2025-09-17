/**
 * 마케팅 워크플로우 자동화 엔진
 * 트리거 기반 마케팅 액션 실행 및 관리
 */

import { createClient } from '@/lib/supabase/server';
import { getHubSpotClient } from '@/lib/hubspot/api-client';
import { getLeadScoringEngine } from './lead-scoring-engine';
import { getAIContentEngine } from './ai-content-engine';

export interface WorkflowStep {
  step: number;
  type: 'email' | 'content_recommendation' | 'sales_notification' | 'wait' | 'condition' | 'hubspot_action';
  template?: string;
  content_type?: string;
  content_id?: string;
  delay_hours: number;
  condition?: WorkflowCondition;
  action_data?: Record<string, any>;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface WorkflowCondition {
  property: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'not_contains';
  value: any;
  logical_operator?: 'and' | 'or';
}

export interface WorkflowTrigger {
  trigger_type: 'contact_created' | 'score_change' | 'property_change' | 'form_submit' | 'page_visit' | 'manual';
  conditions: WorkflowCondition[];
  trigger_data?: Record<string, any>;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  hubspot_contact_id: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  current_step: number;
  total_steps: number;
  execution_data: Record<string, any>;
  error_message?: string;
  started_at: string;
  completed_at?: string;
  next_action_at?: string;
}

export interface MarketingWorkflow {
  id: string;
  name: string;
  description?: string;
  workflow_type: 'nurture' | 'onboarding' | 'reengagement' | 'lead_qualification' | 'upsell';
  trigger_conditions: WorkflowTrigger;
  workflow_steps: WorkflowStep[];
  status: 'draft' | 'active' | 'paused';
  is_active: boolean;
  enrolled_count: number;
  completed_count: number;
  created_at: string;
  updated_at: string;
}

export class WorkflowEngine {
  private supabase;
  private hubspotClient;
  private leadScoringEngine;
  private aiContentEngine;

  constructor() {
    this.supabase = createClient();
    this.hubspotClient = getHubSpotClient();
    this.leadScoringEngine = getLeadScoringEngine();
    this.aiContentEngine = getAIContentEngine();
  }

  /**
   * 워크플로우 트리거 체크 및 실행
   */
  async checkAndExecuteWorkflows(
    triggerType: string,
    contactId: string,
    triggerData: Record<string, any> = {}
  ): Promise<void> {
    try {
      const supabase = await this.supabase;
      console.log(`🔄 워크플로우 트리거 체크: ${triggerType} for ${contactId}`);

      // 1. 활성 워크플로우 조회
      const { data: workflows, error } = await supabase
        .from('marketing_workflows')
        .select('*')
        .eq('is_active', true)
        .eq('status', 'active');

      if (error) {
        throw error;
      }

      if (!workflows || workflows.length === 0) {
        console.log('활성 워크플로우 없음');
        return;
      }

      // 2. 트리거 조건 매칭 및 실행
      for (const workflow of workflows) {
        const shouldExecute = await this.evaluateTriggerConditions(
          workflow,
          triggerType,
          contactId,
          triggerData
        );

        if (shouldExecute) {
          await this.startWorkflowExecution(workflow, contactId, triggerData);
        }
      }

    } catch (error) {
      console.error('워크플로우 트리거 처리 실패:', error);
    }
  }

  /**
   * 트리거 조건 평가
   */
  private async evaluateTriggerConditions(
    workflow: MarketingWorkflow,
    triggerType: string,
    contactId: string,
    triggerData: Record<string, any>
  ): Promise<boolean> {
    try {
      const supabase = await this.supabase;
      const trigger = workflow.trigger_conditions;

      // 1. 기본 트리거 타입 매칭
      if (trigger.trigger_type !== triggerType && trigger.trigger_type !== 'manual') {
        return false;
      }

      // 2. 이미 실행 중인 워크플로우 체크
      const { data: existingExecution } = await supabase
        .from('workflow_executions')
        .select('id')
        .eq('workflow_id', workflow.id)
        .eq('hubspot_contact_id', contactId)
        .eq('status', 'running')
        .single();

      if (existingExecution) {
        console.log(`이미 실행 중인 워크플로우: ${workflow.name}`);
        return false;
      }

      // 3. 조건 평가
      if (!trigger.conditions || trigger.conditions.length === 0) {
        return true; // 조건이 없으면 실행
      }

      // 콘택트 정보 및 리드 스코어 조회
      const contact = await this.hubspotClient.getContactByEmail(contactId);
      const leadScore = await this.leadScoringEngine.getLeadScore(contactId);

      if (!contact) {
        return false;
      }

      // 각 조건 평가
      for (const condition of trigger.conditions) {
        const conditionMet = this.evaluateCondition(condition, {
          contact: contact.properties,
          leadScore: leadScore?.total_score || 0,
          triggerData,
        });

        if (!conditionMet) {
          return false; // AND 로직: 하나라도 실패하면 false
        }
      }

      return true;

    } catch (error) {
      console.error('트리거 조건 평가 실패:', error);
      return false;
    }
  }

  /**
   * 개별 조건 평가
   */
  private evaluateCondition(
    condition: WorkflowCondition,
    context: Record<string, any>
  ): boolean {
    try {
      let actualValue: any;

      // 속성 값 추출
      if (condition.property.startsWith('contact.')) {
        const prop = condition.property.replace('contact.', '');
        actualValue = context.contact[prop];
      } else if (condition.property === 'lead_score') {
        actualValue = context.leadScore;
      } else if (condition.property.startsWith('trigger.')) {
        const prop = condition.property.replace('trigger.', '');
        actualValue = context.triggerData[prop];
      } else {
        actualValue = context[condition.property];
      }

      // 조건 평가
      switch (condition.operator) {
        case 'eq':
          return actualValue === condition.value;
        case 'neq':
          return actualValue !== condition.value;
        case 'gt':
          return Number(actualValue) > Number(condition.value);
        case 'gte':
          return Number(actualValue) >= Number(condition.value);
        case 'lt':
          return Number(actualValue) < Number(condition.value);
        case 'lte':
          return Number(actualValue) <= Number(condition.value);
        case 'contains':
          return String(actualValue).toLowerCase().includes(String(condition.value).toLowerCase());
        case 'not_contains':
          return !String(actualValue).toLowerCase().includes(String(condition.value).toLowerCase());
        default:
          return false;
      }

    } catch (error) {
      console.error('조건 평가 실패:', error);
      return false;
    }
  }

  /**
   * 워크플로우 실행 시작
   */
  private async startWorkflowExecution(
    workflow: MarketingWorkflow,
    contactId: string,
    triggerData: Record<string, any>
  ): Promise<void> {
    try {
      const supabase = await this.supabase;
      console.log(`🚀 워크플로우 시작: ${workflow.name} for ${contactId}`);

      // 1. 실행 로그 생성
      const { data: execution, error: executionError } = await supabase
        .from('workflow_executions')
        .insert({
          workflow_id: workflow.id,
          hubspot_contact_id: contactId,
          status: 'running',
          current_step: 0,
          total_steps: workflow.workflow_steps.length,
          execution_data: {
            trigger_data: triggerData,
            workflow_name: workflow.name,
            started_by: 'automated_trigger',
          },
          started_at: new Date().toISOString(),
          next_action_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (executionError || !execution) {
        throw executionError || new Error('워크플로우 실행 생성 실패');
      }

      // 2. 워크플로우 등록 수 증가
      await supabase
        .from('marketing_workflows')
        .update({ 
          enrolled_count: workflow.enrolled_count + 1 
        })
        .eq('id', workflow.id);

      // 3. 첫 번째 단계 실행 스케줄링
      const firstStep = workflow.workflow_steps[0];
      if (firstStep) {
        await this.scheduleNextStep(execution.id, firstStep);
      }

    } catch (error) {
      console.error('워크플로우 실행 시작 실패:', error);
    }
  }

  /**
   * 다음 단계 스케줄링
   */
  private async scheduleNextStep(
    executionId: string,
    step: WorkflowStep
  ): Promise<void> {
    try {
      const supabase = await this.supabase;
      const nextActionTime = new Date(Date.now() + step.delay_hours * 60 * 60 * 1000);

      await supabase
        .from('workflow_executions')
        .update({
          next_action_at: nextActionTime.toISOString(),
        })
        .eq('id', executionId);

      console.log(`⏰ 다음 단계 스케줄: ${step.type} in ${step.delay_hours}시간`);

      // 즉시 실행 (delay_hours가 0인 경우)
      if (step.delay_hours === 0) {
        await this.executeWorkflowStep(executionId);
      }

    } catch (error) {
      console.error('단계 스케줄링 실패:', error);
    }
  }

  /**
   * 워크플로우 단계 실행 (cron job에서 호출)
   */
  async executeScheduledWorkflows(): Promise<void> {
    try {
      const supabase = await this.supabase;
      console.log('🔄 예정된 워크플로우 단계 실행 시작');

      // 실행 예정 워크플로우 조회
      const { data: executions, error } = await supabase
        .from('workflow_executions')
        .select(`
          *,
          workflow:marketing_workflows(*)
        `)
        .eq('status', 'running')
        .lte('next_action_at', new Date().toISOString())
        .limit(50); // 한 번에 최대 50개 처리

      if (error) {
        throw error;
      }

      if (!executions || executions.length === 0) {
        console.log('실행할 워크플로우 단계 없음');
        return;
      }

      // 각 실행 처리
      for (const execution of executions) {
        await this.executeWorkflowStep(execution.id);
      }

      console.log(`✅ ${executions.length}개 워크플로우 단계 실행 완료`);

    } catch (error) {
      console.error('예정된 워크플로우 실행 실패:', error);
    }
  }

  /**
   * 개별 워크플로우 단계 실행
   */
  async executeWorkflowStep(executionId: string): Promise<void> {
    try {
      const supabase = await this.supabase;
      // 1. 실행 정보 조회
      const { data: execution, error: executionError } = await supabase
        .from('workflow_executions')
        .select(`
          *,
          workflow:marketing_workflows(*)
        `)
        .eq('id', executionId)
        .single();

      if (executionError || !execution || !execution.workflow) {
        throw executionError || new Error('워크플로우 실행 정보 없음');
      }

      const workflow = execution.workflow as MarketingWorkflow;
      const currentStepIndex = execution.current_step;

      if (currentStepIndex >= workflow.workflow_steps.length) {
        await this.completeWorkflow(execution);
        return;
      }

      const step = workflow.workflow_steps[currentStepIndex];
      
      if (!step) {
        console.error('워크플로우 단계를 찾을 수 없음:', currentStepIndex);
        await this.completeWorkflow(execution);
        return;
      }

      console.log(`▶️ 워크플로우 단계 실행: ${workflow.name} - Step ${step.step} (${step.type})`);

      // 2. 단계별 액션 실행
      const stepResult = await this.executeStepAction(step, execution);

      // 3. 실행 결과에 따른 처리
      if (stepResult.success) {
        // 다음 단계로 진행
        const nextStepIndex = currentStepIndex + 1;

        if (nextStepIndex >= workflow.workflow_steps.length) {
          // 워크플로우 완료
          await this.completeWorkflow(execution);
        } else {
          // 다음 단계 준비
          const nextStep = workflow.workflow_steps[nextStepIndex];
          
          if (!nextStep) {
            console.error('다음 워크플로우 단계를 찾을 수 없음:', nextStepIndex);
            await this.completeWorkflow(execution);
            return;
          }

          await supabase
            .from('workflow_executions')
            .update({
              current_step: nextStepIndex,
              execution_data: {
                ...execution.execution_data,
                step_results: [
                  ...(execution.execution_data.step_results || []),
                  {
                    step: step.step,
                    type: step.type,
                    result: stepResult,
                    executed_at: new Date().toISOString(),
                  }
                ]
              },
            })
            .eq('id', executionId);

          // 다음 단계 스케줄링
          await this.scheduleNextStep(executionId, nextStep);
        }
      } else {
        // 실행 실패 처리
        await supabase
          .from('workflow_executions')
          .update({
            status: 'failed',
            error_message: stepResult.error || '단계 실행 실패',
          })
          .eq('id', executionId);

        console.error(`❌ 워크플로우 단계 실패: ${workflow.name} - ${stepResult.error}`);
      }

    } catch (error) {
      console.error('워크플로우 단계 실행 실패:', error);
      
      try {
        const supabase = await this.supabase;
        // 실행 상태를 실패로 업데이트
        await supabase
        .from('workflow_executions')
        .update({
          status: 'failed',
          error_message: error instanceof Error ? error.message : '알 수 없는 오류',
        })
        .eq('id', executionId);
      } catch (updateError) {
        console.error('실행 상태 업데이트 실패:', updateError);
      }
    }
  }

  /**
   * 단계별 액션 실행
   */
  private async executeStepAction(
    step: WorkflowStep,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      switch (step.type) {
        case 'email':
          return await this.executeEmailAction(step, execution);
        
        case 'content_recommendation':
          return await this.executeContentRecommendationAction(step, execution);
        
        case 'sales_notification':
          return await this.executeSalesNotificationAction(step, execution);
        
        case 'hubspot_action':
          return await this.executeHubSpotAction(step, execution);
        
        case 'wait':
          return { success: true, data: { message: 'Wait step completed' } };
        
        case 'condition':
          return await this.executeConditionAction(step, execution);
        
        default:
          return { success: false, error: `Unknown step type: ${step.type}` };
      }

    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '알 수 없는 오류' 
      };
    }
  }

  /**
   * 이메일 액션 실행
   */
  private async executeEmailAction(
    step: WorkflowStep,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      // 이메일 템플릿에 따른 처리
      const emailData = {
        contact_id: execution.hubspot_contact_id,
        template: step.template || 'default',
        workflow_name: execution.execution_data.workflow_name,
        step_data: step.action_data || {},
      };

      // 실제 이메일 발송 로직 (HubSpot 이메일 API 또는 다른 서비스)
      console.log(`📧 이메일 발송: ${step.template} to ${execution.hubspot_contact_id}`);
      
      // HubSpot 이메일 활동 기록
      await this.hubspotClient.trackEmailActivity(
        execution.hubspot_contact_id,
        `워크플로우 이메일: ${step.template}`,
        `자동화된 마케팅 이메일 (워크플로우: ${execution.execution_data.workflow_name})`
      );

      return { 
        success: true, 
        data: { 
          email_sent: true, 
          template: step.template,
          timestamp: new Date().toISOString() 
        } 
      };

    } catch (error) {
      return { 
        success: false, 
        error: `이메일 발송 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}` 
      };
    }
  }

  /**
   * 콘텐츠 추천 액션 실행
   */
  private async executeContentRecommendationAction(
    step: WorkflowStep,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      // AI 콘텐츠 엔진으로 추천 생성
      const recommendations = await this.aiContentEngine.generateRecommendations(
        execution.hubspot_contact_id,
        3 // 최대 3개 추천
      );

      // 특정 콘텐츠 타입 필터링
      let filteredRecommendations = recommendations;
      if (step.content_type) {
        filteredRecommendations = recommendations.filter(
          rec => rec.content.type === step.content_type
        );
      }

      console.log(`📖 콘텐츠 추천 생성: ${filteredRecommendations.length}개`);

      return { 
        success: true, 
        data: { 
          recommendations_generated: filteredRecommendations.length,
          content_type: step.content_type,
          timestamp: new Date().toISOString() 
        } 
      };

    } catch (error) {
      return { 
        success: false, 
        error: `콘텐츠 추천 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}` 
      };
    }
  }

  /**
   * 영업팀 알림 액션 실행
   */
  private async executeSalesNotificationAction(
    step: WorkflowStep,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      // 영업팀 알림 데이터 생성
      const notificationData = {
        contact_id: execution.hubspot_contact_id,
        priority: step.priority || 'medium',
        message: `워크플로우 알림: ${execution.execution_data.workflow_name}`,
        workflow_data: step.action_data || {},
        created_at: new Date().toISOString(),
      };

      // HubSpot 노트로 알림 기록
      await this.hubspotClient.trackWebActivity(
        execution.hubspot_contact_id,
        `/workflow/${execution.workflow_id}`,
        `영업팀 알림 - ${execution.execution_data.workflow_name}`
      );

      console.log(`🔔 영업팀 알림: ${step.priority} priority for ${execution.hubspot_contact_id}`);

      return { 
        success: true, 
        data: { 
          notification_sent: true, 
          priority: step.priority,
          timestamp: new Date().toISOString() 
        } 
      };

    } catch (error) {
      return { 
        success: false, 
        error: `영업팀 알림 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}` 
      };
    }
  }

  /**
   * HubSpot 액션 실행
   */
  private async executeHubSpotAction(
    step: WorkflowStep,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      const actionData = step.action_data || {};
      
      // 액션 타입에 따른 처리
      switch (actionData.action_type) {
        case 'update_property':
          await this.hubspotClient.updateContact(
            execution.hubspot_contact_id,
            { [actionData.property]: actionData.value }
          );
          break;
        
        case 'add_to_list':
          // HubSpot 리스트 추가 API 호출
          console.log(`📝 HubSpot 리스트 추가: ${actionData.list_id}`);
          break;
        
        case 'create_task':
          // HubSpot 작업 생성 API 호출
          console.log(`✅ HubSpot 작업 생성: ${actionData.task_title}`);
          break;
        
        default:
          throw new Error(`Unknown HubSpot action: ${actionData.action_type}`);
      }

      return { 
        success: true, 
        data: { 
          hubspot_action: actionData.action_type,
          timestamp: new Date().toISOString() 
        } 
      };

    } catch (error) {
      return { 
        success: false, 
        error: `HubSpot 액션 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}` 
      };
    }
  }

  /**
   * 조건 액션 실행
   */
  private async executeConditionAction(
    step: WorkflowStep,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      if (!step.condition) {
        throw new Error('조건이 정의되지 않음');
      }

      // 조건 평가를 위한 컨텍스트 수집
      const contact = await this.hubspotClient.getContactByEmail(execution.hubspot_contact_id);
      const leadScore = await this.leadScoringEngine.getLeadScore(execution.hubspot_contact_id);

      const conditionMet = this.evaluateCondition(step.condition, {
        contact: contact?.properties || {},
        leadScore: leadScore?.total_score || 0,
        executionData: execution.execution_data,
      });

      return { 
        success: true, 
        data: { 
          condition_met: conditionMet,
          condition: step.condition,
          timestamp: new Date().toISOString() 
        } 
      };

    } catch (error) {
      return { 
        success: false, 
        error: `조건 평가 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}` 
      };
    }
  }

  /**
   * 워크플로우 완료 처리
   */
  private async completeWorkflow(execution: WorkflowExecution): Promise<void> {
    try {
      const supabase = await this.supabase;
      // 1. 실행 상태 완료로 업데이트
      await supabase
        .from('workflow_executions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', execution.id);

      // 2. 워크플로우 완료 수 증가
      await supabase
        .rpc('increment_workflow_completed_count', { 
          workflow_id: execution.workflow_id 
        });

      console.log(`🎉 워크플로우 완료: ${execution.execution_data.workflow_name} for ${execution.hubspot_contact_id}`);

    } catch (error) {
      console.error('워크플로우 완료 처리 실패:', error);
    }
  }

  /**
   * 워크플로우 성과 분석
   */
  async getWorkflowAnalytics(workflowId?: string, daysBack: number = 30) {
    try {
      const supabase = await this.supabase;
      let query = supabase
        .from('workflow_executions')
        .select('*')
        .gte('started_at', new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString());

      if (workflowId) {
        query = query.eq('workflow_id', workflowId);
      }

      const { data: executions, error } = await query;

      if (error) {
        throw error;
      }

      const total = executions.length;
      const completed = executions.filter(ex => ex.status === 'completed').length;
      const failed = executions.filter(ex => ex.status === 'failed').length;
      const running = executions.filter(ex => ex.status === 'running').length;

      return {
        total_executions: total,
        completed_executions: completed,
        failed_executions: failed,
        running_executions: running,
        completion_rate: total > 0 ? ((completed / total) * 100).toFixed(1) : '0',
        failure_rate: total > 0 ? ((failed / total) * 100).toFixed(1) : '0',
        avg_completion_time: this.calculateAverageCompletionTime(executions.filter(ex => ex.completed_at)),
      };

    } catch (error) {
      console.error('워크플로우 성과 분석 실패:', error);
      throw error;
    }
  }

  /**
   * 평균 완료 시간 계산
   */
  private calculateAverageCompletionTime(completedExecutions: any[]): string {
    if (completedExecutions.length === 0) {
      return '0분';
    }

    const totalMinutes = completedExecutions.reduce((sum, execution) => {
      const startTime = new Date(execution.started_at).getTime();
      const endTime = new Date(execution.completed_at).getTime();
      return sum + (endTime - startTime) / (1000 * 60); // 분으로 변환
    }, 0);

    const avgMinutes = Math.round(totalMinutes / completedExecutions.length);
    
    if (avgMinutes < 60) {
      return `${avgMinutes}분`;
    } else if (avgMinutes < 1440) {
      return `${Math.round(avgMinutes / 60)}시간`;
    } else {
      return `${Math.round(avgMinutes / 1440)}일`;
    }
  }
}

// 싱글톤 인스턴스
let workflowEngine: WorkflowEngine | null = null;

export function getWorkflowEngine(): WorkflowEngine {
  if (!workflowEngine) {
    workflowEngine = new WorkflowEngine();
  }
  return workflowEngine;
}