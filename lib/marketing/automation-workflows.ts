/**
 * 마케팅 자동화 워크플로우 엔진
 * HubSpot 연동하여 개인화된 고객 여정 자동화
 */

export interface WorkflowStep {
  id: string;
  name: string;
  delay: number | string; // 분 단위 또는 "3 days", "1 week" 등
  condition?: WorkflowCondition;
  action: WorkflowAction;
  branches?: WorkflowBranch[];
}

export interface WorkflowCondition {
  type: 'property' | 'behavior' | 'engagement' | 'score' | 'time';
  property?: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains';
  value: any;
}

export interface WorkflowAction {
  type: 'send_email' | 'add_to_list' | 'update_property' | 'create_task' | 'send_sms' | 'webhook' | 'wait';
  template?: string;
  subject?: string;
  content?: string;
  listId?: string;
  properties?: Record<string, any>;
  assignee?: string;
  webhookUrl?: string;
  waitDuration?: number;
}

export interface WorkflowBranch {
  condition: WorkflowCondition;
  steps: WorkflowStep[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  stats?: WorkflowStats;
}

export interface WorkflowTrigger {
  type: 'form_submission' | 'page_visit' | 'email_event' | 'property_change' | 'date_based' | 'score_change';
  formId?: string;
  pageUrl?: string;
  emailEvent?: 'opened' | 'clicked' | 'unsubscribed';
  property?: string;
  scoreThreshold?: number;
  dateProperty?: string;
}

export interface WorkflowStats {
  enrolled: number;
  completed: number;
  active: number;
  conversionRate: number;
  avgCompletionTime: number;
}

export class MarketingAutomationEngine {
  private workflows: Map<string, Workflow> = new Map();
  private enrollments: Map<string, WorkflowEnrollment[]> = new Map();
  
  // 워크플로우 등록
  registerWorkflow(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
    this.enrollments.set(workflow.id, []);
  }
  
  // 사용자를 워크플로우에 등록
  async enrollContact(
    contactId: string, 
    workflowId: string, 
    triggerData?: any
  ): Promise<WorkflowEnrollment> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow || !workflow.active) {
      throw new Error(`Workflow ${workflowId} not found or inactive`);
    }
    
    const enrollment: WorkflowEnrollment = {
      id: `enrollment_${Date.now()}_${Math.random()}`,
      contactId,
      workflowId,
      currentStepIndex: 0,
      enrolledAt: new Date(),
      status: 'active',
      triggerData,
      completedSteps: [],
      properties: {}
    };
    
    const enrollments = this.enrollments.get(workflowId) || [];
    enrollments.push(enrollment);
    this.enrollments.set(workflowId, enrollments);
    
    // 첫 번째 스텝 실행 스케줄링
    this.scheduleNextStep(enrollment);
    
    return enrollment;
  }
  
  // 다음 스텝 스케줄링
  private async scheduleNextStep(enrollment: WorkflowEnrollment): Promise<void> {
    const workflow = this.workflows.get(enrollment.workflowId);
    if (!workflow) return;
    
    const currentStep = workflow.steps[enrollment.currentStepIndex];
    if (!currentStep) {
      // 워크플로우 완료
      enrollment.status = 'completed';
      enrollment.completedAt = new Date();
      return;
    }
    
    // 조건 검사
    if (currentStep.condition && !await this.evaluateCondition(enrollment.contactId, currentStep.condition)) {
      // 조건 불충족 시 분기 처리 또는 스킵
      if (currentStep.branches) {
        const matchingBranch = currentStep.branches.find(branch => 
          this.evaluateCondition(enrollment.contactId, branch.condition)
        );
        
        if (matchingBranch) {
          // 분기 워크플로우 실행
          await this.executeBranch(enrollment, matchingBranch);
          return;
        }
      }
      
      // 다음 스텝으로 이동
      enrollment.currentStepIndex++;
      return this.scheduleNextStep(enrollment);
    }
    
    // 지연 시간 계산
    const delay = this.parseDelay(currentStep.delay);
    
    // 스텝 실행 스케줄링
    setTimeout(async () => {
      await this.executeStep(enrollment, currentStep);
      
      // 완료된 스텝 기록
      enrollment.completedSteps.push({
        stepId: currentStep.id,
        completedAt: new Date(),
        result: 'success'
      });
      
      // 다음 스텝으로 이동
      enrollment.currentStepIndex++;
      await this.scheduleNextStep(enrollment);
    }, delay);
  }
  
  // 스텝 실행
  private async executeStep(enrollment: WorkflowEnrollment, step: WorkflowStep): Promise<void> {
    try {
      switch (step.action.type) {
        case 'send_email':
          await this.sendEmail(enrollment.contactId, step.action);
          break;
          
        case 'add_to_list':
          await this.addToList(enrollment.contactId, step.action.listId!);
          break;
          
        case 'update_property':
          await this.updateContactProperty(enrollment.contactId, step.action.properties!);
          break;
          
        case 'create_task':
          await this.createTask(enrollment.contactId, step.action);
          break;
          
        case 'send_sms':
          await this.sendSMS(enrollment.contactId, step.action.content!);
          break;
          
        case 'webhook':
          await this.callWebhook(enrollment, step.action.webhookUrl!);
          break;
          
        case 'wait':
          // 추가 대기 시간
          break;
      }
      
      // 성공 로그
      console.log(`Step ${step.id} executed successfully for contact ${enrollment.contactId}`);
      
    } catch (error) {
      console.error(`Error executing step ${step.id}:`, error);
      
      // 실패한 스텝 재시도 또는 오류 처리 로직
      enrollment.completedSteps.push({
        stepId: step.id,
        completedAt: new Date(),
        result: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  // 조건 평가
  private async evaluateCondition(contactId: string, condition: WorkflowCondition): Promise<boolean> {
    try {
      switch (condition.type) {
        case 'property':
          const propertyValue = await this.getContactProperty(contactId, condition.property!);
          return this.compareValues(propertyValue, condition.operator, condition.value);
          
        case 'behavior':
          const behaviorData = await this.getBehaviorData(contactId);
          return this.evaluateBehaviorCondition(behaviorData, condition);
          
        case 'engagement':
          const engagementData = await this.getEngagementData(contactId);
          return this.evaluateEngagementCondition(engagementData, condition);
          
        case 'score':
          const score = await this.getLeadScore(contactId);
          return this.compareValues(score, condition.operator, condition.value);
          
        case 'time':
          return this.evaluateTimeCondition(condition);
          
        default:
          return false;
      }
    } catch (error) {
      console.error('Error evaluating condition:', error);
      return false;
    }
  }
  
  // 값 비교
  private compareValues(actual: any, operator: string, expected: any): boolean {
    switch (operator) {
      case 'equals': return actual === expected;
      case 'not_equals': return actual !== expected;
      case 'greater_than': return actual > expected;
      case 'less_than': return actual < expected;
      case 'contains': return String(actual).includes(String(expected));
      case 'not_contains': return !String(actual).includes(String(expected));
      default: return false;
    }
  }
  
  // 지연 시간 파싱
  private parseDelay(delay: number | string): number {
    if (typeof delay === 'number') {
      return delay * 60 * 1000; // 분을 밀리초로 변환
    }
    
    const timeUnit = delay.split(' ');
    const value = parseInt(timeUnit[0] || '0');
    const unit = timeUnit[1] || 'minutes';
    
    const multipliers: Record<string, number> = {
      'minutes': 60 * 1000,
      'hours': 60 * 60 * 1000,
      'days': 24 * 60 * 60 * 1000,
      'weeks': 7 * 24 * 60 * 60 * 1000
    };
    
    return value * (multipliers[unit] || 60 * 1000);
  }
  
  // 이메일 발송
  private async sendEmail(contactId: string, action: WorkflowAction): Promise<void> {
    const contact = await this.getContact(contactId);
    if (!contact || !contact.email) return;
    
    // HubSpot 이메일 API 호출
    const emailData = {
      to: contact.email,
      subject: action.subject,
      template: action.template,
      content: action.content,
      personalizations: await this.getPersonalizationData(contactId)
    };
    
    // 실제 이메일 발송 로직 (HubSpot API)
    console.log('Sending email:', emailData);
  }
  
  // 연락처 정보 가져오기
  private async getContact(contactId: string): Promise<any> {
    // HubSpot API에서 연락처 정보 조회
    return { id: contactId, email: 'example@example.com' };
  }
  
  // 개인화 데이터 가져오기
  private async getPersonalizationData(contactId: string): Promise<Record<string, any>> {
    const contact = await this.getContact(contactId);
    return {
      firstName: contact.firstName || '고객님',
      company: contact.company || '귀하의 회사',
      industry: contact.industry || '업계'
    };
  }
  
  // 연락처 속성 업데이트
  private async updateContactProperty(contactId: string, properties: Record<string, any>): Promise<void> {
    // HubSpot API 호출하여 속성 업데이트
    console.log(`Updating contact ${contactId} properties:`, properties);
  }
  
  // 작업 생성
  private async createTask(contactId: string, action: WorkflowAction): Promise<void> {
    const taskData = {
      contactId,
      subject: `Follow up with contact from workflow`,
      content: action.content,
      assignee: action.assignee,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24시간 후
    };
    
    console.log('Creating task:', taskData);
  }
  
  // SMS 발송
  private async sendSMS(contactId: string, content: string): Promise<void> {
    const contact = await this.getContact(contactId);
    if (!contact.phone) return;
    
    // SMS API 호출
    console.log(`Sending SMS to ${contact.phone}: ${content}`);
  }
  
  // 웹훅 호출
  private async callWebhook(enrollment: WorkflowEnrollment, webhookUrl: string): Promise<void> {
    const payload = {
      contactId: enrollment.contactId,
      workflowId: enrollment.workflowId,
      triggerData: enrollment.triggerData,
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Webhook error:', error);
      throw error;
    }
  }
  
  // 워크플로우 통계 가져오기
  getWorkflowStats(workflowId: string): WorkflowStats | undefined {
    const enrollments = this.enrollments.get(workflowId) || [];
    const total = enrollments.length;
    const completed = enrollments.filter(e => e.status === 'completed').length;
    const active = enrollments.filter(e => e.status === 'active').length;
    
    const completedEnrollments = enrollments.filter(e => e.completedAt);
    const avgCompletionTime = completedEnrollments.length > 0 
      ? completedEnrollments.reduce((sum, e) => {
          return sum + (e.completedAt!.getTime() - e.enrolledAt.getTime());
        }, 0) / completedEnrollments.length
      : 0;
    
    return {
      enrolled: total,
      completed,
      active,
      conversionRate: total > 0 ? (completed / total) * 100 : 0,
      avgCompletionTime: avgCompletionTime / (1000 * 60 * 60) // 시간 단위
    };
  }
  
  // 헬퍼 메서드들
  private async getContactProperty(contactId: string, property: string): Promise<any> {
    const contact = await this.getContact(contactId);
    return contact[property];
  }
  
  private async getBehaviorData(contactId: string): Promise<any> {
    // 행동 데이터 조회
    return {};
  }
  
  private async getEngagementData(contactId: string): Promise<any> {
    // 참여 데이터 조회
    return {};
  }
  
  private async getLeadScore(contactId: string): Promise<number> {
    // 리드 스코어 조회
    return 0;
  }
  
  private evaluateBehaviorCondition(behaviorData: any, condition: WorkflowCondition): boolean {
    // 행동 조건 평가
    return true;
  }
  
  private evaluateEngagementCondition(engagementData: any, condition: WorkflowCondition): boolean {
    // 참여 조건 평가
    return true;
  }
  
  private evaluateTimeCondition(condition: WorkflowCondition): boolean {
    // 시간 조건 평가
    return true;
  }
  
  private async executeBranch(enrollment: WorkflowEnrollment, branch: WorkflowBranch): Promise<void> {
    // 분기 워크플로우 실행
    for (const step of branch.steps) {
      await this.executeStep(enrollment, step);
    }
  }
  
  private async addToList(contactId: string, listId: string): Promise<void> {
    // HubSpot 리스트에 연락처 추가
    console.log(`Adding contact ${contactId} to list ${listId}`);
  }
}

// 워크플로우 등록 정보 인터페이스
export interface WorkflowEnrollment {
  id: string;
  contactId: string;
  workflowId: string;
  currentStepIndex: number;
  enrolledAt: Date;
  completedAt?: Date;
  status: 'active' | 'completed' | 'paused' | 'failed';
  triggerData?: any;
  completedSteps: StepResult[];
  properties: Record<string, any>;
}

interface StepResult {
  stepId: string;
  completedAt: Date;
  result: 'success' | 'failed' | 'skipped';
  error?: string;
}

// 미리 정의된 워크플로우들
export const predefinedWorkflows = {
  // 신규 구독자 웰컴 시리즈
  welcomeSeries: {
    id: 'welcome-series',
    name: '신규 구독자 웰컴 시리즈',
    description: '뉴스레터 구독자를 위한 온보딩 시퀀스',
    trigger: { type: 'form_submission' as const, formId: 'newsletter-signup' },
    steps: [
      {
        id: 'welcome-email',
        name: '웰컴 이메일',
        delay: 0,
        action: {
          type: 'send_email' as const,
          template: 'welcome_template',
          subject: '패밀리오피스 S에 오신 것을 환영합니다!'
        }
      },
      {
        id: 'educational-content-1',
        name: '교육 콘텐츠 1',
        delay: '3 days',
        action: {
          type: 'send_email' as const,
          template: 'educational_1',
          subject: 'CEO가 꼭 알아야 할 자산관리 기초'
        }
      },
      {
        id: 'case-study',
        name: '성공 사례',
        delay: '7 days',
        action: {
          type: 'send_email' as const,
          template: 'case_study',
          subject: '실제 성공 사례: 가업승계 완벽 준비법'
        }
      },
      {
        id: 'consultation-offer',
        name: '상담 제안',
        delay: '14 days',
        condition: {
          type: 'engagement' as const,
          property: 'email_opens',
          operator: 'greater_than' as const,
          value: 2
        },
        action: {
          type: 'send_email' as const,
          template: 'consultation_offer',
          subject: '무료 전략 상담을 받아보세요'
        }
      }
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // 고득점 리드 즉시 대응
  hotLeadResponse: {
    id: 'hot-lead-response',
    name: '고득점 리드 즉시 대응',
    description: '리드 스코어 80점 이상 즉시 대응 워크플로우',
    trigger: { type: 'score_change' as const, scoreThreshold: 80 },
    steps: [
      {
        id: 'immediate-notification',
        name: '즉시 알림',
        delay: 0,
        action: {
          type: 'create_task' as const,
          content: '고득점 리드 즉시 연락 필요',
          assignee: 'sales-team'
        }
      },
      {
        id: 'priority-email',
        name: '우선 이메일',
        delay: 30, // 30분
        action: {
          type: 'send_email' as const,
          template: 'priority_followup',
          subject: '맞춤 솔루션 제안을 드립니다'
        }
      },
      {
        id: 'personal-outreach',
        name: '개인 연락',
        delay: '1 days',
        condition: {
          type: 'engagement' as const,
          property: 'email_clicked',
          operator: 'equals' as const,
          value: false
        },
        action: {
          type: 'create_task' as const,
          content: '직접 전화 연락 필요',
          assignee: 'senior-consultant'
        }
      }
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
} as const;

// 인스턴스 생성 및 내보내기
export const marketingAutomationEngine = new MarketingAutomationEngine();