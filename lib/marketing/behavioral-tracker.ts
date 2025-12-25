/**
 * 행동 추적 시스템
 * 클라이언트 사이드에서 사용자 행동을 추적하고 리드 스코어링에 반영
 */
import { getLeadScoringEngine } from './lead-scoring-engine';

export interface BehaviorTrackingConfig {
  contactId?: string;
  userId?: string;
  sessionId: string;
  enablePageTracking: boolean;
  enableScrollTracking: boolean;
  enableTimeTracking: boolean;
  enableFormTracking: boolean;
  apiEndpoint?: string;
}

export class BehavioralTracker {
  private config: BehaviorTrackingConfig;
  private sessionStartTime: number;
  private currentPageStartTime: number;
  private maxScrollDepth: number = 0;
  private formInteractions: Map<string, number> = new Map();
  private pageViewCount: number = 0;
  private isTracking: boolean = false;

  constructor(config: BehaviorTrackingConfig) {
    this.config = {
      apiEndpoint: '/api/marketing/track-activity',
      ...config,
    };
    this.sessionStartTime = Date.now();
    this.currentPageStartTime = Date.now();

    if (typeof window !== 'undefined') {
      this.initializeTracking();
    }
  }

  /**
   * 추적 시스템 초기화
   */
  private initializeTracking(): void {
    if (this.isTracking) return;
    this.isTracking = true;

    // 페이지 뷰 추적
    if (this.config.enablePageTracking) {
      this.trackPageView();
    }

    // 스크롤 깊이 추적
    if (this.config.enableScrollTracking) {
      this.initScrollTracking();
    }

    // 페이지 이탈 시 시간 추적
    if (this.config.enableTimeTracking) {
      this.initTimeTracking();
    }

    // 폼 상호작용 추적
    if (this.config.enableFormTracking) {
      this.initFormTracking();
    }

    // 페이지 변경 감지 (SPA용)
    this.initNavigationTracking();
  }

  /**
   * 페이지 뷰 추적
   */
  async trackPageView(): Promise<void> {
    if (!this.config.contactId) return;

    try {
      const pageData = {
        page_url: window.location.href,
        page_title: document.title,
        page_path: window.location.pathname,
        referrer: document.referrer,
        session_id: this.config.sessionId,
        user_agent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        screen: {
          width: screen.width,
          height: screen.height,
        },
        timestamp: new Date().toISOString(),
      };

      // API 호출 (트래킹 픽셀 방식)
      const trackingUrl = new URL(
        this.config.apiEndpoint!,
        window.location.origin
      );
      trackingUrl.searchParams.set('contact_id', this.config.contactId);
      trackingUrl.searchParams.set('page_url', pageData.page_url);
      trackingUrl.searchParams.set('page_title', pageData.page_title);
      trackingUrl.searchParams.set('session_id', pageData.session_id);

      // 1x1 픽셀 이미지로 추적 (CORS 및 광고 차단기 우회)
      const trackingPixel = new Image();
      trackingPixel.src = trackingUrl.toString();

      this.pageViewCount++;
      console.log(`📊 페이지 뷰 추적: ${pageData.page_path}`);
    } catch (error) {
      console.error('페이지 뷰 추적 실패:', error);
    }
  }

  /**
   * 스크롤 깊이 추적 초기화
   */
  private initScrollTracking(): void {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercent;

        // 25%, 50%, 75%, 100% 지점에서 이벤트 발생
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          this.trackScrollMilestone(scrollPercent);
        }
      }

      // 스크롤이 멈춘 후 추적
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackScrollDepth(scrollPercent);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * 스크롤 마일스톤 추적
   */
  private async trackScrollMilestone(percent: number): Promise<void> {
    if (!this.config.contactId) return;

    try {
      await this.sendTrackingEvent({
        activity_type: 'page_engagement',
        activity_data: {
          engagement_type: 'scroll_milestone',
          scroll_percent: percent,
          page_url: window.location.href,
          session_id: this.config.sessionId,
          timestamp: new Date().toISOString(),
        },
      });

      console.log(`📜 스크롤 마일스톤: ${percent}%`);
    } catch (error) {
      console.error('스크롤 마일스톤 추적 실패:', error);
    }
  }

  /**
   * 스크롤 깊이 추적
   */
  private async trackScrollDepth(percent: number): Promise<void> {
    if (!this.config.contactId || percent < 10) return;

    try {
      await this.sendTrackingEvent({
        activity_type: 'page_engagement',
        activity_data: {
          engagement_type: 'scroll_depth',
          max_scroll_percent: percent,
          page_url: window.location.href,
          session_id: this.config.sessionId,
        },
      });
    } catch (error) {
      console.error('스크롤 깊이 추적 실패:', error);
    }
  }

  /**
   * 시간 추적 초기화
   */
  private initTimeTracking(): void {
    // 페이지 이탈 시 시간 추적
    const trackTimeOnPage = () => {
      const timeOnPage = Date.now() - this.currentPageStartTime;
      if (timeOnPage > 30000) {
        // 30초 이상일 때만 추적
        this.trackTimeOnPage(timeOnPage);
      }
    };

    // 페이지 이탈 이벤트
    window.addEventListener('beforeunload', trackTimeOnPage);

    // 페이지 숨김 이벤트 (모바일에서 더 정확)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackTimeOnPage();
      } else if (document.visibilityState === 'visible') {
        this.currentPageStartTime = Date.now(); // 다시 보이면 시간 재설정
      }
    });
  }

  /**
   * 페이지 체류 시간 추적
   */
  private async trackTimeOnPage(timeMs: number): Promise<void> {
    if (!this.config.contactId) return;

    try {
      await this.sendTrackingEvent({
        activity_type: 'page_engagement',
        activity_data: {
          engagement_type: 'time_on_page',
          time_on_page_ms: timeMs,
          time_on_page_seconds: Math.round(timeMs / 1000),
          page_url: window.location.href,
          session_id: this.config.sessionId,
        },
      });

      console.log(`⏱️ 페이지 체류 시간: ${Math.round(timeMs / 1000)}초`);
    } catch (error) {
      console.error('체류 시간 추적 실패:', error);
    }
  }

  /**
   * 폼 상호작용 추적 초기화
   */
  private initFormTracking(): void {
    // 폼 필드 포커스 추적
    document.addEventListener('focusin', event => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        this.trackFormInteraction('field_focus', target);
      }
    });

    // 폼 제출 추적
    document.addEventListener('submit', event => {
      const target = event.target as HTMLFormElement;
      if (target.tagName === 'FORM') {
        this.trackFormSubmission(target);
      }
    });

    // 폼 필드 변경 추적
    document.addEventListener('change', event => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        this.trackFormInteraction('field_change', target);
      }
    });
  }

  /**
   * 폼 상호작용 추적
   */
  private trackFormInteraction(
    interactionType: string,
    element: HTMLElement
  ): void {
    const formId = element.closest('form')?.id || 'unknown-form';
    const fieldName =
      (element as HTMLInputElement).name ||
      (element as HTMLInputElement).id ||
      'unknown-field';

    const key = `${formId}-${fieldName}`;
    const currentCount = this.formInteractions.get(key) || 0;
    this.formInteractions.set(key, currentCount + 1);

    // 첫 번째 상호작용만 추적 (중복 방지)
    if (currentCount === 0) {
      this.sendTrackingEvent({
        activity_type: 'form_interaction',
        activity_data: {
          interaction_type: interactionType,
          form_id: formId,
          field_name: fieldName,
          field_type:
            (element as HTMLInputElement).type || element.tagName.toLowerCase(),
          page_url: window.location.href,
          session_id: this.config.sessionId,
        },
      }).catch(error => console.error('폼 상호작용 추적 실패:', error));
    }
  }

  /**
   * 폼 제출 추적
   */
  private async trackFormSubmission(form: HTMLFormElement): Promise<void> {
    if (!this.config.contactId) return;

    try {
      const formData = new FormData(form);
      const formFields: Record<string, any> = {};

      formData.forEach((value, key) => {
        // 민감한 정보는 제외하고 메타데이터만 수집
        if (
          !['password', 'card', 'ssn', 'social'].some(sensitive =>
            key.toLowerCase().includes(sensitive)
          )
        ) {
          formFields[key] =
            typeof value === 'string' ? value.substring(0, 100) : '[file]';
        }
      });

      await this.sendTrackingEvent({
        activity_type: 'form_submit',
        activity_data: {
          form_id: form.id || 'unknown-form',
          form_class: form.className,
          form_action: form.action,
          form_method: form.method,
          field_count: formData.entries.length,
          form_data: formFields, // 필터링된 데이터만
          page_url: window.location.href,
          session_id: this.config.sessionId,
        },
      });

      console.log(`📝 폼 제출 추적: ${form.id || 'unknown-form'}`);
    } catch (error) {
      console.error('폼 제출 추적 실패:', error);
    }
  }

  /**
   * 네비게이션 추적 초기화 (SPA용)
   */
  private initNavigationTracking(): void {
    // History API 감지
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const trackNavigationChange = () => {
      this.currentPageStartTime = Date.now();
      this.maxScrollDepth = 0;
      setTimeout(() => this.trackPageView(), 100); // DOM 업데이트 후 추적
    };

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      trackNavigationChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      trackNavigationChange();
    };

    // 뒤로가기/앞으로가기 감지
    window.addEventListener('popstate', trackNavigationChange);
  }

  /**
   * 커스텀 이벤트 추적
   */
  async trackCustomEvent(
    eventName: string,
    eventData: Record<string, any>
  ): Promise<void> {
    if (!this.config.contactId) return;

    try {
      await this.sendTrackingEvent({
        activity_type: 'custom_event',
        activity_data: {
          event_name: eventName,
          event_data: eventData,
          page_url: window.location.href,
          session_id: this.config.sessionId,
          timestamp: new Date().toISOString(),
        },
      });

      console.log(`🎯 커스텀 이벤트 추적: ${eventName}`);
    } catch (error) {
      console.error('커스텀 이벤트 추적 실패:', error);
    }
  }

  /**
   * 추적 이벤트 전송
   */
  private async sendTrackingEvent(eventData: {
    activity_type: string;
    activity_data: Record<string, any>;
  }): Promise<void> {
    if (!this.config.contactId) return;

    try {
      const response = await fetch(this.config.apiEndpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_id: this.config.contactId,
          user_id: this.config.userId,
          ...eventData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      // 추적 실패가 사용자 경험을 방해하지 않도록 조용히 처리
      console.debug('추적 이벤트 전송 실패:', error);
    }
  }

  /**
   * 콘택트 ID 업데이트
   */
  updateContactId(contactId: string): void {
    this.config.contactId = contactId;
  }

  /**
   * 추적 중지
   */
  stopTracking(): void {
    this.isTracking = false;
    // 이벤트 리스너 정리는 브라우저가 페이지 언로드 시 자동 처리
  }

  /**
   * 세션 요약 데이터 가져오기
   */
  getSessionSummary() {
    return {
      sessionId: this.config.sessionId,
      sessionDuration: Date.now() - this.sessionStartTime,
      pageViewCount: this.pageViewCount,
      maxScrollDepth: this.maxScrollDepth,
      formInteractionsCount: this.formInteractions.size,
      isActive: this.isTracking,
    };
  }
}

// 전역 인스턴스 관리
let globalTracker: BehavioralTracker | null = null;

export function initializeBehavioralTracker(
  config: BehaviorTrackingConfig
): BehavioralTracker {
  if (globalTracker) {
    globalTracker.stopTracking();
  }

  globalTracker = new BehavioralTracker(config);
  return globalTracker;
}

export function getBehavioralTracker(): BehavioralTracker | null {
  return globalTracker;
}
